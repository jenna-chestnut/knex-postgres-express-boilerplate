// const { expect } = require("chai");
// const knex = require("knex");
// const supertest = require("supertest");
// const app = require("../src/app");
// const { makeArticlesArray, makeMaliciousArticle } = require("./articles.fixtures");

// describe("Article endpoints", () => {
//   let db;

//   before("make knex instance", () => {
//     db = knex({
//       client: "pg",
//       connection: process.env.TEST_DB_URL
//     });
//     app.set("db", db);
//   });

//   before("clean the table", () => db("blogful_articles").truncate());

//   after("disconnect from db", () => db.destroy());

//   afterEach("cleanup", () => db("blogful_articles").truncate());

//   describe("GET /articles", () => {
//     context(`Given no articles`, () => {
//       it(`responds with 200 and an empty list`, () => {
//         return supertest(app).get("/articles").expect(200, []);
//       });
//     });

//     context("Given there are articles in the database", () => {
//       const testArticles = makeArticlesArray();

//       beforeEach("insert articles", () => {
//         return db.into("blogful_articles").insert(testArticles);
//       });

//       it("GET /articles responds with 200 and all articles", () => {
//         return supertest(app).get("/articles").expect(200, testArticles);
//       });
//     });

//     context(`Given an XSS attack article`, () => {
//       const maliciousArticle = makeMaliciousArticle();
      
//       beforeEach('insert malicious article', () => {
//         return db
//           .into('blogful_articles')
//           .insert([ maliciousArticle ]);
//       });
      
//       it('removes XSS attack content', () => {
//         return supertest(app)
//           .get(`/articles`)
//           .expect(200)
//           .expect(res => {
//             expect(res.body[0].title).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;');
//             expect(res.body[0].content).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`);
//           });
//       });
//     });
//   });

//   describe("POST /articles", () => {
//     it("creates an articles, responds with 201 and the new article", function() {
//       this.retries(3);
//       const newArticle = {
//         title: "Test new article",
//         style: "Listicle",
//         content: "Test new article content..."
//       };
//       return supertest(app)
//         .post("/articles")
//         .send(newArticle)
//         .expect(201)
//         .expect((res) => {
//           expect(res.body.title).to.eql(newArticle.title);
//           expect(res.body.style).to.eql(newArticle.style);
//           expect(res.body.content).to.eql(newArticle.content);
//           expect(res.body).to.have.property("id");
//           expect(res.headers.location).to.eql(`/articles/${res.body.id}`);
//           const expected = new Date().toLocaleDateString();
//           const actual = new Date(res.body.date_published).toLocaleDateString();
//           expect(actual).to.eql(expected);
//         })
//         .then((postRes) =>
//           supertest(app)
//             .get(`/articles/${postRes.body.id}`)
//             .expect(postRes.body)
//         );
//     });

//     const fields = ['title', 'style', 'content'];
//     fields.forEach(field => {
//       const newArticle = {
//         title: "Test new article",
//         style: "Listicle",
//         content: "Test new article content..."
//       };
//       it(`responds with 400 and an error message when ${field} field is missing`, () => {
//         delete newArticle[field];
//         return supertest(app)
//           .post('/articles')
//           .send(newArticle)
//           .expect(400, {
//             error: {message: `Missing ${field} in request body`}
//           });
//       });
//     });

//     context(`When an XSS attack article is put in, article is sanitized right away`, () => {
//       const maliciousArticle = makeMaliciousArticle();
      
//       it('removes XSS attack content', () => {
//         return supertest(app)
//           .post(`/articles`)
//           .send(maliciousArticle)
//           .expect(201)
//           .expect(res => {
//             expect(res.body.title).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;');
//             expect(res.body.content).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`);
//           });
//       });
//     });
//   });

//   describe("GET /articles/:id", () => {
//     context(`Given no articles`, () => {
//       it(`responds with 404`, () => {
//         const articleId = 123456;
//         return supertest(app)
//           .get(`/articles/${articleId}`)
//           .expect(404, { error: { message: `Article doesn't exist` } });
//       });
//     });

//     context("Given there are articles in the database", () => {
//       const testArticles = makeArticlesArray();

//       beforeEach("insert articles", () => {
//         return db.into("blogful_articles").insert(testArticles);
//       });

//       it("GET /articles/:id responds with 200 and the specified article", () => {
//         const articleId = 3;
//         const expected = testArticles[articleId - 1];
//         return supertest(app)
//           .get(`/articles/${articleId}`)
//           .expect(200, expected);
//       });
//     });

//     context(`Given an XSS attack article`, () => {
//       const maliciousArticle = makeMaliciousArticle();
      
//       beforeEach('insert malicious article', () => {
//         return db
//           .into('blogful_articles')
//           .insert([ maliciousArticle ]);
//       });
      
//       it('removes XSS attack content', () => {
//         return supertest(app)
//           .get(`/articles/${maliciousArticle.id}`)
//           .expect(200)
//           .expect(res => {
//             expect(res.body.title).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;');
//             expect(res.body.content).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`);
//           });
//       });
//     });
//   });

//   describe.only(`DELETE /articles/:article_id`, () => {
//     context(`Given no articles`, () => {
//       it(`responds with 404`, () => {
//         const articleId = 123456;
//         return supertest(app)
//           .delete(`/articles/${articleId}`)
//           .expect(404, { error: { message: `Article doesn't exist` } });
//       });
//     });

//     context('Given there are articles in the database', () => {
//       const testArticles = makeArticlesArray();
    
//       beforeEach('insert articles', () => {
//         return db
//           .into('blogful_articles')
//           .insert(testArticles);
//       });
    
//       it('responds with 204 and removes the article', () => {
//         const idToRemove = 2;
//         const expectedArticles = testArticles.filter(article => article.id !== idToRemove);
//         return supertest(app)
//           .delete(`/articles/${idToRemove}`)
//           .expect(204)
//           .then(res =>
//             supertest(app)
//               .get(`/articles`)
//               .expect(expectedArticles)
//           );
//       });
//     });
//   });
// });
