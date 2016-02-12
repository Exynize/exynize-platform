import Botkit from 'botkit';

export default (token, data) => Rx.Observable.create(obs => {
    const controller = Botkit.slackbot({debug: false});
    const bot = controller.spawn({token}).startRTM(err => {
        if (err) {
            obs.onError(err);
            return;
        }

        const result = data.Abstract ? data.Abstract :
            data.RelatedTopics[0] ? data.RelatedTopics[0].Text :
            false;

        bot.reply({
            type: data.type,
            channel: data.channel,
            user: data.user,
            text: data.text,
            ts: data.tx,
            team: data.team,
            event: data.event,
        }, result ? `Here's what I found: \n> ${result}` : `Sorry, couldn't find anything :(`);
        obs.onCompleted();
    });

    return () => {
        bot.closeRTM();
    };
});
