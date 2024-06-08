const response = (res, status, message, info) => {
	return res.status(status).send({ message, info });
};

module.exports = response;
