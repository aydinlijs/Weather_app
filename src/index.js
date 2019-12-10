import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '@shopify/polaris/styles.css';
import './index.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

const element = <App/>
ReactDOM.render(<AppProvider i18n={enTranslations}>{element}</AppProvider>,document.getElementById("root"));