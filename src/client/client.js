// Client side aplication
import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
//import Home from "./components/Home"; REFATORAÇÃO
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { renderRoutes } from 'react-router-config'

// REDUX
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: '/api'
});

const store = createStore(
    reducers, 
    window.INITIAL_STATE, 
    applyMiddleware(thunk.withExtraArgument(axiosInstance)) // thunk pode conter argumento extra e o axios pode ser customizado
);

// Acha a div que roda no server com o id root. Não vai colocar o código por cima do que está no server mas está dizendo ao react para rodar todo o código necessário
// Para funcionar o javascript presente
//ReactDOM.hydrate(<Home/>, document.querySelector("#root")); // REFATORAÇÃO

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {renderRoutes(Routes)}
                {/* render routes pega um array de objetos de rotas de página e transforma em componente normal de rotas. */}
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')    
);
