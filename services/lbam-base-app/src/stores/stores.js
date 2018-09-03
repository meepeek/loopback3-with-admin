import { store } from 'rfx-core';

import appState from './AppState';
import auth from './Auth'

const rootStore = store.setup({
	appState,
	auth
});

window.rootStore = rootStore

export default rootStore
