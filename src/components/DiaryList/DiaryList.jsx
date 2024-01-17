import "./DiaryList.css";
import CardButton from "../CardButton/CardButton.jsx";
import DiaryItem from "../DiaryItem/DiaryItem.jsx";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user.context.jsx";

function DiaryList({ data, setItem }) {
  const { userId } = useContext(UserContext);

  const sortData = (a, b) => {
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  const filteredItems = useMemo(
    () => data.filter((item) => item.userId === userId).sort(sortData),
    [data, userId]
  );

  if (data.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }

  return (
    <div className="diary-list">
      {filteredItems.map((el) => {
        return (
          <CardButton key={el.id} onClick={() => setItem(el)}>
            <DiaryItem
              title={el.title}
              date={el.date}
              tag={el.tag}
              text={el.text}
            />
          </CardButton>
        );
      })}
    </div>
  );
}

export default DiaryList;
