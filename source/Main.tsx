import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { setAuth } from "./actions/authAction";
import { ReduxState } from "./rootReducer";
import { NavigationType } from "./navigationTypes";
import { cleanToken } from "./actions/tokenActions";
import { cleanUser } from "./actions/userActions";

interface IMain {
  state: ReduxState;
  navigation: NavigationProp<NavigationType>;
  setAuth: (authenticated: boolean) => void;
  cleanToken: () => void;
  cleanUser: () => void;
}

const Main: React.FC<IMain> = (props) => {
  const onLogout = () => {
    props.cleanToken();
    props.cleanUser();
    props.setAuth(false);
  };
  console.log("state", props.state);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.welcometxt}>Welcome</Text>
      <Image
        style={styles.image}
        source={{
          uri: props.state.user.profilePictureUrl,
        }}
      ></Image>
      <Text>firstname: {props.state.user.firstName}</Text>
      <Text>lastname: {props.state.user.lastName}</Text>
      <Text>email: {props.state.user.email}</Text>
      <Text>phone: {props.state.user.phone}</Text>
      <Text>city: {props.state.user.address.city}</Text>
      <Text>street: {props.state.user.address.streetName}</Text>
      <Text style={{ marginBottom: 20 }}>
        zip: {props.state.user.address.zipCode}
      </Text>
      <Text>decscription: {props.state.user.buddyInfo.description}</Text>
      <Text>favQuote: {props.state.user.buddyInfo.favQuote}</Text>
      <Text style={{ marginBottom: 50 }}>
        favThing: {props.state.user.buddyInfo.favThing}
      </Text>
      <Button title="Logout" onPress={() => onLogout()}></Button>
    </View>
  );
};

const mapstate = (state: ReduxState) => {
  return {
    state,
  };
};

const mapdispatch = (dispatch: any) => {
  return {
    setAuth: (authenticated: boolean) => dispatch(setAuth(authenticated)),
    cleanToken: () => dispatch(cleanToken()),
    cleanUser: () => dispatch(cleanUser()),
  };
};

const styles = StyleSheet.create({
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 50 },
  welcometxt: { marginBottom: 50, fontSize: 20 },
});

export default connect(mapstate, mapdispatch)(Main);
