var express = require('express'),
    exphbs = require('express3-handlebars'),
    routes = require('./routes'),
    http = require('http'),

    intl = require('intl'),
    intlMsgFormat = require('intl-messageformat'),
    handlebarsHelperIntl,

    app = express(),
    hbs = exphbs.create({
        defaultLayout: 'main'
    });

global.Intl || (global.Intl = global.IntlPolyfill);

handlebarsHelperIntl = require('handlebars-helper-intl');
require('intl-messageformat/locale-data/en.js');
handlebarsHelperIntl.register(hbs.handlebars);


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('title', 'Full Intl');
app.set('locale', 'en-US'); // default locale to be used if the req doesn't send one (uncommon)
app.set('port', process.env.PORT || 3000);


app.configure("development", function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});





