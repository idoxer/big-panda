"use strict";

import React, {Component, PropTypes, DOM, createElement as $} from "react";
import Actions from "../../actions/Actions";
import { Input, Textarea, Button } from "../../ui";

class CommentsForm extends Component
{
    state = {};
    fields = {};

    render()
    {
        const { error, loader } = this.state;

        return (
            DOM.div({className: "bp-comments-form"},
                $(Input, {
                    ref: "emailInput",
                    placeholder: "Email",
                    onChange: this.onEmailChange.bind(this),
                    error: error && error.email
                }),
                $(Textarea, {
                    ref: "messageInput",
                    placeholder: "Message",
                    onChange: this.onMessageChange.bind(this),
                    error: error && error.message
                }),
                $(Button, {
                    loader,
                    right: true,
                    onClick: this.onSubmit.bind(this)
                }, "SUBMIT")
            )
        )
    }

    onFieldChange(name, value)
    {
        this.fields[name] = value;
    }

    onEmailChange(value)
    {
        this.onFieldChange("email", value);
    }

    onMessageChange(value)
    {
        this.onFieldChange("message", value);
    }

    /**
     * User submitted new comment
     */
    onSubmit()
    {
        this.setState({error: null});

        const error = {};
        const { email, message } = this.fields;

        if (!email)
            error.email = "Please enter your email";
        else if (!this.isEmailValid(email))
            error.email = "Invalid email";

        if (!message)
            error.message = "Please enter your message";

        if (Object.keys(error).length)
            return this.setState({error});

        this.setState({loader: true});

        const data = {};
        data.email = email;
        data.message = message;

        Actions
            .submitComment(data)
            .then(() =>
            {
                const { emailInput, messageInput } = this.refs;

                emailInput.empty();
                messageInput.empty();

                this.fields = {};

                this.setState({loader: false});
            })
            .catch(error =>
            {
                this.setState({loader: false});
            });
    }

    isEmailValid(email)
    {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}

export default CommentsForm;
