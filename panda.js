javascript:
var panda_memberid='3552014';
var panda_passhash='c53281d74b22c2eb675872d7a800a2cb';
var panda_igneous='c550a3bc1';
var panda_inwidth=document.cookie.match(/panda_inwidth=[\d]+/)?document.cookie.match(/panda_inwidth=(\d+)/)[1]:720;
var panda_zhcn=(navigator.language && navigator.language=='zh-CN')?true:false;
var panda_lang_a001=panda_zhcn?'请勿重复运行':'Alerady in process';
var panda_lang_a002=panda_zhcn?'本页无法运行':'Incorrect usage';
var panda_lang_a003=panda_zhcn?'不正确的输入':'Illegal input';
var panda_lang_c001=panda_zhcn?'页面读取失败，是否重试？':'Preload failed, retry?';
var panda_lang_c002=panda_zhcn?'登录尝试失败，强制进入？（使用公共账号）':'Login failed, break-in? (use public account)';
var panda_lang_c003=panda_zhcn?'是否加载原图？（需要下载权限且配额充足）':'Track Orign? (require download authority and enough quota)';
var panda_lang_p001=panda_zhcn?'输入图片范围（起始,结束），填写“0”加载全部：':'Input picture range (from,to), leave "0" to load all:';
var panda_lang_h001=panda_zhcn?'宽度':'Width';
var panda_lock;
function panda_leapover(){
var key=document.getElementById('panda_js')?document.getElementById('panda_js').getAttribute('exkey'):null;
if(key){
document.cookie='ipb_member_id='+key.split('x')[0].substr(32)+';path=/;domain=.exhentai.org';
document.cookie='ipb_pass_hash='+key.split('x')[0].substr(0,32)+';path=/;domain=.exhentai.org';
document.cookie='igneous='+(key.split('x')[1]?key.split('x')[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='yay=0;path=/;domain=.exhentai.org';
};
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org',true);
xhr.onerror=function(e){if(confirm(panda_lang_c001)){panda_leapover();}};
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
var html=xhr.responseText;
if(html.match(/<link(.*?)exhentai(.*?)>/)){window.location.reload();}
else if(confirm(panda_lang_c002)){
document.cookie='ipb_member_id='+panda_memberid+';path=/;domain=.exhentai.org';
document.cookie='ipb_pass_hash='+panda_passhash+';path=/;domain=.exhentai.org';
document.cookie='igneous='+panda_igneous+';path=/;domain=.exhentai.org';
document.cookie='yay=0;path=/;domain=.exhentai.org';
window.location.reload();
};
}};
xhr.send(null);
};
function panda_loadfile(gid,numb,hash,adds,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org/s/'+hash+'/'+gid+'-'+numb+'?'+adds,true);
xhr.onerror=function(e){exec(null);};
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
var html=xhr.responseText;
var info={};
info.numb=numb;
info.hash=hash;
info.show=html.match(/id="img" src="(.*?)"/)[1];
info.full=html.match(/href="(https:\/\/exhentai\.org\/fullimg.php(.*?))"/)?html.match(/href="(https:\/\/exhentai\.org\/fullimg.php(.*?))"/)[1].replace(/\&amp;/g,'\&'):info.show;
info.adds=adds+'&nl='+html.match(/onclick="return nl\(\'(.*?)\'\)"/)[1];
exec(info);
}};
xhr.send(null);
};
function panda_loadpage(gid,token,numb,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org/g/'+gid+'/'+token+'/?p='+(numb-1),true);
xhr.onerror=function(e){if(confirm(panda_lang_c001)){panda_loadpage(gid,token,numb,exec);}else{panda_lock=false;}};
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
var prev=document.getElementsByClassName('ths')[1].innerHTML=='Normal'?xhr.responseText.match(/<div class="gdtm"(.*?)>(.*?)https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)(.*?)<\/div>/g):xhr.responseText.match(/<div class="gdtl"(.*?)>(.*?)https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)(.*?)<\/div>/g);
var info={};
prev.forEach(function(value){var preg=value.match(/https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)/);info[preg[3]]=preg[1];});
exec(info);
}};
xhr.send(null);
};
function panda_listshow(){
var panda_filenavi=document.getElementsByClassName('gpc')[0].innerHTML.match(/Showing ([\d,]+) - ([\d,]+) of ([\d,]+) images/);
var panda_filepick=prompt(panda_lang_p001,panda_filenavi[1].replace(/,/g,'')+','+panda_filenavi[2].replace(/,/g,''));
if(!panda_filepick){return;};
var panda_filefrom=(!panda_filepick.split(',')[0] || panda_filepick.split(',')[0]==0)?1:parseInt(panda_filepick.split(',')[0]);
var panda_filefinl=(!panda_filepick.split(',')[1] || panda_filepick.split(',')[1]==0)?parseInt(panda_filenavi[3].replace(/,/g,'')):parseInt(panda_filepick.split(',')[1]);
if(!panda_filefrom || !panda_filefinl || panda_filefrom>panda_filefinl || panda_filefrom<1 || panda_filefinl>parseInt(panda_filenavi[3].replace(/,/g,''))){alert(panda_lang_a003);return;};
var panda_fileorig=confirm(panda_lang_c003);
var panda_pageconf=document.getElementsByClassName('ths');
var panda_pagetote=parseInt(panda_pageconf[0].innerHTML)*(panda_pageconf[1].innerHTML=='Normal'?10:5);
var panda_pagefrom=Math.ceil(panda_filefrom/panda_pagetote);
var panda_pagefinl=Math.ceil(panda_filefinl/panda_pagetote);
var panda_hashmaps={};
panda_lock=true;
for(var numb=panda_pagefrom;numb<=panda_pagefinl;numb++){
panda_loadpage(gid,token,numb,function(info){
panda_hashmaps=Object.assign(panda_hashmaps,info);
if(Math.ceil(Object.keys(panda_hashmaps).length/panda_pagetote)==(panda_pagefinl-panda_pagefrom+1)){
document.body.innerHTML='<div id="panda_list" style="margin:24px auto;width:'+panda_inwidth+'px;max-width:100%;text-align:center;"><h1><a href="javascript:;" onclick="window.location.reload();" style="text-decoration:none;">Panda: '+gid+' {'+panda_filefrom+','+panda_filefinl+'} ('+panda_filenavi[3].replace(/,/g,'')+')</a></h1><div style="margin:24px auto;"><input id="panda_size" size="3" placeholder="720px" style="width:100px;"/> <input type="button" onclick="panda_inwidth=parseInt(document.getElementById(\'panda_size\').value);document.cookie=\'panda_inwidth=\'+panda_inwidth+\';path=/;domain=.exhentai.org\';document.getElementById(\'panda_list\').style.width=panda_inwidth+\'px\';" value="'+panda_lang_h001+'" /></div></div>';
for(var numb=panda_filefrom;numb<=panda_filefinl;numb++){
document.getElementById('panda_list').innerHTML+='<img id="panda_file_'+numb+'" src="" alt="" style="display:block;margin:4px auto;max-width:100%;min-width:100px;min-height:100px;background:#000;" onclick="panda_loadfile(gid,'+numb+',\''+panda_hashmaps[numb]+'\',this.alt,function(info){if(!info){return;};var file=document.getElementById(\'panda_file_\'+info.numb);file.src=info.'+(panda_fileorig?'full':'show')+';file.alt=info.adds;})" />';
document.getElementById('panda_file_'+numb).click();
};
};
});
};
};
if(panda_lock){alert(panda_lang_a001);}
else if(document.domain!='exhentai.org'){alert(panda_lang_a002);}
else if(!document.head.innerHTML.match(/<link(.*?)exhentai(.*?)>/)){panda_leapover();}
else if(document.getElementById('gdt')){panda_listshow();}
else{alert(panda_lang_a002);};
