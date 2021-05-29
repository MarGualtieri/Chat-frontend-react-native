import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Image } from "react-native";
import logo from "../assets/logo.png";


import {
  StyledContainer,
  InnerContainer,
  StyleFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MessageBox,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "./../components/styles";

import { View, ActivityIndicator } from "react-native";

const { brand, darkLight, primary } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);

    const url =
      "mongodb+srv://admin:admin123456@marianocluster.rp4b3.mongodb.net/trabajoPractico?retryWrites=true&w=majority";

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        navigation.navigate("Welcome");

        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.JSON());
        setSubmitting(false);
        handleMessage("An Error ocurred. Check your network and try again");
      });
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <ScrollView style={{ width: "100%" }}>
      <StyledContainer>
        <InnerContainer>
          <Image source={logo} style={styles.logo} />

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { isSubmitting }) => {
              if (values.email == "" || values.password == "") {
                handleMessage("por favor rellene los campos");
                setSubmitted(false);
              } else {
                handleMessage(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyleFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="isa@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                

                <MessageBox type={messageType}>{message}</MessageBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <Line />

              



                <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
                  <ButtonText google={true}>Sign in with Google</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText> Forgot password? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent> Recovery</TextLinkContent>
                  </TextLink>



                </ExtraView>
                <View style={{height:10,backgroundColor:'white'}}></View>
                <ExtraView>
                  <ExtraText> I don't have an account </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent> Signup</TextLinkContent>
                    
                  </TextLink>
                </ExtraView>
                <View style={{height:30,backgroundColor:'white'}}></View>
        
              </StyleFormArea>
            )}
          </Formik>
        </InnerContainer>
        <StatusBar style="light" />
      </StyledContainer>
    </ScrollView>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword((prev) => !prev)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    height: 90,
    width: 120,
    resizeMode: "contain",
    
  },
});
