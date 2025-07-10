const log = (...data) => {
    console.log(...data);
};

const error = (...data) => {
    console.error(...data);
};

module.exports = {log, error};