const assert=require('assert');
global.window={};require('../js/city-seasons.js');const C=window.CitySeasons;
function fresh(){return{unlocked:1,stars:{},best:{},city:{season:1,championships:0,missions:{},mathMastery:{}},collection:{trophies:[],badges:[],gear:[],cards:[]},achievements:{}}}
function winningRun(plan){return{coins:99,mathCorrect:99,bestStreak:99,hearts:5,hiddenStar:true,energyEarned:9,usedPower:true,stars:3,score:9000}}
function winSeason(save,n){C.setActive(save,n);for(let level=1;level<=10;level++)C.completeLevel(save,n,level,winningRun(C.levelPlan(save,n,level)))}

const save=fresh();C.ensure(save);
winSeason(save,1);assert.equal(save.city.unlockedSeason,2,'Season 1 unlocks 2');assert.equal(save.city.activeSeason,2);
winSeason(save,2);assert.equal(save.city.unlockedSeason,3,'Season 2 unlocks 3');
winSeason(save,3);assert.equal(save.city.unlockedSeason,4,'Season 3 unlocks 4');
winSeason(save,4);assert.equal(save.city.unlockedSeason,5,'Season 4 unlocks Champion Season 5');
winSeason(save,5);assert.equal(save.city.unlockedSeason,6,'Champion Season N unlocks N+1');
assert.equal(save.city.championships,5,'championship count persists');
assert(save.collection.trophies.includes('City Explorer Cup'),'season reward persists');
assert(Object.values(save.city.seasons[2].levels[1].missions).some(Boolean),'missions persist');

assert(C.setActive(save,2),'older unlocked season can be selected');assert.equal(C.continueTarget(save).season,2,'Continue follows selected season');
C.setActive(save,6);assert.deepEqual(C.continueTarget(save),{season:6,level:1},'Continue routes to newly unlocked season');
const reloaded=JSON.parse(JSON.stringify(save));C.ensure(reloaded);assert.equal(reloaded.city.unlockedSeason,6,'reload does not reset season');assert.equal(reloaded.city.championships,5,'reload does not reset championships');

const legacy={unlocked:11,stars:{10:3},best:{10:5000},city:{season:1,championships:0,missions:{10:{finish:true}}},collection:{trophies:[],badges:[],gear:[],cards:[]},achievements:{}};C.ensure(legacy);assert.equal(legacy.city.seasons[1].complete,true,'legacy Level 10 becomes champion');assert.equal(legacy.city.unlockedSeason,2,'legacy champion unlocks Season 2');assert.equal(legacy.city.seasons[1].levels[10].missions.finish,true,'legacy mission retained');

const adaptive=fresh();C.ensure(adaptive);adaptive.city.mathMastery.add={status:'MASTERED'};adaptive.city.mathMastery.sub={status:'PRACTICING'};let add=0,sub=0;for(let i=0;i<700;i++){const skill=C.selectMathSkill(adaptive.city,4,1,i/700);if(skill==='add')add++;if(skill==='sub')sub++}assert(sub>add*4,'PRACTICING skill is selected substantially more than MASTERED');
let mastery=C.updateMathMastery({status:'MASTERED',correct:8,attempts:10},false);assert.equal(mastery.status,'REVIEW','one error sends mastery to REVIEW, not a reset');mastery=C.updateMathMastery(mastery,true);assert.equal(mastery.status,'MASTERED','successful review restores MASTERED');

const p5=C.missionPlan(5,1).map(x=>x.label).join('|'),p6=C.missionPlan(6,1).map(x=>x.label).join('|');assert.notEqual(p5,p6,'Champion Seasons vary objectives');
console.log('PASS city-seasons.test.js — 16 season, migration, persistence, routing, mission and mastery assertions');
