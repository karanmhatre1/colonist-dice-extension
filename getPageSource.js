
chrome.runtime.sendMessage({
     action: "getSource",
     source: calculateProb(document)
 });

function calculateProb(document_root) {
   var x = document.querySelectorAll("#game-log-text > p");
  // var x = 

  var result = "";
  
  var i;

  var total_turns = 0;

  var all_totals = [];

  var all_percs = [];

  for(var k=0; k<=12; k++) {
    all_totals[k] = 0;
    all_percs[k] = 0;
  }
  
  for (i = 0; i < x.length; i++) {
    var imgs = x[i].querySelectorAll('img');
    var j;
    var dice_total = 0;

      for (j = 0; j < imgs.length; j++) {

        alt_text = imgs[j].getAttribute('alt');
        if(alt_text.startsWith('dice')) {
          dice_total = dice_total + Number(alt_text.substring(5));
        }
      }
    all_totals[dice_total] = all_totals[dice_total] + 1;
  }

  for(var k=2; k<=12; k++)
    total_turns = total_turns + all_totals[k];

  if(total_turns > 0)
    for(var k=2; k<=12; k++)
      all_percs[k] = Math.round((all_totals[k]/total_turns)*100,2);

  var max_perc = Math.max.apply(Math, all_percs);

  result = "<h3> Total turns = " + total_turns + "</h3><ul>";

  for(var k=2; k<=12; k++) {

    result = result + "<li><span class='percentage'>" + k + " = " + all_totals[k] + " (" + all_percs[k] + "%)</span><div class='bar' style='width: " + ((all_percs[k]/max_perc)*200) + "px'></div></li>";
  }


  result = result + "</ul>";

  return result;
}