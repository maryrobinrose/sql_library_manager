var express = require('express');
var router = express.Router();
var Book = require("../models").Book;


/*
-->>post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.*/



/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll({order: [["Year", "DESC"]]}).then(function(books){
    res.render("books/index", {books: books, title: "List of Books" });
  }).catch(function(error){
      res.send(500, error);
   });
});

/* Create a new book form. */
router.get('/new', function(req, res, next) {
  res.render("books/new", {book: {}, title: "New Book"});
});

/* POST create book. */
router.post('/new', function(req, res, next) {
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

/* GET individual book. */
router.get("/:id", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    if(book) {
      res.render("books/show", {article: book, title: book.title});
    } else {
      res.send(404);
    }
  }).catch(function(error){
      res.send(500, error);
   });
});

/* Edit book form. */
router.get("/:id/edit", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    if(book) {
      res.render("books/edit", {book: book, title: "Edit Book"});
    } else {
      res.send(404);
    }
  }).catch(function(error){
      res.send(500, error);
   });
});

/* Delete book form. */
router.get("/:id/delete", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    if(book) {
      res.render("books/delete", {book: book, title: "Delete Book"});
    } else {
      res.send(404);
    }
  }).catch(function(error){
      res.send(500, error);
   });
});
