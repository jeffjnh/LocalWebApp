// const config = {
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//         include: path.resolve('bootstrap/dist/css/bootstrap.css', '../')
//       },
//       {
//         test: /\.scss$/,
//         loader: require.resolve('postcss-loader'),
//         options: {
//           ident: 'postcss',
//           postcss: {},
//           plugins: () => [
//             require('postcss-flexbugs-fixes'), // eslint-disable-line global-require
//             autoprefixer({
//               flexbox: 'no-2009',
//             }),
//           ],
//         },
//       },
//       {
//         test: /\.yml$/,
//         use: ['json-loader', 'yaml-loader'],
//       },
//       {
//         test: /\.(svg|jpg|png|gif|eot|ttf|woff|woff2)$/,
//         use: ['file-loader'],
//       },
//     ],
//   },
// };

// module.exports = config;