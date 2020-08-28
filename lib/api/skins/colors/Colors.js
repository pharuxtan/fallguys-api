const fetch = require("node-fetch");

class SkinColors {
  colors = [];
  legendary = [];
  epic = [];
  rare = [];
  uncommon = [];
  common = [];

  getColor(index){
    if(typeof index == "string") return this.colors.filter(skin => skin.name === index)[0];
    return this.colors[index];
  }

  getLegendaryColor(index){
    if(typeof index == "string") return this.legendary.filter(skin => skin.name === index)[0];
    return this.legendary[index];
  }

  getEpicColor(index){
    if(typeof index == "string") return this.epic.filter(skin => skin.name === index)[0];
    return this.epic[index];
  }

  getRareColor(index){
    if(typeof index == "string") return this.rare.filter(skin => skin.name === index)[0];
    return this.rare[index];
  }

  getUncommonColor(index){
    if(typeof index == "string") return this.uncommon.filter(skin => skin.name === index)[0];
    return this.uncommon[index];
  }

  getCommonColor(index){
    if(typeof index == "string") return this.common.filter(skin => skin.name === index)[0];
    return this.common[index];
  }
}

class Color {
  constructor(color){
    this.name = color.name;
    this.description = color.desc.replace("xxx", "");
    this.img = color.img;
    this.icon = color.icon;
    this.rarity = color.rarity;
    this.acquire = color.acquire;
    if(this.acquire == "Store"){
      this.price = Number(color.price);
      this.currency = color.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = color.season;
      this.tier = color.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new SkinColors();
    let static = await fetch("https://fallguys.esportinfo.gg/skins/colors").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/colors/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0];
    for(let color of infos.skins){
      let theColor = new Color(color);
      clazz.colors.push(theColor);
      switch(color.rarity.toLowerCase()){
        case 'legendary':
          clazz.legendary.push(theColor);
          break;
        case 'epic':
          clazz.epic.push(theColor);
          break;
        case 'rare':
          clazz.rare.push(theColor);
          break;
        case 'uncommon':
          clazz.uncommon.push(theColor);
          break;
        case 'common':
          clazz.common.push(theColor);
          break;
      }
    }
    return clazz
  }
}
