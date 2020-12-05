// const ArticlesService = {
//   getAllArticles(db) {
//     return db
//       .select('*')
//       .from('blogful_articles');
//   },
//   insertArticle(db, newArticle) {
//     return db
//       .insert(newArticle)
//       .into('blogful_articles')
//       .returning('*')
//       .then(rows => {
//         return rows[0];
//       });
//   },
//   getById(db, id) {
//     return db
//       .select('*')
//       .from('blogful_articles')
//       .where({ id: id })
//       .first();
//   },
//   deleteArticle(db, id) {
//     return db
//       .from('blogful_articles')
//       .where({ id })
//       .delete();
//   },
//   updateArticle(db, id, newData) {
//     return db
//       .from('blogful_articles')
//       .where({ id })
//       .update(newData);
//   }
// };

// module.exports = ArticlesService;