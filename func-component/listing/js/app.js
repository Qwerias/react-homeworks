'use strict';
let root = document.getElementById('root');
let loading = document.getElementsByClassName('loading')[0];
let list;
let request = new XMLHttpRequest();
request.open('GET', 'https://neto-api.herokuapp.com/etsy');
request.send();
request.onreadystatechange = function () {
	if (request.readyState !== 4) return;

	list = JSON.parse(request.responseText);
	loading.parentNode.removeChild(loading);

	let Listing = props => {
		let items = props.list.map(item => {
			let {listing_id, url, MainImage, title, currency_code, price, quantity} = item;
			if (title.length > 50) title = title.slice(0, 50) + '...';

			if (currency_code === 'USD') {
				currency_code = '$';
				price = currency_code + price;
			} else if (currency_code === 'EUR') {
				currency_code = '€';
				price = currency_code + price;
			} else {
				price = price + ' ' + currency_code;
			}

			let quantity_class;
			if (quantity <= 10) {
				quantity_class = 'item-quantity level-low';
			} else if (quantity > 20) {
				quantity_class = 'item-quantity level-high';
			} else {
				quantity_class = 'item-quantity level-medium';
			}

			return (
				<div className="item" key={listing_id}>
					<div className="item-image">
						<a href={url}>
							<img src={MainImage.url_570xN}/>
						</a>
					</div>
					<div className="item-details">
						<p className="item-title">{title}</p>
						<p className="item-price">{price}</p>
						<p className={quantity_class}>{quantity + ' left'}</p>
					</div>
				</div>
			)
		});
		return (
			<div className="item-list">{items}</div>
		);
	};

	ReactDOM.render(
		<Listing list={list}/>,
		root
	);
};