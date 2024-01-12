import "./DiaryList.css";
import CardButton from "../CardButton/CardButton.jsx";
import DiaryItem from "../DiaryItem/DiaryItem.jsx";
import {useContext} from "react";
import {UserContext} from "../../context/user.context.jsx";

function DiaryList({ data }) {
  const { userId } = useContext(UserContext);

  const sortData = (a, b) => {
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className="diary-list">
      {data.length === 0 ? (
        <p>Записей пока нет, добавьте первую</p>
      ) : (
        data
          .filter((item) => item.userId === userId)
          .sort(sortData)
          .map(({ id, title, date, tag, text }) => {
            return (
              <CardButton key={id}>
                <DiaryItem title={title} date={date} tag={tag} text={text} />
              </CardButton>
            );
          })
        )
      }
    </div>
  );
}

export default DiaryList;
