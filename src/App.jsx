import "./App.css";
import LeftPanel from "./layout/LeftPanel/LeftPanel.jsx";
import Body from "./layout/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import DiaryList from "./components/DiaryList/DiaryList.jsx";
import DiaryItem from "./components/DiaryItem/DiaryItem.jsx";
import DiaryAddButton from "./components/DiaryAddButton/DiaryAddButton.jsx";
import CardButton from "./components/CardButton/CardButton.jsx";
import DiaryForm from "./components/DiaryForm/DiaryForm.jsx";
import {useLocalStorage} from "./hooks/use-localstorage.hook.js";

function mapData(data) {
  if (data?.length) {
    return data.map(i => ({
      ...i,
      date: new Date(i.date)
    }))
  } else {
    return [];
  }
}

function App() {
  const [data, setData] = useLocalStorage('data');

  const addItem = (item) => {
    setData([
      ...mapData(data),
      {
        ...item,
        id: data.length > 0 ? Math.max(...data.map((i) => i.id)) + 1 : 1,
        date: new Date(item.date),
      },
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
    <div className="app">
      <LeftPanel>
        <Header />

        <DiaryAddButton />

        <DiaryList>
          {data?.length === 0 ? (
            <p>Записей пока нет, добавьте первую</p>
          ) : (
            mapData(data).sort(sortData).map(({ id, title, date, tag, text }) => {
              return (
                <CardButton key={id}>
                  <DiaryItem title={title} date={date} tag={tag} text={text} />
                </CardButton>
              );
            })
          )}
        </DiaryList>
      </LeftPanel>

      <Body>
        <DiaryForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
