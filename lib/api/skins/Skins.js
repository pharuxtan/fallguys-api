const fetch = require("node-fetch");

class Skins {
  skins = [];
  legendary = [];
  epic = [];
  rare = [];
  uncommon = [];
  common = [];

  getSkin(index){
    if(typeof index == "string") return this.skins.filter(skin => skin.name === index)[0];
    return this.skins[index];
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
  constructor(lower, upper){
    this.name = lower.name;
    this.lowerImg = lower.img;
    this.upperImg = upper.img;
    this.rarity = lower.rarity;
    this.acquire = lower.acquire;
    if(this.acquire == "Store" || this.acquire == "DLC"){
      this.price = Number(lower.price);
      this.currency = lower.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = lower.season;
      this.tier = lower.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new Skins();
    let lowerStatic = await fetch("https://fallguys.esportinfo.gg/skins/lower").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let lowerPayload = await fetch(`https://fallguys.esportinfo.gg${lowerStatic}/skins/lower/payload.js`).then(res => res.text());
    let lowerInfos = Function(`function __NUXT_JSONP__(text, result){return result};return ${lowerPayload}`)().data[0];
    let upperStatic = await fetch("https://fallguys.esportinfo.gg/skins/upper").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let upperPayload = await fetch(`https://fallguys.esportinfo.gg${upperStatic}/skins/upper/payload.js`).then(res => res.text());
    let upperInfos = Function(`function __NUXT_JSONP__(text, result){return result};return ${upperPayload}`)().data[0];
    for(let lower of lowerInfos.skins){
      let theSkin = new Skin(lower, upperInfos.skins.filter(n => n.name === lower.name)[0]);
      clazz.skins.push(theSkin);
      switch(lower.rarity.toLowerCase()){
        case 'legendary':
          clazz.legendary.push(theSkin);
          break;
        case 'epic':
          clazz.epic.push(theSkin);
          break;
        case 'rare':
          clazz.rare.push(theSkin);
          break;
        case 'uncommon':
          clazz.uncommon.push(theSkin);
          break;
        case 'common':
          clazz.common.push(theSkin);
          break;
      }
    }
    return clazz
  }
}
