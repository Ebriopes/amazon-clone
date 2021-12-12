import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyA2x9mMcyzPEoWhUIMQciWvM1b9pRfn0aw",
	authDomain: "amanaz.firebaseapp.com",
	dateBaseURL: "https://amanaz.firebaseio.com",
	projectId: "amanaz",
	storageBucket: "amanaz.appspot.com"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

export {db, auth};

