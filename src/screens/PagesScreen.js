import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
//import { Entypo as Icon } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/dist/Entypo';
import { Colors, Fonts } from '../constants';
import GridsScreen from "../containers/GridsScreen";

const chartIcon = require('../../assets/images/pages/chart.png');
const calendarIcon = require('../../assets/images/pages/calendar.png');
const chatIcon = require('../../assets/images/pages/chat.png');
const galleryIcon = require('../../assets/images/pages/gallery.png');
const profileIcon = require('../../assets/images/pages/profile.png');

export default function PagesScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => props.navigationActions.navigate({ routeName: 'Charts' })} style={styles.item}>
          <Image resizeMode="contain" source={chartIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Charts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigationActions.navigate({ routeName: 'Gallery' })} style={styles.item}>
          <Image resizeMode="contain" source={galleryIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigationActions.navigate({ routeName: 'Profile' })} style={styles.item}>
          <Image resizeMode="contain" source={profileIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => props.navigationActions.navigate({ routeName: 'Chat' })} style={styles.item}>
          <Image resizeMode="contain" source={chatIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigationActions.navigate({ routeName: 'GridsScreen' })} style={styles.item}>
          <Image resizeMode="contain" source={calendarIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {AsyncStorage.clear();props.navigationActions.reset({index:0,actions:[NavigationActions.navigate({ routeName: 'Auth' })]});}} style={styles.item}>
          <Image resizeMode="contain" source={profileIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: Colors.primary,
    fontFamily: Fonts.primary,
  },
  itemImage: {
    height: 35,
  },
});
