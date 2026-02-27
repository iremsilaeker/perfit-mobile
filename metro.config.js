const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Varsayılan yapılandırmayı al
 */
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * SVG Ayarlarını ekle
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // SVG uzantısını "asset" (dosya) listesinden çıkarıyoruz
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    // SVG uzantısını "source" (kod) listesine ekliyoruz
    sourceExts: [...sourceExts, 'svg'],
  },
};

// Mevcut ayarlar ile bizim SVG ayarlarını birleştirip dışarı aktar
module.exports = mergeConfig(defaultConfig, config);
