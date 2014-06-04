'use strict';

var Intl = global.Intl || require('intl');

// TODO: This should be required by `handlebars-helper-intl`.
require('intl-messageformat');

var fs           = require('fs'),
    path         = require('path'),
    express      = require('express'),
    errorHandler = require('errorhandler'),
    exphbs       = require('express3-handlebars'),
    Handlebars   = require('handlebars'),
    hbsIntl      = require('handlebars-helper-intl');

// -----------------------------------------------------------------------------

var app = express(),
    hbs = exphbs.create({defaultLayout: 'main'});

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    handlebars   : Handlebars
}));

hbsIntl.registerWith(Handlebars);

// Get list of the app's supported locales by looking for files in its i18n dir.
app.set('locales', fs.readdirSync('./i18n/').filter(function (file) {
    return path.extname(file) === '.json';
}).map(function (file) {
    return path.basename(file, '.json');
}));

app.set('default locale', 'en-US');

app.route('/')
    .get(function (req, res, next) {
        var app     = req.app,
            locales = app.get('locales'),
            locale  = req.acceptsLanguage(locales) || app.get('default locale');

        res.render('index', {
            intl: {
                locale  : locale,
                messages: require('./i18n/' + locale),

                formats: {
                    number: {
                        USD: {
                            style   : 'currency',
                            currency: 'USD'
                        }
                    }
                }
            },

            user: {
                firstName: 'Anthony',
                lastName : 'Pipkin',
                numBooks : 2000
            },

            now: new Date()
        });
    });

if (app.get('env') === 'development') {
    app.use(errorHandler());
}

app.listen(app.get('port'), function () {
    console.log('Full Intl server listening on port %d', app.get('port'));
});
