// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Parser
{
	"use strict";

	export class StringIterator
	{
		private _source: string;
		private _position: number;

		constructor( source: string, position?: number )
		{
			this._source = source;
			this._position = position || 0;
		}

		getCode(): number
		{
			if( this._position + 1 > this._source.length )
			{
				return -1;
			}
			return this._source.charCodeAt( this._position );
		}

		getString( length: number ): string
		{
			if( this._position + length >= this._source.length )
			{
				return null;
			}
			return this._source.substr( this._position, length );
		}

		getStringToEnd(): string
		{
			return this._source.substr( this._position );
		}

		get source(): string
		{
			return this._source;
		}

		get position(): number
		{
			return this._position;
		}

		set position( pos: number )
		{
			this._position = pos;
		}
	}
} 