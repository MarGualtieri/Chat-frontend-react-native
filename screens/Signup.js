import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Octicons, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView, View, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import Constants from 'expo-constants';

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2021, 0, 1));

  // Actual date picked by user
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
          <View style={styles.extraView}>
            <Text style={styles.extraText}>IR A PERFIL DE USUARIO </Text>
            <TouchableOpacity style={styles.textLink} onPress={() => navigation.navigate("Welcome")}>
              <Text style={styles.textLinkContent}> WELCOME</Text>
            </TouchableOpacity>
          </View>

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
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.styleFormArea}>
                <MyTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="Isabel Sayago"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
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
                  label="Date of Birth"
                  icon="calendar"
                  placeholder="YYYY/MM/DD"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("dateOfBirth")}
                  onBlur={handleBlur("dateOfBirth")}
                  value={dob ? dob.toDateString() : ""}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
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
                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <Text style={styles.messageBoxRed}>...</Text>
                <TouchableOpacity style={styles.styledButton} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
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
