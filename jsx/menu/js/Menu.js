const Menu = props => {
	const {items, opened} = props;
	const list = items.map(item => {
		return (<li><a href={item.href}>{item.title}</a></li>)
	});
	if (opened) {
		return (
			<div className="menu menu-open">
				<div className="menu-toggle">
					<span></span>
				</div>
				<nav>
					<ul>
						{list}
					</ul>
				</nav>
			</div>
		)
	}
	return (
		<div className="menu">
			<div className="menu-toggle">
				<span></span>
			</div>
		</div>
	)
};