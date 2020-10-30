module.exports = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/i,
            loader: 'raw-loader',
        });
        return config
    },
}
