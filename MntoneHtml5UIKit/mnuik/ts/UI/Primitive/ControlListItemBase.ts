// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.UI.Primitive
{
	"use strict";

	export class ControlListItemBase extends ControlBase
	{
		private _parent: ControlListBase;
		private _selected: boolean;

		constructor( element: HTMLElement, parent: ControlListBase, options: any )
		{
			super( element, options );

			this._parent = parent;

			this._selected = false;
		}

		get parent(): ControlListBase
		{
			return this._parent;
		}

		get selected(): boolean
		{
			return this._selected;
		}

		set selected( value: boolean )
		{
			if( this._selected !== value )
			{
				this._selected = value;
			}
		}

		get classNameSelected(): string
		{
			throw new Error( "Cannot access property classNameSelected." );
		}
	}
}