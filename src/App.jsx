import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel.jsx';
import Body from './layout/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import DiaryList from './components/DiaryList/DiaryList.jsx';
import DiaryItem from './components/DiaryItem/DiaryItem.jsx';
import DiaryAddButton from './components/DiaryAddButton/DiaryAddButton.jsx';
import CardButton from './components/CardButton/CardButton.jsx';
import DiaryForm from './components/DiaryForm/DiaryForm.jsx';
import {useState} from 'react';

function App() {
	const INITIAL_DATA = [
		{
			id: 1,
			title: 'Подготовка к обновлению курсов',
			text: 'Горные походы открывают удивительные природные ландшафты',
			date: new Date()
		},
		{
			id: 2,
			title: 'Подготовка к обновлению курсов 2',
			text: 'Горные походы открывают удивительные природные ландшафты 2',
			date: new Date()
		}
	];

	const [data, setData] = useState(INITIAL_DATA);

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
							({id, title, text, date}) => {
								return (
									<CardButton key={id}>
										<DiaryItem
											title={title}
											text={text}
											date={date}
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
