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

interface Props {
  path: Routes
}

const App: React.FC<Props & RouteComponentProps> = ({ path }) => {
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
          <Sidebar path={path} />
        </div>
        <div className="rightContent">
          <section className="todoapp">
            <FarmInfo />
            <ButtonPage />
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
