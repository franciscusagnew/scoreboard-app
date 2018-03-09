function Application(props) {
  return(
    <div className="scoreboard">
        <div className="header">
            <h1>{props.title}</h1>
        </div>
        <div className="players">
            <div className="player">
                <div className="player-name">
                    Franciscus Agnew
                </div>
                <div className="player-score">
                    <div className="counter">
                        <button className="counter-action decrement"> - </button>
                        <div className="counter-score"> 31 </div>
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

// ReactDOM.render(<h1>Hello, World!</h1>, target);

ReactDOM.render(<Application/>, target);