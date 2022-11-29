import * as React from 'react';
import {
  ActivityIndicator, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import LocalizationContext from '../../LocalizationContext';
import CommentsComponents from '../Components/CommentsComponents';
import Header from '../Components/Header';
import RatingComponent from '../Components/RatingComponent';
import RatingStars from '../Components/RatingStars';
import ScreenWrapper from '../Components/ScreenWrapper';
import TimerPicker from '../Components/TimerPickers';
import store from '../Store';
import { addtoCart, ProductDetailData } from '../Store/Actions/cartAction';

const startDate = new Date().getTime() + 315360000; // 1 year (Milliseconds Unit)

function ProductDetail(props) {
  const { t } = React.useContext(LocalizationContext);
  const { locale, setLocale } = React.useContext(LocalizationContext);

  const [count, setCount] = React.useState(1);
  const [disableCartButton, setDisableCartButton] = React.useState(false);
  const [imageLoader, setImageLoader] = React.useState(true);

  const { width } = useWindowDimensions();

  const [location, setLocation] = React.useState('All Stars (16)');
  const [dropdown, setDropDown] = React.useState(false);

  const [dropDownList, setDropDownList] = React.useState([])

  const _refreshLoad = async () => {
    await props?.ProductDetailData()
  }


  React.useEffect(() => {

    setDropDownList([
      {
        id: 1,
        label: locale == 'en' ? 'All Stars (16)' : '(16) كل النجوم',
        value: locale == 'en' ? 'All Stars (16)' : '(16) كل النجوم',
      },
      {
        id: 2,
        label: locale == 'en' ? '5 Stars (16)' : '(16) 5 نجوم',
        value: locale == 'en' ? '5 Stars (16)' : '(16) 5 نجوم',
      },
      {
        id: 3,
        label: locale == 'en' ? '4 Stars (0)' : '4 نجوم (0)',
        value: locale == 'en' ? '4 Stars (0)' : '4 نجوم (0)',
      },
      {
        id: 4,
        label: locale == 'en' ? '3 Stars (0)' : '3 نجوم (0)',
        value: locale == 'en' ? '3 Stars (0)' : '3 نجوم (0)',
      },
      {
        id: 5,
        label: locale == 'en' ? '2 Stars (0)' : '2 نجوم (0)',
        value: locale == 'en' ? '2 Stars (0)' : '2 نجوم (0)',
      },
      {
        id: 6,
        label: locale == 'en' ? '1 Stars (0)' : '1 نجوم (0)',
        value: locale == 'en' ? '1 Stars (0)' : '1 نجوم (0)',
      },
    ])
    _refreshLoad()
  }, [props?.cart.ChangeAPILanguage])
  const { index } = props?.route?.params

  console.log('props?.route?.params: ', props?.route?.params)

  return (
    <ScreenWrapper>
      <Header navigation={props.navigation} cart={true} menu={true} />
      <ScrollView>
        <View
          style={{
            marginHorizontal: hp(2),
            marginVertical: hp(2),
          }}>
          <View
            style={{
              ...styles.flatListView,
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
              }}>
              {props?.product?.allProducts[index].name}
            </Text>
            <View>
              <View style={{ ...styles.discountView }}>
                <Text
                  style={{
                    ...styles.discountText,
                  }}>
                  -20%
                </Text>
              </View>

              {imageLoader ?
                <ActivityIndicator style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} size={'small'} color='black' /> : null}

              <Image
                style={{
                  ...styles.ImageView,
                }}
                resizeMode="contain"
                onLoadEnd={() => {
                  setImageLoader(false)
                }}
                source={{ uri: props?.product?.allProducts[index]?.images[0]?.src }}
              />
            </View>
          </View>

          <View
            style={{
              ...styles.ChildHurryView,
            }}>
            <Text
              style={{
                fontSize: hp(1.8),
                fontWeight: 'bold',
                textAlign: 'center',
                position: 'absolute',
                left: 30,
                right: 30,
                top: 10,
                zIndex: 1,
                padding: 5,
                backgroundColor: '#C0C0C0',
              }}>
              {t('Hurry up! Flash Sale Ends Soon!')}
            </Text>

            <View style={{ ...styles.child2HurryView }}>
              <TimerPicker startDate={startDate} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 20,
              }}>
              <Text
                style={{ textDecorationLine: 'line-through', color: 'silver' }}>
                {props?.product?.allProducts[index]?.regular_price * count}
                {store.getState().cart.selectedCountry.name == 'عمان' || store.getState().cart.selectedCountry.name == 'Oman' ? locale == 'en' ? ',00 OMR' : ' ريال عماني' : null}
                {store.getState().cart.selectedCountry.name == 'الكويت' || store.getState().cart.selectedCountry.name == 'Kuwait' ? locale == 'en' ? ',00 KWD' : ' دينار كويتي' : null}
                {store.getState().cart.selectedCountry.name == 'قطر' || store.getState().cart.selectedCountry.name == 'Qatar' ? locale == 'en' ? ',00 QAR' : ' ريال قطري' : null}
                {store.getState().cart.selectedCountry.name == 'البحرين' || store.getState().cart.selectedCountry.name == 'Bahrain' ? locale == 'en' ? ',00 BHD' : ' دينار بحريني' : null}
                {store.getState().cart.selectedCountry.name == 'الإمارات العربية المتحدة' || store.getState().cart.selectedCountry.name == 'UAE' ? locale == 'en' ? ',00 AED' : ' درهم إماراتي' : null}
                {store.getState().cart.selectedCountry.name == 'المملكة العربية السعودية' || store.getState().cart.selectedCountry.name == 'Saudi Arabia' ? locale == 'en' ? ',00 SAR' : ' ريال سعودي ' : null}
              </Text >
              <Text
                style={{
                  textDecorationLine: 'none',
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color: '#000',
                }}>
                {props?.product?.allProducts[index]?.sale_price * count}
                {store.getState().cart.selectedCountry.name == 'عمان' || store.getState().cart.selectedCountry.name == 'Oman' ? locale == 'en' ? ',00 OMR' : ' ريال عماني' : null}
                {store.getState().cart.selectedCountry.name == 'الكويت' || store.getState().cart.selectedCountry.name == 'Kuwait' ? locale == 'en' ? ',00 KWD' : ' دينار كويتي' : null}
                {store.getState().cart.selectedCountry.name == 'قطر' || store.getState().cart.selectedCountry.name == 'Qatar' ? locale == 'en' ? ',00 QAR' : ' ريال قطري' : null}
                {store.getState().cart.selectedCountry.name == 'البحرين' || store.getState().cart.selectedCountry.name == 'Bahrain' ? locale == 'en' ? ',00 BHD' : ' دينار بحريني' : null}
                {store.getState().cart.selectedCountry.name == 'الإمارات العربية المتحدة' || store.getState().cart.selectedCountry.name == 'UAE' ? locale == 'en' ? ',00 AED' : ' درهم إماراتي' : null}
                {store.getState().cart.selectedCountry.name == 'المملكة العربية السعودية' || store.getState().cart.selectedCountry.name == 'Saudi Arabia' ? locale == 'en' ? ',00 SAR' : ' ريال سعودي ' : null}
              </Text >
            </View >

            <View
              style={{
                backgroundColor: '#000',
                alignSelf: 'flex-start',
                margin: 10,
                padding: 10,
                borderRadius: 5,
                marginVertical: 20,
              }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                {t('Sold more than 247 times')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: 'silver',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    } else {
                      console.log('count is zero');
                    }
                  }}
                  style={{ margin: 5, marginHorizontal: 20 }}>
                  <AntDesign name="minus" color={'silver'} size={20} />
                </TouchableOpacity>

                <Text style={{ fontSize: hp(2.5) }}>{count}</Text>

                <TouchableOpacity
                  onPress={() => setCount(count + 1)}
                  style={{ margin: 5, marginHorizontal: 20 }}>
                  <AntDesign name="plus" color={'silver'} size={20} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                disabled={disableCartButton}
                onPress={async () => {
                  setDisableCartButton(true)
                  await props?.addtoCart(props?.product?.allProducts[index], count, props.navigation, locale)
                  setTimeout(() => {
                    setDisableCartButton(false)
                  }, 3000);
                }}
                style={{ backgroundColor: 'red', padding: 20, borderRadius: 10 }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: hp(1.9),
                    fontWeight: 'bold',
                  }}>
                  {t('ADD TO CART')}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 40,
              }}>
              <Text style={{ color: 'gray' }}>SKU</Text>
              <Text style={{ color: 'gray' }}>{props?.product?.allProducts[index]?.sku}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{ color: 'gray' }}>{locale == 'en' ? 'Category' : 'الفئة'}</Text>
              <Text style={{ color: 'gray' }}>{props?.product?.allProducts[index]?.categories[0]?.name}</Text>
            </View>
          </View >

          <View style={{ borderColor: '#000', borderWidth: 0.5, margin: 40 }} />

          <View>
            <RenderHtml
              contentWidth={width}
              source={{ html: `${props?.product?.allProducts[index]?.description}` }}
            />
            {/* <Image
              style={{
                width: Dimensions.get('screen').width / 1.1,
                height: Dimensions.get('screen').height + 100,
              }}
              source={require('../Assets/Images/image09.png')}
            />

            <Image
              style={{
                marginTop: 20,
                width: Dimensions.get('screen').width / 1.1,
                height: Dimensions.get('screen').height / 3,
              }}
              source={require('../Assets/Images/image08.png')}
            />

            <Image
              style={{
                marginTop: 20,
                width: Dimensions.get('screen').width / 1.1,
                height: Dimensions.get('screen').width / 2,
              }}
              source={require('../Assets/Images/image07.webp')}
            />

            <Image
              style={{
                marginTop: 20,
                width: Dimensions.get('screen').width / 1.1,
                height: Dimensions.get('screen').width / 1.1,
              }}
              source={require('../Assets/Images/image06.png')}
            />

            <Image
              style={{
                marginTop: 20,
                width: Dimensions.get('screen').width / 1.1,
                height: Dimensions.get('screen').width / 3.5,
              }}
              source={require('../Assets/Images/image05.png')}
            />

            <Image
              style={{
                marginTop: 20,
                width: Dimensions.get('screen').width / 1.1,
                height: (Dimensions.get('screen').width / 1.1) * 2.1,
              }}
              source={require('../Assets/Images/image04.png')}
            />

            <View style={{ marginTop: 20 }}>
              {Platform.OS == 'ios' ? (
                <VideoPlayerIos />
              ) : (
                <VideoPlayerAndroid />
              )}
            </View>

            <Image
              style={{
                marginTop: 20,
                width: Dimensions.get('screen').width / 1.1,
                height: (Dimensions.get('screen').width / 1.1) * 1.55,
              }}
              source={require('../Assets/Images/image03.png')}
            />

            <View>
              <Text
                style={{
                  fontSize: hp(4),
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                تجربة حقيقية لشوش برش على الشعر الكيرلي..
              </Text>

              <Image
                style={{
                  marginTop: 20,
                  width: Dimensions.get('screen').width / 1.1,
                  height: Dimensions.get('screen').width / 1.1,
                }}
                source={require('../Assets/Images/image02.png')}
              />

              <View style={{ marginTop: 20 }}>
                <VideoPlayerAndroid />
              </View>

              <View style={{ marginTop: 40 }}>
                <Text
                  style={{
                    fontSize: hp(4),
                    textAlign: 'center',
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  ما هو برنامج افراد اسرة شوش؟
                </Text>

                <Text
                  style={{
                    fontSize: hp(2),
                    textAlign: 'center',
                    color: '#C0C0C0',
                    marginTop: 10,
                  }}>
                  كل عميلة بالنسبة لنا هي فرد من اسرة تكبر كل يوم عن يوم ولذلك
                  نقدم عروض وخصومات لكي بشكل مستمر لانك فرد من اسرة شوش. وايضا
                  لكي الاسبقية للحصول على الخصومات على منتجات شوش القادمة قريبا
                  جدا.
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: hp(4),
                    textAlign: 'center',
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  ما هي مدة التوصيل؟
                </Text>

                <Text
                  style={{
                    fontSize: hp(3),
                    textAlign: 'center',
                    color: 'red',
                    marginTop: 10,
                  }}>
                  . التوصيل في خلال يوم الى يومين عمل لاي مكان داخل الإمارات وفي
                  بعض الحالات قد تتاخر الطلبية لمدة 3 ايام لظروف خارجة عن
                  ارادتنا ونحاول بكل جهدنا توصيل جميع الطلبيات في خلال يوم واحد
                </Text>
              </View>

              <Image
                style={{
                  marginTop: 20,
                  width: Dimensions.get('screen').width / 1.1,
                  height: Dimensions.get('screen').width / 1.7,
                }}
                source={require('../Assets/Images/image01.png')}
              />

              <Image
                style={{
                  marginTop: 20,
                  width: Dimensions.get('screen').width / 1.1,
                  height: (Dimensions.get('screen').width / 1.1) * 1.9,
                }}
                source={require('../Assets/Images/image00.png')}
              />
            </View> */}

            <View style={{ marginTop: 50 }}>
              <Text
                style={{
                  fontSize: hp(4),
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {t('Customer reviews')}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 20,
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 10,
                    paddingVertical: 20,
                    margin: 10,
                    borderRadius: 5,
                  }}>
                  <Text style={{ color: '#fff' }}>{props?.product?.allProducts[index]?.average_rating}</Text>
                </View>
                <View>
                  <RatingStars value={props?.route?.params?.item?.rating_count} />
                  <Text style={{ color: '#C0C0C0', marginTop: 10 }}>
                    {t('Based on 16 reviews')}
                  </Text>
                </View>
              </View>

              <RatingComponent value={props?.product?.allProducts[index]?.rating_count} />

              <View
                style={{
                  margin: 10,
                  paddingVertical: 10,
                  borderColor: '#000',
                  borderWidth: 0.5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'gray',
                      padding: 10,
                    }}>
                    <AntDesign name="camerao" color={'white'} size={25} />
                    <Text
                      style={{ marginLeft: 5, color: 'white', fontSize: hp(2) }}>
                      {t('With images (0)')}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'gray',
                      padding: 10,
                    }}>
                    <MaterialIcons name="verified" color={'white'} size={25} />
                    <Text
                      style={{ marginLeft: 5, color: 'white', fontSize: hp(2) }}>
                      {t('Verified (16)')}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setDropDown(!dropdown)}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: '#000',
                    padding: 10,
                    paddingHorizontal: 20,
                    marginTop: 20,
                  }}>
                  <Text
                    style={{ marginLeft: 5, color: 'white', fontSize: hp(2) }}>
                    {locale == 'en' ? location : '(16) كل النجوم'}
                  </Text>
                </TouchableOpacity>
              </View>

              {dropdown && (
                <View style={styles.dropDownList}>
                  {dropDownList.map((item, i) => {
                    return (
                      <TouchableOpacity
                        style={{
                          marginTop: 2,
                          backgroundColor:
                            location == item.label ? '#000' : 'rgba(0,0,0,0.6)',
                          alignItems: 'center',
                        }}
                        key={i}
                        onPress={() => {
                          setLocation(item.value);
                          setDropDown(false);
                        }}>
                        <Text
                          style={
                            dropDownList.length === i + 1
                              ? {
                                ...styles.dropDownListText,
                                borderBottomWidth: 0,
                              }
                              : styles.dropDownListText
                          }>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
              <CommentsComponents />
            </View>
          </View>
        </View >
      </ScrollView >

      <View
        style={{
          ...styles.bottomView,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: Dimensions.get('screen').height / 15,
              width: Dimensions.get('screen').width / 8,
            }}
            resizeMode="contain"
            source={{ uri: props?.product?.allProducts[index]?.images[0]?.src }}
          />
          <Text>{props?.product?.allProducts[index]?.name}</Text>

          <View>
            <Text style={{ textDecorationLine: 'line-through' }}>
              {props?.route?.params?.item?.regular_price * count}
              {store.getState().cart.selectedCountry.name == 'عمان' || store.getState().cart.selectedCountry.name == 'Oman' ? locale == 'en' ? ',00 OMR' : ' ريال عماني' : null}
              {store.getState().cart.selectedCountry.name == 'الكويت' || store.getState().cart.selectedCountry.name == 'Kuwait' ? locale == 'en' ? ',00 KWD' : ' دينار كويتي' : null}
              {store.getState().cart.selectedCountry.name == 'قطر' || store.getState().cart.selectedCountry.name == 'Qatar' ? locale == 'en' ? ',00 QAR' : ' ريال قطري' : null}
              {store.getState().cart.selectedCountry.name == 'البحرين' || store.getState().cart.selectedCountry.name == 'Bahrain' ? locale == 'en' ? ',00 BHD' : ' دينار بحريني' : null}
              {store.getState().cart.selectedCountry.name == 'الإمارات العربية المتحدة' || store.getState().cart.selectedCountry.name == 'UAE' ? locale == 'en' ? ',00 AED' : ' درهم إماراتي' : null}
              {store.getState().cart.selectedCountry.name == 'المملكة العربية السعودية' || store.getState().cart.selectedCountry.name == 'Saudi Arabia' ? locale == 'en' ? ',00 SAR' : ' ريال سعودي ' : null}
            </Text>
            <Text>
              {props?.route?.params?.item?.sale_price * count}
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: 'silver',
              borderWidth: 0.5,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (count > 1) {
                  setCount(count - 1);
                } else {
                  console.log('count is zero');
                }
              }}
              style={{
                backgroundColor: '#C0C0C0',
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}>
              <AntDesign name="minus" color={'black'} size={12} />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: hp(1.5),
                backgroundColor: 'white',
                paddingHorizontal: 10,
                paddingVertical: 15,
              }}>
              {count}
            </Text>

            <TouchableOpacity
              onPress={() => setCount(count + 1)}
              style={{
                backgroundColor: '#C0C0C0',
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}>
              <AntDesign name="plus" color={'black'} size={12} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={disableCartButton}
            onPress={async () => {
              setDisableCartButton(true)
              await props?.addtoCart(props?.product?.allProducts[index], count, props.navigation, locale)
              setTimeout(() => {
                setDisableCartButton(false)
              }, 3000)
            }}
            style={{
              backgroundColor: 'black',
              padding: 10,
              paddingVertical: 20,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: hp(1.4),
                fontWeight: 'bold',
              }}>
              {t('ADD TO CART')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper >
  );
}

const mapStateToProps = ({ cart, product, user }) => ({
  cart, product, user
})

export default connect(mapStateToProps, {
  addtoCart, ProductDetailData
})(ProductDetail)

const styles = StyleSheet.create({
  flatListView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    borderRadius: 10,
  },
  discountView: {
    position: 'absolute',
    left: 30,
    margin: 15,
    top: 20,
    backgroundColor: '#000',
    zIndex: 1,
    borderRadius: 5,
  },
  discountText: {
    color: '#fff',
    padding: 5,
  },
  ImageView: {
    width: Dimensions.get('screen').width / 1.3,
    height: Dimensions.get('window').width / 1.1,
    margin: 20,
  },
  ChildHurryView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    borderRadius: 10,
    paddingVertical: 20,
  },
  child2HurryView: {
    borderWidth: 0.5,
    borderColor: 'silver',
    margin: 10,
    padding: 20,
    borderRadius: 5,
  },
  bottomView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    paddingVertical: 10,
  },
  dropDownList: {
    alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: wp(3),
    paddingBottom: wp(1),
    marginHorizontal: wp(4),
    marginBottom: wp(5),
    borderRadius: 5,
    zIndex: 1,
    width: Dimensions.get('screen').width / 2.4,
    position: 'absolute',
    top:
      Platform.OS == 'ios'
        ? Dimensions.get('screen').height / 1.86
        : Dimensions.get('screen').height / 1.785,
  },
  dropDownListText: {
    fontSize: wp(4),
    color: 'white',
    borderBottomWidth: wp(0.07),
    borderBottomColor: 'gray',
    padding: wp(3),
  },
});
