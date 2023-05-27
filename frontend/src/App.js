import React, { useState } from "react";
import MacroNutrients from "./components/macro-nutrients";
import NutrientTable from "./components/nutrient-table";
import Foods from "./components/foods";
import { calculateMacroNutrients } from "./components/calculations";
import logo from "./images/logo.png";

// Styles
import "./App.css";

const App = () => {
  const [foodEntries, setFoodEntries] = useState([]);
  const [macroNutrients, setMacroNutrients] = useState(null);

  const updateNutrients = (selectedFoods) => {
    setMacroNutrients(calculateMacroNutrients(selectedFoods));
  };

  const updateFoodEntries = (newFoodEntries) => {
    setFoodEntries(newFoodEntries);
  };

  return (
    <div className="App">
      <div className="leftPanel">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Foods
          updateNutrients={updateNutrients}
          updateFoodEntries={updateFoodEntries}
        />
      </div>
      <div className="rightPanel">
        <MacroNutrients macroNutrients={macroNutrients} />
        <NutrientTable foodEntries={foodEntries} />
      </div>
    </div>
  );
};

export default App;
