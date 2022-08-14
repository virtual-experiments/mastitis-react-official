import { useRecoilState } from 'recoil'

import {
  experimentState,
  farmState,
  randomizationsState,
} from '../../dataStructure'
// import { recoilState } from '../dataStructure'
import styled from 'styled-components'
import { Farm } from '../../Datalayer/Farm'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Container } from '@mui/system'
import { CustomButton } from '../CustomButton'

export interface FarmButtonPageProps {
  farmId?: string
}

const Item = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // lineHeight: '60px',
  // padding: 20,
}))

const FarmButtonPage: React.FC<FarmButtonPageProps> = (props) => {
  //   const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const path = 'images/'

  const availabilities = {
    Add: false,
    Remove: false,
    giveVaccine: false,
    giveNoVaccine: false,
    ChallengeHigh: false,
    ChallengeLow: false,
    Randomizer: false,
  }

  let [farms, setFarms] = useRecoilState(farmState)
  let [randomizations, setRandomizations] = useRecoilState(randomizationsState)
  let randomization = randomizations[0]
  let [experiment, setExperiment] = useRecoilState(experimentState)

  let index = farms.findIndex((f: Farm) =>
    props.farmId?.includes(f.getFarmID())
  )
  let selectedFarm = farms[index]

  availabilities.Add =
    selectedFarm!.numberOfParticipatingCows() < selectedFarm!.getCows().length
  availabilities.Remove = selectedFarm!.numberOfParticipatingCows() > 0

  if (randomization.mode() === 'COWS') {
    //staat randomizer in cow mode?
    availabilities.Randomizer = false

    //wel manueel veranderen:
    availabilities.ChallengeHigh = !selectedFarm!.allHighChallenge()
    availabilities.ChallengeLow = !selectedFarm!.allLowChallenge()
    availabilities.giveVaccine = !selectedFarm!.allVaccin()
    availabilities.giveNoVaccine = !selectedFarm?.allNOVaccin()
  } else {
    //ze zit in boerderij mode of in niks
    if (randomization.hasThis(selectedFarm!)) {
      //ze zit erin
      availabilities.Randomizer = false
      availabilities.ChallengeHigh = false
      availabilities.ChallengeLow = false
      availabilities.giveVaccine = false
      availabilities.giveNoVaccine = false
    } else {
      //ze zit niet in randomiser
      availabilities.Randomizer = true //niet in random
      //wel manueel veranderen:
      availabilities.ChallengeHigh = !selectedFarm!.allHighChallenge()
      availabilities.ChallengeLow = !selectedFarm!.allLowChallenge()
      availabilities.giveVaccine = !selectedFarm!.allVaccin()
      availabilities.giveNoVaccine = !selectedFarm?.allNOVaccin()
    }
  } //einde boerderijmode

  const AddButton = () => {
    let newFarms = [...farms]
    let f = newFarms[index]
    let newFarm = f.copy()
    let newExperiment = experiment.copy()
    if (newFarm.addAllToExperiment(newExperiment)) {
      // TODO: JOptionspane
      // Object[] options = { "OK" };
      // int result = JOptionPane.showOptionDialog(null,"At least one Cow allready had some properties before you removed it. These properties will reappear.", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0]);// geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    }
    newFarms[index] = newFarm
    setFarms(newFarms)
    setExperiment(newExperiment)
  }

  const RemoveButton = () => {
    let newFarms = [...farms]
    let newFarm = newFarms[index].copy()
    let newExperiment = experiment.copy()

    newFarm.removeAllOutOfExperiment(newExperiment)
    newFarms[index] = newFarm
    setFarms(newFarms)
    setExperiment(newExperiment)
  }
  const GiveVaccineButton = () => {
    //toon waarschuwing als het een niet manueel toegekende vaccin had
    let newFarms = [...farms]
    let newFarm = newFarms[index].copy()
    let newExp = experiment.copy()
    // TODO: add warning for vaccine
    // Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    // if ((boe.hasVaccinRandomizations()>0)&&(JOptionPane.showOptionDialog(null, "This Farm (or some cows in it) are involved in a Randomization concerning the Vaccin. If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //       //hierin doen we dus niks
    //       }
    // else {boe.setVaccin(true,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newFarm.setVaccin(true, null, newExp)
    newFarms[index] = newFarm
    setFarms(newFarms)
    setExperiment(newExp)
  }
  const GiveNoVaccineButton = () => {
    //toon waarschuwing als het een niet manueel toegekende vaccin had
    let newFarms = [...farms]
    let newFarm = newFarms[index].copy()
    let newExp = experiment.copy()
    // TODO: add warning for vaccine
    // Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    // if ((boe.hasVaccinRandomizations()>0)&&(JOptionPane.showOptionDialog(null, "This Farm (or some cows in it) are involved in a Randomization concerning the Vaccin. If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //       //hierin doen we dus niks
    //       }
    // else {boe.setVaccin(true,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newFarm.setVaccin(false, null, newExp)
    newFarms[index] = newFarm
    setFarms(newFarms)
    setExperiment(newExp)
  }
  const ChallengeHighButton = () => {
    //toon waarschuwing als het een niet manueel toegekende challenge had
    //  Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    let newFarms = [...farms]
    let newFarm = newFarms[index].copy()
    let newExp = experiment.copy()
    // TODO: Add warning for challenge
    //  if ((newFarm.hasChallengeRandomizations()>0)&&(JOptionPane.showOptionDialog(null, "This Farm (or some cows in it) are involved in a Randomization concerning the Challenge! If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //        //hierin doen we dus niks
    //        }
    // else {boe.setChallenge(false,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newFarm.setChallenge(true, null, newExp)
    newFarms[index] = newFarm
    setFarms(newFarms)
    setExperiment(newExp)
    // freem.updateFarm(boe)
  }
  const ChallengeLowButton = () => {
    //toon waarschuwing als het een niet manueel toegekende challenge had
    //  Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    let newFarms = [...farms]
    let newFarm = newFarms[index].copy()
    let newExp = experiment.copy()
    // TODO: Add warning for challenge
    //  if ((newFarm.hasChallengeRandomizations()>0)&&(JOptionPane.showOptionDialog(null, "This Farm (or some cows in it) are involved in a Randomization concerning the Challenge! If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //        //hierin doen we dus niks
    //        }
    // else {boe.setChallenge(false,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newFarm.setChallenge(false, null, newExp)
    newFarms[index] = newFarm
    setFarms(newFarms)
    setExperiment(newExp)
    // freem.updateFarm(boe)
  }
  const RandomizerButton = () => {
    let newRandomizations = [...randomizations]
    let newRandomization = randomization.copy()
    newRandomization.addToSelection(farms[index])

    newRandomizations[0] = newRandomization
    setRandomizations(newRandomizations)
  }

  return (
    <>
      <Stack spacing={2} direction="row">
        <Item sx={{ flexGrow: 1 }}>
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ display: 'flex' }}
            >
              <CustomButton onClick={AddButton} disabled={!availabilities.Add}>
                Add all cows to experiment
              </CustomButton>
              <CustomButton
                onClick={RemoveButton}
                disabled={!availabilities.Remove}
              >
                Remove all cows out of experiment
              </CustomButton>
              <CustomButton
                onClick={GiveVaccineButton}
                disabled={!availabilities.giveVaccine}
              >
                Give the vaccine
              </CustomButton>
              <CustomButton
                onClick={GiveNoVaccineButton}
                disabled={!availabilities.giveNoVaccine}
              >
                Give no vaccine
              </CustomButton>
              <CustomButton
                onClick={ChallengeHighButton}
                disabled={!availabilities.ChallengeHigh}
              >
                Set Challenge High
              </CustomButton>
              <CustomButton
                onClick={ChallengeLowButton}
                disabled={!availabilities.ChallengeLow}
              >
                Set Challenge Low
              </CustomButton>
              <CustomButton
                onClick={RandomizerButton}
                disabled={!availabilities.Randomizer}
              >
                Put in randomizer
              </CustomButton>
            </Stack>
          </Container>
        </Item>

        {/* <FirstBox>
        <div>
          <Button onClick={AddButton} disabled={!availabilities.Add}>
            Add all cows to experiment
          </Button>
        </div>
        <div>
          <Button onClick={RemoveButton} disabled={!availabilities.Remove}>
            Remove all cows out of experiment
          </Button>
        </div>
        <div>
          <Button
            onClick={GiveVaccineButton}
            disabled={!availabilities.giveVaccine}
          >
            Give the vaccine
          </Button>
        </div>
        <div>
          <Button
            onClick={GiveNoVaccineButton}
            disabled={!availabilities.giveNoVaccine}
          >
            Give no vaccine
          </Button>
        </div>
        <div>
          <Button
            onClick={ChallengeHighButton}
            disabled={!availabilities.ChallengeHigh}
          >
            Set Challenge High
          </Button>
        </div>
        <div>
          <Button
            onClick={ChallengeLowButton}
            disabled={!availabilities.ChallengeLow}
          >
            Set Challenge Low
          </Button>
        </div>
        <div>
          <Button
            onClick={RandomizerButton}
            disabled={!availabilities.Randomizer}
          >
            Put in randomizer
          </Button>
        </div>
      </FirstBox> */}
        <Item sx={{ flexGrow: 4 }}>
          {props.farmId ? (
            <img src={path + 'farm' + props.farmId + '.jpg'} />
          ) : (
            <img src={path + 'farm1342.jpg'} />
          )}
        </Item>

        {/* <MiddleBox></MiddleBox>
      <SecondBox>
        {props.farmId ? (
          <img src={path + 'farm' + props.farmId + '.jpg'} />
        ) : (
          <img src={path + 'farm1342.jpg'} />
        )}
      </SecondBox> */}
      </Stack>
    </>
  )
}

export default FarmButtonPage
