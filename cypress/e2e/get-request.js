/// <reference types="cypress" />

describe("GET request", () => {
    it("Validate status code of the /posts API", () => {
      cy.request("http://localhost:3000/posts").then((response) => {
        expect(response.status).to.be.eq(200);
      });
    });
  
    it("Validate the title of the first post", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:3000/posts",
        // Header is used to set the Accept type. Server will send the response based on the Accept type
        headers: { 
          accept: "application/json",
        }
        // response comes from the server
      }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));
        //cy.log(body);

        expect(body[0]).has.property("title", "Example Json server");
        expect(body[1]).has.property("author", "Joe Blogs");

        //GET request - Loop through the response body & Assert the response
        body.forEach((item) => {
            expect(item).to.have.all.keys("id", "title", "author");
        });
      });
    });
  });
