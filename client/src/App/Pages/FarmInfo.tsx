import React from 'react'
import Box from '@mui/material/Box'
import { useRecoilValue } from 'recoil'
import { Farm } from '../../Datalayer/Farm'
import { farmState } from '../../dataStructure'
import styled from 'styled-components'

interface FarmProps {
  farmId: string
}

const Centered = styled.div`
  table {
    margin-left: auto;
    margin-right: auto;
  }
`

let borderType = '1px solid'
let padding = 10

/**
 * Info on the status of the selected farm.
 * @param props farmId: id of the corresponding farm
 * @returns react component
 */
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
