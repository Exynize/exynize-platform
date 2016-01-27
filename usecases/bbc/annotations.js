import _ from 'lodash';
import request from 'request';

// FOX NLP tool API url
const foxUrl = 'http://fox-demo.aksw.org/call/ner/entities';

export default (data) => Rx.Observable.create(obs => {
    const json = {
        input: data.text,
        type: 'text',
        task: 'ner',
        output: 'JSON-LD',
    };
    request({
        method: 'POST',
        url: foxUrl,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    }, (err, res, body) => {
        if (err) {
            obs.onError(err);
            return;
        }

        if (res && res.statusCode !== 200) {
            obs.onError(`Error code: ${res.statusCode}, ${res.statusMessage}`);
            return;
        }

        const result = JSON.parse(body);
        const entries = result['@graph'] ? result['@graph'] : [];
        const annotations = entries.map(it => ({
            types: it['@type'] ? it['@type']
                .map(t => t.indexOf(':') !== -1 ? t.split(':')[1] : t)
                .map(t => t.toLowerCase())
                .map(_.capitalize)
                .filter(t => t !== 'Annotation') : [],
            name: it['ann:body'],
            beginIndex: typeof it.beginIndex === 'string' ? [it.beginIndex] : it.beginIndex,
            endIndex: typeof it.endIndex === 'string' ? [it.endIndex] : it.endIndex,
        }));
        data.annotations = annotations;
        obs.onNext(data);
        obs.onCompleted();
    });
});
