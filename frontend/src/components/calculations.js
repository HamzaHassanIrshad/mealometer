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

const formatMacroNutrient = (macroNutrient, unit) => {
  const formattedAmount = parseFloat(macroNutrient.toFixed(2));
  return {
    name: defaultMacroNutrients[unit].name,
    amount: formattedAmount,
    unit: defaultMacroNutrients[unit].unit,
  };
};

export const calculateMacroNutrients = (selectedFoods$) => {
  const macroNutrients = { ...defaultMacroNutrients };

  let calories = 0;
  let proteins = 0;
  let carbs = 0;
  let fats = 0;

  selectedFoods$.subscribe(
    (selectedFood) => {
      selectedFood.amount = selectedFood.amount || 0;
      calories += selectedFood.food.calories * selectedFood.amount;
      proteins += selectedFood.food.proteins * selectedFood.amount;
      carbs += selectedFood.food.carbohydrates * selectedFood.amount;
      fats += selectedFood.food.fat * selectedFood.amount;
    },
    (err) => console.error(err),
    () => {
      macroNutrients.calories = formatMacroNutrient(calories, "calories");
      macroNutrients.proteins = formatMacroNutrient(proteins, "proteins");
      macroNutrients.carbs = formatMacroNutrient(carbs, "carbs");
      macroNutrients.fats = formatMacroNutrient(fats, "fats");
    }
  );

  return macroNutrients;
};
