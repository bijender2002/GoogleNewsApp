import React from 'react';
import Appbar from './Components/Appbar';
import News from './Components/News';
import Title from './Components/Title';

function App() {
  return (
    <div>
      <Appbar />
      <Title />
      <News style={{ zIndex: 1000 }} />
    </div>
  );
}

export default App;
