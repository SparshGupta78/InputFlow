//External modules
const { check, validationResult } = require("express-validator")

//Local modules
const User = require('../models/userSchema')

exports.signupController = (req, res) => {
    return res.render('signup', {title: 'Sign Up',
        style: ['signup'], 
        script: ['navbar'], 
        error: [], 
        oldInput: {firstName: '', lastName: '', phoneNo: '', username: ''}, 
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    })
}

exports.signupSubmitController = [
    check('firstName')
    .notEmpty()
    .withMessage('First name cannot be empty.')
    .trim()
    .isLength({min: 2})
    .withMessage('First name must be at least 2 character long.')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters.'),

    check('lastName')
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters.'),

    check('phoneNo')
    .notEmpty()
    .withMessage('Phone number cannot be empty.')
    .matches(/^[0-9]+$/)
    .withMessage('Phone number can only contain numbers.'),

    check('username')
    .notEmpty()
    .withMessage('Username cannot be empty.')
    .isLength({min: 3, max: 12})
    .withMessage('Username length must be between 3 and 12.')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores.'),

    check('password')
    .notEmpty()
    .withMessage('Password cannot be empty.')
    .isLength({min: 8})
    .withMessage('Password must be atleast 8 characters long.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain atleast one uppercase character.')
    .matches(/[a-z]/)
    .withMessage('Password must contain atleast one lowercase character.')
    .matches(/[0-9]/)
    .withMessage('Password must contain atleast one digit.')
    .matches(/[!@#$%^&*()_+-=]/)
    .withMessage('Password must contain atleast one special character[!@#$%^&*()_+-=].')
    .trim(),

    check('repassword')
    .trim()
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password does not matches with re-password.')
        }
        return true
    }),

    async (req, res) => {
        const {firstName, lastName, phoneNo, username, password} = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.render('signup', {
                title: 'Sign Up',
                style: ['signup'],
                script: ['navbar'],
                error: errors.array().map(err => err.msg),
                oldInput: {firstName, lastName, phoneNo, username},
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            })
        }

        try {
            const existingUser = await User.findOne({ username })
            if (existingUser) {
                return res.render('signup', {
                    title: 'Sign Up',
                    style: ['signup'],
                    script: ['navbar'],
                    error: ['This username is already taken.'],
                    oldInput: {firstName, lastName, phoneNo, username},
                    isLoggedIn: req.session.isLoggedIn,
                    user: req.session.user
                })
            }

            require('bcryptjs').hash(password, 12)
            .then(async (hashedPassword) => {
                const newUser = new User({firstName, lastName, phoneNo, username, password: hashedPassword})
                await newUser.save()
                return res.redirect('/login')
            })
            .catch(() => {
                return res.render('signup', {
                    title: 'Sign Up',
                    style: ['signup'],
                    script: ['navbar'],
                    error: ['Error saving details.'],
                    oldInput: {firstName, lastName, phoneNo, username},
                    isLoggedIn: req.session.isLoggedIn,
                    user: req.session.user
                })
            })
            
        } catch (err) {
            return res.render('signup', {
                title: 'Sign Up',
                style: ['signup'],
                script: ['navbar'],
                error: ['Error saving details.'],
                oldInput: {firstName, lastName, phoneNo, username},
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            })
        }
    }
]

exports.loginController = (req, res) => {
    return res.render('login', {
        title: 'Login',
        style: ['login'],
        script: ['navbar'],
        error: [],
        oldInput: {username: '', password: ''},
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    })
}

exports.loginSubmitController = [
    check('username')
    .notEmpty()
    .trim()
    .isLength({min: 3, max: 12})
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Invalid username.'),

    check('password')
    .notEmpty()
    .trim()
    .isLength({min: 8})
    .matches(/^[A-Za-z0-9!@#$%^&*()_+-=]+$/)
    .withMessage('Invalid password.'),

    (req, res) => {
        const {username, password} = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.render('login', {
                title: 'Login',
                style: ['login'],
                script: ['navbar'],
                error: errors.array().map(err => err.msg),
                oldInput: {username, password},
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            })
        }

        User
        .findOne({username})
        .then((user) => {
            if (!user) {
                return res.render('login', {
                    title: 'Login',
                    style: ['login'],
                    script: ['navbar'],
                    error: ['Username not found.'],
                    oldInput: {username, password},
                    isLoggedIn: req.session.isLoggedIn
                })
            }
            require('bcryptjs').compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.render('login', {
                        title: 'Login',
                        style: 'login',
                        script: ['navbar'],
                        error: ['Error finding details.'],
                        oldInput: {username, password},
                        isLoggedIn: req.session.isLoggedIn
                    })
                }
                if (!isMatch) {
                    return res.render('login', {
                        title: 'Login',
                        style: ['login'],
                        script: ['navbar'],
                        error: ['Wrong password.'],
                        oldInput: {username, password},
                        isLoggedIn: req.session.isLoggedIn
                    })
                }

                req.session.isLoggedIn = true
                req.session.user = user
                return res.redirect('/dashboard')
            })
        })
    }
]

exports.logoutController = (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie('connect.sid')
            return res.redirect('/login')
        }
        return res.redirect('/dashboard')
    })
}