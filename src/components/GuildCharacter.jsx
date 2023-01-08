import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const GuildCharacter = ({player, handleModalActions}) => {
    return (
        < TableRow
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
                                {prof.min !== "" ? `(${prof.min}/${prof.max})` : `(No DF)`}
                            </span>
                        </div>
                    )
                })}
            </TableCell>
            <TableCell align="right">
                <span className={player.ilvl >= 379 ? 'red' : '' + player.ilvl >= 372 ? 'green' : ''}>{player.ilvl}</span>
            </TableCell>
        </TableRow>
    )
}
