"use strict";

import React, {Component, PropTypes, DOM, createElement as $} from "react";
import Comments from "./Comments";

class Home extends Component
{
    render()
    {
        return (
            DOM.div({className: "comments-parent"},
                $(Comments)
            )
        )
    }
}

export default Home;
