# simple ecommerce register/login with fav/unfav


#### NOTE: a new version of this project: https://github.com/fej0se/nestjs-usersfavorites-ecommerce



## How to use!
Clone o repositório, e no terminal digite os seguintes comandos:


* npm install
* npm start


Agora o servidor já estará rodando na porta 3333.






### base url
URL: http://localhost:3333/
<br>


<br>

## Rotas:


### POST cadastro de usuário
URL: http://localhost:3333/register


```JSON
{
	"username": "username",
	"email": "email",
	"password": "password"
}
```

<br>



### POST login
URL: localhost:3333/login





```JSON
{
	"username": "username",
	"password": "password"
}
````

<br>

### POST favoritar/desfavoritar produto
URL: http://localhost:3333/favorite/:id





#### Necessário passar o id do produto que deve ser favoritado/desfavoritado.


Em seguida será enviado um e-mail para o cliente com os produtos favoritos dele (consegui implementar o tempo de 2 minutos, mas retirei pois caso o cliente fizesse duas requisições, não funcionava direito, resolvi tirar).

<br>



### GET lista produtos favoritos


URL: http://localhost:3333/listfavs


Retorna um array com os produtos favoritados pelo cliente.
