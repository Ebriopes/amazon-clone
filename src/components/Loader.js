import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loader.css';

function Loader() {
	return (
		<main className='loader'>
			<FontAwesomeIcon
				className='loader-spin'
				icon={faSpinner}
				size='10x'
				color='#F7981D'
			/>
		</main>
	);
}

export default Loader;
