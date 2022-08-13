import React, { useState, createRef, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  AppState,
  experimentState,
  farmState,
  randomizationsState,
  selectionState,
} from '../dataStructure'
// import { recoilState } from '../dataStructure'
import styled from 'styled-components'
import { AppProps } from '..'
import { Cow } from '../Datalayer/Cow'
import { Farm } from '../Datalayer/Farm'
import { Challenge } from '../Datalayer/Challenge'
import { CustomButton } from './CustomButton'
import Stack from '@mui/material/Stack'

//const logo = require('images/farm1342.jpg')

interface Props {
  todo?: string
}

interface State {
  onEdit: boolean
}

const Button = styled.button`
  background-color: #6e6e6e; //gray;
  color: white;
  font-size: 10px;
  padding: 10px 10px;
  margin: 5px 0px;
  width: 250px;
  cursor: pointer;

  :hover {
    background-color: #a3a3a3;
  }

  :disabled {
    background-color: #a3a3a3;
    cursor: not-allowed;
  }
`

// const buttonStyle = {
//     border: "none";
//     color: "white";
//     padding: "15px 32px";
//     text-align: center;
//     text-decoration: none;
//     display: inline-block;
//     font-size: 16px;
//     margin: 4px 2px;
//     cursor: pointer;
// }

const FirstBox = styled.div`
  flex: 2;
  margin: auto;
  text-align: center;
`

const MiddleBox = styled.div`
  flex: 0.5;
`

const SecondBox = styled.div`
  flex: 3;
`

export interface ButtonPageProps {
  farmId?: string
  cowId?: string
}

export const CowButtonPage: React.FC<ButtonPageProps> = (props) => {
  //   const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const path = 'images/'

  const availabilities = {
    AddToggle: true,
    isAdd: true,
    giveVaccine: true,
    giveNoVaccine: true,
    ChallengeHigh: true,
    ChallengeLow: true,
    Randomizer: true,
  }

  let [farms, setFarms] = useRecoilState(farmState)
  let [randomizations, setRandomizations] = useRecoilState(randomizationsState)
  let [experiment, setExperiment] = useRecoilState(experimentState)
  let randomization = randomizations[0]

  // TODO: Add safety when no farm is found!
  let farmIndex = farms.findIndex((f: Farm) =>
    props.farmId?.includes(f.getFarmID())
  )
  let selectedFarm = farms[farmIndex]

  // TODO: Add safety when no cow is found!
  let cows = selectedFarm.getCows()
  let cowIndex = cows.findIndex((c: Cow) => c.getCowID() === props.cowId)
  let selectedCow = cows[cowIndex]

  if (selectedCow) {
    if (selectedCow.isParticipating()) {
      availabilities.isAdd = false
      if (randomization.mode() === 'FARMS') {
        //staat randomizer in farm mode?
        availabilities.Randomizer = false
        availabilities.AddToggle = true

        availabilities.ChallengeHigh = !selectedCow.hasHighChallenge()
        availabilities.ChallengeLow = !selectedCow.hasLowChallenge()
        availabilities.giveVaccine = !selectedCow.getsVaccin()
        availabilities.giveNoVaccine = !selectedCow.getsNOVaccin()
      } else {
        //ze zit in boerderij mode of in niks
        if (randomization.hasThis(selectedCow)) {
          //ze zit erin
          availabilities.AddToggle = false
          availabilities.ChallengeHigh = false
          availabilities.ChallengeLow = false
          availabilities.Randomizer = false
          availabilities.giveVaccine = false
          availabilities.giveNoVaccine = false
        } else {
          availabilities.Randomizer = true
          availabilities.AddToggle = true

          //wel manueel veranderen:
          availabilities.ChallengeHigh = !selectedCow.hasHighChallenge()
          availabilities.ChallengeLow = !selectedCow.hasLowChallenge()
          availabilities.giveVaccine = !selectedCow.getsVaccin()
          availabilities.giveNoVaccine = !selectedCow.getsNOVaccin()
        }
      } //einde boerderijmode
    } //einde if
    else {
      //koe moet deelnemen om maueel toe te kennen
      availabilities.isAdd = true
      availabilities.AddToggle = true

      availabilities.ChallengeHigh = false
      availabilities.ChallengeLow = false
      availabilities.Randomizer = false
      availabilities.giveVaccine = false
      availabilities.giveNoVaccine = false
    }
  }

  const AddButton = () => {
    let newFarms = [...farms]
    let f = newFarms[farmIndex].copy()
    let newCows = [...cows]
    let newCow = selectedCow.copy()
    let newExperiment = experiment.copy()

    if (!newCow.isParticipating()) {
      if (
        newCow.getsNOVaccin() ||
        newCow.getsVaccin() ||
        newCow.hasLowChallenge() ||
        newCow.hasHighChallenge()
      ) {
        //er is een warning
        // TODO: Add warning for JOptionspane
        // Object[] options = { "OK" };
        // int result = JOptionPane.showOptionDialog(null,"This Cow allready had some properties before you removed it. These properties will reappear.", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0]);// geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
      } //warning

      newCow.addToExperiment(newExperiment)
    } else {
      newCow.removeOutOfExperiment(newExperiment)
    }

    newCows[cowIndex] = newCow
    f.cows = newCows
    newFarms[farmIndex] = f
    setFarms(newFarms)
    setExperiment(newExperiment)
  }

  const GiveVaccineButton = () => {
    //toon waarschuwing als het een niet manueel toegekende vaccin had
    let newFarms = [...farms]
    let f = newFarms[farmIndex].copy()
    let newCows = [...cows]
    let newCow = selectedCow.copy()
    let exp = experiment.copy()
    // TODO: add warning for vaccine
    //toon waarschuwing als het een niet manueel toegekende vaccin had
    // Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    // if ((koe.getsNOVaccin())&&(koe.vaccin.randomized())&&(JOptionPane.showOptionDialog(null, "This Cow has been assigned NO vaccin by randomization! If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //       //hierin doen we dus niks
    //       }
    // else {koe.setVaccin(true,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newCow.setVaccin(true, null, exp)

    newCows[cowIndex] = newCow
    f.cows = newCows
    newFarms[farmIndex] = f
    setFarms(newFarms)
    setExperiment(exp)
  }
  const GiveNoVaccineButton = () => {
    //toon waarschuwing als het een niet manueel toegekende vaccin had
    let newFarms = [...farms]
    let f = newFarms[farmIndex].copy()
    let newCows = [...cows]
    let newCow = selectedCow.copy()
    let exp = experiment.copy()
    //toon waarschuwing als het een niet manueel toegekende vaccin had
    // Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    // if ((koe.getsVaccin())&&(koe.vaccin.randomized())&&(JOptionPane.showOptionDialog(null, "This Cow has been assigned a vaccin by randomization! If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //       //hierin doen we dus niks
    //       }
    // else {koe.setVaccin(false,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newCow.setVaccin(false, null, exp)

    newCows[cowIndex] = newCow
    f.cows = newCows
    newFarms[farmIndex] = f
    setFarms(newFarms)
    setExperiment(exp)
  }

  const ChallengeHighButton = () => {
    //toon waarschuwing als het een niet manueel toegekende challenge had
    //  Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    let newFarms = [...farms]
    let f = newFarms[farmIndex].copy()
    let newCows = [...cows]
    let newCow = selectedCow.copy()
    let exp = experiment.copy()
    // TODO: Add warning for challenge
    // Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    // if ((koe.hasLowChallenge())&&(koe.challenge.randomized())&&(JOptionPane.showOptionDialog(null, "This Cow has been assigned a low Challenge by randomization! If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //       //hierin doen we dus niks
    //       }
    // else {koe.setChallenge(true,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newCow.setChallenge(true, null, exp)

    newCows[cowIndex] = newCow
    f.cows = newCows
    newFarms[farmIndex] = f
    setFarms(newFarms)
    setExperiment(exp)
  }
  const ChallengeLowButton = () => {
    //toon waarschuwing als het een niet manueel toegekende challenge had
    //  Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    let newFarms = [...farms]
    let f = newFarms[farmIndex].copy()
    let newCows = [...cows]
    let newCow = selectedCow.copy()
    let exp = experiment.copy()
    // TODO: Add warning for challenge
    // Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    // if ((koe.hasLowChallenge())&&(koe.challenge.randomized())&&(JOptionPane.showOptionDialog(null, "This Cow has been assigned a low Challenge by randomization! If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //       //hierin doen we dus niks
    //       }
    // else {koe.setChallenge(true,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newCow.setChallenge(false, null, exp)

    newCows[cowIndex] = newCow
    f.cows = newCows
    newFarms[farmIndex] = f
    setFarms(newFarms)
    setExperiment(exp)
  }
  const RandomizerButton = () => {
    let newRandomizations = [...randomizations]
    let newRandomization = randomization.copy()

    // let f = farms[farmIndex]
    // let newCows = [...cows]
    // let newCow = selectedCow.copy()
    newRandomization.addToSelection(selectedCow)

    newRandomizations[0] = newRandomization
    setRandomizations(newRandomizations)
  }

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ display: 'flex' }}
      >
        <CustomButton onClick={AddButton} disabled={!availabilities.AddToggle}>
          {availabilities.isAdd
            ? 'Add to experiment'
            : 'Remove from experiment'}
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
          Give NO vaccine
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
      {props.cowId ? (
        <></>
      ) : (
        <>
          <MiddleBox></MiddleBox>
          <SecondBox>
            {props.farmId ? (
              <img src={path + props.farmId + '.jpg'} />
            ) : (
              <img src={path + 'farm1342.jpg'} />
            )}
          </SecondBox>
        </>
      )}
    </>
  )
}
