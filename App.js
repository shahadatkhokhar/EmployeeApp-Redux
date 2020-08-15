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
export default function App() {
  return (
    <View style={styles.container}>
      <Profile/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    marginTop:Contants.statusBarHeight,
    
  },
});
