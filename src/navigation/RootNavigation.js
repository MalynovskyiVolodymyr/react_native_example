/* eslint-disable no-underscore-dangle,import/no-unresolved,react/prop-types */
import React from 'react';
import {
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';

import MainTabNavigator from './MainTabNavigator';

import ProfileScreen from '../containers/ProfileScreen';
import GalleryScreen from '../containers/GalleryScreen';
import GridsScreen from '../containers/GridsScreen';
import ArticleScreen from '../containers/ArticleScreen';
import ChatScreen from '../containers/chat/ChatScreen';
import MessagesScreen from '../containers/chat/MessagesScreen';
import ChartsScreen from '../containers/ChartsScreen';
import AuthScreenNext from "../containers/AuthScreenNext";
import RegisterScreen from "../containers/RegisterScreen";
import AuthScreen from "../containers/AuthScreen";
import PurchaseScreen from "../containers/PurchaseScreen";
import LotteryGameScreen from '../containers/LotteryGameScreen';

import { Colors, Fonts } from '../constants';

const RootStackNavigator = StackNavigator(
  {
    Auth:{
      screen: AuthScreen,
      navigationOptions: {
        headerStyle: {
          height: 0,
          backgroundColor: 'white'
        }
      }
    },
    AuthNext:{
      screen: AuthScreenNext,
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        title: 'Main'
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
      }
    },
    LotteryGameScreen: {
      screen: LotteryGameScreen,
      navigationOptions: {
        title: 'Lottery Screen',
      }
    },
    PurchaseScreen:{
      screen: PurchaseScreen
    },
    Gallery: {
      screen: GalleryScreen,

    },
    Article: {
      screen: ArticleScreen
    },
    GridsScreen: {
      screen: GridsScreen
    },
    Chat: {
      screen: ChatScreen,

    },
    Messages: {
      screen: MessagesScreen,
    },
    Register: {
      screen: RegisterScreen
    },
    Charts: {
      screen: ChartsScreen,

    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      title: (typeof navigation.state.params === 'object' && navigation.state.params.title)
        ? navigation.state.params.title : navigation.state.params,
      headerStyle: {
        backgroundColor: "white",
        borderBottomColor: "transparent",
      },
      headerTitleStyle: {
        color: Colors.black,
        fontFamily: Fonts.primaryRegular,
      },
      headerTintColor: Colors.white,
      headerLeft: props => (
        <View style={{paddingLeft: 25,
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: "white",
          }}>
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              paddingTop: 10,
            }}
          >
            <Icon name="chevron-left" color="blue" size={30} backgroundColor="white" verticalAlign="center"/>
          </TouchableOpacity>
        </View>
      ),
    }),
  },
);


export default RootStackNavigator;
