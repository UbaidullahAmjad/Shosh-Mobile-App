import React, { useState, useRef } from 'react';
import {
  ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { RadioButton } from 'react-native-paper';
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import LocalizationContext from '../../LocalizationContext';
import Input from '../Components/Input';
import {
  Secret_key, STRIPE_PUBLISHABLE_KEY
} from '../Confiq/Confiq';
import { cityValidation, emailValidation, nameValidation, PhoneValidation } from '../Confiq/helper';
import store from '../Store';
import { addtoCart, couponsData, OrderPlace, PlusAndMinusProduct, deleteFromCart, CheckOutFieldsData } from '../Store/Actions/cartAction';
import { USER_ADDRESS, USER_CITY, USER_COUNTRY, USER_COUNTRY_CODE, USER_CREDIT_CARD_CVC, USER_CREDIT_CARD_EXPIRY_DATE, USER_CREDIT_CARD_NUMBER, USER_EMAIL, USER_NAME, USER_PHONE } from '../Store/Actions/type';
import { COLORS } from '../Style/Constants/Colors';

// const CURRENCY = 'usd';
var CURRENCY = null;
var CARD_TOKEN = null;

function CheckOut(props) {

  const [fname, setFirstName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [town, setTown] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [phone, setPhone] = React.useState('')

  const [loader, setLoader] = React.useState(false)
  const [CouponTextDisplay, setCouponTextDisplay] = React.useState(false)
  const [CouponLoader, setCouponLoader] = React.useState(false)
  const [CouponValue, setCouponValue] = React.useState(false)
  const [Coupomdata, setCoupomdata] = React.useState('')

  const [cvc, setCVC] = React.useState('')
  const [date, setDate] = React.useState('')
  const [cardNumber, setCardNumber] = React.useState('')

  const [firstRadio, setFirstRadio] = React.useState(false)
  const [secondRadio, setSecondRadio] = React.useState(true)
  const [borderTextInputColor, setBorderTextInputColor] = React.useState(false)

  const [totalSubValue, setTotalSubValue] = React.useState(0)
  const [onlinePriceDiscount, setOnlinePriceDiscount] = React.useState(0)
  const [OverAlTotal, setOverAlTotal] = React.useState(0)

  const [inputValue, setInputValue] = useState('')
  const [CouponInputvalue, setCouponInputvalue] = useState('')
  const [phoneCode, setPhoneCode] = useState('')

  var totalcouponvalue = totalSubValue * CouponValue
  var newCouponValue = totalcouponvalue.toString().substr(0, totalcouponvalue.toString().length - 2);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([]);
  const { t, locale } = React.useContext(LocalizationContext);

  const AccountInromation = useRef();
  const CardDateInromation = useRef();
  const CVCInromation = useRef();

  const UserNameInromation = useRef();
  const emailInromation = useRef();
  const addressInromation = useRef();
  const townInromation = useRef();
  const phoneInromation = useRef();

  const CouponInformation = useRef();

  React.useEffect(() => {

    CURRENCY = store.getState().cart.selectedCountry.name == 'عمان' || store.getState().cart.selectedCountry.name == 'Oman' ? 'OMR' : null
    store.getState().cart.selectedCountry.name == 'قطر' || store.getState().cart.selectedCountry.name == 'Qatar' ? 'QAR' : null
    store.getState().cart.selectedCountry.name == 'البحرين' || store.getState().cart.selectedCountry.name == 'Bahrain' ? 'BHD' : null
    store.getState().cart.selectedCountry.name == 'الإمارات العربية المتحدة' || store.getState().cart.selectedCountry.name == 'UAE' ? 'AED' : null
    store.getState().cart.selectedCountry.name == 'المملكة العربية السعودية' || store.getState().cart.selectedCountry.name == 'Saudi Arabia' ? 'SAR' : null

    if (props?.user?.userData?.ID || props?.user?.userData?.id) {
      console.log("User Data: ", props?.user?.userData)
      setFirstName(props?.user?.UserInformation?.display_name)
      setEmail(props?.user?.UserInformation?.user_email)
    }
    else {
      console.log("User Data: Null")
      setFirstName(props?.cart?.username)
      setEmail(props?.cart?.userEmail)
    }
    setAddress(props?.cart?.userAddress)
    setTown(props?.cart?.userTown)
    setPhone(props?.cart?.userPhone)
    setCardNumber(props?.cart?.userCreditCardNumber)
    setCVC(props?.cart?.userCreditCardCVC)
    setDate(props?.cart?.userCreditCardExpiryDate)

    let value = returncountry(store.getState().cart.selectedCountry.name, locale)
    setValue(value)
    let countryCode = returnCountryCode(value)
    setPhoneCode(countryCode)
    setItems(
      [
        { label: locale == 'en' ? 'Bahrain' : 'البحرين', value: locale == 'en' ? 'Bahrain' : 'البحرين' },
        { label: locale == 'en' ? 'Oman' : 'عمان', value: locale == 'en' ? 'Oman' : 'عمان' },
        { label: locale == 'en' ? 'Qatar' : 'قطر', value: locale == 'en' ? 'Qatar' : 'قطر' },
        { label: locale == 'en' ? 'UAE' : 'الإمارات العربية المتحدة', value: locale == 'en' ? 'UAE' : 'الإمارات العربية المتحدة' },
        { label: locale == 'en' ? 'Kuwait' : 'الكويت', value: locale == 'en' ? 'Kuwait' : 'الكويت' },
        { label: locale == 'en' ? 'Saudi Arabia' : 'المملكة العربية السعودية', value: locale == 'en' ? 'Saudi Arabia' : 'المملكة العربية السعودية' },
      ]
    )
    let total = 0
    if (locale == 'en') {
      for (let i = 0; i < props?.cart.engCart.length; i++) {
        total = total + props?.cart.engCart[i].quantity * props?.cart.engCart[i].cartItem.sale_price
      }
    }
    else {
      for (let i = 0; i < props?.cart.cart.length; i++) {
        total = total + props?.cart.cart[i].quantity * props?.cart.cart[i].cartItem.sale_price
      }
    }

    if (secondRadio) {
      if (CouponValue != '') {
        let Percentagecalculator = (total) * (CouponValue / 100)
        let percent_value = Math.floor(Percentagecalculator)
        setTotalSubValue(total)
        let Percentagecalculator1 = (total) * (9 / 100)
        let percent_value1 = Math.floor(Percentagecalculator1)
        setOnlinePriceDiscount(percent_value1)
        setOverAlTotal(total - percent_value - percent_value1)
      }
      else {
        let Percentagecalculator = (total) * (9 / 100)
        let percent_value = Math.floor(Percentagecalculator)
        setTotalSubValue(total)
        setOverAlTotal(total - percent_value)
        setOnlinePriceDiscount(percent_value)
      }
    } else {
      if (CouponValue != '') {
        let Percentagecalculator = (total) * (CouponValue / 100)
        let percent_value = Math.floor(Percentagecalculator)
        setTotalSubValue(total)
        setOverAlTotal(total - percent_value)
        setOnlinePriceDiscount(0)
      }
      else {
        setTotalSubValue(total)
        setOverAlTotal(total)
        setOnlinePriceDiscount(0)
      }
    }
  }, [props.cart.cart, props?.user?.UserInformation, props.cart.engCart, firstRadio, secondRadio, CouponTextDisplay, locale])

  {/******************************** Fetch Coupon Code *********************************/ }
  const _fetch_Coupin = async () => {
    if (inputValue != '') {
      setCouponLoader(true)
      let result = await props?.couponsData(inputValue)
      if (result.length > 0) {
        setCouponTextDisplay(true)
        setCoupomdata('')
        setCouponInputvalue(inputValue)
        var value = parseInt(result[0]?.amount)
        setCouponValue(value)
        if (secondRadio) {
          if (value > 9) {
            let Percentagecalculator = (totalSubValue) * (value / 100)
            let percent_value = Math.floor(Percentagecalculator)
            setTotalSubValue(totalSubValue)
            setOverAlTotal(totalSubValue - percent_value)
            setOnlinePriceDiscount(onlinePriceDiscount)
          }
        } else {
          let Percentagecalculator = (totalSubValue) * (value / 100)
          let percent_value = Math.floor(Percentagecalculator)
          setTotalSubValue(totalSubValue)
          setOverAlTotal(totalSubValue - percent_value)
          setOnlinePriceDiscount(onlinePriceDiscount)
        }
      }
      else {
        setCoupomdata('Coupon Does not exist')
      }
      setCouponLoader(false)
    }
    else {
      CouponInformation.current.focus()
    }
  }
  {/************************************************************************************/ }


  {/******************************** Fetch Credit Card Code *********************************/ }
  function getCreditCardToken() {
    let split = date.split('/')
    let carNumberWithOutSpace = cardNumber.replace(/ /g, '')

    const card = {
      'card[number]': `${carNumberWithOutSpace}`,
      'card[exp_month]': split[0],
      'card[exp_year]': split[1],
      'card[cvc]': `${cvc}`
    };
    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
      },
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).
      then(response => response.json())
      .catch((error) => console.log(error))
  };

  function subscribeUser(creditCardToken) {
    return new Promise((resolve) => {
      CARD_TOKEN = creditCardToken.card.id;
      setTimeout(() => {
        resolve({ status: true });
      }, 1000);
    });
  };

  const onSubmit = async (Data) => {
    setLoader(true)
    let creditCardToken;
    try {
      creditCardToken = await getCreditCardToken();
      console.log('creditCardToken.error:', creditCardToken.error)
      if (creditCardToken.error) {
        alert(locale == 'en' ? `${creditCardToken.error.message}` : `${creditCardToken.error.message}`)
        setLoader(false)
        return;
      }
    } catch (e) {
      console.log("e", e);
      setLoader(false)
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // // Handle any errors from your server
    if (error) {
      alert(error)
    } else {
      let pament_data = await charges();
      console.log('pament_data', pament_data);
      if (pament_data.status == 'succeeded') {
        ToastAndroid.show(locale == 'en' ? "Payment Successfully !" : 'تم الدفع بنجاح!', ToastAndroid.LONG);
        await props?.OrderPlace(Data, props?.navigation, locale)
        setLoader(false)
      }
      else {
        console.log(locale == 'en' ? 'Payment failed' : 'عملية الدفع فشلت');
        ToastAndroid.show(locale == 'en' ? 'Payment failed' : 'عملية الدفع فشلت', ToastAndroid.LONG);
        setLoader(false)
      }
    }
  };

  const charges = async () => {

    console.log("OverAlTotal: ", OverAlTotal)
    console.log("CURRENCY: ", CURRENCY)

    const card = {
      'amount': OverAlTotal,
      'currency': CURRENCY,
      'source': 'tok_visa',
      'description': "Developers Sin Subscription"
    };
    return fetch('https://api.stripe.com/v1/charges', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${Secret_key}`
      },
      // Use a proper HTTP method
      method: 'POST',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json());
  };
  {/********************************************************************************************/ }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="stretch"
          style={{
            width: wp('10%'),
            height: hp('5%'),
          }}
          source={require('../Assets/Images/logo.png')}
        />
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              justifyContent: 'center',
              marginRight: wp('2%'),
            }}>
            <SimpleLineIcons name="lock" color={'#00B915'} size={hp('3%')} />
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: hp('1.4%'), color: '#00B915' }}>
              {t('Secure CheckOut')}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}>
        <View style={styles.body}>
          <Text
            style={{
              color: '#008000',
              padding: 8,
              borderWidth: 2,
              borderColor: '#008000',
              borderRadius: 100,
              textAlign: 'center',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: hp('1.4%'),
            }}>
            {t('You have free shipping!')}
          </Text>
          <View style={styles.card}>
            <Text style={{ color: COLORS.textDarkColor }}>
              {t('Customer Informations')}
            </Text>
            <Input
              refs={UserNameInromation}
              borderwidth={borderTextInputColor && (fname == '' || fname == null || nameValidation(fname) == false) ? 'red' : 'silver'}
              value={fname}
              onchange={(txt) => {
                let value = nameValidation(txt)
                if (value) {
                  setFirstName(txt)
                  props?.CheckOutFieldsData(USER_NAME, fname)
                }
                else {
                  setFirstName(txt)
                }
              }}
              placeholder={t('Full Name *')}
              keyboardType2='default' />
            <Input
              refs={emailInromation}
              borderwidth={borderTextInputColor && (email == '' || email == null || emailValidation(email) == false) ? 'red' : 'silver'}
              value={email}
              onchange={(txt) => {
                let value = emailValidation(txt)
                if (value) {
                  setEmail(txt)
                  props?.CheckOutFieldsData(USER_EMAIL, email)
                }
                else {
                  setEmail(txt)
                }
              }}
              placeholder={t('Email *')}
              keyboardType2='default' />
          </View>
          <View style={[styles.card, { marginTop: hp('2.5%'), zIndex: 1 }]}>
            <Text style={{ color: COLORS.textDarkColor }}>{t('Shipping Address')}</Text>

            <DropDownPicker
              placeholder={locale == 'en' ? 'Select an item' : 'حدد عنصر'}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={(item) => {
                setValue(item)
                let countryCode = returnCountryCode(item)
                setPhoneCode(countryCode)
                props?.CheckOutFieldsData(USER_COUNTRY, item)
                props?.CheckOutFieldsData(USER_COUNTRY_CODE, countryCode)
              }}
              style={{
                borderWidth: 1,
                borderColor: borderTextInputColor && (value == '' || value == null) ? 'red' : '#DDDDDD',
                marginTop: hp('1%')
              }}
              textStyle={{
                color: COLORS.textMainColor,
              }}
              dropDownContainerStyle={{
                borderColor: '#DDDDDD',
              }}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
            />

            <Input refs={townInromation}
              borderwidth={borderTextInputColor && (town == '' || town == null || cityValidation(town) == false) ? 'red' : '#DDDDDD'}
              value={town}
              onchange={(txt) => {
                let value = cityValidation(txt)
                if (value) {
                  setTown(txt)
                  props?.CheckOutFieldsData(USER_CITY, town)
                }
                else {
                  setTown(txt)
                }
              }}
              placeholder={t('Town / City *')}
              keyboardType2='default' />

            <Input refs={addressInromation}
              borderwidth={borderTextInputColor && (address == '' || address == null) ? 'red' : '#DDDDDD'}
              value={address}
              onchange={(txt) => {
                setAddress(txt)
                props?.CheckOutFieldsData(USER_ADDRESS, address)
              }}
              placeholder={t('Address *')}
              keyboardType2='default' />

            <View style={{
              flexDirection: locale == 'en' ? "row" : 'row-reverse',
              marginTop: hp('1.5%'),
              alignItems: "center",
              borderRadius: 4,
              borderWidth: 1,
              borderColor: borderTextInputColor && (phone == '' || phone == null || PhoneValidation(phone) == false) ? 'red' : '#DDDDDD',
            }}>
              <Text style={{ padding: 5, color: "black" }}>{phoneCode}</Text>
              <TextInput
                maxLength={10}
                ref={phoneInromation}
                placeholder={t('3600 992 123 *')}
                placeholderTextColor={COLORS.textMainColor}
                keyboardType='number-pad'
                style={{
                  paddingLeft: wp('3%'),
                }}
                textAlign={locale == 'en' ? 'left' : 'right'}
                value={phone}
                onChangeText={(txt) => {
                  let value = PhoneValidation(txt)
                  if (value) {
                    setPhone(txt)
                    props?.CheckOutFieldsData(USER_PHONE, phone)
                  }
                  else {
                    setPhone(txt)
                  }
                }}
              />
            </View>

            <View
              style={{
                marginTop: hp('1.5%'),
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#DDDDDD',
                padding: '5%',
                borderRadius: 4,
              }}>
              <Text style={{ color: COLORS.textMainColor }}>{t('Free shipping')}</Text>
              <Text style={{ color: COLORS.textMainColor }}>{t('Free')}</Text>
            </View>
          </View>
          <View style={[styles.card, { marginTop: hp('2.5%'), zIndex: 0 }]}>
            <Text style={{ color: COLORS.textDarkColor }}>{t('Order Details')}</Text>
            {locale == "en" ? (
              props.cart.engCart.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: locale == 'en' ? 'row' : 'row-reverse',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      borderBottomColor: '#DDDDDD',
                      borderBottomWidth: 1,
                      paddingBottom: hp('3%'),
                    }}>
                    <View style={{ flexDirection: locale == 'en' ? 'row' : 'row-reverse' }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: '#DDDDDD',
                          marginTop: hp('2.5%'),
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{
                            width: wp('20%'),
                            height: hp('10%'),
                          }}
                          source={require('../Assets/Images/addtochart1.jpg')}
                        />
                      </View>
                      <View style={{ justifyContent: 'center', alignItems: "center", marginLeft: locale == 'en' ? wp('2%') : 0, marginRight: locale == 'en' ? 0 : wp('2%') }}>
                        <Text
                          style={{
                            color: COLORS.textDarkColor,
                            fontWeight: 'bold',
                            width: wp('20%')
                          }}>
                          {item?.cartItem?.name}
                        </Text>
                        <Text style={{ color: COLORS.textDarkColor, width: wp('20%') }}>
                          {item?.cartItem?.sale_price * item.quantity}
                          {store.getState().cart.selectedCountry.name == 'عمان' || store.getState().cart.selectedCountry.name == 'Oman' ? locale == 'en' ? ',00 OMR' : ' ريال عماني' : null}
                          {store.getState().cart.selectedCountry.name == 'الكويت' || store.getState().cart.selectedCountry.name == 'Kuwait' ? locale == 'en' ? ',00 KWD' : ' دينار كويتي' : null}
                          {store.getState().cart.selectedCountry.name == 'قطر' || store.getState().cart.selectedCountry.name == 'Qatar' ? locale == 'en' ? ',00 QAR' : ' ريال قطري' : null}
                          {store.getState().cart.selectedCountry.name == 'البحرين' || store.getState().cart.selectedCountry.name == 'Bahrain' ? locale == 'en' ? ',00 BHD' : ' دينار بحريني' : null}
                          {store.getState().cart.selectedCountry.name == 'الإمارات العربية المتحدة' || store.getState().cart.selectedCountry.name == 'UAE' ? locale == 'en' ? ',00 AED' : ' درهم إماراتي' : null}
                          {store.getState().cart.selectedCountry.name == 'المملكة العربية السعودية' || store.getState().cart.selectedCountry.name == 'Saudi Arabia' ? locale == 'en' ? ',00 SAR' : ' ريال سعودي ' : null}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: locale == 'en' ? 'row' : 'row-reverse'
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          borderWidth: 1,
                          borderColor: '#DDDDDD',
                          marginLeft: locale == 'en' ? 0 : wp('5%'),
                          marginRight: locale == 'en' ? wp('3%') : 0
                        }}>
                        <TouchableOpacity
                          onPress={async () => {
                            if (item.quantity > 1) {
                              await props?.PlusAndMinusProduct(item.cartItem, item.quantity - 1, locale)
                            }
                          }} style={styles.btn}>
                          <Text
                            style={{
                              color: COLORS.textDarkColor,
                              fontWeight: 'bold',
                            }}>
                            -
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            width: wp('10%'),
                            height: wp('10%'),
                          }}>
                          <Text style={{ color: "black" }}>{item?.quantity}</Text>
                        </View>

                        <TouchableOpacity onPress={async () => {
                          await props?.PlusAndMinusProduct(item.cartItem, item.quantity + 1, locale)
                        }}
                          style={styles.btn}>
                          <Text
                            style={{
                              color: COLORS.textDarkColor,
                              fontWeight: 'bold',
                            }}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <AntDesign name='close' onPress={() => props?.deleteFromCart(item, props.navigation, locale)} color={'grey'} size={16} />
                    </View>
                  </View>
                );
              })
            ) :
              props.cart.cart.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: locale == 'en' ? 'row' : 'row-reverse',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      borderBottomColor: '#DDDDDD',
                      borderBottomWidth: 1,
                      paddingBottom: hp('3%'),
                    }}>
                    <View style={{ flexDirection: locale == 'en' ? 'row' : 'row-reverse' }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: '#DDDDDD',
                          marginTop: hp('2.5%'),
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{
                            width: wp('20%'),
                            height: hp('10%'),
                          }}
                          source={require('../Assets/Images/addtochart1.jpg')}
                        />
                      </View>
                      <View style={{ justifyContent: 'center', alignItems: "center", marginLeft: locale == 'en' ? wp('2%') : 0, marginRight: locale == 'en' ? 0 : wp('2%') }}>
                        <Text
                          style={{
                            color: COLORS.textDarkColor,
                            fontWeight: 'bold',
                            width: wp('20%')
                          }}>
                          {item?.cartItem?.name}
                        </Text>
                        <Text style={{ color: COLORS.textDarkColor, width: wp('20%') }}>
                          {item?.cartItem?.sale_price * item.quantity}
                          {store.getState().cart.selectedCountry.name == 'عمان' || store.getState().cart.selectedCountry.name == 'Oman' ? locale == 'en' ? ',00 OMR' : ' ريال عماني' : null}
                          {store.getState().cart.selectedCountry.name == 'الكويت' || store.getState().cart.selectedCountry.name == 'Kuwait' ? locale == 'en' ? ',00 KWD' : ' دينار كويتي' : null}
                          {store.getState().cart.selectedCountry.name == 'قطر' || store.getState().cart.selectedCountry.name == 'Qatar' ? locale == 'en' ? ',00 QAR' : ' ريال قطري' : null}
                          {store.getState().cart.selectedCountry.name == 'البحرين' || store.getState().cart.selectedCountry.name == 'Bahrain' ? locale == 'en' ? ',00 BHD' : ' دينار بحريني' : null}
                          {store.getState().cart.selectedCountry.name == 'الإمارات العربية المتحدة' || store.getState().cart.selectedCountry.name == 'UAE' ? locale == 'en' ? ',00 AED' : ' درهم إماراتي' : null}
                          {store.getState().cart.selectedCountry.name == 'المملكة العربية السعودية' || store.getState().cart.selectedCountry.name == 'Saudi Arabia' ? locale == 'en' ? ',00 SAR' : ' ريال سعودي ' : null}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: locale == 'en' ? 'row' : 'row-reverse'
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          borderWidth: 1,
                          borderColor: '#DDDDDD',
                          marginLeft: locale == 'en' ? 0 : wp('5%'),
                          marginRight: locale == 'en' ? wp('3%') : 0
                        }}>
                        <TouchableOpacity
                          onPress={async () => {
                            if (item.quantity > 1) {
                              await props?.PlusAndMinusProduct(item.cartItem, item.quantity - 1, locale)
                            }
                          }} style={styles.btn}>
                          <Text
                            style={{
                              color: COLORS.textDarkColor,
                              fontWeight: 'bold',
                            }}>
                            -
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            width: wp('10%'),
                            height: wp('10%'),
                          }}>
                          <Text style={{ color: "black" }}>{item?.quantity}</Text>
                        </View>

                        <TouchableOpacity onPress={async () => {
                          await props?.PlusAndMinusProduct(item.cartItem, item.quantity + 1, locale)
                        }}
                          style={styles.btn}>
                          <Text
                            style={{
                              color: COLORS.textDarkColor,
                              fontWeight: 'bold',
                            }}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <AntDesign name='close' onPress={() => props?.deleteFromCart(item, props.navigation, locale)} color={'grey'} size={16} />
                    </View>
                  </View>
                );
              })
            }

            <View style={[styles.sub, { flexDirection: locale == 'en' ? 'row' : 'row-reverse' }]}>
              <Text style={{ color: COLORS.textDarkColor }}>{t('Sub Total')}</Text>
              <Text style={{ color: COLORS.textDarkColor }}>{totalSubValue}
                {store.getState().cart.selectedCountry.name == 'عمان' || store.getState().cart.selectedCountry.name == 'Oman' ? locale == 'en' ? ',00 OMR' : ' ريال عماني' : null}
                {store.getState().cart.selectedCountry.name == 'الكويت' || store.getState().cart.selectedCountry.name == 'Kuwait' ? locale == 'en' ? ',00 KWD' : ' دينار كويتي' : null}
                {store.getState().cart.selectedCountry.name == 'قطر' || store.getState().cart.selectedCountry.name == 'Qatar' ? locale == 'en' ? ',00 QAR' : ' ريال قطري' : null}
                {store.getState().cart.selectedCountry.name == 'البحرين' || store.getState().cart.selectedCountry.name == 'Bahrain' ? locale == 'en' ? ',00 BHD' : ' دينار بحريني' : null}
                {store.getState().cart.selectedCountry.name == 'الإمارات العربية المتحدة' || store.getState().cart.selectedCountry.name == 'UAE' ? locale == 'en' ? ',00 AED' : ' درهم إماراتي' : null}
                {store.getState().cart.selectedCountry.name == 'المملكة العربية السعودية' || store.getState().cart.selectedCountry.name == 'Saudi Arabia' ? locale == 'en' ? ',00 SAR' : ' ريال سعودي ' : null}
              </Text>
            </View>

            {CouponTextDisplay && <View style={[styles.sub, { flexDirection: locale == 'en' ? 'row' : 'row-reverse' }]}>
              <Text style={{ color: COLORS.textDarkColor }}>{t('Coupon')} {`(${CouponInputvalue})`}</Text>
              <View style={{ flexDirection: locale == 'en' ? 'row' : 'row-reverse', justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: COLORS.textDarkColor }}>{newCouponValue}
                  {store.getState().cart.selectedCountry.name == 'عمان' || store.getState().cart.selectedCountry.name == 'Oman' ? locale == 'en' ? ',00 OMR' : ' ريال عماني' : null}
                  {store.getState().cart.selectedCountry.name == 'الكويت' || store.getState().cart.selectedCountry.name == 'Kuwait' ? locale == 'en' ? ',00 KWD' : ' دينار كويتي' : null}
                  {store.getState().cart.selectedCountry.name == 'قطر' || store.getState().cart.selectedCountry.name == 'Qatar' ? locale == 'en' ? ',00 QAR' : ' ريال قطري' : null}
                  {store.getState().cart.selectedCountry.name == 'البحرين' || store.getState().cart.selectedCountry.name == 'Bahrain' ? locale == 'en' ? ',00 BHD' : ' دينار بحريني' : null}
                  {store.getState().cart.selectedCountry.name == 'الإمارات العربية المتحدة' || store.getState().cart.selectedCountry.name == 'UAE' ? locale == 'en' ? ',00 AED' : ' درهم إماراتي' : null}
                  {store.getState().cart.selectedCountry.name == 'المملكة العربية السعودية' || store.getState().cart.selectedCountry.name == 'Saudi Arabia' ? locale == 'en' ? ',00 SAR' : ' ريال سعودي ' : null}
                </Text>
                <AntDesign onPress={() => {
                  setCouponTextDisplay(false)
                  setCouponValue('')
                  setInputValue('')
                  setCoupomdata('')
                }} style={{ padding: 2, marginLeft: locale == 'en' ? 5 : 0, marginRight: locale == 'en' ? 0 : 5 }} size={16} name='delete' color={'red'} />
              </View>
            </View>}

            <View style={[styles.sub, { flexDirection: locale == 'en' ? 'row' : 'row-reverse' }]}>
              <Text style={{ color: COLORS.textDarkColor }}>
                {t('Online Payment Discount')}
              </Text>
              <Text style={{ color: COLORS.textDarkColor }}>{onlinePriceDiscount}
                {store.getState().cart.selectedCountry.name == 'عمان' || store.getState().cart.selectedCountry.name == 'Oman' ? locale == 'en' ? ',00 OMR' : ' ريال عماني' : null}
                {store.getState().cart.selectedCountry.name == 'الكويت' || store.getState().cart.selectedCountry.name == 'Kuwait' ? locale == 'en' ? ',00 KWD' : ' دينار كويتي' : null}
                {store.getState().cart.selectedCountry.name == 'قطر' || store.getState().cart.selectedCountry.name == 'Qatar' ? locale == 'en' ? ',00 QAR' : ' ريال قطري' : null}
                {store.getState().cart.selectedCountry.name == 'البحرين' || store.getState().cart.selectedCountry.name == 'Bahrain' ? locale == 'en' ? ',00 BHD' : ' دينار بحريني' : null}
                {store.getState().cart.selectedCountry.name == 'الإمارات العربية المتحدة' || store.getState().cart.selectedCountry.name == 'UAE' ? locale == 'en' ? ',00 AED' : ' درهم إماراتي' : null}
                {store.getState().cart.selectedCountry.name == 'المملكة العربية السعودية' || store.getState().cart.selectedCountry.name == 'Saudi Arabia' ? locale == 'en' ? ',00 SAR' : ' ريال سعودي ' : null}
              </Text>
            </View>

            <View
              style={[
                styles.sub,
                {
                  borderBottomColor: '#DDDDDD',
                  borderBottomWidth: 1,
                  paddingBottom: hp('3%'),
                  flexDirection: locale == 'en' ? 'row' : 'row-reverse'
                },
              ]}>
              <Text style={{ color: COLORS.textDarkColor }}>{t('Shipping')}</Text>
              <Text style={{ color: COLORS.textDarkColor }}>{t('Free')}</Text>
            </View>
            <View style={[styles.sub, { flexDirection: locale == 'en' ? 'row' : 'row-reverse' }]}>
              <Text style={{ color: COLORS.textDarkColor }}>{t('Total')}</Text>
              <Text style={{ color: COLORS.textDarkColor }}>{OverAlTotal}
                {store.getState().cart.selectedCountry.name == 'عمان' || store.getState().cart.selectedCountry.name == 'Oman' ? locale == 'en' ? ',00 OMR' : ' ريال عماني' : null}
                {store.getState().cart.selectedCountry.name == 'الكويت' || store.getState().cart.selectedCountry.name == 'Kuwait' ? locale == 'en' ? ',00 KWD' : ' دينار كويتي' : null}
                {store.getState().cart.selectedCountry.name == 'قطر' || store.getState().cart.selectedCountry.name == 'Qatar' ? locale == 'en' ? ',00 QAR' : ' ريال قطري' : null}
                {store.getState().cart.selectedCountry.name == 'البحرين' || store.getState().cart.selectedCountry.name == 'Bahrain' ? locale == 'en' ? ',00 BHD' : ' دينار بحريني' : null}
                {store.getState().cart.selectedCountry.name == 'الإمارات العربية المتحدة' || store.getState().cart.selectedCountry.name == 'UAE' ? locale == 'en' ? ',00 AED' : ' درهم إماراتي' : null}
                {store.getState().cart.selectedCountry.name == 'المملكة العربية السعودية' || store.getState().cart.selectedCountry.name == 'Saudi Arabia' ? locale == 'en' ? ',00 SAR' : ' ريال سعودي ' : null}
              </Text>
            </View>
            <Text style={{ color: COLORS.textDarkColor, marginTop: hp('2.5%') }}>
              {t('Have a coupon? Click here to enter your code')}
            </Text>

            <Input refs={CouponInformation} borderwidth={'#DDDDDD'} value={inputValue} onchange={(txt) => setInputValue(txt)} placeholder={t("Coupon")} keyboardType2='default' />
            <TouchableOpacity
              disabled={CouponLoader}
              onPress={() => _fetch_Coupin()}
              style={{
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp('2.5%'),
                padding: '5%',
              }}>
              {
                CouponLoader
                  ? <ActivityIndicator size={'small'} color='white' style={{ alignSelf: "center" }} />
                  : <Text style={{ color: COLORS.textSecondayColor }}>
                    {t('Apply Coupon')}
                  </Text>
              }
            </TouchableOpacity>

            <Text style={{ textAlign: "center", color: 'red', fontSize: hp('1.5%'), marginTop: hp('1%') }}> {Coupomdata != '' ? (locale == 'en' ? 'Coupon does not exist' : 'القسيمة غير موجودة') : ''}</Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#DDDDDD',
              backgroundColor: '#fff',
              elevation: 1,
              borderRadius: 4,
              marginTop: hp('1.5%'),
            }}>
            <View
              style={{
                paddingHorizontal: wp('4%'),
                paddingVertical: wp('6%'),
              }}>
              <Text style={{ color: COLORS.textDarkColor }}>{t('Payment Methods')}</Text>
              <Text
                style={{
                  color: COLORS.textMainColor,
                  fontSize: hp('1.4%'),
                  marginTop: 6,
                }}>
                {locale == 'en' ? 'All transactions are secure and encrypted. Also, your bank card information is not stored on our servers.' : 'جميع المعاملات آمنة ومشفرة. أيضًا ، لا يتم تخزين معلومات بطاقتك المصرفية على خوادمنا.'}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp('3%'),
                }}>
                <View>
                  <RadioButton
                    value="first"
                    color="#1E8CBE"
                    status={firstRadio ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setFirstRadio(true)
                      setSecondRadio(false)
                    }}
                  />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text
                    style={{ color: COLORS.textDarkColor, fontSize: hp('1.6%') }}>
                    {t('Cash on Delivery')}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View>
                  <RadioButton
                    value="second"
                    color="#1E8CBE"
                    status={secondRadio ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setSecondRadio(true)
                      setFirstRadio(false)
                    }}
                  />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text
                    style={{ color: COLORS.textDarkColor, fontSize: hp('1.6%') }}>
                    {t('Credit Cards (9٪ OFF)')}'
                  </Text>
                </View>
              </View>

              {firstRadio ? null : <View
                style={{
                  flexDirection: 'row-reverse',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      marginRight: wp('1%'),
                    }}>
                    <Image
                      source={require('../Assets/Images/express.png')}
                      resizeMode="stretch"
                      style={{ width: wp('9%'), height: hp('3%') }}
                    />
                  </View>

                  <Image
                    source={require('../Assets/Images/visa.png')}
                    resizeMode="stretch"
                    style={{ width: wp('16%'), height: hp('4%') }}
                  />
                </View>
              </View>
              }
            </View>

            {firstRadio ? null : <>
              <View
                style={{
                  backgroundColor: '#FAFAFA',
                  paddingHorizontal: wp('6%'),
                  paddingVertical: wp('10%'),
                  borderRadius: 4,
                  marginTop: hp('1.5%'),
                }}>
                <View
                  style={{
                    flexDirection: locale == 'en' ? 'row' : 'row-reverse',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: borderTextInputColor && (cardNumber == '' || cardNumber == null) ? 'red' : 'white',
                    width: '100%',
                    borderRadius: 8,
                    elevation: 2,
                  }}>
                  <TextInput
                    maxLength={19}
                    ref={AccountInromation}
                    keyboardType='number-pad'
                    textAlign={locale == 'en' ? 'left' : 'right'}
                    value={cardNumber}
                    onChangeText={(e) => {
                      const inputVal = e.replace(/ /g, ""); //remove all the empty spaces in the input
                      let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits
                      if (inputNumbersOnly.length > 16) {
                        //If entered value has a length greater than 16 then take only the first 16 digits
                        inputNumbersOnly = inputNumbersOnly.substr(0, 16);
                      }
                      // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
                      const splits = inputNumbersOnly.match(/.{1,4}/g);
                      let spacedNumber = "";
                      if (splits) {
                        spacedNumber = splits.join(" "); // Join all the splits with an empty space
                      }
                      setCardNumber(spacedNumber)
                      props?.CheckOutFieldsData(USER_CREDIT_CARD_NUMBER, spacedNumber)
                    }
                    }
                    placeholder="1234 1234 1234 1234"
                    style={{ width: '60%', }}
                  />
                  <View
                    style={{
                      justifyContent: 'center',
                      marginRight: locale == 'en' ? 8 : 0,
                      marginLeft: locale == 'en' ? 0 : 8
                    }}>
                    <AntDesign name="creditcard" color={'gray'} size={18} />
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    marginTop: hp('2%'),
                  }}>
                  <TextInput
                    keyboardType='number-pad'
                    value={date}
                    maxLength={5}
                    ref={CardDateInromation}
                    onChangeText={(e) => {
                      const inputVal = e.replace(/ /g, ""); //remove all the empty spaces in the input
                      let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits
                      if (inputNumbersOnly.length > 4) {
                        //If entered value has a length greater than 16 then take only the first 16 digits
                        inputNumbersOnly = inputNumbersOnly.substr(0, 4);
                      }
                      // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
                      const splits = inputNumbersOnly.match(/.{1,2}/g);
                      let spacedNumber = "";
                      if (splits) {
                        spacedNumber = splits.join("/"); // Join all the splits with an empty space
                      }
                      setDate(spacedNumber)
                      props?.CheckOutFieldsData(USER_CREDIT_CARD_EXPIRY_DATE, spacedNumber)
                    }}
                    placeholder="MM / YY"
                    textAlign={locale == 'en' ? 'left' : 'right'}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      elevation: 2,
                      borderWidth: 1,
                      borderColor: borderTextInputColor && (date == '' || date == null) ? 'red' : 'white'
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    marginTop: hp('2%'),
                  }}>
                  <TextInput
                    keyboardType='number-pad'
                    value={cvc}
                    maxLength={3}
                    ref={CVCInromation}
                    onChangeText={(txt) => {
                      setCVC(txt)
                      props?.CheckOutFieldsData(USER_CREDIT_CARD_CVC, cvc)
                    }}
                    textAlign={locale == 'en' ? 'left' : 'right'}
                    placeholder="CVC"
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      elevation: 2,
                      borderWidth: 1,
                      borderColor: borderTextInputColor && (cvc == '' || cvc == null) ? 'red' : 'white'
                    }}
                  />
                </View>
              </View>
              <Text
                style={{
                  paddingHorizontal: wp('4%'),
                  paddingTop: wp('6%'),
                }}>
                {locale == 'en' ? 'Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.' : 'سيتم استخدام بياناتك الشخصية لمعالجة طلبك ودعم تجربتك في جميع أنحاء هذا الموقع ولأغراض أخرى موصوفة في سياسة الخصوصية الخاصة بنا.'}
              </Text>
            </>}

            <TouchableOpacity
              disabled={loader ? true : false}
              onPress={async () => {
                let cash_on_deliver = true
                const Data = {
                  id: (props?.user?.userData?.ID || props?.user?.userData?.id) ? (props?.user?.userData?.ID || props?.user?.userData?.id) : null,
                  item: props?.cart?.cart,
                  f_name: fname,
                  E_address: email,
                  shipping_address1: address,
                  shipping_address2: value,
                  shipping_city: town,
                  shipping_phone: phoneCode + phone,
                  shipping_Discount: onlinePriceDiscount,
                  state: value,
                  Total_Shipping_value: OverAlTotal
                }
                let responseEmail = emailValidation(email)
                let responseName = nameValidation(fname)
                let responseCity = cityValidation(town)
                let responsePhone = PhoneValidation(phone)

                if (fname != '' && email != '' && address != '' && town != '' && phone != '' && responseEmail && responseName && responseCity && responsePhone) {
                  firstRadio
                    ?
                    (
                      setLoader(true),
                      await props?.OrderPlace(Data, props?.navigation, cash_on_deliver, locale),
                      setLoader(false)
                    )
                    : (cvc != '' && cardNumber != '' && date != '')
                      ? onSubmit(Data)
                      : (
                        setBorderTextInputColor(true),
                        cardNumber == ''
                          ? AccountInromation.current.focus()
                          : date == ''
                            ? CardDateInromation.current.focus()
                            : CVCInromation.current.focus()
                      )

                } else {
                  setBorderTextInputColor(true)
                  if (fname == '' || responseName == false) {
                    UserNameInromation.current.focus()
                  }
                  else if (email == '' || responseEmail == false) {
                    emailInromation.current.focus()
                  }
                  else if (town == '' || responseCity == false) {
                    townInromation.current.focus()
                  }
                  else if (address == '') {
                    addressInromation.current.focus()
                  }
                  else {
                    phoneInromation.current.focus()
                  }
                }
              }}
              style={{
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: hp('1.5%'),
                marginHorizontal: wp('3.5%'),
                padding: '5%',
              }}>
              {loader
                ? <ActivityIndicator size={'small'} color={'white'} />
                : <Text style={{ color: COLORS.textSecondayColor }}>{t('BUY NOW')}</Text>
              }
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: hp('3%'),
            }}>
            <FlatListSlider
              data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
              onPress={(item, i) => {
                console.log('click', i);
              }}
              height={250}
              component={<Preview />}
              timer={4000}
              indicator
              indicatorActiveColor={'black'}
              indicatorInActiveColor={'silver'}
              contentContainerStyle={{ height: 130 }}
            />
          </View>
          <View
            style={{
              marginTop: hp('3%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '95%',
              flexWrap: 'wrap',
            }}>
            <View
              style={{ width: '29%', flexDirection: 'row', paddingRight: 12 }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="certificate"
                  size={24}
                  color={COLORS.primary}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: 6,
                }}>
                <Text
                  numberOfLines={2}
                  style={{ color: COLORS.textDarkColor, fontSize: hp('1.6%') }}>
                  {locale == 'en' ? 'Credit Cards (9٪ OFF)' : 'بطاقات الائتمان (9 ٪ خصم)'}
                </Text>
              </View>
            </View>
            <View style={{ width: '29%', flexDirection: 'row' }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: 6,
                }}>
                <Text
                  numberOfLines={2}
                  style={{ color: COLORS.textDarkColor, fontSize: hp('1.6%') }}>
                  {locale == 'en' ? 'Free & Fast Shipping' : 'شحن مجاني وسريع'}
                </Text>
              </View>
            </View>
            <View style={{ width: '29%', flexDirection: 'row' }}>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: 6,
                }}>
                <AntDesign
                  name="customerservice"
                  size={24}
                  color={COLORS.primary}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{ color: COLORS.textDarkColor, fontSize: hp('1.6%') }}>
                  {locale == 'en' ? '7 /7 Customers Support' : '7/7 دعم العملاء'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#000',
            padding: '3%',
          }}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>
            {locale == 'en' ? '© 2022 - All rights reserved' : '© 2022 - جميع الحقوق محفوظة'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function returncountry(name, locale) {
  if (name == 'عمان' || name == 'Oman') {
    if (locale == 'en') {
      return 'Oman'
    } else {
      return 'عمان'
    }
  }
  if (name == 'الكويت' || name == 'Kuwait') {
    if (locale == 'en') {
      return 'Kuwait'
    } else {
      return 'الكويت'
    }
  }
  if (name == 'قطر' || name == 'Qatar') {
    if (locale == 'en') {
      return 'Qatar'
    } else {
      return 'قطر'
    }
  }
  if (name == 'البحرين' || name == 'Bahrain') {
    if (locale == 'en') {
      return 'Bahrain'
    } else {
      return 'البحرين'
    }
  }
  if (name == 'الإمارات العربية المتحدة' || name == 'UAE') {
    if (locale == 'en') {
      return 'UAE'
    } else {
      return 'الإمارات العربية المتحدة'
    }
  }
  if (name == 'المملكة العربية السعودية' || name == 'Saudi Arabia') {
    if (locale == 'en') {
      return 'Saudi Arabia'
    } else {
      return 'المملكة العربية السعودية'
    }
  }
}

function returnCountryCode(name, locale) {
  if (name == 'عمان' || name == 'Oman') {
    return '+968'
  }
  if (name == 'الكويت' || name == 'Kuwait') {
    return '+965'
  }
  if (name == 'قطر' || name == 'Qatar') {
    return '+974'
  }
  if (name == 'البحرين' || name == 'Bahrain') {
    return '+973'
  }
  if (name == 'الإمارات العربية المتحدة' || name == 'UAE') {
    return '+971'
  }
  if (name == 'المملكة العربية السعودية' || name == 'Saudi Arabia') {
    return '+966'
  }
}

const mapStateToProps = ({ cart, user }) => ({
  cart, user,
});

export default connect(mapStateToProps, {
  addtoCart,
  PlusAndMinusProduct,
  OrderPlace,
  couponsData,
  deleteFromCart,
  CheckOutFieldsData
})(CheckOut);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000',
    padding: '4%',
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    paddingHorizontal: wp('3%'),
    paddingVertical: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('6%'),
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 4,
    marginTop: hp('1.5%'),
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    width: wp('10%'),
    height: wp('10%'),
  },
  sub: {

    justifyContent: 'space-between',
    marginTop: hp('2.5%'),
  },
  slide: {
    height: Dimensions.get('screen').width * 0.6,
    width: Dimensions.get('screen').width,
  },
  innerslider: {
    borderColor: 'silver',
    borderWidth: 0.5,
    borderRadius: 5,
    margin: 10,
    width: '90%',
  },
});

export const Preview = ({ item, index, movieally, onPress, props }) => {
  const { t } = React.useContext(LocalizationContext);
  const { locale, setLocale } = React.useContext(LocalizationContext);

  return (
    <View style={styles.slide}>
      <View style={{ ...styles.innerslider }}>
        <View
          style={{
            borderBottomColor: 'silver',
            borderBottomWidth: 0.5,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <Text
            style={{
              ...styles.title,
              textAlign: locale == 'en' ? 'left' : 'right',
            }}>
            {t('Hindi')}
          </Text>
        </View>
        <Text
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            color: 'grey',
            textAlign: locale == 'en' ? 'left' : 'right',
          }}>
          {t('comment')}
        </Text>
      </View>
    </View>
  );
};