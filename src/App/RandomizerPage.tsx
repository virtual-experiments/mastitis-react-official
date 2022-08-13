import React, { useState, createRef, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
// import './styles.scss'

import {
  AppState,
  experimentState,
  farmState,
  randomizationsState,
  selectionState,
} from '../dataStructure'
// import { recoilState } from '../dataStructure'
import styled from 'styled-components'
import { Cow } from '../Datalayer/Cow'
import { Farm } from '../Datalayer/Farm'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { Container } from '@mui/system'
import Button from '@mui/material/Button'
import { CustomButton } from './CustomButton'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { Grid, TextField } from '@mui/material'
import { Randomization } from '../Datalayer/Randomization'
import { navigate } from '@reach/router'

//const logo = require('images/farm1342.jpg')

interface Props {
  todo?: string
}

interface State {
  onEdit: boolean
}

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

export const RandomizerTopPage: React.FC = () => {
  let randomization = useRecoilValue(randomizationsState)[0]
  let str = '' //hier ook terug wegdoenzonder Jpanel
  str +=
    "You've selected " +
    randomization.size().toString() +
    ' ' +
    randomization.mode()

  let data = randomization.getData()
  let res: string[] = []
  if (data.length != 0) {
    for (var koeOrfarm of data) {
      let tempStr = ''
      //welke mode
      if (koeOrfarm instanceof Cow) {
        tempStr += koeOrfarm.toString()
        if (
          koeOrfarm.getsVaccin() ||
          koeOrfarm.getsNOVaccin() ||
          koeOrfarm.hasHighChallenge() ||
          koeOrfarm.hasLowChallenge()
        ) {
          tempStr += ' !!! WARNING !! allready assigned some properties'
        }
      } else {
        //welke mode
        tempStr += koeOrfarm.toString()
        //hier moeten dus eventueel de andere details ook afgeprint worden
      }
      //hier moeten dus eventueel de andere details ook afgeprint worden
      res.push(tempStr)
    }
  }
  return (
    <>
      <div>{str}</div>
      {res.map((val: string) => {
        return <div>{val}</div>
      })}
    </>
  )
}

export const RandomizerPage: React.FC = () => {
  //   const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const path = 'images/'

  let [farms, setFarms] = useRecoilState(farmState)
  let [randomizations, setRandomizations] = useRecoilState(randomizationsState)
  let randomization = randomizations[0]
  let [experiment, setExperiment] = useRecoilState(experimentState)

  let [formValue, setFormValue] = useState('vaccines')
  let [amount1, setAmount1] = useState(0)
  let [amount2, setAmount2] = useState(0)
  let [amount3, setAmount3] = useState(0)

  const dropdownList = (max: number) => {
    const arr = []
    arr.push(0)
    for (let i = 1; i <= max; i++) {
      arr.push(i)
    }

    return arr.map((option, index) => (
      <MenuItem value={option}>{option}</MenuItem>
    ))
  }

  const FirstView = () => {
    return (
      <>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Choose what you want to randomize:
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            style={{ justifyContent: 'center' }}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              value: string
            ) => {
              setFormValue(event.target.value)
            }}
            value={formValue}
          >
            <FormControlLabel
              value="vaccines"
              control={<Radio />}
              label="Vaccines only"
            />
            <FormControlLabel
              value="challenges"
              control={<Radio />}
              label="Challenges"
            />
            <FormControlLabel value="both" control={<Radio />} label="Both" />
          </RadioGroup>
        </FormControl>
      </>
    )
  }

  const VaccineView = () => {
    let remaining = randomization.size() - amount1 //randomization
    return (
      <>
        <Grid item>
          <FormControl>
            <InputLabel id="demo-simple-select-label1">
              # of Vaccines
            </InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select"
              value={amount1}
              label="# of Vaccines"
              onChange={(e, child) => {
                setAmount1(e.target.value as number)
              }}
              style={{ width: selectLength }}
            >
              {dropdownList(amount1 + remaining)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              disabled
              id="Outline-disabled"
              label="# of No Vaccines"
              style={{ width: selectLength }}
              defaultValue={remaining}
            />
          </FormControl>
        </Grid>
      </>
    )
  }

  const ChallengeView = () => {
    let remaining = randomization.size() - amount1 //randomization
    return (
      <>
        <Grid item>
          <FormControl>
            <InputLabel id="demo-simple-select-label1">
              # of High Challenges
            </InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select"
              value={amount1}
              label="# of High Challenges"
              onChange={(e, child) => {
                setAmount1(e.target.value as number)
              }}
              style={{ width: selectLength }}
            >
              {dropdownList(amount1 + remaining)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              disabled
              id="Outline-disabled"
              label="# of Low Challenges"
              style={{ width: selectLength }}
              defaultValue={remaining}
            />
          </FormControl>
        </Grid>
      </>
    )
  }

  const BothView = () => {
    let remaining = randomization.size() - amount1 - amount2 - amount3 //randomization
    return (
      <>
        <Grid item>
          <FormControl>
            <InputLabel id="demo-simple-select-label1">
              # of No Vaccine - High Challenge
            </InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select"
              value={amount1}
              label="# of No Vaccine - High Challenge"
              onChange={(e, child) => {
                setAmount1(e.target.value as number)
              }}
              style={{ width: selectLength }}
            >
              {dropdownList(amount1 + remaining)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="demo-simple-select-label1">
              # of Vaccine - High Challenge
            </InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select"
              value={amount2}
              label="# of Vaccine - High Challenge"
              onChange={(e, child) => {
                setAmount2(e.target.value as number)
              }}
              style={{ width: selectLength }}
            >
              {dropdownList(amount2 + remaining)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="demo-simple-select-label1">
              # of No Vaccine - Low Challenge
            </InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select"
              value={amount3}
              label="# of No Vaccine - Low Challenge"
              onChange={(e, child) => {
                setAmount3(e.target.value as number)
              }}
              style={{ width: selectLength }}
            >
              {dropdownList(amount3 + remaining)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              disabled
              id="Outline-disabled"
              label="# of Vaccine - Low Challenge"
              style={{ width: selectLength }}
              defaultValue={remaining}
            />
          </FormControl>
        </Grid>
      </>
    )
  }

  let selectLength = 210
  let space = 6
  return (
    <>
      <Box justifyContent="center" display="flex">
        <Stack spacing={2}>
          <FirstView />

          <Grid
            sx={{ width: selectLength * 2 + space * 20 }}
            container
            spacing={space}
          >
            {formValue === 'vaccines' ? (
              <VaccineView />
            ) : formValue === 'challenges' ? (
              <ChallengeView />
            ) : (
              <BothView />
            )}
          </Grid>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="end"
            // display="flex"
          >
            <Button
              variant="contained"
              onClick={() => {
                let newExp = experiment.copy()
                let newRan = randomization.copy()
                let succes = false
                if (formValue === 'vaccines') {
                  if (newRan.randomizeV(amount1, newExp)) {
                    // SUCCESS!
                    succes = true
                  }
                } else if (formValue === 'challenges') {
                  if (newRan.randomizeC(amount1, newExp)) {
                    // SUCCESS!
                    succes = true
                  }
                } else {
                  //randomize both
                  if (newRan.randomizeVC(amount1, amount2, amount3, newExp)) {
                    // SUCCESS!
                    succes = true
                  }
                }

                if (succes) {
                  let newRands = [...randomizations]
                  newRands[0] = newRan
                  setRandomizations([new Randomization(), ...newRands])
                  setExperiment(newExp)
                  navigate('/')
                }
              }}
            >
              Randomize
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setAmount1(0)
                setAmount2(0)
                setAmount3(0)
              }}
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
