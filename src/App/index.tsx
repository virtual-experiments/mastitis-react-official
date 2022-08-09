import type { RouteComponentProps } from '@reach/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import type { AppState, Routes } from '../dataStructure'
import { LocalStorageKey } from '../dataStructure'

import Copyright from './Copyright'
import { Layout } from './style'
import Sidebar from './Sidebar'
import FarmInfo from './FarmInfo'
import ButtonPage from './ButtonPage'
import { AppProps } from '..'

interface Props {
  path: string
}

const App: React.FC<AppProps & RouteComponentProps> = (props) => {
  // const appState = useRecoilValue<AppState>(recoilState)

  // // if appState has changes, save it LocalStorage.
  // useEffect((): void => {
  //   window.localStorage.setItem(
  //     LocalStorageKey.APP_STATE,
  //     JSON.stringify(appState) // convert JavaScript Object to string
  //   )
  // }, [appState])
  console.log(props)

  return (
    <Layout>
      <div className="column-layout">
        <div className="leftContent">
          <Sidebar path={props.uri!} />
        </div>
        <div className="rightContent">
          <section className="todoapp">
            {props.path === '/' ? (
              <div>Region View</div>
            ) : (
              <>
                <FarmInfo farmId={props.farmId} />
                <ButtonPage farmId={props.farmId} cowId={props.cowId} />
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
