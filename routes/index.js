exports.index = function (req, res) {

    console.log(req.app.get('title'));

    res.render('index', {
        title: req.app.get('title'),
        locale: req.app.get('locale'),
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