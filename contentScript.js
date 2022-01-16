
let oldUrl = ""

let titleChangeObserver = new MutationObserver(mutationRecords => {
  if (oldUrl !== mutationRecords[0].addedNodes[0].baseURI
    && mutationRecords[0].addedNodes[0].baseURI.includes("https://www.youtube.com/watch")) {
    oldUrl = mutationRecords[0].addedNodes[0].baseURI
    if (document.title.match(/^(\[([0-9]{2}:){0,1}[0-9]{2}:[0-9]{2}\])$/) === null) {
      document.title = "[" + getYoutubeVideoDuration() + "] - " + mutationRecords[0].addedNodes[0].data
    }
  }
});

titleChangeObserver.observe(document.querySelector('head > title'), { subtree: true, characterData: true, childList: true });

function getYoutubeVideoDuration() {
  durationStr = document.querySelector('span > .ytp-time-duration').textContent

  let durationStrSplit = durationStr.split(":")
  let result = ""

  durationStrSplit.forEach(currDurationElt => {
    result += ":" + currDurationElt.padStart(2, '0')
  });

  return result.substring(1)
}

// DONT WORK !
chrome.runtime.onMessage.addListener(({ trigger }) => {
  console.log("Trigger received : " + trigger);
  if (trigger === 'pauseVideo') {
    console.log("message pauseVideo received ");
    pauseVideo();
  }
});

pauseVideo()

function pauseVideo() {
  let vid = document.querySelector('video')
  vid.pause();
}