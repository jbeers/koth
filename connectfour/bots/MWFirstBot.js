
class MWFirstBot {
	constructor( token ){
		this.token = token;
	}

	moveFirst(){
		return this.token == 'r';
	}

	getEnemyToken(){
		return this.token == 'r' ? 'b' : 'r' ;
	}

	getName(){
		return 'MWFirstBot';
	}

	getAvailableColumns( board, height ){
		return board.map( ( col, i ) => col.length < height ? i : -1 )
			.filter( i => i !== -1 );
	}

	getFirstAvailableMove( board, width, height ){
		const available = this.getAvailableColumns( board, height );
		return available.find( element => element == 3 ) ? 3 : available[0];
	}

	takeTurn( board, width, height ){
		var me = this;
		const available = this.getAvailableColumns( board, height );

		if(me.moveFirst()){
			return board.findIndex( column => column.length < height );
			return me.moveFirstStrat( board, width, height );
		}else{
			return me.moveSecondStrat( board, width, height );
		}
		return board.findIndex( column => column.length < height );
	}

	moveFirstStrat( board, width, height ){
		var me = this;
		return me.findMyWinCon( board, width, height );
	}

	moveSecondStrat( board, width, height ){
		var me = this;
		return me.findMyWinCon( board, width, height );
	}

	getRowNumber( board, width, height ){
		if( board[0] == undefined || board[1] == undefined || board[2] == undefined || board[3] == undefined || board[4] == undefined || board[5] == undefined || board[6] == undefined ){
			return 0;
		}else if( board[0][1] == undefined || board[1][1] == undefined || board[2][1] == undefined || board[3][1] == undefined || board[4][1] == undefined || board[5][1] == undefined || board[6][1] == undefined ){
			return 1;
		}
		else if( board[0][2] == undefined || board[1][2] == undefined || board[2][2] == undefined || board[3][2] == undefined || board[4][2] == undefined || board[5][2] == undefined || board[6][2] == undefined ){
			return 2;
		}
		else if( board[0][3] == undefined || board[1][3] == undefined || board[2][3] == undefined || board[3][3] == undefined || board[4][3] == undefined || board[5][3] == undefined || board[6][3] == undefined ){
			return 3;
		}else if( board[0][4] == undefined || board[1][4] == undefined || board[2][4] == undefined || board[3][4] == undefined || board[4][4] == undefined || board[5][4] == undefined || board[6][4] == undefined ){
			return 4;
		}else if( board[0][5] == undefined || board[1][5] == undefined || board[2][5] == undefined || board[3][5] == undefined || board[4][5] == undefined || board[5][5] == undefined || board[6][5] == undefined ){
			return 5;
		}else if( board[0][6] == undefined || board[1][6] == undefined || board[2][6] == undefined || board[3][6] == undefined || board[4][6] == undefined || board[5][6] == undefined || board[6][6] == undefined ){
			return 6;
		}
		return 0;
	}

	findMyWinCon( board, width, height ){
		var me = this;
		var myToken = me.token;
		for( var i=0; i<width; i++ ){
			var boardPosI = board[i];
			if( ( boardPosI[0] == myToken && boardPosI[1] == myToken && boardPosI[2] == myToken && boardPosI[3] == undefined )
				|| ( boardPosI[1] == myToken && boardPosI[2] == myToken && boardPosI[3] == myToken && boardPosI[4] == undefined )
				|| ( boardPosI[2] == myToken && boardPosI[3] == myToken && boardPosI[4] == myToken && boardPosI[5] == undefined )
				){
				return i;
			}
		}
		var rowNumber = me.getRowNumber(board, width, height);
		return me.findMyWinConRNum( board, width, height, rowNumber );
	}

	findMyWinConRNum( board, width, height, number ){
		var me = this;
		var myToken = me.token;
		if( number == 0 ){
			if( board[0] == undefined && board[1] == myToken && board[2] == myToken && board[3] == myToken ){
				return 0;
			}else if( board[1] == undefined && board[2] == myToken && board[3] == myToken && board[4] == myToken ){
				return 1;
			}else if( board[2] == undefined && board[3] == myToken && board[4] == myToken && board[5] == myToken ){
				return 2;
			}else if( board[3] == undefined && board[4] == myToken && board[5] == myToken && board[6] == myToken ){
				return 3;
			}else if( board[0] == myToken && board[1] == undefined && board[2] == myToken && board[4] == myToken ){
				return 1;
			}else if( board[1] == myToken && board[2] == undefined && board[3] == myToken && board[4] == myToken ){
				return 2;
			}else if( board[2] == myToken && board[3] == undefined && board[4] == myToken && board[5] == myToken ){
				return 3;
			}else if( board[3] == myToken && board[4] == undefined && board[5] == myToken && board[6] == myToken ){
				return 4;
			}else if( board[0] == myToken && board[1] == myToken && board[2] == undefined && board[4] == myToken ){
				return 2;
			}else if( board[1] == myToken && board[2] == myToken && board[3] == undefined && board[4] == myToken ){
				return 3;
			}else if( board[2] == myToken && board[3] == myToken && board[4] == undefined && board[5] == myToken ){
				return 4;
			}else if( board[3] == myToken && board[4] == myToken && board[5] == undefined && board[6] == myToken ){
				return 5;
			}else if( board[0] == myToken && board[1] == myToken && board[2] == myToken && board[4] == undefined ){
				return 3;
			}else if( board[1] == myToken && board[2] == myToken && board[3] == myToken && board[4] == undefined ){
				return 4;
			}else if( board[2] == myToken && board[3] == myToken && board[4] == myToken && board[5] == undefined ){
				return 5;
			}else if( board[3] == myToken && board[4] == myToken && board[5] == myToken && board[6] == undefined ){
				return 6;
			}
			
		}else{
			if( board[0][number] == undefined && board[1][number] == myToken && board[2][number] == myToken && board[3][number] == myToken ){
				return 0;
			}else if( board[1][number] == undefined && board[2][number] == myToken && board[3][number] == myToken && board[4][number] == myToken ){
				return 1;
			}else if( board[2][number] == undefined && board[3][number] == myToken && board[4][number] == myToken && board[5][number] == myToken ){
				return 2;
			}else if( board[3][number] == undefined && board[4][number] == myToken && board[5][number] == myToken && board[6][number] == myToken ){
				return 3;
			}else if( board[0][number] == myToken && board[1][number] == undefined && board[2][number] == myToken && board[4][number] == myToken ){
				return 1;
			}else if( board[1][number] == myToken && board[2][number] == undefined && board[3][number] == myToken && board[4][number] == myToken ){
				return 2;
			}else if( board[2][number] == myToken && board[3][number] == undefined && board[4][number] == myToken && board[5][number] == myToken ){
				return 3;
			}else if( board[3][number] == myToken && board[4][number] == undefined && board[5][number] == myToken && board[6][number] == myToken ){
				return 4;
			}else if( board[0][number] == myToken && board[1][number] == myToken && board[2][number] == undefined && board[4][number] == myToken ){
				return 2;
			}else if( board[1][number] == myToken && board[2][number] == myToken && board[3][number] == undefined && board[4][number] == myToken ){
				return 3;
			}else if( board[2][number] == myToken && board[3][number] == myToken && board[4][number] == undefined && board[5][number] == myToken ){
				return 4;
			}else if( board[3][number] == myToken && board[4][number] == myToken && board[5][number] == undefined && board[6][number] == myToken ){
				return 5;
			}else if( board[0][number] == myToken && board[1][number] == myToken && board[2][number] == myToken && board[4][number] == undefined ){
				return 3;
			}else if( board[1][number] == myToken && board[2][number] == myToken && board[3][number] == myToken && board[4][number] == undefined ){
				return 4;
			}else if( board[2][number] == myToken && board[3][number] == myToken && board[4][number] == myToken && board[5][number] == undefined ){
				return 5;
			}else if( board[3][number] == myToken && board[4][number] == myToken && board[5][number] == myToken && board[6][number] == undefined ){
				return 6;
			}
		}
		return me.find3InARow( board, width, height );
	}

	find3InARow( board, width, height ){
		var me = this;
		for( var i=0; i<width; i++ ){
			var boardPosI = board[i];
			if( boardPosI[0] != undefined ){
				var columnI = boardPosI[0];
				if( boardPosI[1] != undefined ){
					columnI = columnI + boardPosI[1];
					if( boardPosI[2] != undefined ){
						columnI = columnI + boardPosI[2];
						if( boardPosI[3] != undefined ){
							columnI = columnI + boardPosI[3];
							if( ( columnI.includes('BBB') && !columnI.includes('BBBR') ) || ( columnI.includes('RRR') && !columnI.includes('RRRB') ) ){
								return i;
							}
						}else{
							return i;
						}
					}
				}
			}
		}
		var rowNumber = me.getRowNumber(board, width, height);
		return me.find3InARowRNum( board, width, height, rowNumber, me.getEnemyToken() );
	}

	find3InARowRNum( board, width, height, number, token ){
		var me = this;
		if( number == 0 ){
			if( board[0] == token && board[1] == undefined && board[2] == token ){
				return 1;
			}else if( board[1] == token && board[2] == undefined && board[3] == token ){
				return 2;
			}else if( board[2] == token && board[3] == undefined && board[4] == token ){
				return 3;
			}else if( board[3] == token && board[4] == undefined && board[5] == token ){
				return 4;
			}else if( board[4] == token && board[5] == undefined && board[6] == token ){
				return 5;
			}
		}else{
			if( board[0][number] == token && board[1][number] == undefined && board[2][number] == token ){
				return 1;
			}else if( board[1][number] == token && board[2][number] == undefined && board[3][number] == token ){
				return 2;
			}else if( board[2][number] == token && board[3][number] == undefined && board[4][number] == token ){
				return 3;
			}else if( board[3][number] == token && board[4][number] == undefined && board[5][number] == token ){
				return 4;
			}else if( board[4][number] == token && board[5][number] == undefined && board[6][number] == token ){
				return 5;
			}
		}
		return me.getFirstAvailableMove( board, width, height );
	}

}

module.exports = MWFirstBot;