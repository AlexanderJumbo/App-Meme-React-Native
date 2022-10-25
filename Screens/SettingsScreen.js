import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from 'react-native-google-signin';
import {useNavigation} from '@react-navigation/core';
import useAuth from '../hooks/useAuth';
import firestore from '@react-native-firebase/firestore';

const imageGuest = require('../assets/images/imageGuest.png');

const SettingsScreen = ({navigation}) => {
  const {SignOut, user} = useAuth();
  const [isUser, setIsUser] = useState({});

  useLayoutEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        if (!documentSnapshot.exists) {
          //setIsUser(null);
        } else {
          console.log(
            '🚀 ~ file: SettingsScreen.js ~ line 30 ~ useLayoutEffect ~ documentSnapshot',
            documentSnapshot.data(),
          );
          setIsUser(documentSnapshot.data());
        }
      });
  }, []);

  function navigate() {
    navigation.navigate('EditProfile');
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={true}
      /> */}
      <Text style={styles.text}>Settings</Text>
      <TouchableOpacity onPress={navigate} style={styles.imageProfileButton}>
        <Image
          style={styles.profilePicture}
          source={
            isUser.photoURL
              ? {
                  uri: isUser.photoURL,
                }
              : imageGuest
          }
        />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={navigate} style={styles.button}>
        <Text style={styles.textButton}>Edit Profile</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={SignOut} style={styles.button}>
        <Text style={styles.textButton}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565D67',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 38,
    color: '#F8F8F8', //'#26292E',
    marginBottom: 50,
  },
  imageProfileButton: {
    width: '60%',
    height: '30%',
    borderRadius: 150,
    alignSelf: 'center',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    marginBottom: 50,
  },
  button: {
    width: '90%',
    height: 50,
    margin: 50,
    backgroundColor: '#E58947', // '#161614',
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
export default SettingsScreen;
