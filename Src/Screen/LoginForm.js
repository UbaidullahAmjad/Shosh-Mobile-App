import React, { useState } from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { connect } from 'react-redux';
import ContinueAsGuestComponent from "../Components/ContinueAsGuestComponent";
import TextInputComponent from "../Components/TextInputComponent";
import { UserLogin } from "../Store/Actions/UserAction";
import Toast from 'react-native-toast-message';
import LocalizationContext from "../../LocalizationContext";

function LoginForm(props) {
    const { t } = React.useContext(LocalizationContext);

    const [Email, setname] = useState("");
    const [Password, setpassword] = useState("")
    const [isLoading, setLoading] = useState(false)

    const loginUser = async () => {
        setLoading(true)
        if (Email != "" && Password != '') {
            await props?.UserLogin(Email, Password, props)
            setLoading(false)
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Incorrect Fields!',
                text2: 'Please fill all fields correctly'
            });
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
                        style={{ margin: 20, width: widthPercentageToDP('40%'), tintColor: "black", height: heightPercentageToDP('25%'), alignSelf: "center" }}
                    />

                    <TextInputComponent
                        title={t('Email')}
                        value={Email}
                        onchange={(value) => setname(value)}
                        placeholder={t('Email')} />

                    <TextInputComponent
                        title={t('Password')}
                        value={Password}
                        onchange={(value) => setpassword(value)}
                        placeholder={t('Password')}
                        secure
                    />

                    <TouchableOpacity
                        onPress={loginUser}>
                        <View style={{ backgroundColor: 'black', width: '90%', height: heightPercentageToDP('6%'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 30, borderRadius: 20 }}>
                            {isLoading
                                ? <ActivityIndicator size={'small'} color='white' />
                                : <Text style={{ color: 'white', fontSize: heightPercentageToDP('2%') }}>{t('Login')}</Text>
                            }
                        </View>
                    </TouchableOpacity>

                    {props?.props?.route?.params?.continueAsGuestOption
                        ? <ContinueAsGuestComponent props={props} />
                        : null}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const mapStateToProps = ({ }) => ({

})
export default connect(mapStateToProps, {
    UserLogin
})(LoginForm)
