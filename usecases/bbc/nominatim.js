import _ from 'lodash';
import nominatim from 'nominatim';

const observableSearch = Rx.Observable.fromNodeCallback(nominatim.search);

export default (inputData) => Rx.Observable.return(inputData)
.flatMap(data => {
    // if no annotations - just die
    if (!data.annotations) {
        return Rx.Observable.return(data);
    }

    if (!data.places) {
        data.places = [];
    }

    return Rx.Observable.merge(data.annotations.map(annotation => {
        if (_.includes(annotation.types, 'Location')) {
            return observableSearch({q: annotation.name})
            .map(([opt, results]) => {
                if (results && results[0]) {
                    return {
                        name: opt.q,
                        lat: results[0].lat,
                        lon: results[0].lon,
                    };
                }

                return undefined;
            });
        }

        return Rx.Observable.return(undefined);
    }))
    .filter(loc => loc !== undefined)
    .reduce((acc, place) => [place, ...acc], [])
    .map(places => {
        data.places = places;
        return data;
    });
});
