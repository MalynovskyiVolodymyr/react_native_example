import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  TouchableHighlight,
  ImageBackground
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
const backgroundImage = require('../../assets/images/toyImages/background.png');

const user = require('../../assets/images/tabbar/user.png');
const car = require('../../assets/images/toyImages/car.png');
const tempImage = require('../../assets/images/toyImages/pexels-photo-165888.jpg');
const chooper = require('../../assets/images/toyImages/copter.png');
const lottery = require('../../assets/images/toyImages/lotteryballs.png');
const rnsUrl = 'https://reactnativestarter.com';

const groupedData = [
  {
    id: 7,
    brand: 'Super Car',
    title: 'LOTTERY GAME',
    subtitle: 'super car',
    price: 'Z 50,000',
    priceFrom: true,
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image: tempImage,
    productImage: lottery
  }, {
    id: 8,
    brand: 'Weeknight',
    title: 'LOTTERY GAME',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: tempImage,
    productImage: car
  }, {
    id: 9,
    brand: 'Mad Perry',
    title: 'LOTTERY GAME',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: '#ee1f78',
    image: tempImage,
    productImage: chooper
  }, {
    id: 10,
    brand: 'Citizen',
    title: 'LOTTERY GAME',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: 'green',
    image: tempImage,
    productImage: lottery
  }, {
    id: 11,
    brand: 'Weeknight',
    title: 'LOTTERY GAME',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: tempImage,
    productImage: car
  }, {
    id: 12,
    brand: 'Mad Perry',
    title: 'LOTTERY GAME',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: 'red',
    image: tempImage,
    productImage: lottery
  }
];
//import Autocomplete from 'react-native-autocomplete-input';
// render() {
//   const { query } = this.state;
//   const data = this._filterData(query)
//   return (<Autocomplete
//     data={data}
//     defaultValue={query}
//     onChangeText={text => this.setState({ query: text })}
//     renderItem={item => (
//       <TouchableOpacity onPress={() => this.setState({ query: item })}>
//         <Text>{item}</Text>
//       </TouchableOpacity>
//     )}
//   />);
// }

import { Fonts, Colors } from '../constants';

import {
  Text,
  Title,
} from '../components/StyledText';


export default class HomeScreen extends Component {

  constructor(props){
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item }){
    return (
      <TouchableOpacity
        key={item.id}
        onPress={()=> { this.props.navigate({routeName:'LotteryGameScreen'})}}
        style={styles.itemTwoContainer}>
        <View style={styles.itemTwoContent}>
          <Image
            style={styles.itemTwoImage}
            source={item.productImage}
          />
          <View style={styles.itemTwoOverlay} />

          {/*<View style={{flexDirection:'row', justifyContent: 'space-between'}}>*/}
            {/*<Image style={styles.iconProductSize} source={item.productImage}/>*/}
            {/*<View style={{flexDirection:'column'}}>*/}
              {/**/}
            {/*</View>*/}
          {/*</View>*/}
          <View style={styles.itemText}>
            <Text style={styles.itemTwoTitle}>{item.title}</Text>
            <Text style={styles.itemTwoSubTitle}>{item.subtitle}</Text>
            <Text style={styles.itemTwoPrice}>{item.price}</Text>
          </View>


        </View>
      </TouchableOpacity>
    );
  };

  // Important: You must return a Promise
  beforeFocus = () => {
    return new Promise((resolve, reject) => {
      console.log('beforeFocus');
      resolve();
    });
  };

  // Important: You must return a Promise
  onFocus = (text) => {
    return new Promise((resolve, reject) => {
      console.log('beforeFocus', text);
      resolve();
    });
  };

  // Important: You must return a Promise
  afterFocus = () => {
    return new Promise((resolve, reject) => {
      console.log('afterFocus');
      resolve();
    });
  };
  render() {
    return (
      <ImageBackground
        key="2"
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View
          style={styles.container}>
          <Text style={styles.title}>Activities</Text>
          <FlatList
            keyExtractor={item => item.id || item[0] && item[0].id}
            style={styles.listStyle}
            data={groupedData}
            renderItem={this.renderItem}
          />

        </View>
      </ImageBackground>
    );
  }
}
/*
<View style={styles.activitiesContainer}>
  <View>
    <Text color="#19e7f7" size={10}>18 september 2018</Text>
    <View style={styles.activitiesInnerContainer}>
      <Image style={styles.iconSize} source={user}/>
      <Text size={10}>To Vlad Malynovskyi</Text>
      <Text size={10}>-Z 45</Text>
    </View>
  </View>
  <View>
    <Text color="#19e7f7" size={10} style={styles.description}>17 september 2018</Text>
    <View style={styles.activitiesInnerContainer}>
      <Image style={styles.iconSize} source={user}/>
      <Text size={10}>From Vlad Malynovskyi</Text>
      <Text size={10}>+Z 45</Text>
    </View>
  </View>
</View>

<View style={[styles.activitiesContainer, styles.searchResultsMargin]}>
<View style={styles.activitiesInnerContainer}>
<TextInput
placeholder="What are you looking for? drawing number or product name"
style={styles.textInput}
/>
<TouchableHighlight>
  <Icon name="search" size={18} color="grey" />
</TouchableHighlight>
</View>
</View>
<View style={[styles.activitiesInnerContainer, styles.productListMargin]}>
<View style={styles.activitiesContainer}>
<Image style={styles.iconProductSize} source={chooper}/>
<Text style={styles.productsDescription}>From Vlad Malynovskyi</Text>
<Text style={styles.title}>Z 50,000</Text>
</View>
<View style={styles.activitiesContainer}>
<Image style={styles.iconProductSize} source={car}/>
<Text style={styles.productsDescription}>From Vlad Malynovskyi</Text>
<Text style={styles.title}>Z 50,000</Text>
</View>
</View>
<View style={styles.activitiesInnerContainer}>
  <View style={styles.activitiesContainer}>
    <Image style={styles.iconProductSize} source={lottery}/>
    <Text style={styles.productsDescription}>From Vlad Malynovskyi</Text>
    <Text style={styles.title}>Z 50,000</Text>
  </View>
  <View style={styles.activitiesContainer}>
    <Image style={styles.iconProductSize} source={lottery}/>
    <Text style={styles.productsDescription}>From Vlad Malynovskyi</Text>
    <Text style={styles.title}>Z 50,000</Text>
  </View>
</View>

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10
  }
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 30,
  },
  backgroundImage: {
    flex: 1,
    marginBottom: 10
  },
  searchResultsMargin:{
    marginTop: 35,
    marginBottom: 15
  },
  iconSize:{
    width: 20,
    height: 20
  },
  iconProductSize:{
    paddingBottom: 0,
    marginBottom: 0
  },
  productsDescription:{
    color:"#19e7f7",
    fontSize: 10,
    textAlign: 'center'
  },
  productPrice:{

  },
  activitiesContainer:{
    flexDirection:"column",
    padding: 0,
    margin: 0
  },
  activitiesInnerContainer:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textInput: {
    alignSelf: 'stretch',
    width: 300,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    color: 'black'
  },
  searchButton:{
   marginTop: 20
  },
  bgImage: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  section: {
    flex: 1
  },
  sectionLarge: {
    flex: 2,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: Fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  productListMargin: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'transparent',
    marginVertical: 5,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden'
  },
  itemTwoContent: {
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
    overflow: 'hidden'
  },
  itemTwoTitle: {
    color: Colors.secondary,
    fontFamily: Fonts.primaryBold,
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'lightblue',
    opacity:1
  },
  itemText:{
    padding: 20,
  },
  itemTwoSubTitle: {
    color: Colors.blue,
    fontFamily: Fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    opacity:1
  },
  itemTwoPrice: {
    color: Colors.blue,
    fontFamily: Fonts.primaryBold,
    fontSize: 20,
    backgroundColor: 'white',
    opacity:1
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  listStyle:{
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  }
});
