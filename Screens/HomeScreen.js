import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {getMemes, getMemes2} from '../services/service';
import {SliderBox} from 'react-native-image-slider-box';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/AntDesign';

import useAuth from '../hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import EditProfileScreen from './EditProfileScreen';

const imageEmpty = require('../assets/images/placeholder.png');
const imageGuest = require('../assets/images/imageGuest.png');

const dimentions = Dimensions.get('screen');
const HomeScreen = ({navigation}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUser, setIsUser] = useState(null);
  console.log(
    '🚀 ~ file: HomeScreen.js ~ line 33 ~ HomeScreen ~ isUser',
    isUser,
  );
  //const [message, setMessage] = useState('Hello from');
  const {user} = useAuth();
  //console.log('🚀 ~ file: HomeScreen.js ~ line 27 ~ HomeScreen ~ user', user);

  const [memesData, setMemesData] = useState([]);
  const [memesImages, setMemesImages] = useState([]);
  //console.log("🚀 ~ file: HomeScreen.js ~ line 21 ~ HomeScreen ~ setMemesImages", setMemesImages) CTRL + ALT + L
  const getData = () => {
    return Promise.all([getMemes(), getMemes2()]);
  };

  useLayoutEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      //.get()
      .onSnapshot(
        /* then */ documentSnapshot => {
          //console.log(documentSnapshot);
          if (!documentSnapshot.exists) {
            setIsRegistered(false);
            /* setMessage(
              'Update your profile. You profile account has not been updated yet. Please before follow using this app, first updated your informatión',
            ); */
            //navigation.navigate('EditProfile');
            Alert.alert(
              'Update your profile',
              'You profile account has not been updated yet.' +
                ' Please before follow using this app, first updated your informatión',
              [
                {
                  text: 'OK',
                  //onPress: () => navigation.navigate('EditProfile'),
                },
              ],
            );
          } else {
            setIsUser(documentSnapshot.data());
            setIsRegistered(true);
            //setIsUser(user);
            //setMessage(null);
          }
        },
      );
  }, []);

  useEffect(() => {
    /* const imgflip = new Imgflip({
      username: 'AlexJumbo',
      password: 'andymatias',
    }); */
    /* async function getMemes() {
      const memes = await imgflip.memes();
      console.log(memes);
    } */
    /*getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          popularMoviesData.forEach(movie => {
            moviesImagesArray.push(
              movie.memes.url, //'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            );
          });
          setMemesImages(moviesImagesArray);
          //setLoaded(true);
        },
      )
      .catch(error => {
        //setError(true);
        console.log(error);
      })
      .finally(() => {
        //setLoaded(true);
      }); */
    const moviesImagesArray = [];
    fetch('https://api.imgflip.com/get_memes')
      .then(r => r.json())
      .then(response => setMemesImages(response.data.memes));

    memesImages.map(image => {
      //moviesImagesArray.push(image.url);
      //setMemesImages(moviesImagesArray);
      console.log(image.url);
      //moviesImagesArray.push(image.url);
      //setMemesData(moviesImagesArray);
    });
    //getMemes();
    //console.log(res);
  }, []);
  if (isRegistered === true /* && message === '' */) {
    return (
      <React.Fragment>
        <StatusBar
          animated={true}
          backgroundColor="#565D67"
          barStyle="dark-content"
          showHideTransition="slide"
          hidden={false}
        />
        <View style={styles.container}>
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ModalScreen')}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('ModalAboutApp')}>
              <Icon style={styles.logo} name="aliwangwang-o1" size={30} />
            </TouchableOpacity>
            <Icon style={styles.search} name="search1" size={30} />
          </View>
          <ScrollView>
            {memesImages &&
              memesImages.map(image => (
                <View style={styles.sliderContainer} key={image.id}>
                  <Image
                    style={styles.image}
                    source={
                      image.url
                        ? {
                            uri: image.url,
                          }
                        : imageEmpty
                    }
                  />
                </View>
              ))}
            {/* <View style={styles.sliderContainer}>
          <SliderBox
          images={memesData}
          dotStyle={styles.sliderStyle}
          sliderBoxHeight={dimentions.height / 1.5}
          autoplay={false}
          circleLoop={true}
          />
        </View> */}
          </ScrollView>
          {/* <FlatList
        data={content}
        horizontal={true}
        renderItem={({item}) => (
          <Card navigation={navigation} item={item} />
        )}></FlatList> */}
          {/* <SliderBox
            images={memesImages}
            dotStyle={styles.sliderStyle}
            sliderBoxHeight={dimentions.height / 1.5}
            autoplay={true}
            circleLoop={true}
          /> */}
          {/* <Carousel
            data={memesData}
            renderItem={renderItem}
            sliderWidth={80}
            itemWidth={80}
          /> */}
          {/* </View>
      )} */}
        </View>
      </React.Fragment>
    );
  } else {
    return (
      <EditProfileScreen navigation={navigation} /* message={message} */ />
    );
  }
};

const styles = StyleSheet.create({
  //#4E60FF #061737 #898EBC #FFFFFF
  //#26292E #565D67 #E58947 #FAB685
  container: {
    backgroundColor: '#565D67',
    width: '100%',
    height: 'auto',
  },
  navBar: {
    marginTop: 20,
    marginBottom: 30,
    width: '90%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#26292E',
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    color: '#FFFFFF',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignContent: 'flex-start',
  },
  search: {
    color: '#FFFFFF',
  },
  /*snapCarouselItem: {
    width: 200,
  },
  carouselItemTitle: {
    color: 'red',
  },
  carouselItemTitleText: {
    color: '#000',
  },*/
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#565D67',
  },
  image: {
    width: '80%',
    height: 350,
    borderRadius: 10,
    /*top:-120,
    left:-243,
    width:457,
    height:260*/
  },
  /*sliderStyle: {
    height: 0,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },*/
});

export default HomeScreen;
