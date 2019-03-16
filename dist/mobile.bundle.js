/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 288);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(10)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 10:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(13);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(5)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./reset.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./reset.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(4);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video {\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    outline: 0;\r\n    font-size: 100%;\r\n    vertical-align: baseline;\r\n    background: transparent;\r\n    list-style-type: none;\r\n}\r\nbody {\r\n    font-family: Microsoft YaHei, Helvetica, STHeitiSC,Verdana, Arial, Tahoma,sans-serif;\r\n    /* line-height: 1; */\r\n    font-size: 14px;\r\n}\r\n:focus {\r\n    outline: 0 none;\r\n}\r\n::-moz-selection{\r\n    color: #FFFFFF;\r\n    background-color: #138ed4;\r\n}\r\n::selection{\r\n    color: #FFFFFF;\r\n    background-color: #138ed4;\r\n}\r\narticle, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary {\r\n    display: block;\r\n}\r\nnav ul {\r\n    list-style: none;\r\n}\r\nblockquote, q {\r\n    quotes: none;\r\n}\r\nblockquote:before, blockquote:after, q:before, q:after {\r\n    content: '';\r\n    content: none;\r\n}\r\na {\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    font-size: 100%;\r\n    text-decoration: none;\r\n    vertical-align: baseline;\r\n    background: transparent;\r\n    color: inherit;\r\n}\r\nins {\r\n    background-color: #ff9;\r\n    color: #000;\r\n    text-decoration: none;\r\n}\r\nmark {\r\n    background-color: #ff9;\r\n    color: #000;\r\n    font-style: italic;\r\n    font-weight: bold;\r\n}\r\ndel {\r\n    text-decoration: line-through;\r\n}\r\nabbr[title], dfn[title] {\r\n    border-bottom: 1px dotted #000;\r\n    cursor: help;\r\n}\r\ntable {\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n}\r\nhr {\r\n    display: block;\r\n    height: 1px;\r\n    border: 0;\r\n    border-top: 1px solid #cccccc;\r\n    margin: 1em 0;\r\n    padding: 0;\r\n}\r\ninput, select {\r\n    vertical-align: middle;\r\n    margin: 0;\r\n    -webkit-box-sizing: content-box;\r\n            box-sizing: content-box;\r\n    font-family: inherit;\r\n}\r\ntextarea{\r\n    font-family: inherit;\r\n}\r\n.float_left{\r\n    float: left;\r\n}\r\n.float_right{\r\n    float: right;\r\n}\r\n.clearfix:after {\r\n    content: \"\";\r\n    height: 0;\r\n    display: block;\r\n    visibility: hidden;\r\n    clear: both;\r\n}\r\ninput[type='radio'],input[type='checkbox'],select{\r\n\tcursor:pointer;\r\n}\r\ninput[disabled], select[disabled], textarea[disabled] {\r\n    cursor: not-allowed;\r\n}\r\ninput[type='radio']{\r\n\twidth: 16px;\r\n    height: 16px;\r\n\t-webkit-appearance: none;\r\n    background-image: url(" + escape(__webpack_require__(14)) + ");\r\n    background-size: 100% 100%;\r\n}\r\ninput[type='radio']:checked {\r\n    background-image: url(" + escape(__webpack_require__(15)) + ");\r\n}\r\ninput[type='radio'][disabled]{\r\n\tbackground-image: url(" + escape(__webpack_require__(16)) + ");\r\n}\r\ninput[type='radio'][disabled][checked] {\r\n    background-image: url(" + escape(__webpack_require__(17)) + ");\r\n}\r\n.hidden{\r\n\tdisplay:none;\r\n}\r\n.cursor{\r\n\tcursor:pointer;\r\n}", ""]);

// exports


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAjJJREFUSA21ls9LVFEUx7/nvmcZMbZIUayFoILgJmjTxv4ABxL3grQvsb9gnL8g0fYitI+C6Q+oTRuhjSDogIsSB3WREv3wzTud733ex4SmOfPmbObx7r2f7733nfM9I7gk7q1s3//Z/DUjkDIUoxAM++mKPXuuK7TWG918+3Vh/Mu/MHLRQP/q1jCSpKqQp1CNLpqTvxNpCnQNcVw5fD6xl78/ezgn0L+8+QQpXtvuSnEkWh7tk+mxEh4M3sLQ7dgv2/+e4HPjB97vnKBWP9akqWKnPIHD3OHi5LtWkb8EBpY3F9IULwF15bE+VB8PYeROT+v8c8+7305R+bCP2s6xjUnqHF4cLE6uhIm5AHeuKd5wK5WpQXn28G6Y81+/rzaOUP3YULWji8NsOIkX8Hd+2tzitSzZrq8LDzugyJKdxl9XTzTBb+L8oP+gWuK1tAsnh2vJ4EaZJHwnWSr+3o0d3Kf5cbnqzrnosuA3ebS+rUmKtDe6MeKY50xFZkuncAqTQRaZZDtfRDbAVCwqAots5yvUyMzzoiJnWfW7UP6hiIoQyVlmLVkWFUFtYWjLM6/I+wfLv6hoBJaxeUV1guktRUXOMrazoqgRTOMqKgKLbEc/h1kuXZFF0mmQQRaZZDs2C/o5LZeu2GmQkdm3rpGdZZE1CxoULZeG1W5wLRne7IxJjhfwnciaBf2cltuOCNdwLRm+8Zx1t7wfUK2rDYcCjK62zEzCRLrZ9IMIf4v42/IHJsw6j3Y3RUoAAAAASUVORK5CYII="

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAApNJREFUSA29Vj1oVEEQnnnvxTRa5YKQkEIQjF6lIsQinE1Ik0KIla2lGIx1SmsjEUtbGyPYSqojRQ5EU51GECwkEcldZRXvLuM3+7LLvnfv3jvvxUyzuzPfzrc/s7PDNIRMbjSvS5fuEsk8EU8T05SZJnQA3T502xzRu8OV6m6RO84DTK437wnRUxG5koezNmb+Codrh6vVTatLt5mEF1/sXep2eq+x+rn0hOHG3IjGwvu/Hs1+T+P7CCsbX2rSO35LIhNp8D+NmdscBsutlat1f16CMCbrbZHQmA8auc/U4TBc8EkdoTnGbu9D6Z2lV4edRlF4yx5vYO3mzsoeo3Xmt/AZx0OsNIQajaMHiO99UF/mYg6iSCEa+oOgvp6JfwNdJ+aPRi9yE/07eDbnfVxW/4Rjk/VRH3flUxYooWPeGj83/uDg4eUfvn7q5beZoz9Hr3D3C74+qx9EfCOKM0iW2dOBrPX42iIeNhaaFF0AdrhYef75fRGpcuEONV0NFj1G3VkWmZ2lNoMxR261Wa3MgxC5MVeknj7GLHiMwf3mCk8HLhEPAtoAGWT39UVYJH33Dv15/60vJAHeBL6YHNHQH1aKsT81aPCf5QnXNPTzEGqLMVzLx8m+Bs12HgincEHfGULf5d00Xm0GA2zalhzjoz7rh29WXVlv7mGVhb96mdSm1UBrtTprcilY15BC3iS33z/S44V2CRllyVmlL/k4k99RDh27e5l41txBAI1YUvius/rcaD+p3laLe4dagyDzt7PgpXT6AavvE3GE+iNrDYI9d6yxdGtKjGDZ/vbqzxHqQGsPrUFOZaemiErWM32EllRrEFxvQ8ejCcpE+PCLJ+vHBY1V+O2ZFcI+qfZPs9T/C3LwFsliDDlSAAAAAElFTkSuQmCC"

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAlFJREFUSA29lr+LGkEUx2dX/FVHGw+EIJjGJoGAhYcg2gcuVf6WK+9vuSqB6xVBtBACSWNzggSEM4Ve7S908z7DvGOT3K3J3eqD9a2zM9/PvpnZ98Yz/2Dtdvut53kfpOu5XGdyFdywmfg7ufpBENy0Wq3vrv1J5z35RB50Op2P4q5E7E1UP30mL3Ur95fNZvOztv3pHwX2er3Xm83mWjpXGZDJZEw+nze5XM5ks1mTTqetznq9Nsvl0iwWCzOfz81qtbLt8jNMpVKf6vX6D21Q/xew2+3W9/v9F4nqlQgHpVLJKxR0BnXY4342m5nJZBLIi0iw3r3v+xeNRqMX7v0b0MHaAksSUaVSMYlEItz/4P1utzOj0chGLNCtQFth6AOQadxut1+JrFgsmnK5fFA8qsN4PDbT6dQQaTKZfK/T6+sg1gwYkb0UhiYaaKHp9oNFWaDbjVXWjGmMy9BCU/SqjmE0wisgbJD/XbOol0MLTdfHMjw+amn4xtav1WpR45/9bDAY6CfzzpdFJYPY+X624oGBrCUGiyklXdmPGn8MI2E4OwdIbrQZxDXG7shOzs4A2jSi6UqfxOlD2gXdpXHqR2kFACkxhkR8LAtp/wRIPbNZ/1hAKoqzO4B9/lBijmUh7b4vue4GEPXsWKbasHyOBfJB3lI8qWdxG5pow4Clu/QSEMWTehaXoYWm07MMC3RnkCGVmuIZl6GFpugN9ZyjERrOIBL2PfNN8XypoYEWmmirnpYO+/+kRwx9g5MeohR60mOiQvEnOwiHodzHedT/BcBBRsaeKXjDAAAAAElFTkSuQmCC"

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAmpJREFUSA29Vj0vBEEYtnuro9IRhYoWkVDIaUSjkJxKee7jTyj9iftwpQaJVlQXhUsELZVCjuoqpfvwPGt2884Ys+csk+zO+/HM+8y88+mNDVHq9fpiv9/fGQwG657nzaCeZjPIL5DbqK983z8vFAr3SeE8F6BWq+2C6BCYeRdO+B5BfFAsFk+FTROthCCaQ8+P8a1q6CEVjLiFbw/ET2aTL4TVajULojMAp0zwD/UOSHOlUqkp22mEiuwSgHEJ+oX8DtJNSRoTMo2YrxsE/+3IzP51MK8rUXr9yMs5+wMyhp9SsUOqkJCrEcaRFkgYJeHH2OQgLOBPLX2KzoL5eAOgiQC3BEJfhrwBcYK6qyiOU4+butfr3bnA9CH4ZRAE+/l8/lliG43GbLfbPQLxprTb5EwmsxSAecfmlDaSYdK3UA+knTI7ALItpOwiiZRcPkDrZhCpg+SNI7ORRTj6FIYp/7aQywd45lvEp6NpptGGVxhtk5s4cnGE4UFsOiMd/nCBRLqrTsKSK96HrkBp+Zh6pvTFFRD+ZZdf+obAvjKlbdnIIme59C12zaQwWc1oKOTiCK8Mu6YCNKn2WXzuagAowHgKM2n6pE6uf9/4Ya8rlcoDepJ4q6OHIx9tiP9YLpcXwrOUzwKcAidy+DaZ6YV9W31MpQ1mtZGDjnhecPleI8Cf3BjITAuX8BoJ430I4x70Do0pFz41GDssMSFvZDhysL4rXxoVnxi56LZnwJiQCt8eAPCaSWOkHJn2niGHRkgDSfkGAbhFfZTCtowhH09RnHjRRAZZ81mgburELaPajfYQlqSU03zqfwCysDbTzJ7HdAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 18:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(20);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(5)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./yui.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./yui.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(4);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "body.yui{\n\tcolor:#333;\n}\n/* 文字颜色 */\nbody.yui .color_warn{\n\tcolor:#d51930\n}\nbody.yui .color_link{\n\tcolor:#0044dd;\n}\nbody.yui .color_highlight{\n\tcolor:#138ed4;\n}\nbody.yui .color_emphasis{\n\tcolor:#000;\t\n}\nbody.yui .color_remark{\n\tcolor:#999;\n}\nbody.yui .color_surplus{\n\tcolor:#24a900;\n}\nbody.yui .color_deficit{\n\tcolor:#ff4466\n}\n/* 按钮样式 */\nbody.yui .yui_btn{\n\tdisplay: inline-block;\n\tvertical-align: middle;\n\tborder: 1px solid #e5e5e5;\n\tfont-size:12px;\n\tline-height:12px;\n\tborder-radius:2px;\n\tcursor:pointer;\n\tpadding:2px;\n}\nbody.yui .yui_btn.btn_square{\n\tborder-radius:0;\n}\nbody.yui .yui_btn.btn_size_s{\n\tpadding:6px 12px;\n}\nbody.yui .yui_btn.btn_size_l{\n\tpadding:8px 16px;\n}\nbody.yui .yui_btn.btn_confirm{\n\tcolor: #fff;\n    border: 1px solid #138ed4;\n    background-color: #138ed4;\n}\nbody.yui .yui_btn.btn_confirm:hover{\n\tbackground-color: #289bdc;\n}\nbody.yui .yui_btn.btn_confirm:active{\n\tbackground-color:#249df3;\n}\nbody.yui .yui_btn.btn_cancel{\n\tcolor: #333;\n    border: 1px solid #e5e5e5;\n    background-color: #f2f2f2;\n}\nbody.yui .yui_btn.btn_cancel:hover{\n\tbackground-color: #f7f7f7;\n}\nbody.yui .yui_btn.btn_cancel:active{\n\tbackground-color: #fcfcfc;\n}\n\n/* 绿色主题 */\nbody.yui.greenStyle .color_highlight{\n\tcolor:#00ff22;\n}\nbody.yui.greenStyle .yui_btn.btn_confirm{\n\tcolor: #fff;\n    border: 1px solid #00ff22;\n    background-color: #00ff22;\n}\nbody.yui.greenStyle .yui_btn.btn_confirm:hover{\n\tbackground-color: #44ff00;\n}\nbody.yui.greenStyle .yui_btn.btn_confirm:active{\n\tbackground-color:#aaff00;\n}\n\n/* 模拟手机框组件 */\nbody.yui .yui_mobile{\n\twidth: 375px;\n    position: relative;\n    -webkit-box-shadow: 5px 5px 5px #e5e5e5;\n            box-shadow: 5px 5px 5px #e5e5e5;\n    border: 1px solid #e5e5e5;\n    overflow-x: hidden;\n    max-height: 90vh;\n    overflow-y: auto;\n    padding: 0 0 20px;\n}\nbody.yui .yui_mobile .yui_mobile_head{\n\twidth: 100%;\n    height: 64px;\n    background-image: url(" + escape(__webpack_require__(21)) + ");\n    background-repeat: no-repeat;\n    background-size: 100% 100%;\n}\nbody.yui .yui_mobile .yui_mobile_head>h1{\n\tpadding: 20px 65px 0;\n    line-height: 42px;\n    font-size: 16px;\n    color: #fff;\n    text-align: center;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    font-weight: 400;\n}\nbody.yui .yui_mobile .yui_mobile_body{\n\tmin-height:460px;\n\tfont-size:12px;\n\tpadding-bottom:20px;\n}\n/* 底部横栏 */\nbody.yui .bottom_banner{\n\tposition:fixed;\n\tbottom:0px;\n\tleft:230px;\n\tright:30px;\n\theight:56px;\n\tbackground-color:#f0f3f6;\n}\nbody.yui .bottom_banner .bottom_banner_content{\n\tmargin:13px auto;\n\twidth:120px;\n}\n/* 表单组件 */\nbody.yui .yui_form_wrap{\n\tmargin: 0 0 15px;\n}\nbody.yui .yui_form_wrap.not_interval{\n\tmargin:0;\n}\nbody.yui .yui_form_wrap:after{\n\tcontent: \"\";\n    height: 0;\n    display: block;\n    visibility: hidden;\n    clear: both;\n}\nbody.yui .yui_form_wrap .input_lable{\n\tpadding-right: 6px;\n    width: 90px;\n    line-height: 30px;\n    text-align: right;\n    float: left;\n    overflow:hidden;\n}\nbody.yui .yui_form_wrap .input_lable.big{\n\twidth:120px;\n}\nbody.yui .yui_form_wrap .input_wrap{\n\tfloat: left;\n    vertical-align: middle;\n    font-size:12px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one{\n\toverflow:hidden;\n\tline-height:30px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one .form_one_control{\n\theight: 30px;\n    margin-bottom: 10px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_being_control{\n\tfloat:left;\n\tmargin-left:5px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_being_control .form_one{\n\tmargin-bottom:10px;\n\tmin-height: 30px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one .input_text{\n\tpadding: 8px 10px;\n    height: 12px;\n    width: 140px;\n    border: 1px solid #e5e5e5;\n    border-radius:2px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one .input_text.size_l{\n\twidth:280px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one .input_text.size_l_m{\n\twidth:180px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one .input_text.size_m{\n\twidth:80px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one .input_text.size_s{\n\twidth:40px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one .input_text.size_s_s{\n\twidth:26px;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one span{\n\tvertical-align:middle;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one select{\n\twidth: 140px;\n    height: 26px;\n    padding: 0 10px;\n    line-height: 28px;\n    border: 1px solid #e5e5e5;\n    background-color: #F2F2F2;\n    border-radius: 2px;\n    border: 1px solid #e5e5e5;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one input[type='radio']{\n\tvertical-align:middle;\n}\nbody.yui .yui_form_wrap .input_wrap .input_text[readonly='readonly']{\n    background-color: #f2f2f2;\n    border: 1px solid #e5e5e5;\n    width:120px;\n}\nbody.yui .yui_form_wrap .input_wrap .tag_wrap{\n\theight: 28px;\n    border: 1px solid #E5E5E5;\n    margin-top:1px;\n}\nbody.yui .yui_form_wrap .input_wrap .tag_wrap .tag_label{\n\twidth: 32px;\n    height: 28px;\n    line-height: 28px;\n    text-align: center;\n    background-color: #e5e5e5;\n    float:left;\n}\nbody.yui .yui_form_wrap .input_wrap .tag_wrap .tag_input{\n\theight: 20px;\n    padding: 4px 10px;\n    font-size: 14px;\n    line-height: 20px;\n    border: 0 none;\n    width:110px;\n    float:left;\n}\nbody.yui .yui_form_wrap .input_wrap .tag_wrap .tag_input[readonly='readonly']{\n    background-color: #f2f2f2;\n}\nbody.yui .yui_form_wrap .input_wrap input[type='color']{\n\twidth:72px;\n\theight:28px;\n\tpadding:0 23px 0 5px;\n\tcursor:pointer;\n\tbackground-color:#f2f2f2;\n\tposition:relative;\n\tborder:1px solid #e5e5e5;\n\tborder-radius:2px;\n}\nbody.yui .yui_form_wrap .input_wrap input[type='color']:after{\n\tposition:absolute;\n\tcontent:'';\n\twidth: 0;\n    height: 0;\n    border-left: 4px solid transparent;\n    border-right: 4px solid transparent;\n    border-top: 8px solid #999;\n    right:8px;\n    top:10px;\n}\nbody.yui .yui_form_wrap .input_wrap input[type='range']{\n\tdisplay: block;\n    height: 24px;\n    line-height: 24px;\n    padding: 3px 0px;\n    outline: 0 none;\n    -webkit-appearance: none;\n    background-color: transparent;\n    float:left;\n}\nbody.yui .yui_form_wrap .input_wrap input[type='range']::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    width: 20px;\n    height: 20px;\n    margin: -7px 0 0;\n    border-radius: 10px;\n    background-color: #138ed4\n}\nbody.yui .yui_form_wrap .input_wrap input[type='range']::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 8px;\n    border: 1px solid #979797;\n    background-color: #b0c9ec;\n    cursor: pointer\n}\nbody.yui .yui_form_wrap .input_wrap .range_text{\n    vertical-align: middle;\n    padding-left:20px;\n    display:inline-block;\n    float:left;\n}\nbody.yui .yui_form_wrap .input_wrap .label_btn[type='button']{\n\theight: 28px;\n\tpadding: 0 15px;\n\tborder: 1px solid #e6e6e6;\n\toutline: 0 none;\n\tborder-radius: 2px;\n\tbackground-color: #f2f2f2;\n\tcolor: #666;\n\tcursor: pointer;\n}\nbody.yui .yui_form_wrap .input_wrap .label_btn[type='button']:hover{\n\tbackground-color: #fff;\n}\nbody.yui .yui_form_wrap .input_wrap .label_btn[type='button']:active{\n\tbackground-color: #f6f6f6;\n}\nbody.yui .yui_form_wrap .input_wrap  textarea{\n\twidth:270px;\n\theight:100px;\n\tborder: 1px solid #e5e5e5;\n}\nbody.yui .yui_form_wrap .input_wrap  textarea.size_s{\n\twidth:160px;\n\theight:56px;\n}\nbody.yui .yui_form_wrap .input_wrap  textarea.size_m{\n    width:220px;\n    height:78px;\n}\nbody.yui .yui_form_wrap .input_wrap .image_wrap{\n    width: 60px;\n    height: 60px;\n    margin: 0 10px 10px 0;\n    position:relative;\n}\nbody.yui .yui_form_wrap .input_wrap .image_wrap .delete_image{\n\tdisplay:inline-block;\n\twidth: 12px;\n    height: 12px;\n    border-radius: 6px;\n    position: absolute;\n    top: -6px;\n    cursor: pointer;\n\tbackground-image:url(" + escape(__webpack_require__(9)) + ");\n\tbackground-size:12px 12px;\n\tleft: 56px;\n    z-index: 2;\n}\nbody.yui .yui_form_wrap .input_wrap .image_wrap .image_item{\n\tposition: relative;\n    width: 60px;\n    height: 60px;\n    background-color: #eee;\n    background-image:url(" + escape(__webpack_require__(22)) + ");\n    background-size:100% 100%;\n    border:2px dashed #e5e5e5;\n\tborder-radius:2px;\n\tcursor:pointer;\n}\nbody.yui .yui_form_wrap .input_wrap .image_wrap .image_item.complete{\n\tbackground-size: 0;\n}\nbody.yui .yui_form_wrap .input_wrap .image_wrap .image_item .input_image{\n\tdisplay:none;\n}\nbody.yui .yui_form_wrap .input_wrap .image_wrap .image_item .image_view{\n\tposition: absolute;\n    display: block;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    margin: auto;\n    max-height: 100%;\n    max-width: 100%;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one input_text:focus,body.yui .yui_form_wrap .input_wrap .form_one textarea:focus{\n    border: 1px solid #138ed4;\n}\n/* 表单校验 */\nbody.yui .yui_form_wrap .input_wrap .form_one .input_tips{\n\tdisplay:none;\n    visibility: hidden;\n    position: relative;\n    height: 30px;\n    margin: 0 0 0 25px;\n    line-height: 30px;\n    color: #ff0000;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one p .input_tips{\n\tmargin:0;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one .input_tips.show{\n\tvisibility: visible;\n\tdisplay: inline-block;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one.checkNotThrough .input_text{\n\tborder:1px solid #ff0000;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one.checkNotThrough .tag_wrap{\n\tborder: 1px solid #ff0000;\n}\nbody.yui .yui_form_wrap .input_wrap .form_one.checkNotThrough .tag_wrap .tag_label{\n\tbackground-color: #ff0000;\n\tcolor:#fff;\n}", ""]);

// exports


/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzBCODIyMDg0MzRGMTFFNjk0NUQ5RkY5NDk0NUREMEIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzBCODIyMDk0MzRGMTFFNjk0NUQ5RkY5NDk0NUREMEIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MEI4MjIwNjQzNEYxMUU2OTQ1RDlGRjk0OTQ1REQwQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MEI4MjIwNzQzNEYxMUU2OTQ1RDlGRjk0OTQ1REQwQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtOLv6wAAAceSURBVHja7Jt5UBNX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"

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(289);

__webpack_require__(12);

__webpack_require__(19);

__webpack_require__(330);

var _data = __webpack_require__(332);

var _data2 = _interopRequireDefault(_data);

var _clock = __webpack_require__(73);

var _clock2 = _interopRequireDefault(_clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var weipageData = JSON.parse(_data2.default.data);

var weipage = new Vue({
	el: "#weipage",
	data: {
		weipageData: weipageData
	},
	methods: {
		changeWeipageData: function changeWeipageData(option) {
			if (option) {
				option["idList"] = option.id.split(",");
				if (option["idList"].length > 0) {
					for (var i = 0; i < weipageData.pluginList.length; i++) {
						var plugin = weipageData.pluginList[i];
						if (plugin.identity == option["idList"][0]) {
							if (option["idList"].length == 1) {
								plugin[option.key] = option.value;
							} else {
								for (var j = 0; j < plugin.subPluginList.length; j++) {
									var subPlugin = plugin.subPluginList[j];
									if (subPlugin.identity == option["idList"][1]) {
										subPlugin[option.key] = option.value;
									}
								}
							}
						}
					}
				}
			}
		}
	}
});

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wAnimated = __webpack_require__(290);

var _wAnimated2 = _interopRequireDefault(_wAnimated);

var _wButton = __webpack_require__(295);

var _wButton2 = _interopRequireDefault(_wButton);

var _wDialog = __webpack_require__(300);

var _wDialog2 = _interopRequireDefault(_wDialog);

var _wDecorate = __webpack_require__(305);

var _wDecorate2 = _interopRequireDefault(_wDecorate);

var _wNav = __webpack_require__(310);

var _wNav2 = _interopRequireDefault(_wNav);

var _wRichtext = __webpack_require__(315);

var _wRichtext2 = _interopRequireDefault(_wRichtext);

var _wSpace = __webpack_require__(320);

var _wSpace2 = _interopRequireDefault(_wSpace);

var _wTimer = __webpack_require__(325);

var _wTimer2 = _interopRequireDefault(_wTimer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = {};
var pluginList = [_wAnimated2.default, _wButton2.default, _wDialog2.default, _wDecorate2.default, _wNav2.default, _wRichtext2.default, _wSpace2.default, _wTimer2.default];

for (var i = 0; i < pluginList.length; i++) {
	for (var key in pluginList[i]) {
		result[key] = pluginList[i][key];
	}
}

for (var _key in result) {
	Vue.use(result[_key]);
}

exports.default = result;

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wAnimated = __webpack_require__(291);

var _wAnimated2 = _interopRequireDefault(_wAnimated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_wAnimated2.default.install = function (Vue) {
	Vue.component(_wAnimated2.default.name, _wAnimated2.default);
};

exports.default = {
	WAnimated: _wAnimated2.default
};

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wAnimated_vue__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wAnimated_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wAnimated_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wAnimated_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wAnimated_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60d73f6e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wAnimated_vue__ = __webpack_require__(294);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(292)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-60d73f6e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wAnimated_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60d73f6e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wAnimated_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "view/wAnimated/wAnimated.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60d73f6e", Component.options)
  } else {
    hotAPI.reload("data-v-60d73f6e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(293);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("1f9e665e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60d73f6e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wAnimated.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60d73f6e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wAnimated.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n@-webkit-keyframes shake-data-v-60d73f6e{\n12.5%{\n        -webkit-transform: rotate(25deg);\n                transform: rotate(25deg);\n        -webkit-transform-origin: center bottom;\n                transform-origin: center bottom;\n}\n37.5%{\n        -webkit-transform: rotate(-25deg);\n                transform: rotate(-25deg);\n        -webkit-transform-origin: center bottom;\n                transform-origin: center bottom;\n}\n62.5%{\n        -webkit-transform: rotate(25deg);\n                transform: rotate(25deg);\n        -webkit-transform-origin: center bottom;\n                transform-origin: center bottom;\n}\n77.5%{\n        -webkit-transform: rotate(-25deg);\n                transform: rotate(-25deg);\n        -webkit-transform-origin: center bottom;\n                transform-origin: center bottom;\n}\n100%{\n        -webkit-transform: rotate(0);\n                transform: rotate(0);\n        -webkit-transform-origin: center bottom;\n                transform-origin: center bottom;\n}\n}\n@keyframes shake-data-v-60d73f6e{\n12.5%{\n        -webkit-transform: rotate(25deg);\n                transform: rotate(25deg);\n        -webkit-transform-origin: center bottom;\n                transform-origin: center bottom;\n}\n37.5%{\n        -webkit-transform: rotate(-25deg);\n                transform: rotate(-25deg);\n        -webkit-transform-origin: center bottom;\n                transform-origin: center bottom;\n}\n62.5%{\n        -webkit-transform: rotate(25deg);\n                transform: rotate(25deg);\n        -webkit-transform-origin: center bottom;\n                transform-origin: center bottom;\n}\n77.5%{\n        -webkit-transform: rotate(-25deg);\n                transform: rotate(-25deg);\n        -webkit-transform-origin: center bottom;\n                transform-origin: center bottom;\n}\n100%{\n        -webkit-transform: rotate(0);\n                transform: rotate(0);\n        -webkit-transform-origin: center bottom;\n                transform-origin: center bottom;\n}\n}\n@-webkit-keyframes rotate-data-v-60d73f6e{\nfrom{-webkit-transform:rotate(0);transform:rotate(0)\n}\nto{-webkit-transform:rotate(360deg);transform:rotate(360deg)\n}\n}\n@keyframes rotate-data-v-60d73f6e{\nfrom{-webkit-transform:rotate(0);transform:rotate(0)\n}\nto{-webkit-transform:rotate(360deg);transform:rotate(360deg)\n}\n}\n.animated_wrap[data-v-60d73f6e]{\n\ttext-align:center;\n\toverflow:hidden;\n}\n.animated_wrap.SHAKE.active[data-v-60d73f6e]{\n\t-webkit-animation:shake-data-v-60d73f6e 1.2s infinite linear;\n\t        animation:shake-data-v-60d73f6e 1.2s infinite linear;\n}\n.animated_wrap.ROTATE.active[data-v-60d73f6e]{\n\t-webkit-animation:rotate-data-v-60d73f6e 1.2s infinite linear;\n\t        animation:rotate-data-v-60d73f6e 1.2s infinite linear;\n}\n.animated_wrap img[data-v-60d73f6e]{\n\tmax-width:100%;\n}\n", "", {"version":3,"sources":["/Users/linguibin/Desktop/weipagenew/view/wAnimated/view/wAnimated/wAnimated.vue"],"names":[],"mappings":";AA+CA;AACA;QACA,iCAAA;gBAAA,yBAAA;QACA,wCAAA;gBAAA,gCAAA;CACA;AACA;QACA,kCAAA;gBAAA,0BAAA;QACA,wCAAA;gBAAA,gCAAA;CACA;AACA;QACA,iCAAA;gBAAA,yBAAA;QACA,wCAAA;gBAAA,gCAAA;CACA;AACA;QACA,kCAAA;gBAAA,0BAAA;QACA,wCAAA;gBAAA,gCAAA;CACA;AACA;QACA,6BAAA;gBAAA,qBAAA;QACA,wCAAA;gBAAA,gCAAA;CACA;CACA;AArBA;AACA;QACA,iCAAA;gBAAA,yBAAA;QACA,wCAAA;gBAAA,gCAAA;CACA;AACA;QACA,kCAAA;gBAAA,0BAAA;QACA,wCAAA;gBAAA,gCAAA;CACA;AACA;QACA,iCAAA;gBAAA,yBAAA;QACA,wCAAA;gBAAA,gCAAA;CACA;AACA;QACA,kCAAA;gBAAA,0BAAA;QACA,wCAAA;gBAAA,gCAAA;CACA;AACA;QACA,6BAAA;gBAAA,qBAAA;QACA,wCAAA;gBAAA,gCAAA;CACA;CACA;AACA;AACA,KAAA,4BAAA,mBAAA;CAAA;AACA,GAAA,iCAAA,wBAAA;CAAA;CACA;AAHA;AACA,KAAA,4BAAA,mBAAA;CAAA;AACA,GAAA,iCAAA,wBAAA;CAAA;CACA;AACA;CACA,kBAAA;CACA,gBAAA;CACA;AACA;CACA,6DAAA;SAAA,qDAAA;CACA;AACA;CACA,8DAAA;SAAA,sDAAA;CACA;AACA;CACA,eAAA;CACA","file":"wAnimated.vue","sourcesContent":["<template>\n\t<div :id=\"pluginData.identity\" class=\"plugin_wrap\" :style=\"parsePluginStyle(pluginData.backgroundColor,pluginData.backgroundImage)\">\n\t\t<div class=\"animated_wrap\" :class=\"praseAnimated(pluginData.subPluginType,pluginData.animateStatus)\" :style=\"{height:pluginData.height + 'px'}\">\n\t\t\t<img :src=\"parseProductImage(pluginData.animateImage)\" />\n\t\t</div>\n\t</div>\n</template>\n\n<script>\n\timport viewMethodConfig from '../../config/viewMethodConfig.js';\n\n\tlet methods = {};\n\tfor(let key in viewMethodConfig){\n\t\tmethods[key] = viewMethodConfig[key];\n\t}\n\n\tmethods[\"praseAnimated\"] = function(subPluginType,animateStatus){\n\t\tif(animateStatus == 'START'){\n\t\t\treturn subPluginType + ' active';\n\t\t}else{\n\t\t\treturn subPluginType;\n\t\t}\n\t};\n\n\texport default {\n\t\tname:\"wAnimated\",\n\t\tprops:{\n\t\t\tpluginData:{\n\t\t\t\ttype: Object,\n      \t\t\tdefault: function(){\n      \t\t\t\treturn {};\n      \t\t\t}\n\t\t\t}\n\t\t},\n\t\tdata () {\n\t\t    return {\n\t\t      \n\t\t    }\n\t\t},\n\t\tcreated:function(){\n\t\t\t\n\t\t},\n\t\tmethods:methods\t\t\n\t}\n</script>\n\n<style scoped>\n\t@keyframes shake{\n\t    12.5%{\n\t        transform: rotate(25deg);\n\t        transform-origin: center bottom;\n\t    }\n\t    37.5%{\n\t        transform: rotate(-25deg);\n\t        transform-origin: center bottom;\n\t    }\n\t    62.5%{\n\t        transform: rotate(25deg);\n\t        transform-origin: center bottom;\n\t    }\n\t    77.5%{\n\t        transform: rotate(-25deg);\n\t        transform-origin: center bottom;\n\t    }\n\t    100%{\n\t        transform: rotate(0);\n\t        transform-origin: center bottom;\n\t    }\n\t}\n\t@keyframes rotate{\n\t\tfrom{transform:rotate(0)}\n\t\tto{transform:rotate(360deg)}\n\t}\n\t.animated_wrap{\n\t\ttext-align:center;\n\t\toverflow:hidden;\n\t}\n\t.animated_wrap.SHAKE.active{\n\t\tanimation:shake 1.2s infinite linear;\n\t}\n\t.animated_wrap.ROTATE.active{\n\t\tanimation:rotate 1.2s infinite linear;\n\t}\n\t.animated_wrap img{\n\t\tmax-width:100%;\n\t}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "plugin_wrap",
      style: _vm.parsePluginStyle(
        _vm.pluginData.backgroundColor,
        _vm.pluginData.backgroundImage
      ),
      attrs: { id: _vm.pluginData.identity }
    },
    [
      _c(
        "div",
        {
          staticClass: "animated_wrap",
          class: _vm.praseAnimated(
            _vm.pluginData.subPluginType,
            _vm.pluginData.animateStatus
          ),
          style: { height: _vm.pluginData.height + "px" }
        },
        [
          _c("img", {
            attrs: { src: _vm.parseProductImage(_vm.pluginData.animateImage) }
          })
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-60d73f6e", esExports)
  }
}

/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wButton = __webpack_require__(296);

var _wButton2 = _interopRequireDefault(_wButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_wButton2.default.install = function (Vue) {
	Vue.component(_wButton2.default.name, _wButton2.default);
};

exports.default = {
	WButton: _wButton2.default
};

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wButton_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wButton_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wButton_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wButton_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c00694b2_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wButton_vue__ = __webpack_require__(299);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(297)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c00694b2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wButton_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c00694b2_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wButton_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "view/wButton/wButton.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c00694b2", Component.options)
  } else {
    hotAPI.reload("data-v-c00694b2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(298);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("b25d0c48", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c00694b2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wButton.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c00694b2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wButton.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.button_wrap[data-v-c00694b2]{\n\t\tmargin:auto;\n\t\ttext-align:center;\n\t\tfont-size:16px;\n\t\tbackground-size:100% 100%;\n    \t-webkit-box-shadow: 0 0 5px #666;\n    \t        box-shadow: 0 0 5px #666;\n}\n", "", {"version":3,"sources":["/Users/linguibin/Desktop/weipagenew/view/wButton/view/wButton/wButton.vue"],"names":[],"mappings":";AA+EA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,0BAAA;KACA,iCAAA;aAAA,yBAAA;CACA","file":"wButton.vue","sourcesContent":["<template>\n\t<div :id=\"pluginData.identity\" class=\"plugin_wrap\" :style=\"parsePluginStyle(pluginData.backgroundColor,pluginData.backgroundImage)\">\n\n\t\t<div v-for=\"item in pluginData.subPluginList\" class=\"button_wrap\" @click=\"buttionEvent(item)\" :style=\"praseButtonStyle(item.checkStatus,item.backgroundColor,item.picUrl,item.color,item.width,item.height,item.borderRadius)\">{{item.text}}</div>\n\n\t</div>\n</template>\n\n<script>\n\timport viewMethodConfig from '../../config/viewMethodConfig.js';\n\n\tlet methods = {};\n\tfor(let key in viewMethodConfig){\n\t\tmethods[key] = viewMethodConfig[key];\n\t}\n\n\tmethods[\"praseButtonStyle\"] = function(checkStatus,backgroundColor,picUrl,color,width,height,borderRadius){\n\t\tif(checkStatus == \"NO\"){\n\t\t\treturn \"display:none\";\n\t\t}\n\t\treturn 'backgroundColor:' + backgroundColor + ';backgroundImage:url(\"' + picUrl + '\");color:' + color + ';width:' + width + 'px;height:' + height + 'px;lineHeight:'  + height + 'px;borderRadius:' + borderRadius + 'px'; \t\t\t\t\n\t};\n\n\tmethods[\"changeWeipageData\"] = function(option){\n\t\tthis.$emit(\"changeweipagedata\",{id:option.modelId,key:option.modelKey,value:option.modelValue});\n\t}\n\n\tmethods[\"buttionEvent\"] = function(subPlugin){\n\t\tlet _this = this;\n\t\tfor(let i = 0;i < subPlugin.thirdPluginList.length;i++){\n\t\t\tlet thirdPlugin = subPlugin.thirdPluginList[i];\t\t\t\n\t\t\tif(thirdPlugin.eventType == 'LOCAL' && thirdPlugin.modelId && thirdPlugin.modelKey){\n\t\t\t\t_this.changeWeipageData(thirdPlugin);\n\t\t\t}else if(thirdPlugin.eventType == 'HTTP' && thirdPlugin.httpUrl){\n\t\t\t\t$.ajax({\n\t\t\t\t\ttype:\"post\",\n\t\t\t\t\turl:thirdPlugin.httpUrl,\n\t\t\t\t\tdata:thirdPlugin.httpData,\n\t\t\t\t\tsuccess:function(res){\n\t\t\t\t\t\tfor(let j = 0;j < thirdPlugin.fourthPluginList.length;j++){\n\t\t\t\t\t\t\tlet fourthPlugin = thirdPlugin.fourthPluginList[j];\n\t\t\t\t\t\t\tif(fourthPlugin.modelId && fourthPlugin.useRequestData == 'YES'){\n\t\t\t\t\t\t\t\tfourthPlugin[\"modelValue\"] = res;\n\t\t\t\t\t\t\t\tfourthPlugin[\"modelKey\"] = \"requestData\";\n\t\t\t\t\t\t\t\t_this.changeWeipageData({modelId:fourthPlugin.modelId,modelKey:\"unForeach\",modelValue:false});\n\t\t\t\t\t\t\t\t_this.changeWeipageData(fourthPlugin);\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t}else if(fourthPlugin.modelId && fourthPlugin.modelKey && fourthPlugin.modelValue){\n\t\t\t\t\t\t\t\t_this.changeWeipageData(fourthPlugin);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t})\n\t\t\t}\n\t\t}\t\t\n\t};\n\n\texport default {\n\t\tname:\"wButton\",\n\t\tprops:{\n\t\t\tpluginData:{\n\t\t\t\ttype: Object,\n      \t\t\tdefault: function(){\n      \t\t\t\treturn {};\n      \t\t\t}\n\t\t\t}\n\t\t},\n\t\tdata () {\n\t\t    return {\n\t\t      \n\t\t    }\n\t\t},\n\t\tcreated:function(){\n\t\t\t\n\t\t},\n\t\tmethods:methods\t\t\n\t}\n</script>\n\n<style scoped>\n\t.button_wrap{\n\t\tmargin:auto;\n\t\ttext-align:center;\n\t\tfont-size:16px;\n\t\tbackground-size:100% 100%;\n    \tbox-shadow: 0 0 5px #666;\n\t}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "plugin_wrap",
      style: _vm.parsePluginStyle(
        _vm.pluginData.backgroundColor,
        _vm.pluginData.backgroundImage
      ),
      attrs: { id: _vm.pluginData.identity }
    },
    _vm._l(_vm.pluginData.subPluginList, function(item) {
      return _c(
        "div",
        {
          staticClass: "button_wrap",
          style: _vm.praseButtonStyle(
            item.checkStatus,
            item.backgroundColor,
            item.picUrl,
            item.color,
            item.width,
            item.height,
            item.borderRadius
          ),
          on: {
            click: function($event) {
              _vm.buttionEvent(item)
            }
          }
        },
        [_vm._v(_vm._s(item.text))]
      )
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c00694b2", esExports)
  }
}

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _weiPageConfig = __webpack_require__(6);

var _weiPageConfig2 = _interopRequireDefault(_weiPageConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	parsePluginSelect: function parsePluginSelect(pluginSelect) {
		if (pluginSelect) {
			return "current";
		} else {
			return "";
		}
	},
	parsePluginStyle: function parsePluginStyle(backgroundColor, backgroundImage) {
		if (backgroundColor && backgroundImage) {
			return 'backgroundColor:' + backgroundColor + ';backgroundImage:url("' + backgroundImage + '")';
		} else if (backgroundColor) {
			return 'backgroundColor:' + backgroundColor;
		} else if (backgroundImage) {
			return 'backgroundImage:url("' + backgroundImage + '")';
		} else {
			return '';
		}
	},
	parseProductImage: function parseProductImage(picUrl) {
		if (picUrl) {
			return picUrl;
		} else {
			return './libs/img/product.png';
		}
	},
	parseBannerImage: function parseBannerImage(picUrl) {
		if (picUrl) {
			return picUrl;
		} else {
			return './libs/img/banner.png';
		}
	},
	parseUploadImage: function parseUploadImage(picUrl) {
		if (picUrl) {
			return picUrl;
		} else {
			return './libs/img/add_picture.png';
		}
	},
	checkTheSame: function checkTheSame(a, b) {
		if (a && b) {
			if (a == b) {
				return true;
			} else {
				return false;
			}
		} else if (!a && !b) {
			return true;
		} else {
			return false;
		}
	}
};

/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wDialog = __webpack_require__(301);

var _wDialog2 = _interopRequireDefault(_wDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_wDialog2.default.install = function (Vue) {
	Vue.component(_wDialog2.default.name, _wDialog2.default);
};

exports.default = {
	WDialog: _wDialog2.default
};

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDialog_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDialog_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDialog_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDialog_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDialog_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_320e145a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wDialog_vue__ = __webpack_require__(304);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(302)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-320e145a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDialog_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_320e145a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wDialog_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "view/wDialog/wDialog.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-320e145a", Component.options)
  } else {
    hotAPI.reload("data-v-320e145a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(303);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("48323052", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-320e145a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wDialog.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-320e145a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wDialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.plugin_wrap[data-v-320e145a]{\n\tposition:absolute;\n\tleft:50%;\n\ttop:50%;\n\twidth:240px;\n\t-webkit-transform:translate(-50%,-50%);\n\t    -ms-transform:translate(-50%,-50%);\n\t        transform:translate(-50%,-50%);\n}\n.dialog_wrap[data-v-320e145a]{\n\ttext-align:center;\n\tpadding:10px;\n}\n.dialog_wrap p[data-v-320e145a]{\n\tpadding:8px;\n}\n.dialog_wrap img[data-v-320e145a]{\n\twidth:160px;\n}\n", "", {"version":3,"sources":["/Users/linguibin/Desktop/weipagenew/view/wDialog/view/wDialog/wDialog.vue"],"names":[],"mappings":";AAsLA;CACA,kBAAA;CACA,SAAA;CACA,QAAA;CACA,YAAA;CACA,uCAAA;KAAA,mCAAA;SAAA,+BAAA;CACA;AACA;CACA,kBAAA;CACA,aAAA;CACA;AACA;CACA,YAAA;CACA;AACA;CACA,YAAA;CACA","file":"wDialog.vue","sourcesContent":["<template>\n\t<div :id=\"pluginData.identity\" class=\"plugin_wrap\" :style=\"parsePluginStyle(pluginData.backgroundColor,pluginData.backgroundImage)\">\n\t\t<div v-for=\"subPlugin in pluginData.subPluginList\" class=\"dialog_wrap\" v-if=\"parseStatus(pluginData,subPlugin)\">\n\t\t\t<p v-for=\"item in subPlugin.thirdPluginList\">\n\t\t\t\t<img v-if=\"item.type == 'IMAGE'\" :src=\"parseFormData(item,pluginData.requestData)\" />\n\t\t\t\t<span v-else-if=\"item.type == 'TEXT'\">{{parseFormData(item,pluginData.requestData)}}</span>\n\t\t\t</p>\t\t\t\t\n\t\t</div>\n\t</div>\n</template>\n\n<script>\n\timport viewMethodConfig from '../../config/viewMethodConfig.js';\n\n\tlet methods = {};\n\tfor(let key in viewMethodConfig){\n\t\tmethods[key] = viewMethodConfig[key];\n\t}\n\n\tfunction conditionParseKeyValue(keyValueStr){\t\n\t\tlet symbol = \"\";\n\t\tlet key = \"\";\n\t\tlet keyList = \"\";\n\t\tlet valueStr = \"\";\n\t\tlet value;\n\t\tif(keyValueStr.indexOf(\">=\") >= 0){\n\t\t\tsymbol = \">=\";\n\t\t}else if(keyValueStr.indexOf(\"<=\") >= 0){\n\t\t\tsymbol = \"<=\";\n\t\t}else if(keyValueStr.indexOf(\"!=\") >= 0){\n\t\t\tsymbol = \"!=\";\n\t\t}else if(keyValueStr.indexOf(\">\") >= 0){\n\t\t\tsymbol = \">\";\n\t\t}else if(keyValueStr.indexOf(\"<\") >= 0){\n\t\t\tsymbol = \"<\";\n\t\t}else{\n\t\t\tsymbol = \"==\";\n\t\t}\n\t\tlet symbolIndex = keyValueStr.indexOf(symbol);\n\t\tif(symbolIndex > 0){\n\t\t\tkey = keyValueStr.substring(0,symbolIndex);\n\t\t\tvalueStr = keyValueStr.substring(symbolIndex + symbol.length);\n\t\t}else if(symbolIndex == 0){\n\t\t\tvalueStr = keyValueStr.substring(symbolIndex + symbol.length);\n\t\t}else{\n\t\t\tvalueStr = keyValueStr;\n\t\t}\n\t\tif(isNaN(Number(valueStr))){\n\t\t\tvalue = valueStr.replace(/'/g,\"\").replace(/\"/g,\"\");\n\t\t}else{\n\t\t\tvalue = Number(valueStr);\n\t\t}\n\t\tkeyList = key.split(\".\");\n\t\treturn {\n\t\t\tsymbol:symbol,\n\t\t\tkeyList:keyList,\n\t\t\tvalue:value\n\t\t}\n\t}\n\n\tfunction conditionParseResult(condition){\n\t\tlet operationList = [];\n\t\tlet symbolList = [];\n\t\tlet tempList = condition.split(\"&&\");\n\t\tfor(let i = 0;i < tempList.length;i++){\n\t\t\tif(i > 0){\n\t\t\t\tsymbolList.push(\"&&\");\n\t\t\t}\n\t\t\tlet temp2List = tempList[i].split(\"||\");\n\t\t\tfor(let j = 0;j < temp2List.length;j++){\n\t\t\t\toperationList.push(conditionParseKeyValue(temp2List[j]));\n\t\t\t\tif(j > 0){\n\t\t\t\t\tsymbolList.push(\"||\");\n\t\t\t\t}\t\t\t\n\t\t\t}\t\n\t\t}\n\t\treturn {\n\t\t\toperationList:operationList,\n\t\t\tsymbolList:symbolList\n\t\t}\n\t}\n\n\tfunction getRequestKeyData(keyList,requestData){\n\t\tlet result = JSON.parse(JSON.stringify(requestData));\n\t\tfor(let i = 0;i < keyList.length;i++){\n\t\t\tif(keyList[i]){\n\t\t\t\tresult = result[keyList[i]];\n\t\t\t}\n\t\t}\n\t\treturn result;\n\t}\n\n\tfunction checkJudgeList(operationList,requestData){\n\t\tlet resultList = [];\n\t\tfor(let i = 0;i < operationList.length;i++){\n\t\t\tlet keyValue = getRequestKeyData(operationList[i].keyList,requestData);\n\t\t\tswitch(operationList[i].symbol){\n\t\t\t\tcase '>=':keyValue >= operationList[i].value?resultList.push(true):resultList.push(false);break;\n\t\t\t\tcase '<=':keyValue <= operationList[i].value?resultList.push(true):resultList.push(false);break;\n\t\t\t\tcase '!=':keyValue != operationList[i].value?resultList.push(true):resultList.push(false);break;\n\t\t\t\tcase '>':keyValue > operationList[i].value?resultList.push(true):resultList.push(false);break;\n\t\t\t\tcase '<':keyValue < operationList[i].value?resultList.push(true):resultList.push(false);break;\n\t\t\t\tdefault:keyValue == operationList[i].value?resultList.push(true):resultList.push(false);break;\n\t\t\t}\n\t\t}\n\t\treturn resultList;\n\t}\n\n\tfunction conditionOperation(condition,requestData){\n\t\tif(!condition || !requestData){\n\t\t\treturn false;\n\t\t}\n\t\tlet result = true;\n\t\tlet conditionRes = conditionParseResult(condition);\n\t\tlet judgeList = checkJudgeList(conditionRes.operationList,requestData);\n\t\tfor(let i = 0;i < judgeList.length;i++){\n\t\t\tif(i == 0){\n\t\t\t\tresult = judgeList[i];\n\t\t\t}else if(conditionRes.symbolList[i]){\n\t\t\t\tswitch(conditionRes.symbolList[i]){\n\t\t\t\t\tcase \"&&\": result = result && judgeList[i];break;\n\t\t\t\t\tcase \"||\": result = result || judgeList[i];break;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn result;\n\t}\n\n\tmethods[\"parseStatus\"] = function(pluginData,subPlugin){\n\t\tif(pluginData.unForeach || pluginData.isOpen == 'NO'){\n\t\t\treturn false;\n\t\t}\n\n\t\tif(subPlugin.checkStatus == 'YES'){\n\t\t\tif(conditionOperation(subPlugin.condition,pluginData.requestData)){\n\t\t\t\tpluginData[\"unForeach\"] = true;\n\t\t\t\treturn true;\n\t\t\t}else{\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}else{\n\t\t\tpluginData[\"unForeach\"] = true; \n\t\t\treturn true;\n\t\t}\t\t\n\t}\n\n\tmethods[\"parseFormData\"] = function(thirdPlugin,requestData){\n\t\tif(thirdPlugin.key){\n\t\t\tlet keyList = thirdPlugin.key.split(\".\");\n\t\t\tlet temp = JSON.parse(JSON.stringify(requestData));\n\t\t\tfor(let i = 0;i < keyList.length;i++){\n\t\t\t\ttemp = temp[keyList[i]];\n\t\t\t}\n\t\t\treturn temp;\n\t\t}else{\n\t\t\treturn thirdPlugin.value;\n\t\t}\n\t}\n\n\texport default {\n\t\tname:\"wDialog\",\n\t\tprops:{\n\t\t\tpluginData:{\n\t\t\t\ttype: Object,\n      \t\t\tdefault: function(){\n      \t\t\t\treturn {};\n      \t\t\t}\n\t\t\t}\n\t\t},\n\t\tdata () {\n\t\t    return {\n\t\t      \n\t\t    }\n\t\t},\n\t\tcreated:function(){\n\t\t\t\n\t\t},\n\t\tmethods:methods\t\t\n\t}\n</script>\n\n<style scoped>\n\t.plugin_wrap{\n\t\tposition:absolute;\n\t\tleft:50%;\n\t\ttop:50%;\n\t\twidth:240px;\n\t\ttransform:translate(-50%,-50%);\n\t}\n\t.dialog_wrap{\n\t\ttext-align:center;\n\t\tpadding:10px;\n\t}\n\t.dialog_wrap p{\n\t\tpadding:8px;\n\t}\n\t.dialog_wrap img{\n\t\twidth:160px;\n\t}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "plugin_wrap",
      style: _vm.parsePluginStyle(
        _vm.pluginData.backgroundColor,
        _vm.pluginData.backgroundImage
      ),
      attrs: { id: _vm.pluginData.identity }
    },
    _vm._l(_vm.pluginData.subPluginList, function(subPlugin) {
      return _vm.parseStatus(_vm.pluginData, subPlugin)
        ? _c(
            "div",
            { staticClass: "dialog_wrap" },
            _vm._l(subPlugin.thirdPluginList, function(item) {
              return _c("p", [
                item.type == "IMAGE"
                  ? _c("img", {
                      attrs: {
                        src: _vm.parseFormData(item, _vm.pluginData.requestData)
                      }
                    })
                  : item.type == "TEXT"
                    ? _c("span", [
                        _vm._v(
                          _vm._s(
                            _vm.parseFormData(item, _vm.pluginData.requestData)
                          )
                        )
                      ])
                    : _vm._e()
              ])
            })
          )
        : _vm._e()
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-320e145a", esExports)
  }
}

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wDecorate = __webpack_require__(306);

var _wDecorate2 = _interopRequireDefault(_wDecorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_wDecorate2.default.install = function (Vue) {
	Vue.component(_wDecorate2.default.name, _wDecorate2.default);
};

exports.default = {
	WDecorate: _wDecorate2.default
};

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDecorate_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDecorate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDecorate_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDecorate_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDecorate_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1e29dc9d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wDecorate_vue__ = __webpack_require__(309);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(307)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1e29dc9d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wDecorate_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1e29dc9d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wDecorate_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "view/wDecorate/wDecorate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e29dc9d", Component.options)
  } else {
    hotAPI.reload("data-v-1e29dc9d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(308);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("0e0b7044", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e29dc9d\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wDecorate.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e29dc9d\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wDecorate.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"wDecorate.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "plugin_wrap",
      style: _vm.parseDecorateStyle(
        _vm.pluginData.backgroundColor,
        _vm.pluginData.backgroundImage,
        _vm.pluginData.width,
        _vm.pluginData.height,
        _vm.pluginData.top,
        _vm.pluginData.left,
        _vm.pluginData.borderRadius
      ),
      attrs: { id: _vm.pluginData.identity }
    },
    [_c("div", { staticClass: "decorate_wrap" })]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1e29dc9d", esExports)
  }
}

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wNav = __webpack_require__(311);

var _wNav2 = _interopRequireDefault(_wNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_wNav2.default.install = function (Vue) {
	Vue.component(_wNav2.default.name, _wNav2.default);
};

exports.default = {
	WNav: _wNav2.default
};

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wNav_vue__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wNav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wNav_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wNav_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wNav_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_11adb85a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wNav_vue__ = __webpack_require__(314);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(312)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-11adb85a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wNav_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_11adb85a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wNav_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "view/wNav/wNav.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11adb85a", Component.options)
  } else {
    hotAPI.reload("data-v-11adb85a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(313);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("ce4dbf6c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-11adb85a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wNav.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-11adb85a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wNav.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.nav_wrap .nav_list[data-v-11adb85a]{\n   display: -webkit-box;\n   display: -ms-flexbox;\n   display: flex;\n   padding: 7px 0;\n   -ms-flex-pack: distribute;\n       justify-content: space-around;\n}\n.nav_wrap .nav_list .nav_item[data-v-11adb85a]{\n    text-align: center;\n    line-height: 27px;\n    border-radius: 27px;\n    background-color:#fff;\n    padding: 0 20px;\n}\n.nav_picture_wrap .nav_list[data-v-11adb85a]{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n}\n.nav_picture_wrap .nav_list .nav_item[data-v-11adb85a]{\n    text-align: center;\n    padding: 7.5px 0;\n}\n.nav_picture_wrap .nav_list .nav_item .nav_picture_page[data-v-11adb85a]{\n    width: 52px;\n    height: 52px;\n    border-radius: 26px;\n    background-color: #f8f8f8;\n    margin: auto;\n    overflow: hidden;\n}\n.nav_picture_wrap .nav_list .nav_item .nav_picture_page .item_image[data-v-11adb85a]{\n    width:100%;\n    height:100%;\n}\n.nav_picture_wrap .nav_list .nav_item .nav_picture_text[data-v-11adb85a]{\n    padding-top: 7px;\n    color: #333;\n    font-size: 14px;\n}\n.nav_picture_wrap .nav_list .nav_item.current .nav_picture_page .item_image[data-v-11adb85a]{\n\tbackground-color: rgba(35,156,243,0.2);\n}\n", "", {"version":3,"sources":["/Users/linguibin/Desktop/weipagenew/view/wNav/view/wNav/wNav.vue"],"names":[],"mappings":";AAuEA;GACA,qBAAA;GAAA,qBAAA;GAAA,cAAA;GACA,eAAA;GACA,0BAAA;OAAA,8BAAA;CACA;AACA;IACA,mBAAA;IACA,kBAAA;IACA,oBAAA;IACA,sBAAA;IACA,gBAAA;CACA;AACA;IACA,qBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,0BAAA;QAAA,8BAAA;CACA;AACA;IACA,mBAAA;IACA,iBAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,oBAAA;IACA,0BAAA;IACA,aAAA;IACA,iBAAA;CACA;AACA;IACA,WAAA;IACA,YAAA;CACA;AACA;IACA,iBAAA;IACA,YAAA;IACA,gBAAA;CACA;AACA;CACA,uCAAA;CACA","file":"wNav.vue","sourcesContent":["<template>\n\t<div :id=\"pluginData.identity\" class=\"plugin_wrap\" :style=\"parsePluginStyle(pluginData.backgroundColor,pluginData.backgroundImage)\">\n\t\t<div v-if=\"pluginData.subPluginType == 'TEXT'\" class=\"nav_wrap\">\n\t        <ul class=\"nav_list child_list font_14\">\n\t            <li v-for=\"item in pluginData.subPluginList\" :data-pluginUuid=\"item.pluginUuid\" class=\"nav_item subPlugin_wrap\" :class=\"parsePluginSelect(item.pluginSelect)\" >\n\t            \t<a draggable=\"false\" :href=\"item.linkUrl\" class=\"block_link\">{{parseNavName(item.name)}}</a>\n\t        \t</li>\n\t        </ul>\n\t    </div>\n\t    <div v-else-if=\"pluginData.subPluginType == 'IMAGE'\" class=\"nav_picture_wrap\">\n\t        <ul class=\"nav_list child_list font_14\">\n\t            <li v-for=\"item in pluginData.subPluginList\" :data-pluginUuid=\"item.pluginUuid\" class=\"nav_item subPlugin_wrap\" :class=\"parsePluginSelect(item.pluginSelect)\" >\n\t\t            <a draggable=\"false\" :href=\"item.linkUrl\" class=\"block_link\">\n\t\t\t\t\t\t<div class=\"nav_picture_page\">\n\t\t\t\t\t\t\t<img :src=\"parseNavPic(item.picUrl)\" alt=\"\" class=\"item_image\" draggable=\"false\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p class=\"nav_picture_text\">{{parseNavName(item.name)}}</p>\n\t\t\t\t\t</a>\n\t\t        </li>\n\t        </ul>\n\t    </div>\n\t</div>\n</template>\n\n<script>\n\timport viewMethodConfig from '../../config/viewMethodConfig.js';\n\n\tlet methods = {};\n\tfor(let key in viewMethodConfig){\n\t\tmethods[key] = viewMethodConfig[key];\n\t}\n\n\tmethods[\"parseNavName\"] = function(name){\n\t\tif(name){\n\t\t   return name;\n\t   \t}else{\n\t\t   return '导航';\n\t   \t}\n\t};\n\n\tmethods[\"parseNavPic\"] = function(picUrl){\n\t\tif(picUrl){\n\t\t\treturn picUrl;\n\t\t}else{\n\t\t\treturn './libs/img/icon_nav_addpic.png';\n\t\t}\n\t};\n\n\texport default {\n\t\tname:\"wNav\",\n\t\tprops:{\n\t\t\tpluginData:{\n\t\t\t\ttype: Object,\n      \t\t\tdefault: function(){\n      \t\t\t\treturn {};\n      \t\t\t}\n\t\t\t}\n\t\t},\n\t\tdata () {\n\t\t    return {\n\t\t      \n\t\t    }\n\t\t},\n\t\tcreated:function(){\n\t\t\t\n\t\t},\n\t\tmethods:methods\t\t\n\t}\n</script>\n\n<style scoped>\n\t.nav_wrap .nav_list{\n\t   display: flex;\n\t   padding: 7px 0;\n\t   justify-content: space-around;\n\t}\n\t.nav_wrap .nav_list .nav_item{\n\t    text-align: center;\n\t    line-height: 27px;\n\t    border-radius: 27px;\n\t    background-color:#fff;\n\t    padding: 0 20px;\n\t}\n\t.nav_picture_wrap .nav_list{\n\t    display: flex;\n\t    justify-content: space-around;\n\t}\n\t.nav_picture_wrap .nav_list .nav_item{\n\t    text-align: center;\n\t    padding: 7.5px 0;\n\t}\n\t.nav_picture_wrap .nav_list .nav_item .nav_picture_page{\n\t    width: 52px;\n\t    height: 52px;\n\t    border-radius: 26px;\n\t    background-color: #f8f8f8;\n\t    margin: auto;\n\t    overflow: hidden;\n\t}\n\t.nav_picture_wrap .nav_list .nav_item .nav_picture_page .item_image{\n\t    width:100%;\n\t    height:100%;\n\t}\n\t.nav_picture_wrap .nav_list .nav_item .nav_picture_text{\n\t    padding-top: 7px;\n\t    color: #333;\n\t    font-size: 14px;\n\t}\n\t.nav_picture_wrap .nav_list .nav_item.current .nav_picture_page .item_image{\n\t\tbackground-color: rgba(35,156,243,0.2);\n\t}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "plugin_wrap",
      style: _vm.parsePluginStyle(
        _vm.pluginData.backgroundColor,
        _vm.pluginData.backgroundImage
      ),
      attrs: { id: _vm.pluginData.identity }
    },
    [
      _vm.pluginData.subPluginType == "TEXT"
        ? _c("div", { staticClass: "nav_wrap" }, [
            _c(
              "ul",
              { staticClass: "nav_list child_list font_14" },
              _vm._l(_vm.pluginData.subPluginList, function(item) {
                return _c(
                  "li",
                  {
                    staticClass: "nav_item subPlugin_wrap",
                    class: _vm.parsePluginSelect(item.pluginSelect),
                    attrs: { "data-pluginUuid": item.pluginUuid }
                  },
                  [
                    _c(
                      "a",
                      {
                        staticClass: "block_link",
                        attrs: { draggable: "false", href: item.linkUrl }
                      },
                      [_vm._v(_vm._s(_vm.parseNavName(item.name)))]
                    )
                  ]
                )
              })
            )
          ])
        : _vm.pluginData.subPluginType == "IMAGE"
          ? _c("div", { staticClass: "nav_picture_wrap" }, [
              _c(
                "ul",
                { staticClass: "nav_list child_list font_14" },
                _vm._l(_vm.pluginData.subPluginList, function(item) {
                  return _c(
                    "li",
                    {
                      staticClass: "nav_item subPlugin_wrap",
                      class: _vm.parsePluginSelect(item.pluginSelect),
                      attrs: { "data-pluginUuid": item.pluginUuid }
                    },
                    [
                      _c(
                        "a",
                        {
                          staticClass: "block_link",
                          attrs: { draggable: "false", href: item.linkUrl }
                        },
                        [
                          _c("div", { staticClass: "nav_picture_page" }, [
                            _c("img", {
                              staticClass: "item_image",
                              attrs: {
                                src: _vm.parseNavPic(item.picUrl),
                                alt: "",
                                draggable: "false"
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c("p", { staticClass: "nav_picture_text" }, [
                            _vm._v(_vm._s(_vm.parseNavName(item.name)))
                          ])
                        ]
                      )
                    ]
                  )
                })
              )
            ])
          : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-11adb85a", esExports)
  }
}

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wRichtext = __webpack_require__(316);

var _wRichtext2 = _interopRequireDefault(_wRichtext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_wRichtext2.default.install = function (Vue) {
	Vue.component(_wRichtext2.default.name, _wRichtext2.default);
};

exports.default = {
	WRichtext: _wRichtext2.default
};

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wRichtext_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wRichtext_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wRichtext_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wRichtext_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wRichtext_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_02e000d6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wRichtext_vue__ = __webpack_require__(319);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(317)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-02e000d6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wRichtext_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_02e000d6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wRichtext_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "view/wRichtext/wRichtext.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02e000d6", Component.options)
  } else {
    hotAPI.reload("data-v-02e000d6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(318);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("ca0d7118", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-02e000d6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wRichtext.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-02e000d6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wRichtext.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.richtext_wrap[data-v-02e000d6] {\n    padding: 8px;\n    word-wrap: break-word\n}\n.richtext_wrap img[data-v-02e000d6] {\n    max-width: 100%\n}\n.richtext_wrap table[data-v-02e000d6] {\n    width: 100%\n}\n", "", {"version":3,"sources":["/Users/linguibin/Desktop/weipagenew/view/wRichtext/view/wRichtext/wRichtext.vue"],"names":[],"mappings":";AAuCA;IACA,aAAA;IACA,qBAAA;CACA;AACA;IACA,eAAA;CACA;AACA;IACA,WAAA;CACA","file":"wRichtext.vue","sourcesContent":["<template>\n\t<div :id=\"pluginData.identity\" class=\"plugin_wrap\" :style=\"{backgroundColor:pluginData.backgroundColor,backgroundImage:'url(' + pluginData.backgroundImage + ')',padding:pluginData.margin + 'px'}\">\n\t\t<div class=\"richtext_wrap\" v-html=\"pluginData.txtHtml\" :style=\"{backgroundColor:pluginData.contentColor,borderRadius:pluginData.borderRadius + 'px'}\">\n\t        {{pluginData.txtHtml}}\n\t    </div>\n\t</div>\n</template>\n\n<script>\n\timport viewMethodConfig from '../../config/viewMethodConfig.js';\n\n\tlet methods = {};\n\tfor(let key in viewMethodConfig){\n\t\tmethods[key] = viewMethodConfig[key];\n\t}\n\t\n\texport default {\n\t\tname:\"wRichtext\",\n\t\tprops:{\n\t\t\tpluginData:{\n\t\t\t\ttype: Object,\n      \t\t\tdefault: function(){\n      \t\t\t\treturn {};\n      \t\t\t}\n\t\t\t}\n\t\t},\n\t\tdata () {\n\t\t    return {\n\t\t      \n\t\t    }\n\t\t},\n\t\tcreated:function(){\n\t\t\t\n\t\t},\n\t\tmethods:methods\t\t\n\t}\n</script>\n\n<style scoped>\n.richtext_wrap {\n    padding: 8px;\n    word-wrap: break-word\n}\n.richtext_wrap img {\n    max-width: 100%\n}\n.richtext_wrap table {\n    width: 100%\n}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "plugin_wrap",
      style: {
        backgroundColor: _vm.pluginData.backgroundColor,
        backgroundImage: "url(" + _vm.pluginData.backgroundImage + ")",
        padding: _vm.pluginData.margin + "px"
      },
      attrs: { id: _vm.pluginData.identity }
    },
    [
      _c(
        "div",
        {
          staticClass: "richtext_wrap",
          style: {
            backgroundColor: _vm.pluginData.contentColor,
            borderRadius: _vm.pluginData.borderRadius + "px"
          },
          domProps: { innerHTML: _vm._s(_vm.pluginData.txtHtml) }
        },
        [_vm._v("\n        " + _vm._s(_vm.pluginData.txtHtml) + "\n    ")]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-02e000d6", esExports)
  }
}

/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wSpace = __webpack_require__(321);

var _wSpace2 = _interopRequireDefault(_wSpace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_wSpace2.default.install = function (Vue) {
	Vue.component(_wSpace2.default.name, _wSpace2.default);
};

exports.default = {
	WSpace: _wSpace2.default
};

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wSpace_vue__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wSpace_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wSpace_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wSpace_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wSpace_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_43eccbb3_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wSpace_vue__ = __webpack_require__(324);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(322)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-43eccbb3"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wSpace_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_43eccbb3_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wSpace_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "view/wSpace/wSpace.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-43eccbb3", Component.options)
  } else {
    hotAPI.reload("data-v-43eccbb3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(323);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("40bd913f", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-43eccbb3\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wSpace.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-43eccbb3\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wSpace.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"wSpace.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "plugin_wrap",
      style: _vm.parsePluginStyle(
        _vm.pluginData.backgroundColor,
        _vm.pluginData.backgroundImage
      ),
      attrs: { id: _vm.pluginData.identity }
    },
    [
      _c("div", {
        staticClass: "space_wrap",
        style: { height: _vm.pluginData.height + "px" }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-43eccbb3", esExports)
  }
}

/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wTimer = __webpack_require__(326);

var _wTimer2 = _interopRequireDefault(_wTimer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_wTimer2.default.install = function (Vue) {
	Vue.component(_wTimer2.default.name, _wTimer2.default);
};

exports.default = {
	WTimer: _wTimer2.default
};

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wTimer_vue__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wTimer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wTimer_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wTimer_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wTimer_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7810f25a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wTimer_vue__ = __webpack_require__(329);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(327)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7810f25a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wTimer_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7810f25a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wTimer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "view/wTimer/wTimer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7810f25a", Component.options)
  } else {
    hotAPI.reload("data-v-7810f25a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(328);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("1d1bc8d5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7810f25a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wTimer.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7810f25a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wTimer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.timer_wrap[data-v-7810f25a]{\n\ttext-align:center;\n}\n", "", {"version":3,"sources":["/Users/linguibin/Desktop/weipagenew/view/wTimer/view/wTimer/wTimer.vue"],"names":[],"mappings":";AA2FA;CACA,kBAAA;CACA","file":"wTimer.vue","sourcesContent":["<template>\n\t<div :id=\"pluginData.identity\" class=\"plugin_wrap\" :style=\"parsePluginStyle(pluginData.backgroundColor,pluginData.backgroundImage)\">\n\t\t\n\t\t<div :style=\"parseTimerStyle(pluginData.isShow,pluginData.height)\">\n\t\t\t<div class=\"timer_wrap\">{{pluginData.showTime}}</div>\n\t\t</div>\n\n\t</div>\n</template>\n\n<script>\n\timport viewMethodConfig from '../../config/viewMethodConfig.js';\n\timport clockJs from '../../controler/clock.js';\t\n\n\tlet methods = {};\n\tfor(let key in viewMethodConfig){\n\t\tmethods[key] = viewMethodConfig[key];\n\t}\n\n\tmethods[\"parseTimerStyle\"] = function(isShow,height){\n\t\tif(isShow == 'YES'){\n\t\t\treturn 'height:' + height + 'px;lineHeight:' + height + 'px';\n\t\t}else{\n\t\t\treturn 'diaplay:none';\n\t\t}\n\t}\n\n\tmethods[\"parseTimePlugin\"] = function(pluginData,startIndex){\n\t\tlet _this = this;\n\t\tfor(let i = startIndex;i < pluginData.subPluginList.length;i++){\n\t\t\tlet timeObj = pluginData.subPluginList[i];\n\t\t\tif(timeObj.time){\n\t\t\t\tlet time = new Date(timeObj.time).getTime();\n\t\t\t\tlet nowTime = new Date().getTime();\n\t\t\t\tif(time - nowTime >= 1000){\n\t\t\t\t\tclockJs.clock({\n\t\t\t\t\t\tinitTime:timeObj.time,\n\t\t\t\t\t\tcallback:function(day,hour,minute,second){\n\t\t\t\t\t\t\tlet showTime = day + \"天\" + hour + \"时\" + minute + \"分\" + second + \"秒\";\n\t\t\t\t\t\t\t_this.changeWeipageData({id:pluginData.identity,key:\"showTime\",value:showTime});\n\t\t\t\t\t\t},\n\t\t\t\t\t\ttimeOutCallback:function(){\n\t\t\t\t\t\t\t_this.parseTimePlugin(pluginData,i+1);\n\t\t\t\t\t\t\t_this.timeEvent(timeObj);\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t\tbreak;\n\t\t\t\t}else{\n\t\t\t\t\t_this.timeEvent(timeObj);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n\n\tmethods[\"timeEvent\"] = function(timeObj){\n\t\tfor(let i = 0;i < timeObj.thirdPluginList.length;i++){\n\t\t\tthis.changeWeipageData({\n\t\t\t\tid:timeObj.thirdPluginList[i].modelId,\n\t\t\t\tkey:timeObj.thirdPluginList[i].modelKey,\n\t\t\t\tvalue:timeObj.thirdPluginList[i].modelValue\n\t\t\t});\n\t\t}\n\t}\n\n\tmethods[\"changeWeipageData\"] = function(option){\n\t\tthis.$emit(\"changeweipagedata\",option);\n\t}\n\t\n\texport default {\n\t\tname:\"wTimer\",\n\t\tprops:{\n\t\t\tpluginData:{\n\t\t\t\ttype: Object,\n      \t\t\tdefault: function(){\n      \t\t\t\treturn {};\n      \t\t\t}\n\t\t\t}\n\t\t},\n\t\tdata () {\n\t\t    return {\n\t\t      \n\t\t    }\n\t\t},\n\t\tcreated:function(){\t\t\n\t\t\tthis.parseTimePlugin(this.pluginData,0);\n\t\t},\n\t\tmethods:methods\t\t\n\t}\n</script>\n\n<style scoped>\n\t.timer_wrap{\n\t\ttext-align:center;\n\t}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "plugin_wrap",
      style: _vm.parsePluginStyle(
        _vm.pluginData.backgroundColor,
        _vm.pluginData.backgroundImage
      ),
      attrs: { id: _vm.pluginData.identity }
    },
    [
      _c(
        "div",
        {
          style: _vm.parseTimerStyle(
            _vm.pluginData.isShow,
            _vm.pluginData.height
          )
        },
        [
          _c("div", { staticClass: "timer_wrap" }, [
            _vm._v(_vm._s(_vm.pluginData.showTime))
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7810f25a", esExports)
  }
}

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(331);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(5)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js!./mobile.css", function() {
		var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js!./mobile.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".plugin_wrap{\n\tbackground-size:100% 100%;\n\toverflow:hidden;\n}", ""]);

// exports


/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	data: '{"title":"","descr":"","backgroundColor":"","picUrl":"","remark":"","weiPageId":"","pluginIndex":1005,"pluginList":[{"pluginId":"","identity":"M1001","backgroundColor":"","backgroundImage":"","pluginType":"NAV","subPluginType":"TEXT","subPluginList":[{"pluginCommonId":"","subPluginId":"","identity":"M1002","name":"1","picUrl":"","showPicUrl":"","linkType":"CUSTOM","buizKey":"","buizName":"","linkUrl":""}]},{"pluginId":"","identity":"M1003","backgroundColor":"","backgroundImage":"","pluginType":"BUTTON","subPluginList":[{"subPluginId":"","identity":"M1004","checkStatus":"YES","backgroundColor":"","picUrl":"","text":"but","color":"","width":100,"height":36,"borderRadius":"","thirdPluginList":[{"thirdPluginId":"","identity":"M1005","eventType":"LOCAL","name":"","modelId":"M1001,M1002","modelKey":"name","modelValue":"2","modelType":"NAV","modelSubType":"subPluginList","httpUrl":"","httpData":"","httpType":"get","fourthPluginList":[]}]}]}]}'
};

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(18);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//微页面配置文件
exports.default = {

	//引擎配置
	engineConfig: {
		plugin: "pluginList", //插件
		subPlugin: "subPluginList", //次级插件
		thirdPlugin: "thirdPluginList", //第三级插件
		fourthPlugin: "fourthPluginList" //第四级插件
	},

	//请求地址配置
	urlConfig: {
		uploadImage: "/pic/upload",
		productList: "./libs/json/productList.json",
		weiPageList: "./libs/json/weiPageList.json",
		categoryList: "./libs/json/classifyList.json",
		groupList: "./libs/json/groupList.json",
		functionList: "./libs/json/functionList.json"
	},

	//特殊配置
	specialConfig: {
		pluginIdKey: "identity",
		pluginIdTab: "M"
	}
};

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewMethodConfig = __webpack_require__(3);

var _viewMethodConfig2 = _interopRequireDefault(_viewMethodConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {}; //
//
//
//
//
//
//
//

for (var key in _viewMethodConfig2.default) {
	methods[key] = _viewMethodConfig2.default[key];
}

methods["praseAnimated"] = function (subPluginType, animateStatus) {
	if (animateStatus == 'START') {
		return subPluginType + ' active';
	} else {
		return subPluginType;
	}
};

exports.default = {
	name: "wAnimated",
	props: {
		pluginData: {
			type: Object,
			default: function _default() {
				return {};
			}
		}
	},
	data: function data() {
		return {};
	},

	created: function created() {},
	methods: methods
};

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewMethodConfig = __webpack_require__(3);

var _viewMethodConfig2 = _interopRequireDefault(_viewMethodConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {}; //
//
//
//
//
//
//
//

for (var key in _viewMethodConfig2.default) {
	methods[key] = _viewMethodConfig2.default[key];
}

methods["praseButtonStyle"] = function (checkStatus, backgroundColor, picUrl, color, width, height, borderRadius) {
	if (checkStatus == "NO") {
		return "display:none";
	}
	return 'backgroundColor:' + backgroundColor + ';backgroundImage:url("' + picUrl + '");color:' + color + ';width:' + width + 'px;height:' + height + 'px;lineHeight:' + height + 'px;borderRadius:' + borderRadius + 'px';
};

methods["changeWeipageData"] = function (option) {
	this.$emit("changeweipagedata", { id: option.modelId, key: option.modelKey, value: option.modelValue });
};

methods["buttionEvent"] = function (subPlugin) {
	var _this = this;

	var _loop = function _loop(i) {
		var thirdPlugin = subPlugin.thirdPluginList[i];
		if (thirdPlugin.eventType == 'LOCAL' && thirdPlugin.modelId && thirdPlugin.modelKey) {
			_this.changeWeipageData(thirdPlugin);
		} else if (thirdPlugin.eventType == 'HTTP' && thirdPlugin.httpUrl) {
			$.ajax({
				type: "post",
				url: thirdPlugin.httpUrl,
				data: thirdPlugin.httpData,
				success: function success(res) {
					for (var j = 0; j < thirdPlugin.fourthPluginList.length; j++) {
						var fourthPlugin = thirdPlugin.fourthPluginList[j];
						if (fourthPlugin.modelId && fourthPlugin.useRequestData == 'YES') {
							fourthPlugin["modelValue"] = res;
							fourthPlugin["modelKey"] = "requestData";
							_this.changeWeipageData({ modelId: fourthPlugin.modelId, modelKey: "unForeach", modelValue: false });
							_this.changeWeipageData(fourthPlugin);
						} else if (fourthPlugin.modelId && fourthPlugin.modelKey && fourthPlugin.modelValue) {
							_this.changeWeipageData(fourthPlugin);
						}
					}
				}
			});
		}
	};

	for (var i = 0; i < subPlugin.thirdPluginList.length; i++) {
		_loop(i);
	}
};

exports.default = {
	name: "wButton",
	props: {
		pluginData: {
			type: Object,
			default: function _default() {
				return {};
			}
		}
	},
	data: function data() {
		return {};
	},

	created: function created() {},
	methods: methods
};

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewMethodConfig = __webpack_require__(3);

var _viewMethodConfig2 = _interopRequireDefault(_viewMethodConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {}; //
//
//
//
//
//
//
//
//
//
//

for (var key in _viewMethodConfig2.default) {
	methods[key] = _viewMethodConfig2.default[key];
}

function conditionParseKeyValue(keyValueStr) {
	var symbol = "";
	var key = "";
	var keyList = "";
	var valueStr = "";
	var value = void 0;
	if (keyValueStr.indexOf(">=") >= 0) {
		symbol = ">=";
	} else if (keyValueStr.indexOf("<=") >= 0) {
		symbol = "<=";
	} else if (keyValueStr.indexOf("!=") >= 0) {
		symbol = "!=";
	} else if (keyValueStr.indexOf(">") >= 0) {
		symbol = ">";
	} else if (keyValueStr.indexOf("<") >= 0) {
		symbol = "<";
	} else {
		symbol = "==";
	}
	var symbolIndex = keyValueStr.indexOf(symbol);
	if (symbolIndex > 0) {
		key = keyValueStr.substring(0, symbolIndex);
		valueStr = keyValueStr.substring(symbolIndex + symbol.length);
	} else if (symbolIndex == 0) {
		valueStr = keyValueStr.substring(symbolIndex + symbol.length);
	} else {
		valueStr = keyValueStr;
	}
	if (isNaN(Number(valueStr))) {
		value = valueStr.replace(/'/g, "").replace(/"/g, "");
	} else {
		value = Number(valueStr);
	}
	keyList = key.split(".");
	return {
		symbol: symbol,
		keyList: keyList,
		value: value
	};
}

function conditionParseResult(condition) {
	var operationList = [];
	var symbolList = [];
	var tempList = condition.split("&&");
	for (var i = 0; i < tempList.length; i++) {
		if (i > 0) {
			symbolList.push("&&");
		}
		var temp2List = tempList[i].split("||");
		for (var j = 0; j < temp2List.length; j++) {
			operationList.push(conditionParseKeyValue(temp2List[j]));
			if (j > 0) {
				symbolList.push("||");
			}
		}
	}
	return {
		operationList: operationList,
		symbolList: symbolList
	};
}

function getRequestKeyData(keyList, requestData) {
	var result = JSON.parse(JSON.stringify(requestData));
	for (var i = 0; i < keyList.length; i++) {
		if (keyList[i]) {
			result = result[keyList[i]];
		}
	}
	return result;
}

function checkJudgeList(operationList, requestData) {
	var resultList = [];
	for (var i = 0; i < operationList.length; i++) {
		var keyValue = getRequestKeyData(operationList[i].keyList, requestData);
		switch (operationList[i].symbol) {
			case '>=':
				keyValue >= operationList[i].value ? resultList.push(true) : resultList.push(false);break;
			case '<=':
				keyValue <= operationList[i].value ? resultList.push(true) : resultList.push(false);break;
			case '!=':
				keyValue != operationList[i].value ? resultList.push(true) : resultList.push(false);break;
			case '>':
				keyValue > operationList[i].value ? resultList.push(true) : resultList.push(false);break;
			case '<':
				keyValue < operationList[i].value ? resultList.push(true) : resultList.push(false);break;
			default:
				keyValue == operationList[i].value ? resultList.push(true) : resultList.push(false);break;
		}
	}
	return resultList;
}

function conditionOperation(condition, requestData) {
	if (!condition || !requestData) {
		return false;
	}
	var result = true;
	var conditionRes = conditionParseResult(condition);
	var judgeList = checkJudgeList(conditionRes.operationList, requestData);
	for (var i = 0; i < judgeList.length; i++) {
		if (i == 0) {
			result = judgeList[i];
		} else if (conditionRes.symbolList[i]) {
			switch (conditionRes.symbolList[i]) {
				case "&&":
					result = result && judgeList[i];break;
				case "||":
					result = result || judgeList[i];break;
			}
		}
	}
	return result;
}

methods["parseStatus"] = function (pluginData, subPlugin) {
	if (pluginData.unForeach || pluginData.isOpen == 'NO') {
		return false;
	}

	if (subPlugin.checkStatus == 'YES') {
		if (conditionOperation(subPlugin.condition, pluginData.requestData)) {
			pluginData["unForeach"] = true;
			return true;
		} else {
			return false;
		}
	} else {
		pluginData["unForeach"] = true;
		return true;
	}
};

methods["parseFormData"] = function (thirdPlugin, requestData) {
	if (thirdPlugin.key) {
		var keyList = thirdPlugin.key.split(".");
		var temp = JSON.parse(JSON.stringify(requestData));
		for (var i = 0; i < keyList.length; i++) {
			temp = temp[keyList[i]];
		}
		return temp;
	} else {
		return thirdPlugin.value;
	}
};

exports.default = {
	name: "wDialog",
	props: {
		pluginData: {
			type: Object,
			default: function _default() {
				return {};
			}
		}
	},
	data: function data() {
		return {};
	},

	created: function created() {},
	methods: methods
};

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewMethodConfig = __webpack_require__(3);

var _viewMethodConfig2 = _interopRequireDefault(_viewMethodConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {}; //
//
//
//
//
//

for (var key in _viewMethodConfig2.default) {
	methods[key] = _viewMethodConfig2.default[key];
}

methods["parseDecorateStyle"] = function (backgroundColor, backgroundImage, width, height, top, left, borderRadius) {
	return 'position:absolute;overflow:hidden;backgroundColor:' + backgroundColor + ';backgroundImage:url("' + backgroundImage + '")' + ';width:' + width + 'px;height:' + height + 'px;top:' + top + 'px;left:' + left + 'px;borderRadius:' + borderRadius + 'px';
};

exports.default = {
	name: "wDecorate",
	props: {
		pluginData: {
			type: Object,
			default: function _default() {
				return {};
			}
		}
	},
	data: function data() {
		return {};
	},

	created: function created() {},
	methods: methods
};

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewMethodConfig = __webpack_require__(3);

var _viewMethodConfig2 = _interopRequireDefault(_viewMethodConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

for (var key in _viewMethodConfig2.default) {
	methods[key] = _viewMethodConfig2.default[key];
}

methods["parseNavName"] = function (name) {
	if (name) {
		return name;
	} else {
		return '导航';
	}
};

methods["parseNavPic"] = function (picUrl) {
	if (picUrl) {
		return picUrl;
	} else {
		return './libs/img/icon_nav_addpic.png';
	}
};

exports.default = {
	name: "wNav",
	props: {
		pluginData: {
			type: Object,
			default: function _default() {
				return {};
			}
		}
	},
	data: function data() {
		return {};
	},

	created: function created() {},
	methods: methods
};

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewMethodConfig = __webpack_require__(3);

var _viewMethodConfig2 = _interopRequireDefault(_viewMethodConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {}; //
//
//
//
//
//
//
//

for (var key in _viewMethodConfig2.default) {
	methods[key] = _viewMethodConfig2.default[key];
}

exports.default = {
	name: "wRichtext",
	props: {
		pluginData: {
			type: Object,
			default: function _default() {
				return {};
			}
		}
	},
	data: function data() {
		return {};
	},

	created: function created() {},
	methods: methods
};

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewMethodConfig = __webpack_require__(3);

var _viewMethodConfig2 = _interopRequireDefault(_viewMethodConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {}; //
//
//
//
//
//

for (var key in _viewMethodConfig2.default) {
	methods[key] = _viewMethodConfig2.default[key];
}

exports.default = {
	name: "wSpace",
	props: {
		pluginData: {
			type: Object,
			default: function _default() {
				return {};
			}
		}
	},
	data: function data() {
		return {};
	},

	created: function created() {},
	methods: methods
};

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewMethodConfig = __webpack_require__(3);

var _viewMethodConfig2 = _interopRequireDefault(_viewMethodConfig);

var _clock = __webpack_require__(73);

var _clock2 = _interopRequireDefault(_clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//

var methods = {};
for (var key in _viewMethodConfig2.default) {
	methods[key] = _viewMethodConfig2.default[key];
}

methods["parseTimerStyle"] = function (isShow, height) {
	if (isShow == 'YES') {
		return 'height:' + height + 'px;lineHeight:' + height + 'px';
	} else {
		return 'diaplay:none';
	}
};

methods["parseTimePlugin"] = function (pluginData, startIndex) {
	var _this = this;

	var _loop = function _loop(i) {
		var timeObj = pluginData.subPluginList[i];
		if (timeObj.time) {
			var time = new Date(timeObj.time).getTime();
			var nowTime = new Date().getTime();
			if (time - nowTime >= 1000) {
				_clock2.default.clock({
					initTime: timeObj.time,
					callback: function callback(day, hour, minute, second) {
						var showTime = day + "天" + hour + "时" + minute + "分" + second + "秒";
						_this.changeWeipageData({ id: pluginData.identity, key: "showTime", value: showTime });
					},
					timeOutCallback: function timeOutCallback() {
						_this.parseTimePlugin(pluginData, i + 1);
						_this.timeEvent(timeObj);
					}
				});
				return 'break';
			} else {
				_this.timeEvent(timeObj);
			}
		}
	};

	for (var i = startIndex; i < pluginData.subPluginList.length; i++) {
		var _ret = _loop(i);

		if (_ret === 'break') break;
	}
};

methods["timeEvent"] = function (timeObj) {
	for (var i = 0; i < timeObj.thirdPluginList.length; i++) {
		this.changeWeipageData({
			id: timeObj.thirdPluginList[i].modelId,
			key: timeObj.thirdPluginList[i].modelKey,
			value: timeObj.thirdPluginList[i].modelValue
		});
	}
};

methods["changeWeipageData"] = function (option) {
	this.$emit("changeweipagedata", option);
};

exports.default = {
	name: "wTimer",
	props: {
		pluginData: {
			type: Object,
			default: function _default() {
				return {};
			}
		}
	},
	data: function data() {
		return {};
	},

	created: function created() {
		this.parseTimePlugin(this.pluginData, 0);
	},
	methods: methods
};

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/*
 * 倒计时插件
 * initTime 初始化时间（计时结束时间）
 * differ ** 再初始时间基础上叠加时间
 * */

var _clock = function _clock(tempOption) {
	this.initTime = undefined;
	this.callback = undefined;
	this.resultCallback = undefined;
	this.timeOutCallback = undefined;

	this.option = tempOption;
};

_clock.prototype.init = function () {
	if (this.option) {
		if (this.option.initTime) {
			//ios时间转换必须把所有-转成/
			while (this.option.initTime.indexOf("-") > -1) {
				this.option.initTime = this.option.initTime.replace("-", "/");
			}
			this.initTime = new Date(this.option.initTime);
		}
		if (this.option.differDay) {
			var dayNum = this.option.differDay * 24 * 60 * 60 * 1000;
			this.initTime = new Date(this.initTime.setTime(this.initTime.getTime() + dayNum));
		}
		if (this.option.differHour) {
			var hourNum = this.option.differHour * 60 * 60 * 1000;
			this.initTime = new Date(this.initTime.setTime(this.initTime.getTime() + hourNum));
		}
		if (this.option.differMinute) {
			var minuteNum = this.option.differMinute * 60 * 1000;
			this.initTime = new Date(this.initTime.setTime(this.initTime.getTime() + minuteNum));
		}
		if (this.option.differSecond) {
			var secondNum = this.option.differSecond * 1000;
			this.initTime = new Date(this.initTime.setTime(this.initTime.getTime() + secondNum));
		}
		if (this.option.callback) {
			this.callback = this.option.callback;
		}
		if (this.option.resultCallback) {
			this.resultCallback = this.option.resultCallback;
		}
		if (this.option.timeOutCallback) {
			this.timeOutCallback = this.option.timeOutCallback;
		}
	}

	this.timeCount();
};

_clock.prototype.dealTime = function () {
	var nowTime = new Date();
	var differTime = this.initTime.getTime() - nowTime.getTime();
	if (differTime < 0 && this.timeOutCallback) {
		this.timeOutCallback();
		return true;
	}
	if (differTime < 1000 && this.resultCallback) {
		this.resultCallback();
		return false;
	}
	var days = Math.floor(differTime / (24 * 3600 * 1000));

	var hoursTemp = differTime % (24 * 3600 * 1000);
	var hours = Math.floor(hoursTemp / (3600 * 1000));

	var minutesTemp = hoursTemp % (3600 * 1000);
	var minutes = Math.floor(minutesTemp / (60 * 1000));

	var secondsTemp = minutesTemp % (60 * 1000);
	var seconds = Math.round(secondsTemp / 1000);

	//避免时间结束出现负数
	if (days < 0) {
		days = hours = minutes = seconds = 0;
	}

	this.callback(days, hours, minutes, seconds);

	return false;
};

_clock.prototype.timeCount = function () {
	var _this = this;
	var t = void 0;

	var timeCount = function timeCount() {
		var isTimeOut = _this.dealTime();
		if (isTimeOut) {
			stopCount();
			return;
		}
		t = setTimeout(function () {
			timeCount();
		}, 1000);
	};
	var stopCount = function stopCount() {
		clearTimeout(t);
	};

	timeCount();
};

exports.default = {
	clock: function clock(option) {
		var tempclock = new _clock(option);
		tempclock.init();
		return tempclock;
	}
};

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAohJREFUSA29lr+OGjEQxm1DoAmgEy2iug08AFJEkVwbKdF119HkLfII9xbXXJcuuuLKSClOke4BIGyFEKJbBNctLPd9qzXybrxe/iWWlrE94/lhe2yPFAVlu93K8Xj8IYqiLzDto+1BXiTDAinlGPUnpdSD53m/0N4mOquQ1l50wrEajUZfIb+heZlnl+n3AbztdDp3kFFGFzetwOFw2IH2HrCebVBRH2DPsBl0u91R1vYvIGCfAPoOw7dZ4wPbLwDfAPpojksBE9gPGLwxjU6oh4Bem9AdkMuImXEpTp1Z9v9xpj29vIpagCjv8Z0bRvf0yXiIWfFPEo1HBQg9FhXAemTQTqEh8TH0nQXnLFdfLpcFli1XTwUZZPFQX63X658u62azKRqNhphMJgK2KVPC2u22CMNQTKdTOk7pzUapVLpSm83ms9lpq1erVVGpVGLHBOiiYdTBjxPGMbytuE597SBPzmYzsVwuU1ATRh1t9ij9MpaAd2Nh0Q7r9Xo8Uw7gzA6AcQU8ro++iPeCMjhqtVpsu1qt9p2Z9n2RH3raxJBcRu6nLqybe6r7XZLAwGWgddk9y+6ptiuQgcIS8T1zliyM+2kLJKcTKMniDJ9chtwznjNbgJjQVqvlcqN1fKjVg27ZJA9yEAS50UjoYrEQ8/ncNjzVRxavNYmX4g80+77qKScHNHy8GO+4h7jg5O0BA48yJSNmcTRmyfzlN+Q/eTEAekae8x4yis8hK+AO8L3wD5y50OcgYYjdweeLjM4bKMMzApliMK/ZJVM7ICFQPMLgGtVzzJSpRSqfISMFZEcC7cGY+c1RhWPxMY9JZWx0lvtMJ4H0fxJhc1o8p77vf0we6pNT/VczlC1zmSc02wAAAABJRU5ErkJggg=="

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTNlNzU3M2MwNTZkMDIxZjc5MmMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9saWJzL2Nzcy9yZXNldC5jc3M/Njg4MiIsIndlYnBhY2s6Ly8vLi9saWJzL2Nzcy9yZXNldC5jc3MiLCJ3ZWJwYWNrOi8vLy4vbGlicy9pbWcvaWNvbl9yYWRpby5wbmciLCJ3ZWJwYWNrOi8vLy4vbGlicy9pbWcvaWNvbl9yYWRpb19jdXJyZW50LnBuZyIsIndlYnBhY2s6Ly8vLi9saWJzL2ltZy9pY29uX3JhZGlvX2Rpc2FibGUucG5nIiwid2VicGFjazovLy8uL2xpYnMvaW1nL2ljb25fcmFkaW9fZGlzYWJsZV9jdXJyZW50LnBuZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL2xpYnMvY3NzL3l1aS5jc3M/MmY1MiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9jc3MveXVpLmNzcyIsIndlYnBhY2s6Ly8vLi9saWJzL2ltZy90aXRsZWJhci5wbmciLCJ3ZWJwYWNrOi8vLy4vbGlicy9pbWcvYWRkX3BpY3R1cmUucG5nIiwid2VicGFjazovLy8uL21vYmlsZS5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L2luZGV4LmpzIiwid2VicGFjazovLy8uL3ZpZXcvd0FuaW1hdGVkL3dBbmltYXRlZC5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L3dBbmltYXRlZC93QW5pbWF0ZWQudnVlIiwid2VicGFjazovLy8uL3ZpZXcvd0FuaW1hdGVkL3dBbmltYXRlZC52dWU/YTVkOSIsIndlYnBhY2s6Ly8vLi92aWV3L3dBbmltYXRlZC93QW5pbWF0ZWQudnVlPzMzMzQiLCJ3ZWJwYWNrOi8vLy4vdmlldy93QW5pbWF0ZWQvd0FuaW1hdGVkLnZ1ZT80YzhjIiwid2VicGFjazovLy8uL3ZpZXcvd0J1dHRvbi93QnV0dG9uLmpzIiwid2VicGFjazovLy8uL3ZpZXcvd0J1dHRvbi93QnV0dG9uLnZ1ZSIsIndlYnBhY2s6Ly8vLi92aWV3L3dCdXR0b24vd0J1dHRvbi52dWU/MzA5OSIsIndlYnBhY2s6Ly8vLi92aWV3L3dCdXR0b24vd0J1dHRvbi52dWU/ZTNmOSIsIndlYnBhY2s6Ly8vLi92aWV3L3dCdXR0b24vd0J1dHRvbi52dWU/YzA2NiIsIndlYnBhY2s6Ly8vLi9jb25maWcvdmlld01ldGhvZENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L3dEaWFsb2cvd0RpYWxvZy5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L3dEaWFsb2cvd0RpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vLy4vdmlldy93RGlhbG9nL3dEaWFsb2cudnVlPzJjNDAiLCJ3ZWJwYWNrOi8vLy4vdmlldy93RGlhbG9nL3dEaWFsb2cudnVlPzhmZmQiLCJ3ZWJwYWNrOi8vLy4vdmlldy93RGlhbG9nL3dEaWFsb2cudnVlPzEwMDAiLCJ3ZWJwYWNrOi8vLy4vdmlldy93RGVjb3JhdGUvd0RlY29yYXRlLmpzIiwid2VicGFjazovLy8uL3ZpZXcvd0RlY29yYXRlL3dEZWNvcmF0ZS52dWUiLCJ3ZWJwYWNrOi8vLy4vdmlldy93RGVjb3JhdGUvd0RlY29yYXRlLnZ1ZT85ZjdlIiwid2VicGFjazovLy8uL3ZpZXcvd0RlY29yYXRlL3dEZWNvcmF0ZS52dWU/MzAwNCIsIndlYnBhY2s6Ly8vLi92aWV3L3dEZWNvcmF0ZS93RGVjb3JhdGUudnVlP2E1MTYiLCJ3ZWJwYWNrOi8vLy4vdmlldy93TmF2L3dOYXYuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy93TmF2L3dOYXYudnVlIiwid2VicGFjazovLy8uL3ZpZXcvd05hdi93TmF2LnZ1ZT85NjE4Iiwid2VicGFjazovLy8uL3ZpZXcvd05hdi93TmF2LnZ1ZT80MGQzIiwid2VicGFjazovLy8uL3ZpZXcvd05hdi93TmF2LnZ1ZT9lM2RkIiwid2VicGFjazovLy8uL3ZpZXcvd1JpY2h0ZXh0L3dSaWNodGV4dC5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L3dSaWNodGV4dC93UmljaHRleHQudnVlIiwid2VicGFjazovLy8uL3ZpZXcvd1JpY2h0ZXh0L3dSaWNodGV4dC52dWU/ZDRkZCIsIndlYnBhY2s6Ly8vLi92aWV3L3dSaWNodGV4dC93UmljaHRleHQudnVlPzQzNjgiLCJ3ZWJwYWNrOi8vLy4vdmlldy93UmljaHRleHQvd1JpY2h0ZXh0LnZ1ZT83NjFjIiwid2VicGFjazovLy8uL3ZpZXcvd1NwYWNlL3dTcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L3dTcGFjZS93U3BhY2UudnVlIiwid2VicGFjazovLy8uL3ZpZXcvd1NwYWNlL3dTcGFjZS52dWU/MThkYyIsIndlYnBhY2s6Ly8vLi92aWV3L3dTcGFjZS93U3BhY2UudnVlPzBkMTUiLCJ3ZWJwYWNrOi8vLy4vdmlldy93U3BhY2Uvd1NwYWNlLnZ1ZT8wMzZlIiwid2VicGFjazovLy8uL3ZpZXcvd1RpbWVyL3dUaW1lci5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L3dUaW1lci93VGltZXIudnVlIiwid2VicGFjazovLy8uL3ZpZXcvd1RpbWVyL3dUaW1lci52dWU/NzA1NiIsIndlYnBhY2s6Ly8vLi92aWV3L3dUaW1lci93VGltZXIudnVlPzc1OWIiLCJ3ZWJwYWNrOi8vLy4vdmlldy93VGltZXIvd1RpbWVyLnZ1ZT8xOWE2Iiwid2VicGFjazovLy8uL21vYmlsZS5jc3M/ZjQ4YiIsIndlYnBhY2s6Ly8vLi9tb2JpbGUuY3NzIiwid2VicGFjazovLy8uL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy93ZWlQYWdlQ29uZmlnLmpzIiwid2VicGFjazovLy92aWV3L3dBbmltYXRlZC93QW5pbWF0ZWQudnVlIiwid2VicGFjazovLy92aWV3L3dCdXR0b24vd0J1dHRvbi52dWUiLCJ3ZWJwYWNrOi8vL3ZpZXcvd0RpYWxvZy93RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vdmlldy93RGVjb3JhdGUvd0RlY29yYXRlLnZ1ZSIsIndlYnBhY2s6Ly8vdmlldy93TmF2L3dOYXYudnVlIiwid2VicGFjazovLy92aWV3L3dSaWNodGV4dC93UmljaHRleHQudnVlIiwid2VicGFjazovLy92aWV3L3dTcGFjZS93U3BhY2UudnVlIiwid2VicGFjazovLy92aWV3L3dUaW1lci93VGltZXIudnVlIiwid2VicGFjazovLy8uL2NvbnRyb2xlci9jbG9jay5qcyIsIndlYnBhY2s6Ly8vLi9saWJzL2ltZy9pY29uX2RlbGV0ZS5wbmciXSwibmFtZXMiOlsid2VpcGFnZURhdGEiLCJKU09OIiwicGFyc2UiLCJyZXN1ZXN0RGF0YSIsImRhdGEiLCJ3ZWlwYWdlIiwiVnVlIiwiZWwiLCJtZXRob2RzIiwiY2hhbmdlV2VpcGFnZURhdGEiLCJvcHRpb24iLCJpZCIsInNwbGl0IiwibGVuZ3RoIiwiaSIsInBsdWdpbkxpc3QiLCJwbHVnaW4iLCJpZGVudGl0eSIsImtleSIsInZhbHVlIiwiaiIsInN1YlBsdWdpbkxpc3QiLCJzdWJQbHVnaW4iLCJyZXN1bHQiLCJXQW5pbWF0ZWQiLCJXQnV0dG9uIiwiV0RpYWxvZyIsIldEZWNvcmF0ZSIsIldOYXYiLCJXUmljaHRleHQiLCJXU3BhY2UiLCJXVGltZXIiLCJ1c2UiLCJpbnN0YWxsIiwiY29tcG9uZW50IiwibmFtZSIsInBhcnNlUGx1Z2luU2VsZWN0IiwicGx1Z2luU2VsZWN0IiwicGFyc2VQbHVnaW5TdHlsZSIsImJhY2tncm91bmRDb2xvciIsImJhY2tncm91bmRJbWFnZSIsInBhcnNlUHJvZHVjdEltYWdlIiwicGljVXJsIiwicGFyc2VCYW5uZXJJbWFnZSIsInBhcnNlVXBsb2FkSW1hZ2UiLCJjaGVja1RoZVNhbWUiLCJhIiwiYiIsImVuZ2luZUNvbmZpZyIsInRoaXJkUGx1Z2luIiwiZm91cnRoUGx1Z2luIiwidXJsQ29uZmlnIiwidXBsb2FkSW1hZ2UiLCJwcm9kdWN0TGlzdCIsIndlaVBhZ2VMaXN0IiwiY2F0ZWdvcnlMaXN0IiwiZ3JvdXBMaXN0IiwiZnVuY3Rpb25MaXN0Iiwic3BlY2lhbENvbmZpZyIsInBsdWdpbklkS2V5IiwicGx1Z2luSWRUYWIiLCJjbG9jayIsInRlbXBPcHRpb24iLCJpbml0VGltZSIsInVuZGVmaW5lZCIsImNhbGxiYWNrIiwicmVzdWx0Q2FsbGJhY2siLCJ0aW1lT3V0Q2FsbGJhY2siLCJwcm90b3R5cGUiLCJpbml0IiwiaW5kZXhPZiIsInJlcGxhY2UiLCJEYXRlIiwiZGlmZmVyRGF5IiwiZGF5TnVtIiwic2V0VGltZSIsImdldFRpbWUiLCJkaWZmZXJIb3VyIiwiaG91ck51bSIsImRpZmZlck1pbnV0ZSIsIm1pbnV0ZU51bSIsImRpZmZlclNlY29uZCIsInNlY29uZE51bSIsInRpbWVDb3VudCIsImRlYWxUaW1lIiwibm93VGltZSIsImRpZmZlclRpbWUiLCJkYXlzIiwiTWF0aCIsImZsb29yIiwiaG91cnNUZW1wIiwiaG91cnMiLCJtaW51dGVzVGVtcCIsIm1pbnV0ZXMiLCJzZWNvbmRzVGVtcCIsInNlY29uZHMiLCJyb3VuZCIsIl90aGlzIiwidCIsImlzVGltZU91dCIsInN0b3BDb3VudCIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJ0ZW1wY2xvY2siXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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O0FBQ0EsU0FBT2tDLFNBQVA7QUFDQTtBQUxhLEM7Ozs7Ozs7QUMzR2hCLGlDQUFpQyx3OEIiLCJmaWxlIjoibW9iaWxlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI4OCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTNlNzU3M2MwNTZkMDIxZjc5MmMiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG52YXIgb3B0aW9ucyA9IG51bGxcbnZhciBzc3JJZEtleSA9ICdkYXRhLXZ1ZS1zc3ItaWQnXG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uLCBfb3B0aW9ucykge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgb3B0aW9ucyA9IF9vcHRpb25zIHx8IHt9XG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbJyArIHNzcklkS2V5ICsgJ349XCInICsgb2JqLmlkICsgJ1wiXScpXG5cbiAgaWYgKHN0eWxlRWxlbWVudCkge1xuICAgIGlmIChpc1Byb2R1Y3Rpb24pIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGFuZCBpbiBwcm9kdWN0aW9uIG1vZGUuXG4gICAgICAvLyBzaW1wbHkgZG8gbm90aGluZy5cbiAgICAgIHJldHVybiBub29wXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGJ1dCBpbiBkZXYgbW9kZS5cbiAgICAgIC8vIGZvciBzb21lIHJlYXNvbiBDaHJvbWUgY2FuJ3QgaGFuZGxlIHNvdXJjZSBtYXAgaW4gc2VydmVyLXJlbmRlcmVkXG4gICAgICAvLyBzdHlsZSB0YWdzIC0gc291cmNlIG1hcHMgaW4gPHN0eWxlPiBvbmx5IHdvcmtzIGlmIHRoZSBzdHlsZSB0YWcgaXNcbiAgICAgIC8vIGNyZWF0ZWQgYW5kIGluc2VydGVkIGR5bmFtaWNhbGx5LiBTbyB3ZSByZW1vdmUgdGhlIHNlcnZlciByZW5kZXJlZFxuICAgICAgLy8gc3R5bGVzIGFuZCBpbmplY3QgbmV3IG9uZXMuXG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzT2xkSUUpIHtcbiAgICAvLyB1c2Ugc2luZ2xldG9uIG1vZGUgZm9yIElFOS5cbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrK1xuICAgIHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSlcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSlcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKVxuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBtdWx0aS1zdHlsZS10YWcgbW9kZSBpbiBhbGwgb3RoZXIgY2FzZXNcbiAgICBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShvYmopXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcbiAgICAgICAgICBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuICAgICAgICAgIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKVxuICAgIH1cbiAgfVxufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFN0b3JlID0gW11cblxuICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudFxuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpXG4gIH1cbn0pKClcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLmNzc1xuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKVxuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKVxuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXNcbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSlcbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZUVsZW1lbnQsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzc1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWFcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXBcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKVxuICB9XG4gIGlmIChvcHRpb25zLnNzcklkKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShzc3JJZEtleSwgb2JqLmlkKVxuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIHNvdXJjZU1hcC5zb3VyY2VzWzBdICsgJyAqLydcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArICcgKi8nXG4gIH1cblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGxpc3QgZm9ybWF0IHByb2R1Y2VkIGJ5IGNzcy1sb2FkZXIgaW50byBzb21ldGhpbmdcbiAqIGVhc2llciB0byBtYW5pcHVsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGlkOiBwYXJlbnRJZCArICc6JyArIGksXG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9yZXNldC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9yZXNldC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vcmVzZXQuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWJzL2Nzcy9yZXNldC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBvYmplY3QsIGlmcmFtZSwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLCBhYmJyLCBhZGRyZXNzLCBjaXRlLCBjb2RlLCBkZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHNhbXAsIHNtYWxsLCBzdHJvbmcsIHN1Yiwgc3VwLCB2YXIsIGIsIGksIGRsLCBkdCwgZGQsIG9sLCB1bCwgbGksIGZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLCB0YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCwgYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24sIHN1bW1hcnksIHRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgYm9yZGVyOiAwO1xcclxcbiAgICBvdXRsaW5lOiAwO1xcclxcbiAgICBmb250LXNpemU6IDEwMCU7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBNaWNyb3NvZnQgWWFIZWksIEhlbHZldGljYSwgU1RIZWl0aVNDLFZlcmRhbmEsIEFyaWFsLCBUYWhvbWEsc2Fucy1zZXJpZjtcXHJcXG4gICAgLyogbGluZS1oZWlnaHQ6IDE7ICovXFxyXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuOmZvY3VzIHtcXHJcXG4gICAgb3V0bGluZTogMCBub25lO1xcclxcbn1cXHJcXG46Oi1tb3otc2VsZWN0aW9ue1xcclxcbiAgICBjb2xvcjogI0ZGRkZGRjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzEzOGVkNDtcXHJcXG59XFxyXFxuOjpzZWxlY3Rpb257XFxyXFxuICAgIGNvbG9yOiAjRkZGRkZGO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTM4ZWQ0O1xcclxcbn1cXHJcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiwgc3VtbWFyeSB7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5uYXYgdWwge1xcclxcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlLCBxIHtcXHJcXG4gICAgcXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlciwgcTpiZWZvcmUsIHE6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gICAgY29udGVudDogbm9uZTtcXHJcXG59XFxyXFxuYSB7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgYm9yZGVyOiAwO1xcclxcbiAgICBmb250LXNpemU6IDEwMCU7XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcclxcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxufVxcclxcbmlucyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjk7XFxyXFxuICAgIGNvbG9yOiAjMDAwO1xcclxcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxufVxcclxcbm1hcmsge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5O1xcclxcbiAgICBjb2xvcjogIzAwMDtcXHJcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuZGVsIHtcXHJcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxyXFxufVxcclxcbmFiYnJbdGl0bGVdLCBkZm5bdGl0bGVdIHtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZCAjMDAwO1xcclxcbiAgICBjdXJzb3I6IGhlbHA7XFxyXFxufVxcclxcbnRhYmxlIHtcXHJcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVxcclxcbmhyIHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIGhlaWdodDogMXB4O1xcclxcbiAgICBib3JkZXI6IDA7XFxyXFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjY2NjO1xcclxcbiAgICBtYXJnaW46IDFlbSAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5pbnB1dCwgc2VsZWN0IHtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICAtd2Via2l0LWJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcclxcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcclxcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG59XFxyXFxudGV4dGFyZWF7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbn1cXHJcXG4uZmxvYXRfbGVmdHtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxufVxcclxcbi5mbG9hdF9yaWdodHtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbn1cXHJcXG4uY2xlYXJmaXg6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgaGVpZ2h0OiAwO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbiAgICBjbGVhcjogYm90aDtcXHJcXG59XFxyXFxuaW5wdXRbdHlwZT0ncmFkaW8nXSxpbnB1dFt0eXBlPSdjaGVja2JveCddLHNlbGVjdHtcXHJcXG5cXHRjdXJzb3I6cG9pbnRlcjtcXHJcXG59XFxyXFxuaW5wdXRbZGlzYWJsZWRdLCBzZWxlY3RbZGlzYWJsZWRdLCB0ZXh0YXJlYVtkaXNhYmxlZF0ge1xcclxcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcclxcbn1cXHJcXG5pbnB1dFt0eXBlPSdyYWRpbydde1xcclxcblxcdHdpZHRoOiAxNnB4O1xcclxcbiAgICBoZWlnaHQ6IDE2cHg7XFxyXFxuXFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltZy9pY29uX3JhZGlvLnBuZ1wiKSkgKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xcclxcbn1cXHJcXG5pbnB1dFt0eXBlPSdyYWRpbyddOmNoZWNrZWQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltZy9pY29uX3JhZGlvX2N1cnJlbnQucG5nXCIpKSArIFwiKTtcXHJcXG59XFxyXFxuaW5wdXRbdHlwZT0ncmFkaW8nXVtkaXNhYmxlZF17XFxyXFxuXFx0YmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWcvaWNvbl9yYWRpb19kaXNhYmxlLnBuZ1wiKSkgKyBcIik7XFxyXFxufVxcclxcbmlucHV0W3R5cGU9J3JhZGlvJ11bZGlzYWJsZWRdW2NoZWNrZWRdIHtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWcvaWNvbl9yYWRpb19kaXNhYmxlX2N1cnJlbnQucG5nXCIpKSArIFwiKTtcXHJcXG59XFxyXFxuLmhpZGRlbntcXHJcXG5cXHRkaXNwbGF5Om5vbmU7XFxyXFxufVxcclxcbi5jdXJzb3J7XFxyXFxuXFx0Y3Vyc29yOnBvaW50ZXI7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliIS4vbGlicy9jc3MvcmVzZXQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJnQUFBQVlDQVlBQUFEZ2R6MzRBQUFBQVhOU1IwSUFyczRjNlFBQUFqSkpSRUZVU0EyMWxzOUxWRkVVeDcvbnZtY1pNYlpJVWF5Rm9JTGdKbWpUeHY0QUJ4TDNnclF2c2I5Z25MOGcwZllpdEkrQzZRK29UUnVoalNEb2dJc1NCM1dSRXYzd3pUdWQ3MzNleDRTbU9mUG1iT2J4N3IyZjc3MzNuZk05STdnazdxMXMzLy9aL0RVamtESVVveEFNKyttS1BYdXVLN1RXRzkxOCszVmgvTXUvTUhMUlFQL3ExakNTcEtxUXAxQ05McHFUdnhOcENuUU5jVnc1ZkQ2eGw3OC9lemduMEwrOCtRUXBYdHZ1U25Fa1doN3RrK214RWg0TTNzTFE3ZGd2Mi8rZTRIUGpCOTd2bktCV1A5YWtxV0tuUElIRDNPSGk1THRXa2I4RUJwWTNGOUlVTHdGMTViRStWQjhQWWVST1QrdjhjOCs3MzA1UitiQ1AyczZ4alVucUhGNGNMRTZ1aEltNUFIZXVLZDV3SzVXcFFYbjI4RzZZODErL3J6YU9VUDNZVUxXamk4TnNPSWtYOEhkKzJ0eml0U3pacnE4TER6dWd5SktkeGw5WFR6VEJiK0w4b1ArZ1d1SzF0QXNuaDJ2SjRFYVpKSHduV1NyKzNvMGQzS2Y1Y2JucXpybm9zdUEzZWJTK3JVbUt0RGU2TWVLWTUweEZaa3VuY0FxVFFSYVpaRHRmUkRiQVZDd3FBb3RzNXl2VXlNenpvaUpuV2ZXN1VQNmhpSW9ReVZsbUxWa1dGVUZ0WVdqTE02L0krd2ZMdjZob0JKYXhlVVYxZ3VrdFJVWE9NcmF6b3FnUlRPTXFLZ0tMYkVjL2gxa3VYWkZGMG1tUVFSYVpaRHMyQy9vNUxaZXUyR21Ra2RtM3JwR2RaWkUxQ3hvVUxaZUcxVzV3TFJuZTdJeEpqaGZ3bmNpYUJmMmNsdHVPQ05kd0xSbSs4WngxdDd3ZlVLMnJEWWNDaks2MnpFekNSTHJaOUlNSWY0djQyL0lISnN3NmozWTNSVW9BQUFBQVNVVk9SSzVDWUlJPVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWJzL2ltZy9pY29uX3JhZGlvLnBuZ1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCd0FBQUFjQ0FZQUFBQnlEZCtVQUFBQUFYTlNSMElBcnM0YzZRQUFBcE5KUkVGVVNBMjlWajFvVkVFUW5ubnZ4VFJhNVlLUWtFSVFqRjZsSXNRaW5FMUlrMEtJbGEybEdJeDFTbXNqRVV0Ykd5UFlTcW9qUlE1RVU1MUdFQ3drRWNsZFpSWHZMdU0zKzdMTHZuZnYzanZ2eFV5enV6UGZ6cmMvczdQRE5JUk1ialN2UzVmdUVzazhFVThUMDVTWkpuUUEzVDUwMnh6UnU4T1Y2bTZSTzg0RFRLNDM3d25SVXhHNWtvZXpObWIrQ29kcmg2dlZUYXRMdDVtRUYxL3NYZXAyZXEreCtybjBoT0hHM0lqR3d2dS9IczErVCtQN0NDc2JYMnJTTzM1TEloTnA4RCtObWRzY0JzdXRsYXQxZjE2Q01DYnJiWkhRbUE4YXVjL1U0VEJjOEVrZG9UbkdidTlENloybFY0ZWRSbEY0eXg1dllPM216c29lbzNYbXQvQVp4ME9zTklRYWphTUhpTzk5VUYvbVlnNmlTQ0VhK29PZ3ZwNkpmd05kSithUFJpOXlFLzA3ZURibmZWeFcvNFJqay9WUkgzZmxVeFlvb1dQZUdqODMvdURnNGVVZnZuN3E1YmVab3o5SHIzRDNDNzQrcXg5RWZDT0tNMGlXMmRPQnJQWDQyaUllTmhhYUZGMEFkcmhZZWY3NWZSR3BjdUVPTlYwTkZqMUczVmtXbVoybE5vTXhSMjYxV2EzTWd4QzVNVmVrbmo3R0xIaU13ZjNtQ2s4SExoRVBBdG9BR1dUMzlVVllKSDMzRHYxNS82MHZKQUhlQkw2WUhOSFFIMWFLc1Q4MWFQQ2Y1UW5YTlBUekVHcUxNVnpMeDhtK0JzMTJIZ2luY0VIZkdVTGY1ZDAwWG0wR0EyemFsaHpqb3o3cmgyOVdYVmx2N21HVmhiOTZtZFNtMVVCcnRUcHJjaWxZMTVCQzNpUzMzei9TNDRWMkNSbGx5Vm1sTC9rNGs5OVJEaDI3ZTVsNDF0eEJBSTFZVXZpdXMvcmNhRCtwM2xhTGU0ZGFneUR6dDdQZ3BYVDZBYXZ2RTNHRStpTnJEWUk5ZDZ5eGRHdEtqR0RaL3ZicXp4SHFRR3NQclVGT1phZW1pRXJXTTMyRWxsUnJFRnh2UThlakNjcEUrUENMSit2SEJZMVYrTzJaRmNJK3FmWlBzOVQvQzNMd0ZzbGlERGxTQUFBQUFFbEZUa1N1UW1DQ1wiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWJzL2ltZy9pY29uX3JhZGlvX2N1cnJlbnQucG5nXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJ3QUFBQWNDQVlBQUFCeURkK1VBQUFBQVhOU1IwSUFyczRjNlFBQUFsRkpSRUZVU0EyOWxyK0xHa0VVeDJkWC9GVkhHdytFSUpqR0pvR0FoWWNnMmdjdVZmNldLKzl2dVNxQjZ4VkJ0QkFDU1dOemdnU0VNNFZlN1M5MDh6N0R2R09UM0szSjNlcUQ5YTJ6TTkvUHZwblo5OFl6LzJEdGR2dXQ1M2tmcE91NVhHZHlGZHl3bWZnN3VmcEJFTnkwV3EzdnJ2MUo1ejM1UkI1ME9wMlA0cTVFN0UxVVAzMG1MM1VyOTVmTlp2T3p0djNwSHdYMmVyM1htODNtV2pwWEdaREpaRXcrbnplNVhNNWtzMW1UVHFldHpucTlOc3ZsMGl3V0N6T2Z6ODFxdGJMdDhqTk1wVktmNnZYNkQyMVEveGV3MiszVzkvdjlGNG5xbFFnSHBWTEpLeFIwQm5YWTQzNDJtNW5KWkJMSWkwaXczcjN2K3hlTlJxTVg3djBiME1IYUFrc1NVYVZTTVlsRUl0ei80UDF1dHpPajBjaEdMTkN0UUZ0aDZBT1FhZHh1dDErSnJGZ3Ntbks1ZkZBOHFzTjRQRGJUNmRRUWFUS1pmSy9UNitzZzFnd1lrYjBVaGlZYWFLSHA5b05GV2FEYmpWWFdqR21NeTlCQ1UvU3FqbUUwd2lzZ2JKRC9YYk9vbDBNTFRkZkhNancrYW1uNHh0YXYxV3BSNDUvOWJEQVk2Q2Z6enBkRkpZUFkrWDYyNG9HQnJDVUdpeWtsWGRtUEduOE1JMkU0T3dkSWJyUVp4RFhHN3NoT3pzNEEyalNpNlVxZnhPbEQyZ1hkcFhIcVIya0ZBQ2t4aGtSOExBdHAvd1JJUGJOWi8xaEFLb3F6TzRCOS9sQmlqbVVoN2I0dnVlNEdFUFhzV0tiYXNIeU9CZkpCM2xJOHFXZHhHNXBvdzRDbHUvUVNFTVdUZWhhWG9ZV20wN01NQzNSbmtDR1ZtdUlabDZHRnB1Z045WnlqRVJyT0lCTDJQZk5OOFh5cG9ZRVdtbWlybnBZTysvK2tSd3g5ZzVNZW9oUjYwbU9pUXZFbk93aUhvZHpIZWRUL0JjQkJSc2FlS1hqREFBQUFBRWxGVGtTdVFtQ0NcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGlicy9pbWcvaWNvbl9yYWRpb19kaXNhYmxlLnBuZ1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCd0FBQUFjQ0FZQUFBQnlEZCtVQUFBQUFYTlNSMElBcnM0YzZRQUFBbXBKUkVGVVNBMjlWajB2QkVFWXRudXJvOUlSaFlvV2tWRElhVVNqa0p4S2VlN2pUeWo5aWZ0d3BRYUpWbFFYaFVzRUxaVkNqdW9xcGZ2d1BHdDI4ODRZcytjc2srek8rL0hNKzh5ODgrbU5EVkhxOWZwaXY5L2ZHUXdHNjU3bnphQ2VaalBJTDVEYnFLOTgzejh2RkFyM1NlRThGNkJXcSsyQzZCQ1llUmRPK0I1QmZGQXNGaytGVFJPdGhDQ2FROCtQOGExcTZDRVZqTGlGYncvRVQyYVRMNFRWYWpVTG9qTUFwMHp3RC9VT1NIT2xVcWtwMjJtRWl1d1NnSEVKK29YOER0Sk5TUm9UTW8yWXJ4c0UvKzNJelA1MU1LOHJVWHI5eU1zNSt3TXlocDlTc1VPcWtKQ3JFY2FSRmtnWUplSEgyT1FnTE9CUExYMkt6b0w1ZUFPZ2lRQzNCRUpmaHJ3QmNZSzZxeWlPVTQrYnV0ZnIzYm5BOUNINFpSQUUrL2w4L2xsaUc0M0diTGZiUFFMeHByVGI1RXdtc3hTQWVjZm1sRGFTWWRLM1VBK2tuVEk3QUxJdHBPd2lpWlJjUGtEclpoQ3BnK1NOSTdPUlJUajZGSVlwLzdhUXl3ZDQ1bHZFcDZOcHB0R0dWeGh0azVzNGNuR0U0VUZzT2lNZC9uQ0JSTHFyVHNLU0s5Nkhya0JwK1poNnB2VEZGUkQrWlpkZitvYkF2aktsYmRuSUltZTU5QzEyemFRd1djMW9LT1RpQ0s4TXU2WUNOS24yV1h6dWFnQW93SGdLTTJuNnBFNnVmOS80WWE4cmxjb0RlcEo0cTZPSEl4OXRpUDlZTHBjWHdyT1V6d0tjQWlkeStEYVo2WVY5VzMxTXBRMW10WkdEam5oZWNQbGVJOENmM0JqSVRBdVg4Qm9KNDMwSTR4NzBEbzBwRno0MUdEc3NNU0Z2WkRoeXNMNHJYeG9WbnhpNTZMWm53SmlRQ3Q4ZUFQQ2FTV09rSEpuMm5pR0hSa2dEU2ZrR0FiaEZmWlRDdG93aEgwOVJuSGpSUkFaWjgxbWdidXJFTGFQYWpmWVFscVNVMDN6cWZ3Q3lzRGJUeko3SGRBQUFBQUJKUlU1RXJrSmdnZz09XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYnMvaW1nL2ljb25fcmFkaW9fZGlzYWJsZV9jdXJyZW50LnBuZ1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3l1aS5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi95dWkuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3l1aS5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYnMvY3NzL3l1aS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyogZ2xvYmFscyBfX1ZVRV9TU1JfQ09OVEVYVF9fICovXG5cbi8vIElNUE9SVEFOVDogRG8gTk9UIHVzZSBFUzIwMTUgZmVhdHVyZXMgaW4gdGhpcyBmaWxlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoXG4gIHJhd1NjcmlwdEV4cG9ydHMsXG4gIGNvbXBpbGVkVGVtcGxhdGUsXG4gIGZ1bmN0aW9uYWxUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gICAgb3B0aW9ucy5fY29tcGlsZWQgPSB0cnVlXG4gIH1cblxuICAvLyBmdW5jdGlvbmFsIHRlbXBsYXRlXG4gIGlmIChmdW5jdGlvbmFsVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLmZ1bmN0aW9uYWwgPSB0cnVlXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICB2YXIgZnVuY3Rpb25hbCA9IG9wdGlvbnMuZnVuY3Rpb25hbFxuICAgIHZhciBleGlzdGluZyA9IGZ1bmN0aW9uYWxcbiAgICAgID8gb3B0aW9ucy5yZW5kZXJcbiAgICAgIDogb3B0aW9ucy5iZWZvcmVDcmVhdGVcblxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciB0ZW1wbGF0ZS1vbmx5IGhvdC1yZWxvYWQgYmVjYXVzZSBpbiB0aGF0IGNhc2UgdGhlIHJlbmRlciBmbiBkb2Vzbid0XG4gICAgICAvLyBnbyB0aHJvdWdoIHRoZSBub3JtYWxpemVyXG4gICAgICBvcHRpb25zLl9pbmplY3RTdHlsZXMgPSBob29rXG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBleGlzdGluZyhoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBlc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcIik7XG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkueXVpe1xcblxcdGNvbG9yOiMzMzM7XFxufVxcbi8qIOaWh+Wtl+minOiJsiAqL1xcbmJvZHkueXVpIC5jb2xvcl93YXJue1xcblxcdGNvbG9yOiNkNTE5MzBcXG59XFxuYm9keS55dWkgLmNvbG9yX2xpbmt7XFxuXFx0Y29sb3I6IzAwNDRkZDtcXG59XFxuYm9keS55dWkgLmNvbG9yX2hpZ2hsaWdodHtcXG5cXHRjb2xvcjojMTM4ZWQ0O1xcbn1cXG5ib2R5Lnl1aSAuY29sb3JfZW1waGFzaXN7XFxuXFx0Y29sb3I6IzAwMDtcXHRcXG59XFxuYm9keS55dWkgLmNvbG9yX3JlbWFya3tcXG5cXHRjb2xvcjojOTk5O1xcbn1cXG5ib2R5Lnl1aSAuY29sb3Jfc3VycGx1c3tcXG5cXHRjb2xvcjojMjRhOTAwO1xcbn1cXG5ib2R5Lnl1aSAuY29sb3JfZGVmaWNpdHtcXG5cXHRjb2xvcjojZmY0NDY2XFxufVxcbi8qIOaMiemSruagt+W8jyAqL1xcbmJvZHkueXVpIC55dWlfYnRue1xcblxcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcblxcdGJvcmRlcjogMXB4IHNvbGlkICNlNWU1ZTU7XFxuXFx0Zm9udC1zaXplOjEycHg7XFxuXFx0bGluZS1oZWlnaHQ6MTJweDtcXG5cXHRib3JkZXItcmFkaXVzOjJweDtcXG5cXHRjdXJzb3I6cG9pbnRlcjtcXG5cXHRwYWRkaW5nOjJweDtcXG59XFxuYm9keS55dWkgLnl1aV9idG4uYnRuX3NxdWFyZXtcXG5cXHRib3JkZXItcmFkaXVzOjA7XFxufVxcbmJvZHkueXVpIC55dWlfYnRuLmJ0bl9zaXplX3N7XFxuXFx0cGFkZGluZzo2cHggMTJweDtcXG59XFxuYm9keS55dWkgLnl1aV9idG4uYnRuX3NpemVfbHtcXG5cXHRwYWRkaW5nOjhweCAxNnB4O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2J0bi5idG5fY29uZmlybXtcXG5cXHRjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzEzOGVkNDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzEzOGVkNDtcXG59XFxuYm9keS55dWkgLnl1aV9idG4uYnRuX2NvbmZpcm06aG92ZXJ7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogIzI4OWJkYztcXG59XFxuYm9keS55dWkgLnl1aV9idG4uYnRuX2NvbmZpcm06YWN0aXZle1xcblxcdGJhY2tncm91bmQtY29sb3I6IzI0OWRmMztcXG59XFxuYm9keS55dWkgLnl1aV9idG4uYnRuX2NhbmNlbHtcXG5cXHRjb2xvcjogIzMzMztcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U1ZTVlNTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcXG59XFxuYm9keS55dWkgLnl1aV9idG4uYnRuX2NhbmNlbDpob3ZlcntcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2J0bi5idG5fY2FuY2VsOmFjdGl2ZXtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmY2ZjO1xcbn1cXG5cXG4vKiDnu7/oibLkuLvpopggKi9cXG5ib2R5Lnl1aS5ncmVlblN0eWxlIC5jb2xvcl9oaWdobGlnaHR7XFxuXFx0Y29sb3I6IzAwZmYyMjtcXG59XFxuYm9keS55dWkuZ3JlZW5TdHlsZSAueXVpX2J0bi5idG5fY29uZmlybXtcXG5cXHRjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwZmYyMjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwZmYyMjtcXG59XFxuYm9keS55dWkuZ3JlZW5TdHlsZSAueXVpX2J0bi5idG5fY29uZmlybTpob3ZlcntcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNDRmZjAwO1xcbn1cXG5ib2R5Lnl1aS5ncmVlblN0eWxlIC55dWlfYnRuLmJ0bl9jb25maXJtOmFjdGl2ZXtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiNhYWZmMDA7XFxufVxcblxcbi8qIOaooeaLn+aJi+acuuahhue7hOS7tiAqL1xcbmJvZHkueXVpIC55dWlfbW9iaWxle1xcblxcdHdpZHRoOiAzNzVweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDVweCA1cHggNXB4ICNlNWU1ZTU7XFxuICAgICAgICAgICAgYm94LXNoYWRvdzogNXB4IDVweCA1cHggI2U1ZTVlNTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U1ZTVlNTtcXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbiAgICBtYXgtaGVpZ2h0OiA5MHZoO1xcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgICBwYWRkaW5nOiAwIDAgMjBweDtcXG59XFxuYm9keS55dWkgLnl1aV9tb2JpbGUgLnl1aV9tb2JpbGVfaGVhZHtcXG5cXHR3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiA2NHB4O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltZy90aXRsZWJhci5wbmdcIikpICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXG59XFxuYm9keS55dWkgLnl1aV9tb2JpbGUgLnl1aV9tb2JpbGVfaGVhZD5oMXtcXG5cXHRwYWRkaW5nOiAyMHB4IDY1cHggMDtcXG4gICAgbGluZS1oZWlnaHQ6IDQycHg7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgLW8tdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbn1cXG5ib2R5Lnl1aSAueXVpX21vYmlsZSAueXVpX21vYmlsZV9ib2R5e1xcblxcdG1pbi1oZWlnaHQ6NDYwcHg7XFxuXFx0Zm9udC1zaXplOjEycHg7XFxuXFx0cGFkZGluZy1ib3R0b206MjBweDtcXG59XFxuLyog5bqV6YOo5qiq5qCPICovXFxuYm9keS55dWkgLmJvdHRvbV9iYW5uZXJ7XFxuXFx0cG9zaXRpb246Zml4ZWQ7XFxuXFx0Ym90dG9tOjBweDtcXG5cXHRsZWZ0OjIzMHB4O1xcblxcdHJpZ2h0OjMwcHg7XFxuXFx0aGVpZ2h0OjU2cHg7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjojZjBmM2Y2O1xcbn1cXG5ib2R5Lnl1aSAuYm90dG9tX2Jhbm5lciAuYm90dG9tX2Jhbm5lcl9jb250ZW50e1xcblxcdG1hcmdpbjoxM3B4IGF1dG87XFxuXFx0d2lkdGg6MTIwcHg7XFxufVxcbi8qIOihqOWNlee7hOS7tiAqL1xcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwe1xcblxcdG1hcmdpbjogMCAwIDE1cHg7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwLm5vdF9pbnRlcnZhbHtcXG5cXHRtYXJnaW46MDtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXA6YWZ0ZXJ7XFxuXFx0Y29udGVudDogXFxcIlxcXCI7XFxuICAgIGhlaWdodDogMDtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgY2xlYXI6IGJvdGg7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF9sYWJsZXtcXG5cXHRwYWRkaW5nLXJpZ2h0OiA2cHg7XFxuICAgIHdpZHRoOiA5MHB4O1xcbiAgICBsaW5lLWhlaWdodDogMzBweDtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBvdmVyZmxvdzpoaWRkZW47XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF9sYWJsZS5iaWd7XFxuXFx0d2lkdGg6MTIwcHg7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwe1xcblxcdGZsb2F0OiBsZWZ0O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICBmb250LXNpemU6MTJweDtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXAgLmlucHV0X3dyYXAgLmZvcm1fb25le1xcblxcdG92ZXJmbG93OmhpZGRlbjtcXG5cXHRsaW5lLWhlaWdodDozMHB4O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuZm9ybV9vbmUgLmZvcm1fb25lX2NvbnRyb2x7XFxuXFx0aGVpZ2h0OiAzMHB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuZm9ybV9iZWluZ19jb250cm9se1xcblxcdGZsb2F0OmxlZnQ7XFxuXFx0bWFyZ2luLWxlZnQ6NXB4O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuZm9ybV9iZWluZ19jb250cm9sIC5mb3JtX29uZXtcXG5cXHRtYXJnaW4tYm90dG9tOjEwcHg7XFxuXFx0bWluLWhlaWdodDogMzBweDtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXAgLmlucHV0X3dyYXAgLmZvcm1fb25lIC5pbnB1dF90ZXh0e1xcblxcdHBhZGRpbmc6IDhweCAxMHB4O1xcbiAgICBoZWlnaHQ6IDEycHg7XFxuICAgIHdpZHRoOiAxNDBweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U1ZTVlNTtcXG4gICAgYm9yZGVyLXJhZGl1czoycHg7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC5mb3JtX29uZSAuaW5wdXRfdGV4dC5zaXplX2x7XFxuXFx0d2lkdGg6MjgwcHg7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC5mb3JtX29uZSAuaW5wdXRfdGV4dC5zaXplX2xfbXtcXG5cXHR3aWR0aDoxODBweDtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXAgLmlucHV0X3dyYXAgLmZvcm1fb25lIC5pbnB1dF90ZXh0LnNpemVfbXtcXG5cXHR3aWR0aDo4MHB4O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuZm9ybV9vbmUgLmlucHV0X3RleHQuc2l6ZV9ze1xcblxcdHdpZHRoOjQwcHg7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC5mb3JtX29uZSAuaW5wdXRfdGV4dC5zaXplX3Nfc3tcXG5cXHR3aWR0aDoyNnB4O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuZm9ybV9vbmUgc3BhbntcXG5cXHR2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC5mb3JtX29uZSBzZWxlY3R7XFxuXFx0d2lkdGg6IDE0MHB4O1xcbiAgICBoZWlnaHQ6IDI2cHg7XFxuICAgIHBhZGRpbmc6IDAgMTBweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI4cHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlNWU1ZTU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkYyRjI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U1ZTVlNTtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXAgLmlucHV0X3dyYXAgLmZvcm1fb25lIGlucHV0W3R5cGU9J3JhZGlvJ117XFxuXFx0dmVydGljYWwtYWxpZ246bWlkZGxlO1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuaW5wdXRfdGV4dFtyZWFkb25seT0ncmVhZG9ubHknXXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U1ZTVlNTtcXG4gICAgd2lkdGg6MTIwcHg7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC50YWdfd3JhcHtcXG5cXHRoZWlnaHQ6IDI4cHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNFNUU1RTU7XFxuICAgIG1hcmdpbi10b3A6MXB4O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAudGFnX3dyYXAgLnRhZ19sYWJlbHtcXG5cXHR3aWR0aDogMzJweDtcXG4gICAgaGVpZ2h0OiAyOHB4O1xcbiAgICBsaW5lLWhlaWdodDogMjhweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVlNWU1O1xcbiAgICBmbG9hdDpsZWZ0O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAudGFnX3dyYXAgLnRhZ19pbnB1dHtcXG5cXHRoZWlnaHQ6IDIwcHg7XFxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgICBib3JkZXI6IDAgbm9uZTtcXG4gICAgd2lkdGg6MTEwcHg7XFxuICAgIGZsb2F0OmxlZnQ7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC50YWdfd3JhcCAudGFnX2lucHV0W3JlYWRvbmx5PSdyZWFkb25seSdde1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCBpbnB1dFt0eXBlPSdjb2xvcidde1xcblxcdHdpZHRoOjcycHg7XFxuXFx0aGVpZ2h0OjI4cHg7XFxuXFx0cGFkZGluZzowIDIzcHggMCA1cHg7XFxuXFx0Y3Vyc29yOnBvaW50ZXI7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjojZjJmMmYyO1xcblxcdHBvc2l0aW9uOnJlbGF0aXZlO1xcblxcdGJvcmRlcjoxcHggc29saWQgI2U1ZTVlNTtcXG5cXHRib3JkZXItcmFkaXVzOjJweDtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXAgLmlucHV0X3dyYXAgaW5wdXRbdHlwZT0nY29sb3InXTphZnRlcntcXG5cXHRwb3NpdGlvbjphYnNvbHV0ZTtcXG5cXHRjb250ZW50OicnO1xcblxcdHdpZHRoOiAwO1xcbiAgICBoZWlnaHQ6IDA7XFxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yaWdodDogNHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItdG9wOiA4cHggc29saWQgIzk5OTtcXG4gICAgcmlnaHQ6OHB4O1xcbiAgICB0b3A6MTBweDtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXAgLmlucHV0X3dyYXAgaW5wdXRbdHlwZT0ncmFuZ2UnXXtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG4gICAgaGVpZ2h0OiAyNHB4O1xcbiAgICBsaW5lLWhlaWdodDogMjRweDtcXG4gICAgcGFkZGluZzogM3B4IDBweDtcXG4gICAgb3V0bGluZTogMCBub25lO1xcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBmbG9hdDpsZWZ0O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCBpbnB1dFt0eXBlPSdyYW5nZSddOjotd2Via2l0LXNsaWRlci10aHVtYiB7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgbWFyZ2luOiAtN3B4IDAgMDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzEzOGVkNFxcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCBpbnB1dFt0eXBlPSdyYW5nZSddOjotd2Via2l0LXNsaWRlci1ydW5uYWJsZS10cmFjayB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzk3OTc5NztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2IwYzllYztcXG4gICAgY3Vyc29yOiBwb2ludGVyXFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC5yYW5nZV90ZXh0e1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICBwYWRkaW5nLWxlZnQ6MjBweDtcXG4gICAgZGlzcGxheTppbmxpbmUtYmxvY2s7XFxuICAgIGZsb2F0OmxlZnQ7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC5sYWJlbF9idG5bdHlwZT0nYnV0dG9uJ117XFxuXFx0aGVpZ2h0OiAyOHB4O1xcblxcdHBhZGRpbmc6IDAgMTVweDtcXG5cXHRib3JkZXI6IDFweCBzb2xpZCAjZTZlNmU2O1xcblxcdG91dGxpbmU6IDAgbm9uZTtcXG5cXHRib3JkZXItcmFkaXVzOiAycHg7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcXG5cXHRjb2xvcjogIzY2NjtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC5sYWJlbF9idG5bdHlwZT0nYnV0dG9uJ106aG92ZXJ7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXAgLmlucHV0X3dyYXAgLmxhYmVsX2J0blt0eXBlPSdidXR0b24nXTphY3RpdmV7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXAgLmlucHV0X3dyYXAgIHRleHRhcmVhe1xcblxcdHdpZHRoOjI3MHB4O1xcblxcdGhlaWdodDoxMDBweDtcXG5cXHRib3JkZXI6IDFweCBzb2xpZCAjZTVlNWU1O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAgdGV4dGFyZWEuc2l6ZV9ze1xcblxcdHdpZHRoOjE2MHB4O1xcblxcdGhlaWdodDo1NnB4O1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAgdGV4dGFyZWEuc2l6ZV9te1xcbiAgICB3aWR0aDoyMjBweDtcXG4gICAgaGVpZ2h0Ojc4cHg7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC5pbWFnZV93cmFwe1xcbiAgICB3aWR0aDogNjBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICBtYXJnaW46IDAgMTBweCAxMHB4IDA7XFxuICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuaW1hZ2Vfd3JhcCAuZGVsZXRlX2ltYWdle1xcblxcdGRpc3BsYXk6aW5saW5lLWJsb2NrO1xcblxcdHdpZHRoOiAxMnB4O1xcbiAgICBoZWlnaHQ6IDEycHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC02cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG5cXHRiYWNrZ3JvdW5kLWltYWdlOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1nL2ljb25fZGVsZXRlLnBuZ1wiKSkgKyBcIik7XFxuXFx0YmFja2dyb3VuZC1zaXplOjEycHggMTJweDtcXG5cXHRsZWZ0OiA1NnB4O1xcbiAgICB6LWluZGV4OiAyO1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuaW1hZ2Vfd3JhcCAuaW1hZ2VfaXRlbXtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHdpZHRoOiA2MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWcvYWRkX3BpY3R1cmUucG5nXCIpKSArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOjEwMCUgMTAwJTtcXG4gICAgYm9yZGVyOjJweCBkYXNoZWQgI2U1ZTVlNTtcXG5cXHRib3JkZXItcmFkaXVzOjJweDtcXG5cXHRjdXJzb3I6cG9pbnRlcjtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXAgLmlucHV0X3dyYXAgLmltYWdlX3dyYXAgLmltYWdlX2l0ZW0uY29tcGxldGV7XFxuXFx0YmFja2dyb3VuZC1zaXplOiAwO1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuaW1hZ2Vfd3JhcCAuaW1hZ2VfaXRlbSAuaW5wdXRfaW1hZ2V7XFxuXFx0ZGlzcGxheTpub25lO1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuaW1hZ2Vfd3JhcCAuaW1hZ2VfaXRlbSAuaW1hZ2Vfdmlld3tcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgbWF4LWhlaWdodDogMTAwJTtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuZm9ybV9vbmUgaW5wdXRfdGV4dDpmb2N1cyxib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuZm9ybV9vbmUgdGV4dGFyZWE6Zm9jdXN7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMxMzhlZDQ7XFxufVxcbi8qIOihqOWNleagoemqjCAqL1xcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC5mb3JtX29uZSAuaW5wdXRfdGlwc3tcXG5cXHRkaXNwbGF5Om5vbmU7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIG1hcmdpbjogMCAwIDAgMjVweDtcXG4gICAgbGluZS1oZWlnaHQ6IDMwcHg7XFxuICAgIGNvbG9yOiAjZmYwMDAwO1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuZm9ybV9vbmUgcCAuaW5wdXRfdGlwc3tcXG5cXHRtYXJnaW46MDtcXG59XFxuYm9keS55dWkgLnl1aV9mb3JtX3dyYXAgLmlucHV0X3dyYXAgLmZvcm1fb25lIC5pbnB1dF90aXBzLnNob3d7XFxuXFx0dmlzaWJpbGl0eTogdmlzaWJsZTtcXG5cXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbmJvZHkueXVpIC55dWlfZm9ybV93cmFwIC5pbnB1dF93cmFwIC5mb3JtX29uZS5jaGVja05vdFRocm91Z2ggLmlucHV0X3RleHR7XFxuXFx0Ym9yZGVyOjFweCBzb2xpZCAjZmYwMDAwO1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuZm9ybV9vbmUuY2hlY2tOb3RUaHJvdWdoIC50YWdfd3JhcHtcXG5cXHRib3JkZXI6IDFweCBzb2xpZCAjZmYwMDAwO1xcbn1cXG5ib2R5Lnl1aSAueXVpX2Zvcm1fd3JhcCAuaW5wdXRfd3JhcCAuZm9ybV9vbmUuY2hlY2tOb3RUaHJvdWdoIC50YWdfd3JhcCAudGFnX2xhYmVse1xcblxcdGJhY2tncm91bmQtY29sb3I6ICNmZjAwMDA7XFxuXFx0Y29sb3I6I2ZmZjtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIhLi9saWJzL2Nzcy95dWkuY3NzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQVVBQUFBQkFDQUlBQUFEa2hUbEpBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBRkJKSlJFRlVlTnJzWFFsY2pPa2ZiNmJtNnI3dmxDTzdMTmFSSE9zTzIxcTdXRnBhZDBXVXlIMmtsS09RTzRWWUxKWVV0VVVVaVNWQ3FSeUpkWVl1eFV6bk5QZi9Pek8yLzZoeEZMc3JQVjgrNDUxbm52ZjF6dS81ZlgrLzcrOTVuM2xmU29zMjdTUXFCQVFFalE4VUZSVXFZUzhCUVNNRnlFc2xWaUFnYUx3Z0JDWWdhTVJRK3dUUFNTd1c0MVdWK2tyZVN5UVNrVWdrRUFxeFRWT1RnZ3diYkVLaFVHcTJwVkxxNzdkMWU5YjlWTmFtUW5uRExrM1Rub3IyVUdxZnVvMVN6eFNMa1FOVlZWVnJTbEVCWDBCVnBhSkZvVktsQ0lRQ0hvOVgzM0tWSWxmSkZCVWNqc2xnS0IydmY1Y01GTmtKdloyOUlqR05wa2FuTTdoY0x2cUR6SHcrMzl6TXJGM2JOakRlemV6cy9QeENKcFBSbEoxUElCRGc2eU9Rd1FUVlBCNmlHNFBCcUt5dXB0Rm8ySkQ3bWN6VlZIZzh4RDJCN0ZNZWpDYjNxdXJxYW55b3FrcmxDd1RxTEJhaE1Yd01acUxUYUhMS1ZIRzVhakpEQ1VVaTJFZE8xTXFxS2hhVHllUHprVmVZVEtaRUJxRlFhR0ppekszaWxwYVZNZWdNMkozUDU3VzJ0YTNtVnVjVjVJTjFjc3Z5aFh3YnEyYjJYZTNxSHpRbDhsTXFMaTVKdVhSSnJCQzEzMEZnK0FTWFd5MFNDVEgyT04yYVJudzNzY3hkYWpYaWxma2VQZkg5WVN4a1ViUy95WlJDa1RBOGRNdWp4N20rQVN2VU5kU3gxNXlaWHIrTWRucnc0QkZGbFdwbFlSa1NGbll3TXFybXNFME5aV1Zsam9NSDlleG12eUVrdEtLaXN2MVhiVjBuVGJBd043di80Tkh1ZmZzZTV6NmhTUjFSQ3JDM21hV0Z4N1NwNXFhbTZabFp2KzdaQzdhRC9OM3R1MDRhUDQ3RlpNUW5uSXFPalFPcm0zZzBSQ2hjdG5oUjB0bmtsTlFyTU1TUXdRT2Rmdm9KSDBWRlJ5Y21KY09lc0krN3Ewdi9QcjFmc3RrN2R1M092bk1IZEFYbnA3dTUySFh1VEtGUVE3WnZ6OGpNQXFXL2F2UGxtcFVyNXkxYUlwWWdNMHVqQUZLMHRwYjJEME9HR0JqbzZlam9VS24xTGxwRlFsRnhjVEUyVGljbjEzVjdKUVRtQy9nNjJqcGpuRWFhR0p1QzkxZlMwdWdNaGxBZzFOYldjbllhWld4c25ISXA5VXA2T29OT3gzZlEwVUxqU0dOakUybWpyQ2ZVZ3F6eC96MFIyMkFtdkhYbzIxZGJXL3RXZG5icTFhdEsvYWF5c21yOEw4NzkrL1I1a25zQThRWkoyTk45Nmpqbk1XN1RQVzlsM3hhclNMNGJOREJrL2Jvbno1N2h5RTJOd3pCSVpXVmxuMTY5UWpkdXlDOG9DRnEvNGNzdldoOCs4RnZhdFl6a1A4OVBHamUyVTZldlI0NFpXMTNOUXhCRVBGVlhaKzBJM1ZKV1huRTA1by9aTXp6TnpVeTg1eTNzMktIRDdoM2JZby9IWDMveU5HaTVQdzRiRVhWRVhWMjlDVklYN2djeFFxZlRWL243L1RMNlo0aTc4b3FLSVlNSGhXN2F1SFAzWG5UQXhzUXA3b2xKWjN6bXo1dnE1aEs4WVZQUEh0MzNoRzhiL3JOelhuNUJxeGJOUVV2blNTNGpoLzBJNDE5TlM5ZFExL0QzOFRsNE9ETDdUbzZHaHNhckhDb1c2K25xMGhtMG9VTytNekUyYnRpcFJrYkhtSmdZc2t0TGpXbDBTS2UzRVJnWkQremRGYmExUnpkN3ZQVjBkNXUvMURjaThvaVJvYUZDNDVRRlBuNkhvcUxRdUROMGE0L3VOWTIraDZLT0dCb2F5SHAyUTZPSCs1U0ZTMzBQUlI2eHREQjNuVGdoNVdKcVlVYW1RLzkreHNaRzBiSEhHQXk2NG44TnV0cDE2ZFMzMXpjSEl5UFZhRFJrWTJNalE1ZUo0NE9DMTZla3B1cHE2NGlFd3VpNE9HTkRReWFEcWRMRWtnYXNnVG8yTUdBWjBpL2lGMndsRVVzc3pFeXZYRTJiTVdmZWs2ZlBjbk9mZ0ptbUppWlVLcVZkMjdaeDhTZUhEUjBJaHZmczU1QjE0NlpZTEFwY0hoQzBkdjM0c2M0dlg3SjkvUHhMWHJ5MHNiRjJtendKWkpZZW5OcmtwalBCWHJzdW5WY3Q4NE1TTGk0cFFkU2pxNm5OOUppV25wR3hiT1VxaU5mT25UcE9uakQrV2thbTYrU0pZZUU3MTI3YWJCTWRjK1hQNUNHT2d6ZHREVE15TW56SllSYzlmMzd2d1VNUVd5UVN6NTg5NjhuVHA5QkJOZXlWQ1dDS2JNS0NXbFBhTkFBeTNjNXluVEQrd3NWTGtPdUtnMVY3MktxcXVEOE8rVTVPVkFCYTE5dkRBNkwzZThkdkZSdG5lVTUvMWRoZHNWSGFjNmlqbzV5OUFQTEFMQThQNkEwa1ZTVHowMmVULzdwL1AzejM3dVkyTm5BMUJBdkZ3S0d1b1RGM3B0Zk9QYjhWRkJXcHFxbkNvRGJXMWlnOHNLT1dwaWFOUWJld3NHaGgwL3hvM0RGa2RlWWJSUGhuRExnRlF0allTUzZRZGl6WUJaWkpUZlh3bmdOMW82T2ozZnVibm13T0p5OC9mNUREZ0cxYk5pRTR0bXpaTWkrdmdNM21HQm9ZNU55OWk0VFQ2ZXNPN2R1MnVYcnRHcXBmTFMzTjdOczVKc1pHT095SCtGWmpqb2tTTTFQVG8zL0VqbmVkZ3R5clNxRnFhbXJDYUpldnBsRlJ2MUtwYVJtWnphd3NPN1J2cDZXbGRmZnVYMGlrTURWaXBXMnJWcURRMDJkNWVqcTZYN2RyMzZ0SDk5czVkd2IyNzllMVM2ZFZhNE83Mjl0YldsancrWHlsYzJBTlBWVVJuVWJmdUhhMTA4Z1JGWldWYjh2QTZJcjBxTmlDNFVlUmdHVDdlcU0rR28wTlgrdHBZS0JQbzZraE10WHFTYWZUWUpxaW9rS1FITnZsNVJVSWZob2FyT0lTaVdJcDRqVWR3Uzh6UGphMlg1OWUrUDZRaXpBWlhBMlZNMktrdFpWbHlJWjFDQkFvSkU0a0pDNzI4MmN3bXRCVUZqeW1pc3RkSHJRR3JvWWsvTGNJcE1KUThEYUk0VEZPbzd6bXprUDgvZk5DeXZRQ2IxZ1BKRWVpaHZCR3RWTDB2QmcyTkRBd2dHZVd2SGdobmJPaDA4dkx5eUdlTVdSTms4Q3dUOEtwMHhVVkZVWkdSbkJtaWN6SWtEbXdNLzZCZFdFZlJEYzlQVjFrRjlnVEgySURDZERhMGhJWkJTcDZXL2d1WkxLQ3dzSzQrUGpBRlFHclZnZlBtZWtGdzRMMklkdTJYMHk5TEt2eUpCOHAzRWhWRW1nb3YwYnp4Z3dNVnB4UHVhU1lHODlkdUlDdmhHQmZxNUVyYlh5dDU1L25VeXFydUJjdjFlcVpVbEZSZVRzblowRC9BZkFrc0xkcjU4N1F3UGtGaFRWVDdmQkNxRDUzVnhlVTJmNHJBcjVCV3JlemMzWnllcFNicTg1U056YzFSWjhudVU5L21lQXk4UHRoQ2FlVFVFczBRWmNEemFTVGdnclNBOUVOa1hIL3IrRU8vZnFPSGo4eDd2aEo1Tlc3ZjkyTGlvNFJ5QUFIUW93VGlrUVdabVkwR28zRDRXQm9EUFQxRVFkRlFoRkNJWS9IRndxRVRYWVNDMThjRksxUnBPQUc0aDJNaG45RVlqRjBEYStheDJHWEloc2owcUdhVlZOVkJaL3pDd3Q1UEI2U1VkekprN01XTFBSYnNkTFQzZjNFaWNTeXN2SzJiYjZjdlhEUm1iUG5VQmpYWXRvSG5pa2t3ZldidDBDeFdoUEF0UW1NczcrYW5vNlRnQjl3U2t2L09CNGZFTGdhKzZSZnk1aXpjUEdyeG1QSHBZMTBSdHExVEduUGU5TEcyR1B4eTROV3c3M1NGSHBLR3dOWDAraTBLMmxwaFlWRjBOaXp2V1lNR2pEZ2FHeHNkVFd2eG0razZhV3Fhcy8rQTJxcVNQVUdUQ1pEallaTXEvMDROemM5TTlQYnl3UFdmTUZtUDN6OEdPR3RiNjllTU4vSENteU56dUVVUXpJNEdiSWhHRkhQY2RpSXhLUmtrVmdFMGlJNVdGcGEwT2owKy9jZm1KdWJRY1c4ZVBFQ3hUQnE1clNNak95Y3UzYWRPMkZIR0x4RHU2L3k4L01oeVpveWdSVTFEckx4dzRjUDdlMjZRSzBnUTJEandhTkhvRTE1WldYcjFyWW9SdFJvTkN0THEreWNPL0xyOFBEMnNySXl6Mm51S0dpMmhHMnpNRGRqczlsUWx5OWVzdWwwQmc1WWMra1lnTkpwOEhsaXZDQUhodjA4R25tVTlmcmNyWktEZ2lSSGp2NXhLdWtNVGdJeFd4cjQ2WFFNZjJSMFRHSlNFbmlMMmgzMG9UUG9Fb2s0S2xyYUU0MXNXVS9zaStnVmVSUTkwVWgvMVVpajRUVW1MczdVMUVSRFhSMjVGd3lFbGxZNFA3V25lWGtCZ1VFd0o3dTBiSE53a0w2ZTNwNTlCL1QxZEpldFhCVWVzaVZpMzk3VHlXYzFtQ3lvYTI1MXRkSUxZazBxRHlQeFF0UzVUWjQwMk1FaFBpRVJQcVRPWW9IU0VIWGZmK2ZvdDJTUlhjL2VKeE5QdVV3Y3YzbmRXbGdlY1RNcUpxYW9xUGpBb1VNL0RIRmN2U0lBdGR5SUgzOVk0T01MSmRVMFo2RVZhYXl0cFFYWGhhSUoyYlpqMTdiUWxjdDgwZHF4UTRjSmJsTmZzRi91M2JmZlkrb1VNTE5IdDI0Z0VnekxrbDBmaGh0RCs0d2MvcVBiTkUrcUtoV1p6TVRFWktpajQ4QUIvYk91MzVEcVVLbVRVb1JDQWJadjM3bmJxb1dnQVg2TDdGVmNVaUlRaXJoVlhHMXQ3ZG9uMzd4Tk8rVzdpVVFTV2ZtaytGOUt6MGtpb2Y3ZFNKRmQyNURwRHVsRUdZVktlZGZ1MHU1dnYvQUlVZGV2ZHk4b3hjVFRaNWdNT3F4bVpHamtQTnFwZGF0V2ZBSC85SmxrNVBiV3RxMlN6cDVUWE96U2RJQnlvM3MzK3k5c1cvMTI0Q0JTUk9lT0hhRlc1SXNRTUJDSGp4elIxOWZ2MGMwK0l1cG9XWG01bFlYNU9PY3hMWnMzdjVLV3Z2OVFCRHJBNTZSK09kWVpwSTFQU0VnNGxkVEVyd1BMczg3WU1hTXZYYjZjZlRzSGZ0dXJaNCtmZnhvQlFoNktPbm9wOWJMMHVycEVNbkxFOEQ2OWVrSWsvN3IzdDNzUEhzb1h6QUR6dkdkbFp0MDRkdktFcG9ZR2h1YWI3dDBkK3ZmTEx5ajRQU0pTSUJKUXBaUFAyRnY4dmFPamJhdVcyS0JTNitXMEVqbHJoRUxSc2ZqNDNLZFA2eTVEZkNPQlB5eW1OVnpod3BtNDNHcDhWV25WSVZNZ09Ic3V0d3BXaG5IbEs1Q2djT1Foc0dtbUN3UTFxVlRXMGdJYnEzazhCZktob3BNdWZVRjVvcWtwTGUzNGZFRjFOUmVGTTN4TFhaMGxML2FraTdlRVFxa1paU3VOeUVvc3VCbkVNNHBIK0poRXR2cWd4b2RaQ2l1eGFES0w0UlhkYXNZQ0pxMldyWUdUdXp3c0Q5ZkZIeWFMV1ZOYXk2bHVZbUlzcFora0lXemljRXFSK1pVdUl2NW5DUHpQV0ZtRkxOOXRxT25xWE5LUXZoQmoxc3ZaYXEyWFZwd2NmcDhEUWdtck5IVHFsU3FEMG84YXpROERpTGQ5Uk5QOVhRQVIxTVBabERhKzV3SVlxWEw4WnlvKzhuTkNBb0pHREVKZ0FnSkNZQUlDQWtKZ0FnSUNRbUFDZ3FZQ05USVhTVUJBTWpBQkFRRWhNQUVCUWIwa2RLMzNqVUpSazV2UkV4QTA0Z3hNNm5ZQ0F1VVptSUNBNEZQTEpSSlNBeE1RRUFsTlFFQkFDRXhBUVBBM2JLeWIvVGNFSHRDL241NnVMaGtBQW9JUFFkU2gzN3QyNmZKdkU5aHQ4cVR3MEpCZDI4UElBQkFRZkFpUUJYLzdOWHpZRDBNYnRudERacUU5M0tmTW1UVlRMQlpIUkViVitxaEY4K1l2WHI0c0xTMlZ2elV3MEdmUTZSVHBMYk0xOVBYMGJHMWI5ZTNkKzNseDhSTGZaVFgzSXU3VThXdUs3SDVPRWtudDIzREs3bGhDRlV2RVdkZHZrSkVtK0Z4QnA5UFhyUTYwYm1hMUpYUmJmZmVsdEhqOWxqcnZuQmFmTmNQVHkyT2FTQ1JhNU9NYkUzZXNibWFlTU80WDc3a0xNckt5OEhaMytIWXpVOU9pNTg4cktpcllIRTVCUVVGZWZrRlplWG42dFl6eThuTDVMcGZPSldkZXYvN3FSa1Ixd0dReXYyN2Z2cmZEb0ZydFpDMEh3YWNBcFh4Wk1IZTJ5OFFKaXJld21ydHdjZXl4NDloQUdwczhjY0pBaC83V1ZsWTE5OWFxd1IvSGppOWU2aWNRQ043ZjIrdVhnZWZOOXA0MnhWVW9GTTVidU9UNHlaTjFPK3phcy9mdXZYdmJ0MjRKWExNV1o4UGhjQTRlamt3NmsveVdZL0lGL0ZXcjErWVhGQ2o5MU1UWStQRHYrNGlqRURRaTFHTHYyWE4veXRuYjNiNXJ5TVlOZW5wdm5Ea2Evc05RY3pNemo1bXpPSnpTankraGx5eWNqek5EZVBDZXR5RHhkTktidWwxSXVUaDVxdnRNVDQrNCtCT2dlc2NPN1NuL2w4VFNlMG95R1F5azdycVA4NUErSVVvb0VnajQ2SWh1R2hycTU4NWZJTjVBME9nZ1orK1ZxMmxYMHRLd2NTSWhFYThkMnJYYnRUM3NuWS9VdExmcnNpNG8wRzI2NThja01Jam50MlR4K0xIT2ZEN2ZhL2JjTTJmUHZiMS85dTBjZDA4dkZkbk4rQ3pNemJGWHpVYzIxdFptWnFiUnNYRjE5MXF4ekRjak02dWlRdnJzSmhhTE9YalF3TTdkZWhKdklHaWtBSHRyYWxvYWpiWitiZEQ3UEJBM0xmM2F2TVUrOVFnVzc4UGVGZjUrWTV4RzhYaTg2VE85ejE5SWVWTlBuRjl3MENwVXN4RDNVTTVYMDlKeDN1QnFWV1hWelZ1MytESmw3Ny9VSit1RzhobXBLaTUzODlhd1ozbDUyRFl5TkpRLzBaeUE0RFBBVDhOL2JHNWo4ODV1c2JJYW1GK25CbTQ0Z2FsVWF0REs1U09IRHdNdDNXZk12SlI2K1MyZG9hNFBISXlvcUt4WXVtZ2hRMWFnYTJscGNxdTRUaU5IekowOUV6bFpuYVhldDAvdlRTRmJsZTRPL2Z4YWJheVF0d2tJR2pWR2p4cWxJcnVsZnVLcDArZFRMdDY1YzdkUU5yTXJFb251Mzc0cDE2b2hZZHNhTUF2OURnSVBjZndXN01VR0R2MTI5cXJJSHFjaUYvMDRNNEZRaUkxbVZsYklxSXVXK3MyYTRmbjczdDBsSlMvQ2R1emdsQ292MEZYVlZHdkZEakx3Qko4QkRQVDEyN2Y3S2lNcnkzdnUvUHlDd3JvZGtLc1creTZUVDNSOVpBS2ovdTdkNnh0d2VLYm45T3ljbkhkeVdCRkdSb2JhV2xwRno1OWplL1BXMEs1MlhmQjMvcHYxdlRxTE5XdUdoL3o1eFN3bWkwNmprN0VuK0F3QTlqNTQrR2p5bEdtVnJ6K2JXdzQyaCtQaDVaMTI3Um95Vm92bU52Y2ZQUHlZQkJhTHhZdDhmS0dOVVFQdkROdjY5aHE0RmtZT0gzN3UvQVg1dzZOV0JpeURxTjUvTUdMZjdsM2pKcnV3Mlp5Ni9mMENWZ3BGUWdILzFTeDBmRUlDR1h1Q3p3Q1dsaGErL2dGSzJRczRPWTk3bkp1cnBhbTVNWGpOalZ1MzZxdWkzejJKQlFiNitpOFg4QVhqeHpwdkQ5bjhQclBRS3RMcnQwYlRwN3FObSt6YXIyOGYzMFVMNzkxL01NRjFDZ3BwVk1WN2QrNFlPOGtWTXJ2V0xoZFRVOGxnRTN4K3VISHpGdjYrNlZPd0Y2OUhJZzYyYk5FY0JQN0lFcnFHd3dHckFnVkNnY3ZFQ1ZzM2JYakxkV0FhamVidTVtSm4xNldLeTEwUnVEcjdkbzZYeC9ROSsvY2ZPQmdoNytDL1lwV2Z6MkpkSFIxRkFnY0hyYXFXUHJOYkNSaDBJcVFKR2oyQjM5a0g3RzNZd2V1eGtDTndUVENmTDVnMnhYWHorbUNsSzdGMGRYWDNoRzh2TGluNXlXbE10MjcyVTkxY1JqdU51blAzTHdTQUthNlRFUVZvYW1wTUpsTzZGTVRMYzgyNkRlaUp2VlJWVlRkdUNaR1h5blZoYUdBUXNta0RjUUlDZ2c4bE1MQnU0eWJRejh0ajJ2cTFRVFNhV3EyMTBCd09aOS92QjQrZk9JaytqM0p6RDBjZGFXMXIrMFZyV3hOall5aG5Cb01objFnV0NVVjUrUVZ5OWdLSG80N2V2WGV2dkx4QzZmOVk5THg0aVo4L0dTY0NBcVdvOTQ4WlZCUitqZVRqNXg4VkhmT2ZuRGY1TVFQQko4RWZaWTN5UzdzTndKYlFNS1dUV0IvNW5saGhPM2F1RGw2UGREcm1aeWN5aEFRRXRTQmZUZGdBUEhuNjdOL0l3SEk0OU8rWGtabkY1bkJJQmlZZ0dWZ1JOdGJXUXh5L1ZWTlRyU2Z0ODJOaTQrcit5T2Z0M3Q1d0F2KzNJQVFtK0dRSi9HOTZPMW11U0VEUWlFRUlURUJBQ0V4QVFQQmZnRHhhaFlEZ0g2bE9TUWIrZEsxR1FQQ0pabURDRFFJQ1VnTVRFQkFRQWhNUUVCQUNFeEFRQWhNUUVCQUNFeEFRRUFJVEVCQUEveE5nQU9nZDRtNnZPNzYvQUFBQUFFbEZUa1N1UW1DQ1wiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWJzL2ltZy90aXRsZWJhci5wbmdcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBR0FBQUFCZ0NBSUFBQUJ0K3VCdkFBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBeUpwVkZoMFdFMU1PbU52YlM1aFpHOWlaUzU0YlhBQUFBQUFBRHcvZUhCaFkydGxkQ0JpWldkcGJqMGk3N3UvSWlCcFpEMGlWelZOTUUxd1EyVm9hVWg2Y21WVGVrNVVZM3ByWXpsa0lqOCtJRHg0T25odGNHMWxkR0VnZUcxc2JuTTZlRDBpWVdSdlltVTZibk02YldWMFlTOGlJSGc2ZUcxd2RHczlJa0ZrYjJKbElGaE5VQ0JEYjNKbElEVXVNeTFqTURFeElEWTJMakUwTlRZMk1Td2dNakF4TWk4d01pOHdOaTB4TkRvMU5qb3lOeUFnSUNBZ0lDQWdJajRnUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0Z1BISmtaanBFWlhOamNtbHdkR2x2YmlCeVpHWTZZV0p2ZFhROUlpSWdlRzFzYm5NNmVHMXdQU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2SWlCNGJXeHVjenA0YlhCTlRUMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMMjF0THlJZ2VHMXNibk02YzNSU1pXWTlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl6Vkhsd1pTOVNaWE52ZFhKalpWSmxaaU1pSUhodGNEcERjbVZoZEc5eVZHOXZiRDBpUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5UTmlBb1YybHVaRzkzY3lraUlIaHRjRTFOT2tsdWMzUmhibU5sU1VROUluaHRjQzVwYVdRNk56QkNPREl5TURnME16UkdNVEZGTmprME5VUTVSa1k1TkRrME5VUkVNRUlpSUhodGNFMU5Pa1J2WTNWdFpXNTBTVVE5SW5odGNDNWthV1E2TnpCQ09ESXlNRGswTXpSR01URkZOamswTlVRNVJrWTVORGswTlVSRU1FSWlQaUE4ZUcxd1RVMDZSR1Z5YVhabFpFWnliMjBnYzNSU1pXWTZhVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRG8zTUVJNE1qSXdOalF6TkVZeE1VVTJPVFExUkRsR1JqazBPVFExUkVRd1FpSWdjM1JTWldZNlpHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEbzNNRUk0TWpJd056UXpORVl4TVVVMk9UUTFSRGxHUmprME9UUTFSRVF3UWlJdlBpQThMM0prWmpwRVpYTmpjbWx3ZEdsdmJqNGdQQzl5WkdZNlVrUkdQaUE4TDNnNmVHMXdiV1YwWVQ0Z1BEOTRjR0ZqYTJWMElHVnVaRDBpY2lJL1B0T0x2NndBQUFjZVNVUkJWSGphN0p0NVVCTlhHTUJOQWdrNUNDR0hRc0lWa0t1ZWlJcFl0V29aRUhWVXBHckhzYVBWVWV0UlcrczRWYWZUam0zSFAyckw2Rml0V3JXMldvV09uV3JWaXJYV2E3RFdBMDlRT1FRNUErUWlGemszL1pLRmtBSkJESll5OG4yenc3ejM5dVh0Mjk5KzEzdTdVT3gyZXo4VXowSkJRQWdJQVNFZ0JJU0FFQkFDUWtBb0NBZ0JJU0FFaElBUUVBSkNRQ2dJQ0FFaG9ENEd5R0MxWi8zZFFKYVhKd2hFTEZvdkFlVFRTK1poc0JEYnJqY0R5b3dMNkQyQXFHaEVDQWdCSVNBRWhJQVFFQUxxbzlKemlhTFJaamRiUFdidEdwUE5WZGFaQ1kySjhOVFRsMFpoK2xCZXdxWEd1dk8xMzk5VGRuK2N1Zkc4WFZNa2FHTG9nM0ExMzBhcXRSWjVrODNUV2JYUmx2bHpPVm5lTnkxVXlxTjc2c24zbzRWeWZWOUNKeTN4OTRYRDAxbDNkckVDUnJ5QWdTYUdQZ2dCSVNBVUJJU0FFQkFDNmlPcitjNkZUcVdrU1AzSk1zZTNGejAyZkxPS2dCQVFBa0pBQ0FnQklTQUVoSUtBRUJBQ1FrQjlHQkRodkE2MTU5NnFPNzRHc0JGMmR2ZjJCcndCdFBPV1FzcWpUNDF5N0U2Y0tkVldhUzBkZHBzWncrM1BhdDFPK2VpU3JORkU3RWdWUDNQOCt3M0doM0xUTTd2RkN4bERSSDZ1NnUwNjQ5a24yZzNKSWxmTDFtc054VXJUM3FraDNRSGt6WDVRTkoreC9FelZtcEhDdGFPRnBXcHpZWU1SR2l1MWxrSzVNYTFsVHdja1JjcnBmQnlUelc2eHRUNGVPbzBDQnhST0ZHbE9GRFVtREdCMjh0dmJkVTB6WXdMY0FWVTBtbk5MTmU2QVhvaDRBeWhWeWprelQ3cnFiSFZtWE1EcVJBSFp1T1ZxZlJqWGQyZGEyKzh1TElUOVZtMFRGR3AxVnIyRnVGWnRJRm1NQ0dKdXVGQjc2TDdLMVhOZGttamoyUDVrZVdJNFordmtZQ2lZYmZhMDdMSlBKd3dZSDhwMkgzYjluN1U5WTZkZTdpakdDUmpuNTBjV3E4eS9GR25JbHRNbDJ0RmlwcXNLd3FCUndBelZSdUtkM0dxb05ockJJZGdmS1V4bUcwR2xVQjRzallIR2R4MXE2SGptR3k5MmZNT2Y1ZFZYYU14ci82Z2hxelZhNjVHWllSUEQyVDNteUo0YmtLTEo5dGF2RmR0VEpkR0I5QWNOeGdOM0haLzh5SFNXQm9PdFJFVzc4TFRPWUNGaW5XL1cvZWxVQUNSaTBlNHNpWWJxaGdzeVVJZXNsR0JRb3FXL1Zibk1pc3Vna29VMkZ6Slk3UitjcTdsU3FaY0cwQTlNRHdYMS9EeXZ2a3h0ZnMwekhYaGdZdzZXdUtwS293MU1tR3dSc0dpbjUwcDdBcENBU1pzVXpwbWVVNWFkRVo0Unc0VUQ1cEdlWGZaaHNtakZDSUZNYjAwNyttUjlrbWhDV052YmFEVFpnam1PeXhGZHU5QmpoUkhNODlxaWdaY3I5Tk55eWhLQ21Eb3prWk1SMWtrWUZITjh2a3pwT0FqUXZRMmYzcGpZK2pFaVBwUDI4V1haeVRrUkVKam1INjhBaHdwMDRGUVEyMmQzZWdpbzJOZHBraW1SL3U2L1VodHRjVTdOQWt2cnlteGh6RjFUSkRkcm04NlZhU21VZmxxVHJVWm5oY0EwT3pZZ3JxTnZQNHhXZ3N1Z2pRdGg5UW9mdEdRWWY5RlEvcVVLL2VxejFhUEVyQjFwNHErYy82c0Rqalpad2pvOEkreTljelVINzZteVVzUmlUdk1sNnZSV29UUHFRMExrMHdWQzIyL0l0OTJRSndZeFFYZU92eEVSeWFPRGVtWVhxSUYrc29UTmFQZVo0bE9OQmJ3ZWFGbjdvZGgwNzlNdkx3SEIzWUozdUZGaldKc2tXancwMEdsQnJUT0w0TkdCMFpFQ2xXdGU0SDBlS295RG5WRVpES2NyZ0JZUDR5OGZJZkNqVVk0WGFXWWRLeDhYd2w2V0lIaC90QkFPbllYWWZLV3VUZjl5dGZsNmpTRmk1OFAyUS8yMU1EcWFUKzlSUUVjSzFQbXlwa016UXVHSlFSZytOanVjYlAvMmpoTDBIeVphS0RmdG45YWFvUlhJalJDNUJnbWRnR3gyWDlxekFZR1BKN1BoV1RIYzlDai83RUkxcEFVL1pZU0RVKy93eFZsWm94bjBkMVdpOEYvcGV6Lzd3RjJQL2djVCs3RkF0WGw4RUJSMjMxWUVNS2prelpEK1pkOGQ1UmVUZzBjZUtJYkVKN2pGdms0VmEwY0ZNMzJvemZsaEY3L2pyVGRZSnh3cWhiejA5WERPcEFqT3dpR0JuWFIrb2pKdm1SaEV4a1NYTktlaDNWamZlTE5PQWVQU21JalVTQTc4L1NaZkFjL05kU296am5lK1hFZWpVdEtpL1BmZlZicHlSUUM2WUhEejdVRzYyTVYzcDdCU0tWZ1d1MmxzZjdDcE5iOVh4Kzk1dkNLM0d2S0o5ajF6Q3RYZzJvWjNtbnozbkFZZGZxQ0dVT0pMcFdUbHl3Y0wvWkxFcllFRHNwNXhvV3lZTG5pUXQwOVdRcndEeDdrNzMwRnFSalNYN0pOWHFZOW8rVWJ6aC9zcVdFRDFjM3ppYVYwOExOQXRKTmtoZXlETGtGWEJzVEpSQUNwNThhbU9USENnUXdDak5XT0NGT25OUWJ6L1lpSDgzSURBR1o4dTBaeHlKbDFqSkN4SWFtRTVCdk9HMWRPUzRYeG9uUGNLRHhZUXF4SWREaFYwcHdRMC8ycmRudlFRalpuNDVMSk1wclBtVmVrdkxvZ2lSM3MxbEQwbmp1ZDBYZ3IzcXh4N3BENVZvdWx3QWw4Nnd5VUVkWmU3Mlp1dmdLQzJxV1daOG9MRi9wd0NDNFdUeFJyM0ZsZ2xndjV2dmlLcjExdWhhbkV1UVYzU1pDVU8zbE9TNWUvdUtvOFdxT3IwRnJKNnM5WUF1WGo3TWp3QUFOVDVOS0FEZENQTGtNZER4UERVYzJWdUZYU3dleXU0WVlZN2lnZ0lBU0VnQklTQUVCQUNRa0ZBQ0FnQklTQUVoSUFRRUFKQ1FVQUlDQUVob0Y0aS93Z3dBTnNPYXB3VUNoaFpBQUFBQUVsRlRrU3VRbUNDXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYnMvaW1nL2FkZF9waWN0dXJlLnBuZ1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgJy4vdmlldyc7XG5cbmltcG9ydCAnLi9saWJzL2Nzcy9yZXNldC5jc3MnO1xuaW1wb3J0ICcuL2xpYnMvY3NzL3l1aS5jc3MnO1xuaW1wb3J0ICcuL21vYmlsZS5jc3MnO1xuXG5pbXBvcnQgcmVzdWVzdERhdGEgZnJvbSAnLi9kYXRhLmpzJztcbmltcG9ydCBjbG9ja0pzIGZyb20gJy4vY29udHJvbGVyL2Nsb2NrLmpzJztcblxubGV0IHdlaXBhZ2VEYXRhID0gSlNPTi5wYXJzZShyZXN1ZXN0RGF0YS5kYXRhKTtcblxubGV0IHdlaXBhZ2UgPSBuZXcgVnVlKHtcblx0ZWw6XCIjd2VpcGFnZVwiLFxuXHRkYXRhOntcblx0XHR3ZWlwYWdlRGF0YTp3ZWlwYWdlRGF0YVxuXHR9LFxuXHRtZXRob2RzOntcblx0XHRjaGFuZ2VXZWlwYWdlRGF0YTpmdW5jdGlvbihvcHRpb24pe1xuXHRcdFx0aWYob3B0aW9uKXtcblx0XHRcdFx0b3B0aW9uW1wiaWRMaXN0XCJdID0gb3B0aW9uLmlkLnNwbGl0KFwiLFwiKTtcblx0XHRcdFx0aWYob3B0aW9uW1wiaWRMaXN0XCJdLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRcdGZvcihsZXQgaSA9IDA7aSA8IHdlaXBhZ2VEYXRhLnBsdWdpbkxpc3QubGVuZ3RoO2krKyl7XG5cdFx0XHRcdFx0XHRsZXQgcGx1Z2luID0gd2VpcGFnZURhdGEucGx1Z2luTGlzdFtpXTtcblx0XHRcdFx0XHRcdGlmKHBsdWdpbi5pZGVudGl0eSA9PSBvcHRpb25bXCJpZExpc3RcIl1bMF0pe1xuXHRcdFx0XHRcdFx0XHRpZihvcHRpb25bXCJpZExpc3RcIl0ubGVuZ3RoID09IDEpe1xuXHRcdFx0XHRcdFx0XHRcdHBsdWdpbltvcHRpb24ua2V5XSA9IG9wdGlvbi52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yKGxldCBqID0gMDtqIDwgcGx1Z2luLnN1YlBsdWdpbkxpc3QubGVuZ3RoO2orKyl7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgc3ViUGx1Z2luID0gcGx1Z2luLnN1YlBsdWdpbkxpc3Rbal07XG5cdFx0XHRcdFx0XHRcdFx0XHRpZihzdWJQbHVnaW4uaWRlbnRpdHkgPT0gb3B0aW9uW1wiaWRMaXN0XCJdWzFdKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3ViUGx1Z2luW29wdGlvbi5rZXldID0gb3B0aW9uLnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL21vYmlsZS5qcyIsImltcG9ydCBXQW5pbWF0ZWQgZnJvbSAnLi93QW5pbWF0ZWQvd0FuaW1hdGVkLmpzJztcbmltcG9ydCBXQnV0dG9uIGZyb20gJy4vd0J1dHRvbi93QnV0dG9uLmpzJztcbmltcG9ydCBXRGlhbG9nIGZyb20gJy4vd0RpYWxvZy93RGlhbG9nLmpzJztcbmltcG9ydCBXRGVjb3JhdGUgZnJvbSAnLi93RGVjb3JhdGUvd0RlY29yYXRlLmpzJztcbmltcG9ydCBXTmF2IGZyb20gJy4vd05hdi93TmF2LmpzJztcbmltcG9ydCBXUmljaHRleHQgZnJvbSAnLi93UmljaHRleHQvd1JpY2h0ZXh0LmpzJztcbmltcG9ydCBXU3BhY2UgZnJvbSAnLi93U3BhY2Uvd1NwYWNlLmpzJztcbmltcG9ydCBXVGltZXIgZnJvbSAnLi93VGltZXIvd1RpbWVyLmpzJztcblxubGV0IHJlc3VsdCA9IHt9O1xubGV0IHBsdWdpbkxpc3QgPSBbV0FuaW1hdGVkLFdCdXR0b24sV0RpYWxvZyxXRGVjb3JhdGUsV05hdixXUmljaHRleHQsV1NwYWNlLFdUaW1lcl07XG5cbmZvcihsZXQgaSA9IDA7aSA8IHBsdWdpbkxpc3QubGVuZ3RoO2krKyl7XG5cdGZvcihsZXQga2V5IGluIHBsdWdpbkxpc3RbaV0pe1xuXHRcdHJlc3VsdFtrZXldID0gcGx1Z2luTGlzdFtpXVtrZXldO1xuXHR9XG59XG5cbmZvcihsZXQga2V5IGluIHJlc3VsdCl7XG5cdFZ1ZS51c2UocmVzdWx0W2tleV0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZXN1bHQ7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9pbmRleC5qcyIsImltcG9ydCBXQW5pbWF0ZWQgZnJvbSAnLi93QW5pbWF0ZWQudnVlJztcblxuV0FuaW1hdGVkLmluc3RhbGwgPSBmdW5jdGlvbihWdWUpe1xuXHRWdWUuY29tcG9uZW50KFdBbmltYXRlZC5uYW1lLFdBbmltYXRlZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0V0FuaW1hdGVkXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvd0FuaW1hdGVkL3dBbmltYXRlZC5qcyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjBkNzNmNmVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vd0FuaW1hdGVkLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbmV4cG9ydCAqIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dBbmltYXRlZC52dWVcIlxuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dBbmltYXRlZC52dWVcIlxuLyogdGVtcGxhdGUgKi9cbmltcG9ydCBfX3Z1ZV90ZW1wbGF0ZV9fIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTYwZDczZjZlXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi93QW5pbWF0ZWQudnVlXCJcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTYwZDczZjZlXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZpZXcvd0FuaW1hdGVkL3dBbmltYXRlZC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNjBkNzNmNmVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi02MGQ3M2Y2ZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3ZpZXcvd0FuaW1hdGVkL3dBbmltYXRlZC52dWVcbi8vIG1vZHVsZSBpZCA9IDI5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjBkNzNmNmVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd0FuaW1hdGVkLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMWY5ZTY2NWVcIiwgY29udGVudCwgZmFsc2UsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTYwZDczZjZlXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3dBbmltYXRlZC52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjBkNzNmNmVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd0FuaW1hdGVkLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi02MGQ3M2Y2ZVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdmlldy93QW5pbWF0ZWQvd0FuaW1hdGVkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2hha2UtZGF0YS12LTYwZDczZjZle1xcbjEyLjUle1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyNWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI1ZGVnKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG59XFxuMzcuNSV7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0yNWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yNWRlZyk7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxufVxcbjYyLjUle1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyNWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI1ZGVnKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG59XFxuNzcuNSV7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0yNWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yNWRlZyk7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxufVxcbjEwMCV7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG59XFxufVxcbkBrZXlmcmFtZXMgc2hha2UtZGF0YS12LTYwZDczZjZle1xcbjEyLjUle1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyNWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI1ZGVnKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG59XFxuMzcuNSV7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0yNWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yNWRlZyk7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxufVxcbjYyLjUle1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyNWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI1ZGVnKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG59XFxuNzcuNSV7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0yNWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yNWRlZyk7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxufVxcbjEwMCV7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG59XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyByb3RhdGUtZGF0YS12LTYwZDczZjZle1xcbmZyb217LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMClcXG59XFxudG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpXFxufVxcbn1cXG5Aa2V5ZnJhbWVzIHJvdGF0ZS1kYXRhLXYtNjBkNzNmNmV7XFxuZnJvbXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKVxcbn1cXG50b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZylcXG59XFxufVxcbi5hbmltYXRlZF93cmFwW2RhdGEtdi02MGQ3M2Y2ZV17XFxuXFx0dGV4dC1hbGlnbjpjZW50ZXI7XFxuXFx0b3ZlcmZsb3c6aGlkZGVuO1xcbn1cXG4uYW5pbWF0ZWRfd3JhcC5TSEFLRS5hY3RpdmVbZGF0YS12LTYwZDczZjZlXXtcXG5cXHQtd2Via2l0LWFuaW1hdGlvbjpzaGFrZS1kYXRhLXYtNjBkNzNmNmUgMS4ycyBpbmZpbml0ZSBsaW5lYXI7XFxuXFx0ICAgICAgICBhbmltYXRpb246c2hha2UtZGF0YS12LTYwZDczZjZlIDEuMnMgaW5maW5pdGUgbGluZWFyO1xcbn1cXG4uYW5pbWF0ZWRfd3JhcC5ST1RBVEUuYWN0aXZlW2RhdGEtdi02MGQ3M2Y2ZV17XFxuXFx0LXdlYmtpdC1hbmltYXRpb246cm90YXRlLWRhdGEtdi02MGQ3M2Y2ZSAxLjJzIGluZmluaXRlIGxpbmVhcjtcXG5cXHQgICAgICAgIGFuaW1hdGlvbjpyb3RhdGUtZGF0YS12LTYwZDczZjZlIDEuMnMgaW5maW5pdGUgbGluZWFyO1xcbn1cXG4uYW5pbWF0ZWRfd3JhcCBpbWdbZGF0YS12LTYwZDczZjZlXXtcXG5cXHRtYXgtd2lkdGg6MTAwJTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9Vc2Vycy9saW5ndWliaW4vRGVza3RvcC93ZWlwYWdlbmV3L3ZpZXcvd0FuaW1hdGVkL3ZpZXcvd0FuaW1hdGVkL3dBbmltYXRlZC52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQStDQTtBQUNBO1FBQ0EsaUNBQUE7Z0JBQUEseUJBQUE7UUFDQSx3Q0FBQTtnQkFBQSxnQ0FBQTtDQUNBO0FBQ0E7UUFDQSxrQ0FBQTtnQkFBQSwwQkFBQTtRQUNBLHdDQUFBO2dCQUFBLGdDQUFBO0NBQ0E7QUFDQTtRQUNBLGlDQUFBO2dCQUFBLHlCQUFBO1FBQ0Esd0NBQUE7Z0JBQUEsZ0NBQUE7Q0FDQTtBQUNBO1FBQ0Esa0NBQUE7Z0JBQUEsMEJBQUE7UUFDQSx3Q0FBQTtnQkFBQSxnQ0FBQTtDQUNBO0FBQ0E7UUFDQSw2QkFBQTtnQkFBQSxxQkFBQTtRQUNBLHdDQUFBO2dCQUFBLGdDQUFBO0NBQ0E7Q0FDQTtBQXJCQTtBQUNBO1FBQ0EsaUNBQUE7Z0JBQUEseUJBQUE7UUFDQSx3Q0FBQTtnQkFBQSxnQ0FBQTtDQUNBO0FBQ0E7UUFDQSxrQ0FBQTtnQkFBQSwwQkFBQTtRQUNBLHdDQUFBO2dCQUFBLGdDQUFBO0NBQ0E7QUFDQTtRQUNBLGlDQUFBO2dCQUFBLHlCQUFBO1FBQ0Esd0NBQUE7Z0JBQUEsZ0NBQUE7Q0FDQTtBQUNBO1FBQ0Esa0NBQUE7Z0JBQUEsMEJBQUE7UUFDQSx3Q0FBQTtnQkFBQSxnQ0FBQTtDQUNBO0FBQ0E7UUFDQSw2QkFBQTtnQkFBQSxxQkFBQTtRQUNBLHdDQUFBO2dCQUFBLGdDQUFBO0NBQ0E7Q0FDQTtBQUNBO0FBQ0EsS0FBQSw0QkFBQSxtQkFBQTtDQUFBO0FBQ0EsR0FBQSxpQ0FBQSx3QkFBQTtDQUFBO0NBQ0E7QUFIQTtBQUNBLEtBQUEsNEJBQUEsbUJBQUE7Q0FBQTtBQUNBLEdBQUEsaUNBQUEsd0JBQUE7Q0FBQTtDQUNBO0FBQ0E7Q0FDQSxrQkFBQTtDQUNBLGdCQUFBO0NBQ0E7QUFDQTtDQUNBLDZEQUFBO1NBQUEscURBQUE7Q0FDQTtBQUNBO0NBQ0EsOERBQUE7U0FBQSxzREFBQTtDQUNBO0FBQ0E7Q0FDQSxlQUFBO0NBQ0FcIixcImZpbGVcIjpcIndBbmltYXRlZC52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiPHRlbXBsYXRlPlxcblxcdDxkaXYgOmlkPVxcXCJwbHVnaW5EYXRhLmlkZW50aXR5XFxcIiBjbGFzcz1cXFwicGx1Z2luX3dyYXBcXFwiIDpzdHlsZT1cXFwicGFyc2VQbHVnaW5TdHlsZShwbHVnaW5EYXRhLmJhY2tncm91bmRDb2xvcixwbHVnaW5EYXRhLmJhY2tncm91bmRJbWFnZSlcXFwiPlxcblxcdFxcdDxkaXYgY2xhc3M9XFxcImFuaW1hdGVkX3dyYXBcXFwiIDpjbGFzcz1cXFwicHJhc2VBbmltYXRlZChwbHVnaW5EYXRhLnN1YlBsdWdpblR5cGUscGx1Z2luRGF0YS5hbmltYXRlU3RhdHVzKVxcXCIgOnN0eWxlPVxcXCJ7aGVpZ2h0OnBsdWdpbkRhdGEuaGVpZ2h0ICsgJ3B4J31cXFwiPlxcblxcdFxcdFxcdDxpbWcgOnNyYz1cXFwicGFyc2VQcm9kdWN0SW1hZ2UocGx1Z2luRGF0YS5hbmltYXRlSW1hZ2UpXFxcIiAvPlxcblxcdFxcdDwvZGl2PlxcblxcdDwvZGl2PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5cXHRpbXBvcnQgdmlld01ldGhvZENvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvdmlld01ldGhvZENvbmZpZy5qcyc7XFxuXFxuXFx0bGV0IG1ldGhvZHMgPSB7fTtcXG5cXHRmb3IobGV0IGtleSBpbiB2aWV3TWV0aG9kQ29uZmlnKXtcXG5cXHRcXHRtZXRob2RzW2tleV0gPSB2aWV3TWV0aG9kQ29uZmlnW2tleV07XFxuXFx0fVxcblxcblxcdG1ldGhvZHNbXFxcInByYXNlQW5pbWF0ZWRcXFwiXSA9IGZ1bmN0aW9uKHN1YlBsdWdpblR5cGUsYW5pbWF0ZVN0YXR1cyl7XFxuXFx0XFx0aWYoYW5pbWF0ZVN0YXR1cyA9PSAnU1RBUlQnKXtcXG5cXHRcXHRcXHRyZXR1cm4gc3ViUGx1Z2luVHlwZSArICcgYWN0aXZlJztcXG5cXHRcXHR9ZWxzZXtcXG5cXHRcXHRcXHRyZXR1cm4gc3ViUGx1Z2luVHlwZTtcXG5cXHRcXHR9XFxuXFx0fTtcXG5cXG5cXHRleHBvcnQgZGVmYXVsdCB7XFxuXFx0XFx0bmFtZTpcXFwid0FuaW1hdGVkXFxcIixcXG5cXHRcXHRwcm9wczp7XFxuXFx0XFx0XFx0cGx1Z2luRGF0YTp7XFxuXFx0XFx0XFx0XFx0dHlwZTogT2JqZWN0LFxcbiAgICAgIFxcdFxcdFxcdGRlZmF1bHQ6IGZ1bmN0aW9uKCl7XFxuICAgICAgXFx0XFx0XFx0XFx0cmV0dXJuIHt9O1xcbiAgICAgIFxcdFxcdFxcdH1cXG5cXHRcXHRcXHR9XFxuXFx0XFx0fSxcXG5cXHRcXHRkYXRhICgpIHtcXG5cXHRcXHQgICAgcmV0dXJuIHtcXG5cXHRcXHQgICAgICBcXG5cXHRcXHQgICAgfVxcblxcdFxcdH0sXFxuXFx0XFx0Y3JlYXRlZDpmdW5jdGlvbigpe1xcblxcdFxcdFxcdFxcblxcdFxcdH0sXFxuXFx0XFx0bWV0aG9kczptZXRob2RzXFx0XFx0XFxuXFx0fVxcbjwvc2NyaXB0PlxcblxcbjxzdHlsZSBzY29wZWQ+XFxuXFx0QGtleWZyYW1lcyBzaGFrZXtcXG5cXHQgICAgMTIuNSV7XFxuXFx0ICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNWRlZyk7XFxuXFx0ICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcblxcdCAgICB9XFxuXFx0ICAgIDM3LjUle1xcblxcdCAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTI1ZGVnKTtcXG5cXHQgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuXFx0ICAgIH1cXG5cXHQgICAgNjIuNSV7XFxuXFx0ICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNWRlZyk7XFxuXFx0ICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcblxcdCAgICB9XFxuXFx0ICAgIDc3LjUle1xcblxcdCAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTI1ZGVnKTtcXG5cXHQgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuXFx0ICAgIH1cXG5cXHQgICAgMTAwJXtcXG5cXHQgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xcblxcdCAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG5cXHQgICAgfVxcblxcdH1cXG5cXHRAa2V5ZnJhbWVzIHJvdGF0ZXtcXG5cXHRcXHRmcm9te3RyYW5zZm9ybTpyb3RhdGUoMCl9XFxuXFx0XFx0dG97dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfVxcblxcdH1cXG5cXHQuYW5pbWF0ZWRfd3JhcHtcXG5cXHRcXHR0ZXh0LWFsaWduOmNlbnRlcjtcXG5cXHRcXHRvdmVyZmxvdzpoaWRkZW47XFxuXFx0fVxcblxcdC5hbmltYXRlZF93cmFwLlNIQUtFLmFjdGl2ZXtcXG5cXHRcXHRhbmltYXRpb246c2hha2UgMS4ycyBpbmZpbml0ZSBsaW5lYXI7XFxuXFx0fVxcblxcdC5hbmltYXRlZF93cmFwLlJPVEFURS5hY3RpdmV7XFxuXFx0XFx0YW5pbWF0aW9uOnJvdGF0ZSAxLjJzIGluZmluaXRlIGxpbmVhcjtcXG5cXHR9XFxuXFx0LmFuaW1hdGVkX3dyYXAgaW1ne1xcblxcdFxcdG1heC13aWR0aDoxMDAlO1xcblxcdH1cXG48L3N0eWxlPlwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi02MGQ3M2Y2ZVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdmlldy93QW5pbWF0ZWQvd0FuaW1hdGVkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjkzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBzdGF0aWNDbGFzczogXCJwbHVnaW5fd3JhcFwiLFxuICAgICAgc3R5bGU6IF92bS5wYXJzZVBsdWdpblN0eWxlKFxuICAgICAgICBfdm0ucGx1Z2luRGF0YS5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgIF92bS5wbHVnaW5EYXRhLmJhY2tncm91bmRJbWFnZVxuICAgICAgKSxcbiAgICAgIGF0dHJzOiB7IGlkOiBfdm0ucGx1Z2luRGF0YS5pZGVudGl0eSB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFuaW1hdGVkX3dyYXBcIixcbiAgICAgICAgICBjbGFzczogX3ZtLnByYXNlQW5pbWF0ZWQoXG4gICAgICAgICAgICBfdm0ucGx1Z2luRGF0YS5zdWJQbHVnaW5UeXBlLFxuICAgICAgICAgICAgX3ZtLnBsdWdpbkRhdGEuYW5pbWF0ZVN0YXR1c1xuICAgICAgICAgICksXG4gICAgICAgICAgc3R5bGU6IHsgaGVpZ2h0OiBfdm0ucGx1Z2luRGF0YS5oZWlnaHQgKyBcInB4XCIgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBfdm0ucGFyc2VQcm9kdWN0SW1hZ2UoX3ZtLnBsdWdpbkRhdGEuYW5pbWF0ZUltYWdlKSB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICAgKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbnZhciBlc0V4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5leHBvcnQgZGVmYXVsdCBlc0V4cG9ydHNcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNjBkNzNmNmVcIiwgZXNFeHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02MGQ3M2Y2ZVwiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vdmlldy93QW5pbWF0ZWQvd0FuaW1hdGVkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBXQnV0dG9uIGZyb20gJy4vd0J1dHRvbi52dWUnO1xuXG5XQnV0dG9uLmluc3RhbGwgPSBmdW5jdGlvbihWdWUpe1xuXHRWdWUuY29tcG9uZW50KFdCdXR0b24ubmFtZSxXQnV0dG9uKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRXQnV0dG9uXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvd0J1dHRvbi93QnV0dG9uLmpzIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1jMDA2OTRiMlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi93QnV0dG9uLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbmV4cG9ydCAqIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dCdXR0b24udnVlXCJcbmltcG9ydCBfX3Z1ZV9zY3JpcHRfXyBmcm9tIFwiISFiYWJlbC1sb2FkZXIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi93QnV0dG9uLnZ1ZVwiXG4vKiB0ZW1wbGF0ZSAqL1xuaW1wb3J0IF9fdnVlX3RlbXBsYXRlX18gZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYzAwNjk0YjJcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWUsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3dCdXR0b24udnVlXCJcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LWMwMDY5NGIyXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZpZXcvd0J1dHRvbi93QnV0dG9uLnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1jMDA2OTRiMlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWMwMDY5NGIyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdmlldy93QnV0dG9uL3dCdXR0b24udnVlXG4vLyBtb2R1bGUgaWQgPSAyOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWMwMDY5NGIyXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3dCdXR0b24udnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCJiMjVkMGM0OFwiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYzAwNjk0YjJcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd0J1dHRvbi52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYzAwNjk0YjJcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd0J1dHRvbi52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtYzAwNjk0YjJcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3ZpZXcvd0J1dHRvbi93QnV0dG9uLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uYnV0dG9uX3dyYXBbZGF0YS12LWMwMDY5NGIyXXtcXG5cXHRcXHRtYXJnaW46YXV0bztcXG5cXHRcXHR0ZXh0LWFsaWduOmNlbnRlcjtcXG5cXHRcXHRmb250LXNpemU6MTZweDtcXG5cXHRcXHRiYWNrZ3JvdW5kLXNpemU6MTAwJSAxMDAlO1xcbiAgICBcXHQtd2Via2l0LWJveC1zaGFkb3c6IDAgMCA1cHggIzY2NjtcXG4gICAgXFx0ICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB4ICM2NjY7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVXNlcnMvbGluZ3VpYmluL0Rlc2t0b3Avd2VpcGFnZW5ldy92aWV3L3dCdXR0b24vdmlldy93QnV0dG9uL3dCdXR0b24udnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUErRUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsMEJBQUE7S0FDQSxpQ0FBQTthQUFBLHlCQUFBO0NBQ0FcIixcImZpbGVcIjpcIndCdXR0b24udnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjx0ZW1wbGF0ZT5cXG5cXHQ8ZGl2IDppZD1cXFwicGx1Z2luRGF0YS5pZGVudGl0eVxcXCIgY2xhc3M9XFxcInBsdWdpbl93cmFwXFxcIiA6c3R5bGU9XFxcInBhcnNlUGx1Z2luU3R5bGUocGx1Z2luRGF0YS5iYWNrZ3JvdW5kQ29sb3IscGx1Z2luRGF0YS5iYWNrZ3JvdW5kSW1hZ2UpXFxcIj5cXG5cXG5cXHRcXHQ8ZGl2IHYtZm9yPVxcXCJpdGVtIGluIHBsdWdpbkRhdGEuc3ViUGx1Z2luTGlzdFxcXCIgY2xhc3M9XFxcImJ1dHRvbl93cmFwXFxcIiBAY2xpY2s9XFxcImJ1dHRpb25FdmVudChpdGVtKVxcXCIgOnN0eWxlPVxcXCJwcmFzZUJ1dHRvblN0eWxlKGl0ZW0uY2hlY2tTdGF0dXMsaXRlbS5iYWNrZ3JvdW5kQ29sb3IsaXRlbS5waWNVcmwsaXRlbS5jb2xvcixpdGVtLndpZHRoLGl0ZW0uaGVpZ2h0LGl0ZW0uYm9yZGVyUmFkaXVzKVxcXCI+e3tpdGVtLnRleHR9fTwvZGl2PlxcblxcblxcdDwvZGl2PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5cXHRpbXBvcnQgdmlld01ldGhvZENvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvdmlld01ldGhvZENvbmZpZy5qcyc7XFxuXFxuXFx0bGV0IG1ldGhvZHMgPSB7fTtcXG5cXHRmb3IobGV0IGtleSBpbiB2aWV3TWV0aG9kQ29uZmlnKXtcXG5cXHRcXHRtZXRob2RzW2tleV0gPSB2aWV3TWV0aG9kQ29uZmlnW2tleV07XFxuXFx0fVxcblxcblxcdG1ldGhvZHNbXFxcInByYXNlQnV0dG9uU3R5bGVcXFwiXSA9IGZ1bmN0aW9uKGNoZWNrU3RhdHVzLGJhY2tncm91bmRDb2xvcixwaWNVcmwsY29sb3Isd2lkdGgsaGVpZ2h0LGJvcmRlclJhZGl1cyl7XFxuXFx0XFx0aWYoY2hlY2tTdGF0dXMgPT0gXFxcIk5PXFxcIil7XFxuXFx0XFx0XFx0cmV0dXJuIFxcXCJkaXNwbGF5Om5vbmVcXFwiO1xcblxcdFxcdH1cXG5cXHRcXHRyZXR1cm4gJ2JhY2tncm91bmRDb2xvcjonICsgYmFja2dyb3VuZENvbG9yICsgJztiYWNrZ3JvdW5kSW1hZ2U6dXJsKFxcXCInICsgcGljVXJsICsgJ1xcXCIpO2NvbG9yOicgKyBjb2xvciArICc7d2lkdGg6JyArIHdpZHRoICsgJ3B4O2hlaWdodDonICsgaGVpZ2h0ICsgJ3B4O2xpbmVIZWlnaHQ6JyAgKyBoZWlnaHQgKyAncHg7Ym9yZGVyUmFkaXVzOicgKyBib3JkZXJSYWRpdXMgKyAncHgnOyBcXHRcXHRcXHRcXHRcXG5cXHR9O1xcblxcblxcdG1ldGhvZHNbXFxcImNoYW5nZVdlaXBhZ2VEYXRhXFxcIl0gPSBmdW5jdGlvbihvcHRpb24pe1xcblxcdFxcdHRoaXMuJGVtaXQoXFxcImNoYW5nZXdlaXBhZ2VkYXRhXFxcIix7aWQ6b3B0aW9uLm1vZGVsSWQsa2V5Om9wdGlvbi5tb2RlbEtleSx2YWx1ZTpvcHRpb24ubW9kZWxWYWx1ZX0pO1xcblxcdH1cXG5cXG5cXHRtZXRob2RzW1xcXCJidXR0aW9uRXZlbnRcXFwiXSA9IGZ1bmN0aW9uKHN1YlBsdWdpbil7XFxuXFx0XFx0bGV0IF90aGlzID0gdGhpcztcXG5cXHRcXHRmb3IobGV0IGkgPSAwO2kgPCBzdWJQbHVnaW4udGhpcmRQbHVnaW5MaXN0Lmxlbmd0aDtpKyspe1xcblxcdFxcdFxcdGxldCB0aGlyZFBsdWdpbiA9IHN1YlBsdWdpbi50aGlyZFBsdWdpbkxpc3RbaV07XFx0XFx0XFx0XFxuXFx0XFx0XFx0aWYodGhpcmRQbHVnaW4uZXZlbnRUeXBlID09ICdMT0NBTCcgJiYgdGhpcmRQbHVnaW4ubW9kZWxJZCAmJiB0aGlyZFBsdWdpbi5tb2RlbEtleSl7XFxuXFx0XFx0XFx0XFx0X3RoaXMuY2hhbmdlV2VpcGFnZURhdGEodGhpcmRQbHVnaW4pO1xcblxcdFxcdFxcdH1lbHNlIGlmKHRoaXJkUGx1Z2luLmV2ZW50VHlwZSA9PSAnSFRUUCcgJiYgdGhpcmRQbHVnaW4uaHR0cFVybCl7XFxuXFx0XFx0XFx0XFx0JC5hamF4KHtcXG5cXHRcXHRcXHRcXHRcXHR0eXBlOlxcXCJwb3N0XFxcIixcXG5cXHRcXHRcXHRcXHRcXHR1cmw6dGhpcmRQbHVnaW4uaHR0cFVybCxcXG5cXHRcXHRcXHRcXHRcXHRkYXRhOnRoaXJkUGx1Z2luLmh0dHBEYXRhLFxcblxcdFxcdFxcdFxcdFxcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKXtcXG5cXHRcXHRcXHRcXHRcXHRcXHRmb3IobGV0IGogPSAwO2ogPCB0aGlyZFBsdWdpbi5mb3VydGhQbHVnaW5MaXN0Lmxlbmd0aDtqKyspe1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcdGxldCBmb3VydGhQbHVnaW4gPSB0aGlyZFBsdWdpbi5mb3VydGhQbHVnaW5MaXN0W2pdO1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcdGlmKGZvdXJ0aFBsdWdpbi5tb2RlbElkICYmIGZvdXJ0aFBsdWdpbi51c2VSZXF1ZXN0RGF0YSA9PSAnWUVTJyl7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Zm91cnRoUGx1Z2luW1xcXCJtb2RlbFZhbHVlXFxcIl0gPSByZXM7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Zm91cnRoUGx1Z2luW1xcXCJtb2RlbEtleVxcXCJdID0gXFxcInJlcXVlc3REYXRhXFxcIjtcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRfdGhpcy5jaGFuZ2VXZWlwYWdlRGF0YSh7bW9kZWxJZDpmb3VydGhQbHVnaW4ubW9kZWxJZCxtb2RlbEtleTpcXFwidW5Gb3JlYWNoXFxcIixtb2RlbFZhbHVlOmZhbHNlfSk7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0X3RoaXMuY2hhbmdlV2VpcGFnZURhdGEoZm91cnRoUGx1Z2luKTtcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHR9ZWxzZSBpZihmb3VydGhQbHVnaW4ubW9kZWxJZCAmJiBmb3VydGhQbHVnaW4ubW9kZWxLZXkgJiYgZm91cnRoUGx1Z2luLm1vZGVsVmFsdWUpe1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdF90aGlzLmNoYW5nZVdlaXBhZ2VEYXRhKGZvdXJ0aFBsdWdpbik7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0fVxcblxcdFxcdFxcdFxcdFxcdFxcdH1cXG5cXHRcXHRcXHRcXHRcXHR9XFxuXFx0XFx0XFx0XFx0fSlcXG5cXHRcXHRcXHR9XFxuXFx0XFx0fVxcdFxcdFxcblxcdH07XFxuXFxuXFx0ZXhwb3J0IGRlZmF1bHQge1xcblxcdFxcdG5hbWU6XFxcIndCdXR0b25cXFwiLFxcblxcdFxcdHByb3BzOntcXG5cXHRcXHRcXHRwbHVnaW5EYXRhOntcXG5cXHRcXHRcXHRcXHR0eXBlOiBPYmplY3QsXFxuICAgICAgXFx0XFx0XFx0ZGVmYXVsdDogZnVuY3Rpb24oKXtcXG4gICAgICBcXHRcXHRcXHRcXHRyZXR1cm4ge307XFxuICAgICAgXFx0XFx0XFx0fVxcblxcdFxcdFxcdH1cXG5cXHRcXHR9LFxcblxcdFxcdGRhdGEgKCkge1xcblxcdFxcdCAgICByZXR1cm4ge1xcblxcdFxcdCAgICAgIFxcblxcdFxcdCAgICB9XFxuXFx0XFx0fSxcXG5cXHRcXHRjcmVhdGVkOmZ1bmN0aW9uKCl7XFxuXFx0XFx0XFx0XFxuXFx0XFx0fSxcXG5cXHRcXHRtZXRob2RzOm1ldGhvZHNcXHRcXHRcXG5cXHR9XFxuPC9zY3JpcHQ+XFxuXFxuPHN0eWxlIHNjb3BlZD5cXG5cXHQuYnV0dG9uX3dyYXB7XFxuXFx0XFx0bWFyZ2luOmF1dG87XFxuXFx0XFx0dGV4dC1hbGlnbjpjZW50ZXI7XFxuXFx0XFx0Zm9udC1zaXplOjE2cHg7XFxuXFx0XFx0YmFja2dyb3VuZC1zaXplOjEwMCUgMTAwJTtcXG4gICAgXFx0Ym94LXNoYWRvdzogMCAwIDVweCAjNjY2O1xcblxcdH1cXG48L3N0eWxlPlwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1jMDA2OTRiMlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdmlldy93QnV0dG9uL3dCdXR0b24udnVlXG4vLyBtb2R1bGUgaWQgPSAyOThcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcInBsdWdpbl93cmFwXCIsXG4gICAgICBzdHlsZTogX3ZtLnBhcnNlUGx1Z2luU3R5bGUoXG4gICAgICAgIF92bS5wbHVnaW5EYXRhLmJhY2tncm91bmRDb2xvcixcbiAgICAgICAgX3ZtLnBsdWdpbkRhdGEuYmFja2dyb3VuZEltYWdlXG4gICAgICApLFxuICAgICAgYXR0cnM6IHsgaWQ6IF92bS5wbHVnaW5EYXRhLmlkZW50aXR5IH1cbiAgICB9LFxuICAgIF92bS5fbChfdm0ucGx1Z2luRGF0YS5zdWJQbHVnaW5MaXN0LCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICByZXR1cm4gX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b25fd3JhcFwiLFxuICAgICAgICAgIHN0eWxlOiBfdm0ucHJhc2VCdXR0b25TdHlsZShcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tTdGF0dXMsXG4gICAgICAgICAgICBpdGVtLmJhY2tncm91bmRDb2xvcixcbiAgICAgICAgICAgIGl0ZW0ucGljVXJsLFxuICAgICAgICAgICAgaXRlbS5jb2xvcixcbiAgICAgICAgICAgIGl0ZW0ud2lkdGgsXG4gICAgICAgICAgICBpdGVtLmhlaWdodCxcbiAgICAgICAgICAgIGl0ZW0uYm9yZGVyUmFkaXVzXG4gICAgICAgICAgKSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICBfdm0uYnV0dGlvbkV2ZW50KGl0ZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl92KF92bS5fcyhpdGVtLnRleHQpKV1cbiAgICAgIClcbiAgICB9KVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxudmFyIGVzRXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmV4cG9ydCBkZWZhdWx0IGVzRXhwb3J0c1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi1jMDA2OTRiMlwiLCBlc0V4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWMwMDY5NGIyXCIsXCJoYXNTY29wZWRcIjp0cnVlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi92aWV3L3dCdXR0b24vd0J1dHRvbi52dWVcbi8vIG1vZHVsZSBpZCA9IDI5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgd2VpUGFnZUNvbmZpZyBmcm9tICcuL3dlaVBhZ2VDb25maWcuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdHBhcnNlUGx1Z2luU2VsZWN0OmZ1bmN0aW9uKHBsdWdpblNlbGVjdCl7XG5cdFx0aWYocGx1Z2luU2VsZWN0KXtcblx0XHRcdHJldHVybiBcImN1cnJlbnRcIjtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBcIlwiO1xuXHRcdH1cblx0fSxcblx0cGFyc2VQbHVnaW5TdHlsZTpmdW5jdGlvbihiYWNrZ3JvdW5kQ29sb3IsYmFja2dyb3VuZEltYWdlKXtcblx0XHRpZihiYWNrZ3JvdW5kQ29sb3IgJiYgYmFja2dyb3VuZEltYWdlKXtcblx0XHRcdHJldHVybiAnYmFja2dyb3VuZENvbG9yOicgKyBiYWNrZ3JvdW5kQ29sb3IgKyAnO2JhY2tncm91bmRJbWFnZTp1cmwoXCInICsgYmFja2dyb3VuZEltYWdlICsgJ1wiKSc7XG5cdFx0fWVsc2UgaWYoYmFja2dyb3VuZENvbG9yKXtcblx0XHRcdHJldHVybiAnYmFja2dyb3VuZENvbG9yOicgKyBiYWNrZ3JvdW5kQ29sb3I7XG5cdFx0fWVsc2UgaWYoYmFja2dyb3VuZEltYWdlKXtcblx0XHRcdHJldHVybiAnYmFja2dyb3VuZEltYWdlOnVybChcIicgKyBiYWNrZ3JvdW5kSW1hZ2UgKyAnXCIpJztcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdH0sXG5cdHBhcnNlUHJvZHVjdEltYWdlOmZ1bmN0aW9uKHBpY1VybCl7XG5cdFx0aWYocGljVXJsKXtcblx0XHRcdHJldHVybiBwaWNVcmw7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gJy4vbGlicy9pbWcvcHJvZHVjdC5wbmcnO1xuXHRcdH1cblx0fSxcblx0cGFyc2VCYW5uZXJJbWFnZTpmdW5jdGlvbihwaWNVcmwpe1xuXHRcdGlmKHBpY1VybCl7XG5cdFx0XHRyZXR1cm4gcGljVXJsO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuICcuL2xpYnMvaW1nL2Jhbm5lci5wbmcnO1xuXHRcdH1cblx0fSxcblx0cGFyc2VVcGxvYWRJbWFnZTpmdW5jdGlvbihwaWNVcmwpe1xuXHRcdGlmKHBpY1VybCl7XG5cdFx0XHRyZXR1cm4gcGljVXJsO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuICcuL2xpYnMvaW1nL2FkZF9waWN0dXJlLnBuZyc7XG5cdFx0fVxuXHR9LFxuXHRjaGVja1RoZVNhbWU6ZnVuY3Rpb24oYSxiKXtcblx0XHRpZihhICYmIGIpe1xuXHRcdFx0aWYoYSA9PSBiKXtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKCFhICYmICFiKXtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy92aWV3TWV0aG9kQ29uZmlnLmpzIiwiaW1wb3J0IFdEaWFsb2cgZnJvbSAnLi93RGlhbG9nLnZ1ZSc7XG5cbldEaWFsb2cuaW5zdGFsbCA9IGZ1bmN0aW9uKFZ1ZSl7XG5cdFZ1ZS5jb21wb25lbnQoV0RpYWxvZy5uYW1lLFdEaWFsb2cpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdFdEaWFsb2dcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy93RGlhbG9nL3dEaWFsb2cuanMiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTMyMGUxNDVhXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3dEaWFsb2cudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xuZXhwb3J0ICogZnJvbSBcIiEhYmFiZWwtbG9hZGVyIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vd0RpYWxvZy52dWVcIlxuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dEaWFsb2cudnVlXCJcbi8qIHRlbXBsYXRlICovXG5pbXBvcnQgX192dWVfdGVtcGxhdGVfXyBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0zMjBlMTQ1YVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vd0RpYWxvZy52dWVcIlxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtMzIwZTE0NWFcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmlldy93RGlhbG9nL3dEaWFsb2cudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTMyMGUxNDVhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMzIwZTE0NWFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi92aWV3L3dEaWFsb2cvd0RpYWxvZy52dWVcbi8vIG1vZHVsZSBpZCA9IDMwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMzIwZTE0NWFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd0RpYWxvZy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjQ4MzIzMDUyXCIsIGNvbnRlbnQsIGZhbHNlLCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zMjBlMTQ1YVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi93RGlhbG9nLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zMjBlMTQ1YVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi93RGlhbG9nLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0zMjBlMTQ1YVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdmlldy93RGlhbG9nL3dEaWFsb2cudnVlXG4vLyBtb2R1bGUgaWQgPSAzMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5wbHVnaW5fd3JhcFtkYXRhLXYtMzIwZTE0NWFde1xcblxcdHBvc2l0aW9uOmFic29sdXRlO1xcblxcdGxlZnQ6NTAlO1xcblxcdHRvcDo1MCU7XFxuXFx0d2lkdGg6MjQwcHg7XFxuXFx0LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7XFxuXFx0ICAgIC1tcy10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7XFxuXFx0ICAgICAgICB0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7XFxufVxcbi5kaWFsb2dfd3JhcFtkYXRhLXYtMzIwZTE0NWFde1xcblxcdHRleHQtYWxpZ246Y2VudGVyO1xcblxcdHBhZGRpbmc6MTBweDtcXG59XFxuLmRpYWxvZ193cmFwIHBbZGF0YS12LTMyMGUxNDVhXXtcXG5cXHRwYWRkaW5nOjhweDtcXG59XFxuLmRpYWxvZ193cmFwIGltZ1tkYXRhLXYtMzIwZTE0NWFde1xcblxcdHdpZHRoOjE2MHB4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL2xpbmd1aWJpbi9EZXNrdG9wL3dlaXBhZ2VuZXcvdmlldy93RGlhbG9nL3ZpZXcvd0RpYWxvZy93RGlhbG9nLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBc0xBO0NBQ0Esa0JBQUE7Q0FDQSxTQUFBO0NBQ0EsUUFBQTtDQUNBLFlBQUE7Q0FDQSx1Q0FBQTtLQUFBLG1DQUFBO1NBQUEsK0JBQUE7Q0FDQTtBQUNBO0NBQ0Esa0JBQUE7Q0FDQSxhQUFBO0NBQ0E7QUFDQTtDQUNBLFlBQUE7Q0FDQTtBQUNBO0NBQ0EsWUFBQTtDQUNBXCIsXCJmaWxlXCI6XCJ3RGlhbG9nLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI8dGVtcGxhdGU+XFxuXFx0PGRpdiA6aWQ9XFxcInBsdWdpbkRhdGEuaWRlbnRpdHlcXFwiIGNsYXNzPVxcXCJwbHVnaW5fd3JhcFxcXCIgOnN0eWxlPVxcXCJwYXJzZVBsdWdpblN0eWxlKHBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLHBsdWdpbkRhdGEuYmFja2dyb3VuZEltYWdlKVxcXCI+XFxuXFx0XFx0PGRpdiB2LWZvcj1cXFwic3ViUGx1Z2luIGluIHBsdWdpbkRhdGEuc3ViUGx1Z2luTGlzdFxcXCIgY2xhc3M9XFxcImRpYWxvZ193cmFwXFxcIiB2LWlmPVxcXCJwYXJzZVN0YXR1cyhwbHVnaW5EYXRhLHN1YlBsdWdpbilcXFwiPlxcblxcdFxcdFxcdDxwIHYtZm9yPVxcXCJpdGVtIGluIHN1YlBsdWdpbi50aGlyZFBsdWdpbkxpc3RcXFwiPlxcblxcdFxcdFxcdFxcdDxpbWcgdi1pZj1cXFwiaXRlbS50eXBlID09ICdJTUFHRSdcXFwiIDpzcmM9XFxcInBhcnNlRm9ybURhdGEoaXRlbSxwbHVnaW5EYXRhLnJlcXVlc3REYXRhKVxcXCIgLz5cXG5cXHRcXHRcXHRcXHQ8c3BhbiB2LWVsc2UtaWY9XFxcIml0ZW0udHlwZSA9PSAnVEVYVCdcXFwiPnt7cGFyc2VGb3JtRGF0YShpdGVtLHBsdWdpbkRhdGEucmVxdWVzdERhdGEpfX08L3NwYW4+XFxuXFx0XFx0XFx0PC9wPlxcdFxcdFxcdFxcdFxcblxcdFxcdDwvZGl2PlxcblxcdDwvZGl2PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5cXHRpbXBvcnQgdmlld01ldGhvZENvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvdmlld01ldGhvZENvbmZpZy5qcyc7XFxuXFxuXFx0bGV0IG1ldGhvZHMgPSB7fTtcXG5cXHRmb3IobGV0IGtleSBpbiB2aWV3TWV0aG9kQ29uZmlnKXtcXG5cXHRcXHRtZXRob2RzW2tleV0gPSB2aWV3TWV0aG9kQ29uZmlnW2tleV07XFxuXFx0fVxcblxcblxcdGZ1bmN0aW9uIGNvbmRpdGlvblBhcnNlS2V5VmFsdWUoa2V5VmFsdWVTdHIpe1xcdFxcblxcdFxcdGxldCBzeW1ib2wgPSBcXFwiXFxcIjtcXG5cXHRcXHRsZXQga2V5ID0gXFxcIlxcXCI7XFxuXFx0XFx0bGV0IGtleUxpc3QgPSBcXFwiXFxcIjtcXG5cXHRcXHRsZXQgdmFsdWVTdHIgPSBcXFwiXFxcIjtcXG5cXHRcXHRsZXQgdmFsdWU7XFxuXFx0XFx0aWYoa2V5VmFsdWVTdHIuaW5kZXhPZihcXFwiPj1cXFwiKSA+PSAwKXtcXG5cXHRcXHRcXHRzeW1ib2wgPSBcXFwiPj1cXFwiO1xcblxcdFxcdH1lbHNlIGlmKGtleVZhbHVlU3RyLmluZGV4T2YoXFxcIjw9XFxcIikgPj0gMCl7XFxuXFx0XFx0XFx0c3ltYm9sID0gXFxcIjw9XFxcIjtcXG5cXHRcXHR9ZWxzZSBpZihrZXlWYWx1ZVN0ci5pbmRleE9mKFxcXCIhPVxcXCIpID49IDApe1xcblxcdFxcdFxcdHN5bWJvbCA9IFxcXCIhPVxcXCI7XFxuXFx0XFx0fWVsc2UgaWYoa2V5VmFsdWVTdHIuaW5kZXhPZihcXFwiPlxcXCIpID49IDApe1xcblxcdFxcdFxcdHN5bWJvbCA9IFxcXCI+XFxcIjtcXG5cXHRcXHR9ZWxzZSBpZihrZXlWYWx1ZVN0ci5pbmRleE9mKFxcXCI8XFxcIikgPj0gMCl7XFxuXFx0XFx0XFx0c3ltYm9sID0gXFxcIjxcXFwiO1xcblxcdFxcdH1lbHNle1xcblxcdFxcdFxcdHN5bWJvbCA9IFxcXCI9PVxcXCI7XFxuXFx0XFx0fVxcblxcdFxcdGxldCBzeW1ib2xJbmRleCA9IGtleVZhbHVlU3RyLmluZGV4T2Yoc3ltYm9sKTtcXG5cXHRcXHRpZihzeW1ib2xJbmRleCA+IDApe1xcblxcdFxcdFxcdGtleSA9IGtleVZhbHVlU3RyLnN1YnN0cmluZygwLHN5bWJvbEluZGV4KTtcXG5cXHRcXHRcXHR2YWx1ZVN0ciA9IGtleVZhbHVlU3RyLnN1YnN0cmluZyhzeW1ib2xJbmRleCArIHN5bWJvbC5sZW5ndGgpO1xcblxcdFxcdH1lbHNlIGlmKHN5bWJvbEluZGV4ID09IDApe1xcblxcdFxcdFxcdHZhbHVlU3RyID0ga2V5VmFsdWVTdHIuc3Vic3RyaW5nKHN5bWJvbEluZGV4ICsgc3ltYm9sLmxlbmd0aCk7XFxuXFx0XFx0fWVsc2V7XFxuXFx0XFx0XFx0dmFsdWVTdHIgPSBrZXlWYWx1ZVN0cjtcXG5cXHRcXHR9XFxuXFx0XFx0aWYoaXNOYU4oTnVtYmVyKHZhbHVlU3RyKSkpe1xcblxcdFxcdFxcdHZhbHVlID0gdmFsdWVTdHIucmVwbGFjZSgvJy9nLFxcXCJcXFwiKS5yZXBsYWNlKC9cXFwiL2csXFxcIlxcXCIpO1xcblxcdFxcdH1lbHNle1xcblxcdFxcdFxcdHZhbHVlID0gTnVtYmVyKHZhbHVlU3RyKTtcXG5cXHRcXHR9XFxuXFx0XFx0a2V5TGlzdCA9IGtleS5zcGxpdChcXFwiLlxcXCIpO1xcblxcdFxcdHJldHVybiB7XFxuXFx0XFx0XFx0c3ltYm9sOnN5bWJvbCxcXG5cXHRcXHRcXHRrZXlMaXN0OmtleUxpc3QsXFxuXFx0XFx0XFx0dmFsdWU6dmFsdWVcXG5cXHRcXHR9XFxuXFx0fVxcblxcblxcdGZ1bmN0aW9uIGNvbmRpdGlvblBhcnNlUmVzdWx0KGNvbmRpdGlvbil7XFxuXFx0XFx0bGV0IG9wZXJhdGlvbkxpc3QgPSBbXTtcXG5cXHRcXHRsZXQgc3ltYm9sTGlzdCA9IFtdO1xcblxcdFxcdGxldCB0ZW1wTGlzdCA9IGNvbmRpdGlvbi5zcGxpdChcXFwiJiZcXFwiKTtcXG5cXHRcXHRmb3IobGV0IGkgPSAwO2kgPCB0ZW1wTGlzdC5sZW5ndGg7aSsrKXtcXG5cXHRcXHRcXHRpZihpID4gMCl7XFxuXFx0XFx0XFx0XFx0c3ltYm9sTGlzdC5wdXNoKFxcXCImJlxcXCIpO1xcblxcdFxcdFxcdH1cXG5cXHRcXHRcXHRsZXQgdGVtcDJMaXN0ID0gdGVtcExpc3RbaV0uc3BsaXQoXFxcInx8XFxcIik7XFxuXFx0XFx0XFx0Zm9yKGxldCBqID0gMDtqIDwgdGVtcDJMaXN0Lmxlbmd0aDtqKyspe1xcblxcdFxcdFxcdFxcdG9wZXJhdGlvbkxpc3QucHVzaChjb25kaXRpb25QYXJzZUtleVZhbHVlKHRlbXAyTGlzdFtqXSkpO1xcblxcdFxcdFxcdFxcdGlmKGogPiAwKXtcXG5cXHRcXHRcXHRcXHRcXHRzeW1ib2xMaXN0LnB1c2goXFxcInx8XFxcIik7XFxuXFx0XFx0XFx0XFx0fVxcdFxcdFxcdFxcblxcdFxcdFxcdH1cXHRcXG5cXHRcXHR9XFxuXFx0XFx0cmV0dXJuIHtcXG5cXHRcXHRcXHRvcGVyYXRpb25MaXN0Om9wZXJhdGlvbkxpc3QsXFxuXFx0XFx0XFx0c3ltYm9sTGlzdDpzeW1ib2xMaXN0XFxuXFx0XFx0fVxcblxcdH1cXG5cXG5cXHRmdW5jdGlvbiBnZXRSZXF1ZXN0S2V5RGF0YShrZXlMaXN0LHJlcXVlc3REYXRhKXtcXG5cXHRcXHRsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXF1ZXN0RGF0YSkpO1xcblxcdFxcdGZvcihsZXQgaSA9IDA7aSA8IGtleUxpc3QubGVuZ3RoO2krKyl7XFxuXFx0XFx0XFx0aWYoa2V5TGlzdFtpXSl7XFxuXFx0XFx0XFx0XFx0cmVzdWx0ID0gcmVzdWx0W2tleUxpc3RbaV1dO1xcblxcdFxcdFxcdH1cXG5cXHRcXHR9XFxuXFx0XFx0cmV0dXJuIHJlc3VsdDtcXG5cXHR9XFxuXFxuXFx0ZnVuY3Rpb24gY2hlY2tKdWRnZUxpc3Qob3BlcmF0aW9uTGlzdCxyZXF1ZXN0RGF0YSl7XFxuXFx0XFx0bGV0IHJlc3VsdExpc3QgPSBbXTtcXG5cXHRcXHRmb3IobGV0IGkgPSAwO2kgPCBvcGVyYXRpb25MaXN0Lmxlbmd0aDtpKyspe1xcblxcdFxcdFxcdGxldCBrZXlWYWx1ZSA9IGdldFJlcXVlc3RLZXlEYXRhKG9wZXJhdGlvbkxpc3RbaV0ua2V5TGlzdCxyZXF1ZXN0RGF0YSk7XFxuXFx0XFx0XFx0c3dpdGNoKG9wZXJhdGlvbkxpc3RbaV0uc3ltYm9sKXtcXG5cXHRcXHRcXHRcXHRjYXNlICc+PSc6a2V5VmFsdWUgPj0gb3BlcmF0aW9uTGlzdFtpXS52YWx1ZT9yZXN1bHRMaXN0LnB1c2godHJ1ZSk6cmVzdWx0TGlzdC5wdXNoKGZhbHNlKTticmVhaztcXG5cXHRcXHRcXHRcXHRjYXNlICc8PSc6a2V5VmFsdWUgPD0gb3BlcmF0aW9uTGlzdFtpXS52YWx1ZT9yZXN1bHRMaXN0LnB1c2godHJ1ZSk6cmVzdWx0TGlzdC5wdXNoKGZhbHNlKTticmVhaztcXG5cXHRcXHRcXHRcXHRjYXNlICchPSc6a2V5VmFsdWUgIT0gb3BlcmF0aW9uTGlzdFtpXS52YWx1ZT9yZXN1bHRMaXN0LnB1c2godHJ1ZSk6cmVzdWx0TGlzdC5wdXNoKGZhbHNlKTticmVhaztcXG5cXHRcXHRcXHRcXHRjYXNlICc+JzprZXlWYWx1ZSA+IG9wZXJhdGlvbkxpc3RbaV0udmFsdWU/cmVzdWx0TGlzdC5wdXNoKHRydWUpOnJlc3VsdExpc3QucHVzaChmYWxzZSk7YnJlYWs7XFxuXFx0XFx0XFx0XFx0Y2FzZSAnPCc6a2V5VmFsdWUgPCBvcGVyYXRpb25MaXN0W2ldLnZhbHVlP3Jlc3VsdExpc3QucHVzaCh0cnVlKTpyZXN1bHRMaXN0LnB1c2goZmFsc2UpO2JyZWFrO1xcblxcdFxcdFxcdFxcdGRlZmF1bHQ6a2V5VmFsdWUgPT0gb3BlcmF0aW9uTGlzdFtpXS52YWx1ZT9yZXN1bHRMaXN0LnB1c2godHJ1ZSk6cmVzdWx0TGlzdC5wdXNoKGZhbHNlKTticmVhaztcXG5cXHRcXHRcXHR9XFxuXFx0XFx0fVxcblxcdFxcdHJldHVybiByZXN1bHRMaXN0O1xcblxcdH1cXG5cXG5cXHRmdW5jdGlvbiBjb25kaXRpb25PcGVyYXRpb24oY29uZGl0aW9uLHJlcXVlc3REYXRhKXtcXG5cXHRcXHRpZighY29uZGl0aW9uIHx8ICFyZXF1ZXN0RGF0YSl7XFxuXFx0XFx0XFx0cmV0dXJuIGZhbHNlO1xcblxcdFxcdH1cXG5cXHRcXHRsZXQgcmVzdWx0ID0gdHJ1ZTtcXG5cXHRcXHRsZXQgY29uZGl0aW9uUmVzID0gY29uZGl0aW9uUGFyc2VSZXN1bHQoY29uZGl0aW9uKTtcXG5cXHRcXHRsZXQganVkZ2VMaXN0ID0gY2hlY2tKdWRnZUxpc3QoY29uZGl0aW9uUmVzLm9wZXJhdGlvbkxpc3QscmVxdWVzdERhdGEpO1xcblxcdFxcdGZvcihsZXQgaSA9IDA7aSA8IGp1ZGdlTGlzdC5sZW5ndGg7aSsrKXtcXG5cXHRcXHRcXHRpZihpID09IDApe1xcblxcdFxcdFxcdFxcdHJlc3VsdCA9IGp1ZGdlTGlzdFtpXTtcXG5cXHRcXHRcXHR9ZWxzZSBpZihjb25kaXRpb25SZXMuc3ltYm9sTGlzdFtpXSl7XFxuXFx0XFx0XFx0XFx0c3dpdGNoKGNvbmRpdGlvblJlcy5zeW1ib2xMaXN0W2ldKXtcXG5cXHRcXHRcXHRcXHRcXHRjYXNlIFxcXCImJlxcXCI6IHJlc3VsdCA9IHJlc3VsdCAmJiBqdWRnZUxpc3RbaV07YnJlYWs7XFxuXFx0XFx0XFx0XFx0XFx0Y2FzZSBcXFwifHxcXFwiOiByZXN1bHQgPSByZXN1bHQgfHwganVkZ2VMaXN0W2ldO2JyZWFrO1xcblxcdFxcdFxcdFxcdH1cXG5cXHRcXHRcXHR9XFxuXFx0XFx0fVxcblxcdFxcdHJldHVybiByZXN1bHQ7XFxuXFx0fVxcblxcblxcdG1ldGhvZHNbXFxcInBhcnNlU3RhdHVzXFxcIl0gPSBmdW5jdGlvbihwbHVnaW5EYXRhLHN1YlBsdWdpbil7XFxuXFx0XFx0aWYocGx1Z2luRGF0YS51bkZvcmVhY2ggfHwgcGx1Z2luRGF0YS5pc09wZW4gPT0gJ05PJyl7XFxuXFx0XFx0XFx0cmV0dXJuIGZhbHNlO1xcblxcdFxcdH1cXG5cXG5cXHRcXHRpZihzdWJQbHVnaW4uY2hlY2tTdGF0dXMgPT0gJ1lFUycpe1xcblxcdFxcdFxcdGlmKGNvbmRpdGlvbk9wZXJhdGlvbihzdWJQbHVnaW4uY29uZGl0aW9uLHBsdWdpbkRhdGEucmVxdWVzdERhdGEpKXtcXG5cXHRcXHRcXHRcXHRwbHVnaW5EYXRhW1xcXCJ1bkZvcmVhY2hcXFwiXSA9IHRydWU7XFxuXFx0XFx0XFx0XFx0cmV0dXJuIHRydWU7XFxuXFx0XFx0XFx0fWVsc2V7XFxuXFx0XFx0XFx0XFx0cmV0dXJuIGZhbHNlO1xcblxcdFxcdFxcdH1cXG5cXHRcXHR9ZWxzZXtcXG5cXHRcXHRcXHRwbHVnaW5EYXRhW1xcXCJ1bkZvcmVhY2hcXFwiXSA9IHRydWU7IFxcblxcdFxcdFxcdHJldHVybiB0cnVlO1xcblxcdFxcdH1cXHRcXHRcXG5cXHR9XFxuXFxuXFx0bWV0aG9kc1tcXFwicGFyc2VGb3JtRGF0YVxcXCJdID0gZnVuY3Rpb24odGhpcmRQbHVnaW4scmVxdWVzdERhdGEpe1xcblxcdFxcdGlmKHRoaXJkUGx1Z2luLmtleSl7XFxuXFx0XFx0XFx0bGV0IGtleUxpc3QgPSB0aGlyZFBsdWdpbi5rZXkuc3BsaXQoXFxcIi5cXFwiKTtcXG5cXHRcXHRcXHRsZXQgdGVtcCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVxdWVzdERhdGEpKTtcXG5cXHRcXHRcXHRmb3IobGV0IGkgPSAwO2kgPCBrZXlMaXN0Lmxlbmd0aDtpKyspe1xcblxcdFxcdFxcdFxcdHRlbXAgPSB0ZW1wW2tleUxpc3RbaV1dO1xcblxcdFxcdFxcdH1cXG5cXHRcXHRcXHRyZXR1cm4gdGVtcDtcXG5cXHRcXHR9ZWxzZXtcXG5cXHRcXHRcXHRyZXR1cm4gdGhpcmRQbHVnaW4udmFsdWU7XFxuXFx0XFx0fVxcblxcdH1cXG5cXG5cXHRleHBvcnQgZGVmYXVsdCB7XFxuXFx0XFx0bmFtZTpcXFwid0RpYWxvZ1xcXCIsXFxuXFx0XFx0cHJvcHM6e1xcblxcdFxcdFxcdHBsdWdpbkRhdGE6e1xcblxcdFxcdFxcdFxcdHR5cGU6IE9iamVjdCxcXG4gICAgICBcXHRcXHRcXHRkZWZhdWx0OiBmdW5jdGlvbigpe1xcbiAgICAgIFxcdFxcdFxcdFxcdHJldHVybiB7fTtcXG4gICAgICBcXHRcXHRcXHR9XFxuXFx0XFx0XFx0fVxcblxcdFxcdH0sXFxuXFx0XFx0ZGF0YSAoKSB7XFxuXFx0XFx0ICAgIHJldHVybiB7XFxuXFx0XFx0ICAgICAgXFxuXFx0XFx0ICAgIH1cXG5cXHRcXHR9LFxcblxcdFxcdGNyZWF0ZWQ6ZnVuY3Rpb24oKXtcXG5cXHRcXHRcXHRcXG5cXHRcXHR9LFxcblxcdFxcdG1ldGhvZHM6bWV0aG9kc1xcdFxcdFxcblxcdH1cXG48L3NjcmlwdD5cXG5cXG48c3R5bGUgc2NvcGVkPlxcblxcdC5wbHVnaW5fd3JhcHtcXG5cXHRcXHRwb3NpdGlvbjphYnNvbHV0ZTtcXG5cXHRcXHRsZWZ0OjUwJTtcXG5cXHRcXHR0b3A6NTAlO1xcblxcdFxcdHdpZHRoOjI0MHB4O1xcblxcdFxcdHRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTtcXG5cXHR9XFxuXFx0LmRpYWxvZ193cmFwe1xcblxcdFxcdHRleHQtYWxpZ246Y2VudGVyO1xcblxcdFxcdHBhZGRpbmc6MTBweDtcXG5cXHR9XFxuXFx0LmRpYWxvZ193cmFwIHB7XFxuXFx0XFx0cGFkZGluZzo4cHg7XFxuXFx0fVxcblxcdC5kaWFsb2dfd3JhcCBpbWd7XFxuXFx0XFx0d2lkdGg6MTYwcHg7XFxuXFx0fVxcbjwvc3R5bGU+XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTMyMGUxNDVhXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi92aWV3L3dEaWFsb2cvd0RpYWxvZy52dWVcbi8vIG1vZHVsZSBpZCA9IDMwM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgc3RhdGljQ2xhc3M6IFwicGx1Z2luX3dyYXBcIixcbiAgICAgIHN0eWxlOiBfdm0ucGFyc2VQbHVnaW5TdHlsZShcbiAgICAgICAgX3ZtLnBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICBfdm0ucGx1Z2luRGF0YS5iYWNrZ3JvdW5kSW1hZ2VcbiAgICAgICksXG4gICAgICBhdHRyczogeyBpZDogX3ZtLnBsdWdpbkRhdGEuaWRlbnRpdHkgfVxuICAgIH0sXG4gICAgX3ZtLl9sKF92bS5wbHVnaW5EYXRhLnN1YlBsdWdpbkxpc3QsIGZ1bmN0aW9uKHN1YlBsdWdpbikge1xuICAgICAgcmV0dXJuIF92bS5wYXJzZVN0YXR1cyhfdm0ucGx1Z2luRGF0YSwgc3ViUGx1Z2luKVxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZGlhbG9nX3dyYXBcIiB9LFxuICAgICAgICAgICAgX3ZtLl9sKHN1YlBsdWdpbi50aGlyZFBsdWdpbkxpc3QsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFwicFwiLCBbXG4gICAgICAgICAgICAgICAgaXRlbS50eXBlID09IFwiSU1BR0VcIlxuICAgICAgICAgICAgICAgICAgPyBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogX3ZtLnBhcnNlRm9ybURhdGEoaXRlbSwgX3ZtLnBsdWdpbkRhdGEucmVxdWVzdERhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgOiBpdGVtLnR5cGUgPT0gXCJURVhUXCJcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnBhcnNlRm9ybURhdGEoaXRlbSwgX3ZtLnBsdWdpbkRhdGEucmVxdWVzdERhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIH0pXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG52YXIgZXNFeHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuZXhwb3J0IGRlZmF1bHQgZXNFeHBvcnRzXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTMyMGUxNDVhXCIsIGVzRXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMzIwZTE0NWFcIixcImhhc1Njb3BlZFwiOnRydWUsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3ZpZXcvd0RpYWxvZy93RGlhbG9nLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBXRGVjb3JhdGUgZnJvbSAnLi93RGVjb3JhdGUudnVlJztcblxuV0RlY29yYXRlLmluc3RhbGwgPSBmdW5jdGlvbihWdWUpe1xuXHRWdWUuY29tcG9uZW50KFdEZWNvcmF0ZS5uYW1lLFdEZWNvcmF0ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0V0RlY29yYXRlXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvd0RlY29yYXRlL3dEZWNvcmF0ZS5qcyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMWUyOWRjOWRcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vd0RlY29yYXRlLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbmV4cG9ydCAqIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dEZWNvcmF0ZS52dWVcIlxuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dEZWNvcmF0ZS52dWVcIlxuLyogdGVtcGxhdGUgKi9cbmltcG9ydCBfX3Z1ZV90ZW1wbGF0ZV9fIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTFlMjlkYzlkXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi93RGVjb3JhdGUudnVlXCJcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTFlMjlkYzlkXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZpZXcvd0RlY29yYXRlL3dEZWNvcmF0ZS52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMWUyOWRjOWRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0xZTI5ZGM5ZFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3ZpZXcvd0RlY29yYXRlL3dEZWNvcmF0ZS52dWVcbi8vIG1vZHVsZSBpZCA9IDMwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMWUyOWRjOWRcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd0RlY29yYXRlLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMGUwYjcwNDRcIiwgY29udGVudCwgZmFsc2UsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTFlMjlkYzlkXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3dEZWNvcmF0ZS52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMWUyOWRjOWRcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd0RlY29yYXRlLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0xZTI5ZGM5ZFwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdmlldy93RGVjb3JhdGUvd0RlY29yYXRlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwid0RlY29yYXRlLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTFlMjlkYzlkXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi92aWV3L3dEZWNvcmF0ZS93RGVjb3JhdGUudnVlXG4vLyBtb2R1bGUgaWQgPSAzMDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcInBsdWdpbl93cmFwXCIsXG4gICAgICBzdHlsZTogX3ZtLnBhcnNlRGVjb3JhdGVTdHlsZShcbiAgICAgICAgX3ZtLnBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICBfdm0ucGx1Z2luRGF0YS5iYWNrZ3JvdW5kSW1hZ2UsXG4gICAgICAgIF92bS5wbHVnaW5EYXRhLndpZHRoLFxuICAgICAgICBfdm0ucGx1Z2luRGF0YS5oZWlnaHQsXG4gICAgICAgIF92bS5wbHVnaW5EYXRhLnRvcCxcbiAgICAgICAgX3ZtLnBsdWdpbkRhdGEubGVmdCxcbiAgICAgICAgX3ZtLnBsdWdpbkRhdGEuYm9yZGVyUmFkaXVzXG4gICAgICApLFxuICAgICAgYXR0cnM6IHsgaWQ6IF92bS5wbHVnaW5EYXRhLmlkZW50aXR5IH1cbiAgICB9LFxuICAgIFtfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImRlY29yYXRlX3dyYXBcIiB9KV1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbnZhciBlc0V4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5leHBvcnQgZGVmYXVsdCBlc0V4cG9ydHNcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMWUyOWRjOWRcIiwgZXNFeHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0xZTI5ZGM5ZFwiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vdmlldy93RGVjb3JhdGUvd0RlY29yYXRlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBXTmF2IGZyb20gJy4vd05hdi52dWUnO1xuXG5XTmF2Lmluc3RhbGwgPSBmdW5jdGlvbihWdWUpe1xuXHRWdWUuY29tcG9uZW50KFdOYXYubmFtZSxXTmF2KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRXTmF2XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvd05hdi93TmF2LmpzIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0xMWFkYjg1YVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi93TmF2LnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbmV4cG9ydCAqIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dOYXYudnVlXCJcbmltcG9ydCBfX3Z1ZV9zY3JpcHRfXyBmcm9tIFwiISFiYWJlbC1sb2FkZXIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi93TmF2LnZ1ZVwiXG4vKiB0ZW1wbGF0ZSAqL1xuaW1wb3J0IF9fdnVlX3RlbXBsYXRlX18gZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTFhZGI4NWFcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWUsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3dOYXYudnVlXCJcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTExYWRiODVhXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZpZXcvd05hdi93TmF2LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0xMWFkYjg1YVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTExYWRiODVhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdmlldy93TmF2L3dOYXYudnVlXG4vLyBtb2R1bGUgaWQgPSAzMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTExYWRiODVhXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3dOYXYudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCJjZTRkYmY2Y1wiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTFhZGI4NWFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd05hdi52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTFhZGI4NWFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd05hdi52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtMTFhZGI4NWFcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3ZpZXcvd05hdi93TmF2LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4ubmF2X3dyYXAgLm5hdl9saXN0W2RhdGEtdi0xMWFkYjg1YV17XFxuICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBwYWRkaW5nOiA3cHggMDtcXG4gICAtbXMtZmxleC1wYWNrOiBkaXN0cmlidXRlO1xcbiAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG59XFxuLm5hdl93cmFwIC5uYXZfbGlzdCAubmF2X2l0ZW1bZGF0YS12LTExYWRiODVhXXtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBsaW5lLWhlaWdodDogMjdweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMjdweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjojZmZmO1xcbiAgICBwYWRkaW5nOiAwIDIwcHg7XFxufVxcbi5uYXZfcGljdHVyZV93cmFwIC5uYXZfbGlzdFtkYXRhLXYtMTFhZGI4NWFde1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC1tcy1mbGV4LXBhY2s6IGRpc3RyaWJ1dGU7XFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG59XFxuLm5hdl9waWN0dXJlX3dyYXAgLm5hdl9saXN0IC5uYXZfaXRlbVtkYXRhLXYtMTFhZGI4NWFde1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDcuNXB4IDA7XFxufVxcbi5uYXZfcGljdHVyZV93cmFwIC5uYXZfbGlzdCAubmF2X2l0ZW0gLm5hdl9waWN0dXJlX3BhZ2VbZGF0YS12LTExYWRiODVhXXtcXG4gICAgd2lkdGg6IDUycHg7XFxuICAgIGhlaWdodDogNTJweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMjZweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4ubmF2X3BpY3R1cmVfd3JhcCAubmF2X2xpc3QgLm5hdl9pdGVtIC5uYXZfcGljdHVyZV9wYWdlIC5pdGVtX2ltYWdlW2RhdGEtdi0xMWFkYjg1YV17XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGhlaWdodDoxMDAlO1xcbn1cXG4ubmF2X3BpY3R1cmVfd3JhcCAubmF2X2xpc3QgLm5hdl9pdGVtIC5uYXZfcGljdHVyZV90ZXh0W2RhdGEtdi0xMWFkYjg1YV17XFxuICAgIHBhZGRpbmctdG9wOiA3cHg7XFxuICAgIGNvbG9yOiAjMzMzO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcbi5uYXZfcGljdHVyZV93cmFwIC5uYXZfbGlzdCAubmF2X2l0ZW0uY3VycmVudCAubmF2X3BpY3R1cmVfcGFnZSAuaXRlbV9pbWFnZVtkYXRhLXYtMTFhZGI4NWFde1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzUsMTU2LDI0MywwLjIpO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL2xpbmd1aWJpbi9EZXNrdG9wL3dlaXBhZ2VuZXcvdmlldy93TmF2L3ZpZXcvd05hdi93TmF2LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBdUVBO0dBQ0EscUJBQUE7R0FBQSxxQkFBQTtHQUFBLGNBQUE7R0FDQSxlQUFBO0dBQ0EsMEJBQUE7T0FBQSw4QkFBQTtDQUNBO0FBQ0E7SUFDQSxtQkFBQTtJQUNBLGtCQUFBO0lBQ0Esb0JBQUE7SUFDQSxzQkFBQTtJQUNBLGdCQUFBO0NBQ0E7QUFDQTtJQUNBLHFCQUFBO0lBQUEscUJBQUE7SUFBQSxjQUFBO0lBQ0EsMEJBQUE7UUFBQSw4QkFBQTtDQUNBO0FBQ0E7SUFDQSxtQkFBQTtJQUNBLGlCQUFBO0NBQ0E7QUFDQTtJQUNBLFlBQUE7SUFDQSxhQUFBO0lBQ0Esb0JBQUE7SUFDQSwwQkFBQTtJQUNBLGFBQUE7SUFDQSxpQkFBQTtDQUNBO0FBQ0E7SUFDQSxXQUFBO0lBQ0EsWUFBQTtDQUNBO0FBQ0E7SUFDQSxpQkFBQTtJQUNBLFlBQUE7SUFDQSxnQkFBQTtDQUNBO0FBQ0E7Q0FDQSx1Q0FBQTtDQUNBXCIsXCJmaWxlXCI6XCJ3TmF2LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI8dGVtcGxhdGU+XFxuXFx0PGRpdiA6aWQ9XFxcInBsdWdpbkRhdGEuaWRlbnRpdHlcXFwiIGNsYXNzPVxcXCJwbHVnaW5fd3JhcFxcXCIgOnN0eWxlPVxcXCJwYXJzZVBsdWdpblN0eWxlKHBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLHBsdWdpbkRhdGEuYmFja2dyb3VuZEltYWdlKVxcXCI+XFxuXFx0XFx0PGRpdiB2LWlmPVxcXCJwbHVnaW5EYXRhLnN1YlBsdWdpblR5cGUgPT0gJ1RFWFQnXFxcIiBjbGFzcz1cXFwibmF2X3dyYXBcXFwiPlxcblxcdCAgICAgICAgPHVsIGNsYXNzPVxcXCJuYXZfbGlzdCBjaGlsZF9saXN0IGZvbnRfMTRcXFwiPlxcblxcdCAgICAgICAgICAgIDxsaSB2LWZvcj1cXFwiaXRlbSBpbiBwbHVnaW5EYXRhLnN1YlBsdWdpbkxpc3RcXFwiIDpkYXRhLXBsdWdpblV1aWQ9XFxcIml0ZW0ucGx1Z2luVXVpZFxcXCIgY2xhc3M9XFxcIm5hdl9pdGVtIHN1YlBsdWdpbl93cmFwXFxcIiA6Y2xhc3M9XFxcInBhcnNlUGx1Z2luU2VsZWN0KGl0ZW0ucGx1Z2luU2VsZWN0KVxcXCIgPlxcblxcdCAgICAgICAgICAgIFxcdDxhIGRyYWdnYWJsZT1cXFwiZmFsc2VcXFwiIDpocmVmPVxcXCJpdGVtLmxpbmtVcmxcXFwiIGNsYXNzPVxcXCJibG9ja19saW5rXFxcIj57e3BhcnNlTmF2TmFtZShpdGVtLm5hbWUpfX08L2E+XFxuXFx0ICAgICAgICBcXHQ8L2xpPlxcblxcdCAgICAgICAgPC91bD5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgdi1lbHNlLWlmPVxcXCJwbHVnaW5EYXRhLnN1YlBsdWdpblR5cGUgPT0gJ0lNQUdFJ1xcXCIgY2xhc3M9XFxcIm5hdl9waWN0dXJlX3dyYXBcXFwiPlxcblxcdCAgICAgICAgPHVsIGNsYXNzPVxcXCJuYXZfbGlzdCBjaGlsZF9saXN0IGZvbnRfMTRcXFwiPlxcblxcdCAgICAgICAgICAgIDxsaSB2LWZvcj1cXFwiaXRlbSBpbiBwbHVnaW5EYXRhLnN1YlBsdWdpbkxpc3RcXFwiIDpkYXRhLXBsdWdpblV1aWQ9XFxcIml0ZW0ucGx1Z2luVXVpZFxcXCIgY2xhc3M9XFxcIm5hdl9pdGVtIHN1YlBsdWdpbl93cmFwXFxcIiA6Y2xhc3M9XFxcInBhcnNlUGx1Z2luU2VsZWN0KGl0ZW0ucGx1Z2luU2VsZWN0KVxcXCIgPlxcblxcdFxcdCAgICAgICAgICAgIDxhIGRyYWdnYWJsZT1cXFwiZmFsc2VcXFwiIDpocmVmPVxcXCJpdGVtLmxpbmtVcmxcXFwiIGNsYXNzPVxcXCJibG9ja19saW5rXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJuYXZfcGljdHVyZV9wYWdlXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aW1nIDpzcmM9XFxcInBhcnNlTmF2UGljKGl0ZW0ucGljVXJsKVxcXCIgYWx0PVxcXCJcXFwiIGNsYXNzPVxcXCJpdGVtX2ltYWdlXFxcIiBkcmFnZ2FibGU9XFxcImZhbHNlXFxcIiAvPlxcblxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdFxcdDxwIGNsYXNzPVxcXCJuYXZfcGljdHVyZV90ZXh0XFxcIj57e3BhcnNlTmF2TmFtZShpdGVtLm5hbWUpfX08L3A+XFxuXFx0XFx0XFx0XFx0XFx0PC9hPlxcblxcdFxcdCAgICAgICAgPC9saT5cXG5cXHQgICAgICAgIDwvdWw+XFxuXFx0ICAgIDwvZGl2PlxcblxcdDwvZGl2PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5cXHRpbXBvcnQgdmlld01ldGhvZENvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvdmlld01ldGhvZENvbmZpZy5qcyc7XFxuXFxuXFx0bGV0IG1ldGhvZHMgPSB7fTtcXG5cXHRmb3IobGV0IGtleSBpbiB2aWV3TWV0aG9kQ29uZmlnKXtcXG5cXHRcXHRtZXRob2RzW2tleV0gPSB2aWV3TWV0aG9kQ29uZmlnW2tleV07XFxuXFx0fVxcblxcblxcdG1ldGhvZHNbXFxcInBhcnNlTmF2TmFtZVxcXCJdID0gZnVuY3Rpb24obmFtZSl7XFxuXFx0XFx0aWYobmFtZSl7XFxuXFx0XFx0ICAgcmV0dXJuIG5hbWU7XFxuXFx0ICAgXFx0fWVsc2V7XFxuXFx0XFx0ICAgcmV0dXJuICflr7zoiKonO1xcblxcdCAgIFxcdH1cXG5cXHR9O1xcblxcblxcdG1ldGhvZHNbXFxcInBhcnNlTmF2UGljXFxcIl0gPSBmdW5jdGlvbihwaWNVcmwpe1xcblxcdFxcdGlmKHBpY1VybCl7XFxuXFx0XFx0XFx0cmV0dXJuIHBpY1VybDtcXG5cXHRcXHR9ZWxzZXtcXG5cXHRcXHRcXHRyZXR1cm4gJy4vbGlicy9pbWcvaWNvbl9uYXZfYWRkcGljLnBuZyc7XFxuXFx0XFx0fVxcblxcdH07XFxuXFxuXFx0ZXhwb3J0IGRlZmF1bHQge1xcblxcdFxcdG5hbWU6XFxcIndOYXZcXFwiLFxcblxcdFxcdHByb3BzOntcXG5cXHRcXHRcXHRwbHVnaW5EYXRhOntcXG5cXHRcXHRcXHRcXHR0eXBlOiBPYmplY3QsXFxuICAgICAgXFx0XFx0XFx0ZGVmYXVsdDogZnVuY3Rpb24oKXtcXG4gICAgICBcXHRcXHRcXHRcXHRyZXR1cm4ge307XFxuICAgICAgXFx0XFx0XFx0fVxcblxcdFxcdFxcdH1cXG5cXHRcXHR9LFxcblxcdFxcdGRhdGEgKCkge1xcblxcdFxcdCAgICByZXR1cm4ge1xcblxcdFxcdCAgICAgIFxcblxcdFxcdCAgICB9XFxuXFx0XFx0fSxcXG5cXHRcXHRjcmVhdGVkOmZ1bmN0aW9uKCl7XFxuXFx0XFx0XFx0XFxuXFx0XFx0fSxcXG5cXHRcXHRtZXRob2RzOm1ldGhvZHNcXHRcXHRcXG5cXHR9XFxuPC9zY3JpcHQ+XFxuXFxuPHN0eWxlIHNjb3BlZD5cXG5cXHQubmF2X3dyYXAgLm5hdl9saXN0e1xcblxcdCAgIGRpc3BsYXk6IGZsZXg7XFxuXFx0ICAgcGFkZGluZzogN3B4IDA7XFxuXFx0ICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuXFx0fVxcblxcdC5uYXZfd3JhcCAubmF2X2xpc3QgLm5hdl9pdGVte1xcblxcdCAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0ICAgIGxpbmUtaGVpZ2h0OiAyN3B4O1xcblxcdCAgICBib3JkZXItcmFkaXVzOiAyN3B4O1xcblxcdCAgICBiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7XFxuXFx0ICAgIHBhZGRpbmc6IDAgMjBweDtcXG5cXHR9XFxuXFx0Lm5hdl9waWN0dXJlX3dyYXAgLm5hdl9saXN0e1xcblxcdCAgICBkaXNwbGF5OiBmbGV4O1xcblxcdCAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG5cXHR9XFxuXFx0Lm5hdl9waWN0dXJlX3dyYXAgLm5hdl9saXN0IC5uYXZfaXRlbXtcXG5cXHQgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcblxcdCAgICBwYWRkaW5nOiA3LjVweCAwO1xcblxcdH1cXG5cXHQubmF2X3BpY3R1cmVfd3JhcCAubmF2X2xpc3QgLm5hdl9pdGVtIC5uYXZfcGljdHVyZV9wYWdle1xcblxcdCAgICB3aWR0aDogNTJweDtcXG5cXHQgICAgaGVpZ2h0OiA1MnB4O1xcblxcdCAgICBib3JkZXItcmFkaXVzOiAyNnB4O1xcblxcdCAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY4O1xcblxcdCAgICBtYXJnaW46IGF1dG87XFxuXFx0ICAgIG92ZXJmbG93OiBoaWRkZW47XFxuXFx0fVxcblxcdC5uYXZfcGljdHVyZV93cmFwIC5uYXZfbGlzdCAubmF2X2l0ZW0gLm5hdl9waWN0dXJlX3BhZ2UgLml0ZW1faW1hZ2V7XFxuXFx0ICAgIHdpZHRoOjEwMCU7XFxuXFx0ICAgIGhlaWdodDoxMDAlO1xcblxcdH1cXG5cXHQubmF2X3BpY3R1cmVfd3JhcCAubmF2X2xpc3QgLm5hdl9pdGVtIC5uYXZfcGljdHVyZV90ZXh0e1xcblxcdCAgICBwYWRkaW5nLXRvcDogN3B4O1xcblxcdCAgICBjb2xvcjogIzMzMztcXG5cXHQgICAgZm9udC1zaXplOiAxNHB4O1xcblxcdH1cXG5cXHQubmF2X3BpY3R1cmVfd3JhcCAubmF2X2xpc3QgLm5hdl9pdGVtLmN1cnJlbnQgLm5hdl9waWN0dXJlX3BhZ2UgLml0ZW1faW1hZ2V7XFxuXFx0XFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgzNSwxNTYsMjQzLDAuMik7XFxuXFx0fVxcbjwvc3R5bGU+XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTExYWRiODVhXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi92aWV3L3dOYXYvd05hdi52dWVcbi8vIG1vZHVsZSBpZCA9IDMxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgc3RhdGljQ2xhc3M6IFwicGx1Z2luX3dyYXBcIixcbiAgICAgIHN0eWxlOiBfdm0ucGFyc2VQbHVnaW5TdHlsZShcbiAgICAgICAgX3ZtLnBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICBfdm0ucGx1Z2luRGF0YS5iYWNrZ3JvdW5kSW1hZ2VcbiAgICAgICksXG4gICAgICBhdHRyczogeyBpZDogX3ZtLnBsdWdpbkRhdGEuaWRlbnRpdHkgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX3ZtLnBsdWdpbkRhdGEuc3ViUGx1Z2luVHlwZSA9PSBcIlRFWFRcIlxuICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibmF2X3dyYXBcIiB9LCBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ1bFwiLFxuICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm5hdl9saXN0IGNoaWxkX2xpc3QgZm9udF8xNFwiIH0sXG4gICAgICAgICAgICAgIF92bS5fbChfdm0ucGx1Z2luRGF0YS5zdWJQbHVnaW5MaXN0LCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgXCJsaVwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJuYXZfaXRlbSBzdWJQbHVnaW5fd3JhcFwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzczogX3ZtLnBhcnNlUGx1Z2luU2VsZWN0KGl0ZW0ucGx1Z2luU2VsZWN0KSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLXBsdWdpblV1aWRcIjogaXRlbS5wbHVnaW5VdWlkIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJsb2NrX2xpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRyYWdnYWJsZTogXCJmYWxzZVwiLCBocmVmOiBpdGVtLmxpbmtVcmwgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnBhcnNlTmF2TmFtZShpdGVtLm5hbWUpKSldXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgOiBfdm0ucGx1Z2luRGF0YS5zdWJQbHVnaW5UeXBlID09IFwiSU1BR0VcIlxuICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJuYXZfcGljdHVyZV93cmFwXCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJuYXZfbGlzdCBjaGlsZF9saXN0IGZvbnRfMTRcIiB9LFxuICAgICAgICAgICAgICAgIF92bS5fbChfdm0ucGx1Z2luRGF0YS5zdWJQbHVnaW5MaXN0LCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdl9pdGVtIHN1YlBsdWdpbl93cmFwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IF92bS5wYXJzZVBsdWdpblNlbGVjdChpdGVtLnBsdWdpblNlbGVjdCksXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJkYXRhLXBsdWdpblV1aWRcIjogaXRlbS5wbHVnaW5VdWlkIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJsb2NrX2xpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZHJhZ2dhYmxlOiBcImZhbHNlXCIsIGhyZWY6IGl0ZW0ubGlua1VybCB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm5hdl9waWN0dXJlX3BhZ2VcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaXRlbV9pbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBfdm0ucGFyc2VOYXZQaWMoaXRlbS5waWNVcmwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogXCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcIm5hdl9waWN0dXJlX3RleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0ucGFyc2VOYXZOYW1lKGl0ZW0ubmFtZSkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgOiBfdm0uX2UoKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbnZhciBlc0V4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5leHBvcnQgZGVmYXVsdCBlc0V4cG9ydHNcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMTFhZGI4NWFcIiwgZXNFeHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0xMWFkYjg1YVwiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vdmlldy93TmF2L3dOYXYudnVlXG4vLyBtb2R1bGUgaWQgPSAzMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFdSaWNodGV4dCBmcm9tICcuL3dSaWNodGV4dC52dWUnO1xuXG5XUmljaHRleHQuaW5zdGFsbCA9IGZ1bmN0aW9uKFZ1ZSl7XG5cdFZ1ZS5jb21wb25lbnQoV1JpY2h0ZXh0Lm5hbWUsV1JpY2h0ZXh0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRXUmljaHRleHRcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy93UmljaHRleHQvd1JpY2h0ZXh0LmpzIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wMmUwMDBkNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi93UmljaHRleHQudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xuZXhwb3J0ICogZnJvbSBcIiEhYmFiZWwtbG9hZGVyIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vd1JpY2h0ZXh0LnZ1ZVwiXG5pbXBvcnQgX192dWVfc2NyaXB0X18gZnJvbSBcIiEhYmFiZWwtbG9hZGVyIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vd1JpY2h0ZXh0LnZ1ZVwiXG4vKiB0ZW1wbGF0ZSAqL1xuaW1wb3J0IF9fdnVlX3RlbXBsYXRlX18gZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDJlMDAwZDZcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWUsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3dSaWNodGV4dC52dWVcIlxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtMDJlMDAwZDZcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmlldy93UmljaHRleHQvd1JpY2h0ZXh0LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0wMmUwMDBkNlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTAyZTAwMGQ2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdmlldy93UmljaHRleHQvd1JpY2h0ZXh0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wMmUwMDBkNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi93UmljaHRleHQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCJjYTBkNzExOFwiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDJlMDAwZDZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd1JpY2h0ZXh0LnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wMmUwMDBkNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi93UmljaHRleHQudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTAyZTAwMGQ2XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi92aWV3L3dSaWNodGV4dC93UmljaHRleHQudnVlXG4vLyBtb2R1bGUgaWQgPSAzMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5yaWNodGV4dF93cmFwW2RhdGEtdi0wMmUwMDBkNl0ge1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZFxcbn1cXG4ucmljaHRleHRfd3JhcCBpbWdbZGF0YS12LTAyZTAwMGQ2XSB7XFxuICAgIG1heC13aWR0aDogMTAwJVxcbn1cXG4ucmljaHRleHRfd3JhcCB0YWJsZVtkYXRhLXYtMDJlMDAwZDZdIHtcXG4gICAgd2lkdGg6IDEwMCVcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9Vc2Vycy9saW5ndWliaW4vRGVza3RvcC93ZWlwYWdlbmV3L3ZpZXcvd1JpY2h0ZXh0L3ZpZXcvd1JpY2h0ZXh0L3dSaWNodGV4dC52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQXVDQTtJQUNBLGFBQUE7SUFDQSxxQkFBQTtDQUNBO0FBQ0E7SUFDQSxlQUFBO0NBQ0E7QUFDQTtJQUNBLFdBQUE7Q0FDQVwiLFwiZmlsZVwiOlwid1JpY2h0ZXh0LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI8dGVtcGxhdGU+XFxuXFx0PGRpdiA6aWQ9XFxcInBsdWdpbkRhdGEuaWRlbnRpdHlcXFwiIGNsYXNzPVxcXCJwbHVnaW5fd3JhcFxcXCIgOnN0eWxlPVxcXCJ7YmFja2dyb3VuZENvbG9yOnBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLGJhY2tncm91bmRJbWFnZTondXJsKCcgKyBwbHVnaW5EYXRhLmJhY2tncm91bmRJbWFnZSArICcpJyxwYWRkaW5nOnBsdWdpbkRhdGEubWFyZ2luICsgJ3B4J31cXFwiPlxcblxcdFxcdDxkaXYgY2xhc3M9XFxcInJpY2h0ZXh0X3dyYXBcXFwiIHYtaHRtbD1cXFwicGx1Z2luRGF0YS50eHRIdG1sXFxcIiA6c3R5bGU9XFxcIntiYWNrZ3JvdW5kQ29sb3I6cGx1Z2luRGF0YS5jb250ZW50Q29sb3IsYm9yZGVyUmFkaXVzOnBsdWdpbkRhdGEuYm9yZGVyUmFkaXVzICsgJ3B4J31cXFwiPlxcblxcdCAgICAgICAge3twbHVnaW5EYXRhLnR4dEh0bWx9fVxcblxcdCAgICA8L2Rpdj5cXG5cXHQ8L2Rpdj5cXG48L3RlbXBsYXRlPlxcblxcbjxzY3JpcHQ+XFxuXFx0aW1wb3J0IHZpZXdNZXRob2RDb25maWcgZnJvbSAnLi4vLi4vY29uZmlnL3ZpZXdNZXRob2RDb25maWcuanMnO1xcblxcblxcdGxldCBtZXRob2RzID0ge307XFxuXFx0Zm9yKGxldCBrZXkgaW4gdmlld01ldGhvZENvbmZpZyl7XFxuXFx0XFx0bWV0aG9kc1trZXldID0gdmlld01ldGhvZENvbmZpZ1trZXldO1xcblxcdH1cXG5cXHRcXG5cXHRleHBvcnQgZGVmYXVsdCB7XFxuXFx0XFx0bmFtZTpcXFwid1JpY2h0ZXh0XFxcIixcXG5cXHRcXHRwcm9wczp7XFxuXFx0XFx0XFx0cGx1Z2luRGF0YTp7XFxuXFx0XFx0XFx0XFx0dHlwZTogT2JqZWN0LFxcbiAgICAgIFxcdFxcdFxcdGRlZmF1bHQ6IGZ1bmN0aW9uKCl7XFxuICAgICAgXFx0XFx0XFx0XFx0cmV0dXJuIHt9O1xcbiAgICAgIFxcdFxcdFxcdH1cXG5cXHRcXHRcXHR9XFxuXFx0XFx0fSxcXG5cXHRcXHRkYXRhICgpIHtcXG5cXHRcXHQgICAgcmV0dXJuIHtcXG5cXHRcXHQgICAgICBcXG5cXHRcXHQgICAgfVxcblxcdFxcdH0sXFxuXFx0XFx0Y3JlYXRlZDpmdW5jdGlvbigpe1xcblxcdFxcdFxcdFxcblxcdFxcdH0sXFxuXFx0XFx0bWV0aG9kczptZXRob2RzXFx0XFx0XFxuXFx0fVxcbjwvc2NyaXB0PlxcblxcbjxzdHlsZSBzY29wZWQ+XFxuLnJpY2h0ZXh0X3dyYXAge1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZFxcbn1cXG4ucmljaHRleHRfd3JhcCBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDEwMCVcXG59XFxuLnJpY2h0ZXh0X3dyYXAgdGFibGUge1xcbiAgICB3aWR0aDogMTAwJVxcbn1cXG48L3N0eWxlPlwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0wMmUwMDBkNlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdmlldy93UmljaHRleHQvd1JpY2h0ZXh0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBzdGF0aWNDbGFzczogXCJwbHVnaW5fd3JhcFwiLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBfdm0ucGx1Z2luRGF0YS5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJ1cmwoXCIgKyBfdm0ucGx1Z2luRGF0YS5iYWNrZ3JvdW5kSW1hZ2UgKyBcIilcIixcbiAgICAgICAgcGFkZGluZzogX3ZtLnBsdWdpbkRhdGEubWFyZ2luICsgXCJweFwiXG4gICAgICB9LFxuICAgICAgYXR0cnM6IHsgaWQ6IF92bS5wbHVnaW5EYXRhLmlkZW50aXR5IH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwicmljaHRleHRfd3JhcFwiLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IF92bS5wbHVnaW5EYXRhLmNvbnRlbnRDb2xvcixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogX3ZtLnBsdWdpbkRhdGEuYm9yZGVyUmFkaXVzICsgXCJweFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkb21Qcm9wczogeyBpbm5lckhUTUw6IF92bS5fcyhfdm0ucGx1Z2luRGF0YS50eHRIdG1sKSB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgIFwiICsgX3ZtLl9zKF92bS5wbHVnaW5EYXRhLnR4dEh0bWwpICsgXCJcXG4gICAgXCIpXVxuICAgICAgKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbnZhciBlc0V4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5leHBvcnQgZGVmYXVsdCBlc0V4cG9ydHNcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMDJlMDAwZDZcIiwgZXNFeHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0wMmUwMDBkNlwiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vdmlldy93UmljaHRleHQvd1JpY2h0ZXh0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBXU3BhY2UgZnJvbSAnLi93U3BhY2UudnVlJztcblxuV1NwYWNlLmluc3RhbGwgPSBmdW5jdGlvbihWdWUpe1xuXHRWdWUuY29tcG9uZW50KFdTcGFjZS5uYW1lLFdTcGFjZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0V1NwYWNlXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvd1NwYWNlL3dTcGFjZS5qcyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDNlY2NiYjNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vd1NwYWNlLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbmV4cG9ydCAqIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dTcGFjZS52dWVcIlxuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dTcGFjZS52dWVcIlxuLyogdGVtcGxhdGUgKi9cbmltcG9ydCBfX3Z1ZV90ZW1wbGF0ZV9fIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTQzZWNjYmIzXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi93U3BhY2UudnVlXCJcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTQzZWNjYmIzXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZpZXcvd1NwYWNlL3dTcGFjZS52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNDNlY2NiYjNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi00M2VjY2JiM1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3ZpZXcvd1NwYWNlL3dTcGFjZS52dWVcbi8vIG1vZHVsZSBpZCA9IDMyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDNlY2NiYjNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd1NwYWNlLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiNDBiZDkxM2ZcIiwgY29udGVudCwgZmFsc2UsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQzZWNjYmIzXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3dTcGFjZS52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDNlY2NiYjNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd1NwYWNlLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi00M2VjY2JiM1wiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdmlldy93U3BhY2Uvd1NwYWNlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwid1NwYWNlLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTQzZWNjYmIzXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi92aWV3L3dTcGFjZS93U3BhY2UudnVlXG4vLyBtb2R1bGUgaWQgPSAzMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcInBsdWdpbl93cmFwXCIsXG4gICAgICBzdHlsZTogX3ZtLnBhcnNlUGx1Z2luU3R5bGUoXG4gICAgICAgIF92bS5wbHVnaW5EYXRhLmJhY2tncm91bmRDb2xvcixcbiAgICAgICAgX3ZtLnBsdWdpbkRhdGEuYmFja2dyb3VuZEltYWdlXG4gICAgICApLFxuICAgICAgYXR0cnM6IHsgaWQ6IF92bS5wbHVnaW5EYXRhLmlkZW50aXR5IH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwic3BhY2Vfd3JhcFwiLFxuICAgICAgICBzdHlsZTogeyBoZWlnaHQ6IF92bS5wbHVnaW5EYXRhLmhlaWdodCArIFwicHhcIiB9XG4gICAgICB9KVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbnZhciBlc0V4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5leHBvcnQgZGVmYXVsdCBlc0V4cG9ydHNcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNDNlY2NiYjNcIiwgZXNFeHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi00M2VjY2JiM1wiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vdmlldy93U3BhY2Uvd1NwYWNlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBXVGltZXIgZnJvbSAnLi93VGltZXIudnVlJztcblxuV1RpbWVyLmluc3RhbGwgPSBmdW5jdGlvbihWdWUpe1xuXHRWdWUuY29tcG9uZW50KFdUaW1lci5uYW1lLFdUaW1lcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0V1RpbWVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvd1RpbWVyL3dUaW1lci5qcyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzgxMGYyNWFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vd1RpbWVyLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbmV4cG9ydCAqIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dUaW1lci52dWVcIlxuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3dUaW1lci52dWVcIlxuLyogdGVtcGxhdGUgKi9cbmltcG9ydCBfX3Z1ZV90ZW1wbGF0ZV9fIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTc4MTBmMjVhXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi93VGltZXIudnVlXCJcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTc4MTBmMjVhXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZpZXcvd1RpbWVyL3dUaW1lci52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNzgxMGYyNWFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi03ODEwZjI1YVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3ZpZXcvd1RpbWVyL3dUaW1lci52dWVcbi8vIG1vZHVsZSBpZCA9IDMyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzgxMGYyNWFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd1RpbWVyLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMWQxYmM4ZDVcIiwgY29udGVudCwgZmFsc2UsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTc4MTBmMjVhXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3dUaW1lci52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzgxMGYyNWFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vd1RpbWVyLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi03ODEwZjI1YVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdmlldy93VGltZXIvd1RpbWVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4udGltZXJfd3JhcFtkYXRhLXYtNzgxMGYyNWFde1xcblxcdHRleHQtYWxpZ246Y2VudGVyO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL2xpbmd1aWJpbi9EZXNrdG9wL3dlaXBhZ2VuZXcvdmlldy93VGltZXIvdmlldy93VGltZXIvd1RpbWVyLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBMkZBO0NBQ0Esa0JBQUE7Q0FDQVwiLFwiZmlsZVwiOlwid1RpbWVyLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI8dGVtcGxhdGU+XFxuXFx0PGRpdiA6aWQ9XFxcInBsdWdpbkRhdGEuaWRlbnRpdHlcXFwiIGNsYXNzPVxcXCJwbHVnaW5fd3JhcFxcXCIgOnN0eWxlPVxcXCJwYXJzZVBsdWdpblN0eWxlKHBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLHBsdWdpbkRhdGEuYmFja2dyb3VuZEltYWdlKVxcXCI+XFxuXFx0XFx0XFxuXFx0XFx0PGRpdiA6c3R5bGU9XFxcInBhcnNlVGltZXJTdHlsZShwbHVnaW5EYXRhLmlzU2hvdyxwbHVnaW5EYXRhLmhlaWdodClcXFwiPlxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInRpbWVyX3dyYXBcXFwiPnt7cGx1Z2luRGF0YS5zaG93VGltZX19PC9kaXY+XFxuXFx0XFx0PC9kaXY+XFxuXFxuXFx0PC9kaXY+XFxuPC90ZW1wbGF0ZT5cXG5cXG48c2NyaXB0PlxcblxcdGltcG9ydCB2aWV3TWV0aG9kQ29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy92aWV3TWV0aG9kQ29uZmlnLmpzJztcXG5cXHRpbXBvcnQgY2xvY2tKcyBmcm9tICcuLi8uLi9jb250cm9sZXIvY2xvY2suanMnO1xcdFxcblxcblxcdGxldCBtZXRob2RzID0ge307XFxuXFx0Zm9yKGxldCBrZXkgaW4gdmlld01ldGhvZENvbmZpZyl7XFxuXFx0XFx0bWV0aG9kc1trZXldID0gdmlld01ldGhvZENvbmZpZ1trZXldO1xcblxcdH1cXG5cXG5cXHRtZXRob2RzW1xcXCJwYXJzZVRpbWVyU3R5bGVcXFwiXSA9IGZ1bmN0aW9uKGlzU2hvdyxoZWlnaHQpe1xcblxcdFxcdGlmKGlzU2hvdyA9PSAnWUVTJyl7XFxuXFx0XFx0XFx0cmV0dXJuICdoZWlnaHQ6JyArIGhlaWdodCArICdweDtsaW5lSGVpZ2h0OicgKyBoZWlnaHQgKyAncHgnO1xcblxcdFxcdH1lbHNle1xcblxcdFxcdFxcdHJldHVybiAnZGlhcGxheTpub25lJztcXG5cXHRcXHR9XFxuXFx0fVxcblxcblxcdG1ldGhvZHNbXFxcInBhcnNlVGltZVBsdWdpblxcXCJdID0gZnVuY3Rpb24ocGx1Z2luRGF0YSxzdGFydEluZGV4KXtcXG5cXHRcXHRsZXQgX3RoaXMgPSB0aGlzO1xcblxcdFxcdGZvcihsZXQgaSA9IHN0YXJ0SW5kZXg7aSA8IHBsdWdpbkRhdGEuc3ViUGx1Z2luTGlzdC5sZW5ndGg7aSsrKXtcXG5cXHRcXHRcXHRsZXQgdGltZU9iaiA9IHBsdWdpbkRhdGEuc3ViUGx1Z2luTGlzdFtpXTtcXG5cXHRcXHRcXHRpZih0aW1lT2JqLnRpbWUpe1xcblxcdFxcdFxcdFxcdGxldCB0aW1lID0gbmV3IERhdGUodGltZU9iai50aW1lKS5nZXRUaW1lKCk7XFxuXFx0XFx0XFx0XFx0bGV0IG5vd1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcXG5cXHRcXHRcXHRcXHRpZih0aW1lIC0gbm93VGltZSA+PSAxMDAwKXtcXG5cXHRcXHRcXHRcXHRcXHRjbG9ja0pzLmNsb2NrKHtcXG5cXHRcXHRcXHRcXHRcXHRcXHRpbml0VGltZTp0aW1lT2JqLnRpbWUsXFxuXFx0XFx0XFx0XFx0XFx0XFx0Y2FsbGJhY2s6ZnVuY3Rpb24oZGF5LGhvdXIsbWludXRlLHNlY29uZCl7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0bGV0IHNob3dUaW1lID0gZGF5ICsgXFxcIuWkqVxcXCIgKyBob3VyICsgXFxcIuaXtlxcXCIgKyBtaW51dGUgKyBcXFwi5YiGXFxcIiArIHNlY29uZCArIFxcXCLnp5JcXFwiO1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcdF90aGlzLmNoYW5nZVdlaXBhZ2VEYXRhKHtpZDpwbHVnaW5EYXRhLmlkZW50aXR5LGtleTpcXFwic2hvd1RpbWVcXFwiLHZhbHVlOnNob3dUaW1lfSk7XFxuXFx0XFx0XFx0XFx0XFx0XFx0fSxcXG5cXHRcXHRcXHRcXHRcXHRcXHR0aW1lT3V0Q2FsbGJhY2s6ZnVuY3Rpb24oKXtcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRfdGhpcy5wYXJzZVRpbWVQbHVnaW4ocGx1Z2luRGF0YSxpKzEpO1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcdF90aGlzLnRpbWVFdmVudCh0aW1lT2JqKTtcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHR9XFxuXFx0XFx0XFx0XFx0XFx0fSk7XFxuXFx0XFx0XFx0XFx0XFx0YnJlYWs7XFxuXFx0XFx0XFx0XFx0fWVsc2V7XFxuXFx0XFx0XFx0XFx0XFx0X3RoaXMudGltZUV2ZW50KHRpbWVPYmopO1xcblxcdFxcdFxcdFxcdH1cXG5cXHRcXHRcXHR9XFxuXFx0XFx0fVxcblxcdH07XFxuXFxuXFx0bWV0aG9kc1tcXFwidGltZUV2ZW50XFxcIl0gPSBmdW5jdGlvbih0aW1lT2JqKXtcXG5cXHRcXHRmb3IobGV0IGkgPSAwO2kgPCB0aW1lT2JqLnRoaXJkUGx1Z2luTGlzdC5sZW5ndGg7aSsrKXtcXG5cXHRcXHRcXHR0aGlzLmNoYW5nZVdlaXBhZ2VEYXRhKHtcXG5cXHRcXHRcXHRcXHRpZDp0aW1lT2JqLnRoaXJkUGx1Z2luTGlzdFtpXS5tb2RlbElkLFxcblxcdFxcdFxcdFxcdGtleTp0aW1lT2JqLnRoaXJkUGx1Z2luTGlzdFtpXS5tb2RlbEtleSxcXG5cXHRcXHRcXHRcXHR2YWx1ZTp0aW1lT2JqLnRoaXJkUGx1Z2luTGlzdFtpXS5tb2RlbFZhbHVlXFxuXFx0XFx0XFx0fSk7XFxuXFx0XFx0fVxcblxcdH1cXG5cXG5cXHRtZXRob2RzW1xcXCJjaGFuZ2VXZWlwYWdlRGF0YVxcXCJdID0gZnVuY3Rpb24ob3B0aW9uKXtcXG5cXHRcXHR0aGlzLiRlbWl0KFxcXCJjaGFuZ2V3ZWlwYWdlZGF0YVxcXCIsb3B0aW9uKTtcXG5cXHR9XFxuXFx0XFxuXFx0ZXhwb3J0IGRlZmF1bHQge1xcblxcdFxcdG5hbWU6XFxcIndUaW1lclxcXCIsXFxuXFx0XFx0cHJvcHM6e1xcblxcdFxcdFxcdHBsdWdpbkRhdGE6e1xcblxcdFxcdFxcdFxcdHR5cGU6IE9iamVjdCxcXG4gICAgICBcXHRcXHRcXHRkZWZhdWx0OiBmdW5jdGlvbigpe1xcbiAgICAgIFxcdFxcdFxcdFxcdHJldHVybiB7fTtcXG4gICAgICBcXHRcXHRcXHR9XFxuXFx0XFx0XFx0fVxcblxcdFxcdH0sXFxuXFx0XFx0ZGF0YSAoKSB7XFxuXFx0XFx0ICAgIHJldHVybiB7XFxuXFx0XFx0ICAgICAgXFxuXFx0XFx0ICAgIH1cXG5cXHRcXHR9LFxcblxcdFxcdGNyZWF0ZWQ6ZnVuY3Rpb24oKXtcXHRcXHRcXG5cXHRcXHRcXHR0aGlzLnBhcnNlVGltZVBsdWdpbih0aGlzLnBsdWdpbkRhdGEsMCk7XFxuXFx0XFx0fSxcXG5cXHRcXHRtZXRob2RzOm1ldGhvZHNcXHRcXHRcXG5cXHR9XFxuPC9zY3JpcHQ+XFxuXFxuPHN0eWxlIHNjb3BlZD5cXG5cXHQudGltZXJfd3JhcHtcXG5cXHRcXHR0ZXh0LWFsaWduOmNlbnRlcjtcXG5cXHR9XFxuPC9zdHlsZT5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNzgxMGYyNWFcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3ZpZXcvd1RpbWVyL3dUaW1lci52dWVcbi8vIG1vZHVsZSBpZCA9IDMyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgc3RhdGljQ2xhc3M6IFwicGx1Z2luX3dyYXBcIixcbiAgICAgIHN0eWxlOiBfdm0ucGFyc2VQbHVnaW5TdHlsZShcbiAgICAgICAgX3ZtLnBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICBfdm0ucGx1Z2luRGF0YS5iYWNrZ3JvdW5kSW1hZ2VcbiAgICAgICksXG4gICAgICBhdHRyczogeyBpZDogX3ZtLnBsdWdpbkRhdGEuaWRlbnRpdHkgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdHlsZTogX3ZtLnBhcnNlVGltZXJTdHlsZShcbiAgICAgICAgICAgIF92bS5wbHVnaW5EYXRhLmlzU2hvdyxcbiAgICAgICAgICAgIF92bS5wbHVnaW5EYXRhLmhlaWdodFxuICAgICAgICAgIClcbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGltZXJfd3JhcFwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnBsdWdpbkRhdGEuc2hvd1RpbWUpKVxuICAgICAgICAgIF0pXG4gICAgICAgIF1cbiAgICAgIClcbiAgICBdXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG52YXIgZXNFeHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuZXhwb3J0IGRlZmF1bHQgZXNFeHBvcnRzXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTc4MTBmMjVhXCIsIGVzRXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNzgxMGYyNWFcIixcImhhc1Njb3BlZFwiOnRydWUsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3ZpZXcvd1RpbWVyL3dUaW1lci52dWVcbi8vIG1vZHVsZSBpZCA9IDMyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9tb2JpbGUuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vbW9iaWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vbW9iaWxlLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbW9iaWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gMzMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIucGx1Z2luX3dyYXB7XFxuXFx0YmFja2dyb3VuZC1zaXplOjEwMCUgMTAwJTtcXG5cXHRvdmVyZmxvdzpoaWRkZW47XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliIS4vbW9iaWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gMzMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydCBkZWZhdWx0IHtcblx0ZGF0YTone1widGl0bGVcIjpcIlwiLFwiZGVzY3JcIjpcIlwiLFwiYmFja2dyb3VuZENvbG9yXCI6XCJcIixcInBpY1VybFwiOlwiXCIsXCJyZW1hcmtcIjpcIlwiLFwid2VpUGFnZUlkXCI6XCJcIixcInBsdWdpbkluZGV4XCI6MTAwNSxcInBsdWdpbkxpc3RcIjpbe1wicGx1Z2luSWRcIjpcIlwiLFwiaWRlbnRpdHlcIjpcIk0xMDAxXCIsXCJiYWNrZ3JvdW5kQ29sb3JcIjpcIlwiLFwiYmFja2dyb3VuZEltYWdlXCI6XCJcIixcInBsdWdpblR5cGVcIjpcIk5BVlwiLFwic3ViUGx1Z2luVHlwZVwiOlwiVEVYVFwiLFwic3ViUGx1Z2luTGlzdFwiOlt7XCJwbHVnaW5Db21tb25JZFwiOlwiXCIsXCJzdWJQbHVnaW5JZFwiOlwiXCIsXCJpZGVudGl0eVwiOlwiTTEwMDJcIixcIm5hbWVcIjpcIjFcIixcInBpY1VybFwiOlwiXCIsXCJzaG93UGljVXJsXCI6XCJcIixcImxpbmtUeXBlXCI6XCJDVVNUT01cIixcImJ1aXpLZXlcIjpcIlwiLFwiYnVpek5hbWVcIjpcIlwiLFwibGlua1VybFwiOlwiXCJ9XX0se1wicGx1Z2luSWRcIjpcIlwiLFwiaWRlbnRpdHlcIjpcIk0xMDAzXCIsXCJiYWNrZ3JvdW5kQ29sb3JcIjpcIlwiLFwiYmFja2dyb3VuZEltYWdlXCI6XCJcIixcInBsdWdpblR5cGVcIjpcIkJVVFRPTlwiLFwic3ViUGx1Z2luTGlzdFwiOlt7XCJzdWJQbHVnaW5JZFwiOlwiXCIsXCJpZGVudGl0eVwiOlwiTTEwMDRcIixcImNoZWNrU3RhdHVzXCI6XCJZRVNcIixcImJhY2tncm91bmRDb2xvclwiOlwiXCIsXCJwaWNVcmxcIjpcIlwiLFwidGV4dFwiOlwiYnV0XCIsXCJjb2xvclwiOlwiXCIsXCJ3aWR0aFwiOjEwMCxcImhlaWdodFwiOjM2LFwiYm9yZGVyUmFkaXVzXCI6XCJcIixcInRoaXJkUGx1Z2luTGlzdFwiOlt7XCJ0aGlyZFBsdWdpbklkXCI6XCJcIixcImlkZW50aXR5XCI6XCJNMTAwNVwiLFwiZXZlbnRUeXBlXCI6XCJMT0NBTFwiLFwibmFtZVwiOlwiXCIsXCJtb2RlbElkXCI6XCJNMTAwMSxNMTAwMlwiLFwibW9kZWxLZXlcIjpcIm5hbWVcIixcIm1vZGVsVmFsdWVcIjpcIjJcIixcIm1vZGVsVHlwZVwiOlwiTkFWXCIsXCJtb2RlbFN1YlR5cGVcIjpcInN1YlBsdWdpbkxpc3RcIixcImh0dHBVcmxcIjpcIlwiLFwiaHR0cERhdGFcIjpcIlwiLFwiaHR0cFR5cGVcIjpcImdldFwiLFwiZm91cnRoUGx1Z2luTGlzdFwiOltdfV19XX1dfSdcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kYXRhLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICB9XG4gICAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gICAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gICAgfVxuICAgIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICAgIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gJ1wiJyArIHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpICsgJ1wiJ1xuICAgIH1cblxuICAgIHJldHVybiB1cmxcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8v5b6u6aG16Z2i6YWN572u5paH5Lu2XG5leHBvcnQgZGVmYXVsdCB7XG5cdFx0XG5cdFx0Ly/lvJXmk47phY3nva5cblx0XHRlbmdpbmVDb25maWc6e1xuXHRcdFx0cGx1Z2luOlwicGx1Z2luTGlzdFwiLFx0XHRcdC8v5o+S5Lu2XG5cdFx0XHRzdWJQbHVnaW46XCJzdWJQbHVnaW5MaXN0XCIsXHRcdC8v5qyh57qn5o+S5Lu2XG5cdFx0XHR0aGlyZFBsdWdpbjpcInRoaXJkUGx1Z2luTGlzdFwiLCBcdC8v56ys5LiJ57qn5o+S5Lu2XG5cdFx0XHRmb3VydGhQbHVnaW46XCJmb3VydGhQbHVnaW5MaXN0XCJcdC8v56ys5Zub57qn5o+S5Lu2XG5cdFx0fSxcblx0XHRcblx0XHQvL+ivt+axguWcsOWdgOmFjee9rlxuXHRcdHVybENvbmZpZzp7XG5cdFx0XHR1cGxvYWRJbWFnZTpcIi9waWMvdXBsb2FkXCIsXG5cdFx0XHRwcm9kdWN0TGlzdCA6IFwiLi9saWJzL2pzb24vcHJvZHVjdExpc3QuanNvblwiLFxuXHRcdFx0d2VpUGFnZUxpc3QgOiBcIi4vbGlicy9qc29uL3dlaVBhZ2VMaXN0Lmpzb25cIixcblx0XHRcdGNhdGVnb3J5TGlzdCA6IFwiLi9saWJzL2pzb24vY2xhc3NpZnlMaXN0Lmpzb25cIixcblx0XHRcdGdyb3VwTGlzdCA6IFwiLi9saWJzL2pzb24vZ3JvdXBMaXN0Lmpzb25cIixcblx0XHRcdGZ1bmN0aW9uTGlzdDpcIi4vbGlicy9qc29uL2Z1bmN0aW9uTGlzdC5qc29uXCJcblx0XHR9LFxuXHRcdFxuXHRcdC8v54m55q6K6YWN572uXG5cdFx0c3BlY2lhbENvbmZpZzp7XG5cdFx0XHRwbHVnaW5JZEtleTpcImlkZW50aXR5XCIsXG5cdFx0XHRwbHVnaW5JZFRhYjpcIk1cIlxuXHRcdH1cbn07XG5cdFx0XG5cdFx0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3dlaVBhZ2VDb25maWcuanMiLCI8dGVtcGxhdGU+XG5cdDxkaXYgOmlkPVwicGx1Z2luRGF0YS5pZGVudGl0eVwiIGNsYXNzPVwicGx1Z2luX3dyYXBcIiA6c3R5bGU9XCJwYXJzZVBsdWdpblN0eWxlKHBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLHBsdWdpbkRhdGEuYmFja2dyb3VuZEltYWdlKVwiPlxuXHRcdDxkaXYgY2xhc3M9XCJhbmltYXRlZF93cmFwXCIgOmNsYXNzPVwicHJhc2VBbmltYXRlZChwbHVnaW5EYXRhLnN1YlBsdWdpblR5cGUscGx1Z2luRGF0YS5hbmltYXRlU3RhdHVzKVwiIDpzdHlsZT1cIntoZWlnaHQ6cGx1Z2luRGF0YS5oZWlnaHQgKyAncHgnfVwiPlxuXHRcdFx0PGltZyA6c3JjPVwicGFyc2VQcm9kdWN0SW1hZ2UocGx1Z2luRGF0YS5hbmltYXRlSW1hZ2UpXCIgLz5cblx0XHQ8L2Rpdj5cblx0PC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuXHRpbXBvcnQgdmlld01ldGhvZENvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvdmlld01ldGhvZENvbmZpZy5qcyc7XG5cblx0bGV0IG1ldGhvZHMgPSB7fTtcblx0Zm9yKGxldCBrZXkgaW4gdmlld01ldGhvZENvbmZpZyl7XG5cdFx0bWV0aG9kc1trZXldID0gdmlld01ldGhvZENvbmZpZ1trZXldO1xuXHR9XG5cblx0bWV0aG9kc1tcInByYXNlQW5pbWF0ZWRcIl0gPSBmdW5jdGlvbihzdWJQbHVnaW5UeXBlLGFuaW1hdGVTdGF0dXMpe1xuXHRcdGlmKGFuaW1hdGVTdGF0dXMgPT0gJ1NUQVJUJyl7XG5cdFx0XHRyZXR1cm4gc3ViUGx1Z2luVHlwZSArICcgYWN0aXZlJztcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBzdWJQbHVnaW5UeXBlO1xuXHRcdH1cblx0fTtcblxuXHRleHBvcnQgZGVmYXVsdCB7XG5cdFx0bmFtZTpcIndBbmltYXRlZFwiLFxuXHRcdHByb3BzOntcblx0XHRcdHBsdWdpbkRhdGE6e1xuXHRcdFx0XHR0eXBlOiBPYmplY3QsXG4gICAgICBcdFx0XHRkZWZhdWx0OiBmdW5jdGlvbigpe1xuICAgICAgXHRcdFx0XHRyZXR1cm4ge307XG4gICAgICBcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkYXRhICgpIHtcblx0XHQgICAgcmV0dXJuIHtcblx0XHQgICAgICBcblx0XHQgICAgfVxuXHRcdH0sXG5cdFx0Y3JlYXRlZDpmdW5jdGlvbigpe1xuXHRcdFx0XG5cdFx0fSxcblx0XHRtZXRob2RzOm1ldGhvZHNcdFx0XG5cdH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXHRAa2V5ZnJhbWVzIHNoYWtle1xuXHQgICAgMTIuNSV7XG5cdCAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjVkZWcpO1xuXHQgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XG5cdCAgICB9XG5cdCAgICAzNy41JXtcblx0ICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMjVkZWcpO1xuXHQgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XG5cdCAgICB9XG5cdCAgICA2Mi41JXtcblx0ICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNWRlZyk7XG5cdCAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcblx0ICAgIH1cblx0ICAgIDc3LjUle1xuXHQgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yNWRlZyk7XG5cdCAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcblx0ICAgIH1cblx0ICAgIDEwMCV7XG5cdCAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XG5cdCAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcblx0ICAgIH1cblx0fVxuXHRAa2V5ZnJhbWVzIHJvdGF0ZXtcblx0XHRmcm9te3RyYW5zZm9ybTpyb3RhdGUoMCl9XG5cdFx0dG97dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfVxuXHR9XG5cdC5hbmltYXRlZF93cmFwe1xuXHRcdHRleHQtYWxpZ246Y2VudGVyO1xuXHRcdG92ZXJmbG93OmhpZGRlbjtcblx0fVxuXHQuYW5pbWF0ZWRfd3JhcC5TSEFLRS5hY3RpdmV7XG5cdFx0YW5pbWF0aW9uOnNoYWtlIDEuMnMgaW5maW5pdGUgbGluZWFyO1xuXHR9XG5cdC5hbmltYXRlZF93cmFwLlJPVEFURS5hY3RpdmV7XG5cdFx0YW5pbWF0aW9uOnJvdGF0ZSAxLjJzIGluZmluaXRlIGxpbmVhcjtcblx0fVxuXHQuYW5pbWF0ZWRfd3JhcCBpbWd7XG5cdFx0bWF4LXdpZHRoOjEwMCU7XG5cdH1cbjwvc3R5bGU+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHZpZXcvd0FuaW1hdGVkL3dBbmltYXRlZC52dWUiLCI8dGVtcGxhdGU+XG5cdDxkaXYgOmlkPVwicGx1Z2luRGF0YS5pZGVudGl0eVwiIGNsYXNzPVwicGx1Z2luX3dyYXBcIiA6c3R5bGU9XCJwYXJzZVBsdWdpblN0eWxlKHBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLHBsdWdpbkRhdGEuYmFja2dyb3VuZEltYWdlKVwiPlxuXG5cdFx0PGRpdiB2LWZvcj1cIml0ZW0gaW4gcGx1Z2luRGF0YS5zdWJQbHVnaW5MaXN0XCIgY2xhc3M9XCJidXR0b25fd3JhcFwiIEBjbGljaz1cImJ1dHRpb25FdmVudChpdGVtKVwiIDpzdHlsZT1cInByYXNlQnV0dG9uU3R5bGUoaXRlbS5jaGVja1N0YXR1cyxpdGVtLmJhY2tncm91bmRDb2xvcixpdGVtLnBpY1VybCxpdGVtLmNvbG9yLGl0ZW0ud2lkdGgsaXRlbS5oZWlnaHQsaXRlbS5ib3JkZXJSYWRpdXMpXCI+e3tpdGVtLnRleHR9fTwvZGl2PlxuXG5cdDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblx0aW1wb3J0IHZpZXdNZXRob2RDb25maWcgZnJvbSAnLi4vLi4vY29uZmlnL3ZpZXdNZXRob2RDb25maWcuanMnO1xuXG5cdGxldCBtZXRob2RzID0ge307XG5cdGZvcihsZXQga2V5IGluIHZpZXdNZXRob2RDb25maWcpe1xuXHRcdG1ldGhvZHNba2V5XSA9IHZpZXdNZXRob2RDb25maWdba2V5XTtcblx0fVxuXG5cdG1ldGhvZHNbXCJwcmFzZUJ1dHRvblN0eWxlXCJdID0gZnVuY3Rpb24oY2hlY2tTdGF0dXMsYmFja2dyb3VuZENvbG9yLHBpY1VybCxjb2xvcix3aWR0aCxoZWlnaHQsYm9yZGVyUmFkaXVzKXtcblx0XHRpZihjaGVja1N0YXR1cyA9PSBcIk5PXCIpe1xuXHRcdFx0cmV0dXJuIFwiZGlzcGxheTpub25lXCI7XG5cdFx0fVxuXHRcdHJldHVybiAnYmFja2dyb3VuZENvbG9yOicgKyBiYWNrZ3JvdW5kQ29sb3IgKyAnO2JhY2tncm91bmRJbWFnZTp1cmwoXCInICsgcGljVXJsICsgJ1wiKTtjb2xvcjonICsgY29sb3IgKyAnO3dpZHRoOicgKyB3aWR0aCArICdweDtoZWlnaHQ6JyArIGhlaWdodCArICdweDtsaW5lSGVpZ2h0OicgICsgaGVpZ2h0ICsgJ3B4O2JvcmRlclJhZGl1czonICsgYm9yZGVyUmFkaXVzICsgJ3B4JzsgXHRcdFx0XHRcblx0fTtcblxuXHRtZXRob2RzW1wiY2hhbmdlV2VpcGFnZURhdGFcIl0gPSBmdW5jdGlvbihvcHRpb24pe1xuXHRcdHRoaXMuJGVtaXQoXCJjaGFuZ2V3ZWlwYWdlZGF0YVwiLHtpZDpvcHRpb24ubW9kZWxJZCxrZXk6b3B0aW9uLm1vZGVsS2V5LHZhbHVlOm9wdGlvbi5tb2RlbFZhbHVlfSk7XG5cdH1cblxuXHRtZXRob2RzW1wiYnV0dGlvbkV2ZW50XCJdID0gZnVuY3Rpb24oc3ViUGx1Z2luKXtcblx0XHRsZXQgX3RoaXMgPSB0aGlzO1xuXHRcdGZvcihsZXQgaSA9IDA7aSA8IHN1YlBsdWdpbi50aGlyZFBsdWdpbkxpc3QubGVuZ3RoO2krKyl7XG5cdFx0XHRsZXQgdGhpcmRQbHVnaW4gPSBzdWJQbHVnaW4udGhpcmRQbHVnaW5MaXN0W2ldO1x0XHRcdFxuXHRcdFx0aWYodGhpcmRQbHVnaW4uZXZlbnRUeXBlID09ICdMT0NBTCcgJiYgdGhpcmRQbHVnaW4ubW9kZWxJZCAmJiB0aGlyZFBsdWdpbi5tb2RlbEtleSl7XG5cdFx0XHRcdF90aGlzLmNoYW5nZVdlaXBhZ2VEYXRhKHRoaXJkUGx1Z2luKTtcblx0XHRcdH1lbHNlIGlmKHRoaXJkUGx1Z2luLmV2ZW50VHlwZSA9PSAnSFRUUCcgJiYgdGhpcmRQbHVnaW4uaHR0cFVybCl7XG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0dHlwZTpcInBvc3RcIixcblx0XHRcdFx0XHR1cmw6dGhpcmRQbHVnaW4uaHR0cFVybCxcblx0XHRcdFx0XHRkYXRhOnRoaXJkUGx1Z2luLmh0dHBEYXRhLFxuXHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdGZvcihsZXQgaiA9IDA7aiA8IHRoaXJkUGx1Z2luLmZvdXJ0aFBsdWdpbkxpc3QubGVuZ3RoO2orKyl7XG5cdFx0XHRcdFx0XHRcdGxldCBmb3VydGhQbHVnaW4gPSB0aGlyZFBsdWdpbi5mb3VydGhQbHVnaW5MaXN0W2pdO1xuXHRcdFx0XHRcdFx0XHRpZihmb3VydGhQbHVnaW4ubW9kZWxJZCAmJiBmb3VydGhQbHVnaW4udXNlUmVxdWVzdERhdGEgPT0gJ1lFUycpe1xuXHRcdFx0XHRcdFx0XHRcdGZvdXJ0aFBsdWdpbltcIm1vZGVsVmFsdWVcIl0gPSByZXM7XG5cdFx0XHRcdFx0XHRcdFx0Zm91cnRoUGx1Z2luW1wibW9kZWxLZXlcIl0gPSBcInJlcXVlc3REYXRhXCI7XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMuY2hhbmdlV2VpcGFnZURhdGEoe21vZGVsSWQ6Zm91cnRoUGx1Z2luLm1vZGVsSWQsbW9kZWxLZXk6XCJ1bkZvcmVhY2hcIixtb2RlbFZhbHVlOmZhbHNlfSk7XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMuY2hhbmdlV2VpcGFnZURhdGEoZm91cnRoUGx1Z2luKTtcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdH1lbHNlIGlmKGZvdXJ0aFBsdWdpbi5tb2RlbElkICYmIGZvdXJ0aFBsdWdpbi5tb2RlbEtleSAmJiBmb3VydGhQbHVnaW4ubW9kZWxWYWx1ZSl7XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMuY2hhbmdlV2VpcGFnZURhdGEoZm91cnRoUGx1Z2luKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XHRcdFxuXHR9O1xuXG5cdGV4cG9ydCBkZWZhdWx0IHtcblx0XHRuYW1lOlwid0J1dHRvblwiLFxuXHRcdHByb3BzOntcblx0XHRcdHBsdWdpbkRhdGE6e1xuXHRcdFx0XHR0eXBlOiBPYmplY3QsXG4gICAgICBcdFx0XHRkZWZhdWx0OiBmdW5jdGlvbigpe1xuICAgICAgXHRcdFx0XHRyZXR1cm4ge307XG4gICAgICBcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkYXRhICgpIHtcblx0XHQgICAgcmV0dXJuIHtcblx0XHQgICAgICBcblx0XHQgICAgfVxuXHRcdH0sXG5cdFx0Y3JlYXRlZDpmdW5jdGlvbigpe1xuXHRcdFx0XG5cdFx0fSxcblx0XHRtZXRob2RzOm1ldGhvZHNcdFx0XG5cdH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXHQuYnV0dG9uX3dyYXB7XG5cdFx0bWFyZ2luOmF1dG87XG5cdFx0dGV4dC1hbGlnbjpjZW50ZXI7XG5cdFx0Zm9udC1zaXplOjE2cHg7XG5cdFx0YmFja2dyb3VuZC1zaXplOjEwMCUgMTAwJTtcbiAgICBcdGJveC1zaGFkb3c6IDAgMCA1cHggIzY2Njtcblx0fVxuPC9zdHlsZT5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gdmlldy93QnV0dG9uL3dCdXR0b24udnVlIiwiPHRlbXBsYXRlPlxuXHQ8ZGl2IDppZD1cInBsdWdpbkRhdGEuaWRlbnRpdHlcIiBjbGFzcz1cInBsdWdpbl93cmFwXCIgOnN0eWxlPVwicGFyc2VQbHVnaW5TdHlsZShwbHVnaW5EYXRhLmJhY2tncm91bmRDb2xvcixwbHVnaW5EYXRhLmJhY2tncm91bmRJbWFnZSlcIj5cblx0XHQ8ZGl2IHYtZm9yPVwic3ViUGx1Z2luIGluIHBsdWdpbkRhdGEuc3ViUGx1Z2luTGlzdFwiIGNsYXNzPVwiZGlhbG9nX3dyYXBcIiB2LWlmPVwicGFyc2VTdGF0dXMocGx1Z2luRGF0YSxzdWJQbHVnaW4pXCI+XG5cdFx0XHQ8cCB2LWZvcj1cIml0ZW0gaW4gc3ViUGx1Z2luLnRoaXJkUGx1Z2luTGlzdFwiPlxuXHRcdFx0XHQ8aW1nIHYtaWY9XCJpdGVtLnR5cGUgPT0gJ0lNQUdFJ1wiIDpzcmM9XCJwYXJzZUZvcm1EYXRhKGl0ZW0scGx1Z2luRGF0YS5yZXF1ZXN0RGF0YSlcIiAvPlxuXHRcdFx0XHQ8c3BhbiB2LWVsc2UtaWY9XCJpdGVtLnR5cGUgPT0gJ1RFWFQnXCI+e3twYXJzZUZvcm1EYXRhKGl0ZW0scGx1Z2luRGF0YS5yZXF1ZXN0RGF0YSl9fTwvc3Bhbj5cblx0XHRcdDwvcD5cdFx0XHRcdFxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cdGltcG9ydCB2aWV3TWV0aG9kQ29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy92aWV3TWV0aG9kQ29uZmlnLmpzJztcblxuXHRsZXQgbWV0aG9kcyA9IHt9O1xuXHRmb3IobGV0IGtleSBpbiB2aWV3TWV0aG9kQ29uZmlnKXtcblx0XHRtZXRob2RzW2tleV0gPSB2aWV3TWV0aG9kQ29uZmlnW2tleV07XG5cdH1cblxuXHRmdW5jdGlvbiBjb25kaXRpb25QYXJzZUtleVZhbHVlKGtleVZhbHVlU3RyKXtcdFxuXHRcdGxldCBzeW1ib2wgPSBcIlwiO1xuXHRcdGxldCBrZXkgPSBcIlwiO1xuXHRcdGxldCBrZXlMaXN0ID0gXCJcIjtcblx0XHRsZXQgdmFsdWVTdHIgPSBcIlwiO1xuXHRcdGxldCB2YWx1ZTtcblx0XHRpZihrZXlWYWx1ZVN0ci5pbmRleE9mKFwiPj1cIikgPj0gMCl7XG5cdFx0XHRzeW1ib2wgPSBcIj49XCI7XG5cdFx0fWVsc2UgaWYoa2V5VmFsdWVTdHIuaW5kZXhPZihcIjw9XCIpID49IDApe1xuXHRcdFx0c3ltYm9sID0gXCI8PVwiO1xuXHRcdH1lbHNlIGlmKGtleVZhbHVlU3RyLmluZGV4T2YoXCIhPVwiKSA+PSAwKXtcblx0XHRcdHN5bWJvbCA9IFwiIT1cIjtcblx0XHR9ZWxzZSBpZihrZXlWYWx1ZVN0ci5pbmRleE9mKFwiPlwiKSA+PSAwKXtcblx0XHRcdHN5bWJvbCA9IFwiPlwiO1xuXHRcdH1lbHNlIGlmKGtleVZhbHVlU3RyLmluZGV4T2YoXCI8XCIpID49IDApe1xuXHRcdFx0c3ltYm9sID0gXCI8XCI7XG5cdFx0fWVsc2V7XG5cdFx0XHRzeW1ib2wgPSBcIj09XCI7XG5cdFx0fVxuXHRcdGxldCBzeW1ib2xJbmRleCA9IGtleVZhbHVlU3RyLmluZGV4T2Yoc3ltYm9sKTtcblx0XHRpZihzeW1ib2xJbmRleCA+IDApe1xuXHRcdFx0a2V5ID0ga2V5VmFsdWVTdHIuc3Vic3RyaW5nKDAsc3ltYm9sSW5kZXgpO1xuXHRcdFx0dmFsdWVTdHIgPSBrZXlWYWx1ZVN0ci5zdWJzdHJpbmcoc3ltYm9sSW5kZXggKyBzeW1ib2wubGVuZ3RoKTtcblx0XHR9ZWxzZSBpZihzeW1ib2xJbmRleCA9PSAwKXtcblx0XHRcdHZhbHVlU3RyID0ga2V5VmFsdWVTdHIuc3Vic3RyaW5nKHN5bWJvbEluZGV4ICsgc3ltYm9sLmxlbmd0aCk7XG5cdFx0fWVsc2V7XG5cdFx0XHR2YWx1ZVN0ciA9IGtleVZhbHVlU3RyO1xuXHRcdH1cblx0XHRpZihpc05hTihOdW1iZXIodmFsdWVTdHIpKSl7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlU3RyLnJlcGxhY2UoLycvZyxcIlwiKS5yZXBsYWNlKC9cIi9nLFwiXCIpO1xuXHRcdH1lbHNle1xuXHRcdFx0dmFsdWUgPSBOdW1iZXIodmFsdWVTdHIpO1xuXHRcdH1cblx0XHRrZXlMaXN0ID0ga2V5LnNwbGl0KFwiLlwiKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3ltYm9sOnN5bWJvbCxcblx0XHRcdGtleUxpc3Q6a2V5TGlzdCxcblx0XHRcdHZhbHVlOnZhbHVlXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gY29uZGl0aW9uUGFyc2VSZXN1bHQoY29uZGl0aW9uKXtcblx0XHRsZXQgb3BlcmF0aW9uTGlzdCA9IFtdO1xuXHRcdGxldCBzeW1ib2xMaXN0ID0gW107XG5cdFx0bGV0IHRlbXBMaXN0ID0gY29uZGl0aW9uLnNwbGl0KFwiJiZcIik7XG5cdFx0Zm9yKGxldCBpID0gMDtpIDwgdGVtcExpc3QubGVuZ3RoO2krKyl7XG5cdFx0XHRpZihpID4gMCl7XG5cdFx0XHRcdHN5bWJvbExpc3QucHVzaChcIiYmXCIpO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHRlbXAyTGlzdCA9IHRlbXBMaXN0W2ldLnNwbGl0KFwifHxcIik7XG5cdFx0XHRmb3IobGV0IGogPSAwO2ogPCB0ZW1wMkxpc3QubGVuZ3RoO2orKyl7XG5cdFx0XHRcdG9wZXJhdGlvbkxpc3QucHVzaChjb25kaXRpb25QYXJzZUtleVZhbHVlKHRlbXAyTGlzdFtqXSkpO1xuXHRcdFx0XHRpZihqID4gMCl7XG5cdFx0XHRcdFx0c3ltYm9sTGlzdC5wdXNoKFwifHxcIik7XG5cdFx0XHRcdH1cdFx0XHRcblx0XHRcdH1cdFxuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0b3BlcmF0aW9uTGlzdDpvcGVyYXRpb25MaXN0LFxuXHRcdFx0c3ltYm9sTGlzdDpzeW1ib2xMaXN0XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0UmVxdWVzdEtleURhdGEoa2V5TGlzdCxyZXF1ZXN0RGF0YSl7XG5cdFx0bGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVxdWVzdERhdGEpKTtcblx0XHRmb3IobGV0IGkgPSAwO2kgPCBrZXlMaXN0Lmxlbmd0aDtpKyspe1xuXHRcdFx0aWYoa2V5TGlzdFtpXSl7XG5cdFx0XHRcdHJlc3VsdCA9IHJlc3VsdFtrZXlMaXN0W2ldXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoZWNrSnVkZ2VMaXN0KG9wZXJhdGlvbkxpc3QscmVxdWVzdERhdGEpe1xuXHRcdGxldCByZXN1bHRMaXN0ID0gW107XG5cdFx0Zm9yKGxldCBpID0gMDtpIDwgb3BlcmF0aW9uTGlzdC5sZW5ndGg7aSsrKXtcblx0XHRcdGxldCBrZXlWYWx1ZSA9IGdldFJlcXVlc3RLZXlEYXRhKG9wZXJhdGlvbkxpc3RbaV0ua2V5TGlzdCxyZXF1ZXN0RGF0YSk7XG5cdFx0XHRzd2l0Y2gob3BlcmF0aW9uTGlzdFtpXS5zeW1ib2wpe1xuXHRcdFx0XHRjYXNlICc+PSc6a2V5VmFsdWUgPj0gb3BlcmF0aW9uTGlzdFtpXS52YWx1ZT9yZXN1bHRMaXN0LnB1c2godHJ1ZSk6cmVzdWx0TGlzdC5wdXNoKGZhbHNlKTticmVhaztcblx0XHRcdFx0Y2FzZSAnPD0nOmtleVZhbHVlIDw9IG9wZXJhdGlvbkxpc3RbaV0udmFsdWU/cmVzdWx0TGlzdC5wdXNoKHRydWUpOnJlc3VsdExpc3QucHVzaChmYWxzZSk7YnJlYWs7XG5cdFx0XHRcdGNhc2UgJyE9JzprZXlWYWx1ZSAhPSBvcGVyYXRpb25MaXN0W2ldLnZhbHVlP3Jlc3VsdExpc3QucHVzaCh0cnVlKTpyZXN1bHRMaXN0LnB1c2goZmFsc2UpO2JyZWFrO1xuXHRcdFx0XHRjYXNlICc+JzprZXlWYWx1ZSA+IG9wZXJhdGlvbkxpc3RbaV0udmFsdWU/cmVzdWx0TGlzdC5wdXNoKHRydWUpOnJlc3VsdExpc3QucHVzaChmYWxzZSk7YnJlYWs7XG5cdFx0XHRcdGNhc2UgJzwnOmtleVZhbHVlIDwgb3BlcmF0aW9uTGlzdFtpXS52YWx1ZT9yZXN1bHRMaXN0LnB1c2godHJ1ZSk6cmVzdWx0TGlzdC5wdXNoKGZhbHNlKTticmVhaztcblx0XHRcdFx0ZGVmYXVsdDprZXlWYWx1ZSA9PSBvcGVyYXRpb25MaXN0W2ldLnZhbHVlP3Jlc3VsdExpc3QucHVzaCh0cnVlKTpyZXN1bHRMaXN0LnB1c2goZmFsc2UpO2JyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0TGlzdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGNvbmRpdGlvbk9wZXJhdGlvbihjb25kaXRpb24scmVxdWVzdERhdGEpe1xuXHRcdGlmKCFjb25kaXRpb24gfHwgIXJlcXVlc3REYXRhKXtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0bGV0IHJlc3VsdCA9IHRydWU7XG5cdFx0bGV0IGNvbmRpdGlvblJlcyA9IGNvbmRpdGlvblBhcnNlUmVzdWx0KGNvbmRpdGlvbik7XG5cdFx0bGV0IGp1ZGdlTGlzdCA9IGNoZWNrSnVkZ2VMaXN0KGNvbmRpdGlvblJlcy5vcGVyYXRpb25MaXN0LHJlcXVlc3REYXRhKTtcblx0XHRmb3IobGV0IGkgPSAwO2kgPCBqdWRnZUxpc3QubGVuZ3RoO2krKyl7XG5cdFx0XHRpZihpID09IDApe1xuXHRcdFx0XHRyZXN1bHQgPSBqdWRnZUxpc3RbaV07XG5cdFx0XHR9ZWxzZSBpZihjb25kaXRpb25SZXMuc3ltYm9sTGlzdFtpXSl7XG5cdFx0XHRcdHN3aXRjaChjb25kaXRpb25SZXMuc3ltYm9sTGlzdFtpXSl7XG5cdFx0XHRcdFx0Y2FzZSBcIiYmXCI6IHJlc3VsdCA9IHJlc3VsdCAmJiBqdWRnZUxpc3RbaV07YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcInx8XCI6IHJlc3VsdCA9IHJlc3VsdCB8fCBqdWRnZUxpc3RbaV07YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdG1ldGhvZHNbXCJwYXJzZVN0YXR1c1wiXSA9IGZ1bmN0aW9uKHBsdWdpbkRhdGEsc3ViUGx1Z2luKXtcblx0XHRpZihwbHVnaW5EYXRhLnVuRm9yZWFjaCB8fCBwbHVnaW5EYXRhLmlzT3BlbiA9PSAnTk8nKXtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZihzdWJQbHVnaW4uY2hlY2tTdGF0dXMgPT0gJ1lFUycpe1xuXHRcdFx0aWYoY29uZGl0aW9uT3BlcmF0aW9uKHN1YlBsdWdpbi5jb25kaXRpb24scGx1Z2luRGF0YS5yZXF1ZXN0RGF0YSkpe1xuXHRcdFx0XHRwbHVnaW5EYXRhW1widW5Gb3JlYWNoXCJdID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cGx1Z2luRGF0YVtcInVuRm9yZWFjaFwiXSA9IHRydWU7IFxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVx0XHRcblx0fVxuXG5cdG1ldGhvZHNbXCJwYXJzZUZvcm1EYXRhXCJdID0gZnVuY3Rpb24odGhpcmRQbHVnaW4scmVxdWVzdERhdGEpe1xuXHRcdGlmKHRoaXJkUGx1Z2luLmtleSl7XG5cdFx0XHRsZXQga2V5TGlzdCA9IHRoaXJkUGx1Z2luLmtleS5zcGxpdChcIi5cIik7XG5cdFx0XHRsZXQgdGVtcCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVxdWVzdERhdGEpKTtcblx0XHRcdGZvcihsZXQgaSA9IDA7aSA8IGtleUxpc3QubGVuZ3RoO2krKyl7XG5cdFx0XHRcdHRlbXAgPSB0ZW1wW2tleUxpc3RbaV1dO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRlbXA7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gdGhpcmRQbHVnaW4udmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGRlZmF1bHQge1xuXHRcdG5hbWU6XCJ3RGlhbG9nXCIsXG5cdFx0cHJvcHM6e1xuXHRcdFx0cGx1Z2luRGF0YTp7XG5cdFx0XHRcdHR5cGU6IE9iamVjdCxcbiAgICAgIFx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uKCl7XG4gICAgICBcdFx0XHRcdHJldHVybiB7fTtcbiAgICAgIFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGRhdGEgKCkge1xuXHRcdCAgICByZXR1cm4ge1xuXHRcdCAgICAgIFxuXHRcdCAgICB9XG5cdFx0fSxcblx0XHRjcmVhdGVkOmZ1bmN0aW9uKCl7XG5cdFx0XHRcblx0XHR9LFxuXHRcdG1ldGhvZHM6bWV0aG9kc1x0XHRcblx0fVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cdC5wbHVnaW5fd3JhcHtcblx0XHRwb3NpdGlvbjphYnNvbHV0ZTtcblx0XHRsZWZ0OjUwJTtcblx0XHR0b3A6NTAlO1xuXHRcdHdpZHRoOjI0MHB4O1xuXHRcdHRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTtcblx0fVxuXHQuZGlhbG9nX3dyYXB7XG5cdFx0dGV4dC1hbGlnbjpjZW50ZXI7XG5cdFx0cGFkZGluZzoxMHB4O1xuXHR9XG5cdC5kaWFsb2dfd3JhcCBwe1xuXHRcdHBhZGRpbmc6OHB4O1xuXHR9XG5cdC5kaWFsb2dfd3JhcCBpbWd7XG5cdFx0d2lkdGg6MTYwcHg7XG5cdH1cbjwvc3R5bGU+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHZpZXcvd0RpYWxvZy93RGlhbG9nLnZ1ZSIsIjx0ZW1wbGF0ZT5cblx0PGRpdiA6aWQ9XCJwbHVnaW5EYXRhLmlkZW50aXR5XCIgY2xhc3M9XCJwbHVnaW5fd3JhcFwiIDpzdHlsZT1cInBhcnNlRGVjb3JhdGVTdHlsZShwbHVnaW5EYXRhLmJhY2tncm91bmRDb2xvcixwbHVnaW5EYXRhLmJhY2tncm91bmRJbWFnZSxwbHVnaW5EYXRhLndpZHRoLHBsdWdpbkRhdGEuaGVpZ2h0LHBsdWdpbkRhdGEudG9wLHBsdWdpbkRhdGEubGVmdCxwbHVnaW5EYXRhLmJvcmRlclJhZGl1cylcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiZGVjb3JhdGVfd3JhcFwiPjwvZGl2PlxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cdGltcG9ydCB2aWV3TWV0aG9kQ29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy92aWV3TWV0aG9kQ29uZmlnLmpzJztcblxuXHRsZXQgbWV0aG9kcyA9IHt9O1xuXHRmb3IobGV0IGtleSBpbiB2aWV3TWV0aG9kQ29uZmlnKXtcblx0XHRtZXRob2RzW2tleV0gPSB2aWV3TWV0aG9kQ29uZmlnW2tleV07XG5cdH1cblxuXHRtZXRob2RzW1wicGFyc2VEZWNvcmF0ZVN0eWxlXCJdID0gZnVuY3Rpb24oYmFja2dyb3VuZENvbG9yLGJhY2tncm91bmRJbWFnZSx3aWR0aCxoZWlnaHQsdG9wLGxlZnQsYm9yZGVyUmFkaXVzKXtcblx0XHRyZXR1cm4gJ3Bvc2l0aW9uOmFic29sdXRlO292ZXJmbG93OmhpZGRlbjtiYWNrZ3JvdW5kQ29sb3I6JyArIGJhY2tncm91bmRDb2xvciArICc7YmFja2dyb3VuZEltYWdlOnVybChcIicrIGJhY2tncm91bmRJbWFnZSArICdcIiknICsgJzt3aWR0aDonICsgd2lkdGggKyAncHg7aGVpZ2h0OicgKyBoZWlnaHQgKyAncHg7dG9wOicgKyB0b3AgKyAncHg7bGVmdDonICsgbGVmdCArICdweDtib3JkZXJSYWRpdXM6JyArIGJvcmRlclJhZGl1cyArICdweCc7XG5cdH07XG5cblx0ZXhwb3J0IGRlZmF1bHQge1xuXHRcdG5hbWU6XCJ3RGVjb3JhdGVcIixcblx0XHRwcm9wczp7XG5cdFx0XHRwbHVnaW5EYXRhOntcblx0XHRcdFx0dHlwZTogT2JqZWN0LFxuICAgICAgXHRcdFx0ZGVmYXVsdDogZnVuY3Rpb24oKXtcbiAgICAgIFx0XHRcdFx0cmV0dXJuIHt9O1xuICAgICAgXHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZGF0YSAoKSB7XG5cdFx0ICAgIHJldHVybiB7XG5cdFx0ICAgICAgXG5cdFx0ICAgIH1cblx0XHR9LFxuXHRcdGNyZWF0ZWQ6ZnVuY3Rpb24oKXtcblx0XHRcdFxuXHRcdH0sXG5cdFx0bWV0aG9kczptZXRob2RzXHRcdFxuXHR9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblx0XG48L3N0eWxlPlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB2aWV3L3dEZWNvcmF0ZS93RGVjb3JhdGUudnVlIiwiPHRlbXBsYXRlPlxuXHQ8ZGl2IDppZD1cInBsdWdpbkRhdGEuaWRlbnRpdHlcIiBjbGFzcz1cInBsdWdpbl93cmFwXCIgOnN0eWxlPVwicGFyc2VQbHVnaW5TdHlsZShwbHVnaW5EYXRhLmJhY2tncm91bmRDb2xvcixwbHVnaW5EYXRhLmJhY2tncm91bmRJbWFnZSlcIj5cblx0XHQ8ZGl2IHYtaWY9XCJwbHVnaW5EYXRhLnN1YlBsdWdpblR5cGUgPT0gJ1RFWFQnXCIgY2xhc3M9XCJuYXZfd3JhcFwiPlxuXHQgICAgICAgIDx1bCBjbGFzcz1cIm5hdl9saXN0IGNoaWxkX2xpc3QgZm9udF8xNFwiPlxuXHQgICAgICAgICAgICA8bGkgdi1mb3I9XCJpdGVtIGluIHBsdWdpbkRhdGEuc3ViUGx1Z2luTGlzdFwiIDpkYXRhLXBsdWdpblV1aWQ9XCJpdGVtLnBsdWdpblV1aWRcIiBjbGFzcz1cIm5hdl9pdGVtIHN1YlBsdWdpbl93cmFwXCIgOmNsYXNzPVwicGFyc2VQbHVnaW5TZWxlY3QoaXRlbS5wbHVnaW5TZWxlY3QpXCIgPlxuXHQgICAgICAgICAgICBcdDxhIGRyYWdnYWJsZT1cImZhbHNlXCIgOmhyZWY9XCJpdGVtLmxpbmtVcmxcIiBjbGFzcz1cImJsb2NrX2xpbmtcIj57e3BhcnNlTmF2TmFtZShpdGVtLm5hbWUpfX08L2E+XG5cdCAgICAgICAgXHQ8L2xpPlxuXHQgICAgICAgIDwvdWw+XG5cdCAgICA8L2Rpdj5cblx0ICAgIDxkaXYgdi1lbHNlLWlmPVwicGx1Z2luRGF0YS5zdWJQbHVnaW5UeXBlID09ICdJTUFHRSdcIiBjbGFzcz1cIm5hdl9waWN0dXJlX3dyYXBcIj5cblx0ICAgICAgICA8dWwgY2xhc3M9XCJuYXZfbGlzdCBjaGlsZF9saXN0IGZvbnRfMTRcIj5cblx0ICAgICAgICAgICAgPGxpIHYtZm9yPVwiaXRlbSBpbiBwbHVnaW5EYXRhLnN1YlBsdWdpbkxpc3RcIiA6ZGF0YS1wbHVnaW5VdWlkPVwiaXRlbS5wbHVnaW5VdWlkXCIgY2xhc3M9XCJuYXZfaXRlbSBzdWJQbHVnaW5fd3JhcFwiIDpjbGFzcz1cInBhcnNlUGx1Z2luU2VsZWN0KGl0ZW0ucGx1Z2luU2VsZWN0KVwiID5cblx0XHQgICAgICAgICAgICA8YSBkcmFnZ2FibGU9XCJmYWxzZVwiIDpocmVmPVwiaXRlbS5saW5rVXJsXCIgY2xhc3M9XCJibG9ja19saW5rXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibmF2X3BpY3R1cmVfcGFnZVwiPlxuXHRcdFx0XHRcdFx0XHQ8aW1nIDpzcmM9XCJwYXJzZU5hdlBpYyhpdGVtLnBpY1VybClcIiBhbHQ9XCJcIiBjbGFzcz1cIml0ZW1faW1hZ2VcIiBkcmFnZ2FibGU9XCJmYWxzZVwiIC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxwIGNsYXNzPVwibmF2X3BpY3R1cmVfdGV4dFwiPnt7cGFyc2VOYXZOYW1lKGl0ZW0ubmFtZSl9fTwvcD5cblx0XHRcdFx0XHQ8L2E+XG5cdFx0ICAgICAgICA8L2xpPlxuXHQgICAgICAgIDwvdWw+XG5cdCAgICA8L2Rpdj5cblx0PC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuXHRpbXBvcnQgdmlld01ldGhvZENvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvdmlld01ldGhvZENvbmZpZy5qcyc7XG5cblx0bGV0IG1ldGhvZHMgPSB7fTtcblx0Zm9yKGxldCBrZXkgaW4gdmlld01ldGhvZENvbmZpZyl7XG5cdFx0bWV0aG9kc1trZXldID0gdmlld01ldGhvZENvbmZpZ1trZXldO1xuXHR9XG5cblx0bWV0aG9kc1tcInBhcnNlTmF2TmFtZVwiXSA9IGZ1bmN0aW9uKG5hbWUpe1xuXHRcdGlmKG5hbWUpe1xuXHRcdCAgIHJldHVybiBuYW1lO1xuXHQgICBcdH1lbHNle1xuXHRcdCAgIHJldHVybiAn5a+86IiqJztcblx0ICAgXHR9XG5cdH07XG5cblx0bWV0aG9kc1tcInBhcnNlTmF2UGljXCJdID0gZnVuY3Rpb24ocGljVXJsKXtcblx0XHRpZihwaWNVcmwpe1xuXHRcdFx0cmV0dXJuIHBpY1VybDtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiAnLi9saWJzL2ltZy9pY29uX25hdl9hZGRwaWMucG5nJztcblx0XHR9XG5cdH07XG5cblx0ZXhwb3J0IGRlZmF1bHQge1xuXHRcdG5hbWU6XCJ3TmF2XCIsXG5cdFx0cHJvcHM6e1xuXHRcdFx0cGx1Z2luRGF0YTp7XG5cdFx0XHRcdHR5cGU6IE9iamVjdCxcbiAgICAgIFx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uKCl7XG4gICAgICBcdFx0XHRcdHJldHVybiB7fTtcbiAgICAgIFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGRhdGEgKCkge1xuXHRcdCAgICByZXR1cm4ge1xuXHRcdCAgICAgIFxuXHRcdCAgICB9XG5cdFx0fSxcblx0XHRjcmVhdGVkOmZ1bmN0aW9uKCl7XG5cdFx0XHRcblx0XHR9LFxuXHRcdG1ldGhvZHM6bWV0aG9kc1x0XHRcblx0fVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cdC5uYXZfd3JhcCAubmF2X2xpc3R7XG5cdCAgIGRpc3BsYXk6IGZsZXg7XG5cdCAgIHBhZGRpbmc6IDdweCAwO1xuXHQgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcblx0fVxuXHQubmF2X3dyYXAgLm5hdl9saXN0IC5uYXZfaXRlbXtcblx0ICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblx0ICAgIGxpbmUtaGVpZ2h0OiAyN3B4O1xuXHQgICAgYm9yZGVyLXJhZGl1czogMjdweDtcblx0ICAgIGJhY2tncm91bmQtY29sb3I6I2ZmZjtcblx0ICAgIHBhZGRpbmc6IDAgMjBweDtcblx0fVxuXHQubmF2X3BpY3R1cmVfd3JhcCAubmF2X2xpc3R7XG5cdCAgICBkaXNwbGF5OiBmbGV4O1xuXHQgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG5cdH1cblx0Lm5hdl9waWN0dXJlX3dyYXAgLm5hdl9saXN0IC5uYXZfaXRlbXtcblx0ICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblx0ICAgIHBhZGRpbmc6IDcuNXB4IDA7XG5cdH1cblx0Lm5hdl9waWN0dXJlX3dyYXAgLm5hdl9saXN0IC5uYXZfaXRlbSAubmF2X3BpY3R1cmVfcGFnZXtcblx0ICAgIHdpZHRoOiA1MnB4O1xuXHQgICAgaGVpZ2h0OiA1MnB4O1xuXHQgICAgYm9yZGVyLXJhZGl1czogMjZweDtcblx0ICAgIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XG5cdCAgICBtYXJnaW46IGF1dG87XG5cdCAgICBvdmVyZmxvdzogaGlkZGVuO1xuXHR9XG5cdC5uYXZfcGljdHVyZV93cmFwIC5uYXZfbGlzdCAubmF2X2l0ZW0gLm5hdl9waWN0dXJlX3BhZ2UgLml0ZW1faW1hZ2V7XG5cdCAgICB3aWR0aDoxMDAlO1xuXHQgICAgaGVpZ2h0OjEwMCU7XG5cdH1cblx0Lm5hdl9waWN0dXJlX3dyYXAgLm5hdl9saXN0IC5uYXZfaXRlbSAubmF2X3BpY3R1cmVfdGV4dHtcblx0ICAgIHBhZGRpbmctdG9wOiA3cHg7XG5cdCAgICBjb2xvcjogIzMzMztcblx0ICAgIGZvbnQtc2l6ZTogMTRweDtcblx0fVxuXHQubmF2X3BpY3R1cmVfd3JhcCAubmF2X2xpc3QgLm5hdl9pdGVtLmN1cnJlbnQgLm5hdl9waWN0dXJlX3BhZ2UgLml0ZW1faW1hZ2V7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgzNSwxNTYsMjQzLDAuMik7XG5cdH1cbjwvc3R5bGU+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHZpZXcvd05hdi93TmF2LnZ1ZSIsIjx0ZW1wbGF0ZT5cblx0PGRpdiA6aWQ9XCJwbHVnaW5EYXRhLmlkZW50aXR5XCIgY2xhc3M9XCJwbHVnaW5fd3JhcFwiIDpzdHlsZT1cIntiYWNrZ3JvdW5kQ29sb3I6cGx1Z2luRGF0YS5iYWNrZ3JvdW5kQ29sb3IsYmFja2dyb3VuZEltYWdlOid1cmwoJyArIHBsdWdpbkRhdGEuYmFja2dyb3VuZEltYWdlICsgJyknLHBhZGRpbmc6cGx1Z2luRGF0YS5tYXJnaW4gKyAncHgnfVwiPlxuXHRcdDxkaXYgY2xhc3M9XCJyaWNodGV4dF93cmFwXCIgdi1odG1sPVwicGx1Z2luRGF0YS50eHRIdG1sXCIgOnN0eWxlPVwie2JhY2tncm91bmRDb2xvcjpwbHVnaW5EYXRhLmNvbnRlbnRDb2xvcixib3JkZXJSYWRpdXM6cGx1Z2luRGF0YS5ib3JkZXJSYWRpdXMgKyAncHgnfVwiPlxuXHQgICAgICAgIHt7cGx1Z2luRGF0YS50eHRIdG1sfX1cblx0ICAgIDwvZGl2PlxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cdGltcG9ydCB2aWV3TWV0aG9kQ29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy92aWV3TWV0aG9kQ29uZmlnLmpzJztcblxuXHRsZXQgbWV0aG9kcyA9IHt9O1xuXHRmb3IobGV0IGtleSBpbiB2aWV3TWV0aG9kQ29uZmlnKXtcblx0XHRtZXRob2RzW2tleV0gPSB2aWV3TWV0aG9kQ29uZmlnW2tleV07XG5cdH1cblx0XG5cdGV4cG9ydCBkZWZhdWx0IHtcblx0XHRuYW1lOlwid1JpY2h0ZXh0XCIsXG5cdFx0cHJvcHM6e1xuXHRcdFx0cGx1Z2luRGF0YTp7XG5cdFx0XHRcdHR5cGU6IE9iamVjdCxcbiAgICAgIFx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uKCl7XG4gICAgICBcdFx0XHRcdHJldHVybiB7fTtcbiAgICAgIFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGRhdGEgKCkge1xuXHRcdCAgICByZXR1cm4ge1xuXHRcdCAgICAgIFxuXHRcdCAgICB9XG5cdFx0fSxcblx0XHRjcmVhdGVkOmZ1bmN0aW9uKCl7XG5cdFx0XHRcblx0XHR9LFxuXHRcdG1ldGhvZHM6bWV0aG9kc1x0XHRcblx0fVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ucmljaHRleHRfd3JhcCB7XG4gICAgcGFkZGluZzogOHB4O1xuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZFxufVxuLnJpY2h0ZXh0X3dyYXAgaW1nIHtcbiAgICBtYXgtd2lkdGg6IDEwMCVcbn1cbi5yaWNodGV4dF93cmFwIHRhYmxlIHtcbiAgICB3aWR0aDogMTAwJVxufVxuPC9zdHlsZT5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gdmlldy93UmljaHRleHQvd1JpY2h0ZXh0LnZ1ZSIsIjx0ZW1wbGF0ZT5cblx0PGRpdiA6aWQ9XCJwbHVnaW5EYXRhLmlkZW50aXR5XCIgY2xhc3M9XCJwbHVnaW5fd3JhcFwiIDpzdHlsZT1cInBhcnNlUGx1Z2luU3R5bGUocGx1Z2luRGF0YS5iYWNrZ3JvdW5kQ29sb3IscGx1Z2luRGF0YS5iYWNrZ3JvdW5kSW1hZ2UpXCI+XG5cdFx0PGRpdiBjbGFzcz1cInNwYWNlX3dyYXBcIiA6c3R5bGU9XCJ7aGVpZ2h0OnBsdWdpbkRhdGEuaGVpZ2h0ICsgJ3B4J31cIj48L2Rpdj5cblx0PC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuXHRpbXBvcnQgdmlld01ldGhvZENvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvdmlld01ldGhvZENvbmZpZy5qcyc7XG5cblx0bGV0IG1ldGhvZHMgPSB7fTtcblx0Zm9yKGxldCBrZXkgaW4gdmlld01ldGhvZENvbmZpZyl7XG5cdFx0bWV0aG9kc1trZXldID0gdmlld01ldGhvZENvbmZpZ1trZXldO1xuXHR9XG5cdFxuXHRleHBvcnQgZGVmYXVsdCB7XG5cdFx0bmFtZTpcIndTcGFjZVwiLFxuXHRcdHByb3BzOntcblx0XHRcdHBsdWdpbkRhdGE6e1xuXHRcdFx0XHR0eXBlOiBPYmplY3QsXG4gICAgICBcdFx0XHRkZWZhdWx0OiBmdW5jdGlvbigpe1xuICAgICAgXHRcdFx0XHRyZXR1cm4ge307XG4gICAgICBcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkYXRhICgpIHtcblx0XHQgICAgcmV0dXJuIHtcblx0XHQgICAgICBcblx0XHQgICAgfVxuXHRcdH0sXG5cdFx0Y3JlYXRlZDpmdW5jdGlvbigpe1xuXHRcdFx0XG5cdFx0fSxcblx0XHRtZXRob2RzOm1ldGhvZHNcdFx0XG5cdH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXHRcbjwvc3R5bGU+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHZpZXcvd1NwYWNlL3dTcGFjZS52dWUiLCI8dGVtcGxhdGU+XG5cdDxkaXYgOmlkPVwicGx1Z2luRGF0YS5pZGVudGl0eVwiIGNsYXNzPVwicGx1Z2luX3dyYXBcIiA6c3R5bGU9XCJwYXJzZVBsdWdpblN0eWxlKHBsdWdpbkRhdGEuYmFja2dyb3VuZENvbG9yLHBsdWdpbkRhdGEuYmFja2dyb3VuZEltYWdlKVwiPlxuXHRcdFxuXHRcdDxkaXYgOnN0eWxlPVwicGFyc2VUaW1lclN0eWxlKHBsdWdpbkRhdGEuaXNTaG93LHBsdWdpbkRhdGEuaGVpZ2h0KVwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInRpbWVyX3dyYXBcIj57e3BsdWdpbkRhdGEuc2hvd1RpbWV9fTwvZGl2PlxuXHRcdDwvZGl2PlxuXG5cdDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblx0aW1wb3J0IHZpZXdNZXRob2RDb25maWcgZnJvbSAnLi4vLi4vY29uZmlnL3ZpZXdNZXRob2RDb25maWcuanMnO1xuXHRpbXBvcnQgY2xvY2tKcyBmcm9tICcuLi8uLi9jb250cm9sZXIvY2xvY2suanMnO1x0XG5cblx0bGV0IG1ldGhvZHMgPSB7fTtcblx0Zm9yKGxldCBrZXkgaW4gdmlld01ldGhvZENvbmZpZyl7XG5cdFx0bWV0aG9kc1trZXldID0gdmlld01ldGhvZENvbmZpZ1trZXldO1xuXHR9XG5cblx0bWV0aG9kc1tcInBhcnNlVGltZXJTdHlsZVwiXSA9IGZ1bmN0aW9uKGlzU2hvdyxoZWlnaHQpe1xuXHRcdGlmKGlzU2hvdyA9PSAnWUVTJyl7XG5cdFx0XHRyZXR1cm4gJ2hlaWdodDonICsgaGVpZ2h0ICsgJ3B4O2xpbmVIZWlnaHQ6JyArIGhlaWdodCArICdweCc7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gJ2RpYXBsYXk6bm9uZSc7XG5cdFx0fVxuXHR9XG5cblx0bWV0aG9kc1tcInBhcnNlVGltZVBsdWdpblwiXSA9IGZ1bmN0aW9uKHBsdWdpbkRhdGEsc3RhcnRJbmRleCl7XG5cdFx0bGV0IF90aGlzID0gdGhpcztcblx0XHRmb3IobGV0IGkgPSBzdGFydEluZGV4O2kgPCBwbHVnaW5EYXRhLnN1YlBsdWdpbkxpc3QubGVuZ3RoO2krKyl7XG5cdFx0XHRsZXQgdGltZU9iaiA9IHBsdWdpbkRhdGEuc3ViUGx1Z2luTGlzdFtpXTtcblx0XHRcdGlmKHRpbWVPYmoudGltZSl7XG5cdFx0XHRcdGxldCB0aW1lID0gbmV3IERhdGUodGltZU9iai50aW1lKS5nZXRUaW1lKCk7XG5cdFx0XHRcdGxldCBub3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdFx0XHRcdGlmKHRpbWUgLSBub3dUaW1lID49IDEwMDApe1xuXHRcdFx0XHRcdGNsb2NrSnMuY2xvY2soe1xuXHRcdFx0XHRcdFx0aW5pdFRpbWU6dGltZU9iai50aW1lLFxuXHRcdFx0XHRcdFx0Y2FsbGJhY2s6ZnVuY3Rpb24oZGF5LGhvdXIsbWludXRlLHNlY29uZCl7XG5cdFx0XHRcdFx0XHRcdGxldCBzaG93VGltZSA9IGRheSArIFwi5aSpXCIgKyBob3VyICsgXCLml7ZcIiArIG1pbnV0ZSArIFwi5YiGXCIgKyBzZWNvbmQgKyBcIuenklwiO1xuXHRcdFx0XHRcdFx0XHRfdGhpcy5jaGFuZ2VXZWlwYWdlRGF0YSh7aWQ6cGx1Z2luRGF0YS5pZGVudGl0eSxrZXk6XCJzaG93VGltZVwiLHZhbHVlOnNob3dUaW1lfSk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0dGltZU91dENhbGxiYWNrOmZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdF90aGlzLnBhcnNlVGltZVBsdWdpbihwbHVnaW5EYXRhLGkrMSk7XG5cdFx0XHRcdFx0XHRcdF90aGlzLnRpbWVFdmVudCh0aW1lT2JqKTtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdF90aGlzLnRpbWVFdmVudCh0aW1lT2JqKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRtZXRob2RzW1widGltZUV2ZW50XCJdID0gZnVuY3Rpb24odGltZU9iail7XG5cdFx0Zm9yKGxldCBpID0gMDtpIDwgdGltZU9iai50aGlyZFBsdWdpbkxpc3QubGVuZ3RoO2krKyl7XG5cdFx0XHR0aGlzLmNoYW5nZVdlaXBhZ2VEYXRhKHtcblx0XHRcdFx0aWQ6dGltZU9iai50aGlyZFBsdWdpbkxpc3RbaV0ubW9kZWxJZCxcblx0XHRcdFx0a2V5OnRpbWVPYmoudGhpcmRQbHVnaW5MaXN0W2ldLm1vZGVsS2V5LFxuXHRcdFx0XHR2YWx1ZTp0aW1lT2JqLnRoaXJkUGx1Z2luTGlzdFtpXS5tb2RlbFZhbHVlXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRtZXRob2RzW1wiY2hhbmdlV2VpcGFnZURhdGFcIl0gPSBmdW5jdGlvbihvcHRpb24pe1xuXHRcdHRoaXMuJGVtaXQoXCJjaGFuZ2V3ZWlwYWdlZGF0YVwiLG9wdGlvbik7XG5cdH1cblx0XG5cdGV4cG9ydCBkZWZhdWx0IHtcblx0XHRuYW1lOlwid1RpbWVyXCIsXG5cdFx0cHJvcHM6e1xuXHRcdFx0cGx1Z2luRGF0YTp7XG5cdFx0XHRcdHR5cGU6IE9iamVjdCxcbiAgICAgIFx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uKCl7XG4gICAgICBcdFx0XHRcdHJldHVybiB7fTtcbiAgICAgIFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGRhdGEgKCkge1xuXHRcdCAgICByZXR1cm4ge1xuXHRcdCAgICAgIFxuXHRcdCAgICB9XG5cdFx0fSxcblx0XHRjcmVhdGVkOmZ1bmN0aW9uKCl7XHRcdFxuXHRcdFx0dGhpcy5wYXJzZVRpbWVQbHVnaW4odGhpcy5wbHVnaW5EYXRhLDApO1xuXHRcdH0sXG5cdFx0bWV0aG9kczptZXRob2RzXHRcdFxuXHR9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblx0LnRpbWVyX3dyYXB7XG5cdFx0dGV4dC1hbGlnbjpjZW50ZXI7XG5cdH1cbjwvc3R5bGU+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHZpZXcvd1RpbWVyL3dUaW1lci52dWUiLCIvKlxuICog5YCS6K6h5pe25o+S5Lu2XG4gKiBpbml0VGltZSDliJ3lp4vljJbml7bpl7TvvIjorqHml7bnu5PmnZ/ml7bpl7TvvIlcbiAqIGRpZmZlciAqKiDlho3liJ3lp4vml7bpl7Tln7rnoYDkuIrlj6DliqDml7bpl7RcbiAqICovXG5cdFxuXHRsZXQgY2xvY2s9ZnVuY3Rpb24odGVtcE9wdGlvbil7XG5cdFx0dGhpcy5pbml0VGltZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNhbGxiYWNrID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMucmVzdWx0Q2FsbGJhY2sgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy50aW1lT3V0Q2FsbGJhY2sgPSB1bmRlZmluZWQ7XG5cdFx0XG5cdFx0dGhpcy5vcHRpb24gPSB0ZW1wT3B0aW9uO1xuXHR9O1xuXHRcblx0Y2xvY2sucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLm9wdGlvbil7XHRcdFx0XG5cdFx0XHRpZih0aGlzLm9wdGlvbi5pbml0VGltZSl7XG5cdFx0XHRcdC8vaW9z5pe26Ze06L2s5o2i5b+F6aG75oqK5omA5pyJLei9rOaIkC9cblx0XHRcdFx0d2hpbGUodGhpcy5vcHRpb24uaW5pdFRpbWUuaW5kZXhPZihcIi1cIikgPiAtMSl7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb24uaW5pdFRpbWUgPSB0aGlzLm9wdGlvbi5pbml0VGltZS5yZXBsYWNlKFwiLVwiLFwiL1wiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmluaXRUaW1lID0gbmV3IERhdGUodGhpcy5vcHRpb24uaW5pdFRpbWUpO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5vcHRpb24uZGlmZmVyRGF5KXtcblx0XHRcdFx0bGV0IGRheU51bSA9IHRoaXMub3B0aW9uLmRpZmZlckRheSoyNCo2MCo2MCoxMDAwO1xuXHRcdFx0XHR0aGlzLmluaXRUaW1lID0gbmV3IERhdGUodGhpcy5pbml0VGltZS5zZXRUaW1lKHRoaXMuaW5pdFRpbWUuZ2V0VGltZSgpK2RheU51bSkpO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5vcHRpb24uZGlmZmVySG91cil7XG5cdFx0XHRcdGxldCBob3VyTnVtID0gdGhpcy5vcHRpb24uZGlmZmVySG91cio2MCo2MCoxMDAwO1xuXHRcdFx0XHR0aGlzLmluaXRUaW1lID0gbmV3IERhdGUodGhpcy5pbml0VGltZS5zZXRUaW1lKHRoaXMuaW5pdFRpbWUuZ2V0VGltZSgpK2hvdXJOdW0pKTtcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMub3B0aW9uLmRpZmZlck1pbnV0ZSl7XG5cdFx0XHRcdGxldCBtaW51dGVOdW0gPSB0aGlzLm9wdGlvbi5kaWZmZXJNaW51dGUqNjAqMTAwMDtcblx0XHRcdFx0dGhpcy5pbml0VGltZSA9IG5ldyBEYXRlKHRoaXMuaW5pdFRpbWUuc2V0VGltZSh0aGlzLmluaXRUaW1lLmdldFRpbWUoKSttaW51dGVOdW0pKTtcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMub3B0aW9uLmRpZmZlclNlY29uZCl7XG5cdFx0XHRcdGxldCBzZWNvbmROdW0gPSB0aGlzLm9wdGlvbi5kaWZmZXJTZWNvbmQqMTAwMDtcblx0XHRcdFx0dGhpcy5pbml0VGltZSA9IG5ldyBEYXRlKHRoaXMuaW5pdFRpbWUuc2V0VGltZSh0aGlzLmluaXRUaW1lLmdldFRpbWUoKStzZWNvbmROdW0pKTtcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMub3B0aW9uLmNhbGxiYWNrKXtcblx0XHRcdFx0dGhpcy5jYWxsYmFjayA9IHRoaXMub3B0aW9uLmNhbGxiYWNrO1xuXHRcdFx0fVx0XG5cdFx0XHRpZih0aGlzLm9wdGlvbi5yZXN1bHRDYWxsYmFjayl7XG5cdFx0XHRcdHRoaXMucmVzdWx0Q2FsbGJhY2sgPSB0aGlzLm9wdGlvbi5yZXN1bHRDYWxsYmFjaztcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMub3B0aW9uLnRpbWVPdXRDYWxsYmFjayl7XG5cdFx0XHRcdHRoaXMudGltZU91dENhbGxiYWNrID0gdGhpcy5vcHRpb24udGltZU91dENhbGxiYWNrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHR0aGlzLnRpbWVDb3VudCgpO1xuXHR9O1x0XG5cdFxuXHRjbG9jay5wcm90b3R5cGUuZGVhbFRpbWU9ZnVuY3Rpb24oKXtcblx0XHRsZXQgbm93VGltZSA9IG5ldyBEYXRlKCk7XG5cdFx0bGV0IGRpZmZlclRpbWUgPSB0aGlzLmluaXRUaW1lLmdldFRpbWUoKSAtIG5vd1RpbWUuZ2V0VGltZSgpO1xuXHRcdGlmKGRpZmZlclRpbWUgPCAwICYmIHRoaXMudGltZU91dENhbGxiYWNrKXtcblx0XHRcdHRoaXMudGltZU91dENhbGxiYWNrKCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0aWYoZGlmZmVyVGltZSA8IDEwMDAgJiYgdGhpcy5yZXN1bHRDYWxsYmFjayl7XG5cdFx0XHR0aGlzLnJlc3VsdENhbGxiYWNrKCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGxldCBkYXlzID0gTWF0aC5mbG9vcihkaWZmZXJUaW1lLygyNCozNjAwKjEwMDApKTtcblx0XHRcblx0XHRsZXQgaG91cnNUZW1wID0gZGlmZmVyVGltZSUoMjQqMzYwMCoxMDAwKTtcblx0XHRsZXQgaG91cnMgPSBNYXRoLmZsb29yKGhvdXJzVGVtcC8oMzYwMCoxMDAwKSk7XG5cdFx0XG5cdFx0bGV0IG1pbnV0ZXNUZW1wID0gaG91cnNUZW1wJSgzNjAwKjEwMDApO1xuXHRcdGxldCBtaW51dGVzID0gTWF0aC5mbG9vcihtaW51dGVzVGVtcC8oNjAqMTAwMCkpO1xuXHRcdFxuXHRcdGxldCBzZWNvbmRzVGVtcCA9IG1pbnV0ZXNUZW1wJSg2MCoxMDAwKTtcblx0XHRsZXQgc2Vjb25kcyA9IE1hdGgucm91bmQoc2Vjb25kc1RlbXAvMTAwMCk7XG5cdFx0XG5cdFx0Ly/pgb/lhY3ml7bpl7Tnu5PmnZ/lh7rnjrDotJ/mlbBcblx0XHRpZihkYXlzIDwgMCl7XG5cdFx0XHRkYXlzID0gaG91cnMgPSBtaW51dGVzID0gc2Vjb25kcyA9IDA7XG5cdFx0fVxuXHRcdFxuXHRcdHRoaXMuY2FsbGJhY2soZGF5cyxob3VycyxtaW51dGVzLHNlY29uZHMpO1xuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRcblx0Y2xvY2sucHJvdG90eXBlLnRpbWVDb3VudD1mdW5jdGlvbigpe1x0XG5cdFx0bGV0IF90aGlzID0gdGhpcztcblx0XHRsZXQgdDtcblx0XHRcblx0XHRsZXQgdGltZUNvdW50ID0gZnVuY3Rpb24oKXtcblx0XHRcdGxldCBpc1RpbWVPdXQgPSBfdGhpcy5kZWFsVGltZSgpO1xuXHRcdFx0aWYoaXNUaW1lT3V0KXtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0c3RvcENvdW50KCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHRpbWVDb3VudCgpO1xuXHRcdFx0fSwxMDAwKTtcblx0XHR9XHRcdFx0XHRcblx0XHRsZXQgc3RvcENvdW50ID0gZnVuY3Rpb24oKXtcblx0XHRcdGNsZWFyVGltZW91dCh0KTtcblx0XHR9XG5cdFx0XG5cdFx0dGltZUNvdW50KCk7XHRcblx0fVxuXHRcblx0ZXhwb3J0IGRlZmF1bHQge1xuXHRcdGNsb2NrOmZ1bmN0aW9uKG9wdGlvbil7XG5cdFx0XHRsZXQgdGVtcGNsb2NrID0gbmV3IGNsb2NrKG9wdGlvbik7XG5cdFx0XHR0ZW1wY2xvY2suaW5pdCgpO1x0XHRcblx0XHRcdHJldHVybiB0ZW1wY2xvY2s7XG5cdFx0fVxuXHR9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29udHJvbGVyL2Nsb2NrLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQndBQUFBY0NBWUFBQUJ5RGQrVUFBQUFBWE5TUjBJQXJzNGM2UUFBQW9oSlJFRlVTQTI5bHIrT0dqRVF4bTFEb0FtZ0V5Mml1ZzA4QUZKRWtWd2JLZEYxMTlIa0xmSUk5eGJYWEpjdXV1TEtTQ2xPa2U0QklHeUZFS0piQk5jdExQZDlxelh5YnJ4ZS9pV1dsckU5NC9saGUyeVBGQVZsdTkzSzhYajhJWXFpTHpEdG8rMUJYaVREQWlubEdQVW5wZFNENTNtLzBONG1PcXVRMWw1MHdyRWFqVVpmSWIraGVabG5sK24zQWJ6dGREcDNrRkZHRnpldHdPRncySUgySHJDZWJWQlJIMkRQc0JsMHU5MVIxdll2SUdDZkFQb093N2RaNHdQYkx3RGZBUHBvamtzQkU5Z1BHTHd4alU2b2g0QmVtOUFka011SW1YRXBUcDFaOXY5eHBqMjl2SXBhZ0NqdjhaMGJSdmYweVhpSVdmRlBFbzFIQlFnOUZoWEFlbVRRVHFFaDhUSDBuUVhuTEZkZkxwY0ZsaTFYVHdVWlpQRlFYNjNYNjU4dTYyYXpLUnFOaHBoTUpnSzJLVlBDMnUyMkNNTlFUS2RUT2s3cHpVYXBWTHBTbTgzbXM5bHBxMWVyVlZHcFZHTEhCT2lpWWRUQmp4UEdNYnl0dUU1OTdTQlB6bVl6c1Z3dVUxQVRSaDF0OWlqOU1wYUFkMk5oMFE3cjlYbzhVdzdnekE2QWNRVThybysraVBlQ01qaHF0VnBzdTFxdDlwMlo5bjJSSDNyYXhKQmNSdTZuTHF5YmU2cjdYWkxBd0dXZ2Rkazl5KzZwdGl1UWdjSVM4VDF6bGl5TSsya0xKS2NUS01uaURKOWNodHd6bmpOYmdKalFWcXZsY3FOMWZLalZnMjdaSkE5eUVBUzUwVWpvWXJFUTgvbmNOanpWUnhhdk5ZbVg0ZzgwKzc3cUtTY0hOSHk4R08rNGg3amc1TzBCQTQ4eUpTTm1jVFJteWZ6bE4rUS9lVEVBZWthZTh4NHlpczhoSytBTzhMM3dENXk1ME9jZ1lZamR3ZWVMak00YktNTXpBcGxpTUsvWkpWTTdJQ0ZRUE1MZ0d0Vnp6SlNwUlNxZklTTUZaRWNDN2NHWStjMVJoV1B4TVk5SlpXeDBsdnRNSjRIMGZ4SmhjMW84cDc3dmYwd2U2cE5UL1ZjemxDMXptU2MwMndBQUFBQkpSVTVFcmtKZ2dnPT1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGlicy9pbWcvaWNvbl9kZWxldGUucG5nXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIl0sInNvdXJjZVJvb3QiOiIifQ==