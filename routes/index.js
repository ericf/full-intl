exports.index = function (req, res) {

    var app    = req.app,
        locale = req.acceptsLanguage(app.get('locales')) || app.locals.locale;

    res.render('index', {
        locale: locale,
        i18n  : require('../i18n/' + locale),

        user: {
            firstName: 'Anthony',
            lastName : 'Pipkin',
            numBooks : 2000
        }
    });
};
