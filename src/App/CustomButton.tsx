import React from 'react'
import Button from '@mui/material/Button'

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
