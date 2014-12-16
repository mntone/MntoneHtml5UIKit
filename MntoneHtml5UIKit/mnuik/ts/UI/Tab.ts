// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.UI
{
	"use strict";

	export class Tab extends Primitive.ControlListBase
	{
		static _controlName = "MNKit.UI.Tab";
		private static _tagName = "div";
		private static _className = "mk-tab";
		static _childDeclaration: { [key: string]: typeof Primitive.ControlListItemBase } = {};

		constructor( element: HTMLDivElement, options?: any )
		{
			super( element, options );
		}

		get controlName(): string
		{
			return Tab._controlName;
		}

		get tagName(): string
		{
			return Tab._tagName;
		}

		get className(): string
		{
			return Tab._className;
		}

		get childDeclaration(): { [key: string]: typeof Primitive.ControlListItemBase }
		{
			return Tab._childDeclaration;
		}
	}
	Primitive.ControlProcessor.register( Tab._controlName, Tab );
}