module.exports = {
  globDirectory: "./demo/dist/",
  globPatterns: [
    "**/*.*",
  ],
  globIgnores: [
    "**/node_modules/**/*",
    "**/sw.js",
    "*.map",
    "*.webmanifest",
  ],
  maximumFileSizeToCacheInBytes: 999999999,
  swDest: "./demo/dist/sw.js"
};