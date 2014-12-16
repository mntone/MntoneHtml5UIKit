// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.UI
{
	"use strict";

	export class TabItem extends Primitive.ControlListItemBase
	{
		private static _controlName = "MNKit.UI.TabItem";
		private static _tagName = "div";
		private static _className = "mk-tabitem";
		private static _classNameSelected = "mk-tabitem-selected";

		constructor( element: HTMLElement, parent: Tab, options?: any )
		{
			super( element, parent, options );
		}

		get controlName(): string
		{
			return TabItem._controlName;
		}

		get tagName(): string
		{
			return TabItem._tagName;
		}

		get className(): string
		{
			return TabItem._className;
		}

		get classNameSelected(): string
		{
			return TabItem._classNameSelected;
		}
	}
	Tab._childDeclaration["BUTTON"] = TabItem;
}