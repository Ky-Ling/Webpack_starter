const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    mode: "development",
    
    // An entry point indicates which module webpack should use to begin building out its internal 
    //  dependency graph. Webpack will figure out which other modules and libraries that entry point 
    //  depends on (directly and indirectly).
    entry: {
        bundle: path.resolve(__dirname, "src/index.js"),
    },
    
    // The output property tells webpack where to emit the bundles it creates and how to name these files.
    output: {
        path: path.resolve(__dirname, "dist"),

        // Caching & Hash Setup:
        filename: "[name][contenthash].js",

        // Cleaning up hash files:
        clean: true,

        assetModuleFilename: "[name][ext]"

    },

    // Source Maps:
    devtool: "source-map",

    // Webpack dev sever:
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },


    // Loaders allow webpack to process other types of files and convert them into valid modules that 
    //  can be consumed by your application and added to the dependency graph.
    
    // 1: The test property identifies which file or files should be transformed.
    // 2: The use property indicates which loader should be used to do the transforming.
    module: {
        rules: [

            // Loaders & Sass Compiling:
            {
                test:/\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },

            // Babel Loader:
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
            },

            // Assets Resource Loader
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            }

        ]
    },


    // HTML Webpack Plugins:
    // While loaders are used to transform certain types of modules, plugins can be leveraged to perform 
    //  a wider range of tasks like bundle optimization, asset management and injection of environment variables
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: "src/template.html"
        }),

        new BundleAnalyzerPlugin(),
    ]
}