import styles from "./DiaryForm.module.css";
import Button from "../Button/Button.jsx";
import { useEffect, useReducer } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./DiaryForm.state.js";

function DiaryForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;

    if (!isValid.title || !isValid.date || !isValid.text) {
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 1500);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit]);

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

  return (
    <form className={styles["form"]} onSubmit={addDiaryItem}>
      <div className={styles["form-title"]}>
        <input
          placeholder="Введите текст..."
          type="text"
          onChange={onChange}
          value={values.title}
          name="title"
          className={cn(styles["input-title"], {
            [styles.invalid]: !isValid.title,
          })}
        />

        {/*<img src="/archive.svg" alt="Иконка архива"/>*/}
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

          <input
            type="date"
            onChange={onChange}
            value={values.date}
            name="date"
            id="date"
            className={styles.input}
          />
        </div>

        <div className={styles["form-row"]}>
          <label className={styles["form-label"]} htmlFor="tag">
            <img src="/folder.svg" alt="Иконка папки" />
            <span>Метки</span>
          </label>

          <input
            placeholder="Введите текст..."
            onChange={onChange}
            type="text"
            value={values.tag}
            name="tag"
            id="tag"
            className={styles.input}
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
