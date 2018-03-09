// Declare an array of Players
var PLAYERS = [
	{
		name: "Franciscus Agnew",
		score: 12,
		id: 1,
	},
	{
		name: "Steve Jobs",
		score: 99,
		id: 2,
	},
	{
		name: "Elon Musk",
		score: 60,
		id: 3,
	},
]

// Add a Header component
function Header(props) {
	return(
		<div className="header">
            <h1>{props.title}</h1>
        </div>
	);
}

Header.propTypes = {
	// Use isRequired function to check if property exists during runtime
	title: React.PropTypes.string.isRequired,
};

// Add a Counter component
function Counter(props) {
	return(
		<div className="counter">
	        <button className="counter-action decrement"> - </button>
	        <div className="counter-score"> {props.score} </div>
	        <button className="counter-action increment"> + </button>
	    </div>
    );
}

Counter.propTypes = {
	// Use isRequired function to check if property exists during runtime
	score: React.PropTypes.number.isRequired,
};

// Add a Player component
function Player(props) {
	return(
		<div className="player">
	        <div className="player-name">
	        	{props.name}
	        </div>
	        <div className="player-score">
	            <Counter score={props.score} />
	        </div>
	    </div>
	);
}

Player.propTypes = {
	// Use isRequired function to check if property exists during runtime
	name: React.PropTypes.string.isRequired,
	score: React.PropTypes.number.isRequired,
};


// Add Application component
function Application(props) {
  return(
    <div className="scoreboard">
        <Header title={props.title} />
        <div className="players">
            {
	    		props.players.map(function(player) {
	    			return <Player name={player.name} score={player.score} key={player.id} />
	    		})
	    	}
        </div>
    </div>
  );
}

// Create property type(s)
Application.propTypes = {
	// Use isRequired function to check if property exists during runtime
	// title: React.PropTypes.string.isRequired,
	title: React.PropTypes.string,
	players: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		score: React.PropTypes.number.isRequired,
		id: React.PropTypes.number.isRequired,
	})).isRequired,
};

// Define a default property type
Application.defaultProps = {
	title: "Game Scoreboard",
};

let target = document.getElementById('container');

ReactDOM.render(<Application players={PLAYERS}/>, target);