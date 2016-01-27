import sentiment from 'sentiment';

export default (data) => {
    const res = sentiment(data.text);
    data.sentiment = {
        score: res.score,
        comparative: res.comparative,
    };
    return Rx.Observable.return(data);
};
