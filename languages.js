// In App.js in a new project

import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './Src/Style/Constants/Colors';
import LocalizationContext from './LocalizationContext';
import Home from './Src/Screen/Home';
import Main from './Src/Screen/Main';
import Shop from './Src/Screen/Shop';
import { LogBox } from 'react-native';
import ScreenWrapper from './Src/Components/ScreenWrapper';
import Contact from './Src/Screen/Contact';
import CheckOut from './Src/Screen/CheckOut';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { changeCountryModal, changeCountry } from './Src/Store/Actions/cartAction';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProductDetail from './Src/Screen/ProductDetail';
import InvoiceScreen from './Src/Screen/InvoiceScreen';



LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

function App(props) {
  const { t } = React.useContext(LocalizationContext);
  const country = [

    {
      name: t('Saudi Arabia'),
      img: require('./Src/Assets/Images/sa.png'),
    },
    {
      name: t('Kuwait'),
      img: require('./Src/Assets/Images/kw.png'),
    },
    {
      name: t('Bahrain'),
      img: require('./Src/Assets/Images/bh.png'),
    },
    {
      name: t('Oman'),
      img: require('./Src/Assets/Images/om.png'),
    },
    {
      name: t('Qatar'),
      img: require('./Src/Assets/Images/kw.png'),
    },
    {
      name: t('UAE'),
      img: require('./Src/Assets/Images/ae.png'),
    },
  ];

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.textDarkColor,
            paddingVertical: 12,
            paddingHorizontal: 12,
            fontSize: 14,
          }}>
          {t('app header')}
        </Text>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {props?.cart?.selectedCountry
              ?
              <>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Shop" component={Shop} />
                <Stack.Screen name="Contact" component={Contact} />
                <Stack.Screen name="CheckOut" component={CheckOut} />
                <Stack.Screen name="Invoice" component={InvoiceScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
              </>
              :
              <Stack.Screen name="Home" component={Home} />
            }

          </Stack.Navigator>
        </NavigationContainer>
      </View>
      <Modal transparent={true} visible={props.cart.CountryModalShow}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.9)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              padding: '4%',
              backgroundColor: '#000',
              borderRadius: 12,
            }}>
            <View style={{ flexDirection: 'row-reverse' }}>
              <TouchableOpacity onPress={() => props.changeCountryModal(false)}>
                <Entypo name="cross" size={24} color={'#373A3C'} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: hp('3.6%'),
                color: '#fff',
                textAlign: 'center',
              }}>
              Change Country
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                paddingTop: 8,
              }}>
              {country.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props?.changeCountry(item)
                      props?.changeCountryModal(false)
                    }}
                    key={index}
                    style={{
                      flexDirection: 'row',
                      width: '46%',
                      marginTop: hp('3%'),
                    }}>
                    <View>
                      <Image
                        source={item.img}
                        resizeMode="contain"
                        style={{ width: wp('10%'), height: hp('5%') }}
                      />
                    </View>
                    <View
                      style={{
                        width: '40%',
                        justifyContent: 'center',
                        marginLeft: 4,
                      }}>
                      <Text numberOfLines={3} style={{ color: '#fff' }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={props?.cart?.pageLoader}>
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: "center"
        }}>
          <ActivityIndicator size={'large'} />

        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const mapStateToProps = ({ cart }) => ({
  cart,
});

export default connect(mapStateToProps, {
  changeCountryModal, changeCountry
})(App);
