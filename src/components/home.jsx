import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

const mydata = [
  {
    name: 'Zain Fareed',
    desc: 'hello world',
  },
  {
    name: 'Ahmed Raza',
    desc: 'world war',
  },
];

// A custom component for each list item
const ListItem = ({item}) => {
  // A state variable to toggle the dropdown menu
  const [showMenu, setShowMenu] = useState(false);

  // A function to handle the edit option
  const handleEdit = () => {
    // Do something with the item data
    console.log('Edit', item);
  };

  // A function to handle the delete option
  const handleDelete = () => {
    // Do something with the item data
    console.log('Delete', item);
  };

  return (
    <View style={{padding: 10, borderBottomWidth: 1}}>
      <Text style={{fontSize: 18}}>{item.name}</Text>
      <Text style={{fontSize: 14}}>{item.desc}</Text>
      <TouchableOpacity
        style={{alignSelf: 'flex-end', width: 10}}
        onPress={() => setShowMenu(!showMenu)}>
        <Icon name="ellipsis-v" size={20} />
      </TouchableOpacity>
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={handleEdit} style={styles.menuItem}>
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.menuItem}>
            <Text style={styles.menuText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// The main list component
const Home = ({navigation}) => {
  const renderItem = ({item}) => {
    return <ListItem item={item} />;
  };

  const addItemButton = () => {
    navigation.navigate('Add Item');
  };

  return (
      <View style={{height: '100%'}}>
        <FlatList
          style={{height: '100%'}}
          data={mydata}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
        <Button
          title="Add Item"
          onPress={addItemButton}
          style={{alignSelf: 'flex-end'}}
        />
      </View>
  );
};


const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    right: 5,
    top: 72,
    backgroundColor: 'orange',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Home;