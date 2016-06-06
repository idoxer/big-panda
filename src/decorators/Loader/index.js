"use strict";

import "./_style.scss";
import React, { Component, PropTypes, DOM, createElement as $ } from "react";

class Loader extends Component
{
	static propTypes =
	{
		size: PropTypes.number,

		// Invert colors
		invert: PropTypes.bool
	};

    render()
    {
		const className = ["ui-loader-default"];

		const { size, invert } = this.props;

		let style = {};

		if (size)
			style.width = style.height = size;

		if (invert)
			className.push("invert");

        return (
            DOM.div({className: className.join(" "), style})
        )
    }
}

export default Loader;
