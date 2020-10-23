import {AsyncStorage} from "react-native";


async function saveCollection(collectionName, data) {
  await AsyncStorage.setItem(collectionName, data);
}

async function getCollection(){
  try{
    return JSON.parse(await  AsyncStorage.getItem('user'));
  }catch(error){
    return null;
  }
}

export default { saveCollection, getCollection };