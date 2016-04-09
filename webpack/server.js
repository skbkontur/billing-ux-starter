const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const config = require("./../webpack.config.js");

const app = express();
const compiler = webpack(config);

app.use(express.static(path.resolve(__dirname, "..", "/dist")));

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    watch: true,
    
    stats: {
        colors: true
    },

    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));

app.get("*", function response(req, res) {
    res.sendFile(path.resolve(__dirname, "..", "./index.html"));
});

app.listen(3000);
