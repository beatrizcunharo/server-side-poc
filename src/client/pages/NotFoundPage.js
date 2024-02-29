import React from "react"

// staticContext não existe no browser. Apenas o roteador estático (StaticRouter) implementa esse tipo de contexto porque recebemos outra informação no BrowserRouter
const NotFoundPage = ({ staticContext = {} }) => {
    staticContext.notFound = true // Se tiver essa propriedade e for igual a true, significa que algo de errado aconteceu na aplicação
    
    return <h1>Ooops, route not found.</h1>
}

export default {
    component: NotFoundPage
}