// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Caveat: vars can't be easily reused between background and content scripts
// const rightClickObjKey = "dom.target-clicked"



const expandLevel = ["+", "++", "+++", "++++", "+++++"]
// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(async () => {
  for (const [idx, lvl] of Object.entries(expandLevel)) {
    chrome.contextMenus.create({
      id: idx,
      title: lvl,
      type: 'normal',
      contexts: ['selection']
    });
  }
});

// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener(async (item, tab) => {
  const lvl_id = item.menuItemId;
  console.log("level id:", lvl_id)
  chrome.storage.local.get("rightClickObjKey").then((result) => {
    const target = result.rightclickObjKey
    if (target) {
      target.style.background = "antiquewhite"
    } else {
      console.log("target is not insert successfully")
    }
  })
});