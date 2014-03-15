/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	version = "1.11.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: trim && !trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
	// We need to execute this one support test ASAP because we need to know
	// if body.style.zoom needs to be set.

	var container, div,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

	div = document.createElement( "div" );
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

		if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );

	// Null elements to avoid leaks in IE
	container = div = null;
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		input = document.createElement("input");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	fragment = div = input = null;
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined && (
				// Support: IE < 9
				src.returnValue === false ||
				// Support: Android < 4.0
				src.getPreventDefault && src.getPreventDefault() ) ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var a, shrinkWrapBlocksVal,
		div = document.createElement( "div" ),
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	support.shrinkWrapBlocks = function() {
		var body, container, div, containerStyles;

		if ( shrinkWrapBlocksVal == null ) {
			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
			container = document.createElement( "div" );
			div = document.createElement( "div" );

			body.appendChild( container ).appendChild( div );

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			if ( typeof div.style.zoom !== strundefined ) {
				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			body = container = div = null;
		}

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
		pixelPositionVal, reliableMarginRightVal,
		div = document.createElement( "div" ),
		containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal != null ) {
				return reliableHiddenOffsetsVal;
			}

			var container, tds, isSupported,
				div = document.createElement( "div" ),
				body = document.getElementsByTagName( "body" )[ 0 ];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			// Setup
			div.setAttribute( "className", "t" );
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			container = document.createElement( "div" );
			container.style.cssText = containerStyles;

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			div = body = null;

			return reliableHiddenOffsetsVal;
		},

		boxSizing: function() {
			if ( boxSizingVal == null ) {
				computeStyleTests();
			}
			return boxSizingVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {
			var body, container, div, marginDiv;

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( reliableMarginRightVal == null && window.getComputedStyle ) {
				body = document.getElementsByTagName( "body" )[ 0 ];
				if ( !body ) {
					// Test fired too early or in an unsupported environment, exit.
					return;
				}

				container = document.createElement( "div" );
				div = document.createElement( "div" );
				container.style.cssText = containerStyles;

				body.appendChild( container ).appendChild( div );

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

				body.removeChild( container );
			}

			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		var container, div,
			body = document.getElementsByTagName( "body" )[ 0 ];

		if ( !body ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		container = document.createElement( "div" );
		div = document.createElement( "div" );
		container.style.cssText = containerStyles;

		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			boxSizingVal = div.offsetWidth === 4;
		});

		// Will be changed later if needed.
		boxSizingReliableVal = true;
		pixelPositionVal = false;
		reliableMarginRightVal = true;

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE.
		div = body = null;
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		dDisplay = defaultDisplay( elem.nodeName );
		if ( display === "none" ) {
			display = dDisplay;
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var a, input, select, opt,
		div = document.createElement("div" );

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// Null elements to avoid leaks in IE.
	a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					jQuery.text( elem );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      rails.handleRemote(button);
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, allowLinkExtensions, anchoredLink, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, crossOriginLink, currentState, enableTransitionCache, executeScriptTags, extractLink, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, handleClick, historyStateIsDefined, htmlExtensions, ignoreClick, initializeTurbolinks, installClickHandlerLast, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, noTurbolink, nonHtmlLink, nonStandardClick, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeHash, removeHashForIE10compatiblity, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, targetLink, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  htmlExtensions = ['html'];

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', removeHashForIE10compatiblity(url), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    pageCache[currentState.url] = {
      url: document.location.href,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  reflectNewUrl = function(url) {
    if (url !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url
      }, '', url);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      preservedHash = removeHash(location) === location ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  removeHashForIE10compatiblity = function(url) {
    return removeHash(url);
  };

  removeHash = function(url) {
    var link;
    link = url;
    if (url.href == null) {
      link = document.createElement('A');
      link.href = url;
    }
    return link.href.replace(link.hash, '');
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  installClickHandlerLast = function(event) {
    if (!event.defaultPrevented) {
      document.removeEventListener('click', handleClick, false);
      return document.addEventListener('click', handleClick, false);
    }
  };

  handleClick = function(event) {
    var link;
    if (!event.defaultPrevented) {
      link = extractLink(event);
      if (link.nodeName === 'A' && !ignoreClick(event, link)) {
        if (!pageChangePrevented()) {
          visit(link.href);
        }
        return event.preventDefault();
      }
    }
  };

  extractLink = function(event) {
    var link;
    link = event.target;
    while (!(!link.parentNode || link.nodeName === 'A')) {
      link = link.parentNode;
    }
    return link;
  };

  crossOriginLink = function(link) {
    return location.protocol !== link.protocol || location.host !== link.host;
  };

  anchoredLink = function(link) {
    return ((link.hash && removeHash(link)) === removeHash(location)) || (link.href === location.href + '#');
  };

  nonHtmlLink = function(link) {
    var url;
    url = removeHash(link);
    return url.match(/\.[a-z]+(\?.*)?$/g) && !url.match(new RegExp("\\.(?:" + (htmlExtensions.join('|')) + ")?(\\?.*)?$", 'g'));
  };

  noTurbolink = function(link) {
    var ignore;
    while (!(ignore || link === document)) {
      ignore = link.getAttribute('data-no-turbolink') != null;
      link = link.parentNode;
    }
    return ignore;
  };

  targetLink = function(link) {
    return link.target.length !== 0;
  };

  nonStandardClick = function(event) {
    return event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  };

  ignoreClick = function(event, link) {
    return crossOriginLink(link) || anchoredLink(link) || nonHtmlLink(link) || noTurbolink(link) || targetLink(link) || nonStandardClick(event);
  };

  allowLinkExtensions = function() {
    var extension, extensions, _i, _len;
    extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = extensions.length; _i < _len; _i++) {
      extension = extensions[_i];
      htmlExtensions.push(extension);
    }
    return htmlExtensions;
  };

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[event.state.url]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', installClickHandlerLast, true);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: allowLinkExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
/*
  OpenTok JavaScript Library v2.0.18
 http://www.tokbox.com/

 Copyright (c) 2013 TokBox, Inc.

 Date: March 03 10:04:11 2014
  Common JS Helpers on OpenTok 0.1.0 628a0b9 master
 http://www.tokbox.com/

 Copyright (c) 2014 TokBox, Inc.

 Date: January 08 04:13:37 2014

*/

(function(k){k.OT||(k.OT={});OT.properties={version:"v2.0.18",build:"f671691",debug:"false",websiteURL:"http://www.tokbox.com",cdnURL:"http://static.opentok.com",loggingURL:"http://hlg.tokbox.com/prod",apiURL:"http://anvil.opentok.com",messagingProtocol:"wss",messagingPort:443,supportSSL:"true",cdnURLSSL:"https://swww.tokbox.com",loggingURLSSL:"https://hlg.tokbox.com/prod",
apiURLSSL:"https://anvil.opentok.com"}})(window);
!function(k,c){var e=function(a){return document.getElementById(a)},g=k.OTHelpers;k.OTHelpers=e;e.noConflict=function(){e.noConflict=function(){return e};k.OTHelpers=g;return e};e.isEmpty=function(a){if(null===a||a===c)return!0;if(Array.isArray(a)||"string"===typeof a)return 0===a.length;for(var d in a)if(a.hasOwnProperty(d))return!1;return!0};e.isNone=function(a){return a===c||null===a};e.isObject=function(a){return a===Object(a)};e.isFunction=function(a){return"function"===typeof a};e.extend=function(){var a=
Array.prototype.slice.call(arguments),d=a.shift();a.forEach(function(a){for(var b in a)d[b]=a[b]});return d};e.defaults=function(){var a=Array.prototype.slice.call(arguments),d=a.shift();a.forEach(function(a){for(var b in a)void 0===d[b]&&(d[b]=a[b])});return d};e.clone=function(a){return!e.isObject(a)?a:Array.isArray(a)?a.slice():e.extend({},a)};e.noop=function(){};e.supportsWebSockets=function(){return"WebSocket"in k};e.now=function(){var a=k.performance||{},d,b=a.now||a.mozNow||a.msNow||a.oNow||
a.webkitNow;return b?(b=b.bind(a),d=a.timing.navigationStart,function(){return d+b()}):function(){return(new Date).getTime()}}();e.browser=function(){var a=k.navigator.userAgent.toLowerCase(),d,b="Unknown";-1<a.indexOf("firefox")&&(b="Firefox");-1<a.indexOf("opera")?b="Opera":-1<a.indexOf("msie")?b="IE":-1<a.indexOf("chrome")&&(b="Chrome");if((d=k.navigator.vendor)&&-1<d.toLowerCase().indexOf("apple"))b="Safari";a=null;e.browser=function(){return b};return b};e.canDefineProperty=!0;try{Object.defineProperty({},
"x",{})}catch(a){e.canDefineProperty=!1}e.defineGetters=function(a,b,d){var f={};void 0===d&&(d=!1);for(var h in b)f[h]={get:b[h],enumerable:d};Object.defineProperties(a,f)};Object.create||(Object.create=function(a){function d(){}if(1<arguments.length)throw Error("Object.create implementation only accepts the first parameter.");d.prototype=a;return new d});e.setCookie=function(a,d){try{localStorage.setItem(a,d)}catch(b){var f=new Date;f.setTime(f.getTime()+31536E6);f="; expires\x3d"+f.toGMTString();
document.cookie=a+"\x3d"+d+f+"; path\x3d/"}};e.getCookie=function(a){var d;try{return d=localStorage.getItem("opentok_client_id")}catch(b){a+="\x3d";for(var f=document.cookie.split(";"),h=0;h<f.length;h++){for(var c=f[h];" "==c.charAt(0);)c=c.substring(1,c.length);0===c.indexOf(a)&&(d=c.substring(a.length,c.length))}if(d)return d}return null};e.invert=function(a){var d={},b;for(b in a)a.hasOwnProperty(b)&&(d[a[b]]=b);return d};var d={escape:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;",'"':"\x26quot;",
"'":"\x26#x27;","/":"\x26#x2F;"}};d.unescape=e.invert(d.escape);var b={escape:RegExp("["+Object.keys(d.escape).join("")+"]","g"),unescape:RegExp("("+Object.keys(d.unescape).join("|")+")","g")};["escape","unescape"].forEach(function(a){e[a]=function(f){return null===f||f===c?"":(""+f).replace(b[a],function(b){return d[a][b]})}});e.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var h=/(.)^/,f={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028",
"\u2029":"u2029"},l=/\\|'|\r|\n|\t|\u2028|\u2029/g;e.template=function(a,d,b){var c;b=e.defaults({},b,e.templateSettings);var g=RegExp([(b.escape||h).source,(b.interpolate||h).source,(b.evaluate||h).source].join("|")+"|$","g"),k=0,s="__p+\x3d'";a.replace(g,function(d,b,h,c,g){s+=a.slice(k,g).replace(l,function(a){return"\\"+f[a]});b&&(s+="'+\n((__t\x3d("+b+"))\x3d\x3dnull?'':OTHelpers.escape(__t))+\n'");h&&(s+="'+\n((__t\x3d("+h+"))\x3d\x3dnull?'':__t)+\n'");c&&(s+="';\n"+c+"\n__p+\x3d'");k=g+d.length;
return d});s+="';\n";b.variable||(s="with(obj||{}){\n"+s+"}\n");s="var __t,__p\x3d'',__j\x3dArray.prototype.join,print\x3dfunction(){__p+\x3d__j.call(arguments,'');};\n"+s+"return __p;\n";try{c=new Function(b.variable||"obj",s)}catch(u){throw u.source=s,u;}if(d)return c(d);d=function(a){return c.call(this,a)};d.source="function("+(b.variable||"obj")+"){\n"+s+"}";return d}}(window);
(function(k,c,e){c.statable=function(g,a,d,b,h){var f,e=d;g.is=function(){return-1!==Array.prototype.indexOf.call(arguments,e)};g.isNot=function(){return-1===Array.prototype.indexOf.call(arguments,e)};Object.defineProperties(g,{state:{get:function(){return e}},previousState:{get:function(){return f}}});return function(d){e!==d&&(-1===a.indexOf(d)?h&&c.isFunction(h)&&h("invalidState",d):(f=e,e=d,b&&c.isFunction(b)&&b(d,f)))}}})(window,window.OTHelpers);
(function(k,c,e){function g(a,d){var b=d||0,f=n;return f[a[b++]]+f[a[b++]]+f[a[b++]]+f[a[b++]]+"-"+f[a[b++]]+f[a[b++]]+"-"+f[a[b++]]+f[a[b++]]+"-"+f[a[b++]]+f[a[b++]]+"-"+f[a[b++]]+f[a[b++]]+f[a[b++]]+f[a[b++]]+f[a[b++]]+f[a[b++]]}function a(a,b,d){d=b&&d||0;"string"==typeof a&&(b="binary"==a?new l(16):null,a=null);a=a||{};a=a.random||(a.rng||f)();a[6]=a[6]&15|64;a[8]=a[8]&63|128;if(b)for(var h=0;16>h;h++)b[d+h]=a[h];return b||g(a)}var d,b=Array(16);e=function(){for(var a,d=0,d=0;16>d;d++)0===(d&
3)&&(a=4294967296*Math.random()),b[d]=a>>>((d&3)<<3)&255;return b};if(k.crypto&&crypto.getRandomValues){var h=new Uint32Array(4);d=function(){crypto.getRandomValues(h);for(var a=0;16>a;a++)b[a]=h[a>>2]>>>8*(a&3)&255;return b}}var f=d||e,l="function"==typeof Buffer?Buffer:Array,n=[],m={};for(k=0;256>k;k++)n[k]=(k+256).toString(16).substr(1),m[n[k]]=k;a.v4=a;a.parse=function(a,b,d){var f=b&&d||0,h=0;b=b||[];for(a.toLowerCase().replace(/[0-9a-f]{2}/g,function(a){16>h&&(b[f+h++]=m[a])});16>h;)b[f+h++]=
0;return b};a.unparse=g;a.BufferClass=l;a.mathRNG=e;a.whatwgRNG=d;c.uuid=a})(window,window.OTHelpers);
(function(k,c,e){function g(a){Object.defineProperty(a.prototype,"firstElementChild",{get:function(){var a;for(a=this.firstChild;a&&1!=a.nodeType;)a=a.nextSibling;return a}});Object.defineProperty(a.prototype,"lastElementChild",{get:function(){var a;for(a=this.lastChild;a&&1!=a.nodeType;)a=a.previousSibling;return a}});Object.defineProperty(a.prototype,"nextElementSibling",{get:function(){for(var a=this;!c.isNone(a=a.nextSibling)&&1!=a.nodeType;);return a}});Object.defineProperty(a.prototype,"previousElementSibling",
{get:function(){for(var a=this;!c.isNone(a=a.previousSibling)&&1!=a.nodeType;);return a}})}c.parseXML=function(a){var d;k.DOMParser?d=(new DOMParser).parseFromString(a,"text/xml"):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(a),g(d));a=d.documentElement;return!a||!a.nodeName||"parsererror"===a.nodeName?null:d}})(window,window.OTHelpers);
(function(k,c,e){c.useLogHelpers=function(c){function a(a,b,e){return function(){if(c.shouldLog(b)){var m=k.console;if(m&&m[a])if(m[a].apply||Function.prototype.bind)m[a].apply||(m[a]=Function.prototype.bind.call(m[a],m)),m[a].apply(m,arguments);else m[a](Array.prototype.slice.apply(arguments).join(" "));else e&&e.apply(c,arguments);if(m=arguments){var r;try{r=JSON.stringify(m)}catch(q){r=m.toString()}2>=r.length||h.push([a,d(),r])}}}}function d(){var a=new Date;return a.toLocaleTimeString()+a.getMilliseconds()}
c.DEBUG=5;c.LOG=4;c.INFO=3;c.WARN=2;c.ERROR=1;c.NONE=0;var b=c.NONE,h=[];c.log=a("log",c.LOG);c.debug=a("debug",c.DEBUG,c.log);c.info=a("info",c.INFO,c.log);c.warn=a("warn",c.WARN,c.log);c.error=a("error",c.ERROR,c.log);c.setLogLevel=function(a){b="number"===typeof a?a:0;c.debug("TB.setLogLevel("+b+")");return b};c.getLogs=function(){return h};c.shouldLog=function(a){return b>=a}};c.useLogHelpers(c);c.setLogLevel(c.ERROR)})(window,window.OTHelpers);
(function(k,c,e){c.castToBoolean=function(c,a){return c===e?a:"true"===c||!0===c};c.roundFloat=function(c,a){return Number(c.toFixed(a))}})(window,window.OTHelpers);
(function(k,c,e){var g=[],a="OTHelpers."+c.uuid.v4()+".zero-timeout";k.addEventListener("message",function(d){d.source==k&&d.data==a&&(d.stopPropagation(),0<g.length&&(d=g.shift(),d.shift().apply(null,d)))},!0);c.callAsync=function(){g.push(Array.prototype.slice.call(arguments));k.postMessage(a,"*")};c.createAsyncHandler=function(a){return function(){var b=Array.prototype.slice.call(arguments);c.callAsync(function(){a.apply(null,b)})}}})(window,window.OTHelpers);
(function(k,c,e){c.eventing=function(e,a){function d(a,b,d){var f=h[a];if(f&&0!==f.length){var e=f.length;f.forEach(function(f){function g(a){return a.context===f.context&&a.handler===f.handler}c.callAsync(function(){try{h[a]&&h[a].some(g)&&(f.closure||f.handler).apply(f.context||null,b)}finally{e--,0===e&&d&&d.apply(null,b.slice())}})})}}function b(a,b){var d=h[a];d&&0!==d.length&&d.forEach(function(a){(a.closure||a.handler).apply(a.context||null,b)})}var h={},f=!0===a?b:d,l=function(a,b){h[a]&&
(b?h[a]=h[a].filter(function(a){return a.context!==b}):delete h[a])},n=function(a,b,d,f){var c={handler:b};d&&(c.context=d);f&&(c.closure=f);a.forEach(function(a){h[a]||(h[a]=[]);h[a].push(c)})}.bind(e),m=function(a,b,d){function f(a){return!(a.handler===b&&a.context===d)}a.forEach(function(a){h[a]&&(h[a]=h[a].filter(f),0===h[a].length&&delete h[a])})}.bind(e);e.dispatchEvent=function(a,b){if(!a.type)throw c.error("OTHelpers.Eventing.dispatchEvent: Event has no type"),c.error(a),Error("OTHelpers.Eventing.dispatchEvent: Event has no type");
a.target||(a.target=this);if(!h[a.type]||0===h[a.type].length){var d=[a];b&&b.apply(null,d.slice())}else return f(a.type,[a],b),this};e.trigger=function(a){if(h[a]&&0!==h[a].length){var b=Array.prototype.slice.call(arguments);b.shift();f(a,b);return this}};e.on=function(a,b,d){if("string"===typeof a&&b)n(a.split(" "),b,d);else for(var f in a)a.hasOwnProperty(f)&&n([f],a[f],b);return this};e.off=function(a,b,d){if("string"===typeof a)b&&c.isFunction(b)?m(a.split(" "),b,d):a.split(" ").forEach(function(a){l(a,
b)},this);else if(a)for(var f in a)a.hasOwnProperty(f)&&m([f],a[f],b);else h={};return this};e.once=function(a,b,d){var f=a.split(" ");a=function(){var a=b.apply(d||null,arguments);m(f,b,d);return a}.bind(this);n(f,b,d,a);return this};e.addEventListener=function(a,b,d){n([a],b,d)};e.removeEventListener=function(a,b,d){m([a],b,d)};return e};c.eventing.Event=function(){return function(g,a){this.type=g;this.cancelable=a!==e?a:!0;var d=!1,b=null;this.preventDefault=function(){this.cancelable?d=!0:c.warn("Event.preventDefault :: Trying to preventDefault on an Event that isn't cancelable")};
this.isDefaultPrevented=function(){return d};c.canDefineProperty&&Object.defineProperty(this,"target",{set:function(a){b=a},get:function(){return b}})}}})(window,window.OTHelpers);
(function(k,c,e){function g(a){for(var d in a)if(a.hasOwnProperty(d))return!0;return!1}c.supportsClassList=function(){var a=typeof("undefined"!==document)&&"classList"in document.createElement("a");c.supportsClassList=function(){return a};return a};c.removeElement=function(a){a&&a.parentNode&&a.parentNode.removeChild(a)};c.removeElementById=function(a){this.removeElement(c(a))};c.removeElementsByType=function(a,d){if(a)for(var b=a.getElementsByTagName(d);b.length;)a.removeChild(b[0])};c.emptyElement=
function(a){for(;a.firstChild;)a.removeChild(a.firstChild);return a};c.createElement=function(a,d,b){a=document.createElement(a);if(d)for(var c in d)if("object"===typeof d[c]){a[c]||(a[c]={});var f=d[c],e;for(e in f)a[c][e]=f[e]}else"className"===c?a.className=d[c]:a.setAttribute(c,d[c]);b&&(a.innerHTML=b);return a};c.createButton=function(a,d,b){a=c.createElement("button",d,a);if(b){for(var h in b)if(b.hasOwnProperty(h))c.on(a,h,b[h]);a._boundEvents=b}return a};c.on=function(a,d,b){if(a.addEventListener)a.addEventListener(d,
b,!1);else if(a.attachEvent)a.attachEvent("on"+d,b);else{var c=a["on"+d];a["on"+d]=function(){b.apply(this,arguments);c&&c.apply(this,arguments)}}};c.off=function(a,d,b){a.removeEventListener?a.removeEventListener(d,b,!1):a.detachEvent&&a.detachEvent("on"+d,b)};c.isDisplayNone=function(a){return(0===a.offsetWidth||0===a.offsetHeight)&&"none"===c.css(a,"display")?!0:a.parentNode&&a.parentNode.style?c.isDisplayNone(a.parentNode):!1};c.findElementWithDisplayNone=function(a){return(0===a.offsetWidth||
0===a.offsetHeight)&&"none"===c.css(a,"display")?a:a.parentNode&&a.parentNode.style?c.findElementWithDisplayNone(a.parentNode):null};c.observeStyleChanges=function(a,d,b){var h={},f=function(b){switch(b){case "width":return c.width(a);case "height":return c.height(a);default:return c.css(a)}};d.forEach(function(a){h[a]=f(a)});var e=new MutationObserver(function(e){var l={};e.forEach(function(b){if("style"===b.attributeName){var e=c.isDisplayNone(a);d.forEach(function(a){if(!e||!("width"==a||"height"==
a)){var b=f(a);b!==h[a]&&(l[a]=[h[a],b],h[a]=b)}})}});g(l)&&c.callAsync(function(){b.call(null,l)})});e.observe(a,{attributes:!0,attributeFilter:["style"],childList:!1,characterData:!1,subtree:!1});return e};c.observeNodeOrChildNodeRemoval=function(a,d){var b=new MutationObserver(function(a){var b=[];a.forEach(function(a){a.removedNodes.length&&(b=b.concat(Array.prototype.slice.call(a.removedNodes)))});b.length&&c.callAsync(function(){d(b)})});b.observe(a,{attributes:!1,childList:!0,characterData:!1,
subtree:!0});return b}})(window,window.OTHelpers);
(function(k,c,e){c.Modal=function(e,a){this.el=c.createElement("section",{className:"OT_root OT_dialog OT_modal"},c.template("        \x3cheader\x3e            \x3ch1\x3e\x3c%%\x3d title %\x3e\x3c/h1\x3e        \x3c/header\x3e        \x3cdiv class\x3d'OT_dialog-body'\x3e            \x3c%%\x3d body %\x3e        \x3c/div\x3e    ",{title:e,body:a}));this.el.style.display="none";document.body.appendChild(this.el);c.centerElement(this.el);c.show(this.el);this.close=function(){c.removeElement(this.el);
this.el=null;return this}};c.tbAlert=function(e,a){var d=new c.Modal(e,"\x3cdiv\x3e"+a+"\x3c/div\x3e");c.addClass(d.el,"OT_tbalert");var b=c.createElement("input",{className:"OT_closeButton",type:"button",value:"close"});d.el.appendChild(b);b.onclick=function(){d&&d.close();d=null}}})(window,window.OTHelpers);
(function(k,c,e){c.addClass=function(a,d){if(1===a.nodeType){var b=d.trim().split(/\s+/),h,f;if(c.supportsClassList()){h=0;for(f=b.length;h<f;++h)a.classList.add(b[h])}else{if(!a.className&&1===b.length)a.className=d;else{var e=" "+a.className+" ";h=0;for(f=b.length;h<f;++h)~e.indexOf(" "+b[h]+" ")||(e+=b[h]+" ");a.className=e.trim()}return this}}};c.removeClass=function(a,d){if(d&&1===a.nodeType){var b=d.trim().split(/\s+/),h,f;if(c.supportsClassList()){h=0;for(f=b.length;h<f;++h)a.classList.remove(b[h])}else{var e=
(" "+a.className+" ").replace(/[\s+]/," ");h=0;for(f=b.length;h<f;++h)e=e.replace(" "+b[h]+" "," ");a.className=e.trim();return this}}};var g=function(a){return 0<a.offsetHeight?a.offsetHeight+"px":c.css(a,"height")};c.width=function(a,d){return d?(c.css(a,"width",d),this):c.isDisplayNone(a)?c.makeVisibleAndYield(a,function(){return 0<a.offsetWidth?a.offsetWidth+"px":c.css(a,"width")}):0<a.offsetWidth?a.offsetWidth+"px":c.css(a,"width")};c.height=function(a,d){return d?(c.css(a,"height",d),this):
c.isDisplayNone(a)?c.makeVisibleAndYield(a,function(){return g(a)}):g(a)};c.centerElement=function(a,d,b){d||(d=parseInt(c.width(a),10));b||(b=parseInt(c.height(a),10));c.css(a,"margin",-0.5*b+"px 0 0 "+(-0.5*d+"px"));c.addClass(a,"OT_centered")}})(window,window.OTHelpers);
(function(k,c,e){var g={},a={};c.show=function(d){var b=d.style.display;if(""===b||"none"===b)d.style.display=g[d]||"",delete g[d];if("none"===d.ownerDocument.defaultView.getComputedStyle(d,null).getPropertyValue("display")){g[d]="none";b=d.style;if(a[d.ownerDocument]&&a[d.ownerDocument][d.nodeName])d=a[d.ownerDocument][d.nodeName];else{a[d.ownerDocument]||(a[d.ownerDocument]={});var h=d.ownerDocument.createElement(d.nodeName);d.ownerDocument.body.appendChild(h);d=a[d.ownerDocument][d.nodeName]=c.css(h,
"display");c.removeElement(h)}b.display=d}return this};c.hide=function(a){if("none"!==a.style.display)return g[a]=a.style.display,a.style.display="none",this};c.css=function(a,b,c){if("string"!==typeof b){a=a.style;for(var f in b)a[f]=b[f];return this}if(c!==e)return a.style[b]=c,this;b=b.replace(/([A-Z]|^ms)/g,"-$1").toLowerCase();f=a.ownerDocument.defaultView.getComputedStyle(a,null).getPropertyValue(b);""===f&&(f=a.style[b]);return f};c.applyCSS=function(a,b,h){var f={},e;for(e in b)b.hasOwnProperty(e)&&
(f[e]=a.style[e],c.css(a,e,b[e]));h=h();for(e in b)b.hasOwnProperty(e)&&c.css(a,e,f[e]||"");return h};c.makeVisibleAndYield=function(a,b){var h=c.findElementWithDisplayNone(a);if(h)return c.applyCSS(h,{display:"block",visibility:"hidden"},b)}})(window,window.OTHelpers);
(function(k,c,e){function g(a){if("string"===typeof a)return a;var b=[],c;for(c in a)b.push(encodeURIComponent(c)+"\x3d"+encodeURIComponent(a[c]));return b.join("\x26").replace(/\+/g,"%20")}c.getXML=function(a,b){var h=b&&b.success,f=c.extend(b.headers||{},{"Content-Type":"application/xml"});c.get(a,c.extend(b||{},{success:function(a){var d=a.target.responseXML,f;d?(f=d.documentElement,f=!f||!f.nodeName||"parsererror"===f.nodeName?!1:!0):f=!1;f?h&&h(d,a,a.target):b&&b.error&&b.error(a,a.target)},
headers:f}))};c.getJSON=function(a,b){var h=b&&b.success;c.get(a,c.extend(b||{},{success:function(a){var d;try{d=JSON.parse(a.target.responseText)}catch(c){b&&b.error&&b.error(a,a.target);return}h&&h(d,a,a.target)},headers:{"Content-Type":"application/json"}}))};c.get=function(d,b){var c=new XMLHttpRequest,f=b||{};a(c,f.success,f.error);f.process&&c.addEventListener("progress",f.progress,!1);f.cancelled&&c.addEventListener("abort",f.cancelled,!1);c.open("GET",d,!0);f.headers||(f.headers={});for(var e in f.headers)c.setRequestHeader(e,
f.headers[e]);c.send()};c.post=function(d,b){var c=new XMLHttpRequest,f=b||{};a(c,f.success,f.error);f.process&&c.addEventListener("progress",f.progress,!1);f.cancelled&&c.addEventListener("abort",f.cancelled,!1);c.open("POST",d,!0);f.headers||(f.headers={});for(var e in f.headers)c.setRequestHeader(e,f.headers[e]);c.send(g(f.data))};c.postFormData=function(a,b,e){if(!b)throw Error("OTHelpers.postFormData must be passed a data options.");var f=new FormData,g;for(g in b)f.append(g,b[g]);c.post(a,c.extend(e||
{},{data:f}))};c.getJSONP=function(a,b){var h,f=document.head||document.getElementsByTagName("head")[0],g,n=a,m=c.extend(b||{},{callbackParameter:"callback"}),k=function(){g&&(clearTimeout(g),g=null);h&&(h.onload=h.onreadystatechange=null,c.removeElement(h),h=e)},q=function(){if((!h.readyState||/loaded|complete/.test(h.readyState))&&g)clearTimeout(g),g=null};m.callbackName="jsonp_callback_"+ +new Date;this.jsonp_callbacks[m.callbackName]=function(a){k();m.success&&m.success(a)};n+=(/\?/.test(n)?"\x26":
"?")+m.callbackParameter+"\x3d"+m.callbackName;h=c.createElement("script",{async:"async",src:n,onload:q,onreadystatechange:q});f.appendChild(h);g=setTimeout(function(){k();c.error("The JSONP request to "+n+" timed out after 30000ms.");m.error&&m.error("The JSONP request to "+a+" timed out after 30000ms.",n,m)},3E4)};var a=function(a,b,c){a.addEventListener("load",function(a){var d=a.target.status;200<=d&&300>d||304===d?b&&b.apply(null,arguments):c&&c(a)},!1);c&&a.addEventListener("error",c,!1)}})(window,
window.OTHelpers);
!function(k){k.OT||(k.OT={});OT.$=OTHelpers.noConflict();OT.$.eventing(OT);OT.Modal=OT.$.Modal;OT.$.useLogHelpers(OT);var c=!1,e=OT.setLogLevel;OT.setLogLevel=function(g){OT.$.setLogLevel(g);g=e.call(OT,g);OT.shouldLog(OT.DEBUG)&&!c&&(OT.debug("OpenTok JavaScript library "+OT.properties.version),OT.debug("Release notes: "+OT.properties.websiteURL+"/opentok/webrtc/docs/js/release-notes.html"),OT.debug("Known issues: "+OT.properties.websiteURL+"/opentok/webrtc/docs/js/release-notes.html#knownIssues"),c=
!0);OT.debug("TB.setLogLevel("+g+")");return g};OT.setLogLevel(OT.properties.debug?OT.DEBUG:OT.ERROR)}(window);
(function(k){k.OT||(k.OT={});if(!OT.properties)throw Error("OT.properties does not exist, please ensure that you include a valid properties file.");var c=OT,e=OT.properties,g=OT.$.clone(e);g.debug="true"===e.debug||!0===e.debug;g.supportSSL="true"===e.supportSSL||!0===e.supportSSL;g.supportSSL&&(0<=k.location.protocol.indexOf("https")||0<=k.location.protocol.indexOf("chrome-extension"))?(g.assetURL=g.cdnURLSSL+"/webrtc/"+g.version,g.loggingURL=g.loggingURLSSL,g.apiURL=g.apiURLSSL):g.assetURL=g.cdnURL+
"/webrtc/"+g.version;g.configURL=g.assetURL+"/js/dynamic_config.min.js";g.cssURL=g.assetURL+"/css/ot.min.css";c.properties=g})(window);
(function(k){OT.Config=function(){var c=!1,e={},g={},a,d=document.head||document.getElementsByTagName("head")[0],b,h=function(){b&&(clearTimeout(b),b=null);a&&(a.onload=a.onreadystatechange=null,d&&a.parentNode&&d.removeChild(a),a=void 0)},f=function(){if(!a.readyState||/loaded|complete/.test(a.readyState))b&&(clearTimeout(b),b=null),c||l._onLoadTimeout()},l={loadTimeout:4E3,load:function(e){if(!e)throw Error("You must pass a valid configUrl to Config.load");c=!1;setTimeout(function(){a=document.createElement("script");
a.async="async";a.src=e;a.onload=a.onreadystatechange=f.bind(this);d.appendChild(a)},1);b=setTimeout(function(){l._onLoadTimeout()},this.loadTimeout)},_onLoadTimeout:function(){h();OT.warn("TB DynamicConfig failed to load in "+l.loadTimeout+" ms");this.trigger("dynamicConfigLoadFailed")},isLoaded:function(){return c},reset:function(){h();c=!1;e={};g={}},replaceWith:function(a){h();a||(a={});e=a.global||{};g=a.partners||{};c||(c=!0);this.trigger("dynamicConfigChanged")},get:function(a,b,d){a=d&&g[d]&&
g[d][a]?g[d][a]:e[a];return a?a[b]:null}};OT.$.eventing(l);return l}()})(window);
(function(k){function c(a,d,b,c,f){d=d?parseInt(d,10):parseInt(OT.$.width(a.parentNode),10);b=b?parseInt(b,10):parseInt(OT.$.height(a.parentNode),10);if(!(0===d||0===b))if(c||(c=e),b=(d+0)/b,d={width:"100%",height:"100%",left:0,top:0},b>c?(c=100*(b/c),d.height=c+"%",d.top="-"+(c-100)/2+"%"):b<c&&(c=100*(c/b),d.width=c+"%",d.left="-"+(c-100)/2+"%"),OT.$.css(a,d),c=a.querySelector("video"))f?(f=a.offsetWidth,a=a.offsetHeight,d={width:a+"px",height:f+"px",marginTop:"",marginLeft:""},a=f-a,d.marginLeft=
a/2+"px",d.marginTop=-(a/2)+"px",OT.$.css(c,d)):OT.$.css(c,{width:"",height:"",marginTop:"",marginLeft:""})}var e=4/3,g=function(a,d){var b,c;a&&a.nodeName?(b=a,(!b.getAttribute("id")||0===b.getAttribute("id").length)&&b.setAttribute("id","OT_"+OT.$.uuid()),c=b.getAttribute("id")):(b=OT.$(a),c=a||"OT_"+OT.$.uuid());b?OT.$.emptyElement(b):(b=OT.$.createElement("div",{id:c}),b.style.backgroundColor="#000000",document.body.appendChild(b));null==d||"replace"==d||(c=document.createElement("div"),c.id=
"OT_"+OT.$.uuid(),"append"==d?(b.appendChild(c),b=c):"before"==d?(b.parentNode.insertBefore(c,b),b=c):"after"==d&&(b.parentNode.insertBefore(c,b.nextSibling),b=c));return b};OT.WidgetView=function(a,d){var b=g(a,d&&d.insertMode),e=document.createElement("div"),f,l,n,m,k,q=!0;d&&(width=d.width,height=d.height,width&&"number"==typeof width&&(width+="px"),height&&"number"==typeof height&&(height+="px"),b.style.width=width?width:"264px",b.style.height=height?height:"198px",b.style.overflow="hidden",(void 0===
d.mirror||d.mirror)&&OT.$.addClass(b,"OT_mirrored"));d.classNames&&OT.$.addClass(b,d.classNames);OT.$.addClass(b,"OT_loading");OT.$.addClass(e,"OT_video-container");e.style.width=b.style.width;e.style.height=b.style.height;b.appendChild(e);c(e,b.offsetWidth,b.offsetHeight);k=document.createElement("div");OT.$.addClass(k,"OT_video-loading");e.appendChild(k);m=document.createElement("div");OT.$.addClass(m,"OT_video-poster");e.appendChild(m);f=OT.$.observeStyleChanges(b,["width","height"],function(a){c(e,
a.width?a.width[1]:b.offsetWidth,a.height?a.height[1]:b.offsetHeight,l?l.aspectRatio:null)});n=OT.$.observeNodeOrChildNodeRemoval(b,function(a){l&&(a.some(function(a){return a===e||"VIDEO"===a.nodeName})&&(l.destroy(),l=null),e&&(OT.$.removeElement(e),e=null),f&&(f.disconnect(),f=null),n&&(n.disconnect(),n=null))});this.destroy=function(){f&&(f.disconnect(),f=null);n&&(n.disconnect(),n=null);l&&(l.destroy(),l=null);b&&(OT.$.removeElement(b),b=null)};Object.defineProperties(this,{showPoster:{get:function(){return!OT.$.isDisplayNone(m)},
set:function(a){a?OT.$.show(m):OT.$.hide(m)}},poster:{get:function(){return OT.$.css(m,"backgroundImage")},set:function(a){OT.$.css(m,"backgroundImage","url("+a+")")}},loading:{get:function(){return q},set:function(a){(q=a)?OT.$.addClass(b,"OT_loading"):OT.$.removeClass(b,"OT_loading")}},video:{get:function(){return l},set:function(a){l&&l.destroy();a.appendTo(e);l=a;l.on({orientationChanged:function(){c(e,b.offsetWidth,b.offsetHeight,l.aspectRatio,l.isRotated)}});c(e,b.offsetWidth,b.offsetHeight,
l?l.aspectRatio:null,l?l.isRotated:null)}},domElement:{get:function(){return b}},domId:{get:function(){return b.getAttribute("id")}}});this.addError=function(a){b.innerHTML="\x3cp\x3e"+a+"\x3cp\x3e";OT.$.addClass(b,"OT_subscriber_error")}}})(window);
(function(k){var c=function(){if(navigator.getUserMedia)return navigator.getUserMedia.bind(navigator);if(navigator.mozGetUserMedia)return navigator.mozGetUserMedia.bind(navigator);if(navigator.webkitGetUserMedia)return navigator.webkitGetUserMedia.bind(navigator)}();navigator.webkitGetUserMedia?(webkitMediaStream.prototype.getVideoTracks||(webkitMediaStream.prototype.getVideoTracks=function(){return this.videoTracks}),webkitMediaStream.prototype.getAudioTracks||(webkitMediaStream.prototype.getAudioTracks=
function(){return this.audioTracks}),webkitRTCPeerConnection.prototype.getLocalStreams||(webkitRTCPeerConnection.prototype.getLocalStreams=function(){return this.localStreams}),webkitRTCPeerConnection.prototype.getRemoteStreams||(webkitRTCPeerConnection.prototype.getRemoteStreams=function(){return this.remoteStreams})):navigator.mozGetUserMedia&&(MediaStream.prototype.getVideoTracks||(MediaStream.prototype.getVideoTracks=function(){return[]}),MediaStream.prototype.getAudioTracks||(MediaStream.prototype.getAudioTracks=
function(){return[]}));var e={PERMISSION_DENIED:"PERMISSION_DENIED",NOT_SUPPORTED_ERROR:"A constraint specified is not supported by the browser.",MANDATORY_UNSATISFIED_ERROR:"CONSTRAINT_NOT_SATISFIED"},g={1:"PERMISSION_DENIED"},a={PERMISSION_DENIED:"User denied permission for scripts from this origin to access the media device.",CONSTRAINT_NOT_SATISFIED:"One of the mandatory constraints could not be satisfied."},d=function(b,d){var c=d[b],e=a[c];e||(e=eventName,c=b);return{name:c,message:e}},b=function(a){if(!a||
!OT.$.isObject(a))return!0;for(var b in a)if(a[b])return!1;return!0};OT.$.supportsWebRTC=function(){var a=!1;if(navigator.webkitGetUserMedia)a="function"===typeof webkitRTCPeerConnection&&!!webkitRTCPeerConnection.prototype.addStream;else if(navigator.mozGetUserMedia){var b=k.navigator.userAgent.toLowerCase().match(/Firefox\/([0-9\.]+)/i);if(a="function"===typeof mozRTCPeerConnection&&null!==b&&20<parseFloat(b[1],10))try{new mozRTCPeerConnection,a=!0}catch(c){a=!1}}OT.$.supportsWebRTC=function(){return a};
return a};OT.$.supportedCryptoScheme=function(){if(!OT.$.supportsWebRTC())return"NONE";var a=k.navigator.userAgent.toLowerCase().match(/chrome\/([0-9\.]+)/i);return a&&25>parseFloat(a[1],10)?"SDES_SRTP":"DTLS_SRTP"};OT.$.supportsBundle=function(){return OT.$.supportsWebRTC()&&"Chrome"===OT.$.browser()};OT.$.supportsRtcpMux=function(){return OT.$.supportsWebRTC()&&"Chrome"===OT.$.browser()};OT.$.getUserMedia=function(a,f,l,n,m,k){if(b(a))OT.error("Couldn't get UserMedia: All constraints were false"),
l.call(null,{name:"NO_VALID_CONSTRAINTS",message:"Video and Audio was disabled, you need to enabled at least one"});else{var q=null,t=!1,p=function(){q=null;t=!0;n&&n()},s=function(a){q&&clearTimeout(q);t&&m&&m();f.call(null,a)},u=function(a){q&&clearTimeout(q);t&&m&&m();var b;OT.$.isObject(a)&&a.name?b={name:a.name,message:a.message,constraintName:a.constraintName}:OT.$.isObject(a)?(b=d(a.code,g),a.message&&(b.message=a.message),a.constraintName&&(b.constraintName=a.constraintName)):b=a&&e.hasOwnProperty(a)?
d(a,e):{message:"Unknown Error while getting user media"};a=b;"PERMISSION_DENIED"===a.name||"PermissionDeniedError"===a.name?k.call(null,a):l.call(null,a)};try{c(a,s,u)}catch(w){OT.error("Couldn't get UserMedia: "+w.toString());u();return}q=-1===location.protocol.indexOf("https")?setTimeout(p,100):setTimeout(p,500)}};OT.$.createPeerConnection=function(a,b){return new (k.webkitRTCPeerConnection||k.mozRTCPeerConnection)(a,b)}})(window);
(function(k){function c(a,c){var d=document.createElement("video");d.setAttribute("autoplay","");d.innerHTML=a;if(c){!0===c.muted&&(delete c.muted,d.muted="true");for(var e in c)d.setAttribute(e,c[e])}return d}function e(a){return d[parseInt(a,10)]||"An unknown error occurred."}function g(a,c,d,g){if(navigator.mozGetUserMedia||0<c.getVideoTracks().length&&c.getVideoTracks()[0].enabled){var n=function(){clearTimeout(q);a.removeEventListener("loadedmetadata",m,!1);a.removeEventListener("error",r,!1)},
m=function(a){n();d()},r=function(a){n();g("There was an unexpected problem with the Video Stream: "+e(a.target.error.code))},q=setTimeout(function(){0===a.currentTime?g("The video stream failed to connect. Please notify the site owner if this continues to happen."):(OT.warn("Never got the loadedmetadata event but currentTime \x3e 0"),d())}.bind(this),3E4);a.addEventListener("loadedmetadata",m,!1);a.addEventListener("error",r,!1);c.onended=function(){n();g("Stream ended while trying to bind it to a video element.")}}else d();
void 0!==a.srcObject?a.srcObject=c:void 0!==a.mozSrcObject?a.mozSrcObject=c:a.src=k.URL.createObjectURL(c);a.play()}OT.VideoOrientation={ROTATED_NORMAL:"OTVideoOrientationRotatedNormal",ROTATED_LEFT:"OTVideoOrientationRotatedLeft",ROTATED_RIGHT:"OTVideoOrientationRotatedRight",ROTATED_UPSIDE_DOWN:"OTVideoOrientationRotatedUpsideDown"};OT.VideoElement=function(a){var d,f,l,n=!1,m=!1;a=OT.$.defaults(a||{},{fallbackText:"Sorry, Web RTC is not available in your browser"});OT.$.eventing(this);var r=function(a){a=
"There was an unexpected problem with the Video Stream: "+e(a.target.error.code);this.trigger("error",null,a,this)}.bind(this),q=function(){n=!0;f.addEventListener("error",r,!1);this.trigger("streamBound",this)}.bind(this),t=function(a){this.trigger("loadError",OT.ExceptionCodes.P2P_CONNECTION_FAILED,a,this)}.bind(this),p=function(){m||(OT.warn("Video element paused, auto-resuming. If you intended to do this, use publishVideo(false) or subscribeToVideo(false) instead."),m=!0);f.play()};f=c(a.fallbackText,
a.attributes);f.addEventListener("pause",p);Object.defineProperties(this,{stream:{get:function(){return d}},domElement:{get:function(){return f}},parentElement:{get:function(){return l}},isBoundToStream:{get:function(){return n}},poster:{get:function(){return f.getAttribute("poster")},set:function(a){f.setAttribute("poster",a)}}});this.appendTo=function(a){l=a;l.appendChild(f);return this};this.bindToStream=function(a){n=!1;d=a;g(f,d,q,t);return this};this.unbindStream=function(){if(!d)return this;
f&&(navigator.mozGetUserMedia?f.mozSrcObject=null:k.URL.revokeObjectURL(f.src));d=null;return this};this.setAudioVolume=function(a){f&&(f.volume=OT.$.roundFloat(a/100,2))};this.getAudioVolume=function(){return f?parseInt(100*f.volume,10):50};this.whenTimeIncrements=function(a,b){if(f){var d,c=function(){!d||d>=f.currentTime?d=f.currentTime:(f.removeEventListener("timeupdate",c,!1),a.call(b,this))}.bind(this);f.addEventListener("timeupdate",c,!1)}};this.destroy=function(){this.off();this.unbindStream();
f&&(f.removeEventListener("pause",p),OT.$.removeElement(f),f=null);l=null}};OT.$.canDefineProperty&&Object.defineProperties(OT.VideoElement.prototype,{imgData:{get:function(){var a=OT.$.createElement("canvas",{width:this.domElement.videoWidth,height:this.domElement.videoHeight,style:{display:"none"}});document.body.appendChild(a);try{a.getContext("2d").drawImage(this.domElement,0,0,a.width,a.height)}catch(d){return OT.warn("Cannot get image data yet"),null}var c=a.toDataURL("image/png");OT.$.removeElement(a);
return c.replace("data:image/png;base64,","").trim()}},videoWidth:{get:function(){return this._orientation&&this._orientation.width?this._orientation.width:this.domElement["video"+(this.isRotated?"Height":"Width")]}},videoHeight:{get:function(){return this._orientation&&this._orientation.height?this._orientation.height:this.domElement["video"+(this.isRotated?"Width":"Height")]}},aspectRatio:{get:function(){return(this.videoWidth+0)/this.videoHeight}},isRotated:{get:function(){return this._orientation&&
("OTVideoOrientationRotatedLeft"==this._orientation.videoOrientation||"OTVideoOrientationRotatedRight"==this._orientation.videoOrientation)}}});var a={OTVideoOrientationRotatedNormal:"rotate(0deg)",OTVideoOrientationRotatedLeft:"rotate(90deg)",OTVideoOrientationRotatedRight:"rotate(-90deg)",OTVideoOrientationRotatedUpsideDown:"rotate(180deg)"};OT.$.canDefineProperty&&Object.defineProperty(OT.VideoElement.prototype,"orientation",{get:function(){return this._orientation},set:function(b){this._orientation=
b;b=a[b.videoOrientation]||a.ROTATED_NORMAL;switch(OT.$.browser()){case "Chrome":case "Safari":this.domElement.style.webkitTransform=b;break;case "IE":this.domElement.style.msTransform=b;break;default:this.domElement.style.transform=b}this.trigger("orientationChanged")}});var d={};k.MediaError&&(d[k.MediaError.MEDIA_ERR_ABORTED]="The fetching process for the media resource was aborted by the user agent at the user's request.",d[k.MediaError.MEDIA_ERR_NETWORK]="A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable.",
d[k.MediaError.MEDIA_ERR_DECODE]="An error of some description occurred while decoding the media resource, after the resource was established to be usable.",d[k.MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED]="The media resource indicated by the src attribute was not suitable. ")})(window);
(function(k){var c=[],e=!1;OT.Analytics=function(){var g=OT.properties.loggingURL+"/logging/ClientEvent",a=OT.properties.loggingURL+"/logging/ClientQos",d={},b={payloadType:"payload_type",partnerId:"partner_id",streamId:"stream_id",sessionId:"session_id",connectionId:"connection_id",widgetType:"widget_type",widgetId:"widget_id",avgAudioBitrate:"avg_audio_bitrate",avgVideoBitrate:"avg_video_bitrate",localCandidateType:"local_candidate_type",remoteCandidateType:"remote_candidate_type",transportType:"transport_type"},
h=function(b,d,c,f){OT.$.post(d?a:g,{success:c,error:f,data:b,headers:{"Content-Type":"application/x-www-form-urlencoded"}})},f=function(){if(!e&&0<c.length){e=!0;var a=c[0],b=function(){c.shift();e=!1;f()};a&&h(a.data,a.isQos,function(){a.onComplete();setTimeout(b,50)},function(){OT.debug("Failed to send ClientEvent, moving on to the next item.");setTimeout(b,50)})}};this.logError=function(a,b,c,f,e){e||(e={});c=e.partnerId;if(!0===OT.Config.get("exceptionLogging","enabled",c)){var g;c?(g=[c,b,a].join("_"),
g=100>=(d[g]||0)):g=!1;if(!g){c=[c,b,a].join("_");var h=this.escapePayload(OT.$.extend(f||{},{message:h,userAgent:navigator.userAgent}));d[c]="undefined"!==typeof d[c]?d[c]+1:1;return this.logEvent(OT.$.extend(e,{action:b+"."+a,payloadType:h[0],payload:h[1]}))}}};this.logEvent=function(a){var d=a.partnerId;a||(a={});a=OT.$.extend({variation:"",guid:this.getClientGuid(),widget_id:"",session_id:"",connection_id:"",stream_id:"",partner_id:d,source:k.location.href,section:"",build:""},a);for(var e in b)b.hasOwnProperty(e)&&
a[e]&&(a[b[e]]=a[e],delete a[e]);c.push({data:a,onComplete:function(){},isQos:!1});f()};this.logQOS=function(a){var d=a.partnerId;a||(a={});a=OT.$.extend({guid:this.getClientGuid(),widget_id:"",session_id:"",connection_id:"",stream_id:"",partner_id:d,source:k.location.href,build:"",duration:0},a);for(var e in b)b.hasOwnProperty(e)&&a[e]&&(a[b[e]]=a[e],delete a[e]);c.push({data:a,onComplete:function(){},isQos:!0});f()};this.escapePayload=function(a){var b=[],c=[],d;for(d in a)a.hasOwnProperty(d)&&
(null!==a[d]&&void 0!==a[d])&&(b.push(a[d]?a[d].toString().replace("|","\\|"):""),c.push(d.toString().replace("|","\\|")));return[c.join("|"),b.join("|")]};this.getClientGuid=function(){var a=OT.$.getCookie("opentok_client_id");a||(a=OT.$.uuid(),OT.$.setCookie("opentok_client_id",a));return a}}})(window);
(function(k){"file:"===location.protocol&&alert("You cannot test a page using WebRTC through the file system due to browser permissions. You must run it over a web server.");k.OT||(k.OT={});!k.URL&&k.webkitURL&&(k.URL=k.webkitURL);var c,e=document.location.hash;OT.initSession=function(c){var a=OT.sessions.get(c);a||(a=new OT.Session(c),OT.sessions.add(a));return a};OT.initPublisher=function(c,a,d,b){OT.debug("TB.initPublisher("+a+")");var e=new OT.Publisher;OT.publishers.add(e);b&&OT.$.isFunction(b)&&
(c=function l(a){e.off("initSuccess",l);e.off("publishComplete",l);b.apply(null,arguments)},e.once("initSuccess",c),e.once("publishComplete",c));e.publish(a,d);return e};OT.checkSystemRequirements=function(){OT.debug("TB.checkSystemRequirements()");var c=OT.$.supportsWebSockets()&&OT.$.supportsWebRTC()?this.HAS_REQUIREMENTS:this.NOT_HAS_REQUIREMENTS;OT.checkSystemRequirements=function(){OT.debug("TB.checkSystemRequirements()");return c};return c};OT.upgradeSystemRequirements=function(){OT.onLoad(function(){document.body.appendChild(function(){var c=
document.createElement("iframe");c.id="_upgradeFlash";c.style.position="absolute";c.style.position="fixed";c.style.height="100%";c.style.width="100%";c.style.top="0px";c.style.left="0px";c.style.right="0px";c.style.bottom="0px";c.style.zIndex=1E3;try{c.style.backgroundColor="rgba(0,0,0,0.2)"}catch(a){c.style.backgroundColor="transparent",c.setAttribute("allowTransparency","true")}c.setAttribute("frameBorder","0");c.frameBorder="0";c.scrolling="no";c.setAttribute("scrolling","no");c.src=OT.properties.assetURL+
"/html/upgradeFlash.html#"+encodeURIComponent(document.location.href);return c}());c&&clearInterval(c);c=setInterval(function(){var c=document.location.hash,a=/^#?\d+&/;c!==e&&a.test(c)&&(e=c,"close_window"===c.replace(a,"")&&(document.body.removeChild(document.getElementById("_upgradeFlash")),document.location.hash=""))},100)})};OT.reportIssue=function(){OT.warn("ToDo: haven't yet implemented TB.reportIssue")};OT.components={};OT.sessions={};OT.rtc={};OT.APIKEY=function(){var c=document.getElementsByTagName("script"),
c=c[c.length-1],c=c.getAttribute("src")||c.src;return(c=c.match(/[\?\&]apikey=([^&]+)/i))?c[1]:""}();OT.HAS_REQUIREMENTS=1;OT.NOT_HAS_REQUIREMENTS=0;k.OT||(k.OT=OT);k.TB||(k.TB=OT)})(window);
(function(k){OT.Collection=function(c){var e=[],g={},a=c||"id";OT.$.eventing(this,!0);var d=function(a){this.trigger("update",a);this.trigger("update:"+a.target.id,a)}.bind(this),b=function(a,b){if(void 0!==g[a]){var c=g[a];delete g[a];g[b]=c}}.bind(this),h=function(a){this.remove(a.target,a.reason)}.bind(this);this.reset=function(){e.forEach(function(a){a.off("updated",d,this);a.off("destroyed",h,this);a.off("idUpdated",b,this)},this);e=[];g={}};this.destroy=function(){e.forEach(function(a){a.destroy(void 0,
!0)});this.reset();this.off()};this.get=function(a){return a&&void 0!==g[a]?e[g[a]]:void 0};this.has=function(a){return a&&void 0!==g[a]};this.toString=function(){return e.toString()};this.where=function(a,b){return OT.$.isFunction(a)?e.filter(a,b):e.filter(function(b){for(var c in a)if(b[c]!==a[c])return!1;return!0})};this.find=function(a,b){var c;c=OT.$.isFunction(a)?a:function(b){for(var c in a)if(b[c]!==a[c])return!1;return!0};c=c.bind(b);for(var d=0;d<e.length;++d)if(!0===c(e[d]))return e[d];
return null};this.add=function(c){var l=c[a];if(this.has(l))return OT.warn("Model "+l+" is already in the collection",e),this;g[l]=e.push(c)-1;c.on("updated",d,this);c.on("destroyed",h,this);c.on("idUpdated",b,this);this.trigger("add",c);this.trigger("add:"+l,c);return this};this.remove=function(c,l){var n=c[a];e.splice(g[n],1);for(var m=g[n];m<e.length;++m)g[e[m][a]]=m;delete g[n];c.off("updated",d,this);c.off("destroyed",h,this);c.off("idUpdated",b,this);this.trigger("remove",c,l);this.trigger("remove:"+
n,c,l);return this};OT.$.defineGetters(this,{length:function(){return e.length}})}})(this);
(function(k){OT.Event=OT.$.eventing.Event();OT.Event.names={ACTIVE:"active",INACTIVE:"inactive",UNKNOWN:"unknown",PER_SESSION:"perSession",PER_STREAM:"perStream",EXCEPTION:"exception",ISSUE_REPORTED:"issueReported",SESSION_CONNECTED:"sessionConnected",SESSION_DISCONNECTED:"sessionDisconnected",STREAM_CREATED:"streamCreated",STREAM_DESTROYED:"streamDestroyed",CONNECTION_CREATED:"connectionCreated",CONNECTION_DESTROYED:"connectionDestroyed",SIGNAL:"signal",STREAM_PROPERTY_CHANGED:"streamPropertyChanged",
MICROPHONE_LEVEL_CHANGED:"microphoneLevelChanged",RESIZE:"resize",SETTINGS_BUTTON_CLICK:"settingsButtonClick",DEVICE_INACTIVE:"deviceInactive",INVALID_DEVICE_NAME:"invalidDeviceName",ACCESS_ALLOWED:"accessAllowed",ACCESS_DENIED:"accessDenied",ACCESS_DIALOG_OPENED:"accessDialogOpened",ACCESS_DIALOG_CLOSED:"accessDialogClosed",ECHO_CANCELLATION_MODE_CHANGED:"echoCancellationModeChanged",PUBLISHER_DESTROYED:"destroyed",SUBSCRIBER_DESTROYED:"destroyed",DEVICES_DETECTED:"devicesDetected",DEVICES_SELECTED:"devicesSelected",
CLOSE_BUTTON_CLICK:"closeButtonClick",MICLEVEL:"microphoneActivityLevel",MICGAINCHANGED:"microphoneGainChanged",ENV_LOADED:"envLoaded"};OT.ValueEvent=function(c,e){OT.Event.call(this,c);this.value=e};OT.ExceptionCodes={JS_EXCEPTION:2E3,AUTHENTICATION_ERROR:1004,INVALID_SESSION_ID:1005,CONNECT_FAILED:1006,CONNECT_REJECTED:1007,CONNECTION_TIMEOUT:1008,NOT_CONNECTED:1010,P2P_CONNECTION_FAILED:1013,API_RESPONSE_FAILURE:1014,UNABLE_TO_PUBLISH:1500,UNABLE_TO_SIGNAL:1510,UNABLE_TO_FORCE_DISCONNECT:1520,
UNABLE_TO_FORCE_UNPUBLISH:1530};OT.ExceptionEvent=function(c,e,g,a,d,b){OT.Event.call(this,c);this.message=e;this.title=g;this.code=a;this.component=d;this.target=b};OT.IssueReportedEvent=function(c,e){OT.Event.call(this,c);this.issueId=e};OT.EnvLoadedEvent=function(c){OT.Event.call(this,c)};OT.ConnectionEvent=function(c,e,g){OT.Event.call(this,c);this.connections=e;this.reason=g};OT.StreamEvent=function(c,e,g,a){OT.Event.call(this,c,a);this.streams=e;this.reason=g};OT.SessionConnectEvent=function(c,
e,g,a){OT.Event.call(this,c);this.connections=e;this.streams=g;this.archives=a;this.groups=[]};OT.SessionDisconnectEvent=function(c,e,g){OT.Event.call(this,c,g);this.reason=e};OT.VolumeEvent=function(c,e,g){OT.Event.call(this,c);this.streamId=e;this.volume=g};OT.DeviceEvent=function(c,e,g){OT.Event.call(this,c);this.camera=e;this.microphone=g};OT.DeviceStatusEvent=function(c,e,g,a,d){OT.Event.call(this,c);this.cameras=e;this.microphones=g;this.selectedCamera=a;this.selectedMicrophone=d};OT.ResizeEvent=
function(c,e,g,a,d){OT.Event.call(this,c);this.widthFrom=e;this.widthTo=g;this.heightFrom=a;this.heightTo=d};OT.StreamPropertyChangedEvent=function(c,e,g,a,d){OT.Event.call(this,c);this.type=c;this.stream=e;this.changedProperty=g;this.oldValue=a;this.newValue=d};OT.ArchiveEvent=function(c,e){OT.Event.call(this,c);this.archives=e};OT.ArchiveStreamEvent=function(c,e,g){OT.Event.call(this,c);this.archive=e;this.streams=g};OT.StateChangedEvent=function(c,e){OT.Event.call(this,c);this.changedValues=e};
OT.ChangeFailedEvent=function(c,e,g,a){OT.Event.call(this,c);this.reasonCode=e;this.reason=g;this.failedValues=a};OT.SignalEvent=function(c,e,g){OT.Event.call(this,c?"signal:"+c:OT.Event.names.SIGNAL,!1);this.data=e;this.from=g};OT.StreamUpdatedEvent=function(c,e,g,a){OT.Event.call(this,"updated");this.target=c;this.changedProperty=e;this.oldValue=g;this.newValue=a};OT.DestroyedEvent=function(c,e,g){OT.Event.call(this,c,!1);this.target=e;this.reason=g}})(window);
(function(k){function c(a,c,b){return c<=a&&a<=b}function e(a,c){return Math.floor(a/c)}function g(a){var c=0;this.get=function(){return c>=a.length?-1:Number(a[c])};this.offset=function(b){c+=b;if(0>c)throw Error("Seeking past start of the buffer");if(c>a.length)throw Error("Seeking past EOF");};this.match=function(b){if(b.length>c+a.length)return!1;var d;for(d=0;d<b.length;d+=1)if(Number(a[c+d])!==b[d])return!1;return!0}}function a(a){var c=0;this.emit=function(b){var d=-1,e;for(e=0;e<arguments.length;++e)d=
Number(arguments[e]),a[c++]=d;return d}}function d(a){var b=0,d=function(a){for(var b=[],d=0,e=a.length;d<a.length;){var f=a.charCodeAt(d);if(c(f,55296,57343))if(c(f,56320,57343))b.push(65533);else if(d===e-1)b.push(65533);else{var h=a.charCodeAt(d+1);c(h,56320,57343)?(f&=1023,h&=1023,d+=1,b.push(65536+(f<<10)+h)):b.push(65533)}else b.push(f);d+=1}return b}(a);this.offset=function(a){b+=a;if(0>b)throw Error("Seeking past start of the buffer");if(b>d.length)throw Error("Seeking past EOF");};this.get=
function(){return b>=d.length?-1:d[b]}}function b(){var a="";this.string=function(){return a};this.emit=function(c){65535>=c?a+=String.fromCharCode(c):(c-=65536,a+=String.fromCharCode(55296+(c>>10&1023)),a+=String.fromCharCode(56320+(c&1023)))}}function h(a){this.name="EncodingError";this.message=a;this.code=0}function f(a,c){if(a)throw new h("Decoder error");return c||65533}function l(a){throw new h("The code point "+a+" could not be encoded.");}function n(a){a=String(a).trim().toLowerCase();return Object.prototype.hasOwnProperty.call(L,
a)?L[a]:null}function m(a,c){return(c||[])[a]||null}function r(a,c){var b=c.indexOf(a);return-1===b?null:b}function q(a){var b=a.fatal,d=0,e=0,h=0,g=0;this.decode=function(a){var l=a.get();if(-1===l)return 0!==e?f(b):-1;a.offset(1);if(0===e){if(c(l,0,127))return l;if(c(l,194,223))e=1,g=128,d=l-192;else if(c(l,224,239))e=2,g=2048,d=l-224;else if(c(l,240,244))e=3,g=65536,d=l-240;else return f(b);d*=Math.pow(64,e);return null}if(!c(l,128,191))return g=h=e=d=0,a.offset(-1),f(b);h+=1;d+=(l-128)*Math.pow(64,
e-h);if(h!==e)return null;a=d;l=g;g=h=e=d=0;return c(a,l,1114111)&&!c(a,55296,57343)?a:f(b)}}function t(a){this.encode=function(a,b){var d=b.get();if(-1===d)return-1;b.offset(1);if(c(d,55296,57343))return l(d);if(c(d,0,127))return a.emit(d);var f,h;c(d,128,2047)?(f=1,h=192):c(d,2048,65535)?(f=2,h=224):c(d,65536,1114111)&&(f=3,h=240);for(h=a.emit(e(d,Math.pow(64,f))+h);0<f;)h=e(d,Math.pow(64,f-1)),h=a.emit(128+h%64),f-=1;return h}}function p(a,b){var d=b.fatal;this.decode=function(b){var e=b.get();
if(-1===e)return-1;b.offset(1);if(c(e,0,127))return e;b=a[e-128];return null===b?f(d):b}}function s(a,b){this.encode=function(b,d){var e=d.get();if(-1===e)return-1;d.offset(1);if(c(e,0,127))return b.emit(e);var f=r(e,a);null===f&&l(e);return b.emit(f+128)}}function u(a,b){var d=b.fatal,e=0,h=0,g=0;this.decode=function(b){var l=b.get();if(-1===l&&0===e&&0===h&&0===g)return-1;if(-1===l&&(0!==e||0!==h||0!==g))g=h=e=0,f(d);b.offset(1);var v;if(0!==g){v=null;if(c(l,48,57))if(l=10*(126*(10*(e-129)+(h-48))+
(g-129))+l-48,39419<l&&189E3>l||1237575<l)v=null;else{var n=0;v=0;var F=A.gb18030,k;for(k=0;k<F.length;++k){var H=F[k];if(H[0]<=l)n=H[0],v=H[1];else break}v=v+l-n}g=h=e=0;return null===v?(b.offset(-3),f(d)):v}if(0!==h){if(c(l,129,254))return g=l,null;b.offset(-2);h=e=0;return f(d)}if(0!==e){if(c(l,48,57)&&a)return h=l,null;v=e;n=null;e=0;F=127>l?64:65;if(c(l,64,126)||c(l,128,254))n=190*(v-129)+(l-F);v=null===n?null:m(n,A.gbk);null===n&&b.offset(-1);return null===v?f(d):v}return c(l,0,127)?l:128===
l?8364:c(l,129,254)?(e=l,null):f(d)}}function w(a,b){this.encode=function(b,d){var f=d.get();if(-1===f)return-1;d.offset(1);if(c(f,0,127))return b.emit(f);var h=r(f,A.gbk);if(null!==h)return f=e(h,190)+129,h%=190,b.emit(f,h+(63>h?64:65));if(null===h&&!a)return l(f);var g=h=0,m=A.gb18030,v;for(v=0;v<m.length;++v){var n=m[v];if(n[1]<=f)h=n[1],g=n[0];else break}h=g+f-h;f=e(e(e(h,10),126),10);h-=12600*f;g=e(e(h,10),126);h-=1260*g;m=e(h,10);return b.emit(f+129,g+48,m+129,h-10*m+48)}}function x(a){var b=
a.fatal,d=!1,e=0;this.decode=function(a){var h=a.get();if(-1===h&&0===e)return-1;if(-1===h&&0!==e)return e=0,f(b);a.offset(1);if(126===e){e=0;if(123===h)return d=!0,null;if(125===h)return d=!1,null;if(126===h)return 126;if(10===h)return null;a.offset(-1);return f(b)}if(0!==e){a=e;e=0;var g=null;c(h,33,126)&&(g=m(190*(a-1)+(h+63),A.gbk));10===h&&(d=!1);return null===g?f(b):g}if(126===h)return e=126,null;if(d){if(c(h,32,127))return e=h,null;10===h&&(d=!1);return f(b)}return c(h,0,127)?h:f(b)}}function y(a){var b=
!1;this.encode=function(a,d){var f=d.get();if(-1===f)return-1;d.offset(1);if(c(f,0,127)&&b)return d.offset(-1),b=!1,a.emit(126,125);if(126===f)return a.emit(126,126);if(c(f,0,127))return a.emit(f);if(!b)return d.offset(-1),b=!0,a.emit(126,123);var h=r(f,A.gbk);if(null===h)return l(f);var g=e(h,190)+1,h=h%190-63;return!c(g,33,126)||!c(h,33,126)?l(f):a.emit(g,h)}}function B(a){var b=a.fatal,d=0,e=null;this.decode=function(a){if(null!==e)return a=e,e=null,a;var h=a.get();if(-1===h&&0===d)return-1;if(-1===
h&&0!==d)return d=0,f(b);a.offset(1);if(0!==d){var g=d,l=null;d=0;var v=127>h?64:98;if(c(h,64,126)||c(h,161,254))l=157*(g-129)+(h-v);if(1133===l)return e=772,202;if(1135===l)return e=780,202;if(1164===l)return e=772,234;if(1166===l)return e=780,234;h=null===l?null:m(l,A.big5);null===l&&a.offset(-1);return null===h?f(b):h}return c(h,0,127)?h:c(h,129,254)?(d=h,null):f(b)}}function D(a){this.encode=function(a,b){var d=b.get();if(-1===d)return-1;b.offset(1);if(c(d,0,127))return a.emit(d);var f=r(d,A.big5);
if(null===f)return l(d);d=e(f,157)+129;f%=157;return a.emit(d,f+(63>f?64:98))}}function G(a){var b=a.fatal,d=0,e=0;this.decode=function(a){var h=a.get();if(-1===h){if(0===d&&0===e)return-1;e=d=0;return f(b)}a.offset(1);var g,l;return 0!==e?(g=e,e=0,l=null,c(g,161,254)&&c(h,161,254)&&(l=m(94*(g-161)+h-161,A.jis0212)),c(h,161,254)||a.offset(-1),null===l?f(b):l):142===d&&c(h,161,223)?(d=0,65377+h-161):143===d&&c(h,161,254)?(d=0,e=h,null):0!==d?(g=d,d=0,l=null,c(g,161,254)&&c(h,161,254)&&(l=m(94*(g-161)+
h-161,A.jis0208)),c(h,161,254)||a.offset(-1),null===l?f(b):l):c(h,0,127)?h:142===h||143===h||c(h,161,254)?(d=h,null):f(b)}}function E(a){this.encode=function(a,b){var d=b.get();if(-1===d)return-1;b.offset(1);if(c(d,0,127))return a.emit(d);if(165===d)return a.emit(92);if(8254===d)return a.emit(126);if(c(d,65377,65439))return a.emit(142,d-65377+161);var f=r(d,A.jis0208);if(null===f)return l(d);d=e(f,94)+161;return a.emit(d,f%94+161)}}function C(a){var b=a.fatal,d=0,e=!1,h=0;this.decode=function(a){var g=
a.get();-1!==g&&a.offset(1);switch(d){default:case 0:return 27===g?(d=1,null):c(g,0,127)?g:-1===g?-1:f(b);case 1:if(36===g||40===g)return h=g,d=2,null;-1!==g&&a.offset(-1);d=0;return f(b);case 2:var l=h;h=0;if(36===l&&(64===g||66===g))return e=!1,d=4,null;if(36===l&&40===g)return d=3,null;if(40===l&&(66===g||74===g))return d=0,null;if(40===l&&73===g)return d=6,null;-1===g?a.offset(-1):a.offset(-2);d=0;return f(b);case 3:if(68===g)return e=!0,d=4,null;-1===g?a.offset(-2):a.offset(-3);d=0;return f(b);
case 4:if(10===g)return d=0,f(b,10);if(27===g)return d=1,null;if(-1===g)return-1;h=g;d=5;return null;case 5:d=4;if(-1===g)return f(b);a=null;l=94*(h-33)+g-33;c(h,33,126)&&c(g,33,126)&&(a=!1===e?m(l,A.jis0208):m(l,A.jis0212));return null===a?f(b):a;case 6:return 27===g?(d=1,null):c(g,33,95)?65377+g-33:-1===g?-1:f(b)}}}function v(a){var b=0;this.encode=function(a,d){var f=d.get();if(-1===f)return-1;d.offset(1);if((c(f,0,127)||165===f||8254===f)&&0!==b)return d.offset(-1),b=0,a.emit(27,40,66);if(c(f,
0,127))return a.emit(f);if(165===f)return a.emit(92);if(8254===f)return a.emit(126);if(c(f,65377,65439)&&2!==b)return d.offset(-1),b=2,a.emit(27,40,73);if(c(f,65377,65439))return a.emit(f-65377-33);if(1!==b)return d.offset(-1),b=1,a.emit(27,36,66);var h=r(f,A.jis0208);if(null===h)return l(f);f=e(h,94)+33;return a.emit(f,h%94+33)}}function F(a){var b=a.fatal,d=0;this.decode=function(a){var e=a.get();if(-1===e&&0===d)return-1;if(-1===e&&0!==d)return d=0,f(b);a.offset(1);if(0!==d){var h=d;d=0;if(c(e,
64,126)||c(e,128,252))return a=m(188*(h-(160>h?129:193))+e-(127>e?64:65),A.jis0208),null===a?f(b):a;a.offset(-1);return f(b)}return c(e,0,128)?e:c(e,161,223)?65377+e-161:c(e,129,159)||c(e,224,252)?(d=e,null):f(b)}}function H(a){this.encode=function(a,b){var d=b.get();if(-1===d)return-1;b.offset(1);if(c(d,0,128))return a.emit(d);if(165===d)return a.emit(92);if(8254===d)return a.emit(126);if(c(d,65377,65439))return a.emit(d-65377+161);var f=r(d,A.jis0208);if(null===f)return l(d);d=e(f,188);f%=188;return a.emit(d+
(31>d?129:193),f+(63>f?64:65))}}function I(a){var b=a.fatal,d=0;this.decode=function(a){var e=a.get();if(-1===e&&0===d)return-1;if(-1===e&&0!==d)return d=0,f(b);a.offset(1);if(0!==d){var h=d,g=null;d=0;if(c(h,129,198)){var l=178*(h-129);c(e,65,90)?g=l+e-65:c(e,97,122)?g=l+26+e-97:c(e,129,254)&&(g=l+26+26+e-129)}c(h,199,253)&&c(e,161,254)&&(g=12460+94*(h-199)+(e-161));e=null===g?null:m(g,A["euc-kr"]);null===g&&a.offset(-1);return null===e?f(b):e}return c(e,0,127)?e:c(e,129,253)?(d=e,null):f(b)}}function M(a){this.encode=
function(a,b){var d=b.get();if(-1===d)return-1;b.offset(1);if(c(d,0,127))return a.emit(d);var f=r(d,A["euc-kr"]);if(null===f)return l(d);if(12460>f)return d=e(f,178)+129,f%=178,a.emit(d,f+(26>f?65:52>f?71:77));f-=12460;d=e(f,94)+199;return a.emit(d,f%94+161)}}function N(a){var d=a.fatal,b=0,e=0;this.decode=function(a){var h=a.get();-1!==h&&a.offset(1);switch(b){default:case 0:return 14===h?(b=4,null):15===h?null:27===h?(b=1,null):c(h,0,127)?h:-1===h?-1:f(d);case 1:if(36===h)return b=2,null;-1!==h&&
a.offset(-1);b=0;return f(d);case 2:if(41===h)return b=3,null;-1===h?a.offset(-1):a.offset(-2);b=0;return f(d);case 3:if(67===h)return b=0,null;-1===h?a.offset(-2):a.offset(-3);b=0;return f(d);case 4:if(10===h)return b=0,f(d,10);if(14===h)return null;if(15===h)return b=0,null;if(-1===h)return-1;e=h;b=5;return null;case 5:b=4;if(-1===h)return f(d);a=null;c(e,33,70)&&c(h,33,126)?a=m(178*(e-1)+52+h-1,A["euc-kr"]):c(e,71,126)&&c(h,33,126)&&(a=m(12460+94*(e-71)+(h-33),A["euc-kr"]));return null!==a?a:f(d)}}}
function O(a){var b=!1,d=0;this.encode=function(a,f){var h=f.get();if(-1===h)return-1;b||(b=!0,a.emit(27,36,41,67));f.offset(1);if(c(h,0,127)&&0!==d)return f.offset(-1),d=0,a.emit(15);if(c(h,0,127))return a.emit(h);if(1!==d)return f.offset(-1),d=1,a.emit(14);var g=r(h,A["euc-kr"]);if(null===g)return l(h);var m;if(12460>g)return m=e(g,178)+1,g=g%178-26-26+1,!c(m,33,70)||!c(g,33,126)?l(h):a.emit(m,g);g-=12460;m=e(g,94)+71;g=g%94+33;return!c(m,71,126)||!c(g,33,126)?l(h):a.emit(m,g)}}function K(a,d){var b=
d.fatal,e=null,h=null;this.decode=function(d){var g=d.get();if(-1===g&&null===e&&null===h)return-1;if(-1===g&&(null!==e||null!==h))return f(b);d.offset(1);if(null===e)return e=g,null;g=a?(e<<8)+g:(g<<8)+e;e=null;if(null!==h){var l=h;h=null;if(c(g,56320,57343))return 65536+1024*(l-55296)+(g-56320);d.offset(-2);return f(b)}return c(g,55296,56319)?(h=g,null):c(g,56320,57343)?f(b):g}}function J(a,d){this.encode=function(d,b){function f(b){var c=b>>8;b&=255;return a?d.emit(c,b):d.emit(b,c)}var h=b.get();
if(-1===h)return-1;b.offset(1);c(h,55296,57343)&&l(h);if(65535>=h)return f(h);var g=e(h-65536,1024)+55296,h=(h-65536)%1024+56320;f(g);return f(h)}}function P(a,b){if(!this||this===k)return new P(a,b);a=a?String(a):"utf-8";b=Object(b);this._encoding=n(a);if(null===this._encoding||"utf-8"!==this._encoding.name&&"utf-16"!==this._encoding.name&&"utf-16be"!==this._encoding.name)throw new TypeError("Unknown encoding: "+a);this._streaming=!1;this._encoder=null;this._options={fatal:Boolean(b.fatal)};Object.defineProperty?
Object.defineProperty(this,"encoding",{get:function(){return this._encoding.name}}):this.encoding=this._encoding.name;return this}function Q(a,b){if(!this||this===k)return new Q(a,b);a=a?String(a):"utf-8";b=Object(b);this._encoding=n(a);if(null===this._encoding)throw new TypeError("Unknown encoding: "+a);this._streaming=!1;this._decoder=null;this._options={fatal:Boolean(b.fatal)};Object.defineProperty?Object.defineProperty(this,"encoding",{get:function(){return this._encoding.name}}):this.encoding=
this._encoding.name;return this}if(!(void 0!==k.TextEncoder&&void 0!==k.TextDecoder)){h.prototype=Error.prototype;var z={},L={};[{encodings:[{labels:["unicode-1-1-utf-8","utf-8","utf8"],name:"utf-8"}],heading:"The Encoding"},{encodings:[{labels:["cp864","ibm864"],name:"ibm864"},{labels:["cp866","ibm866"],name:"ibm866"},{labels:"csisolatin2 iso-8859-2 iso-ir-101 iso8859-2 iso_8859-2 l2 latin2".split(" "),name:"iso-8859-2"},{labels:"csisolatin3 iso-8859-3 iso_8859-3 iso-ir-109 l3 latin3".split(" "),
name:"iso-8859-3"},{labels:"csisolatin4 iso-8859-4 iso_8859-4 iso-ir-110 l4 latin4".split(" "),name:"iso-8859-4"},{labels:["csisolatincyrillic","cyrillic","iso-8859-5","iso_8859-5","iso-ir-144"],name:"iso-8859-5"},{labels:"arabic csisolatinarabic ecma-114 iso-8859-6 iso_8859-6 iso-ir-127".split(" "),name:"iso-8859-6"},{labels:"csisolatingreek ecma-118 elot_928 greek greek8 iso-8859-7 iso_8859-7 iso-ir-126".split(" "),name:"iso-8859-7"},{labels:"csisolatinhebrew hebrew iso-8859-8 iso-8859-8-i iso-ir-138 iso_8859-8 visual".split(" "),
name:"iso-8859-8"},{labels:"csisolatin6 iso-8859-10 iso-ir-157 iso8859-10 l6 latin6".split(" "),name:"iso-8859-10"},{labels:["iso-8859-13"],name:"iso-8859-13"},{labels:["iso-8859-14","iso8859-14"],name:"iso-8859-14"},{labels:["iso-8859-15","iso_8859-15"],name:"iso-8859-15"},{labels:["iso-8859-16"],name:"iso-8859-16"},{labels:["koi8-r","koi8_r"],name:"koi8-r"},{labels:["koi8-u"],name:"koi8-u"},{labels:["csmacintosh","mac","macintosh","x-mac-roman"],name:"macintosh"},{labels:["iso-8859-11","tis-620",
"windows-874"],name:"windows-874"},{labels:["windows-1250","x-cp1250"],name:"windows-1250"},{labels:["windows-1251","x-cp1251"],name:"windows-1251"},{labels:"ascii ansi_x3.4-1968 csisolatin1 iso-8859-1 iso8859-1 iso_8859-1 l1 latin1 us-ascii windows-1252".split(" "),name:"windows-1252"},{labels:["cp1253","windows-1253"],name:"windows-1253"},{labels:"csisolatin5 iso-8859-9 iso-ir-148 l5 latin5 windows-1254".split(" "),name:"windows-1254"},{labels:["cp1255","windows-1255"],name:"windows-1255"},{labels:["cp1256",
"windows-1256"],name:"windows-1256"},{labels:["windows-1257"],name:"windows-1257"},{labels:["cp1258","windows-1258"],name:"windows-1258"},{labels:["x-mac-cyrillic","x-mac-ukrainian"],name:"x-mac-cyrillic"}],heading:"Legacy single-byte encodings"},{encodings:[{labels:"chinese csgb2312 csiso58gb231280 gb2312 gbk gb_2312 gb_2312-80 iso-ir-58 x-gbk".split(" "),name:"gbk"},{labels:["gb18030"],name:"gb18030"},{labels:["hz-gb-2312"],name:"hz-gb-2312"}],heading:"Legacy multi-byte Chinese (simplified) encodings"},
{encodings:[{labels:["big5","big5-hkscs","cn-big5","csbig5","x-x-big5"],name:"big5"}],heading:"Legacy multi-byte Chinese (traditional) encodings"},{encodings:[{labels:["cseucpkdfmtjapanese","euc-jp","x-euc-jp"],name:"euc-jp"},{labels:["csiso2022jp","iso-2022-jp"],name:"iso-2022-jp"},{labels:"csshiftjis ms_kanji shift-jis shift_jis sjis windows-31j x-sjis".split(" "),name:"shift_jis"}],heading:"Legacy multi-byte Japanese encodings"},{encodings:[{labels:"cseuckr csksc56011987 euc-kr iso-ir-149 korean ks_c_5601-1987 ks_c_5601-1989 ksc5601 ksc_5601 windows-949".split(" "),
name:"euc-kr"},{labels:["csiso2022kr","iso-2022-kr"],name:"iso-2022-kr"}],heading:"Legacy multi-byte Korean encodings"},{encodings:[{labels:["utf-16","utf-16le"],name:"utf-16"},{labels:["utf-16be"],name:"utf-16be"}],heading:"Legacy utf-16 encodings"}].forEach(function(a){a.encodings.forEach(function(a){z[a.name]=a;a.labels.forEach(function(b){L[b]=a})})});var A=k["encoding-indexes"]||{};z["utf-8"].getEncoder=function(a){return new t(a)};z["utf-8"].getDecoder=function(a){return new q(a)};(function(){"ibm864 ibm866 iso-8859-2 iso-8859-3 iso-8859-4 iso-8859-5 iso-8859-6 iso-8859-7 iso-8859-8 iso-8859-10 iso-8859-13 iso-8859-14 iso-8859-15 iso-8859-16 koi8-r koi8-u macintosh windows-874 windows-1250 windows-1251 windows-1252 windows-1253 windows-1254 windows-1255 windows-1256 windows-1257 windows-1258 x-mac-cyrillic".split(" ").forEach(function(a){var b=
z[a],d=A[a];b.getDecoder=function(a){return new p(d,a)};b.getEncoder=function(a){return new s(d,a)}})})();z.gbk.getEncoder=function(a){return new w(!1,a)};z.gbk.getDecoder=function(a){return new u(!1,a)};z.gb18030.getEncoder=function(a){return new w(!0,a)};z.gb18030.getDecoder=function(a){return new u(!0,a)};z["hz-gb-2312"].getEncoder=function(a){return new y(a)};z["hz-gb-2312"].getDecoder=function(a){return new x(a)};z.big5.getEncoder=function(a){return new D(a)};z.big5.getDecoder=function(a){return new B(a)};
z["euc-jp"].getEncoder=function(a){return new E(a)};z["euc-jp"].getDecoder=function(a){return new G(a)};z["iso-2022-jp"].getEncoder=function(a){return new v(a)};z["iso-2022-jp"].getDecoder=function(a){return new C(a)};z.shift_jis.getEncoder=function(a){return new H(a)};z.shift_jis.getDecoder=function(a){return new F(a)};z["euc-kr"].getEncoder=function(a){return new M(a)};z["euc-kr"].getDecoder=function(a){return new I(a)};z["iso-2022-kr"].getEncoder=function(a){return new O(a)};z["iso-2022-kr"].getDecoder=
function(a){return new N(a)};z["utf-16"].getEncoder=function(a){return new J(!1,a)};z["utf-16"].getDecoder=function(a){return new K(!1,a)};z["utf-16be"].getEncoder=function(a){return new J(!0,a)};z["utf-16be"].getDecoder=function(a){return new K(!0,a)};P.prototype={encode:function(b,c){b=b?String(b):"";c=Object(c);this._streaming||(this._encoder=this._encoding.getEncoder(this._options));this._streaming=Boolean(c.stream);for(var e=[],f=new a(e),h=new d(b);-1!==h.get();)this._encoder.encode(f,h);if(!this._streaming){var g;
do g=this._encoder.encode(f,h);while(-1!==g);this._encoder=null}return new Uint8Array(e)}};Q.prototype={decode:function(a,d){if(a&&!("buffer"in a&&"byteOffset"in a&&"byteLength"in a))throw new TypeError("Expected ArrayBufferView");a||(a=new Uint8Array(0));d=Object(d);this._streaming||(this._decoder=this._encoding.getDecoder(this._options));this._streaming=Boolean(d.stream);var c=new Uint8Array(a.buffer,a.byteOffset,a.byteLength),c=new g(c);if(!this._BOMseen){this._BOMseen=!0;var e=this._encoding.name;
c.match([255,254])&&"utf-16"===e?c.offset(2):c.match([254,255])&&"utf-16be"==e?c.offset(2):c.match([239,187,191])&&"utf-8"==e&&c.offset(3)}for(var e=new b,f;-1!==c.get();)f=this._decoder.decode(c),null!==f&&-1!==f&&e.emit(f);if(!this._streaming){do f=this._decoder.decode(c),null!==f&&-1!==f&&e.emit(f);while(-1!==f&&-1!=c.get());this._decoder=null}return e.string()}};k.TextEncoder=k.TextEncoder||P;k.TextDecoder=k.TextDecoder||Q}})(this);
(function(k){OT.Rumor={MessageType:{SUBSCRIBE:0,UNSUBSCRIBE:1,MESSAGE:2,CONNECT:3,DISCONNECT:4,PING:7,PONG:8,STATUS:9}}})(this);
(function(k){var c={1002:"The endpoint is terminating the connection due to a protocol error. (CLOSE_PROTOCOL_ERROR)",1003:"The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data). (CLOSE_UNSUPPORTED)",1004:"The endpoint is terminating the connection because a data frame was received that is too large. (CLOSE_TOO_LARGE)",1005:"Indicates that no status code was provided even though one was expected. (CLOSE_NO_STATUS)",
1006:"Used to indicate that a connection was closed abnormally (that is, with no close frame being sent) when a status code is expected. (CLOSE_ABNORMAL)",1007:"Indicates that an endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [RFC3629] data within a text message)",1008:"Indicates that an endpoint is terminating the connection because it has received a message that violates its policy.  This is a generic status code that can be returned when there is no other more suitable status code (e.g., 1003 or 1009) or if there is a need to hide specific details about the policy",
1009:"Indicates that an endpoint is terminating the connection because it has received a message that is too big for it to process",1011:"Indicates that a server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request",4001:"Connectivity loss was detected as it was too long since the socket received the last PONG message"};OT.Rumor.SocketError=function(c,g){this.code=c;this.message=g};OT.Rumor.Socket=function(e,g,a){var d,b,h,f,l,
n,m,k,q,t,p,s=OT.$.statable(this,["disconnected","error","connected","connecting","disconnecting"],"disconnected",function(a){switch(a){case "disconnected":case "error":if(d=null,l){var b;if(!t?0:44900<=OT.$.now()-t)b=Error(c[4001]),b.code=4001;l(b)}}}),u=function(a,b){if(null===b||!OT.$.isFunction(b))throw Error("The Rumor.Socket "+a+" callback must be a valid function or null");},w=function(a){OT.error("Rumor.Socket: "+a);a=new OT.Rumor.SocketError(null,a||"Unknown Socket Error");q&&clearTimeout(q);
s("error");"connecting"===this.previousState&&m&&(m(a,null),m=null);f&&f(a)}.bind(this),x=function F(a){d&&(void 0===a&&(a=0),k&&clearTimeout(k),0<d.bufferedAmount&&10>=a+1?k=setTimeout(F,100,a+1):(s("disconnecting"),k&&(clearTimeout(k),k=null),console.info("CALLED CLOSE ON WEBSOCKET"),d.close()))},y=function H(){this.is("connected")&&((!t?0:44900<=OT.$.now()-t)?E({code:4001}):(d.send(OT.Rumor.Message.Ping().serialize()),p=setTimeout(H.bind(this),9E3)))}.bind(this),B=function(){q&&clearTimeout(q);
d.send(OT.Rumor.Message.Connect(b,g).serialize());s("connected");m&&(m(null,b),m=null);h&&h(b);setTimeout(function(){t=OT.$.now();y()},9E3)},D=function(){w("Timed out while waiting for the Rumor socket to connect.")},G=function(a){},E=function(a){q&&clearTimeout(q);p&&clearTimeout(p);if(1E3!==a.code&&1001!==a.code){var b=a.reason||a.message;!b&&c.hasOwnProperty(a.code)&&(b=c[a.code]);w("Rumor Socket Disconnected: "+b)}this.isNot("error")&&s("disconnected")}.bind(this),C=function(a){t=OT.$.now();n&&
(a=OT.Rumor.Message.deserialize(a.data),a.type!==OT.Rumor.MessageType.PONG&&n(a.toAddress,a.data))};this.publish=function(a,b){d.send(OT.Rumor.Message.Publish(a,b).serialize())};this.subscribe=function(a){d.send(OT.Rumor.Message.Subscribe(a).serialize())};this.unsubscribe=function(a){d.send(OT.Rumor.Message.Unsubscribe(a).serialize())};this.connect=function(c,f){if(this.is("connecting","connected"))f(new OT.Rumor.SocketError(null,"Rumor.Socket cannot connect when it is already connecting or connected."));
else{b=c;m=f;try{s("connecting"),d=new (a||WebSocket)(e),d.binaryType="arraybuffer",d.onopen=B,d.onclose=E,d.onerror=G,d.onmessage=C,q=setTimeout(D,OT.Rumor.Socket.CONNECT_TIMEOUT)}catch(h){OT.error(h),w("Could not connect to the Rumor socket, possibly because of a blocked port.")}}};this.disconnect=function(){q&&clearTimeout(q);p&&clearTimeout(p);d?3===d.readyState?this.isNot("error")&&s("disconnected"):(this.is("connected")&&d.send(OT.Rumor.Message.Disconnect().serialize()),x()):this.isNot("error")&&
s("disconnected")};Object.defineProperties(this,{id:{get:function(){return b}},onOpen:{set:function(a){u("onOpen",a);h=a},get:function(){return h}},onError:{set:function(a){u("onError",a);f=a},get:function(){return f}},onClose:{set:function(a){u("onClose",a);l=a},get:function(){return l}},onMessage:{set:function(a){u("onMessage",a);n=a},get:function(){return n}}})};OT.Rumor.Socket.CONNECT_TIMEOUT=15E3})(this);
(function(k){OT.Rumor.Message=function(c,e,g,a){this.type=c;this.toAddress=e;this.headers=g;this.data=a};OT.Rumor.Message.prototype.serialize=function(){var c=8,e=7,g=Array(this.toAddress.length),a=Array(this.headers.length),d=Array(this.headers.length),b;e++;for(var h=0;h<this.toAddress.length;h++)g[h]=TextEncoder("utf-8").encode(this.toAddress[h]),e+=2,e+=g[h].length;e++;for(h=0;h<this.headers.length;h++)a[h]=TextEncoder("utf-8").encode(this.headers[h].key),d[h]=TextEncoder("utf-8").encode(this.headers[h].val),
e+=4,e+=a[h].length,e+=d[h].length;b=TextEncoder("utf-8").encode(this.data);var e=e+b.length,f=new ArrayBuffer(e),l=new Uint8Array(f,0,e),e=e-4;l[0]=(e&4278190080)>>>24;l[1]=(e&16711680)>>>16;l[2]=(e&65280)>>>8;l[3]=(e&255)>>>0;l[4]=0;l[5]=0;l[6]=this.type;l[7]=this.toAddress.length;for(h=0;h<g.length;h++){strArray=g[h];l[c++]=strArray.length>>8&255;l[c++]=strArray.length>>0&255;for(e=0;e<strArray.length;e++)l[c++]=strArray[e]}l[c++]=a.length;for(h=0;h<a.length;h++){strArray=a[h];l[c++]=strArray.length>>
8&255;l[c++]=strArray.length>>0&255;for(e=0;e<strArray.length;e++)l[c++]=strArray[e];strArray=d[h];l[c++]=strArray.length>>8&255;l[c++]=strArray.length>>0&255;for(e=0;e<strArray.length;e++)l[c++]=strArray[e]}for(h=0;h<b.length;h++)l[c++]=b[h];return f};OT.Rumor.Message.deserialize=function(c){var e,g=8,a=new Uint8Array(c);e=a[6];for(var d=[],b=0;b<a[7];b++){length=a[g++]<<8;length+=a[g++];var h=new Uint8Array(c,g,length);d[b]=TextDecoder("utf-8").decode(h);g+=length}for(var f=a[g++],l=[],b=0;b<f;b++){length=
a[g++]<<8;length+=a[g++];var h=new Uint8Array(c,g,length),n=TextDecoder("utf-8").decode(h),g=g+length;length=a[g++]<<8;length+=a[g++];h=new Uint8Array(c,g,length);h=TextDecoder("utf-8").decode(h);l[b]={key:n,val:h};g+=length}c=new Uint8Array(c,g);c=TextDecoder("utf-8").decode(c);return new OT.Rumor.Message(e,d,l,c)};OT.Rumor.Message.Connect=function(c,e){return new OT.Rumor.Message(OT.Rumor.MessageType.CONNECT,[],[{key:"uniqueId",val:c},{key:"notifyDisconnectAddress",val:e}],"")};OT.Rumor.Message.Disconnect=
function(){return new OT.Rumor.Message(OT.Rumor.MessageType.DISCONNECT,[],[],"")};OT.Rumor.Message.Subscribe=function(c){return new OT.Rumor.Message(OT.Rumor.MessageType.SUBSCRIBE,c,[],"")};OT.Rumor.Message.Unsubscribe=function(c){return new OT.Rumor.Message(OT.Rumor.MessageType.UNSUBSCRIBE,c,[],"")};OT.Rumor.Message.Publish=function(c,e,g){return new OT.Rumor.Message(OT.Rumor.MessageType.MESSAGE,c,[],e)};OT.Rumor.Message.Ping=function(){return new OT.Rumor.Message(OT.Rumor.MessageType.PING,[],[],
"")}})(this);
(function(k){OT.Raptor={Actions:{CONNECT:100,CREATE:101,UPDATE:102,DELETE:103,STATE:104,FORCE_DISCONNECT:105,FORCE_UNPUBLISH:106,SIGNAL:107,CREATE_ARCHIVE:108,CLOSE_ARCHIVE:109,START_RECORDING_SESSION:110,STOP_RECORDING_SESSION:111,START_RECORDING_STREAM:112,STOP_RECORDING_STREAM:113,LOAD_ARCHIVE:114,START_PLAYBACK:115,STOP_PLAYBACK:116,APPSTATE_PUT:117,APPSTATE_DELETE:118,OFFER:119,ANSWER:120,PRANSWER:121,CANDIDATE:122,SUBSCRIBE:123,UNSUBSCRIBE:124,QUERY:125,SDP_ANSWER:126,PONG:127,REGISTER:128,
QUALITY_CHANGED:129},Types:{RPC_REQUEST:100,RPC_RESPONSE:101,STREAM:102,ARCHIVE:103,CONNECTION:104,APPSTATE:105,CONNECTIONCOUNT:106,MODERATION:107,SIGNAL:108,SUBSCRIBER:110,JSEP:109}}})(this);
(function(k){var c={},e={};k=OT.Raptor.Types;for(var g in k)c[k[g]]=g;k=OT.Raptor.Actions;for(g in k)e[k[g]]=g;OT.Raptor.serializeMessage=function(a){return JSON.stringify(a)};OT.Raptor.deserializeMessage=function(a){a=JSON.parse(a);a.type&&(a.type=parseInt(a.type,10),a.typeName=c[a.type]||null);a.action&&(a.action=parseInt(a.action,10),a.actionName=e[a.action]||null);a.signature=a.typeName+":"+a.actionName;return a};OT.Raptor.Message={};OT.Raptor.Message.connect=function(a,d,b,c,e,g){a={credentials:{connectionId:d,
soAccessState:2,supportsWebRTC:!0,p2pEnabled:g,GUID:a,widgetId:a,partnerId:c},sessionId:b,params:{tokenPermissions:{apiKey:c},token:e},uniqueId:d};return OT.Raptor.serializeMessage({id:OT.$.uuid(),type:OT.Raptor.Types.RPC_REQUEST,action:OT.Raptor.Actions.CONNECT,payload:a,replyTo:d})};OT.Raptor.Message.getSessionState=function(a,d,b){return OT.Raptor.serializeMessage({id:OT.$.uuid(),type:OT.Raptor.Types.RPC_REQUEST,action:OT.Raptor.Actions.STATE,payload:{sessionId:d,connectionsRequired:b||!0},replyTo:a})};
OT.Raptor.Message.forceDisconnect=function(a,d,b){return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.RPC_REQUEST,action:OT.Raptor.Actions.FORCE_DISCONNECT,payload:{connectionId:d,sessionId:b},replyTo:a})};OT.Raptor.Message.streamCreate=function(a,d,b,c,e,g,n,m,k,q){d={key:d,value:{p2pEnabled:q||!1,publisherId:b,connection:{connectionId:a},type:"WebRTC",name:c||"",creationTime:Date.now(),orientation:{width:g,height:n,videoOrientation:e||"OTVideoOrientationRotatedNormal"},hasAudio:void 0!==
m?m:!0,hasVideo:void 0!==k?k:!0}};return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.STREAM,action:OT.Raptor.Actions.CREATE,payload:d,replyTo:""})};OT.Raptor.Message.streamDestroy=function(a,d,b){return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.STREAM,action:OT.Raptor.Actions.DELETE,payload:{key:d+"/STREAMS/"+b},replyTo:a})};OT.Raptor.Message.streamModify=function(a,d,b,c,e){return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.STREAM,action:OT.Raptor.Actions.UPDATE,payload:{key:[d,
"STREAMS",b,c].join("/"),value:e},replyTo:a})};OT.Raptor.Message.forceUnpublish=function(a,d,b){return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.RPC_REQUEST,action:OT.Raptor.Actions.FORCE_UNPUBLISH,payload:{sessionId:d,connectionId:a,streamId:b,webRTCStream:!0},replyTo:a})};OT.Raptor.Message.jsepOffer=function(a,d,b,c){return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.JSEP,action:OT.Raptor.Actions.OFFER,payload:{fromAddress:a,toAddresses:d,sdp:c,streamId:b},replyTo:a})};OT.Raptor.Message.jsepAnswer=
function(a,d,b,c){return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.JSEP,action:OT.Raptor.Actions.ANSWER,payload:{fromAddress:a,toAddresses:d,sdp:c,streamId:b},replyTo:a})};OT.Raptor.Message.jsepSubscribe=function(a,d,b,c,e){return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.JSEP,action:OT.Raptor.Actions.SUBSCRIBE,payload:{keyManagemenMethod:OT.$.supportedCryptoScheme(),bundleSupport:OT.$.supportsBundle(),rtcpMuxSupport:OT.$.supportsRtcpMux(),fromAddress:a,toAddresses:d,streamId:b,
hasVideo:c,hasAudio:e},replyTo:a})};OT.Raptor.Message.jsepUnsubscribe=function(a,d,b){return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.JSEP,action:OT.Raptor.Actions.UNSUBSCRIBE,payload:{fromAddress:a,toAddresses:d,streamId:b},replyTo:a})};OT.Raptor.Message.jsepCandidate=function(a,d,b,c){return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.JSEP,action:OT.Raptor.Actions.CANDIDATE,payload:{fromAddress:a,toAddresses:d,candidate:c,streamId:b},replyTo:a})};OT.Raptor.Message.subscriberModify=
function(a,d,b,c,e,g){return OT.Raptor.serializeMessage({id:OT.$.uuid(),type:OT.Raptor.Types.SUBSCRIBER,action:OT.Raptor.Actions.UPDATE,payload:{key:[d,"SUBSCRIBER",b,a,e].join("/"),value:g},replyTo:a})};OT.Raptor.Message.signal=function(a,d,b,c,e){var g={id:OT.$.uuid(),fromAddress:a};c&&!Array.isArray(c)?g.toAddresses=[c]:g.toAddresses=!c||0===c.length?[d]:c;void 0!==b&&(g.type=b);void 0!==e&&(g.data=e);return OT.Raptor.serializeMessage({id:a,type:OT.Raptor.Types.SIGNAL,action:OT.Raptor.Actions.SIGNAL,
payload:g,replyTo:a})}})(this);
(function(k){OT.Signal=function(c,e,g){var a=function(a){if(a){if(!Array.isArray(a))return{code:400,reason:"The To field was invalid"}}else return{code:400,reason:"The signal type was null or an empty String. Either set it to a non-empty String value or omit it"};for(var b=0;b<a.length;b++)if(!(a[b]instanceof OT.Connection||a[b]instanceof OT.Session))return{code:400,reason:"The To field was invalid"};return null},d=function(a){var b=null;null===a||void 0===a?b={code:400,reason:"The signal type was null or undefined. Either set it to a String value or omit it"}:
128<a.length?b={code:413,reason:"The signal type was too long, the maximum length of it is 128 characters"}:/^[a-zA-Z0-9\-\._~]+$/.exec(a)||(b={code:400,reason:"The signal type was invalid, it can only contain letters, numbers, '-', '_', and '~'."});return b},b=function(a){var b=null;if(null===a||void 0===a)b={code:400,reason:"The signal data was null or undefined. Either set it to a String value or omit it"};else try{8192<JSON.stringify(a).length&&(b={code:413,reason:"The data field was too long, the maximum size of it is 8192 characters"})}catch(d){b=
{code:400,reason:"The data field was not valid JSON"}}return b};this.toRaptorMessage=function(){var a;this.to&&(a=this.to.map(function(a){return"string"===typeof a?a:a.id}));return OT.Raptor.Message.signal(e,c,this.type,a,this.data)};this.toHash=function(){var a=OT.$.clone(g);void 0===a.to&&(a.to=null);void 0===a.data&&(a.data=null);return a};this.error=null;g&&(g.hasOwnProperty("data")&&(this.data=OT.$.clone(g.data),this.error=b(this.data)),g.hasOwnProperty("to")&&(Array.isArray(g.to)?this.to=OT.$.clone(g.to):
this.to=[g.to],this.error||(this.error=a(this.to))),g.hasOwnProperty("type")&&(this.error||(this.error=d(g.type)),this.type=g.type));this.valid=null===this.error}})(this);
(function(k){function c(c,g,a){this.code=c;this.reason=g;this.signal=a}OT.Raptor.Socket=function(e,g,a){var d=OT.properties.messagingProtocol+"://"+g+":"+OT.properties.messagingPort+"/rumorwebsocketsv2",b="symphony."+g,h,f,l,k,m=new OT.Capabilities([]),r=new OT.Analytics,q=OT.$.statable(this,["disconnected","connecting","connected","error","disconnecting"],"disconnected"),t=function(a,b,d,c){a={action:"Connect",variation:a,payload_type:b,payload:d,session_id:h,partner_id:OT.APIKEY,widget_id:e,widget_type:"Controller"};
c&&(a=OT.$.extend(c,a));r.logEvent(a)},p=function(a,b,c){a?(t("Failure","reason",c+a.code+":"+a.message),q("error")):(t("Success","webSocketServerUrl",d,{connectionId:f.id}),q("connected"),m=new OT.Capabilities(b.permissions));k.apply(null,arguments)},s=function(a){var b=OT.sessions.get(h).connection,d=this.is("disconnecting")?"clientDisconnected":"networkDisconnected";a&&4001==a.code&&(d="networkTimedout");q("disconnected");b&&(b.destroyedReason?console.debug("OT.Raptor.Socket: Socket was closed but the connection had already been destroyed. Reason: "+
b.destroyedReason):b.destroy(d))}.bind(this),u=function(){};this.permittedTo=function(a){return 1===m[a]};this.connect=function(a,c,m){this.is("disconnected","error")?(q("connecting"),h=c.sessionId,k=m,m=OT.$.uuid(),OT.sessions.get(h),t("Attempt","webSocketServerUrl|userAgent|sdkVersion|chromeFrame",[d,navigator.userAgent,OT.properties.version,window.externalHost?"yes":"no"].map(function(a){return a.replace("|","\\|")}).join("|")),f=new OT.Rumor.Socket(d,b),f.onClose=s,f.onMessage=l.dispatch.bind(l),
f.connect(m,function(b){b?p(b,null,"RumorConnection:"):(f.onError=u,OT.debug("Raptor Socket connected to "+h+" on "+g),f.subscribe([h]),b=OT.Raptor.Message.connect(e,f.id,h,OT.APIKEY,a,c.p2pEnabled),this.publish(b))}.bind(this))):OT.warn("Cannot connect the Raptor Socket as it is currently connected. You should disconnect first.")};this.disconnect=function(){this.is("disconnected")||(q("disconnecting"),f.disconnect())};this.publish=function(a){f.isNot("connected")?OT.error("OT.Raptor.Socket: cannot publish until the socket is connected."+
a):(OT.debug("OT.Raptor.Socket Publish: "+a),f.publish([b],a))};this.createStream=function(a,b,d,c,e,g,l){var m=OT.sessions.get(h);a=OT.Raptor.Message.streamCreate(f.id,h,a,b,d,c,e,g,l,m.sessionInfo.p2pEnabled);this.publish(a)};this.updateStream=function(a,b,d){this.publish(OT.Raptor.Message.streamModify(f.id,h,a,b,d))};this.destroyStream=function(a){this.publish(OT.Raptor.Message.streamDestroy(f.id,h,a))};this.modifySubscriber=function(a,b,d){this.publish(OT.Raptor.Message.subscriberModify(f.id,
h,a.streamId,a.widgetId,b,d))};this.forceDisconnect=function(a){this.publish(OT.Raptor.Message.forceDisconnect(f.id,a,h))};this.forceUnpublish=function(a){this.publish(OT.Raptor.Message.forceUnpublish(f.id,h,a))};this.jsepSubscribe=function(a,b,d,c){this.publish(OT.Raptor.Message.jsepSubscribe(f.id,a,b,d,c))};this.jsepUnsubscribe=function(a,b){this.publish(OT.Raptor.Message.jsepUnsubscribe(f.id,a,b))};this.jsepCandidate=function(a,b,d){this.publish(OT.Raptor.Message.jsepCandidate(f.id,a,b,d))};this.jsepOffer=
function(a,b,d){this.publish(OT.Raptor.Message.jsepOffer(f.id,a,b,d))};this.jsepAnswer=function(a,b,d){this.publish(OT.Raptor.Message.jsepAnswer(f.id,a,b,d))};this.signal=function(a,b){var d=new OT.Signal(h,f.id,a||{});d.valid?(this.publish(d.toRaptorMessage()),b&&OT.$.isFunction(b)&&b(null,d.toHash())):b&&OT.$.isFunction(b)&&b(new c(d.error.code,d.error.reason,d.toHash()))};OT.$.defineGetters(this,{id:function(){return f.id},capabilities:function(){return m},sessionId:function(){return h}});l=new (a||
OT.Raptor.Dispatcher)(this,function(a,b){p.call(this,a,b,"ConnectToSession:")})}})(this);
(function(k){function c(a,d){var b=new OT.Stream(a.streamId,d.connections.get(a.connection.connectionId),a.name,a.streamData,a.type,a.creationTime,a.hasAudio,a.hasVideo,a.orientation?a.orientation.videoOrientation:null,a.peerId,a.quality,a.orientation?a.orientation.width:null,a.orientation?a.orientation.height:null);a.publisherId&&(b.publisherId=a.publisherId);return b}function e(a,d){if(!d.streams.has(a.streamId)){var b=c(a,d);d.streams.add(b);return b}}var g={409:"This P2P session already has 2 participants.",
410:"The session already has four participants.",1004:"The token passed is invalid."};OT.publishers=new OT.Collection("guid");OT.subscribers=new OT.Collection("widgetId");OT.sessions=new OT.Collection;OT.Raptor.Dispatcher=function(a,d){this.socket=a;this.connectionCompletion=d};OT.Raptor.Dispatcher.prototype.dispatch=function(a,d){var b=OT.Raptor.deserializeMessage(d);if(b.typeName)if(b.actionName)switch(OT.debug("OT.Raptor.dispatch "+b.signature+": "+d),b.type){case OT.Raptor.Types.RPC_RESPONSE:this.dispatchRPCResponse(b);
break;case OT.Raptor.Types.CONNECTION:this.dispatchConnection(b);break;case OT.Raptor.Types.CONNECTIONCOUNT:this.dispatchConnectionCount(b);break;case OT.Raptor.Types.STREAM:this.dispatchStream(b);break;case OT.Raptor.Types.SUBSCRIBER:this.dispatchSubscriber(b);break;case OT.Raptor.Types.MODERATION:this.dispatchModeration(b);break;case OT.Raptor.Types.JSEP:this.dispatchJsep(b);break;case OT.Raptor.Types.SIGNAL:this.dispatchSignal(b);break;default:OT.warn("OT.Raptor.dispatch: Type "+b.typeName+" is not currently implemented")}else OT.error("OT.Raptor.dispatch: Invalid action ("+
b.action+") for "+b.typeName),OT.error(b);else OT.error("OT.Raptor.dispatch: Invalid message type ("+b.type+")")};OT.Raptor.Dispatcher.prototype.dispatchRPCResponse=function(a){switch(a.action){case OT.Raptor.Actions.CONNECT:if(!1==a.payload.connectSuccess){var d=new OT.Error(OT.ExceptionCodes.CONNECT_REJECTED,g[a.payload.reason]||"Failed to connect");this.connectionCompletion.call(null,d)}else this.socket.publish(OT.Raptor.Message.getSessionState(this.socket.id,a.payload.sessionId,!0));break;case OT.Raptor.Actions.STATE:d=
a.payload.value;a=OT.sessions.get(a.payload.key);var b;d.streams=[];d.connections=[];d.archives=[];if(d.hasOwnProperty("CONNECTIONS")){for(var c in d.CONNECTIONS)b=OT.Connection.fromHash(d.CONNECTIONS[c]),d.connections.push(b),a.connections.add(b);delete d.CONNECTIONS}if(d.hasOwnProperty("STREAMS")){for(c in d.STREAMS)d.streams.push(e(d.STREAMS[c],a));delete d.STREAMS}this.connectionCompletion.call(null,null,d);break;default:OT.warn("OT.Raptor.dispatch: "+a.signature+" is not currently implemented")}};
OT.Raptor.Dispatcher.prototype.dispatchConnection=function(a){var d=OT.sessions.get(a.payload.value.sessionId),b;if(d)switch(a.action){case OT.Raptor.Actions.CREATE:b=OT.Connection.fromHash(a.payload.value);d.connection&&b.id!==d.connection.id&&d.connections.add(b);break;case OT.Raptor.Actions.DELETE:b=d.connections.get(a.payload.value.connectionId);b.destroy(a.payload.reason);break;default:OT.warn("OT.Raptor.dispatch: "+a.signature+" is not currently implemented")}else OT.error("OT.Raptor.dispatch: Unable to determine session for "+
a.payload.value.sessionId+" on "+a.signature+" message!")};OT.Raptor.Dispatcher.prototype.dispatchConnectionCount=function(a){};OT.Raptor.Dispatcher.prototype.dispatchStream=function(a){var d=a.payload.key.split("/"),b=d[0],h,f;b&&(h=OT.sessions.get(b));if(h)switch(a.action){case OT.Raptor.Actions.REGISTER:f=c(a.payload.value,h);f.publisherId&&((d=OT.publishers.get(f.publisherId))?d._.streamRegisteredHandler(f):OT.warn("OT.Raptor.dispatch: Could find a publisher "+f.publisherId+" for "+a.signature));
break;case OT.Raptor.Actions.CREATE:e(a.payload.value,h);break;case OT.Raptor.Actions.UPDATE:d[1]&&(f=h.streams.get(d[1]));if(!f){OT.error("OT.Raptor.dispatch: Unable to determine streamId, or the stream does not exist, for "+a.signature+" message!");break}f.update(d[2],a.payload.value);break;case OT.Raptor.Actions.DELETE:d[2]&&(f=h.streams.get(d[2]));if(!f){OT.error("OT.Raptor.dispatch: Unable to determine streamId, or the stream does not exist, for "+a.signature+" message!");break}f.destroy(a.payload.reason);
break;default:OT.warn("OT.Raptor.dispatch: "+a.signature+" is not currently implemented")}else OT.error("OT.Raptor.dispatch: Unable to determine sessionId, or the session does not exist, for "+a.signature+" message!")};OT.Raptor.Dispatcher.prototype.dispatchModeration=function(a){};OT.Raptor.Dispatcher.prototype.dispatchJsep=function(a){var d,b=a.payload.streamId,c;switch(a.action){case OT.Raptor.Actions.OFFER:c=[];(b=OT.subscribers.find({streamId:b}))&&c.push(b);break;case OT.Raptor.Actions.ANSWER:case OT.Raptor.Actions.PRANSWER:case OT.Raptor.Actions.SUBSCRIBE:case OT.Raptor.Actions.UNSUBSCRIBE:c=
OT.publishers.where({streamId:b});break;case OT.Raptor.Actions.CANDIDATE:c=OT.publishers.where({streamId:b}).concat(OT.subscribers.where({streamId:b}));break;default:OT.warn("OT.Raptor.dispatch: "+a.signature+" is not currently implemented");return}c.length&&(d=c[0].session.connections.get(a.payload.fromAddress),!d&&a.payload.fromAddress.match(/^symphony\./)?(d=new OT.Connection(a.payload.fromAddress,Date.now(),null,{supportsWebRTC:!0}),c[0].session.connections.add(d)):d||OT.warn("Messsage comes from a connection ("+
a.payload.fromAddress+") that we do not know about."));c.forEach(function(b){b.processMessage(a.action,d,a.payload)})};OT.Raptor.Dispatcher.prototype.dispatchSubscriber=function(a){var d=a.payload.key.split("/"),b=OT.sessions.get(d[0]),c;if(b)if(c=d[2]?b.streams.get(d[2]):null)if(d=OT.subscribers.find(function(a){return a.streamId===c.id&&a.session.id===b.id}))switch(a.action){case OT.Raptor.Actions.QUALITY_CHANGED:d.updateQuality(parseInt(a.payload.value,10));break;default:OT.warn("OT.Raptor.dispatch: "+
a.signature+" is not currently implemented")}else OT.error("OT.Raptor.dispatch: Unable to determine subscriberId, or the subscriber does not exist, for "+a.signature+" message!");else OT.error("OT.Raptor.dispatch: Unable to determine streamId, or the stream does not exist, for "+a.signature+" message!");else OT.error("OT.Raptor.dispatch: Unable to determine sessionId, or the session does not exist, for "+a.signature+" message!")};OT.Raptor.Dispatcher.prototype.dispatchSignal=function(a){if(a.action!==
OT.Raptor.Actions.SIGNAL)OT.warn("OT.Raptor.dispatch: "+a.signature+" is not currently implemented");else{var d=OT.sessions.get(this.socket.sessionId);d?d._.dispatchSignal(d.connections.get(a.payload.fromAddress),a.payload.type,a.payload.data):OT.error("OT.Raptor.dispatch: "+a.signature+" ERROR - sessionId must be provided and be valid")}}})(this);
(function(k){var c=new function(){var c=!1,g=!1,a=function(){g&&c&&OT.dispatchEvent(new OT.EnvLoadedEvent(OT.Event.names.ENV_LOADED))},d=function(){g=!0;OT.$.on(k,"unload",function(){OT.publishers.destroy();OT.subscribers.destroy();OT.sessions.destroy()});OT.Config.load(OT.properties.configURL);a()},b=function(){c=!0;OT.Config.off("dynamicConfigChanged",b);OT.Config.off("dynamicConfigLoadFailed",h);a()},h=function(){b()};OT.Config.on("dynamicConfigChanged",b);OT.Config.on("dynamicConfigLoadFailed",
h);"complete"==document.readyState||"interactive"==document.readyState&&document.body?d():document.addEventListener?document.addEventListener("DOMContentLoaded",d,!1):document.attachEvent&&document.attachEvent("onreadystatechange",function(){"complete"==document.readyState&&d()});this.onLoad=function(a){if(g&&c)a();else OT.on(OT.Event.names.ENV_LOADED,a)}};OT.onLoad=function(e,g){if(g)c.onLoad(e.bind(g));else c.onLoad(e)}})(window);
(function(k){function c(a,d,b,c){var f=e[b];c=c?OT.$.clone(c):{};OT.error("TB.exception :: title: "+f+" ("+b+") msg: "+d);c.partnerId||(c.partnerId=OT.APIKEY);try{g||(g=new OT.Analytics),g.logError(b,"tb.exception",f,{details:d},c),OT.dispatchEvent(new OT.ExceptionEvent(OT.Event.names.EXCEPTION,d,f,b,a,a))}catch(l){OT.error("TB.exception :: Failed to dispatch exception - "+l.toString())}}OT.Error=function(a,d){this.code=a;this.message=d};var e={1E3:"Failed To Load",1004:"Authentication error",1005:"Invalid Session ID",
1006:"Connect Failed",1007:"Connect Rejected",1008:"Connect Time-out",1009:"Security Error",1010:"Not Connected",1011:"Invalid Parameter",1012:"Peer-to-peer Stream Play Failed",1013:"Connection Failed",1014:"API Response Failure",1500:"Unable to Publish",1510:"Unable to Signal",1520:"Unable to Force Disconnect",1530:"Unable to Force Unpublish",1540:"Unable to record archive",1550:"Unable to play back archive",1560:"Unable to create archive",1570:"Unable to load archive",2E3:"Internal Error",2001:"Embed Failed",
3E3:"Archive load exception",3001:"Archive create exception",3002:"Playback stop exception",3003:"Playback start exception",3004:"Record start exception",3005:"Record stop exception",3006:"Archive load exception",3007:"Session recording in progress",3008:"Archive recording internal failure",4E3:"WebSocket Connection Failed",4001:"WebSocket Network Disconnected"},g;OT.handleJsException=function(a,d,b){b=b||{};var e,f=b.session;f?(e={sessionId:f.sessionId},f.connected&&(e.connectionId=f.connection.connectionId),
b.target||(b.target=f)):b.sessionId&&(e={sessionId:b.sessionId},b.target||(b.target=null));c(b.target,a,d,e)};OT.exceptionHandler=function(a,d,b,e,f){var g;a&&((g=OT.components[a])||OT.warn("Could not find the component with component ID "+a));c(g,d,e,f)}})(window);(function(k){OT.ConnectionCapabilities=function(c){c.supportsWebRTC=OT.$.castToBoolean(c.supportsWebRTC);this.supportsWebRTC=c.supportsWebRTC}})(window);
(function(k){OT.Connection=function(c,e,g,a){var d;this.id=this.connectionId=c;this.creationTime=e?Number(e):null;this.data=g;this.capabilities=new OT.ConnectionCapabilities(a);this.quality=null;OT.$.eventing(this);this.destroy=function(a,c){d=a||"clientDisconnected";!0!==c&&this.dispatchEvent(new OT.DestroyedEvent("destroyed",this,d))}.bind(this);Object.defineProperties(this,{destroyed:{get:function(){return void 0!==d},enumerable:!0},destroyedReason:{get:function(){return d},enumerable:!0}})};OT.Connection.fromHash=
function(c){return new OT.Connection(c.connectionId,c.creationTime,c.data,{supportsWebRTC:c.supportsWebRTC})}})(window);
(function(k){var c="hasAudio hasVideo quality name videoDimensions orientation".split(" ");OT.Stream=function(e,g,a,d,b,h,f,l,k,m,r,q,t){var p;this.id=this.streamId=e;this.connection=g;this.name=a;this.data=d;this.type=b||"basic";this.creationTime=h?Number(h):null;this.hasAudio=OT.$.castToBoolean(f,!0);this.hasVideo=OT.$.castToBoolean(l,!0);this.peerId=m;this.quality=r;this.videoDimensions={width:q||640,height:t||480,orientation:k||OT.VideoOrientation.ROTATED_NORMAL};OT.$.eventing(this);this.update=
function(a,b){if(-1===c.indexOf(a))OT.warn('Unknown stream property "'+a+'" was modified to "'+b+'".');else{var d=this[a],e=b;switch(a){case "hasAudio":case "hasVideo":e=OT.$.castToBoolean(e,!0);this[a]=e;break;case "quality":case "name":this[a]=e;break;case "orientation":this.videoDimensions={width:e.width,height:e.height,orientation:e.videoOrientation}}d=new OT.StreamUpdatedEvent(this,a,d,e);this.dispatchEvent(d)}};this.destroy=function(a,b){p=a||"clientDisconnected";!0!==b&&this.dispatchEvent(new OT.DestroyedEvent("destroyed",
this,p))};Object.defineProperties(this,{destroyed:{get:function(){return void 0!==p},enumerable:!0},destroyedReason:{get:function(){return p},enumerable:!0}})}})(window);
(function(k){var c=k.mozRTCSessionDescription||k.RTCSessionDescription,e=k.mozRTCIceCandidate||k.RTCIceCandidate,g=function(a){return function(b){OT.debug("IceCandidateForwarder: Ice Candidate");b.candidate?a(OT.Raptor.Actions.CANDIDATE,b.candidate):OT.debug("IceCandidateForwarder: No more ICE candidates.")}},a=function(){var a=[],b=null;Object.defineProperty(this,"peerConnection",{set:function(a){b=a}});this.process=function(d){d=new e(d.candidate);b?b.addIceCandidate(d):a.push(d)};this.processPending=
function(){for(;a.length;)b.addIceCandidate(a.shift())}},d=function(a){var b=/a=rtpmap:(\d+) CN\/\d+/i,d=[],c,e;a=a.split("\r\n").filter(function(a,f){-1!==a.indexOf("m\x3daudio")&&(c=f);e=a.match(b);return null!==e?(d.push(e[1]),!1):!0});d.length&&c&&(a[c]=a[c].replace(RegExp(d.join("|"),"ig"),"").replace(/\s+/g," "));return a.join("\r\n")},b=function(a,b,c,e){var g=function(a){return function(b){e&&e(a,b)}},h=function(b){b.sdp=d(b.sdp);a.setLocalDescription(b,function(){c(b)},g("SetLocalDescription:Error while setting LocalDescription"))};
-1===b.sdp.indexOf("a\x3dcrypto")&&(b.sdp=b.sdp.replace(/^c=IN(.*)$/gmi,"c\x3dIN$1\r\na\x3dcrypto:1 AES_CM_128_HMAC_SHA1_80 inline:FakeFakeFakeFakeFakeFakeFakeFakeFakeFake\\r\\n"));-1===b.sdp.indexOf("a\x3drtcp-fb")&&(b.sdp=b.sdp.replace(/^m=video(.*)$/gmi,"m\x3dvideo$1\r\na\x3drtcp-fb:* ccm fir\r\na\x3drtcp-fb:* nack "));a.setRemoteDescription(b,function(b){a.createAnswer(h,g("CreateAnswer:Error while setting createAnswer"),null,!1)},g("SetRemoteDescription:Error while setting RemoteDescription"))},
h=function(a,b,c){var e={mandatory:{},optional:[]},g=function(a){return function(b){c&&c(a,b)}};navigator.mozGetUserMedia&&(e.mandatory.MozDontOfferDataChannel=!0);a.createOffer(function(c){c.sdp=d(c.sdp);a.setLocalDescription(c,function(){b(c)},g("SetLocalDescription:Error while setting LocalDescription"))},g("CreateOffer:Error while creating Offer"),e)};OT.PeerConnection=function(d){var e,n=new a,m,r,q="new",t=[],p,s=OT.$.now();OT.$.eventing(this);d.iceServers||(d.iceServers=[]);var u=function(a,
b){if(t.length)t[0](a,b)}.bind(this),w=function(){if(!e){try{OT.debug('Creating peer connection config "'+JSON.stringify(d)+'".'),e=OT.$.createPeerConnection(d,{optional:[{DtlsSrtpKeyAgreement:!0}]})}catch(a){return v("NewPeerConnection: "+a.message),null}n.peerConnection=e;e.onicecandidate=g(u);e.onaddstream=B.bind(this);e.onremovestream=D.bind(this);void 0!==e.onsignalingstatechange?e.onsignalingstatechange=y.bind(this):void 0!==e.onstatechange&&(e.onstatechange=y.bind(this))}return e}.bind(this),
x=function(){n&&(n.peerConnection=null);null!==e&&(e=null,this.trigger("close"))},y=function(a){a="string"===typeof a?a:a.target&&a.target.signalingState?a.target.signalingState:a.target.readyState;OT.debug("PeerConnection.stateChange: "+a);if(a&&a.toLowerCase()!==q)switch(q=a.toLowerCase(),OT.debug("PeerConnection.stateChange: "+q),q){case "closed":x.call(this);break;case "failed":v("ICEWorkflow: Ice state failed")}},B=function(a){this.trigger("streamAdded",a.stream)},D=function(a){this.trigger("streamRemoved",
a.stream)},G=function(a){a=new c(a.sdp);w();_remoteDescriptionType=a.type;_remoteDescription=a;b(e,a,function(a){u(OT.Raptor.Actions.ANSWER,a)},function(a,b){v(a+":"+b+":PeerConnection.offerProcessor")})},E=function(a){a.sdp?(r=new c(a.sdp),_remoteDescriptionType=r.type,_remoteDescription=r,e.setRemoteDescription(r,function(){OT.debug("setRemoteDescription succeeded")},function(a){v("SetRemoteDescription:Error while setting RemoteDescription: "+a)}),n.processPending()):OT.error("PeerConnection.processMessage: Weird message, no SDP.")},
C=function(a){OT.debug("PeerConnection.processSubscribe: Sending offer to subscriber.");w();h(e,function(a){m=a;u(OT.Raptor.Actions.OFFER,m)},function(a,b){v(a+":"+b+": PeerConnection.suscribeProcessor")})},v=function(a){OT.error(a);this.trigger("error",a)}.bind(this);this.addLocalStream=function(a){w();e.addStream(a)};this.disconnect=function(){n=null;if(e){var a=e.signalingState||e.readyState;a&&"closed"!==a.toLowerCase()&&e.close();x.call(this)}this.off()};this.processMessage=function(a,b){OT.debug("PeerConnection.processMessage: Received "+
a+" from "+b.fromAddress);OT.debug(b);switch(a){case OT.Raptor.Actions.SUBSCRIBE:C.call(this,b);break;case OT.Raptor.Actions.OFFER:G.call(this,b);break;case OT.Raptor.Actions.ANSWER:E.call(this,b);break;case OT.Raptor.Actions.CANDIDATE:n.process(b);break;default:OT.debug("PeerConnection.processMessage: Received an unexpected message of type "+a+" from "+b.fromAddress+": "+JSON.stringify(b))}return this};this.registerMessageDelegate=function(a){return t.push(a)};this.unregisterMessageDelegate=function(a){a=
t.indexOf(a);-1!==a&&t.splice(a,1);return t.length};this.getStats=function(a,b){if(!0==p)OT.warn("PeerConnection.getStats: Already getting the stats!");else{p=!0;var d=OT.$.now(),c=(d-a.timeStamp)/1E3;a.timeStamp=d;var f=function(b){var d=a.videoBytesTransferred||0;return b.stat("googFrameHeightSent")?(a.videoBytesTransferred=b.stat("bytesSent"),Math.round(8*(a.videoBytesTransferred-d)/c)):b.stat("googFrameHeightReceived")?(a.videoBytesTransferred=b.stat("bytesReceived"),Math.round(8*(a.videoBytesTransferred-
d)/c)):NaN},g=function(b){var d=a.audioBytesTransferred||0;return b.stat("audioInputLevel")?(a.audioBytesTransferred=b.stat("bytesSent"),Math.round(8*(a.audioBytesTransferred-d)/c)):b.stat("audioOutputLevel")?(a.audioBytesTransferred=b.stat("bytesReceived"),Math.round(8*(a.audioBytesTransferred-d)/c)):NaN},h={},m=function(a){if(a.result){a=a.result();for(var d=0;d<a.length;d++){var c=a[d];if(c.stat){"true"===c.stat("googActiveConnection")&&(h.localCandidateType=c.stat("googLocalCandidateType"),h.remoteCandidateType=
c.stat("googRemoteCandidateType"),h.transportType=c.stat("googTransportType"));var e=f(c);isNaN(e)||(h.avgVideoBitrate=e);c=g(c);isNaN(c)||(h.avgAudioBitrate=c)}}}p=!1;b(h)};h.duration=Math.round(d-s);var d=function(a){for(var d in a)if(a.hasOwnProperty(d)&&("outboundrtp"===a[d].type||"inboundrtp"===a[d].type)){var c=a[d];-1!==c.id.indexOf("video")?(c=f(c),isNaN(c)||(h.avgVideoBitrate=c)):-1!==c.id.indexOf("audio")&&(c=g(c),isNaN(c)||(h.avgAudioBitrate=c))}p=!1;b(h)},v=function(){var a=k.navigator.userAgent.toLowerCase().match(/Firefox\/([0-9\.]+)/i),
b=null!==a&&27<=parseFloat(a[1],10);v=function(){return b};return b};e&&e.getStats?v()?e.getStats(null,d,function(a){OT.warn("Error collecting stats",a);p=!1}):e.getStats(m):(p=!1,b(h))}};Object.defineProperty(this,"remoteStreams",{get:function(){var a;if(e){if(e.getRemoteStreams)a=e.getRemoteStreams();else if(e.remoteStreams)a=e.remoteStreams;else throw Error("Invalid Peer Connection object implements no method for retrieving remote streams");a=Array.prototype.slice.call(a)}else a=[];return a}})}})(window);
(function(k){var c={};OT.PeerConnections={add:function(e,g,a){e=e.id+"_"+g.id;(g=c[e])||(g=c[e]={count:0,pc:new OT.PeerConnection(a)});g.count+=1;return g.pc},remove:function(e,g){var a=e.id+"_"+g.id,d=c[a];d&&(d.count-=1,0===d.count&&(d.pc.disconnect(),delete c[a]))}}})(window);
(function(k){OT.PublisherPeerConnection=function(c,e,g,a){var d,b=!1,h=function(){this.destroy();this.trigger("disconnected",this)},f=function(a){this.trigger("error",null,a,this);this.destroy()},l=function(a,d){if(!b&&(a===OT.Raptor.Actions.CANDIDATE||a===OT.Raptor.Actions.OFFER||a===OT.Raptor.Actions.ANSWER||a===OT.Raptor.Actions.PRANSWER))b=-1!==(a===OT.Raptor.Actions.CANDIDATE?d.candidate:d.sdp).indexOf("typ relay");switch(a){case OT.Raptor.Actions.ANSWER:case OT.Raptor.Actions.PRANSWER:e._.jsepAnswer(c.id,
g,d);break;case OT.Raptor.Actions.OFFER:this.trigger("connected");e._.jsepOffer(c.id,g,d);break;case OT.Raptor.Actions.CANDIDATE:e._.jsepCandidate(c.id,g,d)}}.bind(this);OT.$.eventing(this);this.destroy=function(){d&&OT.PeerConnections.remove(c,g);d.off();d=null};this.processMessage=function(a,b){d.processMessage(a,b)};this.getStats=function(a,b){d.getStats(a,b)};this.init=function(){var k=e.sessionInfo.iceServers.map(function(a){a=OT.$.clone(a);"turn:"===a.url.trim().substr(0,5)&&(a.username=e.id+
"."+e.connection.id+"."+g.id);return a});d=OT.PeerConnections.add(c,g,{iceServers:k});d.on({close:h,error:f},this);d.registerMessageDelegate(l);d.addLocalStream(a);Object.defineProperty(this,"remoteConnection",{value:c});Object.defineProperty(this,"hasRelayCandidates",{get:function(){return b}})}}})(window);
(function(k){OT.SubscriberPeerConnection=function(c,e,g,a){var d,b=!1,h=function(){this.destroy();this.trigger("disconnected",this)},f=function(a){this.trigger("remoteStreamAdded",a,this)},l=function(a){this.trigger("remoteStreamRemoved",a,this)},k=function(a){this.trigger("error",null,a,this)},m=function(a,d){if(!b&&(a===OT.Raptor.Actions.CANDIDATE||a===OT.Raptor.Actions.OFFER||a===OT.Raptor.Actions.ANSWER||a===OT.Raptor.Actions.PRANSWER))b=-1!==(a===OT.Raptor.Actions.CANDIDATE?d.candidate:d.sdp).indexOf("typ relay");
switch(a){case OT.Raptor.Actions.ANSWER:case OT.Raptor.Actions.PRANSWER:this.trigger("connected");e._.jsepAnswer(c.id,g,d);break;case OT.Raptor.Actions.OFFER:e._.jsepOffer(c.id,g,d);break;case OT.Raptor.Actions.CANDIDATE:e._.jsepCandidate(c.id,g,d)}}.bind(this),r=function(a){var b="get"+(a?"Video":"Audio")+"Tracks";return function(a){var c=d.remoteStreams,e;if(0!==c.length&&c[0][b])for(var f=0,g=c.length;f<g;++f){e=c[f];e=e[b]();for(var h=0,l=e.length;h<l;++h)e[h].enabled=a}}};OT.$.eventing(this);
this.destroy=function(){d&&(0===d.unregisterMessageDelegate(m)&&(e&&(e.connected&&g&&!g.destroyed)&&e._.jsepUnsubscribe(g),this.subscribeToAudio(!1)),OT.PeerConnections.remove(c,g.streamId));d=null;this.off()};this.processMessage=function(a,b){d.processMessage(a,b)};this.getStats=function(a,b){d.getStats(a,b)};this.subscribeToAudio=r(!1);this.subscribeToVideo=r(!0);Object.defineProperty(this,"hasRelayCandidates",{get:function(){return b}});this.init=function(){var b=e.sessionInfo.iceServers.map(function(a){a=
OT.$.clone(a);"turn:"===a.url.trim().substr(0,5)&&(a.username=e.id+"."+e.connection.id+"."+g.id);return a});d=OT.PeerConnections.add(c,g.streamId,{iceServers:b});d.on({close:h,streamAdded:f,streamRemoved:l,error:k},this);b=d.registerMessageDelegate(m);0<d.remoteStreams.length?d.remoteStreams.forEach(f,this):1===b&&e._.jsepSubscribe(g,a.subscribeToVideo,a.subscribeToAudio)}}})(window);
(function(k){OT.Chrome=function(c){var e={},g=function(a,d){d.parent=this;d.appendTo(c.parent);e[a]=d;Object.defineProperty(this,a,{get:function(){return e[a]}})};c.parent&&(OT.$.eventing(this),this.destroy=function(){this.off();this.hide();for(var a in e)e[a].destroy()},this.show=function(){for(var a in e)e[a].show()},this.hide=function(){for(var a in e)e[a].hide()},this.set=function(a,d){if("string"===typeof a&&d)g.call(this,a,d);else for(var b in a)a.hasOwnProperty(b)&&g.call(this,b,a[b]);return this})}})(window);
(function(k){OT.Chrome.Behaviour||(OT.Chrome.Behaviour={});OT.Chrome.Behaviour.Widget=function(c,e){var g=e||{},a,d;c.setDisplayMode=function(b){b=b||"auto";a!==b&&(OT.$.removeClass(this.domElement,"OT_mode-"+a),OT.$.addClass(this.domElement,"OT_mode-"+b),d=a,a=b)};c.show=function(){this.setDisplayMode(d);if(g.onShow)g.onShow();return this};c.hide=function(){this.setDisplayMode("off");if(g.onHide)g.onHide();return this};c.destroy=function(){if(g.onDestroy)g.onDestroy(this.domElement);this.domElement&&
OT.$.removeElement(this.domElement);return c};c.appendTo=function(a){this.domElement=OT.$.createElement(g.nodeName||"div",g.htmlAttributes,g.htmlContent);if(g.onCreate)g.onCreate(this.domElement);"auto"!=g.mode?c.setDisplayMode(g.mode):(c.setDisplayMode("on"),setTimeout(function(){c.setDisplayMode(g.mode)},2E3));a.appendChild(this.domElement);return c}}})(window);
(function(k){OT.Chrome.NamePanel=function(c){var e=c.name;if(!e||""===e.trim().length)e=null,c.mode="off";var g;Object.defineProperty(this,"domElement",{get:function(){return g},set:function(a){g=a}});OT.Chrome.Behaviour.Widget(this,{mode:c.mode,nodeName:"h1",htmlContent:e,htmlAttributes:{className:"OT_name"}});Object.defineProperty(this,"name",{set:function(a){e||this.setDisplayMode("auto");e=a;g.innerHTML=e}.bind(this)})}})(window);
(function(k){OT.Chrome.MuteButton=function(c){var e,g=c.muted||!1,a;Object.defineProperty(this,"domElement",{get:function(){return a},set:function(b){a=b}});var d=function(b){(g=!g)?(OT.$.addClass(a,"OT_active"),this.parent.trigger("muted",this)):(OT.$.removeClass(a,"OT_active"),this.parent.trigger("unmuted",this));return!1};OT.Chrome.Behaviour.Widget(this,{mode:c.mode,nodeName:"button",htmlContent:"Mute",htmlAttributes:{className:g?"OT_mute OT_active":"OT_mute"},onCreate:function(a){e=d.bind(this);
a.addEventListener("click",e,!1)}.bind(this),onDestroy:function(a){e=null;a.removeEventListener("click",e,!1)}.bind(this)})}})(window);
(function(k){OT.Chrome.MicVolume=function(c){var e,g=c.muted||!1,a;Object.defineProperty(this,"domElement",{get:function(){return a},set:function(b){a=b}});var d=function(b){(g=!g)?(OT.$.addClass(a,"active"),this.parent.trigger("muted",this)):(OT.$.removeClass(a,"active"),this.parent.trigger("unmuted",this));return!1};OT.Chrome.Behaviour.Widget(this,{mode:c.mode,nodeName:"button",htmlContent:"Mute",htmlAttributes:{className:"OT_mic-volume"},onCreate:function(a){e=d.bind(this);a.addEventListener("click",
e,!1)}.bind(this),onDestroy:function(a){e=null;a.removeEventListener("click",e,!1)}.bind(this)})}})(window);
(function(k){OT.Chrome.SettingsPanelButton=function(c){var e,g=function(a){this.parent.trigger("SettingsPanel:open",this);return!1},a;Object.defineProperty(this,"domElement",{get:function(){return a},set:function(d){a=d}});OT.Chrome.Behaviour.Widget(this,{mode:c.mode,nodeName:"button",htmlContent:"Settings",htmlAttributes:{className:"OT_settings-panel"},onCreate:function(a){e=g.bind(this);a.addEventListener("click",e,!1)}.bind(this),onDestroy:function(a){e=null;a.removeEventListener("click",e,!1)}.bind(this)})}})(window);
(function(k){OT.Chrome.SettingsPanel=function(c){if(c.stream){var e=c.stream,g;Object.defineProperty(this,"domElement",{get:function(){return g},set:function(a){g=a}});var a=function(){var a=e.getVideoTracks().length?e.getVideoTracks()[0].label:"None",c=e.getAudioTracks().length?e.getAudioTracks()[0].label:"None";g.innerHTML="\x3cdl\x3e                                        \x3cdt\x3eCam\x3c/dt\x3e                                        \x3cdd\x3e"+a+"\x3c/dd\x3e                                        \x3cdt\x3eMic\x3c/dt\x3e                                        \x3cdd\x3e"+
c+"\x3c/dd\x3e                                    \x3c/dl\x3e";a=OT.$.createButton("Close",{className:"OT_close"},{click:d.bind(this)});g.appendChild(a)},d=function(){this.parent.trigger("SettingsPanel:close",this);return!1};OT.Chrome.Behaviour.Widget(this,{mode:c.mode,nodeName:"section",htmlContent:"Settings",htmlAttributes:{className:"OT_settings-panel"},onCreate:a.bind(this),onShow:function(){a.call(this)}.bind(this)})}}})(window);
(function(k){OT.Chrome.OpenTokButton=function(c){var e;this.__defineGetter__("domElement",function(){return e});this.__defineSetter__("domElement",function(c){e=c});OT.Chrome.Behaviour.Widget(this,{mode:c?c.mode:null,nodeName:"span",htmlContent:"OpenTok",htmlAttributes:{className:"OT_opentok"}})}})(window);
(function(k){OT.StylableComponent=function(e,g){if(!e.trigger)throw Error("OT.StylableComponent is dependent on the mixin OT.$.eventing. Ensure that this is included in the object before StylableComponent.");var a=new c(g,function(a,b,c){c?e.trigger("styleValueChanged",a,b,c):e.trigger("styleValueChanged",a,b)});e.getStyle=function(d){return a.get(d)};e.setStyle=function(d,b,c){"string"!==typeof d?a.setAll(d,c):a.set(d,b);return this}};var c=function(c,g){var a="showMicButton showSpeakerButton showSettingsButton showCameraToggleButton nameDisplayMode buttonDisplayMode showSaveButton showRecordButton showRecordStopButton showReRecordButton showPauseButton showPlayButton showPlayStopButton showStopButton backgroundImageURI showControlPanel showRecordCounter showPlayCounter showControlBar showPreviewTime".split(" "),
d={buttonDisplayMode:["auto","off","on"],nameDisplayMode:["auto","off","on"],showSettingsButton:[!0,!1],showMicButton:[!0,!1],showCameraToggleButton:[!0,!1],showSaveButton:[!0,!1],backgroundImageURI:null,showControlBar:[!0,!1],showPlayCounter:[!0,!1],showRecordCounter:[!0,!1],showPreviewTime:[!0,!1]},b={},h=function(a,b){return"backgroundImageURI"===a||d.hasOwnProperty(a)&&-1!==d[a].indexOf(b)},f=function(a){switch(a){case "true":return!0;case "false":return!1;default:return a}};this.getAll=function(){var d=
OT.$.clone(b),c;for(c in d)0>a.indexOf(c)&&delete d[c];return d};this.get=function(a){return a?b[a]:this.getAll()};this.setAll=function(a,d){var c,e,k;for(k in a)e=f(a[k]),h(k,e)?(c=b[k],e!==c&&(b[k]=e,d||g(k,e,c))):OT.warn("Style.setAll::Invalid style property passed "+k+" : "+e);return this};this.set=function(a,d){OT.debug("Publisher.setStyle: "+a.toString());var c=f(d),e;if(!h(a,c))return OT.warn("Style.set::Invalid style property passed "+a+" : "+c),this;e=b[a];c!==e&&(b[a]=c,g(a,d,e));return this};
c&&this.setAll(c,!0)}})(window);(function(k){OT.Microphone=function(c,e){var g,a=50;Object.defineProperty(this,"muted",{get:function(){return g},set:function(a){if(g!==a){g=a;a=c.getAudioTracks();for(var b=0,e=a.length;b<e;++b)a[b].enabled=!g}}});Object.defineProperty(this,"gain",{get:function(){return a},set:function(d){OT.warn("OT.Microphone.gain IS NOT YET IMPLEMENTED");a=d}});void 0!==e?this.muted=!0===e:c.getAudioTracks().length?this.muted=!c.getAudioTracks()[0].enabled:this.muted=!1}})(window);
(function(k){OT.generateSimpleStateMachine=function(c,e,g){var a=e.slice(),d=OT.$.clone(g);return function(b){function e(a,d){b({message:a,newState:d,currentState:f,previousState:g})}var f=c,g=null;this.set=function(b){var c;-1!==a.indexOf(b)?d[f]&&-1!==d[f].indexOf(b)?c=!0:(e("'"+f+"' cannot transition to '"+b+"'",b),c=!1):(e("'"+b+"' is not a valid state",b),c=!1);c&&(g=f,f=b)};Object.defineProperties(this,{current:{get:function(){return f}},subscribing:{get:function(){return"Subscribing"===f}}})}}})(window);
(function(k){OT.SubscribingState=OT.generateSimpleStateMachine("NotSubscribing","NotSubscribing Init ConnectingToPeer BindingRemoteStream Subscribing Failed".split(" "),{NotSubscribing:["NotSubscribing","Init"],Init:["NotSubscribing","ConnectingToPeer","BindingRemoteStream"],ConnectingToPeer:["NotSubscribing","BindingRemoteStream","Failed"],BindingRemoteStream:["NotSubscribing","Subscribing","Failed"],Subscribing:["NotSubscribing","Failed"],Failed:[]});Object.defineProperty(OT.SubscribingState.prototype,
"attemptingToSubscribe",{get:function(){return-1!==["Init","ConnectingToPeer","BindingRemoteStream"].indexOf(this.current)}})})(window);
(function(k){OT.PublishingState=OT.generateSimpleStateMachine("NotPublishing","NotPublishing GetUserMedia BindingMedia MediaBound PublishingToSession Publishing Failed".split(" "),{NotPublishing:["NotPublishing","GetUserMedia"],GetUserMedia:["BindingMedia","Failed","NotPublishing"],BindingMedia:["MediaBound","Failed","NotPublishing"],MediaBound:["NotPublishing","PublishingToSession","Failed"],PublishingToSession:["NotPublishing","Publishing","Failed"],Publishing:["NotPublishing","MediaBound","Failed"],
Failed:[]});Object.defineProperties(OT.PublishingState.prototype,{attemptingToPublish:{get:function(){return-1!==["GetUserMedia","BindingMedia","MediaBound","PublishingToSession"].indexOf(this.current)}},publishing:{get:function(){return"Publishing"===this.current}}})})(window);
(function(k){var c={audio:!0,video:!0};OT.Publisher=function(){if(OT.checkSystemRequirements()){var e=OT.Publisher.nextId(),g,a,d,b,h,f,l={},k=!1,m,r,q,t,p,s=new OT.Analytics,u={},w={timeStamp:OT.$.now()},x;OT.$.eventing(this);OT.StylableComponent(this,{showMicButton:!0,showSettingsButton:!0,showCameraToggleButton:!0,nameDisplayMode:"auto",buttonDisplayMode:"auto",backgroundImageURI:null});var y=function(a,d,c,g){s.logEvent({action:a,variation:d,payload_type:c,payload:g,session_id:f?f.sessionId:null,
connection_id:f&&f.connected?f.connection.connectionId:null,partner_id:f?f.apiKey:OT.APIKEY,streamId:b?b.id:null,widget_id:e,widget_type:"Publisher"})},B=function(a){var d={widget_type:"Publisher",stream_type:"WebRTC",sessionId:f?f.sessionId:null,connectionId:f&&f.connected?f.connection.connectionId:null,partnerId:f?f.apiKey:OT.APIKEY,streamId:b?b.id:null,widgetId:e,version:OT.properties.version,media_server_name:f?f.sessionInfo.messagingServer:null,p2pFlag:f?f.sessionInfo.p2pEnabled:!1,duration:(new Date).getTime()-
r.getTime(),remote_connection_id:a};l[a].getStats(w,function(a){if(a)for(var b in a)d[b]=a[b];s.logQOS(d)})},D=function(){OT.debug("OT.Publisher.onLoaded");x.set("MediaBound");a.loading=!1;k=!0;p=(new OT.Chrome({parent:a.domElement})).set({name:new OT.Chrome.NamePanel({name:m.name,mode:this.getStyle("nameDisplayMode")}),muteButton:new OT.Chrome.MuteButton({muted:!1===m.publishAudio,mode:K.call(this,this.getStyle("showMicButton"))}),opentokButton:new OT.Chrome.OpenTokButton}).on({muted:this.publishAudio.bind(this,
!1),unmuted:this.publishAudio.bind(this,!0)});this.trigger("initSuccess",this);this.trigger("loaded",this)},G=function(a){y("publish","Failure","reason","Publisher PeerConnection Error: "+a);x.set("Failed");this.trigger("publishError","Publisher PeerConnection Error: "+a);OT.handleJsException("Publisher PeerConnection Error: "+a,OT.ExceptionCodes.P2P_CONNECTION_FAILED,{session:f,target:this})},E=function(b){OT.debug("OT.Publisher.onStreamAvailable");x.set("BindingMedia");h&&(h.stop(),h=null);h=b;
t=new OT.Microphone(h,!m.publishAudio);this.publishVideo(m.publishVideo);this.dispatchEvent(new OT.Event(OT.Event.names.ACCESS_ALLOWED,!1));d=new OT.VideoElement({attributes:{muted:!0}});d.on({streamBound:D,loadError:G,error:I},this).bindToStream(h);a.video=d},C=function(b){OT.error("OT.Publisher.onStreamAvailableError "+b.name+": "+b.message);x.set("Failed");this.trigger("publishError",b.message);a&&a.destroy();y("publish","Failure","reason","Publisher failed to access camera/mic: "+b.message);OT.handleJsException("Publisher failed to access camera/mic: "+
b.message,2E3,{session:f,target:this})},v=function(b){OT.error("OT.Publisher.onStreamAvailableError Permission Denied");x.set("Failed");this.trigger("publishError",b.message);y("publish","Failure","reason","Publisher Access Denied: Permission Denied");var d=new OT.Event(OT.Event.names.ACCESS_DENIED);this.dispatchEvent(d,function(){!d.isDefaultPrevented()&&a&&a.destroy()})},F=function(){y("accessDialog","Opened","","");this.dispatchEvent(new OT.Event(OT.Event.names.ACCESS_DIALOG_OPENED,!1))},H=function(){y("accessDialog",
"Closed","","");this.dispatchEvent(new OT.Event(OT.Event.names.ACCESS_DIALOG_CLOSED,!1))},I=function(a,b){OT.error("OT.Publisher.onVideoError");var d=b+(a?" ("+a+")":"");y("stream",null,"reason","Publisher while playing stream: "+d);x.set("Failed");x.attemptingToPublish?this.trigger("publishError",d):this.trigger("error",d);OT.handleJsException("Publisher error playing stream: "+d,2E3,{session:f,target:this})},M=function(a){OT.debug("OT.Subscriber has been disconnected from the Publisher's PeerConnection");
this.cleanupSubscriber(a.remoteConnection.id)},N=function(a,b,d){y("publish","Failure","reason|hasRelayCandidates",[b+": Publisher PeerConnection with connection "+(d&&d.remoteConnection&&d.remoteConnection.id)+" failed",d.hasRelayCandidates].join("|"));OT.handleJsException("Publisher PeerConnection Error: "+b,2E3,{session:f,target:this});d.remoteConnection&&(clearInterval(u[d.remoteConnection.id]),delete u[d.remoteConnection.id],delete l[d.remoteConnection.id]);d.off()},O=function(a){var d=l[a.id];
if(!d){var c=OT.$.now();y("createPeerConnection","Attempt","","");a.on("destroyed",this.cleanupSubscriber.bind(this,a.id));d=l[a.id]=new OT.PublisherPeerConnection(a,f,b,h);d.on({connected:function(){y("createPeerConnection","Success","pcc|hasRelayCandidates",[parseInt(OT.$.now()-c,10),d.hasRelayCandidates].join("|"));u[a.id]=setInterval(function(){B(a.id)},3E4)},disconnected:M,error:N},this);d.init()}return d},K=function(a){if(!1===a)return"off";a=this.getStyle("buttonDisplayMode");return!1===a?
"on":a},J=function(){p&&(p.destroy(),p=null);this.disconnect();t=null;d&&(d.destroy(),d=null);h&&(h.stop(),h=null);a&&(a.destroy(),a=null);this.session&&this._.unpublishFromSession(this.session);for(var c in u)clearInterval(u[c]),delete u[c];b=g=null;k=!1;_properties=f=null;x.set("NotPublishing")}.bind(this);this.publish=function(b,d){OT.debug("OT.Publisher: publish");(x.attemptingToPublish||x.publishing)&&J();x.set("GetUserMedia");m=OT.$.defaults(d||{},{publishAudio:!0,publishVideo:!0,mirror:!0});
m.constraints=OT.$.defaults(m.constraints||{},c);m.style&&this.setStyle(m.style,null,!0);m.name&&(m.name=m.name.toString());m.classNames="OT_root OT_publisher";OT.onLoad(function(){a=new OT.WidgetView(b,m);g=a.domId;OT.$.getUserMedia(m.constraints,E.bind(this),C.bind(this),F.bind(this),H.bind(this),v.bind(this))},this);return this};this.publishAudio=function(a){m.publishAudio=a;t&&(t.muted=!a);f&&b&&f._.modifyStream(b.streamId,"hasAudio",a);return this};this.publishVideo=function(d){var c=m.publishVideo;
m.publishVideo=d;f&&(b&&m.publishVideo!==c)&&f._.modifyStream(b.streamId,"hasVideo",d);if(h)for(var c=h.getVideoTracks(),e=0,g=c.length;e<g;++e)c[e].enabled=d;a&&(a.showPoster=!d);return this};this.recordQOS=function(){for(var a in l)B(a)};this.destroy=function(a,b){J();!0!==b&&this.dispatchEvent(new OT.DestroyedEvent(OT.Event.names.PUBLISHER_DESTROYED,this,a),this.off.bind(this));return this};this.disconnect=function(){for(var a in l)this.cleanupSubscriber(a)};this.cleanupSubscriber=function(a){var b=
l[a];clearInterval(u[a]);delete u[a];b&&(b.destroy(),delete l[a],y("disconnect","PeerConnection","subscriberConnection",a))};this.processMessage=function(a,b,d){OT.debug("OT.Publisher.processMessage: Received "+a+" from "+b.id);OT.debug(d);switch(a){case OT.Raptor.Actions.UNSUBSCRIBE:this.cleanupSubscriber(b.id);break;default:O.call(this,b).processMessage(a,d)}};this.getImgData=function(){return!k?(OT.error("OT.Publisher.getImgData: Cannot getImgData before the Publisher is publishing."),null):d.imgData};
this._={publishToSession:function(a){this.session=a;var b=function(){this.session&&(x.set("PublishingToSession"),q&&clearTimeout(q),q=setTimeout(function(){y("publish","Failure","reason","StreamCreated: Timed out waiting for streamRegistered");this.trigger("publishError","StreamCreated: Timed out waiting for streamRegistered")}.bind(this),3E4),a._.createStream(this.guid,m&&m.name?m.name:"",OT.VideoOrientation.ROTATED_NORMAL,d.videoWidth,d.videoHeight,m.publishAudio,m.publishVideo))};if(k)b.call(this);
else this.on("initSuccess",b,this);y("publish","Attempt","streamType","WebRTC");return this}.bind(this),unpublishFromSession:function(a){if(!this.session||a.id!==this.session.id)return OT.warn("The publisher "+this.guid+" is trying to unpublish from a session "+a.id+" it is not attached to"),this;a.connected&&this.stream&&a._.destroyStream(this.stream.id);this.disconnect();this.session=null;x.set("MediaBound");y("unpublish","Success","sessionId",a.id);return this}.bind(this),streamRegisteredHandler:function(a){clearTimeout(q);
q=null;y("publish","Success","streamType","WebRTC");this.stream=a;this.stream.on("destroyed",this.disconnect,this);a=e;e=OT.Publisher.nextId();a&&this.trigger("idUpdated",a,e);x.set("Publishing");r=new Date;this.trigger("publishSuccess")}.bind(this)};this.detectDevices=function(){OT.warn("Fixme: Haven't implemented detectDevices")};this.detectMicActivity=function(){OT.warn("Fixme: Haven't implemented detectMicActivity")};this.getEchoCancellationMode=function(){OT.warn("Fixme: Haven't implemented getEchoCancellationMode");
return"fullDuplex"};this.setMicrophoneGain=function(a){OT.warn("Fixme: Haven't implemented setMicrophoneGain")};this.getMicrophoneGain=function(){OT.warn("Fixme: Haven't implemented getMicrophoneGain");return 0.5};this.setCamera=function(a){OT.warn("Fixme: Haven't implemented setCamera")};this.setMicrophone=function(a){OT.warn("Fixme: Haven't implemented setMicrophone")};Object.defineProperties(this,{id:{get:function(){return g},enumerable:!0},guid:{get:function(){return e},enumerable:!0},stream:{get:function(){return b},
set:function(a){b=a},enumerable:!0},streamId:{get:function(){return!b?null:b.id},enumerable:!0},targetElement:{get:function(){return d.domElement}},domId:{get:function(){return g}},session:{get:function(){return f},set:function(a){f=a},enumerable:!0},isWebRTC:{get:function(){return!0}},loading:{get:function(){return a&&a.loading}}});Object.defineProperty(this._,"webRtcStream",{get:function(){return h}});this.on("styleValueChanged",function(a,b,d){if(p)switch(a){case "nameDisplayMode":p.name.setDisplayMode(b)}},
this);x=new OT.PublishingState(function(a){OT.error("Publisher State Change Failed: ",a.message);OT.debug(a)})}else OT.upgradeSystemRequirements()};OT.Publisher.nextId=OT.$.uuid})(window);
(function(k){OT.Subscriber=function(c,e){var g=OT.$.uuid(),a=c||g,d,b,h,f,l,k,m=e.session,r,q,t,p=OT.$.clone(e),s=new OT.Analytics,u=50,w,x,y={timeStamp:OT.$.now()};if(m){OT.$.eventing(this);OT.StylableComponent(this,{nameDisplayMode:"auto",buttonDisplayMode:"auto",backgroundImageURI:null});var B=function(a,b,d,c){s.logEvent({action:a,variation:b,payload_type:d,payload:c,stream_id:f?f.id:null,session_id:m?m.sessionId:null,connection_id:m&&m.connected?m.connection.connectionId:null,partner_id:m&&m.connected?
m.sessionInfo.partnerId:null,widget_id:g,widget_type:"Subscriber"})},D=function(){if(w.subscribing&&m&&m.connected){var a={widget_type:"Subscriber",stream_type:"WebRTC",session_id:m?m.sessionId:null,connectionId:m?m.connection.connectionId:null,media_server_name:m?m.sessionInfo.messagingServer:null,p2pFlag:m?m.sessionInfo.p2pEnabled:!1,partner_id:m?m.apiKey:null,stream_id:f.id,widget_id:g,version:OT.properties.version,duration:parseInt(OT.$.now()-r,10),remote_connection_id:f.connection.connectionId};
k.getStats(y,function(b){if(b)for(stat_index in b)a[stat_index]=b[stat_index];s.logQOS(a)})}},G=function(){!w.subscribing&&b&&(OT.debug("OT.Subscriber.onLoaded"),w.set("Subscribing"),r=OT.$.now(),B("createPeerConnection","Success","pcc|hasRelayCandidates",[parseInt(r-q,10),k&&k.hasRelayCandidates].join("|")),t=setInterval(D,3E4),x&&(x=null,this.subscribeToVideo(!1)),d.loading=!1,I.call(this),this.trigger("subscribeSuccess",this),this.trigger("loaded",this),B("subscribe","Success","streamId",f.id))},
E=function(){OT.debug("OT.Subscriber has been disconnected from the Publisher's PeerConnection");w.attemptingToSubscribe?(w.set("Failed"),this.trigger("subscribeError","ClientDisconnected")):w.subscribing&&w.set("Failed");this.disconnect()},C=function(a,b){w.attemptingToSubscribe?(B("createPeerConnection","Failure","reason|hasRelayCandidates",["Subscriber PeerConnection Error: "+b,k&&k.hasRelayCandidates].join("|")),w.set("Failed"),this.trigger("subscribeError",b)):w.subscribing&&(w.set("Failed"),
this.trigger("error",b));this.disconnect();B("subscribe","Failure","reason",b+":Subscriber PeerConnection Error");OT.handleJsException("Subscriber PeerConnection Error: "+b,OT.ExceptionCodes.P2P_CONNECTION_FAILED,{session:m,target:this});d&&d.addError(b)},v=function(a){OT.debug("OT.Subscriber.onRemoteStreamAdded");w.set("BindingRemoteStream");this.subscribeToAudio(p.subscribeToAudio);var c=x;this.subscribeToVideo(p.subscribeToVideo);x=c;c=new OT.VideoElement;c.setAudioVolume(u);c.on({streamBound:G,
loadError:C,error:C},this);c.bindToStream(a);b=d.video=c;b.orientation={width:f.videoDimensions.width,height:f.videoDimensions.height,videoOrientation:f.videoDimensions.orientation};B("createPeerConnection","StreamAdded","","");this.trigger("streamAdded",this)},F=function(a){OT.debug("OT.Subscriber.onStreamRemoved");b.stream==a&&(b.destroy(),b=null);this.trigger("streamRemoved",this)},H=function(a){switch(a.changedProperty){case "orientation":b.orientation={width:f.videoDimensions.width,height:f.videoDimensions.height,
videoOrientation:f.videoDimensions.orientation};break;case "hasVideo":d&&(d.showPoster=!(f.hasVideo&&p.subscribeToVideo))}},I=function(){h=(new OT.Chrome({parent:d.domElement})).set({name:new OT.Chrome.NamePanel({name:p.name,mode:this.getStyle("nameDisplayMode")}),opentokButton:new OT.Chrome.OpenTokButton}).on({muted:function(){},unmuted:function(){}})};this.recordQOS=function(){D()};this.subscribe=function(b){OT.debug("OT.Subscriber: subscribe to "+b.id);if(w.subscribing)return OT.error("OT.Subscriber.Subscribe: Cannot subscribe, already subscribing."),
!1;w.set("Init");if(!b)return OT.error("OT.Subscriber: No stream parameter."),!1;if(f)return OT.error("OT.Subscriber: Already subscribed"),!1;f=b;f.on({updated:H,destroyed:this.disconnect},this);l=b.connection.connectionId;p.name=f.name;p.classNames="OT_root OT_subscriber";p.style&&this.setStyle(p.style,null,!0);p.audioVolume&&this.setAudioVolume(p.audioVolume);p.subscribeToAudio=OT.$.castToBoolean(p.subscribeToAudio,!0);p.subscribeToVideo=OT.$.castToBoolean(p.subscribeToVideo,!0);d=new OT.WidgetView(c,
p);a=d.domId;!p.subscribeToVideo&&"Chrome"==OT.$.browser()&&(x=!0,p.subscribeToVideo=!0);q=OT.$.now();f.connection.id!==m.connection.id?(B("createPeerConnection","Attempt","",""),w.set("ConnectingToPeer"),k=new OT.SubscriberPeerConnection(f.connection,m,f,p),k.on({disconnected:E,error:C,remoteStreamAdded:v,remoteStreamRemoved:F},this),k.init()):(B("createPeerConnection","Attempt","",""),v.call(this,m.getPublisherForStream(f)._.webRtcStream));B("subscribe","Attempt","streamId",f.id);return this};this.destroy=
function(b,c){clearInterval(t);t=null;this.disconnect();h&&(h.destroy(),h=null);d&&(d.destroy(),d=null);f&&!f.destroyed&&B("unsubscribe",null,"streamId",f.id);p=m=f=a=null;!0!==c&&this.dispatchEvent(new OT.DestroyedEvent(OT.Event.names.SUBSCRIBER_DESTROYED,this,b),this.off.bind(this));return this};this.disconnect=function(){w.set("NotSubscribing");b&&(b.destroy(),b=null);k&&(k.destroy(),k=null,B("disconnect","PeerConnection","streamId",f.id))};this.processMessage=function(a,b,d){OT.debug("OT.Subscriber.processMessage: Received "+
a+" message from "+b.id);OT.debug(d);l!=b.id&&(l=b.id);k&&k.processMessage(a,d)};this.updateQuality=function(a){OT.warn("Due to high packet loss and low bandwidth, video has been disabled");this.subscribeToVideo(!1);this.dispatchEvent(new OT.Event("videoDisabled"))};this.getImgData=function(){return!this.subscribing?(OT.error("OT.Subscriber.getImgData: Cannot getImgData before the Subscriber is subscribing."),null):b.imgData};this.setAudioVolume=function(a){a=parseInt(a,10);if(isNaN(a))return OT.error("OT.Subscriber.setAudioVolume: value should be an integer between 0 and 100"),
this;u=Math.max(0,Math.min(100,a));u!=a&&OT.warn("OT.Subscriber.setAudioVolume: value should be an integer between 0 and 100");b&&b.setAudioVolume(u);return this};this.getAudioVolume=function(){return b?b.getAudioVolume():u};this.subscribeToAudio=function(a){a=OT.$.castToBoolean(a,!0);k&&(k.subscribeToAudio(a),m&&(f&&a!==p.subscribeToAudio)&&m._.modifySubscriber(this,"hasAudio",a));p.subscribeToAudio=a;return this};this.subscribeToVideo=function(a){if(x&&!0==a)x=!1;else return a=OT.$.castToBoolean(a,
!0),d&&(d.showPoster=!(a&&f.hasVideo),a&&d.video&&(d.loading=a,d.video.whenTimeIncrements(function(){d.loading=!1},this))),k&&(k.subscribeToVideo(a),m&&(f&&a!==p.subscribeToVideo)&&m._.modifySubscriber(this,"hasVideo",a)),p.subscribeToVideo=a,this};Object.defineProperties(this,{id:{get:function(){return a},enumerable:!0},widgetId:{get:function(){return g}},stream:{get:function(){return f},enumerable:!0},streamId:{get:function(){return!f?null:f.id},enumerable:!0},targetElement:{get:function(){return b?
b.domElement:null}},subscribing:{get:function(){return w.subscribing},enumerable:!0},isWebRTC:{get:function(){return!0}},loading:{get:function(){return d&&d.loading}},session:{get:function(){return m}}});this.on("styleValueChanged",function(a,b,d){if(h)switch(a){case "nameDisplayMode":h.name.setDisplayMode(b)}},this);w=new OT.SubscribingState(function(a){OT.error("Subscriber State Change Failed: ",a.message);OT.debug(a)})}else OT.handleJsException("Subscriber must be passed a session option",2E3,
{session:m,target:this})}})(window);
(function(k){OT.SessionInfo=function(c){var g=null;this.sessionStatus=this.partnerId=this.sessionId=null;this.p2pEnabled=!1;this.iceServers=this.messagingServer=null;OT.log("SessionInfo Response:");OT.log(c);c&&(c.documentElement&&null!==c.documentElement.firstElementChild)&&(g=c.documentElement.firstElementChild);c=g.firstElementChild;do switch(c.localName){case "session_id":this.sessionId=c.textContent;break;case "partner_id":this.partnerId=c.textContent;break;case "session_status":this.sessionStatus=
c.textContent;break;case "messaging_server_url":this.messagingServer=c.textContent;break;case "ice_servers":this.iceServers=normaliseIceServers(parseIceServersXml(c.childNodes));break;case "properties":if(g=c.firstElementChild){do if("p2p"===g.localName&&null!==g.firstElementChild){this.p2pEnabled="enabled"===g.firstElementChild.textContent;break}while(g=g.nextElementSibling)}}while(c=c.nextElementSibling);if(!this.iceServers||0===this.iceServers.length)OT.warn("SessionInfo contained not ICE Servers, using the default"),
this.iceServers=[{url:"stun:stun.l.google.com:19302"}]};OT.SessionInfo.get=function(c,g,a){var d=OT.properties.apiURL+"/session/"+c.id+"?extended\x3dtrue",b=OT.$.now();c.logEvent("getSessionInfo","Attempt","api_url",OT.properties.apiURL);OT.$.getXML(d,{headers:{"X-TB-TOKEN-AUTH":c.token,"X-TB-VERSION":1},success:function(d){c.logEvent("Instrumentation",null,"gsi",OT.$.now()-b);var f=parseErrorFromXMLDocument(d);!1===f?onGetResponseCallback(c,g,d):onGetErrorCallback(c,a,f)},error:function(b){onGetErrorCallback(c,
a,parseErrorFromXMLDocument(b.target.responseXML))}})};var c={};c["404"]=OT.ExceptionCodes.INVALID_SESSION_ID;c["403"]=OT.ExceptionCodes.AUTHENTICATION_ERROR;parseErrorFromXMLDocument=function(c){if(c&&c.documentElement&&null!==c.documentElement.firstElementChild){c=c.evaluate("//error",c.documentElement,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);var g=c.snapshotLength;if(0===g)return!1;for(;0<g;)return c=c.snapshotItem(0),{code:c.getAttribute("code"),message:c.firstElementChild.getAttribute("message")}}return{code:null,
message:"Unknown error: getSessionInfo XML response was badly formed"}};onGetResponseCallback=function(c,g,a){c.logEvent("getSessionInfo","Success","api_url",OT.properties.apiURL);g(new OT.SessionInfo(a))};onGetErrorCallback=function(e,g,a){TB.handleJsException("TB.SessionInfoError :: Unable to get session info "+a.message,c[a.code],{session:e});e.logEvent("Connect","Failure","errorMessage","GetSessionInfo:"+a.code+": Unable to get session info "+a.message);g(a,e)};parseIceServersXml=function(c){for(var g=
[],a,d,b=0,h=c.length;b<h;++b)"ice_server"===c[b].localName&&(d=c[b].attributes,a={url:d.getNamedItem("url").nodeValue},d.getNamedItem("credential")&&d.getNamedItem("credential").nodeValue.length&&(a.credential=d.getNamedItem("credential").nodeValue),g.push(a));return g};normaliseIceServers=function(c){var g=navigator.userAgent.match(/(Firefox)\/([0-9]+\.[0-9]+)/),a=g?parseFloat(g[2],10):void 0,d;return c.map(function(b){if("turn:"!==b.url.trim().substr(0,5))return b;if(null!==g){if(25>a)return{url:b.url.replace("turn:",
"stun:")};27>a&&-1!==b.url.indexOf("?")&&(b.url=b.url.trim().split("?")[0])}d=b.url.trim().split(/[:@]/);return{username:d[1],credential:b.credential,url:d[0]+":"+d[2]+(4===d.length?":"+d[3]:"")}})}})(window);(function(k){OT.Capabilities=function(c){this.publish=-1!==c.indexOf("publish")?1:0;this.subscribe=-1!==c.indexOf("subscribe")?1:0;this.forceUnpublish=-1!==c.indexOf("forceunpublish")?1:0;this.forceDisconnect=-1!==c.indexOf("forcedisconnect")?1:0;this.supportsWebRTC=OT.$.supportsWebRTC()?1:0}})(window);
(function(k){var c=function(c,g,a,d){var b,h={},f=function(){clearTimeout(b);c.off("exception",k)},k=function(a){h.hasOwnProperty(a.code)&&this.failed(h[a.code])};this.failsOnExceptionCodes=function(a){h=a};this.succeeded=function(){f();completionHandler&&OT.$.callAsync(completionHandler,null)};this.failed=function(a){f();completionHandler&&OT.$.callAsync(completionHandler,new OT.Error(null,a))};c.on("exception",k,this);b=setTimeout(function(){this.failed(d&&d.timeoutMessage?d.timeoutMessage:"Timed out while waiting for the server to respond.")}.bind(this),
3E4)};OT.Session=function(e){if(OT.checkSystemRequirements()){var g=!0,a,d,b,h=OT.$.uuid(),f=new OT.Analytics,k,n={},m={};OT.$.eventing(this);var r=OT.$.statable(this,["disconnected","connecting","connected","disconnecting"],"disconnected");this.connections=new OT.Collection;this.streams=new OT.Collection;var q=function(a,b){r("disconnected");OT.error(a);this.trigger("sessionConnectFailed",a);TB.handleJsException(a,b||OT.ExceptionCodes.CONNECT_FAILED,{session:this})},t=function(a){var b=a.reason;
"networkTimedout"==b?(b="networkDisconnected",this.logEvent("Connect","TimeOutDisconnect","reason",a.reason)):this.logEvent("Connect","Disconnected","reason",a.reason);var c=new OT.SessionDisconnectEvent("sessionDisconnected",b);y.call(this);B.call(this);a=function(){c.isDefaultPrevented()||D.call(this,c.reason)}.bind(this);this.dispatchEvent(c,a)},p=function(a){a.id.match(/^symphony\./)||this.dispatchEvent(new OT.ConnectionEvent(OT.Event.names.CONNECTION_CREATED,[a]))},s=function(a,c){if(!a.id.match(/^symphony\./)&&
a.id!==b.id){if(n[a.id]){var d=n[a.id];delete n[a.id];"forceDisconnected"!==c&&OT.warn("Expected a forceDisconnect for connection "+a.id+", but a "+c+" was received instead.");d.succeeded()}this.dispatchEvent(new OT.ConnectionEvent(OT.Event.names.CONNECTION_DESTROYED,[a],c))}},u=function(a){this.dispatchEvent(new OT.StreamEvent(OT.Event.names.STREAM_CREATED,[a]))},w=function(a){var b=a.target,c=a.changedProperty,d=a.newValue;"orientation"===c&&(c="videoDimensions",d={width:d.width,height:d.height});
this.dispatchEvent(new OT.StreamPropertyChangedEvent(OT.Event.names.STREAM_PROPERTY_CHANGED,b,c,a.oldValue,d))},x=function(a,b){if(m[a.id]){var c=m[a.id];delete m[a.id];"forceUnpublished"!==b&&OT.warn("Expected a forceUnpublish for stream "+a.id+", but a "+b+" destroyed was received instead.");c.succeeded()}var d=new OT.StreamEvent("streamDestroyed",[a],b),c=function(){if(!d.isDefaultPrevented()){var b=OT.publishers.where({streamId:a.id})[0];b&&(b._.unpublishFromSession(this),b.destroy());OT.subscribers.where({streamId:a.id}).forEach(function(a){a.session.id===
this.id&&this.unsubscribe(a)},this)}}.bind(this);this.dispatchEvent(d,c)},y=function(){d=a=null;r("disconnected");this.connections.destroy();this.streams.destroy()},B=function(){OT.publishers.where({session:this}).forEach(function(a){a.disconnect()});OT.subscribers.where({session:this}).forEach(function(a){a.disconnect()})},D=function(a){OT.publishers.where({session:this}).forEach(function(b){b.destroy(a)});OT.subscribers.where({session:this}).forEach(function(b){b.destroy(a)})},G=function(){TB.debug("OT.Session: connecting to Raptor");
b=new OT.Raptor.Socket(h,this.sessionInfo.messagingServer);b.connect(d,this.sessionInfo,function(a,b){a?q.call(this,a.reason,a.code):(OT.debug("OT.Session: Received session state from Raptor",b),k=this.connection.id,r("connected"),this.connection.on("destroyed",t,this),this.connections.on({add:p,remove:s},this),this.streams.on({add:u,remove:x,update:w},this),this.dispatchEvent(new OT.SessionConnectEvent(OT.Event.names.SESSION_CONNECTED,b.connections,b.streams,b.archives)))}.bind(this))},E=function(){this.is("connecting")&&
OT.SessionInfo.get(this,C.bind(this),function(a){q.call(this,a.message+(a.code?" ("+a.code+")":""))}.bind(this))},C=function(b){this.is("connecting")&&(this.sessionInfo=b,this.sessionInfo.partnerId&&this.sessionInfo.partnerId!=a?(a=this.sessionInfo.partnerId,this.logEvent("Connect","Failure","reason","GetSessionInfo:"+OT.ExceptionCodes.AUTHENTICATION_ERROR+":Authentication Error: The apiKey passed into the session.connect method does not match the apiKey in the token or session you are trying to connect to."),
q.call(this,"Authentication Error: The apiKey passed into the session.connect method does not match the apiKey in the token or session you are trying to connect to.",OT.ExceptionCodes.AUTHENTICATION_ERROR)):G.call(this))};this.logEvent=function(b,c,d,g){b={action:b,variation:c,payload_type:d,payload:g,session_id:e,partner_id:a,widget_id:h,widget_type:"Controller"};this.connection&&this.connection.id?b.connection_id=this.connection.id:k&&(b.connection_id=k);f.logEvent(b)};this.connect=function(b,c,
e){this.is("connecting","connected")?OT.warn("OT.Session: Cannot connect, the session is already "+this.state):(y.call(this),r("connecting"),d=c,g?g=!1:h=OT.$.uuid(),a=b.toString(),0===OT.APIKEY.length&&(OT.APIKEY=a),e&&OT.$.isFunction(e)&&(this.once(OT.Event.names.SESSION_CONNECTED,e.bind(null,null)),this.once("sessionConnectFailed",e)),E.call(this))};this.disconnect=function(){b&&b.isNot("disconnected")?(r("disconnecting"),b.disconnect()):y.call(this)};this.destroy=function(a,b){this.streams.destroy();
this.connections.destroy();this.disconnect()};this.publish=function(c,d,g){if(this.isNot("connected"))return f.logError(1010,"tb.exception","We need to be connected before you can publish",null,{action:"publish",variation:"Failure",payload_type:"reason",payload:"We need to be connected before you can publish",session_id:e,partner_id:a,widgetId:h,widget_type:"Controller"}),g&&OT.$.isFunction(g)&&OT.$.callAsync(g,new OT.Error(OT.ExceptionCodes.NOT_CONNECTED,"We need to be connected before you can publish")),
null;if(!b||!b.permittedTo("publish"))return this.logEvent("publish","Failure","reason","This token does not allow publishing. The role must be at least `publisher` to enable this functionality"),TB.handleJsException("This token does not allow publishing. The role must be at least `publisher` to enable this functionality",OT.ExceptionCodes.UNABLE_TO_PUBLISH,{session:this}),null;if(!c||"string"===typeof c||c.nodeType==Node.ELEMENT_NODE)c=OT.initPublisher(this.apiKey,c,d);else if(c instanceof OT.Publisher)"session"in
c&&(c.session&&"sessionId"in c.session)&&(c.session.sessionId===this.sessionId?OT.warn("Cannot publish "+c.guid+" again to "+this.sessionId+". Please call session.unpublish(publisher) first."):OT.warn("Cannot publish "+c.guid+" publisher already attached to "+c.session.sessionId+". Please call session.unpublish(publisher) first."));else throw c="Session.publish :: First parameter passed in is neither a string nor an instance of the Publisher",OT.error(c),Error(c);if(g&&OT.$.isFunction(g))c.once("publishComplete",
g);c._.publishToSession(this);return c};this.unpublish=function(a){a?a._.unpublishFromSession(this):OT.error("OT.Session.unpublish: publisher parameter missing.")};this.subscribe=function(a,b,c,d){if(!this.connection||!this.connection.connectionId)throw a="Session.subscribe :: Connection required to subscribe",OT.error(a),Error(a);if(!a)throw a="Session.subscribe :: stream cannot be null",OT.error(a),Error(a);if(!a.hasOwnProperty("streamId"))throw a="Session.subscribe :: invalid stream object",OT.error(a),
Error(a);b=new OT.Subscriber(b,OT.$.extend(c||{},{session:this}));if(d&&OT.$.isFunction(d))b.once("subscribeComplete",d);OT.subscribers.add(b);b.subscribe(a);return b};this.unsubscribe=function(a){if(!a)throw OT.error("OT.Session.unsubscribe: subscriber cannot be null"),Error("OT.Session.unsubscribe: subscriber cannot be null");if(!a.stream)return OT.warn("OT.Session.unsubscribe:: tried to unsubscribe a subscriber that had no stream"),!1;OT.debug("OT.Session.unsubscribe: subscriber "+a.id);a.destroy();
return!0};this.getSubscribersForStream=function(a){return OT.subscribers.where({streamId:a.id})};this.getPublisherForStream=function(a){if("string"!=typeof a)if("object"==typeof a&&a&&a.hasOwnProperty("id"))a=a.id;else throw errorMsg="Session.getPublisherForStream :: Invalid stream type",OT.error(errorMsg),Error(errorMsg);return OT.publishers.where({streamId:a})[0]};this._={jsepSubscribe:function(a,c,d){return b.jsepSubscribe(a.connection.id,a.id,c,d)}.bind(this),jsepUnsubscribe:function(a){return b.jsepUnsubscribe(a.connection.id,
a.id)}.bind(this),jsepCandidate:function(a,c,d){return b.jsepCandidate(a,c.id,d)}.bind(this),jsepOffer:function(a,c,d){return b.jsepOffer(a,c.id,d)}.bind(this),jsepAnswer:function(a,c,d){return b.jsepAnswer(a,c.id,d)}.bind(this),dispatchSignal:function(a,b,c){a=new OT.SignalEvent(b,c,a);a.target=this;this.trigger(OT.Event.names.SIGNAL,a);b&&this.dispatchEvent(a)}.bind(this),modifySubscriber:function(a,c,d){return b.modifySubscriber(a,c,d)}.bind(this),createStream:function(a,c,d,e,f,g,h){b.createStream(a,
c,d,e,f,g,h)}.bind(this),modifyStream:function(a,c,d){!a||!c||void 0===d?OT.error("OT.Session.modifyStream: must provide streamId, key and value to modify a stream property."):b.updateStream(a,c,d)}.bind(this),destroyStream:function(a){b.destroyStream(a)}.bind(this)};this.signal=function(a,c){b.signal(a,c)};this.forceDisconnect=function(a,d){if(b&&b.permittedTo("forceDisconnect")){var e="string"===typeof a?a:a.id;if(d){var f=new c(this,d,{timeoutMessage:"Timed out while waiting for connection "+e+
" to be force Disconnected."});f.failsOnExceptionCodes({1520:"This token does not allow forceDisconnect. The role must be at least `moderator` to enable this functionality"});n[e]=f}b.forceDisconnect(e)}else d&&OT.$.callAsync(d,new OT.Error(null,"This token does not allow forceDisconnect. The role must be at least `moderator` to enable this functionality")),TB.handleJsException("This token does not allow forceDisconnect. The role must be at least `moderator` to enable this functionality",OT.ExceptionCodes.UNABLE_TO_FORCE_DISCONNECT,
{session:this})};this.forceUnpublish=function(a,d){if(b&&b.permittedTo("forceUnpublish")){var e="string"===typeof a?this.streams.get(a):a;if(d){var f=new c(this,d,{timeoutMessage:"Timed out while waiting for stream "+e.id+" to be force unpublished."});f.failsOnExceptionCodes({1530:"This token does not allow forceUnpublish. The role must be at least `moderator` to enable this functionality"});m[e.id]=f}b.forceUnpublish(e.id)}else d&&OT.$.callAsync(d,new OT.Error(null,"This token does not allow forceUnpublish. The role must be at least `moderator` to enable this functionality")),
TB.handleJsException("This token does not allow forceUnpublish. The role must be at least `moderator` to enable this functionality",OT.ExceptionCodes.UNABLE_TO_FORCE_UNPUBLISH,{session:this})};this.getStateManager=function(){OT.warn("Fixme: Have not implemented session.getStateManager")};OT.$.defineGetters(this,{apiKey:function(){return a},token:function(){return d},connected:function(){return this.is("connected")},connection:function(){return b&&b.id?this.connections.get(b.id):null},capabilities:function(){return b?
b.capabilities:new OT.Capabilities([])},sessionId:function(){return e},id:function(){return e}},!0)}else OT.upgradeSystemRequirements()}})(window);(function(k){k=document.createElement("link");k.type="text/css";k.media="screen";k.rel="stylesheet";k.href=OT.properties.cssURL;(document.head||document.getElementsByTagName("head")[0]).appendChild(k)})(window);(function(k){"function"===typeof define&&define.amd&&define("TB",[],function(){return TB})})(window);
(function() {


}).call(this);
(function() {


}).call(this);
/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */

(function(s,H,f,w){var K=f("html"),q=f(s),p=f(H),b=f.fancybox=function(){b.open.apply(this,arguments)},J=navigator.userAgent.match(/msie/i),C=null,t=H.createTouch!==w,u=function(a){return a&&a.hasOwnProperty&&a instanceof f},r=function(a){return a&&"string"===f.type(a)},F=function(a){return r(a)&&0<a.indexOf("%")},m=function(a,d){var e=parseInt(a,10)||0;d&&F(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},x=function(a,b){return m(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!t,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(J?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=u(a)?f(a).get():[a]),f.each(a,function(e,c){var l={},g,h,k,n,m;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),u(c)?(l={href:c.data("fancybox-href")||c.attr("href"),title:f("<div/>").text(c.data("fancybox-title")||c.attr("title")).html(),isDom:!0,element:c},
f.metadata&&f.extend(!0,l,c.metadata())):l=c);g=d.href||l.href||(r(c)?c:null);h=d.title!==w?d.title:l.title||"";n=(k=d.content||l.content)?"html":d.type||l.type;!n&&l.isDom&&(n=c.data("fancybox-type"),n||(n=(n=c.prop("class").match(/fancybox\.(\w+)/))?n[1]:null));r(g)&&(n||(b.isImage(g)?n="image":b.isSWF(g)?n="swf":"#"===g.charAt(0)?n="inline":r(c)&&(n="html",k=c)),"ajax"===n&&(m=g.split(/\s+/,2),g=m.shift(),m=m.shift()));k||("inline"===n?g?k=f(r(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):l.isDom&&(k=c):
"html"===n?k=g:n||g||!l.isDom||(n="inline",k=c));f.extend(l,{href:g,type:n,content:k,title:h,selector:m});a[e]=l}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==w&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1===b.trigger("onCancel")||(b.hideLoading(),a&&(b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),
b.coming=null,b.current||b._afterZoomOut(a)))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(b.isOpen&&!0!==a?(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]()):(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&
(b.player.timer=setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};!0===a||!b.player.isActive&&!1!==a?b.current&&(b.current.loop||b.current.index<b.group.length-1)&&(b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")):c()},next:function(a){var d=b.current;d&&(r(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=
b.current;d&&(r(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=m(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==w&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,l;c&&(l=b._getPosition(d),a&&"scroll"===a.type?(delete l.position,c.stop(!0,!0).animate(l,200)):(c.css(l),e.pos=f.extend({},e.dim,l)))},
update:function(a){var d=a&&a.originalEvent&&a.originalEvent.type,e=!d||"orientationchange"===d;e&&(clearTimeout(C),C=null);b.isOpen&&!C&&(C=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),C=null)},e&&!t?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,t&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),
b.trigger("onUpdate")),b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){27===(a.which||a.keyCode)&&(a.preventDefault(),b.cancel())});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}));b.trigger("onLoading")},getViewport:function(){var a=b.current&&
b.current.locked||!1,d={x:q.scrollLeft(),y:q.scrollTop()};a&&a.length?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=t&&s.innerWidth?s.innerWidth:q.width(),d.h=t&&s.innerHeight?s.innerHeight:q.height());return d},unbindEvents:function(){b.wrap&&u(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");q.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(q.bind("orientationchange.fb"+(t?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=
e.which||e.keyCode,l=e.target||e.srcElement;if(27===c&&b.coming)return!1;e.ctrlKey||e.altKey||e.shiftKey||e.metaKey||l&&(l.type||f(l).is("[contenteditable]"))||f.each(d,function(d,l){if(1<a.group.length&&l[c]!==w)return b[d](l[c]),e.preventDefault(),!1;if(-1<f.inArray(c,l))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,l,g){for(var h=f(d.target||null),k=!1;h.length&&!(k||h.is(".fancybox-skin")||h.is(".fancybox-wrap"));)k=h[0]&&!(h[0].style.overflow&&
"hidden"===h[0].style.overflow)&&(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();0!==c&&!k&&1<b.group.length&&!a.canShrink&&(0<g||0<l?b.prev(0<g?"down":"left"):(0>g||0>l)&&b.next(0>g?"up":"right"),d.preventDefault())}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&
b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,{},b.helpers[d].defaults,e),c)})}p.trigger(a)},isImage:function(a){return r(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return r(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=m(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,
c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===
c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=!0);"iframe"===c&&t&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(t?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,x(d.padding[a]))});b.trigger("onReady");
if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=
this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,
d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",t?"auto":a.iframe.scrolling).attr("src",a.href);f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);t||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||
b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,l,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
b.unbindEvents();e=a.content;c=a.type;l=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):u(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",
!1)}));break;case "image":e=a.tpl.image.replace(/\{href\}/g,g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}u(e)&&e.parent().is(a.inner)||a.inner.append(e);b.trigger("beforeShow");
a.inner.css("overflow","yes"===l?"scroll":"no"===l?"hidden":l);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(!b.isOpened)f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();else if(d.prevMethod)b.transitions[d.prevMethod]();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,l=b.skin,g=b.inner,h=b.current,c=h.width,k=h.height,n=h.minWidth,v=h.minHeight,p=h.maxWidth,
q=h.maxHeight,t=h.scrolling,r=h.scrollOutside?h.scrollbarWidth:0,y=h.margin,z=m(y[1]+y[3]),s=m(y[0]+y[2]),w,A,u,D,B,G,C,E,I;e.add(l).add(g).width("auto").height("auto").removeClass("fancybox-tmp");y=m(l.outerWidth(!0)-l.width());w=m(l.outerHeight(!0)-l.height());A=z+y;u=s+w;D=F(c)?(a.w-A)*m(c)/100:c;B=F(k)?(a.h-u)*m(k)/100:k;if("iframe"===h.type){if(I=h.content,h.autoHeight&&1===I.data("ready"))try{I[0].contentWindow.document.location&&(g.width(D).height(9999),G=I.contents().find("body"),r&&G.css("overflow-x",
"hidden"),B=G.outerHeight(!0))}catch(H){}}else if(h.autoWidth||h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(D),h.autoHeight||g.height(B),h.autoWidth&&(D=g.width()),h.autoHeight&&(B=g.height()),g.removeClass("fancybox-tmp");c=m(D);k=m(B);E=D/B;n=m(F(n)?m(n,"w")-A:n);p=m(F(p)?m(p,"w")-A:p);v=m(F(v)?m(v,"h")-u:v);q=m(F(q)?m(q,"h")-u:q);G=p;C=q;h.fitToView&&(p=Math.min(a.w-A,p),q=Math.min(a.h-u,q));A=a.w-z;s=a.h-s;h.aspectRatio?(c>p&&(c=p,k=m(c/E)),k>q&&(k=q,c=m(k*E)),c<n&&(c=n,k=m(c/
E)),k<v&&(k=v,c=m(k*E))):(c=Math.max(n,Math.min(c,p)),h.autoHeight&&"iframe"!==h.type&&(g.width(c),k=g.height()),k=Math.max(v,Math.min(k,q)));if(h.fitToView)if(g.width(c).height(k),e.width(c+y),a=e.width(),z=e.height(),h.aspectRatio)for(;(a>A||z>s)&&c>n&&k>v&&!(19<d++);)k=Math.max(v,Math.min(q,k-10)),c=m(k*E),c<n&&(c=n,k=m(c/E)),c>p&&(c=p,k=m(c/E)),g.width(c).height(k),e.width(c+y),a=e.width(),z=e.height();else c=Math.max(n,Math.min(c,c-(a-A))),k=Math.max(v,Math.min(k,k-(z-s)));r&&"auto"===t&&k<B&&
c+y+r<A&&(c+=r);g.width(c).height(k);e.width(c+y);a=e.width();z=e.height();e=(a>A||z>s)&&c>n&&k>v;c=h.aspectRatio?c<G&&k<C&&c<D&&k<B:(c<G||k<C)&&(c<D||k<B);f.extend(h,{dim:{width:x(a),height:x(z)},origWidth:D,origHeight:B,canShrink:e,canExpand:c,wPadding:y,hPadding:w,wrapSpace:z-l.outerHeight(!0),skinSpace:l.height()-k});!I&&h.autoHeight&&k>v&&k<q&&!c&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",
top:c[0],left:c[3]};d.autoCenter&&d.fixed&&!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=x(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=x(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&((b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){f(d.target).is("a")||f(d.target).parent().is("a")||
(d.preventDefault(),b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),a.loop||a.index!==a.group.length-1)?b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play(!0)):b.play(!1))},
_afterZoomOut:function(a){a=a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,k=a.wPadding,n=b.getViewport();!e&&a.isDom&&d.is(":visible")&&(e=d.find("img:first"),e.length||(e=d));u(e)?(c=e.offset(),e.is("img")&&
(f=e.outerWidth(),g=e.outerHeight())):(c.top=n.y+(n.h-g)*a.topRatio,c.left=n.x+(n.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=n.y,c.left-=n.x;return c={top:x(c.top-h*a.topRatio),left:x(c.left-k*a.leftRatio),width:x(f+k),height:x(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](m("width"===
f?c:c-g*e)),b.inner[f](m("width"===f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,l=f.extend({opacity:1},d);delete l.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(l,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&
(c.opacity=0.1));b.wrap.animate(c,{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=x(m(e[g])-200),c[g]="+=200px"):(e[g]=x(m(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},
changeOut:function(){var a=b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!t,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){var d;a=f.extend({},this.defaults,a);this.overlay&&
this.close();d=b.coming?b.coming.parent:a.parent;this.overlay=f('<div class="fancybox-overlay"></div>').appendTo(d&&d.lenth?d:"body");this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(q.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",
function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){q.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),this.el.removeClass("fancybox-lock"),q.scrollTop(this.scrollV).scrollLeft(this.scrollH));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");
J?(b=Math.max(H.documentElement.offsetWidth,H.body.offsetWidth),p.width()>b&&(a=p.width())):p.width()>q.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&this.fixed&&b.fixed&&(b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){b.locked&&!this.el.hasClass("fancybox-lock")&&(!1!==this.fixPosition&&f("*").filter(function(){return"fixed"===
f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin"),this.scrollV=q.scrollTop(),this.scrollH=q.scrollLeft(),this.el.addClass("fancybox-lock"),q.scrollTop(this.scrollV).scrollLeft(this.scrollH));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",
position:"bottom"},beforeShow:function(a){var d=b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(r(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),J&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(m(d.css("margin-bottom")))}d["top"===a.position?"prependTo":
"appendTo"](c)}}};f.fn.fancybox=function(a){var d,e=f(this),c=this.selector||"",l=function(g){var h=f(this).blur(),k=d,l,m;g.ctrlKey||g.altKey||g.shiftKey||g.metaKey||h.is(".fancybox-wrap")||(l=a.groupAttr||"data-fancybox-group",m=h.attr(l),m||(l="rel",m=h.get(0)[l]),m&&""!==m&&"nofollow"!==m&&(h=c.length?f(c):e,h=h.filter("["+l+'="'+m+'"]'),k=h.index(this)),a.index=k,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;c&&!1!==a.live?p.undelegate(c,"click.fb-start").delegate(c+":not('.fancybox-item, .fancybox-nav')",
"click.fb-start",l):e.unbind("click.fb-start").bind("click.fb-start",l);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===w&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});f.support.fixedPosition===w&&(f.support.fixedPosition=function(){var a=f('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
b=20===a[0].offsetTop||15===a[0].offsetTop;a.remove();return b}());f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(s).width();K.addClass("fancybox-lock-test");d=f(s).width();K.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);
// Generated by CoffeeScript 1.6.1
(function() {

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "slidesjs";
    defaults = {
      width: 940,
      height: 528,
      start: 1,
      navigation: {
        active: true,
        effect: "slide"
      },
      pagination: {
        active: true,
        effect: "slide"
      },
      play: {
        active: false,
        effect: "slide",
        interval: 5000,
        auto: false,
        swap: true,
        pauseOnHover: false,
        restartDelay: 2500
      },
      effect: {
        slide: {
          speed: 500
        },
        fade: {
          speed: 300,
          crossfade: true
        }
      },
      callback: {
        loaded: function() {},
        start: function() {},
        complete: function() {}
      }
    };
    Plugin = (function() {

      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
      }

      return Plugin;

    })();
    Plugin.prototype.init = function() {
      var $element, nextButton, pagination, playButton, prevButton, stopButton,
        _this = this;
      $element = $(this.element);
      this.data = $.data(this);
      $.data(this, "animating", false);
      $.data(this, "total", $element.children().not(".slidesjs-navigation", $element).length);
      $.data(this, "current", this.options.start - 1);
      $.data(this, "vendorPrefix", this._getVendorPrefix());
      if (typeof TouchEvent !== "undefined") {
        $.data(this, "touch", true);
        this.options.effect.slide.speed = this.options.effect.slide.speed / 2;
      }
      $element.css({
        overflow: "hidden"
      });
      $element.slidesContainer = $element.children().not(".slidesjs-navigation", $element).wrapAll("<div class='slidesjs-container'>", $element).parent().css({
        overflow: "hidden",
        position: "relative"
      });
      $(".slidesjs-container", $element).wrapInner("<div class='slidesjs-control'>", $element).children();
      $(".slidesjs-control", $element).css({
        position: "relative",
        left: 0
      });
      $(".slidesjs-control", $element).children().addClass("slidesjs-slide").css({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 0,
        display: "none",
        webkitBackfaceVisibility: "hidden"
      });
      $.each($(".slidesjs-control", $element).children(), function(i) {
        var $slide;
        $slide = $(this);
        return $slide.attr("slidesjs-index", i);
      });
      if (this.data.touch) {
        $(".slidesjs-control", $element).on("touchstart", function(e) {
          return _this._touchstart(e);
        });
        $(".slidesjs-control", $element).on("touchmove", function(e) {
          return _this._touchmove(e);
        });
        $(".slidesjs-control", $element).on("touchend", function(e) {
          return _this._touchend(e);
        });
      }
      $element.fadeIn(0);
      this.update();
      if (this.data.touch) {
        this._setuptouch();
      }
      $(".slidesjs-control", $element).children(":eq(" + this.data.current + ")").eq(0).fadeIn(0, function() {
        return $(this).css({
          zIndex: 10
        });
      });
      if (this.options.navigation.active) {
        prevButton = $("<a>", {
          "class": "slidesjs-previous slidesjs-navigation",
          href: "#",
          title: "Previous",
          text: "Previous"
        }).appendTo($element);
        nextButton = $("<a>", {
          "class": "slidesjs-next slidesjs-navigation",
          href: "#",
          title: "Next",
          text: "Next"
        }).appendTo($element);
      }
      $(".slidesjs-next", $element).click(function(e) {
        e.preventDefault();
        _this.stop(true);
        return _this.next(_this.options.navigation.effect);
      });
      $(".slidesjs-previous", $element).click(function(e) {
        e.preventDefault();
        _this.stop(true);
        return _this.previous(_this.options.navigation.effect);
      });
      if (this.options.play.active) {
        playButton = $("<a>", {
          "class": "slidesjs-play slidesjs-navigation",
          href: "#",
          title: "Play",
          text: "Play"
        }).appendTo($element);
        stopButton = $("<a>", {
          "class": "slidesjs-stop slidesjs-navigation",
          href: "#",
          title: "Stop",
          text: "Stop"
        }).appendTo($element);
        playButton.click(function(e) {
          e.preventDefault();
          return _this.play(true);
        });
        stopButton.click(function(e) {
          e.preventDefault();
          return _this.stop(true);
        });
        if (this.options.play.swap) {
          stopButton.css({
            display: "none"
          });
        }
      }
      if (this.options.pagination.active) {
        pagination = $("<ul>", {
          "class": "slidesjs-pagination"
        }).appendTo($element);
        $.each(new Array(this.data.total), function(i) {
          var paginationItem, paginationLink;
          paginationItem = $("<li>", {
            "class": "slidesjs-pagination-item"
          }).appendTo(pagination);
          paginationLink = $("<a>", {
            href: "#",
            "data-slidesjs-item": i,
            html: i + 1
          }).appendTo(paginationItem);
          return paginationLink.click(function(e) {
            e.preventDefault();
            _this.stop(true);
            return _this.goto(($(e.currentTarget).attr("data-slidesjs-item") * 1) + 1);
          });
        });
      }
      $(window).bind("resize", function() {
        return _this.update();
      });
      this._setActive();
      if (this.options.play.auto) {
        this.play();
      }
      return this.options.callback.loaded(this.options.start);
    };
    Plugin.prototype._setActive = function(number) {
      var $element, current;
      $element = $(this.element);
      this.data = $.data(this);
      current = number > -1 ? number : this.data.current;
      $(".active", $element).removeClass("active");
      return $(".slidesjs-pagination li:eq(" + current + ") a", $element).addClass("active");
    };
    Plugin.prototype.update = function() {
      var $element, height, width;
      $element = $(this.element);
      this.data = $.data(this);
      $(".slidesjs-control", $element).children(":not(:eq(" + this.data.current + "))").css({
        display: "none",
        left: 0,
        zIndex: 0
      });
      width = $element.width();
      height = (this.options.height / this.options.width) * width;
      this.options.width = width;
      this.options.height = height;
      return $(".slidesjs-control, .slidesjs-container", $element).css({
        width: width,
        height: height
      });
    };
    Plugin.prototype.next = function(effect) {
      var $element;
      $element = $(this.element);
      this.data = $.data(this);
      $.data(this, "direction", "next");
      if (effect === void 0) {
        effect = this.options.navigation.effect;
      }
      if (effect === "fade") {
        return this._fade();
      } else {
        return this._slide();
      }
    };
    Plugin.prototype.previous = function(effect) {
      var $element;
      $element = $(this.element);
      this.data = $.data(this);
      $.data(this, "direction", "previous");
      if (effect === void 0) {
        effect = this.options.navigation.effect;
      }
      if (effect === "fade") {
        return this._fade();
      } else {
        return this._slide();
      }
    };
    Plugin.prototype.goto = function(number) {
      var $element, effect;
      $element = $(this.element);
      this.data = $.data(this);
      if (effect === void 0) {
        effect = this.options.pagination.effect;
      }
      if (number > this.data.total) {
        number = this.data.total;
      } else if (number < 1) {
        number = 1;
      }
      if (typeof number === "number") {
        if (effect === "fade") {
          return this._fade(number);
        } else {
          return this._slide(number);
        }
      } else if (typeof number === "string") {
        if (number === "first") {
          if (effect === "fade") {
            return this._fade(0);
          } else {
            return this._slide(0);
          }
        } else if (number === "last") {
          if (effect === "fade") {
            return this._fade(this.data.total);
          } else {
            return this._slide(this.data.total);
          }
        }
      }
    };
    Plugin.prototype._setuptouch = function() {
      var $element, next, previous, slidesControl;
      $element = $(this.element);
      this.data = $.data(this);
      slidesControl = $(".slidesjs-control", $element);
      next = this.data.current + 1;
      previous = this.data.current - 1;
      if (previous < 0) {
        previous = this.data.total - 1;
      }
      if (next > this.data.total - 1) {
        next = 0;
      }
      slidesControl.children(":eq(" + next + ")").css({
        display: "block",
        left: this.options.width
      });
      return slidesControl.children(":eq(" + previous + ")").css({
        display: "block",
        left: -this.options.width
      });
    };
    Plugin.prototype._touchstart = function(e) {
      var $element, touches;
      $element = $(this.element);
      this.data = $.data(this);
      touches = e.originalEvent.touches[0];
      this._setuptouch();
      $.data(this, "touchtimer", Number(new Date()));
      $.data(this, "touchstartx", touches.pageX);
      $.data(this, "touchstarty", touches.pageY);
      return e.stopPropagation();
    };
    Plugin.prototype._touchend = function(e) {
      var $element, duration, prefix, slidesControl, timing, touches, transform,
        _this = this;
      $element = $(this.element);
      this.data = $.data(this);
      touches = e.originalEvent.touches[0];
      slidesControl = $(".slidesjs-control", $element);
      if (slidesControl.position().left > this.options.width * 0.5 || slidesControl.position().left > this.options.width * 0.1 && (Number(new Date()) - this.data.touchtimer < 250)) {
        $.data(this, "direction", "previous");
        this._slide();
      } else if (slidesControl.position().left < -(this.options.width * 0.5) || slidesControl.position().left < -(this.options.width * 0.1) && (Number(new Date()) - this.data.touchtimer < 250)) {
        $.data(this, "direction", "next");
        this._slide();
      } else {
        prefix = this.data.vendorPrefix;
        transform = prefix + "Transform";
        duration = prefix + "TransitionDuration";
        timing = prefix + "TransitionTimingFunction";
        slidesControl[0].style[transform] = "translateX(0px)";
        slidesControl[0].style[duration] = this.options.effect.slide.speed * 0.85 + "ms";
      }
      slidesControl.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
        prefix = _this.data.vendorPrefix;
        transform = prefix + "Transform";
        duration = prefix + "TransitionDuration";
        timing = prefix + "TransitionTimingFunction";
        slidesControl[0].style[transform] = "";
        slidesControl[0].style[duration] = "";
        return slidesControl[0].style[timing] = "";
      });
      return e.stopPropagation();
    };
    Plugin.prototype._touchmove = function(e) {
      var $element, prefix, slidesControl, touches, transform;
      $element = $(this.element);
      this.data = $.data(this);
      touches = e.originalEvent.touches[0];
      prefix = this.data.vendorPrefix;
      slidesControl = $(".slidesjs-control", $element);
      transform = prefix + "Transform";
      $.data(this, "scrolling", Math.abs(touches.pageX - this.data.touchstartx) < Math.abs(touches.pageY - this.data.touchstarty));
      if (!this.data.animating && !this.data.scrolling) {
        e.preventDefault();
        this._setuptouch();
        slidesControl[0].style[transform] = "translateX(" + (touches.pageX - this.data.touchstartx) + "px)";
      }
      return e.stopPropagation();
    };
    Plugin.prototype.play = function(next) {
      var $element, currentSlide, slidesContainer,
        _this = this;
      $element = $(this.element);
      this.data = $.data(this);
      if (!this.data.playInterval) {
        if (next) {
          currentSlide = this.data.current;
          this.data.direction = "next";
          if (this.options.play.effect === "fade") {
            this._fade();
          } else {
            this._slide();
          }
        }
        $.data(this, "playInterval", setInterval((function() {
          currentSlide = _this.data.current;
          _this.data.direction = "next";
          if (_this.options.play.effect === "fade") {
            return _this._fade();
          } else {
            return _this._slide();
          }
        }), this.options.play.interval));
        slidesContainer = $(".slidesjs-container", $element);
        if (this.options.play.pauseOnHover) {
          slidesContainer.unbind();
          slidesContainer.bind("mouseenter", function() {
            return _this.stop();
          });
          slidesContainer.bind("mouseleave", function() {
            if (_this.options.play.restartDelay) {
              return $.data(_this, "restartDelay", setTimeout((function() {
                return _this.play(true);
              }), _this.options.play.restartDelay));
            } else {
              return _this.play();
            }
          });
        }
        $.data(this, "playing", true);
        $(".slidesjs-play", $element).addClass("slidesjs-playing");
        if (this.options.play.swap) {
          $(".slidesjs-play", $element).hide();
          return $(".slidesjs-stop", $element).show();
        }
      }
    };
    Plugin.prototype.stop = function(clicked) {
      var $element;
      $element = $(this.element);
      this.data = $.data(this);
      clearInterval(this.data.playInterval);
      if (this.options.play.pauseOnHover && clicked) {
        $(".slidesjs-container", $element).unbind();
      }
      $.data(this, "playInterval", null);
      $.data(this, "playing", false);
      $(".slidesjs-play", $element).removeClass("slidesjs-playing");
      if (this.options.play.swap) {
        $(".slidesjs-stop", $element).hide();
        return $(".slidesjs-play", $element).show();
      }
    };
    Plugin.prototype._slide = function(number) {
      var $element, currentSlide, direction, duration, next, prefix, slidesControl, timing, transform, value,
        _this = this;
      $element = $(this.element);
      this.data = $.data(this);
      if (!this.data.animating && number !== this.data.current + 1) {
        $.data(this, "animating", true);
        currentSlide = this.data.current;
        if (number > -1) {
          number = number - 1;
          value = number > currentSlide ? 1 : -1;
          direction = number > currentSlide ? -this.options.width : this.options.width;
          next = number;
        } else {
          value = this.data.direction === "next" ? 1 : -1;
          direction = this.data.direction === "next" ? -this.options.width : this.options.width;
          next = currentSlide + value;
        }
        if (next === -1) {
          next = this.data.total - 1;
        }
        if (next === this.data.total) {
          next = 0;
        }
        this._setActive(next);
        slidesControl = $(".slidesjs-control", $element);
        if (number > -1) {
          slidesControl.children(":not(:eq(" + currentSlide + "))").css({
            display: "none",
            left: 0,
            zIndex: 0
          });
        }
        slidesControl.children(":eq(" + next + ")").css({
          display: "block",
          left: value * this.options.width,
          zIndex: 10
        });
        this.options.callback.start(currentSlide + 1);
        if (this.data.vendorPrefix) {
          prefix = this.data.vendorPrefix;
          transform = prefix + "Transform";
          duration = prefix + "TransitionDuration";
          timing = prefix + "TransitionTimingFunction";
          slidesControl[0].style[transform] = "translateX(" + direction + "px)";
          slidesControl[0].style[duration] = this.options.effect.slide.speed + "ms";
          return slidesControl.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
            slidesControl[0].style[transform] = "";
            slidesControl[0].style[duration] = "";
            slidesControl.children(":eq(" + next + ")").css({
              left: 0
            });
            slidesControl.children(":eq(" + currentSlide + ")").css({
              display: "none",
              left: 0,
              zIndex: 0
            });
            $.data(_this, "current", next);
            $.data(_this, "animating", false);
            slidesControl.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");
            slidesControl.children(":not(:eq(" + next + "))").css({
              display: "none",
              left: 0,
              zIndex: 0
            });
            if (_this.data.touch) {
              _this._setuptouch();
            }
            return _this.options.callback.complete(next + 1);
          });
        } else {
          return slidesControl.stop().animate({
            left: direction
          }, this.options.effect.slide.speed, (function() {
            slidesControl.css({
              left: 0
            });
            slidesControl.children(":eq(" + next + ")").css({
              left: 0
            });
            return slidesControl.children(":eq(" + currentSlide + ")").css({
              display: "none",
              left: 0,
              zIndex: 0
            }, $.data(_this, "current", next), $.data(_this, "animating", false), _this.options.callback.complete(next + 1));
          }));
        }
      }
    };
    Plugin.prototype._fade = function(number) {
      var $element, currentSlide, next, slidesControl, value,
        _this = this;
      $element = $(this.element);
      this.data = $.data(this);
      if (!this.data.animating && number !== this.data.current + 1) {
        $.data(this, "animating", true);
        currentSlide = this.data.current;
        if (number) {
          number = number - 1;
          value = number > currentSlide ? 1 : -1;
          next = number;
        } else {
          value = this.data.direction === "next" ? 1 : -1;
          next = currentSlide + value;
        }
        if (next === -1) {
          next = this.data.total - 1;
        }
        if (next === this.data.total) {
          next = 0;
        }
        this._setActive(next);
        slidesControl = $(".slidesjs-control", $element);
        slidesControl.children(":eq(" + next + ")").css({
          display: "none",
          left: 0,
          zIndex: 10
        });
        this.options.callback.start(currentSlide + 1);
        if (this.options.effect.fade.crossfade) {
          slidesControl.children(":eq(" + this.data.current + ")").stop().fadeOut(this.options.effect.fade.speed);
          return slidesControl.children(":eq(" + next + ")").stop().fadeIn(this.options.effect.fade.speed, (function() {
            slidesControl.children(":eq(" + next + ")").css({
              zIndex: 0
            });
            $.data(_this, "animating", false);
            $.data(_this, "current", next);
            return _this.options.callback.complete(next + 1);
          }));
        } else {
          return slidesControl.children(":eq(" + currentSlide + ")").stop().fadeOut(this.options.effect.fade.speed, (function() {
            slidesControl.children(":eq(" + next + ")").stop().fadeIn(_this.options.effect.fade.speed, (function() {
              return slidesControl.children(":eq(" + next + ")").css({
                zIndex: 10
              });
            }));
            $.data(_this, "animating", false);
            $.data(_this, "current", next);
            return _this.options.callback.complete(next + 1);
          }));
        }
      }
    };
    Plugin.prototype._getVendorPrefix = function() {
      var body, i, style, transition, vendor;
      body = document.body || document.documentElement;
      style = body.style;
      transition = "transition";
      vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
      transition = transition.charAt(0).toUpperCase() + transition.substr(1);
      i = 0;
      while (i < vendor.length) {
        if (typeof style[vendor[i] + transition] === "string") {
          return vendor[i];
        }
        i++;
      }
      return false;
    };
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window, document);

}).call(this);
/*
  SlidesJS 3.0.4 http://slidesjs.com
  (c) 2013 by Nathan Searles http://nathansearles.com
  Updated: June 26th, 2013
  Apache License: http://www.apache.org/licenses/LICENSE-2.0
*/

(function(){(function(e,t,n){var r,i,s;s="slidesjs";i={width:940,height:528,start:1,navigation:{active:!0,effect:"slide"},pagination:{active:!0,effect:"slide"},play:{active:!1,effect:"slide",interval:5e3,auto:!1,swap:!0,pauseOnHover:!1,restartDelay:2500},effect:{slide:{speed:500},fade:{speed:300,crossfade:!0}},callback:{loaded:function(){},start:function(){},complete:function(){}}};r=function(){function t(t,n){this.element=t;this.options=e.extend(!0,{},i,n);this._defaults=i;this._name=s;this.init()}return t}();r.prototype.init=function(){var n,r,i,s,o,u,a=this;n=e(this.element);this.data=e.data(this);e.data(this,"animating",!1);e.data(this,"total",n.children().not(".slidesjs-navigation",n).length);e.data(this,"current",this.options.start-1);e.data(this,"vendorPrefix",this._getVendorPrefix());if(typeof TouchEvent!="undefined"){e.data(this,"touch",!0);this.options.effect.slide.speed=this.options.effect.slide.speed/2}n.css({overflow:"hidden"});n.slidesContainer=n.children().not(".slidesjs-navigation",n).wrapAll("<div class='slidesjs-container'>",n).parent().css({overflow:"hidden",position:"relative"});e(".slidesjs-container",n).wrapInner("<div class='slidesjs-control'>",n).children();e(".slidesjs-control",n).css({position:"relative",left:0});e(".slidesjs-control",n).children().addClass("slidesjs-slide").css({position:"absolute",top:0,left:0,width:"100%",zIndex:0,display:"none",webkitBackfaceVisibility:"hidden"});e.each(e(".slidesjs-control",n).children(),function(t){var n;n=e(this);return n.attr("slidesjs-index",t)});if(this.data.touch){e(".slidesjs-control",n).on("touchstart",function(e){return a._touchstart(e)});e(".slidesjs-control",n).on("touchmove",function(e){return a._touchmove(e)});e(".slidesjs-control",n).on("touchend",function(e){return a._touchend(e)})}n.fadeIn(0);this.update();this.data.touch&&this._setuptouch();e(".slidesjs-control",n).children(":eq("+this.data.current+")").eq(0).fadeIn(0,function(){return e(this).css({zIndex:10})});if(this.options.navigation.active){o=e("<a>",{"class":"slidesjs-previous slidesjs-navigation",href:"#",title:"Previous",text:"Previous"}).appendTo(n);r=e("<a>",{"class":"slidesjs-next slidesjs-navigation",href:"#",title:"Next",text:"Next"}).appendTo(n)}e(".slidesjs-next",n).click(function(e){e.preventDefault();a.stop(!0);return a.next(a.options.navigation.effect)});e(".slidesjs-previous",n).click(function(e){e.preventDefault();a.stop(!0);return a.previous(a.options.navigation.effect)});if(this.options.play.active){s=e("<a>",{"class":"slidesjs-play slidesjs-navigation",href:"#",title:"Play",text:"Play"}).appendTo(n);u=e("<a>",{"class":"slidesjs-stop slidesjs-navigation",href:"#",title:"Stop",text:"Stop"}).appendTo(n);s.click(function(e){e.preventDefault();return a.play(!0)});u.click(function(e){e.preventDefault();return a.stop(!0)});this.options.play.swap&&u.css({display:"none"})}if(this.options.pagination.active){i=e("<ul>",{"class":"slidesjs-pagination"}).appendTo(n);e.each(new Array(this.data.total),function(t){var n,r;n=e("<li>",{"class":"slidesjs-pagination-item"}).appendTo(i);r=e("<a>",{href:"#","data-slidesjs-item":t,html:t+1}).appendTo(n);return r.click(function(t){t.preventDefault();a.stop(!0);return a.goto(e(t.currentTarget).attr("data-slidesjs-item")*1+1)})})}e(t).bind("resize",function(){return a.update()});this._setActive();this.options.play.auto&&this.play();return this.options.callback.loaded(this.options.start)};r.prototype._setActive=function(t){var n,r;n=e(this.element);this.data=e.data(this);r=t>-1?t:this.data.current;e(".active",n).removeClass("active");return e(".slidesjs-pagination li:eq("+r+") a",n).addClass("active")};r.prototype.update=function(){var t,n,r;t=e(this.element);this.data=e.data(this);e(".slidesjs-control",t).children(":not(:eq("+this.data.current+"))").css({display:"none",left:0,zIndex:0});r=t.width();n=this.options.height/this.options.width*r;this.options.width=r;this.options.height=n;return e(".slidesjs-control, .slidesjs-container",t).css({width:r,height:n})};r.prototype.next=function(t){var n;n=e(this.element);this.data=e.data(this);e.data(this,"direction","next");t===void 0&&(t=this.options.navigation.effect);return t==="fade"?this._fade():this._slide()};r.prototype.previous=function(t){var n;n=e(this.element);this.data=e.data(this);e.data(this,"direction","previous");t===void 0&&(t=this.options.navigation.effect);return t==="fade"?this._fade():this._slide()};r.prototype.goto=function(t){var n,r;n=e(this.element);this.data=e.data(this);r===void 0&&(r=this.options.pagination.effect);t>this.data.total?t=this.data.total:t<1&&(t=1);if(typeof t=="number")return r==="fade"?this._fade(t):this._slide(t);if(typeof t=="string"){if(t==="first")return r==="fade"?this._fade(0):this._slide(0);if(t==="last")return r==="fade"?this._fade(this.data.total):this._slide(this.data.total)}};r.prototype._setuptouch=function(){var t,n,r,i;t=e(this.element);this.data=e.data(this);i=e(".slidesjs-control",t);n=this.data.current+1;r=this.data.current-1;r<0&&(r=this.data.total-1);n>this.data.total-1&&(n=0);i.children(":eq("+n+")").css({display:"block",left:this.options.width});return i.children(":eq("+r+")").css({display:"block",left:-this.options.width})};r.prototype._touchstart=function(t){var n,r;n=e(this.element);this.data=e.data(this);r=t.originalEvent.touches[0];this._setuptouch();e.data(this,"touchtimer",Number(new Date));e.data(this,"touchstartx",r.pageX);e.data(this,"touchstarty",r.pageY);return t.stopPropagation()};r.prototype._touchend=function(t){var n,r,i,s,o,u,a,f=this;n=e(this.element);this.data=e.data(this);u=t.originalEvent.touches[0];s=e(".slidesjs-control",n);if(s.position().left>this.options.width*.5||s.position().left>this.options.width*.1&&Number(new Date)-this.data.touchtimer<250){e.data(this,"direction","previous");this._slide()}else if(s.position().left<-(this.options.width*.5)||s.position().left<-(this.options.width*.1)&&Number(new Date)-this.data.touchtimer<250){e.data(this,"direction","next");this._slide()}else{i=this.data.vendorPrefix;a=i+"Transform";r=i+"TransitionDuration";o=i+"TransitionTimingFunction";s[0].style[a]="translateX(0px)";s[0].style[r]=this.options.effect.slide.speed*.85+"ms"}s.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){i=f.data.vendorPrefix;a=i+"Transform";r=i+"TransitionDuration";o=i+"TransitionTimingFunction";s[0].style[a]="";s[0].style[r]="";return s[0].style[o]=""});return t.stopPropagation()};r.prototype._touchmove=function(t){var n,r,i,s,o;n=e(this.element);this.data=e.data(this);s=t.originalEvent.touches[0];r=this.data.vendorPrefix;i=e(".slidesjs-control",n);o=r+"Transform";e.data(this,"scrolling",Math.abs(s.pageX-this.data.touchstartx)<Math.abs(s.pageY-this.data.touchstarty));if(!this.data.animating&&!this.data.scrolling){t.preventDefault();this._setuptouch();i[0].style[o]="translateX("+(s.pageX-this.data.touchstartx)+"px)"}return t.stopPropagation()};r.prototype.play=function(t){var n,r,i,s=this;n=e(this.element);this.data=e.data(this);if(!this.data.playInterval){if(t){r=this.data.current;this.data.direction="next";this.options.play.effect==="fade"?this._fade():this._slide()}e.data(this,"playInterval",setInterval(function(){r=s.data.current;s.data.direction="next";return s.options.play.effect==="fade"?s._fade():s._slide()},this.options.play.interval));i=e(".slidesjs-container",n);if(this.options.play.pauseOnHover){i.unbind();i.bind("mouseenter",function(){return s.stop()});i.bind("mouseleave",function(){return s.options.play.restartDelay?e.data(s,"restartDelay",setTimeout(function(){return s.play(!0)},s.options.play.restartDelay)):s.play()})}e.data(this,"playing",!0);e(".slidesjs-play",n).addClass("slidesjs-playing");if(this.options.play.swap){e(".slidesjs-play",n).hide();return e(".slidesjs-stop",n).show()}}};r.prototype.stop=function(t){var n;n=e(this.element);this.data=e.data(this);clearInterval(this.data.playInterval);this.options.play.pauseOnHover&&t&&e(".slidesjs-container",n).unbind();e.data(this,"playInterval",null);e.data(this,"playing",!1);e(".slidesjs-play",n).removeClass("slidesjs-playing");if(this.options.play.swap){e(".slidesjs-stop",n).hide();return e(".slidesjs-play",n).show()}};r.prototype._slide=function(t){var n,r,i,s,o,u,a,f,l,c,h=this;n=e(this.element);this.data=e.data(this);if(!this.data.animating&&t!==this.data.current+1){e.data(this,"animating",!0);r=this.data.current;if(t>-1){t-=1;c=t>r?1:-1;i=t>r?-this.options.width:this.options.width;o=t}else{c=this.data.direction==="next"?1:-1;i=this.data.direction==="next"?-this.options.width:this.options.width;o=r+c}o===-1&&(o=this.data.total-1);o===this.data.total&&(o=0);this._setActive(o);a=e(".slidesjs-control",n);t>-1&&a.children(":not(:eq("+r+"))").css({display:"none",left:0,zIndex:0});a.children(":eq("+o+")").css({display:"block",left:c*this.options.width,zIndex:10});this.options.callback.start(r+1);if(this.data.vendorPrefix){u=this.data.vendorPrefix;l=u+"Transform";s=u+"TransitionDuration";f=u+"TransitionTimingFunction";a[0].style[l]="translateX("+i+"px)";a[0].style[s]=this.options.effect.slide.speed+"ms";return a.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){a[0].style[l]="";a[0].style[s]="";a.children(":eq("+o+")").css({left:0});a.children(":eq("+r+")").css({display:"none",left:0,zIndex:0});e.data(h,"current",o);e.data(h,"animating",!1);a.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");a.children(":not(:eq("+o+"))").css({display:"none",left:0,zIndex:0});h.data.touch&&h._setuptouch();return h.options.callback.complete(o+1)})}return a.stop().animate({left:i},this.options.effect.slide.speed,function(){a.css({left:0});a.children(":eq("+o+")").css({left:0});return a.children(":eq("+r+")").css({display:"none",left:0,zIndex:0},e.data(h,"current",o),e.data(h,"animating",!1),h.options.callback.complete(o+1))})}};r.prototype._fade=function(t){var n,r,i,s,o,u=this;n=e(this.element);this.data=e.data(this);if(!this.data.animating&&t!==this.data.current+1){e.data(this,"animating",!0);r=this.data.current;if(t){t-=1;o=t>r?1:-1;i=t}else{o=this.data.direction==="next"?1:-1;i=r+o}i===-1&&(i=this.data.total-1);i===this.data.total&&(i=0);this._setActive(i);s=e(".slidesjs-control",n);s.children(":eq("+i+")").css({display:"none",left:0,zIndex:10});this.options.callback.start(r+1);if(this.options.effect.fade.crossfade){s.children(":eq("+this.data.current+")").stop().fadeOut(this.options.effect.fade.speed);return s.children(":eq("+i+")").stop().fadeIn(this.options.effect.fade.speed,function(){s.children(":eq("+i+")").css({zIndex:0});e.data(u,"animating",!1);e.data(u,"current",i);return u.options.callback.complete(i+1)})}return s.children(":eq("+r+")").stop().fadeOut(this.options.effect.fade.speed,function(){s.children(":eq("+i+")").stop().fadeIn(u.options.effect.fade.speed,function(){return s.children(":eq("+i+")").css({zIndex:10})});e.data(u,"animating",!1);e.data(u,"current",i);return u.options.callback.complete(i+1)})}};r.prototype._getVendorPrefix=function(){var e,t,r,i,s;e=n.body||n.documentElement;r=e.style;i="transition";s=["Moz","Webkit","Khtml","O","ms"];i=i.charAt(0).toUpperCase()+i.substr(1);t=0;while(t<s.length){if(typeof r[s[t]+i]=="string")return s[t];t++}return!1};return e.fn[s]=function(t){return this.each(function(){if(!e.data(this,"plugin_"+s))return e.data(this,"plugin_"+s,new r(this,t))})}})(jQuery,window,document)}).call(this);
(function() {


}).call(this);
!function(e){if("function"==typeof bootstrap)bootstrap("simplewebrtc",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeSimpleWebRTC=e}else"undefined"!=typeof window?window.SimpleWebRTC=e():global.SimpleWebRTC=e()}(function(){var define,ses,bootstrap,module,exports;return function(e,t,n){function o(n,r){if(!t[n]){if(!e[n]){var s="function"==typeof require&&require;if(!r&&s)return s(n,!0);if(i)return i(n,!0);throw new Error("Cannot find module '"+n+"'")}var a=t[n]={exports:{}};e[n][0].call(a.exports,function(t){var i=e[n][1][t];return o(i?i:t)},a,a.exports)}return t[n].exports}for(var i="function"==typeof require&&require,r=0;r<n.length;r++)o(n[r]);return o}({1:[function(e,t){function n(e){var t,n,s=this,a=e||{},u=this.config={url:"http://signaling.simplewebrtc.com:8888",debug:!1,localVideoEl:"",remoteVideosEl:"",enableDataChannels:!0,autoRequestMedia:!1,autoRemoveVideos:!0,adjustPeerVolume:!0,peerVolumeWhenSpeaking:.25};this.logger=function(){return e.debug?e.logger||console:e.logger||c}();for(t in a)this.config[t]=a[t];this.capabilities=r,i.call(this),n=this.connection=p.connect(this.config.url),n.on("connect",function(){s.emit("connectionReady",n.socket.sessionid),s.sessionReady=!0,s.testReadiness()}),n.on("message",function(e){var t,n=s.webrtc.getPeers(e.from,e.roomType);"offer"===e.type?(t=n.length?n[0]:s.webrtc.createPeer({id:e.from,type:e.roomType,sharemyscreen:"screen"===e.roomType&&!e.broadcaster}),t.handleMessage(e)):n.length&&n.forEach(function(t){t.handleMessage(e)})}),n.on("remove",function(e){e.id!==s.connection.socket.sessionid&&s.webrtc.removePeers(e.id,e.type)}),e.logger=this.logger,e.debug=!1,this.webrtc=new o(e),["mute","unmute","pause","resume"].forEach(function(e){s[e]=s.webrtc[e].bind(s.webrtc)}),this.webrtc.on("*",function(){s.emit.apply(s,arguments)}),u.debug&&this.on("*",this.logger.log.bind(this.logger,"SimpleWebRTC event:")),this.webrtc.on("localStream",function(){s.testReadiness()}),this.webrtc.on("message",function(e){s.connection.emit("message",e)}),this.webrtc.on("peerStreamAdded",this.handlePeerStreamAdded.bind(this)),this.webrtc.on("peerStreamRemoved",this.handlePeerStreamRemoved.bind(this)),this.config.adjustPeerVolume&&(this.webrtc.on("speaking",this.setVolumeForAll.bind(this,this.config.peerVolumeWhenSpeaking)),this.webrtc.on("stoppedSpeaking",this.setVolumeForAll.bind(this,1))),this.config.autoRequestMedia&&this.startLocalVideo()}var o=e("webrtc"),i=e("wildemitter"),r=e("webrtcsupport"),s=e("attachmediastream"),a=e("getscreenmedia"),c=e("mockconsole"),p=e("socket.io-client");n.prototype=Object.create(i.prototype,{constructor:{value:n}}),n.prototype.leaveRoom=function(){this.roomName&&(this.connection.emit("leave",this.roomName),this.webrtc.peers.forEach(function(e){e.end()}),this.getLocalScreen()&&this.stopScreenShare(),this.emit("leftRoom",this.roomName))},n.prototype.handlePeerStreamAdded=function(e){var t=this.getRemoteVideoContainer(),n=s(e.stream);e.videoEl=n,n.id=this.getDomId(e),t&&t.appendChild(n),this.emit("videoAdded",n,e)},n.prototype.handlePeerStreamRemoved=function(e){var t=this.getRemoteVideoContainer(),n=e.videoEl;this.config.autoRemoveVideos&&t&&n&&t.removeChild(n),n&&this.emit("videoRemoved",n,e)},n.prototype.getDomId=function(e){return[e.id,e.type,e.broadcaster?"broadcasting":"incoming"].join("_")},n.prototype.setVolumeForAll=function(e){this.webrtc.peers.forEach(function(t){t.videoEl&&(t.videoEl.volume=e)})},n.prototype.joinRoom=function(e,t){var n=this;this.roomName=e,this.connection.emit("join",e,function(o,i){if(o)n.emit("error",o);else{var r,s,a,c;for(r in i.clients){s=i.clients[r];for(a in s)s[a]&&(c=n.webrtc.createPeer({id:r,type:a}),c.start())}}t&&t(o,i),n.emit("joinedRoom",e)})},n.prototype.getEl=function(e){return"string"==typeof e?document.getElementById(e):e},n.prototype.startLocalVideo=function(){var e=this;this.webrtc.startLocalMedia(null,function(t,n){t?e.emit(t):s(n,e.getLocalVideoContainer(),{muted:!0,mirror:!0})})},n.prototype.stopLocalVideo=function(){this.webrtc.stopLocalMedia()},n.prototype.getLocalVideoContainer=function(){var e=this.getEl(this.config.localVideoEl);if(e&&"VIDEO"===e.tagName)return e;if(e){var t=document.createElement("video");return e.appendChild(t),t}},n.prototype.getRemoteVideoContainer=function(){return this.getEl(this.config.remoteVideosEl)},n.prototype.shareScreen=function(e){var t=this;a(function(n,o){var i=document.createElement("video"),r=t.getRemoteVideoContainer();n?t.emit(n):(t.webrtc.localScreen=o,i.id="localScreen",s(o,i),r&&r.appendChild(i),t.emit("localScreenAdded",i),t.connection.emit("shareScreen"),t.webrtc.peers.forEach(function(e){var n;"video"===e.type&&(n=t.webrtc.createPeer({id:e.id,type:"screen",sharemyscreen:!0,broadcaster:t.connection.socket.sessionid}),n.start())})),e&&e(n,o)})},n.prototype.getLocalScreen=function(){return this.webrtc.localScreen},n.prototype.stopScreenShare=function(){this.connection.emit("unshareScreen");var e=document.getElementById("localScreen"),t=this.getRemoteVideoContainer(),n=this.getLocalScreen();this.config.autoRemoveVideos&&t&&e&&t.removeChild(e),e&&this.emit("videoRemoved",e),n&&n.stop(),this.webrtc.peers.forEach(function(e){e.broadcaster&&e.end()}),delete this.webrtc.localScreen},n.prototype.testReadiness=function(){var e=this;this.webrtc.localStream&&this.sessionReady&&setTimeout(function(){e.emit("readyToCall",e.connection.socket.sessionid)},1e3)},n.prototype.createRoom=function(e,t){2===arguments.length?this.connection.emit("create",e,t):this.connection.emit("create",e)},n.prototype.sendFile=function(){return r.dataChannel?void 0:this.emit("error",new Error("DataChannelNotSupported"))},t.exports=n},{attachmediastream:5,getscreenmedia:6,mockconsole:7,"socket.io-client":8,webrtc:2,webrtcsupport:4,wildemitter:3}],3:[function(e,t){function n(){this.callbacks={}}t.exports=n,n.prototype.on=function(e){var t=3===arguments.length,n=t?arguments[1]:void 0,o=t?arguments[2]:arguments[1];return o._groupName=n,(this.callbacks[e]=this.callbacks[e]||[]).push(o),this},n.prototype.once=function(e){function t(){n.off(e,t),r.apply(this,arguments)}var n=this,o=3===arguments.length,i=o?arguments[1]:void 0,r=o?arguments[2]:arguments[1];return this.on(e,i,t),this},n.prototype.releaseGroup=function(e){var t,n,o,i;for(t in this.callbacks)for(i=this.callbacks[t],n=0,o=i.length;o>n;n++)i[n]._groupName===e&&(i.splice(n,1),n--,o--);return this},n.prototype.off=function(e,t){var n,o=this.callbacks[e];return o?1===arguments.length?(delete this.callbacks[e],this):(n=o.indexOf(t),o.splice(n,1),this):this},n.prototype.emit=function(e){var t,n,o=[].slice.call(arguments,1),i=this.callbacks[e],r=this.getWildcardCallbacks(e);if(i)for(t=0,n=i.length;n>t&&i[t];++t)i[t].apply(this,o);if(r)for(t=0,n=r.length;n>t&&r[t];++t)r[t].apply(this,[e].concat(o));return this},n.prototype.getWildcardCallbacks=function(e){var t,n,o=[];for(t in this.callbacks)n=t.split("*"),("*"===t||2===n.length&&e.slice(0,n[1].length)===n[1])&&(o=o.concat(this.callbacks[t]));return o}},{}],4:[function(e,t){var n,o=!1,i=!1,r=navigator.userAgent.toLowerCase();-1!==r.indexOf("firefox")?(n="moz",i=!0):-1!==r.indexOf("chrome")&&(n="webkit",o=!0);var s=window.mozRTCPeerConnection||window.webkitRTCPeerConnection,a=window.mozRTCIceCandidate||window.RTCIceCandidate,c=window.mozRTCSessionDescription||window.RTCSessionDescription,p=window.webkitMediaStream||window.MediaStream,u=navigator.userAgent.match("Chrome")&&parseInt(navigator.userAgent.match(/Chrome\/(.*) /)[1],10)>=26,h=window.webkitAudioContext||window.AudioContext;t.exports={support:!!s,dataChannel:o||i||s&&s.prototype&&s.prototype.createDataChannel,prefix:n,webAudio:!(!h||!h.prototype.createMediaStreamSource),mediaStream:!(!p||!p.prototype.removeTrack),screenSharing:!!u,AudioContext:h,PeerConnection:s,SessionDescription:c,IceCandidate:a}},{}],5:[function(e,t){t.exports=function(e,t,n){var o,i=window.URL,r={autoplay:!0,mirror:!1,muted:!1},s=t||document.createElement("video");if(n)for(o in n)r[o]=n[o];if(r.autoplay&&(s.autoplay="autoplay"),r.muted&&(s.muted=!0),r.mirror&&["","moz","webkit","o","ms"].forEach(function(e){var t=e?e+"Transform":"transform";s.style[t]="scaleX(-1)"}),i&&i.createObjectURL)s.src=i.createObjectURL(e);else if(s.srcObject)s.srcObject=e;else{if(!s.mozSrcObject)return!1;s.mozSrcObject=e}return s}},{}],7:[function(e,t){for(var n="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),o=n.length,i=function(){},r={};o--;)r[n[o]]=i;t.exports=r},{}],8:[function(require,module,exports){var io="undefined"==typeof module?{}:module.exports;!function(){if(function(e,t){var n=e;n.version="0.9.16",n.protocol=1,n.transports=[],n.j=[],n.sockets={},n.connect=function(e,o){var i,r,s=n.util.parseUri(e);t&&t.location&&(s.protocol=s.protocol||t.location.protocol.slice(0,-1),s.host=s.host||(t.document?t.document.domain:t.location.hostname),s.port=s.port||t.location.port),i=n.util.uniqueUri(s);var a={host:s.host,secure:"https"==s.protocol,port:s.port||("https"==s.protocol?443:80),query:s.query||""};return n.util.merge(a,o),(a["force new connection"]||!n.sockets[i])&&(r=new n.Socket(a)),!a["force new connection"]&&r&&(n.sockets[i]=r),r=r||n.sockets[i],r.of(s.path.length>1?s.path:"")}}("object"==typeof module?module.exports:this.io={},this),function(e,t){var n=e.util={},o=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,i=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];n.parseUri=function(e){for(var t=o.exec(e||""),n={},r=14;r--;)n[i[r]]=t[r]||"";return n},n.uniqueUri=function(e){var n=e.protocol,o=e.host,i=e.port;return"document"in t?(o=o||document.domain,i=i||("https"==n&&"https:"!==document.location.protocol?443:document.location.port)):(o=o||"localhost",i||"https"!=n||(i=443)),(n||"http")+"://"+o+":"+(i||80)},n.query=function(e,t){var o=n.chunkQuery(e||""),i=[];n.merge(o,n.chunkQuery(t||""));for(var r in o)o.hasOwnProperty(r)&&i.push(r+"="+o[r]);return i.length?"?"+i.join("&"):""},n.chunkQuery=function(e){for(var t,n={},o=e.split("&"),i=0,r=o.length;r>i;++i)t=o[i].split("="),t[0]&&(n[t[0]]=t[1]);return n};var r=!1;n.load=function(e){return"document"in t&&"complete"===document.readyState||r?e():(n.on(t,"load",e,!1),void 0)},n.on=function(e,t,n,o){e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener&&e.addEventListener(t,n,o)},n.request=function(e){if(e&&"undefined"!=typeof XDomainRequest&&!n.ua.hasCORS)return new XDomainRequest;if("undefined"!=typeof XMLHttpRequest&&(!e||n.ua.hasCORS))return new XMLHttpRequest;if(!e)try{return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}return null},"undefined"!=typeof window&&n.load(function(){r=!0}),n.defer=function(e){return n.ua.webkit&&"undefined"==typeof importScripts?(n.load(function(){setTimeout(e,100)}),void 0):e()},n.merge=function(e,t,o,i){var r,s=i||[],a="undefined"==typeof o?2:o;for(r in t)t.hasOwnProperty(r)&&n.indexOf(s,r)<0&&("object"==typeof e[r]&&a?n.merge(e[r],t[r],a-1,s):(e[r]=t[r],s.push(t[r])));return e},n.mixin=function(e,t){n.merge(e.prototype,t.prototype)},n.inherit=function(e,t){function n(){}n.prototype=t.prototype,e.prototype=new n},n.isArray=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},n.intersect=function(e,t){for(var o=[],i=e.length>t.length?e:t,r=e.length>t.length?t:e,s=0,a=r.length;a>s;s++)~n.indexOf(i,r[s])&&o.push(r[s]);return o},n.indexOf=function(e,t,n){for(var o=e.length,n=0>n?0>n+o?0:n+o:n||0;o>n&&e[n]!==t;n++);return n>=o?-1:n},n.toArray=function(e){for(var t=[],n=0,o=e.length;o>n;n++)t.push(e[n]);return t},n.ua={},n.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&function(){try{var e=new XMLHttpRequest}catch(t){return!1}return void 0!=e.withCredentials}(),n.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent),n.ua.iDevice="undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)}("undefined"!=typeof io?io:module.exports,this),function(e,t){function n(){}e.EventEmitter=n,n.prototype.on=function(e,n){return this.$events||(this.$events={}),this.$events[e]?t.util.isArray(this.$events[e])?this.$events[e].push(n):this.$events[e]=[this.$events[e],n]:this.$events[e]=n,this},n.prototype.addListener=n.prototype.on,n.prototype.once=function(e,t){function n(){o.removeListener(e,n),t.apply(this,arguments)}var o=this;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,n){if(this.$events&&this.$events[e]){var o=this.$events[e];if(t.util.isArray(o)){for(var i=-1,r=0,s=o.length;s>r;r++)if(o[r]===n||o[r].listener&&o[r].listener===n){i=r;break}if(0>i)return this;o.splice(i,1),o.length||delete this.$events[e]}else(o===n||o.listener&&o.listener===n)&&delete this.$events[e]}return this},n.prototype.removeAllListeners=function(e){return void 0===e?(this.$events={},this):(this.$events&&this.$events[e]&&(this.$events[e]=null),this)},n.prototype.listeners=function(e){return this.$events||(this.$events={}),this.$events[e]||(this.$events[e]=[]),t.util.isArray(this.$events[e])||(this.$events[e]=[this.$events[e]]),this.$events[e]},n.prototype.emit=function(e){if(!this.$events)return!1;var n=this.$events[e];if(!n)return!1;var o=Array.prototype.slice.call(arguments,1);if("function"==typeof n)n.apply(this,o);else{if(!t.util.isArray(n))return!1;for(var i=n.slice(),r=0,s=i.length;s>r;r++)i[r].apply(this,o)}return!0}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(exports,nativeJSON){"use strict";function f(e){return 10>e?"0"+e:e}function date(e){return isFinite(e.valueOf())?e.getUTCFullYear()+"-"+f(e.getUTCMonth()+1)+"-"+f(e.getUTCDate())+"T"+f(e.getUTCHours())+":"+f(e.getUTCMinutes())+":"+f(e.getUTCSeconds())+"Z":null}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,o,i,r,s,a=gap,c=t[e];switch(c instanceof Date&&(c=date(e)),"function"==typeof rep&&(c=rep.call(t,e,c)),typeof c){case"string":return quote(c);case"number":return isFinite(c)?String(c):"null";case"boolean":case"null":return String(c);case"object":if(!c)return"null";if(gap+=indent,s=[],"[object Array]"===Object.prototype.toString.apply(c)){for(r=c.length,n=0;r>n;n+=1)s[n]=str(n,c)||"null";return i=0===s.length?"[]":gap?"[\n"+gap+s.join(",\n"+gap)+"\n"+a+"]":"["+s.join(",")+"]",gap=a,i}if(rep&&"object"==typeof rep)for(r=rep.length,n=0;r>n;n+=1)"string"==typeof rep[n]&&(o=rep[n],i=str(o,c),i&&s.push(quote(o)+(gap?": ":":")+i));else for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(i=str(o,c),i&&s.push(quote(o)+(gap?": ":":")+i));return i=0===s.length?"{}":gap?"{\n"+gap+s.join(",\n"+gap)+"\n"+a+"}":"{"+s.join(",")+"}",gap=a,i}}if(nativeJSON&&nativeJSON.parse)return exports.JSON={parse:nativeJSON.parse,stringify:nativeJSON.stringify};var JSON=exports.JSON={},cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;JSON.stringify=function(e,t,n){var o;if(gap="",indent="","number"==typeof n)for(o=0;n>o;o+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})},JSON.parse=function(text,reviver){function walk(e,t){var n,o,i=e[t];if(i&&"object"==typeof i)for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=walk(i,n),void 0!==o?i[n]=o:delete i[n]);return reviver.call(e,t,i)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof JSON?JSON:void 0),function(e,t){var n=e.parser={},o=n.packets=["disconnect","connect","heartbeat","message","json","event","ack","error","noop"],i=n.reasons=["transport not supported","client not handshaken","unauthorized"],r=n.advice=["reconnect"],s=t.JSON,a=t.util.indexOf;n.encodePacket=function(e){var t=a(o,e.type),n=e.id||"",c=e.endpoint||"",p=e.ack,u=null;switch(e.type){case"error":var h=e.reason?a(i,e.reason):"",l=e.advice?a(r,e.advice):"";(""!==h||""!==l)&&(u=h+(""!==l?"+"+l:""));break;case"message":""!==e.data&&(u=e.data);break;case"event":var d={name:e.name};e.args&&e.args.length&&(d.args=e.args),u=s.stringify(d);break;case"json":u=s.stringify(e.data);break;case"connect":e.qs&&(u=e.qs);break;case"ack":u=e.ackId+(e.args&&e.args.length?"+"+s.stringify(e.args):"")}var f=[t,n+("data"==p?"+":""),c];return null!==u&&void 0!==u&&f.push(u),f.join(":")},n.encodePayload=function(e){var t="";if(1==e.length)return e[0];for(var n=0,o=e.length;o>n;n++){var i=e[n];t+="�"+i.length+"�"+e[n]}return t};var c=/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;n.decodePacket=function(e){var t=e.match(c);if(!t)return{};var n=t[2]||"",e=t[5]||"",a={type:o[t[1]],endpoint:t[4]||""};switch(n&&(a.id=n,a.ack=t[3]?"data":!0),a.type){case"error":var t=e.split("+");a.reason=i[t[0]]||"",a.advice=r[t[1]]||"";break;case"message":a.data=e||"";break;case"event":try{var p=s.parse(e);a.name=p.name,a.args=p.args}catch(u){}a.args=a.args||[];break;case"json":try{a.data=s.parse(e)}catch(u){}break;case"connect":a.qs=e||"";break;case"ack":var t=e.match(/^([0-9]+)(\+)?(.*)/);if(t&&(a.ackId=t[1],a.args=[],t[3]))try{a.args=t[3]?s.parse(t[3]):[]}catch(u){}break;case"disconnect":case"heartbeat":}return a},n.decodePayload=function(e){if("�"==e.charAt(0)){for(var t=[],o=1,i="";o<e.length;o++)"�"==e.charAt(o)?(t.push(n.decodePacket(e.substr(o+1).substr(0,i))),o+=Number(i)+1,i=""):i+=e.charAt(o);return t}return[n.decodePacket(e)]}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(e,t){function n(e,t){this.socket=e,this.sessid=t}e.Transport=n,t.util.mixin(n,t.EventEmitter),n.prototype.heartbeats=function(){return!0},n.prototype.onData=function(e){if(this.clearCloseTimeout(),(this.socket.connected||this.socket.connecting||this.socket.reconnecting)&&this.setCloseTimeout(),""!==e){var n=t.parser.decodePayload(e);if(n&&n.length)for(var o=0,i=n.length;i>o;o++)this.onPacket(n[o])}return this},n.prototype.onPacket=function(e){return this.socket.setHeartbeatTimeout(),"heartbeat"==e.type?this.onHeartbeat():("connect"==e.type&&""==e.endpoint&&this.onConnect(),"error"==e.type&&"reconnect"==e.advice&&(this.isOpen=!1),this.socket.onPacket(e),this)},n.prototype.setCloseTimeout=function(){if(!this.closeTimeout){var e=this;this.closeTimeout=setTimeout(function(){e.onDisconnect()},this.socket.closeTimeout)}},n.prototype.onDisconnect=function(){return this.isOpen&&this.close(),this.clearTimeouts(),this.socket.onDisconnect(),this},n.prototype.onConnect=function(){return this.socket.onConnect(),this},n.prototype.clearCloseTimeout=function(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null)},n.prototype.clearTimeouts=function(){this.clearCloseTimeout(),this.reopenTimeout&&clearTimeout(this.reopenTimeout)},n.prototype.packet=function(e){this.send(t.parser.encodePacket(e))},n.prototype.onHeartbeat=function(){this.packet({type:"heartbeat"})},n.prototype.onOpen=function(){this.isOpen=!0,this.clearCloseTimeout(),this.socket.onOpen()},n.prototype.onClose=function(){this.isOpen=!1,this.socket.onClose(),this.onDisconnect()},n.prototype.prepareUrl=function(){var e=this.socket.options;return this.scheme()+"://"+e.host+":"+e.port+"/"+e.resource+"/"+t.protocol+"/"+this.name+"/"+this.sessid},n.prototype.ready=function(e,t){t.call(this)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(e,t,n){function o(e){if(this.options={port:80,secure:!1,document:"document"in n?document:!1,resource:"socket.io",transports:t.transports,"connect timeout":1e4,"try multiple transports":!0,reconnect:!0,"reconnection delay":500,"reconnection limit":1/0,"reopen delay":3e3,"max reconnection attempts":10,"sync disconnect on unload":!1,"auto connect":!0,"flash policy port":10843,manualFlush:!1},t.util.merge(this.options,e),this.connected=!1,this.open=!1,this.connecting=!1,this.reconnecting=!1,this.namespaces={},this.buffer=[],this.doBuffer=!1,this.options["sync disconnect on unload"]&&(!this.isXDomain()||t.util.ua.hasCORS)){var o=this;t.util.on(n,"beforeunload",function(){o.disconnectSync()},!1)}this.options["auto connect"]&&this.connect()}function i(){}e.Socket=o,t.util.mixin(o,t.EventEmitter),o.prototype.of=function(e){return this.namespaces[e]||(this.namespaces[e]=new t.SocketNamespace(this,e),""!==e&&this.namespaces[e].packet({type:"connect"})),this.namespaces[e]},o.prototype.publish=function(){this.emit.apply(this,arguments);var e;for(var t in this.namespaces)this.namespaces.hasOwnProperty(t)&&(e=this.of(t),e.$emit.apply(e,arguments))},o.prototype.handshake=function(e){function n(t){t instanceof Error?(o.connecting=!1,o.onError(t.message)):e.apply(null,t.split(":"))}var o=this,r=this.options,s=["http"+(r.secure?"s":"")+":/",r.host+":"+r.port,r.resource,t.protocol,t.util.query(this.options.query,"t="+ +new Date)].join("/");if(this.isXDomain()&&!t.util.ua.hasCORS){var a=document.getElementsByTagName("script")[0],c=document.createElement("script");c.src=s+"&jsonp="+t.j.length,a.parentNode.insertBefore(c,a),t.j.push(function(e){n(e),c.parentNode.removeChild(c)})}else{var p=t.util.request();p.open("GET",s,!0),this.isXDomain()&&(p.withCredentials=!0),p.onreadystatechange=function(){4==p.readyState&&(p.onreadystatechange=i,200==p.status?n(p.responseText):403==p.status?o.onError(p.responseText):(o.connecting=!1,!o.reconnecting&&o.onError(p.responseText)))},p.send(null)}},o.prototype.getTransport=function(e){for(var n,o=e||this.transports,i=0;n=o[i];i++)if(t.Transport[n]&&t.Transport[n].check(this)&&(!this.isXDomain()||t.Transport[n].xdomainCheck(this)))return new t.Transport[n](this,this.sessionid);return null},o.prototype.connect=function(e){if(this.connecting)return this;var n=this;return n.connecting=!0,this.handshake(function(o,i,r,s){function a(e){return n.transport&&n.transport.clearTimeouts(),n.transport=n.getTransport(e),n.transport?(n.transport.ready(n,function(){n.connecting=!0,n.publish("connecting",n.transport.name),n.transport.open(),n.options["connect timeout"]&&(n.connectTimeoutTimer=setTimeout(function(){if(!n.connected&&(n.connecting=!1,n.options["try multiple transports"])){for(var e=n.transports;e.length>0&&e.splice(0,1)[0]!=n.transport.name;);e.length?a(e):n.publish("connect_failed")}},n.options["connect timeout"]))}),void 0):n.publish("connect_failed")}n.sessionid=o,n.closeTimeout=1e3*r,n.heartbeatTimeout=1e3*i,n.transports||(n.transports=n.origTransports=s?t.util.intersect(s.split(","),n.options.transports):n.options.transports),n.setHeartbeatTimeout(),a(n.transports),n.once("connect",function(){clearTimeout(n.connectTimeoutTimer),e&&"function"==typeof e&&e()})}),this},o.prototype.setHeartbeatTimeout=function(){if(clearTimeout(this.heartbeatTimeoutTimer),!this.transport||this.transport.heartbeats()){var e=this;this.heartbeatTimeoutTimer=setTimeout(function(){e.transport.onClose()},this.heartbeatTimeout)}},o.prototype.packet=function(e){return this.connected&&!this.doBuffer?this.transport.packet(e):this.buffer.push(e),this},o.prototype.setBuffer=function(e){this.doBuffer=e,!e&&this.connected&&this.buffer.length&&(this.options.manualFlush||this.flushBuffer())},o.prototype.flushBuffer=function(){this.transport.payload(this.buffer),this.buffer=[]},o.prototype.disconnect=function(){return(this.connected||this.connecting)&&(this.open&&this.of("").packet({type:"disconnect"}),this.onDisconnect("booted")),this},o.prototype.disconnectSync=function(){var e=t.util.request(),n=["http"+(this.options.secure?"s":"")+":/",this.options.host+":"+this.options.port,this.options.resource,t.protocol,"",this.sessionid].join("/")+"/?disconnect=1";e.open("GET",n,!1),e.send(null),this.onDisconnect("booted")},o.prototype.isXDomain=function(){var e=n.location.port||("https:"==n.location.protocol?443:80);return this.options.host!==n.location.hostname||this.options.port!=e},o.prototype.onConnect=function(){this.connected||(this.connected=!0,this.connecting=!1,this.doBuffer||this.setBuffer(!1),this.emit("connect"))},o.prototype.onOpen=function(){this.open=!0},o.prototype.onClose=function(){this.open=!1,clearTimeout(this.heartbeatTimeoutTimer)},o.prototype.onPacket=function(e){this.of(e.endpoint).onPacket(e)},o.prototype.onError=function(e){e&&e.advice&&"reconnect"===e.advice&&(this.connected||this.connecting)&&(this.disconnect(),this.options.reconnect&&this.reconnect()),this.publish("error",e&&e.reason?e.reason:e)},o.prototype.onDisconnect=function(e){var t=this.connected,n=this.connecting;this.connected=!1,this.connecting=!1,this.open=!1,(t||n)&&(this.transport.close(),this.transport.clearTimeouts(),t&&(this.publish("disconnect",e),"booted"!=e&&this.options.reconnect&&!this.reconnecting&&this.reconnect()))},o.prototype.reconnect=function(){function e(){if(n.connected){for(var e in n.namespaces)n.namespaces.hasOwnProperty(e)&&""!==e&&n.namespaces[e].packet({type:"connect"});n.publish("reconnect",n.transport.name,n.reconnectionAttempts)}clearTimeout(n.reconnectionTimer),n.removeListener("connect_failed",t),n.removeListener("connect",t),n.reconnecting=!1,delete n.reconnectionAttempts,delete n.reconnectionDelay,delete n.reconnectionTimer,delete n.redoTransports,n.options["try multiple transports"]=i}function t(){return n.reconnecting?n.connected?e():n.connecting&&n.reconnecting?n.reconnectionTimer=setTimeout(t,1e3):(n.reconnectionAttempts++>=o?n.redoTransports?(n.publish("reconnect_failed"),e()):(n.on("connect_failed",t),n.options["try multiple transports"]=!0,n.transports=n.origTransports,n.transport=n.getTransport(),n.redoTransports=!0,n.connect()):(n.reconnectionDelay<r&&(n.reconnectionDelay*=2),n.connect(),n.publish("reconnecting",n.reconnectionDelay,n.reconnectionAttempts),n.reconnectionTimer=setTimeout(t,n.reconnectionDelay)),void 0):void 0}this.reconnecting=!0,this.reconnectionAttempts=0,this.reconnectionDelay=this.options["reconnection delay"];var n=this,o=this.options["max reconnection attempts"],i=this.options["try multiple transports"],r=this.options["reconnection limit"];this.options["try multiple transports"]=!1,this.reconnectionTimer=setTimeout(t,this.reconnectionDelay),this.on("connect",t)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(e,t){function n(e,t){this.socket=e,this.name=t||"",this.flags={},this.json=new o(this,"json"),this.ackPackets=0,this.acks={}}function o(e,t){this.namespace=e,this.name=t}e.SocketNamespace=n,t.util.mixin(n,t.EventEmitter),n.prototype.$emit=t.EventEmitter.prototype.emit,n.prototype.of=function(){return this.socket.of.apply(this.socket,arguments)},n.prototype.packet=function(e){return e.endpoint=this.name,this.socket.packet(e),this.flags={},this},n.prototype.send=function(e,t){var n={type:this.flags.json?"json":"message",data:e};return"function"==typeof t&&(n.id=++this.ackPackets,n.ack=!0,this.acks[n.id]=t),this.packet(n)},n.prototype.emit=function(e){var t=Array.prototype.slice.call(arguments,1),n=t[t.length-1],o={type:"event",name:e};return"function"==typeof n&&(o.id=++this.ackPackets,o.ack="data",this.acks[o.id]=n,t=t.slice(0,t.length-1)),o.args=t,this.packet(o)},n.prototype.disconnect=function(){return""===this.name?this.socket.disconnect():(this.packet({type:"disconnect"}),this.$emit("disconnect")),this},n.prototype.onPacket=function(e){function n(){o.packet({type:"ack",args:t.util.toArray(arguments),ackId:e.id})}var o=this;switch(e.type){case"connect":this.$emit("connect");break;case"disconnect":""===this.name?this.socket.onDisconnect(e.reason||"booted"):this.$emit("disconnect",e.reason);break;case"message":case"json":var i=["message",e.data];"data"==e.ack?i.push(n):e.ack&&this.packet({type:"ack",ackId:e.id}),this.$emit.apply(this,i);break;case"event":var i=[e.name].concat(e.args);"data"==e.ack&&i.push(n),this.$emit.apply(this,i);break;case"ack":this.acks[e.ackId]&&(this.acks[e.ackId].apply(this,e.args),delete this.acks[e.ackId]);break;case"error":e.advice?this.socket.onError(e):"unauthorized"==e.reason?this.$emit("connect_failed",e.reason):this.$emit("error",e.reason)}},o.prototype.send=function(){this.namespace.flags[this.name]=!0,this.namespace.send.apply(this.namespace,arguments)},o.prototype.emit=function(){this.namespace.flags[this.name]=!0,this.namespace.emit.apply(this.namespace,arguments)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(e,t,n){function o(){t.Transport.apply(this,arguments)}e.websocket=o,t.util.inherit(o,t.Transport),o.prototype.name="websocket",o.prototype.open=function(){var e,o=t.util.query(this.socket.options.query),i=this;return e||(e=n.MozWebSocket||n.WebSocket),this.websocket=new e(this.prepareUrl()+o),this.websocket.onopen=function(){i.onOpen(),i.socket.setBuffer(!1)},this.websocket.onmessage=function(e){i.onData(e.data)},this.websocket.onclose=function(){i.onClose(),i.socket.setBuffer(!0)},this.websocket.onerror=function(e){i.onError(e)},this},o.prototype.send=t.util.ua.iDevice?function(e){var t=this;return setTimeout(function(){t.websocket.send(e)},0),this}:function(e){return this.websocket.send(e),this},o.prototype.payload=function(e){for(var t=0,n=e.length;n>t;t++)this.packet(e[t]);return this},o.prototype.close=function(){return this.websocket.close(),this},o.prototype.onError=function(e){this.socket.onError(e)},o.prototype.scheme=function(){return this.socket.options.secure?"wss":"ws"},o.check=function(){return"WebSocket"in n&&!("__addTask"in WebSocket)||"MozWebSocket"in n},o.xdomainCheck=function(){return!0},t.transports.push("websocket")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(e,t){function n(){t.Transport.websocket.apply(this,arguments)}e.flashsocket=n,t.util.inherit(n,t.Transport.websocket),n.prototype.name="flashsocket",n.prototype.open=function(){var e=this,n=arguments;return WebSocket.__addTask(function(){t.Transport.websocket.prototype.open.apply(e,n)}),this},n.prototype.send=function(){var e=this,n=arguments;return WebSocket.__addTask(function(){t.Transport.websocket.prototype.send.apply(e,n)}),this},n.prototype.close=function(){return WebSocket.__tasks.length=0,t.Transport.websocket.prototype.close.call(this),this},n.prototype.ready=function(e,o){function i(){var t=e.options,i=t["flash policy port"],s=["http"+(t.secure?"s":"")+":/",t.host+":"+t.port,t.resource,"static/flashsocket","WebSocketMain"+(e.isXDomain()?"Insecure":"")+".swf"];n.loaded||("undefined"==typeof WEB_SOCKET_SWF_LOCATION&&(WEB_SOCKET_SWF_LOCATION=s.join("/")),843!==i&&WebSocket.loadFlashPolicyFile("xmlsocket://"+t.host+":"+i),WebSocket.__initialize(),n.loaded=!0),o.call(r)}var r=this;return document.body?i():(t.util.load(i),void 0)},n.check=function(){return"undefined"!=typeof WebSocket&&"__initialize"in WebSocket&&swfobject?swfobject.getFlashPlayerVersion().major>=10:!1},n.xdomainCheck=function(){return!0
},"undefined"!=typeof window&&(WEB_SOCKET_DISABLE_AUTO_INITIALIZATION=!0),t.transports.push("flashsocket")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports),"undefined"!=typeof window)var swfobject=function(){function e(){if(!F){try{var e=P.getElementsByTagName("body")[0].appendChild(y("span"));e.parentNode.removeChild(e)}catch(t){return}F=!0;for(var n=$.length,o=0;n>o;o++)$[o]()}}function t(e){F?e():$[$.length]=e}function n(e){if(typeof W.addEventListener!=O)W.addEventListener("load",e,!1);else if(typeof P.addEventListener!=O)P.addEventListener("load",e,!1);else if(typeof W.attachEvent!=O)g(W,"onload",e);else if("function"==typeof W.onload){var t=W.onload;W.onload=function(){t(),e()}}else W.onload=e}function o(){L?i():r()}function i(){var e=P.getElementsByTagName("body")[0],t=y(A);t.setAttribute("type",D);var n=e.appendChild(t);if(n){var o=0;!function(){if(typeof n.GetVariable!=O){var i=n.GetVariable("$version");i&&(i=i.split(" ")[1].split(","),V.pv=[parseInt(i[0],10),parseInt(i[1],10),parseInt(i[2],10)])}else if(10>o)return o++,setTimeout(arguments.callee,10),void 0;e.removeChild(t),n=null,r()}()}else r()}function r(){var e=M.length;if(e>0)for(var t=0;e>t;t++){var n=M[t].id,o=M[t].callbackFn,i={success:!1,id:n};if(V.pv[0]>0){var r=m(n);if(r)if(!v(M[t].swfVersion)||V.wk&&V.wk<312)if(M[t].expressInstall&&a()){var u={};u.data=M[t].expressInstall,u.width=r.getAttribute("width")||"0",u.height=r.getAttribute("height")||"0",r.getAttribute("class")&&(u.styleclass=r.getAttribute("class")),r.getAttribute("align")&&(u.align=r.getAttribute("align"));for(var h={},l=r.getElementsByTagName("param"),d=l.length,f=0;d>f;f++)"movie"!=l[f].getAttribute("name").toLowerCase()&&(h[l[f].getAttribute("name")]=l[f].getAttribute("value"));c(u,h,n,o)}else p(r),o&&o(i);else k(n,!0),o&&(i.success=!0,i.ref=s(n),o(i))}else if(k(n,!0),o){var y=s(n);y&&typeof y.SetVariable!=O&&(i.success=!0,i.ref=y),o(i)}}}function s(e){var t=null,n=m(e);if(n&&"OBJECT"==n.nodeName)if(typeof n.SetVariable!=O)t=n;else{var o=n.getElementsByTagName(A)[0];o&&(t=o)}return t}function a(){return!H&&v("6.0.65")&&(V.win||V.mac)&&!(V.wk&&V.wk<312)}function c(e,t,n,o){H=!0,C=o||null,E={success:!1,id:n};var i=m(n);if(i){"OBJECT"==i.nodeName?(S=u(i),T=null):(S=i,T=n),e.id=N,(typeof e.width==O||!/%$/.test(e.width)&&parseInt(e.width,10)<310)&&(e.width="310"),(typeof e.height==O||!/%$/.test(e.height)&&parseInt(e.height,10)<137)&&(e.height="137"),P.title=P.title.slice(0,47)+" - Flash Player Installation";var r=V.ie&&V.win?["Active"].concat("").join("X"):"PlugIn",s="MMredirectURL="+W.location.toString().replace(/&/g,"%26")+"&MMplayerType="+r+"&MMdoctitle="+P.title;if(typeof t.flashvars!=O?t.flashvars+="&"+s:t.flashvars=s,V.ie&&V.win&&4!=i.readyState){var a=y("div");n+="SWFObjectNew",a.setAttribute("id",n),i.parentNode.insertBefore(a,i),i.style.display="none",function(){4==i.readyState?i.parentNode.removeChild(i):setTimeout(arguments.callee,10)}()}h(e,t,n)}}function p(e){if(V.ie&&V.win&&4!=e.readyState){var t=y("div");e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(u(e),t),e.style.display="none",function(){4==e.readyState?e.parentNode.removeChild(e):setTimeout(arguments.callee,10)}()}else e.parentNode.replaceChild(u(e),e)}function u(e){var t=y("div");if(V.win&&V.ie)t.innerHTML=e.innerHTML;else{var n=e.getElementsByTagName(A)[0];if(n){var o=n.childNodes;if(o)for(var i=o.length,r=0;i>r;r++)1==o[r].nodeType&&"PARAM"==o[r].nodeName||8==o[r].nodeType||t.appendChild(o[r].cloneNode(!0))}}return t}function h(e,t,n){var o,i=m(n);if(V.wk&&V.wk<312)return o;if(i)if(typeof e.id==O&&(e.id=n),V.ie&&V.win){var r="";for(var s in e)e[s]!=Object.prototype[s]&&("data"==s.toLowerCase()?t.movie=e[s]:"styleclass"==s.toLowerCase()?r+=' class="'+e[s]+'"':"classid"!=s.toLowerCase()&&(r+=" "+s+'="'+e[s]+'"'));var a="";for(var c in t)t[c]!=Object.prototype[c]&&(a+='<param name="'+c+'" value="'+t[c]+'" />');i.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+r+">"+a+"</object>",X[X.length]=e.id,o=m(e.id)}else{var p=y(A);p.setAttribute("type",D);for(var u in e)e[u]!=Object.prototype[u]&&("styleclass"==u.toLowerCase()?p.setAttribute("class",e[u]):"classid"!=u.toLowerCase()&&p.setAttribute(u,e[u]));for(var h in t)t[h]!=Object.prototype[h]&&"movie"!=h.toLowerCase()&&l(p,h,t[h]);i.parentNode.replaceChild(p,i),o=p}return o}function l(e,t,n){var o=y("param");o.setAttribute("name",t),o.setAttribute("value",n),e.appendChild(o)}function d(e){var t=m(e);t&&"OBJECT"==t.nodeName&&(V.ie&&V.win?(t.style.display="none",function(){4==t.readyState?f(e):setTimeout(arguments.callee,10)}()):t.parentNode.removeChild(t))}function f(e){var t=m(e);if(t){for(var n in t)"function"==typeof t[n]&&(t[n]=null);t.parentNode.removeChild(t)}}function m(e){var t=null;try{t=P.getElementById(e)}catch(n){}return t}function y(e){return P.createElement(e)}function g(e,t,n){e.attachEvent(t,n),B[B.length]=[e,t,n]}function v(e){var t=V.pv,n=e.split(".");return n[0]=parseInt(n[0],10),n[1]=parseInt(n[1],10)||0,n[2]=parseInt(n[2],10)||0,t[0]>n[0]||t[0]==n[0]&&t[1]>n[1]||t[0]==n[0]&&t[1]==n[1]&&t[2]>=n[2]?!0:!1}function b(e,t,n,o){if(!V.ie||!V.mac){var i=P.getElementsByTagName("head")[0];if(i){var r=n&&"string"==typeof n?n:"screen";if(o&&(x=null,_=null),!x||_!=r){var s=y("style");s.setAttribute("type","text/css"),s.setAttribute("media",r),x=i.appendChild(s),V.ie&&V.win&&typeof P.styleSheets!=O&&P.styleSheets.length>0&&(x=P.styleSheets[P.styleSheets.length-1]),_=r}V.ie&&V.win?x&&typeof x.addRule==A&&x.addRule(e,t):x&&typeof P.createTextNode!=O&&x.appendChild(P.createTextNode(e+" {"+t+"}"))}}}function k(e,t){if(U){var n=t?"visible":"hidden";F&&m(e)?m(e).style.visibility=n:b("#"+e,"visibility:"+n)}}function w(e){var t=/[\\\"<>\.;]/,n=null!=t.exec(e);return n&&typeof encodeURIComponent!=O?encodeURIComponent(e):e}var S,T,C,E,x,_,O="undefined",A="object",R="Shockwave Flash",j="ShockwaveFlash.ShockwaveFlash",D="application/x-shockwave-flash",N="SWFObjectExprInst",I="onreadystatechange",W=window,P=document,q=navigator,L=!1,$=[o],M=[],X=[],B=[],F=!1,H=!1,U=!0,V=function(){var e=typeof P.getElementById!=O&&typeof P.getElementsByTagName!=O&&typeof P.createElement!=O,t=q.userAgent.toLowerCase(),n=q.platform.toLowerCase(),o=n?/win/.test(n):/win/.test(t),i=n?/mac/.test(n):/mac/.test(t),r=/webkit/.test(t)?parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,s=!1,a=[0,0,0],c=null;if(typeof q.plugins!=O&&typeof q.plugins[R]==A)c=q.plugins[R].description,!c||typeof q.mimeTypes!=O&&q.mimeTypes[D]&&!q.mimeTypes[D].enabledPlugin||(L=!0,s=!1,c=c.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),a[0]=parseInt(c.replace(/^(.*)\..*$/,"$1"),10),a[1]=parseInt(c.replace(/^.*\.(.*)\s.*$/,"$1"),10),a[2]=/[a-zA-Z]/.test(c)?parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof W[["Active"].concat("Object").join("X")]!=O)try{var p=new(window[["Active"].concat("Object").join("X")])(j);p&&(c=p.GetVariable("$version"),c&&(s=!0,c=c.split(" ")[1].split(","),a=[parseInt(c[0],10),parseInt(c[1],10),parseInt(c[2],10)]))}catch(u){}return{w3:e,pv:a,wk:r,ie:s,win:o,mac:i}}();return function(){V.w3&&((typeof P.readyState!=O&&"complete"==P.readyState||typeof P.readyState==O&&(P.getElementsByTagName("body")[0]||P.body))&&e(),F||(typeof P.addEventListener!=O&&P.addEventListener("DOMContentLoaded",e,!1),V.ie&&V.win&&(P.attachEvent(I,function(){"complete"==P.readyState&&(P.detachEvent(I,arguments.callee),e())}),W==top&&function(){if(!F){try{P.documentElement.doScroll("left")}catch(t){return setTimeout(arguments.callee,0),void 0}e()}}()),V.wk&&function(){return F?void 0:/loaded|complete/.test(P.readyState)?(e(),void 0):(setTimeout(arguments.callee,0),void 0)}(),n(e)))}(),function(){V.ie&&V.win&&window.attachEvent("onunload",function(){for(var e=B.length,t=0;e>t;t++)B[t][0].detachEvent(B[t][1],B[t][2]);for(var n=X.length,o=0;n>o;o++)d(X[o]);for(var i in V)V[i]=null;V=null;for(var r in swfobject)swfobject[r]=null;swfobject=null})}(),{registerObject:function(e,t,n,o){if(V.w3&&e&&t){var i={};i.id=e,i.swfVersion=t,i.expressInstall=n,i.callbackFn=o,M[M.length]=i,k(e,!1)}else o&&o({success:!1,id:e})},getObjectById:function(e){return V.w3?s(e):void 0},embedSWF:function(e,n,o,i,r,s,p,u,l,d){var f={success:!1,id:n};V.w3&&!(V.wk&&V.wk<312)&&e&&n&&o&&i&&r?(k(n,!1),t(function(){o+="",i+="";var t={};if(l&&typeof l===A)for(var m in l)t[m]=l[m];t.data=e,t.width=o,t.height=i;var y={};if(u&&typeof u===A)for(var g in u)y[g]=u[g];if(p&&typeof p===A)for(var b in p)typeof y.flashvars!=O?y.flashvars+="&"+b+"="+p[b]:y.flashvars=b+"="+p[b];if(v(r)){var w=h(t,y,n);t.id==n&&k(n,!0),f.success=!0,f.ref=w}else{if(s&&a())return t.data=s,c(t,y,n,d),void 0;k(n,!0)}d&&d(f)})):d&&d(f)},switchOffAutoHideShow:function(){U=!1},ua:V,getFlashPlayerVersion:function(){return{major:V.pv[0],minor:V.pv[1],release:V.pv[2]}},hasFlashPlayerVersion:v,createSWF:function(e,t,n){return V.w3?h(e,t,n):void 0},showExpressInstall:function(e,t,n,o){V.w3&&a()&&c(e,t,n,o)},removeSWF:function(e){V.w3&&d(e)},createCSS:function(e,t,n,o){V.w3&&b(e,t,n,o)},addDomLoadEvent:t,addLoadEvent:n,getQueryParamValue:function(e){var t=P.location.search||P.location.hash;if(t){if(/\?/.test(t)&&(t=t.split("?")[1]),null==e)return w(t);for(var n=t.split("&"),o=0;o<n.length;o++)if(n[o].substring(0,n[o].indexOf("="))==e)return w(n[o].substring(n[o].indexOf("=")+1))}return""},expressInstallCallback:function(){if(H){var e=m(N);e&&S&&(e.parentNode.replaceChild(S,e),T&&(k(T,!0),V.ie&&V.win&&(S.style.display="block")),C&&C(E)),H=!1}}}}();!function(){if("undefined"!=typeof window&&!window.WebSocket){var e=window.console;if(e&&e.log&&e.error||(e={log:function(){},error:function(){}}),!swfobject.hasFlashPlayerVersion("10.0.0"))return e.error("Flash Player >= 10.0.0 is required."),void 0;"file:"==location.protocol&&e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."),WebSocket=function(e,t,n,o,i){var r=this;r.__id=WebSocket.__nextId++,WebSocket.__instances[r.__id]=r,r.readyState=WebSocket.CONNECTING,r.bufferedAmount=0,r.__events={},t?"string"==typeof t&&(t=[t]):t=[],setTimeout(function(){WebSocket.__addTask(function(){WebSocket.__flash.create(r.__id,e,t,n||null,o||0,i||null)})},0)},WebSocket.prototype.send=function(e){if(this.readyState==WebSocket.CONNECTING)throw"INVALID_STATE_ERR: Web Socket connection has not been established";var t=WebSocket.__flash.send(this.__id,encodeURIComponent(e));return 0>t?!0:(this.bufferedAmount+=t,!1)},WebSocket.prototype.close=function(){this.readyState!=WebSocket.CLOSED&&this.readyState!=WebSocket.CLOSING&&(this.readyState=WebSocket.CLOSING,WebSocket.__flash.close(this.__id))},WebSocket.prototype.addEventListener=function(e,t){e in this.__events||(this.__events[e]=[]),this.__events[e].push(t)},WebSocket.prototype.removeEventListener=function(e,t){if(e in this.__events)for(var n=this.__events[e],o=n.length-1;o>=0;--o)if(n[o]===t){n.splice(o,1);break}},WebSocket.prototype.dispatchEvent=function(e){for(var t=this.__events[e.type]||[],n=0;n<t.length;++n)t[n](e);var o=this["on"+e.type];o&&o(e)},WebSocket.prototype.__handleEvent=function(e){"readyState"in e&&(this.readyState=e.readyState),"protocol"in e&&(this.protocol=e.protocol);var t;if("open"==e.type||"error"==e.type)t=this.__createSimpleEvent(e.type);else if("close"==e.type)t=this.__createSimpleEvent("close");else{if("message"!=e.type)throw"unknown event type: "+e.type;var n=decodeURIComponent(e.message);t=this.__createMessageEvent("message",n)}this.dispatchEvent(t)},WebSocket.prototype.__createSimpleEvent=function(e){if(document.createEvent&&window.Event){var t=document.createEvent("Event");return t.initEvent(e,!1,!1),t}return{type:e,bubbles:!1,cancelable:!1}},WebSocket.prototype.__createMessageEvent=function(e,t){if(document.createEvent&&window.MessageEvent&&!window.opera){var n=document.createEvent("MessageEvent");return n.initMessageEvent("message",!1,!1,t,null,null,window,null),n}return{type:e,data:t,bubbles:!1,cancelable:!1}},WebSocket.CONNECTING=0,WebSocket.OPEN=1,WebSocket.CLOSING=2,WebSocket.CLOSED=3,WebSocket.__flash=null,WebSocket.__instances={},WebSocket.__tasks=[],WebSocket.__nextId=0,WebSocket.loadFlashPolicyFile=function(e){WebSocket.__addTask(function(){WebSocket.__flash.loadManualPolicyFile(e)})},WebSocket.__initialize=function(){if(!WebSocket.__flash){if(WebSocket.__swfLocation&&(window.WEB_SOCKET_SWF_LOCATION=WebSocket.__swfLocation),!window.WEB_SOCKET_SWF_LOCATION)return e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf"),void 0;var t=document.createElement("div");t.id="webSocketContainer",t.style.position="absolute",WebSocket.__isFlashLite()?(t.style.left="0px",t.style.top="0px"):(t.style.left="-100px",t.style.top="-100px");var n=document.createElement("div");n.id="webSocketFlash",t.appendChild(n),document.body.appendChild(t),swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION,"webSocketFlash","1","1","10.0.0",null,null,{hasPriority:!0,swliveconnect:!0,allowScriptAccess:"always"},null,function(t){t.success||e.error("[WebSocket] swfobject.embedSWF failed")})}},WebSocket.__onFlashInitialized=function(){setTimeout(function(){WebSocket.__flash=document.getElementById("webSocketFlash"),WebSocket.__flash.setCallerUrl(location.href),WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);for(var e=0;e<WebSocket.__tasks.length;++e)WebSocket.__tasks[e]();WebSocket.__tasks=[]},0)},WebSocket.__onFlashEvent=function(){return setTimeout(function(){try{for(var t=WebSocket.__flash.receiveEvents(),n=0;n<t.length;++n)WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n])}catch(o){e.error(o)}},0),!0},WebSocket.__log=function(t){e.log(decodeURIComponent(t))},WebSocket.__error=function(t){e.error(decodeURIComponent(t))},WebSocket.__addTask=function(e){WebSocket.__flash?e():WebSocket.__tasks.push(e)},WebSocket.__isFlashLite=function(){if(!window.navigator||!window.navigator.mimeTypes)return!1;var e=window.navigator.mimeTypes["application/x-shockwave-flash"];return e&&e.enabledPlugin&&e.enabledPlugin.filename?e.enabledPlugin.filename.match(/flashlite/i)?!0:!1:!1},window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION||(window.addEventListener?window.addEventListener("load",function(){WebSocket.__initialize()},!1):window.attachEvent("onload",function(){WebSocket.__initialize()}))}}(),function(e,t,n){function o(e){e&&(t.Transport.apply(this,arguments),this.sendBuffer=[])}function i(){}e.XHR=o,t.util.inherit(o,t.Transport),o.prototype.open=function(){return this.socket.setBuffer(!1),this.onOpen(),this.get(),this.setCloseTimeout(),this},o.prototype.payload=function(e){for(var n=[],o=0,i=e.length;i>o;o++)n.push(t.parser.encodePacket(e[o]));this.send(t.parser.encodePayload(n))},o.prototype.send=function(e){return this.post(e),this},o.prototype.post=function(e){function t(){4==this.readyState&&(this.onreadystatechange=i,r.posting=!1,200==this.status?r.socket.setBuffer(!1):r.onClose())}function o(){this.onload=i,r.socket.setBuffer(!1)}var r=this;this.socket.setBuffer(!0),this.sendXHR=this.request("POST"),n.XDomainRequest&&this.sendXHR instanceof XDomainRequest?this.sendXHR.onload=this.sendXHR.onerror=o:this.sendXHR.onreadystatechange=t,this.sendXHR.send(e)},o.prototype.close=function(){return this.onClose(),this},o.prototype.request=function(e){var n=t.util.request(this.socket.isXDomain()),o=t.util.query(this.socket.options.query,"t="+ +new Date);if(n.open(e||"GET",this.prepareUrl()+o,!0),"POST"==e)try{n.setRequestHeader?n.setRequestHeader("Content-type","text/plain;charset=UTF-8"):n.contentType="text/plain"}catch(i){}return n},o.prototype.scheme=function(){return this.socket.options.secure?"https":"http"},o.check=function(e,o){try{var i=t.util.request(o),r=n.XDomainRequest&&i instanceof XDomainRequest,s=e&&e.options&&e.options.secure?"https:":"http:",a=n.location&&s!=n.location.protocol;if(i&&(!r||!a))return!0}catch(c){}return!1},o.xdomainCheck=function(e){return o.check(e,!0)}}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(e,t){function n(){t.Transport.XHR.apply(this,arguments)}e.htmlfile=n,t.util.inherit(n,t.Transport.XHR),n.prototype.name="htmlfile",n.prototype.get=function(){this.doc=new(window[["Active"].concat("Object").join("X")])("htmlfile"),this.doc.open(),this.doc.write("<html></html>"),this.doc.close(),this.doc.parentWindow.s=this;var e=this.doc.createElement("div");e.className="socketio",this.doc.body.appendChild(e),this.iframe=this.doc.createElement("iframe"),e.appendChild(this.iframe);var n=this,o=t.util.query(this.socket.options.query,"t="+ +new Date);this.iframe.src=this.prepareUrl()+o,t.util.on(window,"unload",function(){n.destroy()})},n.prototype._=function(e,t){e=e.replace(/\\\//g,"/"),this.onData(e);try{var n=t.getElementsByTagName("script")[0];n.parentNode.removeChild(n)}catch(o){}},n.prototype.destroy=function(){if(this.iframe){try{this.iframe.src="about:blank"}catch(e){}this.doc=null,this.iframe.parentNode.removeChild(this.iframe),this.iframe=null,CollectGarbage()}},n.prototype.close=function(){return this.destroy(),t.Transport.XHR.prototype.close.call(this)},n.check=function(e){if("undefined"!=typeof window&&["Active"].concat("Object").join("X")in window)try{var n=new(window[["Active"].concat("Object").join("X")])("htmlfile");return n&&t.Transport.XHR.check(e)}catch(o){}return!1},n.xdomainCheck=function(){return!1},t.transports.push("htmlfile")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(e,t,n){function o(){t.Transport.XHR.apply(this,arguments)}function i(){}e["xhr-polling"]=o,t.util.inherit(o,t.Transport.XHR),t.util.merge(o,t.Transport.XHR),o.prototype.name="xhr-polling",o.prototype.heartbeats=function(){return!1},o.prototype.open=function(){var e=this;return t.Transport.XHR.prototype.open.call(e),!1},o.prototype.get=function(){function e(){4==this.readyState&&(this.onreadystatechange=i,200==this.status?(r.onData(this.responseText),r.get()):r.onClose())}function t(){this.onload=i,this.onerror=i,r.retryCounter=1,r.onData(this.responseText),r.get()}function o(){r.retryCounter++,!r.retryCounter||r.retryCounter>3?r.onClose():r.get()}if(this.isOpen){var r=this;this.xhr=this.request(),n.XDomainRequest&&this.xhr instanceof XDomainRequest?(this.xhr.onload=t,this.xhr.onerror=o):this.xhr.onreadystatechange=e,this.xhr.send(null)}},o.prototype.onClose=function(){if(t.Transport.XHR.prototype.onClose.call(this),this.xhr){this.xhr.onreadystatechange=this.xhr.onload=this.xhr.onerror=i;try{this.xhr.abort()}catch(e){}this.xhr=null}},o.prototype.ready=function(e,n){var o=this;t.util.defer(function(){n.call(o)})},t.transports.push("xhr-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(e,t,n){function o(){t.Transport["xhr-polling"].apply(this,arguments),this.index=t.j.length;var e=this;t.j.push(function(t){e._(t)})}var i=n.document&&"MozAppearance"in n.document.documentElement.style;e["jsonp-polling"]=o,t.util.inherit(o,t.Transport["xhr-polling"]),o.prototype.name="jsonp-polling",o.prototype.post=function(e){function n(){o(),i.socket.setBuffer(!1)}function o(){i.iframe&&i.form.removeChild(i.iframe);try{s=document.createElement('<iframe name="'+i.iframeId+'">')}catch(e){s=document.createElement("iframe"),s.name=i.iframeId}s.id=i.iframeId,i.form.appendChild(s),i.iframe=s}var i=this,r=t.util.query(this.socket.options.query,"t="+ +new Date+"&i="+this.index);if(!this.form){var s,a=document.createElement("form"),c=document.createElement("textarea"),p=this.iframeId="socketio_iframe_"+this.index;a.className="socketio",a.style.position="absolute",a.style.top="0px",a.style.left="0px",a.style.display="none",a.target=p,a.method="POST",a.setAttribute("accept-charset","utf-8"),c.name="d",a.appendChild(c),document.body.appendChild(a),this.form=a,this.area=c}this.form.action=this.prepareUrl()+r,o(),this.area.value=t.JSON.stringify(e);try{this.form.submit()}catch(u){}this.iframe.attachEvent?s.onreadystatechange=function(){"complete"==i.iframe.readyState&&n()}:this.iframe.onload=n,this.socket.setBuffer(!0)},o.prototype.get=function(){var e=this,n=document.createElement("script"),o=t.util.query(this.socket.options.query,"t="+ +new Date+"&i="+this.index);this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),n.async=!0,n.src=this.prepareUrl()+o,n.onerror=function(){e.onClose()};var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r),this.script=n,i&&setTimeout(function(){var e=document.createElement("iframe");document.body.appendChild(e),document.body.removeChild(e)},100)},o.prototype._=function(e){return this.onData(e),this.isOpen&&this.get(),this},o.prototype.ready=function(e,n){var o=this;return i?(t.util.load(function(){n.call(o)}),void 0):n.call(this)},o.check=function(){return"document"in n},o.xdomainCheck=function(){return!0},t.transports.push("jsonp-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),"function"==typeof define&&define.amd&&define([],function(){return io})}()},{}],6:[function(e,t){var n=e("getusermedia");t.exports=function(e){var t,o={video:{mandatory:{chromeMediaSource:"screen"}}};return"http:"===window.location.protocol?(t=new Error("NavigatorUserMediaError"),t.name="HTTPS_REQUIRED",e(t)):(n(o,e),void 0)}},{getusermedia:9}],10:[function(e,t){var n=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;t.exports=function(e,t){var o,i=2===arguments.length,r={video:!0,audio:!0},s="PERMISSION_DENIED",a="CONSTRAINT_NOT_SATISFIED";return i||(t=e,e=r),n?(n.call(navigator,e,function(e){t(null,e)},function(e){var n;"string"==typeof e?(n=new Error("NavigatorUserMediaError"),n.name=e===s?s:a):(n=e,n.name||(e.name=n[s]?s:a)),t(n)}),void 0):(o=new Error("NavigatorUserMediaError"),o.name="NOT_SUPPORTED_ERROR",t(o))}},{}],9:[function(e,t){var n=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;t.exports=function(e,t){var o,i=2===arguments.length,r={video:!0,audio:!0},s="PERMISSION_DENIED",a="CONSTRAINT_NOT_SATISFIED";return i||(t=e,e=r),n?(n.call(navigator,e,function(e){t(null,e)},function(e){var n;"string"==typeof e?(n=new Error("NavigatorUserMediaError"),n.name=e===s?s:a):(n=e,n.name||(e.name=n[s]?s:a)),t(n)}),void 0):(o=new Error("NavigatorUserMediaError"),o.name="NOT_SUPPORTED_ERROR",t(o))}},{}],2:[function(e,t){function n(e){var t=this,n=e||{};this.config={debug:!1,localVideoEl:"",remoteVideosEl:"",autoRequestMedia:!1,peerConnectionConfig:{iceServers:[{url:"stun:stun.l.google.com:19302"}]},peerConnectionContraints:{optional:[{DtlsSrtpKeyAgreement:!0},{RtpDataChannels:!0}]},autoAdjustMic:!1,media:{audio:!0,video:!0},detectSpeakingEvents:!0,enableDataChannels:!0};var o;this.screenSharingSupport=i.screenSharing,this.logger=function(){return e.debug?e.logger||console:e.logger||u}();for(o in n)this.config[o]=n[o];i.support||this.logger.error("Your browser doesn't seem to support WebRTC"),this.peers=[],a.call(this),this.config.debug&&this.on("*",function(e,n,o){var i;i=t.config.logger===u?console:t.logger,i.log("event:",e,n,o)})}function o(e){var t=this;if(this.id=e.id,this.parent=e.parent,this.type=e.type||"video",this.oneway=e.oneway||!1,this.sharemyscreen=e.sharemyscreen||!1,this.browserPrefix=e.prefix,this.stream=e.stream,this.channels={},this.pc=new s(this.parent.config.peerConnectionConfig,this.parent.config.peerConnectionContraints),this.pc.on("ice",this.onIceCandidate.bind(this)),this.pc.on("addStream",this.handleRemoteStreamAdded.bind(this)),this.pc.on("addChannel",this.handleDataChannelAdded.bind(this)),this.pc.on("removeStream",this.handleStreamRemoved.bind(this)),this.pc.on("negotiationNeeded",this.emit.bind(this,"negotiationNeeded")),this.logger=this.parent.logger,"screen"===e.type?this.parent.localScreen&&this.sharemyscreen&&(this.logger.log("adding local screen stream to peer connection"),this.pc.addStream(this.parent.localScreen),this.broadcaster=e.broadcaster):this.pc.addStream(this.parent.localStream),this.parent.config.enableDataChannels&&i.dataChannel){try{if(this.reliableChannel=this.getDataChannel("reliable",{reliable:!0}),!this.reliableChannel.reliable)throw Error("Failed to make reliable channel")}catch(n){this.logger.warn("Failed to create reliable data channel."),this.reliableChannel=!1,delete this.channels.reliable}try{if(this.unreliableChannel=this.getDataChannel("unreliable",{reliable:!1,preset:!0}),this.unreliableChannel.unreliable!==!1)throw Error("Failed to make unreliable channel")}catch(n){this.logger.warn("Failed to create unreliable data channel."),this.unreliableChannel=!1,delete this.channels.unreliableChannel}}a.call(this),this.on("*",function(){t.parent.emit.apply(t.parent,arguments)})}var i=e("webrtcsupport"),r=e("getusermedia"),s=e("rtcpeerconnection"),a=e("wildemitter"),c=e("hark"),p=e("mediastream-gain"),u=e("mockconsole");n.prototype=Object.create(a.prototype,{constructor:{value:n}}),n.prototype.createPeer=function(e){var t;return e.parent=this,t=new o(e),this.peers.push(t),t},n.prototype.startLocalMedia=function(e,t){var n=this,o=e||{video:!0,audio:!0};r(o,function(e,i){e||(o.audio&&n.config.detectSpeakingEvents&&n.setupAudioMonitor(i),n.localStream=i,n.config.autoAdjustMic&&(n.gainController=new p(i),n.setMicIfEnabled(.5)),n.emit("localStream",i)),t&&t(e,i)})},n.prototype.stopLocalMedia=function(){this.localStream&&(this.localStream.stop(),this.emit("localStreamStopped"))},n.prototype.mute=function(){this._audioEnabled(!1),this.hardMuted=!0,this.emit("audioOff")},n.prototype.unmute=function(){this._audioEnabled(!0),this.hardMuted=!1,this.emit("audioOn")},n.prototype.setupAudioMonitor=function(e){this.logger.log("Setup audio");var t,n=c(e),o=this;n.on("speaking",function(){o.hardMuted||(o.setMicIfEnabled(1),o.sendToAll("speaking",{}),o.emit("speaking"))}),n.on("stopped_speaking",function(){o.hardMuted||(t&&clearTimeout(t),t=setTimeout(function(){o.setMicIfEnabled(.5),o.sendToAll("stopped_speaking",{}),o.emit("stoppedSpeaking")},1e3))})},n.prototype.setMicIfEnabled=function(e){this.config.autoAdjustMic&&this.gainController.setGain(e)},n.prototype.pauseVideo=function(){this._videoEnabled(!1),this.emit("videoOff")},n.prototype.resumeVideo=function(){this._videoEnabled(!0),this.emit("videoOn")},n.prototype.pause=function(){this._audioEnabled(!1),this.pauseVideo()},n.prototype.resume=function(){this._audioEnabled(!0),this.resumeVideo()},n.prototype._audioEnabled=function(e){this.setMicIfEnabled(e?1:0),this.localStream.getAudioTracks().forEach(function(t){t.enabled=!!e})},n.prototype._videoEnabled=function(e){this.localStream.getVideoTracks().forEach(function(t){t.enabled=!!e})},n.prototype.removePeers=function(e,t){this.getPeers(e,t).forEach(function(e){e.end()})},n.prototype.getPeers=function(e,t){return this.peers.filter(function(n){return!(e&&n.id!==e||t&&n.type!==t)})},n.prototype.sendToAll=function(e,t){this.peers.forEach(function(n){n.send(e,t)})},o.prototype=Object.create(a.prototype,{constructor:{value:o}}),o.prototype.handleMessage=function(e){var t=this;this.logger.log("getting",e.type,e),e.prefix&&(this.browserPrefix=e.prefix),"offer"===e.type?this.pc.answer(e.payload,function(e,n){t.send("answer",n)}):"answer"===e.type?this.pc.handleAnswer(e.payload):"candidate"===e.type?this.pc.processIce(e.payload):"speaking"===e.type?this.parent.emit("speaking",{id:e.from}):"stopped_speaking"===e.type&&this.parent.emit("stopped_speaking",{id:e.from})},o.prototype.send=function(e,t){var n={to:this.id,broadcaster:this.broadcaster,roomType:this.type,type:e,payload:t,prefix:i.prefix};this.logger.log("sending",e,n),this.parent.emit("message",n)},o.prototype._observeDataChannel=function(e){var t=this;e.onclose=this.emit.bind(this,"channelClose",e),e.onerror=this.emit.bind(this,"channelError",e),e.onmessage=function(n){t.emit("message",e.label,n.data,e,n)},e.onopen=this.emit.bind(this,"channelOpen",e)},o.prototype.getDataChannel=function(e,t){if(!i.dataChannel)return this.emit("error",new Error("createDataChannel not supported"));var n=this.channels[e];return t||(t={}),n?n:(n=this.channels[e]=this.pc.createDataChannel(e,t),this._observeDataChannel(n),n)},o.prototype.onIceCandidate=function(e){this.closed||(e?this.send("candidate",e):this.logger.log("End of candidates."))},o.prototype.start=function(){var e=this;this.pc.offer(function(t,n){e.send("offer",n)})},o.prototype.end=function(){this.pc.close(),this.handleStreamRemoved()},o.prototype.handleRemoteStreamAdded=function(e){this.stream?this.logger.warn("Already have a remote stream"):(this.stream=e.stream,this.parent.emit("peerStreamAdded",this))},o.prototype.handleStreamRemoved=function(){this.parent.peers.splice(this.parent.peers.indexOf(this),1),this.closed=!0,this.parent.emit("peerStreamRemoved",this)},o.prototype.handleDataChannelAdded=function(e){this.channels[e.name]=e},t.exports=n},{getusermedia:10,hark:13,"mediastream-gain":12,mockconsole:7,rtcpeerconnection:11,webrtcsupport:4,wildemitter:3}],11:[function(e,t){function n(e,t){var n;this.pc=new i.PeerConnection(e,t),o.call(this),this.pc.onremovestream=this.emit.bind(this,"removeStream"),this.pc.onnegotiationneeded=this.emit.bind(this,"negotiationNeeded"),this.pc.oniceconnectionstatechange=this.emit.bind(this,"iceConnectionStateChange"),this.pc.onsignalingstatechange=this.emit.bind(this,"signalingStateChange"),this.pc.onaddstream=this._onAddStream.bind(this),this.pc.onicecandidate=this._onIce.bind(this),this.pc.ondatachannel=this._onDataChannel.bind(this),this.config={debug:!1,sdpHack:!0};for(n in e)this.config[n]=e[n];this.config.debug&&this.on("*",function(){var t=e.logger||console;t.log("PeerConnection event:",arguments)})}var o=e("wildemitter"),i=e("webrtcsupport");n.prototype=Object.create(o.prototype,{constructor:{value:n}}),n.prototype.addStream=function(e){this.localStream=e,this.pc.addStream(e)},n.prototype.processIce=function(e){this.pc.addIceCandidate(new i.IceCandidate(e))},n.prototype.offer=function(e,t){var n=this,o=2===arguments.length,i=o?e:{mandatory:{OfferToReceiveAudio:!0,OfferToReceiveVideo:!0}},r=o?t:e;this.pc.createOffer(function(e){e.sdp=n._applySdpHack(e.sdp),n.pc.setLocalDescription(e),n.emit("offer",e),r&&r(null,e)},function(e){n.emit("error",e),r&&r(e)},i)},n.prototype.answerAudioOnly=function(e,t){var n={mandatory:{OfferToReceiveAudio:!0,OfferToReceiveVideo:!1}};this._answer(e,n,t)},n.prototype.answerBroadcastOnly=function(e,t){var n={mandatory:{OfferToReceiveAudio:!1,OfferToReceiveVideo:!1}};this._answer(e,n,t)},n.prototype.answer=function(e,t,n){var o=3===arguments.length,i=o?n:t,r=o?t:{mandatory:{OfferToReceiveAudio:!0,OfferToReceiveVideo:!0}};this._answer(e,r,i)},n.prototype.handleAnswer=function(e){this.pc.setRemoteDescription(new i.SessionDescription(e))},n.prototype.close=function(){this.pc.close(),this.emit("close")},n.prototype._answer=function(e,t,n){var o=this;this.pc.setRemoteDescription(new i.SessionDescription(e)),this.pc.createAnswer(function(e){e.sdp=o._applySdpHack(e.sdp),o.pc.setLocalDescription(e),o.emit("answer",e),n&&n(null,e)},function(e){o.emit("error",e),n&&n(e)},t)},n.prototype._onIce=function(e){e.candidate?this.emit("ice",e.candidate):this.emit("endOfCandidates")},n.prototype._onDataChannel=function(e){this.emit("addChannel",e.channel)},n.prototype._onAddStream=function(e){this.remoteStream=e.stream,this.emit("addStream",e)},n.prototype._applySdpHack=function(e){if(!this.config.sdpHack)return e;var t=e.split("b=AS:30");return 2===t.length?t[0]+"b=AS:102400"+t[1]:e},n.prototype.createDataChannel=function(e,t){t||(t={});var n,o,r=!!t.reliable,s=t.protocol||"text/plain",a=!(!t.negotiated&&!t.preset);return"moz"===i.prefix?(n=r?{protocol:s,preset:a,stream:e}:{},o=this.pc.createDataChannel(e,n),o.binaryType="blob"):(n=r?{reliable:!0}:{reliable:!1},o=this.pc.createDataChannel(e,n)),o
},t.exports=n},{webrtcsupport:4,wildemitter:3}],13:[function(e,t){function n(e,t){var n=-1/0;e.getFloatFrequencyData(t);for(var o=0,i=t.length;i>o;o++)t[o]>n&&t[o]<0&&(n=t[o]);return n}var o=e("wildemitter");t.exports=function(e,t){var i=new o;if(!window.webkitAudioContext)return i;var r,s,a,t=t||{},c=t.smoothing||.5,p=t.interval||100,u=t.threshold,h=t.play,l=new webkitAudioContext;a=l.createAnalyser(),a.fftSize=512,a.smoothingTimeConstant=c,s=new Float32Array(a.fftSize),e.jquery&&(e=e[0]),e instanceof HTMLAudioElement?(r=l.createMediaElementSource(e),"undefined"==typeof h&&(h=!0),u=u||-65):(r=l.createMediaStreamSource(e),u=u||-45),r.connect(a),h&&a.connect(l.destination),i.speaking=!1,i.setThreshold=function(e){u=e},i.setInterval=function(e){p=e};var d=function(){setTimeout(function(){var e=n(a,s);i.emit("volume_change",e,u),e>u?i.speaking||(i.speaking=!0,i.emit("speaking")):i.speaking&&(i.speaking=!1,i.emit("stopped_speaking")),d()},p)};return d(),i}},{wildemitter:3}],12:[function(e,t){function n(e){if(this.support=o.webAudio&&o.mediaStream,this.gain=1,this.support){var t=this.context=new o.AudioContext;this.microphone=t.createMediaStreamSource(e),this.gainFilter=t.createGain(),this.destination=t.createMediaStreamDestination(),this.outputStream=this.destination.stream,this.microphone.connect(this.gainFilter),this.gainFilter.connect(this.destination),e.removeTrack(e.getAudioTracks()[0]),e.addTrack(this.outputStream.getAudioTracks()[0])}this.stream=e}var o=e("webrtcsupport");n.prototype.setGain=function(e){this.support&&(this.gainFilter.gain.value=e,this.gain=e)},n.prototype.getGain=function(){return this.gain},n.prototype.off=function(){return this.setGain(0)},n.prototype.on=function(){this.setGain(1)},t.exports=n},{webrtcsupport:4}]},{},[1])(1)});var io="undefined"==typeof module?{}:module.exports;!function(){!function(e,t){var n=e;n.version="0.9.11",n.protocol=1,n.transports=[],n.j=[],n.sockets={},n.connect=function(e,o){var i,r,s=n.util.parseUri(e);t&&t.location&&(s.protocol=s.protocol||t.location.protocol.slice(0,-1),s.host=s.host||(t.document?t.document.domain:t.location.hostname),s.port=s.port||t.location.port),i=n.util.uniqueUri(s);var a={host:s.host,secure:"https"==s.protocol,port:s.port||("https"==s.protocol?443:80),query:s.query||""};return n.util.merge(a,o),(a["force new connection"]||!n.sockets[i])&&(r=new n.Socket(a)),!a["force new connection"]&&r&&(n.sockets[i]=r),r=r||n.sockets[i],r.of(s.path.length>1?s.path:"")}}("object"==typeof module?module.exports:this.io={},this),function(e,t){var n=e.util={},o=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,i=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];n.parseUri=function(e){for(var t=o.exec(e||""),n={},r=14;r--;)n[i[r]]=t[r]||"";return n},n.uniqueUri=function(e){var n=e.protocol,o=e.host,i=e.port;return"document"in t?(o=o||document.domain,i=i||("https"==n&&"https:"!==document.location.protocol?443:document.location.port)):(o=o||"localhost",i||"https"!=n||(i=443)),(n||"http")+"://"+o+":"+(i||80)},n.query=function(e,t){var o=n.chunkQuery(e||""),i=[];n.merge(o,n.chunkQuery(t||""));for(var r in o)o.hasOwnProperty(r)&&i.push(r+"="+o[r]);return i.length?"?"+i.join("&"):""},n.chunkQuery=function(e){for(var t,n={},o=e.split("&"),i=0,r=o.length;r>i;++i)t=o[i].split("="),t[0]&&(n[t[0]]=t[1]);return n};var r=!1;n.load=function(e){return"document"in t&&"complete"===document.readyState||r?e():(n.on(t,"load",e,!1),void 0)},n.on=function(e,t,n,o){e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener&&e.addEventListener(t,n,o)},n.request=function(e){if(e&&"undefined"!=typeof XDomainRequest&&!n.ua.hasCORS)return new XDomainRequest;if("undefined"!=typeof XMLHttpRequest&&(!e||n.ua.hasCORS))return new XMLHttpRequest;if(!e)try{return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}return null},"undefined"!=typeof window&&n.load(function(){r=!0}),n.defer=function(e){return n.ua.webkit&&"undefined"==typeof importScripts?(n.load(function(){setTimeout(e,100)}),void 0):e()},n.merge=function(e,t,o,i){var r,s=i||[],a="undefined"==typeof o?2:o;for(r in t)t.hasOwnProperty(r)&&n.indexOf(s,r)<0&&("object"==typeof e[r]&&a?n.merge(e[r],t[r],a-1,s):(e[r]=t[r],s.push(t[r])));return e},n.mixin=function(e,t){n.merge(e.prototype,t.prototype)},n.inherit=function(e,t){function n(){}n.prototype=t.prototype,e.prototype=new n},n.isArray=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},n.intersect=function(e,t){for(var o=[],i=e.length>t.length?e:t,r=e.length>t.length?t:e,s=0,a=r.length;a>s;s++)~n.indexOf(i,r[s])&&o.push(r[s]);return o},n.indexOf=function(e,t,n){for(var o=e.length,n=0>n?0>n+o?0:n+o:n||0;o>n&&e[n]!==t;n++);return n>=o?-1:n},n.toArray=function(e){for(var t=[],n=0,o=e.length;o>n;n++)t.push(e[n]);return t},n.ua={},n.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&function(){try{var e=new XMLHttpRequest}catch(t){return!1}return void 0!=e.withCredentials}(),n.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent),n.ua.iDevice="undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)}("undefined"!=typeof io?io:module.exports,this),function(e,t){function n(){}e.EventEmitter=n,n.prototype.on=function(e,n){return this.$events||(this.$events={}),this.$events[e]?t.util.isArray(this.$events[e])?this.$events[e].push(n):this.$events[e]=[this.$events[e],n]:this.$events[e]=n,this},n.prototype.addListener=n.prototype.on,n.prototype.once=function(e,t){function n(){o.removeListener(e,n),t.apply(this,arguments)}var o=this;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,n){if(this.$events&&this.$events[e]){var o=this.$events[e];if(t.util.isArray(o)){for(var i=-1,r=0,s=o.length;s>r;r++)if(o[r]===n||o[r].listener&&o[r].listener===n){i=r;break}if(0>i)return this;o.splice(i,1),o.length||delete this.$events[e]}else(o===n||o.listener&&o.listener===n)&&delete this.$events[e]}return this},n.prototype.removeAllListeners=function(e){return void 0===e?(this.$events={},this):(this.$events&&this.$events[e]&&(this.$events[e]=null),this)},n.prototype.listeners=function(e){return this.$events||(this.$events={}),this.$events[e]||(this.$events[e]=[]),t.util.isArray(this.$events[e])||(this.$events[e]=[this.$events[e]]),this.$events[e]},n.prototype.emit=function(e){if(!this.$events)return!1;var n=this.$events[e];if(!n)return!1;var o=Array.prototype.slice.call(arguments,1);if("function"==typeof n)n.apply(this,o);else{if(!t.util.isArray(n))return!1;for(var i=n.slice(),r=0,s=i.length;s>r;r++)i[r].apply(this,o)}return!0}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(exports,nativeJSON){"use strict";function f(e){return 10>e?"0"+e:e}function date(e){return isFinite(e.valueOf())?e.getUTCFullYear()+"-"+f(e.getUTCMonth()+1)+"-"+f(e.getUTCDate())+"T"+f(e.getUTCHours())+":"+f(e.getUTCMinutes())+":"+f(e.getUTCSeconds())+"Z":null}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,o,i,r,s,a=gap,c=t[e];switch(c instanceof Date&&(c=date(e)),"function"==typeof rep&&(c=rep.call(t,e,c)),typeof c){case"string":return quote(c);case"number":return isFinite(c)?String(c):"null";case"boolean":case"null":return String(c);case"object":if(!c)return"null";if(gap+=indent,s=[],"[object Array]"===Object.prototype.toString.apply(c)){for(r=c.length,n=0;r>n;n+=1)s[n]=str(n,c)||"null";return i=0===s.length?"[]":gap?"[\n"+gap+s.join(",\n"+gap)+"\n"+a+"]":"["+s.join(",")+"]",gap=a,i}if(rep&&"object"==typeof rep)for(r=rep.length,n=0;r>n;n+=1)"string"==typeof rep[n]&&(o=rep[n],i=str(o,c),i&&s.push(quote(o)+(gap?": ":":")+i));else for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(i=str(o,c),i&&s.push(quote(o)+(gap?": ":":")+i));return i=0===s.length?"{}":gap?"{\n"+gap+s.join(",\n"+gap)+"\n"+a+"}":"{"+s.join(",")+"}",gap=a,i}}if(nativeJSON&&nativeJSON.parse)return exports.JSON={parse:nativeJSON.parse,stringify:nativeJSON.stringify};var JSON=exports.JSON={},cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;JSON.stringify=function(e,t,n){var o;if(gap="",indent="","number"==typeof n)for(o=0;n>o;o+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})},JSON.parse=function(text,reviver){function walk(e,t){var n,o,i=e[t];if(i&&"object"==typeof i)for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=walk(i,n),void 0!==o?i[n]=o:delete i[n]);return reviver.call(e,t,i)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof JSON?JSON:void 0),function(e,t){var n=e.parser={},o=n.packets=["disconnect","connect","heartbeat","message","json","event","ack","error","noop"],i=n.reasons=["transport not supported","client not handshaken","unauthorized"],r=n.advice=["reconnect"],s=t.JSON,a=t.util.indexOf;n.encodePacket=function(e){var t=a(o,e.type),n=e.id||"",c=e.endpoint||"",p=e.ack,u=null;switch(e.type){case"error":var h=e.reason?a(i,e.reason):"",l=e.advice?a(r,e.advice):"";(""!==h||""!==l)&&(u=h+(""!==l?"+"+l:""));break;case"message":""!==e.data&&(u=e.data);break;case"event":var d={name:e.name};e.args&&e.args.length&&(d.args=e.args),u=s.stringify(d);break;case"json":u=s.stringify(e.data);break;case"connect":e.qs&&(u=e.qs);break;case"ack":u=e.ackId+(e.args&&e.args.length?"+"+s.stringify(e.args):"")}var f=[t,n+("data"==p?"+":""),c];return null!==u&&void 0!==u&&f.push(u),f.join(":")},n.encodePayload=function(e){var t="";if(1==e.length)return e[0];for(var n=0,o=e.length;o>n;n++){var i=e[n];t+="�"+i.length+"�"+e[n]}return t};var c=/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;n.decodePacket=function(e){var t=e.match(c);if(!t)return{};var n=t[2]||"",e=t[5]||"",a={type:o[t[1]],endpoint:t[4]||""};switch(n&&(a.id=n,a.ack=t[3]?"data":!0),a.type){case"error":var t=e.split("+");a.reason=i[t[0]]||"",a.advice=r[t[1]]||"";break;case"message":a.data=e||"";break;case"event":try{var p=s.parse(e);a.name=p.name,a.args=p.args}catch(u){}a.args=a.args||[];break;case"json":try{a.data=s.parse(e)}catch(u){}break;case"connect":a.qs=e||"";break;case"ack":var t=e.match(/^([0-9]+)(\+)?(.*)/);if(t&&(a.ackId=t[1],a.args=[],t[3]))try{a.args=t[3]?s.parse(t[3]):[]}catch(u){}break;case"disconnect":case"heartbeat":}return a},n.decodePayload=function(e){if("�"==e.charAt(0)){for(var t=[],o=1,i="";o<e.length;o++)"�"==e.charAt(o)?(t.push(n.decodePacket(e.substr(o+1).substr(0,i))),o+=Number(i)+1,i=""):i+=e.charAt(o);return t}return[n.decodePacket(e)]}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(e,t){function n(e,t){this.socket=e,this.sessid=t}e.Transport=n,t.util.mixin(n,t.EventEmitter),n.prototype.heartbeats=function(){return!0},n.prototype.onData=function(e){if(this.clearCloseTimeout(),(this.socket.connected||this.socket.connecting||this.socket.reconnecting)&&this.setCloseTimeout(),""!==e){var n=t.parser.decodePayload(e);if(n&&n.length)for(var o=0,i=n.length;i>o;o++)this.onPacket(n[o])}return this},n.prototype.onPacket=function(e){return this.socket.setHeartbeatTimeout(),"heartbeat"==e.type?this.onHeartbeat():("connect"==e.type&&""==e.endpoint&&this.onConnect(),"error"==e.type&&"reconnect"==e.advice&&(this.isOpen=!1),this.socket.onPacket(e),this)},n.prototype.setCloseTimeout=function(){if(!this.closeTimeout){var e=this;this.closeTimeout=setTimeout(function(){e.onDisconnect()},this.socket.closeTimeout)}},n.prototype.onDisconnect=function(){return this.isOpen&&this.close(),this.clearTimeouts(),this.socket.onDisconnect(),this},n.prototype.onConnect=function(){return this.socket.onConnect(),this},n.prototype.clearCloseTimeout=function(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null)},n.prototype.clearTimeouts=function(){this.clearCloseTimeout(),this.reopenTimeout&&clearTimeout(this.reopenTimeout)},n.prototype.packet=function(e){this.send(t.parser.encodePacket(e))},n.prototype.onHeartbeat=function(){this.packet({type:"heartbeat"})},n.prototype.onOpen=function(){this.isOpen=!0,this.clearCloseTimeout(),this.socket.onOpen()},n.prototype.onClose=function(){this.isOpen=!1,this.socket.onClose(),this.onDisconnect()},n.prototype.prepareUrl=function(){var e=this.socket.options;return this.scheme()+"://"+e.host+":"+e.port+"/"+e.resource+"/"+t.protocol+"/"+this.name+"/"+this.sessid},n.prototype.ready=function(e,t){t.call(this)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(e,t,n){function o(e){if(this.options={port:80,secure:!1,document:"document"in n?document:!1,resource:"socket.io",transports:t.transports,"connect timeout":1e4,"try multiple transports":!0,reconnect:!0,"reconnection delay":500,"reconnection limit":1/0,"reopen delay":3e3,"max reconnection attempts":10,"sync disconnect on unload":!1,"auto connect":!0,"flash policy port":10843,manualFlush:!1},t.util.merge(this.options,e),this.connected=!1,this.open=!1,this.connecting=!1,this.reconnecting=!1,this.namespaces={},this.buffer=[],this.doBuffer=!1,this.options["sync disconnect on unload"]&&(!this.isXDomain()||t.util.ua.hasCORS)){var o=this;t.util.on(n,"beforeunload",function(){o.disconnectSync()},!1)}this.options["auto connect"]&&this.connect()}function i(){}e.Socket=o,t.util.mixin(o,t.EventEmitter),o.prototype.of=function(e){return this.namespaces[e]||(this.namespaces[e]=new t.SocketNamespace(this,e),""!==e&&this.namespaces[e].packet({type:"connect"})),this.namespaces[e]},o.prototype.publish=function(){this.emit.apply(this,arguments);var e;for(var t in this.namespaces)this.namespaces.hasOwnProperty(t)&&(e=this.of(t),e.$emit.apply(e,arguments))},o.prototype.handshake=function(e){function n(t){t instanceof Error?(o.connecting=!1,o.onError(t.message)):e.apply(null,t.split(":"))}var o=this,r=this.options,s=["http"+(r.secure?"s":"")+":/",r.host+":"+r.port,r.resource,t.protocol,t.util.query(this.options.query,"t="+ +new Date)].join("/");if(this.isXDomain()&&!t.util.ua.hasCORS){var a=document.getElementsByTagName("script")[0],c=document.createElement("script");c.src=s+"&jsonp="+t.j.length,a.parentNode.insertBefore(c,a),t.j.push(function(e){n(e),c.parentNode.removeChild(c)})}else{var p=t.util.request();p.open("GET",s,!0),this.isXDomain()&&(p.withCredentials=!0),p.onreadystatechange=function(){4==p.readyState&&(p.onreadystatechange=i,200==p.status?n(p.responseText):403==p.status?o.onError(p.responseText):(o.connecting=!1,!o.reconnecting&&o.onError(p.responseText)))},p.send(null)}},o.prototype.getTransport=function(e){for(var n,o=e||this.transports,i=0;n=o[i];i++)if(t.Transport[n]&&t.Transport[n].check(this)&&(!this.isXDomain()||t.Transport[n].xdomainCheck(this)))return new t.Transport[n](this,this.sessionid);return null},o.prototype.connect=function(e){if(this.connecting)return this;var n=this;return n.connecting=!0,this.handshake(function(o,i,r,s){function a(e){return n.transport&&n.transport.clearTimeouts(),n.transport=n.getTransport(e),n.transport?(n.transport.ready(n,function(){n.connecting=!0,n.publish("connecting",n.transport.name),n.transport.open(),n.options["connect timeout"]&&(n.connectTimeoutTimer=setTimeout(function(){if(!n.connected&&(n.connecting=!1,n.options["try multiple transports"])){for(var e=n.transports;e.length>0&&e.splice(0,1)[0]!=n.transport.name;);e.length?a(e):n.publish("connect_failed")}},n.options["connect timeout"]))}),void 0):n.publish("connect_failed")}n.sessionid=o,n.closeTimeout=1e3*r,n.heartbeatTimeout=1e3*i,n.transports||(n.transports=n.origTransports=s?t.util.intersect(s.split(","),n.options.transports):n.options.transports),n.setHeartbeatTimeout(),a(n.transports),n.once("connect",function(){clearTimeout(n.connectTimeoutTimer),e&&"function"==typeof e&&e()})}),this},o.prototype.setHeartbeatTimeout=function(){if(clearTimeout(this.heartbeatTimeoutTimer),!this.transport||this.transport.heartbeats()){var e=this;this.heartbeatTimeoutTimer=setTimeout(function(){e.transport.onClose()},this.heartbeatTimeout)}},o.prototype.packet=function(e){return this.connected&&!this.doBuffer?this.transport.packet(e):this.buffer.push(e),this},o.prototype.setBuffer=function(e){this.doBuffer=e,!e&&this.connected&&this.buffer.length&&(this.options.manualFlush||this.flushBuffer())},o.prototype.flushBuffer=function(){this.transport.payload(this.buffer),this.buffer=[]},o.prototype.disconnect=function(){return(this.connected||this.connecting)&&(this.open&&this.of("").packet({type:"disconnect"}),this.onDisconnect("booted")),this},o.prototype.disconnectSync=function(){var e=t.util.request(),n=["http"+(this.options.secure?"s":"")+":/",this.options.host+":"+this.options.port,this.options.resource,t.protocol,"",this.sessionid].join("/")+"/?disconnect=1";e.open("GET",n,!1),e.send(null),this.onDisconnect("booted")},o.prototype.isXDomain=function(){var e=n.location.port||("https:"==n.location.protocol?443:80);return this.options.host!==n.location.hostname||this.options.port!=e},o.prototype.onConnect=function(){this.connected||(this.connected=!0,this.connecting=!1,this.doBuffer||this.setBuffer(!1),this.emit("connect"))},o.prototype.onOpen=function(){this.open=!0},o.prototype.onClose=function(){this.open=!1,clearTimeout(this.heartbeatTimeoutTimer)},o.prototype.onPacket=function(e){this.of(e.endpoint).onPacket(e)},o.prototype.onError=function(e){e&&e.advice&&"reconnect"===e.advice&&(this.connected||this.connecting)&&(this.disconnect(),this.options.reconnect&&this.reconnect()),this.publish("error",e&&e.reason?e.reason:e)},o.prototype.onDisconnect=function(e){var t=this.connected,n=this.connecting;this.connected=!1,this.connecting=!1,this.open=!1,(t||n)&&(this.transport.close(),this.transport.clearTimeouts(),t&&(this.publish("disconnect",e),"booted"!=e&&this.options.reconnect&&!this.reconnecting&&this.reconnect()))},o.prototype.reconnect=function(){function e(){if(n.connected){for(var e in n.namespaces)n.namespaces.hasOwnProperty(e)&&""!==e&&n.namespaces[e].packet({type:"connect"});n.publish("reconnect",n.transport.name,n.reconnectionAttempts)}clearTimeout(n.reconnectionTimer),n.removeListener("connect_failed",t),n.removeListener("connect",t),n.reconnecting=!1,delete n.reconnectionAttempts,delete n.reconnectionDelay,delete n.reconnectionTimer,delete n.redoTransports,n.options["try multiple transports"]=i}function t(){return n.reconnecting?n.connected?e():n.connecting&&n.reconnecting?n.reconnectionTimer=setTimeout(t,1e3):(n.reconnectionAttempts++>=o?n.redoTransports?(n.publish("reconnect_failed"),e()):(n.on("connect_failed",t),n.options["try multiple transports"]=!0,n.transports=n.origTransports,n.transport=n.getTransport(),n.redoTransports=!0,n.connect()):(n.reconnectionDelay<r&&(n.reconnectionDelay*=2),n.connect(),n.publish("reconnecting",n.reconnectionDelay,n.reconnectionAttempts),n.reconnectionTimer=setTimeout(t,n.reconnectionDelay)),void 0):void 0}this.reconnecting=!0,this.reconnectionAttempts=0,this.reconnectionDelay=this.options["reconnection delay"];var n=this,o=this.options["max reconnection attempts"],i=this.options["try multiple transports"],r=this.options["reconnection limit"];this.options["try multiple transports"]=!1,this.reconnectionTimer=setTimeout(t,this.reconnectionDelay),this.on("connect",t)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(e,t){function n(e,t){this.socket=e,this.name=t||"",this.flags={},this.json=new o(this,"json"),this.ackPackets=0,this.acks={}}function o(e,t){this.namespace=e,this.name=t}e.SocketNamespace=n,t.util.mixin(n,t.EventEmitter),n.prototype.$emit=t.EventEmitter.prototype.emit,n.prototype.of=function(){return this.socket.of.apply(this.socket,arguments)},n.prototype.packet=function(e){return e.endpoint=this.name,this.socket.packet(e),this.flags={},this},n.prototype.send=function(e,t){var n={type:this.flags.json?"json":"message",data:e};return"function"==typeof t&&(n.id=++this.ackPackets,n.ack=!0,this.acks[n.id]=t),this.packet(n)},n.prototype.emit=function(e){var t=Array.prototype.slice.call(arguments,1),n=t[t.length-1],o={type:"event",name:e};return"function"==typeof n&&(o.id=++this.ackPackets,o.ack="data",this.acks[o.id]=n,t=t.slice(0,t.length-1)),o.args=t,this.packet(o)},n.prototype.disconnect=function(){return""===this.name?this.socket.disconnect():(this.packet({type:"disconnect"}),this.$emit("disconnect")),this},n.prototype.onPacket=function(e){function n(){o.packet({type:"ack",args:t.util.toArray(arguments),ackId:e.id})}var o=this;switch(e.type){case"connect":this.$emit("connect");break;case"disconnect":""===this.name?this.socket.onDisconnect(e.reason||"booted"):this.$emit("disconnect",e.reason);break;case"message":case"json":var i=["message",e.data];"data"==e.ack?i.push(n):e.ack&&this.packet({type:"ack",ackId:e.id}),this.$emit.apply(this,i);break;case"event":var i=[e.name].concat(e.args);"data"==e.ack&&i.push(n),this.$emit.apply(this,i);break;case"ack":this.acks[e.ackId]&&(this.acks[e.ackId].apply(this,e.args),delete this.acks[e.ackId]);break;case"error":e.advice?this.socket.onError(e):"unauthorized"==e.reason?this.$emit("connect_failed",e.reason):this.$emit("error",e.reason)}},o.prototype.send=function(){this.namespace.flags[this.name]=!0,this.namespace.send.apply(this.namespace,arguments)},o.prototype.emit=function(){this.namespace.flags[this.name]=!0,this.namespace.emit.apply(this.namespace,arguments)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(e,t,n){function o(){t.Transport.apply(this,arguments)}e.websocket=o,t.util.inherit(o,t.Transport),o.prototype.name="websocket",o.prototype.open=function(){var e,o=t.util.query(this.socket.options.query),i=this;return e||(e=n.MozWebSocket||n.WebSocket),this.websocket=new e(this.prepareUrl()+o),this.websocket.onopen=function(){i.onOpen(),i.socket.setBuffer(!1)},this.websocket.onmessage=function(e){i.onData(e.data)},this.websocket.onclose=function(){i.onClose(),i.socket.setBuffer(!0)},this.websocket.onerror=function(e){i.onError(e)},this},o.prototype.send=t.util.ua.iDevice?function(e){var t=this;return setTimeout(function(){t.websocket.send(e)},0),this}:function(e){return this.websocket.send(e),this},o.prototype.payload=function(e){for(var t=0,n=e.length;n>t;t++)this.packet(e[t]);return this},o.prototype.close=function(){return this.websocket.close(),this},o.prototype.onError=function(e){this.socket.onError(e)},o.prototype.scheme=function(){return this.socket.options.secure?"wss":"ws"},o.check=function(){return"WebSocket"in n&&!("__addTask"in WebSocket)||"MozWebSocket"in n},o.xdomainCheck=function(){return!0},t.transports.push("websocket")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(e,t,n){function o(e){e&&(t.Transport.apply(this,arguments),this.sendBuffer=[])}function i(){}e.XHR=o,t.util.inherit(o,t.Transport),o.prototype.open=function(){return this.socket.setBuffer(!1),this.onOpen(),this.get(),this.setCloseTimeout(),this},o.prototype.payload=function(e){for(var n=[],o=0,i=e.length;i>o;o++)n.push(t.parser.encodePacket(e[o]));this.send(t.parser.encodePayload(n))},o.prototype.send=function(e){return this.post(e),this},o.prototype.post=function(e){function t(){4==this.readyState&&(this.onreadystatechange=i,r.posting=!1,200==this.status?r.socket.setBuffer(!1):r.onClose())}function o(){this.onload=i,r.socket.setBuffer(!1)}var r=this;this.socket.setBuffer(!0),this.sendXHR=this.request("POST"),n.XDomainRequest&&this.sendXHR instanceof XDomainRequest?this.sendXHR.onload=this.sendXHR.onerror=o:this.sendXHR.onreadystatechange=t,this.sendXHR.send(e)},o.prototype.close=function(){return this.onClose(),this},o.prototype.request=function(e){var n=t.util.request(this.socket.isXDomain()),o=t.util.query(this.socket.options.query,"t="+ +new Date);if(n.open(e||"GET",this.prepareUrl()+o,!0),"POST"==e)try{n.setRequestHeader?n.setRequestHeader("Content-type","text/plain;charset=UTF-8"):n.contentType="text/plain"}catch(i){}return n},o.prototype.scheme=function(){return this.socket.options.secure?"https":"http"},o.check=function(e,o){try{var i=t.util.request(o),r=n.XDomainRequest&&i instanceof XDomainRequest,s=e&&e.options&&e.options.secure?"https:":"http:",a=n.location&&s!=n.location.protocol;if(i&&(!r||!a))return!0}catch(c){}return!1},o.xdomainCheck=function(e){return o.check(e,!0)}}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(e,t){function n(){t.Transport.XHR.apply(this,arguments)}e.htmlfile=n,t.util.inherit(n,t.Transport.XHR),n.prototype.name="htmlfile",n.prototype.get=function(){this.doc=new(window[["Active"].concat("Object").join("X")])("htmlfile"),this.doc.open(),this.doc.write("<html></html>"),this.doc.close(),this.doc.parentWindow.s=this;var e=this.doc.createElement("div");e.className="socketio",this.doc.body.appendChild(e),this.iframe=this.doc.createElement("iframe"),e.appendChild(this.iframe);var n=this,o=t.util.query(this.socket.options.query,"t="+ +new Date);this.iframe.src=this.prepareUrl()+o,t.util.on(window,"unload",function(){n.destroy()})},n.prototype._=function(e,t){this.onData(e);try{var n=t.getElementsByTagName("script")[0];n.parentNode.removeChild(n)}catch(o){}},n.prototype.destroy=function(){if(this.iframe){try{this.iframe.src="about:blank"}catch(e){}this.doc=null,this.iframe.parentNode.removeChild(this.iframe),this.iframe=null,CollectGarbage()}},n.prototype.close=function(){return this.destroy(),t.Transport.XHR.prototype.close.call(this)},n.check=function(e){if("undefined"!=typeof window&&["Active"].concat("Object").join("X")in window)try{var n=new(window[["Active"].concat("Object").join("X")])("htmlfile");return n&&t.Transport.XHR.check(e)}catch(o){}return!1},n.xdomainCheck=function(){return!1},t.transports.push("htmlfile")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(e,t,n){function o(){t.Transport.XHR.apply(this,arguments)}function i(){}e["xhr-polling"]=o,t.util.inherit(o,t.Transport.XHR),t.util.merge(o,t.Transport.XHR),o.prototype.name="xhr-polling",o.prototype.heartbeats=function(){return!1},o.prototype.open=function(){var e=this;return t.Transport.XHR.prototype.open.call(e),!1},o.prototype.get=function(){function e(){4==this.readyState&&(this.onreadystatechange=i,200==this.status?(r.onData(this.responseText),r.get()):r.onClose())}function t(){this.onload=i,this.onerror=i,r.retryCounter=1,r.onData(this.responseText),r.get()}function o(){r.retryCounter++,!r.retryCounter||r.retryCounter>3?r.onClose():r.get()}if(this.isOpen){var r=this;this.xhr=this.request(),n.XDomainRequest&&this.xhr instanceof XDomainRequest?(this.xhr.onload=t,this.xhr.onerror=o):this.xhr.onreadystatechange=e,this.xhr.send(null)}},o.prototype.onClose=function(){if(t.Transport.XHR.prototype.onClose.call(this),this.xhr){this.xhr.onreadystatechange=this.xhr.onload=this.xhr.onerror=i;try{this.xhr.abort()}catch(e){}this.xhr=null}},o.prototype.ready=function(e,n){var o=this;t.util.defer(function(){n.call(o)})},t.transports.push("xhr-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(e,t,n){function o(){t.Transport["xhr-polling"].apply(this,arguments),this.index=t.j.length;var e=this;t.j.push(function(t){e._(t)})}var i=n.document&&"MozAppearance"in n.document.documentElement.style;e["jsonp-polling"]=o,t.util.inherit(o,t.Transport["xhr-polling"]),o.prototype.name="jsonp-polling",o.prototype.post=function(e){function n(){o(),i.socket.setBuffer(!1)}function o(){i.iframe&&i.form.removeChild(i.iframe);try{s=document.createElement('<iframe name="'+i.iframeId+'">')}catch(e){s=document.createElement("iframe"),s.name=i.iframeId}s.id=i.iframeId,i.form.appendChild(s),i.iframe=s}var i=this,r=t.util.query(this.socket.options.query,"t="+ +new Date+"&i="+this.index);if(!this.form){var s,a=document.createElement("form"),c=document.createElement("textarea"),p=this.iframeId="socketio_iframe_"+this.index;a.className="socketio",a.style.position="absolute",a.style.top="0px",a.style.left="0px",a.style.display="none",a.target=p,a.method="POST",a.setAttribute("accept-charset","utf-8"),c.name="d",a.appendChild(c),document.body.appendChild(a),this.form=a,this.area=c}this.form.action=this.prepareUrl()+r,o(),this.area.value=t.JSON.stringify(e);try{this.form.submit()}catch(u){}this.iframe.attachEvent?s.onreadystatechange=function(){"complete"==i.iframe.readyState&&n()}:this.iframe.onload=n,this.socket.setBuffer(!0)},o.prototype.get=function(){var e=this,n=document.createElement("script"),o=t.util.query(this.socket.options.query,"t="+ +new Date+"&i="+this.index);this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),n.async=!0,n.src=this.prepareUrl()+o,n.onerror=function(){e.onClose()};var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r),this.script=n,i&&setTimeout(function(){var e=document.createElement("iframe");document.body.appendChild(e),document.body.removeChild(e)},100)},o.prototype._=function(e){return this.onData(e),this.isOpen&&this.get(),this},o.prototype.ready=function(e,n){var o=this;return i?(t.util.load(function(){n.call(o)}),void 0):n.call(this)},o.check=function(){return"document"in n},o.xdomainCheck=function(){return!0},t.transports.push("jsonp-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),"function"==typeof define&&define.amd&&define([],function(){return io})}();
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//





var apiKey    = '44684852';
var sessionId = "2_MX40NDY4NDg1Mn5-VGh1IE1hciAxMyAxMDoyMzo1OCBQRFQgMjAxNH4wLjM5MTI2OTJ-";
var token     = "T1==cGFydG5lcl9pZD00NDY4NDg1MiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz00MWUwYzQ5YmI0ZGQwNjEzNzBhMWE1YWY3MTgxNGI3N2MyOWJmZWYwOnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9Ml9NWDQwTkRZNE5EZzFNbjUtVkdoMUlFMWhjaUF4TXlBeE1Eb3lNem8xT0NCUVJGUWdNakF4Tkg0d0xqTTVNVEkyT1RKLSZjcmVhdGVfdGltZT0xMzk0NzMxNDYyJm5vbmNlPTAuNzkzMjYyNjA1NjcxMTQ4MSZleHBpcmVfdGltZT0xMzk3MzIzNDM0JmNvbm5lY3Rpb25fZGF0YT0=";

// Functions that initialize fancybox CSS module

function initFancyBoxSimple(){
    $(document).ready(function() {
        $('.fancybox').fancybox({
            openEffect  : 'elastic',
			overlayShow: true,
			
			helpers: {
			        overlay: {
			            locked: false // if true (default), the content will be locked into overlay
			        }
			    }
        });
    });
}


//THIS FUNCTION INITIALIZES THE SLIDESHOW BOX
function initSlideshow(){
//SlidesJS Required: Initialize SlidesJS with a jQuery doc ready 

    $(function() {
      $('#slides').slidesjs({
		//THIS SETS THE CONTAINER SIZE FOR THE IMAGE
        width: 380,
        height: 360,
		navigation: {
          effect: "fade"
        },
        pagination: {
          effect: "fade"
        },
        play: {
          active: true,
          auto: true,
          interval: 4000,
          swap: true,
          effect: "fade"
        },
		effect: {
          fade: {
            speed: 400
          }
        }
      });
    });
  // End SlidesJS Required 
}

// Fires whenever a player has finished loading
function onPlayerReady(event) {
    event.target.playVideo();
}

// Fires when the player's state changes.
function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    if (event.data === 0) {
        $.fancybox.next();
    }
}

// The API will call this function when the page has finished downloading the JavaScript for the player API
function onYouTubePlayerAPIReady() {
    
    // Initialise the fancyBox after the DOM is loaded
    /*$(document).ready(function() {
        $(".fancybox")
            .attr('rel', 'gallery')
            .fancybox({
                openEffect  : 'none',
                closeEffect : 'none',
                nextEffect  : 'none',
                prevEffect  : 'none',
                padding     : 0,
                margin      : 50,
                beforeShow  : function() {
                    // Find the iframe ID
                    var id = $.fancybox.inner.find('iframe').attr('id');
                    
                    // Create video player object and add event listeners
                    var player = new YT.Player(id, {
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }
            });
    });
    */
}
;
