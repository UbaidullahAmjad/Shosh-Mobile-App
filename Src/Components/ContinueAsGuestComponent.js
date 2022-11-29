import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import store from '../Store'
import { LoginasGuest } from '../Store/Actions/UserAction'
import LocalizationContext from '../../LocalizationContext';

export default function ContinueAsGuestComponent({ props }) {
    const { t } = React.useContext(LocalizationContext);
    const { locale, setLocale } = React.useContext(LocalizationContext);

    return (
        <View style={{ flexDirection: locale == 'en' ? 'row' : 'row-reverse', justifyContent: 'center', alignContent: 'center' }}>
            <TouchableOpacity onPress={() => store.dispatch(LoginasGuest(props))} style={{ height: 40, alignSelf: 'center', top: 10 }}>
                <Text style={{ color: 'black', textAlignVertical: 'center', textAlign: 'center', alignSelf: 'center' }}>{t('Or continue as')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => store.dispatch(LoginasGuest(props))} style={{ height: 40, alignSelf: 'center', top: 10 }}>
                <Text style={{ color: 'black', textAlignVertical: 'center', textAlign: 'center', alignSelf: 'center', textDecorationLine: 'underline', color: 'blue' }}> {t('guest')}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})