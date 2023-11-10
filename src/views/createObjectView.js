const views = require('./index');

const createObjectView = (viewType, destObject) => {
    const template = views[viewType];

    // todo
    // na bazie template "kroimy" destObject
    // zwracamy okrojony obiekt
    // jak coś jest nie tak to throw Error
    // zrobić do tego custom error
    // { error: "" } zwrot
};

module.exports = createObjectView;
