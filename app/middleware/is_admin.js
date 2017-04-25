
'use strict';

module.exports = (options, app) => {
   return function* (next) { 
        console.log(123123);
        yield next;
   };
};
