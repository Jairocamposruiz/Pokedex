/* eslint-disable*/
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { capitalize } from '../helpers/capitalize';

import { getColors } from '../helpers/getColors';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';


const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

  const navigation = useNavigation();
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);

  useEffect(() => {
    getColors(pokemon.picture)
      .then(({ color }) => {
        if (isMounted.current) setBgColor(color || 'grey');
      });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const fontSize = (): number => {
    if( pokemon.name.length < 13 ) {
      return 20;
    } else if (pokemon.name.length < 16) {
      return 17;
    } else if (pokemon.name.length < 20) {
      return 14;
    } else {
      return 12;
    }

  }

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={ () => navigation.navigate('PokemonScreen', {
        simplePokemon: pokemon,
        color: bgColor
      }) }
      activeOpacity={ 0.9 }
    >
      <View style={ {
        ...styles.cardContainer,
        width: windowWidth * 0.4,
        backgroundColor: bgColor,
      } }>
        <View style={{ ...styles.nameContainer }}>
          <Text
            adjustsFontSizeToFit={true}
            style={ { ...styles.name, fontSize: fontSize() } }>
            { capitalize(pokemon.name) }
            { '\n' + ((Number(pokemon.id) < 2000) ? '#' + pokemon.id : '')}
          </Text>
        </View>

        <View style={ styles.pokeballContainer }>
          <Image
            source={ require('../assets/pokeball-white.png') }
            style={ styles.pokeball }
          />
        </View>

        <FadeInImage
          uri={ pokemon.picture }
          style={ styles.pokemonImage }
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 140,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameContainer: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 70,
  },
  name: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    left: 10,
  },
  pokeballContainer: {
    borderBottomEndRadius: 10,
    height: 120,
    width: 120,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokeball: {
    width: 130,
    height: 130,
    position: 'absolute',
    bottom: -25,
    right: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -7,
    bottom: -10,
  },
});

