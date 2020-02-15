const generateSeats = (seat) => {
  const seats = [];
  const genNum = Math.floor(Math.random() * seat);
  seats.push(genNum);
  // eslint-disable-next-line no-plusplus
  for (let counter = 1; counter < seat; counter++) {
    let newGen = Math.floor(Math.random() * seat);
    while (seats.lastIndexOf(newGen) !== -1) {
      newGen = Math.floor((Math.random() * seat) + 1);
    }
    seats.push(newGen);
  }
  return seats;
};

module.exports = generateSeats;
