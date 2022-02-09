/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';


interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({ style, onDebounce }: Props) => {

  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebouncedValue(textValue, 500);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue])

  return (
    <View style={ [style, styles.container] }>
      <View style={ styles.textBackground }>
        <TextInput
          placeholder="Search Pokemon"
          placeholderTextColor="rgba(0,0,0,0.3)"
          style={ styles.textInput }
          autoCapitalize="none"
          autoCorrect={ false }
          value={ textValue }
          onChangeText={ setTextValue }
        />
        <Icon name="search" size={ 30 } color="rgba(0,0,0,0.3)" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textBackground: {
    backgroundColor: '#e4e4e4',
    borderRadius: 50,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});
