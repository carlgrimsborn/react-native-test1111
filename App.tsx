import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ReduxState, rootReducer } from "./source/rootReducer";
import Login from "./source/Login";
import Main from "./source/Main";
import NavigationComponent from "./source/NavigationComponent";

export default function App() {
  const Stack = createStackNavigator();
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <NavigationComponent></NavigationComponent>
    </Provider>
  );
}
