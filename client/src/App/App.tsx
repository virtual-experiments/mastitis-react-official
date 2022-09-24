import { navigate, Redirect, RouteComponentProps } from '@reach/router'
import React from 'react'

import Sidebar from './TreeView/Sidebar'
import { RegionInfo } from './Pages/RegionInfo'
import FarmButtonPage from './Pages/FarmButtonPage'
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
import { RandomizerPage } from './Pages/RandomizerPage'
import { RandomizerInfo } from './Pages/RandomizerInfo'
import { FarmInfo } from './Pages/FarmInfo'
import { CowInfo } from './Pages/CowInfo'
import { NotFound } from '../NotFound'
import { useRecoilValue } from 'recoil'
import { idState } from '../dataStructure'
import { Login } from './Login/Login'

const elev = 0
const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  // lineHeight: '60px',
  padding: 20,
}))

export const App: React.FC<AppProps & RouteComponentProps> = (props) => {
  const id = useRecoilValue(idState)

  console.log('Id: ' + id)
  // const appState = useRecoilValue<AppState>(recoilState)

  // // if appState has changes, save it LocalStorage.
  // useEffect((): void => {
  //   window.localStorage.setItem(
  //     LocalStorageKey.APP_STATE,
  //     JSON.stringify(appState) // convert JavaScript Object to string
  //   )
  // }, [appState])

  const getTopView = (props: AppProps): JSX.Element => {
    if (props.path === '/') {
      return <RegionInfo />
    } else if (props.path === '/randomizer') {
      return <RandomizerInfo />
    } else if (props.cowId && props.farmId) {
      return <CowInfo farmId={props.farmId} cowId={props.cowId} />
    } else if (props.farmId) {
      return <FarmInfo farmId={props.farmId} />
    }
    return <NotFound />
  }

  const getBottomView = (props: AppProps): JSX.Element => {
    if (props.path === '/') {
      return <img src={'images/kaart.jpg'} />
    } else if (props.path === '/randomizer') {
      return <RandomizerPage />
    } else if (props.cowId && props.farmId) {
      return <CowButtonPage farmId={props.farmId} cowId={props.cowId} />
    } else if (props.farmId) {
      return <FarmButtonPage farmId={props.farmId} />
    }
    return <NotFound />
  }

  const drawerWidth = 300
  if (id === '') {
    return <Login />
  } else {
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
}
