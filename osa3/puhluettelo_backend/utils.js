const newErr = (name, message) => {
    const error = new Error();
    error.name = name;
    error.message = message;
    return error;
};

const errors = Object.freeze({
    BodyMissingError: newErr("BodyMissingError", "The required body is missing"),
    BodyFormatError: newErr("BodyFormatError", "The provided body is of wrong format"),
    NotFoundError: newErr("NotFoundError", "The id is not associated with any record")
});

module.exports = {errors};