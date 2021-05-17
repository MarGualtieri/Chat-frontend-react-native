import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Formik, FormikContext} from 'formik';

import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
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
    TextLinkContent
} from './../components/styles';

import {View, TouchableOpacity} from 'react-native';

const {brand,darkLight,primary} =  Colors;

const Signup = ({ navigation}) => {
    const [hidePassword,setHidePassword] = useState(true);
    const [show,setShow] = useState(false);
    const [date,setDate] = useState(new Date(2021,0,1));

    // Actual date picked by user
    const [dob,setDob] = useState();
    const onChange = (event,selectedDate) =>{
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker = () => {
        setShow(true);
    }

    return(
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Talkling/Earthling</PageTitle>
                <SubTitle>Signup</SubTitle>

                {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
                )}

                <Formik
                    initialValues={{fullName: '', email: '', dateOfBirth: '', password: '',confirmPassword:''}}
                    onSubmit={(values) =>{
                        console.log(values);
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values})=>
                    (<StyleFormArea>
                        <MyTextInput 
                            label="Full Name"
                            icon="person"
                            placeholder="Isabel Sayago"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
                        />
                        <MyTextInput 
                            label="Email Address"
                            icon="mail"
                            placeholder="isa@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType ="email-address"
                        />
                        <MyTextInput 
                            label="Date of Birth"
                            icon="calendar"
                            placeholder="YYYY/MM/DD"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('dateOfBirth')}
                            onBlur={handleBlur('dateOfBirth')}
                            value={dob ? dob.toDateString() : ''}
                            isDate={true}
                            editable={false}
                            showDatePicker={showDatePicker}
                        />
                        <MyTextInput 
                            label="Password"
                            icon="lock"
                            placeholder="********"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
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
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MessageBox>...</MessageBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>
                        <Line />
                        <ExtraView>
                            <ExtraText> I already have an account </ExtraText>
                            <TextLink onPress={()=> navigation.navigate('Login')}>
                                <TextLinkContent> Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>

                    </StyleFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );

};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate,showDatePicker, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            
            {isPassword && (
                <RightIcon onPress={()=>setHidePassword(prev => !prev)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}  />
                </RightIcon>
            )}

            {!isDate && <StyledTextInput {...props} />}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Signup; 