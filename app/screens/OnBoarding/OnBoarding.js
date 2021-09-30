import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Animated,
  Image,
  TouchableOpacity,
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
  const [completed, SetCompleted] = React.useState(false);
  const scrollX = new Animated.Value(0);
  React.useEffect(() => {
    //To check if use has finish to scrolling the onBoard pages
    scrollX.addListener(({value}) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        SetCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  function _renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {onBoardings.map((item, index) => (
          <View key={index} style={{width: SIZES.width}}>
            {/* image */}
            <View style={styles.container_img}>
              <Image source={item.img} style={styles.img} />
            </View>
            {/* Text */}
            <View style={styles.containerText}>
              <Text style={styles.textTitle}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            <TouchableOpacity
              style={styles.btnSkip}
              onPress={() => console.log('pressed skip')}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>
                {completed ? "Let's Go" : 'Skip'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }
  function _renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    // console.log(dotPosition);
    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [1, 0.3, 1],
            extrapolate: 'clamp',
          });
          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dot,
                {width: dotSize, height: dotSize},
              ]}></Animated.View>
          );
        })}
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>{_renderContent()}</View>
      <View style={styles.dotRootContainer}>{_renderDots()}</View>
    </SafeAreaView>
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
    flex: 1,
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    position: 'absolute',
    bottom: '10%',
    left: 40,
    right: 40,
  },
  textTitle: {
    ...FONTS.h1,
    color: COLORS.gray,
    textAlign: 'center',
  },
  description: {
    ...FONTS.body3,
    textAlign: 'center',
    marginTop: SIZES.base,
    color: COLORS.gray,
  },
  dotRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '27%' : '20%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
    // height: 15,
    // width: 15,
  },
  btnSkip: {
    backgroundColor: COLORS.blue,
    position: 'absolute',
    bottom: 4,
    right: 0,
    width: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
});
export default OnBoarding;
