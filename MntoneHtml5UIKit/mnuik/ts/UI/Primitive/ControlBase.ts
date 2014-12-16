// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.UI.Primitive
{
	"use strict";

	export class ControlBase
	{
		protected _element: HTMLElement;
		protected _options: any;

		constructor( element: HTMLElement, options: any )
		{
			if( element != null )
			{
				this._element = element;
				if( ( <any>this._element ).mnControl )
				{
					throw new Error( this.controlName + ".mnControl is defined!!" );
				}
			}
			else
			{
				this._element = G.document.createElement( this.tagName || "div" );
			}

			this._options = Utilities.clone( options );

			if( !this._element.hasAttribute( G.mkControlName ) )
			{
				this._element.setAttribute( G.mkControlName, this.controlName );
			}
			if( this.className != null )
			{
				this._element.classList.add( this.className );
			}

			( <any>this._element ).mnControl = this;
		}

		addEventListener( type: string, listener: EventListener, useCapture: boolean ): void
		{
			this._element.addEventListener( type, listener, useCapture );
		}

		removeEventListener( type: string, listener: EventListener, useCapture: boolean ): void
		{
			this._element.removeEventListener( type, listener, useCapture );
		}

		static getChildElements( self: ControlBase ): Array<HTMLElement>
		{
			var children = self._element.children;
			var ret: Array<HTMLElement> = new Array( children.length );
			for( var i = 0; i < children.length; ++i )
			{
				ret[i] = <HTMLElement>children[i];
			}
			return ret;
		}

		get element(): HTMLElement
		{
			return this._element;
		}

		get options(): any
		{
			return this._options;
		}

		get controlName(): string
		{
			throw new Error( "Cannot access property controlName." );
		}

		get tagName(): string
		{
			throw new Error( "Cannot access property tagName." );
		}

		get className(): string
		{
			throw new Error( "Cannot access property className." );
		}
	}
}