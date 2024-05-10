import React, { useEffect, useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import browser from 'webextension-polyfill';
import './index.css';
import { Settings } from '../../types';

import adLibraryButton from './../../assets/img/ad-library-button';

const Popup = () => {
  const options = [
    { name: "Shop now",id:1 }, 
    { name: "Learn more",id:2 }, 
    { name: "Order now", id: 3 },
    { name: "Book now", id: 4 },
    { name: "Sign up", id: 5 },
    { name: "Subscribe", id: 6 },
    { name: "Send message", id: 7 },
    { name: "Send WhatsApp message", id: 8 },
    { name: "Contact us", id: 9 },
    { name: "Download", id: 10 },
    { name: "Install now", id: 11 }
  ];
  let defaultSettings: Settings = {
    isFilterActive: false,
    isScrollActive: false,
    numberOfAds: 0,
    cta: []
  }
  const [settings, setSettings] = useState(defaultSettings)
  const onSelect = (selectedList:any, selectedItem:any)=>{
    updateSettings('cta', selectedList);
  }

const onRemove = (selectedList:any, removedItem:any)=> {
  updateSettings('cta', selectedList);
}
  const updateSettings = (key:any,val:any)=>{
    setSettings(prev=>{
      let newSettings = { ...prev, [key]: val }
      browser.storage.local.set({[key]:val});
      return newSettings
    })
  }
  useEffect(() => {
    browser.storage.local.get(null).then((db) => {
      let DB:Settings = db?.cta ? db : defaultSettings;
      setSettings(DB)
    })
      
  }, [])
  return (
    <>
    <div className='header'>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="50" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="45" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g /><clipPath id="a4165ac1ed"><path d="M 15.035156 134.335938 L 84 134.335938 L 84 226.585938 L 15.035156 226.585938 Z M 15.035156 134.335938 " clipRule="nonzero" /></clipPath><clipPath id="ad7a24df4f"><path d="M 51 134.335938 L 166.535156 134.335938 L 166.535156 226.585938 L 51 226.585938 Z M 51 134.335938 " clipRule="nonzero" /></clipPath></defs><g clipPath="url(#a4165ac1ed)"><path fill="#253439" d="M 67.148438 178.757812 L 83.703125 178.757812 L 67.148438 134.371094 L 49.421875 134.371094 L 33.265625 177.691406 L 15.03125 226.578125 L 31.585938 226.578125 L 49.816406 177.691406 L 58.285156 154.988281 L 67.148438 178.757812 " fillOpacity="1" fillRule="nonzero" /></g><g clipPath="url(#ad7a24df4f)"><path fill="#f14902" d="M 120.519531 134.371094 L 77.167969 134.371094 L 101.96875 200.867188 L 118.519531 200.867188 L 99.503906 149.878906 L 120.519531 149.878906 C 137.417969 149.878906 151.113281 163.578125 151.113281 180.472656 C 151.113281 197.371094 137.417969 211.070312 120.519531 211.070312 L 95.753906 211.070312 L 91.25 198.992188 L 91.246094 198.992188 L 87.507812 188.96875 L 57.164062 188.96875 L 51.976562 204.476562 L 76.742188 204.476562 L 84.984375 226.578125 L 121.277344 226.578125 L 121.273438 226.570312 C 146.386719 226.164062 166.621094 205.683594 166.621094 180.472656 C 166.621094 155.011719 145.980469 134.371094 120.519531 134.371094 " fillOpacity="1" fillRule="nonzero" /></g><g fill="#253439" fillOpacity="1"><g transform="translate(166.621782, 224.086566)"><g><path d="M 7.226562 -64.59375 L 7.226562 0 L 40.652344 0 L 40.652344 -12.917969 L 20.144531 -12.917969 L 20.144531 -64.59375 Z M 7.226562 -64.59375 " /></g></g></g><g fill="#253439" fillOpacity="1"><g transform="translate(211.155739, 224.086566)"><g><path d="M 20.144531 0 L 20.144531 -64.59375 L 7.226562 -64.59375 L 7.226562 0 Z M 20.144531 0 " /></g></g></g><g fill="#253439" fillOpacity="1"><g transform="translate(238.616847, 224.086566)"><g><path d="M 7.226562 0 L 32.792969 0 C 43.273438 0 51.855469 -8.582031 51.855469 -19.421875 C 51.855469 -24.484375 49.417969 -29.453125 45.171875 -32.34375 C 49.234375 -35.144531 50.953125 -40.203125 51.132812 -45.082031 C 51.40625 -56.464844 44.265625 -64.683594 32.792969 -64.683594 L 7.226562 -64.683594 Z M 20.238281 -51.765625 L 31.710938 -51.765625 C 35.414062 -51.765625 37.671875 -48.875 37.671875 -45.261719 C 37.671875 -41.738281 35.414062 -38.757812 31.710938 -38.757812 L 20.238281 -38.757812 Z M 20.238281 -25.835938 L 31.710938 -25.835938 C 35.414062 -25.835938 38.214844 -23.039062 38.214844 -19.421875 C 38.214844 -15.808594 35.414062 -12.917969 31.710938 -12.917969 L 20.238281 -12.917969 Z M 20.238281 -25.835938 " /></g></g></g><g fill="#253439" fillOpacity="1"><g transform="translate(294.713375, 224.086566)"><g><path d="M 38.304688 0.902344 C 82.753906 0.902344 82.753906 -65.679688 38.304688 -65.679688 C -6.144531 -65.679688 -6.144531 0.902344 38.304688 0.902344 Z M 38.304688 -12.46875 C 12.46875 -12.46875 12.46875 -52.398438 38.304688 -52.398438 C 64.144531 -52.398438 64.144531 -12.46875 38.304688 -12.46875 Z M 38.304688 -12.46875 " /></g></g></g></svg>
    </div>
    <div className="container">
        <div className='flex space-between mt-20'>
          <div className='flex align-items-center gap-15'>
            <label className='bold-700'>Enable Filter</label>
            <label className="switch">
              <input type="checkbox" checked={settings.isFilterActive} onChange={(e) => updateSettings('isFilterActive', e.target.checked)} />
                <span className="slider round"></span>
            </label>
          </div>
          <div className='flex align-items-center gap-15'>
            <label className='bold-700'>Auto Scroll Ads</label>
            <label className="switch">
              <input type="checkbox" checked={settings.isScrollActive} onChange={(e) => updateSettings('isScrollActive', e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>
      </div>
        <div className='flex space-between mt-20'>
          <div className='flex align-items-center gap-15'>
            <label className='bold-700'>Nr of Ads</label>
            <input type="range" step={1} max={30} min={0} value={settings.numberOfAds} onInput={(e: any) => updateSettings('numberOfAds', Number(e.target.value || "1"))}  /><label>{settings.numberOfAds}</label>
          </div>
        </div>
        <div className='mt-20'>
          <div className='flex align-items-center gap-15' style={{width:'100%'}}>
            <label className='bold-700'>CTA Button</label>

            <Multiselect
              selectionLimit={10}
              showCheckbox={true}
              options={options}
              selectedValues={settings.cta}
              onSelect={onSelect} 
              onRemove={onRemove} 
              displayValue="name" 
            />

          </div>
        </div>
    </div>
      <div className='header' style={{ "alignItems": "end" }}>
        <img src={adLibraryButton} style={{ width: '100px',padding:"10px" ,cursor: "pointer" }} onClick={()=>chrome.tabs.create({ url:'https://facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=get%20yours&search_type=keyword_unordered&media_type=all&content_languages[0]=en'})} />
      </div>
    </>
  );
};

export default Popup;
