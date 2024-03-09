import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

// A custom component for each list item
const ListItem = ({ item }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    firestore()
      .collection('Data')
      .doc(item[0].id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
    setShowMenu(false);
  };

  const listItemClick = () => {
    item[1].navigate('Add Item', {
      val1: item[0].platform,
      val2: item[0].passcode,
      val3: item[0].description,
      val4: item[0].id,
    });
  };

  const handleMenuSelect = (value) => {
    // Handle menu item selection logic
    if (value === 'add') {
      console.log(value);
    } else if (value === 'delete') {
      console.log(value);
    }

    // Close the menu
    setShowMenu(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={listItemClick}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.name}>{item[0].platform}</Text>
          <Text style={styles.pass}>************</Text>
        </View>
        <Menu
          opened={showMenu}
          onBackdropPress={() => setShowMenu(false)}
        >
          <MenuTrigger>
            <TouchableOpacity style={styles.icon} onPress={() => setShowMenu(!showMenu)}>
              <Icon name="ellipsis-v" size={20} />
            </TouchableOpacity>
          </MenuTrigger>
          <MenuOptions customStyles={menuOptionsStyles}>
            <MenuOption onSelect={() => handleMenuSelect('add')} text="Add" />
            <MenuOption onSelect={() => handleMenuSelect('delete')} text="Delete" />
          </MenuOptions>
        </Menu>
      </TouchableOpacity>
    </View>

  );
};

const Home = ({ navigation }) => {
  const [myData, setMyData] = useState(null);


  useFocusEffect(
    React.useCallback(() => {
      console.log('in useFocus');
      getData();
    }, [])
  );

  const getData = async () => {
    try {

      tempData = [];
      await firestore()
        .collection('Data')
        .get()
        .then(snapshot => {
          snapshot.docs.map(doc => {
            let obj = doc.data();
            obj.id = doc.id;
            tempData.push(obj);
          });
        });
      setMyData(tempData);
    } catch (error) {
      showToast('Some error occurred!');
    }
  };

  const renderItem = ({ item }) => {
    return <ListItem item={[item, navigation]} />;
  };

  const addItemButton = () => {
    navigation.navigate('Add Item', {
      val1: null,
      val2: null,
      val3: null,
      val4: null,
    });
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <View style={{ flex: 1 }}>
      {myData === null ? (
        <ActivityIndicator size="large" color="#f4511e" />
      ) : (
        <MenuProvider>
          <React.Fragment>
            <FlatList
              style={{ flex: 1 }}
              data={myData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <Button
              title="Add Item"
              onPress={addItemButton}
              color="#f4511e"
              style={{ alignSelf: 'flex-end' }}
            />
          </React.Fragment>
        </MenuProvider>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FADCD3',
    margin: 2,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 7,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  pass: {
    paddingTop: 5,
    flex: 1,
    fontSize: 14,
    color: '#999999',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 30,
  },
});


const menuOptionsStyles = {
  optionsContainer: {
    right: 10,
    marginTop: -20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: 70,

  },
  optionWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 14,
    color: '#333333',
  },
};

export default Home;
