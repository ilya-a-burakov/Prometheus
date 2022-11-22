module.exports = (api) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        debug: true,
      },
    ],
  ],
  plugins: api.env() === 'prod' ? ['@babel/transform-runtime'] : ['@babel/transform-runtime'],
});
