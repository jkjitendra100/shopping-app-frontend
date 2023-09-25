import { StyleSheet, Image, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { screenWidth } from '../../styles/global';
import { Colors } from '../../theme/Colors';
import { Carousel } from 'react-native-snap-carousel';

const images = [
  {
    id: 'kfklejfr34r438r34uih',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQebo_lujR57Mpy2VGSW7DYkrnkI7KrDezIgg&usqp=CAU',
  },

  {
    id: 'njsadher98eur8e',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdHGCemc2EyKFTO1DK-57jefG0j0BbaJEBHQ&usqp=CAU',
  },

  {
    id: 'mlccnsdjowfiuweofew',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC1JqR0ZYyYJRXzXDJ6nPqOVeB9kaPv2X72m7yHj7b7gsvGQtx9556exuEs9GmVH3-2oM&usqp=CAU',
  },

  {
    id: 'mfhyf9r8732e32y2o',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCzxB6ZrgKSOa3RZoNYOOttHYSVJk2b5hx5w&usqp=CAU',
  },

  {
    id: 'dfhdfiuyr893798e32uoi',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCzxB6ZrgKSOa3RZoNYOOttHYSVJk2b5hx5w&usqp=CAU',
  },
];

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.itemContainer} key={index}>
      <Image source={{ uri: item?.url }} style={styles.itemImage} />
    </View>
  );
};

export default function Hero() {
  const carouselRef = useRef();

  return (
    <View>
      <Carousel
        layout="default"
        autoplay={true}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        ref={carouselRef}
        renderItem={CarouselCardItem}
        data={images}
        // loop={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: screenWidth,
    resizeMode: 'contain',
    backgroundColor: Colors.white,
  },

  itemImage: {
    width: screenWidth,
    resizeMode: 'cover',
    height: 200,
  },
});
