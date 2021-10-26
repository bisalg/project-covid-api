const CustomERR = require("./customerror");

class UnAuthorized extends CustomERR {
    constructor(message) {
        super(message)
        this.status = 401;
    }
}

module.exports = UnAuthorized;