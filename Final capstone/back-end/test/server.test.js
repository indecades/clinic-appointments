let expect = require("chai").expect;
let request = require("request");
//test that backend is up and running
describe("Back-end status code response", function () {
	it("Gives a success response", function (done) {
		request(
			"http://localhost:8080/app/admin-appointments",
			function (error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			}
		);
	});
});
