const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const getAllJobs = async (req, res) => {
    res.send("Get All Jobs")
}

const getJob = async (req, res) => {
    res.send("Get Job")
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    res.send("Update Jobs")
}

const deleteJob = async (req, res) => {
    res.send("Delete Jobs")
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}