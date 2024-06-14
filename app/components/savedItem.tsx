import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Data } from '../types';

interface SavedItemProps {
    item: Data;
    onDelete: () => void;
}

const SavedItem: React.FC<SavedItemProps> = ({ item, onDelete }) => (
    <View style={styles.savedItem}>
        <Text>{item.todo}</Text>
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onDelete}>
                <Ionicons name="trash-outline" size={20} color="red" style={styles.trashIcon} />
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    savedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trashIcon: {
        marginLeft: 8,
    }
});

export default SavedItem;
