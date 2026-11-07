module.exports = ({ config }) => {
  require('./scripts/configure-web.cjs')(config.web);
  return {
    ...config,
    experiments: {
      ...config.experiments,
      baseUrl: process.env.EXPO_PUBLIC_BASE_URL || '',
    },
  };
};
