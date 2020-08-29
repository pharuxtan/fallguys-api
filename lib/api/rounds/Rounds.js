const fetch = require("node-fetch");

class Rounds {
  rounds = [];

  getRound(index){
    if(typeof index == "string") return this.rounds.filter(round => round.name === index)[0];
    return this.rounds[index];
  }
}

class Round {
  constructor(round){
    this.name = round.title;
    this.description = round.description.content[0].content[0].value;
    this.size = round.size;
    this.type = round.archetype;
    this.designer = round.designer;
    if(round.previewImage.fields) this.thumbnail = "https:"+round.previewImage.fields.file.url;
    if(round.backgroundImage.fields) this.backgroundImage = "https:"+round.backgroundImage.fields.file.url;
    if(round.socialShareImage.fields) this.socialShareImage = "https:"+round.socialShareImage.fields.file.url;
    if(round.blurredBackground.fields) this.blurredBackground = "https:"+round.blurredBackground.fields.file.url;
    this.video = round.videoUrl;
  }
}


module.exports = {
  init: async () => {
    let clazz = new Rounds();
    let infos = JSON.parse(await fetch("https://fallguys.com/rounds").then(res => res.text()).then(text => text.split('<script id="__NEXT_DATA__" type="application/json">')[1].split('</script>')[0]));
    for(let {fields: round} of infos.props.pageProps.rounds){
      clazz.rounds.push(new Round(round));
    }
    return clazz
  }
}
