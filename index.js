import{a as g,S as h,i as c}from"./assets/vendor-Qob_5Ba8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();async function b(s,o=1){const e=`https://pixabay.com/api/?key=46859112-8db04929d193e6e9d044d366e&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${o}`,t=await g.get(e);if(t.status!==200)throw new Error("Ошибка при получении данных");return{images:t.data.hits,totalHits:t.data.totalHits}}function u(s,o=!1){const r=document.getElementById("gallery");o&&(r.innerHTML="");const n=s.map(e=>`
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
    `).join("");r.insertAdjacentHTML("beforeend",n)}const I=document.getElementById("search-form"),L=document.getElementById("search-input"),p=document.getElementById("loader"),a=document.getElementById("load-more");let f,l=1,d="",m=0;f=new h(".gallery-item a",{captions:!0,captionsData:"alt",captionDelay:250});async function y(s,o=1){try{p.style.display="block";const{images:r,totalHits:n}=await b(s,o);o===1?(m=n,u(r,!0)):u(r,!1),f.refresh();const e=document.querySelectorAll(".gallery-item").length,t=document.querySelector(".gallery-item"),i=t?t.getBoundingClientRect().height:0;i>0&&window.scrollBy({top:2*i,behavior:"smooth"}),e>=m?(a.style.display="none",c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):a.style.display="block"}catch{c.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}finally{p.style.display="none"}}I.addEventListener("submit",s=>{s.preventDefault();const o=L.value.trim();if(!o){c.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}d=o,l=1,a.style.display="none",y(d,l)});a.addEventListener("click",()=>{l+=1,y(d,l)});
//# sourceMappingURL=index.js.map
