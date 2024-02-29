//import { Route } from "react-router-dom"; - REFATORAÇÃO
import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";
import AdminsListPage from "./pages/AdminsListPage";

// export default () => { // REFATORAÇÃO
//     return (
//         <div>
//             <Route exact path="/" component={Home} /> 
//             <Route path="/users" component={UsersList} />
//         </div>
//     );
// }

export default [
    {
        ...App, // onde vai ficar componentes em comum das páginas
        routes: [
            {
                ...HomePage,
                path: "/",
                //component: HomePage, - REFATORAÇÃO
                exact: true // Só vai mostrar o componente se bater exatamente com o /. Ou seja, sem pegar outras rotas que tem barra como /users ou /admin
            },
            {
                ...UsersListPage,
                path: "/users",
                //component: UsersListPage, - REFATORAÇÃO
            },
            {
                ...AdminsListPage,
                path: "/admins",
            },
            {
                ...NotFoundPage, // Vai mostrar o componente caso nenhuma rota mapeada pertencente a esse arquivo for encontrada
            }
        ]
    },
    
];