"use strict";

import "./styles/_input.scss";
import React, {Component, PropTypes, DOM, createElement as $} from "react";

import Icon from "../decorators/Icon";

class Input extends Component
{
    static propTypes =
    {
        placeholder: PropTypes.string,
        icon: PropTypes.string,
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
        const className = ["ui-input ui-control"];

        const { value, error } = this.state;
        const { placeholder, icon } = this.props;
        const props = {};

        props.ref = this.props.ref;
        props.key = "input";
        props.placeholder = placeholder;
        props.value = value;
        props.onFocus = this.onFocus.bind(this);

        if (this.props.onChange)
            props.onChange = this.onChange.bind(this);

        if (icon)
        {
            content.push($(Icon, {name: icon, key: "input-icon"}));
            className.push("icon");
        }

        content.push(DOM.input(props));

        if (error)
        {
            content.push(DOM.div({className: "ui-error", key: "input-error"}, error));
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

export default Input;
