const express = require('express')
const { getAllJobs, createJob, getJob, updateJob, deleteJob } = require('../controllers/jobs')
const router = express.Router()

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).put(updateJob).delete(deleteJob);

module.exports = router