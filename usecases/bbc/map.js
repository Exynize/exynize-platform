import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const styleGray = '#cccccc';
const styleGreen = '#5cb85c';
const styleRed = '#d9534f';

const mapConfig = {
    minZoom: 2,
    maxZoom: 20,
    layers: [
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>' +
                    ' contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            }
        )
    ],
    attributionControl: false,
};

const popup = (it) => `
<a href="${it.link}" target="_blank">${it.title}</a>
<div>${it.description}</div>
`;

export default() => React.createClass({
    componentDidMount() {
        // init
        this.map = L.map(this.refs.map, mapConfig);
        this.map.setView([-10, 10], 2);
    },
    componentWillReceiveProps(props) {
        // render items
        props.data.forEach(this.renderItem);
    },
    renderItem(it) {
        if (!it.places) {
            return;
        }
        // go over location
        it.places.forEach((loc) => {
            // do not render location with -1 -1 as lat or lon
            if (loc.lat === -1 || loc.lon === -1) {
                return;
            }

            const color = it.sentiment.score === 0 ? styleGray :
                    it.sentiment.score > 0 ? styleGreen : styleRed;
            const marker = L.circle([loc.lat, loc.lon], 100000, {
                stroke: false,
                fillColor: color,
                fillOpacity: 0.8,
                className: 'leaflet-marker-animated',
            }).addTo(this.map);
            marker.bindPopup(popup(it));
        });
    },

    render() {
        return (
            <div id="map" ref="map" style={{width: '100%', height: '100%', position: 'absolute'}}></div>
        );
    },
});
