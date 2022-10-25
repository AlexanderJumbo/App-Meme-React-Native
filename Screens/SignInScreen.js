import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import {GoogleSigninButton} from 'react-native-google-signin';
import {LoginManager, AccessToken, Settings} from 'react-native-fbsdk-next';
import useAuth from '../hooks/useAuth';

const imageSignUp = require('../assets/images/lock_front.png');

const SignInScreen = ({navigation}) => {
  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');

  const {signInGoogle, signInWithEmailPassword} = useAuth();

  function signInWithEmailAndPassword() {
    signInWithEmailPassword(emailUser, passwordUser);
  }

  Settings.setAppID('5742355789124933');
  Settings.initializeSDK();
  const signInFacebook = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      //'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    auth()
      .signInWithCredential(facebookCredential)
      .then(() => {
        console.log('🚀 Success...');
      })
      .catch(error => {
        console.log(
          '🚀 ~ file: SignInScreen.js ~ line 99 ~ signInFacebook ~ error',
          error.message,
        );
      });
  };

  return (
    <View style={styles.containerView}>
      <StatusBar
        animated={true}
        backgroundColor="#26292E"
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={styles.goSignInContainer}>
        <Ionicons style={styles.goSignUp} name="rightcircle" size={40} />
      </TouchableOpacity>
      <View style={styles.topView}>
        <Text style={styles.textView}>Welcome Back</Text>
        <Image style={styles.editProfile} source={imageSignUp} />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.textTitle}>Email</Text>
        <TextInput
          onChangeText={val => setEmailUser(val)}
          value={emailUser}
          style={styles.textInput}
          placeholder="Enter your email"
          autoComplete="email"
          placeholderTextColor="#565D67"
        />
        <Text style={styles.textTitle}>Password</Text>
        <TextInput
          onChangeText={val => setPasswordUser(val)}
          value={passwordUser}
          style={styles.textInput}
          placeholder="Enter your password"
          secureTextEntry={true}
          autoComplete="password"
          placeholderTextColor="#565D67"
        />
        <TouchableOpacity
          onPress={signInWithEmailAndPassword}
          style={styles.button}>
          <Text style={styles.textButton}>Sing In</Text>
        </TouchableOpacity>
        <View style={styles.buttonViewRRSS}>
          {/* <TouchableOpacity onPress={signInGoogle} style={styles.buttonGoogle}>
            <Text style={styles.textButtonGoogle}>Google</Text>
          </TouchableOpacity> */}
          <GoogleSigninButton
            style={styles.buttonGoogle}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={signInGoogle}
            disabled={false}
          />
          <TouchableOpacity
            onPress={signInFacebook}
            style={styles.buttonFacebook}>
            <Text style={styles.textButtonFacebook}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //#4E60FF #061737 #898EBC #FFFFFF
  //#26292E #565D67 #E58947 #FAB685
  containerView: {
    backgroundColor: '#26292E', //'#161414', //'#af5f7c', //'#98daff',
    height: '100%',
    width: '100%',
  },
  goSignInContainer: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    alignSelf: 'flex-end',
  },
  goSignUp: {
    margin: 20,
    color: '#26292e',
    backgroundColor: '#F8F8F8',
    borderRadius: 22,
  },
  topView: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    height: '35%',
    backgroundColor: '#26292E', // '#161614',
    //justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textView: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 25,
    color: '#F8F8F8',
  },
  editProfile: {
    width: 100,
    height: 100,
    marginTop: 30,
  },
  bottomView: {
    width: '100%',
    height: '65%',
    backgroundColor: '#F8F8F8', //'#26292E'
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
  buttonViewRRSS: {
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
  },
  textButton: {
    color: '#F8F8F8',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textButtonGoogle: {
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
  },
});

export default SignInScreen;
