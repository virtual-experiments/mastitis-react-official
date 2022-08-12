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
// import styled from 'styled-components'
import { CowButtonPage } from './CowButtonPage'
import { MenuAppBar } from './Appbar'

import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { Stack } from '@mui/system'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

interface Props {
  path: string
}

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  // lineHeight: '60px',
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar variant="dense" />
        {props.path === '/' ? (
          <>
            <Stack spacing={2} divider={<Divider flexItem />}>
              <Item elevation={3}>
                <RegionInfo />
              </Item>
              <Item elevation={3}>
                <img src={'images/kaart.jpg'} />
              </Item>
            </Stack>
          </>
        ) : (
          <>
            {props.cowId ? (
              <>
                <Stack spacing={2} divider={<Divider flexItem />}>
                  <Item elevation={3}>
                    <CowInfo farmId={props.farmId} cowId={props.cowId} />
                  </Item>
                  <Item elevation={3}>
                    <CowButtonPage farmId={props.farmId} cowId={props.cowId} />
                  </Item>
                </Stack>
              </>
            ) : (
              <>
                <Stack spacing={2} divider={<Divider flexItem />}>
                  <Item elevation={3}>
                    <FarmInfo farmId={props.farmId} />
                  </Item>
                  <Item elevation={3}>
                    <ButtonPage farmId={props.farmId} />
                  </Item>
                </Stack>
              </>
            )}
          </>
        )}
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Box>
    </Box>
    // <Layout>
    //   <ResponsiveAppBar />
    //   <div className="column-layout">
    //     <div className="leftContent">
    //       <Sidebar path={props.uri!} />
    //     </div>
    //     <div className="rightContent">
    //       {/* <div></div> */}

    // {props.path === '/' ? (
    //   <>
    //     <RegionInfo />
    //     <FlexBox>
    //       <img src={'images/kaart.jpg'} />
    //     </FlexBox>
    //   </>
    // ) : (
    //   <>
    //     {props.cowId ? (
    //       <>
    //         <CowInfo farmId={props.farmId} cowId={props.cowId} />
    //         <FlexBox>
    //           <CowButtonPage farmId={props.farmId} cowId={props.cowId} />
    //         </FlexBox>
    //       </>
    //     ) : (
    //       <>
    //         <FarmInfo farmId={props.farmId} />
    //         <FlexBox>
    //           <ButtonPage farmId={props.farmId} />
    //         </FlexBox>
    //       </>
    //     )}
    //   </>
    // )}
    //     </div>
    //   </div>
    // </Layout>
  )
}

export default App
