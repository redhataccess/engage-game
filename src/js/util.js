let UTIL = {};

/**
 * Lerp two values
 * @param v0
 * @param v1
 * @param t
 * @returns {number}
 */
UTIL.lerp = function UTILLerp(v0, v1, t) {
    return (1-t)*v0 + t*v1;
};