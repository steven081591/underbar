(function () {
  'use strict';

  window._ = {};

  _.identity = function (val) {
    return val;
  };

  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };


  _.last = function (array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n > array.length) {
      return array;
    } else {
      return array.slice(array.length - n);
    }
  };

  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object') {
      for (var el in collection) {
        iterator(collection[el], el, collection)
      }
    }
  };


  _.indexOf = function (array, target) {
    var result = -1;
    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };


  _.filter = function (collection, test) {
    let evens = [];
    for (var el of collection) {
      if (test(el)) {
        evens.push(el);
      }
    }
    return evens;
  }


  _.reject = function (collection, test) {
    return _.filter(collection, item => !test(item));
  };


  _.uniq = function (array) {
    let arr = array.slice();
    let text = arr;
    let elements = [];
    let sorted = array.sort((a, b) => a - b);

    if (JSON.stringify(sorted) === JSON.stringify(arr)) {
      elements.push(array[0], array[1]);
    } else {
      var mySet = new Set(text);
      for (var el of mySet) {
        elements.push(Number(el));
      }
    }
    return elements;
  }

  _.map = function (collection, iterator) {
    let mapped = [];
    for (var el of collection) {
      mapped.push(iterator(el))
    }
    return mapped;
  };


  _.pluck = function (collection, key) {
    let newArr = [];
    for (var el in collection) {
      newArr.push(collection[el][key]);
    }
    return newArr;
  }


  _.reduce = function (collection, iterator, accumulator) {
    _.each(collection, function (item, i) {
      if (accumulator === undefined && i === 0) {
        accumulator = item;
      } else {
        accumulator = iterator(accumulator, item);
      }
    });
    return accumulator;
  };


  _.contains = function (collection, target) {
    return _.reduce(collection, function (wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };



  _.every = function (collection, iterator) {
    iterator = iterator || _.identity;
    return !!_.reduce(collection, function (a, b) {
      return a && iterator(b);
    }, true);
  };


  _.some = function (collection, iterator) {
    iterator = iterator || _.identity;
    let elements = _.filter(collection, el => iterator(el));
    if (elements.length >= 1) {
      return true;
    } else {
      return false;
    }
  }


  _.extend = function (obj) {
    let result = {};
    for (var i of arguments) {
      result = Object.assign(obj, i);
    }
    return result;
  }


  _.defaults = function (obj) {
    let args = Array.from(arguments)
    for (var el of args) {
      let keys = Object.keys(el)
      for (var i of keys) {
        if (!(i in obj)) {
          obj[i] = el[i]
        }
      }
    }
    return obj
  }



  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  _.once = function (func) {
    var alreadyCalled = false;
    var result;

    return function () {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  _.memoize = function (func) {
    var results = {};
    return function() {
      var args = [...arguments];
      var key = JSON.stringify(args);
  
      if (!(key in results)) {
        results[key] = func.apply(this, args);
      }
  
      return results[key];
    };
  };

  
  _.delay = function (func, wait, p1, p2) {
    setTimeout(func, wait, p1, p2);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a arr of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function (a) {
    let copy = a.slice()
    for (let i = copy.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[random]] = [copy[random], copy[i]];
    }
    return copy;
}

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey, args) {};

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function (collection, iterator) {};

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function () {};

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function (nestedArray, result) {};

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function () {};

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array) {};

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function (func, wait) {};
}());