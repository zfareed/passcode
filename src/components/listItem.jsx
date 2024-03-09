import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ToastAndroid,
    StyleSheet
} from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const ListItem = ({ item, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleDelete = async () => {
        try {
            await firestore()
                .collection('Data')
                .doc(item[0].id)
                .delete()
                .then(() => {
                    console.log('Item deleted!');
                    showToast('Item Deleted');
                });
            onDelete();

        } catch (error) {
            showToast('Error deleting item')
        }

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
        if (value === 'update') {
            listItemClick();
        } else if (value === 'delete') {
            handleDelete();
        }

        // Close the menu
        setShowMenu(false);
    };

    const CustomDivider = () => {
        return <View style={styles.divider} />;
    };

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
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
                        <MenuOption onSelect={() => handleMenuSelect('update')} text="update" />
                        <View>
                            <CustomDivider />
                        </View>
                        <MenuOption onSelect={() => handleMenuSelect('delete')} text="Delete" />
                    </MenuOptions>
                </Menu>
            </TouchableOpacity>
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
    divider: {
        height: 1,
        backgroundColor: '#EBEBEB',
        marginVertical: 2,
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
        width: 80,

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

export default ListItem;