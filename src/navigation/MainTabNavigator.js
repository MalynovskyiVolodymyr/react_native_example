/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import { Colors, Fonts } from '../constants';

import HomeScreen from '../containers/HomeScreen';
import CalendarScreen from '../containers/CalendarScreen';
import GridsScreen from '../containers/GridsScreen';
import PagesScreen from '../containers/PagesScreen';
import ComponentsScreen from '../containers/ComponentsScreen';
import HeaderScreen from '../containers/HeaderScreen';
import SendReciveScreen from "../containers/SendReciveScreen";
import UserProfileScreen from '../containers/UserProfileScreen';

const iconHome = require('../../assets/images/tabbar/home.png');
const iconCalendar = require('../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../assets/images/tabbar/grids.png');
const iconPages = require('../../assets/images/tabbar/pages.png');
const iconComponents = require('../../assets/images/tabbar/components.png');
const iconUser = require('../../assets/images/tabbar/user.png');
const bookMark = require('../../assets/images/tabbar/bookmark.png');
const dollar = require('../../assets/images/tabbar/dollar.png');
const message = require('../../assets/images/tabbar/messageshape.png');

const hederBackground = require('../../assets/images/topBarBg.png');



const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
  },
  tabBarIconFocused: {
    tintColor: 'yellow',
  },
  headerContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  headerCaption: {
    fontFamily: Fonts.primaryRegular,
    color: Colors.blue,
    fontSize: 18,
  },
});

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: (
          <HeaderScreen/>
        )
      },
    },
    // Lottery: {
    //   screen: LotteryGameScreen,
    //   navigationOptions: {
    //     header: (
    //       <HeaderScreen/>
    //     ),
    //   },
    // },
    "Send Receive":{
      screen: SendReciveScreen,
      navigationOptions: {
        header: (
          <HeaderScreen/>
        ),
      }
    },
    // Pages: {
    //   screen: PagesScreen,
    //   navigationOptions: {
    //     header: (
    //       <HeaderScreen/>
    //     ),
    //   },
    // },
    "User Profile": {
      screen: UserProfileScreen,
      navigationOptions: {
        header: (
          <HeaderScreen/>
        ),
      },
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconSource;
        switch (routeName) {
          case 'Home':
            iconSource = iconHome;
            break;
          // case 'Lottery':
          //   iconSource = message;
          //   break;
          case 'Send Receive':
            iconSource = dollar;
            break;
          // case 'Pages':
          //   iconSource = bookMark;
          //   break;
          case 'User Profile':
            iconSource = iconUser;
            break;
          default:
            iconSource = iconComponents;
        }
        return (
          <View
            style={styles.tabBarItemContainer}
          >
            <Image
              resizeMode="contain"
              source={iconSource}
              style={[ styles.tabBarIcon, focused && styles.tabBarIconFocused ]}
            />
          </View>
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: true,
      style: {
        backgroundColor: Colors.white,
        borderTopWidth: 0.5,
        borderColor: Colors.white,
        marginTop: -10
      },
      labelStyle: {
        color: Colors.grey,
      }
    },
  },
);

