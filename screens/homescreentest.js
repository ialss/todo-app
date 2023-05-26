import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const [profileSource, setSource]= 'https://static.codehs.com/img/courses/introkarel/2.png';


export default function Testfunction({ navigation }) {
  const [arrayLeft1, setArrayLeft1] = useState([]);
  const [arrayRight1, setArrayRight1] = useState([]);
  const [date, setDateTime] = useState('');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = new Date();
  const month = months[today.getMonth()];
  const day = month + " " + date + "th";

  const nowDate = () => {
    var date = new Date().getDate();
    setDateTime(date);
  };

  const yoSquad = () => {
    loadData();
    navigation.navigate('profile');
  };

  const [fontsLoaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/openSans'),
  });

  useEffect(() => {
    loadData();
    nowDate();
  }, []);


  const loadData = async () => {
    const arrayLeftString = await AsyncStorage.getItem('arrayLeft1');
    const arrayRightString = await AsyncStorage.getItem('arrayRight1');
    setArrayLeft1(JSON.parse(arrayLeftString));
    setArrayRight1(JSON.parse(arrayRightString));

    const placeHolder = await AsyncStorage.getItem("img");
    setSource(placeHolder);

  };

  const saveData = async (index1) => {
    await AsyncStorage.setItem('index', index1);
  };

  const handlePress = (index1) => {
    saveData(index1);
    navigation.navigate('tasksPage');
  };

  const handleAdd = () => {
    navigation.navigate('test');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.rowStuff}>
          <Text style={styles.header}>Hello, User!</Text>
          <TouchableHighlight onPress={() => 
          yoSquad()
          }>
            <Image
              source={{
                uri: profileSource,
              }}
              style={styles.profile}
            />
          </TouchableHighlight>
        </View>
        <Text style={styles.small}>
        {day}
        </Text>
      </View>


      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.splitContainer}>
            {arrayLeft1.map((list) => (
              <TouchableHighlight
                onPress={() => {
                  handlePress(list.id);
                }}>
                <View style={styles.button}>
                  <Text style={styles.listHeader}>{list.listName}</Text>
                  <Text style={styles.dateText}>{list.date} </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>

          <View style={styles.splitContainer}>
            {arrayRight1.map((list) => (
              <TouchableHighlight
                onPress={() => {
                  handlePress(list.id);
                }}>
                <View key={list.id} style={styles.button}>
                  <Text style={styles.listHeader}>{list.listName}</Text>
                  <Text style={styles.dateText}>{list.date}</Text>
                </View>
              </TouchableHighlight>
            ))}
                    <TouchableHighlight onPress={handleAdd}>
          <Image style={styles.icon} source={require('./assets/images/plus')} />
        </TouchableHighlight>
          </View>
          
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  rowStuff: {
    flexDirection: 'row',
    marginTop: deviceHeight/14,
  },

  headerContainer: {
    height: deviceHeight / 5,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#285449',
    borderBottomLeftRadius: deviceHeight / 20,
    borderBottomRightRadius: deviceHeight / 20,
  },

  small: {
    color: "#65a28e",
    marginBottom: deviceHeight/20,
    fontSize: deviceHeight/50,
    marginRight: deviceWidth/2,
  },
  mainContainer: {
    height: (deviceHeight * 11) / 12 - deviceHeight / 30,
    width: deviceWidth,
    backgroundColor: 'white',
    marginTop: deviceHeight / 12,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  splitContainer: {
    width: deviceWidth / 2,
    height: (deviceHeight * 11) / 12 - deviceHeight / 30,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    width: deviceWidth / 2.5,
    height: deviceHeight / 10,
    backgroundColor: '#deede5',
    margin: 10,
    borderRadius: 5,
  },
  listHeader: {
    color: '#1c3832',
    fontSize: deviceHeight / 40,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#1c3832',
    fontSize: deviceHeight / 40,
  },


  header: {
    flex: 1,
    textAlign: 'center',
    fontSize: deviceHeight / 20,
    marginRight: deviceWidth / 5,
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    marginLeft: deviceWidth / 18,
  },
  profile: {
    marginTop: deviceHeight / 110,
    height: deviceHeight / 13,
    width: deviceWidth / 7,
    marginRight: deviceHeight / 40,
  },
   icon: {
    height: deviceHeight / 13,
    width: deviceWidth / 7,
    position: 'abosulute',
    right: 0,
    bottom: 0,
    zindex: 2,
  },
});
