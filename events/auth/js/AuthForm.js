'use strict';

const AuthForm = props => {
	let form;
	function onSubmit(event) {
		event.preventDefault();
		let data = {
			name: form.querySelector('input[type=text]').value,
			email: form.querySelector('input[type=email]').value,
			password: form.querySelector('input[type=password]').value
		};
		props.onAuth(data);
	}

	function check(event) {
		let reg_exp = event.currentTarget.type === 'email' ? /[^a-zA-Z\d@._-]/ : /[^a-zA-Z\d_]/;
		let value = event.currentTarget.value;
		if (reg_exp.test(value)) {
			value = value.slice(0, -1);
			event.currentTarget.value = value;
		}
	}


	return (
		<form className="ModalForm" action="/404/auth/" method="POST" onSubmit={onSubmit} ref={element => form = element}>
			<div className="Input">
				<input required type="text" placeholder="Имя"/>
					<label></label>
			</div>
			<div className="Input">
				<input type="email" placeholder="Электронная почта" onChange={check}/>
					<label></label>
			</div>
			<div className="Input">
				<input required type="password" placeholder="Пароль" onChange={check}/>
					<label></label>
			</div>
			<button type="submit">
				<span>Войти</span>
				<i className="fa fa-fw fa-chevron-right"></i>
			</button>
		</form>
	)
};