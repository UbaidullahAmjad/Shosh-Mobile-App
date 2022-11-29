import React, { useState } from 'react';
import Loginform from './LoginForm'
import { Text, TouchableOpacity, View } from 'react-native';
import RegisterForm from './RegisterForm';
import { rejection } from '../Confiq/helper';
import { AlreaadyLogin } from '../Store/Actions/cartAction'
import { LoginasGuest } from '../Store/Actions/UserAction';
import store from '../Store';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import LocalizationContext from '../../LocalizationContext';

function Login(props) {
    const { t } = React.useContext(LocalizationContext);
    const { locale, setLocale } = React.useContext(LocalizationContext);
    const [loginScreen, setloginScreen] = useState(true)
    return (
        <View style={{
            flex: 1,
        }}>
            <TouchableOpacity onPress={() => props?.navigation.goBack()}
                style={{ alignSelf: locale == 'en' ? "flex-start" : 'flex-end', flexDirection: locale == 'en' ? "row" : 'row-reverse', height: heightPercentageToDP('5%'), marginTop: 10, width: widthPercentageToDP('25%'), borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name={locale == 'en' ? 'left' : "right"} color={'black'} size={16} />
                <Text style={{ color: 'black', textAlignVertical: 'center', textAlign: 'center', marginLeft: locale == 'en' ? 5 : 0, marginRight: locale == 'en' ? 0 : 5 }}>{t('Back')}</Text>
            </TouchableOpacity>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 20, marginTop: 10 }}>
                <TouchableOpacity onPress={() => setloginScreen(true)}
                    style={{ backgroundColor: loginScreen ? 'black' : '#fff', height: heightPercentageToDP('5%'), width: widthPercentageToDP('40%'), borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "black" }}>
                    <Text style={{ color: loginScreen ? 'white' : 'black', textAlignVertical: 'center', textAlign: 'center' }}>{t('Login')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setloginScreen(false)} style={{ backgroundColor: loginScreen ? 'white' : 'black', borderColor: 'black', borderWidth: 1, height: heightPercentageToDP('5%'), width: widthPercentageToDP('40%'), borderRadius: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: loginScreen ? 'black' : '#fff', textAlignVertical: 'center', textAlign: 'center' }}>{t('Signup')}</Text>
                </TouchableOpacity>
            </View>

            {loginScreen ? (
                <Loginform navigation={props?.navigation} props={props} />
            ) :
                <RegisterForm navigation={props?.navigation} props={props} />
            }
        </View>
    )
}
export default Login;