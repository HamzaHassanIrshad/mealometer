import React, { Component } from "react";
import MacroNutrients from "./components/macro-nutrients";
import NutrientTable from "./components/nutrient-table";
import Foods from "./components/foods";
import { calculateMacroNutrients } from "./components/calculations";
import logo from "./images/logo.png";

// Styles
import "./App.css";

export default class App extends Component {
  state = {};
  updateNutrients = (selectedFoods$) => {
    this.setState({
      macroNutrients: calculateMacroNutrients(selectedFoods$),
    });
  };

  render() {
    return (
      <div className="App">
        <div className="leftPanel">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Foods updateNutrients={this.updateNutrients} />
        </div>
        <div className="rightPanel">
          <MacroNutrients macroNutrients={this.state.macroNutrients} />
          <NutrientTable />
        </div>
      </div>
    );
  }
}
