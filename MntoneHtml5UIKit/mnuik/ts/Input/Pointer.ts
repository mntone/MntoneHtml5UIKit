// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Input
{
	export enum PointerEventType
	{
		Down,
		Up,
		Enter,
		Leave,
		Over,
		Out,
		Move,
		Cancel,
	}

	var pointerEventTypeMap: { mouse: string; touch: string; pointer: string; mspointer: string; }[] = new Array( 8 );
	pointerEventTypeMap[PointerEventType.Down] = { mouse: "mousedown", touch: "touchstart", pointer: "pointerdown", mspointer: "MSPointerDown" };
	pointerEventTypeMap[PointerEventType.Up] = { mouse: "mouseup", touch: "touchend", pointer: "pointerup", mspointer: "MSPointerUp" };
	pointerEventTypeMap[PointerEventType.Enter] = { mouse: "mouseenter", touch: null, pointer: "pointerenter", mspointer: "MSPointerEnter" };
	pointerEventTypeMap[PointerEventType.Leave] = { mouse: "mouseleave", touch: null, pointer: "pointerleave", mspointer: "MSPointerLeave" };
	pointerEventTypeMap[PointerEventType.Over] = { mouse: "mouseover", touch: null, pointer: "pointerover", mspointer: "MSPointerOver" };
	pointerEventTypeMap[PointerEventType.Out] = { mouse: "mouseout", touch: null, pointer: "pointerout", mspointer: "MSPointerOut" };
	pointerEventTypeMap[PointerEventType.Move] = { mouse: "mousemove", touch: "touchmove", pointer: "pointermove", mspointer: "MSPointerMove" };
	pointerEventTypeMap[PointerEventType.Cancel] = { mouse: null, touch: "touchcancel", pointer: "pointercancel", mspointer: "MSPointerCancel" };

	var PointerEventProxy = ( function ()
	{
		function PointerEventProxy( eventObject: UIEvent, overrideProperities: any ): void
		{
			this._sourceEventObject = eventObject;
			Object.keys( overrideProperities ).forEach( key => Object.defineProperty( this, key, { value: overrideProperities[key] }) );
		}
		PointerEventProxy.prototype.preventDefault = function (): void
		{
			this._sourceEventObject.preventDefault();
		};
		[
		// Event
			"bubbles", "cancelable", "cancelBubble", "currentTarget", "defaultPrevented", "eventPhase", "isTrusted", "srcElement",
			"target", "timeStamp", "type",
			"AT_TARGET", "BUBBLING_PHASE", "CAPTURING_PHASE",
		// UIEvent
			"detail", "view",
		// MouseEvent
			"altKey", "bubbles", "buttons", "cancelable", "cancelBubble", "clientX", "clientY", "ctrlKey", "fromElement",
			"layerX", "layerY", "metaKey", "offsetX", "offsetY", "pageX", "pageY", "relatedTarget", "screenX", "screenY",
			"shiftKey", "toElement", "x", "y",
		// PointerEvent
			"height", "isPrimary", "pointerId", "pointerType", "pressure", "tiltX", "tiltY", "width",
		].forEach( key => Object.defineProperty( PointerEventProxy.prototype, key,
				{
					get: function ()
					{
						var source = this._sourceEventObject;
						var value = source[key];
						return Utilities.isFunction( value ) ? value.bind( source ) : value;
					},
					enumerable: true,
					configurable: true,
				}) );
		return PointerEventProxy;
	})();

	function _translateMSPointerEvent( callback: any, eventObject: any )
	{
		var prop: any = {};

		var msp = ( <any>G.window ).MSPointerEvent;
		switch( eventObject.pointerType )
		{
			case msp.MSPOINTER_TYPE_TOUCH:
				prop.pointerType = "touch";
				break;
			case msp.MSPOINTER_TYPE_PEN:
				prop.pointerType = "pen";
				break;
			case msp.MSPOINTER_TYPE_MOUSE:
				prop.pointerType = "mouse";
				prop.pressure = 0.5;
				break;
			default:
				prop.pointerType = "";
				break;
		}
		var newEV = new PointerEventProxy( eventObject, prop );
		return callback( newEV );
	}

	function _translateMouseEvent( callback: any, eventObject: MouseEvent )
	{
		var newEV = new PointerEventProxy( eventObject, {
			height: 1,
			isPrimary: true,
			pointerId: 1,
			pointerType: "mouse",
			pressure: 0.5,
			tiltX: 0,
			tiltY: 0,
			width: 1,
		});
		return callback( newEV );
	}

	function _translateTouchEvent( callback: any, eventObject: any )
	{
		var changedTouches = eventObject.changedTouches;
		if( !changedTouches )
		{
			return null;
		}

		var ret = null;
		for( var i = 0; i < changedTouches.length; ++i )
		{
			var touchObject = changedTouches[i];
			var newEV = new PointerEventProxy( eventObject, {
				clientX: touchObject.clientX,
				clientY: touchObject.clientY,
				force: touchObject.webkitForce || touchObject.force,
				pointerId: touchObject.identifier,
				isPrimary: i === 0,
				pageX: touchObject.pageX,
				pageY: touchObject.pageY,
				pointerType: "touch",
				screenX: touchObject.screenX,
				screenY: touchObject.screenY,
				_currentTouch: touchObject,
			});

			var newRet = callback( newEV );
			if( newRet )
			{
				ret = newRet;
			}
		}

		return ret;
	}

	function _addPointerEventListenerForPointer( element: HTMLElement, type: PointerEventType, listener: EventListener, useCapture?: boolean ): void
	{
		useCapture = useCapture || false;

		var eventType = pointerEventTypeMap[type];
		element.addEventListener( eventType.pointer, listener, useCapture );
	}

	function _addPointerEventListenerForMSPointer( element: HTMLElement, type: PointerEventType, listener: EventListener, useCapture?: boolean ): void
	{
		useCapture = useCapture || false;

		var eventType = pointerEventTypeMap[type];
		var msPointerWrapper;
		msPointerWrapper = ( e: MSPointerEvent ) =>
		{
			_translateMSPointerEvent( listener, e );
		};
		element.addEventListener( eventType.mspointer, msPointerWrapper, useCapture );
		Core.EventUtilities.addEventListenerToEventMap( element, eventType.pointer, listener, useCapture, { mspointer: msPointerWrapper });
	}

	function _addPointerEventListenerForMouseTouch( element: HTMLElement, type: PointerEventType, listener: EventListener, useCapture?: boolean ): void
	{
		useCapture = useCapture || false;

		var eventType = pointerEventTypeMap[type];
		var mouseWrapper, touchWrapper;
		var touchHandled = false;
		if( eventType.mouse )
		{
			mouseWrapper = ( e: MouseEvent ) =>
			{
				if( !touchHandled )
				{
					_translateMouseEvent( listener, e );
				}
				else
				{
					touchHandled = false;
				}
			};
			element.addEventListener( eventType.mouse, mouseWrapper, useCapture );
		}
		if( eventType.touch )
		{
			touchWrapper = e =>
			{
				touchHandled = true;
				_translateTouchEvent( listener, e );
			};
			element.addEventListener( eventType.touch, touchWrapper, useCapture );
		}
		Core.EventUtilities.addEventListenerToEventMap( element, eventType.pointer, listener, useCapture, { mouse: mouseWrapper, touch: touchWrapper });
	}

	declare function addPointerEventListener( element: HTMLElement, type: PointerEventType, listener: EventListener, useCapture?: boolean ): void;

	function _removePointerEventListenerForPointer( element: HTMLElement, type: PointerEventType, listener: EventListener, useCapture?: boolean ): void
	{
		useCapture = useCapture || false;

		var eventType = pointerEventTypeMap[type];
		element.removeEventListener( eventType.pointer, listener, useCapture );
	}

	function _removePointerEventListenerForMSPointer( element: HTMLElement, type: PointerEventType, listener: EventListener, useCapture?: boolean ): void
	{
		useCapture = useCapture || false;

		var eventType = pointerEventTypeMap[type];
		var map = Core.EventUtilities.getEventListenerFromEventMap( element, eventType.pointer, listener, useCapture );
		if( map )
		{
			if( map.data.mspointer )
			{
				element.removeEventListener( eventType.mspointer, map.data.mspointer, map.useCapture );
			}
		}
	}

	function _removePointerEventListenerForMouseTouch( element: HTMLElement, type: PointerEventType, listener: EventListener, useCapture?: boolean ): void
	{
		useCapture = useCapture || false;

		var eventType = pointerEventTypeMap[type];
		var map = Core.EventUtilities.getEventListenerFromEventMap( element, eventType.pointer, listener, useCapture );
		if( map )
		{
			if( map.data.mouse )
			{
				element.removeEventListener( eventType.mouse, map.data.mouse, map.useCapture );
			}
			if( map.data.touch )
			{
				element.removeEventListener( eventType.touch, map.data.touch, map.useCapture );
			}
		}
	}

	declare function removePointerEventListener( element: HTMLElement, type: PointerEventType, listener: EventListener, useCapture?: boolean ): void;

	var g = <any>G.window;
	var that = <any>MNKit.Input;
	if( g.PointerEvent )
	{
		that.addPointerEventListener = _addPointerEventListenerForPointer;
		that.removePointerEventListener = _removePointerEventListenerForPointer;
	}
	else if( g.MSPointerEvent )
	{
		that.addPointerEventListener = _addPointerEventListenerForMSPointer;
		that.removePointerEventListener = _removePointerEventListenerForPointer;
	}
	else
	{
		that.addPointerEventListener = _addPointerEventListenerForMouseTouch;
		that.removePointerEventListener = _removePointerEventListenerForMouseTouch;
	}
}