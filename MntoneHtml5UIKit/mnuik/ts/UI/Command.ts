// Mntone HTML5 UIKit (MNKit) is under MIT license. Copyright (C) 2014 mntone

module MNKit.UI
{
	"use strict";

	class Command
	{
		private executeFn: Function;
		private canExecuteFn: Function;

		constructor( executeFunction: Function, canExecuteFn?: Function )
		{
			this.executeFn = executeFunction;
			this.canExecuteFn = canExecuteFn || ( () => true );
		}

		execute(): void
		{
			this.executeFn();
		}

		get canExecute(): boolean
		{
			return this.canExecuteFn();
		}
	}
}