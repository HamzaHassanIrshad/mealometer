import React, { useState, useEffect } from "react";
import { Progress } from "antd";

const MicroNutrient = ({ microNutrient, microNutrientData }) => {
  const [name, setName] = useState("");
  const [wiki, setWiki] = useState("#");
  const [percentage, setPercentage] = useState(0);
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("μg");
  const [status, setStatus] = useState("normal");

  useEffect(() => {
    if (microNutrientData) {
      setName(microNutrient.name);
      setWiki(microNutrient.wiki);
      setPercentage(microNutrientData.percentage || 0);
      setAmount(microNutrientData.amount || 0);
      setUnit(microNutrientData.unit || "μg");
      setStatus(getNutrientStatus(microNutrientData));
    }
  }, [microNutrient, microNutrientData]);

  const getNutrientStatus = (data) => {
    let barType = "normal";
    if (data.raw >= data.rda && data.raw < 1.5 * data.rda) {
      barType = "success";
    } else if (data.raw >= 1.5 * data.rda) {
      barType = "exception";
    }
    return barType;
  };

  return (
    <div key={name} className="microNutrient">
      <div className="microNutrientName">
        <a target="_blank" rel="noopener noreferrer" href={wiki}>
          {name}
        </a>
      </div>
      <div className="microNutrientProgressBar">
        <Progress
          showInfo={false}
          status={status}
          percent={percentage}
          size="small"
        />
        <span>{percentage}% </span>
      </div>
      <div className="microNutrientAmount">
        {amount} {unit}
      </div>
    </div>
  );
};

export default MicroNutrient;
