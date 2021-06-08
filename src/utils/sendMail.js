const {favs} = require('../database/data')
const sgMail = require('@sendgrid/mail')


sgMail.setApiKey('API KEY SENDGRID')

function sendMail(mail, user, estoque) {
    let userFavs = []
    let favReturn = []
    for (fav of favs) {
        if (fav.user === user) {
            userFavs.push(fav)
        }
    }
    for (let i = 0; i < estoque.length; i++) {
        for (let y = 0; y < userFavs.length; y++) {
            if (userFavs[y].id == estoque[i].id) {
                favReturn.push(estoque[i].title)
            }
        }
    }
  
    let msg = {
        to: mail, 
        from: 'EMAIL DA LOJA', 
        subject: 'Seus produtos favoritos',
        text: favReturn.toString(),
        html: favReturn.toString(),
    }

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

}

module.exports = sendMail