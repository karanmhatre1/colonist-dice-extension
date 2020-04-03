 chrome.runtime.onMessage.addListener(function(request, sender) {
   if (request.action == "getSource") {
     message.innerHTML = request.source;
   }
 });

$(function() {

  var message = document.querySelector('#message');
 
   chrome.tabs.executeScript(null, {
     file: "getPageSource.js"
   });

});