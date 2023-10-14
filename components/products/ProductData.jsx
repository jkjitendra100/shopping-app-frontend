import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { screenWidth } from '../../styles/global';
import { Colors } from '../../theme/Colors';
import MyTitle from '../global/MyTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.itemContainer} key={index}>
      <Image source={{ uri: item?.url }} style={styles.itemImage} />
    </View>
  );
};

export default function ProductData({ productDetails, getSelectedPlayers }) {
  const carouselRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    getSelectedPlayers(selectedPlayers);
  }, [selectedPlayers]);

  return (
    <ScrollView>
      <View>
        <Carousel
          layout="tinder"
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          ref={carouselRef}
          renderItem={CarouselCardItem}
          data={productDetails?.images}
          loop
          onSnapToItem={(index) => setActiveSlide(index)}
        />

        <Pagination
          dotsLength={productDetails?.images.length}
          activeDotIndex={activeSlide}
          containerStyle={{ marginTop: -50 }}
          dotStyle={styles.dot}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.8}
        />
      </View>
      <Text style={styles.name}>{productDetails?.name}</Text>
      <Text style={styles.price}>₹{productDetails?.price}/-</Text>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.descText}>Description:</Text>
        <Text style={styles.desc}>{productDetails?.description}</Text>
      </View>

      <View>
        <MyTitle title="PLAYERS" style={{ textDecorationLine: 'underline' }} />
        {productDetails?.players?.map((item, index) => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
              }}
            >
              <Text style={{ textTransform: 'capitalize' }}>{item}</Text>
              {selectedPlayers.includes(item) ? (
                <TouchableOpacity
                  onPress={() =>
                    setSelectedPlayers((state) =>
                      state.filter((e) => e !== item)
                    )
                  }
                >
                  <FontAwesome
                    name="circle"
                    size={25}
                    color={Colors.secondary}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    setSelectedPlayers((state) => [...state, item])
                  }
                >
                  <FontAwesome
                    name="circle-o"
                    size={25}
                    color={Colors.secondary}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ height: 1, backgroundColor: Colors.grayLight }} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: screenWidth,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.grayLight,
  },

  itemImage: {
    width: screenWidth,
    resizeMode: 'contain',
    height: 250,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },

  name: { fontSize: 20, fontWeight: 'bold', padding: 10, color: Colors.black },

  price: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: Colors.black,
  },

  descText: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 10,
    fontWeight: 'bold',
  },

  desc: { fontSize: 15, color: Colors.grayDark, padding: 10 },
});
