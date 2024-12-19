import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>START</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D9B56A', 
    borderRadius: 30,          
    paddingVertical: 15,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,             
  },
  buttonText: {
    color: '#FFFFFF',         
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button;
