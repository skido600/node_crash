function Random() {
  return Math.floor(Math.random() * 100) + 1;
}

function celcius(ce) {
  return (ce * 9) / 5 + 32;
}
module.exports = { Random, celcius };
