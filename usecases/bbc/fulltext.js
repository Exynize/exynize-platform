import request from 'superagent';
import cheerio from 'cheerio';

const cleanText = text => text
    .replace(/[\n\r\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/(\w)\.([A-Z0-9_])/g, '$1. $2');

const cleanHtml = html => html
    .replace(/[\n\r\t]+/g, ' ')
    .replace(/<!\[CDATA\[.+?\]\]>/g, ' ')
    .replace(/<!--.+?-->/g, ' ')
    .replace(/\s+/g, ' ');

export default (data) => {
    return Rx.Observable.create(obs => {
        const {link} = data;
        request
        .get(link)
        .end((err, res) => {
            if (err) {
                return obs.onError(err);
            }

            const $ = cheerio.load(res.text);
            $('script').remove();
            $('object').remove();
            // try to extract only article text
            let obj = $('.story-body__inner');
            if (!obj || !obj.length) {
                obj = $('body');
            }
            // cleanup
            $('figure', obj).remove();
            // get html and text
            const resHtml = cleanHtml(obj.html()); // BBC news selector
            const resText = cleanText(obj.text());

            // assign to data
            data.text = resText;
            data.html = resHtml;

            // send
            obs.onNext(data);
            obs.onCompleted();
        });
    });
};
