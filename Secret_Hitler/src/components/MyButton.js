import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const MyButton = ({ title, onPress }) => {
    return (
        <Pressable style={styles.bota} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default MyButton;

const styles = StyleSheet.create({
    bota: {
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
    },

    text: {
        color: 'white',
        fontSize: 18,
    },
});