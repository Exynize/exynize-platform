const renderTweet = (tweet) => (
    <div className="list-group" key={tweet.id}>
        <div className="list-group-item">
            <div className="row-content">
                <div className="least-content">
                    <span className={'label label-' + (
                            tweet.sentiment.score === 0 ? 'default' :
                                tweet.sentiment.score > 0 ? 'success' : 'danger'
                    )}>
                        {tweet.sentiment.score}
                    </span>
                </div>
                <h4 className="list-group-item-heading">
                    {tweet.username}
                </h4>

                <div className="list-group-item-text">
                    <p className="text-muted">{tweet.text}</p>
                </div>
            </div>
        </div>
    </div>
);

const overallSentiment = (collection) => (
    <h3>
        Positive:
        <span className="label label-success" style={{marginLeft: 10, marginRight: 10}}>
            {collection.reduce((sum, it) => sum += it.sentiment.score > 0 ? it.sentiment.score : 0, 0)}
        </span>

        Negative:
        <span className="label label-danger" style={{marginLeft: 10, marginRight: 10}}>
        {collection.reduce((sum, it) => sum += it.sentiment.score < 0 ? it.sentiment.score : 0, 0)}
        </span>

        Total:
        <span className="label label-info" style={{marginLeft: 10, marginRight: 10}}>
        {collection.reduce((sum, it) => sum += it.sentiment.score, 0)}
        </span>
    </h3>
);

export default () => React.createClass({
    render() {
        const iphone = this.props.data.filter(tweet => tweet.text.toLowerCase().indexOf('iphone') !== -1);
        const galaxy = this.props.data.filter(tweet => tweet.text.toLowerCase().indexOf('galaxy') !== -1);

        return (
            <div className="container-fluid" style={{marginTop: 20}}>
                <div className="row">
                    {/* iphone col */}
                    <div className="col-xs-6">
                        <h1>iPhone 6s</h1>
                        {overallSentiment(iphone)}
                        {iphone.slice(0, 10).map(renderTweet)}
                    </div>

                    {/* galaxy col */}
                    <div className="col-xs-6">
                        <h1>Galaxy S6</h1>
                        {overallSentiment(galaxy)}
                        {galaxy.slice(0, 10).map(renderTweet)}
                    </div>
                </div>
            </div>
        );
    }
});
