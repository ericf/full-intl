exports.index = function (req, res) {
    var app     = req.app,
        locales = app.get('locales'),
        locale  = req.acceptsLanguage(locales) || app.get('default locale');

    res.render('index', {

        intl: {
            locale  : locale,
            messages: require('../i18n/' + locale),
            formats: {
                number: {
                    usd: { style: 'currency', currency: 'USD' }
                }
            }
        },

        user: {
            firstName: 'Anthony',
            lastName : 'Pipkin',
            numBooks : 2000,
            dateBooks: new Date(),
            price    : 20.00

        }
    });
};
