const Form = require("../models/formSchema")
const User = require("../models/userSchema")

exports.homeController = (req, res) => {
    return res.render('home', {
        title: 'InputFlow', 
        style: ['home'], 
        script: ['landing-navbar'], 
        isLoggedIn: req.session.isLoggedIn, 
        user: req.session.user
    })
}

exports.dashboardController = async (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.render('loginNotFound', {
            title: 'Login not found', 
            style: ['loginNotFound'], 
            script: ['navbar'], 
            isLoggedIn: req.session.isLoggedIn, 
            user: req.session.user
        })
    }

    let addedFormIds = new Set()

    let forms = []

    const user = await User.findOne({ username: req.session.user.username })

    for (const formId of user.publishedForm) {
        const form = await Form.findOne(
            {formId},
            { _id: 0, formId: 1, title: 1, createdAt: 1, updatedAt: 1 }
        )
        if (form) {
            form.publishedStatus = true
            forms.push(form)
            addedFormIds.add(formId)
        }
    }

    for (const formId of user.createdForm) {
        if (addedFormIds.has(formId)) continue
        const form = await Form.findOne(
            {formId},
            { _id: 0, formId: 1, title: 1, createdAt: 1, updatedAt: 1 }
        )
        if (form) {
            form.publishedStatus = false
            forms.push(form)
        }
    }

    return res.render('dashboard', {
        title: 'Dashboard',
        style: ['dashboard'],
        script: ['navbar', 'dashboard'],
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        forms
    })
}

exports.createController = (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.render('loginNotFound', {
            title: 'Login not found', 
            style: ['loginNotFound'], 
            script: ['navbar'], 
            isLoggedIn: req.session.isLoggedIn, 
            user: req.session.user
        })
    }

    return res.render('create', {
        title: 'Creating form', 
        style: ['create'], 
        script: ['navbar', 'create', 'create-save'], 
        isLoggedIn: req.session.isLoggedIn, 
        user: req.session.user
    })
}

exports.createSubmitController = async (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.render('loginNotFound', {
            title: 'Login not found', 
            style: ['loginNotFound'], 
            script: ['navbar'], 
            isLoggedIn: req.session.isLoggedIn, 
            user: req.session.user
        })
    }

    const { formId, title, description, formData } = req.body

    const newForm = new Form({ formId, title, description, formData })
    await newForm.save()

    const user = await User.findOne({ username: req.session.user.username })
    if (user) {
        user.createdForm.push(formId)
        await user.save()
    }

    return res.render('createSave', {
        title: 'Form created',
        style: ['createSave'],
        script: ['navbar'],
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        formId
    })
}

exports.createSaveController = (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.render('loginNotFound', {
            title: 'Login not found', 
            style: ['loginNotFound'], 
            script: ['navbar'], 
            isLoggedIn: req.session.isLoggedIn, 
            user: req.session.user
        })
    }
    
    const formId = req.query.formId
    res.render('createSave', {
        title: 'Form created', 
        style: ['createSave'], 
        script: ['navbar'], 
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        formId
    })
}

exports.publishController = (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.render('loginNotFound', {
            title: 'Login not found', 
            style: ['loginNotFound'], 
            script: ['navbar'], 
            isLoggedIn: req.session.isLoggedIn, 
            user: req.session.user
        })
    }

    const formId = req.query.formId
    User
    .findOne({username: req.session.user.username})
    .then(async (user) => {
        if (user) {
            user.publishedForm.push(formId)
            await user.save()
        }
        return res.redirect('/dashboard')
    })
}

exports.unpublishController = (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.render('loginNotFound', {
            title: 'Login not found', 
            style: ['loginNotFound'], 
            script: ['navbar'], 
            isLoggedIn: req.session.isLoggedIn, 
            user: req.session.user
        })
    }

    const formId = req.query.formId
    User
    .findOne({username: req.session.user.username})
    .then(async user => {
        user.publishedForm.pull(formId)
        await user.save()
        return res.redirect('/dashboard')
    })
}

exports.removeController = async (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.render('loginNotFound', {
            title: 'Login not found', 
            style: ['loginNotFound'], 
            script: ['navbar'], 
            isLoggedIn: req.session.isLoggedIn, 
            user: req.session.user
        })
    }

    const formId = req.query.formId
    await Form.findOneAndDelete({formId})
    User
    .findOne({username: req.session.user.username})
    .then(async user => {
        if (user.publishedForm.includes(formId)) user.publishedForm.pull(formId)
        if (user.createdForm.includes(formId)) user.createdForm.pull(formId)
        await user.save()
    })
    return res.redirect('/dashboard')
}

exports.formViewController = (req, res) => {
    let formId = req.params.formId
    Form
    .findOne({formId})
    .then(form => {
        if (form) {
            return res.render('viewForm', {
                title: form.title + ' - InputFlow', 
                style: ['viewForm'], 
                script: ['navbar', 'viewForm'], 
                isLoggedIn: req.session.isLoggedIn, 
                user: req.session.user,
                form,
                isOwner: true
            })
        } else {
            return res.render('viewForm', {
                title: form.title + ' - InputFlow', 
                style: ['viewForm'], 
                script: ['navbar', 'viewForm'], 
                isLoggedIn: req.session.isLoggedIn, 
                user: req.session.user,
                form,
                isOwner: false
            })
        }
    })
    .catch(err => {
        return res.render('viewForm', {
            title: `Form: ${formId}`, 
            style: ['viewForm'], 
            script: ['navbar', 'viewForm'], 
            isLoggedIn: req.session.isLoggedIn, 
            user: req.session.user,
            form: {},
            isOwner: false
        })
    })
}

exports.pageNotFoundController = (req, res) => {
    return res.render('pageNotFound', {
        title: 'Page not found', 
        style: ['pageNotFound'], 
        script: ['navbar'], 
        isLoggedIn: req.session.isLoggedIn, 
        user: req.session.user
    })
}

exports.submitController = (req, res) => {
    let responseData = req.body
    return res.render('submit', {
        title: 'Form submitted', 
        style: ['submit'], 
        script: ['navbar'], 
        isLoggedIn: req.session.isLoggedIn, 
        user: req.session.user,
        formId: responseData.formId
    })
}