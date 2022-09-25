import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu, { MenuProps } from '@mui/material/Menu'
import { alpha, Backdrop, Button, styled } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { navigate } from '@reach/router'
import { DatasetView } from './DatasetView'
import { About } from './About'
import { Feedback } from './Feedback'
import { experimentState, farmState } from '../../dataStructure'
import { useRecoilState } from 'recoil'
import { ExperimentDialog } from './ExperimentDialog'
import { Help } from './Help'
import { Strategy } from './Strategy'
import { postFarmsToServer } from '../Util/api'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

export function MenuAppBar() {
  let [experiment, setExperiment] = useRecoilState(experimentState)
  let [farms, setFarms] = useRecoilState(farmState)

  // MENU 1
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null)
  const open1 = Boolean(anchorEl1)
  const handleClick1 = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl1(event.currentTarget)
  const handleClose1 = () => setAnchorEl1(null)

  // MENU 2
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null)
  const open2 = Boolean(anchorEl2)
  const handleClick2 = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl2(event.currentTarget)
  const handleClose2 = () => setAnchorEl2(null)

  // DATASET BACKDROP
  const [openDataset, setOpenDataset] = React.useState(false)
  const [content, setContent] = React.useState('')
  const handleDatasetClick = () => {
    setOpenDataset(!openDataset)
  }
  const handleDatasetClose = () => {
    setOpenDataset(false)
  }

  // RUN
  const runExperiment = () => {
    let newExperiment = experiment.copy()
    let newFarms = newExperiment.run(farms)
    setExperiment(newExperiment)
    setFarms(newFarms)
    handleDatasetClick()
    setContent('Experiment')

    postFarmsToServer(newFarms)
  }

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar variant="dense">
        <Typography variant="h6" component="div">
          MASTITIS
        </Typography>
        <div style={{ width: '40px' }} />
        <Button
          id="demo-customized-button"
          aria-controls={anchorEl1 ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl1 ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick1}
          endIcon={open1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        >
          View
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl1}
          open={open1}
          onClose={handleClose1}
        >
          <MenuItem
            onClick={() => {
              handleClose1()
              navigate('/randomizer')
            }}
            disableRipple
          >
            Randomizer
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose1()
              handleDatasetClick()
              setContent('Dataset')
            }}
            disableRipple
          >
            Dataset
          </MenuItem>
        </StyledMenu>
        <div style={{ width: '40px' }} />
        <Button
          id="demo-customized-button"
          aria-controls={anchorEl2 ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl2 ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick2}
          endIcon={open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        >
          Help
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
        >
          <MenuItem
            onClick={() => {
              handleClose2()
              handleDatasetClick()
              setContent('About')
            }}
            disableRipple
          >
            About
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose2()
              handleDatasetClick()
              setContent('Help')
            }}
            disableRipple
          >
            Applet Help
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose2()
              handleDatasetClick()
              setContent('Strategy')
            }}
            disableRipple
          >
            Strategy
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose2()
              handleDatasetClick()
              setContent('Feedback')
            }}
            disableRipple
          >
            Feedback
          </MenuItem>
        </StyledMenu>
        <div style={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          variant="outlined"
          disableElevation
          size="large"
          onClick={runExperiment}
        >
          Run
        </Button>
      </Toolbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openDataset}
        onClick={handleDatasetClose}
      >
        {content === 'Dataset' ? (
          <DatasetView />
        ) : content === 'About' ? (
          <About />
        ) : content === 'Feedback' ? (
          <Feedback />
        ) : content === 'Experiment' ? (
          <ExperimentDialog />
        ) : content === 'Help' ? (
          <Help />
        ) : (
          <Strategy />
        )}
      </Backdrop>
    </AppBar>
  )
}
