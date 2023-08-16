import _ from 'lodash';
import 'lodash.combinations';

import { objectFilter, objectReduce } from '../objects/objects.js';
import { raise } from '#sys/sys.js';

/**
 * @abstract returns an array of ones with length n
 *
 * @param {Integer} n
 * @return {Array} ones
 */
export const ones = (n) => Array(n).fill(1);

/**
 * @abstract returns an array of zeros with length n
 *
 * @param {Integer} n
 * @return {Array} zeros
 */
export const zeros = (n) => Array(n).fill(0);
/**
 * @abstract returns list with unique elements
 *
 * @param {Object} object
 * @param {function} reduceFn
 * @return {Object}
 */
export const unique = (lst) => [...new Set(lst)];

/**
 * @abstract returns a vector with element each between given min_val and max_val
 *
 * @param {Number} min_val
 * @return {Number} max_val
 */
export const randMinMax = (min_val, max_val) => {
  return (max_val - min_val) * Math.random() + min_val;
};

/**
 * @abstract returns a random vector between min_val and max_val
 *
 * @param {Integer} n
 * @return {Array} ones
 */
export const nRandMinMax = (n, min_val, max_val) => {
  let n_array = [];

  for (let i = 0; i < n; i += 1) {
    n_array.push(randMinMax(min_val, max_val));
  }

  return n_array;
};

/**
 * @abstract returns a vector with element each between given min_val and max_val
 *
 * @param {Integer} n
 * @return {Array} ones
 */
export const nRandMinsMaxs = (min_max_vec) => {
  let n_array = [];
  let n = min_max_vec.length;
  let message = '';

  for (let i = 0; i < n; i += 1) {
    if (min_max_vec[i].length !== 2) {
      message = 'Entry ' + String(i) +
        ' must have 2 entries. We found ' + String(min_max_vec[i].length) + '!';

      raise(message);
    }

    let min_val = min_max_vec[i][0];
    let max_val = min_max_vec[i][1];

    if (typeof min_val !== 'number' && typeof max_val !== 'number') {
      raise('Minimum and maximum values must be numbers!');
    }

    if (min_val > max_val) {
      raise('Min value must be lower than Max value!');
    }

    n_array.push(randMinMax(min_val, max_val));
  }

  return n_array;
};

/**
 * @abstract returns an array of indexes with val
 *
 * @param {Array} arr
 * @param {Number} val
 * @return {Array} indexes
 */
export const getAllIndexes = (arr, val) => {
  const indexes = [];
  let i;

  for (i = 0; i < arr.length; i += 1) {
    if (arr[i] === val) {
      indexes.push(i);
    }
  }

  return indexes;
};

/**
 * @abstract returns dictionary with number prime factors
 *
 * @param {Integer} number
 * @return {object}
 */
export const countDict = (arr) => {
  const obj = {};

  for (const i of _.range(arr.length)) {
    obj[arr[i]] = (obj[arr[i]] || 0) + 1;
  }

  return obj;
};

/**
 * @abstract returns a shifted word cyclily
 *
 * @param {Array} array
 * @param {Integer} index
 * @return {Array} shifted_array
 */
export const cyclicSort = (array, index) => {
  if (array.length < index) {
    const category = 'Error';
    const subject = `Provided index ${index}`;
    const condition = `greater than array length ${array.length}`;

    raise(`${category} : ${subject} ${condition}`);
  }

  const head = array.slice(index);
  const tail = array.slice(0, index);

  return head.concat(tail);
};

/**
 * @abstract returns true if control and treatment words are equal
 * in some sshifted way
 *
 * @param {Array} array
 * @param {Integer} index
 * @return {Array} shifted_array
 */
export const isCyclicEqual = (control_, treatment_) => {
  if (control_.length !== treatment_.length) {
    return false;
  }

  for (let i = 0; i < treatment_.length; i += 1) {
    if (_.isEqual(cyclicSort(treatment_, i), control_)) {
      return true;
    }
  }

  return false;
};

/**
 * @abstract returns a sorted array of integers. The possible types are below:
 * - 0: descending
 * - 1: ascending
 *
 * @param {Array} array
 * @param {Integer} type
 * @return {Array} sorted_array
 */
export const sort = (arr, sort_type = 0) => {
  arr.sort((a, b) => a - b);

  if (sort_type === 0) {
    arr.reverse();
  } else if (sort_type === 1) {
    // Do nothing
  } else {
    raise('Sorting types are 0 and 1 for descending and ascending order.');
  }

  return arr;
};

/**
 * @abstract returns dictionary with found sequential blobs
 *
 * @param {Array} arr
 * @return {object}
 */
export const sequentialArrayBlobs = (arr) => {
  const blobs = {};
  let counter = 0;
  let head_index = 0;

  // Sort number array in ascending order
  arr = sort(arr, 1);

  for (const index of _.range(arr.length)) {

      if (arr[index] - arr[index - 1] > 1) {
        blobs[counter] = arr.slice(head_index, index);
        head_index = index;
        counter += 1;
      }

      if (index === arr.length - 1) {
        blobs[counter] = arr.slice(head_index, index + 1);
      }

  }

  return blobs;
};

/**
 * @abstract returns true if array has provided element
 *
 * @param {Array} array
 * @param {Object} elem
 * @return {boolean} has_element
 */
export const hasElement = (arr, elem) => {
  for (let i = 0; i <= arr.length; i += 1) {
    if (_.isEqual(arr[i], elem)) {
      return true;
    }
  }

  return false;
};

/**
 * @abstract returns array with removed provided elements
 *
 * @param {Array} arr
 * @param {Object} elems
 * @return {Array} arr_without_elems
 */
export const removeElements = (arr, elems_to_del) => {
  elems_to_del.forEach((elem_to_del) => {
    arr = arr.filter((elem) => elem_to_del !== elem);
  });

  return arr;
};

/**
 * @abstract returns true if array has provided element
 *
 * @param {Array} a
 * @param {Array} b
 * @param {Array} c
 * @return {array} cartesian_product
 */
export const cartesianProduct = (a, b, ...c) => {
  const f = (a, b) => [].concat(...a.map((a) => b.map((b) => [].concat(a, b))));

  return b ? cartesianProduct(f(a, b), ...c) : a;
};

/**
 * @abstract
 *
 * @param {Array} list
 * @return {Array} unique_list
 */
export const removeArrayDuplicates = (list) => {
  const unique = [];
  list.forEach((item) => {
    let has_item = false;

    unique.forEach((unique_item) => {
      has_item = has_item || _.isEqual(item, unique_item);
    });

    if (!has_item) {
      unique.push(item);
    }
  });

  return unique;
};

export function* mSetsOfnTuples(array, m, n) {
  let arr_diff;

  if (m > Math.floor(array.length / n)) {
    raise('Size of array must be greater or equal to the product of n by m');
  } else {
    let curr_comb = [];
    for (const head_comb of _.combinations(array, n)) {
      curr_comb = [head_comb];

      if (m === 1) {
        yield curr_comb;
      } else {
        arr_diff = _.difference(array, head_comb);
        for (const tail_comb of mSetsOfnTuples(arr_diff, n, m - 1)) {
          yield curr_comb.concat(tail_comb);
        }
      }
    }
  }
}

/**
 * @abstract returns array unique values
 *
 * @param {Array} vec
 * @return {Array} arr_with_uniques
 */
export const getUniques = (vec) => Array.from(new Set(vec));

/**
 * @abstract returns upper triangular indexes
 *
 * @param {Array} vec
 * @return {Array} arr_with_uniques
 */
export function* fullPolytopeIndexesFn(length, curr_dim, dim) {
  for (const i of _.range(0, length)) {
    if (curr_dim === 1) {
      yield i;
    } else {
      for (const tail_indexes of fullPolytopeIndexesFn(
        length,
        curr_dim - 1,
        dim
      )) {
        yield [i].concat(tail_indexes);
      }
    }
  }
}

/**
 * @abstract returns upper triangular indexes
 *
 * @param {Array} vec
 * @return {Array} arr_with_uniques
 */
export function* upperTriangularIndexesFn(length, curr_dim, dim, index = 0) {
  for (const i of _.range(index, length)) {
    if (curr_dim === 1) {
      yield i;
    } else {
      for (const tail_indexes of upperTriangularIndexesFn(
        length,
        curr_dim - 1,
        dim,
        i
      )) {
        yield [i].concat(tail_indexes);
      }
    }
  }
}

/**
 * @abstract returns polytopic structure indexes from formation function
 *
 * @param {Array} vec
 * @return {Array} arr_with_uniques
 */
export function* hyperIndexes(length, dim, formationFn) {
  if (dim <= 0 || length <= 0) {
    raise('Dimension and length must be positive natural numbers!');
  }

  for (const indexes of formationFn(length, dim, dim)) {
    yield indexes;
  }
}

/**
 * @abstract returns full polytopic indexes
 *
 * @param {Array} vec
 * @return {Array} arr_with_uniques
 */
export function* fullPolytopeHyperindexes(length, dim) {
  yield* hyperIndexes(length, dim, fullPolytopeIndexesFn);
}

/**
 * @abstract returns triangular polytopic indexes
 *
 * @param {Array} vec
 * @return {Array} arr_with_uniques
 */
export function* upperTriangularHyperindexes(length, dim) {
  yield* hyperIndexes(length, dim, upperTriangularIndexesFn);
}

const SETKEY_DELIMITER = ',';

export function* eulerGenerator(sets) {
  /**
   *   @abstract returns each tuple [key, elems] of the Euler diagram
   *   systematic in a generator-wise fashion
   *   Rationale:
   *      1. Begin with the available sets and their exclusive elements;
   *      2. Compute complementary elements to current key-set;
   *      3. In case complementary set-keys AND current set content are not empty, continue;
   *      Otherwise, go to next key-set;
   *      4. Find the euler diagram on complementary sets;
   *      5. Compute exclusive combination elements;
   *      6. In case there are exclusive elements to combination:
   *      6.a Yield exclusive combination elements;
   *      6.b Remove exclusive combination elements from current key-set;
   *   @param {object} sets
   *   @return {object} keys_elems
   */
  // There are no sets
  if (
    sets.constructor !== {}.constructor &&
    sets.constructor !== [].constructor
  ) {
    throw new TypeError(
      'Ill-conditioned input. It must be either a json-like or array of arrays object!'
    );
  }

  let is_unique_set_arr = true;

  for (const value of Object.values(sets)) {
    is_unique_set_arr &= unique(value).length === value.length;
  }

  if (!is_unique_set_arr) {
    console.warn('Each array MUST NOT have duplicates');
    sets = objectReduce(
      sets,
      (result, __, key) => {
        result[key] = unique(sets[key]);
        return result;
      },
      {}
    );
  }

  if (Object.values(sets).length === 0)
    throw new TypeError('There must at least ONE set!');

  if (Object.values(sets).length === 1) yield Object.entries(sets)[0];

  const nonEmptySetsKeys = (sets_) =>
    Object.keys(sets_).filter((key) => sets_[key].length !== 0);

  const bracketStr = JSON.stringify([]);
  const nonEmptySets = (sets_) => objectFilter(sets_, (key, value) => !Object.is(String(value), bracketStr));

  let compl_sets_keys = [];
  let comb_intersec_key = '';
  let comb_intersec = [];
  let comb_excl = [];
  let compl_sets = {};

  let sets_keys = nonEmptySetsKeys(sets);

  // Traverse the combination lattice
  for (const set_key of sets_keys) {
    compl_sets_keys = _.difference(sets_keys, [set_key])
      .filter((compl_set_key) => sets[compl_set_key].length !== 0)
      .map((compl_set_key) => String(compl_set_key));

    if (compl_sets_keys.length !== 0 && sets[set_key].length !== 0) {
      compl_sets = objectReduce(
        compl_sets_keys,
        (result, __, compl_set_key) => {
          result[compl_set_key] = sets[compl_set_key];
          return result;
        },
        {}
      );

      for (const [ comb_str, celements ] of eulerGenerator(compl_sets)) {
        comb_excl = _.difference(celements, sets[set_key]);
        if (comb_excl.length !== 0) {
          // 1. Exclusive elements of group except current analysis set
          yield [comb_str, comb_excl];

          comb_str.split(SETKEY_DELIMITER).forEach((ckey) => {
            sets[ckey] = _.difference(sets[ckey], comb_excl);
          });

          sets[set_key] = _.difference(sets[set_key], comb_excl);
        }

        comb_intersec = _.intersection(celements, sets[set_key]);
        if (comb_intersec.length !== 0) {
          // 2. Intersection of analysis element and exclusive group
          comb_intersec_key = [set_key].concat(
            comb_str.split(SETKEY_DELIMITER)
          ).join(SETKEY_DELIMITER);

          yield [comb_intersec_key, comb_intersec];

          comb_str.split(SETKEY_DELIMITER).forEach((ckey) => {
            sets[ckey] = _.difference(sets[ckey], comb_intersec);
          });

          sets[set_key] = _.difference(sets[set_key], comb_intersec);
        }

        sets_keys = nonEmptySetsKeys(sets);
      }

      sets = nonEmptySets(sets);

      // 3. Set-key exclusive elements
      if (Object.keys(sets).includes(set_key)) {
        yield [String(set_key), sets[set_key]];
        sets[set_key] = [];
      }
    }
  }
}

export const euler = (sets) => Object.fromEntries([...eulerGenerator(sets)]);
