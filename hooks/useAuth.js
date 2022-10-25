import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {useNavigation} from '@react-navigation/core';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  function signInWithEmailPassword(emailUser, passwordUser) {
    auth()
      .signInWithEmailAndPassword(emailUser, passwordUser)
      .then(() => {
        console.log('Success');
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  GoogleSignin.configure({
    webClientId:
      '1073389454326-l6nhjiv3a57064q7i4rn7ju95v9584tc.apps.googleusercontent.com',
  });

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //console.log(userInfo);
      const payload = {
        token: userInfo.idToken,
        first_name: userInfo.user.givenName,
        last_name: userInfo.user.familyName,
        email: userInfo.user.email,
      };
      const googleCredential = auth.GoogleAuthProvider.credential(
        payload.token,
      );
      //props.actions.socialLogin(payload);
      //console.warn('google', payload);
      auth()
        .signInWithCredential(googleCredential)
        .then(() => {
          console.log('Success');
        })
        .catch(error => {
          console.log(error.message);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
  };

  async function SignOut() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out');
      })
      .catch(err => {
        console.log(err);
      });
    await GoogleSignin.revokeAccess().then(() => {
      console.log('revoked access');
    });
    await GoogleSignin.signOut().then(() => {
      console.log('access cancelled');
    });
  }

  const memoedValue = useMemo(
    () => ({
      user, //user:user,
      //loading,
      //error,
      signInWithEmailPassword,
      signInGoogle,
      //isSignedIn,
      SignOut,
      //googleSignOut,
    }),
    [user /* , isSignedIn */ /* , loading, error */],
  );

  return (
    <AuthContext.Provider
      value={
        memoedValue /* {
        user, //user:user,
        loading,
        error,
        signInWithGoogle,
        googleSignOut,
      } */
      }>
      {/* !loadingInitial && */ children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
