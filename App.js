import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet,
  Text, 
  View, } from 'react-native';
import Contants from "expo-constants"
import Home from "./Screens/Home"
import CreateEmployee from './Screens/CreateEmployee'
import Profile from "./Screens/Profile"
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducer} from './reducres/reducer'

const store = createStore(reducer)


const Stack = createStackNavigator();
const screenoptions = {
          title:"Home",
          headerTintColor:"white",
          headerStyle:{
            backgroundColor:'#e81a0c'
          }
}

function App() {
  return (
    <View style={styles.container}>
        <Stack.Navigator>
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={screenoptions}/>
        <Stack.Screen 
        name="Create" 
        component={CreateEmployee}
        options={{...screenoptions,title:'Create Employee'}}/>
        <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={{...screenoptions, title:"Profile"}} />
    </Stack.Navigator>
    <StatusBar style="auto" />
    </View>
  );
}

export default ()=>{
  return(
    <Provider store = {store}>
    <NavigationContainer>
      <App/>
    </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    
  },
});
