import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(when: string, name: string) {
  return { when, name };
}

const rows = [
  createData('2021年3月15日～2021年3月26日', 'Open Hack U 2020 Online Vol.5'),
  createData('2021年3月15日～2021年3月26日', 'Open Hack U 2020 Online Vol.5'),
  createData('2021年3月15日～2021年3月26日', 'Open Hack U 2020 Online Vol.5'),
  createData('2021年3月15日～2021年3月26日', 'Open Hack U 2020 Online Vol.5'),
  createData('2021年3月15日～2021年3月26日', 'Open Hack U 2020 Online Vol.5'),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>期間</StyledTableCell>
            <StyledTableCell>イベント名</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.when}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
