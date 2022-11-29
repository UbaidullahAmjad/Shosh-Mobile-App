import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import ProductDetail from './Screen/ProductDetail';
import InvoiceScreen from './Screen/InvoiceScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WelcomeScreen from './Screen/WelcomeScreen';
import Contact from './Screen/Contact';
import CheckOut from './Screen/CheckOut';
import Home from './Screen/Home';
import Main from './Screen/Main';
import Shop from './Screen/Shop';
// import Order from './Screen/Orders'
import { connect } from 'react-redux';
import circle from './Assets/Images/Capture2.png'
import LocalizationContext from '../LocalizationContext';
import store from './Store';
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import profileimg from '../Src/Assets/Images/personimg.png';
import productimg from '../Src/Assets/Images/prdocutsimg.png';
import Order from './Screen/Order'
import LanguageScreen from './Screen/LanguageScreen';

const Tab = createBottomTabNavigator();

function BottomTab(props) {
    const { locale, setLocale } = React.useContext(LocalizationContext);
    const { t } = React.useContext(LocalizationContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#C7D885',
                tabBarInactiveTintColor: "#fff",
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: 'black',
                    height: 50,
                    borderTopColor: 'black',
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 30,
                    marginBottom: 12
                },
                tabBarIconStyle: { marginTop: '6%' },
                tabBarLabelStyle: {
                    marginBottom: '7%',
                }
            })}>
            {/* {props?.cart?.selectedCountry
                ?
                <> */}
            <Tab.Screen
                name="Main"
                component={Main}
                options={{
                    headerShown: false,
                    tabBarLabel: t('Home'),
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen name="Shop" component={Shop} options={{
                headerShown: false,
                tabBarLabel: t('Products'),
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="menu" color={color} size={20} />
                ),
            }} />

            <Tab.Screen name="CheckOut" component={CheckOut}
                options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                if (locale == 'en') {
                                    if (store.getState().cart.engCart.length == 0) {
                                        props.navigation.navigate('Shop')
                                        console.log('kindly Add Product in cart')
                                    }
                                    else {
                                        props.navigation.navigate('CheckOut')
                                    }
                                }
                                else {
                                    if (store.getState().cart.cart.length == 0) {
                                        props.navigation.navigate('Shop')
                                        console.log('kindly Add Product in cart')
                                    }
                                    else {
                                        props.navigation.navigate('CheckOut')
                                    }
                                }
                            }}>
                            <ImageBackground
                                resizeMode='cover'
                                borderRadius={50}
                                style={{
                                    height: 70,
                                    width: 70,
                                    marginBottom: '60%',
                                }}
                                source={circle}>
                                <Text style={{ fontSize: 10, backgroundColor: "red", color: "white", borderRadius: 50, top: 15, right: 20, paddingHorizontal: 2, position: "absolute" }}>{locale == 'en' ? props.cart.engCart.length : props.cart.cart.length}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    )
                }} />
            <Tab.Screen name="Orders" component={Order}
                options={{
                    headerShown: false,
                    tabBarLabel: t('Orders'),
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="package" color={color} size={20} />
                    ),
                }} />
            <Tab.Screen name="Welcome" component={WelcomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: t('More'),
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" color={color} size={20} />
                    ),
                }} />
            {/* </>
                :
                null
            } */}
        </Tab.Navigator >
    )
}

const mapStateToProps = ({ cart }) => ({
    cart,
});

export default connect(mapStateToProps, {})(BottomTab);