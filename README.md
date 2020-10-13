# fallguys-api
### Not affiliated with Fall Guys.
### All data is taken from [fallguys.esportinfo.gg](https://fallguys.esportinfo.gg) and [fallguys.com](https://fallguys.com)
## Installation

**install package**
```
npm install fallguys-api
```
**require package in project**
```js
const fallguys = require('fallguys-api');
```

## FallGuys

### crownIcon
The icon of the crown <img width="20" src="https://cdn.esportinfo.gg/fallguy/img/skins/crowns_icon.png">
### kudosIcon
The icon of the kudos <img width="20" src="https://cdn.esportinfo.gg/fallguy/img/skins/kudos_icon.png">
### getAchievements()
Get all achievements
### getArticles()
Get all articles
### getColors()
Get all skins colors
### getEmotes()
Get all emotes
### getNicknames()
Get all nicknames
### getNameplates()
Get all nameplates
### getSeasonpass()
Get all items of a specific season pass
### getCelebrations()
Get all Celebrations
### getFaces()
Get all skins faces
### getFreeSkins()
Get all "free" (skins who don't need crown or kudos) skins
### getPatterns()
Get all skins patterns
### getSkins()
Get all skins
### getDaily()
Get daily skins

## Achievement

### name
The name of the achievement (example: Fall Throttle)
### trophyName
the trophy name of the achievement (example: ACH_FALL_THROTTLE)
### description
the description of the achievement (example: Reach terminal velocity)
### icon
the icon of the achievement (preview: <img width="20" src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1097150/d24b693833335e41e966a043477af7da81d5b577.jpg"> )
### grayIcon
the gray icon of the achievement (preview: <img width="20" src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1097150/6bfbfc2ad461568f269a0f30533578ece9bbdc6a.jpg"> )

## Article

### name
The name of the article (example: 1/Fall Guys First Patch Notes)
### createdAt
The creation date of the article
### title
The title of the article (example: Fall Guys Patch Notes 1.0)
### content
The content of the article (in HTML)
### thumbnail
The thumbnail of the article (preview: <img width="20" src="http://a.storyblok.com/f/90693/1200x675/8dc5db6d94/fallguys_patchnotes-1-0.jpg">)
### description
The description of the article (example: Fall Guys: First Patch, new level: Jump  Showdown added and plenty of bugs fixed.)

## Color, Emote, Celebration, Face, FreeSkin, Pattern, Nameplate, Nickname

### name
The name of the skin (example: Raptor)
### img (not in Nickname)
The img of the skin (preview: <img width="20" src="https://cdn.esportinfo.gg/fallguy/img/skins/Raptor-Color.png">)
### rarity
The rarity of the skin (all rarity: Legendary, Epic, Rare, Uncommon, Common)
### acquire
Where the skin is obtainable (all acquire: Store, Starter, Rewards, DLC, Battle Pass, Leaked)\
if acquire is DLC or Store you have the price and the currency (Crown, Kudos, USD)\
if acquire is Battle Pass you have the season and the tier

## Skin

### name
The name of the skin (example: Raptor)
### uid
Add an id for detect daily store change (only on Daily)
### upperImg
The upper img of the skin (preview: <img width="20" src="https://cdn.esportinfo.gg/fallguy/img/skins/Raptor-Upper.png">)
### lowerImg
The upper img of the skin (preview: <img width="20" src="https://cdn.esportinfo.gg/fallguy/img/skins/Raptor-Lower.png">)
### rarity
The rarity of the skin (all rarity: Legendary, Epic, Rare, Uncommon, Common)
### acquire
Where the skin is obtainable (all acquires: Store, Starter, Rewards, DLC, Battle Pass, Leaked)\
if acquire is DLC or Store you have the price and the currency (Crown, Kudos, USD)\
if acquire is Battle Pass you have the season and the tier

## Daily

### pcStore
The array for all skin in the pc store
### ps4Store
The array for all skin in the ps4 store

## Round

## name
The name of the round (example: Dizzy Heights)
## description
The description of the round
## goal
How to finish the round (for Team and Final type)
## size
The size of the round (all sizes: Small, Medium, Large)
## type
The type of the round (all types: Race, Survival, Team, Final);
## designer
The designer of the round (example: Joseph Juson)
## thumbnail
The thumbnail of the round (preview: <img width="20" src="https://images.ctfassets.net/vsmfukibxsuz/6RFRPl1i0AcFDrMbS9yPPg/c82c34c18533c76cbd46623523ce9c5c/dizzy-heights-thumb.png"> )
## backgroundImage
The background image of the round
## socialShareImage
The social share image of the round (preview: <img width="20" src="https://images.ctfassets.net/vsmfukibxsuz/2aq0UIEuBQHtmMr79XVsGR/a041221fa44b34bdcbb8a77b105d763f/dizzy-heights-social.jpg"> )
## blurredBackground
The blurred background image of the round (preview: <img width="20" src="https://images.ctfassets.net/vsmfukibxsuz/60iRnNMZoa0hu3G7RVEdOp/b21b7e7f3a40b376efb52216e33fb7ee/dizzy-heights-bg-small.jpg"> )

## Seasonpass

## season
The season of the season pass (example: 1)
## items
All the items of the season pass
## colors
All the colors of the season pass
## patterns
All the patterns of the season pass
## skins
All the skins of the season pass
## faces
All the faces of the season pass
## currencys
All the currencys of the season pass
## celebrations
All the celebrations of the season pass
## emotes
All the emotes of the season pass
## nicknames
All the nicknames of the season pass
## nameplates
All the nameplates of the season pass

## Examples

```js
const fallguys = require("fallguys-api");

let achievements = await fallguys.getAchievements();
achievements.getAchievement("ACH_FALL_THROTTLE");

let articles = await fallguys.getArticles();
articles.getArticle(0);

let colors = await fallguys.getColors();
colors.getColor("Bubblegum");
colors.getLegendaryColor("Bumblebee");
colors.getEpicColor("Steel");
colors.getRareColor("Raspberry");
colors.getUncommonColor("Bubblegum");
colors.getCommonColor("Beach Ball");

let daily = await fallguys.getDaily();
daily.pcStore[0];
daily.ps4Store[0];
daily.getFirstPCItem();
daily.getSecondPCItem();
daily.getThirdPCItem();
daily.getFirstPS4Item();
daily.getSecondPS4Item();
daily.getThirdPS4Item();

let rounds = await fallguys.getRounds();
rounds.getRound(0);
rounds.getRound("Dizzy Heights");
```
