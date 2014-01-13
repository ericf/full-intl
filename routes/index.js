exports.index = function (req, res) {

    var locale = req.headers['accept-language'].split(',')[0] ||
            app.locals.locale;

    res.render('index', {
        locale: locale,
        i18n  : require('../i18n/' + locale),

        user: {
            firstName: 'Anthony',
            lastName : 'Pipkin',
            numBooks : 2
        }
    });
};
