const d = document;
const header = d.querySelector('.header');
const burger = d.querySelector('.burger');
const toggler = d.querySelector('.toggler');
const nav = d.querySelector('.nav');
const navList = nav.querySelectorAll("li");
const totalNavList = navList.length;

d.addEventListener('DOMContentLoaded', e =>{
  AOS.init();
  d.addEventListener('click', e =>{
    /* toggle nav when click togglerBtn */
    if(e.target.matches('.toggler') || e.target.matches('.toggler *')){
      nav.classList.toggle('nav-close');
      burger.classList.toggle('close');
      toggler.classList.toggle('close');
      header.classList.toggle('open');
    }
    /* close nav when click a */
    if(e.target.matches('.nav__li a')){
      nav.classList.remove('nav-close');
      burger.classList.remove('close');
      toggler.classList.remove('close');
      header.classList.remove('open');
    }

    /* update nav links */
    for(let i=0; i<totalNavList; i++){
      navList[i].querySelector("a").classList.remove("nav__a--active");
      const target = e.target.getAttribute("href").split("#")[1];
      if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
        navList[i].querySelector("a").classList.add("nav__a--active");
      }
    }
  })
})
