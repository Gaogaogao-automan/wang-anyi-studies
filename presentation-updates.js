/* Keep editorial process notes out of the public bibliography. */
const cleanTranscriptionNotes=value=>String(value||'').split(/(?<=[。！？])/).filter(s=>!/(原表.*(?:空白|未注明|未列|未标)|截图本行空白|不从相邻|译者栏按截图|原表未给出)/.test(s)).join('').trim();
translationRecords.forEach(r=>{r.notes=cleanTranscriptionNotes(r.notes);r.editions.forEach(e=>e.notes=cleanTranscriptionNotes(e.notes))});
const translationsBeforeCleanup=translationsPage;
translationsPage=function(){return translationsBeforeCleanup().replace('区分原作、译名与版本，保留节译和转译说明。','')};
renderResearch=function(){
 const q=document.querySelector('#researchSearch').value.trim().toLocaleLowerCase();
 const type=document.querySelector('#researchCategory').value;
 const list=researchBooks.filter(r=>(type==='全部类型'||r.category===type)&&[r.title,r.author,r.publisher,r.year,r.topic,r.language,r.isbn].join(' ').toLocaleLowerCase().includes(q));
 document.querySelector('#researchCount').textContent='显示 '+list.length+' 项研究书目';
 document.querySelector('#researchList').innerHTML=list.length?['专题研究','比较研究','研究资料汇编'].map(category=>{
  const group=list.filter(r=>r.category===category).sort((a,b)=>Number(a.year)-Number(b.year));if(!group.length)return '';
  return `<section class="research-group"><h2>${esc(category)} <small>${group.length}</small></h2><div class="table-scroll"><table class="research-table"><thead><tr><th scope="col">书名</th><th scope="col">作者／编者</th><th scope="col">出版信息</th></tr></thead><tbody>${group.map(r=>`<tr><th scope="row"><span class="research-original-title">${esc(r.title)}</span><span class="research-topic">${esc(r.topic)}</span><details><summary>详情</summary><div class="research-details"><p>${esc(r.language)}${r.isbn?' · ISBN '+esc(r.isbn):''}</p><p>${esc(r.status)}</p><a href="${esc(r.source)}" target="_blank" rel="noopener">${esc(r.sourceLabel)} ↗</a>${r.extraSource?'<br><a href="'+esc(r.extraSource)+'" target="_blank" rel="noopener">交叉核验来源 ↗</a>':''}</div></details></th><td>${esc(r.author)}${r.role==='著'?' 著':''}</td><td><strong>${esc(r.year)}</strong><span>${esc(r.publisher.replace('（书店简称“中国社科”，待出版社书目复核）',''))}</span></td></tr>`).join('')}</tbody></table></div></section>`;
 }).join(''):'<p class="empty">暂无匹配书目，请调整关键词或类型。</p>';
};
if(['#translations','#research'].includes(location.hash.split('/')[0]))render();
const openWorkBeforePresentation=openWork;
openWork=function(id){openWorkBeforePresentation(id);const body=document.querySelector('#detailBody');body.innerHTML=body.innerHTML.replace(/<div><dt>体裁核验<\/dt><dd>[\s\S]*?<\/dd><\/div>/g,'')};
const renderWorksBeforePresentation=renderWorks;
renderWorks=function(){renderWorksBeforePresentation();const list=document.querySelector('#workList');list.innerHTML=list.innerHTML.replace(/<article class="row">([\s\S]*?)<h3>([\s\S]*?)<\/h3>([\s\S]*?)<button data-work="(\d+)"[^>]*>查看资料 ↗<\/button><\/article>/g,(_,before,title,after,id)=>'<article class="row">'+before+'<h3><a href="#works/'+id+'" data-work="'+id+'">'+title+'</a></h3>'+after+'</article>')};
if(location.hash.split('/')[0]==='#works')render();
const renderInterviewsBeforePresentation=renderInterviews;
renderInterviews=function(){renderInterviewsBeforePresentation();const list=document.querySelector('#interviewList');list.innerHTML=list.innerHTML.replace(/ ↗<\/a><\/h2>/g,'</a></h2>')};
if(location.hash.split('/')[0]==='#interviews')render();
