import { ApiCheck, AssertionBuilder } from "checkly/constructs";

new ApiCheck("get-books-api-check", {
	name: "GET /books",
	degradedResponseTime: 10000,
	maxResponseTime: 20000,
	request: {
		url: "https://danube-store-srebot-test-3a4a0227b89f.herokuapp.com/api/books",
		method: "GET",
		headers: [
			{
				key: "Accept",
				value: "application/json",
			},
		],
		followRedirects: true,
		skipSSL: false,
		assertions: [
			AssertionBuilder.statusCode().equals(200),
			AssertionBuilder.jsonBody("$.length").greaterThan(0),
		],
	},
});

