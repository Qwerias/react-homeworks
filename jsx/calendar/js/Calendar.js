const Calendar = props => {
	const date = props.date;
	const days = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',];
	const changed_months = months.map(item => {
		if (/ь$/i.test(item)) {
			return item.replace(/ь$/i, 'я');
		} else if (/й$/i.test(item)) {
			return item.replace(/й$/i, 'я');
		}
		return item + 'а';
	});

	const day = days[date.getDay()];
	const number = date.getDate();
	const month = months[date.getMonth()];
	const changed_month = changed_months[date.getMonth()];
	const year = date.getFullYear();

	function makeRows() {
		let rest = number % 7;
		let rows = [];
		for (let i = 0, j = rest * -1; i < 5; i++) {
			let cells = [];
			for (let q = 0; q < 7; q++) {
				cells.push(j);
				j++;
			}
			rows.push(cells);
		}
		return rows;
	}

	let rows = makeRows();

	function addRows(row) {
		return row.map((item) => {
			let new_date = new Date(date.getFullYear(), date.getMonth(), item);
			let new_day = new_date.toString().match(/\d{1,2}/)[0];
			if (new_date.getMonth() !== date.getMonth()) {
				return (<td className="ui-datepicker-other-month">{new_day}</td>)
			} else if (item === number) {
				return (<td className="ui-datepicker-today">{new_day}</td>)
			}
			return (
				<td>{new_day}</td>
			);
		});
	}

	return (
		<div className="ui-datepicker">
			<div className="ui-datepicker-material-header">
				<div className="ui-datepicker-material-day">{day}</div>
				<div className="ui-datepicker-material-date">
					<div className="ui-datepicker-material-day-num">{number}</div>
					<div className="ui-datepicker-material-month">{changed_month}</div>
					<div className="ui-datepicker-material-year">{year}</div>
				</div>
			</div>
			<div className="ui-datepicker-header">
				<div className="ui-datepicker-title">
					<span className="ui-datepicker-month">{month}</span>&nbsp;<span
					className="ui-datepicker-year">{year}</span>
				</div>
			</div>
			<table className="ui-datepicker-calendar">
				<colgroup>
					<col/>
					<col/>
					<col/>
					<col/>
					<col/>
					<col className="ui-datepicker-week-end"/>
					<col className="ui-datepicker-week-end"/>
				</colgroup>
				<thead>
					<tr>
						<th scope="col" title="Понедельник">Пн</th>
						<th scope="col" title="Вторник">Вт</th>
						<th scope="col" title="Среда">Ср</th>
						<th scope="col" title="Четверг">Чт</th>
						<th scope="col" title="Пятница">Пт</th>
						<th scope="col" title="Суббота">Сб</th>
						<th scope="col" title="Воскресенье">Вс</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((item) => {
						return (
							<tr>
								{addRows(item)}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
};