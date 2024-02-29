
// WEBPACK DO LADO DO BROWSER
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const config = {
//module.exports = {   
    // Informar ao webpack o arquivo root da aplicação
    entry: './src/client/client.js',

    // Informar ao webpack onde colocar o arquivo output que será gerado
    // Após buildar o bundle js para o nosso código do lado do servidor, aqui é onde o bundle deve ser colocado
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public') // será criado automaticamente pelo webpack quando criado e é public porque deve estar acessível a quem solicitar
    },

    // Informar ao webpack para rodar babel em cada arquivo que ele passar
    // AGORA NO ARQUIVO BASE

    // module: {
    //     rules: [
    //         {
    //             test: /\.js?$/, // avisando que o babel só deve rodar em arquivos js
    //             loader: 'babel-loader', // executa o babel e transforma o código
    //             exclude: /node_modules/, // avisando ao webpack que não deve rodar o babel nesta pasta
    //             options: { // opções passadas para o babel-loader
    //                 presets: [
    //                     'react',
    //                     'stage-0', // rodar código async
    //                     ['env', {targets: {browsers: ['last 2 versions']}}] // avisa ao webpack para rodar todas as regras de transformação necessárias para atender pelo menos duas versões atrás de qualquer navegador popular
    //                 ]
    //             }
    //         }
    //     ]
    // }
};

module.exports = merge(baseConfig, config)