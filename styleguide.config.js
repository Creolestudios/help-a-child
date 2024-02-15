const webpack = require("webpack");
const path = require("path");

const docs = path.resolve(__dirname);
const root = docs.replace("/docs", "");

const customWebpack = {
  devtool: "eval-source-map",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /.\.md$/,
        type: "javascript/auto",
      },
      // Babel loader will use your project’s babel.config.js
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },

      {
        test: /\.(png|jpeg|jpg|webp)?$/,
        use: "url-loader",
      },
      // Other loaders that are needed for your components
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    fallback: { url: require.resolve("url/") },
    alias: {
      "next/router": "next-router-mock",
    },
  },
  plugins: [
    // Rewrites the absolute paths to those two files into relative paths
    new webpack.NormalModuleReplacementPlugin(
      /react-styleguidist\/lib\/loaders\/utils\/client\/requireInRuntime$/,
      "react-styleguidist/lib/loaders/utils/client/requireInRuntime"
    ),
    new webpack.NormalModuleReplacementPlugin(
      /react-styleguidist\/lib\/loaders\/utils\/client\/evalInContext$/,
      "react-styleguidist/lib/loaders/utils/client/evalInContext"
    ),
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
  ],
};

module.exports = {
  styleguideDir: "docs",
  title: "Help a child Styleguide",
  skipComponentsWithoutExample: true,
  components: `${root}/components/**/[A-Z]*.{js,jsx,ts,tsx}`,
  webpackConfig: customWebpack,
  pagePerSection: true,
  require: [path.join(__dirname, "./styles/globals.css")],
  styleguideComponents: {
    Wrapper: path.join(__dirname, "providers/StyleGuideProvider"),
  },

  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
    {
      propsFilter: { skipPropsWithoutDoc: false },
    }
  ).parse,

  sections: [
    {
      name: "Style Guide",
      content: "./components/Documentation.md",
    },
    {
      name: "Buttons",
      components: "./components/buttons/**/*.tsx",
    },
    {
      name: "Form Elements",
      components: "./components/form/**/*.tsx",
    },
    {
      name: "Cards",
      components: "./components/card/**/*.tsx",
    },
    {
      name: "Content Types",
      components: "./components/content-types/**/*.tsx",
    },
    {
      name: "Modals",
      components: "./components/modals/**/*.tsx",
    },
    {
      name: "Layout Elements",
      components: "./components/layout/**/*.tsx",
    },
  ],

  template: {
    head: {
      scripts: [
        {
          src: "//www.instagram.com/embed.js",
        },
      ],
    },
  },
  styles: {
    StyleGuide: {
      content: {
        maxWidth: 1440,
      },
    },
    Playground: {
      preview: {
        position: "relative",
        transform: "translate3d(0,0,0)",
      },
    },
  },
};
