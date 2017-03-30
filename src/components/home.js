
const m = require('mithril')

var Home = {
  view: () => {
    return m('div', [
      m('a', {href: '#!/load_simulation'}, 'cargar simulacion')
    ]);
  }
};

module.exports={
  Home,
}
