const fetch = require("node-fetch");

class SkinEmotes {
  emotes = [];
  legendary = [];
  epic = [];
  rare = [];
  uncommon = [];
  common = [];

  getEmote(index){
    if(typeof index == "string") return this.emotes.filter(skin => skin.name === index)[0];
    return this.emotes[index];
  }

  getLegendaryEmote(index){
    if(typeof index == "string") return this.legendary.filter(skin => skin.name === index)[0];
    return this.legendary[index];
  }

  getEpicEmote(index){
    if(typeof index == "string") return this.epic.filter(skin => skin.name === index)[0];
    return this.epic[index];
  }

  getRareEmote(index){
    if(typeof index == "string") return this.rare.filter(skin => skin.name === index)[0];
    return this.rare[index];
  }

  getUncommonEmote(index){
    if(typeof index == "string") return this.uncommon.filter(skin => skin.name === index)[0];
    return this.uncommon[index];
  }

  getCommonEmote(index){
    if(typeof index == "string") return this.common.filter(skin => skin.name === index)[0];
    return this.common[index];
  }
}

class Emote {
  constructor(emote){
    this.name = emote.name;
    this.description = emote.desc.replace("xxx", "");
    this.img = emote.img;
    this.icon = emote.icon;
    this.rarity = emote.rarity;
    this.acquire = emote.acquire;
    if(this.acquire == "Store"){
      this.price = Number(emote.price);
      this.currency = emote.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = emote.season;
      this.tier = emote.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new SkinEmotes();
    let static = await fetch("https://fallguys.esportinfo.gg/skins/emote").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/emote/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0];
    for(let emote of infos.skins){
      let theEmote = new Emote(emote);
      clazz.emotes.push(theEmote);
      switch(emote.rarity.toLowerCase()){
        case 'legendary':
          clazz.legendary.push(theEmote);
          break;
        case 'epic':
          clazz.epic.push(theEmote);
          break;
        case 'rare':
          clazz.rare.push(theEmote);
          break;
        case 'uncommon':
          clazz.uncommon.push(theEmote);
          break;
        case 'common':
          clazz.common.push(theEmote);
          break;
      }
    }
    return clazz
  }
}
