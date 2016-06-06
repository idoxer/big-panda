"use strict";

import { EventEmitter } from "events";
import Dispatcher from "../core/Dispatcher";
import ActionTypes from "../constants/ActionTypes";
import Events from "../constants/Events";

var _comments = [];

const Store = Object.assign({}, EventEmitter.prototype,
{
    Events,

	emitChange: function ()
	{
		this.emit(Events.CHANGE);
	},

	addChangeListener: function (callback)
	{
		this.on(Events.CHANGE, callback);
	},

	addEventListener: function (event, callback)
	{
		this.on(event, callback);
	},

	removeChangeListener: function (callback)
	{
		this.removeListener(Events.CHANGE, callback);
	},

	removeEventListener: function (event, callback)
	{
		this.removeListener(event, callback);
	},

	emitEvent: function(event, data)
	{
		this.emit(event, data);
	},

	dispatcherIndex: Dispatcher.register(payload =>
	{
		const type = payload.type;
		const data = payload.data;

		switch (type)
		{
			case ActionTypes.SUBMIT_COMMENT:
            {
                _comments.push(data);
                Store.emitEvent(Events.COMMENTS, data);
                break;
            }

			case ActionTypes.GET_COMMENTS:
            {
                _comments = data;
                Store.emitEvent(Events.COMMENTS, data);
                break;
            }
		}

		return true;
	}),

    getComments() { return _comments; }
});

export default Store;
