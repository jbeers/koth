const { floor, random } = Math;

class RandomBot {
	constructor( token ){
		this.token = token;
	}

	getName(){
		return 'RandomBot';
	}

	takeTurn( board, width, height ){
		const available = this.getAvailableColumns( board, height );
		
		return !available.length
			? this.random( board )
			: available[ this.random( available ) ];
	}

	getAvailableColumns( board, height ){
		return board.map( ( col, i ) => col.length < height ? i : -1 )
			.filter( i => i !== -1 );
	}

	random( array ){
		return floor( random() * array.length );
	}
}


module.exports = RandomBot;