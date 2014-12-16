// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Parser
{
	"use strict";

	export class TokenInfo
	{
		private static _colon = new TokenInfo( TokenType.colon, ":" );
		private static _comma = new TokenInfo( TokenType.comma, "," );
		private static _dot = new TokenInfo( TokenType.dot, "." );
		private static _nullLiteral = new TokenInfo( TokenType.nullLiteral, "null" );
		private static _trueLiteral = new TokenInfo( TokenType.trueLiteral, "true" );
		private static _falseLiteral = new TokenInfo( TokenType.falseLiteral, "false" );
		private static _eof = new TokenInfo( TokenType.eof );

		private _type: TokenType;
		private _value: string;

		constructor( type: TokenType, value?: string )
		{
			this._type = type;
			this._value = value || "";
		}

		get type(): TokenType
		{
			return this._type;
		}

		get value(): string
		{
			return this._value;
		}

		static get colon(): TokenInfo
		{
			return TokenInfo._colon;
		}

		static get comma(): TokenInfo
		{
			return TokenInfo._comma;
		}

		static get dot(): TokenInfo
		{
			return TokenInfo._dot;
		}

		static get nullLiteral(): TokenInfo
		{
			return TokenInfo._nullLiteral;
		}

		static get trueLiteral(): TokenInfo
		{
			return TokenInfo._trueLiteral;
		}

		static get falseLiteral(): TokenInfo
		{
			return TokenInfo._falseLiteral;
		}

		static get eof(): TokenInfo
		{
			return TokenInfo._eof;
		}
	}
} 