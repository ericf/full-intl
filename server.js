'use strict';

var express = require('express'),
    exphbs  = require('express3-handlebars'),
    fs      = require('fs'),
    path    = require('path'),

    routes = require('./routes');

// TODO: Awkward how these need to be required like this but never used. Should
// this be loading all of the `intl-messageformat` locale-data?
global.Intl || (global.Intl = require('intl'));
require('intl-messageformat');
require('intl-messageformat/locale-data/en');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers      : require('handlebars-helper-intl').helpers
}));

// Get list of the app's supported locales by looking for files in its i18n dir.
app.set('locales', fs.readdirSync('./i18n/').filter(function (file) {
    return path.extname(file) === '.json';
}).map(function (file) {
    return path.basename(file, '.json');
}));

app.locals({
    // Default locale
    locale: 'en-US'
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
