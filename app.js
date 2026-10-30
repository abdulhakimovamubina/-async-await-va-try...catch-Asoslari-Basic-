// 1. Funksiya oldiga `async` kalit so'zi qo'yilsa, u har doim nima (`qanday obyekt`) qaytaradi va `await` kalit so'zini `async` bo'lmagan oddiy funksiya ichida ishlatsak nima sodir bo'ladi?
// javob: async funksiya doim promise qaytaradi,awaitni async siz oddiy funksiya ichida ishlatilsa xatolik beradi.
// 2. Oldingi darsda `Promise` xatoliklarini `.catch()` bilan ushlagan edik. `async / await` ishlatganda `reject` bo'lgan xatolikni qaysi blok (`...`) yordamida ushlab olamiz?
// javob: try...catch bloki yordamida.


//1-TOPSHIRIQ

function sendSmsCode() {
    return new Promise((resolve) => {
        resolve("tasdiqlash kodi: 7788");
    });
}

async function verifyPhone() {
    const smsResult = await sendSmsCode();
    console.log(smsResult);
}

verifyPhone();


//2-TOPSHIRIQ
function connectServer() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("CS2 serveriga mevaffaqiyatli ulandingiz (Ping: 18ms)");
        },200);
    });
}
async function startGame() {
    console.log("server qidirilmoqda...");
    const result = await connectServer();
    console.log(result);
}
startGame();
    

//3-TOPSHIRIQ

function unlockFaceId(isFaceMatched) {
  return new Promise((resolve, reject) => {
    if (isFaceMatched) {
      resolve(" Telefon qulfi ochildi! Xush kelibsiz!");
    } else {
      reject(" Xatolik: Yuz tanilmadi! Qayta urinib ko'ring.");
    }
  });
}

async function openPhone() {
  try {
    // 1. try blokida await bilan unlockFaceId(false) ni chaqiramiz:
    const res = await unlockFaceId(false);
    console.log(res);
  } catch (error) {
    // 2. catch blokida xatolikni chiqaramiz:
    console.log(error);
  }
}

openPhone();


//4-TOPSHIRIQ 
function payMoney(amount) {
    const cardBalance = 150000;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amount <= cardBalance) {
                resolve(`to'lov o'tdi, qoldiq: ${cardBalance - amount} som`);
            } else {
                reject("xatolik: kartada mablag' yetarli emas");
            }
        }, 1000);
    });
}
async function makePayment() {
    try {
        const result = await payMoney(120000);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
makePayment();


//5-TOPSHIRIQ
function checkLuggage(weight) {
    return new Promise((resolve, reject) => {
        if (weight <= 23) {
            resolve(`bagaj qabul qilindi (${weight} kg) oq yol!`);
        } else {
            reject(`bagaj og'ir(${weight} kg) limit: 23kg.`)
        }
    });
}
async function checkPassenger() {
    try {
        const status = await checkLuggage (28);
        console.log(status);
    }catch (error) {
        console.log(error);
    } finally {
        console.log("bojxona tekshiruvi yakunlandi");
    }
}

checkPassenger();


//6-TOPSHIRIQ

function chargeBattery(currentPercent, addPercent) {
    return new Promise((resolve ) => {
        setTimeout(() => {
            resolve(currentPercent + addPercent );
        }, 500);
    });
}
async function fullCharge() {
    const initialBattery = 20;
    const step1 = await chargeBattery(initialBattery, 40);
    console.log(`1-bosqich: ${step1}% boldi`);
    const step2 = await chargeBattery(step1, 40);
    console.log(`zaryadlash tugadi: ${step2}% tayyor`);
}
fullCharge();


//7-TOPSHIRIQ

const song1 = { title: "Nightcall", isPremium: true };
const song2 = { title: "Starboy", isPremium: false };

function downloadTrack(track) {
    return new Promise((resolve, reject) => {
        setTimeout (() => {
            if (track.isPremium) {
                resolve(`yuklab olindi: ${track.title} (320kbps)`);
            } else {
                reject(`xatolik: ${track.title} qo'shig'ini yuklab uchun Premium obuna kerak`);
            }
        }, 1000);
    });
}

async function saveTrack(song) {
    try {
        const result = await downloadTrack(song);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
saveTrack(song1);
     

//8-TOPSHIRIQ

class AtmAccount {
    constructor(ownerName, pinCode, balance) {
        this.ownerName = ownerName;
        this.pinCode = pinCode;
        this.balance = balance;
    }
    withdrawCash(enteredPin, amount) {
        return new Promise((resolve, reject) => {
            setTimeout (() => {
                if (enteredPin !== this.pinCode) {
                    reject("xatolik: PIN-kod noto'g'ri");
                } else if (amount > this.balance) {
                    reject("xatolik: hisobda mablag' yetarli emas");
                } else {
                    this.balance -= amount;
                    resolve(`marhamat, ${this.ownerName} ${amount} so'm yechildi. Qoldiq: ${this.balance} so'm`);
                }
            }, 1500);
        });
    }
}
const clientCard = new AtmAccount ("Sardor", 4455, 500000);
async function useAtm() {
    try {
        const result = await clientCard.withdrawCash(4455, 200000);
        console.log(result);
    } catch (error) {
        console.log(error);
    } finally {
        console.log("kartangizni olishni unutmang");
    }
}
    useAtm();
