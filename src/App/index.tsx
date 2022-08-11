import type { RouteComponentProps } from '@reach/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import type { AppState, Routes } from '../dataStructure'
import { LocalStorageKey } from '../dataStructure'

import Copyright from './Copyright'
import { Layout } from './style'
import Sidebar from './Sidebar'
import { CowInfo, FarmInfo, RegionInfo } from './ObjectInfo'
import ButtonPage from './ButtonPage'
import { AppProps } from '..'
import styled from 'styled-components'
import { CowButtonPage } from './CowButtonPage'

interface Props {
  path: string
}

const FlexBox = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 40px auto 0 auto;
  justify-content: space-between;
`

const App: React.FC<AppProps & RouteComponentProps> = (props) => {
  // const appState = useRecoilValue<AppState>(recoilState)

  // // if appState has changes, save it LocalStorage.
  // useEffect((): void => {
  //   window.localStorage.setItem(
  //     LocalStorageKey.APP_STATE,
  //     JSON.stringify(appState) // convert JavaScript Object to string
  //   )
  // }, [appState])
  return (
    <Layout>
      <div className="column-layout">
        <div className="leftContent">
          <Sidebar path={props.uri!} />
        </div>
        <div className="rightContent">
          {/* <div></div> */}
          <section className="todoapp">
            {props.path === '/' ? (
              <>
                <RegionInfo />
                <FlexBox>
                  <img src={'images/kaart.jpg'} />
                </FlexBox>
              </>
            ) : (
              <>
                {props.cowId ? (
                  <>
                    <CowInfo farmId={props.farmId} cowId={props.cowId} />
                    <FlexBox>
                      <CowButtonPage
                        farmId={props.farmId}
                        cowId={props.cowId}
                      />
                    </FlexBox>
                  </>
                ) : (
                  <>
                    <FarmInfo farmId={props.farmId} />
                    <FlexBox>
                      <ButtonPage farmId={props.farmId} />
                    </FlexBox>
                  </>
                )}
              </>
            )}

            {/* <NewTodoInput />
          {appState.todoList.length ? (
            <>
              <TodoList path={path} />
              <UnderBar path={path} />
            </>
          ) : null} */}
          </section>
          {/* <Copyright /> */}
        </div>
      </div>
    </Layout>
  )
}

export default App
