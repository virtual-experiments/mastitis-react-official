import React, { useState, createRef, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { AppState, experimentState, farmState } from '../dataStructure'
// import { recoilState } from '../dataStructure'
import styled from 'styled-components'

import { Layout } from './style'
import { Farm } from '../Datalayer/Farm'
import { Cow } from '../Datalayer/Cow'

interface FarmProps {
  farmId?: string
}

interface CowProps {
  farmId?: string
  cowId?: string
}
interface State {
  onEdit: boolean
}

const Centered = styled.div`
  text-align: center;
  border-bottom: 6px solid black;

  table {
    margin-left: auto;
    margin-right: auto;
  }
`

export const FarmInfo: React.FC<FarmProps> = (farm: FarmProps) => {
  // const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  let farms = useRecoilValue(farmState)
  let selectedFarm = farms.find((f: Farm) =>
    farm.farmId?.includes(f.getFarmID())
  )
  return (
    <Centered>
      <div>Farm number: {selectedFarm?.getFarmID()}</div>
      <div>BNO: {selectedFarm?.getBNO()}</div>
      <div>AAmilk?: {selectedFarm?.getAAmilk() ? 'True' : 'False'}</div>
      <div>
        The number of cows participating in the experiment:{' '}
        {selectedFarm?.numberOfParticipatingCows()}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Number of Vaccinated Cows:</th>
            <th>Number of NOT Vaccinated Cows:</th>
          </tr>
          <tr>
            <td>Number of High Challenges:</td>
            <td>{selectedFarm!.numberOfVacinatedHighChallengeCows()}</td>
            <td>{selectedFarm!.numberOfNOTVacinatedHighChallengeCows()}</td>
          </tr>
          <tr>
            <td>Number of Low Challenges:</td>
            <td>{selectedFarm!.numberOfVacinatedLowChallengeCows()}</td>
            <td>{selectedFarm!.numberOfNOTVacinatedLowChallengeCows()}</td>
          </tr>
        </tbody>
      </table>
    </Centered>
  )
}

export const CowInfo: React.FC<CowProps> = (props: CowProps) => {
  // const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  let farms = useRecoilValue(farmState)
  let selectedFarm = farms.find((f: Farm) =>
    props.farmId?.includes(f.getFarmID())
  )

  let selectedCow = selectedFarm
    ?.getCows()
    .find((c: Cow) => c.getCowID() === props.cowId)

  const getVaccinationInfo = (c: Cow): string => {
    if (c.getsVaccin()) {
      //Gets the vaccin
      return 'Gets the vaccin'
    } else if (c.getsNOVaccin()) {
      //Gets NO vaccin
      return 'Gets NO vaccin'
    } else {
      //Vaccin not assigned yet
      return 'Vaccin not assigned yet'
    }
  }

  const getChallengeInfo = (c: Cow): string => {
    if (c.hasHighChallenge()) {
      return 'High Challenge'
    } else {
      if (c.hasLowChallenge()) {
        return 'Low Challenge'
      } else {
        return 'Challenge not assigned yet'
      }
    }
  }

  return (
    <Centered>
      <div>Earnumber: BE{selectedCow?.getCowID()}</div>
      <div>Production: {selectedCow?.initproduction} ml/day</div>
      <div>Parity: {selectedCow?.getParity()}</div>
      <div>Days in lactation: {selectedCow?.getDays()}</div>
      {selectedCow?.isParticipating() ? (
        <>
          <div>Participates !</div>
          <div>{getVaccinationInfo(selectedCow)}</div>
          <div>{getChallengeInfo(selectedCow)}</div>
        </>
      ) : (
        <div>Does NOT participate!</div>
      )}
    </Centered>
  )
}

export const RegionInfo: React.FC = () => {
  // const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  let experiment = useRecoilValue(experimentState)
  return (
    <Centered>
      <div>
        The number of cows in the experiment:{' '}
        {experiment.numberOfParticipatingCows()}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Number of Vaccinated Cows:</th>
            <th>Number of NOT Vaccinated Cows:</th>
          </tr>
          <tr>
            <td>Number of High Challenges:</td>
            <td>{experiment.numberOfVacinatedHighChallengeCows()}</td>
            <td>{experiment.numberOfNOTVacinatedHighChallengeCows()}</td>
          </tr>
          <tr>
            <td>Number of Low Challenges:</td>
            <td>{experiment.numberOfVacinatedLowChallengeCows()}</td>
            <td>{experiment.numberOfNOTVacinatedLowChallengeCows()}</td>
          </tr>
        </tbody>
      </table>
    </Centered>
  )
}
