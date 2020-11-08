function vigenereTabelle(charText, charKey) {
  const spalte = charText.charCodeAt() - 'a'.charCodeAt();
  const reihe = charKey.charCodeAt() - 'a'.charCodeAt();
  return vigenereNumTabelle(spalte, reihe);
}

function vigenereNumTabelle(spalte, reihe) {
  const buchstabe = String.fromCharCode((spalte + reihe) % 26 + 'a'.charCodeAt());
  return buchstabe;
}

function vigenereTabelleReverse(charKey, charSecret) {
  const reihe = charKey.charCodeAt() - 'a'.charCodeAt();
  let spalte = (charSecret.charCodeAt() - 'a'.charCodeAt()) - reihe;
  if (spalte < 0) {
    spalte = spalte + 26;
  }
  const buchstabe = String.fromCharCode(spalte + 'a'.charCodeAt());
  return buchstabe;
}

function vigenereTabelleReverse2(charText, charSecret) {
  const spalte = charSecret.charCodeAt() - 'a'.charCodeAt();
  let reihe = charText.charCodeAt() - spalte;
  if (reihe < 0) {
    reihe = reihe + 26;
  }
  const buchstabe = String.fromCharCode(reihe + 'a'.charCodeAt());
  return buchstabe;
}

function verschlüsseln(klartext, keyword) {
  let secret = [];
  klartext = klartext.replace(/ /g, "").toLowerCase();
  keyword = keyword.replace(/ /g, "").toLowerCase();
  // print(klartext,keyword);

  for (let i = 0; i < klartext.length; i++) {
    let charText = klartext[i];
    let charKey = keyword[i % keyword.length];
    //  print(charText,charKey,vigenereTabelle(charText, charKey));
    secret.push(vigenereTabelle(charText, charKey));
  }
  return secret.join("");
}

function entschlüsseln(geheimtext, keyword) {
  let lösung = [];
  geheimtext = geheimtext.replace(/ /g, "").toLowerCase();
  keyword = keyword.replace(/ /g, "").toLowerCase();

  for (let i = 0; i < geheimtext.length; i++) {
    let charSecret = geheimtext[i];
    let charKey = keyword[i % keyword.length];
    //print(charSecret, charKey, vigenereTabelleReverse(charSecret, charKey));
    lösung.push(vigenereTabelleReverse(charKey, charSecret));
    //   lösung.push(vigenereTabelle(charText, charKey));
  }
  return lösung.join("");
}

function buttonDecode(){
 let txt = document.getElementById("eingabetext").value;
 let key = document.getElementById("inputKey").value;
 let result = entschlüsseln(txt, key);
 document.getElementById("ausgabetext").value = result;
console.log(txt);

}

function buttonEncode(){
  let txt = document.getElementById("eingabetext").value;
  let key = document.getElementById("inputKey").value;
  let result = verschlüsseln(txt, key);
  document.getElementById("ausgabetext").value = result;
 console.log(txt);
 
 }