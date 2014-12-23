// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.Core
{
	declare class EventInfo
	{
		listener: EventListener;
		useCapture: boolean;
	}

	export class EventableBase
	{
		private _listeners: { [key: string]: EventInfo[] };

		constructor()
		{
			this._listeners = {};
		}

		dispose(): void
		{
			var listeners = this._listeners;
			this._listeners = {};

			Object.keys( listeners ).forEach( ( type ) => 
			{
				var data = listeners[type];
				for( var i = 0; i < data.length; ++i )
				{
					this.removeEventListener( type, data[i].listener, data[i].useCapture );
				}
			}, this );
		}

		addEventListener( type: string, listener: EventListener, useCapture: boolean ): void
		{
			useCapture = useCapture || false;

			if( !this._listeners[type] )
			{
				this._listeners[type] = [];
			}

			var infos: EventInfo[] = this._listeners[type];
			for( var i = 0; i < infos.length; ++i )
			{
				var info = infos[i];
				if( info.listener === listener && info.useCapture === useCapture )
				{
					return;
				}
			}

			infos.push( { listener: listener, useCapture: useCapture });
		}

		removeEventListener( type: string, listener: EventListener, useCapture: boolean ): void
		{
			useCapture = useCapture || false;

			var infos = this._listeners && this._listeners[type];
			if( infos )
			{
				for( var i = 0; i < infos.length; ++i )
				{
					var info = infos[i];
					if( info.listener === listener && info.useCapture === useCapture )
					{
						infos.splice( i, 1 );
						if( infos.length === 0 )
						{
							delete this._listeners[type];
						}
					}
				}
			}
		}

		dispatchEvent( e: Event ): boolean
		{
			var infos = this._listeners && this._listeners[e.type];
			if( infos )
			{
				infos = infos.slice( 0, infos.length );
				for( var i = 0; i < infos.length; ++i )
				{
					infos[i].listener( e );
				}
				return e.defaultPrevented || false;
			}
			return false;
		}
	}
} 