/* eslint-disable*/

export const capitalize = (world: string): string => {
  const firstLetter = world[0].toUpperCase();
  const worldCapitalized = firstLetter + world.slice(1);
  return worldCapitalized;
}
