import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
// import Keyboard from 'react-native-keyboard';
const toypeImage = require('../../assets/images/toyImages/toyLogo.png');
const backgroundImage = require('../../assets/images/toyImages/background.png');



import { Fonts, Colors } from '../constants';
import TextInput from '../components/TextInput';
import  Button from '../components/Button';


import { ThemeContext } from '../navigation/Navigation';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};

export default class AuthScreenNext extends Component {
  state = {
    anim: new Animated.Value(0),
    user: null,
    // Current visible form
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }), this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }), this._keyboardDidHide.bind(this));
    this._getUserVerificationCode = this._getUserVerificationCode.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
    this._getUserVerificationCode();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  }

  _onFinishCheckingCode1(code, inputValue){
    console.log(code);
    console.log(inputValue);
    if(this.state.user !== null && code === this.state.user.randomKey){
      this.props.navigate({routeName: 'Main'});
    }
  }

  _getUserVerificationCode = async () => {
    try{
      const user = JSON.parse(await  AsyncStorage.getItem('user'));
      this.setState({
        user: user
      })
    }catch(error){
      console.log('error in auth next ', error);
      this.setState({
        user: null
      })
    }
  };

  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }

  render() {
    const isRegister = this.state.formState === FORM_STATES.REGISTER;

    return (
      <ImageBackground
        key="2"
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.container}>
          <Animated.View style={[styles.bottom, this.state.isKeyboardVisible && { height: 50 }, this.fadeIn(30, 20)]}>
            <LinearGradient start={{x:0.5, y:1}} end={{x:1, y:1}} colors={['white', 'white']} style={styles.linearGradient}>
              <Animated.Image
                resizeMode="contain"
                style={[styles.logo, this.state.isKeyboardVisible && { height: 50 }, this.fadeIn(0)]}
                source={toypeImage}
              />
              <View style={{paddingTop: 30, flexDirection: 'column', alignItems:'center' }}>
                <Text style={{color: Colors.primary, letterSpacing: 1,
                  fontSize: 15, fontFamily: Fonts.primaryBold}}>TOYPE</Text>
                <Text style={styles.headlineLabel}>
                  Enter 6 digits SMS code
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>
          <Animated.View style={[styles.section, styles.animatedContainerSection, this.fadeIn(700, -20), this.state.isKeyboardVisible && {marginTop:-200}]}>
            <CodeInput
              ref="codeInputRef2"
              codeLength="6"
              keyboardType="numeric"
              autoFocus={false}
              inputPosition='center'
              secureTextEntry
              activeColor='rgba(49, 180, 4, 1)'
              inactiveColor='rgba(49, 180, 4, 1.3)'
              size={20}
              disabled = "disabled"
              onFulfill={(isValid, inputValue) => this._onFinishCheckingCode1(isValid, inputValue)}
              containerStyle={styles.inputContainer}
              codeInputStyle={styles.inputCodeContainer}
            />

            <Animated.View style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}>


            </Animated.View>
          </Animated.View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30
  },
  inputCodeContainer: {
    borderWidth: 1.5, borderRadius: 100, borderColor: 'blue', backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  linearGradient: {
    flex: 4,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 20
  },
  backgroundImage: {
    flex: 1
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedContainerSection: {
    flex:1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
  },
  last: {
    justifyContent: 'flex-end',
  },
  textInput: {
    alignSelf: 'stretch',
    marginTop: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  headline: {
    textAlign: 'center',
    fontSize: 34,
    marginTop: 0,
    width: 200
  },
  headlineLabel: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 0,
    width: 200,
    color: Colors.primary
  },
  logo: {
    height: 150,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
  },
  socialButtonCenter: {
    marginLeft: 10,
    marginRight: 10,
  },
});
