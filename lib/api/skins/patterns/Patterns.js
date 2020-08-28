const fetch = require("node-fetch");

class SkinPatterns {
  patterns = [];
  legendary = [];
  epic = [];
  rare = [];
  uncommon = [];
  common = [];

  getPattern(index){
    if(typeof index == "string") return this.patterns.filter(skin => skin.name === index)[0];
    return this.patterns[index];
  }

  getLegendaryPattern(index){
    if(typeof index == "string") return this.legendary.filter(skin => skin.name === index)[0];
    return this.legendary[index];
  }

  getEpicPattern(index){
    if(typeof index == "string") return this.epic.filter(skin => skin.name === index)[0];
    return this.epic[index];
  }

  getRarePattern(index){
    if(typeof index == "string") return this.rare.filter(skin => skin.name === index)[0];
    return this.rare[index];
  }

  getUncommonPattern(index){
    if(typeof index == "string") return this.uncommon.filter(skin => skin.name === index)[0];
    return this.uncommon[index];
  }

  getCommonPattern(index){
    if(typeof index == "string") return this.common.filter(skin => skin.name === index)[0];
    return this.common[index];
  }
}

class Pattern {
  constructor(pattern){
    this.name = pattern.name;
    this.description = pattern.desc.replace("xxx", "");
    this.img = pattern.img;
    this.icon = pattern.icon;
    this.rarity = pattern.rarity;
    this.acquire = pattern.acquire;
    if(this.acquire == "Store"){
      this.price = Number(pattern.price);
      this.currency = pattern.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = pattern.season;
      this.tier = pattern.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new SkinPatterns();
    let static = await fetch("https://fallguys.esportinfo.gg/skins/patterns").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/patterns/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0];
    for(let pattern of infos.skins){
      let thePattern = new Pattern(pattern);
      clazz.patterns.push(thePattern);
      switch(pattern.rarity.toLowerCase()){
        case 'legendary':
          clazz.legendary.push(thePattern);
          break;
        case 'epic':
          clazz.epic.push(thePattern);
          break;
        case 'rare':
          clazz.rare.push(thePattern);
          break;
        case 'uncommon':
          clazz.uncommon.push(thePattern);
          break;
        case 'common':
          clazz.common.push(thePattern);
          break;
      }
    }
    return clazz
  }
}
