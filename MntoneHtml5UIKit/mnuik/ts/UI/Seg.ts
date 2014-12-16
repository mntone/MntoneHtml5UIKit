// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.UI
{
	"use strict";

	export class Seg extends Primitive.ControlListBase
	{
		static _controlName = "MNKit.UI.Seg";
		private static _tagName ="div";
		private static _className = "mk-seg";
		static _childDeclaration: { [key: string]: typeof Primitive.ControlListItemBase } = {};

		constructor( element: HTMLDivElement, options?: any )
		{
			super( element, options );
		}

		get controlName(): string
		{
			return Seg._controlName;
		}

		get tagName(): string
		{
			return Seg._tagName;
		}

		get className(): string
		{
			return Seg._className;
		}

		get childDeclaration(): { [key: string]: typeof Primitive.ControlListItemBase }
		{
			return Seg._childDeclaration;
		}
	}
	Primitive.ControlProcessor.register( Seg._controlName, Seg );
}