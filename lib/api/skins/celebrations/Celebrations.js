const fetch = require("node-fetch");

class SkinCelebrations {
  celebrations = [];
  legendary = [];
  epic = [];
  rare = [];
  uncommon = [];
  common = [];

  getCelebration(index){
    if(typeof index == "string") return this.celebrations.filter(skin => skin.name === index)[0];
    return this.celebrations[index];
  }

  getLegendaryCelebration(index){
    if(typeof index == "string") return this.legendary.filter(skin => skin.name === index)[0];
    return this.legendary[index];
  }

  getEpicCelebration(index){
    if(typeof index == "string") return this.epic.filter(skin => skin.name === index)[0];
    return this.epic[index];
  }

  getRareCelebration(index){
    if(typeof index == "string") return this.rare.filter(skin => skin.name === index)[0];
    return this.rare[index];
  }

  getUncommonCelebration(index){
    if(typeof index == "string") return this.uncommon.filter(skin => skin.name === index)[0];
    return this.uncommon[index];
  }

  getCommonCelebration(index){
    if(typeof index == "string") return this.common.filter(skin => skin.name === index)[0];
    return this.common[index];
  }
}

class Celebration {
  constructor(celebration){
    this.name = celebration.name;
    this.description = celebration.desc.replace("xxx", "");
    this.img = celebration.img;
    this.icon = celebration.icon;
    this.rarity = celebration.rarity;
    this.acquire = celebration.acquire;
    if(this.acquire == "Store"){
      this.price = Number(celebration.price);
      this.currency = celebration.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = celebration.season;
      this.tier = celebration.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new SkinCelebrations();
    let static = await fetch("https://fallguys.esportinfo.gg/skins/celebration").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/celebration/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0];
    for(let celebration of infos.skins){
      let theCelebration = new Celebration(celebration);
      clazz.celebrations.push(theCelebration);
      switch(celebration.rarity.toLowerCase()){
        case 'legendary':
          clazz.legendary.push(theCelebration);
          break;
        case 'epic':
          clazz.epic.push(theCelebration);
          break;
        case 'rare':
          clazz.rare.push(theCelebration);
          break;
        case 'uncommon':
          clazz.uncommon.push(theCelebration);
          break;
        case 'common':
          clazz.common.push(theCelebration);
          break;
      }
    }
    return clazz
  }
}
