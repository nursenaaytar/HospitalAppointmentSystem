import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RoleSelection = ({ onRoleSelected, roleForUser }) => {
  const [selectedRole, setSelectedRole] = useState(roleForUser);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    if (onRoleSelected) {
      onRoleSelected(role);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedRole === 'User' && styles.selectedButton]}
          onPress={() => handleRoleSelection('User')}
        >
          <Text style={[styles.buttonText, selectedRole === 'User' && styles.selectedButtonText]}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedRole === 'Doctor' && styles.selectedButton]}
          onPress={() => handleRoleSelection('Doctor')}
        >
          <Text style={[styles.buttonText, selectedRole === 'Doctor' && styles.selectedButtonText]}>Doktor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedRole === 'Admin' && styles.selectedButton]}
          onPress={() => handleRoleSelection('Admin')}
        >
          <Text style={[styles.buttonText, selectedRole === 'Admin' && styles.selectedButtonText]}>Admin</Text>
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

export default RoleSelection;
