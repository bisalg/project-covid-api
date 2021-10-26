const CustomERR = require("./customerror");

class NotFound extends CustomERR {
    constructor(message) {
        super(message)
        this.status = 404;
    }
}

module.exports = NotFound;