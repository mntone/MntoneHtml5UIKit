// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit
{
	"use strict";

	export module EventType
	{
		// page
		export var Load = "load";
		export var BeforeUnload = "beforeunload";
		export var Unload = "unload";

		// pointer
		export var Click = "click";
		export var ContextMenu = "contextmenu";
		export var DoubleClick = "dblclick";

		// mouse/touch-pad
		export var Drag = "drag";
		export var DragEnter = "dragenter";
		export var DragLeave = "dragleave";
		export var DragStart = "dragstart";
		export var DragEnd = "dragend";
		export var DragOver = "dragover";
		export var Drop = "drop";

		export var Wheel = "wheel";
	}
}