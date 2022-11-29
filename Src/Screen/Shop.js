import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import LocalizationContext from '../../LocalizationContext';
import Header from '../Components/Header';
import ScreenWrapper from '../Components/ScreenWrapper';
import ShopScreenPlaceholder from '../Components/ShopScreenPlaceholder';
import store from '../Store';
import { addtoCart, ProductDetailData } from '../Store/Actions/cartAction';

const dropDownList = [
  {
    id: 1,
    label: 'Default sorting',
    value: 'Default sorting',
  },
  {
    id: 2,
    label: 'Sort by popularity',
    value: 'Sort by popularity',
  },
  {
    id: 3,
    label: 'Sort by average rating',
    value: 'Sort by average rating',
  },
  {
    id: 4,
    label: 'Sort by latest',
    value: 'Sort by latest',
  },
  {
    id: 5,
    label: 'Sort by price: low to high',
    value: 'Sort by price: low to high',
  },
  {
    id: 6,
    label: 'Sort by price: high to low',
    value: 'Sort by price: high to low',
  },
];

let count = 1;

function Shop(props) {
  const { t } = React.useContext(LocalizationContext);
  const { locale, setLocale } = React.useContext(LocalizationContext);
  const [location, setLocation] = React.useState('Default sorting');
  const [dropdown, setDropDown] = React.useState(false);
  const [disableCartButton, setDisableCartButton] = React.useState(false);
  const [imageLoader, setImageLoader] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        props.navigation.navigate('Main');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <ScreenWrapper>
      <Header
        navigation={props.navigation}
      // menu={true}
      />

      {/* <TouchableOpacity
        onPress={() => setDropDown(!dropdown)}
        style={styles.dropDown}>
        <Text style={styles.dropDownText}>{location}</Text>
        <View>
          {dropdown ? (
            // <Entypo name="chevron-thin-up" size={wp(4)} color="gray" />
            <Entypo name="select-arrows" size={wp(4)} color="gray" />
          ) : (
            // <Entypo name="chevron-thin-up" size={wp(4)} color="gray" />
            <Entypo name="select-arrows" size={wp(4)} color="gray" />
          )}
        </View>
      </TouchableOpacity>

      {dropdown && (
        <View style={styles.dropDownList}>
          {dropDownList.map((item, i) => {
            return (
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                key={i}
                onPress={() => {
                  setLocation(item.value);
                  setDropDown(false);
                }}>
                {location == item.label ? (
                  <Entypo name="check" size={wp(4)} color="#fff" />
                ) : (
                  <Text style={{ marginLeft: 15 }}> </Text>
                )}
                <Text
                  style={
                    dropDownList.length === i + 1
                      ? { ...styles.dropDownListText, borderBottomWidth: 0 }
                      : styles.dropDownListText
                  }>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )} */}

      {props?.product?.allProducts.length > 0 ? (
        <FlatList
          data={props?.product?.allProducts}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => props?.ProductDetailData()}
            />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return item.status == 'publish' && item.price != '' ? (
              <TouchableOpacity
                activeOpacity={1}
                key={index}
                onPress={() =>
                  props.navigation.navigate('ProductDetail', { item, index })
                }
                style={{
                  ...styles.flatListView,
                }}>
                <View style={{ ...styles.discountView }}>
                  <Text
                    style={{
                      ...styles.discountText,
                    }}>
                    -20%
                  </Text>
                </View>

                {imageLoader ? (
                  <ActivityIndicator
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                    size={'small'}
                    color="black"
                  />
                ) : null}

                <Image
                  style={{
                    ...styles.ImageView,
                  }}
                  resizeMode="contain"
                  onLoadEnd={() => {
                    setImageLoader(false);
                  }}
                  source={{ uri: item?.images[0]?.src }}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'black', marginTop: 10 }}>
                    {item.name}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ textDecorationLine: 'line-through' }}>
                      {item?.regular_price}
                      {store.getState().cart.selectedCountry.name == 'عمان' ||
                        store.getState().cart.selectedCountry.name == 'Oman'
                        ? locale == 'en'
                          ? ',00 OMR'
                          : ' ريال عماني'
                        : null}
                      {store.getState().cart.selectedCountry.name == 'الكويت' ||
                        store.getState().cart.selectedCountry.name == 'Kuwait'
                        ? locale == 'en'
                          ? ',00 KD'
                          : ' دينار كويتي'
                        : null}
                      {store.getState().cart.selectedCountry.name == 'قطر' ||
                        store.getState().cart.selectedCountry.name == 'Qatar'
                        ? locale == 'en'
                          ? ',00 QR'
                          : ' ريال قطري'
                        : null}
                      {store.getState().cart.selectedCountry.name ==
                        'البحرين' ||
                        store.getState().cart.selectedCountry.name == 'Bahrain'
                        ? locale == 'en'
                          ? ',00 BD'
                          : ' دينار بحريني'
                        : null}
                      {store.getState().cart.selectedCountry.name ==
                        'الإمارات العربية المتحدة' ||
                        store.getState().cart.selectedCountry.name == 'UAE'
                        ? locale == 'en'
                          ? ',00 د.إ'
                          : ' درهم إماراتي'
                        : null}
                      {store.getState().cart.selectedCountry.name ==
                        'المملكة العربية السعودية' ||
                        store.getState().cart.selectedCountry.name ==
                        'Saudi Arabia'
                        ? locale == 'en'
                          ? ',00 SR'
                          : ' ريال سعودي '
                        : null}
                    </Text>
                    <Text style={{ marginLeft: 20 }}>
                      {item?.sale_price}
                      {store.getState().cart.selectedCountry.name == 'عمان' ||
                        store.getState().cart.selectedCountry.name == 'Oman'
                        ? locale == 'en'
                          ? ',00 OMR'
                          : ' ريال عماني'
                        : null}
                      {store.getState().cart.selectedCountry.name == 'الكويت' ||
                        store.getState().cart.selectedCountry.name == 'Kuwait'
                        ? locale == 'en'
                          ? ',00 KD'
                          : ' دينار كويتي'
                        : null}
                      {store.getState().cart.selectedCountry.name == 'قطر' ||
                        store.getState().cart.selectedCountry.name == 'Qatar'
                        ? locale == 'en'
                          ? ',00 QR'
                          : ' ريال قطري'
                        : null}
                      {store.getState().cart.selectedCountry.name ==
                        'البحرين' ||
                        store.getState().cart.selectedCountry.name == 'Bahrain'
                        ? locale == 'en'
                          ? ',00 BD'
                          : ' دينار بحريني'
                        : null}
                      {store.getState().cart.selectedCountry.name ==
                        'الإمارات العربية المتحدة' ||
                        store.getState().cart.selectedCountry.name == 'UAE'
                        ? locale == 'en'
                          ? ',00 د.إ'
                          : ' درهم إماراتي'
                        : null}
                      {store.getState().cart.selectedCountry.name ==
                        'المملكة العربية السعودية' ||
                        store.getState().cart.selectedCountry.name ==
                        'Saudi Arabia'
                        ? locale == 'en'
                          ? ',00 SR'
                          : ' ريال سعودي '
                        : null}
                    </Text>
                  </View>

                  <TouchableOpacity
                    disabled={disableCartButton}
                    onPress={async () => {
                      setDisableCartButton(true);
                      await props?.addtoCart(
                        item,
                        count,
                        props.navigation,
                        locale,
                      );
                      setTimeout(() => {
                        setDisableCartButton(false);
                      }, 3000);
                    }}
                    style={{
                      ...styles.addToCartView,
                    }}>
                    <AntDesign name="shoppingcart" color={'#fff'} size={20} />
                    <Text style={{ color: '#fff', marginLeft: 8 }}>
                      {t('Add to cart')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ) : null;
          }}
        />
      ) : (
        <ShopScreenPlaceholder />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: wp(5),
    borderWidth: wp(0.07),
    borderColor: 'gray',
    paddingHorizontal: wp(3),
    marginHorizontal: wp(4),
    padding: 5,
    borderRadius: 5,
    width: Dimensions.get('screen').width / 2,
    marginBottom: 10,
  },
  dropDownText: {
    fontSize: wp(3),
    color: 'gray',
  },
  dropDownList: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    elevation: 1,
    paddingHorizontal: wp(3),
    paddingBottom: wp(1),
    marginHorizontal: wp(4),
    marginBottom: wp(5),
    borderRadius: 5,
    zIndex: 1,
    width: Dimensions.get('screen').width / 2,
    position: 'absolute',
    top: Dimensions.get('screen').height / 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  dropDownListText: {
    fontSize: wp(3),
    color: '#fff',
    padding: wp(3),
  },
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
    left: 0,
    margin: 5,
    backgroundColor: '#000',
    zIndex: 1,
    borderRadius: 5,
  },
  discountText: {
    color: '#fff',
    padding: 5,
  },
  ImageView: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width / 1.2,
    margin: 20,
  },
  addToCartView: {
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    marginVertical: 10,
    paddingVertical: 8,
  },
});

const mapStateToProps = ({ cart, product, user }) => ({
  cart,
  product,
  user
});

export default connect(mapStateToProps, {
  addtoCart,
  ProductDetailData,
})(Shop);
