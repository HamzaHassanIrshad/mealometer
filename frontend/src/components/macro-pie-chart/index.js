import React from "react";
import { Tooltip } from "antd";
import ReactChartkick, { PieChart } from "react-chartkick";
import Chart from "chart.js";
import emptyGraph from "./../../images/graph_placeholder.png";

ReactChartkick.addAdapter(Chart);

const MacroPieChart = ({ proteins, carbohydrates, fat }) => {
  const calculatePercentage = (item, total) =>
    parseInt((item * 100) / total, 10) || 0;

  const getTotalMacroNutrients = () => proteins + carbohydrates + fat;

  const pieChartData = () => {
    const total = getTotalMacroNutrients();
    return [
      ["Proteins", calculatePercentage(proteins, total)],
      ["Carbs", calculatePercentage(carbohydrates, total)],
      ["Fat", calculatePercentage(fat, total)],
    ];
  };

  return (
    <div className="macroNutrient macroChart">
      {getTotalMacroNutrients() === 0 ? (
        <Tooltip title="Macro Nutrients Ratio">
          <img className="macroChartEmpty" src={emptyGraph} alt="Empty Graph" />
        </Tooltip>
      ) : (
        <PieChart
          colors={["#5ca0d3", "#64CEAA", "#f9fd50"]}
          id="macro_ratio_chart"
          suffix="%"
          legend={false}
          height="100px"
          width="100px"
          data={pieChartData()}
        />
      )}
    </div>
  );
};

export default MacroPieChart;
