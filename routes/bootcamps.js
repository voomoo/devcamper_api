const express = require("express");

//import controller methods
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload,
} = require("../controllers/bootcamps");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");
const Bootcamp = require("../models/Bootcamp");

//Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

//Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

//mount controller methods to routes
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
    .route("/")
    .get(advancedResults(Bootcamp, "courses"), getBootcamps)
    .post(protect, authorize("publisher", "admin"), createBootcamp);

router
    .route("/:id")
    .get(getBootcamp)
    .put(protect, authorize("publisher", "admin"), updateBootcamp)
    .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

router
    .route("/:id/photo")
    .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

module.exports = router;
