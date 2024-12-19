import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../components/ButtonStart'; 

const Main: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/h.png')} style={styles.image} />
        <Text style={styles.title}>FORTUNE BOX</Text>
      </View>

      <Button onPress={() => navigation.navigate('Selection')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E0149',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Main;
