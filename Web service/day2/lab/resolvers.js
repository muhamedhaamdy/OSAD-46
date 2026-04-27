const { Article, User, Comment } = require('./data');
const { GraphQLError } = require('graphql');

const resolvers = { 
  Query: {
    getAllArticles: () => Article,
    getArticleById: (parent, { id }) => {
      return Article.find(article => article.id === parseInt(id));
    },
    getAllUsers: () => User,
    getUserById: (parent, { id }) => {
      return User.find((u) => u.id === parseInt(id));
    },
    getAllComments: () => Comment,
    getCommentById: (parent, { id }) => {
      return Comment.find((c) => c.id === parseInt(id));
    },

    getAllArticlesByAuthor: (parent, { authorId }) => {
      return Article.filter((a)=> a.authorId === parseInt(authorId))
    },
    getAllCommentsForArticle: (parent, { articleId }) => {
      return Comment.filter((c) => c.articleId === parseInt(articleId));
    }
  }

};

module.exports = resolvers;