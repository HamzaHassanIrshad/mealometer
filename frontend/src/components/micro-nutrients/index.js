import React from "react";
import MicroNutrient from "./../micro-nutrient";

const MicroNutrients = ({ definitions, microNutrients = {} }) => {
  const microNutrientsByType = definitions.reduce((group, current) => {
    if (typeof group[current.type] === "undefined") {
      group[current.type] = [];
    }
    group[current.type].push(current);
    return group;
  }, {});

  return (
    <div className="microNutrients">
      {Object.keys(microNutrientsByType).map((microNutrientsByTypeName) => (
        <div key={microNutrientsByTypeName} className="microNutrientType">
          <span className="nutrientType">{microNutrientsByTypeName}</span>
          {microNutrientsByType[microNutrientsByTypeName].map(
            (microNutrient) => (
              <MicroNutrient
                key={microNutrient.name}
                microNutrient={microNutrient}
                microNutrientData={microNutrients[microNutrient.name]}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default MicroNutrients;
