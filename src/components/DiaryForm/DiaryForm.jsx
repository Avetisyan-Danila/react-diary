import styles from "./DiaryForm.module.css";
import Button from "../Button/Button.jsx";
import { useContext, useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./DiaryForm.state.js";
import Input from "../Input/Input.jsx";
import { UserContext } from "../../context/user.context.jsx";

function DiaryForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
    } else {
      dispatchForm({ type: "SET_VALUE", payload: { ...data } });
    }
  }, [data]);

  useEffect(() => {
    let timerId;

    if (!isValid.title || !isValid.date) {
      focusError(isValid);

      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 1500);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  }, [userId]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addDiaryItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  const deleteItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
  };

  return (
    <form className={styles["form"]} onSubmit={addDiaryItem}>
      <div className={styles["form-title"]}>
        <Input
          ref={titleRef}
          placeholder="Введите текст..."
          type="text"
          onChange={onChange}
          value={values.title}
          name="title"
          isValid={isValid.title}
          appearance="title"
        />

        {data?.id && (
          <button
            className={styles["form-delete"]}
            type="button"
            onClick={deleteItem}
          >
            <img src="/archive.svg" alt="Кнопка удалить" />
          </button>
        )}
      </div>

      <div className={styles["form-controls"]}>
        <div
          className={cn(styles["form-row"], {
            [styles.invalid]: !isValid.date,
          })}
        >
          <label className={styles["form-label"]} htmlFor="date">
            <img src="/calendar.svg" alt="Иконка календаря" />
            <span>Дата</span>
          </label>

          <Input
            ref={dateRef}
            isValid={isValid.date}
            type="date"
            onChange={onChange}
            value={
              values.date
                ? new Date(values.date).toISOString().slice(0, 10)
                : ""
            }
            name="date"
            id="date"
          />
        </div>

        <div className={styles["form-row"]}>
          <label className={styles["form-label"]} htmlFor="tag">
            <img src="/folder.svg" alt="Иконка папки" />
            <span>Метки</span>
          </label>

          <Input
            placeholder="Введите текст..."
            onChange={onChange}
            type="text"
            value={values.tag}
            name="tag"
            id="tag"
          />
        </div>
      </div>

      <textarea
        placeholder="Введите текст..."
        onChange={onChange}
        value={values.text}
        name="text"
        rows="5"
        className={cn(styles.input, styles.textarea)}
      />

      <Button>Сохранить</Button>
    </form>
  );
}

export default DiaryForm;
