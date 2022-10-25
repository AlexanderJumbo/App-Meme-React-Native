import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';

const ModalAboutApp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          style={styles.back}
          name="leftcircle" //leftcircleo
          size={40}
          color={'#F8F8F8'}
        />
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon style={styles.logo} name="aliwangwang-o1" size={60} />
        </TouchableOpacity>
        <Text style={styles.text}>About App</Text>
        <Text style={styles.text2}>
          {' '}
          Aliqua pariatur elit culpa consectetur consectetur quis et laboris
          adipisicing dolore mollit qui exercitation. Irure cillum excepteur
          velit est do nisi cillum cupidatat veniam aliquip exercitation.
          Adipisicing voluptate consequat nostrud laborum veniam irure quis
          incididunt sit laborum. Sunt Lorem amet nulla cupidatat dolor in et.{' '}
        </Text>
      </View>
    </View>
  );
};

export default ModalAboutApp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#565D67', //'#E58947', // '#FAB685',
    display: 'flex',
  },
  back: {
    margin: 20,
    width: '10%',
    color: '#565d67',
    backgroundColor: '#E58947', //'#F8F8F8',
    borderRadius: 20,
  },
  subContainer: {
    //backgroundColor: 'red',
    margin: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    color: '#E58947',
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
    color: '#F8F8F8',
    fontSize: 30,
  },
  text2: {
    color: '#000',
    fontSize: 25,
    textAlign: 'justify',
  },
});
