import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
//import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const imageSignUp = require('../assets/images/notepad_front.png');

const SignUpScreen = ({navigation}) => {
  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');

  /*GoogleSignin.configure({
    webClientId:
      '1073389454326-l6nhjiv3a57064q7i4rn7ju95v9584tc.apps.googleusercontent.com',
  });

  async function googleSignIn() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        console.log('Success');
      })
      .catch(error => {
        console.log(error.message);
      });
  }*/

  function createUser() {
    auth()
      .createUserWithEmailAndPassword(emailUser, passwordUser)
      .then(() => {
        console.log('User was created with success');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email is already exist');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('The email address is invalid');
        }
        console.error(error.message);
      });
  }

  return (
    <View style={styles.containerView}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goSignInContainer}>
        <Ionicons
          style={styles.goSignIn}
          name="leftcircle" //leftcircleo
          size={40}
        />
      </TouchableOpacity>
      <View style={styles.topView}>
        <Text style={styles.textView}>Register</Text>
        <Image
          style={styles.editProfile}
          source={imageSignUp} //'https://lh3.googleusercontent.com/a-/AOh14Gjfw96tmJ8EJvvE58X_Ys4rGkhHZktv753NJj0lOA=s96-c',
        />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.textTitle}>Email</Text>
        <TextInput
          onChangeText={val => setEmailUser(val)}
          value={emailUser}
          style={styles.textInput}
          placeholder="Enter your email"
          autoComplete="email"
          placeholderTextColor="#161614"
        />
        <Text style={styles.textTitle}>Password</Text>
        <TextInput
          onChangeText={val => setPasswordUser(val)}
          value={passwordUser}
          style={styles.textInput}
          placeholder="Enter your password"
          secureTextEntry={true}
          autoComplete="password"
          placeholderTextColor="#161614"
        />
        <TouchableOpacity onPress={createUser} style={styles.button}>
          <Text style={styles.textButton}>Register</Text>
        </TouchableOpacity>
        {/* <View style={styles.buttonViewRRSS}>
          <TouchableOpacity onPress={googleSignIn} style={styles.buttonGoogle}>
            <Text style={styles.textButtonGoogle}>Google</Text>
          </TouchableOpacity> 
          <GoogleSigninButton
            style={styles.buttonGoogle}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={googleSignIn}
            disabled={false}
          />
          <TouchableOpacity style={styles.buttonFacebook}>
            <Text style={styles.textButtonFacebook}>Facebook</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: '#26292E', //'#161414', //'#af5f7c', //'#98daff',
    height: '100%',
    width: '100%',
  },
  goSignInContainer: {
    //width: '20%',
    display: 'flex',
    flexWrap: 'wrap-reverse',
    alignSelf: 'flex-start',
  },
  goSignIn: {
    margin: 20,
    //alignSelf: 'flex-start',
    color: '#26292E',
    backgroundColor: '#F8F8F8',
    borderRadius: 22,
  },
  topView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '35%',
    backgroundColor: '#26292E', //'#161614',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textView: {
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: 70,
    marginLeft: 25,
    color: '#F8F8F8',
  },
  editProfile: {
    width: 100,
    height: 100,
    marginTop: 70,
  },
  bottomView: {
    width: '100%',
    height: '65%',
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textTitle: {
    color: '#565D67',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  textInput: {
    width: '90%',
    marginBottom: 20,
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
    margin: 10,
    backgroundColor: '#4E60FF', // '#161614',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  /* buttonViewRRSS: {
    marginTop: 10,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonGoogle: {
    width: '47%',
    height: 60,
    margin: 10,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonFacebook: {
    width: '47%',
    height: 60,
    margin: 10,
    backgroundColor: '#0852c6',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
  }, */
  textButton: {
    color: '#F8F8F8',
    fontWeight: 'bold',
    fontSize: 20,
  },
  /*textButtonGoogle: {
    width: 165,
    textAlign: 'center',
    color: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 20,
    fontSize: 15,
  },
  textButtonFacebook: {
    width: 165,
    textAlign: 'center',
    color: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#0852c6',
    borderRadius: 8,
    padding: 20,
    fontSize: 15,
  },*/
});

export default SignUpScreen;
