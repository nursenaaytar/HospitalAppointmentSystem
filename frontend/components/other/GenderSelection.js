// GenderSelection.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GenderSelection = ({ onGenderSelected }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    if (onGenderSelected) {
      onGenderSelected(gender);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedGender === 'Erkek' && styles.selectedButton]}
          onPress={() => handleGenderSelection('Erkek')}
        >
          <Text style={[styles.buttonText, selectedGender === 'Erkek' && styles.selectedButtonText]}>Erkek</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedGender === 'Kadin' && styles.selectedButton]}
          onPress={() => handleGenderSelection('Kadin')}
        >
          <Text style={[styles.buttonText, selectedGender === 'Kadin' && styles.selectedButtonText]}>Kadın</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
    borderWidth: 2,
    borderColor: '#0782F9',
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#0782F9',
  },
  buttonText: {
    fontSize: 15,
    color:"black"
  },
  selectedButtonText: {
    fontSize: 15,
    color:"white"
  },
});

export default GenderSelection;
