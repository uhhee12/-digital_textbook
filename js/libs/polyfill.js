'use strict';

// String.prototype.includes()
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict';

    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// Object.entries
if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array

    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }

    return resArray;
  };
}

// Array.fill
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function value(_value) {
      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this); // Steps 3-5.

      var len = O.length >>> 0; // Steps 6-7.

      var start = arguments[1];
      var relativeStart = start >> 0; // Step 8.

      var k =
        relativeStart < 0
          ? Math.max(len + relativeStart, 0)
          : Math.min(relativeStart, len); // Steps 9-10.

      var end = arguments[2];
      var relativeEnd = end === undefined ? len : end >> 0; // Step 11.

      var final =
        relativeEnd < 0
          ? Math.max(len + relativeEnd, 0)
          : Math.min(relativeEnd, len); // Step 12.

      while (k < final) {
        O[k] = _value;
        k++;
      } // Step 13.

      return O;
    },
  });
}

// ParentNode.append()
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }

    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem))
          );
        });
        this.appendChild(docFrag);
      },
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// prepend
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem))
          );
        });

        this.insertBefore(docFrag, this.firstChild);
      },
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// ChildNode.remove()
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null) this.parentNode.removeChild(this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

// NodeList.prototype.forEach()
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function value(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      } // 1. Let O be ? ToObject(this value).

      var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

      var len = o.length >>> 0; // 3. If len is 0, return false.

      if (len === 0) {
        return false;
      } // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)

      var n = fromIndex | 0; // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.

      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return (
          x === y ||
          (typeof x === 'number' &&
            typeof y === 'number' &&
            isNaN(x) &&
            isNaN(y))
        );
      } // 7. Repeat, while k < len

      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        } // c. Increase k by 1.

        k++;
      } // 8. Return false

      return false;
    },
  });
}

// Object.entries()
if (!Object.entries)
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array

    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }

    return resArray;
  };

// Element.closest()
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}

// MouseEvent path property polyfill
if (!('path' in Event.prototype)) {
  Object.defineProperty(Event.prototype, 'path', {
    get: function get() {
      var path = [];
      var currentElem = this.target;

      while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
      }

      if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
        path.push(document);
      if (path.indexOf(window) === -1) path.push(window);
      return path;
    },
  });
}

// dataset property polyfill
Object.defineProperty(Element.prototype, 'dataset', {
  get: function () {
    var element = this;
    var attributes = this.attributes;
    var map = {};

    for (var i = 0; i < attributes.length; i++) {
      var attribute = attributes[i];

      if (
        attribute &&
        attribute.name &&
        /^data-\w[\w-]*$/.test(attribute.name)
      ) {
        var name = attribute.name;
        var value = attribute.value;

        var propName = name.substr(5).replace(/-./g, function (prop) {
          return prop.charAt(1).toUpperCase();
        });

        Object.defineProperty(map, propName, {
          enumerable: true,
          get: function () {
            return this.value;
          }.bind({ value: value || '' }),
          set: function setter(name, value) {
            if (typeof value !== 'undefined') {
              this.setAttribute(name, value);
            } else {
              this.removeAttribute(name);
            }
          }.bind(element, name),
        });
      }
    }

    return map;
  },
});

// SVG classList polyfill
if (!('classList' in SVGElement.prototype)) {
  Object.defineProperty(SVGElement.prototype, 'classList', {
    get: function () {
      var that = this;

      return {
        contains: function (className) {
          return that.className.baseVal.split(' ').indexOf(className) !== -1;
        },
        add: function (className) {
          return that.setAttribute(
            'class',
            that.getAttribute('class') + ' ' + className
          );
        },
        remove: function (className) {
          var removedClass = that
            .getAttribute('class')
            .replace(new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'), '$2');

          if (that.classList.contains(className)) {
            that.setAttribute('class', removedClass);
          }
        },
      };
    },
  });
}

// contains polyfill
(function () {
  function contains(node) {
    if (!(0 in arguments)) {
      throw new TypeError('1 argument is required');
    }

    do {
      if (this === node) {
        return true;
      }
      // eslint-disable-next-line no-cond-assign
    } while ((node = node && node.parentNode));

    return false;
  }

  // IE
  if ('HTMLElement' in self && 'contains' in HTMLElement.prototype) {
    try {
      delete HTMLElement.prototype.contains;
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  if ('Node' in self) {
    Node.prototype.contains = contains;
  } else {
    document.contains = Element.prototype.contains = contains;
  }
})();

// Array.flat()
if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth) {
    'use strict';

    // If no depth is specified, default to 1
    if (depth === undefined) {
      depth = 1;
    }

    // Recursively reduce sub-arrays to the specified depth
    var flatten = function (arr, depth) {
      // If depth is 0, return the array as-is
      if (depth < 1) {
        return arr.slice();
      }

      // Otherwise, concatenate into the parent array
      return arr.reduce(function (acc, val) {
        return acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val);
      }, []);
    };

    return flatten(this, depth);
  };
}