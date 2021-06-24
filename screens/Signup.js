import * as yup from 'yup';

import { Ionicons, Octicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import AsyncStorage from "../utils/AsyncStorage";
import Constants from 'expo-constants';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import GlobalContext from "../components/global/context/index";
import { StatusBar } from "expo-status-bar";

//const URL_API = "http://localhost:3000/signup";
const URL_API = "https://apichathello.herokuapp.com/signup";

const reviewSchema = yup.object({
  fullName: yup
    .string()
    .required("A name is required")
    .min(3, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email('Invalid e-mail')
    .required('An e-mail is required'),
  password: yup
    .string()
    .required('A password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: password => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
    })
})


const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2021, 0, 1));
  const { setAuthData, setAuthenticated } = useContext(GlobalContext)


  // Fecha elegida por el usuario
  const [dob, setDob] = useState();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.innerContainer}>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              dateOfBirth: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={reviewSchema}
            onSubmit={async (values, actions) => {
              const response = await fetch(URL_API, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  name: values.fullName,
                  email: values.email,
                  password: values.password,
                  language: "English",
                  age: dob
                })
              }).catch(err => {
                if (err & err.message) {
                  console.log(err.message)
                }
              })
              if (response.ok) {
                const res = await response.json()
                await AsyncStorage.storeData('@userData', res.user)
                setAuthData(res)
                setAuthenticated(true);
                alert("Welcome to Hello!")
              } else {
                alert("Email is being used.")
              }
              actions.resetForm();
            }
            }
          >
            {(props) => (
              <View style={styles.styleFormArea}>
                <MyTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="Isabel Sayago"
                  placeholderTextColor={darkLight}
                  onChangeText={props.handleChange("fullName")}
                  onBlur={props.handleBlur("fullName")}
                  value={props.values.fullName}
                />
                <Text style={styles.messageBoxRed}> {props.touched.fullName && props.errors.fullName}</Text>

                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="isa@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                  autoCapitalize="none"
                  value={props.values.email}
                  keyboardType="email-address"
                />
                <Text style={styles.messageBoxRed}> {props.touched.email && props.errors.email}</Text>


                <MyTextInput 
                  label="Date of Birth"
                  icon="calendar"
                  placeholder="YYYY/MM/DD"
                  placeholderTextColor={darkLight}
                  onChangeText={props.handleChange("dateOfBirth")}
                  onBlur={props.handleBlur("dateOfBirth")}
                  value={dob ? dob.toDateString() : ""}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
                />
                <Text style={styles.messageBoxRed}> {props.touched.dateOfBirth && props.errors.dateOfBirth}</Text>

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={props.handleChange("password")}
                  onBlur={props.handleBlur("password")}
                  value={props.values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <Text style={styles.messageBoxRed}> {props.touched.password && props.errors.password}</Text>

                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={props.handleChange("confirmPassword")}
                  onBlur={props.handleBlur("confirmPassword")}
                  value={props.values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <Text style={styles.messageBoxRed}> {props.touched.confirmPassword && props.errors.confirmPassword}</Text>

                <TouchableOpacity style={styles.styledButton} onPress={props.handleSubmit}>
                  <Text style={styles.buttonText}>Create account</Text>
                </TouchableOpacity>

                <View style={styles.line} />

                <View style={styles.extraView}>
                  <Text style={styles.extraText}> I already have an account </Text>
                  <TouchableOpacity style={styles.textLink} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.textLinkContent}> Login</Text>
                  </TouchableOpacity>
                </View>

              </View>

            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <View style={styles.leftIcon}>
        <Octicons name={icon} size={30} color={brand} />
      </View>
      <Text style={styles.styledInputLabel}>{label}</Text>

      {isPassword && (
        <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword((prev) => !prev)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </TouchableOpacity>
      )}

      {!isDate && <TextInput style={styles.styledTextInput} {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput style={styles.styledTextInput} {...props} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Signup;

//----------------------ESTILOS---------------------

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  third: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#cf5475',
  green: '#10B981',
  red: '#EF4444',
};

const { primary, secondary, third, darkLight, brand, green, red } = Colors;

const styles = StyleSheet.create({
  logo: {
    height: 90,
    width: 120,
    resizeMode: "contain",

  },
  container: {
    flex: 1,
    padding: 1,
    paddingTop: StatusBarHeight + 7,
    backgroundColor: primary
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  styleFormArea: {
    width: "90%"
  },
  styledTextInput: {
    backgroundColor: secondary,
    padding: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 5,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 10,
    color: third
  },
  styledInputLabel: {
    color: third,
    fontSize: 13,
    textAlign: "left",
  },
  leftIcon: {
    left: 15,
    top: 38,
    position: "absolute",
    zIndex: 1
  },
  rightIcon: {
    right: 15,
    top: 38,
    position: "absolute",
    zIndex: 1
  },
  styledButton: { //mejorar estilos de botón cuando sea Google
    padding: 15,
    backgroundColor: brand,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 60
  },
  styledButtonGoogle: {
    padding: 15,
    backgroundColor: green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
    flexDirection: "row",
  },
  buttonText: {
    color: primary,
    fontSize: 16
  },
  buttonTextGoogle: {
    color: primary,
    fontSize: 16,
    padding: 25
  },
  messageBoxGreen: {
    textAlign: "center",
    fontSize: 13,
    color: green
  },
  messageBoxRed: {
    textAlign: "center",
    fontSize: 13,
    color: red
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: darkLight,
    marginVertical: 10
  },
  extraView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 1
  },
  extraText: {
    justifyContent: "center",
    alignContent: "center",
    color: third,
    fontSize: 15
  },
  textLink: {
    justifyContent: "center",
    alignItems: "center"
  },
  textLinkContent: {
    color: brand,
    fontSize: 15
  }
});
