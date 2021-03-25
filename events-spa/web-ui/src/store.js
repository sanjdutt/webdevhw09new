import { createStore, combineReducers } from 'redux';

function error(state = null, action) {
	switch (action.type) {
		case 'session/set':
			return null;
		case 'error/set':
			return action.data;
		default:
			return state;
	}
}

function users(state = [], action) {
	if (action.type === 'users/set') {
		return action.data;
	} else {
		return state;
	}
}

function events(state = load_events(), action) {
	if (action.type === 'events/set') {
		save_events(action.data);
		return action.data;
	} else {
		if (state == null) {
			return [];
		} else {
			return state;
		}
	}
}

function save_events(events) {
	localStorage.setItem("events", JSON.stringify(events));
}

function load_events() {
	let events = localStorage.getItem("events");
	return JSON.parse(events);
}

function session(state = load_session(), action) {
	switch (action.type) {
		case 'session/set':
			save_session(action.data);
			return action.data;
		case 'session/clear':
			save_session(null);
			return null;
		default: 
			return state;
	}
}

function save_session(sess) {
	if (sess) {
		let session = Object.assign({}, sess, {time: Date.now()});
		localStorage.setItem("session", JSON.stringify(session));
	} else {
		localStorage.setItem("session", null);
	}
}

function load_session() {
	let session = localStorage.getItem("session");
	if (session === "null") {
		return null;
	}
	session = JSON.parse(session);
	let age = Date.now() - session.time;
	let hours = 60*60*1000;
	if (age < 24 * hours) {
		return session;
	} else {
		return null;
	}
}

function root_reducer(state, action) {
	let redu = combineReducers({
		users,
		events,
		session,
		error
	});

	let newState = redu(state, action);

	return newState;
}

let store = createStore(root_reducer);
export default store;
