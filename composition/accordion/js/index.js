'use strict';

const data = [
	{
		title: 'Компоненты',
		article: 'Каждый компонент являются законченной частью пользовательского интерфейса и сам управляет своим состоянием, а композиция компонентов (соединение) позволяет создавать более сложные компоненты. Таким образом, создается иерархия компонентов, причем каждый отдельно взятый компонент независим сам по себе. Такой подход позволяет строить сложные интерфейсы, где есть множество состояний, и взаимодействовать между собой.'
	},
	{
		title: 'Выучил раз, используй везде!',
		article: 'После изучения React вы сможете использовать его концепции не только в браузере, но также и при разработке мобильных приложений с использованием React Native.'
	},
	{
		title: 'Использование JSX',
		article: 'JSX является языком, расширяющим синтаксис стандартного Javascript. По факту он позволяет писать HTML-код в JS-скриптах. Такой подход упрощает разработку компонентов и повышает читаемость кода.'
	}
];

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: data[0].title
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) { // 2 варианта, первый позволяет открыть сразу несколько вкладок, второй на синтаксисе реакта, не знаю, какой лучше
		// event.currentTarget.parentNode.classList.toggle('open');
		this.setState({
			opened: this.state.opened === event.currentTarget.innerText ? false : event.currentTarget.innerText
		});
	}

	render() {
		return (
			<main className="main">
				<h2 className="title">React</h2>
				{data.map((item, index) => {
					return <Item title={item.title} article={item.article} isOpen={this.state.opened === item.title} key={index} onClick={this.onClick}/>
				})}
			</main>
		)
	}
}

const Item = ({title, article, isOpen, onClick}) => {
	let class_name = isOpen ? 'section open' : 'section';
	return (
		<section className={class_name}>
			<button>toggle</button>
			<h3 className="sectionhead" onClick={onClick}>{title}</h3>
			<div className="articlewrap">
				<div className="article">
					{article}
				</div>
			</div>
		</section>
	)
};