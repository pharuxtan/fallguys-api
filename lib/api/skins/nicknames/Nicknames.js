const fetch = require("node-fetch");

class SkinNicknames {
  nicknames = [];
  legendary = [];
  epic = [];
  rare = [];
  uncommon = [];
  common = [];

  getNickname(index){
    if(typeof index == "string") return this.nicknames.filter(skin => skin.name === index)[0];
    return this.nicknames[index];
  }

  getLegendaryNickname(index){
    if(typeof index == "string") return this.legendary.filter(skin => skin.name === index)[0];
    return this.legendary[index];
  }

  getEpicNickname(index){
    if(typeof index == "string") return this.epic.filter(skin => skin.name === index)[0];
    return this.epic[index];
  }

  getRareNickname(index){
    if(typeof index == "string") return this.rare.filter(skin => skin.name === index)[0];
    return this.rare[index];
  }

  getUncommonNickname(index){
    if(typeof index == "string") return this.uncommon.filter(skin => skin.name === index)[0];
    return this.uncommon[index];
  }

  getCommonNickname(index){
    if(typeof index == "string") return this.common.filter(skin => skin.name === index)[0];
    return this.common[index];
  }
}

class Nickname {
  constructor(nickname){
    this.name = nickname.name;
    this.rarity = nickname.rarity;
    this.acquire = nickname.acquire;
    if(this.acquire == "Store" || this.acquire == "DLC"){
      this.price = Number(nickname.price);
      this.currency = nickname.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = nickname.season;
      this.tier = nickname.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new SkinNicknames();
    let static = await fetch("https://fallguys.esportinfo.gg/skins/nickname").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/nickname/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0];
    for(let nickname of infos.skins){
      let theNickname = new Nickname(nickname);
      clazz.nicknames.push(theNickname);
      switch(nickname.rarity.toLowerCase()){
        case 'legendary':
          clazz.legendary.push(theNickname);
          break;
        case 'epic':
          clazz.epic.push(theNickname);
          break;
        case 'rare':
          clazz.rare.push(theNickname);
          break;
        case 'uncommon':
          clazz.uncommon.push(theNickname);
          break;
        case 'common':
          clazz.common.push(theNickname);
          break;
      }
    }
    return clazz
  }
}
