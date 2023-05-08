import React from 'react';

const MacroNutrient = ({ name, amount, units }) => {
  return (
    <div className="macroNutrient">
      <div>{name}</div>
      <div>
        {amount} {units}
      </div>
    </div>
  );
};

export default MacroNutrient;
