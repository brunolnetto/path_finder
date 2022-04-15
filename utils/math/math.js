/**
 * @abstract decimal part of a number
 * 
 * @param {Number} number
 * @return {Number}
 */
export const decimalPart = (number) => number - Math.floor(number);

/**
 * @abstract xor operator
 * 
 * @param {boolean} a
 * @param {boolean} b
 * @return {boolean}
 */
export const xor = (a, b) => {
  if (![0, 1].includes(a) || ![0, 1].includes(b)) {
    throw Error('Variables a and b must be either boolean or numbers 0/1!');
  }

  return Boolean(a * (1 - b) + b * (1 - a));
};

/**
 * @abstract transformation map of spherical to cartesian coordinates
 * 
 * @param {boolean} a
 * @param {boolean} b
 * @return {boolean}
 */
export const sphericalToCartesian = (coords, R) => {
  let prodsin = (arr) => {
    return arr.reduce((prod_, angle) => prod_*Math.sin(angle), 1)
  };
  
  const s2cRecur = (index, coords, R) => {
    let curr_coord = coords[index];
    
    return R*prodsin(coords.slice(0, index))*Math.cos(curr_coord)
  }

  let curr_coord = coords[coords.length-1];
  
  return coords
    .map(
      (coord, index) => s2cRecur(index, coords, R)
    ).concat(
      [
        R*prodsin(coords.slice(0, coords.length-1))*Math.sin(curr_coord)
      ]
    );
}