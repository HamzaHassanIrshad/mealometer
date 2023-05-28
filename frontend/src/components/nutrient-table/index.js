import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Icon } from "antd";

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
      position: "relative",
    },
    "& .deleteButton": {
      position: "absolute",
      top: "50%",
      right: "5px",
      transform: "translateY(-50%)",
      cursor: "pointer",
    },
    "& .emptyRow": {
      textAlign: "center",
      fontStyle: "italic",
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

const NutrientTable = ({ meal, foodEntries, onDelete }) => {
  const classes = useStyles();

  const handleDelete = (index) => {
    onDelete(index);
  };

  const calculateTotal = () => {
    let totalCalories = 0;
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    for (let i = 0; i < foodEntries.length; i++) {
      const entry = foodEntries[i];
      totalCalories += entry.calories;
      totalProteins += entry.proteins;
      totalCarbs += entry.carbs;
      totalFats += entry.fats;
    }

    return {
      totalCalories: totalCalories.toFixed(2),
      totalProteins: totalProteins.toFixed(2),
      totalCarbs: totalCarbs.toFixed(2),
      totalFats: totalFats.toFixed(2),
    };
  };

  const totalValues = calculateTotal();

  return (
    <div style={{ margin: "0 10px 10px 0" }}>
      <h3 className="tableLabel">{meal}</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>Food</b>
              </TableCell>
              <TableCell align="center">
                <b>Calories&nbsp;(kcal)</b>
              </TableCell>
              <TableCell align="center">
                <b>Proteins&nbsp;(g)</b>
              </TableCell>
              <TableCell align="center">
                <b>Carbs&nbsp;(g)</b>
              </TableCell>
              <TableCell align="center">
                <b>Fats&nbsp;(g)</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodEntries.length === 0 ? (
              <TableRow>
                <TableCell className="emptyRow" colSpan={5}>
                  No food entries have been made
                </TableCell>
              </TableRow>
            ) : (
              foodEntries.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left" component="th" scope="row">
                    {row.name} ({row.amount}g)
                  </TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">{row.proteins}</TableCell>
                  <TableCell align="center">{row.carbs}</TableCell>
                  <TableCell align="center">
                    {row.fats}
                    <Button
                      onClick={() => handleDelete(index)}
                      className="deleteButton"
                    >
                      <Icon type="delete" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
            <TableRow>
              <TableCell align="left" colSpan={1}>
                <b>Totals</b>
              </TableCell>
              <TableCell align="center">
                <b>{totalValues.totalCalories}</b>
              </TableCell>
              <TableCell align="center">
                <b>{totalValues.totalProteins}</b>
              </TableCell>
              <TableCell align="center">
                <b>{totalValues.totalCarbs}</b>
              </TableCell>
              <TableCell align="center">
                <b>{totalValues.totalFats}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NutrientTable;
