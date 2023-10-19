import React from 'react';
import Navigation from './components/shared/Navigation';
import { GlobalCartContext } from './context/CartContext';

function App() {  
  return (
    <GlobalCartContext>
      <Navigation />
    </GlobalCartContext>

    
  );
}

export default App;
