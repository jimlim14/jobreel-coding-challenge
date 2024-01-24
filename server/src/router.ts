const Router = require('express');
const router = new Router();

const {
	getResumes,
	postResume,
	editResume,
} = require('./controllers/controller');

// routes for resumes
router.get('/resumes', getResumes);
router.post('/resumes', postResume);
router.put('/resumes/:id', editResume)

module.exports = router;
