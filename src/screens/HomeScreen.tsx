/* eslint-disable*/
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fab } from '../components/Fab';

import { PokemonCard } from '../components/PokemonCard';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { RootStackParams } from '../navigator/Navigator';
import { styles } from '../theme/appTheme';


interface  HomeScreenProps extends StackScreenProps<RootStackParams, 'HomeScreen'>{}

export const HomeScreen = ({navigation}: HomeScreenProps) => {

  const { top } = useSafeAreaInsets();
  const { isLoading, simplePokemonList, loadPokemons } = usePokemonPaginated();

  return (
    <>
      <Image
        source={ require('../assets/pokeball.png') }
        style={ styles.pokeballBG }
      />

      <View
        style={{
          alignItems: 'center',
        }}
      >
        <FlatList
          data={simplePokemonList}
          keyExtractor={(pokemon) => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} /> }

          //InfiniteScroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}

          ListHeaderComponent={(
            <Text style={ {
              ...styles.title,
              ...styles.globalMargin,
              top: top + 20,
              marginBottom: top + 20,
              paddingBottom: 20
            } }>Pokedex</Text>
          )}

          ListFooterComponent={(
            <ActivityIndicator
              style={{ height: 100 }}
              size={20}
              color="grey"
            />
          )}
        />

        <Fab onPress={() => navigation.navigate('SearchScreen')} iconName="search" />
      </View>
    </>
  );
};
