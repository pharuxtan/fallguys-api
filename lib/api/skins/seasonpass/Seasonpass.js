const fetch = require("node-fetch");

class Seasonpass {
  season;
  items = [];
  colors = [];
  patterns = [];
  skins = [];
  faces = [];
  currencys = [];
  celebrations = [];
  emotes = [];
  nicknames = [];
  nameplates = [];

  getItems() { return this.items }
  getColors() { return this.colors }
  getPatterns() { return this.patterns }
  getSkins() { return this.skins }
  getFaces() { return this.faces }
  getCurrencys() { return this.currencys }
  getCelebrations() { return this.celebrations }
  getEmotes() { return this.emotes }
  getNicknames() { return this.nicknames }
  getNameplates() { return this.nameplates }
}

module.exports = {
  init: async (season) => {
    let clazz = new Seasonpass();
    clazz.season = parseInt(season);
    let static = await fetch(`https://fallguys.esportinfo.gg/skins/battle-pass/season-${season}`).then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/battle-pass/season-${season}/payload.js`).then(res => res.text());
    if(!payload.startsWith("__NUXT_JSONP__")) throw new Error("Season number is invalid");
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0].skins;
    let lowers = infos.filter(s => s.item == "Lower");
    infos = infos.filter(s => !lowers.map(s => s._id).includes(s._id));
    for(let skin of infos){
      with (clazz) {
        if(skin.item == "Color") colors.push(new Color(skin));
        if(skin.item == "Pattern") patterns.push(new Pattern(skin));
        if(skin.item == "Upper") skins.push(new Skin(lowers.find(s => s.img == skin.img.replace("Upper", "Lower")), skin));
        if(skin.item == "Face") faces.push(new Face(skin));
        if(skin.item == "Currency") currencys.push(new Currency(skin));
        if(skin.item == "Celebration") celebrations.push(new Celebration(skin));
        if(skin.item == "Emote") emotes.push(new Emote(skin));
        if(skin.item == "Nickname") nicknames.push(new Nickname(skin));
        if(skin.item == "Nameplate") nameplates.push(new Nameplate(skin));
        items = colors.map(d => {d.type = "color"; return d})
                      .concat(patterns.map(d => {d.type = "pattern"; return d}))
                      .concat(skins.map(d => {d.type = "skin"; return d}))
                      .concat(faces.map(d => {d.type = "face"; return d}))
                      .concat(currencys.map(d => {d.type = "currency"; return d}))
                      .concat(celebrations.map(d => {d.type = "celebration"; return d}))
                      .concat(emotes.map(d => {d.type = "emote"; return d}))
                      .concat(nicknames.map(d => {d.type = "nickname"; return d}))
                      .concat(nameplates.map(d => {d.type = "nameplate"; return d}));
      }
    }
    return clazz
  }
}

class Color {
  constructor(color){
    this.name = color.name;
    this.img = color.img;
    this.rarity = color.rarity;
    this.acquire = color.acquire;
    if(this.acquire == "Store" || this.acquire == "DLC"){
      this.price = Number(color.price);
      this.currency = color.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = color.season;
      this.tier = color.tier;
    }
  }
}

class Pattern {
  constructor(pattern){
    this.name = pattern.name;
    this.img = pattern.img;
    this.rarity = pattern.rarity;
    this.acquire = pattern.acquire;
    if(this.acquire == "Store" || this.acquire == "DLC"){
      this.price = Number(pattern.price);
      this.currency = pattern.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = pattern.season;
      this.tier = pattern.tier;
    }
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

class Celebration {
  constructor(celebration){
    this.name = celebration.name;
    this.img = celebration.img;
    this.rarity = celebration.rarity;
    this.acquire = celebration.acquire;
    if(this.acquire == "Store" || this.acquire == "DLC"){
      this.price = Number(celebration.price);
      this.currency = celebration.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = celebration.season;
      this.tier = celebration.tier;
    }
  }
}

class Emote {
  constructor(emote){
    this.name = emote.name;
    this.img = emote.img;
    this.rarity = emote.rarity;
    this.acquire = emote.acquire;
    if(this.acquire == "Store" || this.acquire == "DLC"){
      this.price = Number(emote.price);
      this.currency = emote.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = emote.season;
      this.tier = emote.tier;
    }
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

class Currency {
  constructor(currency){
    this.name = currency.name;
    this.img = currency.img;
    this.acquire = currency.acquire;
    if(this.acquire == "Store" || this.acquire == "DLC"){
      this.price = Number(currency.price);
      this.currency = currency.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = currency.season;
      this.tier = currency.tier;
    }
  }
}
