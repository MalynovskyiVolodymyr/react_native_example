import React, {Component} from 'react';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
//import Icon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {Colors} from "../constants";
import LinearGradient from 'react-native-linear-gradient';
import storage from "../actions/commonServices/auth";
import {Text} from "../components/StyledText";

const barCodeImage = require('../../assets/images/toyImages/qr-code.jpg');

export default class PurchaseScreen extends Component{

  static propTypes = {
    loading: PropTypes.bool,
    currentBalance: PropTypes.object,
    error: PropTypes.bool
  };

  constructor(props){
    super(props);

    this.state = {
      user: null,
      currentBalance: null
    };

    this.getUserData = this.getUserData.bind(this);
    this.getUserBalance = this.getUserBalance.bind(this);
  }

  componentDidUpdate(){
    if(this.props.error && !this.props.loading){
      alert("please check your internet connection");
    }
    if(!this.props.error && !this.props.loading && this.props.currentBalance && this.state.currentBalance !== this.props.currentBalance.data.balance.available){
      this.setState({currentBalance: this.props.currentBalance.data.balance.available});
    }
  }

  componentWillMount(){
    this.getUserData();
  }

  getUserData(){
    storage.getCollection().then(data => {
      this.setState({
        user: data
      });
      this.getUserBalance(data.userToken);
    });
  }

  getUserBalance(token){
    this.setState({
      currentBalance: null
    });
    this.props.getBalance.ActionBalance(token);
  }

//<Text>Please wait...</Text>
  render(){
    const gradientArray = ['white', 'red'];
    const borderRadius = 20;
    return(
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.currencyStyle}>{this.state.currentBalance !== null ? (this.state.currentBalance / 100000000) + ' W' : 'please wait'}</Text>
          <View style={styles.row}>
            {this.state.user ?
              <QRCode
                value={this.state.user.id}
                size={200}
                bgColor='black'
                fgColor='white'/>
              : <QRCode
                value={'dy9as8dy9ay8wdy9'}
                size={200}
                bgColor='black'
                fgColor='white'/>
            }
          </View>
          <Text style={styles.tokenStyle}>{this.state.user !== null ? this.state.user.lotteryAccount : 'please wait'}</Text>
        </View>
        <View style={styles.contentRow}>
          <TouchableOpacity activeOpacity={0.5} style={styles.itemContainer}>
            <FIcon style={styles.iconStyle} name="plus" color="grey" size={25} backgroundColor="white" verticalAlign="center"/>
            <View style={styles.itemInnerContainer}>
              <Text style={styles.itemStyle}>Add funds</Text>
              <Text style={styles.itemDescStyle}>instantly top up your Ethereum Wallet</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.itemContainer}>
            <FIcon style={[styles.iconStyle, styles.exangeIco]} name="arrows-h" color="grey" size={25} backgroundColor="white" verticalAlign="center"/>
            <View style={styles.itemInnerContainer}>
              <Text style={styles.itemStyle}>Exchange</Text>
              <Text style={styles.itemDescStyle}>Convert your funds</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.itemContainer}>
            <FIcon style={styles.iconStyle} name="chevron-right" color="grey" size={25} backgroundColor="white" verticalAlign="center"/>
            <View style={styles.itemInnerContainer}>
              <Text style={styles.itemStyle}>Send</Text>
              <Text style={styles.itemDescStyle}>Send Ethereum to another address</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.itemContainer}>
            <FIcon style={styles.iconStyle} name="copy" color="grey" size={25} backgroundColor="white" verticalAlign="center"/>
            <View style={styles.itemInnerContainer}>
              <Text style={styles.itemStyle}>Copy address</Text>
              <Text style={styles.itemDescStyle}>Copy your public Ethereum address by tapping here</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10
  },
  row: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 200
  },
  barcodeImage:{
    width: 118,
    height: 118
  },
  topContent: {
    flex: 4,
    justifyContent: "space-between",
  },
  contentRow: {
    marginTop: 10,
    flex: 6,
    flexDirection: "column",
    marginBottom: 20,
    justifyContent : 'flex-end'
  },
  currencyStyle:{
    textAlign: 'center',
    fontSize: 24,
    marginTop: 5,
    alignSelf: 'stretch'
  },
  tokenStyle: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    borderColor: 'blue',
    borderWidth: 1,
    alignSelf: 'center',
    width: 200
  },
  itemStyle: {
    textAlign: 'left',
    fontSize: 24,
  },
  itemDescStyle: {
    fontSize: 20,
    color: 'grey'
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'grey',
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 4
  },
  itemInnerContainer: {
    marginLeft: 9,
    flexDirection: 'column',
    width: 300
  },
  iconStyle:{
    marginLeft: 5,
    width: 30,
    marginTop: 25
  },
  exangeIco: {
    marginTop: 12
  }
});
