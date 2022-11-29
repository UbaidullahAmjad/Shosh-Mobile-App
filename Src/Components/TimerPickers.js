import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.countDownId = null;
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
    };
  }

  componentDidMount() {
    this.countDownId = setInterval(this.timerInit, 1000);
  }

  componentWillUnmount() {
    if (this.countDownId) {
      clearInterval(this.countDownId);
    }
  }

  timerInit = () => {
    const {startDate} = this.props;
    // console.log(startDate);
    const now = new Date().getTime();
    if (!startDate) {
      this.setState({expired: true});
      return;
    }
    const countDownStartDate = new Date(startDate).getTime();
    const distance = countDownStartDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // For countdown is finished
    if (distance < 0) {
      clearInterval(this.countDownId);
      this.setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      });
      return;
    }
    this.setState({days, hours, minutes, seconds, expired: false});
  };

  render() {
    const {days, hours, minutes, seconds, expired} = this.state;
    if (expired) {
      return <Text>Expired </Text>;
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{...styles.firstView}}>{days}</Text>
          <Text style={{...styles.textView}}>DAYS</Text>
        </View>

        <Text style={{fontSize: hp(4), color: '#000'}}>:</Text>

        <View style={{alignItems: 'center'}}>
          <Text style={{...styles.firstView}}>{hours}</Text>
          <Text style={{...styles.textView}}>HOURS</Text>
        </View>

        <Text style={{fontSize: hp(4), color: '#000'}}>:</Text>

        <View style={{alignItems: 'center'}}>
          <Text style={{...styles.firstView}}>{minutes}</Text>
          <Text style={{...styles.textView}}>MINS</Text>
        </View>

        <Text style={{fontSize: hp(4), color: '#000'}}>:</Text>

        <View style={{alignItems: 'center'}}>
          <Text style={{...styles.firstView}}>{seconds}</Text>
          <Text style={{...styles.textView}}>SECS</Text>
        </View>
      </View>
    );
  }
}
export default Timer;

const styles = StyleSheet.create({
  firstView: {
    fontSize: hp(3),
    marginVertical: 5,
    color: '#000',
  },
  textView: {
    color: 'gray',
  },
});
