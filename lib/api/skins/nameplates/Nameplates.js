const fetch = require("node-fetch");

class SkinNameplates {
  nameplates = [];
  legendary = [];
  epic = [];
  rare = [];
  uncommon = [];
  common = [];

  getNameplate(index){
    if(typeof index == "string") return this.nameplates.filter(skin => skin.name === index)[0];
    return this.nameplates[index];
  }

  getLegendaryNameplate(index){
    if(typeof index == "string") return this.legendary.filter(skin => skin.name === index)[0];
    return this.legendary[index];
  }

  getEpicNameplate(index){
    if(typeof index == "string") return this.epic.filter(skin => skin.name === index)[0];
    return this.epic[index];
  }

  getRareNameplate(index){
    if(typeof index == "string") return this.rare.filter(skin => skin.name === index)[0];
    return this.rare[index];
  }

  getUncommonNameplate(index){
    if(typeof index == "string") return this.uncommon.filter(skin => skin.name === index)[0];
    return this.uncommon[index];
  }

  getCommonNameplate(index){
    if(typeof index == "string") return this.common.filter(skin => skin.name === index)[0];
    return this.common[index];
  }
}

class Nameplate {
  constructor(nameplate){
    this.name = nameplate.name;
    this.img = nameplate.img;
    this.rarity = nameplate.rarity;
    this.acquire = nameplate.acquire;
    if(this.acquire == "Store" || this.acquire == "DLC"){
      this.price = Number(nameplate.price);
      this.currency = nameplate.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = nameplate.season;
      this.tier = nameplate.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new SkinNameplates();
    let static = await fetch("https://fallguys.esportinfo.gg/skins/nameplate").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/nameplate/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0];
    for(let nameplate of infos.skins){
      let theNameplate = new Nameplate(nameplate);
      clazz.nameplates.push(theNameplate);
      switch(nameplate.rarity.toLowerCase()){
        case 'legendary':
          clazz.legendary.push(theNameplate);
          break;
        case 'epic':
          clazz.epic.push(theNameplate);
          break;
        case 'rare':
          clazz.rare.push(theNameplate);
          break;
        case 'uncommon':
          clazz.uncommon.push(theNameplate);
          break;
        case 'common':
          clazz.common.push(theNameplate);
          break;
      }
    }
    return clazz
  }
}
