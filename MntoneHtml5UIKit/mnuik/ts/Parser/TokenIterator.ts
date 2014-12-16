// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Parser
{
	"use strict";

	export class TokenIterator
	{
		private _source: TokenInfo[];
		private _currentPosition: number;

		constructor( source: TokenInfo[], position?: number )
		{
			this._source = source;
			this._currentPosition = position || -1;
		}

		moveNext(): boolean
		{
			if( this._currentPosition + 1 >= this._source.length )
			{
				return false;
			}

			++this._currentPosition;
			return true;
		}

		reset(): void
		{
			this._currentPosition = -1;
		}

		clone(): TokenIterator
		{
			return new TokenIterator( this._source, this._currentPosition );
		}

		get source(): TokenInfo[]
		{
			return this._source;
		}

		get position(): number
		{
			return this._currentPosition;
		}

		get current(): TokenInfo
		{
			return this._source[this._currentPosition];
		}
	}
} 