const { withAppBuildGradle } = require('expo/config-plugins');

module.exports = function withAndroidWidget(config) {
  return withAppBuildGradle(config, (cfg) => {
    if (!cfg.modResults.contents.includes('sourceCompatibility JavaVersion.VERSION_17')) {
      cfg.modResults.contents = cfg.modResults.contents.replace(
        /android \{/,
        `android {\n  compileOptions {\n    sourceCompatibility JavaVersion.VERSION_17\n    targetCompatibility JavaVersion.VERSION_17\n  }`
      );
    }
    return cfg;
  });
};
