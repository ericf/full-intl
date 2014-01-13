var express = require('express'),
    exphbs  = require('express3-handlebars'),

    routes = require('./routes');


// TODO: Awkward how these need to be required like this but never used.
require('intl');
require('intl-messageformat');
require('intl-messageformat/locale-data/en');
global.Intl || (global.Intl = global.IntlPolyfill);

var app = express();
app.set('port', process.env.PORT || 3000);

var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers      : require('handlebars-helper-intl').helpers
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.locals({
    title : 'Full Intl',

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
