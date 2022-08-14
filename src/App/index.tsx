import type { RouteComponentProps } from '@reach/router'
import React, { useEffect } from 'react'

import Sidebar from './TreeView/Sidebar'
import { CowInfo, FarmInfo, RegionInfo } from './Pages/ObjectInfo'
import ButtonPage from './Pages/ButtonPage'
import { AppProps } from '..'
import { CowButtonPage } from './Pages/CowButtonPage'
import { Stack } from '@mui/system'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { MenuAppBar } from './Appbar/Appbar'
import { RandomizerTopPage, RandomizerPage } from './Pages/RandomizerPage'

interface Props {
  path: string
}

const elev = 0
const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  // lineHeight: '60px',
  padding: 20,
}))

const App: React.FC<AppProps & RouteComponentProps> = (props) => {
  // const appState = useRecoilValue<AppState>(recoilState)

  // // if appState has changes, save it LocalStorage.
  // useEffect((): void => {
  //   window.localStorage.setItem(
  //     LocalStorageKey.APP_STATE,
  //     JSON.stringify(appState) // convert JavaScript Object to string
  //   )
  // }, [appState])

  const getTopView = (props: AppProps) => {
    if (props.path === '/') {
      return <RegionInfo />
    } else if (props.path === '/randomizer') {
      return <RandomizerTopPage />
    } else if (props.cowId) {
      return <CowInfo farmId={props.farmId} cowId={props.cowId} />
    } else {
      return <FarmInfo farmId={props.farmId} />
    }
  }

  const getBottomView = (props: AppProps) => {
    if (props.path === '/') {
      return <img src={'images/kaart.jpg'} />
    } else if (props.path === '/randomizer') {
      return <RandomizerPage />
    } else if (props.cowId) {
      return <CowButtonPage farmId={props.farmId} cowId={props.cowId} />
    } else {
      return <ButtonPage farmId={props.farmId} />
    }
  }

  const drawerWidth = 300
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <MenuAppBar />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar variant="dense" />
        <Box sx={{ overflow: 'auto' }}>
          <Sidebar path={props.uri!} />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar variant="dense" />
        <Stack spacing={2} divider={<Divider flexItem />}>
          <Item elevation={elev}>{getTopView(props)}</Item>
          <Item elevation={elev}>{getBottomView(props)}</Item>
        </Stack>
      </Box>
    </Box>
  )
}

export default App
