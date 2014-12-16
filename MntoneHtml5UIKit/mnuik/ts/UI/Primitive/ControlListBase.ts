// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.UI.Primitive
{
	"use strict";

	export class ControlListBase extends ControlBase
	{
		protected _items: ControlListItemBase[];
		protected _currentIndex: number;

		constructor( element: HTMLElement, options: any )
		{
			super( element, options );

			( <any>this.element ).mnParentElement = true;

			this._items = ControlBase.getChildElements( this ).map( e =>
				ControlProcessor._processChildInternal( this, e, this.childDeclaration ) );

			if( this._items.length !== 0 )
			{
				var selectedItems = this._items.filter( c => c.options.selected === true ).reverse();
				this._currentIndex = selectedItems.length !== 0 ? this._items.indexOf( selectedItems[0] ) : 0;

				this._items.forEach( ( c, i ) =>
				{
					var f = this._currentIndex === i;
					c.element.setAttribute( "aria-selected", f ? "true" : "false" );
					if( f )
					{
						c.element.classList.add( c.classNameSelected );
					}
				});
			}
			else
			{
				this._currentIndex = -1;
			}
		}

		get selectedIndex(): number
		{
			if( this._items.length === 0 )
			{
				return -1;
			}
			return this._currentIndex;
		}

		set selectedIndex( index: number )
		{
			if( this._currentIndex != index && index >= 0 && index < this._items.length )
			{
				// pack event
			}
		}

		private _select( child: ControlListItemBase ): void
		{
			if( child.selected === false )
			{
				child.element.setAttribute( "aria-selected", "true" );
				child.element.classList.add( child.classNameSelected );
			}
		}

		private _unselect( child: ControlListItemBase ): void
		{
			if( child.selected === true )
			{
				child.element.setAttribute( "aria-selected", "false" );
				child.element.classList.remove( child.classNameSelected );
			}
		}

		get childDeclaration(): { [key: string]: typeof Primitive.ControlListItemBase }
		{
			throw new Error( "Cannot access property childDeclaration." );
		}
	}
}