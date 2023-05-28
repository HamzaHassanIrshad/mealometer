import React, { useState } from "react";
import MacroNutrients from "./components/macro-nutrients";
import NutrientTable from "./components/nutrient-table";
import Foods from "./components/foods";
import { calculateMacroNutrients } from "./components/calculations";
import logo from "./images/logo.png";

// Styles
import "./App.css";

const App = () => {
  const [foodEntries, setFoodEntries] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
  });

  const [macroNutrients, setMacroNutrients] = useState(null);

  const updateNutrients = (selectedFoods) => {
    setMacroNutrients(calculateMacroNutrients(selectedFoods));
  };

  const updateFoodEntries = (newFoodEntry, meal) => {
    setFoodEntries((prevFoodEntries) => ({
      ...prevFoodEntries,
      [meal]: [...prevFoodEntries[meal], ...newFoodEntry],
    }));
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
          foodEntries={foodEntries}
        />
      </div>
      <div className="rightPanel">
        <MacroNutrients macroNutrients={macroNutrients} />
        <NutrientTable meal="Breakfast" foodEntries={foodEntries.Breakfast} />
        <NutrientTable meal="Lunch" foodEntries={foodEntries.Lunch} />
        <NutrientTable meal="Dinner" foodEntries={foodEntries.Dinner} />
      </div>
    </div>
  );
};

export default App;
