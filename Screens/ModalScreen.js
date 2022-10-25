import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/AntDesign';
import useAuth from '../hooks/useAuth';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const imageGuest = require('../assets/images/imageGuest.png');

const ModalScreen = ({navigation}) => {
  const {user} = useAuth();
  const [isUser, setIsUser] = useState({});
  const [image, setImage] = useState(null);
  const [isSelectImage, setIsSelectImage] = useState(false);
  const [uploading, setupLoading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  //const [url, setUrl] = useState('');
  //console.log('🚀 ~ file: ModalScreen.js ~ line 29 ~ ModalScreen ~ url', url);

  //const urlDownload = '';

  console.log(
    '🚀 ~ file: ModalScreen.js ~ line 33 ~ ModalScreen ~ isUser',
    isUser,
  );
  useLayoutEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        if (!documentSnapshot.exists) {
          //setIsUser(null);
        } else {
          console.log(
            '🚀 ~ file: ModalScreen.js ~ line 42 ~ useLayoutEffect ~ documentSnapshot',
            documentSnapshot.data(),
          );
          setIsUser(documentSnapshot.data());
        }
      });
  }, []);
  /* console.log('🚀 ~ file: ModalScreen.js ~ line 23 ~ ModalScreen ~ user', user);
  console.log(
    '🚀 ~ file: ModalScreen.js ~ line 24 ~ ModalScreen ~ isUser',
    isUser,
  ); */

  const incompleteUpload = isSelectImage === false;

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      const filename = image.path.substring(68, 108);
      const imageUri = image.path;
      setIsSelectImage(true);
      setImage(imageUri);
    });
  };

  const uploadImageWithStorage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').slice(0, -1).join('.');
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setupLoading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);
    /*console.log(
      '🚀 ~ file: ModalScreen.js ~ line 81 ~ uploadImageWithStorage ~ uploadUri',
      uploadUri,
    );
    console.log(
      '🚀 ~ file: ModalScreen.js ~ line 81 ~ uploadImageWithStorage ~ filename',
      filename,
    );*/

    task.on('state_changed', async taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
      const urlDownload = await storage().ref(filename).getDownloadURL();
      console.log(
        '🚀 ~ file: ModalScreen.js ~ line 78 ~ uploadImageWithStorage ~ urlDownload',
        urlDownload,
      );
      //setUrl(urlDownload);

      firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          photoURL: urlDownload,
        })
        .then(() => {
          console.log('User updated!');
        });
    });

    try {
      await task;
      setupLoading(false);
      //updatedUser();
      Alert.alert(
        'Updated profile picture',
        'You profile picture has been processed successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
    setImage(null);
    setIsSelectImage(false);
  };

  /*const updatedUser = () => {
    console.log(
      '🚀 ~ file: ModalScreen.js ~ line 133 ~ updatedUser ~ url',
      url,
    );
     firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        photoURL: url,
      })
      .then(() => {
        console.log('User updated!');
      });
  }; */

  /*const showImagePicker = async () => {
    const source = '';
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      console.log('image name', image.path.substring(68, 108));
      console.log('image path', image.path);
      //setImage(image.path.substring(68, 108));
      //source = image.path.substring(68, 108);

      let data = new FormData();
      const filename = Date.now() + image.path.substring(68, 108); //.path.substring(68, 108);
      const file = image.mime;
      data.append('name', filename);
      data.append('file', file);
      console.log(
        '🚀 ~ file: ModalScreen.js ~ line 29 ~ showImagePicker ~ filename',
        filename,
      );
      console.log(
        '🚀 ~ file: ModalScreen.js ~ line 32 ~ showImagePicker ~ file',
        file,
      );
      const res = await axios.post(
        'http://192.168.1.103:5001/api/upload',
        data,
      );
      console.log(
        '🚀 ~ file: ModalScreen.js ~ line 46 ~ showImagePicker ~ res',
        res,
      );
    });
  };*/

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          style={styles.back}
          name="leftcircle" //leftcircleo
          size={40}
          color={'#F8F8F8'}
        />
      </TouchableOpacity>
      <Text style={styles.textName}>{user.displayName}</Text>
      <TouchableOpacity onPress={selectImage} style={styles.imageProfileButton}>
        <Image
          style={styles.imageProfile}
          source={
            image
              ? {
                  uri: image,
                }
              : {uri: isUser.photoURL}
          }
        />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={showImagePicker} style={styles.button}>
        <Text style={styles.textButton}>Change profile picture</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={selectImage} style={styles.button}>
        <Text style={styles.textButton}>Select Image</Text>
      </TouchableOpacity> */}
      {uploading ? (
        <View style={styles.waitUploadImage}>
          <Text style={styles.textWaitUploadImage}>
            {transferred} % Completed!
          </Text>
          <ActivityIndicator size="large" color="#E58947" />
        </View>
      ) : (
        <TouchableOpacity
          disabled={incompleteUpload}
          onPress={uploadImageWithStorage}
          style={incompleteUpload ? styles.buttonDisabled : styles.button}>
          <Text style={styles.textButton}>Upload Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565D67',
  },
  back: {
    width: '10%',
    margin: 20,
    color: '#565d67',
    backgroundColor: '#E58947', //'#F8F8F8',
    borderRadius: 20,
  },
  textName: {
    marginTop: 100,
    marginBottom: 30,
    fontSize: 25,
    color: '#F8F8F8',
    alignSelf: 'center',
  },
  imageProfileButton: {
    width: '60%',
    height: '30%',
    borderRadius: 150,
    alignSelf: 'center',
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    alignSelf: 'center',
  },
  waitUploadImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWaitUploadImage: {
    margin: 20,
    fontSize: 25,
  },
  loading: {
    fontSize: 25,
  },
  button: {
    width: '60%',
    height: 50,
    margin: 20,
    backgroundColor: '#E58947' /* '#4E60FF', */, // '#161614',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonDisabled: {
    width: '60%',
    height: 50,
    margin: 20,
    backgroundColor: '#FAB685' /* '#4E60FF', */, // '#161614',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  textButton: {
    color: '#F8F8F8',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ModalScreen;
