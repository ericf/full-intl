exports.index = function (req, res) {
    res.render('index', {
        title: 'Express',
        locale: 'en-US',
        nowDate: new Date(),
        msg: [
            {
                valueName: 'FIRSTNAME'
            },
            ' ',
            {
                valueName: 'LASTNAME'
            },
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