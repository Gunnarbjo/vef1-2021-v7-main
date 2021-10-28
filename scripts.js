/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */
const MAX_BEST_OF = 10;
let wins = 0;
let losses = 0;
let total = 0;
/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  if (bestOf % 2 === 1 && bestOf <= MAX_BEST_OF) return true
  else return false
}
function playAsText(play) {
  out = 'Óþekkt tala'
  switch(play){
    case '1':
      out = 'Skæri';
      break;

    case '2':
      out = 'blað';
      break;
    
    case '3':
      out = 'Steinn';
      break;

    default:
      out = 'Óþekkt tala';
      break;
  }

  console.log(out);
  return(out)
}

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  let out = 0;
  switch(player){
    case 'Skæri':
      if (computer === 2) out = 1;
      else if (computer === 1) out = 0;
      else out = -1;
      break;
    
    case 'Blað':
      if (computer === 3) out = 1;
      else if (computer === 2) out = 0;
      else out = -1;
      break;

    case 'Steinn':
      if (computer === 1) out = 1;
      else if (computer === 3) out = 0;
      else out = -1;
      break;

    default:
      out = -1;
      break; 
  }

  return out;
  }


/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
  
  let utspil = prompt("Hvað velur þú? 1:Skæri  2:Blað  3:Steinn")
  if (utspil !== 'Hætta við'){
    utspil = playAsText(utspil);
  }

  if(utspil === 'Óþekkt tala'){
    alert("Tölvan vinnur þessa umferð, vinsamlegast notaðu tölurnar 1, 2, 3")
    losses++
  }

  else{
    let tolva = Math.floor(Math.random() * 2 + 1)
    let sigurvegari = checkGame(utspil,tolva)

    switch(sigurvegari){
      case 0:
        alert("Jafntefli, reyndu aftur")
        round();
        break;
      
      case 1:
        alert("Þú vannst þessa umferð, vel gert!")
        wins++
        break;

      case -1:
        alert("Tölvan vinnur þessa umferð, gengur betur næst")
        losses++
        break;
    }
  }
}
/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {
  
  wins = 0
  losses = 0
  let leikir = prompt("Meirihlutan af hversu mörgum leikjum þarf að vinna?")

  if(isValidBestOf(leikir)){
    while(((wins && losses) < (leikir/2))) {
      round()
    }
  }

  else{
    console.error("Vinsamlegast veldu 1, 3, 5, 7, eða 9 leiki")
  }
  if(wins < losses){
    alert("Þú tapaðir leiknum, gengur betur næst")
  }
  if(wins > losses){
    alert("Þú vanst leikinn, til hamingju!")
  }
}


/**
 * Birtir stöðu spilara.
 */
function games() {
  total = wins + losses;
  console.log("Þú hefur spilað %s leiki", total);
  formula1 = (100*wins)/total;
  formula2 = (100*losses)/total;

  if(wins + losses !== 0){
    console.log("þú hefur unnið %s eða %s% af heildar leikjum", wins, formula1.toFixed(2));
    console.log("Þú hefur tapað %s eða %s% af heildar leikjum",losses,formula2.toFixed(2))
  }
}

