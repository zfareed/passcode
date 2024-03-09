import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid,Keyboard } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddItemPage = ({ route }) => {
  const { val1, val2, val3, val4 } = route.params;

  const [platform, setPlatform] = useState(val1);
  const [passcode, setPasscode] = useState(val2);
  const [description, setDescription] = useState(val3);
  const [id] = useState(val4);
  const [btnTitle, setBtnTitle] = useState('Save');

  useEffect(() => {
    if (id !== null) {
      setBtnTitle('Update');
    }
  }, []);

  const handleSave = () => {
    Keyboard.dismiss();
    if (id === null) {
      firestore()
        .collection('Data')
        .add({
          platform: platform,
          passcode: passcode,
          description: description,
        })
        .then(() => {
          console.log('Data added!');
          showToast('Data Added'); 
        });
    } else {
      firestore()
        .collection('Data')
        .doc(id)
        .update({
          platform: platform,
          passcode: passcode,
          description: description,
        })
        .then(() => {
          console.log('Data updated!');
          showToast('Data Updated'); 

        });
    }
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
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
          style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        placeholder="Description"
        value={description}
        multiline={true}
        numberOfLines={4}
        onChangeText={text => setDescription(text)}
      />
      <Button title={btnTitle} onPress={handleSave} color="#f4511e" />
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
    height: 120,
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
  },
});

export default AddItemPage;
