const CracoLessPlugin = require("craco-less");
const path = require('path');

module.exports = {
    plugins: [{ plugin: CracoLessPlugin }],
    webpack: {
        alias: {
            '@app': path.resolve(__dirname, 'src'),
        },
        //для деплоя на gh pages
        configure: (webpackConfig, { paths }) => {
            paths.appBuild = webpackConfig.output.path = path.resolve('docs');
            return webpackConfig;
        }
    }
};
