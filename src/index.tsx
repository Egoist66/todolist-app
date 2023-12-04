import React from 'react';
import ReactDOM from 'react-dom/client';
import {AppRedux} from "./components/AppRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";

import './App.css'
import './store/native-test/class'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <Provider store={store}>

      <AppRedux />

  </Provider>
  
);

