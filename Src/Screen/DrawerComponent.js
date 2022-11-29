import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import worldimg from '../Assets/Images/world.png';
import aboutus from '../Assets/Images/aboutus.png';
import login from '../Assets/Images/login.png';
import languagek from '../Assets/Images//language.png';
import LocalizationContext from '../../LocalizationContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import store from '../Store';
import {
  changeCountryModal,
  changeLanguageModal,
} from '../Store/Actions/cartAction';
import { connect } from 'react-redux';
import { LogOut } from '../Store/Actions/UserAction';

function DrawerComponent(props) {
  const { t } = React.useContext(LocalizationContext);
  const { locale, setLocale } = React.useContext(LocalizationContext);

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: 100,
          backgroundColor: 'black',
          alignSelf: 'center',
          marginTop: 50,
          borderRadius: 100,
        }}>
        <Text
          style={{
            position: 'absolute',
            color: 'white',
            fontSize: 16,
            alignSelf: 'center',
          }}>
          {t('WelcomeMore')}
        </Text>
      </View>

      {props?.user?.userData?.ID || props?.user?.userData?.id
        ?
        <Text style={{ alignSelf: 'center', fontWeight: 'bold', margin: 10, fontSize: 14, color: 'black' }}>{props?.user?.UserInformation?.display_name}</Text>
        :
        (<Text
          onPress={() => props?.navigation.navigate('Login')}
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            margin: 10,
            fontSize: 14,
            color: 'black',
          }}>
          {t('Sign In / Sign Up')}
        </Text>
        )}

      <TouchableOpacity onPress={() => props?.navigation.navigate('BottomTab')}>
        <View
          style={{
            marginTop: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            flexDirection: locale == 'en' ? 'row' : 'row-reverse',
          }}>

          <AntDesign
            name="user"
            color={'#000'}
            size={20}
            style={{
              marginLeft: locale == 'en' ? 5 : 0,
              marginRight: locale == 'en' ? 0 : 5,
            }}
          />

          <Text
            style={{
              flex: 1,
              color: 'black',
              marginRight: locale == 'en' ? 0 : 15,
              marginLeft: locale == 'en' ? 15 : 0,
              fontSize: 15,
            }}>
            {t('Back to Home')}
          </Text>
          {locale == 'en' ? (
            <AntDesign name="right" color={'black'} size={16} />
          ) : (
            <AntDesign name="left" color={'black'} size={16} />
          )}
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          height: 0.8,
          backgroundColor: 'silver',
          marginVertical: 20,
        }}
      />

      <TouchableOpacity
        onPress={() => store.dispatch(changeCountryModal(true))}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            flexDirection: locale == 'en' ? 'row' : 'row-reverse',
          }}>
          <Image
            style={{
              width: 18,
              height: 18,
              marginLeft: locale == 'en' ? 5 : 0,
              marginRight: locale == 'en' ? 0 : 5,
            }}
            source={worldimg}></Image>
          <Text
            style={{
              flex: 1,
              color: 'black',
              marginRight: locale == 'en' ? 0 : 15,
              marginLeft: locale == 'en' ? 15 : 0,
              fontSize: 15,
            }}>
            {t('Change Country')}
          </Text>
          {locale == 'en' ? (
            <AntDesign name="right" color={'black'} size={16} />
          ) : (
            <AntDesign name="left" color={'black'} size={16} />
          )}
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          height: 0.8,
          backgroundColor: 'silver',
          marginVertical: 20,
        }}
      />

      <TouchableOpacity
        onPress={() => {
          props?.navigation?.closeDrawer();
          store.dispatch(changeLanguageModal(true))
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            flexDirection: locale == 'en' ? 'row' : 'row-reverse',
          }}>
          <Image
            style={{
              width: 18,
              height: 18,
              marginLeft: locale == 'en' ? 5 : 0,
              marginRight: locale == 'en' ? 0 : 5,
            }}
            source={languagek}></Image>
          <Text
            style={{
              flex: 1,
              color: 'black',
              marginRight: locale == 'en' ? 0 : 15,
              marginLeft: locale == 'en' ? 15 : 0,
              fontSize: 15,
            }}>
            {t('Change Language')}
          </Text>
          {locale == 'en' ? (
            <AntDesign name="right" color={'black'} size={16} />
          ) : (
            <AntDesign name="left" color={'black'} size={16} />
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          height: 0.8,
          backgroundColor: 'silver',
          marginVertical: 20,
        }}
      />

      <TouchableOpacity onPress={() => props.navigation.navigate('AboutUS')}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            flexDirection: locale == 'en' ? 'row' : 'row-reverse',
          }}>
          <Image
            style={{
              width: 18,
              height: 18,
              marginLeft: locale == 'en' ? 5 : 0,
              marginRight: locale == 'en' ? 0 : 5,
            }}
            source={aboutus}></Image>
          <Text
            style={{
              flex: 1,
              color: 'black',
              marginRight: locale == 'en' ? 0 : 15,
              marginLeft: locale == 'en' ? 15 : 0,
              fontSize: 15,
            }}>
            {t('About Us')}
          </Text>
          {locale == 'en' ? (
            <AntDesign name="right" color={'black'} size={16} />
          ) : (
            <AntDesign name="left" color={'black'} size={16} />
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          height: 0.5,
          backgroundColor: 'silver',
          marginVertical: 20,
        }}
      />
      <TouchableOpacity onPress={() => {
        props?.user?.userData?.ID || props?.user?.userData?.id
          ? props?.LogOut(props)
          : props?.navigation.navigate('Login')
      }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            flexDirection: locale == 'en' ? 'row' : 'row-reverse',
          }}>
          <Image
            style={{
              width: 18,
              height: 18,
              marginLeft: locale == 'en' ? 5 : 0,
              marginRight: locale == 'en' ? 0 : 5,
            }}
            source={login}></Image>
          <Text
            style={{
              flex: 1,
              color: 'black',
              marginRight: locale == 'en' ? 0 : 15,
              marginLeft: locale == 'en' ? 15 : 0,
              fontSize: 15,
            }}>
            {props?.user?.userData?.ID || props?.user?.userData?.id
              ? t('Log Out')
              : t('Log In')}
          </Text>
          {locale == 'en' ? (
            <AntDesign name="right" color={'black'} size={16} />
          ) : (
            <AntDesign name="left" color={'black'} size={16} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, {
  LogOut,
})(DrawerComponent);
