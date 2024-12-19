import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

const Results: React.FC = () => {
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const route = useRoute<ResultsScreenRouteProp>();
  const { selectedNumbers, drawnNumbers } = route.params;

  const isWinner = selectedNumbers.every((num) => drawnNumbers.includes(num));

  useEffect(() => {
    if (isWinner) {
      Alert.alert('¡Ganaste!', '¡Felicidades por tu victoria! 🎉');
    } else {
      Alert.alert('Mejor suerte la próxima vez', 'No ganaste esta vez 😞.');
    }
  }, [isWinner]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      
      <Text style={styles.header}>¡Resultados de la Lotería!</Text>
      
      <View style={styles.numbersContainer}>
        <Text style={styles.label}>Números del Boleto:</Text>
        <Text style={styles.numbers}>{selectedNumbers.join(', ')}</Text>
      </View>

      <View style={styles.numbersContainer}>
        <Text style={styles.label}>Números Sorteados:</Text>
        <Text style={styles.numbers}>{drawnNumbers.join(', ')}</Text>
      </View>

      <Text style={[styles.result, isWinner ? styles.win : styles.lose]}>
        {isWinner ? '¡Felicidades! 🎉 Ganaste.' : 'Lo siento 😞 No ganaste esta vez.'}
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Volver a Jugar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E0149',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 330, 
    height: 250, 
    resizeMode: 'contain', 
    marginBottom: 20, 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  numbersContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  numbers: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  win: {
    color: '#00FF00',
  },
  lose: {
    color: '#FF0000',
  },
  button: {
    backgroundColor: '#FFC107', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 10, 
    marginTop: 40, 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Results;
