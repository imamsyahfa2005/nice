const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const imageToBase64 = require('image-to-base64');
const menu = require("./lib/menu.js");
const donate = require("./lib/donate.js");
const info = require("./lib/info.js");
//
const BotName = 'Choper';
const instagramlu = 'https://instagram.com/serenyemnyem';
const whatsapplu = '085779386736';
const kapanbotaktif = '19.30-23.00 AM';
const grupch1 = 'https://chat.whatsapp.com/HaT3rqLA0RBGjePOh0HgGG';
const grupch2 = 'https://chat.whatsapp.com/KOLxngyc6EeC9a4Rp84sC6';
const merenung = 'https://www.instagram.com/p/CCd6JSRJtNr/?igshid=1bb1pivqzs8yt';
//
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Scan kode qr mu cok!`);
});

conn.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();

conn.on('user-presence-update', json => console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by @serenyemnyem`))
conn.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
   console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by @serenyemnyem`)
})

conn.on('message-new', async(m) =>
{
   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
   let imageMessage = m.message.imageMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);


// Groups

if (text.includes("=buatgrup"))
   {
var nama = text.split("=buatgrup")[1].split("-nomor")[0];
var nom = text.split("-nomor")[1];
var numArray = nom.split(",");
for ( var i = 0; i < numArray.length; i++ ) {
    numArray[i] = numArray[i] +"@s.whatsapp.net";
}
var str = numArray.join("");
console.log(str)
const group = await conn.groupCreate (nama, str)
console.log ("created group with id: " + group.gid)
conn.sendMessage(group.gid, "hello everyone", MessageType.extendedText) // say hello to everyone on the group

}

// FF
if(text.includes("=cek")){
var num = text.replace(/=cek/ , "")
var idn = num.replace("0","+62");

console.log(id);
const gg = idn+'@s.whatsapp.net'

const exists = await conn.isOnWhatsApp (gg)
console.log(exists);
conn.sendMessage(id ,`${gg} ${exists ? " exists " : " does not exist"} on WhatsApp`, MessageType.text)
}

if (text.includes("=say")){
  const teks = text.replace(/=say /, "")
conn.sendMessage(id, teks, MessageType.text)
}

if (text.includes("=ytmp3")){
const teks = text.replace(/=ytmp3 /, "")
axios.get(`https://st4rz.herokuapp.com/api/yta?url=${teks}`).then((res) => {
    let hasil = `Audio telah tersedia pada link di bawah, silahkan klik link dan download hasilnya\n👇👇👇👇👇👇👇👇👇\n\nJudul: ${res.data.title}\n\nUkuran audio: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("=ytmp4")){
const teks = text.replace(/=yt /, "")
axios.get(`https://st4rz.herokuapp.com/api/ytv?url=${teks}`).then((res) => {
    let hasil = `Video telah tersedia pada link di bawah, silahkan klik link dan download hasilnya\n👇👇👇👇👇👇👇👇👇\n\nJudul: ${res.data.title}\n\nUkuran video: ${res.data.filesize}\n\nLink: ${res.data.result}`; 
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("=fb")){
const teks = text.replace(/=fb /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/epbe?url=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then((res) => {
    let hasil = `Berhasil! silahkan klik link di bawah untuk mendownload hasilnya!\n👇👇👇👇👇👇👇👇👇\n\nJudul: ${res.data.title}\n\nUkuran: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("=ig")){
const teks = text.replace(/=ig /, "")
axios.get(`https://st4rz.herokuapp.com/api/ig?url=${teks}`).then((res) => {
    let hasil = `Berhasil! silahkan klik link di bawah untuk mendownload hasilnya!\n👇👇👇👇👇👇👇👇👇\n\nUkuran: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("=twt")){
const teks = text.replace(/=twt /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/twit?url=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then((res) => {
    let hasil = `Download sendiri melalui link dibawah ya, takut servernya down xixi..\n\nJudul: ${res.data.title}\n\nSize: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("=wiki")){
const teks = text.replace(/=wiki /, "")
axios.get(`https://st4rz.herokuapp.com/api/wiki?q=${teks}`).then((res) => {
    let hasil = `Menurut Otak Ku Ini:\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text == '=help'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, menu.menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '=quran'){
axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}
else if (text == '!help'){
conn.sendMessage(id, 'LU SALAH KOMEN BEGEE, YANG BENER =help..' ,MessageType.text);
}
else if (text == '#menu'){
conn.sendMessage(id, 'LU SALAH KOMEN BEGEE, YANG BENER =help..' ,MessageType.text);
}
else if (text == 'Imam'){
conn.sendMessage(id, 'cari imam yah kak?, chat dia aja kakk 085779386736..' ,MessageType.text);
}
else if (text == 'Assalamualaikum'){
conn.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'assalamualaikum'){
conn.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'p'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'P'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'halo'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'hai'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'imam'){
conn.sendMessage(id, 'CARI IMAM YAH KAK?, INI CHAT DIA AJA 085779386736..' ,MessageType.text);
}
else if (text == 'woy'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'hi'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'gan'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'sis'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'kontol'){
conn.sendMessage(id, 'wih bang jago keluar nih, atuh jangan toxic ngâb banyak anak kecil udh dewasa kan?..' ,MessageType.text);
}
else if (text == 'Kontol'){
conn.sendMessage(id, 'wih bang jago keluar nih, atuh jangan toxic ngâb banyak anak kecil udh dewasa kan?..' ,MessageType.text);
}
else if (text == 'kntl'){
conn.sendMessage(id, 'wih bang jago keluar nih, atuh jangan toxic ngâb banyak anak kecil udh dewasa kan?..' ,MessageType.text);
}
else if (text == 'Kntl'){
conn.sendMessage(id, 'wih bang jago keluar nih, atuh jangan toxic ngâb banyak anak kecil udh dewasa kan?..' ,MessageType.text);
}
else if (text == 'Anjg'){
conn.sendMessage(id, 'wih bang jago keluar nih, atuh jangan toxic ngâb banyak anak kecil udh dewasa kan?..' ,MessageType.text);
}
else if (text == 'anjg'){
conn.sendMessage(id, 'wih bang jago keluar nih, atuh jangan toxic ngâb banyak anak kecil udh dewasa kan?..' ,MessageType.text);
}
else if (text == 'bro'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'min'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'sayang'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'i love u'){
conn.sendMessage(id, 'love you too' ,MessageType.text);
}
else if (text == 'mas'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'mba'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'bre'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'cuy'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'euy'){
conn.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik =help ya say..' ,MessageType.text);
}
else if (text == 'makasi'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Makasi'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'makasih'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Makasih'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'imam'){
conn.sendMessage(id, 'ah imam yah?, imam lagi jomblo tau:(, kalo mau kenalan sama dia chat nomer ini 085779386736' ,MessageType.text);
}
else if (text == 'Imam'){
conn.sendMessage(id, 'ah imam yah?, imam lagi jomblo tau:(, kalo mau kenalan sama dia chat nomer ini 085779386736' ,MessageType.text);
}
else if (text == 'thanks'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Thanks'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Ngentod'){
conn.sendMessage(id, 'Pengin ngentod?' ,MessageType.text);
}
else if (text == 'Anjing'){
conn.sendMessage(id, 'Jangan toxic anjing' ,MessageType.text);
}
else if (text == 'Bacot'){
conn.sendMessage(id, 'lu bacot_-' ,MessageType.text);
}
else if (text == 'Test'){
conn.sendMessage(id, 'Test 1,2,3 ketik =help' ,MessageType.text);
}
else if (text == 'Hai'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Woi'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Eoy'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Hi'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Gan'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Sis'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Bro'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Min'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Sayang'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh #help' ,MessageType.text);
}
else if (text == 'I love u'){
conn.sendMessage(id, 'love you too' ,MessageType.text);
}
else if (text == 'Mas'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Mba'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Bre'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Cuy'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'Euy'){
conn.sendMessage(id, 'Ya?, Ketik =help/=info/=donasi Contoh =help' ,MessageType.text);
}
else if (text == 'makasi'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Makasi'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'makasih'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Makasih'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'thank'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Thank'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'thanks'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == 'Thanks'){
conn.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text);
}
else if (text == '=donate'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '=donasi'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '=DONATE'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '=DONASI'){
  const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '=info'){
  const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, info.info(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text);
}
else if (text == '=p'){
conn.sendMessage(id, 'kirim =p cewek/cowok\n\nContoh: =p cewek' ,MessageType.text);
}
else if (text == '=iklan'){
conn.sendMessage(id, '📺 *IKLAN* : *INSTAGRAM: @serenyemnyem*\n\n♨️ GROUP NGOBROL [1] : https://chat.whatsapp.com/FPveeKtkbNaGo2BfPC5hcx\n\n♨️ CHILL GROUP [2] : https://chat.whatsapp.com/KOLxngyc6EeC9a4Rp84sC6\n\n😭 MERENUNG: https://www.instagram.com/p/CCd6JSRJtNr/?igshid=1bb1pivqzs8yt\n\n♻️ Mau pasang iklan di *Choper?*\n\n☎️ WA : *085779386736*' ,MessageType.text);
}
   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '=sticker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
         });
      }
   }

if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '=stiker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
         });
      }
   }
   
   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '=s')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
         });
      }
   }

   if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == '=pantun')
      {

         fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text)
            });
      }

   }
   
   if (text.includes("=p cewek"))
   {
    var items = ["aesthetic cewe korea", "aesthetic cewe chinese", "cewe rusia", "cewe russian"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
            conn.sendMessage(id, 'TUNGGU YAH KAK, LAGI DI CARI NIH😊...', MessageType.text)
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
}
   if (text.includes("=p cowok"))
   {
    var items = ["aesthetic cowo korea", "korean boy", "chinese boy", "japan boy"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cowok =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cowok) // Path to the image
        .then(
            (response) => {
            conn.sendMessage(id, 'TUNGGU YAH KAK, LAGI DI CARI NIH😊...', MessageType.text)
  var buf = Buffer.from(response, 'base64'); // Ta-da 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

if (text.includes("=randomanime"))
   {
    var items = ["wallpaper android anime", "anime"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var anime =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(anime) // Path to the image
        .then(
            (response) => {
            conn.sendMessage(id, 'TUNGGU YAH KAK, LAGI DI CARI NIH😊...', MessageType.text)
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
    if (text.includes("=aesthetic"))
   {
    var items = ["aesthetic hd"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var aesthetic =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(aesthetic) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
    if (text.includes("=whp"))
   {
    var items = ["wallpaper android hd"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var wallpaper android =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(wallpaper android) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
    if (text.includes("=wpc"))
   {
    var items = ["wallpaper komputer hd"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var wallpaper komputer =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(wallpaper komputer) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
if (text.includes("=loli"))
   {
    var items = ["anime loli"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var loli =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(loli) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
if (text.includes("=pokemon"))
   {
    var items = ["anime pokemon"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var pokemon =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(pokemon) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
if (text.includes("=neko"))
   {
    var items = ["anime ero neko", "anime neko"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var neko =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(neko) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
if (text.includes("=husbu"))
   {
    var items = ["anime husbu", "anime shota"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var husbu =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(husbu) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
if (text.includes("=waifu"))
   {
    var items = ["anime waifu", "waifu"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var waifu =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(waifu) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
if (text.includes("=ero"))
   {
    var items = ["anime lewd", "anime ahegao"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var milf =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(milf) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
if (text.includes("=scdl")){
const fs = require("fs");
const scdl = require("./lib/scdl");

scdl.setClientID("iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX");

scdl("https://m.soundcloud.com/abdul-muttaqin-701361735/lucid-dreams-gustixa-ft-vict-molina")
    .pipe(fs.createWriteStream("mp3/song.mp3"));
}
 else if (text.includes("=tts")) {
  var teks = text.split("=ttsid ")[1];
  var path = require('path');
  var text1 = teks.slice(6);
  text1 = suara;
  var suara = text.replace(/=ttsid/g, text1);
  var filepath = 'mp3/bacot.wav';
  
  
/*
 * save audio file
 */

gtts.save(filepath, suara, function() {
  console.log(`${filepath} MP3 SAVED!`)
});
await new Promise(resolve => setTimeout(resolve, 500));

	if(suara.length > 200){ // check longness of text, because otherways google translate will give me a empty file
  msg.reply("Text kepanjangan bro!")
}else{

const buffer = fs.readFileSync(filepath)
	conn.sendMessage(id , buffer , MessageType.audio);

};
}
 if (text.includes("=covid"))
   {
const get = require('got')
    const body = await get.post('https://api.kawalcorona.com/indonesia', {

    }).json();
    var positif = (body[0]['positif']);
    var sembuh  = (body[0]['sembuh']);
    var meninggal = (body[0]['meninggal']);
    var dirawat = (body[0]['dirawat']);
    console.log(body[0]['name'])
    conn.sendMessage(id,`😭🤒DATA WABAH COVID-19 TERBARU DI INDONESIA😔😊\n\n😔Positif ==> ${positif} \n😊Sembuh ==> ${sembuh} \n😭Meninggal ==> ${meninggal}\n🤒Dirawat ==> ${dirawat}`, MessageType.text);
}
   if (text.includes("=quotes"))
   {
      var url = 'https://jagokata.com/kata-bijak/acak.html'
      axios.get(url)
         .then((result) =>
         {
            let $ = cheerio.load(result.data);
            var author = $('a[class="auteurfbnaam"]').contents().first().text();
            var kata = $('q[class="fbquote"]').contents().first().text();

            conn.sendMessage(
               id,
               `
      Quotes untuk 
*${id.split("@s.whatsapp.net")[0]}*
     _${kata}_
        
    
	*~${author}*
         `, MessageType.text
            );

         });
}
   else if (text.includes("=nama ")) 
  {
    const cheerio = require('cheerio');
    const request = require('request');
    var nama = text.split("=nama ")[1];
    var req = nama.replace(/ /g,"+");
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/arti_nama.php?nama1='+ req +'&proses=+Submit%21+',
      },function(error, response, body){
          let $ = cheerio.load(body);
          var y = $.html().split('arti:')[1];
          var t = y.split('method="get">')[1];
          var f = y.replace(t ," ");
          var x = f.replace(/<br\s*[\/]?>/gi, "\n");
          var h  = x.replace(/<[^>]*>?/gm, '');
      console.log(""+ h);
      conn.sendMessage(id,
            `
      Halo *${id.split("@s.whatsapp.net")[0]}*
      Arti dari namamu adalah

  ***********************************
         Nama _*${nama}*_ ${h}
  ***********************************

`,
 MessageType.text);
  });
}
  else if (text.includes("=pasangan ")) {
    const request = require('request');
    var gh = text.split("=pasangan ")[1];
    var namamu = gh.split("&")[0];
    var pasangan = gh.split("&")[1];
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+ namamu +'&nama2='+ pasangan +'&proses=+Submit%21+',

    },function(error, response, body){
        let $ = cheerio.load(body);
      var y = $.html().split('<b>KECOCOKAN JODOH BERDASARKAN NAMA PASANGAN</b><br><br>')[1];
        var t = y.split('.<br><br>')[1];
        var f = y.replace(t ," ");
        var x = f.replace(/<br\s*[\/]?>/gi, "\n");
        var h  = x.replace(/<[^>]*>?/gm, '');
        var d = h.replace("&amp;", '&')
      console.log(""+ d);
      conn.sendMessage(id, `

************************************

 *Kecocokan berdasarkan nama*


 ${d}


************************************
    `, MessageType.text);
  });
}
if (text.includes("=lirik")){
	const teks = text.split("=lirik")[1]
	axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then ((res) => {
	conn.sendMessage(id, 'TUNGGU YAH KAK, LAGI DI CARI NIH😊...', MessageType.text)
	 	let hasil = `LIRIK DARI LAGU ${teks} ADALAH\n\n\n ${res.data.result.lirik}`
	conn.sendMessage(id, hasil, MessageType.text)
	})
}
if (text.includes("=alay")){
	const alay = text.split("=alay")[1]
	axios.get(`https://api.terhambar.com/bpk?kata=${alay}`).then ((res) =>
		{ let hasil = `${res.data.text}`
		conn.sendMessage(id, hasil, MessageType.text)
	})
}
if (text.includes("=sholat")){
  const teks = text.replace(/=sholat /, "")
  axios.get(`https://api.haipbis.xyz/jadwalsholat?daerah=${teks}`).then ((res) =>{
  conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
  let hasil = `Jadwal sholat di ${teks} hari ini adalah\n\nâš¡Imsyak : ${res.data.Imsyak}\nâš¡Subuh : ${res.data.Subuh} WIB\nâš¡Dzuhur : ${res.data.Dzuhur}WIB\nâš¡Ashar : ${res.data.Ashar} WIB\nâš¡Maghrib : ${res.data.Maghrib}\nâš¡Isya : ${res.data.Isya} WIB\nâš¡Tengah malam : ${res.data.Dhuha} WIB`;
  conn.sendMessage(id, hasil, MessageType.text);
})
}
// NEW FITUR
if (text.includes("=tiktok")) {
const tictoc = text.replace(/=tiktok /, "")
axios.get(`http://scrap.terhambar.com/tiktokfull?link=${tictoc}`).then((res) => {
	 conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
     let titoe = `Berhasil$$$ Silahkan klik link dibawah ini untuk mendownload hasilnya$ \nKlik link dibawah Ya\n\nJudul: ${res.data.deskripsi} \n\nDurasi: ${res.data.durasi}\n\nNama: ${res.data.nama}\n\nUrl: ${res.data.urlvideo}`;
conn.sendMessage(id, titoe, MessageType.text);
})
}
if (text.includes("=igstalk")){
  const teks = text.replace(/=igstalk /, "")
  axios.get(`https://st4rz.herokuapp.com/api/stalk?username=${teks}`).then ((res) =>{
  conn.sendMessage(id, '[WAIT] Searching...⏳', MessageType.text)
  let hasil = `BIODATA INSTAGRAM ATAS NAMA _${teks}_ \n\n *Username✍️* : _${res.data.Username}_ \n *Nama✍️* : _${res.data.Name}_ \n *Jumlah Followers✍️* : _${res.data.Jumlah_Followers}_ \n *Jumlah_Following✍️* : _${res.data.Jumlah_Following}_ \n *Jumlah_Post✍️* : _${res.data.Jumlah_Post}_ `;
  conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("=infogempa")){
  const teks = text.replace(/=infogempa /, "")
  axios.get(`https://st4rz.herokuapp.com/api/infogempa`).then ((res) =>{
  conn.sendMessage(id, '[WAIT] Searching...⏳', MessageType.text)
  let hasil = ` *INFO GEMPA* \n\ *Lokasi* : _${res.data.lokasi}_ \n *Kedalaman✍️* : _${res.data.kedalaman}_ \n *Koordinat✍️* : _${res.data.koordinat}_ \n *Magnitude✍️* : _${res.data.magnitude}_ \n *Waktu✍️* : _${res.data.waktu}_ `;
  conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("=chord")){
const teks = text.replace(/=chord /, "")
axios.get(`https://st4rz.herokuapp.com/api/chord?q=${teks}`).then((res) => {
	conn.sendMessage(id, '[WAIT] Searching...⏳', MessageType.text)
    let hasil = `*Nih Cord Lagu ${teks} kak* \n\nCord: _${res.data.result}_ `;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}
if (text.includes('=nulis')){
  var teks = text.replace(/=nulis /, '')
    axios.get('https://bangandre.herokuapp.com/nulis?teks='+teks)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, 'Bentar Lah Aku Lagi Nulis😵', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}
if (text.includes("=hentai"))
   {
    var items = ["nsfwneko","anime hentai"];
    var anim = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.computerfreaker.cf/v1/";
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var anim =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(anim) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
if (text.includes("=meme"))
   {
    var items = ["meme Indonesia"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cowok =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cowok) // Path to the image
        .then(
            (response) => {
            conn.sendMessage(id, 'TUNGGU YAH KAK, LAGI DI CARI NIH😊...', MessageType.text)
  var buf = Buffer.from(response, 'base64'); // Ta-da 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

   // bye: Imam Syahfa P.


})
