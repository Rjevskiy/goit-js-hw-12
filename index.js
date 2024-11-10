import{a as g,S as h,i as c}from"./assets/vendor-Qob_5Ba8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();async function I(s,o=1){const e=`https://pixabay.com/api/?key=46859112-8db04929d193e6e9d044d366e&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&per_page=100&page=${o}`,t=await g.get(e);if(t.status!==200)throw new Error("Ошибка при получении данных");return{images:t.data.hits,totalHits:t.data.totalHits}}function u(s,o=!1){const r=document.getElementById("gallery");o&&(r.innerHTML="");const n=s.map(e=>`
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
    `).join("");r.insertAdjacentHTML("beforeend",n)}const L=document.getElementById("search-form"),b=document.getElementById("search-input"),p=document.getElementById("loader"),i=document.getElementById("load-more");let m,a=1,d="",f=0;m=new h(".gallery-item a",{captions:!0,captionsData:"alt",captionDelay:250});async function y(s,o=1){try{p.style.display="block";const{images:r,totalHits:n}=await I(s,o);o===1?(f=n,u(r,!0)):u(r,!1),m.refresh(),document.querySelectorAll(".gallery-item").length>=f?(i.style.display="none",c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):i.style.display="block"}catch{c.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}finally{p.style.display="none"}}L.addEventListener("submit",s=>{s.preventDefault();const o=b.value.trim();if(!o){c.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}d=o,a=1,i.style.display="none",y(d,a)});i.addEventListener("click",()=>{a+=1,y(d,a)});
//# sourceMappingURL=index.js.map
