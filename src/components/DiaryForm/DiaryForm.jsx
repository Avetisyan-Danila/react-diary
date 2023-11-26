import styles from  './DiaryForm.module.css';
import Button from '../Button/Button.jsx';
import {useState} from 'react';
import cn from 'classnames';

function DiaryForm({onSubmit}) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		date: true,
		text: true
	});

	const addDiaryItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;

		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({...state, title: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, title: true}));
		}

		if (!formProps.date) {
			setFormValidState(state => ({...state, date: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, date: true}));
		}

		if (!formProps.text?.trim().length) {
			setFormValidState(state => ({...state, text: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, text: true}));
		}

		if (!isFormValid) return;

		formProps.date = new Date(formProps.date);
		onSubmit(formProps);
	};
  
	return (
		<form className={styles['form']} onSubmit={addDiaryItem}>
			<div className={styles['form-title']}>
				<input placeholder="Введите текст..." type="text" name="title" className={cn(styles['input-title'], {
					[styles.invalid]: !formValidState.title
				})} />

				{/*<img src="/archive.svg" alt="Иконка архива"/>*/}
			</div>

			<div className={styles['form-controls']}>
				<div className={cn(styles['form-row'], {
					[styles.invalid]: !formValidState.date
				})}>
					<label className={styles['form-label']} htmlFor="date">
						<img src="/calendar.svg" alt="Иконка календаря"/>
						<span>Дата</span>
					</label>

					<input type="date" name="date" id="date" className={styles.input} />
				</div>

				<div className={styles['form-row']}>
					<label className={styles['form-label']} htmlFor="tag">
						<img src="/folder.svg" alt="Иконка папки"/>
						<span>Метки</span>
					</label>

					<input type="text" name="tag" id="tag" placeholder="Введите текст..." className={styles.input} />
				</div>
			</div>

			<textarea placeholder="Введите текст..." name="text" rows="5" className={cn(styles.input, styles.textarea, {
				[styles.invalid]: !formValidState.text
			})} />

			<Button>Сохранить</Button>
		</form>
	);
}

export default DiaryForm;
