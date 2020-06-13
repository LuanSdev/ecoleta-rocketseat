import React from 'react';
import {StatusBar} from 'react-native';

import Home from './src/pages/Home';

export default function App() {
  return (
    // <> fragment, não surti efeito visual
    <>
      {/* transluced impede que a statusbar conflita com o conteúdo */}
      <StatusBar hidden={true} translucent backgroundColor="transparent"/>
      <Home/>
    </>
    
  );
}