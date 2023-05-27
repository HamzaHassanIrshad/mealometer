// Default macro nutrients object with initial values and units
export const defaultMacroNutrients = {
  calories: {
    name: "Calories",
    raw: 0,
    amount: 0,
    unit: "kcal",
  },
  proteins: {
    name: "Proteins",
    raw: 0,
    amount: 0,
    unit: "g",
  },
  carbs: {
    name: "Carbs",
    raw: 0,
    amount: 0,
    unit: "g",
  },
  fats: {
    name: "Fats",
    raw: 0,
    amount: 0,
    unit: "g",
  },
};

// Format a macro nutrient value with the corresponding unit and name
const formatMacroNutrient = (macroNutrient, unit) => {
  const formattedAmount = parseFloat(macroNutrient.toFixed(2));
  return {
    name: defaultMacroNutrients[unit].name, // Retrieve the name from defaultMacroNutrients using the unit
    amount: formattedAmount,
    unit: defaultMacroNutrients[unit].unit, // Retrieve the unit from defaultMacroNutrients using the unit
  };
};

// Calculate the macro nutrients based on selected foods
export const calculateMacroNutrients = (selectedFoods$) => {
  const macroNutrients = { ...defaultMacroNutrients }; // Create a copy of defaultMacroNutrients

  let calories = 0;
  let proteins = 0;
  let carbs = 0;
  let fats = 0;

  selectedFoods$.subscribe(
    (selectedFood) => {
      selectedFood.amount = selectedFood.amount || 0; // Set the amount to 0 if it is undefined
      calories += selectedFood.food.calories * selectedFood.amount; // Calculate the total calories
      proteins += selectedFood.food.proteins * selectedFood.amount; // Calculate the total proteins
      carbs += selectedFood.food.carbs * selectedFood.amount; // Calculate the total carbs
      fats += selectedFood.food.fats * selectedFood.amount; // Calculate the total fats
    },
    (err) => console.error(err),
    () => {
      // Format the calculated macro nutrient values using formatMacroNutrient
      macroNutrients.calories = formatMacroNutrient(calories, "calories");
      macroNutrients.proteins = formatMacroNutrient(proteins, "proteins");
      macroNutrients.carbs = formatMacroNutrient(carbs, "carbs");
      macroNutrients.fats = formatMacroNutrient(fats, "fats");
    }
  );

  return macroNutrients; // Return the calculated macro nutrients
};
