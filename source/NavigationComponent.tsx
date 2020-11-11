import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { connect } from "react-redux";

import Login from "./Login";
import Main from "./Main";
import { ReduxState } from "./rootReducer";

interface INavComp {
  state: ReduxState;
}

const NavigationComponent: React.FC<INavComp> = (props) => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.state.authenticated ? (
          <Stack.Screen name="Main" component={Main} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const mapstate = (state: ReduxState) => {
  return {
    state,
  };
};

export default connect(mapstate)(NavigationComponent);
