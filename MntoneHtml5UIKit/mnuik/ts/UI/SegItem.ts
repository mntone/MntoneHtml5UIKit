// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.UI
{
	"use strict";

	export class SegItem extends Primitive.ControlListItemBase
	{
		private static _controlName = "MNKit.UI.SegItem";
		private static _tagName = "button";
		private static _className = "mk-segitem";
		private static _classNameSelected = "mk-segitem-selected";

		constructor( element: HTMLElement, parent: Seg, options?: any )
		{
			super( element, parent, options );

			if( this.options.label )
			{
				this.element.innerText = this.options.label;
			}
		}

		get controlName(): string
		{
			return SegItem._controlName;
		}

		get tagName(): string
		{
			return SegItem._tagName;
		}

		get className(): string
		{
			return SegItem._className;
		}

		get classNameSelected(): string
		{
			return SegItem._classNameSelected;
		}
	}
	Seg._childDeclaration["BUTTON"] = SegItem;
}