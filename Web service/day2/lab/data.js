const Article = [
  {
    id: 1,
    title: "advatages of C++",
    content: "fast and compiled language",
    authorId: 1
  },
  {
    id: 2,
    title: "The magic of Java",
    content: "java is mix of compiled and interpreted language",
    authorId: 2
  },
  {
    id: 3,
    title: "Introduction to Python",
    content: "Python is a high-level programming language known for its simplicity and readability.",
    authorId: 3
  },
  {
    id: 4,
    title: "Web Development with JavaScript",
    content: "JavaScript is essential for creating interactive web applications.",
    authorId: 4
  },
  {
    id: 5,
    title: "Database Management Systems",
    content: "Understanding databases is crucial for data-driven applications.",
    authorId: 1
  }
];

const User = [
  {
    id: 1,
    fullname: "John Doe",
    dob: "1990-01-01"
  },
  {
    id: 2,
    fullname: "Jane Smith",
    dob: "1985-05-15"
  },
  {
    id: 3,
    fullname: "Alice Johnson",
    dob: "1992-08-20"
  },
  {
    id: 4,
    fullname: "Bob Brown",
    dob: "1988-12-10"
  }
];

const Comment = [
  {
    id: 1,
    content: "This article provides great insights.",
    authorId: 2,
    articleId: 1
  },
  {
    id: 2,
    content: "I appreciate the clear explanations in this piece.",
    authorId: 3,
    articleId: 2
  },
  {
    id: 3,
    content: "This has been very useful for my project.",
    authorId: 4,
    articleId: 3
  },
  {
    id: 4,
    content: "Thanks for sharing this knowledge.",
    authorId: 1,
    articleId: 4
  }
];


module.exports = {
  Article,
  User,
  Comment
};