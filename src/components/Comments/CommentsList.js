"use strict";

import React, {Component, PropTypes, DOM, createElement as $} from "react";
import Store from "../../stores/Store";
import Actions from "../../actions/Actions";
import { Input } from "../../ui";
import Loader from "../../decorators/Loader";
import CommentRow from "./CommentRow";

class CommentsList extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
        this.state.loader = true;
        this.state.error = null;
        this.state.comments = Store.getComments();

        this.onCommentsChange = this.onCommentsChange.bind(this);
    }

    componentDidMount()
    {
        Store.addEventListener(Store.Events.COMMENTS, this.onCommentsChange);

        if (!this.state.loader)
            this.setState({loader: true});

        Actions
            .getComments()
            .then(comments =>
            {
                this.setState({comments, loader: null, error: null});
            })
            .catch(error =>
            {
                this.setState({comments: null, loader: null, error: "Failed to load comments"});
            });
    }

    componentWillUnmount()
    {
        Store.addEventListener(Store.Events.COMMENTS, this.onCommentsChange);
    }

    render()
    {
        const { loader, error, comments, query } = this.state;
        const content = [];

        if (loader)
            content.push($(Loader, {key: "comments-list-loader"}));
        else if (error)
            content.push(DOM.div({className: "bp-comments-list-error", key: "comments-list-error"}, error));
        else
        {
            content.push(
                DOM.div({className: "bp-comments-list-content", key: "comments-content"},
                    comments && comments.length ? comments.map((comment, index) =>
                    {
                        comment.query = query;
                        comment.key = "comment-" + index;
                        return $(CommentRow, comment);
                    }) : DOM.div({className: "comments-empty"}, query ? "No matches for '" + query + "'" : "No comments")
                )
            );
        }

        return (
            DOM.div({className: "bp-comments-list"},
                $(Input, {
                    icon: "search",
                    placeholder: "Filter",
                    onChange: this.onSearchChange.bind(this)
                }),
                content
            )
        )
    }

    onCommentsChange()
    {
        this.setState({comments: Store.getComments()});
    }

    onSearchChange(value)
    {
        var comments = Store.getComments().slice(0);

        comments = comments.filter(comment =>
        {
            return comment.message.indexOf(value) !== -1 || comment.email.indexOf(value) !== -1;
        });

        this.setState({comments, query: value});
    }
}

export default CommentsList;
