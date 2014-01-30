'use strict';

global.Intl || (global.Intl = require('intl'));

var express = require('express'),
    exphbs  = require('express3-handlebars'),
    fs      = require('fs'),
    path    = require('path'),
    intlMsg = require('intl-messageformat'),
    hbsIntl = require('handlebars-helper-intl'),

    routes = require('./routes');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers      : hbsIntl.helpers
}));

// Setup Intl Message Format
require('intl-messageformat/locale-data/en');
// intlMsg.registerFormats({
//     date: {
//         short: {
//             month: 'numeric'
//         }
//     }
// });

// Get list of the app's supported locales by looking for files in its i18n dir.
app.set('locales', fs.readdirSync('./i18n/').filter(function (file) {
    return path.extname(file) === '.json';
}).map(function (file) {
    return path.basename(file, '.json');
}));

app.set('default locale', 'en-US');

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
