console.log('我是car2_Audi')

// let brand = 'Audi'
let owner = 'Jack'

module.exports = {
  setOwner: function (name) {
    owner = name
  },
  getOwner: function () {
    return owner
  },
}
