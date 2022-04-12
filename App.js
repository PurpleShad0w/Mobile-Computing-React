/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react'
import {Text, View, StyleSheet, Button, Header, TextInput, TouchableOpacity} from 'react-native';
/*import {Appbar} from 'react-native-paper';*/
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.production.min';

const styles = StyleSheet.create({
  userbox: {
    alignItems: 'center',
    backgroundColor: '#61dafb',
    padding: 20,
  },
  separator: {
    marginVertical: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  list: {
    margin: 24,
  }
})

const Separator = () => (
  <View style={styles.separator} />
);

const OneUser = (user) => {
  return (
    <View style={styles.userbox}>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}

function UserCreation({navigation},name,email) {
  AsyncStorage.setItem(email, name);
  navigation.navigate('Users List');
}

function UserList({navigation}) {
  return (
    /*<><Appbar.Header><Appbar.Content title="Users List"/></Appbar.Header>*/
    <View style={styles.list}>
      <Separator/>
      <Button color='purple' title="Create user" onPress={() => navigation.navigate('Create User')}/>
      <Separator/>
      <TouchableOpacity onPress={() => navigation.navigate('User Details')}>
      <OneUser name='test user' email='test email'/>
      </TouchableOpacity>
      <Separator/>
      <TouchableOpacity onPress={() => navigation.navigate('User Details')}>
      <OneUser name='second name' email='second email'/>
      </TouchableOpacity>
      <Separator/>
      <TouchableOpacity onPress={() => navigation.navigate('User Details')}>
      <OneUser name='third time' email='the charm'/>
      </TouchableOpacity>
    </View>/*</>*/
  );
}

function CreateUser({navigation}) {
  let name = '';
  let email = '';
  const saveUserName = input => {
    name = input;
  };
  const saveUserEmail = input => {
    email = input;
  };
  return (
    <View>
      <TextInput style={styles.input} onChangeText={input => saveUserName(input)} placeholder="Name" placeholderTextColor='purple' color='black'/>
      <TextInput style={styles.input} onChangeText={input => saveUserEmail(input)} placeholder="Email" placeholderTextColor='purple' color='black'/>
      <View style={styles.list}>
      <Button color='pink' title="Save user" onPress={() => UserCreation({navigation},name,email)}/>
      </View>
    </View>
  );
}

function UserDetails({navigation}) {
  return (
    <View>
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor='purple'/>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor='purple'/>
      <View style={styles.list}>
      <Button color='green' title="Update user" onPress={() => navigation.navigate('Users List')}/>
      <Separator/>
      <Button color='red' title="Delete user" onPress={() => navigation.navigate('Users List')}/>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Users List">
        <Stack.Screen name="Users List" component={UserList} />
        <Stack.Screen name="Create User" component={CreateUser} />
        <Stack.Screen name="User Details" component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;