module.exports = api => {
  api.cache(true);

  return {
    presets: ["@babel/env", "@babel/react"],
    plugins: ["babel-plugin-emotion"]
  };
};
