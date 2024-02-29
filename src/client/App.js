import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions';

// Página para ter um local em comum para colocar alguns componentes como footer e header que é em comum a todas as páginas
const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};