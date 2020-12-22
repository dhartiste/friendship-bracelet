const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlConfig = require(path.join(__dirname, 'html.config'));

const deploy = path.join(__dirname, 'deploy');
const images = path.join(__dirname, 'deploy/images');

module.exports = env => {
    const plugins = [
        new HtmlWebpackPlugin(HtmlConfig),
        new CopyPlugin([
            { from: path.join(__dirname + '/src/assets/images'), to: images },
            { from: path.join(__dirname + '/static'), to: deploy },
        ])
    ];
    return {
        stats: 'minimal',
        mode: env.dev ? 'development' : 'production',
        devServer: {
            contentBase: path.join(__dirname, '/static'),
            host: '0.0.0.0'
        },
        entry: [
            '@babel/polyfill',
            path.join(__dirname, '/src/index.ts')
        ],
        output: {
            path: deploy
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    enforce:'pre',
                    loader:'tslint-loader'
                },
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        resolve: {  
            extensions: [ '.ts', '.js' ]
        },
    };
};
