/* eslint-disable*/
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fab } from '../components/Fab';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { RootStackParams } from '../navigator/Navigator';
import { styles } from '../theme/appTheme';

interface  SearchScreenProps extends StackScreenProps<RootStackParams, 'SearchScreen'>{}

export const SearchScreen = ({navigation}: SearchScreenProps) => {

  const {top} = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])

  useEffect(() => {
    if( term.length === 0 ) return setPokemonFiltered([]);

    const newListPokemon = simplePokemonList.filter(pokemon => {
      if (pokemon.name.includes(term.toLowerCase())) {
        return true;
      } else if (pokemon.id !== term) {
        return false;
      } else {
        return true;
      }
    });

    setPokemonFiltered(newListPokemon);
  }, [term])

  if(isFetching) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" color="gray" />

        <Image
          source={ require('../assets/pokeball.png') }
          style={ styles.pokeballBGB }
        />

        <Text>Loading...</Text>

        <Fab onPress={() => navigation.navigate('HomeScreen')} iconName="list" />
      </View>
    )
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center'}}
    >
      <Image
        source={ require('../assets/pokeball.png') }
        style={ styles.pokeballBGB }
      />

      <SearchInput
        onDebounce={(value) => setTerm(value)}
        style={{
          width: '85%',
          position: 'absolute',
          zIndex: 9,
          top: (Platform.OS === 'ios') ? top : top + 10,
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={(pokemon) => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => <PokemonCard pokemon={item} /> }

        ListHeaderComponent={(
          <Text style={ {
            ...styles.title,
            ...styles.globalMargin,
            top: top + 70,
            paddingBottom: top + 80
          } }>{ term }</Text>
        )}
      />

      <Fab onPress={() => navigation.navigate('HomeScreen')} iconName="list" />
    </View>
  );
};
