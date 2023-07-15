/// <reference types="cypress" />

describe("POST request", () => {
  var titleOfPosts = new Array();
  let randomTitle = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);
  it("Create a new post via /post api", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/posts",
      body: {
        title: randomTitle,
        author: "Harry Potter",
      },
    }).then((response) => {
      expect(response.status).to.be.eq(201);
      expect(response.body).has.property("title", randomTitle);
      expect(response.body).has.property("author", "Harry Potter");
    });
  });
  it("Validate title of latest post", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/posts",
      headers: {
        accept: "application/json",
      },
    }).then((response) => {
      let body = JSON.parse(JSON.stringify(response.body));
      body.forEach((item) => {
        titleOfPosts.push(item["title"]);
        cy.log(item["title"]);
      });
    }).then(() => {
      var latestPost = titleOfPosts[titleOfPosts.length - 1];
      expect(latestPost).to.eq(randomTitle);
      });
  });  
});
