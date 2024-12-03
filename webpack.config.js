const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    aluno: './src/frontend-aluno/ts/ui-scripts.ts',
    professor: './src/frontend-professor/ts/ui-scripts.ts',
    'electron-main': './src/frontend-professor/ts/electron-main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'], // Importação sem especificar extensões
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader', // Compilação TypeScript para JavaScript
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'aluno.html',
      template: './src/frontend-aluno/index.html',
      chunks: ['aluno'],
    }),
    new HtmlWebpackPlugin({
      filename: 'professor.html',
      template: './src/frontend-professor/index.html',
      chunks: ['professor'],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    port: 8080,
    hot: true,
  },
  mode: 'development',
};
