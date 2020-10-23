import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

import { Fonts, Colors } from '../constants';
import TextInput from '../components/TextInput';
import  Button from '../components/Button';
import storage from '../actions/commonServices/auth';

import { ThemeContext } from '../navigation/Navigation';
const toypeImage = require('../../assets/images/toyImages/toyLogo.png');
const backgroundImage = require('../../assets/images/toyImages/background.png');

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};

export default class AuthScreen extends Component {

  static propTypes = {
    loginData: PropTypes.object,
    loginError: PropTypes.object,
    authStateActions: PropTypes.func,
    loading: PropTypes.bool
  };

  constructor(props){
    super(props);

    this.state={
      username: '',
      password: '',
      loginDataEmail: null ,
      anim: new Animated.Value(0),
      error: null,
      login: false,
      errorVisible: false,
      formState: FORM_STATES.LOGIN,
      isKeyboardVisible: false,
    };

    this.authUser = this.authUser.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.storeLogin = this.storeLogin.bind(this);
    this.goToRegisterPage = this.goToRegisterPage.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }), this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }), this._keyboardDidHide.bind(this));
    AsyncStorage.clear();
  }

  componentDidMount() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  componentDidUpdate(){
    if(this.state.login && this.props.loginData && !this.props.loginError
    && (this.state.username.length > 3 && this.state.password.length > 3) &&
      this.state.username === this.props.loginData.data.Login.email){
      this.setState({ login: false});
      this.storeLogin();
    } else if(!this.props.loading && !this.props.loginData &&
      this.state.error !== this.props.loginError && (this.state.username.length > 3 && this.state.password.length > 3)){
      this.setState({error:this.props.loginError, errorVisible: true});
    }
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

  handleUserName(text){
    this.setState({
      username: text
    })
  }

  handlePassword(text){
    this.setState({
      password: text
    })
  }

  goToRegisterPage(){
    this.setState({
      username: '',
      password: ''
    });
    this.props.navigate({routeName:'Register'});
  }

  authUser(){
    // if(this.state.username.length > 3 && this.state.password.length > 3){
    //   this.setState({
    //     login: true
    //   });
    //   this.props.authStateActions.ActionLogin(this.state.username,this.state.password);
    // }

    this.props.navigate({routeName:'Main'})
  }

  async storeLogin(){
    this.setState({
      username: '',
      password: ''
    });
    await storage.saveCollection('user', JSON.stringify({userToken: this.props.loginData.data.Login.userToken, randomKey: this.props.loginData.data.Login.randomKey, email: this.props.loginData.data.Login.email, name: this.props.loginData.data.Login.name, lotteryAccount: this.props.loginData.data.Login.lotteryAccount, id: this.props.loginData.data.Login.id}))

    this.props.navigate({routeName:'AuthNext'});
  }

  renderError(error){
    alert(error);
    this.setState({
      errorVisible: false
    })
  }

  render() {
    const isRegister = this.state.formState === FORM_STATES.REGISTER;

    return (
      <ImageBackground
          key="1"
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover">
        {
          this.state.errorVisible ?
            this.renderError(this.props.loginError): null
        }
        <View style={styles.container}>
          <Animated.View style={[styles.bottom, this.state.isKeyboardVisible && { height: 50 }, this.fadeIn(30, 20)]}>
            <LinearGradient start={{x:0.5, y:1}} end={{x:1, y:1}} colors={['white', 'white']} style={[styles.linearGradient, this.state.isKeyboardVisible && { height: 50 }]}>
              <Animated.Image
                resizeMode="contain"
                style={[styles.logo, this.state.isKeyboardVisible && { height: 50, marginTop:-200 }, this.fadeIn(0)]}
                source={toypeImage}
              />
              <View style={[{paddingTop: 10, flexDirection: 'row' }, this.state.isKeyboardVisible && {marginTop:-500}]}>
                <Text style={{color: Colors.primary, letterSpacing: 1,
                  fontSize: 15, fontFamily: Fonts.primaryBold}}>TOYPE</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          <Animated.View style={[styles.section, styles.animatedContainerSection, this.fadeIn(700, -20), this.state.isKeyboardVisible && {marginTop:-200}]}>
            <TextInput
              placeholder="User email"
              style={styles.textInput}
              autoCapitalize="none"
              TempOnChangeText="your name or email"
              autoCorrect={false}
              onChangeEvent={this.handleUserName}
            />

            <TextInput
              placeholder="User password"
              secureTextEntry
              style={styles.textInput}
              keyboardType="numeric"
              autoCorrect={false}
              onChangeEvent={this.handlePassword}
            />

            <Animated.View style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}>
              <Button
                secondary
                rounded
                style={[{ alignSelf: 'stretch', marginBottom: 10, }, this.state.isKeyboardVisible && { height: 0 }]}
                caption='Continue'
                onPress={() => {this.authUser()}}
                loading={this.props.loading}
              />
              <Button
                secondary
                rounded
                style={[{ alignSelf: 'stretch', marginBottom: 10, }, this.state.isKeyboardVisible && { height: 0 }]}
                caption='Register'
                onPress={() => {this.goToRegisterPage()}}
              />

            </Animated.View>
          </Animated.View>
        </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  linearGradient: {
    paddingTop: 8,
    paddingBottom: 8,
    flex: 4,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 20
  },
  backgroundImage: {
    flex: 1,
  },
  toypeImage:{
    backgroundColor: "transparent",
    color:"red"
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
  middle: {
    flex: 2,
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
    borderBottomColor: Colors.grey,
    borderBottomWidth: 2,
    color: Colors.black
  },
  logo: {
    height: 150,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
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
    width: 200
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


//
// { !this.state.isKeyboardVisible && (
//   <View style={styles.socialLoginContainer}>
//     <Button
//       style={styles.socialButton}
//       bordered
//       rounded
//       icon={require('../assets/images/google-plus.png')}
//       onPress={() => this.props.authStateActions.skipLogin()}
//     />
//     <Button
//       style={[styles.socialButton, styles.socialButtonCenter]}
//       bordered
//       rounded
//       icon={require('../assets/images/twitter.png')}
//       onPress={() => this.props.authStateActions.skipLogin()}
//     />
//     <Button
//       style={styles.socialButton}
//       bordered
//       rounded
//       icon={require('../assets/images/facebook.png')}
//       onPress={() => this.props.authStateActions.skipLogin()}
//     />
//   </View>
// )}
//
// { !this.state.isKeyboardVisible && (
//   <TouchableOpacity
//     onPress={() => {
//       LayoutAnimation.spring();
//       this.setState({ formState: isRegister ? FORM_STATES.LOGIN : FORM_STATES.REGISTER });
//     }}
//     style={{paddingTop: 30, flexDirection: 'row' }}
//   >
//     <Text style={{color: Colors.white, fontFamily: Fonts.primaryRegular}}>{isRegister ? 'Already have an account?' : 'Don\'t have an account?' }</Text>
//     <Text style={{color: Colors.white, fontFamily: Fonts.primaryBold, marginLeft: 5}}>{isRegister ? 'Login' : 'Register' }</Text>
//   </TouchableOpacity>
// )}
