import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, View, StyleSheet } from 'react-native';
import { AppProvider, useAppContext } from './components/appContext';
import Home from './components/home';
import AddItemPage from './components/addItemPage';

const Stack = createNativeStackNavigator();

function App() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const SearchHeader = () => {
    const { searchText, setSearchText } = useAppContext();

    const handleSearchTextChange = (text) => {
      setSearchText(text);
    };

    return (
      <View style={styles.searchContainer}>
        {isSearchVisible ? (
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearchTextChange}
            onBlur={toggleSearch}
            autoFocus
          />
        ) : (
          <Icon
            name="search"
            size={24}
            color="white"
            style={{ marginRight: 15 }}
            onPress={toggleSearch}
          />
        )}
      </View>
    );
  };

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => <SearchHeader />,
            }}
          />
          <Stack.Screen
            name="Add Item"
            component={AddItemPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    marginRight: 15,
    paddingLeft: 10,
  },
});

export default App;
