import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://us-central1-amanaz.cloudfunctions.net/api'
});

export default instance;
