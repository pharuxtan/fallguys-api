const fetch = require("node-fetch");

class SkinFaces {
  faces = [];
  legendary = [];
  epic = [];
  rare = [];
  uncommon = [];
  common = [];

  getFace(index){
    if(typeof index == "string") return this.faces.filter(skin => skin.name === index)[0];
    return this.faces[index];
  }

  getLegendaryFace(index){
    if(typeof index == "string") return this.legendary.filter(skin => skin.name === index)[0];
    return this.legendary[index];
  }

  getEpicFace(index){
    if(typeof index == "string") return this.epic.filter(skin => skin.name === index)[0];
    return this.epic[index];
  }

  getRareFace(index){
    if(typeof index == "string") return this.rare.filter(skin => skin.name === index)[0];
    return this.rare[index];
  }

  getUncommonFace(index){
    if(typeof index == "string") return this.uncommon.filter(skin => skin.name === index)[0];
    return this.uncommon[index];
  }

  getCommonFace(index){
    if(typeof index == "string") return this.common.filter(skin => skin.name === index)[0];
    return this.common[index];
  }
}

class Face {
  constructor(face){
    this.name = face.name;
    this.img = face.img;
    this.rarity = face.rarity;
    this.acquire = face.acquire;
    if(this.acquire == "Store" || this.acquire == "DLC"){
      this.price = Number(face.price);
      this.currency = face.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = face.season;
      this.tier = face.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new SkinFaces();
    let static = await fetch("https://fallguys.esportinfo.gg/skins/faces").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/faces/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0];
    for(let face of infos.skins){
      let theFace = new Face(face);
      clazz.faces.push(theFace);
      switch(face.rarity.toLowerCase()){
        case 'legendary':
          clazz.legendary.push(theFace);
          break;
        case 'epic':
          clazz.epic.push(theFace);
          break;
        case 'rare':
          clazz.rare.push(theFace);
          break;
        case 'uncommon':
          clazz.uncommon.push(theFace);
          break;
        case 'common':
          clazz.common.push(theFace);
          break;
      }
    }
    return clazz
  }
}
