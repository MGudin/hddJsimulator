import {Hdd} from '../libhdd';

let hdd = {
  name: "",
  tracks:512,
  setTracks: value => {
    hdd.tracks = Number(value);
  },
  setName: (value) => {
    hdd.name = value
  },
  construct: () => {
    return new Hdd({
      tracks: hdd.tracks - 1
    })
  }
};

export default hdd;
