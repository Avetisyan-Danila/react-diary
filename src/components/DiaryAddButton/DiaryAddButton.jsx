import CardButton from "../CardButton/CardButton.jsx";
import "./DiaryAddButton.css";

function DiaryAddButton({ clearForm }) {
  return (
    <CardButton className="diary-add" onClick={clearForm}>
      + Новое воспоминание
    </CardButton>
  );
}

export default DiaryAddButton;
