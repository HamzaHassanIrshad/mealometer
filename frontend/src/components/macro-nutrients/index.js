import React from "react";
import MacroPieChart from "../macro-pie-chart";
import { defaultMacroNutrients } from "./../calculations";
import "../../App.css";
import MacroNutrient from "../macro-nutrient";

const MacroNutrients = ({
  macroNutrients: initialMacroNutrients = defaultMacroNutrients,
}) => {
  const macroNutrients = initialMacroNutrients
    ? Object.values(initialMacroNutrients)
    : [];

  return (
    <div className="macroNutrients">
      {macroNutrients.map((macroNutrient) => (
        <MacroNutrient
          key={macroNutrient.name}
          name={macroNutrient.name}
          amount={macroNutrient.amount}
          units={macroNutrient.unit}
        />
      ))}
      {initialMacroNutrients && (
        <MacroPieChart
          proteins={initialMacroNutrients.proteins?.amount}
          carbohydrates={initialMacroNutrients.carbs?.amount}
          fats={initialMacroNutrients.fats?.amount}
        />
      )}
    </div>
  );
};

export default MacroNutrients;
