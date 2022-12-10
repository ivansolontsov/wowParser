import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function GuildTable({ title, players, token, update, rank }) {

  const [characters, setCharacters] = React.useState([]);
  const [altCharacters, setAltCharacters] = React.useState([])
  const [orderBy, setOrderBy] = React.useState('ilvl');
  const [sortDirection, setSortDirection] = React.useState(false);


  useEffect(() => {
    if (token) {
      setCharacters([]);
      players
        .filter(element => rank.includes(element.rank) && element.character.level === 70)
        .forEach((player) => {
          let playerName = player.character.name.toLowerCase();
          fetch(`https://eu.api.blizzard.com/profile/wow/character/gordunni/${playerName}?namespace=profile-eu&locale=en_US&access_token=${token}`)
            .then(res => res.json())
            .then((json) => {
              setCharacters(prev => [...prev, json]);
            })
            .catch(err => console.log(err));
        })
    }
  }, [update])


  function stringCompare(string1, string2, sortDirection) {
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

  function numberCompare(number1, number2, sortDirection) {
    if (sortDirection) {
      return number1 - number2
    } else {
      return number2 - number1
    }
  }


  const letsCompare = (a, b, orderBy, sortDirection) => {
    switch (orderBy) {
      case 'ilvl': {
        return numberCompare(a.equipped_item_level, b.equipped_item_level, sortDirection)
      }
      case 'name': {
        return stringCompare(a.name, b.name, sortDirection)
      }
      case 'class': {
        return stringCompare(a.character_class.name, b.character_class.name, sortDirection)
      }
      case 'spec': {
        return stringCompare(a.active_spec.name, b.active_spec.name, sortDirection)
      }
      default:
        break;
    }
  }

  const compareFunction = (a, b) => {
    return letsCompare(a, b, orderBy, sortDirection);
  }

  return (
    <div className="app__table">
      <h2>{title}</h2>
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
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <strong>{player.name}</strong>
                  </TableCell>
                  <TableCell align="right">
                    {player.active_spec.name}
                  </TableCell>
                  <TableCell align="right" player-class={`${player.character_class.name}`}>
                    <span>{player.character_class.name}</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className={player.equipped_item_level >= 379 ? 'red' : '' + player.equipped_item_level >= 372 ? 'green' : ''}>{player.equipped_item_level}</span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}