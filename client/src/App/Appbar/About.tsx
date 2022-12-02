import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/system/Box'

/**
 * Explanation of the application
 * @returns React component
 */
export const About = () => {
  let padding = 5
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4">About</Typography>
      <Box sx={{ height: 5 }} />
      <table>
        <tr>
          <td
            style={{
              padding: padding,
            }}
          >
            Project Name:
          </td>
          <td>VIRTEX</td>
        </tr>
        <tr>
          <td
            style={{
              padding: padding,
            }}
          >
            Applet Name:
          </td>
          <td>Mastitis Version 3.0</td>
        </tr>

        <tr>
          <td
            style={{
              padding: padding,
            }}
          >
            Project Promotor:
          </td>
          <td>Prof. Paul Darius and Prof. Luc Duchateau</td>
        </tr>
        <tr>
          <td
            style={{
              padding: padding,
            }}
          >
            Author:
          </td>
          <td>Liesbeth Lievens and Tim De Bauw</td>
        </tr>
        <tr>
          <td
            style={{
              padding: padding,
            }}
          >
            Last Modification:
          </td>
          <td>13/08/2022</td>
        </tr>
      </table>
      <Box sx={{ height: 5 }} />
      <div>Copyright (c) 2002-2022</div>
      <div>Ghent University and Katholieke Universiteit Leuven</div>
    </Paper>
  )
}
