// ===== LANG INDICATOR =====
function updateIndicator() {
    const indicator = document.getElementById('langIndicator');
    const switcher  = document.getElementById('langSwitcher');
    if (!indicator || !switcher) return;
    const lang      = document.documentElement.lang;
    const activeBtn = document.getElementById(lang === 'uz' ? 'btn-uz' : 'btn-ru');
    if (!activeBtn) return;
    const bRect = activeBtn.getBoundingClientRect();
    const sRect = switcher.getBoundingClientRect();
    indicator.style.left  = (bRect.left - sRect.left) + 'px';
    indicator.style.width = bRect.width + 'px';
}
window.addEventListener('load',   updateIndicator);
window.addEventListener('resize', updateIndicator);

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('main-nav');
const header    = document.querySelector('.header');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        header.classList.toggle('nav-open');
    });
}

// ===== TELEGRAM BOT =====
const BOT_TOKEN = "8549467479:AAExHAj8dQSeFw_y89BnNI_QUJ8C8-xUyRg";
const CHAT_ID   = "5382964932";
const form      = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const isUz = document.documentElement.lang === 'uz';
        const fields = [
            { label: isUz ? "O'quvchi familiyasi" : "Фамилия ученика",  id: "stuLastName"  },
            { label: isUz ? "O'quvchi ismi"       : "Имя ученика",       id: "stuFirstName" },
            { label: isUz ? "Ota-ona familiyasi"  : "Фамилия родителя", id: "parLastName"  },
            { label: isUz ? "Ota-ona ismi"        : "Имя родителя",     id: "parFirstName" },
            { label: isUz ? "Telefon"             : "Телефон",           id: "phone"        },
            { label: "Email",                                             id: "email"        },
            { label: isUz ? "Sinf"               : "Класс",              id: "select"       },
            { label: isUz ? "Izoh"               : "Комментарий",        id: "additional"   },
        ];
        let message = "📋 *Yangi ariza — 58-Maktab*\n\n";
        fields.forEach(f => {
            const el = form.querySelector('#' + f.id);
            message += `*${f.label}:* ${el ? el.value || "—" : "—"}\n`;
        });
        try {
            const res  = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "Markdown" })
            });
            const data = await res.json();
            if (data.ok) {
                alert(isUz ? "✅ Ariza muvaffaqiyatli yuborildi!" : "✅ Заявка успешно отправлена!");
                form.reset();
            } else {
                alert(isUz ? "❌ Xatolik yuz berdi!" : "❌ Произошла ошибка!");
            }
        } catch {
            alert(isUz ? "❌ Internet bilan muammo!" : "❌ Проблема с интернетом!");
        }
    });
}