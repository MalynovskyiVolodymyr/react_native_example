import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Keyboard,
  Platform,
  LayoutAnimation,
  Text,
  TouchableOpacity
} from 'react-native';
//import {QRscanner} from 'react-native-qr-scanner';
import QRCodeScanner from 'react-native-qrcode-scanner';
import PropTypes from 'prop-types';
import {Colors} from "../constants";
import TextInput from '../components/TextInput';

import ReactStarterButton from '../components/Button';
import storage from "../actions/commonServices/auth";

const socialNetworks = require('../../assets/images/toyImages/shareTweter.png');
const arrowUpIcon = require('../../assets/images/toyImages/bigArrowUp.png');

export default class SendReciveScreen extends Component{

  static propTypes = {
    loading: PropTypes.bool,
    sendReciveError: PropTypes.bool,
    sendReviceResult: PropTypes.object,
    sendToken: PropTypes.func,
    getBalance: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      flashMode: false,
      zoom: 0.1,
      scannerResult: null,
      amount: 0,
      sendReciveState: true,
      isKeyboardVisible: false,
      user: null
    };

    this.bottomView = this.bottomView.bind(this);
    this.onRead = this.onRead.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.sendToken = this.sendToken.bind(this);
    this.getUserData = this.getUserData.bind(this);
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

  componentWillMount(){
    this.getUserData();
	this.keyboardDidShowListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }), this._keyboardDidShow.bind(this));
	    this.keyboardDidHideListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }), this._keyboardDidHide.bind(this));
  }

  getUserData(){
    storage.getCollection().then(data => {
      this.setState({
        user: data
      });
    });
  }


  componentDidUpdate(){
    // {
    //   "data": {
    //   "sendTokens": {
    //     "type": 4,
    //       "error": null
    //   }
    // }
    // }
    //
    // this.setState({
    //   scannerResult: null,
    //   amount: 0
    // })
    if(this.state.amount && this.state.scannerResult && !this.props.loading && !this.props.sendReciveError
      && this.props.sendReviceResult && this.state.sendReciveState){
      console.log('this.props.sendReviceResult ===> ', this.props.sendReviceResult);
      this.setState({
        sendReciveState: false,
        amount: 0,
        scannerResult: null
      });
      this.props.getBalance.ActionBalance(this.state.user.userToken);
    }
  }

  bottomView(){
    return(
      <View style={{flex:1,flexDirection:'row',backgroundColor:'#0000004D'}}>
        <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({flashMode:!this.state.flashMode})}>
          <Text style={{color:'white'}}>Touch here for flash mode</Text>
        </TouchableOpacity>
      </View>
    );
  };

  handleAmount(amount){
    this.setState({
      amount: amount
    })
  }

  onRead(res){
    this.setState({
      scannerResult: res.data
    });    
  }

  sendToken(){
    if(!this.state.scannerResult || !this.state.amount){
      return alert('scanner result is null or amount == 0');
    }
    this.setState({
      sendReciveState: true
    });
    this.props.sendToken(this.state.scannerResult, this.state.user.userToken, this.state.amount);

  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.row}>
          <Image style={[styles.socialImage, styles.socialRow]} source={socialNetworks}/>
          <Image style={styles.sendReciveImage} source={arrowUpIcon}/>
        </View>
        <View style={styles.qrScanner}>
          {
            this.state.scannerResult
            ?
              <TextInput
                placeholder="Enter amount of money you want to send"
                style={styles.textInput}
                autoCorrect={false}
                onChangeEvent={this.handleAmount}
              />
            : <QRCodeScanner onRead={this.onRead}	/>


          }

        </View>
        <View style={styles.contentRow}>
          <View style={styles.sendReceiveButtons}>
            <ReactStarterButton
              secondary
              rounded
              primary
              bgColor={this.state.scannerResult ? Colors.green : Colors.red}
              style={[styles.lotteryStartButton, this.state.isKeyboardVisible && { height: 0 }]}
              caption='Send'
              onPress={() => this.sendToken()}
            />
          </View>
          <View style={styles.sendReceiveButtons}>
            <ReactStarterButton
              secondary
              rounded
              primary
              bgColor={Colors.blue}
              style={[styles.lotteryStartButton, this.state.isKeyboardVisible && { height: 0 }]}
              caption='Receive'
              onPress={() => this.props.navigate({routeName:'PurchaseScreen'})}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10
  },
  qrScanner: {
    flex: 4,
    backgroundColor: 'white',
    justifyContent: "center"
  },
  textInput: {
    alignSelf: 'center',
    width: 200,
    marginTop: 20,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 2,
    color: Colors.black
  },
  row: {
    flexDirection: "column",
    flex: 3,
    justifyContent: "center"
  },
  socialRow: {
    alignSelf: "flex-end"
  },
  contentRow:{
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  sendReciveImage:{
    width: 90,
    height: 90,
    alignSelf: "center",
    marginTop: -29
  },
  socialImage:{
    width: 50,
    height: 50
  },
  sendReceiveButtons:{
    alignSelf: "center",
    marginBottom: 16,
    width: 200
  }
});
