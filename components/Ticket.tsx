import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type TicketProps = {
  numbers: number[]; 
  color: string; 
  image: any; 
  onSelect: () => void; 
  isSelected: boolean;
};

const Ticket: React.FC<TicketProps> = ({ numbers, color, image, onSelect, isSelected }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color, borderWidth: isSelected ? 3 : 0 }]}
      onPress={onSelect}
    >
      <View style={styles.numbersContainer}>
        {numbers.map((num, index) => (
          <View key={index} style={styles.numberBox}>
            <Text style={styles.numberText}>{num.toString().padStart(2, '0')}</Text>
          </View>
        ))}
      </View>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberBox: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    marginTop: 10,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

export default Ticket;
