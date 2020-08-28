const fetch = require("node-fetch");

class Achievements {
  achievements = [];

  getAchievement(index){
    if(typeof index == "string") return this.achievements.filter(achievement => achievement.trophyName === index)[0];
    return this.achievements[index];
  }
}

class Achievement {
  constructor(achievement){
    this.name = achievement.displayName;
    this.trophyName = achievement.name;
    this.description = achievement.description;
    this.icon = achievement.icon;
    this.grayIcon = achievement.icongray;
  }
}


module.exports = {
  init: async () => {
    let clazz = new Achievements();
    let static = await fetch("https://fallguys.esportinfo.gg/achievements/").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/achievements/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)();
    for(let achievement of infos.data[0].achievements){
      clazz.achievements.push(new Achievement(achievement));
    }
    return clazz;
  }
}
