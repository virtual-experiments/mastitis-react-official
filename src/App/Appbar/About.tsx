//2.1 is voor wat de feedback betreft//2.2 de file er terug uit voor vlot offline gebruik
//2.3 regionview met kaart en klikken

import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/system/Box'

//3.0 met extra warning, foutje eruit, extra scrollbars, relatieve help(zie comments.doc)
export const About = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4">About</Typography>
      <Box sx={{ height: 5 }} />
      <table>
        <tr>
          <td>Project Name: </td>
          <td>VIRTEX</td>
        </tr>
        <tr>
          <td>Applet Name:</td>
          <td>Version 3.0</td>
        </tr>

        <tr>
          <td>Project Promotor:</td>
          <td>Prof. Paul Darius and Prof. Luc Duchateau</td>
        </tr>
        <tr>
          <td>Author:</td>
          <td>Liesbeth Lievens and Tim De Bauw</td>
        </tr>
        <tr>
          <td>Last Modification:</td>
          <td>13/08/2022</td>
        </tr>
      </table>
      <div>Copyright (c) 2002-2003</div>
      <div>Katholieke Universiteit Leuven</div>
      {/* <Typography variant="h6">Project Name: Virtex</Typography>
      <div>{'Applet Name:' + '\t' + 'Mastitis'}</div>
      <div>{'Applet Version:' + '\t' + 'Version 3.0'}</div>
      <div>{'Project Promotor:' + '\t' + 'Prof. Paul Darius'}</div>
      <div>{+' ' + '\t' + 'Prof. Luc Duchateau'}</div>
      <div>{'Author:' + '\t' + 'Liesbeth Lievens'}</div>
      <div>{'Last Modification:' + '\t' + '30 Juli 2003'}</div>
      <div>{'Copyright (c) 2002-2003'}</div>
      <div>{'Katholieke Universiteit Leuven'}</div> */}
    </Paper>
  )
}
