/* eslint-disable*/
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

import { HomeScreen } from "../screens/HomeScreen";
import { PokemonScreen } from "../screens/PokemonScreen";
import { SearchScreen } from "../screens/SearchScreen";


export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: { simplePokemon: SimplePokemon, color: string };
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="HomeScreen" component={ HomeScreen } />
      <Stack.Screen name="PokemonScreen" component={ PokemonScreen } />
      <Stack.Screen name="SearchScreen" component={ SearchScreen } />
    </Stack.Navigator>
  );
};
