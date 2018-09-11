import { store } from 'rfx-core';

import appState from './AppState';
import auth from './Auth'

import form from './Form'

const rootStore = store.setup({
	appState,
	auth
});

// window.store is used by mobx so beware about naming
window.mobStore = {
	form,
	rootStore
}

export default rootStore
