const { floor, random } = Math;
const connectfour = require('../ConnectFour');

class VictorBot {
    
	constructor( token ){
        this.token = token;
        this.opponentMoves = [];
        this.myMoves = [];
        this.height
	}

	getName(){
		return 'VictorBot';
    }
    
    getOtherToken() {
        return this.token == 'r' ? 'b' : 'r';
    }

	takeTurn( board, width, height ){
        this.height = height;
        let availableMoves = this.getAvailableColumns( board, height);
        
        let opponentMoves = this.findDefenseMoves( board ).filter( column => availableMoves.includes( column ) );
        let potentialMoves = this.findAttackMoves( board ).filter( column => availableMoves.includes( column ) );
        let matchingMoves = opponentMoves.filter( column => potentialMoves.includes( column ) );

        if ( matchingMoves.length ) return matchingMoves[0];
        else if ( opponentMoves.length ) return opponentMoves[0];
        else if ( potentialMoves.length ) return potentialMoves[0];
        else {
            const available = this.getAvailableColumns( board, height );
            return !available.length ? this.random( board ) : available[ this.random( available ) ];
        }
    }

	getAvailableColumns( board, height ){
		return board.map( ( col, i ) => col.length < height ? i : -1 )
			.filter( i => i !== -1 );
	}

	random( array ){
		return floor( random() * array.length );
	}

	pivot( board ){
		return board.reduce( ( acc, col, i ) => {
			col.forEach( ( slot, j ) => {
				acc[ j ] = acc[ j ] || [];
				acc[ j ][ i ] = slot;
			});
			return acc;
		}, [] );
	}
    
    findAttackMoves( board, limit = 0 ) {
        let verticals = this.findVerticalMoves( board, this.token, limit );
        let horizontals = this.findHorizontalMoves(board, this.token, limit );
        return verticals.concat( horizontals );
    }
    
    findDefenseMoves( board, limit = 2 ) {
        let verticals = this.findVerticalMoves( board, this.getOtherToken(), limit );
        let horizontals = this.findHorizontalMoves(board, this.getOtherToken(), limit );
        return verticals.concat( horizontals );
    }

    findVerticalMoves( board, token, limit ) {
        let moves = [];

        for ( let x = 0; x < board.length; x++ ) {
            let consecutivePoints = 0;
            for ( let y = 0; y < this.height; y++ ) {
                if ( board[x][y] == token ) consecutivePoints++;
            }

            if ( consecutivePoints > limit ) moves.push( x );
        }

        return moves;
    }

    findHorizontalMoves( board, token, limit ) {
        let moves = [];
        let pivotedBoard = this.pivot( board );
        for ( let x = 0; x < pivotedBoard.length; x++ ) {
            let consecutivePoints = 0;
            for ( let y = 0; y < this.height; y++ ) {
                if ( pivotedBoard[x][y] == token ) consecutivePoints++;
                if ( consecutivePoints > limit ) moves.push( y );
            }
        }

        return moves;
    }
}

module.exports = VictorBot;