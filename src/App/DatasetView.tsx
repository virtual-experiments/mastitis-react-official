import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import type { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { Cow } from '../Datalayer/Cow'
import { Farm } from '../Datalayer/Farm'
import { farmState } from '../dataStructure'

function createData(cow: Cow, farm: Farm) {
  return { cow, farm }
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ]

export const DatasetView: React.FC<RouteComponentProps> = () => {
  let farms = useRecoilValue(farmState)
  let data = []
  for (var farm of farms) {
    // data.push(farm.getCows())
    for (var cow of farm.getCows()) {
      if (cow.participates) {
        data.push(createData(cow, farm))
      }
    }

    // data = data.concat(farm.getCows())
  }
  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: 650, maxWidth: 850, maxHeight: 500 }}
    >
      <Table
        style={{ tableLayout: 'auto' }}
        size="small"
        aria-label="a dense table"
        sx={{ flexShrink: 0 }}
      >
        <TableHead>
          <TableRow>
            <TableCell>FarmID</TableCell>
            <TableCell align="right">CowID</TableCell>
            <TableCell align="right">AAmilk</TableCell>
            <TableCell align="right">BNO</TableCell>
            <TableCell align="right">nDayLact</TableCell>
            <TableCell align="right">Parity</TableCell>
            <TableCell align="right">Challenge</TableCell>
            <TableCell align="right">Vaccine</TableCell>
            <TableCell align="right">Initmilk</TableCell>
            <TableCell align="right">Finalmilk</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ cow, farm }) => {
            return (
              <TableRow
                key={cow.getCowID()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {farm.getFarmID()}
                </TableCell>
                <TableCell align="right">{cow.getCowID()}</TableCell>
                <TableCell align="right">
                  {farm.getAAmilk() ? 'TRUE' : 'FALSE'}
                </TableCell>
                <TableCell align="right">{farm.getBNO()}</TableCell>
                <TableCell align="right">{cow.getDays()}</TableCell>
                <TableCell align="right">{cow.getParity()}</TableCell>
                <TableCell align="right">
                  {cow.hasHighChallenge() ? 'HIGH' : 'LOW'}
                </TableCell>
                <TableCell align="right">
                  {cow.getsVaccin() ? 'YES' : 'NO'}
                </TableCell>
                <TableCell align="right">{cow.initproduction}</TableCell>
                <TableCell align="right">{cow.productionafter}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
