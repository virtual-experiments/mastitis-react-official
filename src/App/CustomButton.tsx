import React from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

// const CustomButton = styled(Button)(({ theme }) => ({
//   textAlign: 'center',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   // lineHeight: '60px',
//   // padding: 20,
// }))

export type ButtonProps = {
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}

export function CustomButton(props: ButtonProps) {
  return (
    <Button
      size="large"
      variant="contained"
      //   style={{ backgroundColor: '#64748B' }}
      //   color="#64748B"
      onClick={props.onClick}
      disabled={props.disabled}
      sx={{ width: '300px', borderRadius: 0.5 }}
    >
      {props.children}
    </Button>
  )
}
