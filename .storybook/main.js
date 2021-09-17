module.exports = {
    'stories': [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    'addons': [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/preset-scss'
    ],
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.
        config.module.rules.push({
            test: /\.runscript.js$/i,
            use: 'raw-loader'
        })
        //
        config.module.rules.push({
            test: /\.handlebars$/,
            loader: 'handlebars-loader'
        })
        // Return the altered config
        return config
    }
}