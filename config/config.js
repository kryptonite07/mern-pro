module.exports = require('./env '+ process.env.NODE_ENV + '.js');
express.js
var express = require(express),
    bodyParser = require(body-parser),
    morgan = require(morgan),
    passport = require(passport),
    cors = require(cors),
    methodOverride = require(method-override),
     path = require(path),
    routers = require('./routers');

module.exports = () => {

    var app = express();    

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cors());
    app.use(morgan(dev));
    app.use(methodOverride());

    app.use(passport.initialize());
    app.use(passport.session());

    routers.map(router => {
        app.use(`api${router}`, require(`..routers${router}.router`));
    });

     app.use(express.static(path.resolve(__dirname, '..views')));
     app.get('*', (req, res) = res.sendFile(path.resolve(__dirname, "..views", index.html)));

    return app;
}