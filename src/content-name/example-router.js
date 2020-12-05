// const express = require("express");
// const ArticlesService = require("./articles-service");
// const xss = require('xss');

// const articlesRouter = express.Router();

// articlesRouter
//   .route("/")
//   .get((req, res, next) => {
//     ArticlesService.getAllArticles(req.app.get('db'))
//       .then((articles) => {
//         if (articles.length !== 0) {
//           articles = articles.map(article => {
//             return {
//               id: article.id,
//               style: article.style,
//               title: xss(article.title), // sanitize title
//               content: xss(article.content), // sanitize content
//               date_published: article.date_published,
//             };  
//           });
//         }
//         return articles;
//       })
//       .then(articles => res.json(articles))
//       .catch(next);
//   })
//   .post((req, res, next) => {
//     const { title, content, style } = req.body;
//     let newArticle = { 
//       title, content, style  
//     };

//     for (const [key, value] of Object.entries(newArticle)) {
//       if(value == null) {
//         return res.status(400).json({
//           error: { message: `Missing ${key} in request body` }
//         });
//       }
//     }

//     newArticle = { 
//       title: xss(title),
//       content: xss(content),
//       style  
//     };

//     ArticlesService.insertArticle(
//       req.app.get('db'),
//       newArticle
//     )
//       .then(article => {
//         res
//           .status(201)
//           .location(`/articles/${article.id}`)
//           .json(article);
//       })
//       .catch(next);
//   });

// articlesRouter
//   .route('/:article_id')
//   .all((req, res, next) => {
//     ArticlesService.getById(
//       req.app.get('db'),
//       req.params.article_id
//     )
//       .then(article => {
//         if (!article) {
//           return res.status(404).json({
//             error: { message: `Article doesn't exist` }
//           });
//         };
//         res.article = article;
//         next();
//       })
//       .catch(next);
//   })
//   .get((req, res, next) => {
//     res.json({
//       id: res.article.id,
//       style: res.article.style,
//       title: xss(res.article.title), // sanitize title
//       content: xss(res.article.content), // sanitize content
//       date_published: res.article.date_published,
//     });
//   })
//   .delete((req, res, next) => {
//     ArticlesService.deleteArticle(
//       req.app.get('db'),
//       req.params.article_id
//     )
//       .then(() => {
//         res.status(204).end();
//       })
//       .catch(next);
//   });

// module.exports = articlesRouter;
