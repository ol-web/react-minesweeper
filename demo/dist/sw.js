/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "favicon.30dd5a83.png",
    "revision": "197834d1053d95a70eb28280b0e48373"
  },
  {
    "url": "HoneyRoom.d3698231.ttf",
    "revision": "8ca0d9a4b53ea5d23543652041781478"
  },
  {
    "url": "index.html",
    "revision": "41cb66cea729d03dd42d71d37280f823"
  },
  {
    "url": "js.6ec250ce.js",
    "revision": "405bc668c35936664bdabf6b9a85795a"
  },
  {
    "url": "js.e8ec0585.css",
    "revision": "45bbee025d429d07ff34a8dcca3c3153"
  },
  {
    "url": "styles.d9b4acb5.css",
    "revision": "c43c2cfc1d16033b35e125c22529c0cc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
