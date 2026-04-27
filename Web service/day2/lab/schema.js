const typeDefs = `

    input CreateArticleInput {
        title: String!
        content: String!
        authorId: ID!
    }

    input CreateUserInput {
        fullname: String!
        dob: String!
    }

    input CreateCommentInput {
        content: String!
        authorId: ID!
        articleId: ID!
    }


    type Article {
        id: ID!,
        title: String!,
        content: String!,
        author: User!
    }

    type User {
        id: ID!,
        fullname: String!,
        dob: String!
    }

    type Comment {
        id: ID!,
        content: String!,
        author: User!,
        article: Article!
    }

    type Query {
        getAllArticles: [Article]
        getArticleById(id: ID!): Article
        getAllUsers: [User]
        getUserById(id: ID!): User
        getAllComments: [Comment]
        getCommentById(id: ID!): Comment

        getAllArticlesByAuthor(authorId: ID!): [Article]
        getAllCommentsForArticle(articleId: ID!): [Comment]

    }

    type Mutation {
        createArticle(input: CreateArticleInput): Article
        createUser(input: CreateUserInput): User
        createComment(input: CreateCommentInput): Comment
    }

`;

module.exports = typeDefs;