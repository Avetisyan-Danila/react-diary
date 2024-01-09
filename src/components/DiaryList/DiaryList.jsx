import "./DiaryList.css";
import CardButton from "../CardButton/CardButton.jsx";
import DiaryItem from "../DiaryItem/DiaryItem.jsx";

function DiaryList({ data }) {
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
        data.sort(sortData).map(({ id, title, date, tag, text }) => {
          return (
            <CardButton key={id}>
              <DiaryItem title={title} date={date} tag={tag} text={text} />
            </CardButton>
          );
        })
      )}
    </div>
  );
}

export default DiaryList;
