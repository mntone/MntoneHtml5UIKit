// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Input
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
				if( map.lisntener == listener && map.useCapture === useCapture )
				{
					eventsMaps.slice( i, 1 );
					return map;
				}
			}
		}
	}
} 