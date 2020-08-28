const fetch = require("node-fetch");

class FreeSkins {
  skins = [];
  legendary = [];
  epic = [];
  rare = [];
  uncommon = [];
  common = [];

  getSkin(index){
    if(typeof index == "string") return this.frees.filter(skin => skin.name === index)[0];
    return this.frees[index];
  }

  getLegendarySkin(index){
    if(typeof index == "string") return this.legendary.filter(skin => skin.name === index)[0];
    return this.legendary[index];
  }

  getEpicSkin(index){
    if(typeof index == "string") return this.epic.filter(skin => skin.name === index)[0];
    return this.epic[index];
  }

  getRareSkin(index){
    if(typeof index == "string") return this.rare.filter(skin => skin.name === index)[0];
    return this.rare[index];
  }

  getUncommonSkin(index){
    if(typeof index == "string") return this.uncommon.filter(skin => skin.name === index)[0];
    return this.uncommon[index];
  }

  getCommonSkin(index){
    if(typeof index == "string") return this.common.filter(skin => skin.name === index)[0];
    return this.common[index];
  }
}

class Skin {
  constructor(free){
    this.name = free.name;
    this.description = free.desc.replace("xxx", "");
    this.img = free.img;
    this.icon = free.icon;
    this.rarity = free.rarity;
    this.acquire = free.acquire;
    if(this.acquire == "Battle Pass"){
      this.season = free.season;
      this.tier = free.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new FreeSkins();
    let static = await fetch("https://fallguys.esportinfo.gg/skins/free").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/free/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0];
    for(let free of infos.legendarySkins.concat(infos.epicSkins).concat(infos.rareSkins).concat(infos.uncommonSkins).concat(infos.commonSkins)){
      let theFree = new Skin(free);
      clazz.skins.push(theFree);
      switch(free.rarity.toLowerCase()){
        case 'legendary':
          clazz.legendary.push(theFree);
          break;
        case 'epic':
          clazz.epic.push(theFree);
          break;
        case 'rare':
          clazz.rare.push(theFree);
          break;
        case 'uncommon':
          clazz.uncommon.push(theFree);
          break;
        case 'common':
          clazz.common.push(theFree);
          break;
      }
    }
    return clazz
  }
}
