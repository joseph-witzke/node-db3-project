const Scheme = require('../schemes/scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const { scheme_id } = req.params;
  Scheme.findById(scheme_id)
    .then((scheme) => {
      if (!scheme) {
        res
          .status(404)
          .json({ message: `scheme with scheme_id ${scheme_id} not found` });
      } else {
        req.scheme = scheme;
        next();
      }
    })
    .catch(next);
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if (
    !scheme_name ||
    typeof scheme_name !== 'string' ||
    scheme_name.trim().length === 0
  ) {
    res.status(400).json({ message: 'invalid scheme_name' });
  } else {
    req.scheme = req.body;
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
