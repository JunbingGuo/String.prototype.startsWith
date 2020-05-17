/*! https://mths.be/startswith v1.0.0 by @mathias */

'use strict';

var callBound = require('es-abstract/helpers/callBound');
var RequireObjectCoercible = require('es-abstract/2019/RequireObjectCoercible');
var ToString = require('es-abstract/2019/ToString');
var IsRegExp = require('es-abstract/2019/IsRegExp');
var ToInteger = require('es-abstract/2019/ToInteger');
var StringCharCodeAt = callBound('String.prototype.charCodeAt');

// https://tc39.es/ecma262/#sec-string.prototype.startswith
module.exports = function startsWith(searchString) {
	var O = RequireObjectCoercible(this);
	var S = ToString(O);
	if (IsRegExp(searchString)) throw TypeError();
	var searchStr = ToString(searchString);

	var pos = ToInteger(arguments.length > 1 ? arguments[1] : undefined);
	var len = S.length;
	var start = Math.min(Math.max(pos, 0), len);
	var searchLength = searchStr.length;

	// Avoid the `indexOf` call if no match is possible
	if (searchLength + start > len) return false;

	var index = -1;
	while (++index < searchLength) {
		if (StringCharCodeAt(S, start + index) != StringCharCodeAt(searchStr, index)) {
			return false;
		}
	}
	return true;
};
