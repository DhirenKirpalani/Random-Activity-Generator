import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SavedItem from './savedItem';
import { Data } from '../types';

interface SavedDataListProps {
    data: Data[];
    onDelete: (index: number) => void;
}

const SavedDataList = ({ data, onDelete }: SavedDataListProps) => {
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    const handleSaveConfirmation = () => {
        setShowSavedMessage(true);
        setTimeout(() => {
            setShowSavedMessage(false);
        }, 3000);
    };

    return (
        <View style={styles.savedDataContainer}>
            {data.length > 0 && <Text style={styles.tableHeader}>Saved Data:</Text>}
            <ScrollView style={styles.scrollView}>
                {data.map((item, index) => (
                    <SavedItem
                        key={index}
                        item={item}
                        onDelete={() => onDelete(index)}
                    />
                ))}
            </ScrollView>
            {showSavedMessage && (
                <Text style={styles.savedMessage}>Item has been saved!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    savedDataContainer: {
        padding: 12,
        width: '100%',
        marginTop: 20,
        flex: 1,
    },
    tableHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollView: {
        width: '100%',
        marginBottom: 20,
    },
    savedMessage: {
        alignSelf: 'center',
        marginTop: 10,
        color: 'green',
        fontSize: 16,
    },
});

export default SavedDataList;
