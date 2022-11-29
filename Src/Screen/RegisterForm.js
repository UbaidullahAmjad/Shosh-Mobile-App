import React, { useState } from 'react';
import { Text, TextInput, ActivityIndicator, ScrollView, KeyboardAvoidingView, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { LoginasGuest, UserRegister } from "../Store/Actions/UserAction";
import Toast from 'react-native-toast-message';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import store from '../Store';
import TextInputComponent from '../Components/TextInputComponent';
import ContinueAsGuestComponent from '../Components/ContinueAsGuestComponent';
import { nameValidation } from '../Confiq/helper';
import LocalizationContext from '../../LocalizationContext';

function RegisterForm(props) {
  const { t } = React.useContext(LocalizationContext);
  const { locale, setLocale } = React.useContext(LocalizationContext);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassowrd] = useState("")
  const [isLoading, setLoading] = useState(false)

  const registerUser = async () => {
    let value = nameValidation(name)

    setLoading(true)
    if (name == '' && email == '' && password == '') {
      Toast.show({
        type: 'error',
        text1: 'Incorrect Fields!',
        text2: 'Please fill all fields correctly'
      });
      setLoading(false)
    }
    else if (password != confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Incorrect Confirm Password!',
        text2: 'Password and Confirm Password Must be same'
      });
      setLoading(false)
    }
    else if (!value) {
      Toast.show({
        type: 'error',
        text1: 'Incorrect Username!',
        text2: 'Username Must be Correct'
      });
      setLoading(false)
    }
    else {
      await props?.UserRegister(name, email, password, confirmPassword, props)
      setLoading(false)
    }
  }
  return (
    <KeyboardAvoidingView behavior='height'>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{
          flex: 1,
        }}>
          <Image
            source={require('../Assets/Images/logo.png')}
            resizeMode="contain"
            style={{
              margin: 20,
              width: widthPercentageToDP('35%'),
              tintColor: "black",
              height: heightPercentageToDP('20%'),
              alignSelf: "center"
            }}
          />

          <TextInputComponent
            title={t('username')}
            value={name}
            onchange={(value) => setname(value)}
            placeholder={t('username')} />

          <TextInputComponent
            title={t('Email')}
            value={email}
            onchange={(value) => setemail(value)}
            placeholder={t('Email')} />

          <TextInputComponent
            title={t('Password')}
            value={password}
            secure
            onchange={(value) => setpassword(value)}
            placeholder={t('Password')} />

          <TextInputComponent
            title={t('Confirm Password')}
            value={confirmPassword}
            onchange={(value) => setconfirmPassowrd(value)}
            secure
            placeholder={t('Confirm Password')} />

          <TouchableOpacity onPress={registerUser}>
            <View style={{ backgroundColor: 'black', width: '90%', height: heightPercentageToDP('6%'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 20 }}>
              {isLoading
                ? <ActivityIndicator size={'small'} color='white' />
                : <Text style={{ color: 'white', fontSize: heightPercentageToDP('2%') }}>{t('Signup')}</Text>
              }
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const mapStateToProps = ({ }) => ({
})

export default connect(mapStateToProps, {
  UserRegister
})(RegisterForm)