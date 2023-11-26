"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const express_session_1 = __importDefault(require("express-session"));
const UserCounter_1 = require("./UserCounter");
const app = (0, express_1.default)();
app.engine('handlebars', (0, express_handlebars_1.engine)());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use((0, express_session_1.default)({
    secret: 'keyb0@rd c@tz',
    resave: false,
    saveUninitialized: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
const PORT = process.env.PORT || 8081;
const unAuthPaths = new Map();
unAuthPaths.set('/login', 1);
const userCounter = new UserCounter_1.UserCounter();
app.use(function (req, res, next) {
    const unAuthPath = unAuthPaths.get(req.path);
    if (unAuthPath) {
        next();
    }
    else {
        // console.log("---")
        if (!req.session.username) {
            res.redirect('/login');
        }
        else {
            next();
        }
    }
});
app.get('/login', function (req, res) {
    res.render('login');
});
app.post('/login', function (req, res) {
    const { username } = req.body;
    if (username) {
        req.session.username = username;
        res.redirect("/");
    }
    else {
        res.redirect("/login");
    }
});
app.post("/increment", function (req, res) {
    const { username } = req.session;
    userCounter.increment(username);
    res.redirect("/");
});
app.post("/decrement", function (req, res) {
    const { username } = req.session;
    userCounter.decrement(username);
    res.redirect("/");
});
app.get('/', function (req, res) {
    const { username } = req.session;
    res.render('index', { username, counter: userCounter.counter(username) });
});
app.post("/logout", function (req, res) {
    delete req.session.username;
    res.redirect("/login");
});
app.listen(PORT, () => console.log(`App started on port => ${PORT}`));
