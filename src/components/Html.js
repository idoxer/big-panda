
import React, { Component, PropTypes, DOM, createElement as $ } from "react";

class Html extends Component
{
	static propTypes =
	{
		title: PropTypes.string,
		description: PropTypes.string
	};

	static defaultProps =
	{
		title: "Big Panda Exercise",
		description: "Awesome Exercise by Big Panda ;)"
	};

	render()
	{
        const { title, description, children } = this.props;

		return (
			DOM.html({},
				DOM.head({},
					DOM.meta({charSet: "utf-8"}),
					DOM.meta({httpEquiv: "X-UA-Compatible", content: "IE=edge"}),
					DOM.meta({name: "description", content: description}),
					DOM.meta({name: "viewport", content: "width=device-width, initial-scale=1"}),
					DOM.link({rel: "stylesheet", href: "/app.css", type: "text/css"}),
					DOM.title({}, title)
				),
				DOM.body({},
					DOM.div({id: "app"}, children),
					DOM.script({src: "/app.js"})
				)
			)
		)
	}
}

export default Html;
