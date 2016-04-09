const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");

const nodeEnv = process.env.NODE_ENV || "development";
const inProduction = nodeEnv === "production" || (process.argv || []).some(arg => ["-p", "--optimize-minimize", "--optimize-occurence-order"].indexOf(arg) !== -1);

const baseConfig = {
    target: "web",
    context: path.join(__dirname, "src"),

    entry: {
        vendors: ["babel-polyfill", "react", "react-dom", "react-router", "classnames", "axios", "normalize.css"]
    },

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "[name].js",
        chunkFilename: "chunks/[name].[chunkhash].js"
    },

    module: {
        noParse: ["node_modules"],

        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "src")
                ],
                loader: "react-hot"
            },

            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "src"),
                    /retail-ui/,
                    /billing-ui/
                ],
                loader: "babel"
            },

            {
                test: /\.scss$/,
                loader: "sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
            },

            {
                test: /\.less$/,
                loader: "less?sourceMap"
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "url-loader?prefix=images/&name=[name].[hash].[ext]&limit=10000"
            },

            {
                test: /\.woff2?$/,
                loader: "url-loader?prefix=font/&limit=10000&mimetype=application/font-woff"
            },

            {
                test: /\.eot/,
                loader: "url-loader?prefix=font/&limit=100"
            },

            {
                test: require.resolve("react"),
                loader: "expose?React"
            },

            {
                test: require.resolve("react-dom"),
                loader: "expose?ReactDOM"
            }
        ]
    },

    resolve: {
        extensions: ["", ".js", ".jsx"],
        modulesDirectories: ["node_modules", __dirname],
        root: [__dirname],
        alias: {
            "normalize.css": "normalize.css/normalize.css"
        }
    },

    postcss: function (webpack) {
        return [
            postcssImport({addDependencyTo: webpack}),
            autoprefixer({browsers: ["last 2 versions"]})
        ];
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendors", "manifest"],
            minChunks: Infinity
        }),
        new ExtractTextPlugin("[name].css", { allChunks: true }),
        new WebpackNotifierPlugin({ title: "Webpack" })
    ]
};

const devConfig = {
    cache: true,
    debug: true,
    devtool: "#inline-source-map",
    module: {
        loaders: [
            {
                test: /\.(css|less|scss)$/,
                exclude: [ path.join(__dirname, "src") ],
                loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&localIdentName=[name]-[local]-[hash:base64:8]!postcss-loader?sourceMap")
            },
            {
                test: /\.(css|less|scss)$/,
                include: [ path.join(__dirname, "src") ],
                loaders: ["style-loader", "css?sourceMap&modules&localIdentName=[name]-[local]-[hash:base64:8]!postcss-loader?sourceMap"]
            }
        ]
    },
    entry: {
        index: [
            "webpack-hot-middleware/client",
            "./index.js"
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new WebpackNotifierPlugin({
            title: "Webpack",
            contentImage: path.resolve(__dirname, "webpack", "logo.png")
        })
    ]
};

const productionConfig = {
    cache: false,
    debug: false,
    devtool: null,
    entry: {
        index: ["./index.js"]
    },
    module: {
        loaders: [
            {
                test: /\.(css|less|scss)$/,
                exclude: [ path.join(__dirname, "src") ],
                loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&localIdentName=[name]-[local]-[hash:base64:8]!postcss-loader?sourceMap")
            },
            {
                test: /\.(css|less|scss)$/,
                include: [ path.join(__dirname, "src") ],
                loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&modules&localIdentName=[name]-[local]-[hash:base64:8]!postcss-loader?sourceMap")
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                drop_debugger: true,
                dead_code: true,
                unused: true
            }
        })
    ]
};

module.exports = merge({}, baseConfig, inProduction ? productionConfig : devConfig);
