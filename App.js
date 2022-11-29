import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  LogBox,
  Modal,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import LocalizationContext from './LocalizationContext';
import BottomTab from './Src/BottomTab';
import ScreenWrapper from './Src/Components/ScreenWrapper';
import AboutUs from './Src/Screen/AboutUs';
import DrawerComponent from './Src/Screen/DrawerComponent';
import Home from './Src/Screen/Home';
import InvoiceScreen from './Src/Screen/InvoiceScreen';
import LanguageScreen from './Src/Screen/LanguageScreen';
import Login from './Src/Screen/login';
import Order from './Src/Screen/Order';
import ProductDetail from './Src/Screen/ProductDetail';
import {
  changeAPILanguage,
  changeCountry,
  changeCountryModal,
  changeLanguageModal
} from './Src/Store/Actions/cartAction';
import { COLORS } from './Src/Style/Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {

  React.useEffect(() => {
   console.log('drawer')
  }, [locale])
  

  const { locale, setLocale } = React.useContext(LocalizationContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'back',
        drawerPosition: locale == 'en' ? 'left' : 'right',
        headerShown: false,
      }}
      drawerContent={props => <DrawerComponent {...props} />}>
      <Drawer.Screen name="BottomTab" component={BottomTab} />
      <Drawer.Screen name="ProductDetail" component={ProductDetail} />
    </Drawer.Navigator>
  );
}

function LaunchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function App(props) {
  const { t } = React.useContext(LocalizationContext);
  const { locale, setLocale } = React.useContext(LocalizationContext);

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
        {props?.user?.userData == 'Guest' || props?.user?.userData == null ? (
          <Text style={{ width: 0, height: 0 }} />
        ) : (
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
        )}

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {/* {props?.user?.userData == null ? (
              <Stack.Screen name="Login" component={Login} />
            ) : (
              <> */}
            {props?.cart?.selectedCountry ?
              <>
                <Stack.Screen name="Bottom" component={MyDrawer} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Orders" component={Order} />
                <Stack.Screen name="Invoice" component={InvoiceScreen} />
                <Stack.Screen name="AboutUS" component={AboutUs} />
              </>
              :
              <Stack.Screen name="LanguageScreen" component={LaunchStack} />
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
                      props?.changeCountry(item, props, true);
                      props?.changeCountryModal(false);
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

      <Modal transparent={true} visible={props.cart.LanguageModalShow}>
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
              <TouchableOpacity
                onPress={() => props.changeLanguageModal(false)}>
                <Entypo name="cross" size={24} color={'#373A3C'} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: hp('3.6%'),
                color: '#fff',
                textAlign: 'center',
              }}>
              Select Language
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                paddingVertical: hp('5'),
                paddingHorizontal: 20,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  width: '25%',
                }}>
                {locale == 'en' ? (
                  <TouchableOpacity
                    onPress={async () => {
                      if (locale == 'arb') {
                        var lang = 'en';
                        var lanType = 'https://en.shosharabia.com/';
                      } else {
                        var lang = 'arb';
                        var lanType = 'https://shosharabia.com/';
                      }
                      setLocale(lang);
                      await props?.changeAPILanguage(lanType);
                      props.changeLanguageModal(false);
                      await AsyncStorage.setItem('@language', lang)
                      await AsyncStorage.setItem('@SelectLanguageAPI', lanType)
                    }}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                      {locale == 'arb' ? 'English' : 'العربية'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ flexDirection: 'row' }}>
                    <Text onPress={() => {
                      ToastAndroid.show("Already Selected That Language!", ToastAndroid.LONG);
                    }} style={{ color: '#fff' }}>العربية</Text>
                  </View>
                )}
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  width: '25%',
                }}>
                {locale == 'arb' ? (
                  <TouchableOpacity
                    onPress={async () => {
                      if (locale == 'arb') {
                        var lang = 'en';
                        var lanType = 'https://en.shosharabia.com/';
                      } else {
                        var lang = 'arb';
                        var lanType = 'https://shosharabia.com/';
                      }
                      setLocale(lang);
                      await props?.changeAPILanguage(lanType);
                      props.changeLanguageModal(false);
                      await AsyncStorage.setItem('@language', lang)
                      await AsyncStorage.setItem('@SelectLanguageAPI', lanType)
                    }}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                      {locale == 'arb' ? 'English' : 'العربية'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ flexDirection: 'row' }}>
                    <Text onPress={() => {
                      ToastAndroid.show("Already Selected That Language!", ToastAndroid.LONG);
                    }} style={{ color: '#fff' }}>English</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={props?.cart?.pageLoader}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      </Modal>

      <Toast />
    </ScreenWrapper>
  );
}

const mapStateToProps = ({ cart, user }) => ({
  cart,
  user,
});

export default connect(mapStateToProps, {
  changeCountryModal,
  changeCountry,
  changeLanguageModal,
  changeAPILanguage,
})(App);
