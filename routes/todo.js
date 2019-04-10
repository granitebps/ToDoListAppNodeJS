const express = require('express');
const router = express.Router();

// Schema db
const Todo = require('../models/Todo');

// Get Todos
router.get('/', (req, res) => {
  Todo.find()
    .then((todos) => {
      // API
      // res.json(todos)
      res.render('todo', {
        todos
      })
    })
    .catch((err) => {
      console.log(err);
    })
})

// Post Todo
router.post('/', (req, res) => {
  const {
    todo
  } = req.body;
  const newTodo = new Todo({
    todo,
    completed: false
  });
  newTodo.save()
    .then((todo) => {
      // API
      // res.json(todos)
      res.redirect('/todo');
    })
    .catch((err) => {
      console.log(err)
    });
});

// Get Todo By ID (Update Todo)
router.get('/:id', (req, res) => {
  const todoId = req.params.id;
  Todo.findById(todoId)
    .then((todo) => {
      res.render('edit', {
        todo
      });
    })
    .catch((err) => {
      console.log(err)
    });
})

// Update Todo
router.post('/:id', (req, res) => {
  const todoId = req.params.id;
  Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
      useFindAndModify: false
    })
    .then((todo) => {
      res.redirect('/todo');
    })
    .catch((err) => {
      console.log(err)
    });
})

// Delete Todo
router.get('/delete/:id', (req, res) => {
  const todoId = req.params.id;

  Todo.findByIdAndRemove(todoId, {
      useFindAndModify: false
    })
    .then(() => {
      // res.json({
      //   confirmation: "Deleted"
      // });
      res.redirect('/todo');
    })
    .catch((err) => {
      console.log(err)
    });
})

// Completed Todo
router.get('/completed/:id', (req, res) => {
  const todoId = req.params.id;
  const completed = {
    completed: true
  }
  Todo.findByIdAndUpdate(todoId, completed, {
      new: true,
      useFindAndModify: false
    })
    .then((todo) => {
      res.redirect('/todo');
    })
    .catch((err) => {
      console.log(err)
    });
})

// Put Todo API
// router.put('/:id', (req, res) => {
//   const todoId = req.params.id;

//   Todo.findByIdAndUpdate(todoId, req.body, {
//       new: true
//     })
//     .then((todo) => {
//       res.json(todo);
//     })
//     .catch((err) => {
//       console.log(err)
//     });
// });

// Delete todo API
// router.delete('/:id', (req, res) => {
//   const todoId = req.params.id;

//   Todo.findByIdAndRemove(todoId)
//     .then(() => {
//       // res.json({
//       //   confirmation: "Deleted"
//       // });
//       res.redirect('/todo');
//     })
//     .catch((err) => {
//       console.log(err)
//     });
// });

module.exports = router;