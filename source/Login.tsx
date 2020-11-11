import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { ReduxState, User } from "./rootReducer";
import { connect } from "react-redux";
import { changeUser } from "./actions/userActions";
import { NavigationProp } from "@react-navigation/native";
import { NavigationType } from "./navigationTypes";
import { TextInput } from "react-native-gesture-handler";
import { askForLoginCode, loginSubmit } from "./service";
import { setToken } from "./actions/tokenActions";
import { setAuth } from "./actions/authAction";

interface ILogin {
  state: ReduxState;
  changeUser: (user: User) => void;
  setToken: (token: string) => void;
  setAuth: (authenticated: boolean) => void;
  navigation: NavigationProp<NavigationType>;
}

const Login: React.FC<ILogin> = (props) => {
  const [phone, setphone] = useState("+46766123456");
  const [code, setcode] = useState("");
  const [activityIndicator, setactivityIndicator] = useState(false);
  const [activityIndicator2, setactivityIndicator2] = useState(false);

  const onRequestCode = () => {
    const askForLogin = async () => {
      setactivityIndicator(true);
      const resp = await askForLoginCode(phone);
      if (resp) {
        console.log("RESP2", resp);
        alert("Success! code: 100100");
        setactivityIndicator(false);
      } else {
        alert("Login failed");
        setactivityIndicator(false);
      }
    };
    askForLogin();
  };

  const onLogin = () => {
    const logincall = async () => {
      setactivityIndicator2(true);
      const resp = await loginSubmit(phone, code);
      if (resp) {
        //@ts-ignore
        console.log("LOGIN RESP", resp.user);
        //@ts-ignore
        const token: string = resp.jwt;
        props.setToken(token);
        //@ts-ignore
        const userResponse: User = resp.user;
        props.changeUser({
          phone: userResponse.phone,
          //@ts-ignore
          id: userResponse._id,
          address: userResponse.address,
          email: userResponse.email,
          firstName: userResponse.firstName,
          lastName: userResponse.lastName,
          profilePictureUrl: userResponse.profilePictureUrl,
          buddyInfo: userResponse.buddyInfo,
        });
        setactivityIndicator2(false);
        props.setAuth(true);
      } else {
        alert("Login Failed");
        setactivityIndicator2(false);
      }
    };
    logincall();
  };

  return (
    <View style={styles.parentView}>
      <Text>Phone number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => setphone(text)}
      ></TextInput>
      <Button title="Request Code" onPress={() => onRequestCode()}></Button>
      {activityIndicator ? <ActivityIndicator></ActivityIndicator> : false}
      <View style={styles.subView}>
        <Text>Code</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={(t) => setcode(t)}
        ></TextInput>
        <Button title="Login" onPress={() => onLogin()}></Button>
        {activityIndicator2 ? <ActivityIndicator></ActivityIndicator> : false}
      </View>
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
    changeUser: (user: User) => dispatch(changeUser(user)),
    setToken: (token: string) => dispatch(setToken(token)),
    setAuth: (authenticated: boolean) => dispatch(setAuth(authenticated)),
  };
};

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 30,
  },
  parentView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  subView: { marginTop: 100, width: "100%", alignItems: "center" },
});

export default connect(mapstate, mapdispatch)(Login);
