// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Parser
{
	"use strict";

	class _ParserInternal
	{
		private _text: string;
		private _tokens: TokenInfo[];
		private _it: Iterator<TokenInfo>;

		constructor( text: string )
		{
			this._text = text;
			this._tokens = Lexer.lex( this._text );
			this._it = new Iterator<TokenInfo>( this._tokens );
		}

		parse(): any
		{
			var ret = this.readOptionsObjectProperties();
			this.readAndCheckValue( TokenType.eof );
			return ret;
		}

		private error(): void
		{
			throw new Error( "Parse error." );
		}

		private tryValue( expected: TokenType ): boolean
		{
			return this._it.current.type === expected;
		}

		private readAndTryValue( expected: TokenType ): boolean
		{
			var it = this._it.clone();
			return it.moveNext() && it.current.type === expected;
		}

		private readAndCheckValue( expected: TokenType ): void
		{
			if( !this._it.moveNext() || !this.tryValue( expected ) )
			{
				this.error();
			}
		}

		private readValue(): any
		{
			if( this._it.moveNext() )
			{
				switch( this._it.current.type )
				{
					case TokenType.nullLiteral:
						return null;

					case TokenType.trueLiteral:
						return true;

					case TokenType.falseLiteral:
						return false;

					case TokenType.numberLiteral:
						return +this._it.current.value;

					case TokenType.stringLiteral:
						return this._it.current.value;
				}
			}
			this.error();
		}

		private tryAndReadObjectPropertyKey(): any
		{
			switch( this._it.current.type )
			{
				case TokenType.nullLiteral:
				case TokenType.trueLiteral:
				case TokenType.falseLiteral:
				case TokenType.stringLiteral:
				case TokenType.identifier:
					return this._it.current.value;

				case TokenType.numberLiteral:
					return +this._it.current.value;
			}
			return null;
		}

		private readObjectProperty( ret: any ): any
		{
			var key = this.tryAndReadObjectPropertyKey();
			if( key != null )
			{
				this.readAndCheckValue( TokenType.colon )
				var value = this.readValue();
				ret[key] = value;
			}
		}

		private readOptionsObjectProperties(): any
		{
			var ret = {};
			while( this._it.moveNext() )
			{
				this.readObjectProperty( ret );
				if( !this.readAndTryValue( TokenType.comma ) )
				{
					break;
				}
				this._it.moveNext();
			}
			return ret;
		}
	}

	export function parse( text: string ): any
	{
		return new _ParserInternal( text ).parse();
	}
}