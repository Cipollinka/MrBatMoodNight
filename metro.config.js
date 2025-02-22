const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'cjs', 'json'],
    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@containers': path.resolve(__dirname, './containers'),
      '@assets': path.resolve(__dirname, './assets'),
      '@helpers': path.resolve(__dirname, './helpers'),
      '@hooks': path.resolve(__dirname, './hooks'),
      '@models': path.resolve(__dirname, './models'),
      '@stores': path.resolve(__dirname, './stores')
    },
  },
  watchFolders: [path.resolve(__dirname, '../')],
};

module.exports = mergeConfig(defaultConfig, config);
