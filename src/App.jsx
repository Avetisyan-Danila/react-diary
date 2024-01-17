import "./App.css";
import LeftPanel from "./layout/LeftPanel/LeftPanel.jsx";
import Body from "./layout/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import DiaryList from "./components/DiaryList/DiaryList.jsx";
import DiaryAddButton from "./components/DiaryAddButton/DiaryAddButton.jsx";
import DiaryForm from "./components/DiaryForm/DiaryForm.jsx";
import { useLocalStorage } from "./hooks/use-localstorage.hook.js";
import { useState } from "react";

function mapData(data) {
  if (data?.length) {
    return data.map((i) => ({
      ...i,
      date: new Date(i.date),
    }));
  } else {
    return [];
  }
}

function App() {
  const [data, setData] = useLocalStorage("data");
  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = (item) => {
    if (!item.id) {
      setData([
        ...mapData(data),
        {
          ...item,
          id: data?.length > 0 ? Math.max(...data.map((i) => i.id)) + 1 : 1,
          date: new Date(item.date),
        },
      ]);
    } else {
      setData([
        ...mapData(data).map((i) => {
          if (i.id === item.id) {
            return {
              ...item,
            };
          } else {
            return i;
          }
        }),
      ]);
    }
  };

  const deleteItem = (id) => {
    setData([...data.filter((i) => i.id !== id)]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />

        <DiaryAddButton clearForm={() => setSelectedItem(null)} />

        <DiaryList data={mapData(data)} setItem={setSelectedItem} />
      </LeftPanel>

      <Body>
        <DiaryForm
          onSubmit={addItem}
          onDelete={deleteItem}
          data={selectedItem}
        />
      </Body>
    </div>
  );
}

export default App;
