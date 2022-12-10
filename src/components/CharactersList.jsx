import React from 'react'
import { useEffect } from 'react';
import GuildTable from './GuildTable';

export const CharactersList = ({ update }) => {

    const [token, setToken] = React.useState()
    const [guildCharacters, setGuildCharacters] = React.useState([])

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
        if (token) {
            fetch(`https://eu.api.blizzard.com/data/wow/guild/gordunni/чёрный-лотос/roster?namespace=profile-eu&locale=en_US&access_token=${token}`)
                .then((res) => res.json())
                .then((res) => {
                    setGuildCharacters(res.members)
                })
                .catch(err => console.log(err))
        }
    }, [token, update])

    return (
        <>
            {guildCharacters.length !== 0 && (
                <div className='app__tables'>
                    <GuildTable players={guildCharacters} token={token} update={update} rank={[5, 4, 3, 2, 1, 0]} title={'Main Characters'} />
                    <GuildTable players={guildCharacters} token={token} update={update} rank={[6]} title={'Alt Characters'} />
                </div>
            )}
        </>
    )
}
