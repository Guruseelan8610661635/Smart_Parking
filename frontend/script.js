// UI-only script: toggle the side panel open/close
document.addEventListener('DOMContentLoaded', ()=>{
    const menuBtn = document.getElementById('menuBtn');
    const sidePanel = document.getElementById('sidePanel');
    const closeBtn = document.getElementById('closePanel');

    if(menuBtn && sidePanel){
        menuBtn.addEventListener('click', ()=>{
            sidePanel.classList.add('open');
            sidePanel.setAttribute('aria-hidden','false');
        });
    }
    if(closeBtn && sidePanel){
        closeBtn.addEventListener('click', ()=>{
            sidePanel.classList.remove('open');
            sidePanel.setAttribute('aria-hidden','true');
        });
    }
    // Close on overlay tap (click outside panel)
    document.addEventListener('click', (e)=>{
        if(sidePanel.classList.contains('open')){
            const isInside = sidePanel.contains(e.target) || (menuBtn && menuBtn.contains(e.target));
            if(!isInside){
                sidePanel.classList.remove('open');
                sidePanel.setAttribute('aria-hidden','true');
            }
        }
    });
});

