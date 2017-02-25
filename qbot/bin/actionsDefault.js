'use strict';

let logger = action => {
    console.log(Date.now() + ':' + JSON.stringify(action));
};

module.exports = {
    'motor': {
        'list': logger,
        'get': logger,
        'set': logger,
        'setall': logger,
    },
    'led': {
        'list': logger,
        'get': logger,
        'set': logger,
    }
};
