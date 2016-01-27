import Botkit from 'botkit';

export default (token, obs) => {
    const controller = Botkit.slackbot({debug: false});
    controller.spawn({token}).startRTM(err => err && obs.onError(err));
    controller.on('direct_mention', (bot, message) => {
        obs.onNext(message);
    });
};
