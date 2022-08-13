//2.1 is voor wat de feedback betreft//2.2 de file er terug uit voor vlot offline gebruik
//2.3 regionview met kaart en klikken

import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/system/Box'

//3.0 met extra warning, foutje eruit, extra scrollbars, relatieve help(zie comments.doc)
export const ExperimentDialog = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4">Experiment completed!</Typography>
      <Box sx={{ height: 5 }} />
      <div>
        The cows have received the correct vaccines and the effect on the
        production of milk can be analysed.
      </div>
      <div>{'The results can be found under View>Dataset'}</div>
    </Paper>
  )
}
