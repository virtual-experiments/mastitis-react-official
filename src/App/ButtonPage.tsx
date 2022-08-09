import React, { useState, createRef, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import type { AppState } from '../dataStructure'
// import { recoilState } from '../dataStructure'
import styled from 'styled-components'
import { AppProps } from '..'

//const logo = require('images/farm1342.jpg')

interface Props {
  todo?: string
}

interface State {
  onEdit: boolean
}

const Button = styled.button`
  background-color: gray;
  color: white;
  font-size: 10px;
  padding: 10px 10px;
  margin: 5px 0px;
  width: 250px;
  cursor: pointer;
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

const FlexBox = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 40px auto 0 auto;
  justify-content: space-between;
`

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

const ButtonPage: React.FC<ButtonPageProps> = (props) => {
  //   const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const path = 'images/'
  const editInput = createRef<HTMLInputElement>()
  const init: State = { onEdit: false }
  const [state, setState] = useState(init)
  console.log(path + props.farmId + '.jpg')
  return (
    <FlexBox>
      <FirstBox>
        <div>
          <Button
            onClick={() => {
              console.log('clicked')
            }}
          >
            Add all cows to experiment
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              console.log('clicked')
            }}
          >
            Remove all cows out of experiment
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              console.log('clicked')
            }}
          >
            Give the vaccine
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              console.log('clicked')
            }}
          >
            Give no vaccine
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              console.log('clicked')
            }}
          >
            Set Challenge High
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              console.log('clicked')
            }}
          >
            Set Challenge Low
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              console.log('clicked')
            }}
          >
            Put in randomizer
          </Button>
        </div>
      </FirstBox>
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
    </FlexBox>
  )
}

export default ButtonPage
