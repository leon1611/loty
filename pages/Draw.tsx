import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
import Sphere from '../components/Sphere';

const generateRandomNumbers = (): number[] => {
  const numbers = new Set<number>();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 30) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

type DrawScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Draw'>;
type DrawScreenRouteProp = RouteProp<RootStackParamList, 'Draw'>;

const Draw: React.FC = () => {
  const navigation = useNavigation<DrawScreenNavigationProp>();
  const route = useRoute<DrawScreenRouteProp>();
  const { selectedNumbers } = route.params; 

  const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGenerateNumbers = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        const randomNumbers = generateRandomNumbers();
        setLotteryNumbers(randomNumbers);
        setIsAnimating(false);
      }, 3000);
    }
  };

  const handleGoToResults = () => {
    if (lotteryNumbers.length > 0) {
      navigation.navigate('Results', { selectedNumbers, drawnNumbers: lotteryNumbers });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Sphere isAnimating={isAnimating} />
      <View style={styles.numbersContainer}>
        {lotteryNumbers.length > 0 ? (
          lotteryNumbers.map((num, index) => (
            <Text key={index} style={styles.numberText}>{num}</Text>
          ))
        ) : (
          <Text style={styles.numberText}>?</Text>
        )}
      </View>
      <TouchableOpacity onPress={handleGenerateNumbers} style={[styles.button, isAnimating && styles.disabledButton]}>
        <Text style={styles.buttonText}>{isAnimating ? 'SORTEANDO...' : 'SORTEAR'}</Text>
      </TouchableOpacity>
      {lotteryNumbers.length > 0 && (
        <TouchableOpacity onPress={handleGoToResults} style={styles.button}>
          <Text style={styles.buttonText}>VER RESULTADOS</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E0149',
  },
  logo: {
    width: 300, 
    height: 200, 
    resizeMode: 'contain', 
    marginBottom: 20,
  },
  numbersContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  numberText: {
    fontSize: 24,
    margin: 5,
    color: '#FFD700',
  },
  button: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default Draw;
