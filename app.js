
var express = require('express'),
    engines = require('consolidate'),
    handlebars = require('handlebars'),
    routes = require('./routes'),

    http = require('http'),
    path = require('path'),

    intl = require('intl'),
    intlMsgFormat = require('intl-messageformat'),
    handlebarsHelperIntl = require('handlebars-helper-intl'),

    app = express();

handlebarsHelperIntl.register(handlebars);

app.configure(function () {
    app.engine('handlebars', engines.handlebars);
    app.set('title', 'Full Intl');
    app.set('locale', 'en-US'); // default locale to be used if the req doesn't send one (uncommon)
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');
    app.set('view options', { layout: 'layouts/main' });
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure("development", function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

