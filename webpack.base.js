module.exports = {

    // Informar ao webpack para rodar babel em cada arquivo que ele passar
    module: {
        rules: [
            {
                test: /\.js?$/, // avisando que o babel só deve rodar em arquivos js
                loader: 'babel-loader', // executa o babel e transforma o código
                exclude: /node_modules/, // avisando ao webpack que não deve rodar o babel nesta pasta
                options: { // opções passadas para o babel-loader
                    presets: [
                        'react',
                        'stage-0', // rodar código async
                        ['env', {targets: {browsers: ['last 2 versions']}}] // avisa ao webpack para rodar todas as regras de transformação necessárias para atender pelo menos duas versões atrás de qualquer navegador popular
                    ]
                }
            }
        ]
    }
}