import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import Box from '@mui/material/Box'

import { experimentState } from '../../dataStructure'

const Centered = styled.div`
  table {
    margin-left: auto;
    margin-right: auto;
  }
`

let borderType = '1px solid'
let padding = 10
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
