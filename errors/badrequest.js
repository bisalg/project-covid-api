const CustomERR = require("./customerror");

class BadRequest extends CustomERR {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}

module.exports = BadRequest;