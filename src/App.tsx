import { useEffect, useState } from 'react';
import './App.css';
import AutoComplete from './components/autoComplete';

const url = 'https://jsonplaceholder.typicode.com/photos';

type Photo = {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
};

const App = () => {
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [photoTitle, setPhotoTitle] = useState<string[]>([]);
	const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string>('');

	const getPhotosFromJson = async () => {
		await fetch(url).then((result) =>
			result.json().then((resp) => setPhotos(resp))
		);
	};

	const getStateUpSelectedTitle = (val: string) => {
		photos.filter((photo) => {
			let photoUrl;
			if (val === photo.title) {
				photoUrl = photo.thumbnailUrl;
				setSelectedPhotoUrl(photoUrl);
			}
			return photoUrl;
		});
	};

	useEffect(() => {
		getPhotosFromJson();
		const arr: string[] = [];
		photos.map((photo) => arr.push(photo.title));
		setPhotoTitle(arr);
	}, [photos]);

	return (
		<div className='appContainer'>
			<h1>Photos Auto Search</h1>
			<AutoComplete
				items={JSON.stringify(photoTitle)}
				stateUpTitle={getStateUpSelectedTitle}
			/>
			<img src={selectedPhotoUrl} alt='' />
		</div>
	);
};

export default App;
