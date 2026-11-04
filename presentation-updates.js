/* Keep editorial process notes out of the public bibliography. */
const cleanTranscriptionNotes=value=>String(value||'').split(/(?<=[。！？])/).filter(s=>!/(原表.*(?:空白|未注明|未列|未标)|截图本行空白|不从相邻|译者栏按截图|原表未给出)/.test(s)).join('').trim();
translationRecords.forEach(r=>{r.notes=cleanTranscriptionNotes(r.notes);r.editions.forEach(e=>e.notes=cleanTranscriptionNotes(e.notes))});
const translationsBeforeCleanup=translationsPage;
translationsPage=function(){return translationsBeforeCleanup().replace('区分原作、译名与版本，保留节译和转译说明。','')};
renderResearch=function(){
 const q=document.querySelector('#researchSearch').value.trim().toLocaleLowerCase(),type=document.querySelector('#researchCategory').value;
 const list=researchBooks.filter(r=>(type==='全部类型'||r.category===type)&&[r.title,r.author,r.publisher,r.year,r.topic,r.language,r.isbn].join(' ').toLocaleLowerCase().includes(q));
 document.querySelector('#researchCount').textContent='显示 '+list.length+' 项研究书目';
 document.querySelector('#researchList').innerHTML=list.length?['专题研究','比较研究','研究资料汇编'].map((category,index)=>{
 const group=list.filter(r=>r.category===category).sort((a,b)=>Number(a.year)-Number(b.year));if(!group.length)return '';
 return '<section class="research-shelf"><div class="research-shelf-heading"><span class="research-shelf-number">0'+(index+1)+'</span><h2>'+esc(category)+'</h2><span class="research-shelf-count">'+group.length+'</span></div><div class="research-edition-list">'+group.map(r=>'<article class="research-edition"><div class="research-edition-year">'+esc(r.year)+'</div><div class="research-edition-main"><h3 class="research-original-title">'+esc(r.title)+'</h3><p class="research-edition-author">'+esc(r.author)+(r.role==='著'?' 著':'')+'</p><details class="research-edition-detail"><summary>书目信息</summary><div class="research-details"><p>'+esc(r.topic)+'</p><p>'+esc(r.language)+(r.isbn?' · ISBN '+esc(r.isbn):'')+'</p><p>'+esc(r.status)+'</p><a href="'+esc(r.source)+'" target="_blank" rel="noopener">'+esc(r.sourceLabel)+'</a>'+(r.extraSource?'<br><a href="'+esc(r.extraSource)+'" target="_blank" rel="noopener">交叉核验来源</a>':'')+'</div></details></div><div class="research-edition-publisher">'+esc(r.publisher.replace('（书店简称“中国社科”，待出版社书目复核）',''))+'</div></article>').join('')+'</div></section>';
 }).join(''):'<p class="empty">暂无匹配书目，请调整关键词或类型。</p>';
};
const researchBeforeRefinement=research;
research=function(){return researchBeforeRefinement().replace('专题研究著作、比较研究与研究资料汇编分别收录。优先依据出版社、大学和联合目录核验，保留书目来源与尚待核实的字段。','围绕王安忆创作的研究著作与资料汇编。')};
if(['#translations','#research'].includes(location.hash.split('/')[0]))render();
const openWorkBeforePresentation=openWork;
openWork=function(id){openWorkBeforePresentation(id);const body=document.querySelector('#detailBody');body.innerHTML=body.innerHTML.replace(/<div><dt>体裁核验<\/dt><dd>[\s\S]*?<\/dd><\/div>/g,'')};
const renderWorksBeforePresentation=renderWorks;
renderWorks=function(){renderWorksBeforePresentation();const list=document.querySelector('#workList');list.innerHTML=list.innerHTML.replace(/<article class="row">([\s\S]*?)<h3>([\s\S]*?)<\/h3>([\s\S]*?)<button data-work="(\d+)"[^>]*>查看资料 ↗<\/button><\/article>/g,(_,before,title,after,id)=>'<article class="row">'+before+'<h3><a href="#works/'+id+'" data-work="'+id+'">'+title+'</a></h3>'+after+'</article>')};
if(location.hash.split('/')[0]==='#works')render();
const renderInterviewsBeforePresentation=renderInterviews;
renderInterviews=function(){renderInterviewsBeforePresentation();const list=document.querySelector('#interviewList');list.innerHTML=list.innerHTML.replace(/ ↗<\/a><\/h2>/g,'</a></h2>')};
if(location.hash.split('/')[0]==='#interviews')render();
const homeBeforePresentation=home;
home=function(){return homeBeforePresentation().replace(/(<h3>(?:作品目录|生平年表|采访与对谈|研究文献)) ↗(<\/h3>)/g,'$1$2')};
if(!location.hash||location.hash==='#home')render();
