//2.1 is voor wat de feedback betreft//2.2 de file er terug uit voor vlot offline gebruik
//2.3 regionview met kaart en klikken

import { List, ListItem, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/system/Box'
import { useRecoilValue } from 'recoil'
import { Randomization } from '../Datalayer/Randomization'
import {
  experimentState,
  farmState,
  randomizationsState,
} from '../dataStructure'

//3.0 met extra warning, foutje eruit, extra scrollbars, relatieve help(zie comments.doc)
export const Strategy = () => {
  return (
    <Paper sx={{ p: 3, width: '80%' }}>
      <Typography variant="h4">Strategy</Typography>
      <Box sx={{ height: 5 }} />
      <Typography variant="body1">Not implemented yet</Typography>
    </Paper>
  )
}
