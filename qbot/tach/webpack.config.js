module.exports = {
    entry: {
        'app': ['./src/main.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: 'dist/js'
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }            ]
    }
}