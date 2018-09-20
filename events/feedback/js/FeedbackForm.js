'use strict';

const FeedbackForm = props => {
	let form;
	function SaveForm(event) {
		event.preventDefault();
		props.data = {
			name: form.querySelector('#name').value,
			email: form.querySelector('#email').value,
			subject: form.querySelector('#subject').value,
			salutation: form.querySelector('input[name=salutation]:checked').value,
			message: form.querySelector('#message').value,
			snacks: form.querySelectorAll('input[name=snacks]:checked')
		};
		props.data.snacks = Array.prototype.map.call(props.data.snacks, (item => {
			return item.value;
		}));
		props.onSubmit(JSON.stringify(props.data));
	}

	let data = props.data;
	return (
		<form className="content__form contact-form" onSubmit={SaveForm} ref={element => form = element}>
			<div className="testing">
				<p>Чем мы можем помочь?</p>
			</div>
			<div className="contact-form__input-group">
				<input className="contact-form__input contact-form__input--radio" id="salutation-mr" name="salutation"
				       type="radio" value="Мистер"/>
				<label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mr">Мистер</label>
				<input className="contact-form__input contact-form__input--radio" id="salutation-mrs" name="salutation"
				       type="radio" value="Миссис" defaultChecked/>
				<label className="contact-form__label contact-form__label--radio"
				       htmlFor="salutation-mrs">Миссис</label>
				<input className="contact-form__input contact-form__input--radio" id="salutation-ms" name="salutation"
				       type="radio" value="Мисс"/>
				<label className="contact-form__label contact-form__label--radio" htmlFor="salutation-ms">Мисс</label>
			</div>
			<div className="contact-form__input-group">
				<label className="contact-form__label" htmlFor="name">Имя</label>
				<input className="contact-form__input contact-form__input--text" id="name" name="name" type="text"
				       defaultValue={data.name}/>
			</div>
			<div className="contact-form__input-group">
				<label className="contact-form__label" htmlFor="email">Адрес электронной почты</label>
				<input className="contact-form__input contact-form__input--email" id="email" name="email" type="email"
				       defaultValue={data.email}/>
			</div>
			<div className="contact-form__input-group">
				<label className="contact-form__label" htmlFor="subject">Чем мы можем помочь?</label>
				<select className="contact-form__input contact-form__input--select" id="subject" name="subject"
				        defaultValue={data.subject}>
					<option>У меня проблема</option>
					<option>У меня важный вопрос</option>
				</select>
			</div>
			<div className="contact-form__input-group">
				<label className="contact-form__label" htmlFor="message">Ваше сообщение</label>
				<textarea className="contact-form__input contact-form__input--textarea" id="message" name="message"
				          rows="6" cols="65" defaultValue={data.message}></textarea>
			</div>
			<div className="contact-form__input-group">
				<p className="contact-form__label--checkbox-group">Хочу получить:</p>
				<input className="contact-form__input contact-form__input--checkbox" id="snacks-pizza" name="snacks"
				       type="checkbox" value="пицца"/>
				<label className="contact-form__label contact-form__label--checkbox"
				       htmlFor="snacks-pizza">Пиццу</label>
				<input className="contact-form__input contact-form__input--checkbox" id="snacks-cake" name="snacks"
				       type="checkbox" value="пирог" defaultChecked/>
				<label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-cake">Пирог</label>
			</div>
			<button className="contact-form__button" type="submit">Отправить сообщение!</button>
			<output id="result"/>
		</form>
	)
};