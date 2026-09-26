(()=>{'use strict';
const FIXED={
 1:{name:'CITY ROOKIE',mode:'rookie',accent:'#05d9ff',trophy:'City Rookie Cup',gear:'Rookie Jacket',card:'City Rookie Card'},
 2:{name:'CITY EXPLORER',mode:'missions',accent:'#49e38d',trophy:'City Explorer Cup',gear:'Explorer Jacket',card:'City Night Share Card'},
 3:{name:'POWER QUEST',mode:'power',accent:'#ffe044',trophy:'Power Quest Cup',gear:'Power Wristband',card:'Power Quest Card'},
 4:{name:'MATH CHALLENGE',mode:'mastery',accent:'#ff6bd6',trophy:'Math Challenge Cup',gear:'Mastery Headphones',card:'Math Master Card'}
};
const SKILLS=['add','sub','mix','groups','times2','times5','final'];
const clone=v=>JSON.parse(JSON.stringify(v));
function config(season){if(FIXED[season])return FIXED[season];const themes=['NEON','TURBO','SKYLINE','POWER','MASTER'];return{name:`${themes[(season-5)%themes.length]} CHAMPION`,mode:'champion',accent:['#8c70ff','#ff8b45','#50dfdc','#f06bb7','#91e55b'][(season-5)%5],trophy:`Season ${season} Champion Cup`,gear:`Season ${season} Champion Gear`,card:`Season ${season} Champion Card`}}
function levelState(){return{stars:0,best:0,missions:{},complete:false}}
function seasonState(){return{unlockedLevel:1,currentLevel:1,complete:false,levels:{}}}
function ensure(save){
 save.city=save.city||{};save.city.seasons=save.city.seasons||{};
 const legacyComplete=(Number(save.unlocked)||1)>10||!!save.stars?.[10]||Number(save.city.championships)>0;
 if(!save.city.seasons[1]){const s=seasonState();s.unlockedLevel=legacyComplete?10:Math.max(1,Math.min(10,Number(save.unlocked)||1));s.currentLevel=s.unlockedLevel;s.complete=legacyComplete;for(let n=1;n<=10;n++){s.levels[n]=levelState();s.levels[n].stars=Number(save.stars?.[n])||0;s.levels[n].best=Number(save.best?.[n])||0;s.levels[n].missions=clone(save.city.missions?.[n]||{});s.levels[n].complete=n<s.unlockedLevel||!!save.stars?.[n]}save.city.seasons[1]=s}
 save.city.unlockedSeason=Math.max(Number(save.city.unlockedSeason)||1,legacyComplete?2:1,Number(save.city.season)||1);
 save.city.activeSeason=Math.max(1,Math.min(Number(save.city.activeSeason)||save.city.unlockedSeason,save.city.unlockedSeason));
 for(let n=1;n<=save.city.unlockedSeason;n++)if(!save.city.seasons[n])save.city.seasons[n]=seasonState();
 save.city.season=save.city.unlockedSeason;save.city.championships=Math.max(Number(save.city.championships)||0,Object.values(save.city.seasons).filter(s=>s.complete).length);
 save.city.mathMastery=save.city.mathMastery||{};return save.city
}
function hash(season,level,salt=0){let x=(season*73856093)^(level*19349663)^(salt*83492791);x=Math.imul(x^(x>>>13),1274126177);return((x^(x>>>16))>>>0)/4294967296}
function skillWeight(record){if(!record)return 6;return({PRACTICING:8,CHALLENGE:6,MASTERED:1,REVIEW:2})[record.status]||5}
function updateMathMastery(record,rewarded){const m={correct:0,attempts:0,status:'PRACTICING',reviewMisses:0,...(record||{})},before=m.status;m.attempts++;if(rewarded)m.correct++;if(before==='MASTERED'&&!rewarded){m.status='REVIEW';m.reviewMisses=1}else if(before==='REVIEW'){if(rewarded){m.status='MASTERED';m.reviewMisses=0}else{m.reviewMisses=(m.reviewMisses||0)+1;if(m.reviewMisses>=2)m.status='CHALLENGE'}}else{const rate=m.correct/Math.max(1,m.attempts);m.status=m.correct>=8&&rate>=.8?'MASTERED':m.correct>=4?'CHALLENGE':'PRACTICING'}return m}
function selectMathSkill(city,season,level,roll=Math.random()){
 if(season===1)return['add','add','sub','sub','mix','mix','groups','times2','times5','final'][level-1]||'mix';
 if(season===2)return['add','sub','mix','add','sub','groups','times2','times5','mix','final'][level-1]||'mix';
 if(season===3)return['add','mix','sub','groups','times2','mix','times5','groups','final','final'][level-1]||'mix';
 const weights=SKILLS.map(k=>skillWeight(city.mathMastery[k])),total=weights.reduce((a,b)=>a+b,0);let p=roll*total;for(let i=0;i<SKILLS.length;i++){p-=weights[i];if(p<=0)return SKILLS[i]}return'final'
}
function missionPlan(season,level){
 const power=season===3,champion=season>=5,coinTarget=season===1?12:14+Math.floor(hash(season,level,1)*9)+(champion?(season+level)%5:0),mathTarget=2+Math.floor(hash(season,level,2)*2),streakTarget=2+Math.floor(hash(season,level,3)*3),heartsTarget=season===1?2:3;
 const pool=[{id:'coins',label:`Collect ${coinTarget} coins`,target:coinTarget},{id:'math',label:`Answer ${mathTarget} math questions correctly`,target:mathTarget},{id:'streak',label:`Get a ${streakTarget}-answer streak`,target:streakTarget},{id:'hearts',label:`Finish with ${heartsTarget} hearts`,target:heartsTarget},{id:'hiddenStar',label:'Find the hidden star',target:1}];
 if(power)pool.splice(1,0,{id:'energy',label:'Earn 3 Power Energy',target:3},{id:'usePower',label:'Use Shield or Turbo',target:1});
 const chosen=[];let cursor=Math.floor(hash(season,level,4)*pool.length);while(chosen.length<3){const item=pool[cursor%pool.length];if(!chosen.some(x=>x.id===item.id))chosen.push(item);cursor+=2+(season+level)%3}
 return[{id:'finish',label:'Finish the level',target:1},...chosen]
}
function levelPlan(save,season,level){ensure(save);const cfg=config(season),missions=missionPlan(season,level);return{season,level,name:cfg.name,mode:cfg.mode,accent:cfg.accent,math:selectMathSkill(save.city,season,level,hash(season,level,7)),missions,hiddenStar:missions.some(m=>m.id==='hiddenStar'),powerBonus:season===3?1+(level%3===0?1:0):0,coinShift:season>=2?Math.round((hash(season,level,8)-.5)*38):0,motif:(season+level)%5}}
function state(save,season=save.city?.activeSeason||1){ensure(save);if(!save.city.seasons[season])save.city.seasons[season]=seasonState();return save.city.seasons[season]}
function setActive(save,season){ensure(save);if(season<1||season>save.city.unlockedSeason)return false;save.city.activeSeason=season;const s=state(save,season);s.currentLevel=Math.max(1,Math.min(10,s.currentLevel||s.unlockedLevel||1));return true}
function continueTarget(save){ensure(save);const season=save.city.activeSeason||save.city.unlockedSeason,s=state(save,season);return{season,level:Math.max(1,Math.min(10,s.currentLevel||s.unlockedLevel||1))}}
function evaluate(plan,run){const values={finish:1,coins:run.coins,math:run.mathCorrect,streak:run.bestStreak,hearts:run.hearts,hiddenStar:run.hiddenStar?1:0,energy:run.energyEarned,usePower:run.usedPower?1:0};return Object.fromEntries(plan.missions.map(m=>[m.id,(values[m.id]||0)>=m.target]))}
function addUnique(list,item){if(!list.includes(item))list.push(item)}
function completeLevel(save,season,level,run){ensure(save);const s=state(save,season),ls=s.levels[level]||levelState(),plan=levelPlan(save,season,level),missions=evaluate(plan,run);ls.complete=true;ls.stars=Math.max(ls.stars||0,run.stars||1);ls.best=Math.max(ls.best||0,run.score||0);ls.missions={...(ls.missions||{}),...missions};s.levels[level]=ls;s.currentLevel=level<10?level+1:10;s.unlockedLevel=Math.max(s.unlockedLevel,Math.min(10,level+1));let champion=null;
 if(level===10){s.complete=true;save.city.unlockedSeason=Math.max(save.city.unlockedSeason,season+1);if(!save.city.seasons[season+1])save.city.seasons[season+1]=seasonState();save.city.championships=Object.values(save.city.seasons).filter(x=>x.complete).length;const cfg=config(season);addUnique(save.collection.trophies,cfg.trophy);addUnique(save.collection.gear,cfg.gear);addUnique(save.collection.cards,cfg.card);save.achievements[`citySeason${season}`]=true;champion={season,name:cfg.name,trophy:cfg.trophy,nextSeason:season+1};save.city.activeSeason=season+1;save.city.season=save.city.unlockedSeason}
 return{missions,champion,nextLevel:s.currentLevel,unlockedSeason:save.city.unlockedSeason}
}
window.CitySeasons={config,ensure,levelPlan,state,setActive,continueTarget,completeLevel,selectMathSkill,updateMathMastery,missionPlan,SKILLS};
if(typeof module!=='undefined'&&module.exports)module.exports=window.CitySeasons;
})();
