const express = require('express');
const router = express.Router();

const {
  getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people')

//we set up a router in 12-router-app.js and there is no need to provide the whole route- we replace /api/people with / in all urls that use router

// router- method ( route- callback function)
router.get('/', getPeople);
router.post('/', createPerson);
router.post('/postman', createPersonPostman);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

//another method to set up a router:

// router.route('/').get(getPeople).post(createPerson);
// router.route('/postman').post(createPersonPostman);
//router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router