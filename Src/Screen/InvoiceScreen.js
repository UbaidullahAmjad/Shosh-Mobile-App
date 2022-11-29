import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LocalizationContext from '../../LocalizationContext';

export default function InvoiceScreen(props) {
    const { t, locale } = React.useContext(LocalizationContext);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (props?.route?.params?.keyScreen == 'OrderScreen') {
                    props.navigation.goBack()
                }
                else {
                    props.navigation.navigate('Main')
                }
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AntDesign onPress={() => {
                    if (props?.route?.params?.keyScreen == 'OrderScreen') {
                        props.navigation.goBack()
                    }
                    else {
                        props.navigation.navigate('Main')
                    }
                }}
                    color='black' name='back' size={24} style={{ position: "absolute", left: 10, backgroundColor: "silver", padding: 5, borderRadius: 50 }} />
                <Text style={{ color: "black", textAlign: "center", fontSize: heightPercentageToDP('3.5%') }}>{locale == 'en' ? 'Order Summary' : 'ملخص الطلب'}</Text>
            </View>

            <View style={{ flexDirection: locale == 'en' ? "row" : 'row-reverse', alignItems: "center", justifyContent: "space-between", padding: 10, marginTop: 10 }}>
                <Text> {locale == 'en' ? 'Order ID' : 'رقم التعريف الخاص بالطلب'} </Text>
                <Text>{props.route.params.Order_Place.id} </Text>
            </View>

            <View style={{ flexDirection: locale == 'en' ? "row" : 'row-reverse', alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <Text> {locale == 'en' ? 'Person Name' : 'اسم الشخص'} </Text>
                <Text>{props.route?.params?.Order_Place?.billing?.first_name} </Text>
            </View>

            <View style={{ flexDirection: locale == 'en' ? "row" : 'row-reverse', alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <Text> {locale == 'en' ? 'Person Email' : 'البريد الإلكتروني للشخص'} </Text>
                <Text>{props.route?.params?.Order_Place?.billing?.email} </Text>
            </View>

            <View style={{ flexDirection: locale == 'en' ? "row" : 'row-reverse', alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <Text> {locale == 'en' ? 'Shipping Name' : 'اسم الشحنة'} </Text>
                <Text>{props.route?.params?.Order_Place?.shipping?.address_1} </Text>
            </View>

            <View style={{ flexDirection: locale == 'en' ? "row" : 'row-reverse', alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <Text> {locale == 'en' ? 'Shipping Address' : 'عنوان الشحن'} </Text>
                <Text>{props.route?.params?.Order_Place?.shipping?.address_2} </Text>
            </View>
            <View style={{ flexDirection: locale == 'en' ? "row" : 'row-reverse', alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <Text> {locale == 'en' ? 'Total Discount' : 'إجمالي الخصم'} </Text>
                <Text>{props.route?.params?.Order_Place?.discount_total} </Text>
            </View>
            <View style={{ flexDirection: locale == 'en' ? "row" : 'row-reverse', alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <Text> {locale == 'en' ? 'Total Shipping' : 'إجمالي الشحن'} </Text>
                <Text>{props.route?.params?.Order_Place?.shipping_total} </Text>
            </View>
            <View style={{ flexDirection: locale == 'en' ? "row" : 'row-reverse', alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <Text style={{fontWeight:"bold"}}> {locale == 'en' ? 'Total' : 'المجموع'} </Text>
                <Text style={{fontWeight:'bold'}}>{props.route?.params?.Order_Place?.total} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})