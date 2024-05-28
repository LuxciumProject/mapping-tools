/**
 * Constant `FULFILLED` is used in place of the string `'fulfilled'` to
 * ensure the type system will properly infer the "flag nature" of this
 * string rather than the more generic `string` type.
 * @public
 */
export const FULFILLED    = 'fulfilled';

/**
 * Constant `REJECTED` is used in place of the string `'rejected'` to
 * ensure the type system will properly infer the "flag nature" of this
 * string rather than the more generic `string` type.
 * @public
 */
export const REJECTED  = 'rejected';

/**
 * Constant `NULL_SYMBOL` is a unique symbol that represents `null` or a union type that includes `null`.
 * @public
 */
export const NULL_SYMBOL: unique symbol = Symbol.for('NULL_SYMBOL');

// 1st, 2nd, 3rd, 4th, 5th, ct, fi, fl, AE, ff, fi, ffi, ffl, ft, ij, ll, ffi, mm, nd, nt, oe, one_half, one_quarter, 1/2 == // www one_third, ord, rd, rs, sf, st, three_quarters, Delta, CO2, H2O, 2¹⁰, H₂SO₄, 3≤4, 5≥2, ±, @©®™

/*

*/
/*
"'aalt', 'calt', 'case', 'ccmp', 'cv01', 'cv02', 'cv03', 'cv04', 'cv05', 'cv06', 'cv07', 'cv08', 'cv09', 'cv10', 'cv11', 'cv12', 'cv13', 'cv14', 'cv15', 'cv16', 'cv17', 'cv18', 'cv19', 'dnom', 'frac', 'hwid', 'numr', 'onum', 'ordn', 'salt', 'sinf', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09', 'ss10', 'subs', 'sups', 'tnum', 'zero', 'pnum'"
 */
// "editor.fontLigatures": "aalt, calt, case, ccmp, cv01, cv02, cv03, cv04, cv05, cv06, cv07, cv08, cv09, cv10, cv11, cv12, cv13, cv14, cv15, cv16, cv17, cv18, cv19, dnom, frac, hwid, numr, onum, ordn, salt, sinf, ss01, ss02, ss03, ss04, ss05, ss06, ss07, ss08, ss09, ss10, subs, sups, tnum, zero, pnum"
