import "babel-core/polyfill";
import "./styles/app.scss";
import React, { Component, PropTypes, DOM, createElement as $ } from "react";
import { render } from "react-dom";
import FastClick from "fastclick";
import { Router, Route, Link, browserHistory  } from "react-router";

// Components
import App from "./components/App";
import NotFound from "./components/NotFound";

function run()
{
	// Make taps on links and buttons work fast on mobiles
	FastClick.attach(document.body);

	render((
		$(Router, {history: browserHistory},
			$(Route, { path: "/", component: App }),
			$(Route, { path: "*", component: NotFound })
		)
	), document.getElementById("app"))
}

if (window.addEventListener)
	window.addEventListener("DOMContentLoaded", run);
else
	window.attachEvent("onload", run);
