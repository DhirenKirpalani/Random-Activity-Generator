import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  titleColor?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, backgroundColor = 'lightblue', titleColor = 'black', ...props }) => {
  const buttonStyle = {
    ...styles.button,
    backgroundColor: backgroundColor,
  };

  const titleStyle = {
    color: titleColor,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} {...props}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
  },
});

export default Button;
