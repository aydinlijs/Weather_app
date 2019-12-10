import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import { Provider } from "react-redux";
import store from "./redux/store";
import '@shopify/polaris/styles.css';
import './index.css';

const element = <Provider store={store}><App/></Provider>
ReactDOM.render(<AppProvider i18n={enTranslations}>{element}</AppProvider>,document.getElementById("root"));