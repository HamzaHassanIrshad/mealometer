import React, { useState } from "react";
import { Table } from "antd";

const NutrientTable = () => {
  const [foodEntries, setFoodEntries] = useState([]);

  const columns = [
    {
      title: "Food Name",
      dataIndex: "food",
      key: "food",
    },
    {
      title: "Calories",
      dataIndex: "calories",
      key: "calories",
    },
    {
      title: "Proteins",
      dataIndex: "proteins",
      key: "proteins",
    },
    {
      title: "Carbs",
      dataIndex: "carbohydrates",
      key: "carbohydrates",
    },
    {
      title: "Fats",
      dataIndex: "fat",
      key: "fat",
    },
  ];

  return (
    <div className="nutrientTable">
      <h3>Nutrient Table</h3>
      <Table dataSource={foodEntries} columns={columns} />
    </div>
  );
};

export default NutrientTable;
