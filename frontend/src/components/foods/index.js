import React, { useState, useEffect, useCallback } from "react";
import FoodSelector from "./../food-selector";
import SelectedFood from "./../selected-food";
import { Icon } from "antd";
import update from "immutability-helper";
import foods from "./../../data/food_data.json";
import { from } from "rxjs";
import { createData } from "../nutrient-table";

const Foods = ({ updateNutrients, updateFoodEntries }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodsForSelection, setFoodsForSelection] = useState([]);
  const [error, setError] = useState(false);
  const memoizedUpdateNutrients = useCallback(updateNutrients, []);

  const onFoodSelect = (selectedFoodName) => {
    // Check if the selected food item is already in the selectedFoods array
    const existingFood = selectedFoods.find(
      (f) => f.food.name === selectedFoodName
    );
    if (existingFood) {
      setError(true);
      return;
    }

    setSelectedFoods((prevSelectedFoods) => [
      ...prevSelectedFoods,
      {
        food: foods.find((f) => f.name === selectedFoodName),
        amount: foods.find((f) => f.name === selectedFoodName).serving || 100,
      },
    ]);
    setError(false);
  };

  const onFoodRemove = (removedFood) => {
    const removedFoodIndex = findFoodIndex(removedFood.food.name);
    const updatedSelectedFoods = update(selectedFoods, {
      $splice: [[removedFoodIndex, 1]],
    });
    setSelectedFoods(updatedSelectedFoods);
  };

  const findFoodIndex = (foodName) =>
    selectedFoods.findIndex((f) => f.food.name === foodName);

  const onFoodAmountChange = (updatedSelectedFood) => {
    const updatedFoodIndex = findFoodIndex(updatedSelectedFood.food.name);
    const updatedSelectedFoods = update(selectedFoods, {
      $splice: [[updatedFoodIndex, 1, updatedSelectedFood]],
    });
    setSelectedFoods(updatedSelectedFoods);
  };

  useEffect(() => {
    const updateFoodSelector = () => {
      const allPossibleFoods = foods.map((food) => food.name);
      const allSelectedFoods = selectedFoods.map((sf) => sf.food.name);
      setFoodsForSelection(
        allPossibleFoods.filter((f) => !allSelectedFoods.includes(f))
      );
    };

    setFoodsForSelection(foods.map((food) => food.name));
    memoizedUpdateNutrients(from(selectedFoods));
    updateFoodSelector();
  }, [selectedFoods, memoizedUpdateNutrients]);

  return (
    <div>
      <FoodSelector
        className="foodSelector"
        foods={foodsForSelection}
        onChange={onFoodSelect}
      />
      {error && (
        <p className="error-message" style={{ color: "red" }}>
          Food item already selected.
        </p>
      )}
      {selectedFoods.length === 0 && (
        <div className="addFoods">
          <Icon className="animate-flicker" type="arrow-up" />
        </div>
      )}
      {selectedFoods.length > 0 && (
        <h3 className="selectedFoodsLabel"> Selected Foods </h3>
      )}
      {selectedFoods.map((selectedFood) => (
        <SelectedFood
          key={selectedFood.food.name}
          selectedFood={selectedFood}
          onChange={onFoodAmountChange}
          onRemove={onFoodRemove}
        />
      ))}
      {selectedFoods.length > 0 && (
        <button
          className="reusable-button"
          style={{ marginBottom: "15px", marginTop: "2px" }}
          onClick={() => {
            // Create a new food entry based on the selected foods
            const newFoodEntry = selectedFoods.map((selectedFood) => {
              const { name, calories, proteins, carbs, fats } =
                selectedFood.food;
              const { amount } = selectedFood;
              return createData(name, amount, calories, proteins, carbs, fats);
            });

            // Call the updateFoodEntries prop with the new food entries
            updateFoodEntries(newFoodEntry);

            // Clear the selected foods array
            setSelectedFoods([]);
          }}
        >
          Add Food Entry
        </button>
      )}
    </div>
  );
};

export default Foods;
