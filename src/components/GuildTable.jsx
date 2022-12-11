import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BasicModal from './BasicModal';
import Typography from '@mui/material/Typography';



export default function GuildTable({ title, guildCharacters, token, update, rank, loadingState, setLoadingState }) {

  // API INFO
  const [characterProfiles, setCharacterProfiles] = React.useState([]);
  const [characterProfessions, setCharacterProfessions] = React.useState([]);
  const [characterAvatars, setCharacterAvatars] = React.useState([]);
  const [guildRosterInfo, setGuildRosterInfo] = React.useState(guildCharacters)
  // API INFO END
  const [orderBy, setOrderBy] = React.useState('index');
  const [sortDirection, setSortDirection] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState([{
    name: '',
  }]);

  const [characters, setCharacters] = React.useState([{
    num: 0,
    id: '',
    avatar: '',
    name: '',
    spec: '',
    class: '',
    prof: [{ name: 'No Professions', min: '', max: '' }],
    ilvl: '',
    armoryLink: '',
  }]);

  useEffect(() => {
    fetchApplicationData();
  }, [update])

  useEffect(() => {
    setCharacters([])
    characterProfiles.map((player, index) => { // заполняем наших персонажей
      // поля по умолчанию
      let profession = [{ name: 'No Professions', min: '', max: '' }]
      let avatar = '';
      // вытягиваем профессию из данных что хранятся в стейте, для текущего плеера, который на данный момент обрабатывается методом map()
      let professionData = characterProfessions.find(element => {
        if (element.data.character.id === player.data.id) {
          return element;
        }
        return false;
      })

      if (professionData.data.primaries) {
        professionData = professionData.data.primaries.map(element => {
          let currentSkillLevel = element.tiers.find(element => {
            if (element.tier.name.toLowerCase().includes('dragon')) {
              return element;
            } else {
              return false;
            }
          });
          let curPoints = ''
          let maxPoints = ''
          if (currentSkillLevel) {
            curPoints = currentSkillLevel.skill_points
            maxPoints = currentSkillLevel.max_skill_points
          }


          let objectWithSkillAndLevel = {
            name: element.profession.name,
            min: curPoints,
            max: maxPoints,
          }
          return objectWithSkillAndLevel;
        })
        profession = professionData;
      }
      // профессии вытянуты, по умолчанию "Нет Профессий"

      // вытягиваем аватар из данных что хранятся в стейте, для текущего плеера, который на данный момент обрабатывается методом map()
      let avatarDataForCurrenCharacter = characterAvatars.find(element => {
        if (element.data.character.id === player.data.id) {
          return element.data.assets[0].value;
        }
        return false
      })
      avatarDataForCurrenCharacter = avatarDataForCurrenCharacter.data.assets[0].value
      avatar = avatarDataForCurrenCharacter;
      // аватарки вытянуты, по умолчанию пустое поле

      // наполняем наш стейт скомпанованной информацией
      setCharacters(prev => [...prev, {
        num: index + 1,
        id: player.data.id,
        avatar: avatar,
        name: player.data.name,
        spec: player.data.active_spec.name,
        class: player.data.character_class.name,
        prof: profession,
        ilvl: player.data.equipped_item_level,
        level: player.data.level,
        armoryLink: `https://worldofwarcraft.com/ru-ru/character/eu/gordunni/${player.data.name}`,
      }]);
      return null;
    })
  }, [characterProfiles])


  const fetchApplicationData = async () => {
    setLoadingState(true);
    try {
      const profiles = guildCharacters
        .filter(element => rank.includes(element.rank) && element.character.level === 70)
        .map((player) => {
          let playerName = player.character.name.toLowerCase();
          return axios.get(`https://eu.api.blizzard.com/profile/wow/character/gordunni/${playerName}?namespace=profile-eu&locale=en_US&access_token=${token}`)
        })
      const professions = guildCharacters
        .filter(element => rank.includes(element.rank) && element.character.level === 70)
        .map((player) => {
          let playerName = player.character.name.toLowerCase();
          return axios.get(`https://eu.api.blizzard.com/profile/wow/character/gordunni/${playerName}/professions?namespace=profile-eu&locale=en_US&access_token=${token}`)
        })
      const avatars = guildCharacters
        .filter(element => rank.includes(element.rank) && element.character.level === 70)
        .map((player) => {
          let playerName = player.character.name.toLowerCase();
          return axios.get(`https://eu.api.blizzard.com/profile/wow/character/gordunni/${playerName}/character-media?namespace=profile-eu&locale=en_US&access_token=${token}`)
        })

      const characterProfiles = await Promise.all(profiles);
      const charProfs = await Promise.all(professions);
      const charAvatars = await Promise.all(avatars);
      setCharacterProfiles(characterProfiles);
      setCharacterProfessions(charProfs);
      setCharacterAvatars(charAvatars);
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingState(false);
    }
  };

  const handleModalActions = (player) => {
    setIsModalOpen(true);
    setModalData(player);
  }

  const stringCompare = (string1, string2, sortDirection) => {
    if (sortDirection) {
      if (string1 < string2) { return -1; }
      if (string1 > string2) { return 1; }
      return 0;
    } else {
      if (string1 > string2) { return -1; }
      if (string1 < string2) { return 1; }
      return 0;
    }
  }

  const numberCompare = (number1, number2, sortDirection) => {
    if (sortDirection) {
      return number1 - number2
    } else {
      return number2 - number1
    }
  }


  const letsCompare = (a, b, orderBy, sortDirection) => {
    switch (orderBy) {
      case 'index': {
        return numberCompare(a.num, b.num, !sortDirection)
      }
      case 'ilvl': {
        return numberCompare(a.ilvl, b.ilvl, sortDirection)
      }
      case 'name': {
        return stringCompare(a.name, b.name, sortDirection)
      }
      case 'class': {
        return stringCompare(a.class, b.class, sortDirection)
      }
      case 'spec': {
        return stringCompare(a.spec, b.spec, sortDirection)
      }
      case 'prof': {
        return stringCompare(a.prof, b.prof, sortDirection)
      }
      default:
        break;
    }
  }

  const compareFunction = (a, b) => {
    return letsCompare(a, b, orderBy, sortDirection);
  }

  const getAverageItemLevel = (array) => {
    let avIlvl = 0;
    const sumWithInitial = array.reduce(
      (total, currentValue) => total + currentValue.ilvl,
      avIlvl
    )
    if (array.length > 0) {
      avIlvl = sumWithInitial / array.length
    }
    return avIlvl.toFixed(2);
  }

  return (
    <>
      <BasicModal modalData={modalData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <TableContainer component={Paper}>
        {loadingState && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
        <Stack padding={1} direction="row" alignItems="center" justifyContent={'space-between'}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Chip color="secondary" label={getAverageItemLevel(characters)} size="small" />
        </Stack>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={'clickable'}
                onClick={() => {
                  setOrderBy('index')
                  setSortDirection(!sortDirection)
                }}>
                #
              </TableCell>
              <TableCell className={'clickable'}
                onClick={() => {
                  setOrderBy('name')
                  setSortDirection(!sortDirection)
                }}>
                Nickname
              </TableCell>
              <TableCell className={'clickable'} align="right"
                onClick={() => {
                  setOrderBy('spec')
                  setSortDirection(!sortDirection)
                }}>
                Spec
              </TableCell>
              <TableCell className={'clickable'} align="right"
                onClick={() => {
                  setOrderBy('class')
                  setSortDirection(!sortDirection)
                }}>
                Class
              </TableCell>
              <TableCell className={'clickable'}
                onClick={() => {
                  setOrderBy('prof')
                  setSortDirection(!sortDirection)
                }} align="right">
                Prof.
              </TableCell>
              <TableCell className={'clickable'}
                onClick={() => {
                  setOrderBy('ilvl')
                  setSortDirection(!sortDirection)
                }} align="right">
                ilvl
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters
              .sort(compareFunction)
              .map((player, index) => (
                < TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => handleModalActions(player)}
                >
                  <TableCell component="td" scope="row">
                    <img src={`${player.avatar}`} alt={`${player.name} avatar`} className="app__avatar" />
                  </TableCell>
                  <TableCell component="td" scope="row" player-class={`${player.class}`}>
                    <span>{player.num}. {player.name}</span>
                  </TableCell>
                  <TableCell align="right">
                    {player.spec}
                  </TableCell>
                  <TableCell align="right" player-class={`${player.class}`}>
                    <span>{player.class}</span>
                  </TableCell>
                  <TableCell align="right">
                    {player.prof.map((prof, index) => {
                      return (
                        <div key={index}>
                          <span>
                            <strong>{prof.name} </strong>
                            {prof.min !== "" ? `(${prof.min}/${prof.max})` : ``}
                          </span>
                        </div>
                      )
                    })}
                  </TableCell>
                  <TableCell align="right">
                    <span className={player.ilvl >= 379 ? 'red' : '' + player.ilvl >= 372 ? 'green' : ''}>{player.ilvl}</span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}