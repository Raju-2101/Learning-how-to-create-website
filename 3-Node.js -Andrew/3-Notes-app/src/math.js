const FTC = temp => (temp - 32) / 1.8;

const CTF = temp => temp * 1.8 + 32;

module.exports = { FTC, CTF };
