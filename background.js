// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
chrome.contextMenus.onClicked.addListener((item, tab) => {
  const lvl_id = item.menuItemId;
});