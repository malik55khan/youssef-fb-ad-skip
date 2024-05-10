import browser from 'webextension-polyfill';
import { Settings } from '../../types';
import { useEffect, useState } from 'react';
browser;
const adRegex = /(\d+) ads use this creative and text/;
let userSettings: Settings = {},timeOut:any;
let defaultSettings: Settings = {
    isFilterActive: false,
    isScrollActive: false,
    numberOfAds: 0,
    cta: []
}
const traverse = (node:HTMLElement) =>{
    if (!node.querySelectorAll || !userSettings.isFilterActive) return;
    const ads = node.querySelectorAll("div[role='none']");
    let regex = new RegExp(userSettings.cta?.map(x=>x.name).join("|") as any, 'i');
    ads.forEach((ad: any) => {
        if (!userSettings.numberOfAds && !userSettings.cta?.length) return;
        const parentElem = ad.closest('._7jvw.x2izyaf.x1hq5gj4.x1d52u69');
        let parentText = parentElem?.innerText || ""
        const adNumMatch = parentText.match(adRegex);
        const ctaTextContainer = ad.querySelector('div[role="button"] span div div');
        let adCountMatched = false, hasMatchingCTA = false, txt = "";
        if (ctaTextContainer && (txt = ctaTextContainer?.textContent?.trim())) {
            let matches = txt.match(regex);
            console.log(matches)
            if (matches && matches[0]) {
                hasMatchingCTA = true;
            }
        }

        if (userSettings.numberOfAds && adNumMatch && (parseInt(adNumMatch[1]) >= userSettings.numberOfAds)) {
            adCountMatched = true;
        }
        console.log(adCountMatched, hasMatchingCTA, txt, userSettings.cta, userSettings.numberOfAds, adNumMatch && parseInt(adNumMatch[1]))
        if (userSettings.numberOfAds && userSettings.cta?.length){
            if (adNumMatch && (parseInt(adNumMatch[1]) >= userSettings.numberOfAds) && hasMatchingCTA){
                if (parentElem) {
                    parentElem.parentElement.classList.remove('product-hide');
                    parentElem.classList.add('product-active');
                } else {
                    if (parentElem) parentElem.parentElement.classList.add('product-hide');
                }
            } else {
                if (parentElem) parentElem.parentElement.classList.add('product-hide');
            }
        } else if (!userSettings.numberOfAds && userSettings.cta?.length) {
            if (hasMatchingCTA) {
                if (parentElem) {
                    parentElem.parentElement.classList.remove('product-hide');
                    parentElem.classList.add('product-active');
                } else {
                    if (parentElem) parentElem.parentElement.classList.add('product-hide');
                }
            } else {
                if (parentElem) parentElem.parentElement.classList.add('product-hide');
            }
        } else if (userSettings.numberOfAds && !userSettings.cta?.length) {
            if (adNumMatch && (parseInt(adNumMatch[1]) >= userSettings.numberOfAds)) {
                if (parentElem) {
                    parentElem.parentElement.classList.remove('product-hide');
                    parentElem.classList.add('product-active');
                } else {
                    if (parentElem) parentElem.parentElement.classList.add('product-hide');
                }
            } else {
                if (parentElem) parentElem.parentElement.classList.add('product-hide');
            }
        }

        
        
        // if (adCountMatched || hasMatchingCTA) {
        //     if (parentElem){
        //         parentElem.parentElement.classList.remove('product-hide');
        //         parentElem.classList.add('product-active');
        //     }
        // } else {
        //     if (parentElem) parentElem.parentElement.classList.add('product-hide');
        // }
        // if (!hasMatchingCTA && !adCountMatched && userSettings.numberOfAds && userSettings.cta) {
        //     if (parentElem) parentElem.parentElement.classList.add('product-hide');
        // } else if (hasMatchingCTA && !userSettings.numberOfAds) {
        //     if (parentElem) parentElem.classList.add('product-active');
        // }
    })
}
const resetDom = () =>{
    for (let elem of Array.from(document.querySelectorAll('.product-hide'))) elem.classList.remove('product-hide');
    for (let elem of Array.from(document.querySelectorAll('.product-active'))) elem.classList.remove('product-active');
}
const observer: MutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
        if (!userSettings.isFilterActive || !userSettings.isFilterActive) return;
        mutation.addedNodes.forEach((nod, i) => {
            let node = <HTMLElement>mutation.addedNodes[i];
            traverse(node)
        })
        if (userSettings.isScrollActive) timeOut = setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 5000)
    })

});
observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
});
browser.storage.local.get(null).then((db: Settings) => {
    userSettings = db?.cta ? db : defaultSettings;
})
browser.storage.onChanged.addListener((changes) => {
    console.log(userSettings)
    //browser.storage.local.get().then((db: Settings) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            userSettings[key as keyof Settings] = newValue;
            if (userSettings.isFilterActive){
                resetDom();
                traverse(document.body)
            }
            if (key === 'isFilterActive') {

            } else if (key === 'isScrollActive') {

            } else if (key === 'cta') {

            } else if (key === 'numberOfAds') {
                if (newValue){
                    
                }
            }
            console.log(key,oldValue,newValue)
        }
        
        if (!userSettings.isScrollActive) clearTimeout(timeOut)
    //})
})
