"use strict";

import "./styles/_textarea.scss";
import React, {Component, PropTypes, DOM, createElement as $} from "react";

class Textarea extends Component
{
    static propTypes =
    {
        placeholder: PropTypes.string,
        error: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor(props)
    {
        super(props);

        this.state = {};
        this.state.error = props.error;
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.error != this.state.error)
            this.setState({error: nextProps.error});
    }

    render()
    {
        const content = [];
        const className = ["ui-textarea ui-control"];

        const { value, error } = this.state;
        const { placeholder } = this.props;
        const props = {};

        props.ref = this.props.ref;
        props.key = "textarea";
        props.placeholder = placeholder;
        props.value = value;
        props.onFocus = this.onFocus.bind(this);

        if (this.props.onChange)
            props.onChange = this.onChange.bind(this);

        content.push(DOM.textarea(props));

        if (error)
        {
            content.push(DOM.div({className: "ui-error", key: "textarea-error"}, error));
            className.push("error");
        }

        return (
            DOM.div({className: className.join(" ")}, content)
        )
    }

    onChange(event)
    {
        let value = event.target.value;

        this.props.onChange(value);
        this.setState({value});
    }

    onFocus()
    {
        this.setState({error: null});
    }

    empty()
    {
        this.setState({value: ""});
    }
}

export default Textarea;
