import { List, ListItem, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/system/Box'
import { useRecoilValue } from 'recoil'
import {
  experimentState,
  farmState,
  randomizationsState,
} from '../../dataStructure'

/**
 * A collection of hints for the users to know what is still missing in the experiment.
 *
 * @returns React component
 */
export const Feedback = () => {
  let experiment = useRecoilValue(experimentState)
  let randomizations = useRecoilValue(randomizationsState)
  let farms = useRecoilValue(farmState)

  //hierin houden we bij hoeveel randomizaties voor deze factor op cow en farm niveau
  let vaccinC = 0
  let challengeC = 0
  let vaccinF = 0
  let challengeF = 0

  const numberOfParticipatingFarms = () => {
    let tel = 0
    for (let i = 0; i < farms.length; i++) {
      if (farms[i].numberOfParticipatingCows() > 0) tel++
    }
    return tel
  }

  // Skip the first one
  for (let i = 1; i < randomizations.length; i++) {
    let ran = randomizations[i]

    if (ran.mode() === 'COWS') {
      //op cow niveau
      if (ran.getStatus() == 1) vaccinC++
      if (ran.getStatus() == 2) challengeC++
      if (ran.getStatus() == 3) {
        vaccinC++
        challengeC++
      }
    } //end if cow niveau
    if (ran.mode() === 'FARMS') {
      //op farm niveau
      if (ran.getStatus() == 1) vaccinF++
      if (ran.getStatus() == 2) challengeF++
      if (ran.getStatus() == 3) {
        vaccinF++
        challengeF++
      }
    } //end if farm niveau
  } //end for

  /*farmstratum*/
  //voor een beetje meer uitleg over de feedback en de is else structuur zie Feedback for mastitis applet.doc
  let feedbackData = []
  if (vaccinF == 0 && challengeF == 0) {
    feedbackData.push(
      'No treatment factor was randomly assigned to farms, \nand farm thus represents a block factor that should be added to \nthe statistical model in order to reduce the error variability.\n\n'
    )
    if (numberOfParticipatingFarms() == 1)
      feedbackData.push(
        'There is only 1 farm selected to participate in the trial. \nIt is therefore questionable whether the obtained results \ncan be extrapolated to other farms.\n\n'
      )
  } else {
    if (vaccinF > 0) {
      feedbackData.push(
        'Treatment factor VACCINE was randomly assigned to farms. \nThis effect therefore needs to be assessed relative \nto the random farm variability.\n\n'
      )
      if (numberOfParticipatingFarms() < 3)
        feedbackData.push(
          'Each level of the treament factor VACCINE has only been assigned once to a farm, \nand therefore there are no replicates nor residual degrees \nof freedom for testing the effect of the treatment factor VACCINE.\n\n'
        )
      if (numberOfParticipatingFarms() < 5)
        feedbackData.push(
          'There are relatively few farms that participate in the trial, \nso that few degrees of freedom will be available to \ntest for the effect of the treatment factor VACCINE. \nIt is thus unlikely that a significant effect will appear, \neven with a true large difference.\n\n'
        )
    }
    if (challengeF > 0) {
      feedbackData.push(
        'Treatment factor CHALLENGE was randomly assigned to farms. \nThis effect therefore needs to be assessed relative to the random farm variability.\n\n'
      )
      if (numberOfParticipatingFarms() < 3)
        feedbackData.push(
          'Each level of the treament factor CHALLENGE has only been assigned once to a farm, \nand therefore there are no replicates nor residual degrees \nof freedom for testing the effect of the treatment factor CHALLENGE.\n\n'
        )
      if (numberOfParticipatingFarms() < 5)
        feedbackData.push(
          'There are relatively few farms that participate in the trial, \nso that few degrees of freedom will be available to \ntest for the effect of the treatment factor CHALLENGE. \nIt is thus unlikely that a significant effect will appear, even with a true large difference.\n\n'
        )
    }
  } //end else

  /*cowstratum*/
  //voor een beetje meer uitleg over de feedback en de is else structuur zie Feedback for mastitis applet.doc
  if (vaccinC == 0 && challengeC == 0) {
    feedbackData.push(
      '\nNo treatment factor was randomly assigned to cows, and measurements \non cows within farms are thus repeated measurements \nand no genuine replications. \nThe cow factor can be added to the model to estimate the sampling variation\nbut should not be used as error term against which to test.\n\n'
    )
  } else {
    if (vaccinC > 0) {
      feedbackData.push(
        'Treatment factor VACCINE was randomly assigned to cows. \nThis effect therefore needs to be assessed relative \nto the random cow variability.\n\n'
      )
      if (experiment.numberOfParticipatingCows() < 5)
        feedbackData.push(
          'There are relatively few cows that participate in the trial,\nso that few degrees of freedom will be available to test for\nthe effect of the treatment factor VACCINE. \nIt is thus unlikely that a significant effect will appear,\neven with a true large difference.\n\n'
        )
    }
    if (challengeC > 0) {
      feedbackData.push(
        'Treatment factor CHALLENGE was randomly assigned to cows. \nThis effect therefore needs to be assessed relative \nto the random cow variability.\n\n'
      )
      if (experiment.numberOfParticipatingCows() < 5)
        feedbackData.push(
          'There are relatively few cows that participate in the trial,\nso that few degrees of freedom will be available to test for\nthe effect of the treatment factor CHALLENGE.\nIt is thus unlikely that a significant effect will appear,\neven with a true large difference.\n\n'
        )
    }
  } //end else

  return (
    <Paper sx={{ p: 3, maxWidth: '80%' }}>
      <Typography variant="h4">Feedback</Typography>
      <Box sx={{ height: 5 }} />
      <List>
        <ListItem>
          {experiment.numberOfParticipatingCows()} cows were selected to
          participate in the trial.
        </ListItem>
        {feedbackData.map((d: string, index) => (
          <ListItem key={index}>{d}</ListItem>
        ))}
      </List>
    </Paper>
  )
}
