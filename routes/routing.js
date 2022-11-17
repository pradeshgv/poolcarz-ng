const express = require('express');
const routing = express.Router();
const notesController = require('../Controllers/rides');
const notesController1 = require('../Controllers/users');
const notesController2 = require('../Controllers/booking');
routing.get('/rides',(rq, rs,n)=>{console.log("hello");n()}, notesController.getNotes);
routing.post('/rides', notesController.newNotes);
routing.put('/rides/:id', notesController.updateNotes);
routing.delete('/rides/:id', notesController.deleteNotes);
routing.all('/rides*', notesController.invalid);

routing.get('/users', notesController1.getNotes);
routing.post('/users', notesController1.newNotes);
routing.put('/users/:id', notesController1.updateNotes);
routing.delete('/users/:id', notesController1.deleteNotes);
routing.all('users*', notesController1.invalid);

routing.get('/booking', notesController2.getNotes);
routing.post('/booking', notesController2.newNotes);
routing.delete('/booking/:id', notesController2.deleteNotes);
routing.all('booking*', notesController2.invalid);
module.exports = routing;