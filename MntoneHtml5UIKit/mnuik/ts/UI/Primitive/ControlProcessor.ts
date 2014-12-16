// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.UI.Primitive
{
	"use strict";

	export module ControlProcessor
	{
		var _controls: { [key: string]: typeof ControlBase } = {};

		export function register( name: string, controlClass: typeof ControlBase ): boolean
		{
			if( _controls[name] == null )
			{
				_controls[name] = controlClass;
				return true;
			}
			return false;
		}

		export function _processChildInternal( parent: ControlListBase, element: HTMLElement, controls: { [key: string]: typeof Primitive.ControlListItemBase } ): ControlListItemBase
		{
			var tagName = element.tagName;
			if( tagName == null )
			{
				throw new Error( "Cannot find tag name." );
			}

			if( controls[tagName] == null )
			{
				throw new Error( "Cannot find the control for tag " + tagName + "." );
			}

			var optionsStr = element.getAttribute( G.mkOptionsName );
			var options;
			if( optionsStr != null && options !== "" )
			{
				options = Parser.parse( optionsStr );
			}

			return new controls[tagName]( element, parent, options );
		}

		export function process( element: HTMLElement ): ControlBase
		{
			var attr = element.getAttribute( G.mkControlName );
			if( attr == null )
			{
				throw new Error( "Cannot find attribute " + G.mkControlName + "." );
			}

			if( _controls[attr] == null )
			{
				throw new Error( "Cannot find control " + attr + "." );
			}

			var optionsStr = element.getAttribute( G.mkOptionsName );
			var options;
			if( optionsStr != null && options !== "" )
			{
				options = Parser.parse( optionsStr );
			}

			return new _controls[attr]( element, options );
		}
	}
}