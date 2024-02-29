import React, { Component } from "react";
import { connect } from "react-redux"; 
import { Redirect } from 'react-router-dom'; // Sefor renderizado na tela, pegará o usuário e redirecionará ele para outro local dentro da aplicação

// HIGHER-ORDER COMPONENT
// Utilizando esse componente, é mais fácil adicionar o requisito de autenticação a páginas diferentes ou componentes diferentes. Serve para outras situações mas esse é um dos exemplos
export default ChildComponent => {
    class RequireAuth extends Component {
        render () {
            switch (this.props.auth) { // baseado no reducer auth
                case false:
                    return <Redirect to="/" />;
                case null:
                    return <div>Loading...</div>;
                default:
                    return <ChildComponent {...this.props} />;
            }
        }
    }

    function mapStateToProps({ auth }) {
        return { auth };
    }

    return connect(mapStateToProps)(RequireAuth);
};