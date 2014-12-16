// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Parser.Lexer
{
	"use strict";

	function _isWhitespace( code: number ): boolean
	{
		switch( code )
		{
			case 0x0009:	// tab
			case 0x000b:	// vertical tab
			case 0x000c:	// form feed
			case 0x0020:	// space
			case 0x00a0:	// no-break space
				return true;

			case ( code < 0x1680 ) && code:
				return false;

			case 0xfeff:	// BOM
			case 0x1680:	// ogham space mark
			case 0x180e:	// mongolian vowel separator
			case ( code >= 0x2000 && code <= 0x200a ) && code:
			// em/en quad, en/em space, three/four/six-per-em space, figure space, punctuation space, thin space, and hair space
			case 0x202f:	// narrow no-break space
			case 0x205f:	// medium mathematical space
			case 0x3000:	// ideographic space
				return true;

			default:
				return false;
		}
	}

	function _isLineTerminator( code: number ): boolean
	{
		return code === 0x0a /* LF */
			|| code === 0x0d /* CR */
			|| code === 0x2028 /* line separator */
			|| code === 0x2029 /* paragraph separator */;
	}

	function _isUpperCaseAlphabet( code: number )
	{
		return code >= 65 /* A */ && code <= 90 /* Z */;
	}

	function _isLowerCaseAlphabet( code: number )
	{
		return code >= 97 /* a */ && code <= 122 /* z */;
	}

	function _isDecimalDigit( code: number )
	{
		return code >= 48 /* 0 */ && code <= 57 /* 9 */;
	}

	function _isIdentifier( code: number ): boolean
	{
		return code === 36 /* $ */
			|| _isUpperCaseAlphabet( code )
			|| code === 95 /* _ */
			|| _isLowerCaseAlphabet( code );
	}

	function _readIfTrue( it: StringIterator, startPosition: number, func: ( code: number ) => boolean ): string
	{
		var code;
		while( ( code = it.getCode() ) != -1 )
		{
			if( !func( code ) )
			{
				break;
			}
			++it.position;
		}
		return it.source.substring( startPosition, it.position );
	}

	function _readStringLiteral( it: StringIterator, quoteCode: number ): string
	{
		var ret = "";
		var startPosition = it.position;

		var code: number;
		while( ( code = it.getCode() ) != -1 )
		{
			if( code == 92 /* \ */ )
			{
				++it.position;
				var code = it.getCode();
				if( code == quoteCode )
				{
					ret += it.source.substring( startPosition, it.position - 1 );
					startPosition = it.position;
					++it.position;
				}
				continue;
			}
			++it.position;
			if( code == quoteCode )
			{
				ret += it.source.substring( startPosition, it.position - 1 );
				break;
			}
		}
		if( code != quoteCode )
		{
			ret += it.source.substr( startPosition );
		}
		return ret;
	}

	function _lex( ret: TokenInfo[], it: StringIterator )
	{
		var code: number;
		while( ( code = it.getCode() ) != -1 )
		{
			var token: TokenInfo;

			var startPosition = it.position++;
			if( _isWhitespace( code ) || _isLineTerminator( code ) )
			{
				var str = _readIfTrue( it, startPosition, c => _isWhitespace( c ) && _isLineTerminator( c ) );
				token = new TokenInfo( TokenType.separator, str );
				continue;
			}
			else if( code === 34 /* " */ || code === 39 /* ' */ )
			{
				var str = _readStringLiteral( it, code );
				token = new TokenInfo( TokenType.stringLiteral, str );
			}
			else if( code === 44 /* , */ )
			{
				token = TokenInfo.comma;
			}
			else if( code === 46 /* . */ )
			{
				token = TokenInfo.dot;
			}
			else if( _isDecimalDigit( code ) )
			{
				var str = _readIfTrue( it, startPosition, _isDecimalDigit );
				token = new TokenInfo( TokenType.numberLiteral, str );
			}
			else if( code === 58 /* : */ )
			{
				token = TokenInfo.colon;
			}
			else if( _isIdentifier( code ) )
			{
				var identifier = _readIfTrue( it, startPosition, _isIdentifier );
				if( identifier === "null" )
				{
					token = TokenInfo.nullLiteral;
				}
				else if( identifier === "true" )
				{
					token = TokenInfo.trueLiteral;
				}
				else if( identifier === "false" )
				{
					token = TokenInfo.falseLiteral;
				}
				else
				{
					token = new TokenInfo( TokenType.identifier, identifier );
				}
			}
			else
			{
				token = new TokenInfo( TokenType.error, it.getStringToEnd() );
				break;
			}

			ret.push( token );
		}
		if( ret[ret.length - 1].type !== TokenType.error )
		{
			ret.push( TokenInfo.eof );
		}
	}

	export function lex( text: string ): TokenInfo[]
	{
		var ret: TokenInfo[] = [];
		var it = new StringIterator( text );
		_lex( ret, it );
		return ret;
	}
}