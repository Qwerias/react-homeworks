function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
	return a - b;
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			classNames: ['layered', 'stacked', 'layered', '']
		};
	}

	componentWillMount() {
		this.setState({
			data: [],
			series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
			labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
			colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
		})
	}

	componentDidMount() {
		this.populateArray();
		setInterval(this.populateArray.bind(this), 2000);
	}

	populateArray() {
		const series = 5;
		const serieLength = 5;

		let data = new Array(series).fill(new Array(serieLength).fill(0));
		data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

		this.setState({data});
	}

	render() {
		return (
			<section>
				<Charts classNames={this.state.classNames} state={this.state}/>
				<Legend labels={this.state.labels} colors={this.state.colors}/>
			</section>
		);
	}
}

const Charts = ({classNames, state}) => {
	const {data, colors, labels, series} = state;
	const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);

	return (
		<div>
			{classNames.map(item => {
				let class_name = item === '' ? 'Charts horizontal' : 'Charts';
				return (
					<div className={class_name}>
						{data.map((serie, serieIndex) => {
							return (
								<Chart serie={serie} serieIndex={serieIndex} labels={labels} colors={colors}
								       max={max}
								       className={item} series={series}/>
							);
						})}
					</div>
				)
			})}
		</div>
	);
};

const Chart = ({serie, serieIndex, labels, colors, max, className, series}) => {
	var sortedSerie = serie.slice(0),
		sum;

	sum = serie.reduce((carry, current) => carry + current, 0);
	sortedSerie.sort(compareNumbers);

	let class_name, height, label;
	if (className === '') {
		class_name = "Charts--serie";
		height = 'auto';
		label = series[serieIndex];
	} else {
		class_name = "Charts--serie " + className;
		height = 250;
		label = labels[serieIndex];
	}

	return (
		<div className={class_name}
		     key={serieIndex}
		     style={{height: height}}
		>
			<label>{label}</label>
			{serie.map((item, itemIndex) => {
				return (
					<Chart_Item item={item} itemIndex={itemIndex} colors={colors} max={max} sortedSerie={sortedSerie}
					            serie={serie} className={className} sum={sum}/>
				)
			})}
		</div>
	)
};

const Chart_Item = ({item, itemIndex, colors, max, sortedSerie, serie, className, sum}) => {
	var color = colors[itemIndex], style,
		size = item / (max) * 100;

	let class_name = className === '' ? "Charts--item" : "Charts--item " + className;

	if (className === 'layered') {
		style = {
			backgroundColor: color,
			opacity: (item / max + .05),
			zIndex: item,
			height: size + '%',
			right: ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%'
		};
	} else if (className === 'stacked') {
		size = item / sum * 100;
		style = {
			backgroundColor: color,
			opacity: 1,
			zIndex: item,
			height: size + '%'
		};
	} else {
		style = {
			backgroundColor: color,
			opacity: (item / max + .05),
			zIndex: item,
			width: size + '%'
		};
	}

	return (
		<div
			className={class_name}
			style={style}
			key={itemIndex}
		>
			<b style={{color: color}}>{item}</b>
		</div>
	);
};

const Legend = ({labels, colors}) => {
	return (
		<div className="Legend">
			{labels.map((label, labelIndex) => {
				return (
					<Label colors={colors} label={label} labelIndex={labelIndex}/>
				);
			})}
		</div>
	)
};

const Label = ({colors, label, labelIndex}) => {
	return (
		<div>
			<span className="Legend--color" style={{backgroundColor: colors[labelIndex % colors.length]}}/>
			<span className="Legend--label">{label}</span>
		</div>
	)
};