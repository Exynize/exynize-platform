import {DDG} from 'node-ddg-api';

const ddg = new DDG('exynize-ddg');

export default (data) => Rx.Observable
    .return(data)
    .flatMap(input => Rx.Observable.create(obs => {
        ddg.instantAnswer(input.text, {skip_disambig: '0'}, (err, res) => {
            if (err) {
                obs.onError(err);
                return;
            }

            obs.onNext(Object.assign({}, data, res));
            obs.onCompleted();
        });
    }));
