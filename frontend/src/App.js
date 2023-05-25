import React, { Component } from "react";
import MacroNutrients from "./components/macro-nutrients";
import NutrientTable from "./components/nutrient-table";
import Foods from "./components/foods";
import { calculateMacroNutrients } from "./components/calculations";
import logo from "./images/logo.png";

// Styles
import "./App.css";

export default class App extends Component {
  state = {
    foodEntries: [],
  };
  updateNutrients = (selectedFoods$) => {
    this.setState({
      macroNutrients: calculateMacroNutrients(selectedFoods$),
    });
  };

  updateFoodEntries = (newFoodEntries) => {
    this.setState({ foodEntries: newFoodEntries });
  };

  render() {
    return (
      <div className="App">
        <div className="leftPanel">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Foods
            updateNutrients={this.updateNutrients}
            updateFoodEntries={this.updateFoodEntries}
          />
        </div>
        <div className="rightPanel">
          <MacroNutrients macroNutrients={this.state.macroNutrients} />
          <NutrientTable foodEntries={this.state.foodEntries} />
        </div>
      </div>
    );
  }
}
