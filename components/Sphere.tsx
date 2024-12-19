import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';

interface SphereProps {
  isAnimating: boolean;
}

const Sphere: React.FC<SphereProps> = ({ isAnimating }) => {
  const spinValue = useRef(new Animated.Value(0)).current; 
  const bounceValues = useRef(
    Array.from({ length: 6 }, () => ({
      translateX: new Animated.Value(0), 
      translateY: new Animated.Value(0), 
    }))
  ).current;

  useEffect(() => {
    if (isAnimating) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 3000, 
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      bounceValues.forEach((bounceValue) => {
        Animated.parallel([
          Animated.loop(
            Animated.sequence([
              Animated.timing(bounceValue.translateX, {
                toValue: Math.random() * 90 - 45, 
                duration: 1000 + Math.random() * 1000, 
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(bounceValue.translateX, {
                toValue: 0, 
                duration: 1000 + Math.random() * 1000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
              }),
            ])
          ),
          Animated.loop(
            Animated.sequence([
              Animated.timing(bounceValue.translateY, {
                toValue: Math.random() * 90 - 45, 
                duration: 1000 + Math.random() * 1000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(bounceValue.translateY, {
                toValue: 0, 
                duration: 1000 + Math.random() * 1000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
              }),
            ])
          ),
        ]).start();
      });
    } else {
      spinValue.setValue(0);
      bounceValues.forEach((bounceValue) => {
        bounceValue.translateX.setValue(0);
        bounceValue.translateY.setValue(0);
      });
    }
  }, [isAnimating]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Sphere.png')} style={styles.sphereBackground} />

      {bounceValues.map((bounceValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.ball,
            {
              transform: [
                { translateX: bounceValue.translateX },
                { translateY: bounceValue.translateY },
              ],
            },
          ]}
        >
          <Image source={require('../assets/ball.png')} style={styles.ballImage} />
        </Animated.View>
      ))}

      <Animated.Image
        source={require('../assets/bar.png')}
        style={[styles.bar, { transform: [{ rotate: spin }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sphereBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
  },
  ball: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bar: {
    width: 150,
    height: 20,
    position: 'absolute',
    resizeMode: 'contain',
  },
});

export default Sphere;
