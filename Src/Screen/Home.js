import * as React from 'react';
import {
  Dimensions, FlatList,
  Image,
  ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { connect } from 'react-redux';
import LocalizationContext from '../../LocalizationContext';
import Header from '../Components/Header';
import ScreenWrapper from '../Components/ScreenWrapper';
import { changeCountry } from '../Store/Actions/cartAction';
import { COLORS } from '../Style/Constants/Colors';
const windowWidth = Dimensions.get('window').width;

function Home(props) {
  const { t } = React.useContext(LocalizationContext);
  const country = [
    {
      name: t('UAE'),
      img: require('../Assets/Images/uae.png'),
    },
    {
      name: t('Saudi Arabia'),
      img: require('../Assets/Images/KSA.png'),
    },
    {
      name: t('Kuwait'),
      img: require('../Assets/Images/Kuwait.png'),
    },
    {
      name: t('Bahrain'),
      img: require('../Assets/Images/Bahrain.png'),
    },
    {
      name: t('Oman'),
      img: require('../Assets/Images/oman.png'),
    },
    {
      name: t('Qatar'),
      img: require('../Assets/Images/Qatar.png'),
    },
  ];
  return (
    <ScreenWrapper>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          navigation={props.navigation}
          home={true}
        // cart={true} // show cart on the left side
        // menu={true}
        />
        <ScrollView horizontal={false}>
          <ScrollView nestedScrollEnabled={true} horizontal={true}>
            <View
              style={{
                flex: 1,
                paddingTop: 12,
                paddingHorizontal: 6,
                width: windowWidth,
              }}>
              <Text
                style={{
                  color: COLORS.textMainColor,
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                {' '}
                {t('Welcome')}
              </Text>
              <View
                style={{
                  marginTop: 12,
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                <FlatList
                  scrollEnabled={false}
                  data={country}
                  numColumns={2}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => props.changeCountry(item, props, false)}
                        style={{ marginTop: 12, width: '50%' }}>
                        <Image
                          source={item.img}
                          resizeMode="contain"
                          style={{
                            borderRadius: 100,
                            width: 85,
                            height: 85,
                            alignSelf: 'center',
                          }}
                        />
                        <Text
                          style={{
                            color: COLORS.textDarkColor,
                            textAlign: 'center',
                            marginTop: 24,
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index}
                />
              </View>
              <View style={{ marginTop: 32 }}>
                <Image
                  style={{ width: '100%', height: 300 }}
                  resizeMode="contain"
                  source={require('../Assets/Images/demo.jpg')}
                />
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const mapStateToProps = ({ cart }) => ({
  cart
})

export default connect(mapStateToProps, {
  changeCountry
})(Home)
