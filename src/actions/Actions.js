"use strict";

import request from "superagent";
import Dispatcher from "../core/Dispatcher";
import ActionTypes from "../constants/ActionTypes";

const location = window.location;
const HOST = location.hostname == "localhost" ? "http://localhost:5200/" : [location.protocol, "//", "api.", location.host, "/"].join("");

class Actions
{
    /**
     * @param {Object} data
     *  @property {string} data.email - Email address
     *  @property {string} data.message - Comment message content
     */
	static submitComment(data)
	{
		return post("comment/submit", data)
            .then(data =>
            {
                const comment = data.data;

                Dispatcher.dispatch(
                {
                    type: ActionTypes.SUBMIT_COMMENT,
                    data: comment
                });
            })
            .catch(error =>
            {
                console.log("error", error);
            });
	};

    static getComments()
    {
        return post("comment/get")
            .then(data =>
            {
                if (data.error)
                    throw {code: null};

                const comments = data.data;

                Dispatcher.dispatch(
                {
                    type: ActionTypes.GET_COMMENTS,
                    data: comments
                });

                return comments;
            });
    };
}

function post(route, data, timeout = 6e4)
{
    let promise = new Promise((resolve, reject) =>
    {
        request
            .post(HOST + route)
            .send(data)
            .set("Accept", "application/json")
            .end((error, result) =>
            {
                if (error || !result || result.statusCode < 200 || result.statusCode > 300)
                {
                    console.error("[POST /%s]", route, error);
                    return reject(error);
                }

                const body = result.body;
                console.debug("[POST %d /%s]", result.statusCode, route, body);
                resolve(body);
            });
    });

    let error = {message: "Connection timeout"};

    return Promise.race(
        [
            promise,
            new Promise((resolve, reject) => setTimeout(reject, timeout, error))
        ]);
}

export default Actions;
