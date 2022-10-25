import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';

import useAuth from '../hooks/useAuth';
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';

const EditProfileScreen = ({navigation /*, message */}) => {
  const {user} = useAuth();
  //const navigation = useNavigation()
  const [userName, setUserName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userAge, setUserAge] = useState(null);

  const incompleteForm = !userName || !userLastName || !userAge;

  const saveUserProfile = async () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .set({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userName,
        userLastName,
        userAge,
        //timestamp: serverTimestamp(),
      })
      .then(() => {
        Alert.alert(
          'Edit Profile',
          'You profile account has been processed successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
            },
          ],
        );
        //alert('Success register!..');
        //navigation.goBack('EditProfile');
      })
      .catch(error => {
        alert('Error..!');
        console.error(error.message);
      });
    setUserName(null);
    setUserLastName(null);
    setUserAge(null);
  };

  /* useEffect(() => {
    Alert.alert(message, [
      {
        text: 'OK',
        //onPress: () => navigation.navigate('Home'),
      },
    ]);
  }, []); */

  return (
    <View style={styles.containerView}>
      {/* <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle="dark-content"
          showHideTransition="slide"
          hidden={true}
        /> */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons
          style={styles.back}
          name="leftcircle" //leftcircleo
          size={40}
          color={'#F8F8F8'}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon style={styles.logo} name="aliwangwang-o1" size={30} />
        </TouchableOpacity>
        <Text style={styles.textView}>Edit the following fields</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          value={userName}
          onChangeText={setUserName}
          style={styles.textInput}
          placeholder="Enter your name"
          //autoComplete="email"
          placeholderTextColor="#161614"
        />
        <TextInput
          value={userLastName}
          onChangeText={setUserLastName}
          style={styles.textInput}
          placeholder="Enter your last name"
          placeholderTextColor="#161614"
        />
        <TextInput
          value={userAge}
          onChangeText={setUserAge}
          style={styles.textInput}
          placeholder="Enter your age"
          placeholderTextColor="#161614"
          maxLength={2}
          keyboardType="numeric"
        />
        <TouchableOpacity
          disabled={incompleteForm}
          onPress={saveUserProfile}
          style={incompleteForm ? styles.buttonDisabled : styles.button}>
          <Text style={styles.textButton}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    backgroundColor:
      '#565D67' /* '#26292E', */ /* '#161414', */ /* '#af5f7c' ,*/, //'#98daff',
    height: '100%',
    width: '100%',
  },
  back: {
    margin: 20,
    width: '10%',
    color: '#565d67',
    backgroundColor: '#E58947', //'#F8F8F8',
    borderRadius: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    color: '#E58947', // '#F8F8F8',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 60,
  },
  textView: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    color: '#F8F8F8',
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '35%',
    backgroundColor: '#565D67' /* '#af5f7c' */ /* '#26292E', ,*/, //'#161614',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textInput: {
    width: '90%',
    marginBottom: 10,
    backgroundColor: '#FFFFFF', //'#f8f8ff'
    borderWidth: 1,
    borderColor: '#f8f8ff',
    borderRadius: 15,
    fontSize: 20,
    color: '#000',
    paddingLeft: 10,
    marginLeft: 20,
  },
  button: {
    width: '90%',
    height: 50,
    margin: 20,
    backgroundColor: '#E58947' /* '#4E60FF', */, // '#161614',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonDisabled: {
    width: '90%',
    height: 50,
    margin: 20,
    backgroundColor: '#FAB685' /* '#4E60FF', */, // '#161614',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  textButton: {
    color: '#F8F8F8',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default EditProfileScreen;
