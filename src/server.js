
import "babel-core/polyfill";
import path from "path";
import express from "express";
import React, { DOM } from "react";
import ServerDOM from "react-dom/server";
import Html from "./components/Html";
import config from "../config.json";

const server = express();

server.set("port", (process.env.PORT || config.port));
server.use(express.static(path.join(__dirname, "public")));
server.use("/", (req, res, next) =>
{
	const html = ServerDOM.renderToStaticMarkup(React.createElement(Html));
	res.status(200).send("<!doctype html>" + html);
});

server.get("*", async (req, res, next) =>
{
	try
	{
		let statusCode = 200;
		const html = ServerDOM.renderToStaticMarkup(React.createElement(Html));

		res.status(statusCode).send("<!doctype html>" + html);
	}
	catch (e) { next(e) }
});

server.listen(server.get("port"), () =>
{
	console.log("\nServer running at localhost:%d\n", server.get("port"));
});
