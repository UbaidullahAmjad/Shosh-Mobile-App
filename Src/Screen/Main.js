import {useFocusEffect} from '@react-navigation/native';
import * as React from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import LocalizationContext from '../../LocalizationContext';
import Header from '../Components/Header';
import MainProductPlaceholder from '../Components/MainProductsPlaceHolder';
import ScreenWrapper from '../Components/ScreenWrapper';
import {
  fc1,
  ImageHome1,
  ImageHome2,
  ImageHome3,
  ImageHome4,
} from '../constants';
import {ProductDetailData} from '../Store/Actions/cartAction';

export const Preview = ({item, index, movieally, onPress, props}) => {
  const {t} = React.useContext(LocalizationContext);
  const {locale, setLocale} = React.useContext(LocalizationContext);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <View style={styles.slide}>
      <View style={{...styles.innerslider}}>
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

export const Preview1 = ({item, index, movieally, onPress, props}) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.slide}>
      <Image
        resizeMode="stretch"
        style={{
          height: Dimensions.get('screen').width * 0.417,
          width: Dimensions.get('screen').width,
        }}
        source={item.image}
      />
    </TouchableOpacity>
  );
};

function Home(props) {
  const {t} = React.useContext(LocalizationContext);

  const _refreshLoad = async () => {
    await props?.ProductDetailData();
    // console.log("props?.product?.allProducts", props?.product?.allProducts)
  };

  React.useEffect(() => {
    _refreshLoad();
  }, []);

  return (
    <ScreenWrapper>
      <Header
        navigation={props.navigation}
        //  menu={true}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => _refreshLoad()} />
        }>
        <FlatListSlider
          data={[
            {id: 1, image: require('../Assets/Images/slider1.jpg')},
            {id: 2, image: require('../Assets/Images/slider2.jpg')},
            {id: 3, image: require('../Assets/Images/slider3.gif')},
          ]}
          onPress={(item, i) => {
            props.navigation.navigate('Shop', {item});
          }}
          height={heightPercentageToDP('20%')}
          component={<Preview1 props={props} />}
          indicator
          indicatorActiveColor={'black'}
          indicatorInActiveColor={'silver'}
          contentContainerStyle={{height: heightPercentageToDP('20%')}}
          indicatorStyle={{
            marginBottom: 20,
          }}
          timer={4000}
          animation
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              ...styles.MainView,
            }}>
            <Image style={{...styles.MainImage}} source={ImageHome1} />
            <Text style={{...styles.textColor}}>{t('Secure Payment')}</Text>
          </View>
          <View
            style={{
              ...styles.MainView,
            }}>
            <Image style={{...styles.MainImage}} source={ImageHome2} />
            <Text style={{...styles.textColor}}>{t('2 Years Warranty')}</Text>
          </View>
          <View
            style={{
              ...styles.MainView,
            }}>
            <Image style={{...styles.MainImage}} source={ImageHome3} />
            <Text style={{...styles.textColor}}>{t('Customer Support')}</Text>
          </View>
          <View
            style={{
              ...styles.MainView,
            }}>
            <Image style={{...styles.MainImage}} source={ImageHome4} />
            <Text style={{...styles.textColor}}>
              {t('Free & Fast Shipping')}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 50}}>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {t('Choose your favorite color')}
          </Text>

          {props?.product?.allProducts.length > 0 ? (
            <FlatList
              data={props?.product?.allProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item?.id}
              renderItem={({item, index}) => {
                return item.status == 'publish' && item.price != '' ? (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      props.navigation.navigate('ProductDetail', {item, index})
                    }>
                    <Image
                      resizeMode="contain"
                      style={{
                        ...styles.favoriteColorImage,
                      }}
                      source={fc1}
                    />
                  </TouchableOpacity>
                ) : null;
              }}
            />
          ) : (
            <MainProductPlaceholder />
          )}
        </View>

        <View
          style={{
            marginTop: 30,
            paddingBottom: Platform.OS == 'android' ? 20 : 0,
          }}>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {t('Customer Reviews')}
          </Text>

          <FlatListSlider
            data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]}
            onPress={(item, i) => {
              console.log('click', i);
            }}
            height={240}
            component={<Preview props={props} />}
            timer={4000}
            indicator
            indicatorActiveColor={'black'}
            indicatorInActiveColor={'silver'}
            contentContainerStyle={{height: 130}}
            animation
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const mapStateToProps = ({product}) => ({
  product,
});

export default connect(mapStateToProps, {
  ProductDetailData,
})(Home);

const styles = StyleSheet.create({
  MainView: {
    alignItems: 'center',
    width: Dimensions.get('screen').width / 4.3,
    backgroundColor: 'black',
    paddingVertical: 1,
    borderRadius: 10,
    marginHorizontal: 3,
  },
  textColor: {
    color: 'white',
    fontSize: 6,
    marginTop: 5,
    fontWeight: 'bold',
  },
  MainImage: {
    width: 40,
    height: 40,
    marginVertical: 5,
  },
  favoriteColorImage: {
    width: Dimensions.get('screen').width / 2.25,
    height: Dimensions.get('window').width / 1.8,
    marginHorizontal: 10,
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
  },
  title: {
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
});
