/* eslint no-bitwise: "off" */

export default function hashCode(str) {
  return [...str].reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
}
