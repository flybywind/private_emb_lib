// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const rightMouse = 2
// const rightClickObjKey = "targeight-clicked"
// avoid using `storage.sync` as much as possible, which has very strong size limitations. 
// Also can check `chrome.runtime.lastError` for the recent errors which will be hidden many times
// see https://stackoverflow.com/a/23593477 for more info
document.onmousedown = ((event) => {
  if (event.button == rightMouse) {
    // TODO: seems the local or sync storage can't save the Dom elements
    chrome.storage.local.set({ "rightClickObjKey": event.target }, () => {
      if (chrome.runtime.lastError) {
        console.log("WARN: ", chrome.runtime.lastError)
      } else {
        console.log("insert target successfully")
      }
    })
  }

  let rnd = Math.random()
  chrome.storage.local.set({ "test": rnd }, () => {
    if (chrome.runtime.lastError) {
      console.log("WARN: ", chrome.runtime.lastError)
    } else {
      console.log("insert random successfully")
    }
  })
})

// exist for debug
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});
