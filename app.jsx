function Application(props) {
  return(
  	// .scoreboard
    <div className="scoreboard">
    	// .header
        <div className="header">
            <h1>{props.title}</h1>
        </div>
        // .players
        <div className="players">
        	// .player
            <div className="player">
            	// .player-name
                <div className="player-name">
                    Franciscus Agnew
                </div>
                // .player-score
                <div className="player-score">
                	// .counter
                    <div className="counter">
                    	// .counter-action .decrement
                        <button className="counter-action decrement"> - </button>
                        // .counter-score
                        <div className="counter-score"> 31 </div>
                        // .counter-action .increment
                        <button className="counter-action increment"> + </button>
                    </div>
                </div>
            </div>
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