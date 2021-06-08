const { Router } = require('express');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const { users, favs } = require('./database/data');
const axios = require('axios')
const sendMail = require('./utils/sendMail')

const routes = Router();
module.exports = { routes };

routes.get('/', (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.status(200).json({message: 'Olá!'});
        } else {
            throw new Error;
        }
    } catch (e) {
        res.status(401).json({ message: "Usuário não logado" });
    }

});

routes.post('/register', async (req, res) => {
    try {
        let userExist = users.find((data) => req.body.email === data.email);
        if (!userExist) {
            let cryptPassword = await bcrypt.hash(req.body.password, 10);
            let newUser = {
                id: uuid(),
                username: req.body.username,
                email: req.body.email,
                password: cryptPassword,
            };
            users.push(newUser);
            res.status(201).json({message: "Registrado com sucesso!"});
        } else {
            throw new Error;
        }
    } catch {
        res.status(400).json({ message: "Usuário já registrado" });
    }
});

routes.post('/login', async (req, res) => {
    try {
        let findUsername = users.find((data) => req.body.username === data.username);
        if (findUsername) {
            let password = req.body.password;
            let dbpassword = findUsername.password;
            const passwordMatch = await bcrypt.compare(password, dbpassword);

            if (passwordMatch) {
                req.session.loggedIn = true;
                req.session.user = req.body.username;
                req.session.mail = findUsername.email;
                console.log(req.session);
                res.status(200).json({ message: "logado com sucesso!" });
            } else {
                throw new Error
            }
        }
        else {
            throw new Error;
        }
    } catch {
        res.status(403).json({ Error: 'Senha ou Usuario invalidos!' });
    }
});

routes.get('/logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            req.session.destroy();
            res.status(200).json({ message: "Usuário deslogado" });
        } else {
            throw new Error;
        }
    } catch {
        res.status(401).json({ message: "Usuário não logado" });
    }
})

routes.post('/favorite/:id', async (req, res) => {
    const { id } = req.params;
    const { data } = await axios('https://fakestoreapi.com/products');
    const estoque = await data;
    try {
        if (req.session.loggedIn) {
            let index = favs.findIndex(value => value.id === id);
            if (index < 0) {
                favs.push({ id: id, user: req.session.user });
                res.status(200).json({message: "Favoritado"})
            } else {
                favs.splice(index, 1);
                res.status(200).json({message: "Desfavoritado"})

            }
            sendMail(req.session.mail, req.session.user, estoque);
        } else {
            throw new Error;
        }
    } catch {
        res.status(401).json({ message: "Usuário não logado" });
    }
})

routes.get('/listfavs', async (req, res) => {
    let userFavs = [];
    let favReturn = [];
    const { data } = await axios('https://fakestoreapi.com/products');
    const estoque = await data;
    try {
        if (req.session.loggedIn) {
            for (fav of favs) {
                if (fav.user === req.session.user) {
                    userFavs.push(fav);
                }
            }
            for (let i = 0; i < estoque.length; i++) {
                for (let y = 0; y < userFavs.length; y++) {
                    if (userFavs[y].id == estoque[i].id) {
                        favReturn.push(estoque[i]);
                    }
                }
            }
            res.send(favReturn);
        } else {
            throw new Error;
        }
    } catch {
        res.status(401).json({ message: "Usuário não logado" });
    }
})