import React, { useState, createRef, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import './Navigationbar/styles.scss'

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

export interface FarmButtonPageProps {
  farmId?: string
}

const ButtonPage: React.FC<FarmButtonPageProps> = (props) => {
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
    // TODO: add warning for vaccine
    // Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    // if ((boe.hasVaccinRandomizations()>0)&&(JOptionPane.showOptionDialog(null, "This Farm (or some cows in it) are involved in a Randomization concerning the Vaccin. If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //       //hierin doen we dus niks
    //       }
    // else {boe.setVaccin(true,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newFarm.setVaccin(true, null)
    newFarms[index] = newFarm
    setFarms(newFarms)
  }
  const GiveNoVaccineButton = () => {
    //toon waarschuwing als het een niet manueel toegekende vaccin had
    let newFarms = [...farms]
    let newFarm = newFarms[index].copy()
    // TODO: add warning for vaccine
    // Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    // if ((boe.hasVaccinRandomizations()>0)&&(JOptionPane.showOptionDialog(null, "This Farm (or some cows in it) are involved in a Randomization concerning the Vaccin. If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //       //hierin doen we dus niks
    //       }
    // else {boe.setVaccin(true,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newFarm.setVaccin(false, null)
    newFarms[index] = newFarm
    setFarms(newFarms)
  }
  const ChallengeHighButton = () => {
    //toon waarschuwing als het een niet manueel toegekende challenge had
    //  Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    let newFarms = [...farms]
    let newFarm = newFarms[index].copy()

    // TODO: Add warning for challenge
    //  if ((newFarm.hasChallengeRandomizations()>0)&&(JOptionPane.showOptionDialog(null, "This Farm (or some cows in it) are involved in a Randomization concerning the Challenge! If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //        //hierin doen we dus niks
    //        }
    // else {boe.setChallenge(false,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newFarm.setChallenge(true, null)
    newFarms[index] = newFarm
    setFarms(newFarms)
    // freem.updateFarm(boe)
  }
  const ChallengeLowButton = () => {
    //toon waarschuwing als het een niet manueel toegekende challenge had
    //  Object[] options = { "YES", "NO" }; // geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
    let newFarms = [...farms]
    let newFarm = newFarms[index].copy()

    // TODO: Add warning for challenge
    //  if ((newFarm.hasChallengeRandomizations()>0)&&(JOptionPane.showOptionDialog(null, "This Farm (or some cows in it) are involved in a Randomization concerning the Challenge! If you proceed, the whole randomization will be undone. Are you sure?", "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0])==JOptionPane.NO_OPTION)) {
    //        //hierin doen we dus niks
    //        }
    // else {boe.setChallenge(false,null);}//of ze had nog niks, oftwas manueel,of ze hebben Yes geklikt
    newFarm.setChallenge(false, null)
    newFarms[index] = newFarm
    setFarms(newFarms)
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
      <FirstBox>
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
      </FirstBox>

      <MiddleBox>
        <div className="flex justify-center">
          <div>
            <div className="dropdown relative">
              <button
                className="
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown button
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="caret-down"
                  className="w-2 ml-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  ></path>
                </svg>
              </button>
              <ul
                className="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a
                    className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                    href="#"
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                    href="#"
                  >
                    Another action
                  </a>
                </li>
                <li>
                  <a
                    className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                    href="#"
                  >
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MiddleBox>
      <SecondBox>
        {props.farmId ? (
          <img src={path + 'farm' + props.farmId + '.jpg'} />
        ) : (
          <img src={path + 'farm1342.jpg'} />
        )}
      </SecondBox>
    </>
  )
}

export default ButtonPage
