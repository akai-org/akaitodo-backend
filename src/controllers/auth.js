const db = require("../models/index")
const AccessToken = db.AccessToken;

// Function to generate new token
// & after auth user login request
const generate = async(req, res) => {

};

// Function to valid JWT token pass by client request
// we dont export path to this function in router!!!
const validate = async(req, res) => {

}

// Function to check if token don't expiry
const isExpired = async(req, res) => {

};

// Refresh token
const refresh = async(req, res) => {

};

const remove = async(req, res) => {

};

module.exports = { generate, validate, isExpired, refresh, remove }