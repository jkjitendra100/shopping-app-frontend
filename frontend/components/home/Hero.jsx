import { StyleSheet, Image, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { screenWidth } from '../../styles/global';
import { Colors } from '../../theme/Colors';
import { Carousel } from 'react-native-snap-carousel';

const images = [
  {
    id: 'kfklejfr34r438r34uih',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnhzajSYYdk3AddgsS-eY2UhDB4O1oMYeqHg&usqp=CAU',
  },

  {
    id: 'njsadher98eur8e',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPNYT2_XNUP_6n8AAFPAZgnJTrWoz_t-uVg&usqp=CAU',
  },

  {
    id: 'mlccnsdjowfiuweofew',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPNYT2_XNUP_6n8AAFPAZgnJTrWoz_t-uVg&usqp=CAU',
  },

  {
    id: 'mfhyf9r8732e32y2o',
    url: 'https://i.guim.co.uk/img/media/86a849b6f8c63432efcf03c45fe4dc71978a8f2f/0_94_2173_1303/master/2173.jpg?width=465&dpr=1&s=none',
  },

  {
    id: 'dfhdfiuyr893798e32uoi',
    url: 'https://static.zawya.com/view/acePublic/alias/contentid/ODY3MmRjYjUtMTVjMy00/0/afp_33wu9lz-jpg.webp',
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
    backgroundColor: Colors.white,
  },

  itemImage: {
    width: screenWidth,
    resizeMode: 'cover',
    height: 200,
  },
});
