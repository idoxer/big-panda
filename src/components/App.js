"use strict";

import React, { Component, PropTypes, DOM, createElement as $ } from "react";
import { Router, Route, Link, History, Lifecycle } from "react-router"
import Home from "./Home";

class App extends Component
{
	render()
	{
		return (
			DOM.div({className: "app-content"},
				$(Home, {}, this.props.children)
			)
		)
	}
}

export default App;
