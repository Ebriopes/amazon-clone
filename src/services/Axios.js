import axios from 'axios';

export const firebaseInstance = axios.create({
	baseURL: 'https://us-central1-amanaz.cloudfunctions.net/api'
});

export const fakeStoreInstance = axios.create({
	baseURL: 'https://fakestoreapi.com'
});
