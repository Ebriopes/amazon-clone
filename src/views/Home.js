import React, { useEffect, useState } from 'react';
import { fakeStoreInstance as axios } from 'services/Axios';
import Product from 'components/Product';
import background from 'images/background.jpg';
import './Home.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [groupProducts, setGroupProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get('/products');
				const products = res.data;

				const groupProducts = [
					products?.splice(0, 2),
					products?.splice(0, 4),
					products?.splice(0, 3),
					products?.splice(0, 4),
					products
				];

				setGroupProducts(groupProducts);

				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		getProducts();
	}, []);

	return (
		<main className='home'>
			<section className='home-container'>
				<img className='home-image' alt='background' src={background} />

				{loading ? (
					<FontAwesomeIcon
						className='home-loading'
						icon={faSpinner}
						size='10x'
						color='#F7981D'
					/>
				) : (
					groupProducts?.map((group, gid) => (
						<article id={`group-${gid}`} key={gid} className='home-row'>
							{group.map(({ id, image, price, rating, title }) => (
								<Product
									id={id}
									image={image}
									key={id}
									price={price}
									rating={rating?.rate}
									title={title}
								/>
							))}
						</article>
					))
				)}
			</section>
		</main>
	);
};

export default Home;
