const routeNotFound = (req, res) => {
    res.status(404).send(`OOPS...route ${req.url} doesn\'t exist`)
}

module.exports = routeNotFound;