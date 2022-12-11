import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function GuildTable({ title, guildCharacters, token, update, rank }) {


  // стейт который содержит в себе данные, которые были получены от API профилей персонажей
  const [characters, setCharacters] = React.useState([{
    name: '',
    spec: '',
    class: '',
    prof: '',
    ilvl: '',
  }]);
  const [charactersAdvanced, setCharactersAdvanced] = React.useState([{
    name: '',
    spec: '',
    class: '',
    prof: '',
    ilvl: '',
  }]);


  const [orderBy, setOrderBy] = React.useState('ilvl');
  const [sortDirection, setSortDirection] = React.useState(false);

  useEffect(() => {
    if (token) {
      setCharacters([]);
      guildCharacters
        .filter(element => rank.includes(element.rank) && element.character.level === 70)
        .forEach((player) => {
          let playerName = player.character.name.toLowerCase();
          fetch(`https://eu.api.blizzard.com/profile/wow/character/gordunni/${playerName}?namespace=profile-eu&locale=en_US&access_token=${token}`)
            .then(res => res.json())
            .then((json) => {
              setCharacters(prev => [...prev, {
                name: json.name,
                spec: json.active_spec.name,
                class: json.character_class.name,
                prof: 'No Professions',
                ilvl: json.equipped_item_level,
              }]);
            })
            .catch(err => console.log(err));
        });
    }
  }, [guildCharacters])

  useEffect(() => {
    setCharactersAdvanced([]);
    characters.forEach((player) => {
      if (player.name) {
        let playerName = player.name.toLowerCase();
        let charactersCopy = [...characters]
        fetch(`https://eu.api.blizzard.com/profile/wow/character/gordunni/${playerName}/professions?namespace=profile-eu&locale=en_US&access_token=${token}`)
          .then(res => res.json())
          .then(json => {
            if (json.primaries) {
              charactersCopy.find(element => {
                if (element.name === json.character.name) {
                  element.prof = json.primaries.map(element => {
                    return element.profession.name;
                  }).join(', ')
                }
              })
              setCharactersAdvanced(charactersCopy);
            }
          })
          .catch(err => console.log(err, `error with prof fetch, player's name is ${player.name}`));
      }
    })
  }, [characters])

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
    const initialValue = 0;
    const sumWithInitial = array.reduce(
      (total, currentValue) => total + currentValue.ilvl,
      initialValue
    )
    let avIlvl = sumWithInitial / array.length
    return avIlvl.toFixed(2);
  }

  return (
    <div className="app__table">
      <h2>{title} <span className="average-item-level">{getAverageItemLevel(characters)}</span></h2>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
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
            {charactersAdvanced
              .sort(compareFunction)
              .map((player, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <a href={`https://worldofwarcraft.com/ru-ru/character/eu/gordunni/${player.name}`} rel="noopener noreferrer" target="_blank"><strong>{player.name}</strong></a>
                  </TableCell>
                  <TableCell align="right">
                    {player.spec}
                  </TableCell>
                  <TableCell align="right" player-class={`${player.class}`}>
                    <span>{player.class}</span>
                  </TableCell>
                  <TableCell align="right">
                    {player.prof}
                  </TableCell>
                  <TableCell align="right">
                    <span className={player.ilvl >= 379 ? 'red' : '' + player.ilvl >= 372 ? 'green' : ''}>{player.ilvl}</span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}