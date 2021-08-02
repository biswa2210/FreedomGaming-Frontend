import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";
var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://firebasestorage.googleapis.com/v0/b/daily-deals-images-bucket.appspot.com/o/banner1.png?alt=media&token=c8ac8df5-c929-4079-9a4b-ad50ac805ce5",
      "https://firebasestorage.googleapis.com/v0/b/daily-deals-images-bucket.appspot.com/o/ghee-top-banner.jpg?alt=media&token=4f875ed2-b4bd-4694-aa05-9f0a806b49f5",
      "https://firebasestorage.googleapis.com/v0/b/daily-deals-images-bucket.appspot.com/o/ashirbadBanner.jpg?alt=media&token=e4dd1f30-aa28-4329-80c7-f2f4370f0db1",
      "https://firebasestorage.googleapis.com/v0/b/daily-deals-images-bucket.appspot.com/o/parasBanner.jpg?alt=media&token=35d36877-efaf-4899-a17f-8062ee1ebf9f",
      "https://firebasestorage.googleapis.com/v0/b/daily-deals-images-bucket.appspot.com/o/saffolabanner.jpg?alt=media&token=40983e59-864a-4951-877c-87022ccf02ea",
      "https://firebasestorage.googleapis.com/v0/b/daily-deals-images-bucket.appspot.com/o/PatanjaliBannar.jpg?alt=media&token=7fa91b87-efc0-4019-8b7d-133bb2d03ed2",
      "https://firebasestorage.googleapis.com/v0/b/daily-deals-images-bucket.appspot.com/o/saltbanner.jpg?alt=media&token=6dab25b7-4e30-4437-9960-4f032bdb3ec1"

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
