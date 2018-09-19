'use strict';

function Stars(props) {
	if (!isNaN(props.count) && props.count > 0 && props.count < 6) {
		let list = [];
		for (let i = 0; i < props.count; i++) {
			list.push(<li><Star key={i}/></li>);
		}
		return <ul className="card-body-stars u-clearfix">{list}</ul>;
	}
	return null;
}

Stars.defaultProps = {
	count: 0
};
