import React, { useState, useEffect } from "react";
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
  const [calorieGoal, setCalorieGoal] = useState(3000);

  const updateNutrients = (selectedFoods) => {
    setMacroNutrients(calculateMacroNutrients(selectedFoods));
  };

  const updateFoodEntries = (newFoodEntry, meal) => {
    setFoodEntries((prevFoodEntries) => ({
      ...prevFoodEntries,
      [meal]: [...prevFoodEntries[meal], ...newFoodEntry],
    }));
  };

  const handleDelete = (index, meal) => {
    setFoodEntries((prevFoodEntries) => {
      const updatedEntries = { ...prevFoodEntries };
      updatedEntries[meal].splice(index, 1);
      return updatedEntries;
    });
  };

  const calculateTotalCalories = () => {
    let totalCalories = 0;

    Object.keys(foodEntries).forEach((meal) => {
      const mealEntries = foodEntries[meal];
      mealEntries.forEach((entry) => {
        totalCalories += entry.calories;
      });
    });

    return totalCalories.toFixed(2);
  };

  const caloriesRemaining = (calorieGoal - calculateTotalCalories()).toFixed(2);

  useEffect(() => {
    // Update the calorie goal whenever it changes
  }, [calorieGoal]);

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
        <div className="calorieGoal">
          <b>Calorie Goal: {calorieGoal}</b>
          <b>Calories Remaining: {caloriesRemaining}</b>
        </div>
        <NutrientTable
          meal="Breakfast"
          foodEntries={foodEntries.Breakfast}
          onDelete={(index) => handleDelete(index, "Breakfast")}
        />
        <div className="nutrientTableSpacer" />
        <NutrientTable
          meal="Lunch"
          foodEntries={foodEntries.Lunch}
          onDelete={(index) => handleDelete(index, "Lunch")}
        />
        <div className="nutrientTableSpacer" />
        <NutrientTable
          meal="Dinner"
          foodEntries={foodEntries.Dinner}
          onDelete={(index) => handleDelete(index, "Dinner")}
        />
      </div>
    </div>
  );
};

export default App;
