import{a as y,S as g,i as p}from"./assets/vendor-Qob_5Ba8.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();async function h(s,r=1){const e=`https://pixabay.com/api/?key=46859112-8db04929d193e6e9d044d366e&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${r}`,t=await y.get(e);if(t.status!==200)throw new Error("Ошибка при получении данных");return t.data.hits}function d(s,r=!1){const o=document.getElementById("gallery");r&&(o.innerHTML="");const n=s.map(e=>`
        <div class="gallery-item">
            <a href="${e.largeImageURL}" class="lightbox">
                <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p>Likes: ${e.likes}</p>
                <p>Views: ${e.views}</p>
                <p>Comments: ${e.comments}</p>
                <p>Downloads: ${e.downloads}</p>
            </div>
        </div>
    `).join("");o.insertAdjacentHTML("beforeend",n)}const L=document.getElementById("search-form"),E=document.getElementById("search-input"),u=document.getElementById("loader"),c=document.getElementById("load-more");let f,i=1,l="";f=new g(".gallery-item a",{captions:!0,captionsData:"alt",captionDelay:250});async function m(s,r=1){try{u.style.display="block";const o=await h(s,r);r===1?d(o,!0):d(o,!1),f.refresh(),c.style.display=o.length===15?"block":"none"}catch{p.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}finally{u.style.display="none"}}L.addEventListener("submit",s=>{s.preventDefault();const r=E.value.trim();if(!r){p.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}l=r,i=1,c.style.display="none",m(l,i)});c.addEventListener("click",()=>{i+=1,m(l,i)});
//# sourceMappingURL=index.js.map
