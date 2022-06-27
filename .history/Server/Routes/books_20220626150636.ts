// modules required for routing
import express from 'express';
import { CallbackError } from 'mongoose';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  
  res.render('index', { title: 'Add', page: 'details', books: ' '});
   

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = new book
  ({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
    
  });

  book.create(newBook, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    
    res.redirect('/books');
  })

});

// GET the Book Details page in order to edit an existing Book
router.get('edit/:id', (req, res, next) => {
  let id = req.params.id;

  // pass the id to the db and read the movie into the edit page
  book.findById(id, {}, {}, function(err, bookToEdit)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // show the edit view with the data
    res.render('index', { title: 'Edit', page: 'details', book: bookToEdit })
  });
});

// POST - process the information passed from the details form and update the document
router.post('edit/:id', (req, res, next) => {

  let id = req.params.id;

  // instantiate a new Movie to Edit
  let updatedBook = new book
  ({
    "_id": id,
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  // update the movie in the database
  book.updateOne({_id: id}, updatedBook, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful -> go to the movie-list page
    res.redirect('/books');
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  // pass the id to the database and delete the movie
  book.remove({_id: id}, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // delete was successful
    res.redirect('/books');
  });
});


//module.exports = router;
