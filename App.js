import React, {Component, useEffect} from 'react';
import {Provider} from 'react-redux';
import {myStore} from './src/action/store/Store';
import Navigate from './src/navigation/Navigate';

const App = () => {
  return (
    <Provider store={myStore}>
      <Navigate />
    </Provider>
  );
};

export default App;
