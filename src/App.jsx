import "./App.css";
import LeftPanel from "./layout/LeftPanel/LeftPanel.jsx";
import Body from "./layout/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import DiaryList from "./components/DiaryList/DiaryList.jsx";
import DiaryAddButton from "./components/DiaryAddButton/DiaryAddButton.jsx";
import DiaryForm from "./components/DiaryForm/DiaryForm.jsx";
import {useLocalStorage} from "./hooks/use-localstorage.hook.js";
import {useContext} from "react";
import {UserContext} from "./context/user.context.jsx";

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
  const { userId } = useContext(UserContext);

  const addItem = (item) => {
    setData([
      ...mapData(data),
      {
        ...item,
        id: data?.length > 0 ? Math.max(...data.map((i) => i.id)) + 1 : 1,
        date: new Date(item.date),
        userId,
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />

        <DiaryAddButton />

        <DiaryList data={mapData(data).filter((item) => item.userId === userId)} />
      </LeftPanel>

      <Body>
        <DiaryForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
