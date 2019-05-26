

class FirstAvailableBot {
	constructor( token ){
		this.token = token;
	}

	getName(){
		return 'FirstAvailableBot';
	}

	takeTurn( board, width, height ){
		return board.findIndex( column => column.length < height );
	}
}


module.exports = FirstAvailableBot;