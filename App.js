import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import  TasksPage  from './screens/tasksPage'
import  NewList  from './screens/newList'
import  Testfunction  from './screens/homescreentest'
import  TasksList  from './screens/tasksList'
import  ProfileScreen  from './screens/profile'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="TasksList" options = {{headerShown: false}} component={TasksList} />
        <Stack.Screen name="test" options = {{headerShown: false}} component={NewList} />
        <Stack.Screen name="HomeScreen" options = {{headerShown: false}} component={Testfunction} />
        <Stack.Screen name="profile" options = {{headerShown: false}} component={ProfileScreen} />


        <Stack.Screen name="tasksPage" options = {{headerShown: false}} component={TasksPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
