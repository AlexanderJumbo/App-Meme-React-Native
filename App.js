import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import auth from '@react-native-firebase/auth';
import EditProfileScreen from './Screens/EditProfileScreen';
import SettingsScreen from './Screens/SettingsScreen';
import ModalScreen from './Screens/ModalScreen';
import useAuth, {AuthProvider} from './hooks/useAuth';
import StackNavigator from './StackNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
  /*const {user} = useAuth();
  //console.log('🚀 ~ file: App.js ~ line 21 ~ App ~ user', user);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const Tab = createBottomTabNavigator();
  const HomeStack = createNativeStackNavigator();
  const SettingStack = createNativeStackNavigator();

  const ScreenHome = ({navigation}) => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Feed"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="ModalScreen"
          component={ModalScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </HomeStack.Navigator>
    );
  };
  const ScreenSettings = ({navigation}) => {
    return (
      <SettingStack.Navigator>
        <SettingStack.Screen
          name="settings"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
        <SettingStack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </SettingStack.Navigator>
    );
  };

  /*useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);*/
  /*
  if (isSignedIn === true && user != null) {
    return (
      <NavigationContainer>
        <AuthProvider>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'ios-home' : 'ios-home-outline';
                } else {
                  iconName = focused ? 'person' : 'person-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#2FBBF0',
              tabBarInactiveTintColor: '#7A8FA6',
              tabBarActiveBackgroundColor: '#26292E',
              tabBarInactiveBackgroundColor: '#26292E',
            })}>
            <Tab.Screen
              name="Home"
              component={ScreenHome} //Home
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Settings"
              component={ScreenSettings}
              options={{headerShown: false}}
            />
            
          </Tab.Navigator>
        </AuthProvider>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    );
  }*/
};

export default App;
