import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text, AsyncStorage
} from 'react-native';

import storage from '../actions/commonServices/auth';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../components/Button';
import { Fonts, Colors, Layout } from '../constants';
import {NavigationActions} from "react-navigation";

const socialNetworks = require('../../assets/images/toyImages/shareTweter.png');
const userProfileIcon = require('../../assets/images/toyImages/userProfile.png');

export default class UserProfileScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: null
    };

    this.getUserData = this.getUserData.bind(this);
  }

  componentWillMount(){
    this.getUserData();
  }

  getUserData(){
    storage.getCollection().then(data => {
      this.setState({
        user: data
      });
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={require('../../assets/images/avatar.jpg')}
          style={styles.topSection}
        >
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={styles.title}>Volodymyr Malynovskyi</Text>
            <View>
              <Text style={styles.position}>Senior Software Engineer</Text>
              <Text style={styles.company}>Freelancer</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button
              secondary
              rounded
              small
              caption="Contact"
              onPress={() => { }}
            />

            <Button
              rounded
              bordered
              small
              style={{ marginLeft: 20 }}
              caption="Follow"
              onPress={() => {}}
            />
          </View>
        </ImageBackground>
        <View style={styles.section}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[Colors.profileGradientStart, Colors.profileGradientEnd]}
            style={styles.quickFacts}
          >
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoText}>272</Text>
              <Text style={styles.quickInfoText}>Projects</Text>
            </View>

            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoText}>1.7k</Text>
              <Text style={styles.quickInfoText}>Followers</Text>
            </View>

            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoText}>7</Text>
              <Text style={styles.quickInfoText}>Following</Text>
            </View>
          </LinearGradient>

          <View style={{ flex: 1 }}>
            <View style={styles.infoRow}>
              <Icon style={styles.infoIcon} name="mail-forward" size={20} color="#c3c3c3" />
              <Text>{this.state.user ? this.state.user.email: 'malinovskiynewpost@gmail.com'}</Text>
            </View>
            <View style={styles.hr} />

            <View style={styles.infoRow}>
              <Icon style={styles.infoIcon} name="money" size={20} color="#c3c3c3" />
              <Text>{this.state.user ? this.state.user.lotteryAccount : 'please wait'}</Text>
            </View>
            <View style={styles.hr} />

            <View style={styles.infoRow}>
              {/*<Icon style={styles.infoIcon} name="instagram" size={20} color="#c3c3c3" />*/}
              {/*<Text>rns</Text>*/}
            </View>
            <Button
              secondary
              rounded
              style={{ alignSelf: 'stretch', marginBottom: 10, }}
              caption='Logout'
              onPress={() => {AsyncStorage.clear();this.props.navigationActions.reset({index:0,actions:[NavigationActions.navigate({ routeName: 'Auth' })]});}}
            />
          </View>

          <View style={styles.bottomRow}>
            {/*<View style={styles.contentRow}>*/}
              {/*<View>*/}
              {/*<Text style={styles.profileText}>Profile</Text>*/}
              {/*<Text>{this.state.user ? this.state.user.email: null}</Text>*/}
              {/*<Text style={styles.profileText}>Real token from API</Text>*/}
              {/*<Text>{this.state.user ? this.state.user.lotteryAccount : null}</Text>*/}
              {/*</View>*/}
            {/*</View>*/}
            {/*<ImageBackground*/}
              {/*style={styles.bottomImage}*/}
              {/*source={require('../../assets/images/photos.jpeg')}*/}
            {/*>*/}
              {/*<Text style={styles.quickInfoText}>+150</Text>*/}
              {/*<Text style={styles.quickInfoText} styleName="bright">Photos</Text>*/}
            {/*</ImageBackground>*/}
            {/*<ImageBackground*/}
              {/*style={styles.bottomImage}*/}
              {/*source={require('../../assets/images/social.jpeg')}*/}
            {/*>*/}
              {/*<Text style={styles.quickInfoText}>SOCIAL</Text>*/}
            {/*</ImageBackground>*/}
            {/*<ImageBackground*/}
              {/*style={styles.bottomImage}*/}
              {/*source={require('../../assets/images/projects.jpg')}*/}
            {/*>*/}
              {/*<Text style={styles.quickInfoText}>PROJECTS</Text>*/}
            {/*</ImageBackground>*/}
          </View>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'scroll'
  },
  header: {
    flex: 2,
    padding: 20,
  },
  section: {
    flex: 3,
    position: 'relative',
  },
  topSection:{
    flex: 2,
    position: 'relative',
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.primaryBold,
    fontSize: 25,
    letterSpacing: 0.04,
    marginBottom: 10,
  },
  lightText: {
    color: Colors.white,
  },
  quickFacts: {
    height: 60,
    flexDirection: 'row',
  },
  quickFact: {
    flex: 1,
  },
  infoSection: {
    flex: 1,
  },
  infoRow: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  hr: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
    marginLeft: 20,
  },
  infoIcon: {
    marginRight: 20,
  },
  bottomRow: {
    height: 80,
    flexDirection: 'row',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  position: {
    color: Colors.white,
    fontFamily: Fonts.primaryLight,
    fontSize: 16,
    marginBottom: 3,
  },
  company: {
    color: Colors.white,
    fontFamily: Fonts.primaryRegular,
    fontSize: 16,
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  quickInfoText: {
    color: Colors.white,
    fontFamily: Fonts.primaryRegular,
  },
  bottomImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

{/*<View style={styles.container}>*/}
{/*<View style={styles.row}>*/}
{/*<Image style={[styles.socialImage, styles.socialRow]} source={socialNetworks}/>*/}
{/*<Image style={styles.sendReciveImage} source={userProfileIcon}/>*/}
{/*<Text style={styles.title}>{this.state.user ? this.state.user.name : null}</Text>*/}
{/*</View>*/}
{/*<View style={styles.contentRow}>*/}
{/*<View>*/}
{/*<Text style={styles.profileText}>Profile</Text>*/}
{/*<Text>{this.state.user ? this.state.user.email: null}</Text>*/}
{/*/!*<Text style={styles.profileText}>Real token from API</Text>*!/*/}
{/*/!*<Text>{this.state.user ? this.state.user.lotteryAccount : null}</Text>*!/*/}
{/*</View>*/}
{/*</View>*/}
{/*</View>*/}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//     justifyContent: "space-around",
//     paddingLeft: 10,
//     paddingRight: 10
//   },
//   title:{
//     alignSelf: 'center',
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 5
//   },
//   profileText:{
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   row: {
//     flexDirection: "column",
//     flex: 3,
//     justifyContent: "center"
//   },
//   socialRow: {
//     alignSelf: "flex-end"
//   },
//   contentRow:{
//     flex: 7,
//     flexDirection: "column",
//     justifyContent: "space-between"
//   },
//   sendReciveImage:{
//     width: 90,
//     height: 90,
//     alignSelf: "center",
//     marginTop: -29
//   },
//   socialImage:{
//     width: 50,
//     height: 50
//   },
//   sendReceiveButtons:{
//     alignSelf: "center",
//     marginBottom: 16,
//     width: 200
//   },
//   containerInfo: {
//     backgroundColor: Colors.white,
//   },
//   topImage: {
//     flex: 1,
//     height: 200,
//     margin: 5,
//     borderRadius: 5,
//   },
//   imagesRow: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   imageContainer: {
//     flex: 1,
//     padding: 5,
//   },
//   image: {
//     flex: 1,
//     height: 100,
//     borderRadius: 5,
//   },
// });