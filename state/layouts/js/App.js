'use strict';

const VIEW_LIST = "view_list";
const VIEW_MODULE = "view_module";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: VIEW_MODULE
		};
		this.changeIcon = this.changeIcon.bind(this);
	}

	changeIcon() {
		let view = this.state.icon === VIEW_MODULE ? VIEW_LIST : VIEW_MODULE;
		this.setState({
			icon: view
		});
	}

	render() {
		return (
			<div>
				<div className="toolbar">
					<IconSwitch
						icon={this.state.icon}
						onSwitch={this.changeIcon}/>
				</div>
				{this.renderLayout(this.state.icon === VIEW_LIST)}
			</div>
		);
	}

	renderLayout(cardView) {
		if (cardView) {
			return (
				<CardsView
					layout={this.props.layout}
					cards={this.getShopItems(this.props.products, cardView)}/>
			);
		}
		return (<ListView items={this.getShopItems(this.props.products, cardView)}/>);
	}

	getShopItems(products, cardView) {
		return products.map(product => {
			let cardProps = {
				title: product.name,
				caption: product.color,
				img: product.img,
				price: `$${product.price}`
			};
			if (cardView) {
				return (
					<ShopCard {...cardProps}/>
				);
			}
			return (<ShopItem {...cardProps}/>)
		});
	}
}
