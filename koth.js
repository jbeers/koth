const yargs = require( 'yargs' ),
	fs = require( 'fs' )
	path = require( 'path' );


const argv = yargs.usage( 'Usage: $0 [options]' )
	.alias( 'g', 'game' )
	.describe( 'g', 'The selected game' )
	.alias( 'b', 'bots' )
	.array( 'b' )
	.describe( 'b', 'The bots to include in the game' )
	.alias( 'm', 'matches' )
	.describe( 'm', 'The number of matches to play' )
	.demandOption( [ 'g' ] )
	.default( { m: 10 } )
	.help( 'h' )
	.alias( 'h', 'help' )
	.argv;


function runGame( game, bots, matches ){
	const results = [];

	for( let matchBots of game.schedule( bots, matches ) ){
		const match = new game( matchBots );

		const winner = match.runGame();

		results.push( winner );
	}

	return results.reduce( ( acc, result ) => {
		if( acc[ result ] === undefined ){
			acc[ result ] = 0;
		}

		acc[ result ]++;

		return acc;
	}, {} );
}

function getGame( gameName ){
	return require( path.join( getGameDir( gameName ), gameName + '.js' ) );
}

function getGameDir( gameName ){
	return path.join( __dirname, gameName.toLowerCase() );
}

function getBots( gameName, botNames ){
	const dirPath = path.join( getGameDir( gameName ), 'bots' );

	return fs.readdirSync( dirPath )
		.reduce( ( acc, file ) => {
			const fileName = path.basename( file, '.js' );

			if( !botNames.includes( fileName ) ){
				return acc;
			}

			acc[ fileName ] = require( path.join( dirPath, file ) );

			return acc;
		}, {} );
}

function run( args ){
	const results = runGame( getGame( argv.game ), getBots( argv.game, argv.bots || argv._ ), argv.matches );

	console.log( results );
}

run( argv );

