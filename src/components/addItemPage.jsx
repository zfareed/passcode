// import React from "react";
// import { View, Text } from "react-native";

// // A custom component with a view that has height 100%
// const AddItemPage = ({navigation}) => {
// return (
// <View>
// <Text style={{fontSize: 18}}> Edit Page</Text>
// </View>
// );
// };

// export default AddItemPage;

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddItemPage = () => {
  const [platform, setPlatform] = useState('');
  const [passcode, setPasscode] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    // Perform save operation with the entered data
    console.log('Platform:', platform);
    console.log('Passcode:', passcode);
    console.log('Description:', description);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Platform"
        value={platform}
        onChangeText={text => setPlatform(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Passcode"
        value={passcode}
        onChangeText={text => setPasscode(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default AddItemPage;
