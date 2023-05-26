import React, { useState } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Switch,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [inputSource, setInput] = useState('Change Profile Picture');
  const [picSource, setSource] = useState('https://static.codehs.com/img/courses/introkarel/2.png');
  const [isEnabled, setIsEnabled] = React.useState(false);

  const saveLocal = async () => {
    alert("saved")
    await AsyncStorage.setItem('img', inputSource);


};

const retrieveLocal = async () => {
    const placeHolder = await AsyncStorage.getItem('img');

    setSource(placeHolder);
  };
    useFocusEffect(retrieveLocal);
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

      <Image
              source={{
                uri: picSource,
              }}
              style={styles.profile}
            />


      <TextInput
        style={styles.input}
        value={inputSource}
        onChangeText={(value) => setInput(value)}
        onSubmitEditing={() => {
          saveLocal();
          retrieveLocal();
        }}
      />


    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profile: {
    marginTop: deviceHeight/30,
    height: deviceHeight / 5.5,
    width: deviceWidth / 3.3,
    borderRadius: '50%',
  },
  input: {
    height: deviceHeight/20,
    width: deviceWidth/1.5,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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

    arrow: {
    height: deviceHeight /40,
    width: deviceWidth / 15,
    marginLeft: deviceWidth/18,
  },

});

export default ProfileScreen;
