import React, { Component } from "react";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import MacroNutrients from "./components/macro-nutrients";
import NutrientTable from "./components/nutrient-table";
import Foods from "./components/foods";
import { calculateMacroNutrients } from "./components/calculations";
import logo from "./images/logo.png";

// Datasets
import nutrients from "./data/nutrients.json";

// Styles
import "./App.css";

export default class App extends Component {
  state = {};
  nutrients$ = from(nutrients);
  nutrientsLimited$ = from(nutrients).pipe(
    map((nutrient) => ({
      name: nutrient.name,
      rda: nutrient.rda,
    }))
  );
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
          <NutrientTable foodEntries={this.state.foodEntries} />
        </div>
      </div>
    );
  }
}
