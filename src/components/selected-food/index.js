import React from 'react';
import { InputNumber, Button, Icon } from 'antd';

const SelectedFood = ({ onChange, onRemove, selectedFood }) => {
  const onAmountChange = (amount) => {
    onChange({
      ...selectedFood,
      amount: amount,
    });
  };

  const onDelete = () => onRemove(selectedFood);

  return (
    <div className="selectedFood">
      <h2>{selectedFood.food.name}</h2>
      <div className="selectedFoodAmount">
        <InputNumber
          addonAfter="grams"
          min={0}
          max={5000}
          type="number"
          onChange={onAmountChange}
          defaultValue={selectedFood.amount}
        />
        <Button onClick={onDelete} className="deleteBtn">
          <Icon type="delete" />
        </Button>
      </div>
    </div>
  );
};

export default SelectedFood;
