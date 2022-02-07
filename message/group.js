const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")
const moment = require("moment-timezone")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./setting.json'))
prefix = setting.prefix

module.exports = welcome = async (dha, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await dha.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await dha.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://i.postimg.cc/SN54m6LW/SAVE-20210728-133334.jpg'
            }
            if (anu.action == 'add' && mem.includes(dha.user.jid)) {
            dha.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik ${prefix}menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(dha.user.jid)) {
             if (!welkom.includes(anu.jid)) return

                thu = await dha.getStatus(anu.participants[0], MessageType.text)
                mdata = await dha.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = dha.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                teks = `Hallo @${num.split('@')[0]}, \n*Status User:* \n┏━━>Nomor: *${num.split('@')[0]}*\n┣ •Bɪᴏ* : *${thu.status}*\n┗━━━>Mᴇᴍʙᴇʀs : ${memeg}*\n\n Selamat Datang di ${mdata.subject}\n*SEMOGA BETAH YAH^_^* `
	            hehe = await getBuffer(pp_user)
                buttons = [{buttonId: `#y`,buttonText:{displayText: 'WELCOME ^_^'},type:1}]
                imageMsg = (await dha.prepareMessageMedia((hehe), 'imageMessage', {thumbnail: hehe})).imageMessage
                buttonsMessage = { contentText: `${teks}`, footerText: 'jangan Langgar Rules yah kak', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await dha.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                dha.relayWAMessage(prep)
}
            if (anu.action == 'remove' && !mem.includes(dha.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await dha.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = dha.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                memeg = mdata.participants.length
                out = `Byee ${anu_user}`
                hehe = await getBuffer(pp_user)
                buttons = [{buttonId: `#y`,buttonText:{displayText: 'ASIK SI BEBAN OUT'},type:1}]
                imageMsg = (await dha.prepareMessageMedia((hehe), 'imageMessage', {thumbnail: hehe})).imageMessage
                buttonsMessage = { contentText: `${out}`, footerText: 'akhirnya si beban out juga 🗿', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await dha.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                dha.relayWAMessage(prep)
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}