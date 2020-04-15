module.exports = (on) => {
  // eslint-disable-next-line global-require
  require('cypress-terminal-report').installPlugin(on);
};
