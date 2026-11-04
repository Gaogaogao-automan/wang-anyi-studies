/* Two independent chronologies: preserve the original life timeline on the left. */
life=function(){
 const publications=works.filter(w=>w.group==='出版'&&/^\d{4}/.test(w.date));
 const years=[...new Set(publications.map(w=>Number(w.date.slice(0,4))))].sort((a,b)=>a-b);
 return head('LIFE & PUBLICATIONS','生平年表','生平与作品出版，两条时间线并列阅读。')+
 `<div class="paired-chronologies"><section class="biography-column"><h2 class="chronology-column-heading">生平</h2><div class="timeline">${events.map(e=>`<article class="row" id="year-${e[0]}"><span class="year">${e[0]}</span><div>${e[1]}</div></article>`).join('')}</div><p class="source">资料来源：<a href="${bioSource}" target="_blank" rel="noopener">中国作家网·王安忆会员简介</a>。</p></section><section class="publication-column"><h2 class="chronology-column-heading">作品出版</h2><div class="publication-timeline">${years.map(year=>`<article class="publication-year"><h3>${year}</h3><ul>${publications.filter(w=>Number(w.date.slice(0,4))===year).sort((a,b)=>dateKey(a)-dateKey(b)||a.id-b.id).map(w=>`<li><a href="#works/${w.id}" data-work="${w.id}">《${esc(w.title)}》</a><span class="chronology-meta">${esc(w.date)} · ${esc(w.type)}</span></li>`).join('')}</ul></article>`).join('')}</div><details class="undated-chronology"><summary>出版时间待考</summary><ul>${works.filter(w=>w.group==='出版'&&!/^\d{4}/.test(w.date)).map(w=>`<li><a href="#works/${w.id}" data-work="${w.id}">《${esc(w.title)}》</a></li>`).join('')}</ul></details><p class="source">出版资料来源见各作品详情。</p></section></div>`;
};
if(location.hash.split('/')[0]==='#life')render();
