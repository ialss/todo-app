import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const TasksPage = ({navigation}) => {
  useEffect(() => {
    loadData();
    chooseArray();
  }, []);
  const [todo, setTodo] = useState('');

  const [todos, setTodos] = useState([{ id: 1, tasks: ['boy', 'dawg'] }]);
  const [todos1, setTodos1] = useState([]);
  const [todos2, setTodos2] = useState([]);
  const [todos3, setTodos3] = useState([]);

  const addTodo = () => {
    const newTodos = [...todos];
    const lastTodo = newTodos[newTodos.length - 1];
    lastTodo.tasks.push(todo);
    setTodos(newTodos);
    setTodo('');
  };
  const [index, setIndex] = useState(0);
  const chooseArray = () => {
    if (index == 1) {
      setTodos(todos1);
    } else if (index == 2) {
      setTodos(todos2);
    } else if (index == 3) {
      setTodos(todos3);
    }
  };

  const removeTodo = (i, j) => {
    const newTodos = [...todos];
    newTodos[i].tasks.splice(j, 1);
    setTodos(newTodos);
  };

  const loadData = async () => {
    setIndex(await AsyncStorage.getItem('index'));

    placeholder1 = JSON.parse(await AsyncStorage.getItem('todos1'));
    setTodos1(placeholder1);
    placeholder2 = JSON.parse(await AsyncStorage.getItem('todos2'));
    setTodos2(placeholder2);
    placeholder3 = JSON.parse(await AsyncStorage.getItem('todos3'));
    setTodos3(placeholder3);
  };

  const saveData = async () => {
    if (index == 1) {
      await AsyncStorage.setItem('todos1', JSON.stringify(todos));
    } else if (index == 2) {
      await AsyncStorage.setItem('todos2', JSON.stringify(todos));
    } else if (index == 3) {
      await AsyncStorage.setItem('todos3', JSON.stringify(todos));
    }
  };

  return (
    <View>


      <View style={styles.rowContainer}>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Image
            style={styles.arrow}
            source={require('./assets/images/arrow')}
          />
        </TouchableHighlight>
      </View>

      <TouchableHighlight onPress={chooseArray}>
        <View style={styles.button}>
          <Text>Retrieve</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={saveData}>
        <View style={styles.button}>
          <Text>Save</Text>
        </View>
      </TouchableHighlight>

      <TextInput
        value={todo}
        onChangeText={setTodo}
        placeholder="Enter a to-do"
      />

      <TouchableHighlight title="Add" onPress={addTodo}>
        <View style={styles.buttonDyn}>
          <Text>Add</Text>
        </View>
      </TouchableHighlight>
      {todos.map((t, i) => (
        <View key={i}>
          {t.tasks.map((task, j) => (
            <View key={j}>
              <Text>{task}</Text>
              <TouchableHighlight title="X" onPress={() => removeTodo(i, j)}>
                <View style={styles.buttonDyn}>
                  <Text>X</Text>
                </View>
              </TouchableHighlight>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#448571',
    padding: 10,
    marginTop: 10,
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
  buttonDyn: {
    alignItems: 'center',
    backgroundColor: '#448571',
    padding: 10,
    marginTop: 10,
  },
  arrow: {
    height: deviceHeight /40,
    width: deviceWidth / 15,
    marginLeft: deviceWidth/18,
  },
});

export default TasksPage;
