var express = require('express');
var router = express.Router();
var Book = require("../models").Book;


/*
-->>get / - Home route should redirect to the /books route.
-->>get /books - Shows the full list of books.
-->>get /books/new - Shows the create new book form.
-->>post /books/new - Posts a new book to the database.
-->>get /books/:id - Shows book detail form.
-->>post /books/:id - Updates book info in the database.
-->>post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.*/



/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll({order: [["Year", "DESC"]]}).then(function(books){
    res.render("books/index", {books: books, title: "List of Books" });
  }).catch(function(error){
      res.send(500, error);
   });
});

/* POST create book. */
router.post('/', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    res.redirect("/books/" + book.id);
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        res.render("books/new", {book: Book.build(req.body), errors: error.errors, title: "New Book"})
      } else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   });
;});

/* Create a new book form. */
router.get('/new', function(req, res, next) {
  res.render("books/new", {book: {}, title: "New Book"});
});
