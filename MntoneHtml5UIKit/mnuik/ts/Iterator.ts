// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Parser
{
	"use strict";

	export class Iterator<T>
	{
		private _source: T[];
		private _currentPosition: number;

		constructor( source: T[], position?: number )
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

		clone(): Iterator<T>
		{
			return new Iterator<T>( this._source, this._currentPosition );
		}

		get source(): T[]
		{
			return this._source;
		}

		get position(): number
		{
			return this._currentPosition;
		}

		get current(): T
		{
			return this._source[this._currentPosition];
		}
	}
} 