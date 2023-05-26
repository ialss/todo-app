import React, {
  useState,
  useEffect,
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  TextInput,
  Appearance,
} from 'react-native';


import DateTimePicker from '@react-native-community/datetimepicker';

const colorScheme = Appearance.getColorScheme();
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

import  AsyncStorage  from '@react-native-community/async-storage';

export default function NewList({ navigation }) {
  useEffect(() => {
    saveData();
  }, );

  const [inputValue, setInputValue] = useState('');

  const [arrayLeft, setArrayLeft] = useState([

  ]);
  const [arrayRight, setArrayRight] = useState([

  ]);

  const saveData = async () => {
      string1 = JSON.stringify(arrayLeft);
      string2 = JSON.stringify(arrayRight);
      await AsyncStorage.setItem('arrayLeft1', string1);
      await AsyncStorage.setItem('arrayRight1', string2);
      
  };

  const [testIndex, setTestIndex] = useState(0);
  const addList = () => {
    if (arrayLeft.length > arrayRight.length) {
      setArrayRight([
        ...arrayRight, 
        {
          id: testIndex + 1,
          listName: inputValue,
          date: new Date(date).toLocaleDateString(),
          
        },
      ]);
    } else {
      setArrayLeft([
        ...arrayLeft, 
        {
          id: testIndex + 1,
          listName: inputValue,
          date: new Date(date).toLocaleDateString(),
        },
      ]);
    }
    setTestIndex(testIndex+1)
    console.log(arrayRight)
    console.log(arrayLeft)
    try {
      saveData();
    } catch (error) {
      console.error(error);
      alert('There was an error saving the data. Please try again.');
    }

    navigation.navigate('HomeScreen');
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(true);
    setDate(currentDate);
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Image style={styles.arrow} source={require('./assets/images/arrow')} />
        </TouchableHighlight>
      </View>

      
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="List Name"
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.newTaskText}
          />
          <Text></Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={addList}>
            <Image style={styles.icon} source={require('./assets/images/plus')} />
          </TouchableHighlight>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>selected: </Text>
            <View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    colorScheme,
  },
  rowContainer: {
    flexDirection: 'row',
    height: deviceHeight / 12,
    width: deviceWidth,
    backgroundColor: "#285449",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: deviceHeight / 30,
  },

  mainContainer: {
    height: (deviceHeight * 11) / 12 - deviceHeight / 30,
    width: deviceWidth,
    backgroundColor: 'white',
  },
  inputContainer: {
    height: deviceHeight / 3,
    width: deviceWidth,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: (deviceHeight * 11) / 12 - deviceHeight / 30 - deviceHeight / 3,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newTaskText: {
    color: '#1c3832',
    fontSize: deviceHeight / 32,

    textAlign: 'center',
    borderWidth: 3,
    width: deviceWidth / 2,
    borderRadius: 10,
  },
  dateText: {
    color: '#1c3832',
    fontSize: deviceHeight / 32,

    textAlign: 'center',
    width: deviceWidth / 3.7,
  },
  dateContainer: {
    width: deviceWidth / 2,
    flexDirection: 'row',
  },
  datePicker: {
    width: 200,
    marginLeft: -75,
  },
  icon: {
    height: deviceHeight / 13,
    width: deviceWidth / 7,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  arrow: {
    height: deviceHeight /40,
    width: deviceWidth / 15,
    marginLeft: deviceWidth/18,
  },
});
