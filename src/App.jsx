import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel.jsx';
import Body from './layout/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import DiaryList from './components/DiaryList/DiaryList.jsx';
import DiaryItem from './components/DiaryItem/DiaryItem.jsx';
import DiaryAddButton from './components/DiaryAddButton/DiaryAddButton.jsx';
import CardButton from './components/CardButton/CardButton.jsx';
import DiaryForm from './components/DiaryForm/DiaryForm.jsx';
import {useEffect, useState} from 'react';

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('data')) {
			const storageData = JSON.parse(localStorage.getItem('data'));
			if (storageData) {
				setData(storageData.map(item => ({
					...item,
					date: new Date(item.date)
				})));
			}
		}
	}, []);

	useEffect(() => {
		if (data.length) {
			localStorage.setItem('data', JSON.stringify(data));
		}
	}, [data]);

	const addItem = item => {
		setData(oldData => [
			...oldData,
			{
				...item,
				id: oldData.length > 0
					? Math.max(...oldData.map(i => i.id)) + 1
					: 1
			}
		]);
	};

	const sortData = (a, b) => {
		if (a.date > b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header />

				<DiaryAddButton />

				<DiaryList>
					{data.length === 0
						? <p>Записей пока нет, добавьте первую</p>
						: data.sort(sortData).map(
							({id, title, date, tag, text}) => {
								return (
									<CardButton key={id}>
										<DiaryItem
											title={title}
											date={date}
											tag={tag}
											text={text}
										/>
									</CardButton>
								);
							})}
				</DiaryList>
			</LeftPanel>

			<Body>
				<DiaryForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
