import { store } from 'rfx-core';

import appState from './AppState';

import form from './Form'
import auth from './Auth'

const rootStore = store.setup({
	appState
});

// window.store is used by mobx so beware about naming
window.mobStore = {
	form,
	auth,
	rootStore
}

export default rootStore
