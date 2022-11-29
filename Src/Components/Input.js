import React from "react";
import { TextInput } from 'react-native';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import LocalizationContext from "../../LocalizationContext";
import { COLORS } from "../Style/Constants/Colors";

export default function Input({ refs, placeholder, value, onchange, keyboardType2, borderwidth, maxLengthNumber }) {
    const { t, locale } = React.useContext(LocalizationContext);

    return (
        <TextInput
            ref={refs}
            maxLength={maxLengthNumber}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textMainColor}
            keyboardType={keyboardType2}
            style={{
                borderWidth: 1,
                borderRadius: 4,
                paddingLeft: wp('3%'),
                marginTop: hp('1.5%'),
                borderColor: borderwidth,
            }}
            textAlign={locale == 'en' ? 'left' : 'right'}
            value={value}
            onChangeText={onchange}
        />
    )
}

