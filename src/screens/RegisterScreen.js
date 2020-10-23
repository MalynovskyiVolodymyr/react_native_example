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
    registerData: PropTypes.object,
    loginError: PropTypes.object,
    authStateActions: PropTypes.func,
    loading: PropTypes.bool
  };

  constructor(props){
    super(props);

    this.state={
      username: '',
      password: '',
      passwordconfirm: '',
      useremail: '',
      loginDataEmail: null,
      anim: new Animated.Value(0),
      error: null,
      errorVisible: false,
      login: false,
      formState: FORM_STATES.LOGIN,
      isKeyboardVisible: false,
    };

    this.registerUser = this.registerUser.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.storeLogin = this.storeLogin.bind(this);
    this.handleUserEmail = this.handleUserEmail.bind(this);
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
    if(this.state.login && this.props.registerData && !this.props.loginError
      && (this.state.username.length > 3 && this.state.password.length > 3
        && this.state.passwordconfirm.length > 3 && this.state.useremail.length > 3
        && this.state.passwordconfirm === this.state.password)){
      this.setState({ login: false});
      this.storeLogin();
    }else if(!this.props.loading && !this.props.registerData && this.props.loginError &&
      this.props.loginError !== this.state.error && (this.state.username.length > 3 && this.state.password.length > 3)){
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

  handleUserEmail(text){
    this.setState({
      useremail: text
    })
  }

  handlePasswordConfirm(text){
    this.setState({
      passwordconfirm: text
    });
  }

  registerUser(){
    if(this.state.username.length > 3 && this.state.password.length > 3
      && this.state.passwordconfirm.length > 3 && this.state.useremail.length > 3
      && this.state.passwordconfirm === this.state.password){
      this.setState({
        login: true
      });
      this.props.authStateActions.ActionRegister(this.state.username,this.state.useremail,this.state.password);
    }else{
      alert('All fields cannot be empty and passwords mast match');
    }
  }

  async storeLogin(){
    this.setState({
      username: '',
      password: '',
      passwordconfirm: '',
      useremail: ''
    });
    await storage.saveCollection('user', JSON.stringify({userToken: this.props.registerData.data.register.userToken, randomKey: this.props.registerData.data.register.randomKey, email: this.props.registerData.data.register.email, name: this.props.registerData.data.register.name, lotteryAccount: this.props.registerData.data.register.lotteryAccount, id: this.props.registerData.data.register.id}))

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
          {/*<Animated.View style={[styles.logoTitleContainer, this.state.isKeyboardVisible && { height: 0, marginTop:-570 }, this.fadeIn(30, 20)]}>*/}
            {/*<LinearGradient start={{x:0.5, y:1}} end={{x:1, y:1}} colors={['white', 'white']} style={[styles.linearGradient, this.state.isKeyboardVisible && { height: 0, marginTop:-500 }]}>*/}
              {/*<Animated.Image*/}
                {/*resizeMode="contain"*/}
                {/*style={[styles.logo, this.state.isKeyboardVisible && { height: 0, marginTop:-500 }, this.fadeIn(0)]}*/}
                {/*source={toypeImage}*/}
              {/*/>*/}
              {/*<View style={[{paddingTop: 0, flexDirection: 'row' }]}>*/}
                {/*<Text style={{color: Colors.primary, letterSpacing: 1,*/}
                  {/*fontSize: 15, fontFamily: Fonts.primaryBold}}>TOYPE REGISTER SCREEN</Text>*/}
              {/*</View>*/}
            {/*</LinearGradient>*/}
          {/*</Animated.View>*/}
          <Animated.View style={[styles.middle, styles.animatedContainerSection, this.fadeIn(700, -20)]}>
            <View style={[{paddingTop: 0, flexDirection: 'row' }]}>
              <Text style={{color: Colors.primary, letterSpacing: 1,
                fontSize: 15, fontFamily: Fonts.primaryBold}}>TOYPE REGISTER SCREEN</Text>
            </View>
            <TextInput
              placeholder="User name"
              style={styles.firstInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeEvent={this.handleUserName}
            />
            <TextInput
              placeholder="User email"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeEvent={this.handleUserEmail}
            />
            <TextInput
              placeholder="User password"
              secureTextEntry
              style={styles.textInput}
              keyboardType="numeric"
              autoCorrect={false}
              onChangeEvent={this.handlePassword}
            />
            <TextInput
              placeholder="User password confirm"
              secureTextEntry
              style={[styles.textInput, styles.lastInput]}
              keyboardType="numeric"
              autoCorrect={false}
              onChangeEvent={this.handlePasswordConfirm}
            />
            <Animated.View style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}>
              <Button
                secondary
                rounded
                style={[{ alignSelf: 'stretch', marginBottom: 10, }, this.state.isKeyboardVisible && { height: 0 }]}
                caption='Register'
                onPress={() => {this.registerUser()}}
                loading={this.props.loading}
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
    marginTop: 0,
  },
  linearGradient: {
    flex: 1,
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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll'
  },
  animatedContainerSection: {
    flex:1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  middle: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
    marginTop: 0
  },
  logoTitleContainer:{
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
  },
  bottom: {
    flex: 4,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
    marginBottom: 70
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
  firstInput: {
    alignSelf: 'stretch',
    marginTop: 0,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 2,
    color: Colors.black
  },
  lastInput:{
    marginBottom: 20
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
