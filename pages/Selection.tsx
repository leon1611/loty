import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type SelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Selection'>;

const ticketsData = [
  {
    id: '1',
    numbers: [1, 4, 9, 17, 22, 28],
    color: '#D1C4E9',
    image: require('../assets/condor.png'),
  },
  {
    id: '2',
    numbers: [3, 5, 8, 19, 20, 30],
    color: '#81D4FA',
    image: require('../assets/delfin.png'),
  },
  {
    id: '3',
    numbers: [2, 7, 11, 23, 25, 29],
    color: '#FFE082',
    image: require('../assets/papagayo.png'),
  },
];

const Selection = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const navigation = useNavigation<SelectionScreenNavigationProp>();

  const handleSelectTicket = (id: string) => {
    setSelectedTicket(id);
  };

  const handleConfirm = () => {
    if (selectedTicket) {
      const ticket = ticketsData.find((t) => t.id === selectedTicket);
      if (ticket) {
        navigation.navigate('Draw', { selectedNumbers: ticket.numbers });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Select 1 ticket</Text>
      <FlatList
        data={ticketsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.ticketContainer, { backgroundColor: item.color }]}>
            <View style={styles.numbersContainer}>
              <View style={styles.row}>
                {item.numbers.slice(0, 3).map((num) => (
                  <View key={num} style={styles.numberBox}>
                    <Text style={styles.numberText}>{num.toString().padStart(2, '0')}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.row}>
                {item.numbers.slice(3).map((num) => (
                  <View key={num} style={styles.numberBox}>
                    <Text style={styles.numberText}>{num.toString().padStart(2, '0')}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Image source={item.image} style={styles.ticketImage} />
            <TouchableOpacity
              onPress={() => handleSelectTicket(item.id)}
              style={[
                styles.selectionOverlay,
                selectedTicket === item.id && styles.selectedOverlay,
              ]}
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={[styles.confirmButton, { opacity: selectedTicket ? 1 : 0.6 }]}
        onPress={handleConfirm}
        disabled={!selectedTicket}
      >
        <Text style={styles.confirmText}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#1E0149',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  ticketContainer: {
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
  },
  numbersContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  numberBox: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  ticketImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  selectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
  },
  selectedOverlay: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  confirmText: {
    color: '#1E0149',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Selection;
