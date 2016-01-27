import Twit from 'twit';

export default (
    consumer_key,
	consumer_secret,
	access_token,
	access_token_secret,
    filter_lang,
    keyword,
    obs
) => {
    const T = new Twit({
        consumer_key,
        consumer_secret,
        access_token,
        access_token_secret,
    });

    const stream = T.stream('statuses/filter', {track: keyword});
    stream.on('tweet', (tweet) => {
        const data = {
            id: tweet.id,
            created_at: tweet.created_at,
            text: tweet.text,
            username: tweet.user.name,
            lang: tweet.lang,
            url: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
        };
        if (filter_lang === data.lang) {
            obs.onNext(data);
        }
    });
    stream.on('error', error => obs.onError(error));
};
