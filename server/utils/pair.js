/* eslint no-bitwise: 0 no-mixed-operators: 0 */

const pair = (ids) => {
  const [x, y] = ids.sort((a, b) => a - b);
  return y > x ? (y * y + x) : (x * x + x + y);
};

const depair = (z) => {
  const q = Math.floor(Math.sqrt(z));
  const l = z - q ** 2;

  return l < q ? [l, q] : [q, l - q];
};

module.exports = {
  pair, depair,
};
