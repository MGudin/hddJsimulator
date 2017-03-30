var simulation = {
  position: 0,
  direction: true,
  toggleDirection: () => {
    simulation.direction = !simulation.direction
  },
  setPosition: (position) => {
    simulation.position = Number(position)
  }
}

module.exports = {
  simulation,
}
