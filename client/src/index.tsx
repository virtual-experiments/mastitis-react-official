import { Redirect, Router } from '@reach/router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { App } from './App/App'
import { Login } from './App/Login/Login'

// import App from './App/App'
import ErrorBoundary from './ErrorBoundary'
import { NotFound } from './NotFound'

export interface AppProps {
  path: string
  farmId?: string
  cowId?: string
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <ErrorBoundary>
    <RecoilRoot>
      <Router>
        <Login path="/login" />
        <App path="/" />
        <App path="/randomizer" />
        <App path="/:farmId" />
        <App path="/:farmId/:cowId" />
        <NotFound default />
        <Redirect from="/" to="/login" noThrow />
      </Router>
    </RecoilRoot>
  </ErrorBoundary>
)
