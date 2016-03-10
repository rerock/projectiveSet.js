module.exports = {
  context: __dirname,
  entry: "./js/entry.js",
  output: {
    path: "./js/bundle",
    publicPath: "/js/bundle/",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
