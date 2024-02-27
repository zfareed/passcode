import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

// A custom component for each list item
const ListItem = ({item}) => {
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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={listItemClick}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.name}>{item[0].platform}</Text>
          <Text style={styles.pass}>************</Text>
        </View>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowMenu(!showMenu)}>
          <Icon name="ellipsis-v" size={20} />
        </TouchableOpacity>
        {showMenu && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
              <Text style={styles.menuText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const Home = ({navigation}) => {
  const [mydata, setMyData] = useState([
    {platform: 'Some Error', passcode: '', description: '', id: ''},
  ]);

  useEffect(() => {
    async function getData() {
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
    };
    getData()
  }, []);

  const renderItem = ({item}) => {
    return <ListItem item={[item, navigation]}/>;
  };

  const addItemButton = () => {
    navigation.navigate('Add Item', {
      val1: null,
      val2: null,
      val3: null,
      val4: null,
    });
  };

  return (
    <View style={{height: '100%'}}>
      <FlatList
        style={{height: '100%'}}
        data={mydata}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button
        title="Add Item"
        onPress={addItemButton}
        color="#f4511e"
        style={{alignSelf: 'flex-end'}}
      />
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
    shadowOffset: {width: 0, height: 2},
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
  menu: {
    zIndex: 9999999999,
    position: 'absolute',
    right: 10,
    top: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default Home;
