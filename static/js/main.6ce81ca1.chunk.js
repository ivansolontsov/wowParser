(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{48:function(e,t,a){e.exports=a(78)},57:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(44),r=a.n(l),o=(a(57),a(59),a(61),a(63),a(65),a(8)),i=a(18),s=a(118),u=a(122),m=a(121),f=a(117),p=a(119),h=a(120),d=a(115);function E(e){var t=e.title,a=e.guildCharacters,c=e.token,l=(e.update,e.rank),r=n.useState([{name:"",spec:"",class:"",prof:"",ilvl:""}]),E=Object(o.a)(r,2),b=E[0],g=E[1],v=n.useState([{name:"",spec:"",class:"",prof:"",ilvl:""}]),k=Object(o.a)(v,2),j=k[0],O=k[1],_=n.useState("ilvl"),w=Object(o.a)(_,2),S=w[0],N=w[1],C=n.useState(!1),z=Object(o.a)(C,2),U=z[0],y=z[1];Object(n.useEffect)(function(){c&&(g([]),a.filter(function(e){return l.includes(e.rank)&&70===e.character.level}).forEach(function(e){var t=e.character.name.toLowerCase();fetch("https://eu.api.blizzard.com/profile/wow/character/gordunni/".concat(t,"?namespace=profile-eu&locale=en_US&access_token=").concat(c)).then(function(e){return e.json()}).then(function(e){g(function(t){return[].concat(Object(i.a)(t),[{name:e.name,spec:e.active_spec.name,class:e.character_class.name,prof:"No Professions",ilvl:e.equipped_item_level}])})}).catch(function(e){return console.log(e)})}))},[a]),Object(n.useEffect)(function(){O([]),b.forEach(function(e){if(e.name){var t=e.name.toLowerCase(),a=Object(i.a)(b);fetch("https://eu.api.blizzard.com/profile/wow/character/gordunni/".concat(t,"/professions?namespace=profile-eu&locale=en_US&access_token=").concat(c)).then(function(e){return e.json()}).then(function(e){e.primaries&&(a.find(function(t){t.name===e.character.name&&(t.prof=e.primaries.map(function(e){return e.profession.name}).join(", "))}),O(a))}).catch(function(t){return console.log(t,"error with prof fetch, player's name is ".concat(e.name))})}})},[b]);var x,T=function(e,t,a){return a?e<t?-1:e>t?1:0:e>t?-1:e<t?1:0};return n.createElement("div",{className:"app__table"},n.createElement("h2",null,t," ",n.createElement("span",{className:"average-item-level"},((x=b).reduce(function(e,t){return e+t.ilvl},0)/x.length).toFixed(2))),n.createElement(f.a,{component:d.a},n.createElement(s.a,{"aria-label":"simple table"},n.createElement(p.a,null,n.createElement(h.a,null,n.createElement(m.a,{className:"clickable",onClick:function(){N("name"),y(!U)}},"Nickname"),n.createElement(m.a,{className:"clickable",align:"right",onClick:function(){N("spec"),y(!U)}},"Spec"),n.createElement(m.a,{className:"clickable",align:"right",onClick:function(){N("class"),y(!U)}},"Class"),n.createElement(m.a,{className:"clickable",onClick:function(){N("prof"),y(!U)},align:"right"},"Prof."),n.createElement(m.a,{className:"clickable",onClick:function(){N("ilvl"),y(!U)},align:"right"},"ilvl"))),n.createElement(u.a,null,j.sort(function(e,t){return function(e,t,a,n){switch(a){case"ilvl":return function(e,t,a){return a?e-t:t-e}(e.ilvl,t.ilvl,n);case"name":return T(e.name,t.name,n);case"class":return T(e.class,t.class,n);case"spec":return T(e.spec,t.spec,n);case"prof":return T(e.prof,t.prof,n)}}(e,t,S,U)}).map(function(e,t){return n.createElement(h.a,{key:t,sx:{"&:last-child td, &:last-child th":{border:0}}},n.createElement(m.a,{component:"th",scope:"row"},n.createElement("a",{href:"https://worldofwarcraft.com/ru-ru/character/eu/gordunni/".concat(e.name),rel:"noopener noreferrer",target:"_blank"},n.createElement("strong",null,e.name))),n.createElement(m.a,{align:"right"},e.spec),n.createElement(m.a,{align:"right","player-class":"".concat(e.class)},n.createElement("span",null,e.class)),n.createElement(m.a,{align:"right"},e.prof),n.createElement(m.a,{align:"right"},n.createElement("span",{className:e.ilvl>=379?"red":""+e.ilvl>=372?"green":""},e.ilvl)))})))))}var b=a(110),g=a(73),v=a.n(g),k=function(){var e=c.a.useState(),t=Object(o.a)(e,2),a=t[0],l=t[1],r=c.a.useState([]),i=Object(o.a)(r,2),s=i[0],u=i[1],m=c.a.useState(),f=Object(o.a)(m,2),p=f[0],h=f[1],d=c.a.useState("\u0447\u0451\u0440\u043d\u044b\u0439-\u043b\u043e\u0442\u043e\u0441"),g=Object(o.a)(d,2),k=g[0],j=(g[1],c.a.useState("gordunni")),O=Object(o.a)(j,2),_=O[0],w=(O[1],c.a.useState(!1)),S=Object(o.a)(w,2),N=S[0],C=S[1],z=c.a.useState(!1),U=Object(o.a)(z,2),y=U[0],x=U[1],T=c.a.useState(0),Y=Object(o.a)(T,2),F=Y[0],P=Y[1];return c.a.useEffect(function(){F>0&&setTimeout(function(){return P(F-1)},1e3)},[F]),c.a.useEffect(function(){x(!0),setTimeout(function(){x(!1)},3e4),P(30)},[]),Object(n.useEffect)(function(){a||fetch("https://oauth.battle.net/token",{body:"grant_type=client_credentials",headers:{Authorization:"Basic Y2QwOTE0YzdjYjQ1NDNhNzhiYmVjOWY4OGY1OTU0N2M6bXpUamhHVkc4UnlnUlpsQzY0S3FRS1hhQjFPUWJGcjE=","Content-Type":"application/x-www-form-urlencoded"},method:"POST"}).then(function(e){return e.json()}).then(function(e){l(e.access_token)}).catch(function(e){return console.log(e)})},[]),Object(n.useEffect)(function(){a&&k&&fetch("https://eu.api.blizzard.com/data/wow/guild/".concat(_,"/").concat(k,"/roster?namespace=profile-eu&locale=en_US&access_token=").concat(a)).then(function(e){return e.json()}).then(function(e){u(e.members),h(e)}).catch(function(e){return console.log(e)})},[k,_,a,N]),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"app__header"},0!==s.length&&c.a.createElement("div",{className:"app__header-title"},c.a.createElement("h1",null,p.guild.name),c.a.createElement("small",null,p.guild.realm.name)),c.a.createElement("div",{className:"app__header-buttons"},0!==F&&c.a.createElement("span",null,F),c.a.createElement(b.a,{disabled:y,onClick:function(){C(!N),x(!0),setTimeout(function(){x(!1)},6e4),P(60)},color:"secondary","aria-label":"Update Data"},c.a.createElement(v.a,null)))),0!==s.length&&c.a.createElement("div",{className:"app__tables"},c.a.createElement(E,{guildCharacters:s,token:a,update:N,rank:[5,4,3,2,1,0],title:"Main"}),c.a.createElement(E,{guildCharacters:s,token:a,update:N,rank:[6],title:"Alt"})))},j=a(112),O=a(113),_=a(77),w=a(116),S=Object(_.a)({palette:{mode:"dark"}});var N=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement(w.a,{theme:S},c.a.createElement(j.a,null),c.a.createElement(O.a,{fixed:!0,maxWidth:"xl"},c.a.createElement(k,null))))};r.a.createRoot(document.getElementById("root")).render(c.a.createElement(N,null))}},[[48,2,1]]]);
//# sourceMappingURL=main.6ce81ca1.chunk.js.map