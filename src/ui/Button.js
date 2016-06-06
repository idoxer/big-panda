"use strict";

import "./styles/_button.scss";
import React, {Component, PropTypes, DOM, createElement as $} from "react";
import Loader from "../decorators/Loader";

class Button extends Component
{
    static propTypes =
    {
        // Stick the button to the right side
        right: PropTypes.bool,

        // Display loader and make the button disabled
        loader: PropTypes.bool
    };

    render()
    {
        const content = [];
        const className = ["ui-button ui-control"];
        const { children, right, loader } = this.props;
        const props = {};

        if (right)
            className.push("right");

        if (this.props.onClick)
            props.onClick = this.onClick.bind(this);

        content.push(children);

        if (loader)
        {
            props.disabled = true;
            content.push($(Loader, {invert: true, size: 16, key: "loader"}));
            className.push("loader");
        }

        return (
            DOM.div({className: className.join(" ")},
                DOM.button(props, content)
            )
        )
    }

    onClick()
    {
        this.props.onClick();
    }
}

export default Button;
