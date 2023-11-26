import express, { Request, Response } from "express";
import { engine } from 'express-handlebars';
import session from "express-session";
import { UserCounter } from "./UserCounter";

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(session({
    secret: 'keyb0@rd c@tz',
    resave: false,
    saveUninitialized: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 8081;

const unAuthPaths = new Map<string, number>();
unAuthPaths.set('/login', 1);

const userCounter = new UserCounter();

app.use(function (req, res, next) {

    const unAuthPath: number | undefined = unAuthPaths.get(req.path);
    if (unAuthPath) {
        next();
    } else {
        // console.log("---")
        if (!req.session.username) {
            res.redirect('/login');
        } else {
            next();
        }
    }
})

app.get('/login', function (req: Request, res: Response) {
    res.render('login')
})

app.post('/login', function (req: Request, res: Response) {
    const { username } = req.body;
    if (username) {
        req.session.username = username;
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
});

app.post("/increment", function (req, res) {
    const { username } = req.session;
    userCounter.increment(username);
    res.redirect("/")
});

app.post("/decrement", function (req, res) {
    const { username } = req.session;
    userCounter.decrement(username);
    res.redirect("/");
});

app.get('/', function (req: Request, res: Response) {
    const { username } = req.session;
    res.render('index', { username, counter: userCounter.counter(username) })
});

app.post("/logout", function (req, res) {
    delete req.session.username;
    res.redirect("/login");
});


app.listen(PORT, () => console.log(`App started on port => ${PORT}`));