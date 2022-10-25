import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';
import HomeScreen from './Screens/HomeScreen';
import ModalScreen from './Screens/ModalScreen';
import SettingsScreen from './Screens/SettingsScreen';
import EditProfileScreen from './Screens/EditProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ModalAboutApp from './Screens/ModalAboutApp';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();
  const HomeStack = createNativeStackNavigator();
  const SettingStack = createNativeStackNavigator();

  const {user} = useAuth();

  const ScreenHome = ({navigation}) => {
    return (
      <HomeStack.Navigator initialRouteName="Home">
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
        <HomeStack.Screen
          name="ModalAboutApp"
          component={ModalAboutApp}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
            animation: 'slide_from_right',
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
  return (
    <>
      {/* <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator> */}
      {user ? (
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
            initialRouteName="Home"
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
      ) : (
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
      )}
    </>
  );
};
export default StackNavigator;
