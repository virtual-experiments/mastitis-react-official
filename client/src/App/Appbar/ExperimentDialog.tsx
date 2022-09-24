import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/system/Box'

/**
 * A popup shown to the users when the experiment completed succesfully.
 * It points them in the right direction on where to find the newly created data.
 * @returns React component
 */
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
