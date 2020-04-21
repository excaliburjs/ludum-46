module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        commitRef() {
          return process.env.COMMIT_REF || process.env.TRAVIS_COMMIT || "local";
        },
      },
    },
  },
};
