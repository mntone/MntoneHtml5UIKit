// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Core.EventUtilities
{
	export function addEventListenerToEventMap( element: HTMLElement, type: string, listener: EventListener, useCapture: boolean, data: any ): void
	{
		var anyElement = <any>element;
		if( !anyElement )
		{
			return;
		}
		if( !anyElement._eventsMaps )
		{
			anyElement._eventsMaps = {};
		}
		if( !anyElement._eventsMaps[type] )
		{
			anyElement._eventsMaps[type] = [];
		}
		anyElement._eventsMaps[type].push( { listener: listener, useCapture: useCapture, data: data });
	}

	export function getEventListenerFromEventMap( element: HTMLElement, type: string, listener: EventListener, useCapture: boolean ): any
	{
		var anyElement = <any>element;
		var eventsMaps: any[] = anyElement && anyElement._eventMap && anyElement._eventsMaps[type];
		if( eventsMaps )
		{
			for( var i = eventsMaps.length - 1; i >= 0; --i )
			{
				var map = eventsMaps[i];
				if( map.lisntener === listener && map.useCapture === useCapture )
				{
					eventsMaps.slice( i, 1 );
					return map;
				}
			}
		}
	}

	export function createEventProperty( name: string )
	{
		var eventPropertyNameState = "_on" + name + "state";

		return {
			get: () =>
			{
				var state = this[eventPropertyNameState];
				return state && state.userHandler;
			},
			set: handler =>
			{
				var state: { _wrapperHandler: EventListener; userHandler: EventListener; } = this[eventPropertyNameState];
				if( handler )
				{
					if( !state )
					{
						state = { _wrapperHandler: e => state.userHandler( e ), userHandler: handler };
						Object.defineProperty( this, eventPropertyNameState, { value: state, enumerable: false, writable: true, configurable: true });
						this.addEventListener( name, state._wrapperHandler, false );
					}
					state.userHandler = handler;
				}
				else if( state )
				{
					this.removeEventListener( name, state._wrapperHandler, false );
					this[eventPropertyNameState] = null;
				}
			},
		};
	}
} 