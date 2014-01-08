exports.index = function (req, res) {

    console.log( req.headers["accept-language"].split(',')[0]);


    res.render('index', {
        title: req.app.get('title'),
        locale: req.headers["accept-language"].split(',')[0] || req.app.get('locale'),
        nowDate: new Date(),
        MESSAGE: [
            { valueName: 'FIRSTNAME' },
            ' ',
            { valueName: 'LASTNAME' },
            ' has ',
            {
                type: 'plural',
                valueName: 'NUM_BOOKS',
                options: {
                    one: '${#} book',
                    other: '${#} books'
                }
            },
            '.'
        ],
        FIRSTNAME: 'Anthony',
        LASTNAME: 'Pipkin',
        NUM_BOOKS: 2,
        NOW_DATE: new Date()
    });
};