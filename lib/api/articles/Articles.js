const fetch = require("node-fetch");

class Articles {
  articles = [];

  async getArticle(index){
    return await Article.init(this.articles[index]);
  }
}

class Article {
  constructor(article){
    this.name = article.name;
    this.createdAt = new Date(article.created_at);
    this.title = article.content.title;
    this.content = article.content.content;
    this.thumbnail = article.content.thumbnail;
    this.description = article.content.description;
  }
}


module.exports = {
  init: async () => {
    let clazz = new Articles();
    let static = await fetch("https://fallguys.esportinfo.gg/articles/").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/articles/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)();
    for(let article of infos.data[0].articles){
      clazz.articles.push(new Article(article));
    }
    return clazz;
  }
}
