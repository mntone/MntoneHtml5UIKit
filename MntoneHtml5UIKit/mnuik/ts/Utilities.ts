// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Utilities
{
	"use strict";

	export function isUndefined( value: any ): boolean
	{
		return value === undefined;
	}

	export function isNull( value: any ): boolean
	{
		return !isUndefined( value ) && value == null;
	}

	export function isFunction( value: any ): boolean
	{
		return typeof value === "function";
	}

	export function clone( value: any ): any
	{
		var ret = {};
		if( value != null )
		{
			Object.keys( value ).forEach( key => ret[key] = value[key] );
		}
		return ret;
	}
}