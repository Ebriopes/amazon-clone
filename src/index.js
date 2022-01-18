import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducer, { initialState } from './contexts/Reducer';
import { StateProvider } from './contexts/StateProvidder';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
