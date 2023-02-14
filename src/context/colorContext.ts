//* import third-party
import { createContext } from 'react';

/*
 * ThemeColorContext allows for the player's theme color to be shared globally across all components
 * @param value: string = the hexcode/rgb/etc string for the color
*/
const ThemeColorContext = createContext<string>("#287485"); //* default value is the mfChess teal

export default ThemeColorContext;