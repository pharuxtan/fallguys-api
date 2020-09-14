const fetch = require("node-fetch");

class Daily {
  pcStore = [];
  ps4Store = [];

  getFirstPCItem(){
    return this.pcStore[0];
  }

  getSecondPCItem(){
    return this.pcStore[1];
  }

  getThirdPCItem(){
    return this.pcStore[2];
  }

  getFirstPS4Item(){
    return this.ps4Store[0];
  }

  getSecondPS4Item(){
    return this.ps4Store[1];
  }

  getThirdPS4Item(){
    return this.ps4Store[2];
  }
}

class Skin {
  constructor(skin){
    this.uid = skin._id
    this.name = skin.name;
    this.icon = skin.icon;
    this.rarity = skin.rarity;
    this.acquire = skin.acquire;
    if(this.acquire == "Store" || this.acquire == "DLC"){
      this.price = Number(skin.price);
      this.currency = skin.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = skin.season;
      this.tier = skin.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new Daily();
    let static = await fetch("https://fallguys.esportinfo.gg/skins").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0];
    for(let skin of infos.pcStore){
      let theSkin = new Skin(skin);
      clazz.pcStore.push(theSkin);
    }
    for(let skin of infos.ps4Store){
      let theSkin = new Skin(skin);
      clazz.ps4Store.push(theSkin);
    }
    return clazz
  }
}
