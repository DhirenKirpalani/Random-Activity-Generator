import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Button from './components/button';
import SavedDataList from './components/savedDataList';
import { Data } from './types';
import { loadSavedData, saveActivity, deleteActivity } from './utils/asyncStorageUtils';

const App = () => {
  const [data, setData] = useState<Data | null>(null);
  const [savedData, setSavedData] = useState<Data[]>([]);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  useEffect(() => {
    fetchData();
    loadSavedDataFromStorage();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/todos/random');
      const jsonData: Data = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSaveActivity = async () => {
    if (data) {
      try {
        const updatedSavedData = await saveActivity(data, savedData);
        setSavedData(updatedSavedData);
        setShowSavedMessage(true);
        setTimeout(() => {
          setShowSavedMessage(false);
        }, 3000);
      } catch (error) {
        console.error('Error saving activity:', error);
      }
    }
  };

  const handleDeleteActivity = async (index: number) => {
    try {
      const updatedSavedData = await deleteActivity(index, savedData);
      setSavedData(updatedSavedData);
      setShowDeletedMessage(true);
      setTimeout(() => setShowDeletedMessage(false), 3000);
    } catch (error) {
      console.error('Error deleting saved activity:', error);
    }
  };

  const loadSavedDataFromStorage = async () => {
    try {
      const savedDataFromStorage = await loadSavedData();
      setSavedData(savedDataFromStorage);
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Random Activity Generator</Text>
        <View style={styles.horizontalLine} />
        <Text style={styles.subTitle}>Are you bored?</Text>
        <Text style={styles.subText}>Just click the button below ⬇️</Text>
        <View style={styles.verticalLine} />
        <View style={styles.content}>
          <Button title="New Random Activity" onPress={fetchData} />
          <View style={styles.activityContainer}>
            <Text style={styles.activityText}>{data?.todo || '-'}</Text>
            <Button title="Save" onPress={handleSaveActivity} backgroundColor="orange" titleColor="black" />
          </View>
          <SavedDataList data={savedData} onDelete={handleDeleteActivity} />
        </View>
        {showSavedMessage && (
          <Text style={styles.savedMessage}>Item has been saved!</Text>
        )}
        {showDeletedMessage && <Text style={styles.deletedMessage}>Item has been deleted!</Text>}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  horizontalLine: {
    width: '80%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  verticalLine: {
    height: 100,
    top: 10,
    borderLeftWidth: 1,
    borderColor: 'gray',
    marginBottom: 50,
  },
  activityContainer: {
    padding: 12,
    alignItems: 'center',
  },
  activityText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savedMessage: {
    color: 'green',
    fontSize: 16,
    marginBottom: 10
  },
  deletedMessage: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10
  }
});

export default App;
