/* eslint-disable*/
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onPress: () => void;
  iconName: string;
}

export const Fab = ({onPress, iconName}: Props) => {

  return (
    <View style={{
      width: 100,
      height: 100,
      backgroundColor: 'rgba(255,255,255, 0.8)',
      position: 'absolute',
      bottom: 10,
      right: 10,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Icon name={iconName} size={70} color="rgba(0,0,0,0.6)"  />
      </TouchableOpacity>
    </View>
  );
};
