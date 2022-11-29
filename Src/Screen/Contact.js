import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LocalizationContext from '../../LocalizationContext';
import Header from '../Components/Header';
import ScreenWrapper from '../Components/ScreenWrapper';

export default function Contact(props) {
  const {t} = React.useContext(LocalizationContext);
  const {locale, setLocale} = React.useContext(LocalizationContext);

  return (
    <ScreenWrapper>
      <Header
        navigation={props.navigation}
        // menu={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              marginHorizontal: hp(2),
              marginVertical: hp(2),
            }}>
            <Text
              style={{
                fontSize: hp(4),
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {t('contact')}
            </Text>
            <Text style={{marginTop: hp(3), textAlign: 'center'}}>
              {t('Contact_description')}
            </Text>
            <View style={{marginTop: hp(3)}}>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    ...styles.textView,
                    textAlign: locale == 'en' ? 'left' : 'right',
                  }}>
                  {t('Name')}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {height: 40, textAlign: locale == 'en' ? 'left' : 'right'},
                  ]}
                  placeholder={t('Name')}
                />
              </View>

              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    ...styles.textView,
                    textAlign: locale == 'en' ? 'left' : 'right',
                  }}>
                  {t('Email')}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {height: 40, textAlign: locale == 'en' ? 'left' : 'right'},
                  ]}
                  placeholder={t('Email')}
                />
              </View>

              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    ...styles.textView,
                    textAlign: locale == 'en' ? 'left' : 'right',
                  }}>
                  {t('Message')}
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={10}
                  style={[
                    styles.input,
                    {height: 80, textAlign: locale == 'en' ? 'left' : 'right'},
                  ]}
                  placeholder={t('Message')}
                />
              </View>

              <TouchableOpacity
                style={{
                  ...styles.sendButton,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: hp(2),
                    padding: 12,
                  }}>
                  {t('Send')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    color: 'black',
    fontSize: hp(2),
  },
  textView: {
    color: 'gray',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginVertical: 20,
    borderRadius: 5,
  },
});
