import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions, Keyboard, Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import storage from '../actions/commonServices/auth';

const plus = require('../../assets/images/tabbar/plus.png');
const leftArrow = require('../../assets/images/tabbar/leftarrow.png');
const rightArrow = require('../../assets/images/tabbar/rightarrow.png');
const refresh = require('../../assets/images/tabbar/refresh.png');

export default class HeaderScreen extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    currentBalance: PropTypes.object,
    error: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      currentBalance: null
    };

    this.getUserBalance = this.getUserBalance.bind(this);

    // this._openArticle = this._openArticle.bind(this);
    // this.renderRowOne = this.renderRowOne.bind(this);
    // this.renderRowTwo = this.renderRowTwo.bind(this);
    // this.renderRowThree = this.renderRowThree.bind(this);
  }
  componentWillMount() {
    storage.getCollection().then((data) => {
      this.setState({
        user: data
      });
      this.getUserBalance(data.userToken);
    });
  }

  componentDidMount() {

  }

  componentDidUpdate(){
    if(this.props.error && !this.props.loading){
      alert("please check your internet connection");
    }
    if(!this.props.error && !this.props.loading && this.props.currentBalance && this.state.currentBalance !== this.props.currentBalance.data.balance.available){
      this.setState({currentBalance: this.props.currentBalance.data.balance.available});
    }
  }

  getUserBalance(token){
    this.setState({
      currentBalance: null
    });
    this.props.getBalance.ActionBalance(token);
  }



  // _getRenderItemFunction() {
  //   return [this.renderRowOne, this.renderRowTwo, this.renderRowThree][this.props.tabIndex];
  // }
  //
  // _openArticle(article) {
  //   this.props.navigate({ routeName: 'Article', params: { ...article } });
  // }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../../assets/images/toyImages/background.png')}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigate({routeName:'PurchaseScreen'})}>
          <Image style={styles.imageIcon} source={plus}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={leftArrow}/>
        </TouchableOpacity>
        <Text style={styles.currencyStyle}>{this.state.currentBalance !== null ? (this.state.currentBalance / 100000000) + ' W' : 'please wait'}</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={rightArrow}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.getUserBalance(this.state.user.userToken)} >
          <Image source={refresh}/>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  imageIcon:{
    width: 40,
    height: 40,
  },
  currencyStyle:{
    textAlign: 'center',
    fontSize: 24,
    marginTop: 5,
    width: 100
  }
});
