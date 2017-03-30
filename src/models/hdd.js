var hdd = {
  name: "",
  tracks:512,
  setTracks: (value) => {
    hdd.tracks = Number(value);
  },
  setName: (value) => {
    hdd.name = value
  }
};

module.exports={
  hdd,
}
