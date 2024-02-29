// ARQUIVO CONFIGURADO NO PACKAGE.JSON PARA RODAR (configurado em scripts)

const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require("webpack-node-externals");

//module.exports = {
const config = {
    // Informar ao webpack que estamos buildando o bundle para o nodejs ao invés do browser
    target: 'node',
    
    // Informar ao webpack o arquivo root server da aplicação
    entry: './src/index.js',

    // Informar ao webpack onde colocar o arquivo output que será gerado
    // Após buildar o bundle js para o nosso código do lado do servidor, aqui é onde o bundle deve ser colocado
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build') // será criado automaticamente pelo webpack quando criado
    },

    externals: [webpackNodeExternals()] // Não vai exercutar o bundle para as bibliotecas dentro da pasta node_modules. Não será incluído no webpack do lado do servidor

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