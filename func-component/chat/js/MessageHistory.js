'use strict';

let MessageHistory = (props) => {
	if (props.list.length < 1) {
		return null;
	}
	let Message = props => {
		return (
			<li>
				<div className="message-data">
					<span className="message-data-name"><i className="fa fa-circle online"></i>{props.from.name}</span>
					<span className="message-data-time">{props.time}</span>
				</div>
				<div className="message my-message">
					{props.text}
				</div>
			</li>
		)
	};
	let Response = props => {
		return (
			<li className="clearfix">
				<div className="message-data align-right">
					<span className="message-data-time">{props.time}</span> &nbsp; &nbsp;
					<span className="message-data-name">{props.from.name}</span>
					<i className="fa fa-circle me"></i>
				</div>
				<div className="message other-message float-right">
					{props.text}
				</div>
			</li>
		)
	};
	let Typing = props => {
		return (
			<li>
				<div className="message-data">
					<span className="message-data-name"><i className="fa fa-circle online"></i>{props.from.name}</span>
					<span className="message-data-time">{props.time}</span>
				</div>
				<i className="fa fa-circle online"></i>
				<i className="fa fa-circle online"></i>
				<i className="fa fa-circle online"></i>
			</li>
		)
	};
	return (<ul>
		{props.list.map(item => {
			let Type;
			if (item.type === 'message') {
				Type = Message;
			} else if (item.type === 'response') {
				Type = Response;
			} else {
				Type = Typing;
			}
			return <Type key={item.id} from={item.from} time={item.time} text={item.text}/>
		})}
	</ul>)
};

MessageHistory.defaultProps = {
	list: []
};