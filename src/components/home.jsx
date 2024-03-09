import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  FlatList,
  Button,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import firestore from '@react-native-firebase/firestore';
import ListItem from './listItem';
import { useAppContext } from './appContext';

const Home = ({ navigation }) => {
  const [myData, setMyData] = useState(null);
  const [listData, setListData] = useState(null);
  const { searchText } = useAppContext();




  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    searchItems(searchText);
    console.log(searchText);
  }, [searchText]);

  const searchItems = (text) => {
    if (text == "") {
       setListData(myData);
    } else {
      let data = myData.filter(item => item.platform.toLowerCase().includes(text.toLowerCase()));
      setListData(data);
    }
  }

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
      setListData(tempData);
    } catch (error) {
      showToast('Some error occurred!');
    }
  };

  const renderItem = ({ item }) => {
    return <ListItem item={[item, navigation]} onDelete={getData} />;
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
      {listData === null ? (
        <ActivityIndicator size="large" color="#f4511e" />
      ) : (
        <MenuProvider>
          <React.Fragment>
            <FlatList
              style={{ flex: 1 }}
              data={listData}
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



export default Home;
