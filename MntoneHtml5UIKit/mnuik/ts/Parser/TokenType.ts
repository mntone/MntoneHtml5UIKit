// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Parser
{
	"use strict";

	export enum TokenType
	{
		separator,		// spaces
		colon,			// :
		comma,			// ,
		dot,			// .
		nullLiteral,	// null
		trueLiteral,	// true
		falseLiteral,	// false
		numberLiteral,	// [0-9]+
		stringLiteral,	// "..." or '...'
		identifier,
		eof,
		error,
	}
} 