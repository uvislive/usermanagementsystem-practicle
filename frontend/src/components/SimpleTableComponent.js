import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box, IconButton, Stack, Typography } from "@mui/material";
// import SkeletonLoader from "../common-pages/SkeletonLoader";
import {
  Create,
  Delete,
  DeleteTwoTone,
  Edit,
  EditAttributes,
  PostAdd,
  Receipt,
  Visibility,
} from "@mui/icons-material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // Add your custom styles for table head cells if needed
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));



const SimpleTableComponent = ({
  columns,
  data,
  onEdit,
  onDelete,
  addIndex,
  addIndexButton,
  viewDoc,
  tableHeading,
  isLoading,
  tableHeaderColor,
  receiptBtn,
  rejectedPayment,
  isActionButtons=true,
}) => {
  const tableData = data;

  const renderActionButtons = (row, rowIndex) => {
      return (
        <>
          {/* <IconButton color="primary" onClick={() => onEdit(rowIndex)}>
            <Visibility fontSize="inherit" />
          </IconButton> */}
          <Button onClick={() => onEdit(row._id)}><Create/></Button>
          <IconButton color="error" onClick={() => onDelete(row._id)}>
            {" "}
            <DeleteTwoTone fontSize="inherit" />
          </IconButton>
        </>
      );
    }


  console.log("table data",tableData)

  // Create a reusable dynamic table cell component
  const DynamicTableCell = ({ align, value }) => {
    return <TableCell align={align}>{value}</TableCell>;
  };
  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
      {tableHeading && (
        <Box
          sx={{
            p: 2,
            backgroundColor: `${
              tableHeaderColor != null ? tableHeaderColor : null
            }`,
            color: `${tableHeaderColor != null ? "white" : "black"}`,
          }}
        >
          <Typography fontWeight="bold" variant="h5" color="inherit">
            {tableHeading}
          </Typography>
        </Box>
      )}
      <Table sx={{ minWidth: 700 }} aria-label="customized table" size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Sr no.</StyledTableCell>
            { columns?.map((column, index) => (
              <StyledTableCell align="justify" key={index}>
                {column}
              </StyledTableCell>
            ))}
              {isActionButtons && <StyledTableCell align="center"> Action</StyledTableCell>}
          </TableRow>
        </TableHead>
        {isLoading ? (
          <TableBody>
            {[...Array(2)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell colSpan={columns.length + 2}>
                  {" "}
                  {/* +2 for Sr no. and Action */}
                  {/* <SkeletonLoader /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {/* Render table rows */}
            {tableData?.length > 0 ? (
              tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {/* set row sr no. */}
                  <StyledTableCell align="left">{++rowIndex}</StyledTableCell>
                  {/* Render table cells */}
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row?.roleId?.name}</StyledTableCell>
                  {/* {Object.keys(row).map(
                    (key) =>
                      key !== "id" && (
                        <DynamicTableCell
                          align="justify"
                          key={key}
                          value={row[key]}
                        />
                      )
                  )} */}
               {isActionButtons  && <DynamicTableCell
                    align="center"
                    value={renderActionButtons(row, rowIndex)}
                  />}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default SimpleTableComponent;