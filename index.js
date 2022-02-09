/* eslint-disable*/
/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";


//Para ignorar el warning de react-native-gesture-handler temporal hasta que se arregle
import { LogBox } from "react-native";


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

AppRegistry.registerComponent(appName, () => App);
