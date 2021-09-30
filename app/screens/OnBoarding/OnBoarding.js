import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Animated,
  Image,
} from 'react-native';

//constant
import {image, theme} from '../../constants';

//Theme
const {COLORS, FONTS, SIZES} = theme;
const {onboard1, onboard2, onboard3} = image;

//Dummy data
const onBoardings = [
  {
    title: "Let's Travelling",
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam officia quod provident.',
    img: onboard1,
  },
  {
    title: 'Navigation',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam officia quod provident.',
    img: onboard2,
  },
  {
    title: 'Destination',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam officia quod provident.',
    img: onboard3,
  },
];

const OnBoarding = () => {
  function _renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center">
        {onBoardings.map((item, index) => (
          <View key={index} style={{width: SIZES.width}}>
            {/* image */}
            <View style={styles.container_img}>
              <Image source={item.img} style={styles.img} />
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>{_renderContent()}</SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container_img: {
    // backgroundColor: 'black',
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default OnBoarding;
