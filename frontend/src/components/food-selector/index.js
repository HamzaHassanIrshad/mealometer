import React, { useState } from "react";
import { Select } from "antd";

const FoodSelector = ({ foods, onChange }) => {
  const [selectedFood, setSelectedFood] = useState();

  const handleChange = (value) => {
    onChange(value);
    setSelectedFood(undefined);
  };

  const filterOption = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <div className="foodSelector">
      <Select
        spellCheck="false"
        data-gramm="false"
        showSearch
        className="foodSelectorInput"
        size="large"
        value={selectedFood}
        placeholder="+ Add food"
        optionFilterProp="children"
        onChange={handleChange}
        filterOption={filterOption}
      >
        {foods.sort().map((foodName) => (
          <Select.Option key={foodName} value={foodName}>
            {foodName}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default FoodSelector;
