module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@/src': './src',
            '@/elements': './src/elements',
            '@/hooks': './src/hooks',
            '@/components': './src/components',
            '@/store': './src/store',
            '@/utils': './src/utils',
            '@/ui': './src/components/ui',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
