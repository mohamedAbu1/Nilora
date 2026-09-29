const mascotBubble = document.querySelector('#mascotBubble');
const mascotButton = document.querySelector('#mascotButton');
const mascotLines = ['أهلاً! أنا فرفور… جاهز نكتشف مصر؟','السؤال المهم: كشري بعد الزيارة ولا قبلها؟','أنا حافظ الطرق كلها… إلا طريق الرجوع من البازار!','مصر واسعة، بس الحكاية دايمًا قريبة.'];
let lineIndex = 0;
function talk(line){ mascotBubble.innerHTML = line; mascotBubble.classList.remove('pop'); void mascotBubble.offsetWidth; mascotBubble.classList.add('pop'); }
mascotButton.addEventListener('click',()=>{lineIndex=(lineIndex+1)%mascotLines.length;talk(mascotLines[lineIndex]);});
document.querySelectorAll('[data-mascot]').forEach(btn=>btn.addEventListener('click',()=>talk(btn.dataset.mascot)));
document.querySelectorAll('[data-scroll]').forEach(btn=>btn.addEventListener('click',()=>document.querySelector(btn.dataset.scroll).scrollIntoView({behavior:'smooth'})));
const days = document.querySelector('#days'); const dayValue = document.querySelector('#dayValue');
days.addEventListener('input',()=>dayValue.textContent=days.value);
document.querySelectorAll('.mood').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.mood').forEach(m=>m.classList.remove('active'));btn.classList.add('active');}));
document.querySelector('#planBtn').addEventListener('click',()=>{const mood=document.querySelector('.mood.active').dataset.mood; const plans={استكشاف:['مصر الكلاسيكية','القاهرة · الأقصر · أسوان'],استرخاء:['على مهلك يا باشا','الغردقة · دهب · مرسى علم'],مغامرة:['الطريق الأقل زحمة','واحة سيوة · نويبع · سانت كاترين']}; const [title,places]=plans[mood]; document.querySelector('#planResult h3').textContent=title;document.querySelector('#planResult>p').textContent=places;talk(`تمام يا بطل! عملت لك خطة ${days.value} أيام على مود ${mood}.`);document.querySelector('#planResult').scrollIntoView({behavior:'smooth',block:'center'});});
