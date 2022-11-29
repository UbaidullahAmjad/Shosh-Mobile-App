import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import LocalizationContext from '../../LocalizationContext';
import { t } from '../i18n/i18n';
import store from '../Store';
import { COLORS } from '../Style/Constants/Colors';
import { changeAPILanguage } from '../Store/Actions/cartAction';
import { ProductDetailData } from '../Store/Actions/cartAction';

function Header({ cart, menu, navigation, cart2 }) {
  const { locale, setLocale } = React.useContext(LocalizationContext);
  const [meanu, setmenu] = useState(false);

  const ReturnCart = ({ cart }) => {
    return (
      <View>
        {cart ? (
          <TouchableOpacity
            onPress={() => {
              if (locale == 'en') {
                if (store.getState().cart.engCart.length == 0) {
                  navigation.navigate('Shop');
                  console.log('kindly Add Product in cart');
                } else {
                  navigation.navigate('CheckOut');
                }
              } else {
                if (store.getState().cart.cart.length == 0) {
                  navigation.navigate('Shop');
                  console.log('kindly Add Product in cart');
                } else {
                  navigation.navigate('CheckOut');
                }
              }
            }}
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                width: widthPercentageToDP('5%'),
                fontSize: 10,
                backgroundColor: 'red',
                color: 'white',
                position: 'absolute',
                borderRadius: 50,
                top: -10,
                left: 10,
                right: 0,
                textAlign: 'center',
              }}>
              {locale == 'en' ? cart2.engCart.length : cart2.cart.length}
            </Text>
            <AntDesign name="shoppingcart" color={'#fff'} size={24} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          height: 64,
          width: '100%',
          backgroundColor: COLORS.primary,
        }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ width: '15%', justifyContent: 'center' }}>
            {locale == 'arb' ? (
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <ReturnCart cart={cart} />
              </View>
            ) : menu ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}
                style={{
                  justifyContent: 'center',
                  paddingRight: 6,
                }}>
                {meanu ? (
                  <Entypo name="cross" color={'#fff'} size={24} />
                ) : (
                  <Entypo
                    onPress={() => navigation.openDrawer()}
                    name="menu"
                    color={'#fff'}
                    size={24}
                  />
                )}
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              width: '70%',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Main')}
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: "center",
                alignSelf: "center"
              }}>
              <Image
                source={require('../Assets/Images/logo.png')}
                resizeMode="contain"
                style={{ width: 60, height: 60, }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '15%',
              flexDirection: 'row-reverse',
            }}>
            {locale == 'en' ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                  paddingLeft: 6,
                }}>
                <ReturnCart cart={cart} />
              </View>
            ) : menu ? (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{
                  justifyContent: 'center',
                  paddingRight: 6,
                }}>
                {meanu ? (
                  <Entypo name="cross" color={'#fff'} size={24} />
                ) : (
                  <Entypo name="menu" color={'#fff'} size={24} />
                )}
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      {meanu ? (
        <View
          style={{
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            width: '100%',
            padding: '4%',
            alignItems: locale == 'arb' ? 'flex-end' : 'flex-start',
            elevation: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Main');
              setmenu(false);
            }}>
            <Text style={{ color: COLORS.textDarkColor }}>{t('Home')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Shop');
              setmenu(false);
            }}>
            <Text style={{ paddingVertical: 6, color: COLORS.textDarkColor }}>
              {t('Shop')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Contact');
              setmenu(false);
            }}>
            <Text style={{ color: COLORS.textDarkColor }}>{t('Contact')}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => ({
  cart2: state.cart
});

export default connect(mapStateToProps, {
  changeAPILanguage,
  ProductDetailData,
})(Header);
