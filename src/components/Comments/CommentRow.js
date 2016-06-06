"use strict";

import React, {Component, PropTypes, DOM, createElement as $} from "react";

class CommentRow extends Component
{
    static propTypes =
    {
        timestamp: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        avatar: PropTypes.string,

        // Query is used by the filter, mark the specific matched text
        query: PropTypes.string
    };

    render()
    {
        const avatarStyle = {};
        const { timestamp, email, message, avatar } = this.props;

        if (avatar)
            avatarStyle.backgroundImage = "url('" + avatar + "')";

        return (
            DOM.div({className: "bp-comment-row", key: timestamp},
                DOM.div({className: "bp-comment-row-avatar", style: avatarStyle}),
                DOM.div({className: "bp-comment-row-info"},
                    DOM.div({className: "bp-comment-row-email"}, this.searchMatches(email)),
                    DOM.div({className: "bp-comment-row-message"}, this.searchMatches(message))
                )
            )
        )
    }

    /**
     * Wrap all the matches with special dom element to mark them
     * @param value
     * @returns {*}
     */
    searchMatches(value)
    {
        const query = this.props.query;

        if (!query)
            return value;

        const list = value.split(query);
        const content = [];

        list.forEach((text, index) =>
        {
            content.push(text);

            if (index != (list.length - 1))

            content.push(DOM.label({}, query));
        });

        return content;
    }
}

export default CommentRow;
