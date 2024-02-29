import 'babel-polyfill';
//const express = require('express');
//const React = require('react')
//const reactToString = require('react-dom/server').renderToString; // transforma tudo em uma string
//const Home = require('./client/components/Home').default; // default serve para pegar o arquivo padrão (index.js)

import express from 'express'; // REFATORAÇÃO
// import React from 'react'; // REFATORAÇÃO
// import { renderToString } from 'react-dom/server'; // REFATORAÇÃO
// import Home from './client/components/Home' // REFATORAÇÃO - aqui com o ES2015 já é interpretado que o arquivo padrão é o index.js 

// Com o arquivo webpack.server.js, agora pode ser executado jsx facilmente pelo node.

import renderer from "./helpers/renderer";
import createStore from './helpers/createStore';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import proxy from 'express-http-proxy';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com/', { // Se o navegador fizer uma solicitação ao servidor com a rota /api, tentaremos enviar para o servidor proxy 
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000'
        return opts
    }
})) 

app.use(express.static("public")); // pasta disponível para o mundo externo, estático

app.get('*', (req, res) => { // * para pegar qualquer rota após a barra
    
    //const content = reactToString(<Home/>); -- REFATORAÇÃO
    
    //const content = renderToString(<Home/>); -- REFATORAÇÃO

    // Quando o usuário receber a resposta desta requisição, irá ver o mesmo conteudo (content) do html 
    // mas ao mesmo tempo vai falar ao browser do usuário que precisa voltar ao servidor e baixar o bundle client side
    // Ali no src não precisa colocar a pasta public porque ela já foi inicializada ali em cima 
   
    // REFATORAÇÃO
    // const html = `
    //     <html>
    //         <head></head>
    //         <body>
    //             <div id="root">${content}</div>
    //             <script src="bundle.js"></script>
    //         </body>
    //     </html>
    // `;

    // res.send(content); -- REFATORAÇÃO
    // res.send(html); // -- REFATORAÇÃO agora está olhando para o conteúdo html e o script dentro do bundle da pasta public
    
    const store = createStore(req);

    // VAMOS PEGAR A ROTA QUE O USUÁRIO QUER ACESSAR E CONSULTAR O COMPONENTE DE ROTAS PARA IDENTIFICAR O COMPONENTE

    const promises = matchRoutes(Routes, req.path).map(({route}) => { // A função matchRoutes vcai verificar a rota e vai retorar um array de componentes que será renderizado
        return route.loadData ? route.loadData(store) : null;
    }).map(promise => {
        if(promise) {
            return new Promise((resolve, reject) => { // Criando uma nova promise para aguardar que todas as outras sejam completas antes de falhar a promise e executar a ação
                promise.then(resolve).catch(resolve); // A promise sempre vai ser resolvida
            });
        }
    });

    Promise.all(promises).then(() => { // Quando todas as promisses forem resolvidas, ele cai no then. Caso alguma promisse esperada dentre as promisses seja rejeitada, ele cai no catch
        const context = {};

        const content = renderer(req, store, context);

        if(context.url) {
            return res.redirect(301, context.url);
        }

        if(context.notFound) {
            res.status(404);
        };

        res.send(content);
        //res.send(renderer(req, store)); // REFATORAÇÃO PARA ADICIONAR CONTEXTO - Conteúdo html em outro arquivo. Req é o caminho que o usuário solicitou
    });

    //res.send(renderer(req)); -- REFATORAÇÃO // Conteúdo html em outro arquivo. Req é o caminho que o usuário solicitou
});

app.listen(3000, () => {
    console.log("Porta 3000")
})