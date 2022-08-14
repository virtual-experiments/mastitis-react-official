import { Router } from '@reach/router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import App from './App'
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
        <App path="/" />
        {/* <App path="/region" /> */}
        <App path="/randomizer" />
        <App path="/:farmId" />
        <App path="/:farmId/:cowId" />
        <NotFound default />
      </Router>
    </RecoilRoot>
  </ErrorBoundary>
)
