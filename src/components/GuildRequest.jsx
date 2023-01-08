import React from 'react'
import { useEffect } from 'react';

// APP COMPONENTS
import GuildTable from './GuildTable';

// UI COMPONENTS
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export const GuildRequest = () => {

    const [token, setToken] = React.useState()
    const [loadingState, setLoadingState] = React.useState();
    const [guildCharacters, setGuildCharacters] = React.useState([])
    const [guildInfo, setGuildInfo] = React.useState();
    const [guildName, setGuildName] = React.useState('чёрный-лотос')
    const [realmName, setRealmName] = React.useState('gordunni');
    const [update, setUpdate] = React.useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [countdown, setCountdown] = React.useState(0);

    React.useEffect(() => {
        countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
    }, [countdown]);

    React.useEffect(() => {
        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 30000)
        setCountdown(30)
    }, [])

    useEffect(() => {
        if (!token) {
            fetch("https://oauth.battle.net/token", {
                body: "grant_type=client_credentials",
                headers: {
                    Authorization:
                        "Basic Y2QwOTE0YzdjYjQ1NDNhNzhiYmVjOWY4OGY1OTU0N2M6bXpUamhHVkc4UnlnUlpsQzY0S3FRS1hhQjFPUWJGcjE=",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST"
            })
                .then((response) => response.json())
                .then((response) => {
                    setToken(response.access_token)
                })
                .catch((err) => console.log(err))
        }
    }, [])

    useEffect(() => {
        if (token && guildName) {
            fetch(`https://eu.api.blizzard.com/data/wow/guild/${realmName}/${guildName}/roster?namespace=profile-eu&locale=en_US&access_token=${token}`)
                .then((res) => res.json())
                .then((res) => {
                    setGuildCharacters(res.members)
                    setGuildInfo(res)
                })
                .catch(err => console.log(err))
        }
    }, [guildName, realmName, token, update])

    return (
        <>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
                {guildCharacters.length !== 0 && (
                    <Typography variant="h5" component="h1">
                        {guildInfo.guild.name}
                    </Typography>
                )}
                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                    {countdown !== 0 && (
                        <span>{countdown}</span>
                    )}
                    <IconButton disabled={isButtonDisabled} onClick={() => {
                        setUpdate(!update)
                        setIsButtonDisabled(true)
                        setTimeout(() => {
                            setIsButtonDisabled(false);
                        }, 60000)
                        setCountdown(60)
                    }} color="secondary" aria-label="Update Data">
                        <RefreshIcon />
                    </IconButton>
                </Stack>
            </Stack>
            {guildCharacters.length !== 0 && (
                <Stack spacing={2.5} direction={{ md: 'column', lg: 'row' }} mt={1} mb={5}>
                    <GuildTable styles={{ width: '100%' }} guildCharacters={guildCharacters} loadingState={loadingState} setLoadingState={setLoadingState} token={token} update={update} rank={[5, 4, 3, 2, 1, 0]} title={'Main'} />
                    <GuildTable styles={{ width: '100%' }} guildCharacters={guildCharacters} loadingState={loadingState} setLoadingState={setLoadingState} token={token} update={update} rank={[6]} title={'Alt'} />
                </Stack>
            )}
        </>

    )
}
