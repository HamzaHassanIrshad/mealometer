import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    border: "1px solid #ddd",
    "& th": {
      border: "1px solid #ddd",
      background: "#f2f2f2",
      padding: "8px",
      minWidth: "200px",
    },
    "& td": {
      border: "1px solid #ddd",
      padding: "8px",
      minWidth: "100px",
    },
  },
});

export const createData = (name, amount, calories, proteins, carbs, fats) => {
  const numericAmount = parseFloat(amount);
  const updatedCalories = (calories * numericAmount).toFixed(2);
  const updatedProteins = (proteins * numericAmount).toFixed(2);
  const updatedCarbs = (carbs * numericAmount).toFixed(2);
  const updatedFats = (fats * numericAmount).toFixed(2);

  return {
    name,
    amount: numericAmount,
    calories: parseFloat(updatedCalories),
    proteins: parseFloat(updatedProteins),
    carbs: parseFloat(updatedCarbs),
    fats: parseFloat(updatedFats),
  };
};

const NutrientTable = ({ foodEntries }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Food</TableCell>
            <TableCell align="center">Calories&nbsp;(kcal)</TableCell>
            <TableCell align="center">Proteins&nbsp;(g)</TableCell>
            <TableCell align="center">Carbs&nbsp;(g)</TableCell>
            <TableCell align="center">Fats&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodEntries.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.proteins}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.fats}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NutrientTable;
