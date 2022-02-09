/* eslint-disable*/
import ImageColors from 'react-native-image-colors';


export const getColors = async (uri: string) => {
  const colors = await ImageColors.getColors(uri, {
    fallback: 'grey',
  });

  let color;

  if (colors.platform === 'android') {
    color = colors.dominant;
  }

  if (colors.platform === 'ios') {
    color = colors.background;
  }

  return { color };
};
