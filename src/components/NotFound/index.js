"use strict";

import React, { Component, PropTypes, DOM, createElement as $ } from "react";

class NotFound extends Component
{
	constructor(props)
	{
		super(props);
	}

    render()
	{
		document.title = "Not found";

		return (
			DOM.div({}, "Page not found")
		)
	}
}

export default NotFound;
