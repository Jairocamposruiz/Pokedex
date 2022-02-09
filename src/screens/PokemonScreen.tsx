/* eslint-disable*/
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonDetails } from '../components/PokemonDetails';
import { capitalize } from '../helpers/capitalize';
import { usePokemonDetails } from '../hooks/usePokemonDetails';

import { RootStackParams } from '../navigator/Navigator';


interface PokemonScreenProps extends StackScreenProps<RootStackParams, 'PokemonScreen'> {
}

export const PokemonScreen = ({ route, navigation }: PokemonScreenProps) => {

  const { simplePokemon, color } = route.params;
  const { id, name, picture } = simplePokemon;
  const { top } = useSafeAreaInsets();

  const { isLoading, pokemon } = usePokemonDetails(id);


  return (
    <View style={{ flex: 1 }}>
      <View style={ {
        ...styles.headerContainer,
        backgroundColor: color,
      } }>

        <View style={ { ...styles.pokemonNameContainer, paddingTop: top }}>
          <TouchableOpacity
            onPress={ () => navigation.pop() }
            activeOpacity={ 0.8 }
            style={ {
              ...styles.backButton,
            } }
          >
            <Icon name="arrow-back-outline" color='rgba(0,0,0,0.6)' size={ 35 } />
          </TouchableOpacity>
          <Text
            adjustsFontSizeToFit={true}
            style={ {
              ...styles.pokemonName,
            } }
          >
            { capitalize(name)}
            { (Number(pokemon.id) < 2000) ? '\n#' + pokemon.id : ''}
          </Text>
        </View>

        <Image
          source={ require('../assets/pokeball-white.png') }
          style={ styles.pokeball }
        />

        <FadeInImage
          uri={ picture }
          style={ styles.pokemonImage }
        />
      </View>

      {
        isLoading
          ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator
                color={color}
                size="large"
              />
            </View>
          )
          : (<PokemonDetails pokemon={pokemon} color={color} />)
      }

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 9,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  backButton: {
    marginTop: 5,
  },
  pokemonNameContainer: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: '100%',
    top: 0,
    zIndex: 2,
  },
  pokemonName: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 35,
    fontWeight: 'bold'
  },
  pokeball: {
    position: 'absolute',
    width: 250,
    height: 250,
    bottom: 80,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -20,
    zIndex: 9
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
