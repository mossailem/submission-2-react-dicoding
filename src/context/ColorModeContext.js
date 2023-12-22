import React from 'react';

const ColorModeContext = React.createContext();

export const ColorModeProvider = ColorModeContext.Provider;
export const ColorModeConsumer = ColorModeContext.Consumer;

export default ColorModeContext;