import React, { useState, useEffect } from "react";
import FoodSelector from "./../food-selector";
import SelectedFood from "./../selected-food";
import { Icon } from "antd";
import update from "immutability-helper";
import foods from "./../../data/food_data.json";
import { from } from "rxjs";

const Foods = ({ updateNutrients }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodsForSelection, setFoodsForSelection] = useState([]);
  const [error, setError] = useState("");

  const onFoodSelect = (selectedFoodName) => {
    // Check if the selected food item is already in the selectedFoods array
    const existingFood = selectedFoods.find(
      (f) => f.food.name === selectedFoodName
    );
    if (existingFood) {
      setError("Food item already selected");
      return;
    }

    setSelectedFoods((prevSelectedFoods) => [
      ...prevSelectedFoods,
      {
        food: foods.find((f) => f.name === selectedFoodName),
        amount: foods.find((f) => f.name === selectedFoodName).serving || 100,
      },
    ]);
    setError("");
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
    setFoodsForSelection(foods.map((food) => food.name));
  }, []);

  useEffect(() => {
    const updateFoodSelector = () => {
      const allPossibleFoods = foods.map((food) => food.name);
      const allSelectedFoods = selectedFoods.map((sf) => sf.food.name);
      setFoodsForSelection(
        allPossibleFoods.filter((f) => !allSelectedFoods.includes(f))
      );
    };

    setFoodsForSelection(foods.map((food) => food.name));
    updateNutrients(from(selectedFoods));
    updateFoodSelector();
  }, [selectedFoods, updateNutrients]);

  return (
    <div>
      <FoodSelector
        className="foodSelector"
        foods={foodsForSelection}
        onChange={onFoodSelect}
      />
      {selectedFoods.length === 0 && (
        <div className="addFoods">
          <Icon className="animate-flicker" type="arrow-up" />
        </div>
      )}
      {error && (
        <p className="error-message" style={{ color: "red" }}>
          {error}
        </p>
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
        <button className="reusable-button">Add Food Entry</button>
      )}
    </div>
  );
};

export default Foods;
