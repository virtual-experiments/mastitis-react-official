import {
  Box,
  Button,
  FormControl,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { navigate, RouteComponentProps } from '@reach/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import { idState } from '../../dataStructure'

export const Login: React.FC<RouteComponentProps> = (props) => {
  let [id, setId] = useRecoilState(idState)

  const [name, setName] = React.useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const updateId = () => {
    setId(name)
  }

  return (
    // <Box justifyContent="center" display="flex" alignItems="center">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '99%',
        position: 'absolute',
      }}
    >
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h4">Mastitis</Typography>
          {/* <Typography paragraph={true} variant="body1">
          Enter your ID in the field below to continue to the application.
        </Typography> */}
          <TextField
            id="outlined-helperText"
            label="Your ID"
            value={name}
            onChange={handleChange}
          />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              updateId()
            }}
          >
            Sumbit
          </Button>
        </Stack>
      </Paper>
    </div>
  )
}
