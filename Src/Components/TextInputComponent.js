import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import LocalizationContext from '../../LocalizationContext';

export default function TextInputComponent(props) {
    const { t } = React.useContext(LocalizationContext);
    const { locale, setLocale } = React.useContext(LocalizationContext);

    return (
        <View style={{ marginTop: props.title == 'Username' ? 0 : heightPercentageToDP('1.5%') }}>
            <Text style={{ marginHorizontal: widthPercentageToDP('6%'), fontWeight: "bold", fontSize: heightPercentageToDP('2%') }}>{props.title}</Text>
            <TextInput
                value={props?.value}
                onChangeText={props?.onchange}
                secureTextEntry={props?.secure ? true : false}
                style={{
                    marginHorizontal: 20,
                    marginTop: 10,
                    borderRadius: 20,
                    borderColor: 'black',
                    borderWidth: 1,
                    paddingLeft: widthPercentageToDP('2%'),
                    color: "black",
                    fontSize: heightPercentageToDP('1.8%'),
                    textAlign: locale == 'en' ? 'left' : 'right'
                }}
                placeholder={props?.placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({})