/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","1844b46b152179da8a8d2b8a8093f06c"],["bower_components/iron-input/iron-input.html","117e335561f348f7cc615443df387405"],["bower_components/iron-meta/iron-meta.html","600352bb89491565ca763d55fa8ad4f6"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","15574530462b9f0c2ae512b078c596a2"],["bower_components/polymer/lib/elements/array-selector.html","52e8ccf3909fdd0f9419e9774d2ca0a7"],["bower_components/polymer/lib/elements/custom-style.html","f40bf2a4b73a468b95ae479828a3dc5a"],["bower_components/polymer/lib/elements/dom-bind.html","0d93f7a399636f6cf6ebad294794304e"],["bower_components/polymer/lib/elements/dom-if.html","42bd24d5b4fb742b2e889bdaf7de0123"],["bower_components/polymer/lib/elements/dom-module.html","5da507765615f5c123d0efd6c0ee2b26"],["bower_components/polymer/lib/elements/dom-repeat.html","3a462dd61e1b93cacf32f69e4915c7aa"],["bower_components/polymer/lib/legacy/class.html","4ba6bb406bd899376a4c9af525d92a77"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","70df13315aefb7e89bf35414f9f4ee2d"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","61308a9cc1b2cd07bdd49037c643f677"],["bower_components/polymer/lib/legacy/polymer-fn.html","4ecb6f82dd2003974ec5004dcb5644f0"],["bower_components/polymer/lib/legacy/polymer.dom.html","1591777a3be67b598828f7c8cc9b7dcf"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","5a2d1489b25cbcfc0ff535ed9c3b7652"],["bower_components/polymer/lib/mixins/dir-mixin.html","42f16309809ccad2d2bc81c62af24f5d"],["bower_components/polymer/lib/mixins/element-mixin.html","a96131021b4d6558eb1931774f27e1de"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","38c200c539ed88933dbe5bbba675f9a4"],["bower_components/polymer/lib/mixins/mutable-data.html","ae5b34cdf84154794087778b40b70b53"],["bower_components/polymer/lib/mixins/property-accessors.html","1aad3e90bae32ba19ad8c303b3af43fc"],["bower_components/polymer/lib/mixins/property-effects.html","0d5f5c46038bbca5e1a30d3a0da3335d"],["bower_components/polymer/lib/mixins/template-stamp.html","2eb71f1f90a4ddb27e31abb407d63363"],["bower_components/polymer/lib/utils/array-splice.html","ed2dff64e9ee2459f197c4b5dfa40d55"],["bower_components/polymer/lib/utils/async.html","cfcef147bd7038f9bc9f93723a8becc6"],["bower_components/polymer/lib/utils/boot.html","0e08da9141686a305365a6a9b6a7cb11"],["bower_components/polymer/lib/utils/case-map.html","3688b5ebabbe0f08a45d3041d15992d7"],["bower_components/polymer/lib/utils/debounce.html","15487e936eb37101e328bc4ea01733f7"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","fe4ed52ab5eb3a1163b60fe98cafe4a5"],["bower_components/polymer/lib/utils/flush.html","816191b9a81240311f51d0a02ac54fbe"],["bower_components/polymer/lib/utils/gestures.html","ed863bda805625b8d7cfb9ce5bc23439"],["bower_components/polymer/lib/utils/import-href.html","d235b50f7364ad24853e388c0e47235a"],["bower_components/polymer/lib/utils/mixin.html","ca3a32aca09b6135bd17636d93b649cf"],["bower_components/polymer/lib/utils/path.html","5ce25fdab968f4c908a04b457059589d"],["bower_components/polymer/lib/utils/render-status.html","92d5cab79f72fe11c7dfe9f503f58e09"],["bower_components/polymer/lib/utils/resolve-url.html","17c2ea102916e990c83f1530fc8d7738"],["bower_components/polymer/lib/utils/settings.html","c97b6a7e2375492073255c6fe52b8ef8"],["bower_components/polymer/lib/utils/style-gather.html","18637c39f91fc085da62fa86d1a57bc4"],["bower_components/polymer/lib/utils/templatize.html","7959b8bfbe64bc85851a672b8fca5c54"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","7e714c300932fa5c6d7bee1c8da03721"],["bower_components/polymer/polymer.html","041f02f3388a7a3c087298fde431df80"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","38765ad94ef12f71e43b6537a6ee6d7f"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","6e2cb1745040846fe648378e542eeb62"],["index.html","3c6223707c6b2e93f3d9dfc4f256fa7d"],["node_modules/pressure/dist/pressure.min.js","a8a756f49e3d1577d487a8e9c217153e"],["src/fl-app/fl-app.html","6216aa0b1fd102ce0e9b1b96dca7a15a"],["src/fl-color-picker/fl-color-picker-style.html","edcddcdf5b58cfa7e48eff0431748e4b"],["src/fl-color-picker/fl-color-picker.html","1f5577dae6a6e0b3b14f091d84fac224"],["src/fl-draw/fl-draw-style.html","92aa171ab68d2bd92ae83cf74f8ef632"],["src/fl-draw/fl-draw.html","704e97e5ad1c61257c068ab493fe449e"],["src/fl-draw/src/pointsketch.js","db485c817b2639df4ba306888a3485e1"],["src/fl-draw/src/pointstorage.js","5ad0e23b2704afba6b9e512e6248165c"],["src/fl-size-picker/fl-size-picker-style.html","efd0500d164115da34e28f78f00397e5"],["src/fl-size-picker/fl-size-picker.html","d2390fe294c42f3929da261019b5ae34"],["src/fl-toolbar/fl-toolbar-style.html","5b8c30bfe2efb9679a73faf119fdc8bc"],["src/fl-toolbar/fl-toolbar.html","e8d04dd6e4b1e7c5eb3a50b8012121b4"],["src/fl-toolbar/range-sliders-style.html","d2f1eea1554a2de38ac659131bf2e674"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







