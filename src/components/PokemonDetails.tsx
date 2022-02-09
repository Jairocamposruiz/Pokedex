/* eslint-disable*/
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { capitalize } from '../helpers/capitalize';

import { PokemonDetailsResponse } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';


interface Props {
  pokemon: PokemonDetailsResponse;
  color: string;
}

const nameSprites = ['front_default', 'back_default', 'front_shiny', 'back_shiny', 'front_female', 'back_female', 'front_shiny_female', 'back_shiny_female'];

export const PokemonDetails = ({ pokemon, color }: Props) => {

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={ {
        ...StyleSheet.absoluteFillObject,
      } }
    >
      {/*Types and weight*/ }
      <View
        style={ {
          ...styles.container,
          marginTop: 350,
        } }
      >
        <Text style={ {
          ...styles.title,
        } }>Types</Text>
        <View style={ { flexDirection: 'row' } }>
          {
            pokemon.types.map(({ type }) => (
              <Text
                style={ {
                  ...styles.regularText,
                  marginRight: 10,
                } }
                key={ type.name }
              >
                { capitalize(type.name) }
              </Text>
            ))
          }
        </View>
        {/*Weight*/ }
        <Text style={ {
          ...styles.title,
        } }>Weight</Text>
        <Text style={ styles.regularText }>{ pokemon.weight }Kg</Text>
      </View>

      {/*Sprites*/ }
      <View
        style={ {
          ...styles.container,
        } }
      >
        <Text style={ {
          ...styles.title,
        } }>Sprites</Text>
      </View>
      <ScrollView
        horizontal={ true }
        showsHorizontalScrollIndicator={ false }
      >
        {
          nameSprites.map(nameSprite => (
            // @ts-ignore
            (pokemon).sprites[nameSprite] && (
              <FadeInImage
                key={nameSprite}
                // @ts-ignore
                uri={ (pokemon).sprites[nameSprite] }
                style={ styles.basicSprite }
              />
            )
          ))
        }
      </ScrollView>

      {/*Abilities*/}
      <View
        style={ {
          ...styles.container,
        } }
      >
        <Text style={ {
          ...styles.title,
        } }>Abilities</Text>
        <View style={ { flexDirection: 'row' } }>
          {
            pokemon.abilities.map(({ ability }) => (
              <Text
                style={ {
                  ...styles.regularText,
                  marginRight: 10,
                } }
                key={ ability.name }
              >
                { capitalize(ability.name) }
              </Text>
            ))
          }
        </View>
      </View>

      {/*Stats*/}
      <View
        style={ {
          ...styles.container,
        } }
      >
        <Text style={ {
          ...styles.title,
        } }>Base Stats</Text>
        <View>
          {
            pokemon.stats.map(({ stat, base_stat }) => (
              <View
                key={ stat.name }
                style={{ flexDirection: 'row' }}
              >
                <Text
                  style={ {
                    ...styles.regularText,
                    marginRight: 10,
                    width: 150
                  } }
                >
                  { capitalize(stat.name) }
                </Text>
                <Text
                  style={ {
                    ...styles.regularText,
                    fontWeight: 'bold'
                  } }
                >
                  { base_stat }
                </Text>
              </View>
            ))
          }
        </View>
      </View>

      {/*Moves*/}
      <View
        style={ {
          ...styles.container,
        } }
      >
        <Text style={ {
          ...styles.title,
        } }>Moves</Text>
        <View>
          {
            pokemon.moves.map(({ move }) => (
              <Text
                style={ {
                  ...styles.regularText,
                  marginRight: 10,
                } }
                key={ move.name }
              >
                <Icon name="remove-outline" size={20} color="black" /> { capitalize(move.name) }
              </Text>
            ))
          }
        </View>
      </View>

      {/*Space*/}
      <View style={{ height: 100 }}/>

      {/*Background*/}
      <View
        style={ {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: color,
          position: 'absolute',
          zIndex: -1,
          opacity: 0.4,
          height: 9000,
        } }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    height: 150,
    width: 150,
  },
});
