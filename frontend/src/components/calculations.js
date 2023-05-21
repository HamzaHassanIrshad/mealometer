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

export const calculateMacroNutrients = (selectedFoods$) => {
  const macroNutrients = JSON.parse(JSON.stringify(defaultMacroNutrients));
  selectedFoods$.subscribe(
    (selectedFood) => {
      selectedFood.amount = selectedFood.amount || 0;
      macroNutrients.calories.raw +=
        selectedFood.food.calories * selectedFood.amount;
      macroNutrients.proteins.raw +=
        selectedFood.food.proteins * selectedFood.amount;
      macroNutrients.carbs.raw +=
        selectedFood.food.carbohydrates * selectedFood.amount;
      macroNutrients.fats.raw += selectedFood.food.fat * selectedFood.amount;
    },
    (err) => console.error(err),
    () => {
      macroNutrients.calories = formatMacroNutrient(macroNutrients.calories, [
        "kcal",
      ]);
      macroNutrients.proteins = formatMacroNutrient(macroNutrients.proteins, [
        "g",
      ]);
      macroNutrients.carbs = formatMacroNutrient(macroNutrients.carbs, ["g"]);
      macroNutrients.fats = formatMacroNutrient(macroNutrients.fats, ["g"]);
    }
  );

  return macroNutrients;
};

const formatMacroNutrient = (macroNutrient, units) =>
  Object.assign(macroNutrient, unitize(macroNutrient.raw, units));

export const unitize = (amount, units) => {
  let unit = units.pop();
  while (amount >= 1000) {
    if (units.length === 0) {
      return {
        amount: parseFloat(parseFloat(amount).toFixed(2)),
        unit,
      };
    }
    amount /= 1000;
    unit = units.pop();
  }
  return {
    amount: parseFloat(parseFloat(amount).toFixed(2)),
    unit,
  };
};
