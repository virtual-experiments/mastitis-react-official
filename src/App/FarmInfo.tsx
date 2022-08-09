import React, { useState, createRef, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import type { AppState } from '../dataStructure'
// import { recoilState } from '../dataStructure'
import styled from 'styled-components'

import { Layout } from './style'

interface Props {
  todo?: string
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

const FarmInfo: React.FC<Props> = ({ todo }) => {
  // const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const editInput = createRef<HTMLInputElement>()
  const init: State = { onEdit: false }
  const [state, setState] = useState(init)

  return (
    <Centered>
      <div>Farmnumber</div>
      <div>BNO</div>
      <div>AAmilk</div>
      <div>number of cows</div>
      <table>
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
      </table>
    </Centered>
  )
}

export default FarmInfo
