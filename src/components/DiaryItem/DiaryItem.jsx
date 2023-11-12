import './DiaryItem.css';

function DiaryItem({title, text, date}) {
  const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);

  return (
    <div className="diary-item">
      <h2 className="diary-item__header">{title}</h2>
      <div className="diary-item__body">
        <div className="diary-item__date">{formatedDate}</div>
        <div className="diary-item__text">{text}</div>
      </div>
    </div>
  );
}

export default DiaryItem;
