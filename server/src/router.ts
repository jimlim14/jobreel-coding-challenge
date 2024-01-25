const Router = require('express');
const router = new Router();

const {
	getResume,
	getResumes,
	postResume,
	editResume,
} = require('./controllers/resumes-controller');

// routes for resumes
router.get('/resumes/:id', getResume);
router.get("/resumes", getResumes);
router.post('/resumes', postResume);
router.put('/resumes/:id', editResume);

module.exports = router;
