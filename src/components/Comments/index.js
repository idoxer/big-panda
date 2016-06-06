"use strict";

import "./_comments.scss";
import React, {Component, PropTypes, DOM, createElement as $} from "react";

import CommentsForm from "./CommentsForm";
import CommentsList from "./CommentsList";

class Comments extends Component
{
    render()
    {
        return (
            DOM.div({className: "bp-comments"},
                $(CommentsForm),
                $(CommentsList)
            )
        )
    }
}

export default Comments;
