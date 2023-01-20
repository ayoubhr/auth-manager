import { check } from 'express-validator';

// Chain of validation that checks if input data for /register is present and correct.
const validateRegisterInput = [
  check('name').notEmpty().withMessage('Name input is empty.').isString().withMessage('Name input must be in string format.'),
  check('surname').notEmpty().withMessage('Surname input is empty.').isString().withMessage('Surname input must be in string format.'),
  check('email').notEmpty().withMessage('Email input is empty.').isEmail().withMessage('Provided email is not in correct format.'),
  check('password').notEmpty().withMessage('Password input is empty.').isLength({ min: 8 }).withMessage('You have to provide a correct password.')
]

// Chain of validation that checks if input data for /login is present and correct.
const validateLoginInput = [
  check('email').notEmpty().withMessage('Email input is empty.').isEmail().withMessage('Provided email is not in correct format.'),
  check('password').notEmpty().withMessage('Password input is empty.').isLength({ min: 8 }).withMessage('You have to provide a correct password.'),
]

const validate = {
  reqRegisterInputData: validateRegisterInput,
  reqLoginInputData: validateLoginInput
}

export default validate