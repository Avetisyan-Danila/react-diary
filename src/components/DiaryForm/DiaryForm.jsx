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
		<form className={styles['diary-form']} onSubmit={addDiaryItem}>
			<input placeholder="title" type="text" name="title" className={cn(styles.input, {
				[styles.invalid]: !formValidState.title
			})} />
			<input type="date" name="date" className={cn(styles.input, {
				[styles.invalid]: !formValidState.date
			})} />
			<input type="text" name="tag" placeholder="tag" className={styles.input} />
			<textarea placeholder="text" name="text" rows="5" className={cn(styles.input, {
				[styles.invalid]: !formValidState.text
			})} />

			<Button>Отправить</Button>
		</form>
	);
}

export default DiaryForm;
