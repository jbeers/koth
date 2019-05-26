const R = require( 'ramda' );



function findGameWinner( runLength, board ){
	const findWinner = R.pipe(
		R.groupWith( R.equals ),
		R.find( R.propEq( 'length', runLength ) ),
		R.defaultTo( [] ),
		R.last
	);

	const findLongestCol = R.pipe(
			R.map( R.prop( 'length' ) ),
			R.reduce( R.max, 0 )
		);

	const mapIndexToRow = array => R.pipe(
		R.lensIndex,
		R.view,
		R.map( R.__, array )
	);

	const pivot = array => R.pipe(
		findLongestCol,
		R.range( 0 ),
		R.map( mapIndexToRow( array ) )
	)( array );

	const findRowWinner = R.pipe(
		pivot,
		R.map( findWinner ),
		R.find( R.identity )
	);

	const findColumnWinner = R.pipe(
		R.map( findWinner ),
		R.find( R.identity )
	); 

	const findBoardWinner = array => R.or(
		findColumnWinner( array ),
		findRowWinner( array )
	);

	return findBoardWinner( board );
}


class ConnectFour {
	constructor( bots, width = 5, height = 5, runLength = 4 ){
		this.botOneToken = 'r';
		this.botTwoToken = 'b';

		this.width = width;
		this.height = height;
		this.botOne = new bots[ 0 ]( this.botOneToken );
		this.botTwo = new bots[ 1 ]( this.botTwoToken );
		this.runLength = runLength;

		this.turns = 0;
		this.currentBot = this.botOne;

		this.board = this.createBoard( width, height );
		this.findGameWinner = R.curry( findGameWinner )( runLength );
	}

	static * schedule( bots, matches ){
		const matched = Object.keys( bots ).reduce( ( acc, item, i, arr ) => {
			if( i + 1 === arr.length ){
				return acc;
			}

			const others = arr.slice( i + 1 );

			return acc.concat( others.map( other => [ item, other ] ) );
		}, [] ),
			halfMatches = matches / 2;

		for( let match of matched ){
			const matchBots = [ bots[ match[ 0 ] ], bots[ match[ 1 ] ] ];

			for( let i = 0; i < halfMatches; i++ ){
				yield matchBots;
			}

			matchBots.reverse();

			for( let i = halfMatches + 1; i <= matches; i++ ){
				yield matchBots;
			}
		}
	}

	runGame(){
		while( !this.winner ){
			this.loop();
		}

		return this.winner.getName();
	}

	createBoard( width, height ){
		const board = [];

		for( let i = 0; i < width; i++ ){
			board.push( [] );
		}

		return board;
	}

	loop(){
		this.turns++;
		const move = this.currentBot.takeTurn( this.getGameState(), this.width, this.height );
		const column = this.board[ move ];

		if( !column || column.length >= this.height ){
			this.winner = this.getOtherBot();
			return;
		}

		this.winner = this.findWinner();

		if( this.winner ){
			return;
		}

		this.board[ move ].push( this.getCurrentBotToken() );
		this.currentBot = this.getOtherBot();
	}

	findWinner(){
		const winner = this.getBotByToken( this.findGameWinner( this.board ) );

		return R.pipe(
			this.findGameWinner,
			this.getBotByToken.bind( this )
		)( this.board );
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

	getBotByToken( token ){
		return token === this.botOneToken
			? this.botOne
				: token === this.botTwoToken
					? this.botTwo
					: null;
	}

	getCurrentBotToken(){
		return this.currentBot === this.botOne
			? this.botOneToken
			: this.botTwoToken;			
	}

	getOtherBot(){
		return this.currentBot === this.botOne
			? this.botTwo
			: this.botOne;
	}

	getGameState(){
		return this.board.map( col => col.slice() );
	}

	getPrettyBoard(){
		const board = this.getGameState();
		board.forEach( col => {
			for( var i = col.length - 1; i < this.height; i++ ){
				col.push( '_' );
			}
		});
		const output = this.pivot( board ).map( row => row.join( '' ) );

		output.unshift( '----------------------' );
		output.push( '----------------------' );

		return output.reverse().join( '\n' );
	}
}

module.exports = ConnectFour;