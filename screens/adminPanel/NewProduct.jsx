import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/global/Header';
import { bodyStyle } from '../../styles/global';
import MyTextInput from '../../components/global/MyTextInput';
import CancelButton from '../../components/global/CancelButton';
import MyButton from '../../components/global/MyButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { server } from '../../server';
import Toast from 'react-native-toast-message';
import { launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../theme/Colors';

export default function NewProduct() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [images, setImages] = useState([]);
  //
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handlePickImages = async () => {
    if (images?.length === 5)
      return alert('You can select upto 5 images at a time.');
    const options = { quality: 0.1, mediaType: 'photo' };
    setImageLoading(true);

    const result = await launchImageLibrary(options);
    if (result.didCancel) {
      setImageLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Image selection cancelled',
      });
      return;
    }

    if (result.error) {
      setImageLoading(false);
      return;
    }

    if (images?.find((e) => e?.name === result?.assets[0]?.fileName)) {
      setImageLoading(false);
      return alert('Selected image is already added!');
    }
    setImages([
      {
        name: result?.assets[0]?.fileName,
        type: result?.assets[0]?.type,
        uri: result?.assets[0]?.uri,
      },
      ...images,
    ]);

    setImageLoading(false);
  };

  const handleRemoveImage = (name) => {
    const tempArr = images?.filter((e) => e?.name !== name);
    setImages(tempArr);
  };

  const handleSubmit = async () => {
    //   Form Validation
    if (name?.length < 3)
      return Alert.alert('Alert ⚠️', 'Please enter product name');
    if (description?.length < 3)
      return Alert.alert('Alert ⚠️', 'Please enter product description');
    if (!price) return Alert.alert('Alert ⚠️', 'Please enter product price');
    if (!category)
      return Alert.alert('Alert ⚠️', 'Please select product category');
    if (!subCategory)
      return Alert.alert('Alert ⚠️', 'Please select product sub category');

    // Axios function
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    images?.map((e, i) => formData.append('files', images[i]));

    setLoading(true);
    await axios
      .post(`${server}/product/new`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      ?.then((res) => {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Product added successfully',
        });
        console.log(res);
      })
      ?.catch((e) => {
        setLoading(false);
        if (e?.response?.data) {
          Toast.show({
            type: 'error',
            text1: e?.response?.data?.message,
          });
        }
        console.log(e?.message);
      });
  };

  return (
    <>
      <Header back title="Add New Product" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MyTextInput
            title="Enter product name"
            value={name}
            onChangeText={setName}
            placeholder="Enter product name here"
          />
          <MyTextInput
            title="Enter product description"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter product description here"
            numberOfLines={10}
          />

          <MyTextInput
            title="Enter product price"
            value={price}
            onChangeText={setPrice}
            placeholder="Enter product price here"
            keyboardType="numeric"
          />

          <MyTextInput
            title="Enter product category"
            value={category}
            onChangeText={setCategory}
            placeholder="Enter product category here"
          />

          <MyTextInput
            title="Enter product sub-category"
            value={subCategory}
            onChangeText={setSubCategory}
            placeholder="Enter product sub-category here"
          />

          <View style={{ margin: 10 }}>
            <MyButton
              title="Add Images"
              onPress={handlePickImages}
              loading={imageLoading}
              style={{ backgroundColor: Colors.tertiary, marginBottom: 20 }}
            />

            {/* Map selected images */}
            <View>
              {images?.map((item, index) => (
                <View style={styles.imageMapView} key={item?.name}>
                  <Text
                    style={{ color: Colors.secondary, fontWeight: 'bold' }}
                  >{`${index + 1}. ${item?.name}`}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveImage(item?.name)}
                  >
                    <Entypo
                      name="circle-with-cross"
                      size={25}
                      color={Colors.red}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginTop: 50,
                marginBottom: 20,
                gap: 30,
              }}
            >
              <MyButton
                width={'100%'}
                title="SUBMIT"
                onPress={handleSubmit}
                loading={loading}
              />
              <CancelButton
                width={'100%'}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageMapView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 5,
  },
});
