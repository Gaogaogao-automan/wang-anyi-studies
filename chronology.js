/* A shared year axis aligns biography with publication records. */
life=function(){
 const publications=works.filter(w=>w.group==='出版'&&/^\d{4}/.test(w.date));
 const years=[...new Set([...events.map(e=>Number(e[0])),...publications.map(w=>Number(w.date.slice(0,4)))])].sort((a,b)=>a-b);
 return head('LIFE & PUBLICATIONS','生平年表','按年份对照王安忆的生平与作品出版记录。出版栏按现有书目中的出版时间排列。')+
 `<div class="parallel-timeline"><div class="chronology-head"><span>年份</span><h2>生平</h2><h2>作品出版</h2></div>${years.map(year=>{
 const milestones=events.filter(e=>Number(e[0])===year);
 const books=publications.filter(w=>Number(w.date.slice(0,4))===year).sort((a,b)=>dateKey(a)-dateKey(b)||a.title.localeCompare(b.title,'zh'));
 return `<article class="chronology-year" id="year-${year}"><h3 class="chronology-date">${year}</h3><div class="chronology-life"><span class="chronology-mobile-label">生平</span>${milestones.length?milestones.map(e=>`<p>${esc(e[1])}</p>`).join(''):'<span class="chronology-empty">—</span>'}</div><div class="chronology-books"><span class="chronology-mobile-label">作品出版</span>${books.length?'<ul>'+books.map(w=>`<li><a href="#works/${w.id}" data-work="${w.id}">《${esc(w.title)}》</a><span class="chronology-meta">${esc(w.date)} · ${esc(w.type)}</span></li>`).join('')+'</ul>':'<span class="chronology-empty">—</span>'}</div></article>`;
 }).join('')}</div><section class="section"><h2>出版时间待考</h2><ul class="undated-publications">${works.filter(w=>w.group==='出版'&&!/^\d{4}/.test(w.date)).map(w=>`<li><a href="#works/${w.id}" data-work="${w.id}">《${esc(w.title)}》</a></li>`).join('')}</ul></section><p class="source">生平资料来源：<a href="${bioSource}" target="_blank" rel="noopener">中国作家网·王安忆会员简介</a>。作品出版资料来源见各作品详情。未列事件的年份以“—”表示；期刊发表与出版记录分别收录，期刊记录请见作品目录。</p>`;
};
if(location.hash.split('/')[0]==='#life')render();
