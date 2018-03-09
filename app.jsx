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
            <Player name="Franciscus Agnew" score={12} />
        </div>
    </div>
  );
}

// Create property type(s)
Application.propTypes = {
	title: React.PropTypes.string,
	// Use isRequired function to check if property exists during runtime
	// title: React.PropTypes.string.isRequired,
};

// Define a default property type
Application.defaultProps = {
	title: "Game Scoreboard",
};

let target = document.getElementById('container');

ReactDOM.render(<Application/>, target);