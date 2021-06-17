const path = require('path')

function isFileImage(fileName) {
    const AVAILABLE_EXTENSIONS = ['.jpg', '.jpeg', '.gif', '.png']
    const extension = path.extname(fileName)

    if (AVAILABLE_EXTENSIONS.includes(extension)) {
        return true
    }

    return false
}

module.exports = {
    isFileImage,
}