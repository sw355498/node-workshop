let brand = "Tesla";
let model = "Model 3";
let color = "red";
let owner = "";

function showBrand() {
  return brand;
}

function showModel() {
  return model;
}
function showColor() {
  return color;
}

function setOwner(name){
    owner = name;
}

function showOwner() {
  return owner;
}


module.exports = {
  showBrand,
  showModel,
  showColor,
};