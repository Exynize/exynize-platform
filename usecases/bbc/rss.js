import FeedParser from 'feedparser';
import request from 'request';

export default (url, obs) => {
    const req = request(url);
    const feedparser = new FeedParser();

    // handle errors
    req.on('error', err => obs.onError(err));
    feedparser.on('error', err => obs.onError(err));

    // pipe request into feedparser
    req.on('response', function(res) {
        const stream = this;
        if (res.statusCode !== 200) {
            return this.emit('error', new Error('Bad status code'));
        }
        stream.pipe(feedparser);
    });

    // process articles
    feedparser.on('readable', function() {
        const stream = this;
        let item;
        while (item = stream.read()) {
            obs.onNext(item);
        }
        // finish
        // obs.onCompleted();
    });
    // trigger end once done
    feedparser.on('end', () => obs.onCompleted());
};
