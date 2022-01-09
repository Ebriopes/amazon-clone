import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as voidStar } from '@fortawesome/free-regular-svg-icons';
import {
	faStar as fullStar,
	faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons';
import './Stars.css';

function Stars({ rating = { rate: 0, count: 0 } }) {
	return (
		<article className='stars'>
			{Array(5)
				.fill()
				.map((_, i) => {
					const star =
						i + 0.3 < rating?.rate && rating?.rate < i + 0.85
							? faStarHalfAlt
							: rating?.rate >= i + 0.85
							? fullStar
							: voidStar;

					return (
						<FontAwesomeIcon
							icon={star}
							color='#F7981D'
							aria-label='star'
							key={Math.random()}
						/>
					);
				})}
			<label hidden aria-label='Rate calification'>
				Rating: <strong>{rating?.rate}</strong>, from:{' '}
				<strong>{rating?.count}</strong> califications
			</label>
		</article>
	);
}

export default Stars;
