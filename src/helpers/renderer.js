import React from "react";
import { renderToString } from "react-dom/server";
//import Home from "../client/components/Home"; -- REFATORAÇÃO para colucionar o problema de uma div que está sendo renderizada no client antes do html estar distinda do que está sendo renderizado no servidor
import { StaticRouter } from "react-router-dom";
import Routes from "../client/Routes";
import { renderRoutes } from 'react-router-config'
import { Provider } from "react-redux";
import serialize from 'serialize-javascript'// Vai verificar os caracteres em relação aos da tag de script, substitui para um código, não permitindo que o script infiltre na página
import { Helmet } from "react-helmet";

export default (req, store, context) => {
    //const content = renderToString(<Home/>); -- REFATORAÇÃO
    
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                {/* <Routes/>  -- REFATORAÇÃO*/}
                <div>
                    {renderRoutes(Routes)}
                    {/* render routes pega um array de objetos de rotas de página e transforma em componente normal de rotas. */}
                </div>
            </StaticRouter>
        </Provider>
    )

    const helmet = Helmet.renderStatic();

    return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.INITIAL_STATE = ${serialize(store.getState())}
                </script>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
};