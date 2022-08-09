import React, { useState, createRef, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { AppState, farmState } from '../dataStructure'
// import { recoilState } from '../dataStructure'
import styled from 'styled-components'

import { Layout } from './style'
import { Farm } from '../Datalayer/Farm'

interface FarmProps {
  farmId?: string
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

const FarmInfo: React.FC<FarmProps> = (farm: FarmProps) => {
  // const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  let farms = useRecoilValue(farmState)
  let selectedFarm = farms.find((f: Farm) =>
    farm.farmId?.includes(f.getFarmID())
  )
  return (
    <Centered>
      <div>Farmnumber: {selectedFarm?.getFarmID()}</div>
      <div>BNO</div>
      <div>AAmilk</div>
      <div>number of cows</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Vaccinated cows</th>
            <th>Non-Vaccinated cows</th>
          </tr>
          <tr>
            <td>Number of High</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Number of Low</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </Centered>
  )
}

export default FarmInfo
