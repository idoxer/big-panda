"use strict";

import React, {Component, PropTypes, DOM, createElement as $} from "react";

class Icon extends Component
{
    static propTypes =
    {
        name: PropTypes.string.isRequired
    };

    render()
    {
        const { name } = this.props;

        return (
            DOM.div({className: "ui-icon"},
                DOM.i({className: "ui-icon-" + name})
            )
        )
    }
}

export default Icon;
