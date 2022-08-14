import React from 'react'
import { useRecoilValue } from 'recoil'

import { experimentState, farmState } from '../../dataStructure'

import styled from 'styled-components'
import { Cow } from '../../Datalayer/Cow'
import Box from '@mui/material/Box'
import { Farm } from '../../Datalayer/Farm'

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
  table {
    margin-left: auto;
    margin-right: auto;
    // borderspacing: '4px 4px';
  }
`
let borderType = '1px solid'
let padding = 10

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
      <Box sx={{ height: 10 }}> </Box>
      <table style={{ borderSpacing: '0px 0px' }}>
        <tbody>
          <tr>
            <th
              style={{ borderBottom: borderType, borderRight: borderType }}
            ></th>
            {/* <th style={{'border-right': '2px dashed'  'border-bottom': '2px dashed'}}> */}
            <th
              style={{
                borderBottom: borderType,
                padding: padding,
              }}
            >
              Number of Vaccinated Cows:
            </th>
            <th
              style={{
                borderBottom: borderType,
                padding: padding,
              }}
            >
              Number of NOT Vaccinated Cows:
            </th>
          </tr>
          <tr>
            <th
              style={{
                borderRight: borderType,
                padding: padding,
              }}
            >
              Number of High Challenges:
            </th>
            <td>{selectedFarm!.numberOfVacinatedHighChallengeCows()}</td>
            <td>{selectedFarm!.numberOfNOTVacinatedHighChallengeCows()}</td>
          </tr>
          <tr>
            <th style={{ borderRight: borderType, padding: padding }}>
              Number of Low Challenges:
            </th>
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
    <>
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
    </>
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
      <Box sx={{ height: 10 }}> </Box>
      <table style={{ borderSpacing: '0px 0px' }}>
        <tbody>
          <tr>
            <th
              style={{ borderBottom: borderType, borderRight: borderType }}
            ></th>
            <th
              style={{
                borderBottom: borderType,
                padding: padding,
              }}
            >
              Number of Vaccinated Cows:
            </th>
            <th
              style={{
                borderBottom: borderType,
                padding: padding,
              }}
            >
              Number of NOT Vaccinated Cows:
            </th>
          </tr>
          <tr>
            <td style={{ borderRight: borderType, padding: padding }}>
              Number of High Challenges:
            </td>
            <td>{experiment.numberOfVacinatedHighChallengeCows()}</td>
            <td>{experiment.numberOfNOTVacinatedHighChallengeCows()}</td>
          </tr>
          <tr>
            <td style={{ borderRight: borderType, padding: padding }}>
              Number of Low Challenges:
            </td>
            <td>{experiment.numberOfVacinatedLowChallengeCows()}</td>
            <td>{experiment.numberOfNOTVacinatedLowChallengeCows()}</td>
          </tr>
        </tbody>
      </table>
    </Centered>
  )
}
