(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{52:function(e,t,n){"use strict";var s=n(27),a=n.n(s),r=n(28),o=n.n(r),i=n(29),c=n.n(i),f=n(30),u=n.n(f),l=n(20),d=n.n(l),m=(n(75),n(1)),M=n.n(m),h=n(4),p=n(15),b=n(6),g=n(41),F=n(42),q=n(70),v=n(8);n(78);function y(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,s=d()(e);if(t){var a=d()(this).constructor;n=Reflect.construct(s,arguments,a)}else n=s.apply(this,arguments);return u()(this,n)}}v.a.default.initializeApp({apiKey:"AIzaSyCs5AfLDY0g9306B1yp7W1DzDj2wJkhwqo",authDomain:"swweb-f7b67.firebaseapp.com",databaseURL:"https://swweb-f7b67.firebaseio.com",projectId:"swweb-f7b67",storageBucket:"swweb-f7b67.appspot.com",messagingSenderId:"624196455015",appId:"1:624196455015:web:a6b40fdb25701eb7a7a2c2",measurementId:"G-549CBLCS3L"});v.a.default.database();function _(e,t,n,s){var a={};if(e<t){var r={firstFreq:n,secondFreq:s};a["/Monsters/results/"+e+"/secondMon/"+t]=r}else if(e>t){r={firstFreq:s,secondFreq:n};a["/Monsters/results/"+t+"/secondMon/"+e]=r}v.a.database().ref().update(a)}var w=function(e){c()(n,e);var t=y(n);function n(e){var s;return a()(this,n),(s=t.call(this,e)).state={firstMonId:"",firstMonImg:"",firstMonName:"",firstMonFreq:0,secondMonId:"",secondMonImg:"",secondMonName:"",secondMonFreq:0,numMon:97,allMonPage:"https://swarfarm.com/api/bestiary",monsterPage:"https://swarfarm.com/api/v2/monsters/?id__in=&com2us_id=&family_id=&base_stars=6&base_stars__lte=&base_stars__gte=&natural_stars=5&natural_stars__lte=&natural_stars__gte=&obtainable=&fusion_food=&homunculus=false&name=&element=pure&element=fire&element=wind&element=water&awaken_level=1&order_by="},s}return o()(n,[{key:"incFirstFreq",value:function(){this.setState({firstMonFreq:this.state.firstMonFreq+1}),_(this.state.firstMonId,this.state.secondMonId,this.state.firstMonFreq+1,this.state.secondMonFreq)}},{key:"incSecondFreq",value:function(){this.setState({secondMonFreq:this.state.secondMonFreq+1}),_(this.state.firstMonId,this.state.secondMonId,this.state.firstMonFreq,this.state.secondMonFreq+1)}},{key:"updateMonster",value:function(e,t){for(var n=this,s=[19200,17100,24600,23600,24100,24200,24e3],a=[13813,14511,21212,22612],r=Math.floor(Math.random()*e),o=Math.floor(Math.random()*e);o==r;)o=Math.floor(Math.random()*e);fetch(this.state.monsterPage).then((function(e){return e.json()})).then((function(t){for(;-1!=s.indexOf(t.results[r].family_id)||-1!=a.indexOf(t.results[r].com2us_id);)r=Math.floor(Math.random()*e);for(;-1!=s.indexOf(t.results[o].family_id)||-1!=a.indexOf(t.results[o].com2us_id);)o=Math.floor(Math.random()*e);var i=function(e,t){var n=0,s=0;if(e<t){var a=v.a.database().ref("/Monsters/results/"+e+"/secondMon/"+t+"/firstFreq/"),r=v.a.database().ref("/Monsters/results/"+e+"/secondMon/"+t+"/secondFreq/");a.on("value",(function(e){n=e})),r.on("value",(function(e){s=e}))}else if(e>t){a=v.a.database().ref("/Monsters/results/"+t+"/secondMon/"+e+"/firstFreq/"),r=v.a.database().ref("/Monsters/results/"+t+"/secondMon/"+e+"/secondFreq/");a.on("value",(function(e){s=e})),r.on("value",(function(e){n=e}))}return[n,s]}(r,o),c=JSON.stringify(i),f=JSON.parse(c);r<o?n.setState({firstMonFreq:f[0],secondMonFreq:f[1]}):n.setState({firstMonFreq:f[1],secondMonFreq:f[0]});var u=t.results[r],l=t.results[o];n.setState({firstMonId:r,firstMonImg:u.image_filename,firstMonName:u.name,secondMonId:o,secondMonImg:l.image_filename,secondMonName:l.name})}))}},{key:"componentDidMount",value:function(){this.updateMonster(this.state.numMon,this.state.monsterPage)}},{key:"render",value:function(){var e=this,t=this.state,n=t.numMon,s=t.monsterPage,a=t.firstMonFreq,r=t.secondMonFreq;return M.a.createElement(b.a,{style:I.container},M.a.createElement(b.a,{style:I.imageContainer},M.a.createElement(F.a,{onPress:function(){e.incFirstFreq()}},M.a.createElement(g.a,{fadeDuration:1e3,source:{uri:"https://swarfarm.com/static/herders/images/monsters/"+this.state.firstMonImg},style:{width:128,height:128}})),M.a.createElement(p.a,null," vs. "),M.a.createElement(F.a,{onPress:function(){e.incSecondFreq()}},M.a.createElement(g.a,{fadeDuration:1e3,source:{uri:"https://swarfarm.com/static/herders/images/monsters/"+this.state.secondMonImg},style:{width:128,height:128}}))),M.a.createElement(b.a,{style:I.imageContainer},M.a.createElement(p.a,null,a),M.a.createElement(p.a,null," vs. "),M.a.createElement(p.a,null,r)),M.a.createElement(q.a,{onPress:function(){e.updateMonster(n,s)},title:"Show Me Two Other Monsters!",color:"#DB8E71"}))}}]),n}(M.a.Component),I=h.a.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"},imageContainer:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center",flexDirection:"row"}});t.a=w},71:function(e,t,n){e.exports=n(89)}},[[71,1,2]]]);
//# sourceMappingURL=app.8aab10ea.chunk.js.map