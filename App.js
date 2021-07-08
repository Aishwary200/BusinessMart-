import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { AppDrawerNavigator } from './component/AppDrawerNavigator'
import { TabNavigator } from './component/AppTabNavigator'
import WelcomeScreen from './screens/WelcomeScreen';
import SignUp from './screens/SignUpScreen'
import HomeScreen from './screens/HomeScreen';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  SignUp: { screen: SignUp },
  HomeScreen: { screen: HomeScreen },
  Drawer: { screen: AppDrawerNavigator },
  BottomTab: { screen: TabNavigator },
})

const AppContainer = createAppContainer(switchNavigator);
