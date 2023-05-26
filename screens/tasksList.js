import React, { useState, useEffect } from 'react';
import {
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function TasksList({ navigation }) {
  useEffect(() => {
    loadData();
    navigation.navigate('test');

  });
  const loadData = async () => {
    const indexString = await AsyncStorage.getItem('index');

    setIndex(JSON.parse(indexString));

  };
  const [todos, setTodos] = useState()
  const [todos1, setTodos1] = useState([
    { id: 1, tasks: ['cheese', 'dog'] },
  ]);
  const [todos2, setTodos2] = useState([
    { id: 2, tasks: ['sdfsdfsdf', 'boyunt'] },
  ]);
  const [todos3, setTodos3] = useState([
    { id: 3, tasks: ['435636', 'boyunt'] },
  ]);




}
