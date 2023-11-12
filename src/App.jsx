import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel.jsx';
import Body from './layout/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import DiaryList from './components/DiaryList/DiaryList.jsx';
import DiaryItem from './components/DiaryItem/DiaryItem.jsx';
import DiaryAddButton from './components/DiaryAddButton/DiaryAddButton.jsx';
import CardButton from './components/CardButton/CardButton.jsx';

function App() {
  const data = [
    {
      title: 'Подготовка к обновлению курсов',
      text: 'Горные походы открывают удивительные природные ландшафты',
      date: new Date()
    },
    {
      title: 'Подготовка к обновлению курсов 2',
      text: 'Горные походы открывают удивительные природные ландшафты 2',
      date: new Date()
    }
  ];

  return (
    <div className='app'>
      <LeftPanel>
        <Header />

        <DiaryAddButton />

        <DiaryList>
          <CardButton>
            <DiaryItem
              title={data[0].title}
              text={data[0].text}
              date={data[0].date}
            />
          </CardButton>

          <CardButton>
            <DiaryItem
              title={data[1].title}
              text={data[1].text}
              date={data[1].date}
            />
          </CardButton>
        </DiaryList>
      </LeftPanel>

      <Body>
        Body
      </Body>
    </div>
  );
}

export default App;
