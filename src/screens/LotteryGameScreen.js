import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableHighlight,
  TextInput,
  Button,
  Image,
  ImageBackground
} from 'react-native';

import ReactStarterButton from '../components/Button';
const backgroundImage = require('../../assets/images/toyImages/background.png');

import Icon from 'react-native-vector-icons/dist/Entypo';
import { Colors, Fonts } from '../constants';
//import RNSTextInput from "../components/TextInput";
const lottery = require('../../assets/images/toyImages/lotteryballs.png');

export default class LotteryGameScreen extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <ImageBackground
        key="2"
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.container}>
          <View style={styles.row}>
            <Image style={styles.lotteryImage} source={lottery}/>
          </View>
          <View style={styles.lotteryRow}>
            <Text style={styles.lotteryStartsLabel}>
              Lottery starts when
            </Text>
            <Text style={styles.lotteryStartsLabel}>
              2/10
            </Text>
            <Text style={styles.title}>
              Waves-2.0
            </Text>
            <View style={styles.lotteryDescriptionContainer}>
              <Text>
                Play Lotto:
              </Text>
              <Text style={styles.lotteryStartsDescription}>
                Enter 6 numbers from 1 to 59. Or pick Lucky Dip
              </Text>
            </View>
            <View style={styles.lotteryDescriptionContainer}>
              <Text style={[styles.lotteryStartsDescription, styles.lotteryStartsColor, styles.lotteryStartsMarginLeft]}>
                Play my saved numbers
              </Text>
              <Text style={[styles.lotteryStartsDescription, styles.lotteryStartsColor]}>
                Replay my last numbers
              </Text>
            </View>
            <View style={styles.lotteryNumbers}>
              <View style={styles.lotteryNumbersRow}>
                <TouchableHighlight style={styles.lotteryButton}>
                  <Text style={[styles.lotteryStartsDescription, styles.lotteryButtonText]}>
                    LUCKY DIP
                  </Text>
                </TouchableHighlight>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
              </View>
              <View style={styles.lotteryNumbersRow}>
                <TouchableHighlight style={styles.lotteryButton}>
                  <Text style={[styles.lotteryStartsDescription, styles.lotteryButtonText]}>
                    LUCKY DIP
                  </Text>
                </TouchableHighlight>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
              </View>
              <View style={styles.lotteryNumbersRow}>
                <TouchableHighlight style={styles.lotteryButton}>
                  <Text style={[styles.lotteryStartsDescription, styles.lotteryButtonText]}>
                    LUCKY DIP
                  </Text>
                </TouchableHighlight>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
              </View>
              <View style={styles.lotteryNumbersRow}>
                <TouchableHighlight style={styles.lotteryButton}>
                  <Text style={[styles.lotteryStartsDescription, styles.lotteryButtonText]}>
                    LUCKY DIP
                  </Text>
                </TouchableHighlight>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
                <TextInput style={styles.lotteryNumbersInput}/>
              </View>
              <View style={[styles.lotteryNumbersRow, styles.optionButton]}>
                <TouchableHighlight style={[styles.lotteryButton, styles.optionButton]}>
                  <Text style={[styles.lotteryStartsDescription, styles.optionButtonTextColor]}>
                    <Text style={styles.boldText}>+</Text> add lines
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.lotteryStartButtonContainer}>
                <ReactStarterButton
                  secondary
                  rounded
                  small
                  bgColor={Colors.blue}
                  style={styles.lotteryStartButton}
                  caption='Play'

                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'transparent',
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10
  },
  backgroundImage: {
    flex: 1,
    marginBottom: 10
  },
  lotteryStartButtonContainer:{
    alignSelf: "flex-end"
  },
  lotteryStartButton:{
    alignSelf: 'stretch',
    marginBottom: 10,
    width:80,
    textAlign:"center",
    paddingLeft:0,
    paddingRight:0,

  },
  optionButton:{
    borderColor: "transparent",
    borderWidth: 0,
    justifyContent: "flex-start"
  },
  optionButtonTextColor:{
    color: Colors.blue
  },
  boldText:{
    fontWeight: "bold",
    fontSize: 15,
    color: Colors.blue
  },
  lotteryNumbersRow:{
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop:5
  },
  lotteryNumbers:{
    flexDirection: "column",
    marginTop: 10
  },
  lotteryButton:{
    height: 30,
    width: 80,
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 3
  },
  lotteryButtonText:{
    textAlign: "center",
    paddingTop: 7
  },
  lotteryNumbersInput:{
    width: 40,
    height: 30,
    paddingTop: 2,
    fontSize: 15,
    color: Colors.black,
    borderColor: Colors.grey,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 3
  },
  lotteryStartsLabel: {
    color:"#19e7f7",
    justifyContent: "flex-start",
  },
  lotteryStartsDescription: {
    color:"#19e7f7",
    justifyContent: "flex-start",
    fontSize: 10,
    paddingTop: 3,
    marginLeft: 10
  },
  lotteryStartsColor: {
    color: Colors.blue
  },
  lotteryStartsMarginLeft:{
    marginLeft: 0
  },
  lotteryDescriptionContainer:{
    flexDirection: "row"
  },
  row: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'center'
  },
  lotteryRow:{
    flex: 7,
    flexDirection: "column"
  },
  lotteryImage:{
    width: 178,
    height: 118
  },

});

