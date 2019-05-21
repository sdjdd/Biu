const path = require('path')

const production = process.env.NODE_ENV === 'production'

module.exports = {
    mode: production ? 'production' : 'development',
    output: {
        filename: 'biu.min.js',
        library: 'Biu',
        libraryExport: 'default',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'demo')
    }
}