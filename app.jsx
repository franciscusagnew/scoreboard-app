// Define an array of Players
var PLAYERS = [
	{
		name: "Franciscus Agnew",
		score: 0,
		id: 1,
	},
	{
		name: "Steve Jobs",
		score: 0,
		id: 2,
	},
	{
		name: "Elon Musk",
		score: 0,
		id: 3,
	},
];

var nextId = 4;

// Define Stopwatch component class
var Stopwatch = React.createClass({

	// Get initial state of Stopwatch component
	getInitialState: function() {
		return {
			running: false,
			elapsedTime: 0,
			previousTime: 0,
		}
	},

	componentDidMount: function() {
		this.interval = setInterval(this.onTick, 100);
	},

	componentWillUnmount: function() {
		clearInterval(this.interval);
	},

	// Time ticker function
	onTick: function() {
		if (this.state.running) {
			var now = Date.now();
			this.setState({
				previousTime: now,
				elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
			});
		}
		// Test onTick
		console.log('onTick');
	},

	// Start timer function
	onStart: function() {
		this.setState({ 
			running: true,
			previousTime: Date.now(),
		});

	},

	// Stop timer function
	onStop: function() {
		this.setState({ running: false });
	},

	// Reset timer function
	onReset: function() {
		this.setState({
			elapsedTime: 0,
			previousTime: Date.now(),
		});
	},

	render: function() {
		// Several ways to implement startStop
		/* var startStop;
		if (this.state.running) {
			startStop = <button>Stop</button>;
		} else {
			startStop = <button>Start</button>;
		}*/

		// As a ternary condition
		// var startStop = this.state.running ? <button>Stop</button> : <button>Start</button>;

		var seconds = Math.floor(this.state.elapsedTime / 1000);

		return (
			<div className="stopwatch">
				<h2>Stopwatch</h2>
				<div className="stopwatch-time">{seconds}</div>
				{
					this.state.running ? 
					<button onClick={this.onStop}>Stop</button> : 
					<button onClick={this.onStart}>Start</button> 
				}
				<button onClick={this.onReset}>Reset</button>
			</div>
		);
	}
});

// Define AddPlayerForm component class
var AddPlayerForm = React.createClass({
	propTypes: {
		onAdd: React.PropTypes.func.isRequired,
	},

	// Get initial state of AddPlayerForm component
	getInitialState: function() {
		return {
			name: "",
		};
	},

	// onNaneChange function
	onNameChange: function(e) {
		console.log('onNameChange', e.target.value);
		this.setState({name: e.target.value});
	},

	// onSubmit function
	onSubmit: function(e) {
		e.preventDefault();

		this.props.onAdd(this.state.name);
		this.setState({name: ""});
	},

	render: function() {
		return (
			<div className="add-player-form">
				<form onSubmit={this.onSubmit}>
					<input type="text" placeholder="Enter Player's Name" value={this.state.name} onChange={this.onNameChange}/>
					<input type="submit" value="Add Player" />
				</form>
			</div>
		);
	}
});

// Define Stats component
function Stats(props) {
	var totalPlayers = props.players.length;
	var totalPoints = props.players.reduce(function(total, player){
		return total + player.score;
	}, 0);

	return (
		<table className="stats">
			<tbody>
				<tr>
					<td>Player:</td>
					<td>{totalPlayers}</td>
				</tr>
				<tr>
					<td>Total Points:</td>
					<td>{totalPoints}</td>
				</tr>
			</tbody>
		</table>
	)
}

// Define Stats component proptypes
Stats.propTypes = {
	players: React.PropTypes.array.isRequired,
};

// Define Header component
function Header(props) {
	return(
		<div className="header">
			<Stats players={props.players}/>
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
	);
}

// Define Header component proptypes
Header.propTypes = {
	// Use isRequired function to check if property exists during runtime
	title: React.PropTypes.string.isRequired,
	players: React.PropTypes.array.isRequired,
};

// Define Counter component
function Counter(props) {
	return(
		<div className="counter">
	    <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
	    <div className="counter-score"> {props.score} </div>
	    <button className="counter-action increment" onClick={function() {props.onChange(+1);}}> + </button>
	  </div>
  );
}

// Define Counter component proptypes
Counter.propTypes = {
	score: React.PropTypes.number.isRequired,
	onChange: React.PropTypes.func.isRequired,
}

// Define Player component
function Player(props) {
	return(
		<div className="player">
	    <div className="player-name">
	    	<a className="remove-player" onClick={props.onRemove}>x</a>
	    	{props.name}
	    </div>
	    <div className="player-score">
	        <Counter score={props.score} onChange={props.onScoreChange}/>
	    </div>
		</div>
	);
}

// Define Player component proptypes
Player.propTypes = {
	// Use isRequired function to check if property exists during runtime
	name: React.PropTypes.string.isRequired,
	score: React.PropTypes.number.isRequired,
	onScoreChange: React.PropTypes.func.isRequired,
	onRemove: React.PropTypes.func.isRequired,
};

// Define Application component class
var Application = React.createClass({
	// Create property type(s)
	propTypes: {
		// Use isRequired function to check if property exists during runtime
		title: React.PropTypes.string,
		initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
			name: React.PropTypes.string.isRequired,
			score: React.PropTypes.number.isRequired,
			id: React.PropTypes.number.isRequired,
		})).isRequired,
	},

	// Define a default property type
	getDefaultProps: function() {
		return {
			title: "Scoreboard",
		}
	},

	// Get the initial state of player(s)
	getInitialState: function() {
		return {
			players: this.props.initialPlayers,
		};
	},

	// Change the score
	onScoreChange: function(index, delta) {
		// Test onScoreChange
		// console.log('onScoreChange', index, delta);
		this.state.players[index].score += delta;
		this.setState(this.state);
	},

	// Define a new player
	onPlayerAdd: function(name) {
		// Test onPlayerAdd
		// console.log("Player added:", name);	
		this.state.players.push({
				name: name,
				score: 0,
				id: nextId,
		});
		this.setState(this.state);
		nextId += 1;
	},

	onRemovePlayer: function(index) {
		// Test onRemovePlayer
		// console.log('remove', index);
		// remove one player
		this.state.players.splice(index, 1);
		this.setState(this.state);
	},

	// Render the Application component
	render: function() {
		return (
	    <div className="scoreboard">
	      <Header title={this.props.title} players={this.state.players}/>

	      <div className="players">
          {this.state.players.map(function(player, index) {
    				return (
    					<Player 
    					onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
    					onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
    					name={player.name} 
    					score={player.score} 
    					key={player.id} />
    				);
    			}.bind(this))}
	      </div>
	      <AddPlayerForm onAdd={this.onPlayerAdd}/>
	    </div>
		);
	}
});

let target = document.getElementById('container');

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, target);