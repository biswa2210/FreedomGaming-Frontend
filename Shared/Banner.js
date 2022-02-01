import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";
var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://firebasestorage.googleapis.com/v0/b/fg-images-bucket.appspot.com/o/banner1-cyberpunk.png?alt=media&token=19ad1632-7d85-402a-a3cb-a99b8d7db30a",
      "https://firebasestorage.googleapis.com/v0/b/fg-images-bucket.appspot.com/o/banner2-playstation5.png?alt=media&token=d2fd8703-6d40-43f6-8572-ff45c5a21a6a",
      "https://firebasestorage.googleapis.com/v0/b/fg-images-bucket.appspot.com/o/banner3-gamecommingsoon.png?alt=media&token=6f0236fa-3a5e-40a2-8fe6-19cf25a25180",
      "https://firebasestorage.googleapis.com/v0/b/fg-images-bucket.appspot.com/o/banner4-gpu.jpeg?alt=media&token=475b1cda-2602-4783-b54e-71b4112746d5",
      "https://firebasestorage.googleapis.com/v0/b/fg-images-bucket.appspot.com/o/banner5-godofwar.jpg?alt=media&token=bd1c2ad2-92db-4054-a577-7b78f3d335d8",
      "https://firebasestorage.googleapis.com/v0/b/fg-images-bucket.appspot.com/o/banner6-Far-Cry-6-.jpg?alt=media&token=9c54b87f-13a1-4e53-b9f7-da71048ea3b9",

    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={3}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default Banner;
