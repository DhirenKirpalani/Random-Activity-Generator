import AsyncStorage from '@react-native-async-storage/async-storage';
import { Data } from '../types';

export const loadSavedData = async (): Promise<Data[]> => {
    try {
        const savedDataString = await AsyncStorage.getItem('savedData');
        if (savedDataString) {
            return JSON.parse(savedDataString);
        }
        return [];
    } catch (error) {
        console.error('Error loading saved data:', error);
        return [];
    }
};

export const saveActivity = async (data: Data, savedData: Data[]): Promise<Data[]> => {
    try {
        const response = await fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo: data.todo,
                completed: data.completed,
                userId: 1,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to save activity');
        }

        const savedActivity = await response.json();
        const updatedSavedData = [...savedData, savedActivity];
        await AsyncStorage.setItem('savedData', JSON.stringify(updatedSavedData));
        return updatedSavedData;
    } catch (error) {
        console.error('Error saving activity:', error);
        throw error;
    }
};

export const deleteActivity = async (index: number, savedData: Data[]): Promise<Data[]> => {
    try {
        const updatedSavedData = savedData.filter((_, i) => i !== index);
        await AsyncStorage.setItem('savedData', JSON.stringify(updatedSavedData));
        return updatedSavedData;
    } catch (error) {
        console.error('Error deleting saved activity:', error);
        throw error;
    }
};

