
// ==========================================
// PHARMAX LABEL APP - DATA FILE (v1.39)
// ==========================================

const APP_VERSION = 'v1.39';
const DATA_BUILD = '20261026-1';   // v1.38: ต้องตรงกับ <meta name="pmx-build"> ใน index.html — ไม่ตรง = เบราว์เซอร์ค้างไฟล์เก่า → หน้าเว็บขึ้นแถบให้รีเฟรช

// ===== v1.36: คำศัพท์มาตรฐาน — แหล่งเดียวของ dropdown (index.html, ฟอร์มเพิ่มยา, หน้าแอดมิน) และคำแปลตั้งต้นของ medical_glossary =====
// ข้อความไทย (th) ตรงกับที่บันทึกใน drugTH ทุกตัว · tr = คำแปล 15 ภาษา (ปุ่ม "🔄 ซิงก์ glossary" ในหน้าแอดมินเขียนชุดนี้ลง medical_glossary)
// ถ้าแก้คำแปลในแท็บ medical_glossary เอง ฉลากจะใช้คำใน glossary ก่อนเสมอ
const DRUG_TYPE_GROUPS = [
    { label: "รับประทาน (Swallowed/Oral)", options: [
        { value: "tablet", th: "ยาเม็ด", label: "ยาเม็ด (Tablets)", tr: {"en":"Tablets","ja":"錠剤","zh-CN":"片剂","zh-TW":"錠劑","ko":"정제","es":"Comprimidos","fr":"Comprimés","it":"Compresse","de":"Tabletten","ru":"Таблетки","ar":"أقراص","vi":"Thuốc viên nén","km":"ថ្នាំគ្រាប់","my":"ဆေးပြား","hi":"गोलियाँ"} },
        { value: "effervescent", th: "ยาเม็ดฟู่ละลายน้ำ", label: "ยาเม็ดฟู่ละลายน้ำ (Effervescent tablets)", tr: {"en":"Effervescent tablets","ja":"発泡錠","zh-CN":"泡腾片","zh-TW":"發泡錠","ko":"발포정","es":"Comprimidos efervescentes","fr":"Comprimés effervescents","it":"Compresse effervescenti","de":"Brausetabletten","ru":"Шипучие таблетки","ar":"أقراص فوارة","vi":"Viên sủi","km":"ថ្នាំគ្រាប់ពពុះ","my":"အမြှုပ်ထွက်ဆေးပြား","hi":"इफ़र्वेसेंट गोलियाँ"} },
        { value: "capsule", th: "ยาแคปซูล", label: "ยาแคปซูล (Capsules)", tr: {"en":"Capsules","ja":"カプセル","zh-CN":"胶囊","zh-TW":"膠囊","ko":"캡슐","es":"Cápsulas","fr":"Gélules","it":"Capsule","de":"Kapseln","ru":"Капсулы","ar":"كبسولات","vi":"Thuốc viên nang","km":"ថ្នាំគ្រាប់ស្រោម","my":"ဆေးတောင့်","hi":"कैप्सूल"} },
        { value: "solution", th: "ยาน้ำ", label: "ยาน้ำ (Liquid medicine)", tr: {"en":"Liquid medicine","ja":"液剤","zh-CN":"液体制剂","zh-TW":"液體製劑","ko":"액제","es":"Medicamento líquido","fr":"Médicament liquide","it":"Farmaco liquido","de":"Flüssiges Arzneimittel","ru":"Жидкое лекарство","ar":"دواء سائل","vi":"Thuốc dạng lỏng","km":"ថ្នាំទឹក","my":"ဆေးရည်","hi":"तरल दवा"} },
        { value: "syrup", th: "ยาน้ำเชื่อม", label: "ยาน้ำเชื่อม (Syrup)", tr: {"en":"Syrup","ja":"シロップ剤","zh-CN":"糖浆剂","zh-TW":"糖漿劑","ko":"시럽제","es":"Jarabe","fr":"Sirop","it":"Sciroppo","de":"Sirup","ru":"Сироп","ar":"شراب","vi":"Siro","km":"ថ្នាំស៊ីរ៉ូ","my":"ဆေးရည် (ဆီးရပ်)","hi":"सिरप"} },
        { value: "suspension", th: "ยาน้ำแขวนตะกอน", label: "ยาน้ำแขวนตะกอน (Suspension)", tr: {"en":"Suspension","ja":"懸濁剤","zh-CN":"混悬剂","zh-TW":"懸浮液劑","ko":"현탁제","es":"Suspensión","fr":"Suspension","it":"Sospensione","de":"Suspension","ru":"Суспензия","ar":"معلق","vi":"Hỗn dịch","km":"ថ្នាំសារធាតុព្យួរ","my":"ရောနှောဆေးရည်","hi":"सस्पेंशन"} },
        { value: "emulsion", th: "ยาน้ำอิมัลชัน", label: "ยาน้ำอิมัลชัน (Emulsion)", tr: {"en":"Emulsion","ja":"乳剤","zh-CN":"乳剂","zh-TW":"乳劑","ko":"유제","es":"Emulsión","fr":"Émulsion","it":"Emulsione","de":"Emulsion","ru":"Эмульсия","ar":"مستحلب","vi":"Nhũ tương","km":"ថ្នាំអេមុលស្យុង","my":"အီမာလ်ရှင်း","hi":"इमल्शन"} },
        { value: "powder", th: "ยาผง", label: "ยาผง (Powdered medicine)", tr: {"en":"Powdered medicine","ja":"散剤・粉末薬","zh-CN":"散剂/粉剂","zh-TW":"散劑/粉劑","ko":"산제/가루약","es":"Medicamento en polvo","fr":"Médicament en poudre","it":"Farmaco in polvere","de":"Pulver","ru":"Порошок","ar":"دواء مسحوق","vi":"Thuốc bột","km":"ថ្នាំម្សៅ","my":"ဆေးမှုန့်","hi":"चूर्ण / पाउडर दवा"} },
        { value: "granule", th: "เกล็ด/แกรนูล", label: "เกล็ด/แกรนูล (Granules)", tr: {"en":"Granules","ja":"顆粒剤","zh-CN":"颗粒剂","zh-TW":"顆粒劑","ko":"과립제","es":"Gránulos","fr":"Granulés","it":"Granulato","de":"Granulat","ru":"Гранулы","ar":"حبيبات","vi":"Thuốc cốm","km":"ថ្នាំគ្រាប់ល្អិត","my":"အမှုန်အစေ့ဆေး","hi":"दाने (ग्रैन्यूल्स)"} },
        { value: "lozenge", th: "ยาอม", label: "ยาอม (Lozenges)", tr: {"en":"Lozenges","ja":"トローチ剤","zh-CN":"含片","zh-TW":"含片","ko":"트로키제","es":"Pastillas para chupar","fr":"Pastilles à sucer","it":"Pastiglie per la gola","de":"Halstabletten","ru":"Леденцы для рассасывания","ar":"أقراص استحلاب","vi":"Viên ngậm","km":"ថ្នាំបៀម","my":"ငုံဆေး","hi":"गले की गोली (लोज़ेंज)"} }
    ] },
    { label: "ใช้ทาผิวหนัง (Applied to Skin)", options: [
        { value: "topical", th: "ยาทาภายนอก", label: "ยาทาภายนอก (Topical medication)", tr: {"en":"Topical medication","ja":"外用薬","zh-CN":"外用药","zh-TW":"外用藥","ko":"외용제","es":"Medicamento tópico","fr":"Médicament à usage topique","it":"Farmaco topico","de":"Topisches Arzneimittel","ru":"Препарат для наружного применения","ar":"دواء موضعي","vi":"Thuốc dùng ngoài","km":"ថ្នាំលាបក្រៅ","my":"လိမ်းဆေး","hi":"त्वचा पर लगाने की दवा"} },
        { value: "external", th: "ยาใช้ภายนอก", label: "ยาใช้ภายนอก (For external use)", tr: {"en":"For external use","ja":"外用薬","zh-CN":"外用药","zh-TW":"外用藥","ko":"외용약","es":"Medicamento de uso externo","fr":"Médicament à usage externe","it":"Medicinale per uso esterno","de":"Zur äußerlichen Anwendung","ru":"Препарат для наружного применения","ar":"دواء للاستعمال الخارجي","vi":"Thuốc dùng ngoài","km":"ថ្នាំប្រើខាងក្រៅ","my":"ပြင်ပသုံးဆေး","hi":"बाहरी उपयोग की दवा"} },
        { value: "ointment", th: "ยาขี้ผึ้ง", label: "ยาขี้ผึ้ง (Ointment)", tr: {"en":"Ointment","ja":"軟膏","zh-CN":"软膏","zh-TW":"軟膏","ko":"연고","es":"Pomada","fr":"Pommade","it":"Unguento","de":"Salbe","ru":"Мазь","ar":"مرهم","vi":"Thuốc mỡ","km":"ថ្នាំលាប","my":"ဆေးလိမ်း","hi":"मरहम"} },
        { value: "cream", th: "ครีม", label: "ครีม (Cream)", tr: {"en":"Cream","ja":"クリーム","zh-CN":"乳膏","zh-TW":"乳膏","ko":"크림","es":"Crema","fr":"Crème","it":"Crema","de":"Creme","ru":"Крем","ar":"كريم","vi":"Kem bôi","km":"ក្រែម","my":"ခရင်မ်","hi":"क्रीम"} },
        { value: "gel", th: "เจล", label: "เจล (Gel)", tr: {"en":"Gel","ja":"ゲル剤","zh-CN":"凝胶剂","zh-TW":"凝膠劑","ko":"겔","es":"Gel","fr":"Gel","it":"Gel","de":"Gel","ru":"Гель","ar":"جل","vi":"Gel","km":"ជែល","my":"ဂျယ်လ်","hi":"जेल"} },
        { value: "paste", th: "เพสต์", label: "เพสต์ (Paste)", tr: {"en":"Paste","ja":"パスタ剤","zh-CN":"糊剂","zh-TW":"糊劑","ko":"페이스트","es":"Pasta","fr":"Pâte","it":"Pasta","de":"Paste","ru":"Паста","ar":"معجون","vi":"Hồ/Paste","km":"ថ្នាំខាប់ (Paste)","my":"ဆေးပျစ် (Paste)","hi":"पेस्ट"} },
        { value: "patch", th: "แผ่นแปะและพลาสเตอร์", label: "แผ่นแปะและพลาสเตอร์ (Patches and plasters)", tr: {"en":"Patches and plasters","ja":"湿布・プラスター剤","zh-CN":"贴剂","zh-TW":"貼劑","ko":"패치제","es":"Parches / emplastos","fr":"Emplâtres et patchs","it":"Cerotti medicati","de":"Pflaster","ru":"Пластыри","ar":"لصقات طبية","vi":"Miếng dán / cao dán","km":"បន្ទះបិទ","my":"ကပ်ခွာဆေး","hi":"पैच / प्लास्टर"} }
    ] },
    { label: "ฉีดเข้าร่างกาย (Injection)", options: [
        { value: "iv", th: "ฉีดเข้าเส้นเลือดดำ", label: "ฉีดเข้าเส้นเลือดดำ (Intravenous Injection (IV))", tr: {"en":"Intravenous Injection (IV)","ja":"静脈内注射","zh-CN":"静脉注射","zh-TW":"靜脈注射","ko":"정맥주사","es":"Inyección intravenosa (IV)","fr":"Injection intraveineuse (IV)","it":"Iniezione endovenosa (IV)","de":"Intravenöse Injektion (IV)","ru":"Внутривенная инъекция","ar":"حقن وريدي","vi":"Tiêm tĩnh mạch","km":"ចាក់តាមសរសៃឈាម","my":"သွေးကြောထဲသို့ ထိုးဆေး","hi":"नस में इंजेक्शन (IV)"} },
        { value: "im", th: "ฉีดเข้ากล้ามเนื้อ", label: "ฉีดเข้ากล้ามเนื้อ (Intramuscular Injection (IM))", tr: {"en":"Intramuscular Injection (IM)","ja":"筋肉内注射","zh-CN":"肌肉注射","zh-TW":"肌肉注射","ko":"근육주사","es":"Inyección intramuscular (IM)","fr":"Injection intramusculaire (IM)","it":"Iniezione intramuscolare (IM)","de":"Intramuskuläre Injektion (IM)","ru":"Внутримышечная инъекция","ar":"حقن عضلي","vi":"Tiêm bắp","km":"ចាក់តាមសាច់ដុំ","my":"ကြွက်သားထဲသို့ ထိုးဆေး","hi":"मांसपेशी में इंजेक्शन (IM)"} },
        { value: "sc", th: "ฉีดใต้ผิวหนัง", label: "ฉีดใต้ผิวหนัง (Subcutaneous Injection (SC))", tr: {"en":"Subcutaneous Injection (SC)","ja":"皮下注射","zh-CN":"皮下注射","zh-TW":"皮下注射","ko":"피하주사","es":"Inyección subcutánea (SC)","fr":"Injection sous-cutanée (SC)","it":"Iniezione sottocutanea (SC)","de":"Subkutane Injektion (SC)","ru":"Подкожная инъекция","ar":"حقن تحت الجلد","vi":"Tiêm dưới da","km":"ចាក់ក្រោមស្បែក","my":"အရေပြားအောက်ထိုးဆေး","hi":"त्वचा के नीचे इंजेक्शन (SC)"} }
    ] },
    { label: "ใช้กับเยื่อเมือก (Mucous Membranes)", options: [
        { value: "sublingual", th: "ยาอมใต้ลิ้น", label: "ยาอมใต้ลิ้น (Sublingual Tablet)", tr: {"en":"Sublingual Tablet","ja":"舌下錠","zh-CN":"舌下片","zh-TW":"舌下錠","ko":"설하정","es":"Comprimido sublingual","fr":"Comprimé sublingual","it":"Compressa sublinguale","de":"Sublingualtablette","ru":"Подъязычная таблетка","ar":"قرص تحت اللسان","vi":"Viên đặt dưới lưỡi","km":"គ្រាប់ក្រោមអណ្តាត","my":"လျှာအောက်ဆေးပြား","hi":"जीभ के नीचे रखने वाली गोली"} },
        { value: "buccal", th: "ยาอมกระพุ้งแก้ม", label: "ยาอมกระพุ้งแก้ม (Buccal Tablet)", tr: {"en":"Buccal Tablet","ja":"バッカル錠","zh-CN":"颊含片","zh-TW":"頰含錠","ko":"볼점막정","es":"Comprimido bucal","fr":"Comprimé buccal","it":"Compressa buccale","de":"Bukkaltablette","ru":"Защёчная таблетка","ar":"قرص شدقي","vi":"Viên ngậm má","km":"គ្រាប់ក្នុងថ្ពាល់","my":"ပါးအတွင်းဆေးပြား","hi":"गाल में रखने वाली गोली"} },
        { value: "mouthPaint", th: "ยาทาในช่องปาก", label: "ยาทาในช่องปาก (For use in the mouth)", tr: {"en":"For use in the mouth","ja":"口腔用剤","zh-CN":"口腔用药","zh-TW":"口腔用藥","ko":"구강용 약","es":"Medicamento de uso bucal","fr":"Médicament à usage buccal","it":"Medicinale da usare in bocca","de":"Zur Anwendung in der Mundhöhle","ru":"Для применения в полости рта","ar":"دواء للاستعمال داخل الفم","vi":"Thuốc dùng trong miệng","km":"ថ្នាំប្រើក្នុងមាត់","my":"ခံတွင်းအတွင်း သုံးဆေး","hi":"मुँह के अंदर उपयोग की दवा"} },
        { value: "throatSpray", th: "ยาพ่นคอ", label: "ยาพ่นคอ (Throat spray)", tr: {"en":"Throat spray","ja":"のどスプレー","zh-CN":"口腔咽喉喷雾剂","zh-TW":"喉部噴劑","ko":"인후 스프레이","es":"Spray para la garganta","fr":"Spray pour la gorge","it":"Spray per la gola","de":"Halsspray","ru":"Спрей для горла","ar":"بخاخ للحلق","vi":"Thuốc xịt họng","km":"ថ្នាំបាញ់បំពង់ក","my":"လည်ချောင်းဖျန်းဆေး","hi":"गले का स्प्रे"} },
        { value: "gargle", th: "น้ำยากลั้วคอ", label: "น้ำยากลั้วคอ (Gargle solution)", tr: {"en":"Gargle solution","ja":"含嗽液・うがい薬","zh-CN":"含漱液","zh-TW":"含漱液","ko":"가글액 (양치액)","es":"Solución para gárgaras","fr":"Solution pour gargarisme","it":"Soluzione per gargarismi","de":"Gurgellösung","ru":"Раствор для полоскания горла","ar":"محلول غرغرة","vi":"Dung dịch súc họng","km":"ថ្នាំទឹកខ្ពុរក","my":"အာလုတ်ကျင်းဆေးရည်","hi":"गार्गल सॉल्यूशन (गरारे की दवा)"} },
        { value: "suppositoryRectal", th: "ยาเหน็บทวารหนัก", label: "ยาเหน็บทวารหนัก (Rectal suppositories)", tr: {"en":"Rectal suppositories","ja":"直腸坐剤","zh-CN":"直肠栓剂","zh-TW":"直腸栓劑","ko":"직장좌제","es":"Supositorios rectales","fr":"Suppositoires rectaux","it":"Supposte rettali","de":"Rektalzäpfchen","ru":"Ректальные суппозитории","ar":"تحاميل شرجية","vi":"Thuốc đặt hậu môn","km":"ថ្នាំស៊កតាមរន្ធគូថ","my":"စအိုတွင်းထည့်ဆေး","hi":"मलाशय सपोसिटरी"} },
        { value: "suppositoryVaginal", th: "ยาสอดช่องคลอด", label: "ยาสอดช่องคลอด (Vaginal suppositories)", tr: {"en":"Vaginal suppositories","ja":"腟坐剤","zh-CN":"阴道栓","zh-TW":"陰道栓劑","ko":"질좌제","es":"Óvulos vaginales","fr":"Ovules vaginaux","it":"Ovuli vaginali","de":"Vaginalzäpfchen","ru":"Вагинальные свечи","ar":"تحاميل مهبلية","vi":"Thuốc đặt âm đạo","km":"ថ្នាំស៊កទ្វារមាស","my":"မိန်းမကိုယ်တွင်းထည့်ဆေး","hi":"योनि सपोसिटरी"} },
        { value: "eye", th: "ยาหยอดตา", label: "ยาหยอดตา (Eye drops)", tr: {"en":"Eye drops","ja":"点眼薬","zh-CN":"滴眼液","zh-TW":"滴眼液","ko":"점안액","es":"Gotas oftálmicas","fr":"Collyre","it":"Collirio","de":"Augentropfen","ru":"Глазные капли","ar":"قطرات للعين","vi":"Thuốc nhỏ mắt","km":"ថ្នាំបន្តក់ភ្នែក","my":"မျက်စဉ်းခတ်ဆေး","hi":"आई ड्रॉप्स"} },
        { value: "ear", th: "ยาหยอดหู", label: "ยาหยอดหู (Ear drops)", tr: {"en":"Ear drops","ja":"点耳薬","zh-CN":"滴耳液","zh-TW":"滴耳液","ko":"점이액","es":"Gotas óticas","fr":"Gouttes auriculaires","it":"Gocce auricolari","de":"Ohrentropfen","ru":"Ушные капли","ar":"قطرات للأذن","vi":"Thuốc nhỏ tai","km":"ថ្នាំបន្តក់ត្រចៀក","my":"နားခတ်ဆေး","hi":"ईयर ड्रॉप्स"} },
        { value: "nasalSpray", th: "ยาพ่นจมูก", label: "ยาพ่นจมูก (Nasal spray)", tr: {"en":"Nasal spray","ja":"点鼻スプレー","zh-CN":"鼻喷雾剂","zh-TW":"鼻噴劑","ko":"비강 스프레이","es":"Spray nasal","fr":"Spray nasal","it":"Spray nasale","de":"Nasenspray","ru":"Назальный спрей","ar":"بخاخ للأنف","vi":"Thuốc xịt mũi","km":"ថ្នាំបាញ់ច្រមុះ","my":"နှာခေါင်းဖျန်းဆေး","hi":"नेज़ल स्प्रे"} },
        { value: "nasalDrops", th: "ยาหยอดจมูก", label: "ยาหยอดจมูก (Nasal drops)", tr: {"en":"Nasal drops","ja":"点鼻薬","zh-CN":"滴鼻液","zh-TW":"滴鼻液","ko":"점비액","es":"Gotas nasales","fr":"Gouttes nasales","it":"Gocce nasali","de":"Nasentropfen","ru":"Назальные капли","ar":"قطرات للأنف","vi":"Thuốc nhỏ mũi","km":"ថ្នាំបន្តក់ច្រមុះ","my":"နှာခေါင်းခတ်ဆေး","hi":"नेज़ल ड्रॉप्स"} }
    ] },
    { label: "สูดพ่นเข้าปอด (Inhaled)", options: [
        { value: "inhaler", th: "ยาสูดพ่น", label: "ยาสูดพ่น (Inhaler)", tr: {"en":"Inhaler","ja":"吸入薬","zh-CN":"吸入剂","zh-TW":"吸入劑","ko":"흡입제","es":"Inhalador","fr":"Inhalateur","it":"Inalatore","de":"Inhalator","ru":"Ингалятор","ar":"بخاخ استنشاق","vi":"Thuốc hít/xịt","km":"ថ្នាំស្រូប","my":"ရှူဆေး","hi":"इनहेलर"} },
        { value: "aerosol", th: "ยาละอองลอย", label: "ยาละอองลอย (Aerosol)", tr: {"en":"Aerosol","ja":"エアゾール剤","zh-CN":"气雾剂","zh-TW":"氣霧劑","ko":"에어로졸제","es":"Aerosol","fr":"Aérosol","it":"Aerosol","de":"Aerosol","ru":"Аэрозоль","ar":"رذاذ","vi":"Bình xịt khí dung","km":"ថ្នាំបាញ់ជាចំហុយ","my":"အေးရိုဆော","hi":"एयरोसोल"} },
        { value: "nebulizer", th: "ยาพ่นละอองฝอย", label: "ยาพ่นละอองฝอย (Nebulizer Solution)", tr: {"en":"Nebulizer Solution","ja":"吸入液（ネブライザー用）","zh-CN":"雾化吸入液","zh-TW":"霧化吸入液","ko":"네뷸라이저 흡입액","es":"Solución para nebulizador","fr":"Solution pour nébuliseur","it":"Soluzione per nebulizzatore","de":"Inhalationslösung (Vernebler)","ru":"Раствор для небулайзера","ar":"محلول للبخاخ (نيبولايزر)","vi":"Dung dịch khí dung","km":"ថ្នាំបាញ់ចំហាយ (Nebulizer)","my":"ရှူဆေးရည် (Nebulizer)","hi":"नेब्युलाइज़र घोल"} }
    ] },
    { label: "อื่นๆ (Other)", options: [
        { value: "prn", th: "ใช้เมื่อมีอาการ", label: "ใช้เมื่อมีอาการ (As Needed (PRN))", tr: {"en":"As Needed (PRN)","ja":"頓服薬","zh-CN":"需要时服用","zh-TW":"需要時服用","ko":"필요시 복용","es":"Según sea necesario (PRN)","fr":"Au besoin","it":"Al bisogno","de":"Bei Bedarf","ru":"По необходимости","ar":"عند الحاجة","vi":"Khi cần thiết","km":"ពេលចាំបាច់","my":"လိုအပ်ချိန်တွင်","hi":"आवश्यकतानुसार"} }
    ] }
];
const MEAL_OPTIONS = [
    { value: "", th: "", label: "-- ไม่ระบุ --" },
    { value: "after", th: "หลังอาหาร", label: "หลังอาหาร", tr: {"en": "After meals", "ja": "食後", "zh-CN": "饭后", "zh-TW": "飯後", "ko": "식후", "es": "Después de las comidas", "fr": "Après les repas", "it": "Dopo i pasti", "de": "Nach den Mahlzeiten", "ru": "После еды", "ar": "بعد الوجبات", "vi": "Sau bữa ăn", "km": "ក្រោយអាហារ", "my": "အစာစားပြီး", "hi": "भोजन के बाद"} },
    { value: "afterImmediate", th: "หลังอาหารทันที", label: "หลังอาหารทันที", tr: {"en": "Immediately after a meal", "ja": "食後すぐ", "zh-CN": "饭后即服", "zh-TW": "飯後即服", "ko": "식사 직후", "es": "Inmediatamente después de las comidas", "fr": "Immédiatement après le repas", "it": "Subito dopo i pasti", "de": "Direkt nach der Mahlzeit", "ru": "Сразу после еды", "ar": "مباشرة بعد الوجبة", "vi": "Ngay sau bữa ăn", "km": "ភ្លាមៗក្រោយអាហារ", "my": "အစာစားပြီးပြီးချင်း", "hi": "भोजन के तुरंत बाद"} },
    { value: "withMeal", th: "พร้อมอาหาร", label: "พร้อมอาหาร", tr: {"en": "With meals", "ja": "食事とともに", "zh-CN": "随餐服用", "zh-TW": "隨餐服用", "ko": "식사 중", "es": "Con las comidas", "fr": "Pendant les repas", "it": "Durante i pasti", "de": "Zu den Mahlzeiten", "ru": "Во время еды", "ar": "مع الوجبات", "vi": "Trong bữa ăn", "km": "ជាមួយអាហារ", "my": "အစာနှင့်အတူ", "hi": "भोजन के साथ"} },
    { value: "before", th: "ก่อนอาหาร", label: "ก่อนอาหาร", tr: {"en": "Before meals", "ja": "食前", "zh-CN": "饭前", "zh-TW": "飯前", "ko": "식전", "es": "Antes de las comidas", "fr": "Avant les repas", "it": "Prima dei pasti", "de": "Vor den Mahlzeiten", "ru": "До еды", "ar": "قبل الوجبات", "vi": "Trước bữa ăn", "km": "មុនអាហារ", "my": "အစာမစားမီ", "hi": "भोजन से पहले"} },
    { value: "before15", th: "ก่อนอาหาร 15 นาที", label: "ก่อนอาหาร 15 นาที", tr: {"en": "15 minutes before meals", "ja": "食前15分", "zh-CN": "饭前15分钟", "zh-TW": "飯前15分鐘", "ko": "식전 15분", "es": "15 minutos antes de las comidas", "fr": "15 minutes avant les repas", "it": "15 minuti prima dei pasti", "de": "15 Minuten vor den Mahlzeiten", "ru": "За 15 минут до еды", "ar": "قبل الوجبة بـ 15 دقيقة", "vi": "Trước bữa ăn 15 phút", "km": "១៥ នាទីមុនអាហារ", "my": "အစာမစားမီ ၁၅ မိနစ်", "hi": "भोजन से 15 मिनट पहले"} },
    { value: "before15_30", th: "ก่อนอาหาร 15-30 นาที", label: "ก่อนอาหาร 15-30 นาที", tr: {"en": "15-30 minutes before meals", "ja": "食前15〜30分", "zh-CN": "饭前15-30分钟", "zh-TW": "飯前15-30分鐘", "ko": "식전 15~30분", "es": "15-30 minutos antes de las comidas", "fr": "15 à 30 minutes avant les repas", "it": "15-30 minuti prima dei pasti", "de": "15–30 Minuten vor den Mahlzeiten", "ru": "За 15–30 минут до еды", "ar": "قبل الوجبة بـ 15-30 دقيقة", "vi": "Trước bữa ăn 15-30 phút", "km": "១៥-៣០ នាទីមុនអាហារ", "my": "အစာမစားမီ ၁၅-၃၀ မိနစ်", "hi": "भोजन से 15-30 मिनट पहले"} },
    { value: "before20", th: "ก่อนอาหาร 20 นาที", label: "ก่อนอาหาร 20 นาที", tr: {"en": "20 minutes before meals", "ja": "食前20分", "zh-CN": "饭前20分钟", "zh-TW": "飯前20分鐘", "ko": "식전 20분", "es": "20 minutos antes de las comidas", "fr": "20 minutes avant les repas", "it": "20 minuti prima dei pasti", "de": "20 Minuten vor den Mahlzeiten", "ru": "За 20 минут до еды", "ar": "قبل الوجبة بـ 20 دقيقة", "vi": "Trước bữa ăn 20 phút", "km": "២០ នាទីមុនអាហារ", "my": "အစာမစားမီ ၂၀ မိနစ်", "hi": "भोजन से 20 मिनट पहले"} },
    { value: "before20_30", th: "ก่อนอาหาร 20-30 นาที", label: "ก่อนอาหาร 20-30 นาที", tr: {"en": "20-30 minutes before meals", "ja": "食前20〜30分", "zh-CN": "饭前20-30分钟", "zh-TW": "飯前20-30分鐘", "ko": "식전 20~30분", "es": "20-30 minutos antes de las comidas", "fr": "20 à 30 minutes avant les repas", "it": "20-30 minuti prima dei pasti", "de": "20–30 Minuten vor den Mahlzeiten", "ru": "За 20–30 минут до еды", "ar": "قبل الوجبة بـ 20-30 دقيقة", "vi": "Trước bữa ăn 20-30 phút", "km": "២០-៣០ នាទីមុនអាហារ", "my": "အစာမစားမီ ၂၀-၃၀ မိနစ်", "hi": "भोजन से 20-30 मिनट पहले"} },
    { value: "before30", th: "ก่อนอาหาร 30 นาที", label: "ก่อนอาหาร 30 นาที", tr: {"en": "30 minutes before meals", "ja": "食前30分", "zh-CN": "饭前30分钟", "zh-TW": "飯前30分鐘", "ko": "식전 30분", "es": "30 minutos antes de las comidas", "fr": "30 minutes avant les repas", "it": "30 minuti prima dei pasti", "de": "30 Minuten vor den Mahlzeiten", "ru": "За 30 минут до еды", "ar": "قبل الوجبة بـ 30 دقيقة", "vi": "Trước bữa ăn 30 phút", "km": "៣០ នាទីមុនអាហារ", "my": "အစာမစားမီ ၃၀ မိနစ်", "hi": "भोजन से 30 मिनट पहले"} },
    { value: "before30_60", th: "ก่อนอาหาร 30-60 นาที", label: "ก่อนอาหาร 30-60 นาที", tr: {"en": "30-60 minutes before meals", "ja": "食前30〜60分", "zh-CN": "饭前30-60分钟", "zh-TW": "飯前30-60分鐘", "ko": "식전 30~60분", "es": "30-60 minutos antes de las comidas", "fr": "30 à 60 minutes avant les repas", "it": "30-60 minuti prima dei pasti", "de": "30–60 Minuten vor den Mahlzeiten", "ru": "За 30–60 минут до еды", "ar": "قبل الوجبة بـ 30-60 دقيقة", "vi": "Trước bữa ăn 30-60 phút", "km": "៣០-៦០ នាទីមុនអាហារ", "my": "အစာမစားမီ ၃၀-၆၀ မိနစ်", "hi": "भोजन से 30-60 मिनट पहले"} },
    { value: "before60", th: "ก่อนอาหาร 1 ชั่วโมง", label: "ก่อนอาหาร 1 ชั่วโมง", tr: {"en": "One hour before meals", "ja": "食前1時間", "zh-CN": "饭前1小时", "zh-TW": "飯前1小時", "ko": "식전 1시간", "es": "1 hora antes de las comidas", "fr": "1 heure avant les repas", "it": "1 ora prima dei pasti", "de": "1 Stunde vor den Mahlzeiten", "ru": "За 1 час до еды", "ar": "قبل الوجبة بساعة", "vi": "Trước bữa ăn 1 giờ", "km": "១ ម៉ោងមុនអាហារ", "my": "အစာမစားမီ ၁ နာရီ", "hi": "भोजन से 1 घंटा पहले"} },
    { value: "beforeBreakfast", th: "ก่อนอาหารเช้า", label: "ก่อนอาหารเช้า", tr: {"en": "Before breakfast", "ja": "朝食前", "zh-CN": "早餐前", "zh-TW": "早餐前", "ko": "아침 식전", "es": "Antes del desayuno", "fr": "Avant le petit déjeuner", "it": "Prima di colazione", "de": "Vor dem Frühstück", "ru": "До завтрака", "ar": "قبل الإفطار", "vi": "Trước bữa sáng", "km": "មុនអាហារពេលព្រឹក", "my": "မနက်စာမစားမီ", "hi": "नाश्ते से पहले"} },
    { value: "afterBreakfast", th: "หลังอาหารเช้า", label: "หลังอาหารเช้า", tr: {"en": "After breakfast", "ja": "朝食後", "zh-CN": "早餐后", "zh-TW": "早餐後", "ko": "아침 식후", "es": "Después del desayuno", "fr": "Après le petit déjeuner", "it": "Dopo colazione", "de": "Nach dem Frühstück", "ru": "После завтрака", "ar": "بعد الإفطار", "vi": "Sau bữa sáng", "km": "ក្រោយអាហារពេលព្រឹក", "my": "မနက်စာစားပြီး", "hi": "नाश्ते के बाद"} },
    { value: "afterDinner", th: "หลังอาหารเย็น", label: "หลังอาหารเย็น", tr: {"en": "After dinner", "ja": "夕食後", "zh-CN": "晚餐后", "zh-TW": "晚餐後", "ko": "저녁 식후", "es": "Después de la cena", "fr": "Après le dîner", "it": "Dopo cena", "de": "Nach dem Abendessen", "ru": "После ужина", "ar": "بعد العشاء", "vi": "Sau bữa tối", "km": "ក្រោយអាហារពេលល្ងាច", "my": "ညစာစားပြီး", "hi": "रात के खाने के बाद"} },
    { value: "bedtime", th: "ก่อนนอน", label: "ก่อนนอน", tr: {"en": "Before bedtime", "ja": "就寝前", "zh-CN": "睡前", "zh-TW": "睡前", "ko": "취침 전", "es": "Antes de acostarse", "fr": "Au coucher", "it": "Prima di coricarsi", "de": "Vor dem Schlafengehen", "ru": "Перед сном", "ar": "قبل النوم", "vi": "Trước khi đi ngủ", "km": "មុនពេលចូលគេង", "my": "အိပ်ရာမဝင်မီ", "hi": "सोने से पहले"} },
    { value: "any", th: "ไม่ขึ้นกับมื้ออาหาร", label: "ไม่ขึ้นกับมื้ออาหาร", tr: {"en": "Regardless of Meal", "ja": "食事に関係なく服用", "zh-CN": "饭前饭后均可", "zh-TW": "飯前飯後均可", "ko": "식사 무관", "es": "Con o sin alimentos", "fr": "Prise indépendante des repas", "it": "Indipendentemente dai pasti", "de": "Unabhängig von den Mahlzeiten", "ru": "Независимо от приема пищи", "ar": "بغض النظر عن الوجبة", "vi": "Uống không phụ thuộc vào bữa ăn", "km": "មុន ឬ ក្រោយអាហារក៏បាន", "my": "အစာရှိရှိ မရှိရှိ သောက်နိုင်သည်", "hi": "भोजन की परवाह किए बिना"} }
];
// ชื่ออื่นที่เคยใช้ในชีท → key มาตรฐาน (REVIEW = ความหมายกว้าง ต้องให้คนตรวจก่อนแก้ในชีท)
const TERM_ALIASES = { type: {"เม็ด": "tablet", "ยาเม็ดฟู่": "effervescent", "เม็ดฟู่ละลายน้ำ": "effervescent", "แคปซูล": "capsule", "ยาแคปซููล": "capsule", "ยาน้ำ/สารละลาย": "solution", "น้ำเชื่อม": "syrup", "ยาแขวนตะกอน": "suspension", "อิมัลชัน": "emulsion", "ผง": "powder", "แผ่นแปะ": "patch", "แผ่่นแปะ": "patch", "แผ่นแปะผิวหนัง": "patch", "อมใต้ลิ้น": "sublingual", "อมกระพุ้งแก้ม": "buccal", "ยาป้ายลิ้น/แผลในปาก": "mouthPaint", "ยาป้ายปาก": "mouthPaint", "ยากลั้วคอ": "gargle", "ยาน้ำกลั้วคอ": "gargle", "ยาเหน็บช่องคลอด": "suppositoryVaginal", "ยาสูดพ่น (Inhaler)": "inhaler", "ยาสูดพ่นกำหนดขนาด (MDI)": "inhaler", "กระบอกสูบพ่นเข้าหลอดลมหรือปอด (MDI / Inhaler)": "inhaler"}, typeReview: {"ยาหยอด": "eye"}, meal: {"ก่อนอาหารอย่างน้อย 30 นาที": "before30", "ก่อนหรือหลังอาหาร": "any", "หลังอาหาร (After meal)": "after", "หลังอาหารทัันที": "afterImmediate", "หลังอาหารทันที (Immediately after)": "afterImmediate", "พร้อมอาหาร (With meal)": "withMeal"} };
// ขนาดยา: หน่วยนับ [จำนวน 1, จำนวนอื่น] ({n} = ตัวเลข) · วลีสำเร็จรูป · รายการแนะนำในช่องขนาดยา
const DOSE_UNIT_RULES = [["พ่นข้างละ", "ครั้ง", "spray_each"], ["พ่น", "ครั้ง", "spray"], ["", "เม็ด", "tab"], ["", "แคปซูล", "cap"], ["", "หยด", "drop"], ["", "ซอง", "sachet"], ["", "ช้อนชา", "tsp"], ["", "ช้อนโต๊ะ", "tbsp"], ["", "มล.", "ml"], ["", "แผ่น", "patch"]];
const DOSE_UNIT_FORMS = {"tab":{"en":["{n} pill","{n} pills"],"ja":["{n}錠","{n}錠"],"zh-CN":["{n}粒","{n}粒"],"zh-TW":["{n}粒","{n}粒"],"ko":["{n}알","{n}알"],"es":["{n} pastilla","{n} pastillas"],"fr":["{n} comprimé","{n} comprimés"],"it":["{n} compressa","{n} compresse"],"de":["{n} Tablette","{n} Tabletten"],"ru":["{n} таблетка","{n} таблетки","{n} таблеток"],"ar":["حبة واحدة","حبتان","{n} حبات","{n} حبة"],"vi":["{n} viên","{n} viên"],"km":["១ គ្រាប់","{n} គ្រាប់"],"my":["၁ ပြား","{n} ပြား"],"hi":["{n} गोली","{n} गोलियाँ"]},"cap":{"en":["{n} capsule","{n} capsules"],"ja":["{n}カプセル","{n}カプセル"],"zh-CN":["{n}粒胶囊","{n}粒胶囊"],"zh-TW":["{n}粒膠囊","{n}粒膠囊"],"ko":["{n}캡슐","{n}캡슐"],"es":["{n} cápsula","{n} cápsulas"],"fr":["{n} gélule","{n} gélules"],"it":["{n} capsula","{n} capsule"],"de":["{n} Kapsel","{n} Kapseln"],"ru":["{n} капсула","{n} капсулы","{n} капсул"],"ar":["كبسولة واحدة","كبسولتان","{n} كبسولات","{n} كبسولة"],"vi":["{n} viên nang","{n} viên nang"],"km":["១ គ្រាប់ស្រោម","{n} គ្រាប់ស្រោម"],"my":["၁ တောင့်","{n} တောင့်"],"hi":["{n} कैप्सूल","{n} कैप्सूल"]},"drop":{"en":["{n} drop","{n} drops"],"ja":["{n}滴","{n}滴"],"zh-CN":["{n}滴","{n}滴"],"zh-TW":["{n}滴","{n}滴"],"ko":["{n}방울","{n}방울"],"es":["{n} gota","{n} gotas"],"fr":["{n} goutte","{n} gouttes"],"it":["{n} goccia","{n} gocce"],"de":["{n} Tropfen","{n} Tropfen"],"ru":["{n} капля","{n} капли","{n} капель"],"ar":["قطرة واحدة","قطرتان","{n} قطرات","{n} قطرة"],"vi":["{n} giọt","{n} giọt"],"km":["១ ដំណក់","{n} ដំណក់"],"my":["၁ စက်","{n} စက်"],"hi":["{n} बूंद","{n} बूंदें"]},"sachet":{"en":["{n} sachet","{n} sachets"],"ja":["{n}包","{n}包"],"zh-CN":["{n}袋","{n}袋"],"zh-TW":["{n}包","{n}包"],"ko":["{n}포","{n}포"],"es":["{n} sobre","{n} sobres"],"fr":["{n} sachet","{n} sachets"],"it":["{n} bustina","{n} bustine"],"de":["{n} Beutel","{n} Beutel"],"ru":["{n} пакетик","{n} пакетика","{n} пакетиков"],"ar":["كيس واحد","كيسان","{n} أكياس","{n} كيسًا"],"vi":["{n} gói","{n} gói"],"km":["១ កញ្ចប់","{n} កញ្ចប់"],"my":["၁ ထုပ်","{n} ထုပ်"],"hi":["{n} पाउच","{n} पाउच"]},"tsp":{"en":["{n} teaspoon","{n} teaspoons"],"ja":["小さじ{n}","小さじ{n}"],"zh-CN":["{n}茶匙","{n}茶匙"],"zh-TW":["{n}茶匙","{n}茶匙"],"ko":["{n}티스푼","{n}티스푼"],"es":["{n} cucharadita","{n} cucharaditas"],"fr":["{n} cuillère à café","{n} cuillères à café"],"it":["{n} cucchiaino","{n} cucchiaini"],"de":["{n} Teelöffel","{n} Teelöffel"],"ru":["{n} чайная ложка","{n} чайные ложки","{n} чайных ложек"],"ar":["ملعقة صغيرة واحدة","ملعقتان صغيرتان","{n} ملاعق صغيرة","{n} ملعقة صغيرة"],"vi":["{n} thìa cà phê","{n} thìa cà phê"],"km":["១ ស្លាបព្រាកាហ្វេ","{n} ស្លាបព្រាកាហ្វេ"],"my":["လက်ဖက်ရည်ဇွန်း ၁ ဇွန်း","လက်ဖက်ရည်ဇွန်း {n} ဇွန်း"],"hi":["{n} छोटा चम्मच","{n} छोटे चम्मच"]},"tbsp":{"en":["{n} tablespoon","{n} tablespoons"],"ja":["大さじ{n}","大さじ{n}"],"zh-CN":["{n}汤匙","{n}汤匙"],"zh-TW":["{n}湯匙","{n}湯匙"],"ko":["{n}큰술","{n}큰술"],"es":["{n} cucharada","{n} cucharadas"],"fr":["{n} cuillère à soupe","{n} cuillères à soupe"],"it":["{n} cucchiaio","{n} cucchiai"],"de":["{n} Esslöffel","{n} Esslöffel"],"ru":["{n} столовая ложка","{n} столовые ложки","{n} столовых ложек"],"ar":["ملعقة كبيرة واحدة","ملعقتان كبيرتان","{n} ملاعق كبيرة","{n} ملعقة كبيرة"],"vi":["{n} thìa canh","{n} thìa canh"],"km":["១ ស្លាបព្រាបាយ","{n} ស្លាបព្រាបាយ"],"my":["စားပွဲဇွန်း ၁ ဇွန်း","စားပွဲဇွန်း {n} ဇွန်း"],"hi":["{n} बड़ा चम्मच","{n} बड़े चम्मच"]},"ml":{"en":["{n} mL","{n} mL"],"ja":["{n} mL","{n} mL"],"zh-CN":["{n}毫升","{n}毫升"],"zh-TW":["{n}毫升","{n}毫升"],"ko":["{n} mL","{n} mL"],"es":["{n} mL","{n} mL"],"fr":["{n} mL","{n} mL"],"it":["{n} mL","{n} mL"],"de":["{n} ml","{n} ml"],"ru":["{n} мл"],"ar":["{n} مل"],"vi":["{n} ml","{n} ml"],"km":["១ មីលីលីត្រ","{n} មីលីលីត្រ"],"my":["၁ မီလီလီတာ","{n} မီလီလီတာ"],"hi":["{n} मि.ली.","{n} मि.ली."]},"patch":{"en":["{n} patch","{n} patches"],"ja":["{n}枚","{n}枚"],"zh-CN":["{n}片","{n}片"],"zh-TW":["{n}片","{n}片"],"ko":["{n}매","{n}매"],"es":["{n} parche","{n} parches"],"fr":["{n} patch","{n} patchs"],"it":["{n} cerotto","{n} cerotti"],"de":["{n} Pflaster","{n} Pflaster"],"ru":["{n} пластырь","{n} пластыря","{n} пластырей"],"ar":["لصقة واحدة","لصقتان","{n} لصقات","{n} لصقة"],"vi":["{n} miếng","{n} miếng"],"km":["១ បន្ទះ","{n} បន្ទះ"],"my":["၁ ချပ်","{n} ချပ်"],"hi":["{n} पैच","{n} पैच"]},"spray":{"en":["{n} spray","{n} sprays"],"ja":["{n}回噴霧","{n}回噴霧"],"zh-CN":["喷{n}下","喷{n}下"],"zh-TW":["噴{n}下","噴{n}下"],"ko":["{n}회 분무","{n}회 분무"],"es":["{n} pulverización","{n} pulverizaciones"],"fr":["{n} pulvérisation","{n} pulvérisations"],"it":["{n} spruzzo","{n} spruzzi"],"de":["{n} Sprühstoß","{n} Sprühstöße"],"ru":["{n} впрыскивание","{n} впрыскивания","{n} впрыскиваний"],"ar":["بخة واحدة","بختان","{n} بخات","{n} بخة"],"vi":["Xịt {n} lần","Xịt {n} lần"],"km":["បាញ់ ១ ដង","បាញ់ {n} ដង"],"my":["၁ ကြိမ် ဖျန်းပါ","{n} ကြိမ် ဖျန်းပါ"],"hi":["{n} स्प्रे","{n} स्प्रे"]},"spray_each":{"en":["{n} spray in each nostril","{n} sprays in each nostril"],"ja":["左右の鼻にそれぞれ{n}回噴霧","左右の鼻にそれぞれ{n}回噴霧"],"zh-CN":["每侧鼻孔喷{n}下","每侧鼻孔喷{n}下"],"zh-TW":["每側鼻孔噴{n}下","每側鼻孔噴{n}下"],"ko":["양쪽 콧구멍에 각 {n}회 분무","양쪽 콧구멍에 각 {n}회 분무"],"es":["{n} pulverización en cada fosa nasal","{n} pulverizaciones en cada fosa nasal"],"fr":["{n} pulvérisation dans chaque narine","{n} pulvérisations dans chaque narine"],"it":["{n} spruzzo per narice","{n} spruzzi per narice"],"de":["{n} Sprühstoß pro Nasenloch","{n} Sprühstöße pro Nasenloch"],"ru":["По {n} впрыскиванию в каждую ноздрю","По {n} впрыскивания в каждую ноздрю","По {n} впрыскиваний в каждую ноздрю"],"ar":["بخة واحدة في كل فتحة أنف","بختان في كل فتحة أنف","{n} بخات في كل فتحة أنف","{n} بخة في كل فتحة أنف"],"vi":["Xịt mỗi bên mũi {n} lần","Xịt mỗi bên mũi {n} lần"],"km":["បាញ់ច្រមុះម្ខាង ១ ដង","បាញ់ច្រមុះម្ខាង {n} ដង"],"my":["နှာခေါင်းတစ်ဖက်လျှင် ၁ ကြိမ် ဖျန်းပါ","နှာခေါင်းတစ်ဖက်လျှင် {n} ကြိမ် ဖျန်းပါ"],"hi":["हर नथुने में {n} स्प्रे","हर नथुने में {n} स्प्रे"]}};
const DOSE_PHRASES = {"ป้าย":{"en":"Dab on gently (do not rub)","ja":"患部に軽くのせる（こすらない）","zh-CN":"轻点于患处（勿揉擦）","zh-TW":"輕點於患處（勿揉擦）","ko":"환부에 살짝 올리기 (문지르지 마세요)","es":"Aplicar a toques, sin frotar","fr":"Tamponner doucement, sans frotter","it":"Applicare tamponando, senza strofinare","de":"Sanft auftupfen, nicht einreiben","ru":"Нанести точечно, не втирать","ar":"يوضع بلطف دون فرك","vi":"Chấm nhẹ lên chỗ đau, không chà xát","km":"ប៉ះដាក់ថ្នមៗ (កុំត្រដុស)","my":"ညင်သာစွာ တို့ပေးပါ (မပွတ်ရ)","hi":"हल्के से लगाएँ, रगड़ें नहीं"},"ป้ายทา":{"en":"Dab on gently (do not rub)","ja":"患部に軽くのせる（こすらない）","zh-CN":"轻点于患处（勿揉擦）","zh-TW":"輕點於患處（勿揉擦）","ko":"환부에 살짝 올리기 (문지르지 마세요)","es":"Aplicar a toques, sin frotar","fr":"Tamponner doucement, sans frotter","it":"Applicare tamponando, senza strofinare","de":"Sanft auftupfen, nicht einreiben","ru":"Нанести точечно, не втирать","ar":"يوضع بلطف دون فرك","vi":"Chấm nhẹ lên chỗ đau, không chà xát","km":"ប៉ះដាក់ថ្នមៗ (កុំត្រដុស)","my":"ညင်သာစွာ တို့ပေးပါ (မပွတ်ရ)","hi":"हल्के से लगाएँ, रगड़ें नहीं"},"ป้ายบางๆ":{"en":"Dab on a thin layer (do not rub)","ja":"患部に薄くのせる（こすらない）","zh-CN":"薄薄轻点于患处（勿揉擦）","zh-TW":"薄薄輕點於患處（勿揉擦）","ko":"환부에 얇게 올리기 (문지르지 마세요)","es":"Aplicar una capa fina a toques, sin frotar","fr":"Tamponner en couche fine, sans frotter","it":"Applicare uno strato sottile tamponando, senza strofinare","de":"Dünn auftupfen, nicht einreiben","ru":"Нанести тонким слоем точечно, не втирать","ar":"توضع طبقة رقيقة بلطف دون فرك","vi":"Chấm một lớp mỏng, không chà xát","km":"ប៉ះដាក់ស្តើងៗ (កុំត្រដុស)","my":"ပါးပါး ညင်သာစွာ တို့ပေးပါ (မပွတ်ရ)","hi":"पतली परत हल्के से लगाएँ, रगड़ें नहीं"},"ป้ายตา":{"en":"Apply to the eye","ja":"眼に塗布","zh-CN":"涂于眼部","zh-TW":"塗於眼部","ko":"눈에 도포","es":"Aplicar en el ojo","fr":"Appliquer dans l'œil","it":"Applicare nell'occhio","de":"Ins Auge einbringen","ru":"Заложить в глаз","ar":"يوضع في العين","vi":"Tra vào mắt","km":"លាបក្នុងភ្នែក","my":"မျက်လုံးတွင် လိမ်းပါ","hi":"आँख में लगाएं"},"แปะ 1 แผ่น":{"en":"Apply 1 patch","ja":"1枚貼付","zh-CN":"贴1片","zh-TW":"貼1片","ko":"1매 부착","es":"Aplicar 1 parche","fr":"Appliquer 1 patch","it":"Applicare 1 cerotto","de":"1 Pflaster aufkleben","ru":"Наклеить 1 пластырь","ar":"وضع لصقة واحدة","vi":"Dán 1 miếng","km":"បិទ ១ បន្ទះ","my":"၁ ချပ် ကပ်ပါ","hi":"1 पैच लगाएं"},"ทา 1-2 ครั้ง":{"en":"Apply 1-2 times","ja":"1〜2回塗布","zh-CN":"涂抹1-2次","zh-TW":"塗抹1-2次","ko":"1-2회 도포","es":"Aplicar 1-2 veces","fr":"Appliquer 1 à 2 fois","it":"Applicare 1-2 volte","de":"1-2 Mal auftragen","ru":"Нанести 1-2 раза","ar":"يُدهن مرة أو مرتين","vi":"Bôi 1-2 lần","km":"លាប ១-២ ដង","my":"၁-၂ ကြိမ် လိမ်းပါ","hi":"1-2 बार लगाएं"},"ทาสัปดาห์ละ 1-2 ครั้ง":{"en":"Apply 1-2 times a week","ja":"週1〜2回塗布","zh-CN":"每周涂抹1-2次","zh-TW":"每週塗抹1-2次","ko":"주 1-2회 도포","es":"Aplicar 1-2 veces por semana","fr":"Appliquer 1 à 2 fois par semaine","it":"Applicare 1-2 volte a settimana","de":"1-2 Mal pro Woche auftragen","ru":"Наносить 1-2 раза в неделю","ar":"يُدهن مرة أو مرتين أسبوعيًا","vi":"Bôi 1-2 lần mỗi tuần","km":"លាប ១-២ ដងក្នុងមួយសប្តាហ៍","my":"တစ်ပတ်လျှင် ၁-၂ ကြိမ် လိမ်းပါ","hi":"सप्ताह में 1-2 बार लगाएं"},"ทาทั่วใบหน้า":{"en":"Apply all over the face","ja":"顔全体に塗布","zh-CN":"涂抹于全脸","zh-TW":"塗抹於全臉","ko":"얼굴 전체에 도포","es":"Aplicar en todo el rostro","fr":"Appliquer sur tout le visage","it":"Applicare su tutto il viso","de":"Auf das ganze Gesicht auftragen","ru":"Нанести на всё лицо","ar":"يُدهن على الوجه بالكامل","vi":"Thoa khắp mặt","km":"លាបពេញផ្ទៃមុខ","my":"မျက်နှာတစ်ခုလုံး လိမ်းပါ","hi":"पूरे चेहरे पर लगाएं"},"หยดทาบางๆ":{"en":"Apply a few drops in a thin layer","ja":"数滴を薄く塗布","zh-CN":"滴几滴后薄涂","zh-TW":"滴幾滴後薄塗","ko":"몇 방울을 얇게 도포","es":"Aplicar unas gotas en capa fina","fr":"Appliquer quelques gouttes en couche fine","it":"Applicare qualche goccia in strato sottile","de":"Einige Tropfen dünn auftragen","ru":"Нанести несколько капель тонким слоем","ar":"ضع بضع قطرات وادهن طبقة رقيقة","vi":"Nhỏ vài giọt và thoa mỏng","km":"ដាក់ពីរបីដំណក់ ហើយលាបស្តើងៗ","my":"အစက်အနည်းငယ်ချ၍ ပါးပါးလိမ်းပါ","hi":"कुछ बूंदें पतली परत में लगाएं"},"ทาบำรุงผิว":{"en":"Apply to moisturize the skin","ja":"保湿のため肌に塗布","zh-CN":"涂抹以滋润皮肤","zh-TW":"塗抹以滋潤皮膚","ko":"피부 보습을 위해 도포","es":"Aplicar para hidratar la piel","fr":"Appliquer pour hydrater la peau","it":"Applicare per idratare la pelle","de":"Zur Hautpflege auftragen","ru":"Наносить для увлажнения кожи","ar":"يُدهن لترطيب البشرة","vi":"Thoa để dưỡng da","km":"លាបដើម្បីថែរក្សាស្បែក","my":"အသားအရေထိန်းသိမ်းရန် လိမ်းပါ","hi":"त्वचा को नमी देने के लिए लगाएं"},"แต้มหัวสิว":{"en":"Dab onto pimples","ja":"にきびに直接塗布","zh-CN":"点涂于痘痘处","zh-TW":"點塗於痘痘處","ko":"여드름 부위에 콕 찍어 바르기","es":"Aplicar sobre los granos","fr":"Appliquer sur les boutons","it":"Applicare sui brufoli","de":"Auf Pickel tupfen","ru":"Точечно наносить на прыщи","ar":"يوضع على البثور","vi":"Chấm lên nốt mụn","km":"ចុចលាបលើមុន","my":"ဝက်ခြံပေါ်တွင် စက်လိမ်းပါ","hi":"मुंहासों पर लगाएं"},"ตามแพทย์สั่ง":{"en":"As directed by your doctor","ja":"医師の指示通り","zh-CN":"遵医嘱","zh-TW":"遵醫囑","ko":"의사 지시대로","es":"Según indicación médica","fr":"Selon la prescription médicale","it":"Secondo prescrizione medica","de":"Nach ärztlicher Anweisung","ru":"По назначению врача","ar":"حسب إرشادات الطبيب","vi":"Theo chỉ định của bác sĩ","km":"តាមវេជ្ជបញ្ជា","my":"ဆရာဝန်ညွှန်ကြားသည့်အတိုင်း","hi":"डॉक्टर के निर्देशानुसार"},"ล้าง 1 ครั้ง":{"en":"Wash once","ja":"1回洗浄","zh-CN":"清洗1次","zh-TW":"清洗1次","ko":"1회 세척","es":"Lavar 1 vez","fr":"Laver 1 fois","it":"Lavare 1 volta","de":"Einmal waschen","ru":"Промыть 1 раз","ar":"يُغسل مرة واحدة","vi":"Rửa 1 lần","km":"លាង ១ ដង","my":"၁ ကြိမ် ဆေးကြောပါ","hi":"1 बार धोएं"},"ล้างตามต้องการ":{"en":"Wash as needed","ja":"必要に応じて洗浄","zh-CN":"按需清洗","zh-TW":"依需要清洗","ko":"필요 시 세척","es":"Lavar según sea necesario","fr":"Laver au besoin","it":"Lavare secondo necessità","de":"Bei Bedarf waschen","ru":"Промывать по необходимости","ar":"يُغسل عند الحاجة","vi":"Rửa khi cần","km":"លាងតាមតម្រូវការ","my":"လိုအပ်သလို ဆေးကြောပါ","hi":"आवश्यकतानुसार धोएं"},"1 ครั้ง":{"en":"Once","ja":"1回","zh-CN":"1次","zh-TW":"1次","ko":"1회","es":"1 vez","fr":"1 fois","it":"1 volta","de":"Einmal","ru":"1 раз","ar":"مرة واحدة","vi":"1 lần","km":"១ ដង","my":"၁ ကြိမ်","hi":"1 बार"},"1 หลอด":{"en":"1 tube","ja":"1本（チューブ）","zh-CN":"1支","zh-TW":"1支","ko":"1개(튜브)","es":"1 tubo","fr":"1 tube","it":"1 tubetto","de":"1 Tube","ru":"1 тюбик","ar":"أنبوب واحد","vi":"1 tuýp","km":"១ បំពង់","my":"၁ ဘူး","hi":"1 ट्यूब"},"1 แท่ง":{"en":"1 stick","ja":"1本（スティック）","zh-CN":"1支","zh-TW":"1支","ko":"1개(스틱)","es":"1 barra","fr":"1 stick","it":"1 stick","de":"1 Stift","ru":"1 стик","ar":"أصبع واحد","vi":"1 thỏi","km":"១ ដើម","my":"၁ ချောင်း","hi":"1 स्टिक"},"1 ชิ้น":{"en":"1 piece","ja":"1個","zh-CN":"1片","zh-TW":"1片","ko":"1개","es":"1 pieza","fr":"1 pièce","it":"1 pezzo","de":"1 Stück","ru":"1 штука","ar":"قطعة واحدة","vi":"1 miếng","km":"១ ដុំ","my":"၁ ခု","hi":"1 टुकड़ा"},"จิบตลอดวัน":{"en":"Sip throughout the day","ja":"1日を通して少しずつ飲む","zh-CN":"全天少量多次饮用","zh-TW":"全天少量多次飲用","ko":"하루 종일 조금씩 마시기","es":"Beber a sorbos durante el día","fr":"Boire par petites gorgées tout au long de la journée","it":"Sorseggiare durante la giornata","de":"Über den Tag verteilt schluckweise trinken","ru":"Пить небольшими глотками в течение дня","ar":"يُرتشف على مدار اليوم","vi":"Nhấp từng ngụm trong ngày","km":"ក្រេបពេញមួយថ្ងៃ","my":"တစ်နေ့လုံး အနည်းငယ်စီ သောက်ပါ","hi":"दिन भर घूंट-घूंट कर पिएं"},"หยอด":{"en":"Instill drops","ja":"滴下","zh-CN":"滴入","zh-TW":"滴入","ko":"점적","es":"Aplicar gotas","fr":"Instiller","it":"Instillare","de":"Eintropfen","ru":"Закапать","ar":"يُقطَّر","vi":"Nhỏ","km":"ដាក់ដំណក់","my":"ဆေးစက်ချရန်","hi":"बूँदें डालें"},"พ่น":{"en":"Spray","ja":"噴霧","zh-CN":"喷用","zh-TW":"噴用","ko":"분무","es":"Rociar","fr":"Pulvériser","it":"Spruzzare","de":"Sprühen","ru":"Распылить","ar":"يُرَش","vi":"Xịt","km":"បាញ់","my":"ဖျန်းရန်","hi":"स्प्रे करें"},"เหน็บ":{"en":"Insert","ja":"挿入","zh-CN":"塞入","zh-TW":"塞入","ko":"삽입","es":"Introducir","fr":"Insérer","it":"Inserire","de":"Einführen","ru":"Ввести","ar":"يُدخَل","vi":"Đặt","km":"ដាក់បញ្ចូល","my":"ထည့်သွင်းရန်","hi":"अंदर डालें"},"ทา":{"en":"Apply","ja":"塗布","zh-CN":"涂抹","zh-TW":"塗抹","ko":"바르기","es":"Aplicar","fr":"Appliquer","it":"Applicare","de":"Auftragen","ru":"Нанести","ar":"يُدهن","vi":"Bôi","km":"លាប","my":"လိမ်းရန်","hi":"लगाएँ"},"ทาบางๆ":{"en":"Apply a thin layer","ja":"薄く塗布","zh-CN":"薄薄涂抹一层","zh-TW":"薄薄塗抹一層","ko":"얇게 도포","es":"Aplicar una capa fina","fr":"Appliquer en couche mince","it":"Applicare uno strato sottile","de":"Dünn auftragen","ru":"Наносить тонким слоем","ar":"يُدهن بطبقة رقيقة","vi":"Thoa một lớp mỏng","km":"លាបស្តើងៗ","my":"ပါးပါးလိမ်းပါ","hi":"पतली परत लगाएं"},"ทาถูนวด":{"en":"Apply and massage gently","ja":"塗布してマッサージ","zh-CN":"涂抹并轻轻按摩","zh-TW":"塗抹並輕輕按摩","ko":"도포 후 마사지","es":"Aplicar y masajear suavemente","fr":"Appliquer et masser délicatement","it":"Applicare e massaggiare delicatamente","de":"Auftragen und sanft einmassieren","ru":"Нанести и мягко втереть","ar":"يُدهن مع التدليك","vi":"Thoa và mát-xa nhẹ","km":"លាបនិងច្របាច់ថ្នមៗ","my":"လိမ်းပြီး နှိပ်နယ်ပေးပါ","hi":"लगाएं और धीरे से मालिश करें"},"ทาบริเวณที่ปวด":{"en":"Apply to affected area","ja":"患部に塗布","zh-CN":"涂抹于患处","zh-TW":"塗抹於患處","ko":"통증 부위에 도포","es":"Aplicar en la zona dolorida","fr":"Appliquer sur la zone douloureuse","it":"Applicare sulla zona dolorante","de":"Auf schmerzende Stelle auftragen","ru":"Наносить на болезненный участок","ar":"يُدهن على موضع الألم","vi":"Thoa lên vùng bị đau","km":"លាបត្រង់កន្លែងឈឺ","my":"နာကျင်သည့်နေရာတွင် လိမ်းပါ","hi":"दर्द वाले हिस्से पर लगाएं"},"แปะ 1-2 แผ่น":{"en":"Apply 1-2 patches","ja":"1〜2枚貼付","zh-CN":"贴1-2片","zh-TW":"貼1-2片","ko":"1-2매 부착","es":"Aplicar 1-2 parches","fr":"Appliquer 1-2 patchs","it":"Applicare 1-2 cerotti","de":"1-2 Pflaster aufkleben","ru":"Наклеить 1-2 пластыря","ar":"وضع 1-2 لصقة","vi":"Dán 1-2 miếng","km":"បិទ ១-២ បន្ទះ","my":"၁-၂ ချပ် ကပ်ပါ","hi":"1-2 पैच लगाएं"},"1 เม็ด":{"en":"1 pill","ja":"1錠","zh-CN":"1粒","zh-TW":"1粒","ko":"1알","es":"1 pastilla","fr":"1 comprimé","it":"1 compressa","de":"1 Tablette","ru":"1 таблетка","ar":"حبة واحدة","vi":"1 viên","km":"ថ្នាំគ្រាប់ ១ គ្រាប់","my":"ဆေးပြား ၁ ပြား","hi":"1 गोली"},"1-2 เม็ด":{"en":"1-2 pills","ja":"1〜2錠","zh-CN":"1-2粒","zh-TW":"1-2粒","ko":"1-2알","es":"1-2 pastillas","fr":"1-2 comprimés","it":"1-2 compresse","de":"1-2 Tabletten","ru":"1-2 таблетки","ar":"1-2 حبة","vi":"1-2 viên","km":"១-២ គ្រាប់","my":"၁-၂ ပြား","hi":"1-2 गोलियाँ"},"1 แคปซูล":{"en":"1 capsule","ja":"1カプセル","zh-CN":"1粒胶囊","zh-TW":"1粒膠囊","ko":"1캡슐","es":"1 cápsula","fr":"1 gélule","it":"1 capsula","de":"1 Kapsel","ru":"1 капсула","ar":"كبسولة واحدة","vi":"1 viên nang","km":"១ គ្រាប់ស្រោម","my":"၁ တောင့်","hi":"1 कैप्सूल"},"2 เม็ด":{"en":"2 pills","ja":"2錠","zh-CN":"2粒","zh-TW":"2粒","ko":"2알","es":"2 pastillas","fr":"2 comprimés","it":"2 compresse","de":"2 Tabletten","ru":"2 таблетки","ar":"حبتان","vi":"2 viên","km":"២ គ្រាប់","my":"၂ ပြား","hi":"2 गोलियाँ"},"1 แผ่น":{"en":"1 patch","ja":"1枚","zh-CN":"1片","zh-TW":"1片","ko":"1매","es":"1 parche","fr":"1 patch","it":"1 cerotto","de":"1 Pflaster","ru":"1 пластырь","ar":"لصقة واحدة","vi":"1 miếng","km":"១ បន្ទះ","my":"၁ ချပ်","hi":"1 पैच"},"4-5 หยด":{"en":"4-5 drops","ja":"4〜5滴","zh-CN":"4-5滴","zh-TW":"4-5滴","ko":"4-5방울","es":"4-5 gotas","fr":"4-5 gouttes","it":"4-5 gocce","de":"4-5 Tropfen","ru":"4-5 капель","ar":"4-5 قطرات","vi":"4-5 giọt","km":"៤-៥ តំណក់","my":"၄-၅ စက်","hi":"4-5 बूंदें"}};
const DOSE_OPTIONS = ["1 เม็ด", "ทาบางๆ", "1-2 เม็ด", "1 แคปซูล", "1 หยด", "1-2 หยด", "2 เม็ด", "1 ซอง", "ป้ายบางๆ", "1-2 ช้อนชา", "1 ช้อนโต๊ะ", "ทาถูนวด", "พ่น 1 ครั้ง", "2-4 เม็ด", "1-2 แคปซูล", "10 มล.", "พ่น 2 ครั้ง", "1-2 ช้อนโต๊ะ", "พ่น 2-3 ครั้ง", "5 มล.", "แปะ 1 แผ่น", "15-30 มล.", "พ่น 1-2 ครั้ง", "ป้ายทา", "1-2 มล.", "ทา 1-2 ครั้ง", "2-3 แคปซูล", "ทาบริเวณที่ปวด", "1-2 แผ่น", "10-15 มล.", "พ่น 2-4 ครั้ง", "4 ซอง", "1-2 ซอง", "1 ช้อนชา", "พ่นข้างละ 1 ครั้ง", "แปะ 1-2 แผ่น", "15-20 มล.", "15 มล.", "2 แคปซูล", "ทาทั่วใบหน้า", "หยดทาบางๆ", "ทาบำรุงผิว", "แต้มหัวสิว", "ตามแพทย์สั่ง", "พ่นข้างละ 1-2 ครั้ง", "ล้าง 1 ครั้ง", "ล้างตามต้องการ", "1 ครั้ง", "1 แผ่น", "ทาสัปดาห์ละ 1-2 ครั้ง", "จิบตลอดวัน", "ป้ายตา", "1 หลอด", "1 แท่ง", "1 ชิ้น", "4-5 หยด", "ครึ่งเม็ด"];
// v1.36: คำแปลประโยคสรรพคุณ/คำแนะนำย้ายไปไฟล์ glossary_lines.js (ที่เดียว) — คงชื่อนี้ไว้ให้หน้าแอดมินรุ่นเก่า
const GLOSSARY_EXTRA = [];
// ===== v1.36: กลุ่มยา (category_th ใน drugTH) — ลำดับใน dropdown · โรคติดเชื้อแยกเป็น แบคทีเรีย / รา / ไวรัส =====
const DRUG_CATEGORIES = [
    'โรคติดเชื้อแบคทีเรีย', 'โรคติดเชื้อรา', 'โรคติดเชื้อไวรัส', 'โรคพยาธิและปรสิต',
    'บรรเทาอาการปวด ลดไข้ กล้ามเนื้อและข้อ', 'โรคหวัดและภูมิแพ้', 'โรคระบบทางเดินหายใจ', 'โรคช่องปากและลำคอ',
    'โรคระบบทางเดินอาหาร', 'โรคริดสีดวงทวาร', 'โรคผิวหนัง', 'โรคตา', 'โรคหู',
    'โรคระบบทางเดินปัสสาวะและต่อมลูกหมาก', 'โรคทางสูตินรีเวช', 'โรคเกาต์', 'บรรเทาอาการเวียนศีรษะและเมารถ'
];
// ชื่อกลุ่มที่เลิกใช้ (ไม่ขึ้นใน dropdown) — ยาในกลุ่มนี้ให้ย้ายด้วยปุ่ม "🏷 แยกกลุ่มโรคติดเชื้อ" ในหน้าแอดมิน
const RETIRED_CATEGORIES = ['โรคติดเชื้อและยาปฏิชีวนะ'];
// ตัวยาสำคัญ (จากชื่อสามัญในวงเล็บ) → กลุ่มโรคติดเชื้อ (ใช้แนะนำกลุ่มอัตโนมัติ และตอนแยกกลุ่ม)
const CATEGORY_RULES = [
    { cat: 'โรคติดเชื้อแบคทีเรีย', re: 'AMOXI|CLAVULAN|AMPICILLIN|PENICILLIN|DICLOXACILLIN|CLOXACILLIN|\\bCEF|\\bCEPH|\\bCAPHALEXIN|AZITHROMYCIN|CLARITHROMYCIN|ROXITHROMYCIN|ERYTHROMYCIN|FLOXACIN|DOXYCYCLINE|TETRACYCLINE|MINOCYCLINE|CLINDAMYCIN|SULFAMETHOXAZOLE|TRIMETHOPRIM|CO-TRIMOXAZOLE|NITROFURANTOIN|FOSFOMYCIN|NIFUROXAZIDE|METRONIDAZOLE|TINIDAZOLE|FUSIDIC|MUPIROCIN|NEOMYCIN|GENTAMICIN|TOBRAMYCIN|CHLORAMPHENICOL|POLYMYXIN|BACITRACIN|RIFAMPICIN' },
    { cat: 'โรคติดเชื้อรา', re: 'CLOTRIMAZOLE|MICONAZOLE|KETOCONAZOLE|FLUCONAZOLE|ITRACONAZOLE|ECONAZOLE|ISOCONAZOLE|SERTACONAZOLE|BIFONAZOLE|TIOCONAZOLE|TERBINAFINE|NYSTATIN|GRISEOFULVIN|AMOROLFINE|CICLOPIROX|TOLNAFTATE|WHITFIELD' },
    { cat: 'โรคติดเชื้อไวรัส', re: 'ACICLOVIR|ACYCLOVIR|VALACICLOVIR|FAMCICLOVIR|PENCICLOVIR|OSELTAMIVIR|FAVIPIRAVIR|MOLNUPIRAVIR' }
];
// ชื่อยา/ชื่อสามัญ → กลุ่มโรคติดเชื้อที่ตรง (ยาผสมหลายกลุ่ม → คืนทุกกลุ่มที่ตรง)
// ใช้ชื่อสามัญในวงเล็บท้ายชื่อ (ถ้ามี) — กันชื่อการค้าที่บังเอิญคล้าย เช่น "Cefen (IBUPROFEN)"
const genericPartOf = name => { const s = String(name == null ? '' : name), m = s.match(/\(([^()]*)\)\s*$/); return (m && /[A-Za-z]{4}/.test(m[1]) ? m[1] : s).toUpperCase(); };
function infectionCategoriesOf(name) {
    const n = genericPartOf(name);
    return CATEGORY_RULES.filter(r => new RegExp(r.re).test(n)).map(r => r.cat);
}
// รายการกลุ่มยาสำหรับ dropdown = รายการมาตรฐาน + กลุ่มอื่นที่มีในชีท (ไม่รวมกลุ่มที่เลิกใช้)
function categoryOptions(sheetCats) {
    const out = DRUG_CATEGORIES.slice();
    (sheetCats || []).forEach(c => { c = String(c || '').trim(); if (c && out.indexOf(c) < 0 && RETIRED_CATEGORIES.indexOf(c) < 0) out.push(c); });
    return out;
}
// ข้อความไทยที่เก็บลงชีท = th ของตัวเลือก (เดิมตัดวงเล็บจาก label · "เม็ด" เฉยๆ ห้ามใช้ เพราะถูกแปลเป็น grain)
const sheetTextOf = label => { if (label && typeof label === 'object') return label.th || ''; const t = String(label).replace(/\s*\(.*\)\s*$/, '').trim(); return t === 'เม็ด' ? 'ยาเม็ด' : t; };
const ALL_TYPE_OPTIONS = DRUG_TYPE_GROUPS.reduce((a, g) => a.concat(g.options), []);
const SHEET_DRUG_TYPES = ALL_TYPE_OPTIONS.map(o => o.th);
const SHEET_MEALS = MEAL_OPTIONS.filter(o => o.value).map(o => o.th);
// ข้อความไทย (ชื่อมาตรฐานหรือชื่ออื่น) → key · ไม่พบ → ''
function termKeyOf(kind, thai) {
    const t = String(thai == null ? '' : thai).replace(/\s+/g, ' ').trim();
    if (!t) return '';
    const list = kind === 'type' ? ALL_TYPE_OPTIONS : MEAL_OPTIONS;
    const hit = list.find(o => o.value && o.th === t);
    if (hit) return hit.value;
    const al = kind === 'type' ? Object.assign({}, TERM_ALIASES.type, TERM_ALIASES.typeReview) : TERM_ALIASES.meal;
    return al[t] || '';
}
const termOptionOf = (kind, key) => (kind === 'type' ? ALL_TYPE_OPTIONS : MEAL_OPTIONS).find(o => o.value && o.value === key) || null;
// เลือกรูปคำตามจำนวน (ไวยากรณ์แต่ละภาษา) · ช่วง เช่น "1-2" ใช้ตัวเลขท้าย
//   ru: [1 / 2-4 / 5+ และ 11-14]  ·  ar: [1 / 2 / 3-10 / 11+] (ช่วงตัวเลขใช้รูปที่มีตัวเลขเสมอ)  ·  อื่นๆ: [1 / มากกว่า 1]
function pluralForm(f, n, lang) {
    if (f.length === 1) return f[0];
    const range = /-/.test(n), last = parseFloat(n.split('-').pop()), int = Number.isInteger(last);
    if (lang === 'ru' && f.length >= 3) {
        if (!int) return f[1];
        const m10 = last % 10, m100 = last % 100;
        if (m10 === 1 && m100 !== 11) return range ? f[0] : f[0];
        if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return f[1];
        return f[2];
    }
    if (lang === 'ar' && f.length >= 4) {
        if (!range && n === '1') return f[0];
        if (!range && n === '2') return f[1];
        return int && last >= 3 && last <= 10 ? f[2] : f[3];
    }
    return n === '1' ? f[0] : f[1];
}
// ขนาดยาภาษาไทย → ข้อความภาษาอื่นตามหน่วยนับมาตรฐาน (เช่น "1-2 เม็ด" → "1-2 pills") · แปลไม่ได้ → null
function doseTextOf(thai, lang) {
    let t = String(thai == null ? '' : thai).replace(/[๐-๙]/g, d => String(d.charCodeAt(0) - 0x0E50)).replace(/\s+/g, ' ').trim();
    if (!t || !lang || lang === 'th') return null;
    if (DOSE_PHRASES[t] && DOSE_PHRASES[t][lang]) return DOSE_PHRASES[t][lang];
    if (/^(ครึ่ง\s*เม็ด|0\.5\s*เม็ด|1\/2\s*เม็ด)$/.test(t)) return (UNIT_MAP.halfTablet && UNIT_MAP.halfTablet[lang]) || null;
    const NUM = '(\\d+(?:\\.\\d+)?(?:\\s*-\\s*\\d+(?:\\.\\d+)?)?)';
    for (const [pre, unitTh, u] of DOSE_UNIT_RULES) {
        const re = new RegExp('^' + (pre ? pre + '\\s*' : '') + NUM + '\\s*' + unitTh.replace('.', '\\.?') + '$');
        const m = t.match(re);
        if (!m) continue;
        const n = m[1].replace(/\s+/g, ''), f = DOSE_UNIT_FORMS[u] && DOSE_UNIT_FORMS[u][lang];
        if (!f) return null;
        let num = n;
        if (lang === 'km') num = n.replace(/\d/g, d => '០១២៣៤៥៦៧៨៩'[d]);
        if (lang === 'my') num = n.replace(/\d/g, d => '၀၁၂၃၄၅၆၇၈၉'[d]);
        if (lang === 'ja') num = n.replace('-', '〜');
        return pluralForm(f, n, lang).replace('{n}', num);
    }
    return null;
}



const BRANCHES = {
    PM017: {
        th: { pharmacyLine1: "ร้านยาฟาร์แมกซ์ - สาขาประดิษฐ์มนูธรรม", pharmacyLine2: "ประดิษฐ์มนูธรรม ซอย 1 (ติดสตาร์บัคส์)", pharmacyLine3: "เปิดทุกวัน 08:00 - 21:00" },
        ja: { pharmacyLine1: "ファーマックス薬局 - プラディット・マヌータム支店", pharmacyLine2: "プラディット・マヌータム・ソイ1（スターバックスコーヒー隣）", pharmacyLine3: "毎日営業 08:00 - 21:00" },
        en: { pharmacyLine1: "Pharmax Pharmacy - Pradit Manutham Branch", pharmacyLine2: "Pradit Manutham Soi 1 (Next to Starbucks coffee)", pharmacyLine3: "Open Daily 08:00 - 21:00" },
        ko: { pharmacyLine1: "파맥스 약국 - 프라딧 마누탐 지점", pharmacyLine2: "프라딧 마누탐 소이 1 (스타벅스 커피 옆)", pharmacyLine3: "매일 영업 08:00 - 21:00" },
        "zh-CN": { pharmacyLine1: "Pharmax药局 - Pradit Manutham分店", pharmacyLine2: "Pradit Manutham Soi 1 (星巴克咖啡旁)", pharmacyLine3: "每日营业 08:00 - 21:00" },
        "zh-TW": { pharmacyLine1: "Pharmax藥局 - Pradit Manutham分店", pharmacyLine2: "Pradit Manutham Soi 1 (星巴克咖啡旁)", pharmacyLine3: "每日營業 08:00 - 21:00" },
        es: { pharmacyLine1: "Farmacia Pharmax - Sucursal Pradit Manutham", pharmacyLine2: "Pradit Manutham Soi 1 (al lado de Starbucks)", pharmacyLine3: "Abierto todos los días 08:00 - 21:00" },
        fr: { pharmacyLine1: "Pharmacie Pharmax - Succursale Pradit Manutham", pharmacyLine2: "Pradit Manutham Soi 1 (à côté de Starbucks)", pharmacyLine3: "Ouvert tous les jours 08h00 - 21h00" },
        ru: { pharmacyLine1: "Аптека Pharmax - филиал Pradit Manutham", pharmacyLine2: "Pradit Manutham Soi 1 (рядом с кофейней Starbucks)", pharmacyLine3: "работает ежедневно 08:00 - 21:00" },
        ar: { pharmacyLine1: "صيدلية فارماكس - فرع براديت مانوثام", pharmacyLine2: "براديت مانوثام سوي 1 (بجانب قهوة ستاربكس)", pharmacyLine3: "مفتوح يوميًا 08:00 - 21:00" },
        my: { pharmacyLine1: "ဖာမက်စ် ဆေးဆိုင် - ပရာဒစ် မာနူသမ် ဆိုင်ခွဲ", pharmacyLine2: "ပရာဒစ် မာနူသမ် ဆွိုင်း ၁ (စတာဘတ် ကော်ဖီဆိုင်ဘေး)", pharmacyLine3: "နေ့စဉ်ဖွင့်သည် 08:00 - 21:00" },
        vi: { pharmacyLine1: "Nhà thuốc Pharmax - Chi nhánh Pradit Manutham", pharmacyLine2: "Pradit Manutham Soi 1 (Cạnh quán cà phê Starbucks)", pharmacyLine3: "Mở cửa hàng ngày 08:00 - 21:00" },
        km: { pharmacyLine1: "ឱសថស្ថាន Pharmax - សាខា Pradit Manutham", pharmacyLine2: "Pradit Manutham Soi 1 (ក្បែរកាហ្វេ Starbucks)", pharmacyLine3: "បើកជារៀងរាល់ថ្ងៃ 08:00 - 21:00" },
        it: { pharmacyLine1: "Farmacia Pharmax - Filiale Pradit Manutham", pharmacyLine2: "Pradit Manutham Soi 1 (accanto a Starbucks)", pharmacyLine3: "Aperto tutti i giorni 08:00 - 21:00" },
        de: { pharmacyLine1: "Pharmax Apotheke - Filiale Pradit Manutham", pharmacyLine2: "Pradit Manutham Soi 1 (neben Starbucks)", pharmacyLine3: "Täglich geöffnet 08:00 - 21:00" },
        hi: { pharmacyLine1: "फार्मैक्स फार्मेसी - Pradit Manutham शाखा", pharmacyLine2: "Pradit Manutham Soi 1 (Starbucks कॉफी के पास)", pharmacyLine3: "प्रतिदिन खुला 08:00 - 21:00" }
    },
    PM018: {
        th: { pharmacyLine1: "ร้านยาฟาร์แมกซ์ - สาขาจามจุรีสแควร์", pharmacyLine2: "ชั้น B ติดบันไดเลื่อนทางเข้า MRT สามย่าน", pharmacyLine3: "เปิดทุกวัน 10:00 - 20:00" },
        ja: { pharmacyLine1: "ファーマックス薬局 - チャムチュリー・スクエア支店", pharmacyLine2: "B階、MRTサムヤン駅入口へのエスカレーター横", pharmacyLine3: "毎日営業 10:00 - 20:00" },
        en: { pharmacyLine1: "Pharmax Pharmacy - Chamchuri Square Branch", pharmacyLine2: "B Floor, Next to the Escalator to MRT Samyan Entrance", pharmacyLine3: "Open Daily 10:00 - 20:00" },
        ko: { pharmacyLine1: "파맥스 약국 - 짬쭈리 스퀘어 지점", pharmacyLine2: "B층, MRT 삼얀역 입구 에스컬레이터 옆", pharmacyLine3: "매일 영업 10:00 - 20:00" },
        "zh-CN": { pharmacyLine1: "Pharmax药局 - Chamchuri Square分店", pharmacyLine2: "B层，靠近MRT三央站入口扶梯", pharmacyLine3: "每日营业 10:00 - 20:00" },
        "zh-TW": { pharmacyLine1: "Pharmax藥局 - Chamchuri Square分店", pharmacyLine2: "B層，靠近MRT三央站入口手扶梯", pharmacyLine3: "每日營業 10:00 - 20:00" },
        es: { pharmacyLine1: "Farmacia Pharmax - Sucursal Chamchuri Square", pharmacyLine2: "Piso B, junto a la escalera mecánica de la entrada del MRT Samyan", pharmacyLine3: "Abierto todos los días 10:00 - 20:00" },
        fr: { pharmacyLine1: "Pharmacie Pharmax - Succursale Chamchuri Square", pharmacyLine2: "Étage B, à côté de l'escalator de l'entrée du MRT Samyan", pharmacyLine3: "Ouvert tous les jours 10h00 - 20h00" },
        ru: { pharmacyLine1: "Аптека Pharmax - филиал Chamchuri Square", pharmacyLine2: "Этаж B, рядом с эскалатором у входа в MRT Самьян", pharmacyLine3: "работает ежедневно 10:00 - 20:00" },
        ar: { pharmacyLine1: "صيدلية فارماكس - فرع تشامتشوري سكوير", pharmacyLine2: "الطابق B، بجانب السلم المتحرك لمدخل MRT سامیان", pharmacyLine3: "مفتوح يوميًا 10:00 - 20:00" },
        my: { pharmacyLine1: "ဖာမက်စ် ဆေးဆိုင် - ချမ်ချူရီ စကွဲယား ဆိုင်ခွဲ", pharmacyLine2: "B ထပ်၊ MRT ဆမ်ယန် ဝင်ပေါက် လှေကားလှုပ် အနီး", pharmacyLine3: "နေ့စဉ်ဖွင့်သည် 10:00 - 20:00" },
        vi: { pharmacyLine1: "Nhà thuốc Pharmax - Chi nhánh Chamchuri Square", pharmacyLine2: "Tầng B, cạnh thang cuốn lối vào MRT Samyan", pharmacyLine3: "Mở cửa hàng ngày 10:00 - 20:00" },
        km: { pharmacyLine1: "ឱសថស្ថាន Pharmax - សាខា Chamchuri Square", pharmacyLine2: "ជាន់ B ក្បែរជណ្ដើរអេស្កាឡាទ័រច្រកចូល MRT សាំយ៉ាន់", pharmacyLine3: "បើកជារៀងរាល់ថ្ងៃ 10:00 - 20:00" },
        it: { pharmacyLine1: "Farmacia Pharmax - Filiale Chamchuri Square", pharmacyLine2: "Piano B, accanto alla scala mobile dell'ingresso MRT Samyan", pharmacyLine3: "Aperto tutti i giorni 10:00 - 20:00" },
        de: { pharmacyLine1: "Pharmax Apotheke - Filiale Chamchuri Square", pharmacyLine2: "B-Etage, neben der Rolltreppe zum MRT-Samyan-Eingang", pharmacyLine3: "Täglich geöffnet 10:00 - 20:00" },
        hi: { pharmacyLine1: "फार्मैक्स फार्मेसी - Chamchuri Square शाखा", pharmacyLine2: "बी फ्लोर, MRT समयान प्रवेश द्वार की एस्केलेटर के पास", pharmacyLine3: "प्रतिदिन खुला 10:00 - 20:00" }
    },
    PM022: {
        th: { pharmacyLine1: "ร้านยาฟาร์แมกซ์ - สาขาเดอะไนน์ พระราม 9", pharmacyLine2: "จันทร์-ศุกร์ เปิด 10:30 - 20:30 เสาร์-อาทิตย์ เปิด 10:00 - 21:00" },
        ja: { pharmacyLine1: "ファーマックス薬局 - ザ・ナイン ラーマ9支店", pharmacyLine2: "月〜金 営業 10:30 - 20:30、土日 営業 10:00 - 21:00" },
        en: { pharmacyLine1: "Pharmax Pharmacy - The Nine Rama 9 Branch", pharmacyLine2: "Mon-Fri Open 10:30 - 20:30, Sat & Sun Open 10:00 - 21:00" },
        ko: { pharmacyLine1: "파맥스 약국 - 더 나인 라마9 지점", pharmacyLine2: "월~금 영업 10:30 - 20:30, 토·일 영업 10:00 - 21:00" },
        "zh-CN": { pharmacyLine1: "Pharmax药局 - The Nine Rama 9分店", pharmacyLine2: "周一至周五营业 10:30 - 20:30，周六日营业 10:00 - 21:00" },
        "zh-TW": { pharmacyLine1: "Pharmax藥局 - The Nine Rama 9分店", pharmacyLine2: "週一至週五營業 10:30 - 20:30，週六日營業 10:00 - 21:00" },
        es: { pharmacyLine1: "Farmacia Pharmax - Sucursal The Nine Rama 9", pharmacyLine2: "Lun-Vie Abierto 10:30 - 20:30, Sáb y Dom Abierto 10:00 - 21:00" },
        fr: { pharmacyLine1: "Pharmacie Pharmax - Succursale The Nine Rama 9", pharmacyLine2: "Lun-Ven Ouvert 10h30 - 20h30, Sam & Dim Ouvert 10h00 - 21h00" },
        ru: { pharmacyLine1: "Аптека Pharmax - филиал The Nine Rama 9", pharmacyLine2: "Пн-Пт работает 10:30 - 20:30, Сб и Вс работает 10:00 - 21:00" },
        ar: { pharmacyLine1: "صيدلية فارماكس - فرع ذا ناين راما 9", pharmacyLine2: "الإثنين-الجمعة مفتوح 10:30 - 20:30، السبت والأحد مفتوح 10:00 - 21:00" },
        my: { pharmacyLine1: "ဖာမက်စ် ဆေးဆိုင် - ဒနိုင်း ရာမ9 ဆိုင်ခွဲ", pharmacyLine2: "တနင်္လာ-သောကြာ ဖွင့်သည် 10:30 - 20:30၊ စနေ၊တနင်္ဂနွေ ဖွင့်သည် 10:00 - 21:00" },
        vi: { pharmacyLine1: "Nhà thuốc Pharmax - Chi nhánh The Nine Rama 9", pharmacyLine2: "Thứ 2-6 mở cửa 10:30 - 20:30, Thứ 7 & CN mở cửa 10:00 - 21:00" },
        km: { pharmacyLine1: "ឱសថស្ថាន Pharmax - សាខា The Nine Rama 9", pharmacyLine2: "ច័ន្ទ-សុក្រ បើក 10:30 - 20:30 សៅរ៍-អាទិត្យ បើក 10:00 - 21:00" },
        it: { pharmacyLine1: "Farmacia Pharmax - Filiale The Nine Rama 9", pharmacyLine2: "Lun-Ven aperto 10:30 - 20:30, Sab e Dom aperto 10:00 - 21:00" },
        de: { pharmacyLine1: "Pharmax Apotheke - Filiale The Nine Rama 9", pharmacyLine2: "Mo-Fr geöffnet 10:30 - 20:30, Sa & So geöffnet 10:00 - 21:00" },
        hi: { pharmacyLine1: "फार्मैक्स फार्मेसी - The Nine Rama 9 शाखा", pharmacyLine2: "सोम-शुक्र खुला 10:30 - 20:30, शनि व रवि खुला 10:00 - 21:00" }
    },
    PM025: {
        th: { pharmacyLine1: "ร้านยาฟาร์แมกซ์ - สาขาเดอะสตรีท รัชดา", pharmacyLine2: "ชั้น B ตรงข้ามฟู้ดแลนด์ ซูเปอร์มาร์เก็ต", pharmacyLine3: "เปิดทุกวันตลอด 24 ชั่วโมง" },
        ja: { pharmacyLine1: "ファーマックス薬局 - ザ・ストリート ラチャダー支店", pharmacyLine2: "B階、フードランドスーパー向かい", pharmacyLine3: "年中無休24時間営業" },
        en: { pharmacyLine1: "Pharmax Pharmacy - The Street Ratchada Branch", pharmacyLine2: "B Floor, Opposite FoodLand Supermarket", pharmacyLine3: "Open Daily 24 Hours" },
        ko: { pharmacyLine1: "파맥스 약국 - 더 스트리트 랏차다 지점", pharmacyLine2: "B층, 푸드랜드 슈퍼마켓 맞은편", pharmacyLine3: "매일 24시간 영업" },
        "zh-CN": { pharmacyLine1: "Pharmax药局 - The Street Ratchada分店", pharmacyLine2: "B层，FoodLand超市对面", pharmacyLine3: "每日24小时营业" },
        "zh-TW": { pharmacyLine1: "Pharmax藥局 - The Street Ratchada分店", pharmacyLine2: "B層，FoodLand超市對面", pharmacyLine3: "每日24小時營業" },
        es: { pharmacyLine1: "Farmacia Pharmax - Sucursal The Street Ratchada", pharmacyLine2: "Piso B, frente al supermercado FoodLand", pharmacyLine3: "Abierto todos los días las 24 horas" },
        fr: { pharmacyLine1: "Pharmacie Pharmax - Succursale The Street Ratchada", pharmacyLine2: "Étage B, en face du supermarché FoodLand", pharmacyLine3: "Ouvert 24h/24, tous les jours" },
        ru: { pharmacyLine1: "Аптека Pharmax - филиал The Street Ratchada", pharmacyLine2: "Этаж B, напротив супермаркета FoodLand", pharmacyLine3: "работает ежедневно круглосуточно" },
        ar: { pharmacyLine1: "صيدلية فارماكس - فرع ذا ستريت راتشادا", pharmacyLine2: "الطابق B، مقابل سوبر ماركت فودلاند", pharmacyLine3: "مفتوح يوميًا على مدار 24 ساعة" },
        my: { pharmacyLine1: "ဖာမက်စ် ဆေးဆိုင် - ဒစ်စထရိတ် ရာဆာဒါ ဆိုင်ခွဲ", pharmacyLine2: "B ထပ်၊ FoodLand စူပါမားကတ်ဆိုင် ဆန့်ကျင်ဘက်", pharmacyLine3: "နေ့စဉ် ၂၄ နာရီ ဖွင့်သည်" },
        vi: { pharmacyLine1: "Nhà thuốc Pharmax - Chi nhánh The Street Ratchada", pharmacyLine2: "Tầng B, đối diện siêu thị FoodLand", pharmacyLine3: "Mở cửa 24 giờ mỗi ngày" },
        km: { pharmacyLine1: "ឱសថស្ថាន Pharmax - សាខា The Street Ratchada", pharmacyLine2: "ជាន់ B ទល់មុខផ្សារទំនើប FoodLand", pharmacyLine3: "បើកជារៀងរាល់ថ្ងៃ ២៤ ម៉ោង" },
        it: { pharmacyLine1: "Farmacia Pharmax - Filiale The Street Ratchada", pharmacyLine2: "Piano B, di fronte al supermercato FoodLand", pharmacyLine3: "Aperto 24 ore su 24, tutti i giorni" },
        de: { pharmacyLine1: "Pharmax Apotheke - Filiale The Street Ratchada", pharmacyLine2: "B-Etage, gegenüber dem FoodLand-Supermarkt", pharmacyLine3: "Täglich 24 Stunden geöffnet" },
        hi: { pharmacyLine1: "फार्मैक्स फार्मेसी - The Street Ratchada शाखा", pharmacyLine2: "बी फ्लोर, FoodLand सुपरमार्केट के सामने", pharmacyLine3: "प्रतिदिन 24 घंटे खुला" }
    },
    PM033: {
        th: { pharmacyLine1: "ร้านยาฟาร์แมกซ์ - สาขาทองหล่อ ซอย 13", pharmacyLine2: "อาคารโฮมเพลส", pharmacyLine3: "เปิดทุกวัน 09:00 - 21:00" },
        ja: { pharmacyLine1: "ファーマックス薬局 - トンローソイ13支店", pharmacyLine2: "ホームプレイスビル", pharmacyLine3: "毎日営業 09:00 - 21:00" },
        en: { pharmacyLine1: "Pharmax Pharmacy - Thonglor Soi 13 Branch", pharmacyLine2: "Home Place Building", pharmacyLine3: "Open Daily 09:00 - 21:00" },
        ko: { pharmacyLine1: "파맥스 약국 - 통로 소이13 지점", pharmacyLine2: "홈플레이스 빌딩", pharmacyLine3: "매일 영업 09:00 - 21:00" },
        "zh-CN": { pharmacyLine1: "Pharmax药局 - 通罗13巷分店", pharmacyLine2: "Home Place大楼", pharmacyLine3: "每日营业 09:00 - 21:00" },
        "zh-TW": { pharmacyLine1: "Pharmax藥局 - 通羅13巷分店", pharmacyLine2: "Home Place大樓", pharmacyLine3: "每日營業 09:00 - 21:00" },
        es: { pharmacyLine1: "Farmacia Pharmax - Sucursal Thonglor Soi 13", pharmacyLine2: "Edificio Home Place", pharmacyLine3: "Abierto todos los días 09:00 - 21:00" },
        fr: { pharmacyLine1: "Pharmacie Pharmax - Succursale Thonglor Soi 13", pharmacyLine2: "Bâtiment Home Place", pharmacyLine3: "Ouvert tous les jours 09h00 - 21h00" },
        ru: { pharmacyLine1: "Аптека Pharmax - филиал Тхонгло Сой 13", pharmacyLine2: "Здание Home Place", pharmacyLine3: "работает ежедневно 09:00 - 21:00" },
        ar: { pharmacyLine1: "صيدلية فارماكس - فرع ثونغلو سوي 13", pharmacyLine2: "مبنى هوم بليس", pharmacyLine3: "مفتوح يوميًا 09:00 - 21:00" },
        my: { pharmacyLine1: "ဖာမက်စ် ဆေးဆိုင် - သွန်လော် ဆွိုင်း ၁၃ ဆိုင်ခွဲ", pharmacyLine2: "ဟုမ်းပလေ့စ် အဆောက်အအုံ", pharmacyLine3: "နေ့စဉ်ဖွင့်သည် 09:00 - 21:00" },
        vi: { pharmacyLine1: "Nhà thuốc Pharmax - Chi nhánh Thonglor Soi 13", pharmacyLine2: "Tòa nhà Home Place", pharmacyLine3: "Mở cửa hàng ngày 09:00 - 21:00" },
        km: { pharmacyLine1: "ឱសថស្ថាន Pharmax - សាខាថនឡូ សូយ១៣", pharmacyLine2: "អគារ Home Place", pharmacyLine3: "បើកជារៀងរាល់ថ្ងៃ 09:00 - 21:00" },
        it: { pharmacyLine1: "Farmacia Pharmax - Filiale Thonglor Soi 13", pharmacyLine2: "Edificio Home Place", pharmacyLine3: "Aperto tutti i giorni 09:00 - 21:00" },
        de: { pharmacyLine1: "Pharmax Apotheke - Filiale Thonglor Soi 13", pharmacyLine2: "Home Place Gebäude", pharmacyLine3: "Täglich geöffnet 09:00 - 21:00" },
        hi: { pharmacyLine1: "फार्मैक्स फार्मेसी - Thonglor Soi 13 शाखा", pharmacyLine2: "Home Place भवन", pharmacyLine3: "प्रतिदिन खुला 09:00 - 21:00" }
    },
    PM062: {
        th: { pharmacyLine1: "ร้านยาฟาร์แมกซ์ - สาขาโกลเด้นเพลส พระราม 9", pharmacyLine2: "ลานจอดรถโกลเด้นเพลส พระราม 9", pharmacyLine3: "(ติดกับคลินิกเวชกรรมพัฒนาการแพทย์)", pharmacyLine4: "เปิดทุกวัน 08:00 - 20:00" },
        // ja/ko/zh-CN/zh-TW/km: อักษรหนาแน่น ไม่มีปัญหาล้นบรรทัด คงรูปแบบเดิม 3 บรรทัด
        ja: { pharmacyLine1: "ファーマックス薬局 - ゴールデンプレイス・ラマ9支店", pharmacyLine2: "ゴールデンプレイス・ラマ9駐車場（メディカルディベロップメントクリニック隣）", pharmacyLine3: "毎日営業 08:00 - 20:00" },
        ko: { pharmacyLine1: "파맥스 약국 - 골든 플레이스 라마9 지점", pharmacyLine2: "골든 플레이스 라마9 주차장 (메디컬 디벨롭먼트 클리닉 옆)", pharmacyLine3: "매일 영업 08:00 - 20:00" },
        "zh-CN": { pharmacyLine1: "Pharmax药局 - Golden Place Rama 9分店", pharmacyLine2: "Golden Place Rama 9停车场 (Medical Development诊所旁)", pharmacyLine3: "每日营业 08:00 - 20:00" },
        "zh-TW": { pharmacyLine1: "Pharmax藥局 - Golden Place Rama 9分店", pharmacyLine2: "Golden Place Rama 9停車場 (Medical Development診所旁)", pharmacyLine3: "每日營業 08:00 - 20:00" },
        km: { pharmacyLine1: "ឱសថស្ថាន Pharmax - សាខា Golden Place Rama 9", pharmacyLine2: "ចំណតឡាន Golden Place Rama 9 (ក្បែរគ្លីនិក Medical Development)", pharmacyLine3: "បើកជារៀងរាល់ថ្ងៃ 08:00 - 20:00" },
        // ภาษาที่เหลือ: แยกวงเล็บจุดสังเกตลงบรรทัดที่ 3 และเวลาทำการเป็นบรรทัดที่ 4 แยกต่างหาก กันล้นขอบแนวนอน
        en: { pharmacyLine1: "Pharmax Pharmacy - Golden Place Rama 9 Branch", pharmacyLine2: "Golden Place Rama 9 Parking Lot", pharmacyLine3: "(Next to Medical Development Clinic)", pharmacyLine4: "Open Daily 08:00 - 20:00" },
        es: { pharmacyLine1: "Farmacia Pharmax - Sucursal Golden Place Rama 9", pharmacyLine2: "Estacionamiento de Golden Place Rama 9", pharmacyLine3: "(junto a la clínica Medical Development)", pharmacyLine4: "Abierto todos los días 08:00 - 20:00" },
        fr: { pharmacyLine1: "Pharmacie Pharmax - Succursale Golden Place Rama 9", pharmacyLine2: "Parking de Golden Place Rama 9", pharmacyLine3: "(à côté de la clinique Medical Development)", pharmacyLine4: "Ouvert tous les jours 08h00 - 20h00" },
        ru: { pharmacyLine1: "Аптека Pharmax - филиал Golden Place Rama 9", pharmacyLine2: "Парковка Golden Place Rama 9", pharmacyLine3: "(рядом с клиникой Medical Development)", pharmacyLine4: "работает ежедневно 08:00 - 20:00" },
        ar: { pharmacyLine1: "صيدلية فارماكس - فرع جولدن بليس راما 9", pharmacyLine2: "موقف سيارات جولدن بليس راما 9", pharmacyLine3: "(بجانب عيادة تطوير التطور الطبي)", pharmacyLine4: "مفتوح يوميًا 08:00 - 20:00" },
        my: { pharmacyLine1: "ဖာမက်စ် ဆေးဆိုင် - ဂိုးလ်ဒင် ပလေ့စ် ရာမ 9 ဆိုင်ခွဲ", pharmacyLine2: "ဂိုးလ်ဒင် ပလေ့စ် ရာမ 9 ကားပါကင်", pharmacyLine3: "(Medical Development ဆေးခန်းဘေး)", pharmacyLine4: "နေ့စဉ်ဖွင့်သည် 08:00 - 20:00" },
        vi: { pharmacyLine1: "Nhà thuốc Pharmax - Chi nhánh Golden Place Rama 9", pharmacyLine2: "Bãi đỗ xe Golden Place Rama 9", pharmacyLine3: "(Cạnh phòng khám Medical Development)", pharmacyLine4: "Mở cửa hàng ngày 08:00 - 20:00" },
        it: { pharmacyLine1: "Farmacia Pharmax - Filiale Golden Place Rama 9", pharmacyLine2: "Parcheggio Golden Place Rama 9", pharmacyLine3: "(accanto alla clinica Medical Development)", pharmacyLine4: "Aperto tutti i giorni 08:00 - 20:00" },
        de: { pharmacyLine1: "Pharmax Apotheke - Filiale Golden Place Rama 9", pharmacyLine2: "Golden Place Rama 9 Parkplatz", pharmacyLine3: "(neben der Medical Development Klinik)", pharmacyLine4: "Täglich geöffnet 08:00 - 20:00" },
        hi: { pharmacyLine1: "फार्मैक्स फार्मेसी - Golden Place Rama 9 शाखा", pharmacyLine2: "Golden Place Rama 9 पार्किंग लॉट", pharmacyLine3: "(Medical Development क्लिनिक के पास)", pharmacyLine4: "प्रतिदिन खुला 08:00 - 20:00" }
    }
};

const BRANCH_NAMES = {
    PM017: 'PM017 ประดิษฐ์มนูธรรม',
    PM018: 'PM018 จามจุรี',
    PM022: 'PM022 เดอะไนน์',
    PM025: 'PM025 เดอะสตรีท',
    PM033: 'PM033 ทองหล่อ 13',
    PM062: 'PM062 โกลเด้นเพลส'
};

// ==========================================
// BRAND LOGOS
// v1.38: โลโก้ iCare ตัดขอบนอก (ขาว/ดำ) ออกแล้ว
// - BRAND_LOGOS       = เวอร์ชันขาวดำ (พื้นหลังโปร่งใส) ใช้พิมพ์บนหัวฉลากยา (.label-logo)
// - BRAND_LOGOS_COLOR = เวอร์ชันเต็มสี ใช้แสดงในหน้าแรก (brand picker)
//   ทั้งสองตัวของ pharmax เป็น null ตั้งแต่ต้น เพราะดึงจาก src เดิมที่ฝังอยู่ใน index.html
//   (#label_logo_img และ .home-logo) อัตโนมัติตอนหน้าเว็บโหลดเสร็จ กัน base64 ซ้ำซ้อน 2 ที่
// ==========================================
const BRAND_LOGOS = {
    pharmax: null,
    icare: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdUAAADUCAYAAADKkrnmAAA3hElEQVR42u2debwkVXXHv9Xd780MszAMDPsOIkJQFneBBFziyqKoqERRVFTcABVIUDSRsClKSFyRGKOChgRF0YAsikKEsMjO4IDsMMCwOcPMvNfdlT/Ouan7aqrf66XW7vP7fOozb95SXXWX8zu/c889F7LFLAwGg8FgGBEEGdxzDJgExoGWNbHBYDAYSsyBzbKS6mwl0VD/774OrN8MBoPBUDI4fvKvJtAYhGjTILyG3ieMkarBYDAYDFVQq/7XNaCuxJprtLWGrJnWrU8MBoPBMESoIUuYtTyZfSzPDzQYDAaDIWcF2yDjJUwjU4PBYDCMmmodU+U6I3oN3c5C4sxta2eDwWAwjADCGF+mljc0hmXyGgwGg2E0EahaDdK4kRGqwWAwGEadVOvKhwNhlhGqwWAwGAygxBpMx7zToYHEj9vks/806OKZbD3XYDAYDEWioVzU7pVU62S3+TVIeIZuCLNmJGswGAyGAuGWRddK3J2OVMeRGr5hBg8TdCDEecDbgHU7/N3DwDkJxO+eMcQqOhkMBkMepEKfwqhszx/2+fc1Vaxr4hK2E6E2M3iRmj6MU78vBl6K1A0OgA2BDyq5JuExYDt9tgD4I3BeAsGaejUYDIbsEHb4ulYB++sI0dX+7Ycz3N+04u/cSak2SLeOb5xM363kuBewN1P3y7o4dZDwEvEF4vuAs/T7NwLnV6hjDQaDoYpYAOyoNnYT4Plqc68FfukRVVkJNUzxXm6bzerpSNWp1LRCqT7BvRt4HnAosLF+r5XwkEkvnuRR+GS8FDgXuAH4LyTe3TJyNRgMhlSxO3Ca2tfNgJ30+0uAo4FfePa6jOS6I3CwPv8s4Ep1Bmp9PLPbZhPSIf8ozVqHbiEX4BDgVOB+76Gbnir1r3CGy/+9tt7HdwKWAvvHSN1gMBgM6eBVSiAtz5a7/JvveIKnTFsxA49QL4hxytcHeGYXSp7tvtFIUKlpJCc5BTmphHqyejROmdbo/3SbpGN6fBW7nX7eXsA1qlpr2LF0BoPBkAZCYIIoUcfPZZko+bM/H3gTklxU02tiwLZwXDcGTDZiRNgckHgCj8B2BPYDPqqEOiiZzkSyToa39bN3BO7Rz/1P0l8nNhgMhlFEXQXYBGsnKdVmEEJJhNStjQ+7EFrT3dsdQt6iu5oI/RDrFKXaSoHwHDG/A3gvktk7nyjJKA/UPK9pa+AfkUXkC41YDQaDYWDcDHwD+EgX5Fhj7UxbR3B+8YR4Lo1fxD7wOCqMkWTA2jUP/NybMPa743pPn4/GU2iT0Dka/o3HGKxyklOoBwOnIIvZ4zN4KlnBV8yLgRcCf0IW0htY8pLBYDD0ixXA9cCtwEPI1kgXibwO+LmnWOM5MGHs69oMnBOSXLnI2fj4PdtM3SkSxp5lFfAEcLs+68XAj4AHSSczeMwp1cYAhBp4D/0u4CRgC71f0UlCriLUDsDp6jhcQBQmNsVqMBgMvdv8R4DvAstVsSbt1mgBb1ChNcHUjOAG8C3gKv3+c4D1iZJP71QCPA7YBngWiTo+5N2/DuwLHEiUKFQH7gJOJArztoFdgCP1s+cDC/X3N0W2Y17t3XcQXpiIE1DQZwM7Rfo1otTisESXe56lyCL1IO9rMBgMow4X1n0LUeJSCHzT44XXIKHiTnb5QuAF+vunIPtcfwf8BthDeeUG/d1ngb/wPn+h8s0NCff9M/Bj4G9VSO0CXDbNc3wtBU5wJL9W9m/Yx42cGj0UeG1JFGrSAHCZwV/Wry80UjUYDIa+4JNSp5/vokTY9EjYL+7zfGT74+NIYuke+rdtT0mu0XutJgoBL1Q7/m6iQ1/8z50HvBVJkD0Z2BLYB0kkiidTBaSzHPj/z+BItZ+yhIEn8d+p0nyTkntWbQ0znKrPfXGfzoTBYDAYpocL5U4iOS33ISHdxUqo6wGHIaHk2UR7Xn2yjicjAcwB/toj1KQ6xCFSlOKzyNbKyRh51oB7VRlf5j3vIFzQAsYdY/ezlca96CHIOuomFSAnl1K9k3Zq29SqwWAwZCJirkJCubOARUg1vSXAUfr9uaoid1Z1mUSgnVThRIxE4z8PVNH+JVFoNoip1IVIEuu2MU4bBM2Gd7NeSzM5Zt6ZaB9qveQd7WeMfQDJAPs55a5VaTAYDFWCs6fbKz+AHJZSU3V6B5Jt61Bn7SXDIOF7tQQOipNp0veuR2omuNDzNsB7gJcosW7TJw8mojFAo6Eq9RDKuY463bO3tcN3BS6i/FVADAaDoSoK1WFLpMZ7yyO4MSR8W5vBPrvSf/7vrat/n/S3/mfUYsrzMSSHxsEd5vIiMjgzvB8i9EsCPhfYfBrPocxqtaVq9XVEpQ4NBoPB0B9WKDdsxdrV8+I7MWbCjkjxIHcM6JgqywX6dTw5yR3D9iCy1acV4zlfQC4g+czuVNCPUnWexLuQReYqr0tuQbSn1mAwGAz9i5VZwAFI5O8cJBroC7EakrAUImusccKFaO3zKCSRaJMYqc5HtszM9f5+OfDPwO/1GfabxqbvjWQOb83alZgKI1X3ENvoC7cqSKq+Wv00cDdTjysyGAwGw8zwCbGBZPa+FwndjnlK8WbgUuB/VCk2mLqv1G2dcbZ5ayRXx1e7c5FCPi3gj6o2ZwFPA99Twt4cWZLsZMc3RJKTJrNqkNoAjdiIkVRV4eL+BoPBYOgNTabmpITAOkRrqS7ku4MqyqeR5KVZSmxrkK02yxN4xJFyvBRhoH/jtoG2gGdiqrgTXJjY/QspRyp7Vaouc/YQ4AiqlaA0k3K1NVWDwWDoXlwBXILsBT2FqcUVJpEqSG675hwl1tuRddL/Rrbc3ICUCLxIVe5eMfW7iiiZyGXvrlISXqMEHt+rGq83nESsfsH9QknVYRNgA6oZ+k3CbCzsazAYDL2KkVVInd5niM4onYMsqZ0IrATej1REcuuuLeBhpOjDTUqQjyNJRiuISh62gL9HEmI31s/4M3C2/nx/vecKj1jXAA8ATynhPht75klVy039/Tn6bKk2CnRfYN4p1aOBLxGdTFBVYnVeynIk6cr2rBoMBkNvmI+sf/o88TjwKJKQtIES42IlwNuQ9c+Gkq4L426OrLf6KvJBFT2uvnwL2SITIOuuY0rC9+rPGkhh/vX091cqyYbes27q8V+AnFqzLKW2+P/IbbeFhN0fHE1UUsqPd1ftanvhiUNijobBYDAY0sEYEvadTzrnl5YVtYb1talSg8FgyBiTZJhxWypWtb42GAwGg8FI1WAwGAwGI1WDwWAwGIxUDQaDwWAwGKkaDAaDwWCkajAYDAaDkWplkMlJBQaDwWAwUu2ViIYF9yNVOgwGg8FgyJ1Un0BqMFYZrqJSHTgVKejsvm8wGAwGQ+ak6gjnV8BPlJCGgYTWDKkCNxgMBkPJlWqAhEuXekRbZWJdipzNZwrVYDAYDLkrVVfZ/w4loyqqOz/0+yUs9GswGAyGgpSqI54fA9/Re1SZjBpU+/g6g8FgMFSYVFECqqnSo4Iqzz3r7cgBu20bCgaDwWAoUqm2geuRE96rtN/VD/2ehSRdVc0pMBgMBkOJ0e0h5b5Sdb//ZmAJcup6FQ4sb+m/twKvxkK/BoPBYEhZqPZKqo5Yx/Tr05SomhUg1CZwA7Cv9x4Gg8FgMAxMqoOGbV0Y9WokDFynvOuTftj3XOAyJEnJwr4Gg8FgSBX9KNW43D0A2fPph1jLcrU9FX0TEvatY7WPDQaDwZCiUk2DVFHFV1ZijROqhX0NBoPBUGpSDWLEeldJiNUn1FuA16T0vgaDwWAwZEaqcWLdvwSKtQ1M6tc3IiFfI1SDwWAwVIJUHbG6jOCDgD8RZQXnud3G395zI7CPPlPD+txgMBgMVSFVX7HWkT2sd7H2HtEsydSp07uAM02hDtyXWV8Gg8FgpNoFnCo8EPgsUTh4UlVkOwX16t9n0rvfzfq5c733M/ROnvUcLiNcg8FgpNrrB6hqvZepCUSDhIXdPXwyvQU4Bnit9162bWZmEo0TXSNnUuuWcA0Gg6HUpBp4Rs0RUxbEWlMCPAB4DvAOYDf9ufvcJPILYwY19P71f/8u4N+Aa4Ffep9rhfKnEmnc2Qk8pR/H1sDHE5yjtOAco58Bv9PxkfTMdabWmyY2FgwGg2GkSJUEktsH2BFYF/gksFEf9/sT8FU1vHcBF3pkW/WD07Mi0oBo7dlhfeBYYE7MedkKeGMOz3gNEq5fE/v+CuBfkDN74xGV0BtL1s8Gg2EkSdVXPM4gzkLCwnsAm+g1rj+bQI5mWwDsSlRScCVyXNuvgW8n3HvUCTWJSH01Oh84Hlik7bQIeEuHe+Wh9GvTfPYvgGX6nI8CXwRWxSIgRrAGg6E0pJrnFpPAU5JjyFroGuAc4HLgn1Sxumdya65zVNG6ZKN1VJn+DzAbWO05Bv5666gZ2CBGpK4NA3VWPgFsrO13AFO3FyU5IgH5rEeHHQgxiCnlCWA7HTMPAmco4eI5XC2b0waDoQyGOGulGsRUU4BkBO+o/x8DXq8GvxusAK4EntZ7XQ182XufBlOzi0eFTFFicduaTgC2V7X/Si8KgNcPcXVbJnRaQ18NXKpRi9tUwY6iI2UwGEqmVLMmVUemLky3GfARYAc18vO7MKrdGPzHkVNnxoHfIvtT/eSWYUxYCmKqNFQl+lEkGayGlGWcm0CkVc2kDRMI9s/a9zcouYbYEoDBYCiIVPFINcjg5mN671nA54HfqLqIVz7qZ1tNp72ujyBJS0foc7hnGEZCrXvvdwKyzryiQzuFQ3bF3+sKVed5bwcyGAyGzEm1pqoxAP4WuBh4grXXPLM0sg8g22sO12caBmMbeERaQ7YmnaNOxJMjQKTT9f0lRqoGg2HYSNWt5dWADyN7EB/PmEw7GVn39TLgsCEg1po+/xgS3j2NqJhG3u1bxstI1WAwDBWp+oT6KWQLRNHG3tUafsQj1qrVAHZkOstr2+uRJC0j0+j9LzZSNRgMw0KqfhH9TzE1FFn01fIU6/sqRqw1j0yPRDKeHxlxAu10XeSNQSNVg8FQWVKNE+pTJVRP7lkeVWINSm58XZJXDfgYsmXoYSPOjtcfgBeYSjUYDFUnVT8L9WiPUMsaInTE+l7yK27QT5vORhK9PszUNWm7kq/LmVqE32AwGCpHqk7t1ZDC609TjbU3R6yHlpBYnep/E/BTU6dd9+nl6oQYqRoMhkJJNa0yhdshVXvalPuoNVcqcTFwKlL67ofe98vg4RwKfAHYgKkVkAyd+3SVNYPBYCgTevXw/ao8n1CVWqW9kS556YdIGb8i1Y1/nulhwGNYRm8v183A7th6qsFgKIFSHURVhqpQ91aV2m1JwbKomxawP1LKr8jnHkfWUN+t6nmDirVl0XgGOc3IyhIaDIbKKlVHxkcip4a0Kqis2vrcTxAdfZY3kY0BewLfZ+q+Xru6v36rTomtpxoMhsKVaj9rqm79cRzYVP9tV9SghcB6yNFyRTgyBwMn6+evY+OxZ0wQJXMZDAZDJZWqU6kfAZ6tqEp1SrWpXx9LvklBdeAQZP20aWpzoP2pW2HrqQaDoSRKdZA11fnIAeJVVQluO00LKfr/Bu/7eSjUrwKLKHe2dNkxSZTYZTAYDIWj1/CvC/3OQRJqyImIssZ88gm/jgFvA84AFlLts02LRotoHdpgMBhKhW7Dv05VfRhZz6pq6NcPAU/q14fk4CDsBSzXz7QtM4NddwIvw0K/BoOhPOg7/LuOGrNhUglZv0sD2RO7wEggFawE7lDnxGAwGEqBQSoqDRsxrK/t0czg3mPA24HTidZyh6H9mkj27RMd3idElgk2If2140AVfxmqYRkMBsPApDoMcAQXAvsBVyAZpWka6jEkMekMYF5FCfUJ4D5PFYb6Hg8DZxMdu+arRpcE9mYktL5+QpsGSLLWFj2S7gSwJPY8BoPBYKRaEmJ1bZG2mpoNHKSEOp/qFChYBdymZLUK+BXwdSWz0COxUNVia5p7nQucl/De7nSjfZFTgzZSkhwD/kL/7YQ/IkfircHCvwaDwUi1dAiJ6u+miR2UUOdWgFDXADfq139AzsYFCfG2PeIME9quPUPbNjs4MyFwAfBLj2jnAGcCWyJ7h3dLcHb8BDNTqQaDwUi1hGp1LukWgBhDCr2PZ0DWaWISuB6pn3ukqtEmU0Or/hXECHMmtGMRAf9vA6KDGNzvrEbqINeRbUf/BGyIJMe90Bu3Va3iZTAYjFRHQqmmaaDXQRKTvqJfl3E/agu4GgmlHgWsiBFpuwN5hgO0cafvtTuo38eAd2rbbYwUzFgXuJuoEpXBYDAYqQ45NgdOQ0KZZauY1AZ+B/wJOBo5ti9OpHmTVZhA+M4JcYldDwFvJQobt41UDQaDkWp5kVZW7jhS5KFRsvZtI9nN9yHrpcu99y1jFm2Siq2noJgNBoPBSLUimI3UEP4Sku1bFpXqEoI+DCwjSpqqwpaUMKZgDQaDwUh1RLBQVWBZwr6OkM4HPomsUdbpnMlbdgyDOg2sbUYCwYj1X2Dj10g1bcwDDgSeR77HyM000P8T2dO5jKn7Sw35GhkXGciq7Wskb3cy5Nvfbs0/HJGxnda4DoaFaI1U08O6wOeRsG+Rmb4uiWcV8Atkm8wjZmQLNzIhUvf5TUqAaUQy2hp5uAR4oAPRUmEjH5BtGco0CDCIzS1XbewA7e9u/v5BpMBK2fuBhLEdApsBryTaRRH0MH4D4Cpg6QyOYmXGr5FqOl7RfFWpRZ+Y4u8l/T5wAnI8mtXHzUYZJhFWiOxRPohoOxVIyP05wLEZjJGzkSS0Mc/oXYokpVWZYLN+1jTJdHvgJdrn84DPAut1ea9rkLKbD1KurPZaApFuDLyOqMRrEzkt6oMDfM6PgF8T7Y8PgZ8i5VHjxF76CmpGqulM4HnA8TqJggKf3ymX84ATjVAzMzLEJvergG2ITm7aADiO5DN6Wxn0x/v08vFd4H+RYh7nAU8lKICyjotAHYQDkJrRWc2XhrbR1T3OE/93D0BqV78c2B/Jp3D93OzyXusAOyLbxsoUHXBjfAGyna0B7AIckfB3zYS26RZv18vHV5CCNAFwHVKgph17vlKOXyPVwQfgHCSkV3TVJEeoP0aKOTyoxtNq46ZPpDXkkISNkfXzdwHPTyDPZkzRBGSTwNby7u8MzaF6gazz36XP81/A4yUnV1eu8gtKNlniS0qq7gCImea7+703AM9Fllc2T+jzWo/vW7RCjZPpPOAd6txsg+xpDzoQaDCg/WslRA+O9L53KRIeXw6cgxz7GJR1/BqpDo6FSmJFqtQkQq1EqKTkZBrEJvxBwLbI1qkjkPKJSYaBDkY1q/FRJ7mAhsNR3vd2QQ5L+C6y7h6U1PkKkZKVrQznjDs+kC5Ulj8eDgK+qKTqalvH18l76esiK67F10tnA+8BtkN2DIwljKd6yuN6pvH7Sr0mkSWUu3X8rvH6pTTkaqQ6+MSf0IFYL+jzQx2A5wLHmEJNhUxrnjd+kCq9FnA4Uugfz5gGJCce5W0kg2kMla9kP6rGaVukqtbZSl5l9PrrZLs1rduCL24b2obA61VBb6n97x/EEaTYf3lGYdoacTlMVenHgVkdlHdQwPh1Kr4GfEbJdFvgHuAsonOVTalWHIGGSA5HMn+Lgjsu7btIBqgR6uDKtI2cA7sHEgLbxiPSlvf7DdKvG52FoYobqDqyn3oNErq8HLgs5qyV7R2yUmjBDL/jwr1vUUJ9o5JrO0X7GcYUc17j3Y2FI3SMH6ECwZ1KlTWRdtv3QcxBHFNyXeU5h9/25q6RaoUxD/gIEgIuSqWGwPeQlHQj1MGcE5BkkxepQn1uApHWEiZ8VZxA30A543Qs8FpkreoMT6GPSnJbI9b/fns5hXoQcKoST+ipprTQUgcnr3HgnIUPI2HeDyKndPlkWivp+K1743eWOocrkWSqf1GibRcZdTFSHayT5yPh36JV6rnqrRn6MzBtJIvz5UgCyk6esat5EzkYoveue4ZnN2StalzJo6oVt/ox0vsg2duXMDVZp64OxluRwzG28sZD2uOgrgSRNVw4PUTWSz+nNiwsMZnONH5bSPb08Tp+T9T5XDNSrd6EnIdUKlpcoEoFWRO7Hds6M6hx/WvgQwlkSsUUaT9ORajj+Tj9/qlE59wO85hqI2ce76mk6odEm8gSwClKqG2yy5twW4iyJlQXHv2UktD8DmO9is7hXCQhbzFwCxIOrhcxho1U+8c6yFaauQUahAbwE2TB3jAYViPrWlU1MIMaJ2eYjtP/n0K0xjzMxBqPQDil9lokIWkbT/lk/RxZEk9b1enzVH0v8BT5sIzfdZFEvMf0/U73nIncxrCRav9YQ37rIEkqNQC+BdxoKjUVzCKqSDSqit0R6zH6/5OLMEoFqXWfVCeRqkE750SoWb5bQ/vvSFWnCzs4E8MyfkNVq8fr90/3Ig+5oIahn86bC/wdsEmBKrUOXMTUUnSG/h2U7wJXUuBaTIkM0zwku/JYT+kEI/D+Lvz7bmRtnQq/dydCbQ8hofrv7ObvArXRR+UtII1U++u42ch6y/yCSKAOfBOpGWoqdfA2rWlb3mjNsRaxHsfgFXOqgjayhepEJCu2qqTaiVDdWA9GZAy7cPD+5LisY6TaX4e1KSb06xNrp5NJDP33qzkoaxPrp5VYwyFTrP57NDyyeQWyd7dV4XftRKjBCI7hzZAtUe28xq+Rau8dNY4Uf15c4HPUVC0H1iWpOiuTFFsyrszE+jnPKA1b+yxCEg/fhYR920OgUI9Cwp+jSKh+e9SB1yBRlxY5hIGNVHvvpFnAO3UiFqFQa8CZSIHpYT8MOe92/SZRZSFr16nEujfZbispUq0uQPYmvxY5cSargw+yfhe3JuwIdb0RJtS403SMXpkrViPV/jupiIHqCOD3wDKbLKm2a4AUml+KVaVKItZdVa06uxEMybuB7EM9mqkHbVcRdXUKXkeUlGQ2IkpcOlavTMewbanp38gUBVdz1iZLdu1rzubaY34hchg1Qzj2dkGO7ptX4f5pIIk5nwBeSPqlFHshsG6dmTzbp40klr6YjCMuZjz6a7OggIHq9sudDlyIhX6zaN86UpIuixBw2OFy9Vbd1en3yoAXASd4am5YyHV+xQnVkcaHgPerKgsKnEczXUWMacd1eyPJW+2sbLkp1d4G7xhyUsWiAp/hFuSwXstUzQZ3AvenYFz8A59nMkJxkkoKQRZ9YgiqhF4BrA88SY4b6g0d7YHbl3kUUn4wz21+/skx8fE80zPXChAooUZcds3SKTRS7c3TGQcOZerh1Hmjbl2Rm7Ho11P37+GIp50wnh4BLgDuQMok7gYcqBPfP5rMbWdpUHwSzYuRTMrPECXGmHNXLLGGSPWnBeS3Juyr0km1jRcCJxGdxZpku9aoA3CQ/l09R3J1n/EqJJHri1mMYSPV3rEYC5sPO5E+DDyLbLPoBn5Ia8Ij0EeRTO3bgacSJu4a/ayVSr4XIgckjMfIt4GE9d5BdDJREeQaapvsQLR1w1CsSnUF8vfLMZLhTodpI0sln9Mx+wBwbxd/fyzwJf33TUTHEOb17AvUCcl0/nSbYuwe4mh9uGbMoFTxcmtaNyChrU4Ds66hlT8U9IyurQ/LcfKMoqFqIJv/L2JqOCt+tbRPmsAKJc0/Iafd7K7XX+iYSWPybo4k03xDVe2qAufeSlUkvdiOXu3RAuCmituWbq/bgFf32JZO3b0ZWDLDWE3bFrniMy8kqjzVD7ZGqh1d7pF0Xm3+ZyQ/IO0ynDVTqtVCU0MmhmzxAPB4h5CQU6ErtS9WIoc936f/v5NstuQ8oNffAz9Ejh08kGLWpdah2mX8hsH5c5HGvTVykEfY182Hq1RlXsdgYdN7NFJzM/BV4I05vsc8bbextCMuRqrVCEu6zNSTgPOwJKU8DMeq2OR2Hu4zSGj4CCSsGwJ3k1/SzkNIWPlOJfS/KZDY6tie3iII1YV9P+ZFrvLCVcBHkDyANGzQhEZ4jtB3e0OOTskBOo/+nhTXVm1tsFp4UA26IXsH5njgYv1+C8l2fQT4ALJM8Ask7HYn+WfBtpDiH58CzinIwdoOOdzbCgwUM04bwLaquPLogzZwPbJ+eivpRczc2H1AyfqinMazH3EZT/MzjVSrhTJsqxgVPIJsrXlMv/6UksjPkLDVRAnU9OMavfhN7PtZe/khkqn8Nm9c2pgczEla1WXbuz2pHwfeR37ZvncgId+rSD/j293rISSr/Pocx/HbiMoXpjKOLfzbW7hgjjkiI6EC3BrLcUjafajkWrYoQR0JQd+uhN/IeU4ssOEyZdysRBJg2j324bIenLQQWQfcUu1RHoeoP41kpv8+B2dyCRIO3i2H9wqR7T+pHo5ipNrb4H8TxZ5OY8gXj+lVViPuDOrfITVf80r0iCuMUV7ffxTJxp7QKMa/IksFvfTBJPAE3SXMhEjYd5scVfTVSCLRarKrhuTGc4CUWtwCeElO7zhbHZVU8gOMVLuD2ytopGooGwI14kWo6PnISSjPjGC7P6TvfbwquLb2wQqy27/rQpb7IZXd8lhLvRMpf7iMfAp9uKjQA8iWnXrGcwckg/oA4D+IKlQNRBaG7hq+BmyKVTQyGNyc2B9JXGkxGuuqTqU9RJSw9nNkW8gjSJg0a0Kdi+xZrsf6IiuVeo+SXB71ev2KZF9AljXy6NMdgD289hyoTU2pTnUwghka35wQQ9mMvMtWLqK60qitqy5Dinz8A1KwYFWOn+0SlD6AZMnmoVKXInuwV5NviL+tn70ipzZ152STxnsaqRoM1cA6wCbI+o9vFGrI+tNW1kSZqtP7gRNVmT6BlJjMOzKA9n+d/LbRuMSrvNfN20jC0h7IemfW2ApZp77HSDXdTjQYisA8JPkEkk+naQIvBQ4HnoOE5YLY78zp8PeGdCIBnwN+oO3bKuhZ1keyfoMc+npS1eJkQW3eQrYN+aHZLODWUN8AXAv8o/Z3331spBqFsVbn7H0aRg9OVa5PtHYzAeyDbN1psvaavVMIdSREVZvm3ob0UUdKUD7E2icQ5alU28C71LHKYxvNPUiY+dmCBEeIhNdbOXyO26Y0L9bmffWzkWrk7a3BTt0wpE+izyFad1yMbNh/NVPX8BtdzEUr/FGMYrpXFdMlJXimBlPXAbNEW0mtyO1SeZB54AmrWlqdZIjOq6yVoJMN1SfS3ZC1r8XIiU67EB1t1SA5w7A+w/g0Ms2fUOvAyUjhg1oJ5n+e4yDQMVyUSm0Bi5h6DGIlYKTaXQdDlF7+fKJMsaKexVAujCmRzlEiPUMNQtKxUrUOBmwmA2fIH0uR0G+twLnnlNRiZH0xLywEDgZuJP91VTdv9kW2MVZKGRupdt/YTeBbyKL5tgU9x3ymZv4ZyRaPl6qx+yKwUYw0k0JKRpDVUalfRgq8FwkX7j0YKcKQWo3aGbBYVXoe+1PLwlFbARsjVbKMVFNSG/UZiPVaJMU870nlCPTVwK+QA9XNOBenGgBejmxxOVUnY9iBSK2fqtnPdyBbOmolIBbfBuUVAvaXKIKC+iC1dc4u5/WbgT8Apw0SnTBSjTCHzvF7V/ihXeAkbwGvAnZXUjXkT6ahkulmyJ5Ft72FmENmRFp9lXqGqtSyRIRqeuWZTFlndKJhIbKGPD9BzBipDtiwg/w8a8NuiVLFeMttpCTd5sAJwPPUuPlbYIxIhws1il1LpSROWjAi8zy1aISRavUmuiH/ibYX8HVgZyPTkVKsZTmAPTSHOlcn2kg1J5VaFiwgSlYyZOe8tJGjp7ZHDk7e2ch0pIxrWQ7OCJGQ5JbWLdWAkerUwRt2+XtFeVCunNaviZKVLAM4XbgSZXsCpyBrqE611I1Mh94G1IDrgJtLQu4h0dFkYVpqypCtR27oXnkE5FPcudNnN4FXAi+w7sqcUP9ZCXXSmytmzIbfqQ6As4ErSuS0boVETNo2Bo1Uq0aqMx391gQuJf9tNX5/OdVkyI5Qz1THpa1OlM2T0cJYSZyowLM9NueNVIfSk51QBfNwwX02y7oj9TadDbwG2UqxK/kULTeUE2VzXAMbi0aqwzzZniT/sl2+kg6BA4lCwBYOSkf976sO0+5GqAaDwUg1H6UKEgIu4tBeR6At4HXIXklLUkpn/O8LfB4p5lB2Qg07XAaDwUi1sphdoEJ0VVUOAp5rBnUgB8VtTTpAFWqzRHMiiTjbM1wGg8FItXJqdQ1SCGB5QUTgQsBvAV6IZaUO0paTSDb1K9RRqZdgfNGBQN18rXe4bC4bDCWA7VPtj1S/DXwAWL/gZ1mJpdn360wGyAEFpyHr00WeWeofL+jmZZzgHwV+jhR6Tzr5ZjtkD/Mm1r0Gg5Fq1TDbM4Z5G2KXCRgChyFnPt6GhYF7bcMW8JdKqM2C5oK/VaLuPcO1wPeRrR0tfd5HgMvpnHm+EbKf0UjVYOjPqU1lGcVItf9OGC9Q2ThSeCNwFnALVl2pF5UK8NfA6ykmMckP8zpFehNyXu8sJdUrZnh+fyzUgWXAMwU6ewbDMNiGsYR5aqSag0FcCZyk1+KCSLWmCutwJCS4xIi1a7SAlwG7FUCqoX5+Q9Xnj4C7NNpw2TTkGVe28bFgexmHF5aIlv2crCGFfX7MgCeCGan21wFrgPOAowsiVd/ovk69q08Ct1r3dNVmr0f2+rYKIFQ37/6EbOO5SFWm/3y9VtCxbTXDP27zPkt1ILVWQZseAr9HDikf6MASI9X+MZtobbXIydZEDi9/KXC3Er55tcnq3nn9uwHPz7mdXEh2KXAqcD9wiUfsVorO0GnM/BL4IfAOj+TyCO+PikJ2dQdSOTDDSLX/wf408FngdGDDgol1EvgQcrrGH7AwcCdSbQOvVePksqaDHD//IeBk4DsJRG8wJNmZmkY1rgLeSb7Z/sGIcIRzXupp2E0j1f6xWj3Iz5eAVEH2rH4F+DCyxmpIxguIDhsPcpy09wMnAOd7ytQcH0O35Jb36Vh/RrZw/RopzTrMY9Wp1NtiytVItYCBPk45DjN29Wv/Sg333wH3mALq2E5hAWPlceAnaqyMUA29Gv28x8tyZA/3zcgS06i198Aqx9Bfwz8JfBrJ4iwDybeQ8OZG5B/eLLsD5K9Z5t0m9wDHIlnjRqiGfpD3+uYa4N6YHRmFKxXP3TDYwPstsKoEhtJtqZiHrNs9j2idYNSJ1ZHqfsjas1uryqNdnPN1pUUODCnY67zm8pbIctI63vwZhctItQR4GjgSeKwkxFoH9kZKKe6QM4GUHdsB2+ZMbs4gNTySNRh6ccoCZD/zt8hvCWMOsqPAzm42Ui1ErV4NPFsSg+nI8xXAD4CfKZkYsRazz+9J4AIkQ9uUqqFfUn2U/BMQa8Aisx1GqkXgSeCjyOJ+mZTI7khxiLOQfZnuRBObIPnhUaSO74Q1hSEFhzlPx2xL4ESiELDBSDVXtXojUSJK2bAn8C9I6HOWeZ65oolk/madoGRJacOPVs79PI5sP5tDOXY5GKlWDIMavUeBjwBPlZBYA+AlyB7JnwBbI/veTLXmgzwM0iwzfENtmwLg34CvEa2r5oHtgG8gJyCNmb0wUs0TE8DtSOJSWNK+3gk5lPvfgX2A9TxjXKvAWPWvKhHqOhlFBwLPwH4RKVeJGb6hRKAO+31MPeUoD2dtP2TP6iJVrwYj1a4H7aDG6AFky8YzlDcppYZk9Z2FJDG9B9nXOt8j16BE/VHT51qgTsB6+qxVIY7tVV3MzvCZN0UqRc3BsouHVan6znsr5/FfQ46Z/JraioZxR2dYRaV00USO8XoC2S9a1oEXAJsDmyHhnU8jmYVH6KRdrY5BmJNXHCR8vdAbnxsh2wnWU4JdAhyMZFy3KzDHtlEP/1nSq8vsHI75SA3qvUylDj2xBuoMb4ckRuZZB7gB7K+f+Ulkb/5TWEa7kWoOuBf4AHC2klaZ2zhAjq5bjGT6/Vq/fwtwPJJg09YJ9HQHcp2JJKb7uTMI6xGFlVwBi28r8YfIWs7mnpOymmolW80FdgV+h2ytSaPfXCb3CcB7yb82rKGY+boCeDiBbPNAXRXrS3Qsf0yd72YOjnda7Zf5MxqpRo29hnRqXDaB3yBh4HOJQpVlJ4AxJIEJJJy4K9Fh2pcDx+jXrVi7rVaPtdlhfM1DwpK1DpO0DpyJbPlpeYSx8TTjM6zIJHbYCjgOeEsKBijwiPpAovN0DaOhVEFOrbkf2KKAOTBbP/cgndPHq+18xnO8i7blDWD9mOMdqDhYbqRaTbSQczNvB/aoYDuPqzJ0OAhJbApjk7yBlGn8Z1XoQWzybw68GXg1kuSQZABqwAb0lgAxhpwM5ApulJ1caxoJ2Am4fgC16pyzeUjI973qtBlGh1hrwHnAi5EwbJ5KNT4H90eWHVYgFZ++gywfPZ5SRKaXZ9mIKGlvB+Af1TGveTbtF8D7iA4hz8RuGKlGWJ3yQLgbWav8V2QNpKjBn5Z3ulkHz3k/5HScTkp17jRKtV/sgKT576/91qpAG26HZFAeoQ7Xs33eZx7wD8AHkcxMW0MdPUwiSZGrdQwUZVtmI1GtNvAJHZNXA/+katoJjCeQ05nSUKGbeu/s7NDWag/mqp0ZI7kS1CJyiBoaqUYD8mkdpGmhjRws/H714LatOLEmDXA3sWZ18XtpK7/1YqGdbrzOVobPNBPqwMuQRJMvqfG5t8u/XaDKvAl8HDkzt2GEOpK2yo3/M5FI0Ce9aE1R46GmY3QBckrWy3Wuhapivwn8l5Jde4DPmKf3ioe9G2oPiNmEpDnYIOPkqoYNUtraDj8Fbo0N3jSI9bdKrN9WYoXhM4ZByT/T9ed9qhK3p5iQcR3YTZ2sK4GjPIfgz0gCSlM96g31Z01V5B9SozUXW0M1ESBh1mtUEW5ToucbR9YzHTZAkumOSZG8k5IUu7EHmwIvVIe2dKQ6jHuUVveoenoh1itUYZxDtAZmKmNw49JrP12GVJX6tPZLERWIGkgxiH2QDEq3Nn2dKthHgberI9bUuTauEQErL2lwY78G/IcS6jGUa+92EBvvc3XMp6WK+8XuSJTnf4iSLsMsJng/eBhZjF5k47vrSXAncAmSuGMYHHOQMNDSHozQSmR9J+715w237rOu97091YtuK4nG18rK6shaqcti7In791QkAnYY5V1eKsPuB9dms/OY3P2EHr6PZHzmWYMyD68qyw69Czn0905y2i815NgWyYDttbrL/aoGgxKMO7/sovPo5xMdelCn/GUZFyJZljaei0Eb+COydmnOTXdzrpSkGjA1U7bqE+rhmILJqkOvBA5HKgLlfYzTsGEWEvqqdekcubH7A+Dr+ndl2o4TJ9mqYCGyncFINX/l5ezHl4GTlVgNMzshpSLVuIEahgauq5H9TcYOgmszVxhiCVY/c1A0+mj/mkYNHrbmSwUbIlsahimzvUrE6uzVKXo9ac0yLTZCtuRlRq6DGPW7gQcrPJF88lyGrLcFOXxmDSkHeARSqej2IVH7VTJC/46UkaxZuw+krEEyKnfqMlpgyGZMt3QsnwT8yuzJtON1b2TZqE1GiX+1PjsxQDJZh8Ew3Qnck7M6rqli3RfZZ3YXFg7uty2bfYzdmkYKnFNoBqh/g74ukjCGEWuhcHuw/4CUDLRxnTxe/UMIMhmrg5BqDTnZ5L4KekbOu6sDZwAX5/wObaL9sZcCRxKFg41Yu8cipKBCrce+R9Xq982ZSWUuGcpBFiAh4JONWKflvHrWHzDIRPqhXlVTq84xuE1VYhH7/3yV9TNkH6u/zmqTYWY8B6nx2cs5sK5d68DNwEMUs191WFCFwyJGhVidUDhNifVpI9ZpVX0pSbUO3ERU5zGsyOBzCUrfBC6i2CxQtx5yMVJh53ykspNTUDYhuvPQe/27EMkE/gwS/re2NgwDmmo7TlXV+ozn9Nj4FmyLFILIJEJVY/q6rd0Q6zlIXceqhC5dBZvbKE8GrltnvQgpDvEZZO9ZzTzNGVVSP8UHHKmOK7FewHCE3kMk4W7ShsZIO5quEpfLCD4fyQoedVvi7MTLkCW3NhkUL6khZ+ENcuM6cC1SHLxe8k5zauR+4HMlUKlJz+aOKPoMch7rHd5kMHJNHsOz+xy/Llx2jY6JekXb2E/A+D1S3MIw2sQ6qXPjZOToxq8g9aVHPYfAzZVmBvcOgHrdMy79rIu6tcmbkaOIXoycFlDWPWvu0O0fIJnLa0rY4a4vliDnJi5D9latr1GFdszrMkgW7619OB5unN6E7Ft9CZLNWqU9l/7JJVcAp+u43pEcSrJpO10H/Jz0citcveP36djPsy1rwC/V0aq6snNKrKFjIwBe5I2LUd1bXFPOOp9084FqxNZrB1GrbhP+W5FarKGnvMpyNfXfm4BXeQYhKHHHu9NIdgaOR0LCoUe+rRK2cxHXFdpW/Y5hN34PRrLZw4q0rSsIvkwNxAv0/bdDjh3M+vNd+3wjBRsSt0ULdK7m1ZZtz0Z8zJuDw4BAx3gDOA74HrLW6t57lGyIe9fveXM/SKmN674xaQzI1i01av+BLAIfp5OiDJ6Qn5h0B3JCySWUr0xdkpcZ6nMvAb6opPpX6hRsH/vdUczCdH07OeC7uwjGufr/U4n2XpbRmw+9Z74cyWk4XxX7LHUMVhZguA3lnSdNtSUnqa3+I/A3SAb9qNgQf5kksxC4I9Wmhlv6JRk/nfunyCG1+5XEKDlCvQU4Vgm1TjWyPf1wcB34kV4HI5VBQM7a3NQjh2CIJ0foheRcv9aRE2vSIqlz9Z57Aq8HtvT6oAxt6pLaGqpGP63hV9cWLaZmewY5PZOt95cfbs6EyFa0O4C9kGMG53jzwLcfwRDYjNATKG7Jc1ZGnzdej3nrtQEfPgAeQzLNlgGbIQW32wV0jm8obwM+hayVrBX3rtDAcOR6E3Ahsg3nSVUmmyPrgW5CtGIqoorrJ3ES9T3qGrAcOfD7MuB/UzDszujciCSLTSDHsc332jRvhyVMcFx/A/wYOBNZ+2t4xObm8PuQmrx5KNSHkLNhn0npnramms+YuhUpPjOpdvu5qmKD2LirArmGMVvnzwdnL+4DvqVO6CUqtEhxzI4BE35B8jTWQ/ytIZfqw58EbJWzt+978zcDRyM1MRtkk/WVp6fpD5Q2cJZ+fT2SnALwXmBxLPTjn8sZlGyyhB3e1R+wvgP4FPCvGsL6esrP4oirpp+xStv1neokEhvLWTgrcWfCP73mSh3P13nGoun1pfv97yOn+GyWYR+7ftsCeB6SrJhm4keeCji+5jasCGPzqqk2elPgBnXMFwEf8OZcyxtfQYJTVdTzBzEl6n7e8J79YeDf9Hs3IMWKOtmZQRzLAE18bcSMiZ9dGg4wEZzBOUe9oC9rGM1XGll0hr8OeSOy//BKJdR6xQk1PvkDzxlCCcBhCbK2XUeOmlsvQcHHvayZBk1aZNnpfeKf55PoKiVPtyXgYaRwR+iFs9JcI3FJYE0kSxx1znYCDiU6P7QVC5OFPbZZOMM4dsbhMVVP96qCvs5Tp+0O9/s2sma2RYYkEXjEHmRw71kxxyXL9/DLr47C6VG+HanrnDpVfzYPOTBljo6f98fmBj3aj7RtfLzv4p//uI7/NlLb/XvezxoxByrNMTQGTMaPznJ7m1opvLgzeOfpB+4MvEdDUq1YZ6RhtH2FcRuy1vQrj3haQzgp8Ay7b9jO9n5vKbCJ/v58JLNxnQQS6Sa80c+knQn1DqT2VSWTQJXpt5ha1KCek7Jw7frv+v/bkeSOw71oQDtGsHThOHZyJnxVfg3wE2Tf6UWqBImp007zb1zHwVzkeLZOSzCDtN2EXr9X45UW8bXV6/8acprTIr3vmoR3aPdpAANvrPlt8xT5HrBRBjvSijmyzyKlDkG28t2pY277GMH2Yj/SQD3BXjSR7Vw3ePx1P/DdBBvjR+3SshluLDWA1Z3IbJY+XFqZsX6lmrerat0sIbzTT/WgdqzR/ogk8lwJ/Ld6Di1GZ7NzEOvouDfWQNapFnqDbGPgE8xc/7Zbzy70Pqsb/EKjCs9442GVEsKzCeRGQsgnj3aNr1U7FbhQCXZBB2MTDw+HCUrcYbU6glfoPPwd0Tm/9KjKXf//FbIu2e7gGLUHaJMJfeZ71dlIW00GwBuJ9g43U3p+n1TbsbZZruNxOaMLX/35Nnqxjvua59jtDrwrp+e6RiM2/jGdq5D10ds7OMPx0HAWbVX3CD6RVANP2aW5KdZ1wpvV49lJv54fG9zdhs38NeAlyNriUvXs42Q+ypMjHp6Mt8lcnSidqhK1tL/eAWzQw2dfquqqOQNJ/xrJQpzoMLHDhHBVWIL2dO24DvA2ohB7qIS4J/C6DuS5AjlE4drYu6xEMnpvSSDSfpyIPNsqi8+yEp3lsSFBB0W6pdrxkOzCwE5N3wT8toNdr/UZKUvD+RhzKpVpCGycqZvf0wyltb3O2Ec9/a2Awzp4+51wH5L92FRS/WXsnWwyTk8KTDNR4lgfeDUShusmrOkSaq7v87nymhRptGOn59wFqTE6ltDmT6sKvXuaeZJWG+Sx3pVVXxWxNczKgaZvP7IeE0X1mVtHnVL2MJjhlyczeNhaQthmfeA1PZCqS+O/IHbfLGX+qEyUJLQH7OuZjFiV+6xT+7X7bB8z6oZhsx9pOjxlshWJyzHBDI3ltqBk5YW6fwc12maIsp849Dh5Rr1P+klUMhgM1Zjbbsvmmk7Gsihi7eVZpvNcDAaDwWDIi1THlBfbSfK1G+IatDawwWAwGAzDQKhJe8T7ZmYrmm0wGAyGUVao0+aK1Hu4oV+9xmAwGAwGU6gp3dgUq8FgMBhMoQ6gVH2MYdmLBoPBYBhuuBOTuq7M1w+phh6xWqEFg8FgMAwjmdaJSt12XeRi0DBuHQkHOxZvW18YDAaDocJk6vagTtJHxaj6gA/gajK6h0jjngaDwWAw5AU/V2hceW2CPiOwaScczSKqMOFqIlpo2GAwGAxlJFMnBCdi/NU3/g+VxOea7ai4/wAAAABJRU5ErkJggg==',
    superdrug: 'data:image/png;base64,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'
};

const BRAND_LOGOS_COLOR = {
    pharmax: null,
    icare: 'img/icare-color.png',
    superdrug: 'img/superdrug-color.png'
};

const BRAND_DISPLAY_NAMES = { pharmax: 'Pharmax', icare: 'iCare', superdrug: 'Super Drug' };

// สาขาไหนอยู่แบรนด์ไหน (fallback แบบ hardcode กรณีดึง Google Sheet ไม่ได้เลยและไม่มีแคช)
// ปกติแล้วค่า brandId ที่แท้จริงของแต่ละสาขาจะมาจากคอลัมน์ brandId ในชีต branchesTH แบบ dynamic
// (ดู BranchDirectory ใน index.html) — แมปนี้ใช้เป็นค่าสำรองเท่านั้น
const BRANCH_BRAND = {
    PM017: 'pharmax',
    PM018: 'pharmax',
    PM022: 'pharmax',
    PM025: 'pharmax',
    PM033: 'pharmax',
    PM062: 'pharmax'
};

// รหัสสาขาที่ต้องบังคับให้อยู่กลุ่ม Pharmax เสมอ แม้ brandId ในชีตจะระบุเป็นอย่างอื่น (ข้อยกเว้นพิเศษ)
// v1.23: VC015 ควบรวมเป็น Pharmax แล้ว แต่ยังคงใช้รหัสสาขาเดิมตามที่เข้าใจกันภายในบริษัท
const BRAND_FORCE_PHARMAX = ['VC015'];
// เทียบแบบ trim + ไม่สนตัวพิมพ์เล็ก-ใหญ่ กันกรณีรหัสในชีตมีช่องว่าง/ตัวพิมพ์ไม่ตรงกันเป๊ะ
function isForcedPharmaxCode(code) {
    const c = String(code || '').trim().toUpperCase();
    return BRAND_FORCE_PHARMAX.some(x => String(x).trim().toUpperCase() === c);
}

// คืนค่า brandId ของสาขา: บังคับ Pharmax ก่อนเสมอ -> ค่าจริงจาก Google Sheet (ถ้าโหลดแล้ว ผ่าน BranchDirectory)
// -> ค่าสำรองใน BRANCH_BRAND ด้านบน -> ค่าเริ่มต้น 'pharmax'
function getBrandForBranch(code) {
    if (isForcedPharmaxCode(code)) return 'pharmax';
    if (typeof BranchDirectory !== 'undefined' && BranchDirectory.isLoaded) {
        const row = BranchDirectory.findRow(code);
        if (row && row.brandId) return row.brandId;
    }
    return BRANCH_BRAND[code] || 'pharmax';
}

const UI_TEXT = {
    th: {
        patient: "ชื่อผู้ใช้ยา",
        drug: "ชื่อยา", indication: "สรรพคุณ", type: "ชนิด",
        morning: "เช้า", noon: "กลางวัน", evening: "เย็น", bed: "ก่อนนอน",
        time: "เวลา", advice: "คำแนะนำ",
    },
    ja: {
        patient: "患者名",
        drug: "薬", indication: "効能", type: "種類",
        morning: "朝", noon: "昼", evening: "夕", bed: "就寝前",
        time: "時間", advice: "注意事項",
    },
    en: {
        patient: "Patient Name",
        drug: "Drug", indication: "Indication", type: "Type",
        morning: "Morning", noon: "Noon", evening: "Evening", bed: "Before Bed",
        time: "Time", advice: "Precautions",
    },
    ko: {
        patient: "환자명",
        drug: "약", indication: "효능", type: "종류",
        morning: "아침", noon: "점심", evening: "저녁", bed: "취침 전",
        time: "복용 시간", advice: "주의사항",
    },
    "zh-CN": {
        patient: "患者姓名",
        drug: "药品", indication: "功效", type: "种类",
        morning: "早上", noon: "中午", evening: "晚上", bed: "睡前",
        time: "服用时间", advice: "注意事项",
    },
    "zh-TW": {
        patient: "病患姓名",
        drug: "藥品", indication: "功效", type: "種類",
        morning: "早上", noon: "中午", evening: "晚上", bed: "睡前",
        time: "服用時間", advice: "注意事項",
    },
    es: {
        patient: "Nombre del paciente",
        drug: "Medicamento", indication: "Indicación", type: "Tipo",
        morning: "Mañana", noon: "Mediodía", evening: "Tarde", bed: "Antes de dormir",
        time: "Horario", advice: "Precauciones",
    },
    fr: {
        patient: "Nom du patient",
        drug: "Médicament", indication: "Indication", type: "Type",
        morning: "Matin", noon: "Midi", evening: "Soir", bed: "Avant le coucher",
        time: "Horaire", advice: "Précautions",
    },
    ru: {
        patient: "Имя пациента",
        drug: "Лекарство", indication: "Показание", type: "Тип",
        morning: "Утро", noon: "День", evening: "Вечер", bed: "Перед сном",
        time: "Время приёма", advice: "Меры предосторожности",
    },
    ar: {
        patient: "اسم المريض",
        drug: "الدواء", indication: "دواعي الاستعمال", type: "النوع",
        morning: "الصباح", noon: "الظهر", evening: "المساء", bed: "قبل النوم",
        time: "وقت الجرعة", advice: "احتياطات",
    },
    my: {
        patient: "လူနာအမည်",
        drug: "ဆေး", indication: "အသုံးပြုရသည့်ရောဂါ", type: "အမျိုးအစား",
        morning: "မနက်", noon: "နေ့လယ်", evening: "ညနေ", bed: "အိပ်ရာမဝင်မီ",
        time: "သောက်ချိန်", advice: "သတိပြုရန်အချက်များ",
    },
    vi: {
        patient: "Tên bệnh nhân",
        drug: "Thuốc", indication: "Công dụng", type: "Loại",
        morning: "Sáng", noon: "Trưa", evening: "Chiều/Tối", bed: "Trước khi ngủ",
        time: "Thời điểm dùng", advice: "Lưu ý",
    },
    km: {
        patient: "ឈ្មោះអ្នកជំងឺ",
        drug: "ថ្នាំ", indication: "ប្រសិទ្ធភាព", type: "ប្រភេទ",
        morning: "ព្រឹក", noon: "ថ្ងៃត្រង់", evening: "ល្ងាច", bed: "មុនចូលគេង",
        time: "ពេលវេលាប្រើប្រាស់", advice: "ការប្រុងប្រយ័ត្ន",
    },
    it: {
        patient: "Nome paziente",
        drug: "Farmaco", indication: "Indicazione", type: "Tipo",
        morning: "Mattina", noon: "Mezzogiorno", evening: "Sera", bed: "Prima di dormire",
        time: "Orario", advice: "Precauzioni",
    },
    de: {
        patient: "Patientenname",
        drug: "Medikament", indication: "Indikation", type: "Art",
        morning: "Morgens", noon: "Mittags", evening: "Abends", bed: "Vor dem Schlafengehen",
        time: "Einnahmezeit", advice: "Hinweise",
    },
    hi: {
        patient: "मरीज़ का नाम",
        drug: "दवा", indication: "उपयोग", type: "प्रकार",
        morning: "सुबह", noon: "दोपहर", evening: "शाम", bed: "सोने से पहले",
        time: "समय", advice: "सावधानियाँ",
    }
};

const indicationsDB = [
    { key:"feverReducer", th:"ลดไข้", ja:"解熱剤", en:"Fever reducer", ko:"해열제", "zh-CN":"退烧药", "zh-TW":"退燒藥", es:"Antipirético (para la fiebre)", fr:"Antipyrétique (contre la fièvre)", ru:"Жаропонижающее", ar:"خافض للحرارة", my:"ဖျားနာကျဆင်းစေဆေး", vi:"Thuốc hạ sốt", km:"ថ្នាំបន្ថយគ្រុនក្តៅ", it:"Antipiretico (per la febbre)", de:"Fiebersenkendes Mittel", hi:"बुखार उतारने वाली दवा" },
    { key:"painReliever", th:"แก้ปวด", ja:"痛み止め", en:"Pain reliever", ko:"진통제", "zh-CN":"止痛药", "zh-TW":"止痛藥", es:"Analgésico", fr:"Analgésique", ru:"Обезболивающее", ar:"مسكن للألم", my:"နာကျင်မှုသက်သာစေဆေး", vi:"Thuốc giảm đau", km:"ថ្នាំបំបាត់ការឈឺចាប់", it:"Antidolorifico", de:"Schmerzmittel", hi:"दर्द निवारक" },
    { key:"antiInflammatory", th:"แก้ปวดอักเสบกล้ามเนื้อ", ja:"消炎鎮痛剤", en:"Anti-inflammatory analgesic (muscle pain)", ko:"소염진통제(근육통)", "zh-CN":"消炎镇痛药（肌肉疼痛）", "zh-TW":"消炎鎮痛藥（肌肉疼痛）", es:"Antiinflamatorio (dolor muscular)", fr:"Anti-inflammatoire (douleur musculaire)", ru:"Противовоспалительное обезболивающее (мышечная боль)", ar:"مضاد للالتهاب ومسكن (لألم العضلات)", my:"ကြွက်သားနာကျင်မှုသက်သာဆေး(ရောင်ရမ်းမှုပျောက်)", vi:"Thuốc kháng viêm giảm đau (đau cơ)", km:"ថ្នាំប្រឆាំងរលាកនិងបំបាត់ការឈឺចាប់សាច់ដុំ", it:"Antinfiammatorio analgesico (dolore muscolare)", de:"Entzündungshemmendes Schmerzmittel (Muskelschmerz)", hi:"सूजनरोधी दर्दनिवारक (मांसपेशी दर्द)" },
    { key:"antibiotic", th:"ยาฆ่าเชื้อ", ja:"抗生物質", en:"Antibiotic", ko:"항생제", "zh-CN":"抗生素", "zh-TW":"抗生素", es:"Antibiótico", fr:"Antibiotique", ru:"Антибиотик", ar:"مضاد حيوي", my:"ပိုးသတ်ဆေး", vi:"Thuốc kháng sinh", km:"ថ្នាំអង់ទីប៊ីយោទិក", it:"Antibiotico", de:"Antibiotikum", hi:"एंटीबायोटिक" },
    { key:"antihistamine", th:"ยาแก้แพ้", ja:"アレルギー薬", en:"Antihistamine (allergy medicine)", ko:"항히스타민제(알레르기약)", "zh-CN":"抗过敏药", "zh-TW":"抗過敏藥", es:"Antihistamínico (antialérgico)", fr:"Antihistaminique (antiallergique)", ru:"Антигистаминное (от аллергии)", ar:"مضاد للهستامين (للحساسية)", my:"ဓာတ်မတည့်မှုသက်သာစေဆေး", vi:"Thuốc kháng histamin (dị ứng)", km:"ថ្នាំប្រឆាំងអាឡែស៊ី", it:"Antistaminico (allergia)", de:"Antihistaminikum (gegen Allergien)", hi:"एंटीहिस्टामिन (एलर्जी की दवा)" },
    { key:"decongestant", th:"ลดน้ำมูก", ja:"鼻水止め", en:"Decongestant (runny nose relief)", ko:"콧물 완화제", "zh-CN":"减轻鼻塞流涕药", "zh-TW":"減輕鼻塞流涕藥", es:"Descongestivo (para la rinorrea)", fr:"Décongestionnant (contre le nez qui coule)", ru:"Средство от насморка", ar:"مزيل احتقان (لسيلان الأنف)", my:"နှာစီးခြင်းသက်သာစေဆေး", vi:"Thuốc giảm sổ mũi", km:"ថ្នាំបំបាត់ស្ទះច្រមុះ", it:"Decongestionante (naso che cola)", de:"Abschwellendes Mittel (Schnupfen)", hi:"नाक बहना कम करने वाली दवा" },
    { key:"coughSuppressant", th:"แก้ไอ", ja:"咳止め", en:"Cough suppressant", ko:"진해제(기침약)", "zh-CN":"止咳药", "zh-TW":"止咳藥", es:"Antitusivo", fr:"Antitussif", ru:"Противокашлевое", ar:"مضاد للسعال", my:"ချောင်းဆိုးပျောက်ဆေး", vi:"Thuốc giảm ho", km:"ថ្នាំបំបាត់ក្អក", it:"Sedativo della tosse", de:"Hustenstiller", hi:"खांसी की दवा" },
    { key:"expectorant", th:"ยาละลายเสมหะ", ja:"痰を切りやすくする薬", en:"Expectorant (loosens phlegm)", ko:"거담제", "zh-CN":"化痰药", "zh-TW":"化痰藥", es:"Expectorante", fr:"Expectorant", ru:"Отхаркивающее", ar:"طارد للبلغم", my:"အသက်ရှူလမ်းကြောင်းအတွင်းသလိပ်ပျော်ဝင်ဆေး", vi:"Thuốc long đờm", km:"ថ្នាំរំលាយកំហាក", it:"Espettorante", de:"Schleimlösendes Mittel", hi:"कफ निस्सारक (बलगम कम करने वाली दवा)" },
    { key:"bronchodilator", th:"ยาขยายหลอดลม", ja:"気管支拡張薬", en:"Bronchodilator", ko:"기관지 확장제", "zh-CN":"支气管扩张药", "zh-TW":"支氣管擴張藥", es:"Broncodilatador", fr:"Bronchodilatateur", ru:"Бронхолитик", ar:"موسع للشعب الهوائية", my:"အသက်ရှူလမ်းကြောင်းကျယ်စေသောဆေး", vi:"Thuốc giãn phế quản", km:"ថ្នាំពង្រីកទងសួត", it:"Broncodilatatore", de:"Bronchodilatator", hi:"ब्रोंकोडायलेटर (श्वास नली फैलाने वाली दवा)" },
    { key:"acidReducer", th:"ลดกรดในกระเพาะ", ja:"胃酸分泌抑制薬", en:"Acid reducer", ko:"위산 분비 억제제", "zh-CN":"抑制胃酸分泌药", "zh-TW":"抑制胃酸分泌藥", es:"Reductor de ácido gástrico", fr:"Réducteur d'acide gastrique", ru:"Средство, снижающее кислотность желудка", ar:"مخفض لحموضة المعدة", my:"အစာအိမ်အက်ဆစ်ကျဆင်းစေဆေး", vi:"Thuốc giảm tiết axit dạ dày", km:"ថ្នាំកាត់បន្ថយអាស៊ីតក្នុងក្រពះ", it:"Riduttore di acido gastrico", de:"Magensäure-Reduzierer", hi:"पेट का एसिड कम करने वाली दवा" },
    { key:"gastroProtectant", th:"ยาเคลือบกระเพาะ", ja:"胃粘膜保護薬", en:"Gastric mucosal protectant", ko:"위점막 보호제", "zh-CN":"胃黏膜保护药", "zh-TW":"胃黏膜保護藥", es:"Protector de la mucosa gástrica", fr:"Protecteur de la muqueuse gastrique", ru:"Средство, защищающее слизистую желудка", ar:"واقي للغشاء المخاطي للمعدة", my:"အစာအိမ်အတွင်းအမြှေးပါးကာကွယ်ဆေး", vi:"Thuốc bảo vệ niêm mạc dạ dày", km:"ថ្នាំការពារភ្នាសរំអិលក្រពះ", it:"Protettore della mucosa gastrica", de:"Magenschleimhaut-Schutzmittel", hi:"पेट की परत की सुरक्षा करने वाली दवा" },
    { key:"antiflatulent", th:"ยาขับลม/แก้ท้องอืด", ja:"胃腸のガスを出す薬", en:"Antiflatulent (gas/bloating relief)", ko:"가스제거제(복부팽만 완화)", "zh-CN":"排气药（缓解腹胀）", "zh-TW":"排氣藥（緩解腹脹）", es:"Antiflatulento (alivia gases/hinchazón)", fr:"Antiflatulent (soulage les gaz/ballonnements)", ru:"Средство от вздутия живота", ar:"طارد للغازات (لتخفيف الانتفاخ)", my:"ဗိုက်ဖောင်းအောင်ဓာတ်ငွေ့ထုတ်ဆေး", vi:"Thuốc giảm đầy hơi", km:"ថ្នាំបំបាត់ខ្យល់ក្នុងពោះ", it:"Antiflatulento (per il gonfiore)", de:"Entblähungsmittel", hi:"पेट फूलना/गैस कम करने वाली दवा" },
    { key:"antiemetic", th:"แก้คลื่นไส้อาเจียน", ja:"吐き気止め", en:"Antiemetic (anti-nausea)", ko:"항구토제(멀미·구역 완화)", "zh-CN":"止吐药", "zh-TW":"止吐藥", es:"Antiemético (contra las náuseas)", fr:"Antiémétique (contre les nausées)", ru:"Противорвотное", ar:"مضاد للقيء والغثيان", my:"ပျို့အန်ခြင်းသက်သာစေဆေး", vi:"Thuốc chống buồn nôn", km:"ថ្នាំបំបាត់ចង្អោរក្អួត", it:"Antiemetico (contro la nausea)", de:"Mittel gegen Übelkeit/Erbrechen", hi:"मतली-उल्टी रोधी दवा" },
    { key:"antidiarrheal", th:"แก้ท้องเสีย", ja:"下痢止め", en:"Antidiarrheal", ko:"지사제", "zh-CN":"止泻药", "zh-TW":"止瀉藥", es:"Antidiarreico", fr:"Antidiarrhéique", ru:"Противодиарейное", ar:"مضاد للإسهال", my:"ဝမ်းလျှောခြင်းရပ်တန့်ဆေး", vi:"Thuốc trị tiêu chảy", km:"ថ្នាំបំបាត់រាគ", it:"Antidiarroico", de:"Mittel gegen Durchfall", hi:"दस्तरोधी दवा" },
    { key:"laxative", th:"ยาแก้ท้องผูก", ja:"便秘薬", en:"Laxative", ko:"변비약(완하제)", "zh-CN":"泻药（治便秘）", "zh-TW":"瀉藥（治便秘）", es:"Laxante", fr:"Laxatif", ru:"Слабительное", ar:"ملين للإمساك", my:"ဝမ်းချုပ်ခြင်းသက်သာစေဆေး", vi:"Thuốc nhuận tràng (trị táo bón)", km:"ថ្នាំបញ្ចុះលាមក", it:"Lassativo", de:"Abführmittel", hi:"कब्ज की दवा (लैक्सेटिव)" },
    { key:"antispasmodic", th:"ยาแก้ปวดเกร็งช่องท้อง", ja:"鎮痙薬", en:"Antispasmodic (abdominal cramps)", ko:"진경제(복부 경련 완화)", "zh-CN":"解痉药（腹部绞痛）", "zh-TW":"解痙藥（腹部絞痛）", es:"Antiespasmódico (cólicos abdominales)", fr:"Antispasmodique (crampes abdominales)", ru:"Спазмолитик (боль в животе)", ar:"مضاد للتشنج (مغص البطن)", my:"ဗိုက်နာကျဉ်းခြင်းသက်သာစေဆေး", vi:"Thuốc chống co thắt bụng", km:"ថ្នាំបំបាត់ការឆក់ក្រពះពោះ", it:"Antispasmodico (crampi addominali)", de:"Krampflösendes Mittel (Bauchschmerzen)", hi:"पेट की ऐंठन रोधी दवा" },
    { key:"antihypertensive", th:"ยาลดความดันโลหิต", ja:"血圧を下げる薬", en:"Antihypertensive (blood pressure)", ko:"혈압 강하제", "zh-CN":"降血压药", "zh-TW":"降血壓藥", es:"Antihipertensivo (presión arterial)", fr:"Antihypertenseur (tension artérielle)", ru:"Средство, снижающее давление", ar:"خافض لضغط الدم", my:"သွေးပေါင်ချိန်ကျဆင်းစေဆေး", vi:"Thuốc hạ huyết áp", km:"ថ្នាំបន្ថយសម្ពាធឈាម", it:"Antipertensivo (pressione arteriosa)", de:"Blutdrucksenkendes Mittel", hi:"रक्तचाप कम करने वाली दवा" },
    { key:"lipidLowering", th:"ยาลดไขมันในเลือด", ja:"コレステロールを下げる薬", en:"Lipid-lowering agent (cholesterol)", ko:"콜레스테롤 강하제", "zh-CN":"降血脂药（胆固醇）", "zh-TW":"降血脂藥（膽固醇）", es:"Hipolipemiante (colesterol)", fr:"Hypolipémiant (cholestérol)", ru:"Средство, снижающее уровень холестерина", ar:"خافض للكوليسترول والدهون", my:"သွေးဆီဓာတ်ကျဆင်းစေဆေး", vi:"Thuốc hạ mỡ máu (cholesterol)", km:"ថ្នាំបន្ថយជាតិខ្លាញ់ក្នុងឈាម", it:"Ipolipemizzante (colesterolo)", de:"Cholesterinsenkendes Mittel", hi:"कोलेस्ट्रॉल कम करने वाली दवा" },
    { key:"antidiabetic", th:"ยาลดน้ำตาลในเลือด", ja:"血糖値を下げる薬", en:"Antidiabetic (blood glucose)", ko:"혈당 강하제", "zh-CN":"降血糖药", "zh-TW":"降血糖藥", es:"Antidiabético (glucosa en sangre)", fr:"Antidiabétique (glycémie)", ru:"Сахароснижающее средство", ar:"خافض لسكر الدم", my:"သွေးတွင်းသကြားဓာတ်ကျဆင်းစေဆေး", vi:"Thuốc hạ đường huyết", km:"ថ្នាំបន្ថយជាតិស្ករក្នុងឈាម", it:"Antidiabetico (glicemia)", de:"Blutzuckersenkendes Mittel", hi:"मधुमेह/रक्त शर्करा कम करने वाली दवा" },
    { key:"muscleRelaxant", th:"ยาคลายกล้ามเนื้อ", ja:"筋弛緩薬", en:"Muscle relaxant", ko:"근이완제", "zh-CN":"肌肉松弛药", "zh-TW":"肌肉鬆弛藥", es:"Relajante muscular", fr:"Myorelaxant", ru:"Миорелаксант", ar:"مرخٍ للعضلات", my:"ကြွက်သားပြေလျော့စေဆေး", vi:"Thuốc giãn cơ", km:"ថ្នាំបន្ធូរសាច់ដុំ", it:"Miorilassante", de:"Muskelrelaxans", hi:"मांसपेशी शिथिलकारक दवा" },
    { key:"antivertigo", th:"ยาแก้บรรเทาอาการเวียนศีรษะ", ja:"めまいを抑える薬", en:"Anti-vertigo medicine", ko:"어지럼증 완화제", "zh-CN":"止晕药", "zh-TW":"止暈藥", es:"Medicamento antivértigo", fr:"Médicament contre les vertiges", ru:"Средство от головокружения", ar:"دواء للدوار", my:"မူးဝေခြင်းသက်သာစေဆေး", vi:"Thuốc trị chóng mặt", km:"ថ្នាំបំបាត់វិលមុខ", it:"Farmaco antivertiginoso", de:"Mittel gegen Schwindel", hi:"चक्कर आना रोकने की दवा" },
    { key:"sleepAid", th:"ยานอนหลับ", ja:"睡眠導入剤", en:"Sleep aid", ko:"수면유도제", "zh-CN":"安眠药", "zh-TW":"安眠藥", es:"Somnífero", fr:"Somnifère", ru:"Снотворное", ar:"منوم", my:"အိပ်ဆေး", vi:"Thuốc hỗ trợ giấc ngủ", km:"ថ្នាំជួយឲ្យដេកលក់", it:"Sonnifero", de:"Schlafmittel", hi:"नींद की दवा" },
    { key:"antianxiety", th:"ยาลดความวิตกกังวล", ja:"抗不安薬", en:"Anti-anxiety medicine", ko:"항불안제", "zh-CN":"抗焦虑药", "zh-TW":"抗焦慮藥", es:"Ansiolítico", fr:"Anxiolytique", ru:"Противотревожное средство", ar:"مضاد للقلق", my:"စိတ်ပူပန်မှုသက်သာစေဆေး", vi:"Thuốc chống lo âu", km:"ថ្នាំបំបាត់ការថប់បារម្ភ", it:"Ansiolitico", de:"Angstlösendes Mittel", hi:"चिंता-रोधी दवा" },
    { key:"antiitch", th:"แก้คัน", ja:"かゆみ止め", en:"Anti-itch", ko:"가려움 완화제", "zh-CN":"止痒药", "zh-TW":"止癢藥", es:"Antipruriginoso (contra la picazón)", fr:"Antiprurigineux (contre les démangeaisons)", ru:"Противозудное средство", ar:"مضاد للحكة", my:"ယားယံခြင်းသက်သာစေဆေး", vi:"Thuốc chống ngứa", km:"ថ្នាំបំបាត់រមាស់", it:"Antipruriginoso", de:"Juckreizstillendes Mittel", hi:"खुजली रोधी दवा" },
    { key:"antifungal", th:"ยาฆ่าเชื้อรา", ja:"抗真菌薬", en:"Antifungal", ko:"항진균제", "zh-CN":"抗真菌药", "zh-TW":"抗真菌藥", es:"Antifúngico", fr:"Antifongique", ru:"Противогрибковое средство", ar:"مضاد للفطريات", my:"မှိုသတ်ဆေး", vi:"Thuốc kháng nấm", km:"ថ្នាំសម្លាប់ផ្សិត", it:"Antifungino", de:"Antimykotikum (Pilzmittel)", hi:"फफूंदरोधी दवा" },
    { key:"steroid", th:"ยาสเตียรอยด์", ja:"ステロイド薬", en:"Steroid", ko:"스테로이드제", "zh-CN":"类固醇药", "zh-TW":"類固醇藥", es:"Esteroide", fr:"Stéroïde", ru:"Стероид", ar:"دواء ستيرويدي", my:"စတီးရွိုက်ဆေး", vi:"Thuốc steroid", km:"ថ្នាំស្តេរ៉ូអ៊ីត", it:"Steroide", de:"Steroid", hi:"स्टेरॉयड दवा" },
    { key:"artificialTears", th:"น้ำตาเทียม", ja:"人工涙液", en:"Artificial tears", ko:"인공눈물", "zh-CN":"人工泪液", "zh-TW":"人工淚液", es:"Lágrimas artificiales", fr:"Larmes artificielles", ru:"Искусственная слеза", ar:"دموع صناعية", my:"ဓာတုမျက်ရည်", vi:"Nước mắt nhân tạo", km:"ទឹកភ្នែកសិប្បនិម្មិត", it:"Lacrime artificiali", de:"Künstliche Tränen", hi:"कृत्रिम आंसू (आई ड्रॉप)" },
    { key:"antibacterialEyeDrops", th:"ยาหยอดตาฆ่าเชื้อ", ja:"抗菌点眼薬", en:"Antibacterial eye drops", ko:"항균 점안액", "zh-CN":"抗菌眼药水", "zh-TW":"抗菌眼藥水", es:"Gotas oftálmicas antibacterianas", fr:"Collyre antibactérien", ru:"Антибактериальные глазные капли", ar:"قطرة عين مضادة للبكتيريا", my:"ပိုးသတ်မျက်စဉ်းဆေးရည်", vi:"Thuốc nhỏ mắt kháng khuẩn", km:"ថ្នាំបាញ់ភ្នែកប្រឆាំងបាក់តេរី", it:"Collirio antibatterico", de:"Antibakterielle Augentropfen", hi:"जीवाणुरोधी आई ड्रॉप" },
    { key:"hemorrhoidMed", th:"ยารักษาริดสีดวง", ja:"痔の薬", en:"Hemorrhoid medicine", ko:"치질약", "zh-CN":"痔疮药", "zh-TW":"痔瘡藥", es:"Medicamento para hemorroides", fr:"Médicament contre les hémorroïdes", ru:"Средство от геморроя", ar:"دواء للبواسير", my:"အဆင်တန်းစေးရောင်ရမ်းမှုဆေး", vi:"Thuốc trị trĩ", km:"ថ្នាំព្យាបាលរលាកឬសដូងបាត", it:"Farmaco per le emorroidi", de:"Hämorrhoidenmittel", hi:"बवासीर की दवा" },
    { key:"ors", th:"ผงเกลือแร่", ja:"経口補水液", en:"Oral rehydration salts (ORS)", ko:"경구수액염(ORS)", "zh-CN":"口服补液盐", "zh-TW":"口服補液鹽", es:"Sales de rehidratación oral", fr:"Sels de réhydratation orale", ru:"Пероральные регидратационные соли", ar:"أملاح الإماهة الفموية", my:"ရေဓာတ်ဖြည့်အမှုန့်", vi:"Dung dịch bù nước điện giải (ORS)", km:"អំបិលទឹកសម្រន់ខ្លួន", it:"Sali reidratanti orali", de:"Orale Rehydratationssalze", hi:"ओआरएस (मौखिक पुनर्जलीकरण घोल)" },
    { key:"herpesLabialis", th:"รักษาโรคเริมที่ริมฝีปาก", ja:"口唇ヘルペスの治療", en:"Herpes labialis treatment", ko:"구순포진 치료", "zh-CN":"唇疱疹治疗", "zh-TW":"唇皰疹治療", es:"Tratamiento del herpes labial", fr:"Traitement de l'herpès labial", ru:"Лечение лабиального герпеса", ar:"علاج الهربس الشفوي", my:"နှုတ်ခမ်းရေယဉ်ကုသခြင်း", vi:"Điều trị mụn rộp môi", km:"ការព្យាបាលជំងឺដំបៅបបូរមាត់", it:"Trattamento dell'herpes labiale", de:"Behandlung von Lippenherpes", hi:"होंठ के दाद का उपचार" },
    { key:"genitalHerpes", th:"รักษาโรคเริมที่อวัยวะเพศ", ja:"性器ヘルペスの治療", en:"Genital herpes treatment", ko:"성기 포진 치료", "zh-CN":"生殖器疱疹治疗", "zh-TW":"生殖器皰疹治療", es:"Tratamiento del herpes genital", fr:"Traitement de l'herpès génital", ru:"Лечение генитального герпеса", ar:"علاج الهربس التناسلي", my:"လိင်အင်္ဂါရေယဉ်ကုသခြင်း", vi:"Điều trị mụn rộp sinh dục", km:"ការព្យាបាលជំងឺដំបៅសរីរាង្គភេទ", it:"Trattamento dell'herpes genitale", de:"Behandlung von Genitalherpes", hi:"जनननांग दाद का उपचार" },
    { key:"herpesZosterVaricella", th:"รักษางูสวัด / อีสุกอีใส", ja:"帯状疱疹 / 水痘の治療", en:"Herpes zoster / Varicella treatment", ko:"대상포진 / 수두 치료", "zh-CN":"带状疱疹 / 水痘治疗", "zh-TW":"帶狀疱疹 / 水痘治療", es:"Tratamiento de herpes zóster / Varicela", fr:"Traitement du zona / Varicelle", ru:"Лечение опоясывающего лишая / Ветряной оспы", ar:"علاج الهربس النطاقي / الجدري", my:"ဒက်ဆောင့်ရောင် (ခါးပတ်) / ကျောက်ရေ ကုသခြင်း", vi:"Điều trị zona / Thủy đậu", km:"ការព្យាបាលជំងឺហឺប៉ែសហ្សូស្តេ / ជំងឺអុតស្វាយ", it:"Trattamento di herpes zoster / Varicella", de:"Behandlung von Gürtelrose / Windpocken", hi:"दाद / चेचक का उपचार" },
    { key:"influenzaTreatment", th:"รักษาและป้องกันโรคไข้หวัดใหญ่", ja:"インフルエンザの治療と予防", en:"Influenza treatment and prevention", ko:"인플루엔자 치료 및 예방", "zh-CN":"流感治疗与预防", "zh-TW":"流感治療與預防", es:"Tratamiento y prevención de la gripe", fr:"Traitement et prévention de la grippe", ru:"Лечение и профилактика гриппа", ar:"علاج والوقاية من الإنفلونزا", my:"တုပ်ကွေးရောဂါကုသခြင်းနှင့် ကာကွယ်ခြင်း", vi:"Điều trị và phòng ngừa cúm", km:"ការព្យាបាលនិងការពារជំងឺផ្តាសាយធំ", it:"Trattamento e prevenzione dell'influenza", de:"Behandlung und Vorbeugung von Influenza", hi:"इंफ्लूएंजा का उपचार और रोकथाम" },
    { key:"chronicHepatitisBC", th:"รักษาโรคติดเชื้อไวรัสตับอักเสบบีหรือซีเรื้อรัง", ja:"慢性B型またはC型肝炎の治療", en:"Chronic viral hepatitis B or C treatment", ko:"만성 B형 또는 C형 간염 치료", "zh-CN":"慢性乙型或丙型肝炎治疗", "zh-TW":"慢性乙型或丙型肝炎治療", es:"Tratamiento de la hepatitis viral crónica B o C", fr:"Traitement de l'hépatite virale chronique B ou C", ru:"Лечение хронического вирусного гепатита B или C", ar:"علاج التهاب الكبد الوبائي المزمن B أو C", my:"နာတာရှည် အသည်းရောင် အမ် သို့မဟုတ် စီ ရောဂါကုသခြင်း", vi:"Điều trị viêm gan vi-rút mạn tính B hoặc C", km:"ការព្យាបាលជំងឺរលាកថ្លើមប្រភេទ B ឬ C រ៉ាំរ៉ៃ", it:"Trattamento dell'epatite virale cronica B o C", de:"Behandlung von chronischer Virushepatitis B oder C", hi:"क्रोनिक वायरल हेपेटाइटिस बी या सी का उपचार" },
    { key:"utiCystitisTreatment", th:"รักษาการติดเชื้อแบคทีเรียในทางเดินปัสสาวะ / กระเพาะปัสสาวะอักเสบ", ja:"尿路感染症 / 膀胱炎の治療", en:"Urinary tract infection / Cystitis treatment", ko:"요로 감염 / 방광염 치료", "zh-CN":"尿路感染 / 膀胱炎治疗", "zh-TW":"尿路感染 / 膀胱炎治療", es:"Tratamiento de infección urinaria / Cistitis", fr:"Traitement des infections urinaires / Cystite", ru:"Лечение инфекций мочевыводящих путей / Цистита", ar:"علاج التهاب المسالك البولية / التهاب المثانة", my:"ဆီးလမ်းကြောင်းပိုးဝင်ခြင်း / ဆီးအိမ်ရောင်ခြင်းကုသခြင်း", vi:"Điều trị nhiễm trùng đường tiết niệu / Viêm bàng quang", km:"ការព្យាបាលការរលាកផ្លូវទឹកនោម / រលាកប្លោកនោម", it:"Trattamento delle infezioni urinarie / Cistite", de:"Behandlung von Harnwegsinfektionen / Zystitis", hi:"मूत्र पथ के संक्रमण / सिस्टाइटिस का उपचार" },
    { key:"generalSkinBacterialInfection", th:"รักษาการติดเชื้อแบคทีเรียที่ผิวหนังและเนื้อเยื่ออ่อนทั่วไป", ja:"皮膚および軟部組織の細菌感染症の治療", en:"General skin and soft tissue bacterial infection treatment", ko:"일반 피부 및 연조직 세균 감염 치료", "zh-CN":"一般皮肤及软组织细菌感染治疗", "zh-TW":"一般皮膚及軟組織細菌感染治療", es:"Tratamiento de infecciones bacterianas de la piel y tejidos blandos", fr:"Traitement des infections bactériennes de la peau et des tissus mous", ru:"Лечение бактериальных инфекций кожи и мягких тканей", ar:"علاج الالتهابات البكتيرية للجلد والأنسجة الرخوة", my:"အရေပြားနှင့် နူးညံ့သောတစ်ရှူးများ ဘက်တီးရီးယားပိုးဝင်ခြင်းကုသခြင်း", vi:"Điều trị nhiễm trùng khuẩn da và mô mềm nói chung", km:"ការព្យាបាលការរលាកបាក់តេរីស្បែកនិងជាលិកាទន់ទូទៅ", it:"Trattamento delle infezioni batteriche della pelle e dei tessuti molli", de:"Behandlung von bakteriellen Haut- und Weichgewebeinfektionen", hi:"सामान्य त्वचा और कोमल ऊतक जीवाणु संक्रमण का उपचार" },
    { key:"respiratoryBacterialInfection", th:"รักษาการติดเชื้อแบคทีเรียในระบบทางเดินหายใจ (เช่น หลอดลมอักเสบ ปอดอักเสบ ทอนซิลอักเสบ)", ja:"呼吸器系の細菌感染症の治療（気管支炎、肺炎、扁桃炎など）", en:"Respiratory tract bacterial infection treatment (e.g., bronchitis, pneumonia, tonsillitis)", ko:"호흡기 세균 감염 치료 (기관지염, 폐렴, 편도염 등)", "zh-CN":"呼吸道细菌感染治疗（如支气管炎、肺炎、扁桃体炎）", "zh-TW":"呼吸道細菌感染治療（如支氣管炎、肺炎、扁桃體炎）", es:"Tratamiento de infecciones bacterianas respiratorias (ej. bronquitis, neumonía, amigdalitis)", fr:"Traitement des infections bactériennes respiratoires (ex. broncho-pneumonie, amygdalite)", ru:"Лечение бактериальных инфекций дыхательных путей (бронхит, пневмония, тонзиллит)", ar:"علاج الالتهابات البكتيرية للجهاز التنفسي (التهاب الشعب الهوائية، الالتهاب الرئوي، التهاب اللوزتين)", my:"အသက်ရှူလမ်းကြောင်း ဘက်တီးရီးယားပိုးဝင်ခြင်းကုသခြင်း (လေပြွန်ရောင်၊ နျူမိုးနီးယား၊ တံခွန်ရောင်)", vi:"Điều trị nhiễm trùng khuẩn đường hô hấp (viêm phế quản, viêm phổi, viêm amidan)", km:"ការព្យាបាលការរលាកបាក់តេរីផ្លូវដង្ហើម (រលាកទងសួត, រលាកសួត, រលាកបំពង់ក)", it:"Trattamento delle infezioni batteriche respiratorie (es. bronchite, polmonite, tonsillite)", de:"Behandlung von bakteriellen Atemwegsinfektionen (z. B. Bronchitis, Pneumonie, Tonsillitis)", hi:"श्वसन पथ के जीवाणु संक्रमण का उपचार (जैसे ब्रोंकाइटिस, निमोनिया, टॉन्सिलिटिस)" },
    { key:"gastrointestinalBacterialInfection", th:"รักษาการติดเชื้อแบคทีเรียในช่องท้องหรือทางเดินอาหาร", ja:"腹腔内または消化器系の細菌感染症の治療", en:"Intra-abdominal / Gastrointestinal bacterial infection treatment", ko:"복강 내 또는 위장관 세균 감염 치료", "zh-CN":"腹腔或胃肠道细菌感染治疗", "zh-TW":"腹腔或胃腸道細菌感染治療", es:"Tratamiento de infecciones bacterianas intraabdominales / gastrointestinales", fr:"Traitement des infections bactériennes intra-abdominales / gastro-intestinales", ru:"Лечение внутрибрюшных / желудочно-кишечных бактериальных инфекций", ar:"علاج الالتهابات البكتيرية داخل البطن أو الجهاز الهضمي", my:"ဗိုက်အတွင်း သို့မဟုတ် အစာအိမ်အူလမ်းကြောင်း ဘက်တီးရီးယားပိုးဝင်ခြင်းကုသခြင်း", vi:"Điều trị nhiễm trùng khuẩn ổ bụng / đường tiêu hóa", km:"ការព្យាបាលការរលាកបាក់តេរីក្នុងពោះ ឬប្រព័ន្ធរំលាយអាហារ", it:"Trattamento delle infezioni batteriche addominali / gastrointestinali", de:"Behandlung von intraabdominalen / Magen-Darm-Bakterieninfektionen", hi:"इंट्रा-एब्डोमिनल / जठरांत्र संबंधी जीवाणु संक्रमण का उपचार" },
    { key:"dermalFungalInfection", th:"รักษาโรคติดเชื้อราที่ผิวหนังทั่วไป (เช่น กลาก เกลื้อน น้ำกัดเท้า)", ja:"皮膚真菌症の治療（白癬、癜風、水虫など）", en:"Dermal fungal infection treatment (Tinea / Athlete's foot)", ko:"일반 피부 진균증 치료 (백선, 어루러기, 무좀)", "zh-CN":"一般皮肤真菌感染治疗（癣、花斑癣、足癣）", "zh-TW":"一般皮膚真菌感染治療（癬、花斑癬、足癬）", es:"Tratamiento de infecciones fúngicas dérmicas (Tiña / Pie de atleta)", fr:"Traitement des infections fongiques cutanées (Teigne / Pied d'athlète)", ru:"Лечение грибковых инфекций кожи (трихофития, эпидермофития стопы)", ar:"علاج الالتهابات الفطرية الجلدية (السعفة / قدم الرياضي)", my:"အရေပြားမှိုစွဲခြင်းကုသခြင်း (ပွေး၊ ညှင်း၊ ခြေထောက်မှိုစွဲ)", vi:"Điều trị nhiễm nấm da (Hắc lao, lang ben, nước ăn chân)", km:"ការព្យាបាលជំងឺរលាកផ្សិតស្បែកទូទៅ (កាដាច់, អំបែង, ជើងស្អុយ)", it:"Trattamento delle infezioni fungine cutanee (Tigna / Piede d'atleta)", de:"Behandlung von Hautpilzinfektionen (Tinea / Fußpilz)", hi:"त्वचा के फंगल संक्रमण का उपचार (दाद / एथलीट फुट)" },
    { key:"nailFungalInfection", th:"รักษาโรคติดเชื้อราที่เล็บ", ja:"爪真菌症（爪白癬）の治療", en:"Nail fungal infection (Onychomycosis) treatment", ko:"손발톱진균증(조갑백선) 치료", "zh-CN":"甲真菌病（灰指甲）治疗", "zh-TW":"甲真菌病（灰指甲）治療", es:"Tratamiento de la infección fúngica de las uñas (Onicomicosis)", fr:"Traitement de l'infection fongique des ongles (Onychomycose)", ru:"Лечение грибковой инфекции ногтей (онихомикоз)", ar:"علاج الالتهابات الفطرية للأظافر (فطريات الأظافر)", my:"လက်သည်းခြေသည်းမှိုစွဲခြင်းကုသခြင်း", vi:"Điều trị nấm móng (Nấm móng tay/chân)", km:"ការព្យាបាលជំងឺរលាកផ្សិតក្រចក", it:"Trattamento dell'infezione fungina delle unghie (Onicomicosi)", de:"Behandlung von Nagelpilzinfektionen (Onychomykose)", hi:"नाखून के फंगल संक्रमण (ओनिकोमाइकोसिस) का उपचार" },
    { key:"vaginalFungalInfection", th:"รักษาโรคติดเชื้อราในช่องคลอด", ja:"膣カンジダ症の治療", en:"Vaginal fungal infection treatment", ko:"질 칸디다증 치료", "zh-CN":"阴道真菌感染治疗", "zh-TW":"陰道真菌感染治療", es:"Tratamiento de infección fúngica vaginal", fr:"Traitement de l'infection fongique vaginale", ru:"Лечение вагинальной грибковой инфекции", ar:"علاج الالتهابات الفطرية المهبلية", my:"ယောနိမှိုစွဲခြင်းကုသခြင်း", vi:"Điều trị nhiễm nấm âm đạo", km:"ការព្យាបាលជំងឺរលាកផ្សិតទ្វារមាស", it:"Trattamento dell'infezione fungina vaginale", de:"Behandlung von Scheidenpilzinfektionen", hi:"योनि फंगल संक्रमण का उपचार" },
    { key:"oralCandidiasisThrush", th:"รักษาโรคติดเชื้อราในช่องปาก (เช่น เชื้อราในปากเด็กหรือผู้ป่วยภูมิคุ้มกันต่ำ)", ja:"口腔カンジダ症の治療（小児や免疫不全患者の口腔内真菌症など）", en:"Oral candidiasis / Thrush treatment", ko:"구강 칸디다증 치료 (아기 또는 면역저하자의 구강 진균증)", "zh-CN":"口腔念珠菌病 / 鹅口疮治疗", "zh-TW":"口腔念珠菌病 / 鵝口瘡治療", es:"Tratamiento de candidiasis oral / Muguet", fr:"Traitement de la candidose buccale / Muguet", ru:"Лечение кандидоза полости рта (молочницы)", ar:"علاج داء الكانديدا الفموي / القلاع", my:"ခံတွင်းမှိုစွဲခြင်းကုသခြင်း", vi:"Điều trị nấm miệng / tưa miệng", km:"ការព្យាបាលជំងឺរលាកផ្សិតក្នុងមាត់", it:"Trattamento della candida orale / Mughetto", de:"Behandlung von Mundsoor / Oraler Candidiasis", hi:"ओरल कैंडिडा / थ्रश का उपचार" },
    { key:"intestinalParasiteTreatment", th:"รักษาการติดเชื้อพยาธิในลำไส้ (เช่น พยาธิตัวกลม พยาธิเส้นด้าย)", ja:"腸内寄生虫感染症の治療（回虫、蟯虫など）", en:"Intestinal parasite / roundworm treatment", ko:"장내 기생충 감염 치료 (회충, 요충 등)", "zh-CN":"肠道寄生虫 / 蛔虫感染治疗", "zh-TW":"腸道寄生蟲 / 蛔蟲感染治療", es:"Tratamiento de parásitos intestinales / lombrices", fr:"Traitement des parasites intestinaux / vers ronds", ru:"Лечение кишечных паразитов / глистной инвазии", ar:"علاج الطفيليات المعوية / الديدان الاسطوانية", my:"အူလမ်းကြောင်း ပိုးထူများ ကုသခြင်း (သန်ကောင်၊ မြေထူ)", vi:"Điều trị ký sinh trùng đường ruột / giun sán", km:"ការព្យាបាលប៉ារ៉ាស៊ីតពោះវៀន / ព្រូនមូល", it:"Trattamento di parassiti intestinali / vermi", de:"Behandlung von Darmparasiten / Würmern", hi:"आंतों के परजीवी / गोलकृमि का उपचार" },
    { key:"protozoalInfectionTreatment", th:"รักษาโรคติดเชื้อโปรโตซัวในทางเดินอาหารหรือช่องคลอด", ja:"消化器または膣の原虫感染症の治療", en:"Protozoal infection treatment (Gastrointestinal or vaginal)", ko:"소화기 또는 질 원충 감염 치료", "zh-CN":"消化道或阴道原虫感染治疗", "zh-TW":"消化道或陰道原蟲感染治療", es:"Tratamiento de infecciones por protozoos (gastrointestinales o vaginales)", fr:"Traitement des infections à protozoaires (gastro-intestinales ou vaginales)", ru:"Лечение простейших инфекций (желудочно-кишечных или вагинальных)", ar:"علاج الالتهابات الأولية (المعوية أو المهبلية)", my:"ပရိုတိုဇိုးအားပိုးဝင်ခြင်းကုသခြင်း", vi:"Điều trị nhiễm động vật nguyên sinh (tiêu hóa hoặc âm đạo)", km:"ការព្យាបាលការរលាកប្រូតូសូអា", it:"Trattamento delle infezioni da protozoi (gastrointestinali o vaginali)", de:"Behandlung von Protozoeninfektionen (Magen-Darm oder vaginal)", hi:"प्रोटोजोअल संक्रमण का उपचार" },
    { key:"externalParasiteTreatment", th:"รักษาโรคจากปรสิตภายนอก (เช่น หิด หรือเหา)", ja:"外部寄生虫症の治療（疥癬、シラミなど）", en:"External parasite treatment (Scabies / Pediculosis)", ko:"외부 기생충 치료 (옴, 이 등)", "zh-CN":"外部寄生虫感染治疗（疥疮、头虱）", "zh-TW":"外部寄生蟲感染治療（疥瘡、頭虱）", es:"Tratamiento de parásitos externos (Sarna / Pediculosis)", fr:"Traitement des parasites externes (Gale / Pédiculose)", ru:"Лечение эктопаразитов (чесотка, педикулез)", ar:"علاج الطفيليات الخارجية (الجرب / قمل الرأس)", my:"ပြင်ပပိုးမွှားကုသခြင်း (ဝဲ၊ ဆံပင်ရှဉ့်)", vi:"Điều trị ký sinh trùng ngoài da (Ghẻ / Rận mu)", km:"ការព្យាបាលប៉ារ៉ាស៊ីតខាងក្រៅ (រមាស់ ចៃ)", it:"Trattamento dei parassiti esterni (Scabbia / Pediculosi)", de:"Behandlung von Ektoparasiten (Krätze / Kopfläuse)", hi:"बाहरी परजीवी उपचार (स्कैबीज / जूँ)" },
    { key:"pharyngitisTonsillitisTreatment", th:"รักษาการติดเชื้อแบคทีเรียหรืออักเสบในลำคอ / ทอนซิลอักเสบ", ja:"咽頭炎・扁桃炎（細菌感染または炎症）の治療", en:"Pharyngitis / Tonsillitis bacterial infection treatment", ko:"인후염 / 편도염 세균 감염 또는 염증 치료", "zh-CN":"咽炎 / 扁桃体炎细菌感染或炎症治疗", "zh-TW":"咽炎 / 扁桃體炎細菌感染或炎症治療", es:"Tratamiento de infección bacteriana o inflamación de faringe / amígdalas", fr:"Traitement de l'infection bactérienne ou de l'inflammation du pharynx / des amygdales", ru:"Лечение фарингита / тонзиллита (бактериальной инфекции или воспаления)", ar:"علاج التهاب البلعوم / التهاب اللوزتين البكتيري أو الالتهاب", my:"လည်ချောင်းပိုးဝင်ခြင်း / တန်ဆယ်ရောင်ခြင်းကုသခြင်း", vi:"Điều trị viêm họng / viêm amidan do nhiễm khuẩn hoặc viêm", km:"ការព្យាបាលរលាកបំពង់ក / រលាកបំពង់កធំ", it:"Trattamento dell'infezione batterica o infiammazione di faringe / tonsille", de:"Behandlung von Pharyngitis / Tonsillitis (bakterielle Infektion oder Entzündung)", hi:"ग्रसनीशोथ / टॉन्सिलिटिस जीवाणु संक्रमण या सूजन का उपचार" },
    { key:"bacterialSinusitisTreatment", th:"รักษาโรคไซนัสอักเสบติดเชื้อ", ja:"感染性副鼻腔炎の治療", en:"Bacterial sinusitis treatment", ko:"감염성 부비동염 치료", "zh-CN":"细菌性鼻窦炎治疗", "zh-TW":"細菌性鼻竇炎治療", es:"Tratamiento de sinusitis bacteriana", fr:"Traitement de la sinusite bactérienne", ru:"Лечение бактериального синусита", ar:"علاج التهاب الجيوب الأنفية البكتيري", my:"ဆိုင်းနပ်ဇ်ရောင်ခြင်းကုသခြင်း", vi:"Điều trị viêm xoang do nhiễm khuẩn", km:"ការព្យាបាលរលាកស៊ីនុស", it:"Trattamento della sinusite batterica", de:"Behandlung von bakterieller Sinusitis", hi:"बैक्टीरियल साइनसाइटिस का उपचार" },
    { key:"acuteBronchitisTreatment", th:"รักษาโรคหลอดลมอักเสบเฉียบพลัน", ja:"急性気管支炎の治療", en:"Acute bronchitis treatment", ko:"급성 기관지염 치료", "zh-CN":"急性支气管炎治疗", "zh-TW":"急性支氣管炎治療", es:"Tratamiento de bronquitis aguda", fr:"Traitement de la broncho-pneumonie aiguë", ru:"Лечение острого бронхита", ar:"علاج التهاب الشعب الهوائية الحاد", my:"ပြင်းထန်လေပြွန်ရောင်ခြင်းကုသခြင်း", vi:"Điều trị viêm phế quản cấp", km:"ការព្យាបាលរលាកទងសួតស្រួចស្រាវ", it:"Trattamento della bronchite acuta", de:"Behandlung von akuter Bronchitis", hi:"तीव्र ब्रोंकाइटिस का उपचार" },
    { key:"pneumoniaTreatment", th:"รักษาโรคปอดอักเสบ / ปอดบวม", ja:"肺炎の治療", en:"Pneumonia treatment", ko:"폐렴 치료", "zh-CN":"肺炎治疗", "zh-TW":"肺炎治療", es:"Tratamiento de neumonía", fr:"Traitement de la pneumonie", ru:"Лечение пневмонии", ar:"علاج الالتهاب الرئوي", my:"အဆုတ်ရောင် / အဆုတ်နာကုသခြင်း", vi:"Điều trị viêm phổi", km:"ការព្យាបាលរលាកសួត", it:"Trattamento della polmonite", de:"Behandlung von Lungenentzündung (Pneumonie)", hi:"निमोनिया का उपचार" },
    { key:"acuteViralRespiratoryInfection", th:"รักษาการติดเชื้อไวรัสทางเดินหายใจเฉียบพลัน (เช่น RSV)", ja:"急性呼吸器ウイルス感染症の治療（RSVなど）", en:"Acute viral respiratory infection treatment (e.g., RSV)", ko:"급성 호흡기 바이러스 감염 치료 (예: RSV)", "zh-CN":"急性病毒性呼吸道感染治疗（如RSV）", "zh-TW":"急性病毒性呼吸道感染治療（如RSV）", es:"Tratamiento de infección respiratoria viral aguda (ej. VSR)", fr:"Traitement des infections respiratoires virales aiguës (ex. VRS)", ru:"Лечение острых вирусных респираторных инфекций (например, РСВ)", ar:"علاج التهابات الجهاز التنفسي الفيروسية الحادة (مثل الفيروس التنفسي المخلوي RSV)", my:"အသက်ရှူလမ်းကြောင်း ဗိုင်းရပ်စ်ပိုးဝင်ခြင်းကုသခြင်း (RSV ကဲ့သို့သော)", vi:"Điều trị nhiễm trùng đường hô hấp cấp do vi-rút (như RSV)", km:"ការព្យាបាលការរលាកផ្លូវដង្ហើមវីរុសស្រួចស្រាវ (ឧ. RSV)", it:"Trattamento delle infezioni respiratorie virali acute (es. RSV)", de:"Behandlung von akuten viralen Atemwegsinfektionen (z. B. RSV)", hi:"तीव्र वायरल श्वसन संक्रमण का उपचार (जैसे RSV)" },
    { key:"soreThroatIrritationRelief", th:"บรรเทาอาการเจ็บคอ / ระคายคอจากต่อมทอนซิลอักเสบหรือหวัด", ja:"扁桃炎や風邪による喉の痛み・イガイガの緩和", en:"Sore throat / throat irritation relief from tonsillitis or cold", ko:"편도염이나 감기로 인한 인후통 / 목 따가움 완화", "zh-CN":"缓解由扁桃体炎或感冒引起的喉咙痛 / 咽喉刺激", "zh-TW":"緩解由扁桃體炎或感冒引起的喉嚨痛 / 咽喉刺激", es:"Alivio del dolor de garganta / irritación por amigdalitis o resfriado", fr:"Soulagement du mal de gorge / irritation de la gorge liés à l'amygdalite ou au rhume", ru:"Облегчение боли в горле / першения при тонзиллите или простуде", ar:"تخفيف التهاب الحلق / تهيج الحلق الناتج عن التهاب اللوزتين أو البرد", my:"တန်ဆယ်ရောင်ခြင်း သို့မဟုတ် အအေးမိခြင်းကြောင့် လည်ချောင်းနာခြင်း / ယားယံခြင်းသက်သာစေခြင်း", vi:"Giảm đau họng / ngứa họng do viêm amidan hoặc cảm lạnh", km:"បំបាត់ការឈឺបំពង់ក / រលាកបំពង់កពីការរលាកបំពង់ក ឬផ្តាសាយ", it:"Sollievo dal mal di gola / irritazione della gola da tonsillite o raffreddore", de:"Linderung von Halsschmerzen / Halsreizung bei Mandelentzündung oder Erkältung", hi:"टोंसिलिटिस या सर्दी से गले में खराश / गले की जलन से राहत" },
    { key:"throatInflammationSwellingRelief", th:"ลดอาการอักเสบและบวมในลำคอ", ja:"喉の炎症と腫れの軽減", en:"Throat inflammation and swelling relief", ko:"목의 염증 및 부기 완화", "zh-CN":"减轻咽喉炎症和肿胀", "zh-TW":"減輕咽喉炎症和腫脹", es:"Alivio de la inflamación y la hinchazón de garganta", fr:"Soulagement de l'inflammation et du gonflement de la gorge", ru:"Уменьшение воспаления и отека горла", ar:"تخفيف التهاب وتورم الحلق", my:"လည်ချောင်းရောင်ရမ်းခြင်းနှင့် ဖောင်းခြင်းသက်သာစေခြင်း", vi:"Giảm viêm và sưng họng", km:"កាត់បន្ថយការរលាក និងហើមក្នុងបំពង់ក", it:"Sollievo dall'infiammazione e dal gonfiore della gola", de:"Linderung von Halsentzündungen und Schwellungen", hi:"गले की सूजन और दर्द से राहत" },
    { key:"antisepticThroatSprayLozenge", th:"พ่นหรืออมเพื่อฆ่าเชื้อและลดอาการเจ็บในช่องปากและลำคอ", ja:"口腔および喉の殺菌・鎮痛のためのスプレーまたはトローチ", en:"Antiseptic throat spray or lozenge for oral and throat pain relief", ko:"구강 및 인후의 살균 및 통증 완화를 위한 스프레이 또는 트로키", "zh-CN":"用于口腔和咽喉杀菌及止痛的喷雾或含片", "zh-TW":"用於口腔和咽喉殺菌及止痛的噴霧或含片", es:"Spray o pastilla antiséptica para aliviar el dolor bucal y de garganta", fr:"Spray ou pastille antiseptique pour soulager les douleurs bucco-pharyngées", ru:"Антисептический спрей или пастилки для облегчения боли в полости рта и горле", ar:"بخاخ أو قرص استحلاب مطهر لتخفيف آلام الفم والحلق", my:"ခံတွင်းနှင့်လည်ချောင်းပိုးသတ်ပြီး နာကျင်မှုသက်သာစေရန် ဖျန်းဆေး သို့မဟုတ် ဆေးပြား", vi:"Xịt hoặc ngậm sát khuẩn để giảm đau miệng và họng", km:"បាញ់ ឬបៀមដើម្បីសម្លាប់មេរោគ និងបំបាត់ការឈឺចាប់ក្នុងមាត់និងបំពង់ក", it:"Spray o pastiglia antisettica per il sollievo dal dolore orale e alla gola", de:"Antiseptisches Rachenspray oder Lutschtablette zur Schmerzlinderung im Mund- und Rachenraum", hi:"मुंह और गले के दर्द से राहत के लिए एंटीसेप्टिक थ्रॉट स्प्रे या गोली" },
    { key:"acidReducerIndication", th:"ลดกรดในกระเพาะอาหาร", ja:"胃酸分泌抑制", en:"Acid reducer", ko:"위산 분비 억제", "zh-CN":"抑制胃酸分泌", "zh-TW":"抑制胃酸分泌", es:"Reductor de ácido gástrico", fr:"Réducteur d'acide gastrique", ru:"Снижение кислотности желудка", ar:"خافض لحموضة المعدة", my:"အစာအိမ်အက်ဆစ်ကျဆင်းစေခြင်း", vi:"Giảm tiết axit dạ dày", km:"កាត់បន្ថយអាស៊ីតក្នុងក្រពះ", it:"Riduttore di acido gastrico", de:"Magensäure-Reduzierer", hi:"पेट का एसिड कम करने वाला" },
    { key:"gastricMucosalProtectantIndication", th:"เคลือบกระเพาะอาหาร / ป้องกันเยื่อบุกระเพาะอาหาร", ja:"胃粘膜保護", en:"Gastric mucosal protectant", ko:"위점막 보호", "zh-CN":"胃黏膜保护", "zh-TW":"胃黏膜保護", es:"Protector de la mucosa gástrica", fr:"Protecteur de la muqueuse gastrique", ru:"Защита слизистой оболочки желудка", ar:"حماية الغشاء المخاطي للمعدة", my:"အစာအိမ်အတွင်းအမြှေးပါးကာကွယ်ခြင်း", vi:"Bảo vệ niêm mạc dạ dày", km:"ការពារភ្នាសរំអិលក្រពះ", it:"Protettore della mucosa gastrica", de:"Magenschleimhaut-Schutzmittel", hi:"पेट की परत की सुरक्षा करने वाला" },
    { key:"pepticUlcerTreatment", th:"รักษาแผลในกระเพาะอาหารและลำไส้เล็กส่วนต้น", ja:"消化性潰瘍（胃潰瘍・十二指腸潰瘍）の治療", en:"Peptic ulcer treatment", ko:"소화성 궤양(위궤양, 십이지장궤양) 치료", "zh-CN":"消化性溃疡（胃溃疡、十二指肠溃疡）治疗", "zh-TW":"消化性潰瘍（胃潰瘍、十二指腸潰瘍）治療", es:"Tratamiento de úlcera péptica", fr:"Traitement de l'ulcère peptique", ru:"Лечение пептической язвы", ar:"علاج قرحة المعدة والاثني عشر", my:"အစာအိမ်နှင့် အူသိမ်ဦးပိုင်းအနာကုသခြင်း", vi:"Điều trị loét dạ dày tá tràng", km:"ការព្យាបាលដំបៅក្រពះ និងពោះវៀនតូច", it:"Trattamento dell'ulcera peptica", de:"Behandlung von Magengeschwüren", hi:"पेप्टिक अल्सर का उपचार" },
    { key:"gerdHeartburnTreatment", th:"รักษาโรคกรดไหลย้อน (GERD)", ja:"胃食道逆流症（GERD）の治療", en:"GERD / Heartburn treatment", ko:"위식도 역류질환(GERD) 치료", "zh-CN":"胃食管反流病（GERD）治疗", "zh-TW":"胃食道逆流症（GERD）治療", es:"Tratamiento de la enfermedad por reflujo gastroesofágico (ERGE)", fr:"Traitement du reflux gastro-œsophagien (RGO)", ru:"Лечение гастроэзофагеальной рефлюксной болезни (ГЭРБ)", ar:"علاج ارتجاع المريء (GERD)", my:"အစာအိမ်လေနာ ရောဂါကုသခြင်း", vi:"Điều trị trào ngược dạ dày thực quản (GERD)", km:"ការព្យាបាលជំងឺក្រហាយទ្រូង / ធ្លាក់ទឹកក្រពះ", it:"Trattamento della malattia da reflusso gastroesofageo (GERD)", de:"Behandlung von Refluxkrankheit (GERD)", hi:"GERD / एसिड रिफाइंड का उपचार" },
    { key:"antiflatulentGasBloatingRelief", th:"ยาขับลม / แก้ท้องอืดท้องเฟ้อ / บรรเทาอาการแน่นจุกแน่น", ja:"ガス・腹部膨満感の緩和", en:"Antiflatulent / Gas and bloating relief", ko:"가스 제거 / 복부 팽만 완화", "zh-CN":"排气 / 缓解腹胀", "zh-TW":"排氣 / 緩解腹脹", es:"Antiflatulento / Alivio de gases y distensión abdominal", fr:"Antiflatulent / Soulage les gaz et les ballonnements", ru:"Устранение вздутия живота и газообразования", ar:"طارد للغازات / تخفيف الانتفاخ", my:"ဓာတ်ငွေ့ထုတ်ခြင်း / ဗိုက်ဖောင်းခြင်းသက်သာစေခြင်း", vi:"Giảm đầy hơi / trướng bụng", km:"បំបាត់ខ្យល់ក្នុងពោះ / ធូរស្រាលពោះ", it:"Antiflatulento / Sollievo da gas e gonfiore", de:"Entblähungsmittel / Linderung von Blähungen", hi:"गैस और पेट फूलने से राहत" },
    { key:"prokineticIndigestionTreatment", th:"กระตุ้นการบีบตัวของทางเดินอาหาร / แก้อาการอาหารไม่ย่อย", ja:"消化管運動賦活 / 消化不良の治療", en:"Prokinetic / Indigestion treatment", ko:"소화관 운동 촉진 / 소화불량 치료", "zh-CN":"促进胃肠动力 / 消化不良治疗", "zh-TW":"促進胃腸動力 / 消化不良治療", es:"Proquinético / Tratamiento de la indigestión", fr:"Prokinétique / Traitement de la dyspepsie", ru:"Стимуляция моторики ЖКТ / лечение несварения", ar:"منشط حركة الجهاز الهضمي / علاج عسر الهضم", my:"အစာအိမ်လှုပ်ရှားမှုအားကောင်းစေခြင်း / အစာမကြေရောဂါကုသခြင်း", vi:"Tăng nhu động ruột / Điều trị khó tiêu", km:"ជំរុញចលនាក្រពះពោះវៀន / ព្យាបាលជំងឺរំលាយអាហារមិនបានល្អ", it:"Procinetico / Trattamento dell'indigestione", de:"Prokinetikum / Behandlung von Indigestion", hi:"पाचन क्रिया तेज करना / अपच का उपचार" },
    { key:"antispasmodicCrampsIBS", th:"แก้ปวดเกร็งช่องท้อง / บรรเทาอาการลำไส้แปรปรวน (IBS)", ja:"腹部けいれん・過敏性腸症候群（IBS）の緩和", en:"Antispasmodic for abdominal cramps / IBS", ko:"복부 경련 진정 / 과민성 대장 증후군(IBS) 완화", "zh-CN":"解痉止痛 / 缓解肠易激综合征（IBS）", "zh-TW":"解痙止痛 / 緩解腸易激綜合徵（IBS）", es:"Antiespasmódico para cólicos abdominales / SII", fr:"Antispasmodique pour crampes abdominales / SCI", ru:"Спазмолитик при спазмах в животе / синдроме раздраженного кишечника (СРК)", ar:"مضاد للتشنج لمغص البطن / متلازمة القولون العصبي (IBS)", my:"ဗိုက်နာကျဉ်းခြင်း / အူလမ်းကြောင်းလှုပ်ရှားမှုလွန်ကဲခြင်းသက်သာစေခြင်း", vi:"Chống co thắt đau bụng / Hội chứng ruột kích thích (IBS)", km:"បំបាត់ការឈឺក្រពះពោះវៀន / រោគសញ្ញាពោះវៀនឆាប់ខឹង (IBS)", it:"Antispasmodico per crampi addominali / IBS", de:"Krampflösendes Mittel bei Bauchschmerzen / Reizdarmsyndrom", hi:"पेट की ऐंठन / आईबीएस (इरिटेबल बाउल सिंड्रोम) के लिए एंटीस्पास्मोडिक" },
    { key:"laxativeIndication", th:"ยาแก้ท้องผูก / ยาระบาย", ja:"便秘薬 / 下剤", en:"Laxative", ko:"변비약 / 완하제", "zh-CN":"泻药 / 治便秘", "zh-TW":"瀉藥 / 治便秘", es:"Laxante", fr:"Laxatif", ru:"Слабительное", ar:"ملين للإمساك", my:"ဝမ်းချုပ်ခြင်းသက်သာစေဆေး / ဝမ်းနုတ်ဆေး", vi:"Thuốc nhuận tràng", km:"ថ្នាំបញ្ចុះលាមក", it:"Lassativo", de:"Abführmittel", hi:"कब्ज की दवा / लैक्सेटिव" },
    { key:"antidiarrhealIndication", th:"ยาแก้ท้องเสีย / หยุดอาการท้องร่วง", ja:"下痢止め", en:"Antidiarrheal", ko:"지사제", "zh-CN":"止泻药", "zh-TW":"止瀉藥", es:"Antidiarreico", fr:"Antidiarrhéique", ru:"Противодиарейное средство", ar:"مضاد للإسهال", my:"ဝမ်းလျှောခြင်းရပ်တန့်ဆေး", vi:"Thuốc trị tiêu chảy", km:"ថ្នាំបំបាត់រាគ", it:"Antidiarroico", de:"Mittel gegen Durchfall", hi:"दस्तरोधी दवा" },
    { key:"oralRehydrationSaltsORS", th:"ชดเชยเกลือแร่และน้ำ (ผงเกลือแร่ ORS)", ja:"経口補水塩（ORS）", en:"Oral rehydration salts (ORS)", ko:"경구 수액염(ORS)", "zh-CN":"口服补液盐（ORS）", "zh-TW":"口服補液鹽（ORS）", es:"Sales de rehidratación oral (SRO)", fr:"Sels de réhydratation orale (SRO)", ru:"Пероральные регидратационные соли (ОРС)", ar:"أملاح الإماهة الفموية (ORS)", my:"ရေဓာတ်ဖြည့်အမှုန့် (ORS)", vi:"Dung dịch bù nước điện giải (ORS)", km:"អំបិលទឹកសម្រន់ខ្លួន (ORS)", it:"Sali reidratanti orali (ORS)", de:"Orale Rehydratationssalze (ORS)", hi:"ओआरएस (मौखिक पुनर्जलीकरण घोल)" },
    { key:"antiemeticNauseaRelief", th:"แก้คลื่นไส้อาเจียน", ja:"制吐薬 / 吐き気止め", en:"Antiemetic / Anti-nausea", ko:"항구토제 / 구역·구토 완화", "zh-CN":"止吐 / 缓解恶心呕吐", "zh-TW":"止吐 / 緩解惡心嘔吐", es:"Antiemético / Contra las náuseas", fr:"Antiémétique / Contre les nausées", ru:"Противорвотное средство", ar:"مضاد للقيء وغثيان", my:"ပျို့အန်ခြင်းသက်သာစေဆေး", vi:"Thuốc chống buồn nôn", km:"ថ្នាំបំបាត់ចង្អោរក្អួត", it:"Antiemetico / Contro la nausea", de:"Mittel gegen Übelkeit und Erbrechen", hi:"मतली-उल्टी रोधी" },
    { key:"liverProtectantHepaticSupport", th:"บำรุงตับ / ปกป้องเซลล์ตับ", ja:"肝臓保護 / 肝機能サポート", en:"Liver protectant / Hepatic support", ko:"간 보호 / 간 기능 개선", "zh-CN":"保肝 / 护肝", "zh-TW":"保肝 / 護肝", es:"Hepatoprotector / Apoyo hepático", fr:"Hépatoprotecteur / Soutien hépatique", ru:"Гепатопротектор / поддержка функции печени", ar:"حماية الكبد / دعم وظائف الكبد", my:"အသည်းအားဆေး / အသည်းဆဲလ်ကာကွယ်ဆေး", vi:"Bảo vệ gan / hỗ trợ chức năng gan", km:"ថ្នាំថែទាំថ្លើម / ការពារកោសិកាថ្លើម", it:"Epatoprotettore / Supporto epatico", de:"Leber-Schutzmittel / Leberschutz", hi:"लिवर रक्षक / यकृत सहायता" },
    { key:"digestiveEnzymeSupplement", th:"ช่วยย่อยไขมันและอาหาร (เอนไซม์ช่วยย่อย)", ja:"消化酵素（脂肪および食物の消化を助ける）", en:"Digestive enzyme supplement", ko:"소화 효소제 (지방 및 음식 소화 보조)", "zh-CN":"消化酶补充剂（帮助消化脂肪和食物）", "zh-TW":"消化酶補充劑（幫助消化脂肪和食物）", es:"Suplemento de enzimas digestivas", fr:"Supplément d'enzymes digestives", ru:"Ферментный препарат для пищеварения", ar:"مكمل إنزيمات هضمية", my:"အဆီနှင့်အစာကြေစေသော အင်ဇိုင်းဆေး", vi:"Bổ sung men tiêu hóa", km:"អរម៉ូនជំនួយការរំលាយអាហារ", it:"Integratore di enzimi digestivi", de:"Verdauungsenzym-Ergänzung", hi:"पाचन एंजाइम पूरक" }
];

const advicesCoreDB = [
    { key:"stopIfImproved", th:"อาการดีขึ้นหยุดยาได้", ja:"改善で中止可", en:"May stop once symptoms improve", ko:"증상이 호전되면 중단 가능", "zh-CN":"症状改善后可停药", "zh-TW":"症狀改善後可停藥", es:"Puede suspenderse al mejorar los síntomas", fr:"Peut être arrêté dès l'amélioration des symptômes", ru:"Можно прекратить приём при улучшении симптомов", ar:"يمكن التوقف عند تحسن الأعراض", my:"ရောဂါလက္ခဏာသက်သာလာလျှင် ဆေးရပ်နိုင်သည်", vi:"Có thể ngừng khi triệu chứng cải thiện", km:"អាចឈប់ថ្នាំនៅពេលរោគសញ្ញាប្រសើរឡើង", it:"Può essere sospeso al miglioramento dei sintomi", de:"Kann bei Besserung der Symptome abgesetzt werden", hi:"लक्षण सुधरने पर बंद कर सकते हैं" },
    { key:"drinkWater", th:"ดื่มน้ำตามมากๆ", ja:"多めに水を飲む", en:"Drink plenty of water", ko:"물을 충분히 마시세요", "zh-CN":"请多喝水", "zh-TW":"請多喝水", es:"Beba abundante agua", fr:"Buvez beaucoup d'eau", ru:"Пейте больше воды", ar:"اشرب كمية كافية من الماء", my:"ရေများများသောက်ပါ", vi:"Uống nhiều nước", km:"ផឹកទឹកឲ្យបានច្រើន", it:"Bere molta acqua", de:"Viel Wasser trinken", hi:"खूब पानी पिएं" },
    { key:"refrigerate", th:"เก็บในตู้เย็น", ja:"冷蔵庫で保管", en:"Store in refrigerator", ko:"냉장 보관", "zh-CN":"冷藏保存", "zh-TW":"冷藏保存", es:"Conservar en el refrigerador", fr:"Conserver au réfrigérateur", ru:"Хранить в холодильнике", ar:"يُحفظ في الثلاجة", my:"ရေခဲသေတ္တာတွင်သိမ်းဆည်းပါ", vi:"Bảo quản trong tủ lạnh", km:"ទុកក្នុងទូទឹកកក", it:"Conservare in frigorifero", de:"Im Kühlschrank aufbewahren", hi:"फ्रिज में रखें" },
    { key:"shakeWell", th:"เขย่าขวดก่อนใช้", ja:"よく振ってから使用", en:"Shake well before use", ko:"사용 전에 잘 흔드세요", "zh-CN":"使用前请充分摇匀", "zh-TW":"使用前請充分搖勻", es:"Agitar bien antes de usar", fr:"Bien agiter avant emploi", ru:"Взболтать перед применением", ar:"يُرج جيداً قبل الاستعمال", my:"အသုံးမပြုမီကောင်းစွာလှုပ်ပါ", vi:"Lắc kỹ trước khi dùng", km:"អង្រួនឲ្យបានល្អមុនប្រើ", it:"Agitare bene prima dell'uso", de:"Vor Gebrauch gut schütteln", hi:"उपयोग से पहले अच्छी तरह हिलाएं" },
    { key:"swallowWhole", th:"กลืนทั้งเม็ดห้ามเคี้ยว", ja:"かまずに飲むこと", en:"Swallow whole, do not chew", ko:"씹지 말고 그대로 삼키세요", "zh-CN":"请整粒吞服，勿咀嚼", "zh-TW":"請整粒吞服，勿咀嚼", es:"Tragar entero, no masticar", fr:"Avaler entier, ne pas mâcher", ru:"Проглатывать целиком, не разжёвывать", ar:"يُبلع كاملاً دون مضغ", my:"မကိုက်ဘဲတစ်ပြုန်းတည်းမျိုချပါ", vi:"Nuốt nguyên viên, không nhai", km:"លេបទាំងមូល កុំទំពា", it:"Ingerire intero, non masticare", de:"Im Ganzen schlucken, nicht kauen", hi:"पूरी गोली निगलें, चबाएं नहीं" },
    { key:"noAlcohol", th:"ห้ามดื่มร่วมกับแอลกอฮอล์", ja:"アルコールと一緒に飲まない", en:"Do not take with alcohol", ko:"음주 시 복용하지 마세요", "zh-CN":"请勿与酒精同服", "zh-TW":"請勿與酒精同服", es:"No tomar con alcohol", fr:"Ne pas prendre avec de l'alcool", ru:"Не принимать вместе с алкоголем", ar:"لا يُستخدم مع الكحول", my:"အရက်နှင့်အတူမသောက်ပါနှင့်", vi:"Không dùng chung với rượu bia", km:"កុំប្រើជាមួយគ្រឿងស្រវឹង", it:"Non assumere con alcolici", de:"Nicht zusammen mit Alkohol einnehmen", hi:"शराब के साथ न लें" },
    { key:"orangeUrine", th:"ยาอาจทำให้ปัสสาวะมีสีส้ม", ja:"尿がオレンジ色になることがあります", en:"May cause orange-colored urine", ko:"소변이 주황색으로 변할 수 있습니다", "zh-CN":"可能使尿液呈橙色", "zh-TW":"可能使尿液呈橙色", es:"Puede causar orina de color naranja", fr:"Peut colorer les urines en orange", ru:"Может окрашивать мочу в оранжевый цвет", ar:"قد يسبب تلون البول باللون البرتقالي", my:"ဆီးအရောင်လိမ္မော်ရောင်ပြောင်းနိုင်သည်", vi:"Có thể làm nước tiểu chuyển màu cam", km:"អាចធ្វើឲ្យទឹកនោមប្រែជាពណ៌ទឹកក្រូច", it:"Può colorare le urine di arancione", de:"Kann den Urin orange verfärben", hi:"पेशाब का रंग नारंगी हो सकता है" },
    { key:"takeAfterFoodProtectStomach", th:"กินหลังอาหารทันทีเพื่อป้องกันกัดกระเพาะ", ja:"食直後に服用", en:"Take immediately after food to protect the stomach", ko:"위장 보호를 위해 식후 즉시 복용", "zh-CN":"请于饭后立即服用以保护胃部", "zh-TW":"請於飯後立即服用以保護胃部", es:"Tomar inmediatamente después de comer para proteger el estómago", fr:"Prendre immédiatement après le repas pour protéger l'estomac", ru:"Принимать сразу после еды для защиты желудка", ar:"يؤخذ فور الأكل لحماية المعدة", my:"အစာအိမ်ကိုကာကွယ်ရန် အစာစားပြီးချက်ချင်းသုံးပါ", vi:"Uống ngay sau khi ăn để bảo vệ dạ dày", km:"ប្រើភ្លាមៗបន្ទាប់ពីអាហារ ដើម្បីការពារក្រពះ", it:"Assumere subito dopo i pasti per proteggere lo stomaco", de:"Sofort nach dem Essen einnehmen, um den Magen zu schützen", hi:"पेट की सुरक्षा हेतु भोजन के तुरंत बाद लें" },
    { key:"avoidSunlight", th:"หลีกเลี่ยงแสงแดดจัดระหว่างใช้ยา", ja:"日光を避ける", en:"Avoid direct sunlight while using", ko:"복용 중 직사광선을 피하세요", "zh-CN":"用药期间请避免阳光直射", "zh-TW":"用藥期間請避免陽光直射", es:"Evite la luz solar directa durante el tratamiento", fr:"Évitez l'exposition directe au soleil pendant le traitement", ru:"Избегать прямого солнечного света во время приёма", ar:"تجنب أشعة الشمس المباشرة أثناء الاستخدام", my:"ဆေးသုံးနေစဉ်နေရောင်တိုက်ရိုက်မှန်ခြင်းရှောင်ပါ", vi:"Tránh ánh nắng trực tiếp khi dùng thuốc", km:"ជៀសវាងពន្លឺថ្ងៃដោយផ្ទាល់ក្នុងអំឡុងពេលប្រើថ្នាំ", it:"Evitare l'esposizione diretta al sole durante l'uso", de:"Während der Anwendung direkte Sonneneinstrahlung meiden", hi:"उपयोग के दौरान सीधी धूप से बचें" },
    { key:"washHands", th:"ล้างมือก่อนใช้ยา", ja:"使用前に手を洗うこと", en:"Wash hands before use", ko:"사용 전 손을 씻으세요", "zh-CN":"使用前请洗手", "zh-TW":"使用前請洗手", es:"Lávese las manos antes de usar", fr:"Se laver les mains avant l'emploi", ru:"Мыть руки перед применением", ar:"يُغسل اليدين قبل الاستعمال", my:"အသုံးမပြုမီလက်ဆေးပါ", vi:"Rửa tay trước khi dùng", km:"លាងដៃមុនប្រើថ្នាំ", it:"Lavarsi le mani prima dell'uso", de:"Vor der Anwendung Hände waschen", hi:"उपयोग से पहले हाथ धोएं" },
    { key:"chronicUseAsDirected", th:"กรุณาใช้ยานี้ตามแพทย์สั่งอย่างเคร่งครัด", ja:"必ず医師の指示通りに服用してください", en:"Please use this medication exactly as prescribed by your doctor", ko:"반드시 의사의 처방대로 복용하세요", "zh-CN":"请务必严格遵照医嘱使用本药", "zh-TW":"請務必嚴格遵照醫囑使用本藥", es:"Use este medicamento exactamente como lo indicó su médico", fr:"Utilisez ce médicament exactement comme prescrit par votre médecin", ru:"Принимайте это лекарство строго по назначению врача", ar:"يُرجى استخدام هذا الدواء تماماً كما وصفه الطبيب", my:"ဆရာဝန်မှညွှန်ကြားသည့်အတိုင်းတိကျစွာသုံးပါ", vi:"Vui lòng dùng thuốc này đúng theo chỉ định của bác sĩ", km:"សូមប្រើថ្នាំនេះឱ្យបានត្រឹមត្រូវតាមការណែនាំរបស់វេជ្ជបណ្ឌិត", it:"Utilizzare questo farmaco esattamente come prescritto dal medico", de:"Bitte nehmen Sie dieses Medikament genau nach ärztlicher Verordnung ein", hi:"कृपया यह दवा डॉक्टर के बताए अनुसार ही सख्ती से लें" }
];

const advicesExtraDB = [
    {key:"extra01", th:"รับประทานก่อนอาหารอย่างน้อย 30 นาที", ja:"食前30分以上に服用", en:"Take at least 30 minutes before a meal", ko:"식전 최소 30분 전에 복용하세요", "zh-CN":"请在饭前至少30分钟服用", "zh-TW":"請在飯前至少30分鐘服用", es:"Tome al menos 30 minutos antes de una comida", fr:"Prendre au moins 30 minutes avant un repas", ru:"Принимать как минимум за 30 минут до еды", ar:"تناول الدواء قبل الأكل بـ 30 دقيقة على الأقل", my:"အစာမစားမီ အနည်းဆုံး မိနစ် ၃၀ ကြိုသောက်ပါ", vi:"Uống ít nhất 30 phút trước bữa ăn", km:"ពិសាយ៉ាងហោចណាស់ 30 នាទីមុនពេលអាហារ", it:"Assumere almeno 30 minuti prima di un pasto", de:"Mindestens 30 Minuten vor einer Mahlzeit einnehmen", hi:"भोजन से कम से कम 30 मिनट पहले लें"},
    {key:"extra02", th:"รับประทานหลังอาหารทันที", ja:"食後直ちに服用", en:"Take immediately after a meal", ko:"식후 즉시 복용하세요", "zh-CN":"饭后立即服用", "zh-TW":"飯後立即服用", es:"Tome inmediatamente después de una comida", fr:"Prendre immédiatement après un repas", ru:"Принимать сразу после еды", ar:"تناول الدواء فوراً بعد الأكل", my:"အစာစားပြီးချက်ချင်း သောက်ပါ", vi:"Uống ngay sau bữa ăn", km:"ពិសាភ្លាមៗបន្ទាប់ពីអាហារ", it:"Assumere immediatamente dopo un pasto", de:"Unmittelbar nach einer Mahlzeit einnehmen", hi:"भोजन के तुरंत बाद लें"},
    {key:"extra03", th:"รับประทานพร้อมอาหาร หรือ หลังอาหารทันที แล้วดื่มน้ำตามมากๆ", ja:"食事と一緒に、または食直後に、水を多めに飲みながら服用してください", en:"Take with or immediately after a meal, and drink plenty of water", ko:"식사와 함께 또는 식후 즉시 물을 많이 마시며 복용하세요", "zh-CN":"请与食物同服或饭后立即服用，并多喝水", "zh-TW":"請與食物同服或飯後立即服用，並多喝水", es:"Tome con o inmediatamente después de una comida, y beba abundante agua", fr:"Prendre avec ou immédiatement après un repas, et boire beaucoup d'eau", ru:"Принимать во время или сразу после еды, запивая большим количеством воды", ar:"تناول الدواء مع أو فوراً بعد الأكل، واشرب الكثير من الماء", my:"အစာနှင့်အတူ သို့မဟုတ် အစာစားပြီးချက်ချင်း ရေများများဖြင့်သောက်ပါ", vi:"Uống cùng hoặc ngay sau bữa ăn, và uống nhiều nước", km:"ពិសាជាមួយឬភ្លាមៗបន្ទាប់ពីអាហារ ហើយផឹកទឹកឲ្យបានច្រើន", it:"Assumere con o immediatamente dopo un pasto e bere molta acqua", de:"Mit oder unmittelbar nach einer Mahlzeit einnehmen und viel Wasser trinken", hi:"भोजन के साथ या तुरंत बाद लें, और खूब पानी पिएं"},
    {key:"extra04", th:"รับประทานติดต่อกันทุกวันจนยาหมด", ja:"薬がなくなるまで毎日続けて服用してください", en:"Take continuously every day until the medication is finished", ko:"약이 다 떨어질 때까지 매일 꾸준히 복용하세요", "zh-CN":"请每天连续服用，直到药物服完", "zh-TW":"請每天連續服用，直到藥物服完", es:"Tome continuamente todos los días hasta terminar el medicamento", fr:"Prendre tous les jours jusqu'à la fin du traitement", ru:"Принимать ежедневно до окончания курса лечения", ar:"تناول الدواء يومياً باستمرار حتى انتهاء الكمية", my:"ဆေးကုန်သည်အထိ နေ့စဉ်ဆက်တိုက်သောက်ပါ", vi:"Uống liên tục mỗi ngày cho đến khi hết thuốc", km:"ពិសាជារៀងរាល់ថ្ងៃរហូតដល់អស់ថ្នាំ", it:"Assumere continuamente tutti i giorni fino alla fine del farmaco", de:"Täglich ununterbrochen einnehmen, bis das Medikament aufgebraucht ist", hi:"दवा खत्म होने तक हर दिन लगातार लें"},
    {key:"extra05", th:"ใช้เมื่อมีอาการเท่านั้น หากอาการดีขึ้นแล้วหยุดยาได้", ja:"症状がある時のみ使用し、症状が改善したら中止してよい", en:"Use only when having symptoms, can stop when symptoms improve", ko:"증상이 있을 때만 사용하고, 증상이 호전되면 중단할 수 있습니다", "zh-CN":"仅在有症状时使用，症状改善后即可停药", "zh-TW":"僅在有症狀時使用，症狀改善後即可停藥", es:"Use solo cuando tenga síntomas, puede suspender al mejorar", fr:"Utiliser uniquement en cas de symptômes, peut être arrêté en cas d'amélioration", ru:"Использовать только при наличии симптомов, можно прекратить при улучшении", ar:"استخدمه فقط عند وجود أعراض، ويمكن التوقف عند التحسن", my:"ရောဂါလက္ခဏာရှိချိန်တွင်သာသုံးပါ၊ သက်သာလာပါက ရပ်နိုင်သည်", vi:"Chỉ dùng khi có triệu chứng, có thể ngưng khi đã thuyên giảm", km:"ប្រើតែពេលមានរោគសញ្ញាប៉ុណ្ណោះ អាចឈប់ពេលបានធូរស្បើយ", it:"Usare solo in caso di sintomi, può essere interrotto al miglioramento", de:"Nur bei Symptomen anwenden, kann bei Besserung abgesetzt werden", hi:"लक्षण होने पर ही उपयोग करें, सुधार होने पर बंद कर सकते हैं"},
    {key:"extra06", th:"กลืนทั้งเม็ด ห้ามเคี้ยว ห้ามบด หรือหักยา", ja:"錠剤はそのまま飲み込み、噛んだり、砕いたり、割ったりしないでください", en:"Swallow whole, do not chew, crush, or break the tablet", ko:"통째로 삼키고, 씹거나 으깨거나 부수지 마세요", "zh-CN":"请整片吞服，不可咀嚼、压碎或掰开", "zh-TW":"請整片吞服，不可咀嚼、壓碎或剝半", es:"Trague entero, no mastique, triture ni parta la tableta", fr:"Avaler entier, ne pas mâcher, écraser ou couper", ru:"Глотать целиком, не разжевывать, не измельчать и не ломать", ar:"ابتلع القرص كاملاً، لا تمضغه أو تسحقه أو تقسمه", my:"ဆေးပြားကို တစ်ခုလုံးမြိုချပါ၊ မဝါးပါနှင့်၊ မချေပါနှင့်", vi:"Nuốt nguyên viên, không nhai, nghiền hoặc bẻ thuốc", km:"លេបទាំងមូល កុំទំពា កុំកិន ឬបំបែកគ្រាប់ថ្នាំ", it:"Ingerire intero, non masticare, frantumare o spezzare", de:"Ganz schlucken, nicht kauen, zerkleinern oder teilen", hi:"साबुत निगल लें, चबाएं, कुचलें या तोड़ें नहीं"},
    {key:"extra07", th:"เคี้ยวยาก่อนกลืน", ja:"服用前によく噛んでください", en:"Chew well before swallowing", ko:"삼키기 전에 충분히 씹으세요", "zh-CN":"吞咽前请充分咀嚼", "zh-TW":"吞嚥前請充分咀嚼", es:"Mastique bien antes de tragar", fr:"Bien mâcher avant d'avaler", ru:"Хорошо разжевать перед проглатыванием", ar:"امضغ الدواء جيداً قبل البلع", my:"မမြိုချမီ သေချာစွာ ဝါးပါ", vi:"Nhai kỹ trước khi nuốt", km:"ទំពាឲ្យម៉ត់មុនពេលលេប", it:"Masticare bene prima di deglutire", de:"Vor dem Schlucken gut kauen", hi:"निगलने से पहले अच्छी तरह चबाएं"},
    {key:"extra08", th:"อมใต้ลิ้น ปล่อยให้ละลายเอง ห้ามเคี้ยวหรือกลืน", ja:"舌の下に入れて自然に溶かし、噛んだり飲み込んだりしないでください", en:"Place under the tongue and let it dissolve naturally, do not chew or swallow", ko:"혀 밑에 넣고 자연스럽게 녹이세요. 씹거나 삼키지 마세요", "zh-CN":"放在舌下自然溶解，请勿咀嚼或吞咽", "zh-TW":"放在舌下自然溶解，請勿咀嚼或吞嚥", es:"Coloque debajo de la lengua y deje que se disuelva, no mastique ni trague", fr:"Placer sous la langue et laisser fondre, ne pas mâcher ni avaler", ru:"Поместить под язык до полного рассасывания, не разжевывать и не глотать", ar:"ضعه تحت اللسان واتركه يذوب، لا تمضغه أو تبتلعه", my:"လျှာအောက်တွင်ထား၍ အရည်ပျော်စေပါ၊ မဝါးပါနှင့် မမြိုချပါနှင့်", vi:"Đặt dưới lưỡi để thuốc tự tan, không nhai hoặc nuốt", km:"ដាក់ក្រោមអណ្ដាតហើយទុកឲ្យរលាយ កុំទំពាឬលេប", it:"Mettere sotto la lingua e lasciare sciogliere, non masticare né deglutire", de:"Unter die Zunge legen und zergehen lassen, nicht kauen oder schlucken", hi:"जीभ के नीचे रखें और घुलने दें, चबाएं या निगलें नहीं"},
    {key:"extra09", th:"ยานี้มีฤทธิ์ขับปัสสาวะ ควรรับประทานตอนเช้า หรือหลีกเลี่ยงการรับประทานก่อนนอน", ja:"この薬には利尿作用があるため、朝に服用するか、就寝前の服用は避けてください", en:"This medicine has a diuretic effect; take in the morning or avoid taking before bedtime", ko:"이 약은 이뇨 작용이 있으므로 아침에 복용하거나 취침 전 복용을 피하세요", "zh-CN":"此药有利尿作用，请在早晨服用，或避免在睡前服用", "zh-TW":"此藥有利尿作用，請在早晨服用，或避免在睡前服用", es:"Este medicamento tiene efecto diurético; tómelo por la mañana o evite tomarlo antes de acostarse", fr:"Ce médicament a un effet diurétique ; à prendre le matin ou éviter de le prendre avant le coucher", ru:"Это лекарство обладает мочегонным эффектом; принимайте утром или избегайте приема перед сном", ar:"هذا الدواء مدر للبول؛ تناوله في الصباح وتجنب تناوله قبل النوم", my:"ဤဆေးသည် ဆီးသွားစေသောကြောင့် မနက်ပိုင်းတွင် သောက်ပါ သို့မဟုတ် အိပ်ရာမဝင်မီ ရှောင်ပါ", vi:"Thuốc này có tác dụng lợi tiểu; nên uống vào buổi sáng hoặc tránh uống trước khi ngủ", km:"ថ្នាំនេះមានប្រសិទ្ធភាពបញ្ចុះនោម គួរពិសានៅពេលព្រឹក ឬជៀសវាងពិសាមុនពេលចូលគេង", it:"Questo farmaco ha un effetto diuretico; assumere al mattino o evitare prima di coricarsi", de:"Dieses Medikament hat eine harntreibende Wirkung; morgens einnehmen oder vor dem Schlafengehen vermeiden", hi:"इस दवा का मूत्रवर्धक प्रभाव है; सुबह लें या सोने से पहले लेने से बचें"},
    {key:"extra10", th:"ควรรับประทานยาพร้อมน้ำ 1 แก้วเต็ม และห้ามนอนราบอย่างน้อย 30 นาทีหลังรับประทานยา", ja:"コップ1杯分の水と一緒に服用し、服用後30分以上は横にならないでください", en:"Take with a full glass of water and do not lie down for at least 30 minutes after taking", ko:"물 한 컵과 함께 복용하고, 복용 후 최소 30분 동안 눕지 마세요", "zh-CN":"请用一杯水送服，服药后至少30分钟内请勿平躺", "zh-TW":"請用一杯水送服，服藥後至少30分鐘內請勿平躺", es:"Tome con un vaso lleno de agua y no se acueste durante al menos 30 minutos", fr:"Prendre avec un grand verre d'eau et ne pas s'allonger pendant au moins 30 minutes", ru:"Принимать с полным стаканом воды и не ложиться в течение как минимум 30 минут", ar:"تناول الدواء مع كوب كامل من الماء ولا تستلقِ لمدة 30 دقيقة على الأقل", my:"ရေတစ်ခွက်အပြည့်ဖြင့် သောက်ပါ၊ သောက်ပြီးနောက် မိနစ် ၃၀ အတွင်း မလှဲလျောင်းပါနှင့်", vi:"Uống với một ly nước đầy và không nằm trong ít nhất 30 phút sau khi uống", km:"ពិសាជាមួយទឹកមួយកែវពេញ ហើយកុំគេងរាបស្មើក្នុងរយៈពេល 30 នាទីបន្ទាប់ពីពិសា", it:"Assumere con un bicchiere d'acqua pieno e non sdraiarsi per almeno 30 minuti", de:"Mit einem vollen Glas Wasser einnehmen und mindestens 30 Minuten danach nicht hinlegen", hi:"एक पूरा गिलास पानी के साथ लें और दवा लेने के कम से कम 30 मिनट बाद तक न लेटें"},
    {key:"extra11", th:"รับประทานทุกวันในเวลาเดียวกัน หากลืมรับประทานให้ปฏิบัติตามเอกสารกำกับยาอย่างเคร่งครัด", ja:"毎日同じ時間に服用してください。飲み忘れた場合は添付文書の指示に厳密に従ってください", en:"Take at the same time every day. If missed, strictly follow the medication guide", ko:"매일 같은 시간에 복용하세요. 복용을 잊은 경우 약품 설명서의 지시를 엄격히 따르세요", "zh-CN":"请每天同一时间服用。如漏服，请严格按照药品说明书的指示处理", "zh-TW":"請每天同一時間服用。如漏服，請嚴格按照藥品說明書的指示處理", es:"Tome a la misma hora todos los días. Si olvida una dosis, siga estrictamente el prospecto", fr:"Prendre à la même heure tous les jours. En cas d'oubli, suivre strictement la notice", ru:"Принимать в одно и то же время каждый день. При пропуске строго следуйте инструкции", ar:"تناوله في نفس الوقت كل يوم. في حال النسيان، اتبع نشرة الدواء بدقة", my:"နေ့စဉ် အချိန်တူသောက်ပါ၊ မေ့သွားပါက ဆေးညွှန်းစာကို တိကျစွာလိုက်နာပါ", vi:"Uống vào cùng một thời điểm mỗi ngày. Nếu quên, hãy tuân thủ nghiêm ngặt hướng dẫn sử dụng", km:"ពិសានៅពេលវេលាដូចគ្នារៀងរាល់ថ្ងៃ។ ប្រសិនបើភ្លេច សូមអនុវត្តតាមការណែនាំថ្នាំឲ្យបានតឹងរ៉ឹង", it:"Assumere alla stessa ora ogni giorno. Se dimenticato, seguire scrupolosamente il foglietto", de:"Jeden Tag zur gleichen Zeit einnehmen. Bei Vergessen die Packungsbeilage streng beachten", hi:"प्रतिदिन एक ही समय पर लें। खुराक भूलने पर दवा गाइड का सख्ती से पालन करें"},
    {key:"extra12", th:"ยานี้อาจทำให้ง่วงซึม หลีกเลี่ยงการขับรถหรือทำงานที่เกี่ยวกับเครื่องจักร", ja:"この薬は眠気を引き起こすことがあるため、運転や機械操作を避けてください", en:"May cause drowsiness, avoid driving or operating machinery", ko:"졸음을 유발할 수 있으므로 운전이나 기계 조작을 피하세요", "zh-CN":"可能引起嗜睡，请避免驾驶或操作机器", "zh-TW":"可能引起嗜睡，請避免駕駛或操作機器", es:"Puede causar somnolencia, evite conducir o manejar maquinaria", fr:"Peut causer de la somnolence, éviter de conduire ou d'utiliser des machines", ru:"Может вызывать сонливость, избегайте вождения и управления механизмами", ar:"قد يسبب النعاس، تجنب القيادة أو تشغيل الآلات", my:"အိပ်ငိုက်စေနိုင်သဖြင့် ယာဉ်မောင်းခြင်း သို့မဟုတ် စက်ယန္တရားမောင်းနှင်ခြင်းကို ရှောင်ပါ", vi:"Có thể gây buồn ngủ, tránh lái xe hoặc vận hành máy móc", km:"អាចធ្វើឲ្យងងុយគេង ជៀសវាងការបើកបរ ឬបញ្ជាម៉ាស៊ីន", it:"Può causare sonnolenza, evitare di guidare o usare macchinari", de:"Kann Schläfrigkeit verursachen, Führen von Fahrzeugen oder Bedienen von Maschinen vermeiden", hi:"सुस्ती का कारण बन सकता है, वाहन चलाने या मशीनरी चलाने से बचें"},
    {key:"extra13", th:"ยานี้อาจทำให้ปัสสาวะหรืออุจจาระเปลี่ยนสี", ja:"この薬により尿や便の色が変わることがあります", en:"May cause discoloration of urine or stool", ko:"소변이나 대변의 색이 변할 수 있습니다", "zh-CN":"此药可能导致尿液或粪便变色", "zh-TW":"此藥可能導致尿液或糞便變色", es:"Puede causar decoloración de la orina o las heces", fr:"Peut modifier la couleur de l'urine ou des selles", ru:"Может вызвать изменение цвета мочи или кала", ar:"قد يسبب تغيراً في لون البول أو البراز", my:"ဆီး သို့မဟုတ် ဝမ်းအရောင် ပြောင်းလဲနိုင်သည်", vi:"Có thể làm đổi màu nước tiểu hoặc phân", km:"អាចធ្វើឲ្យទឹកនោម ឬលាមកប្រែពណ៌", it:"Può causare scolorimento delle urine o delle feci", de:"Kann zu Verfärbungen von Urin oder Stuhl führen", hi:"इससे मूत्र या मल का रंग बदल सकता है"},
    {key:"extra14", th:"ยานี้อาจทำให้มีอาการใจสั่น มือสั่น หรือคอแห้ง", ja:"この薬により動悸、手の震え、口渇が起こることがあります", en:"May cause palpitations, hand tremors, or dry mouth", ko:"두근거림, 손 떨림, 또는 구갈(입마름)을 유발할 수 있습니다", "zh-CN":"可能引起心悸、手抖或口干", "zh-TW":"可能引起心悸、手抖或口乾", es:"Puede causar palpitaciones, temblores en las manos o boca seca", fr:"Peut provoquer des palpitations, des tremblements des mains ou une sécheresse de la bouche", ru:"Может вызвать учащенное сердцебиение, тремор рук или сухость во рту", ar:"قد يسبب خفقان القلب، رجفة في اليدين، أو جفاف الفم", my:"ရင်တုန်ခြင်း၊ လက်တုန်ခြင်း သို့မဟုတ် အာခေါင်ခြောက်ခြင်း ဖြစ်စေနိုင်သည်", vi:"Có thể gây đánh trống ngực, run tay hoặc khô miệng", km:"អាចធ្វើឲ្យបេះដូងលោតញាប់ ញ័រដៃ ឬស្ងួតមាត់", it:"Può causare palpitazioni, tremori alle mani o secchezza delle fauci", de:"Kann Herzklopfen, Händezittern oder Mundtrockenheit verursachen", hi:"इससे धड़कन तेज होना, हाथ कांपना या मुंह सूखना हो सकता है"},
    {key:"extra15", th:"ห้ามดื่มเครื่องดื่มที่มีแอลกอฮอล์ระหว่างใช้ยานี้", ja:"この薬を使用している間は飲酒しないでください", en:"Do not drink alcohol while taking this medicine", ko:"이 약을 복용하는 동안 알코올을 섭취하지 마세요", "zh-CN":"服药期间请勿饮酒", "zh-TW":"服藥期間請勿飲酒", es:"No consuma alcohol mientras tome este medicamento", fr:"Ne pas boire d'alcool pendant le traitement", ru:"Не употребляйте алкоголь во время приема этого лекарства", ar:"لا تشرب الكحول أثناء استخدام هذا الدواء", my:"ဤဆေးသောက်နေစဉ် အရက်မသောက်ပါနှင့်", vi:"Không uống rượu bia trong thời gian dùng thuốc", km:"កុំផឹកគ្រឿងស្រវឹងក្នុងពេលប្រើថ្នាំនេះ", it:"Non bere alcolici durante l'assunzione di questo farmaco", de:"Während der Einnahme dieses Medikaments keinen Alkohol trinken", hi:"इस दवा को लेते समय शराब न पिएं"},
    {key:"extra16", th:"หลีกเลี่ยงการออกแดดจัดระหว่างรับประทานยานี้", ja:"この薬を服用中は強い日光を避けてください", en:"Avoid strong sunlight while taking this medicine", ko:"이 약을 복용하는 동안 강한 햇빛을 피하세요", "zh-CN":"服药期间请避免强光暴晒", "zh-TW":"服藥期間請避免強光暴曬", es:"Evite la luz solar fuerte mientras tome este medicamento", fr:"Éviter l'exposition au soleil fort pendant le traitement", ru:"Избегайте сильного солнечного света во время приема препарата", ar:"تجنب أشعة الشمس القوية أثناء تناول هذا الدواء", my:"ဤဆေးသောက်နေစဉ် ပြင်းထန်သော နေရောင်ခြည်ကို ရှောင်ပါ", vi:"Tránh ánh nắng gắt trong thời gian dùng thuốc", km:"ជៀសវាងពន្លឺថ្ងៃខ្លាំងក្នុងអំឡុងពេលប្រើថ្នាំនេះ", it:"Evitare la luce solare intensa durante l'assunzione di questo farmaco", de:"Während der Einnahme dieses Medikaments starkes Sonnenlicht vermeiden", hi:"इस दवा को लेते समय तेज धूप से बचें"},
    {key:"extra17", th:"ระวังภาวะน้ำตาลในเลือดต่ำ หากมีอาการใจสั่น เหงื่อออก มือสั่น หน้ามืด ให้รับประทานน้ำหวานหรือลูกอมทันที", ja:"低血糖に注意してください。動悸、発汗、手の震え、めまいがあれば、すぐに甘い飲み物やあめを摂ってください", en:"Beware of hypoglycemia. If experiencing palpitations, sweating, tremors, or dizziness, consume a sweet drink or candy immediately", ko:"저혈당에 주의하세요. 두근거림, 발한, 손 떨림, 어지럼증이 있으면 즉시 단 음료나 사탕을 드세요", "zh-CN":"注意低血糖风险。若出现心悸、出汗、手抖或头晕，请立即补充糖水或糖果", "zh-TW":"注意低血糖風險。若出現心悸、出汗、手抖或頭暈，請立即補充糖水或糖果", es:"Atención a la hipoglucemia. Si presenta palpitaciones, sudoración, temblores o mareos, consuma dulces o bebidas de inmediato", fr:"Attention à l'hypoglycémie. En cas de palpitations, sueurs, tremblements ou vertiges, consommez une boisson sucrée ou un bonbon", ru:"Остерегайтесь гипогликемии. При учащенном сердцебиении, потливости, треморе или головокружении выпейте сладкий напиток", ar:"احذر من نقص السكر. إذا شعرت بخفقان، تعرق، رجفة، أو دوار، تناول مشروباً محلى أو حلوى فوراً", my:"သွေးတွင်းသကြားဓာတ်ကျဆင်းမှုကို သတိပြုပါ။ ရင်တုန်၊ ချွေးထွက်၊ မူးဝေပါက အချိုရည် ချက်ချင်းသောက်ပါ", vi:"Đề phòng hạ đường huyết. Nếu đánh trống ngực, đổ mồ hôi, run tay, hãy dùng ngay đồ uống ngọt", km:"ប្រយ័ត្នជាតិស្ករក្នុងឈាមចុះទាប។ បើមានអាការៈបេះដូងលោតញាប់ បែកញើស វិលមុខ សូមពិសាទឹកផ្អែមភ្លាមៗ", it:"Attenzione all'ipoglicemia. In caso di palpitazioni, sudorazione, tremori o vertigini, consumare una bevanda dolce", de:"Achtung vor Unterzuckerung. Bei Herzklopfen, Schwitzen, Zittern oder Schwindel sofort ein süßes Getränk zu sich nehmen", hi:"हाइपोग्लाइसीमिया से सावधान रहें। यदि धड़कन तेज हो, पसीना आए, चक्कर आए, तो तुरंत कुछ मीठा पिएं"},
    {key:"extra18", th:"ระวังภาวะเลือดออกผิดปกติ หากมีจ้ำเลือดตามตัว หรืออุจจาระมีสีดำหรือปนเลือด ให้รีบพบแพทย์", ja:"異常な出血に注意してください。あざができたり、便が黒色や血便になった場合は、すぐに医師の診察を受けてください", en:"Beware of abnormal bleeding. If bruising, black or bloody stool occurs, see a doctor immediately", ko:"비정상적인 출혈에 주의하세요. 멍이 들거나 흑색 변 또는 혈변이 나타나면 즉시 의사의 진찰을 받으세요", "zh-CN":"注意异常出血风险。如出现瘀伤、黑便或血便，请立即就医", "zh-TW":"注意異常出血風險。如出現瘀傷、黑便或血便，請立即就醫", es:"Cuidado con sangrados anormales. Si aparecen moretones o heces negras/con sangre, acuda al médico de inmediato", fr:"Attention aux saignements anormaux. En cas d'ecchymoses, de selles noires ou sanglantes, consultez un médecin immédiatement", ru:"Остерегайтесь кровотечений. При появлении синяков, черного или кровянистого стула обратитесь к врачу", ar:"احذر من النزيف غير الطبيعي. إذا ظهرت كدمات، أو براز أسود أو دموي، راجع الطبيب فوراً", my:"သွေးထွက်လွန်ခြင်းကို သတိပြုပါ။ ပွန်းပဲ့ဒဏ်ရာ၊ ဝမ်းမည်း သို့မဟုတ် သွေးပါပါက ဆရာဝန်နှင့် ချက်ချင်းပြသပါ", vi:"Đề phòng chảy máu bất thường. Nếu bị bầm tím, phân đen hoặc có máu, hãy đi khám bác sĩ ngay", km:"ប្រយ័ត្នការហូរឈាមខុសធម្មតា។ បើមានស្នាមជាំ លាមកពណ៌ខ្មៅ ឬមានឈាម សូមប្រញាប់ទៅជួបគ្រូពេទ្យ", it:"Attenzione a sanguinamenti anomali. In caso di lividi, feci nere o con sangue, consultare un medico", de:"Achten Sie auf Blutungen. Bei Blutergüssen, schwarzem oder blutigem Stuhl sofort Arzt aufsuchen", hi:"असामान्य रक्तस्राव से सावधान रहें। यदि शरीर पर नीले निशान पड़ें या मल काला/खून वाला हो, तो तुरंत डॉक्टर से मिलें"},
    {key:"extra19", th:"ยานี้อาจทำให้เอ็นร้อยหวายอักเสบหรือฉีกขาด หากมีอาการปวดบวมบริเวณเอ็นให้หยุดยา", ja:"この薬によりアキレス腱炎や腱断裂が起こることがあります。腱の痛みや腫れがあれば服用を中止してください", en:"May cause Achilles tendinitis or tendon rupture. If experiencing tendon pain or swelling, stop taking", ko:"아킬레스건염이나 힘줄 파열을 유발할 수 있습니다. 힘줄에 통증이나 부기가 있으면 복용을 중단하세요", "zh-CN":"可能引起跟腱炎或肌腱断裂。如出现肌腱疼痛或肿胀，请停药", "zh-TW":"可能引起跟腱炎或肌腱斷裂。如出現肌腱疼痛或腫脹，請停藥", es:"Puede causar tendinitis de Aquiles. Si experimenta dolor o hinchazón en el tendón, suspenda el uso", fr:"Peut provoquer une tendinite d'Achille. En cas de douleur ou de gonflement du tendon, arrêtez le traitement", ru:"Может вызвать тендинит. При боли или отеке сухожилия прекратите прием", ar:"قد يسبب التهاب وتر أخيل. إذا شعرت بألم أو تورم في الوتر، أوقف الدواء", my:"အရွတ်ရောင်ခြင်း ဖြစ်စေနိုင်ပါသည်။ အရွတ်နာကျင် ရောင်ရမ်းပါက ဆေးရပ်ပါ", vi:"Có thể gây viêm gân gót. Nếu bị đau hoặc sưng gân, hãy ngưng dùng thuốc", km:"អាចបណ្តាលឲ្យរលាកសរសៃពួរ។ បើមានការឈឺចាប់ ឬហើមសរសៃពួរ សូមឈប់ប្រើថ្នាំ", it:"Può causare tendinite di Achille. In caso di dolore o gonfiore al tendine, interrompere l'assunzione", de:"Kann Achillessehnenentzündung verursachen. Bei Sehnenschmerzen Einnahme abbrechen", hi:"इससे एच्लीस टेंडिनाइटिस हो सकता है। यदि टेंडन में दर्द या सूजन हो, तो दवा बंद कर दें"},
    {key:"extra20", th:"ห้ามรับประทานพร้อมนม ยาลดกรด ยาบำรุงเลือด หรือแคลเซียม ควรรับประทานห่างกันอย่างน้อย 2 ชั่วโมง", ja:"牛乳、制酸剤、鉄剤、カルシウム剤とは同時に服用せず、2時間以上間隔をあけてください", en:"Do not take simultaneously with milk, antacids, iron, or calcium; separate by at least 2 hours", ko:"우유, 제산제, 철분제, 칼슘제와 2시간 이상 간격을 두고 복용하세요", "zh-CN":"请勿与牛奶、抗酸药、铁剂或钙剂同服，至少间隔2小时", "zh-TW":"請勿與牛奶、抗酸藥、鐵劑或鈣劑同服，至少間隔2小時", es:"No tome simultáneamente con leche, antiácidos, hierro o calcio; separe por al menos 2 horas", fr:"Ne pas prendre avec du lait, antiacides, fer ou calcium ; espacer d'au moins 2 heures", ru:"Не принимать с молоком, антацидами, железом или кальцием; интервал не менее 2 часов", ar:"لا تتناوله مع الحليب، مضادات الحموضة، الحديد أو الكالسيوم؛ اترك فاصلاً ساعتين على الأقل", my:"နွားနို့၊ အစာအိမ်ဆေး၊ သွေးအားဆေး၊ ကယ်လ်စီယမ်တို့နှင့် အနည်းဆုံး ၂ နာရီ ခြားသောက်ပါ", vi:"Không uống cùng sữa, thuốc kháng axit, sắt hoặc canxi; cách nhau ít nhất 2 giờ", km:"កុំពិសាជាមួយទឹកដោះគោ ថ្នាំក្រពះ ថ្នាំជាតិដែក ឬកាល់ស្យូម គួរទុកចន្លោះយ៉ាងហោចណាស់ 2 ម៉ោង", it:"Non assumere con latte, antiacidi, ferro o calcio; separare di almeno 2 ore", de:"Nicht mit Milch, Antazida, Eisen oder Kalzium einnehmen; mindestens 2 Stunden Abstand", hi:"दूध, एंटासिड, आयरन या कैल्शियम के साथ न लें; कम से कम 2 घंटे का अंतर रखें"},
    {key:"extra21", th:"ห้ามรับประทานร่วมกับน้ำเกรปฟรุต", ja:"グレープフルーツジュースと一緒に服用しないでください", en:"Do not take with grapefruit juice", ko:"자몽 주스와 함께 복용하지 마세요", "zh-CN":"请勿与葡萄柚汁同服", "zh-TW":"請勿與葡萄柚汁同服", es:"No tome con jugo de pomelo (toronja)", fr:"Ne pas prendre avec du jus de pamplemousse", ru:"Не принимать с грейпфрутовым соком", ar:"لا تتناوله مع عصير الجريب فروت", my:"ဂရိတ်ဖရုဖျော်ရည်နှင့် တွဲမသောက်ပါနှင့်", vi:"Không uống cùng nước ép bưởi", km:"កុំពិសាជាមួយទឹកក្រូចថ្លុង", it:"Non assumere con succo di pompelmo", de:"Nicht mit Grapefruitsaft einnehmen", hi:"अंगूर के रस (ग्रेपफ्रूट जूस) के साथ न लें"},
    {key:"extra22", th:"ห้ามใช้ยานี้ร่วมกับยาขยายหลอดเลือดกลุ่ม Nitrate เด็ดขาด", ja:"硝酸剤（ニトログリセリン等）との併用は絶対に避けてください", en:"Strictly avoid concurrent use with Nitrate vasodilators", ko:"질산염계 혈관확장제와 절대 병용하지 마세요", "zh-CN":"严禁与硝酸酯类血管扩张剂合用", "zh-TW":"嚴禁與硝酸酯類血管擴張劑合用", es:"Evite estrictamente el uso concurrente con vasodilatadores de nitrato", fr:"Éviter strictement l'utilisation concomitante avec des vasodilatateurs nitrés", ru:"Строго избегайте одновременного применения с нитратными вазодилататорами", ar:"تجنب تماماً الاستخدام المتزامن مع موسعات الأوعية الدموية من نوع النترات", my:"နိုက်ထရိတ် သွေးကြောကျယ်ဆေးများနှင့် တွဲသုံးခြင်းကို လုံးဝရှောင်ကြဉ်ပါ", vi:"Tuyệt đối tránh dùng chung với thuốc giãn mạch nhóm Nitrate", km:"ហាមប្រើថ្នាំនេះរួមជាមួយថ្នាំពង្រីកសរសៃឈាមក្រុម Nitrate ដាច់ខាត", it:"Evitare rigorosamente l'uso concomitante con vasodilatatori nitrati", de:"Gleichzeitige Anwendung mit Nitrat-Vasodilatatoren strengstens vermeiden", hi:"नाइट्रेट वासोडिलेटर दवाओं के साथ इसके उपयोग से सख्ती से बचें"},
    {key:"extra23", th:"หลีกเลี่ยงการรับประทานอาหารที่มีโพแทสเซียมสูง", ja:"カリウムを多く含む食品の摂取は避けてください", en:"Avoid consuming foods high in potassium", ko:"칼륨이 많이 함유된 식품 섭취를 피하세요", "zh-CN":"避免食用高钾食物", "zh-TW":"避免食用高鉀食物", es:"Evite consumir alimentos ricos en potasio", fr:"Évitez de consommer des aliments riches en potassium", ru:"Избегайте употребления продуктов с высоким содержанием калия", ar:"تجنب تناول الأطعمة الغنية بالبوتاسيوم", my:"ပိုတက်ဆီယမ်များသော အစားအစာများကို ရှောင်ပါ", vi:"Tránh ăn thực phẩm có hàm lượng kali cao", km:"ជៀសវាងការបរិភោគអាហារដែលមានប៉ូតាស្យូមខ្ពស់", it:"Evitare di consumare cibi ricchi di potassio", de:"Vermeiden Sie den Verzehr von kaliumreichen Lebensmitteln", hi:"पोटेशियम युक्त खाद्य पदार्थों के सेवन से बचें"},
    {key:"extra24", th:"หากมีอาการ ผื่นแดง พุพอง ลอก บริเวณผิวหนังหรือเยื่อบุ ให้หยุดยาและรีบพบแพทย์ทันที", ja:"皮膚や粘膜に赤い発疹、水疱、剥離が現れた場合は、直ちに服用を中止し、すぐに医師の診察を受けてください", en:"If red rash, blisters, or peeling occurs on skin or mucous membranes, stop taking and see a doctor immediately", ko:"피부나 점막에 붉은 발진, 수포, 벗겨짐이 나타나면 즉시 복용을 중단하고 의사의 진찰을 받으세요", "zh-CN":"如果皮肤或黏膜出现红疹、水泡或脱皮，请立即停药并就医", "zh-TW":"如果皮膚或黏膜出現紅疹、水泡或脫皮，請立即停藥並就醫", es:"Si aparece sarpullido rojo, ampollas o descamación en la piel o mucosas, suspenda el uso y acuda al médico de inmediato", fr:"Si une éruption rouge, des cloques ou une desquamation apparaissent sur la peau ou les muqueuses, arrêtez et consultez immédiatement", ru:"Если на коже или слизистых появилась красная сыпь, волдыри или шелушение, немедленно прекратите прием и обратитесь к врачу", ar:"إذا ظهر طفح جلدي أحمر، بثور، أو تقشر على الجلد أو الأغشية المخاطية، أوقف الدواء وراجع الطبيب فوراً", my:"အရေပြား သို့မဟုတ် အမြှေးပါးတွင် အနီကွက်၊ အရည်ကြည်ဖု၊ အရေခွံကွာခြင်း ဖြစ်ပါက ဆေးရပ်ပြီး ဆရာဝန်နှင့် ချက်ချင်းပြပါ", vi:"Nếu xuất hiện phát ban đỏ, mụn nước hoặc bong tróc trên da/niêm mạc, hãy ngưng thuốc và đi khám ngay", km:"បើមានកន្ទួលក្រហម ពងបែក ឬរបកស្បែក សូមឈប់ប្រើថ្នាំ ហើយប្រញាប់ទៅជួបពេទ្យ", it:"In caso di eruzione cutanea, vesciche o desquamazione su pelle o mucose, interrompere l'uso e consultare subito un medico", de:"Bei rotem Ausschlag, Blasenbildung oder Hautabschälung Einnahme abbrechen und sofort einen Arzt aufsuchen", hi:"यदि त्वचा या श्लेष्मा पर लाल चकत्ते, फफोले या छिलने की समस्या हो, तो दवा रोक दें और तुरंत डॉक्टर को दिखाएं"},
    {key:"extra25", th:"ยานี้อาจทำให้เกิดความผิดปกติของทารกในครรภ์ ห้ามใช้ในสตรีมีครรภ์หรือผู้ที่วางแผนจะตั้งครรภ์เด็ดขาด", ja:"この薬は胎児に異常を引き起こす可能性があるため、妊婦または妊娠を計画している方は絶対に使用しないでください", en:"May cause fetal abnormalities. Do not use if pregnant or planning to become pregnant", ko:"태아 기형을 유발할 수 있습니다. 임산부나 임신을 계획 중인 여성은 절대 사용하지 마세요", "zh-CN":"可能导致胎儿畸形。孕妇或备孕妇女严禁使用", "zh-TW":"可能導致胎兒畸形。孕婦或備孕婦女嚴禁使用", es:"Puede causar anomalías fetales. No usar si está embarazada o planea estarlo", fr:"Peut causer des anomalies fœtales. Ne pas utiliser si vous êtes enceinte ou prévoyez de l'être", ru:"Может вызвать аномалии плода. Не применять беременным и планирующим беременность", ar:"قد يسبب تشوهات للجنين. يُمنع استخدامه للحوامل أو من يخططن للحمل", my:"သန္ဓေသားချို့ယွင်းမှု ဖြစ်စေနိုင်သည်။ ကိုယ်ဝန်ဆောင် သို့မဟုတ် ကိုယ်ဝန်ယူရန် စီစဉ်နေသူများ လုံးဝမသုံးရ", vi:"Có thể gây dị tật thai nhi. Phụ nữ có thai hoặc đang lên kế hoạch mang thai tuyệt đối không dùng", km:"អាចបណ្តាលឲ្យទារកក្នុងផ្ទៃខុសប្រក្រតី ហាមប្រើដាច់ខាតចំពោះស្រ្តីមានផ្ទៃពោះ ឬអ្នកមានគម្រោងមានផ្ទៃពោះ", it:"Può causare anomalie fetali. Non usare se incinta o si pianifica una gravidanza", de:"Kann fetale Anomalien verursachen. Nicht verwenden, wenn Sie schwanger sind oder eine Schwangerschaft planen", hi:"भ्रूण में असामान्यताएं हो सकती हैं। यदि आप गर्भवती हैं या गर्भधारण की योजना बना रही हैं तो इसका उपयोग न करें"},
    {key:"extra26", th:"ยาอันตราย", ja:"危険薬", en:"Dangerous drug", ko:"위험 약물", "zh-CN":"危险药品", "zh-TW":"危險藥品", es:"Medicamento peligroso", fr:"Médicament dangereux", ru:"Опасный препарат", ar:"دواء خطير", my:"အန္တရာယ်ရှိသောဆေး", vi:"Thuốc nguy hiểm", km:"ថ្នាំគ្រោះថ្នាក់", it:"Farmaco pericoloso", de:"Gefährliches Medikament", hi:"खतरनाक दवा"},
    {key:"extra27", th:"ยาควบคุมพิเศษ", ja:"特別管理医薬品", en:"Specially controlled drug", ko:"특별 관리 의약품", "zh-CN":"特殊管制药品", "zh-TW":"特殊管制藥品", es:"Medicamento especialmente controlado", fr:"Médicament sous contrôle spécial", ru:"Препарат особого контроля", ar:"دواء خاضع لرقابة خاصة", my:"အထူးထိန်းချုပ်ဆေး", vi:"Thuốc kiểm soát đặc biệt", km:"ថ្នាំគ្រប់គ្រងពិសេស", it:"Farmaco a controllo speciale", de:"Speziell kontrolliertes Medikament", hi:"विशेष रूप से नियंत्रित दवा"},
    {key:"extra28", th:"ยาใช้ภายนอก ห้ามรับประทาน", ja:"外用薬（内服しないでください）", en:"For external use only, do not take orally", ko:"외용제 (먹지 마세요)", "zh-CN":"外用药，严禁口服", "zh-TW":"外用藥，嚴禁口服", es:"Solo para uso externo, no ingerir", fr:"Pour usage externe uniquement, ne pas avaler", ru:"Только для наружного применения, не принимать внутрь", ar:"للاستعمال الخارجي فقط، لا يُبلع", my:"ပြင်ပသုံးရန်သာ၊ မသောက်ရ", vi:"Thuốc dùng ngoài, không được uống", km:"ថ្នាំប្រើខាងក្រៅ ហាមលេប", it:"Solo per uso esterno, non ingerire", de:"Nur zur äußerlichen Anwendung, nicht einnehmen", hi:"केवल बाहरी उपयोग के लिए, खाएं नहीं"},
    {key:"extra29", th:"ทายาบางๆ บริเวณที่มีอาการ", ja:"症状のある部位に薄く塗ってください", en:"Apply thinly to the affected area", ko:"증상이 있는 부위에 얇게 바르세요", "zh-CN":"薄涂于患处", "zh-TW":"薄塗於患處", es:"Aplique una capa fina en la zona afectada", fr:"Appliquer en couche fine sur la zone affectée", ru:"Наносить тонким слоем на пораженный участок", ar:"ضعه بطبقة رقيقة على المنطقة المصابة", my:"ရောဂါဖြစ်သည့်နေရာကို ပါးပါးလိမ်းပါ", vi:"Thoa một lớp mỏng lên vùng bị bệnh", km:"លាបស្តើងៗលើកន្លែងដែលមានអាការៈ", it:"Applicare in strato sottile sulla zona interessata", de:"Dünn auf die betroffene Stelle auftragen", hi:"प्रभावित क्षेत्र पर पतली परत लगाएं"},
    {key:"extra30", th:"ทำความสะอาดแผลก่อนทายา", ja:"塗る前に傷口を清潔にしてください", en:"Clean the wound before applying", ko:"바르기 전에 상처 부위를 깨끗이 하세요", "zh-CN":"涂药前请清洁伤口", "zh-TW":"塗藥前請清潔傷口", es:"Limpie la herida antes de aplicar", fr:"Nettoyer la plaie avant application", ru:"Очистить рану перед нанесением", ar:"نظف الجرح قبل وضع الدواء", my:"ဆေးမလိမ်းမီ ဒဏ်ရာကို သန့်စင်ပါ", vi:"Làm sạch vết thương trước khi thoa thuốc", km:"លាងសម្អាតមុខរបួសមុនពេលលាបថ្នាំ", it:"Pulire la ferita prima dell'applicazione", de:"Wunde vor dem Auftragen reinigen", hi:"लगाने से पहले घाव को साफ करें"},
    {key:"extra31", th:"ล้างมือให้สะอาดก่อนและหลังใช้ยา", ja:"薬を使用する前後に手をよく洗ってください", en:"Wash hands thoroughly before and after use", ko:"사용 전후에 손을 깨끗이 씻으세요", "zh-CN":"用药前后请洗净双手", "zh-TW":"用藥前後請洗淨雙手", es:"Lávese bien las manos antes y después de usar", fr:"Se laver soigneusement les mains avant et après utilisation", ru:"Тщательно вымыть руки до и после использования", ar:"اغسل يديك جيداً قبل وبعد الاستخدام", my:"ဆေးမသုံးမီနှင့် သုံးပြီးနောက် လက်ကိုစင်ကြယ်စွာဆေးပါ", vi:"Rửa tay sạch trước và sau khi dùng thuốc", km:"លាងដៃឲ្យស្អាតមុន និងក្រោយពេលប្រើថ្នាំ", it:"Lavarsi accuratamente le mani prima e dopo l'uso", de:"Hände vor und nach Gebrauch gründlich waschen", hi:"उपयोग से पहले और बाद में हाथ अच्छी तरह धोएं"},
    {key:"extra32", th:"อมกลั้วคอและบ้วนทิ้ง ห้ามกลืน", ja:"口に含んでうがいをし、吐き出してください。飲み込まないでください", en:"Gargle and spit out, do not swallow", ko:"가글 후 뱉어내고, 삼키지 마세요", "zh-CN":"含漱后吐出，请勿吞咽", "zh-TW":"含漱後吐出，請勿吞嚥", es:"Haga gárgaras y escupa, no trague", fr:"Se gargariser et cracher, ne pas avaler", ru:"Полоскать горло и выплюнуть, не глотать", ar:"تغرغر وابصق الدواء، لا تبتلعه", my:"ငုံ၍ပလုတ်ကျင်းပြီး ထွေးထုတ်ပါ၊ မမြိုချရ", vi:"Súc họng rồi nhổ ra, không được nuốt", km:"ខ្ពុរមាត់ហើយខ្ជាក់ចោល ហាមលេប", it:"Fare i gargarismi e sputare, non deglutire", de:"Gurgeln und ausspucken, nicht schlucken", hi:"गरारे करें और थूक दें, निगलें नहीं"},
    {key:"extra33", th:"กลั้วคอและบ้วนปากด้วยน้ำสะอาดทุกครั้งหลังพ่นยา เพื่อป้องกันเชื้อราในช่องปาก", ja:"口腔内カンジダを防ぐため、吸入後は毎回きれいな水でうがいをしてください", en:"Gargle and rinse mouth with clean water after each inhalation to prevent oral thrush", ko:"구강 칸디다증 예방을 위해 흡입 후 매번 깨끗한 물로 입안을 헹구세요", "zh-CN":"每次吸入后请用清水漱口，以防口腔真菌感染", "zh-TW":"每次吸入後請用清水漱口，以防口腔真菌感染", es:"Enjuáguese la boca con agua limpia después de cada inhalación para prevenir candidiasis", fr:"Se rincer la bouche à l'eau claire après chaque inhalation pour éviter les mycoses", ru:"Полоскать рот чистой водой после каждой ингаляции для профилактики кандидоза", ar:"تمضمض بماء نظيف بعد كل بخة لتجنب الفطريات في الفم", my:"မှိုရောဂါကာကွယ်ရန် ဆေးရှူပြီးတိုင်း ရေသန့်ဖြင့်ပလုတ်ကျင်းပါ", vi:"Súc miệng bằng nước sạch sau mỗi lần xịt hít để phòng nấm miệng", km:"ខ្ពុរមាត់ជាមួយទឹកស្អាតរាល់ពេលក្រោយបាញ់ថ្នាំ ដើម្បីការពារមេរោគផ្សិត", it:"Sciacquare la bocca con acqua dopo ogni inalazione per prevenire la candida orale", de:"Nach jeder Inhalation Mund mit klarem Wasser ausspülen, um Pilzbefall vorzubeugen", hi:"ओरल थ्रश से बचने के लिए प्रत्येक इनहेलेशन के बाद साफ पानी से कुल्ला करें"},
    {key:"extra34", th:"แปะแผ่นยาบริเวณที่ผิวหนังแห้ง สะอาด ไม่มีขน และหมุนเวียนตำแหน่งที่แปะยาทุกครั้ง", ja:"乾燥して清潔な、体毛のない皮膚に貼り、毎回貼る位置を変えてください", en:"Apply patch to clean, dry, hairless skin and rotate application site each time", ko:"건조하고 깨끗하며 털이 없는 피부에 붙이고, 매번 붙이는 위치를 바꾸세요", "zh-CN":"贴于清洁、干燥、无毛发的皮肤上，且每次更换贴敷位置", "zh-TW":"貼於清潔、乾燥、無毛發的皮膚上，且每次更換貼敷位置", es:"Aplique el parche sobre piel limpia, seca y sin vello, y rote el sitio de aplicación", fr:"Appliquer le patch sur une peau propre, sèche, sans poils, et changer de site à chaque fois", ru:"Наносить пластырь на чистую, сухую кожу без волос, чередуя места наклеивания", ar:"ضع اللصقة على بشرة نظيفة وجافة وخالية من الشعر، وغيّر مكانها في كل مرة", my:"သန့်ရှင်းခြောက်သွေ့၍ အမွှေးမရှိသော အရေပြားတွင်ကပ်ပါ၊ ကပ်သည့်နေရာ နေရာပြောင်းပါ", vi:"Dán lên da sạch, khô, không có lông và luân phiên vị trí dán mỗi lần", km:"បិទលើស្បែកស្ងួត ស្អាត គ្មានរោម និងប្តូរកន្លែងបិទជារៀងរាល់ដង", it:"Applicare il cerotto su pelle pulita, asciutta e senza peli, ruotando il sito di applicazione", de:"Pflaster auf saubere, trockene, haarlose Haut kleben und Klebestelle jedes Mal wechseln", hi:"पैच को साफ, सूखी, बाल रहित त्वचा पर लगाएं और हर बार लगाने की जगह बदलें"},
    {key:"extra35", th:"ทิ้งระยะห่างในการหยอดตาแต่ละชนิดอย่างน้อย 5 นาที", ja:"複数の点眼薬を使用する場合は、それぞれ5分以上間隔をあけてください", en:"Leave at least a 5-minute interval between different eye drops", ko:"여러 점안액을 사용할 경우 최소 5분 간격을 두세요", "zh-CN":"使用不同眼药水时，请至少间隔5分钟", "zh-TW":"使用不同眼藥水時，請至少間隔5分鐘", es:"Deje al menos 5 minutos de intervalo entre diferentes gotas para los ojos", fr:"Laisser au moins 5 minutes d'intervalle entre les différents collyres", ru:"Соблюдайте интервал не менее 5 минут между применением разных глазных капель", ar:"اترك فاصلاً لا يقل عن 5 دقائق بين كل نوع من قطرات العين", my:"မျက်စဉ်းတစ်မျိုးနှင့်တစ်မျိုး အနည်းဆုံး ၅ မိနစ် ခြား၍ ခတ်ပါ", vi:"Cách nhau ít nhất 5 phút khi dùng các loại thuốc nhỏ mắt khác nhau", km:"ទុកចន្លោះយ៉ាងហោចណាស់ 5 នាទី ពេលបន្តក់ថ្នាំភ្នែកច្រើនប្រភេទ", it:"Lasciare un intervallo di almeno 5 minuti tra colliri diversi", de:"Mindestens 5 Minuten Abstand zwischen verschiedenen Augentropfen einhalten", hi:"विभिन्न आई ड्रॉप्स के बीच कम से कम 5 मिनट का अंतर रखें"},
    {key:"extra36", th:"เก็บในตู้เย็นช่องธรรมดา 2-8 องศาเซลเซียส ห้ามแช่แข็ง", ja:"冷蔵庫（2〜8°Cの冷蔵室）で保管し、凍結させないでください", en:"Store in refrigerator at 2-8°C, do not freeze", ko:"냉장고(2~8°C)에 보관하고 얼리지 마세요", "zh-CN":"置于冰箱冷藏（2-8°C）保存，严禁冷冻", "zh-TW":"置於冰箱冷藏（2-8°C）保存，嚴禁冷凍", es:"Conservar en refrigerador a 2-8°C, no congelar", fr:"Conserver au réfrigérateur entre 2 et 8°C, ne pas congeler", ru:"Хранить в холодильнике при 2-8°C, не замораживать", ar:"يُحفظ في الثلاجة (2-8 درجات مئوية)، لا يُجمد", my:"ရေခဲသေတ္တာ (၂-၈ ဒီဂရီစင်တီဂရိတ်) တွင်ထားပါ၊ အခဲမခံရ", vi:"Bảo quản trong ngăn mát tủ lạnh 2-8°C, không để đông đá", km:"ទុកក្នុងទូទឹកកកសីតុណ្ហភាព 2-8°C ហាមដាក់ឲ្យកក", it:"Conservare in frigorifero a 2-8°C, non congelare", de:"Im Kühlschrank bei 2-8°C aufbewahren, nicht einfrieren", hi:"फ्रिज में 2-8°C पर स्टोर करें, जमाएं नहीं"},
    {key:"extra37", th:"เก็บให้พ้นแสงแดดและความชื้น", ja:"直射日光と湿気を避けて保管してください", en:"Protect from direct sunlight and moisture", ko:"직사광선과 습기를 피해 보관하세요", "zh-CN":"避光防潮保存", "zh-TW":"避光防潮保存", es:"Proteger de la luz solar directa y la humedad", fr:"Conserver à l'abri de la lumière directe du soleil et de l'humidité", ru:"Беречь от прямых солнечных лучей и влаги", ar:"يُحفظ بعيداً عن أشعة الشمس المباشرة والرطوبة", my:"နေရောင်နှင့် စိုစွတ်မှုမှ ကင်းဝေးအောင်ထားပါ", vi:"Bảo quản tránh ánh nắng trực tiếp và nơi ẩm ướt", km:"ទុកឲ្យឆ្ងាយពីពន្លឺថ្ងៃ និងកន្លែងសើម", it:"Proteggere dalla luce solare diretta e dall'umidità", de:"Vor direkter Sonneneinstrahlung und Feuchtigkeit schützen", hi:"सीधी धूप और नमी से बचाएं"},
    {key:"extra38", th:"ยามีอายุ 30 วันหลังจากเปิดใช้ครั้งแรก", ja:"開封後30日以内に使用してください", en:"Discard 30 days after first opening", ko:"개봉 후 30일 이내에 사용하세요", "zh-CN":"首次开封后30天内有效", "zh-TW":"首次開封後30天內有效", es:"Desechar 30 días después de la primera apertura", fr:"Jeter 30 jours après la première ouverture", ru:"Срок годности 30 дней после первого вскрытия", ar:"تنتهي صلاحيته بعد 30 يوماً من فتح العبوة لأول مرة", my:"ပထမဆုံးဖွင့်ပြီး ရက် ၃၀ အတွင်းသာ သုံးပါ", vi:"Thuốc có hạn dùng 30 ngày sau khi mở nắp lần đầu", km:"ថ្នាំអាចប្រើបាន 30 ថ្ងៃបន្ទាប់ពីបើកប្រើដំបូង", it:"Eliminare dopo 30 giorni dalla prima apertura", de:"Nach dem ersten Öffnen innerhalb von 30 Tagen verbrauchen", hi:"पहली बार खोलने के 30 दिन बाद दवा फेंक दें"},
    {key:"extra39", th:"ยามีอายุ 14 วันหลังจากผสมน้ำ", ja:"水に溶かした後は14日以内に使用してください", en:"Discard 14 days after mixing with water", ko:"물에 섞은 후 14일 이내에 사용하세요", "zh-CN":"加水混合后14天内有效", "zh-TW":"加水混合後14天內有效", es:"Desechar 14 días después de mezclar con agua", fr:"Jeter 14 jours après le mélange avec l'eau", ru:"Использовать в течение 14 дней после разведения водой", ar:"صالح لمدة 14 يوماً بعد خلطه بالماء", my:"ရေနှင့်ဖျော်ပြီး ၁၄ ရက်အတွင်းသာ သုံးပါ", vi:"Sử dụng trong vòng 14 ngày sau khi pha với nước", km:"ថ្នាំអាចប្រើបាន 14 ថ្ងៃបន្ទាប់ពីលាយទឹក", it:"Eliminare 14 giorni dopo la miscelazione con acqua", de:"Nach dem Mischen mit Wasser innerhalb von 14 Tagen aufbrauchen", hi:"पानी मिलाने के 14 दिन बाद दवा फेंक दें"},
    {key:"extra40", th:"ยาอมใต้ลิ้นขยายหลอดเลือดมีอายุ 6 เดือนหลังจากเปิดขวด", ja:"舌下錠（血管拡張薬）は開封後6ヶ月以内に使用してください", en:"Sublingual vasodilator tablets expire 6 months after opening", ko:"혈관확장용 설하정은 개봉 후 6개월 이내에 사용하세요", "zh-CN":"血管扩张舌下片开封后6个月内有效", "zh-TW":"血管擴張舌下片開封後6個月內有效", es:"Las tabletas sublinguales vasodilatadoras caducan 6 meses después de abrirse", fr:"Les comprimés vasodilatateurs sublinguaux expirent 6 mois après ouverture", ru:"Срок годности сублингвальных вазодилататоров — 6 месяцев после вскрытия", ar:"تنتهي صلاحية أقراص تحت اللسان الموسعة للأوعية بعد 6 أشهر من الفتح", my:"သွေးကြောကျယ် လျှာအောက်ဆေးသည် ဖွင့်ပြီး ၆ လအထိသာ အသုံးပြုနိုင်သည်", vi:"Viên ngậm dưới lưỡi giãn mạch có hạn 6 tháng sau khi mở lọ", km:"ថ្នាំក្រោមអណ្ដាតពង្រីកសរសៃឈាម ប្រើបាន 6 ខែក្រោយពីបើកដប", it:"Le compresse sublinguali vasodilatatrici scadono 6 mesi dopo l'apertura", de:"Sublinguale gefäßerweiternde Tabletten sind nach dem Öffnen 6 Monate haltbar", hi:"सब्लिंगुअल वासोडिलेटर गोलियां खोलने के 6 महीने बाद समाप्त हो जाती हैं"},
    {key:"extra41", th:"ละลายน้ำก่อนรับประทาน", ja:"水に溶かしてから服用してください", en:"Dissolve in water before taking", ko:"물에 녹여서 복용하세요", "zh-CN":"服药前请先溶于水中", "zh-TW":"服藥前請先溶於水中", es:"Disolver en agua antes de tomar", fr:"Dissoudre dans l'eau avant de prendre", ru:"Растворить в воде перед приемом", ar:"يُذاب في الماء قبل التناول", my:"ရေတွင်ဖျော်၍ သောက်ပါ", vi:"Hòa tan trong nước trước khi uống", km:"រំលាយក្នុងទឹកមុនពេលពិសា", it:"Sciogliere in acqua prima di assumere", de:"Vor der Einnahme in Wasser auflösen", hi:"लेने से पहले पानी में घोलें"},
    {key:"extra42", th:"ห้ามทายาติดต่อกันนานเกิน 14 วัน", ja:"14日を超えて連続使用しないでください", en:"Do not apply continuously for more than 14 days", ko:"14일 이상 연속으로 바르지 마세요", "zh-CN":"请勿连续使用超过14天", "zh-TW":"請勿連續使用超過14天", es:"No aplicar continuamente durante más de 14 días", fr:"Ne pas appliquer en continu pendant plus de 14 jours", ru:"Не применять непрерывно более 14 дней", ar:"لا يُستخدم بشكل متواصل لأكثر من 14 يومًا", my:"14 ရက်ထက်ပို၍ ဆက်တိုက်မလိမ်းပါနှင့်", vi:"Không thoa liên tục quá 14 ngày", km:"កុំលាបជាប់គ្នាលើសពី 14 ថ្ងៃ", it:"Non applicare continuamente per più di 14 giorni", de:"Nicht länger als 14 Tage ununterbrochen anwenden", hi:"14 दिन से अधिक लगातार न लगाएं" },
    {key:"extra43", th:"ห้ามพ่นติดต่อกันเกิน 7 วัน", ja:"7日を超えて連続で使用しないでください", en:"Do not use continuously for more than 7 days", ko:"7일 이상 연속으로 뿌리지 마세요", "zh-CN":"请勿连续喷用超过7天", "zh-TW":"請勿連續噴用超過7天", es:"No usar continuamente durante más de 7 días", fr:"Ne pas utiliser en continu pendant plus de 7 jours", ru:"Не применять непрерывно более 7 дней", ar:"لا يُستخدم بشكل متواصل لأكثر من 7 أيام", my:"7 ရက်ထက်ပို၍ ဆက်တိုက်မဖျန်းပါနှင့်", vi:"Không xịt liên tục quá 7 ngày", km:"កុំបាញ់ជាប់គ្នាលើសពី 7 ថ្ងៃ", it:"Non usare continuamente per più di 7 giorni", de:"Nicht länger als 7 Tage ununterbrochen anwenden", hi:"7 दिन से अधिक लगातार उपयोग न करें" },
    {key:"extra44", th:"ควรใช้ยาอย่างต่อเนื่องทุกวันเพื่อให้ได้ผลการรักษาที่ดี", ja:"最大の治療効果を得るために、毎日継続して使用してください", en:"Use continuously every day for optimal therapeutic results", ko:"최적의 치료 효과를 위해 매일 꾸준히 사용하세요", "zh-CN":"请每天持续使用以获得最佳疗效", "zh-TW":"請每天持續使用以獲得最佳療效", es:"Use continuamente todos los días para obtener resultados terapéuticos óptimos", fr:"Utiliser régulièrement chaque jour pour des résultats thérapeutiques optimaux", ru:"Используйте ежедневно для достижения оптимального терапевтического эффекта", ar:"يُستخدم باستمرار كل يوم للحصول على أفضل النتائج العلاجية", my:"အကောင်းဆုံး ကုသမှုရလဒ်အတွက် နေ့စဉ် ပုံမှန်ဆက်တိုက်သုံးပါ", vi:"Sử dụng liên tục hàng ngày để đạt kết quả điều trị tối ưu", km:"គួរប្រើប្រាស់ជាប់ជារៀងរាល់ថ្ងៃដើម្បីទទួលបានលទ្ធផលព្យាបាលល្អ", it:"Usare continuamente ogni giorno per risultati terapeutici ottimali", de:"Täglich anwenden, um optimale therapeutische Ergebnisse zu erzielen", hi:"इष्टतम चिकित्सीय परिणाम के लिए हर दिन लगातार उपयोग करें" },
    {key:"renalDoseAdjust", th:"ผู้ป่วยโรคไตควรแจ้งเภสัชกรก่อนใช้ยานี้ เนื่องจากอาจต้องปรับขนาดยา", ja:"腎臓病の患者は、用量調整が必要な場合があるため、この薬を使用する前に薬剤師に伝えてください", en:"Patients with kidney disease should inform the pharmacist before using this medicine, as the dose may need adjustment", ko:"신장 질환이 있는 환자는 용량 조절이 필요할 수 있으므로 이 약을 사용하기 전에 약사에게 알리세요", "zh-CN":"肾病患者在使用本药前应告知药剂师，因为可能需要调整剂量", "zh-TW":"腎病患者在使用本藥前應告知藥劑師，因為可能需要調整劑量", es:"Los pacientes con enfermedad renal deben informar al farmacéutico antes de usar este medicamento, ya que puede ser necesario ajustar la dosis", fr:"Les patients atteints d'une maladie rénale doivent informer le pharmacien avant d'utiliser ce médicament, car un ajustement de la dose peut être nécessaire", ru:"Пациентам с заболеванием почек следует сообщить фармацевту перед применением этого лекарства, так как может потребоваться коррекция дозы", ar:"يجب على مرضى الكلى إخبار الصيدلي قبل استخدام هذا الدواء لأن الجرعة قد تحتاج إلى تعديل", my:"ကျောက်ကပ်ရောဂါရှိသူများသည် ဆေးအတိုင်းအတာချိန်ညှိရန် လိုအပ်နိုင်သောကြောင့် ဤဆေးကိုမသုံးမီ ဆေးဝါးပညာရှင်အားအသိပေးသင့်သည်", vi:"Bệnh nhân suy thận nên báo cho dược sĩ trước khi dùng thuốc này vì có thể cần điều chỉnh liều", km:"អ្នកជំងឺតម្រងនោមគួរប្រាប់ឱសថការីមុនប្រើថ្នាំនេះ ដោយសារអាចត្រូវការកែសម្រួលកម្រិតថ្នាំ", it:"I pazienti con malattia renale devono informare il farmacista prima di usare questo farmaco, poiché potrebbe essere necessario un aggiustamento della dose", de:"Patienten mit Nierenerkrankung sollten den Apotheker vor der Einnahme dieses Medikaments informieren, da eine Dosisanpassung erforderlich sein kann", hi:"किडनी रोग वाले रोगियों को इस दवा का उपयोग करने से पहले फार्मासिस्ट को सूचित करना चाहिए, क्योंकि खुराक में समायोजन की आवश्यकता हो सकती है" },
    {key:"penicillinAllergyCheck", th:"แจ้งเภสัชกรหากเคยแพ้ยากลุ่มเพนิซิลลินก่อนรับประทานยานี้", ja:"この薬を服用する前に、ペニシリンアレルギーの既往がある場合は薬剤師に伝えてください", en:"Inform the pharmacist if you have a history of penicillin allergy before taking this medicine", ko:"이 약을 복용하기 전에 페니실린 알레르기 병력이 있으면 약사에게 알리세요", "zh-CN":"服用本药前，如有青霉素过敏史请告知药剂师", "zh-TW":"服用本藥前，如有青黴素過敏史請告知藥劑師", es:"Informe al farmacéutico si tiene antecedentes de alergia a la penicilina antes de tomar este medicamento", fr:"Informez le pharmacien en cas d'antécédents d'allergie à la pénicilline avant de prendre ce médicament", ru:"Сообщите фармацевту, если у вас была аллергия на пенициллин, перед приемом этого лекарства", ar:"أخبر الصيدلي إذا كان لديك تاريخ من الحساسية تجاه البنسلين قبل تناول هذا الدواء", my:"ဤဆေးကိုမသောက်မီ ပင်နီစလင်ဓာတ်မတည့်ဖူးပါက ဆေးဝါးပညာရှင်အားအသိပေးပါ", vi:"Hãy báo cho dược sĩ nếu bạn từng dị ứng với penicillin trước khi dùng thuốc này", km:"សូមប្រាប់ឱសថការីប្រសិនបើធ្លាប់មានប្រតិកម្មអាលែហ្ស៊ីនឹងប៉េនីស៊ីលីន មុនពេលប្រើថ្នាំនេះ", it:"Informare il farmacista in caso di storia di allergia alla penicillina prima di assumere questo farmaco", de:"Informieren Sie den Apotheker, falls Sie in der Vergangenheit allergisch auf Penicillin reagiert haben, bevor Sie dieses Medikament einnehmen", hi:"यह दवा लेने से पहले, यदि आपको पेनिसिलिन से एलर्जी का इतिहास रहा हो तो फार्मासिस्ट को सूचित करें" },
    {key:"continueAntifungalAfterSymptomsClear", th:"ควรทายาต่อเนื่องอีกระยะหลังอาการหายดีแล้ว เพื่อป้องกันเชื้อกลับมาเป็นซ้ำ", ja:"再発を防ぐため、症状が治まった後もしばらく塗布を続けてください", en:"Continue applying for a while after symptoms clear to prevent recurrence", ko:"재발을 방지하기 위해 증상이 사라진 후에도 얼마간 계속 발라주세요", "zh-CN":"症状消失后应继续用药一段时间，以防复发", "zh-TW":"症狀消失後應繼續用藥一段時間，以防復發", es:"Continúe aplicando durante un tiempo después de que los síntomas desaparezcan para prevenir la recurrencia", fr:"Continuez à appliquer pendant un certain temps après la disparition des symptômes pour éviter une récidive", ru:"Продолжайте применение некоторое время после исчезновения симптомов, чтобы предотвратить рецидив", ar:"استمر في الاستخدام لفترة بعد اختفاء الأعراض لمنع تكرار الإصابة", my:"ရောဂါပြန်မဖြစ်စေရန် ရောဂါလက္ခဏာပျောက်ပြီးနောက်လည်း တစ်ကြိမ်ခန့်ဆက်လက်လိမ်းပါ", vi:"Nên tiếp tục thoa thêm một thời gian sau khi hết triệu chứng để tránh tái phát", km:"គួរបន្តលាបថ្នាំមួយរយៈបន្ទាប់ពីរោគសញ្ញាបាត់ ដើម្បីការពារកុំឲ្យកើតឡើងវិញ", it:"Continuare ad applicare per un po' di tempo dopo la scomparsa dei sintomi per prevenire recidive", de:"Weiter anwenden für einige Zeit, nachdem die Symptome abgeklungen sind, um ein erneutes Auftreten zu verhindern", hi:"पुनरावृत्ति रोकने के लिए लक्षण ठीक होने के बाद भी कुछ समय तक लगाना जारी रखें" }
];

const TOP_ADVICE_KEY = 'extra12';
const advicesDB = [
    ...advicesExtraDB.filter(x => x.key === TOP_ADVICE_KEY),
    ...advicesCoreDB,
    ...advicesExtraDB.filter(x => x.key !== TOP_ADVICE_KEY)
];

const AUX_ICON_SVGS = {
    refrigerate: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><title>Refrigerate</title>
        <rect x="4" y="2" width="12" height="20" rx="2"/>
        <line x1="4" y1="9" x2="16" y2="9"/>
        <line x1="12.3" y1="4" x2="12.3" y2="6.5"/>
        <line x1="12.3" y1="11.2" x2="12.3" y2="13.7"/>
        <g stroke-width="1.1">
            <line x1="20.5" y1="2.6" x2="20.5" y2="7.4"/>
            <line x1="18.4" y1="3.2" x2="22.6" y2="6.8"/>
            <line x1="18.4" y1="6.8" x2="22.6" y2="3.2"/>
        </g>
    </svg>`,
    noAlcohol: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><title>No Alcohol</title>
        <path d="M6 4h12l-6 8.5z"/>
        <line x1="12" y1="12.5" x2="12" y2="19.5"/>
        <line x1="8" y1="19.5" x2="16" y2="19.5"/>
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.6" y1="4.6" x2="19.4" y2="19.4"/>
    </svg>`,
    drowsiness: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><title>May Cause Drowsiness - Do Not Drive</title>
        <path d="M3.2 13.5l1.6-4.3a2 2 0 0 1 1.9-1.3h8.6a2 2 0 0 1 1.9 1.3l1.6 4.3"/>
        <rect x="2.2" y="13.5" width="19.6" height="3.3" rx="1.2"/>
        <circle cx="7" cy="17.3" r="1.7" fill="#000" stroke="none"/>
        <circle cx="17" cy="17.3" r="1.7" fill="#000" stroke="none"/>
        <circle cx="12" cy="12" r="10.5"/>
        <line x1="4.4" y1="4.4" x2="19.6" y2="19.6"/>
    </svg>`,
    dissolveInWater: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><title>Dissolve in Water Before Taking</title>
        <path d="M6 9h12l-1.2 12a2 2 0 0 1-2 1.8h-5.6a2 2 0 0 1-2-1.8L6 9z"/>
        <line x1="6.5" y1="13" x2="15.5" y2="13"/>
        <line x1="17" y1="2.5" x2="10.6" y2="14.8"/>
        <ellipse cx="9.7" cy="16" rx="2.1" ry="1.2" transform="rotate(-25 9.7 16)" fill="#000" stroke="none"/>
        <path d="M12.8 17.3c1 0.6 2.3 0.6 3.3 0"/>
    </svg>`,
    shakeWell: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><title>Shake Well Before Use</title>
        <rect x="8.3" y="8.3" width="7.4" height="13" rx="1.5"/>
        <path d="M10 8.3V5.8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2.5"/>
        <line x1="9.5" y1="3.3" x2="14.5" y2="3.3"/>
        <path d="M4.6 7.2c1.4 1.7 1.4 3.6 0 5.3" stroke-width="1.3"/>
        <path d="M19.4 7.2c-1.4 1.7-1.4 3.6 0 5.3" stroke-width="1.3"/>
    </svg>`,
    withFood: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><title>Take With Food</title>
        <line x1="7" y1="2.3" x2="7" y2="21.7"/>
        <line x1="5" y1="2.3" x2="5" y2="7.2"/>
        <line x1="9" y1="2.3" x2="9" y2="7.2"/>
        <path d="M5 7.2c0 1.3 0.9 2.2 2 2.2s2-0.9 2-2.2"/>
        <path d="M17.3 2.3c-1.7 0-3 1.4-3 3.1v3.8a1 1 0 0 0 1 1h0.9v11.5"/>
    </svg>`,
    avoidDairy: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><title>Avoid Dairy Products</title>
        <path d="M7.6 3h8.8l-1 16.4a1.5 1.5 0 0 1-1.5 1.4h-3.8a1.5 1.5 0 0 1-1.5-1.4z"/>
        <line x1="7.9" y1="8.2" x2="16.1" y2="8.2"/>
        <circle cx="12" cy="12.5" r="10.3"/>
        <line x1="4.8" y1="5.3" x2="19.2" y2="19.7"/>
    </svg>`,
    avoidSunlight: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><title>Avoid Sunlight / Photosensitivity</title>
        <circle cx="12" cy="12" r="4.1"/>
        <g stroke-width="1.4">
            <line x1="12" y1="1.6" x2="12" y2="4.1"/>
            <line x1="12" y1="19.9" x2="12" y2="22.4"/>
            <line x1="1.6" y1="12" x2="4.1" y2="12"/>
            <line x1="19.9" y1="12" x2="22.4" y2="12"/>
            <line x1="4.5" y1="4.5" x2="6.3" y2="6.3"/>
            <line x1="17.7" y1="17.7" x2="19.5" y2="19.5"/>
            <line x1="4.5" y1="19.5" x2="6.3" y2="17.7"/>
            <line x1="17.7" y1="6.3" x2="19.5" y2="4.5"/>
        </g>
        <line x1="2.8" y1="21.2" x2="21.2" y2="2.8" stroke-width="1.8"/>
    </svg>`,
    finishFullCourse: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><title>Finish the Full Course as Prescribed</title>
        <rect x="3" y="4.5" width="18" height="17" rx="2"/>
        <line x1="3" y1="9.2" x2="21" y2="9.2"/>
        <line x1="7.5" y1="2.2" x2="7.5" y2="6.5"/>
        <line x1="16.5" y1="2.2" x2="16.5" y2="6.5"/>
        <path d="M6.8 13.8l1.8 1.8 3.8-4.3" stroke-width="1.8"/>
        <path d="M6.8 18l1.8 1.8 3.8-4.3" stroke-width="1.8"/>
    </svg>`,
    externalUseOnly: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><title>For External Use Only - Do Not Swallow</title>
        <path d="M8.6 2.3h3.6a1.3 1.3 0 0 1 1.3 1.3v1l-0.9 1.2v3.3H8.2V5.8l-0.9-1.2v-1a1.3 1.3 0 0 1 1.3-1.3z"/>
        <path d="M8.2 9.1v7.6a1.5 1.5 0 0 0 1.5 1.5h1.5a1.5 1.5 0 0 0 1.5-1.5V9.1"/>
        <circle cx="17.3" cy="16.5" r="4"/>
        <line x1="14.8" y1="16.5" x2="19.8" y2="16.5"/>
        <line x1="14.6" y1="13.8" x2="20" y2="19.2"/>
    </svg>`
};

const ADVICE_ICON_KEYS = {
    refrigerate: 'refrigerate',
    noAlcohol: 'noAlcohol',
    extra12: 'drowsiness',
    extra41: 'dissolveInWater'
};

// v1.22: คำสำคัญสำหรับตรวจจับอัตโนมัติจากข้อความคำแนะนำที่พิมพ์เอง (ไม่ได้เลือกจากรายการ)
//   ใช้ร่วมกับ ADVICE_ICON_KEYS (ที่จับจากประโยคที่เลือกจากรายการ) ใน getAuxIconKeysFromText()
const AUX_ICON_KEYWORDS = {
    refrigerate: ['ตู้เย็น', 'แช่เย็น', 'แช่ตู้เย็น', 'เก็บในตู้เย็น', 'เก็บที่อุณหภูมิ 2-8'],
    noAlcohol: ['แอลกอฮอล์', 'ดื่มสุรา', 'เครื่องดื่มแอลกอฮอล์', 'สุรา'],
    drowsiness: ['ง่วง', 'ง่วงซึม', 'ง่วงนอน', 'ห้ามขับขี่', 'ห้ามทำงานกับเครื่องจักร'],
    dissolveInWater: ['ละลายน้ำ', 'ผสมน้ำ', 'ชงน้ำ', 'ละลายในน้ำ'],
    shakeWell: ['เขย่าขวด', 'เขย่าก่อนใช้', 'เขย่าให้เข้ากัน'],
    withFood: ['พร้อมอาหาร', 'ร่วมกับอาหาร', 'หลังอาหารทันที'],
    avoidDairy: ['ห้ามทานร่วมกับนม', 'ผลิตภัณฑ์นม', 'ดื่มนม', 'ห้ามดื่มนม'],
    avoidSunlight: ['แสงแดด', 'หลีกเลี่ยงแดด', 'แพ้แสงแดด', 'ไวต่อแสงแดด'],
    finishFullCourse: ['ครบตามแพทย์สั่ง', 'ให้ครบตามที่แพทย์กำหนด', 'แม้อาการดีขึ้นแล้ว', 'จนกว่ายาจะหมด'],
    externalUseOnly: ['ใช้ภายนอกเท่านั้น', 'ห้ามรับประทาน', 'ห้ามกิน', 'ห้ามนำเข้าปาก']
};

const ICON_LEGEND_LABELS_TH = {
    refrigerate: 'แช่เย็น (เก็บยาไว้ในตู้เย็น)',
    noAlcohol: 'ห้ามดื่มแอลกอฮอล์ระหว่างใช้ยานี้',
    drowsiness: 'อาจทำให้ง่วงซึม ห้ามขับขี่/ทำงานกับเครื่องจักร',
    dissolveInWater: 'ละลายน้ำก่อนรับประทาน',
    shakeWell: 'เขย่าขวดให้เข้ากันก่อนใช้',
    withFood: 'รับประทานพร้อมอาหาร',
    avoidDairy: 'ห้ามทานร่วมกับนม/ผลิตภัณฑ์นม',
    avoidSunlight: 'หลีกเลี่ยงแสงแดดระหว่างใช้ยานี้',
    finishFullCourse: 'ทานยาให้ครบตามแพทย์สั่ง แม้อาการดีขึ้นแล้ว',
    externalUseOnly: 'ใช้ภายนอกเท่านั้น ห้ามรับประทาน'
};

const UNIT_MAP = {
    capsule:     { ja:"カプセル", en:"capsule(s)", ko:"캡슐", "zh-CN":"粒", "zh-TW":"粒", es:"cápsula(s)", fr:"capsule(s)", ru:"капсула(ы)", ar:"كبسولة", my:"ကပ်ဆူး", vi:"viên nang", km:"កាប់ស៊ុល", it:"capsula/e", de:"Kapsel(n)", hi:"कैप्सूल" },
    tablet:      { ja:"錠", en:"tablet(s)", ko:"정", "zh-CN":"片", "zh-TW":"錠", es:"comprimido(s)", fr:"comprimé(s)", ru:"таблетка(и)", ar:"قرص", my:"ဆေးပြား", vi:"viên", km:"គ្រាប់", it:"compressa/e", de:"Tablette(n)", hi:"गोली" },
    times:       { ja:"回", en:"time(s)", ko:"회", "zh-CN":"次", "zh-TW":"次", es:"vez(veces)", fr:"fois", ru:"раз(а)", ar:"مرة", my:"ကြိမ်", vi:"lần", km:"ដង", it:"volta/e", de:"Mal", hi:"बार" },
    tablespoon:  { ja:"大さじ", en:"tablespoon(s)", ko:"큰술", "zh-CN":"汤匙", "zh-TW":"湯匙", es:"cucharada(s)", fr:"cuillère(s) à soupe", ru:"столовая(ые) ложка(и)", ar:"ملعقة كبيرة", my:"စားပွဲဇွန်း", vi:"muỗng canh", km:"ស្លាបព្រាបាយ", it:"cucchiaio/i", de:"Esslöffel", hi:"बड़ा चम्मच" },
    teaspoon:    { ja:"茶さじ", en:"teaspoon(s)", ko:"작은술", "zh-CN":"茶匙", "zh-TW":"茶匙", es:"cucharadita(s)", fr:"cuillère(s) à café", ru:"чайная(ые) ложка(и)", ar:"ملعقة صغيرة", my:"လက်ဖက်ရည်ဇွန်း", vi:"muỗng cà phê", km:"ស្លាបព្រាកាហ្វេ", it:"cucchiaino/i", de:"Teelöffel", hi:"छोटा चम्मच" },
    sachet:      { ja:"包", en:"sachet(s)", ko:"포", "zh-CN":"包", "zh-TW":"包", es:"sobre(s)", fr:"sachet(s)", ru:"пакет(ы)", ar:"كيس", my:"ထုပ်", vi:"gói", km:"ស្រោម", it:"bustina/e", de:"Beutel", hi:"पाउच" },
    drop:        { ja:"滴", en:"drop(s)", ko:"방울", "zh-CN":"滴", "zh-TW":"滴", es:"gota(s)", fr:"goutte(s)", ru:"капля(и)", ar:"قطرة", my:"စက်", vi:"giọt", km:"ដំណក់", it:"goccia/e", de:"Tropfen", hi:"बूँद" },
    applyThinly: { ja:"薄く塗る", en:"apply thinly", ko:"얇게 바르기", "zh-CN":"薄涂", "zh-TW":"薄塗", es:"aplicar en capa fina", fr:"appliquer en fine couche", ru:"тонким слоем", ar:"يُدهن طبقة رقيقة", my:"ပါးပါးလိမ်းပါ", vi:"thoa mỏng", km:"លាបស្តើង", it:"applicare in strato sottile", de:"dünn auftragen", hi:"पतला लगाएं" },
    insert:      { ja:"挿入", en:"insert", ko:"삽입", "zh-CN":"塞入", "zh-TW":"塞入", es:"insertar", fr:"insérer", ru:"ввести", ar:"يُدخل", my:"ထည့်သွင်း", vi:"đặt", km:"បញ្ចូល", it:"inserire", de:"einführen", hi:"डालें" },
    halfTablet:  { ja:"半錠", en:"half a pill", ko:"반 알", "zh-CN":"半片", "zh-TW":"半錠", es:"media pastilla", fr:"demi-comprimé", ru:"полтаблетки", ar:"نصف حبة", my:"ဆေးပြားတစ်ဝက်", vi:"nửa viên", km:"កន្លះគ្រាប់", it:"mezza compressa", de:"halbe Tablette", hi:"आधी गोली" },
    puff:        { ja:"吸入", en:"puff(s)", ko:"회 흡입", "zh-CN":"喷", "zh-TW":"噴", es:"inhalación(es)", fr:"bouffée(s)", ru:"вдох(а)", ar:"بخة", my:"ချက်", vi:"nhát xịt", km:"បាញ់", it:"erogazione/i", de:"Sprühstoß", hi:"पफ" },
    pump:        { ja:"プッシュ", en:"pump(s)", ko:"번 펌프", "zh-CN":"泵", "zh-TW":"泵", es:"bombeo(s)", fr:"pression(s)", ru:"нажатие(я)", ar:"ضغطة", my:"ပန့်", vi:"lần bơm", km:"ចុច", it:"spruzzo/i", de:"Pumpstoß", hi:"पंप" }
};

const DRUG_PRESETS = [
    { name:"Paracetamol", type:"tablet", meal:"after", dose:{morning:"1 เม็ด",noon:"1 เม็ด",evening:"1 เม็ด",bed:"X"}, indications:["feverReducer","painReliever"], advices:["stopIfImproved"] },
    { name:"Aspirin", type:"tablet", meal:"after", dose:{morning:"1 เม็ด",noon:"X",evening:"1 เม็ด",bed:"X"}, indications:["painReliever","feverReducer"], advices:["takeAfterFoodProtectStomach"] },
    { name:"Ibuprofen", type:"tablet", meal:"afterImmediate", dose:{morning:"1 เม็ด",noon:"1 เม็ด",evening:"1 เม็ด",bed:"X"}, indications:["painReliever","antiInflammatory","feverReducer"], advices:["takeAfterFoodProtectStomach","stopIfImproved"] },
    { name:"Mefenamic Acid", type:"capsule", meal:"afterImmediate", dose:{morning:"1 เม็ด",noon:"1 เม็ด",evening:"1 เม็ด",bed:"X"}, indications:["painReliever","antiInflammatory"], advices:["takeAfterFoodProtectStomach"] },
    { name:"Diclofenac Gel", type:"gel", meal:"", dose:{morning:"ทาบางๆ",noon:"X",evening:"ทาบางๆ",bed:"X"}, indications:["antiInflammatory","painReliever"], advices:[] },
    { name:"ORS", type:"powder", meal:"any", dose:{morning:"1 ซอง",noon:"1 ซอง",evening:"1 ซอง",bed:"X"}, indications:["ors"], advices:["drinkWater"] },
    { name:"Loperamide", type:"capsule", meal:"any", dose:{morning:"2 เม็ด",noon:"1 เม็ด",evening:"1 เม็ด",bed:"X"}, indications:["antidiarrheal"], advices:["drinkWater","stopIfImproved"] },
    { name:"Bismuth Subsalicylate", type:"tablet", meal:"after", dose:{morning:"2 เม็ด",noon:"2 เม็ด",evening:"2 เม็ด",bed:"X"}, indications:["antidiarrheal"], advices:["drinkWater"] },
    { name:"Domperidone", type:"tablet", meal:"before30", dose:{morning:"1 เม็ด",noon:"1 เม็ด",evening:"1 เม็ด",bed:"X"}, indications:["antiemetic"], advices:[] },
    { name:"Bisacodyl", type:"tablet", meal:"", dose:{morning:"X",noon:"X",evening:"X",bed:"1 เม็ด"}, indications:["laxative"], advices:[] },
    { name:"Simethicone", type:"capsule", meal:"after", dose:{morning:"1 เม็ด",noon:"1 เม็ด",evening:"1 เม็ด",bed:"X"}, indications:["antiflatulent"], advices:[] },
    { name:"Antacid (Al/Mg Hydroxide)", type:"suspension", meal:"after", dose:{morning:"1 ช้อนโต๊ะ",noon:"1 ช้อนโต๊ะ",evening:"1 ช้อนโต๊ะ",bed:"X"}, indications:["acidReducer","gastroProtectant"], advices:["shakeWell"] },
    { name:"Famotidine", type:"tablet", meal:"before30", dose:{morning:"1 เม็ด",noon:"X",evening:"1 เม็ด",bed:"X"}, indications:["acidReducer"], advices:[] },
    { name:"Omeprazole", type:"capsule", meal:"before30", dose:{morning:"1 เม็ด",noon:"X",evening:"X",bed:"X"}, indications:["acidReducer","gastroProtectant"], advices:[] },
    { name:"Cetirizine", type:"tablet", meal:"after", dose:{morning:"X",noon:"X",evening:"1 เม็ด",bed:"X"}, indications:["antihistamine"], advices:[] },
    { name:"Loratadine", type:"tablet", meal:"after", dose:{morning:"1 เม็ด",noon:"X",evening:"X",bed:"X"}, indications:["antihistamine"], advices:[] },
    { name:"Fexofenadine", type:"tablet", meal:"any", dose:{morning:"1 เม็ด",noon:"X",evening:"X",bed:"X"}, indications:["antihistamine"], advices:[] },
    { name:"CPM", type:"tablet", meal:"after", dose:{morning:"1 เม็ด",noon:"1 เม็ด",evening:"1 เม็ด",bed:"X"}, indications:["antihistamine","decongestant"], advices:[] },
    { name:"Diphenhydramine", type:"capsule", meal:"after", dose:{morning:"X",noon:"X",evening:"1 เม็ด",bed:"X"}, indications:["antihistamine","sleepAid"], advices:[] },
    { name:"Dimenhydrinate", type:"prn", meal:"any", dose:{morning:"X",noon:"X",evening:"X",bed:"1 เม็ด"}, indications:["antivertigo","antiemetic"], advices:[] },
    { name:"Scopolamine Patch", type:"patch", meal:"", dose:{morning:"X",noon:"X",evening:"X",bed:"X"}, indications:["antivertigo","antiemetic"], advices:[] },
    { name:"Dextromethorphan", type:"tablet", meal:"after", dose:{morning:"1 เม็ด",noon:"1 เม็ด",evening:"1 เม็ด",bed:"X"}, indications:["coughSuppressant"], advices:[] },
    { name:"Bromhexine", type:"tablet", meal:"after", dose:{morning:"1 เม็ด",noon:"1 เม็ด",evening:"1 เม็ด",bed:"X"}, indications:["expectorant"], advices:["drinkWater"] },
    { name:"Salbutamol Inhaler", type:"inhaler", meal:"any", dose:{morning:"X",noon:"X",evening:"X",bed:"X"}, indications:["bronchodilator"], advices:[] },
    { name:"Amoxicillin", type:"capsule", meal:"any", dose:{morning:"2 เม็ด",noon:"X",evening:"2 เม็ด",bed:"X"}, indications:["antibiotic"], advices:["drinkWater"] },
    { name:"Azithromycin", type:"tablet", meal:"any", dose:{morning:"2 เม็ด",noon:"X",evening:"X",bed:"X"}, indications:["antibiotic"], advices:["drinkWater"] },
    { name:"Ciprofloxacin", type:"tablet", meal:"any", dose:{morning:"1 เม็ด",noon:"X",evening:"1 เม็ด",bed:"X"}, indications:["antibiotic"], advices:["drinkWater","avoidSunlight"] },
    { name:"Metronidazole", type:"tablet", meal:"afterImmediate", dose:{morning:"1 เม็ด",noon:"1 เม็ด",evening:"1 เม็ด",bed:"X"}, indications:["antibiotic"], advices:["noAlcohol","takeAfterFoodProtectStomach"] },
    { name:"Calamine Lotion", type:"external", meal:"", dose:{morning:"ทาบางๆ",noon:"X",evening:"ทาบางๆ",bed:"X"}, indications:["antiitch"], advices:[] },
    { name:"Hydrocortisone", type:"cream", meal:"", dose:{morning:"ทาบางๆ",noon:"X",evening:"ทาบางๆ",bed:"X"}, indications:["antiitch","steroid"], advices:["extra42"] },
    { name:"Clotrimazole Cream", type:"cream", meal:"", dose:{morning:"ทาบางๆ",noon:"X",evening:"ทาบางๆ",bed:"X"}, indications:["antifungal"], advices:[] },
    { name:"Triamcinolone Oral Paste", type:"paste", meal:"", dose:{morning:"ทาบางๆ",noon:"X",evening:"ทาบางๆ",bed:"X"}, indications:["steroid"], advices:[] },
    { name:"Chloramphenicol Eye Drops", type:"eye", meal:"", dose:{morning:"1 หยด",noon:"1 หยด",evening:"1 หยด",bed:"X"}, indications:["antibacterialEyeDrops"], advices:[] },
    { name:"Artificial Tears", type:"eye", meal:"", dose:{morning:"1 หยด",noon:"1 หยด",evening:"1 หยด",bed:"1 หยด"}, indications:["artificialTears"], advices:[] }
];

const DRUG_REFERENCE_DB = [
    {b:"Tylenol",g:"Paracetamol",c:"analgesic"},
    {b:"Panadol",g:"Paracetamol",c:"analgesic"},
    {b:"Sara",g:"Paracetamol",c:"analgesic"},
    {b:"Calpol",g:"Paracetamol",c:"analgesic"},
    {b:"Paracap",g:"Paracetamol",c:"analgesic"},
    {b:"Tempra",g:"Paracetamol",c:"analgesic"},
    {b:"Ponstan",g:"Mefenamic Acid",c:"analgesic"},
    {b:"Ponstan Forte",g:"Mefenamic Acid",c:"analgesic"},
    {b:"Brufen",g:"Ibuprofen",c:"analgesic"},
    {b:"Nurofen",g:"Ibuprofen",c:"analgesic"},
    {b:"Gofen",g:"Ibuprofen",c:"analgesic"},
    {b:"Voltaren",g:"Diclofenac",c:"analgesic"},
    {b:"Cataflam",g:"Diclofenac Potassium",c:"analgesic"},
    {b:"Diclofen",g:"Diclofenac",c:"analgesic"},
    {b:"Arcoxia",g:"Etoricoxib",c:"analgesic"},
    {b:"Celebrex",g:"Celecoxib",c:"analgesic"},
    {b:"Mobic",g:"Meloxicam",c:"analgesic"},
    {b:"Feldene",g:"Piroxicam",c:"analgesic"},
    {b:"Naprosyn",g:"Naproxen",c:"analgesic"},
    {b:"Synflex",g:"Naproxen Sodium",c:"analgesic"},
    {b:"Tilcotil",g:"Tenoxicam",c:"analgesic"},
    {b:"Indocid",g:"Indomethacin",c:"analgesic"},
    {b:"Tramal",g:"Tramadol",c:"analgesic"},
    {b:"Ultracet",g:"Tramadol/Paracetamol",c:"analgesic"},
    {b:"Anadol",g:"Tramadol",c:"analgesic"},
    {b:"Norgesic",g:"Orphenadrine/Paracetamol",c:"analgesic"},
    {b:"Lyrica",g:"Pregabalin",c:"analgesic"},
    {b:"Neurontin",g:"Gabapentin",c:"analgesic"},
    {b:"Myonal",g:"Eperisone",c:"muscleRelaxant"},
    {b:"Mydocalm",g:"Tolperisone",c:"muscleRelaxant"},
    {b:"Norflex",g:"Orphenadrine",c:"muscleRelaxant"},
    {b:"Robaxin",g:"Methocarbamol",c:"muscleRelaxant"},
    {b:"Sirdalud",g:"Tizanidine",c:"muscleRelaxant"},
    {b:"Lioresal",g:"Baclofen",c:"muscleRelaxant"},
    {b:"Parafon Forte",g:"Chlorzoxazone",c:"muscleRelaxant"},
    {b:"Zyloric",g:"Allopurinol",c:"gout"},
    {b:"Feburic",g:"Febuxostat",c:"gout"},
    {b:"Uloric",g:"Febuxostat",c:"gout"},
    {b:"Colchicine",g:"Colchicine",c:"gout"},
    {b:"Benecid",g:"Probenecid",c:"gout"},
    {b:"Zyrtec",g:"Cetirizine",c:"antihistamine"},
    {b:"Clarityne",g:"Loratadine",c:"antihistamine"},
    {b:"Telfast",g:"Fexofenadine",c:"antihistamine"},
    {b:"Allegra",g:"Fexofenadine",c:"antihistamine"},
    {b:"Xyzal",g:"Levocetirizine",c:"antihistamine"},
    {b:"Aerius",g:"Desloratadine",c:"antihistamine"},
    {b:"Bilaxten",g:"Bilastine",c:"antihistamine"},
    {b:"Atarax",g:"Hydroxyzine",c:"antihistamine"},
    {b:"Periactin",g:"Cyproheptadine",c:"antihistamine"},
    {b:"Polaramine",g:"Dexchlorpheniramine",c:"antihistamine"},
    {b:"Zaditen",g:"Ketotifen",c:"antihistamine"},
    {b:"Fenistil",g:"Dimetindene",c:"antihistamine"},
    {b:"Phenergan",g:"Promethazine",c:"antihistamine"},
    {b:"Benadryl",g:"Diphenhydramine",c:"antihistamine"},
    {b:"Chlorpheniramine",g:"Chlorpheniramine",c:"antihistamine"},
    {b:"Loraday",g:"Loratadine",c:"antihistamine"},
    {b:"Cetirizine GPO",g:"Cetirizine",c:"antihistamine"},
    {b:"Tiffy",g:"Paracetamol/Chlorpheniramine/Phenylephrine",c:"respiratory"},
    {b:"Decolgen",g:"Paracetamol/Chlorpheniramine/Phenylephrine",c:"respiratory"},
    {b:"Actifed",g:"Triprolidine/Pseudoephedrine",c:"respiratory"},
    {b:"Sudafed",g:"Pseudoephedrine",c:"respiratory"},
    {b:"Mucosolvan",g:"Ambroxol",c:"respiratory"},
    {b:"Bisolvon",g:"Bromhexine",c:"respiratory"},
    {b:"Fluimucil",g:"Acetylcysteine",c:"respiratory"},
    {b:"Solmux",g:"Carbocisteine",c:"respiratory"},
    {b:"Romilar",g:"Dextromethorphan",c:"respiratory"},
    {b:"Terco-D",g:"Dextromethorphan",c:"respiratory"},
    {b:"Strepsils",g:"Amylmetacresol",c:"respiratory"},
    {b:"Difflam",g:"Benzydamine",c:"respiratory"},
    {b:"Ventolin",g:"Salbutamol",c:"respiratory"},
    {b:"Bricanyl",g:"Terbutaline",c:"respiratory"},
    {b:"Berodual",g:"Fenoterol/Ipratropium",c:"respiratory"},
    {b:"Seretide",g:"Fluticasone/Salmeterol",c:"respiratory"},
    {b:"Symbicort",g:"Budesonide/Formoterol",c:"respiratory"},
    {b:"Pulmicort",g:"Budesonide",c:"respiratory"},
    {b:"Flixotide",g:"Fluticasone",c:"respiratory"},
    {b:"Singulair",g:"Montelukast",c:"respiratory"},
    {b:"Otrivin",g:"Xylometazoline",c:"respiratory", indications:["decongestant"], advices:["extra43"]},
    {b:"Iliadin",g:"Oxymetazoline",c:"respiratory"},
    {b:"Avamys",g:"Fluticasone Furoate",c:"respiratory", indications:["decongestant"], advices:["extra44"]},
    {b:"Nasonex",g:"Mometasone",c:"respiratory"},
    {b:"Flixonase",g:"Fluticasone",c:"respiratory"},
    {b:"Sterimar",g:"Sea Water Nasal Spray",c:"respiratory"},
    {b:"Losec",g:"Omeprazole",c:"gi"},
    {b:"Miracid",g:"Omeprazole",c:"gi"},
    {b:"Nexium",g:"Esomeprazole",c:"gi"},
    {b:"Controloc",g:"Pantoprazole",c:"gi"},
    {b:"Pariet",g:"Rabeprazole",c:"gi"},
    {b:"Prevacid",g:"Lansoprazole",c:"gi"},
    {b:"Zantac",g:"Ranitidine",c:"gi"},
    {b:"Pepcid",g:"Famotidine",c:"gi"},
    {b:"Gaviscon",g:"Alginate",c:"gi"},
    {b:"Antacil",g:"Al/Mg Hydroxide",c:"gi"},
    {b:"Alum Milk",g:"Al/Mg Hydroxide",c:"gi"},
    {b:"Air-X",g:"Simethicone",c:"gi"},
    {b:"Gascon",g:"Dimethicone",c:"gi"},
    {b:"Ulsanic",g:"Sucralfate",c:"gi"},
    {b:"Carafate",g:"Sucralfate",c:"gi"},
    {b:"Cytotec",g:"Misoprostol",c:"gi"},
    {b:"Motilium",g:"Domperidone",c:"gi"},
    {b:"Ganaton",g:"Itopride",c:"gi"},
    {b:"Gasmotin",g:"Mosapride",c:"gi"},
    {b:"Buscopan",g:"Hyoscine Butylbromide",c:"gi"},
    {b:"Duspatalin",g:"Mebeverine",c:"gi"},
    {b:"Meteospasmyl",g:"Alverine/Simethicone",c:"gi"},
    {b:"Ursolin",g:"Ursodeoxycholic Acid",c:"gi"},
    {b:"Creon",g:"Pancreatin",c:"gi"},
    {b:"Xifaxan",g:"Rifaximin",c:"gi"},
    {b:"Ultracarbon",g:"Activated Charcoal",c:"gi"},
    {b:"Dramamine",g:"Dimenhydrinate",c:"antiemetic"},
    {b:"Stugeron",g:"Cinnarizine",c:"antiemetic"},
    {b:"Serc",g:"Betahistine",c:"antiemetic"},
    {b:"Sibelium",g:"Flunarizine",c:"antiemetic"},
    {b:"Zofran",g:"Ondansetron",c:"antiemetic"},
    {b:"Onsia",g:"Ondansetron",c:"antiemetic"},
    {b:"Kwells",g:"Hyoscine",c:"antiemetic"},
    {b:"Scopoderm TTS",g:"Scopolamine Patch",c:"antiemetic"},
    {b:"Dulcolax",g:"Bisacodyl",c:"laxative"},
    {b:"Senokot",g:"Senna",c:"laxative"},
    {b:"Duphalac",g:"Lactulose",c:"laxative"},
    {b:"Mucilin",g:"Ispaghula Husk",c:"laxative"},
    {b:"Fybogel",g:"Ispaghula Husk",c:"laxative"},
    {b:"Unilax",g:"Sodium Picosulfate",c:"laxative"},
    {b:"Milk of Magnesia",g:"Magnesium Hydroxide",c:"laxative"},
    {b:"Forlax",g:"Polyethylene Glycol",c:"laxative"},
    {b:"Unison Glycerin",g:"Glycerin Suppository",c:"laxative"},
    {b:"Swiff",g:"Sorbitol Enema",c:"laxative"},
    {b:"Imodium",g:"Loperamide",c:"antidiarrheal"},
    {b:"Smecta",g:"Diosmectite",c:"antidiarrheal"},
    {b:"Hidrasec",g:"Racecadotril",c:"antidiarrheal"},
    {b:"Enterogermina",g:"Bacillus clausii",c:"antidiarrheal"},
    {b:"Infloran",g:"Lactobacillus/Bifidobacterium",c:"antidiarrheal"},
    {b:"Lacteol Forte",g:"Lactobacillus",c:"antidiarrheal"},
    {b:"Ultra-Levure",g:"Saccharomyces boulardii",c:"antidiarrheal"},
    {b:"ORS",g:"Oral Rehydration Salts",c:"antidiarrheal"},
    {b:"Electrolyte Beverage",g:"ORS",c:"antidiarrheal"},
    {b:"Amoxil",g:"Amoxicillin",c:"antibiotic"},
    {b:"Ibiamox",g:"Amoxicillin",c:"antibiotic"},
    {b:"Augmentin",g:"Amoxicillin/Clavulanate",c:"antibiotic"},
    {b:"Curam",g:"Amoxicillin/Clavulanate",c:"antibiotic"},
    {b:"Ceporex",g:"Cephalexin",c:"antibiotic"},
    {b:"Keflex",g:"Cephalexin",c:"antibiotic"},
    {b:"Zinnat",g:"Cefuroxime",c:"antibiotic"},
    {b:"Suprax",g:"Cefixime",c:"antibiotic"},
    {b:"Omnicef",g:"Cefdinir",c:"antibiotic"},
    {b:"Zithromax",g:"Azithromycin",c:"antibiotic"},
    {b:"Klacid",g:"Clarithromycin",c:"antibiotic"},
    {b:"Rulid",g:"Roxithromycin",c:"antibiotic"},
    {b:"Erythrocin",g:"Erythromycin",c:"antibiotic"},
    {b:"Dalacin C",g:"Clindamycin",c:"antibiotic"},
    {b:"Ciproxin",g:"Ciprofloxacin",c:"antibiotic"},
    {b:"Cravit",g:"Levofloxacin",c:"antibiotic"},
    {b:"Tarivid",g:"Ofloxacin",c:"antibiotic"},
    {b:"Avelox",g:"Moxifloxacin",c:"antibiotic"},
    {b:"Vibramycin",g:"Doxycycline",c:"antibiotic"},
    {b:"Doxymycin",g:"Doxycycline",c:"antibiotic"},
    {b:"Minocin",g:"Minocycline",c:"antibiotic"},
    {b:"Flagyl",g:"Metronidazole",c:"antibiotic"},
    {b:"Fasigyn",g:"Tinidazole",c:"antibiotic"},
    {b:"Bactrim",g:"Trimethoprim/Sulfamethoxazole",c:"antibiotic"},
    {b:"Monurol",g:"Fosfomycin",c:"antibiotic"},
    {b:"Macrodantin",g:"Nitrofurantoin",c:"antibiotic"},
    {b:"Fucidin",g:"Fusidic Acid",c:"dermatology"},
    {b:"Dicloxacillin GPO",g:"Dicloxacillin",c:"antibiotic"},
    {b:"Penicillin V",g:"Phenoxymethylpenicillin",c:"antibiotic"},
    {b:"Canesten",g:"Clotrimazole",c:"antifungal"},
    {b:"Daktarin",g:"Miconazole",c:"antifungal"},
    {b:"Nizoral",g:"Ketoconazole",c:"antifungal"},
    {b:"Nizoral Shampoo",g:"Ketoconazole",c:"antifungal"},
    {b:"Lamisil",g:"Terbinafine",c:"antifungal"},
    {b:"Sporanox",g:"Itraconazole",c:"antifungal"},
    {b:"Diflucan",g:"Fluconazole",c:"antifungal"},
    {b:"Loceryl",g:"Amorolfine",c:"antifungal"},
    {b:"Mycostatin",g:"Nystatin",c:"antifungal"},
    {b:"Selsun",g:"Selenium Sulfide",c:"antifungal"},
    {b:"Pevisone",g:"Econazole/Triamcinolone",c:"antifungal"},
    {b:"Gyno-Canesten",g:"Clotrimazole Vaginal",c:"antifungal"},
    {b:"Zovirax",g:"Acyclovir",c:"antiviral"},
    {b:"Zovirax Cream",g:"Acyclovir",c:"antiviral"},
    {b:"Valtrex",g:"Valacyclovir",c:"antiviral"},
    {b:"Tamiflu",g:"Oseltamivir",c:"antiviral"},
    {b:"Paxlovid",g:"Nirmatrelvir/Ritonavir",c:"antiviral"},
    {b:"Favipiravir GPO",g:"Favipiravir",c:"antiviral"},
    {b:"Baraclude",g:"Entecavir",c:"antiviral"},
    {b:"Viread",g:"Tenofovir",c:"antiviral"},
    {b:"Zentel",g:"Albendazole",c:"antiparasitic"},
    {b:"Alben",g:"Albendazole",c:"antiparasitic"},
    {b:"Vermox",g:"Mebendazole",c:"antiparasitic"},
    {b:"Combantrin",g:"Pyrantel Pamoate",c:"antiparasitic"},
    {b:"Biltricide",g:"Praziquantel",c:"antiparasitic"},
    {b:"Stromectol",g:"Ivermectin",c:"antiparasitic"},
    {b:"Plaquenil",g:"Hydroxychloroquine",c:"antiparasitic"},
    {b:"Scabimite",g:"Permethrin",c:"antiparasitic"},
    {b:"Benzyl Benzoate",g:"Benzyl Benzoate",c:"antiparasitic"},
    {b:"Norvasc",g:"Amlodipine",c:"cardiovascular"},
    {b:"Amlopine",g:"Amlodipine",c:"cardiovascular"},
    {b:"Adalat CR",g:"Nifedipine",c:"cardiovascular"},
    {b:"Plendil",g:"Felodipine",c:"cardiovascular"},
    {b:"Herbesser",g:"Diltiazem",c:"cardiovascular"},
    {b:"Isoptin",g:"Verapamil",c:"cardiovascular"},
    {b:"Zanidip",g:"Lercanidipine",c:"cardiovascular"},
    {b:"Renitec",g:"Enalapril",c:"cardiovascular"},
    {b:"Zestril",g:"Lisinopril",c:"cardiovascular"},
    {b:"Coversyl",g:"Perindopril",c:"cardiovascular"},
    {b:"Tritace",g:"Ramipril",c:"cardiovascular"},
    {b:"Capoten",g:"Captopril",c:"cardiovascular"},
    {b:"Cozaar",g:"Losartan",c:"cardiovascular"},
    {b:"Diovan",g:"Valsartan",c:"cardiovascular"},
    {b:"Approvel",g:"Irbesartan",c:"cardiovascular"},
    {b:"Atacand",g:"Candesartan",c:"cardiovascular"},
    {b:"Micardis",g:"Telmisartan",c:"cardiovascular"},
    {b:"Olmetec",g:"Olmesartan",c:"cardiovascular"},
    {b:"Tenormin",g:"Atenolol",c:"cardiovascular"},
    {b:"Betaloc",g:"Metoprolol",c:"cardiovascular"},
    {b:"Concor",g:"Bisoprolol",c:"cardiovascular"},
    {b:"Inderal",g:"Propranolol",c:"cardiovascular"},
    {b:"Dilatrend",g:"Carvedilol",c:"cardiovascular"},
    {b:"Nebilet",g:"Nebivolol",c:"cardiovascular"},
    {b:"Lasix",g:"Furosemide",c:"cardiovascular"},
    {b:"Aldactone",g:"Spironolactone",c:"cardiovascular"},
    {b:"Natrilix",g:"Indapamide",c:"cardiovascular"},
    {b:"Dichlotride",g:"Hydrochlorothiazide",c:"cardiovascular"},
    {b:"Cardura",g:"Doxazosin",c:"cardiovascular"},
    {b:"Minipress",g:"Prazosin",c:"cardiovascular"},
    {b:"Aldomet",g:"Methyldopa",c:"cardiovascular"},
    {b:"Apresoline",g:"Hydralazine",c:"cardiovascular"},
    {b:"Isordil",g:"Isosorbide Dinitrate",c:"cardiovascular"},
    {b:"Imdur",g:"Isosorbide Mononitrate",c:"cardiovascular"},
    {b:"Nitromint",g:"Nitroglycerin",c:"cardiovascular"},
    {b:"Procoralan",g:"Ivabradine",c:"cardiovascular"},
    {b:"Lanoxin",g:"Digoxin",c:"cardiovascular"},
    {b:"Cordarone",g:"Amiodarone",c:"cardiovascular"},
    {b:"Vastarel",g:"Trimetazidine",c:"cardiovascular"},
    {b:"Zocor",g:"Simvastatin",c:"lipid"},
    {b:"Lipitor",g:"Atorvastatin",c:"lipid"},
    {b:"Crestor",g:"Rosuvastatin",c:"lipid"},
    {b:"Lescol",g:"Fluvastatin",c:"lipid"},
    {b:"Livalo",g:"Pitavastatin",c:"lipid"},
    {b:"Mevacor",g:"Lovastatin",c:"lipid"},
    {b:"Lipanthyl",g:"Fenofibrate",c:"lipid"},
    {b:"Lopid",g:"Gemfibrozil",c:"lipid"},
    {b:"Bezalip",g:"Bezafibrate",c:"lipid"},
    {b:"Ezetrol",g:"Ezetimibe",c:"lipid"},
    {b:"Vytorin",g:"Simvastatin/Ezetimibe",c:"lipid"},
    {b:"Aspent",g:"Aspirin Low Dose",c:"anticoagulant"},
    {b:"Cardiprin",g:"Aspirin Low Dose",c:"anticoagulant"},
    {b:"Plavix",g:"Clopidogrel",c:"anticoagulant"},
    {b:"Brilinta",g:"Ticagrelor",c:"anticoagulant"},
    {b:"Effient",g:"Prasugrel",c:"anticoagulant"},
    {b:"Pletaal",g:"Cilostazol",c:"anticoagulant"},
    {b:"Persantin",g:"Dipyridamole",c:"anticoagulant"},
    {b:"Orfarin",g:"Warfarin",c:"anticoagulant"},
    {b:"Coumadin",g:"Warfarin",c:"anticoagulant"},
    {b:"Xarelto",g:"Rivaroxaban",c:"anticoagulant"},
    {b:"Eliquis",g:"Apixaban",c:"anticoagulant"},
    {b:"Pradaxa",g:"Dabigatran",c:"anticoagulant"},
    {b:"Lixiana",g:"Edoxaban",c:"anticoagulant"},
    {b:"Clexane",g:"Enoxaparin",c:"anticoagulant"},
    {b:"Trental",g:"Pentoxifylline",c:"anticoagulant"},
    {b:"Glucophage",g:"Metformin",c:"antidiabetic"},
    {b:"Glucovance",g:"Metformin/Glibenclamide",c:"antidiabetic"},
    {b:"Diamicron",g:"Gliclazide",c:"antidiabetic"},
    {b:"Amaryl",g:"Glimepiride",c:"antidiabetic"},
    {b:"Daonil",g:"Glibenclamide",c:"antidiabetic"},
    {b:"Minidiab",g:"Glipizide",c:"antidiabetic"},
    {b:"Actos",g:"Pioglitazone",c:"antidiabetic"},
    {b:"Januvia",g:"Sitagliptin",c:"antidiabetic"},
    {b:"Galvus",g:"Vildagliptin",c:"antidiabetic"},
    {b:"Trajenta",g:"Linagliptin",c:"antidiabetic"},
    {b:"Onglyza",g:"Saxagliptin",c:"antidiabetic"},
    {b:"Jardiance",g:"Empagliflozin",c:"antidiabetic"},
    {b:"Forxiga",g:"Dapagliflozin",c:"antidiabetic"},
    {b:"Invokana",g:"Canagliflozin",c:"antidiabetic"},
    {b:"Glucobay",g:"Acarbose",c:"antidiabetic"},
    {b:"Basen",g:"Voglibose",c:"antidiabetic"},
    {b:"NovoNorm",g:"Repaglinide",c:"antidiabetic"},
    {b:"Lantus",g:"Insulin Glargine",c:"antidiabetic"},
    {b:"Levemir",g:"Insulin Detemir",c:"antidiabetic"},
    {b:"Tresiba",g:"Insulin Degludec",c:"antidiabetic"},
    {b:"NovoRapid",g:"Insulin Aspart",c:"antidiabetic"},
    {b:"Humalog",g:"Insulin Lispro",c:"antidiabetic"},
    {b:"Mixtard",g:"Insulin Mixed",c:"antidiabetic"},
    {b:"Victoza",g:"Liraglutide",c:"antidiabetic"},
    {b:"Trulicity",g:"Dulaglutide",c:"antidiabetic"},
    {b:"Ozempic",g:"Semaglutide",c:"antidiabetic"},
    {b:"Eltroxin",g:"Levothyroxine",c:"thyroid"},
    {b:"Euthyrox",g:"Levothyroxine",c:"thyroid"},
    {b:"Thyrosit",g:"Levothyroxine",c:"thyroid"},
    {b:"Tapazole",g:"Methimazole",c:"thyroid"},
    {b:"PTU",g:"Propylthiouracil",c:"thyroid"},
    {b:"Harnal",g:"Tamsulosin",c:"urology"},
    {b:"Xatral",g:"Alfuzosin",c:"urology"},
    {b:"Urorec",g:"Silodosin",c:"urology"},
    {b:"Hytrin",g:"Terazosin",c:"urology"},
    {b:"Proscar",g:"Finasteride",c:"urology"},
    {b:"Avodart",g:"Dutasteride",c:"urology"},
    {b:"Viagra",g:"Sildenafil",c:"urology"},
    {b:"Cialis",g:"Tadalafil",c:"urology"},
    {b:"Levitra",g:"Vardenafil",c:"urology"},
    {b:"Vesicare",g:"Solifenacin",c:"urology"},
    {b:"Detrusitol",g:"Tolterodine",c:"urology"},
    {b:"Ditropan",g:"Oxybutynin",c:"urology"},
    {b:"Betmiga",g:"Mirabegron",c:"urology"},
    {b:"Pyridium",g:"Phenazopyridine",c:"urology"},
    {b:"Uralyt-U",g:"Potassium Sodium Citrate",c:"urology"},
    {b:"Yasmin",g:"Ethinylestradiol/Drospirenone",c:"hormone"},
    {b:"Yaz",g:"Ethinylestradiol/Drospirenone",c:"hormone"},
    {b:"Diane-35",g:"Ethinylestradiol/Cyproterone",c:"hormone"},
    {b:"Marvelon",g:"Ethinylestradiol/Desogestrel",c:"hormone"},
    {b:"Mercilon",g:"Ethinylestradiol/Desogestrel",c:"hormone"},
    {b:"Microgynon",g:"Ethinylestradiol/Levonorgestrel",c:"hormone"},
    {b:"Anna",g:"Ethinylestradiol/Levonorgestrel",c:"hormone"},
    {b:"Preme",g:"Ethinylestradiol/Levonorgestrel",c:"hormone"},
    {b:"Madonna",g:"Ethinylestradiol/Levonorgestrel",c:"hormone"},
    {b:"Postinor",g:"Levonorgestrel",c:"hormone"},
    {b:"Madonna 72",g:"Levonorgestrel",c:"hormone"},
    {b:"Duphaston",g:"Dydrogesterone",c:"hormone"},
    {b:"Provera",g:"Medroxyprogesterone",c:"hormone"},
    {b:"Primolut N",g:"Norethisterone",c:"hormone"},
    {b:"Utrogestan",g:"Progesterone",c:"hormone"},
    {b:"Livial",g:"Tibolone",c:"hormone"},
    {b:"Premarin",g:"Conjugated Estrogens",c:"hormone"},
    {b:"Clomid",g:"Clomiphene",c:"hormone"},
    {b:"Transamin",g:"Tranexamic Acid",c:"hormone"},
    {b:"Obimin",g:"Prenatal Vitamin",c:"hormone"},
    {b:"Ferli-6",g:"Iron/Folic Acid",c:"hormone"},
    {b:"Sangobion",g:"Iron Supplement",c:"hormone"},
    {b:"Elomet",g:"Mometasone",c:"dermatology"},
    {b:"Dermovate",g:"Clobetasol",c:"dermatology"},
    {b:"Betnovate",g:"Betamethasone",c:"dermatology"},
    {b:"Diprosone",g:"Betamethasone Dipropionate",c:"dermatology"},
    {b:"Kenacort",g:"Triamcinolone",c:"dermatology"},
    {b:"Aristocort",g:"Triamcinolone",c:"dermatology"},
    {b:"Advantan",g:"Methylprednisolone Aceponate",c:"dermatology"},
    {b:"Eumovate",g:"Clobetasone",c:"dermatology"},
    {b:"Hydrocortisone Cream",g:"Hydrocortisone",c:"dermatology"},
    {b:"Elidel",g:"Pimecrolimus",c:"dermatology"},
    {b:"Protopic",g:"Tacrolimus",c:"dermatology"},
    {b:"Bactroban",g:"Mupirocin",c:"dermatology"},
    {b:"Fucidin Cream",g:"Fusidic Acid",c:"dermatology"},
    {b:"Betadine",g:"Povidone Iodine",c:"dermatology"},
    {b:"Hibiscrub",g:"Chlorhexidine",c:"dermatology"},
    {b:"Caladryl",g:"Calamine",c:"dermatology"},
    {b:"Calamine Lotion",g:"Calamine",c:"dermatology"},
    {b:"Differin",g:"Adapalene",c:"dermatology"},
    {b:"Retin-A",g:"Tretinoin",c:"dermatology"},
    {b:"Roaccutane",g:"Isotretinoin",c:"dermatology"},
    {b:"Benzac",g:"Benzoyl Peroxide",c:"dermatology"},
    {b:"Duac",g:"Clindamycin/Benzoyl Peroxide",c:"dermatology"},
    {b:"Skinoren",g:"Azelaic Acid",c:"dermatology"},
    {b:"Regaine",g:"Minoxidil",c:"dermatology"},
    {b:"Hirudoid",g:"Heparinoid",c:"dermatology"},
    {b:"Madecassol",g:"Centella Asiatica",c:"dermatology"},
    {b:"Counterpain",g:"Methyl Salicylate",c:"dermatology"},
    {b:"Voltaren Emulgel",g:"Diclofenac Gel",c:"dermatology"},
    {b:"Tiger Balm",g:"Camphor/Menthol",c:"dermatology"},
    {b:"Zam-Buk",g:"Camphor/Eucalyptus",c:"dermatology"},
    {b:"Vaseline",g:"Petroleum Jelly",c:"dermatology"},
    {b:"Cetaphil",g:"Emollient",c:"dermatology"},
    {b:"Physiogel",g:"Emollient",c:"dermatology"},
    {b:"Eucerin",g:"Emollient",c:"dermatology"},
    {b:"QV Cream",g:"Emollient",c:"dermatology"},
    {b:"Urea Cream",g:"Urea",c:"dermatology"},
    {b:"Silverine",g:"Silver Sulfadiazine",c:"dermatology"},
    {b:"Burnova",g:"Aloe Vera Gel",c:"dermatology"},
    {b:"Archifen",g:"Chloramphenicol",c:"ophthalmic"},
    {b:"Tobrex",g:"Tobramycin",c:"ophthalmic"},
    {b:"Cravit Eye Drops",g:"Levofloxacin",c:"ophthalmic"},
    {b:"Vigamox",g:"Moxifloxacin",c:"ophthalmic"},
    {b:"Refresh Tears",g:"Carboxymethylcellulose",c:"ophthalmic"},
    {b:"Systane",g:"Polyethylene Glycol/Propylene Glycol",c:"ophthalmic"},
    {b:"Optive",g:"Carboxymethylcellulose",c:"ophthalmic"},
    {b:"Hyabak",g:"Sodium Hyaluronate",c:"ophthalmic"},
    {b:"Vismed",g:"Sodium Hyaluronate",c:"ophthalmic"},
    {b:"Hylo-Comod",g:"Sodium Hyaluronate",c:"ophthalmic"},
    {b:"Patanol",g:"Olopatadine",c:"ophthalmic"},
    {b:"Zaditen Eye Drops",g:"Ketotifen",c:"ophthalmic"},
    {b:"Opticrom",g:"Sodium Cromoglycate",c:"ophthalmic"},
    {b:"Visine",g:"Tetrahydrozoline",c:"ophthalmic"},
    {b:"Naphcon-A",g:"Naphazoline/Pheniramine",c:"ophthalmic"},
    {b:"Maxitrol",g:"Dexamethasone/Neomycin/Polymyxin",c:"ophthalmic"},
    {b:"FML",g:"Fluorometholone",c:"ophthalmic"},
    {b:"Pred Forte",g:"Prednisolone Acetate",c:"ophthalmic"},
    {b:"Timoptic",g:"Timolol",c:"ophthalmic"},
    {b:"Xalatan",g:"Latanoprost",c:"ophthalmic"},
    {b:"Alphagan",g:"Brimonidine",c:"ophthalmic"},
    {b:"Trusopt",g:"Dorzolamide",c:"ophthalmic"},
    {b:"Otosporin",g:"Neomycin/Polymyxin/Hydrocortisone",c:"ent"},
    {b:"Ofloxacin Ear Drops",g:"Ofloxacin",c:"ent"},
    {b:"Kenalog in Orabase",g:"Triamcinolone Oral Paste",c:"ent"},
    {b:"Daktarin Oral Gel",g:"Miconazole",c:"ent"},
    {b:"Mycostatin Oral",g:"Nystatin",c:"ent"},
    {b:"Difflam Mouthwash",g:"Benzydamine",c:"ent"},
    {b:"Betadine Gargle",g:"Povidone Iodine",c:"ent"},
    {b:"Listerine",g:"Antiseptic Mouthwash",c:"ent"},
    {b:"Dequadin",g:"Dequalinium",c:"ent"},
    {b:"Bactidol",g:"Hexetidine",c:"ent"},
    {b:"Xylocaine Gel",g:"Lidocaine",c:"ent"},
    {b:"Valium",g:"Diazepam",c:"cns"},
    {b:"Ativan",g:"Lorazepam",c:"cns"},
    {b:"Rivotril",g:"Clonazepam",c:"cns"},
    {b:"Xanax",g:"Alprazolam",c:"cns"},
    {b:"Dormicum",g:"Midazolam",c:"cns"},
    {b:"Stilnox",g:"Zolpidem",c:"cns"},
    {b:"Circadin",g:"Melatonin",c:"cns"},
    {b:"Tryptanol",g:"Amitriptyline",c:"cns"},
    {b:"Prozac",g:"Fluoxetine",c:"cns"},
    {b:"Zoloft",g:"Sertraline",c:"cns"},
    {b:"Lexapro",g:"Escitalopram",c:"cns"},
    {b:"Seroxat",g:"Paroxetine",c:"cns"},
    {b:"Faverin",g:"Fluvoxamine",c:"cns"},
    {b:"Efexor",g:"Venlafaxine",c:"cns"},
    {b:"Cymbalta",g:"Duloxetine",c:"cns"},
    {b:"Wellbutrin",g:"Bupropion",c:"cns"},
    {b:"Remeron",g:"Mirtazapine",c:"cns"},
    {b:"Risperdal",g:"Risperidone",c:"cns"},
    {b:"Seroquel",g:"Quetiapine",c:"cns"},
    {b:"Zyprexa",g:"Olanzapine",c:"cns"},
    {b:"Abilify",g:"Aripiprazole",c:"cns"},
    {b:"Haldol",g:"Haloperidol",c:"cns"},
    {b:"Largactil",g:"Chlorpromazine",c:"cns"},
    {b:"Dilantin",g:"Phenytoin",c:"cns"},
    {b:"Tegretol",g:"Carbamazepine",c:"cns"},
    {b:"Depakine",g:"Valproate",c:"cns"},
    {b:"Lamictal",g:"Lamotrigine",c:"cns"},
    {b:"Keppra",g:"Levetiracetam",c:"cns"},
    {b:"Topamax",g:"Topiramate",c:"cns"},
    {b:"Aricept",g:"Donepezil",c:"cns"},
    {b:"Ebixa",g:"Memantine",c:"cns"},
    {b:"Madopar",g:"Levodopa/Benserazide",c:"cns"},
    {b:"Sinemet",g:"Levodopa/Carbidopa",c:"cns"},
    {b:"Mirapex",g:"Pramipexole",c:"cns"},
    {b:"Artane",g:"Trihexyphenidyl",c:"cns"},
    {b:"Imigran",g:"Sumatriptan",c:"cns"},
    {b:"Maxalt",g:"Rizatriptan",c:"cns"},
    {b:"Cafergot",g:"Ergotamine/Caffeine",c:"cns"},
    {b:"Concerta",g:"Methylphenidate",c:"cns"},
    {b:"Ritalin",g:"Methylphenidate",c:"cns"},
    {b:"Strattera",g:"Atomoxetine",c:"cns"},
    {b:"Nootropil",g:"Piracetam",c:"cns"},
    {b:"Berocca",g:"Vitamin B Complex",c:"vitamin"},
    {b:"Surbex-T",g:"Vitamin B Complex/C",c:"vitamin"},
    {b:"Centrum",g:"Multivitamin",c:"vitamin"},
    {b:"Pharmaton",g:"Multivitamin/Ginseng",c:"vitamin"},
    {b:"Redoxon",g:"Vitamin C",c:"vitamin"},
    {b:"Cebion",g:"Vitamin C",c:"vitamin"},
    {b:"Caltrate",g:"Calcium/Vitamin D3",c:"vitamin"},
    {b:"Ostelin",g:"Vitamin D",c:"vitamin"},
    {b:"Osteocare",g:"Calcium/Magnesium/Zinc",c:"vitamin"},
    {b:"Blackmores Fish Oil",g:"Omega-3",c:"vitamin"},
    {b:"Viartril-S",g:"Glucosamine Sulfate",c:"vitamin"},
    {b:"Dona",g:"Glucosamine Sulfate",c:"vitamin"},
    {b:"Tanakan",g:"Ginkgo Biloba",c:"vitamin"},
    {b:"Tebonin",g:"Ginkgo Biloba",c:"vitamin"},
    {b:"Legalon",g:"Milk Thistle",c:"vitamin"},
    {b:"Livolin Forte",g:"Essential Phospholipids",c:"vitamin"},
    {b:"Essentiale Forte",g:"Essential Phospholipids",c:"vitamin"},
    {b:"Neurobion",g:"Vitamin B1/B6/B12",c:"vitamin"},
    {b:"Nat B",g:"Vitamin B Complex",c:"vitamin"},
    {b:"Folic Acid GPO",g:"Folic Acid",c:"vitamin"},
    {b:"Ferrous Fumarate GPO",g:"Ferrous Fumarate",c:"vitamin"},
    {b:"Zinc Sulfate GPO",g:"Zinc",c:"vitamin"},
    {b:"Elevit",g:"Prenatal Vitamin",c:"vitamin"},
    {b:"Blackmores Pregnancy",g:"Prenatal Vitamin",c:"vitamin"},
    {b:"Nicorette",g:"Nicotine Gum",c:"misc"},
    {b:"Nicotinell",g:"Nicotine Patch",c:"misc"},
    {b:"Champix",g:"Varenicline",c:"misc"},
    {b:"Xenical",g:"Orlistat",c:"misc"},
    {b:"Saxenda",g:"Liraglutide",c:"misc"},
    {b:"Normal Saline",g:"Sodium Chloride 0.9%",c:"misc"},
    {b:"Sterile Water",g:"Water for Injection",c:"misc"},
    {b:"Andrographis Capsule",g:"Andrographis Paniculata",c:"herbal"},
    {b:"Krachaidum Capsule",g:"Kaempferia Parviflora",c:"herbal"},
    {b:"Curcumin Capsule",g:"Turmeric",c:"herbal"},
    {b:"Ya Hom",g:"Thai Herbal Powder",c:"herbal"},
    {b:"Prasaplai",g:"Thai Herbal",c:"herbal"},
    {b:"Chandaleela",g:"Thai Herbal Antipyretic",c:"herbal"},
    {b:"Ginger Capsule",g:"Zingiber Officinale",c:"herbal"},
    {b:"Senna Thai",g:"Senna Alexandrina",c:"herbal"},
    {b:"Dextromed",g:"Dextromethorphan/Chlorpheniramine/Terpin Hydrate",c:"respiratory"},
    {b:"Cophartussin",g:"Dextromethorphan/Guaifenesin/Terpin Hydrate",c:"respiratory"},
    {b:"D-Coate",g:"Dextromethorphan/Guaifenesin/Terpin Hydrate",c:"respiratory"},
    {b:"Clinicoff",g:"Dextromethorphan/Guaifenesin",c:"respiratory"},
    {b:"Macrotap-NT",g:"Paracetamol/Dextromethorphan/Doxylamine",c:"respiratory"},
    {b:"COVIR-400",g:"Acyclovir",c:"antiviral",warnings:["drinkWater","renalDoseAdjust"]},
    {b:"Valovir-500",g:"Valacyclovir",c:"antiviral",warnings:["drinkWater"]},
    {b:"Vilerm-200",g:"Acyclovir",c:"antiviral"},
    {b:"Vilerm-800",g:"Acyclovir",c:"antiviral",warnings:["drinkWater"]},
    {b:"Vilerm Cream",g:"Acyclovir 5%",c:"antiviral",warnings:["extra28","extra31"]},
    {b:"Vivax Cream",g:"Acyclovir 5%",c:"antiviral",warnings:["extra28"]},
    {b:"Zevin Cream",g:"Acyclovir 5%",c:"antiviral",warnings:["extra28"]},
    {b:"Nasotapp",g:"Cold/Decongestant Combo",c:"respiratory"},
    {b:"Sinufen",g:"Cold/Decongestant Combo",c:"respiratory"},
    {b:"Sulidine",g:"Cold/Decongestant Combo",c:"respiratory"},
    {b:"Nasolin",g:"Cold/Decongestant Combo",c:"respiratory"},
    {b:"Clinicold",g:"Cold/Decongestant Combo",c:"respiratory"},
    {b:"Cettec",g:"Cetirizine",c:"antihistamine"},
    {b:"Alerest",g:"Bilastine",c:"antihistamine"},
    {b:"Hydrox",g:"Hydroxyzine",c:"antihistamine"},
    {b:"AMK 1000",g:"Amoxicillin/Clavulanate Potassium",c:"antibiotic",warnings:["extra04","penicillinAllergyCheck"]},
    {b:"Amoksiklav",g:"Amoxicillin/Clavulanate Potassium",c:"antibiotic",warnings:["extra04","penicillinAllergyCheck"]},
    {b:"Ranclav",g:"Amoxicillin/Clavulanate Potassium",c:"antibiotic",warnings:["extra04","penicillinAllergyCheck"]},
    {b:"Kremil-S",g:"Antacid/Simethicone",c:"gi",warnings:["extra20"]},
    {b:"Mucosta",g:"Rebamipide",c:"gi",warnings:["chronicUseAsDirected"]},
    {b:"Colofac",g:"Mebeverine",c:"gi",warnings:["swallowWhole"]},
    {b:"Duspatin",g:"Mebeverine",c:"gi",warnings:["swallowWhole"]},
    {b:"Famosia",g:"Famotidine",c:"gi"},
    {b:"Topicorte",g:"Desoximetasone",c:"dermatology",warnings:["extra42"]},
    {b:"Systral Cream",g:"Clemastine",c:"dermatology",warnings:["extra28"]},
    {b:"Kela Lotion",g:"Triamcinolone Acetonide",c:"dermatology",warnings:["extra42"]},
    {b:"Zalain Cream",g:"Sertaconazole",c:"antifungal",warnings:["continueAntifungalAfterSymptomsClear"]},
    {b:"Travogen",g:"Isoconazole",c:"antifungal",warnings:["continueAntifungalAfterSymptomsClear"]},
    {b:"Travocort",g:"Isoconazole/Diflucortolone",c:"antifungal",warnings:["extra42"]}
];

const CATEGORY_DEFAULTS = {
    analgesic:      { indications:["painReliever","feverReducer"], type: "tablet" },
    muscleRelaxant: { indications:["muscleRelaxant"], type: "tablet" },
    gout:           { indications:[], chronic:true, type: "tablet" },
    antihistamine:  { indications:["antihistamine"], type: "tablet" },
    respiratory:    { indications:[] },
    gi:             { indications:[] },
    antiemetic:     { indications:["antiemetic","antivertigo"], type: "tablet" },
    laxative:       { indications:["laxative"] },
    antidiarrheal:  { indications:["antidiarrheal"], type: "tablet" },
    antibiotic:     { indications:["antibiotic"], advices:["drinkWater"], type: "tablet" },
    antifungal:     { indications:["antifungal"] },
    antiviral:      { indications:[] },
    antiparasitic:  { indications:[] },
    cardiovascular: { indications:["antihypertensive"], chronic:true, type: "tablet" },
    lipid:          { indications:["lipidLowering"], chronic:true, type: "tablet" },
    anticoagulant:  { indications:[], chronic:true, type: "tablet" },
    antidiabetic:   { indications:["antidiabetic"], chronic:true, type: "tablet" },
    thyroid:        { indications:[], chronic:true, type: "tablet" },
    urology:        { indications:[] },
    hormone:        { indications:[] },
    dermatology:    { indications:[], type: "cream" },
    ophthalmic:     { indications:[], type: "eye" },
    ent:            { indications:[] },
    cns:            { indications:[], chronic:true, type: "tablet" },
    vitamin:        { indications:[], type: "tablet" },
    misc:           { indications:[] },
    herbal:         { indications:[], type: "capsule" }
};

// ==========================================
// DRUG WARNING RULES (v1.8) - ระบบเตือนยาความเสี่ยงสูง / ข้อควรระวังสำคัญ
//  level: 'high' = ยาความเสี่ยงสูง (แถบแดง + ต้องยืนยันก่อนพิมพ์), 'caution' = ข้อควรระวัง (แถบเหลือง)
//  keywords: ตัวพิมพ์ใหญ่ ใช้จับคู่กับชื่อยาที่กรอก (ชื่อการค้าใน DRUG_REFERENCE_DB จะถูกแปลงเป็นชื่อสามัญให้อัตโนมัติ)
//  oralOnly: true = ไม่เตือนถ้าชนิดยาเป็นยาใช้ภายนอก/หยอด/พ่น/เหน็บ (เช่น NSAIDs แบบเจลไม่ต้องเตือนเรื่องไต)
//  adviceKeys: key ใน advicesDB ที่เภสัชกรกดปุ่ม "เพิ่มคำแนะนำบนฉลาก" ได้ (มีคำแปลครบ 15 ภาษาแล้ว)
//  ⚠️ เป็นเครื่องมือช่วยเตือนจากชื่อยาเท่านั้น ไม่แทนการตรวจสอบและการตัดสินใจของเภสัชกร
// ==========================================
const DRUG_WARNING_RULES = [
    // ---------- ความเสี่ยงสูง ----------
    { id:'warfarin', level:'high', short:'Warfarin', title:'ยาความเสี่ยงสูง: Warfarin',
      text:'เลือดออกง่าย ต้องติดตามค่า INR สม่ำเสมอ ตรวจสอบขนาดยา/วันที่ใช้ให้ตรงแพทย์สั่ง และห้ามใช้ร่วมกับ NSAIDs/แอสไพริน/สมุนไพรโดยไม่ปรึกษาเภสัชกร',
      keywords:['WARFARIN','COUMADIN'], adviceKeys:['chronicUseAsDirected'] },
    { id:'methotrexate', level:'high', short:'Methotrexate', title:'ยาความเสี่ยงสูง: Methotrexate',
      text:'ยืนยันความถี่ให้ชัดเจน (โดยทั่วไปใช้ "สัปดาห์ละครั้ง" ไม่ใช่ทุกวัน — ใช้ผิดอาจถึงชีวิต) ตรวจการทำงานของตับ/ไต และห้ามใช้ในสตรีมีครรภ์',
      keywords:['METHOTREXATE'], adviceKeys:['extra25','chronicUseAsDirected'] },
    { id:'digoxin', level:'high', short:'Digoxin', title:'ยาความเสี่ยงสูง: Digoxin',
      text:'ช่วงขนาดยาที่ปลอดภัยแคบ เกิดพิษได้ง่าย โดยเฉพาะผู้สูงอายุ/ผู้ป่วยโรคไต ตรวจสอบขนาดยาและติดตามชีพจร หากคลื่นไส้ อาเจียน ตาพร่ามัว ให้พบแพทย์',
      keywords:['DIGOXIN','LANOXIN'], adviceKeys:['chronicUseAsDirected'] },
    { id:'colchicine', level:'high', short:'Colchicine', title:'ยาความเสี่ยงสูง: Colchicine',
      text:'เป็นพิษสูงหากได้รับเกินขนาด ห้ามเพิ่มขนาดเอง ระวังในผู้ป่วยโรคไต/ตับ หากท้องเสียรุนแรงให้หยุดยาและพบแพทย์',
      keywords:['COLCHICINE'], adviceKeys:['chronicUseAsDirected'] },
    { id:'opioid', level:'high', short:'ยาควบคุมพิเศษ (Opioid)', title:'ยาความเสี่ยงสูง: ยากลุ่มโอปิออยด์ / ยาควบคุมพิเศษ',
      text:'ตรวจสอบใบสั่งยาและขนาดยา ทำให้ง่วงซึมและกดการหายใจได้ ห้ามขับรถ/ทำงานกับเครื่องจักร ห้ามดื่มแอลกอฮอล์ เสี่ยงต่อการติดยา',
      keywords:['TRAMADOL','CODEINE','MORPHINE','OXYCODONE','FENTANYL','PETHIDINE','ULTRACET'], adviceKeys:['extra12','noAlcohol'] },
    { id:'benzo', level:'high', short:'ยานอนหลับ/คลายกังวล', title:'ยาความเสี่ยงสูง: ยานอนหลับ / ยาคลายกังวล (ยาควบคุม)',
      text:'ตรวจสอบใบสั่งยา ทำให้ง่วงซึม ห้ามขับรถ ห้ามดื่มแอลกอฮอล์ และห้ามหยุดยากะทันหันหากใช้ต่อเนื่อง',
      keywords:['DIAZEPAM','ALPRAZOLAM','CLONAZEPAM','LORAZEPAM','ZOLPIDEM','MIDAZOLAM','BROMAZEPAM'], adviceKeys:['extra12','noAlcohol'] },
    { id:'insulin', level:'high', short:'Insulin', title:'ยาความเสี่ยงสูง: Insulin',
      text:'ตรวจสอบชนิดและจำนวนหน่วยยาให้ถูกต้อง ระวังภาวะน้ำตาลในเลือดต่ำ (ใจสั่น เหงื่อออก หน้ามืด) เก็บยาที่ยังไม่เปิดใช้ในตู้เย็น',
      keywords:['INSULIN'], adviceKeys:['refrigerate','chronicUseAsDirected'] },
    { id:'potassium', level:'high', short:'Potassium chloride', title:'ยาความเสี่ยงสูง: Potassium chloride (KCl)',
      text:'ระวังระดับโพแทสเซียมสูงในผู้ป่วยโรคไต/ผู้ที่ใช้ยาขับปัสสาวะหรือยากลุ่ม ACEI/ARB ห้ามเคี้ยวหรือบดเม็ดยา',
      keywords:['POTASSIUM CHLORIDE','KCL'], adviceKeys:['swallowWhole','drinkWater'] },

    // ---------- ข้อควรระวังสำคัญ ----------
    { id:'nsaid_renal', level:'caution', short:'NSAIDs (ไต/กระเพาะ)', title:'NSAIDs: อาจมีผลต่อไตและกระเพาะอาหาร', oralOnly:true,
      text:'ระวังในผู้ป่วยโรคไต ขาดน้ำ ผู้สูงอายุ โรคกระเพาะ โรคหัวใจ/ความดันโลหิตสูง และผู้ที่ใช้ยาละลายลิ่มเลือด — ซักประวัติก่อนจ่าย และแนะนำให้ดื่มน้ำมากๆ',
      keywords:['IBUPROFEN','DICLOFENAC','NAPROXEN','CELECOXIB','ETORICOXIB','MEFENAMIC','MELOXICAM','PIROXICAM','KETOPROFEN','KETOROLAC','INDOMETHACIN','ASPIRIN','LORNOXICAM'],
      adviceKeys:['takeAfterFoodProtectStomach','drinkWater'] },
    { id:'aspirin_child', level:'caution', short:'Aspirin (เด็ก)', title:'Aspirin: ห้ามใช้ในเด็กที่เป็นไข้หวัด/อีสุกอีใส', oralOnly:true,
      text:'เด็กและวัยรุ่นอายุต่ำกว่า 16 ปีที่เป็นไข้หวัด ไข้หวัดใหญ่ หรืออีสุกอีใส เสี่ยงต่อ Reye\'s syndrome และระวังเลือดออกง่าย',
      keywords:['ASPIRIN'], adviceKeys:[] },
    { id:'sulfa_allergy', level:'caution', short:'แพ้ซัลฟา', title:'ซักประวัติแพ้ยากลุ่มซัลฟา (Sulfonamide)', oralOnly:true,
      text:'ห้ามใช้ในผู้ที่มีประวัติแพ้ยากลุ่มซัลฟา หากมีผื่นแดง พุพอง หรือลอก ให้หยุดยาและพบแพทย์ทันที',
      keywords:['CELECOXIB','SULFAMETHOXAZOLE','COTRIMOXAZOLE','SULFASALAZINE','SULFADIAZINE'], adviceKeys:['extra24'] },
    { id:'penicillin_allergy', level:'caution', short:'แพ้เพนิซิลลิน', title:'ซักประวัติแพ้ยาปฏิชีวนะกลุ่มเพนิซิลลิน / เซฟาโลสปอริน', oralOnly:true,
      text:'ถามประวัติแพ้ยาปฏิชีวนะก่อนจ่ายทุกครั้ง หากมีผื่น บวมที่หน้า/ปาก หรือหายใจลำบาก ให้หยุดยาและไปโรงพยาบาลทันที',
      keywords:['AMOXICILLIN','AMPICILLIN','PENICILLIN','CLOXACILLIN','DICLOXACILLIN','CLAVULANATE','PIPERACILLIN','CEPHALEXIN','CEFIXIME','CEFDINIR','CEFUROXIME','CEFTRIAXONE','CEFPODOXIME','CEFADROXIL','CEFACLOR'],
      adviceKeys:['penicillinAllergyCheck'] },
    { id:'alcohol_nitroimidazole', level:'caution', short:'ห้ามแอลกอฮอล์', title:'ห้ามดื่มแอลกอฮอล์ระหว่างใช้ยา (Metronidazole กลุ่มเดียวกัน)', oralOnly:true,
      text:'ดื่มแอลกอฮอล์ร่วมกับยานี้อาจเกิดอาการหน้าแดง ใจสั่น คลื่นไส้ อาเจียนรุนแรง ควรงดตั้งแต่ระหว่างใช้ยาจนถึงอย่างน้อย 48–72 ชั่วโมงหลังหยุดยา',
      keywords:['METRONIDAZOLE','TINIDAZOLE','ORNIDAZOLE','SECNIDAZOLE'], adviceKeys:['noAlcohol','takeAfterFoodProtectStomach'] },
    { id:'dairy_chelation', level:'caution', short:'ห้ามกินพร้อมนม/แคลเซียม', title:'ห้ามกินพร้อมนม / ยาลดกรด / ธาตุเหล็ก / แคลเซียม', oralOnly:true,
      text:'สารเหล่านี้จับตัวกับยาทำให้ดูดซึมลดลง ควรกินยาให้ห่างกันอย่างน้อย 2 ชั่วโมง',
      keywords:['TETRACYCLINE','DOXYCYCLINE','MINOCYCLINE','CIPROFLOXACIN','LEVOFLOXACIN','NORFLOXACIN','OFLOXACIN','MOXIFLOXACIN'], adviceKeys:['extra20'] },
    { id:'fq_tendon', level:'caution', short:'เอ็นอักเสบ (Quinolone)', title:'Fluoroquinolone: เสี่ยงเอ็นอักเสบ/ฉีกขาด', oralOnly:true,
      text:'หากปวดหรือบวมบริเวณเอ็น (เช่น เอ็นร้อยหวาย) ให้หยุดยาและพบแพทย์ ระวังเป็นพิเศษในผู้สูงอายุและผู้ที่ใช้ยาสเตียรอยด์',
      keywords:['CIPROFLOXACIN','LEVOFLOXACIN','NORFLOXACIN','OFLOXACIN','MOXIFLOXACIN'], adviceKeys:['extra19','avoidSunlight'] },
    { id:'sedating', level:'caution', short:'ง่วงซึม', title:'ยาทำให้ง่วงซึม: ห้ามขับรถ / ทำงานกับเครื่องจักร', oralOnly:true,
      text:'หลีกเลี่ยงการขับรถ ทำงานกับเครื่องจักร และแอลกอฮอล์ ระวังเป็นพิเศษในผู้สูงอายุ',
      keywords:['DIPHENHYDRAMINE','DIMENHYDRINATE','CHLORPHENIRAMINE','CPM','HYDROXYZINE','ORPHENADRINE','BACLOFEN','TIZANIDINE','MUSCOL','NORGESIC','LIORESAL','LIOBAC'], adviceKeys:['extra12'] },
    { id:'paracetamol_dose', level:'caution', short:'Paracetamol (ตับ)', title:'Paracetamol: ห้ามเกินขนาดสูงสุดต่อวัน', 
      text:'ผู้ใหญ่ไม่เกิน 4,000 มก./วัน (เช่น 500 มก. ไม่เกิน 8 เม็ด) เว้นระยะห่าง 4–6 ชม. ระวังผู้ป่วยโรคตับ/ดื่มสุราเป็นประจำ และตรวจสอบว่าไม่ได้ใช้ยาสูตรผสมที่มี Paracetamol ซ้ำ',
      keywords:['PARACETAMOL','ACETAMINOPHEN'], adviceKeys:[] },
    { id:'steroid_oral', level:'caution', short:'สเตียรอยด์ชนิดรับประทาน', title:'สเตียรอยด์ชนิดรับประทาน: ห้ามหยุดยากะทันหัน', oralOnly:true,
      text:'หากใช้ต่อเนื่องเกิน 2–3 สัปดาห์ ห้ามหยุดเอง ควรทานหลังอาหาร ระวังน้ำตาลในเลือดสูง ความดันสูง และแผลในกระเพาะอาหาร',
      keywords:['PREDNISOLONE','PREDNISONE','DEXAMETHASONE','METHYLPREDNISOLONE','BETAMETHASONE'], adviceKeys:['takeAfterFoodProtectStomach','chronicUseAsDirected'] },
    { id:'renal_dose', level:'caution', short:'ยาที่กระทบไต/ปรับขนาดตามไต', title:'ยาที่มีผลต่อไต / ต้องปรับขนาดตามการทำงานของไต', oralOnly:true,
      text:'ตรวจสอบค่าไต (eGFR/Creatinine) ก่อนจ่าย ผู้ป่วยโรคไตเรื้อรังหรือผู้สูงอายุอาจต้องลดขนาดยา และควรดื่มน้ำให้เพียงพอ',
      keywords:['METFORMIN','ALLOPURINOL','ACYCLOVIR','VALACYCLOVIR','GABAPENTIN','PREGABALIN','ENALAPRIL','LISINOPRIL','CAPTOPRIL','LOSARTAN','VALSARTAN','IRBESARTAN','TELMISARTAN','CANDESARTAN','SPIRONOLACTONE'],
      adviceKeys:['drinkWater'] },
    { id:'rash_stop', level:'caution', short:'ผื่นรุนแรง (SJS/TEN)', title:'ยาที่เสี่ยงผื่นแพ้รุนแรง: หยุดยาทันทีหากมีผื่น', oralOnly:true,
      text:'หากมีผื่นแดง พุพอง ลอก หรือแผลในปาก/ตา ให้หยุดยาและพบแพทย์ทันที',
      keywords:['ALLOPURINOL','CARBAMAZEPINE','PHENYTOIN','LAMOTRIGINE','SULFAMETHOXAZOLE','COTRIMOXAZOLE','NEVIRAPINE'], adviceKeys:['extra24'] },
    { id:'grapefruit', level:'caution', short:'ห้ามน้ำเกรปฟรุต', title:'ห้ามรับประทานร่วมกับน้ำเกรปฟรุต', oralOnly:true,
      text:'น้ำเกรปฟรุตทำให้ระดับยาในเลือดสูงขึ้น เพิ่มความเสี่ยงผลข้างเคียง (เช่น ปวดกล้ามเนื้อจากยากลุ่มสแตติน ความดันต่ำจากยากลุ่ม CCB)',
      keywords:['SIMVASTATIN','LOVASTATIN','ATORVASTATIN','FELODIPINE','NIFEDIPINE'], adviceKeys:['extra21'] },
    { id:'pde5_nitrate', level:'caution', short:'ห้ามใช้ร่วมกับ Nitrate', title:'ห้ามใช้ร่วมกับยากลุ่ม Nitrate เด็ดขาด', oralOnly:true,
      text:'ใช้ร่วมกับ Nitrate (เช่น ยาอมใต้ลิ้นแก้เจ็บหน้าอก) อาจทำให้ความดันโลหิตต่ำอย่างรุนแรง ซักประวัติโรคหัวใจก่อนจ่ายทุกครั้ง',
      keywords:['SILDENAFIL','TADALAFIL','VARDENAFIL'], adviceKeys:['extra22'] },
    { id:'pregnancy_risk', level:'caution', short:'ห้ามใช้ในสตรีมีครรภ์', title:'อันตรายต่อทารกในครรภ์: ห้ามใช้ในสตรีมีครรภ์', oralOnly:true,
      text:'ซักประวัติการตั้งครรภ์/การวางแผนตั้งครรภ์ก่อนจ่ายทุกครั้ง และแนะนำการคุมกำเนิดระหว่างใช้ยา',
      keywords:['ISOTRETINOIN','ACITRETIN','METHOTREXATE','MISOPROSTOL','LEFLUNOMIDE','THALIDOMIDE','VALPROATE'], adviceKeys:['extra25'] }
];

// ==========================================
// CLINICAL SAFETY DB (v1.9) - ฐานข้อมูลสำหรับระบบคัดกรองกลุ่มประชากรพิเศษ
//  ⚠️ ร่างเพื่อเป็น "ตัวช่วยเตือน" เท่านั้น ไม่แทนเอกสารกำกับยา/แนวทางเวชปฏิบัติ/การตัดสินใจของเภสัชกร
//     เภสัชกรผู้รับผิดชอบควรทบทวนข้อมูลทุกรายการก่อนใช้งานจริง และปรับให้ตรงกับนโยบายของร้าน
//  ข้อมูลไม่ครบ ≠ ปลอดภัย: ยาที่ไม่อยู่ในฐานข้อมูลจะถูกแจ้งว่า "ไม่มีข้อมูลในระบบ" (เด็ก = แจ้งเตือนสีแดง)
//
//  โครงสร้าง (ทุกฟิลด์เป็น optional ยกเว้น id/label/keywords):
//   keywords/exclude : ตัวพิมพ์ใหญ่ จับที่ต้นคำ (ชื่อการค้าใน DRUG_REFERENCE_DB จะถูกแปลงเป็นชื่อสามัญก่อนจับคู่)
//   allergy          : กลุ่มแพ้ยาที่ "ห้ามจ่าย" (key ใน CLINICAL_ALLERGY_LABELS)
//   cross            : { กลุ่มแพ้ยา: ข้อความเตือนแพ้ข้ามกลุ่ม } -> เตือนสีเหลือง
//   peds             : { level:'avoid', text } | { nodata:true, text } | { minAgeMonths, belowText, dose:{...} }
//                      dose: { basis:'perDose'|'perDay', min, max, dosesPerDay, maxSingleMg, maxDailyMgPerKg,
//                              maxDailyMg, meal, liquidType, strengths:[{label,mg,per:'5mL'|'mL'|'tab'}], note }
//   preg/lact/geri   : { level:'avoid'|'caution'|'ok', text }
//   renal            : [ { maxGfr, level:'avoid'|'adjust'|'caution', text } ] เรียงจาก maxGfr น้อย -> มาก
//                      (ใช้กฎแรกที่ eGFR/CrCl < maxGfr) ; [] = ไม่ต้องปรับตามไต ; ไม่ใส่ = ไม่มีข้อมูล
// ==========================================
const CLINICAL_ALLERGY_LABELS = {
    penicillin: 'Penicillin (เพนิซิลลิน)',
    cephalosporin: 'Cephalosporin (เซฟาโลสปอริน)',
    sulfa: 'Sulfa (ซัลฟา)',
    nsaids: 'NSAIDs (ยาแก้ปวดอักเสบ)',
    aspirin: 'Aspirin (แอสไพริน)',
    paracetamol: 'Paracetamol',
    allopurinol: 'Allopurinol',
    macrolide: 'Macrolide (เช่น Azithromycin)',
    quinolone: 'Quinolone (เช่น Ciprofloxacin)'
};

const _CS_NSAID = {
    allergy: ['nsaids'],
    cross: { aspirin: 'ผู้ที่แพ้ Aspirin อาจแพ้ NSAIDs ข้ามกลุ่ม (cross-reactivity) โดยเฉพาะผู้ที่มีโรคหืด/ริดสีดวงจมูก — ซักประวัติอาการที่เคยเกิดก่อนจ่าย' },
    preg: { level: 'avoid', text: 'หลีกเลี่ยงในหญิงตั้งครรภ์ โดยเฉพาะตั้งแต่สัปดาห์ที่ 20 เป็นต้นไป/ไตรมาสที่ 3 (เสี่ยงท่อหลอดเลือดของทารกปิดก่อนกำหนด และน้ำคร่ำน้อย) — พิจารณา Paracetamol แทน' },
    lact: { level: 'caution', text: 'ควรใช้ระยะสั้นและขนาดต่ำสุด (Ibuprofen เป็นตัวเลือกที่ถือว่าใช้ได้ระหว่างให้นมบุตร)' },
    geri: { level: 'caution', text: 'เสี่ยงเลือดออกในทางเดินอาหาร ไตเสื่อม และความดัน/หัวใจกำเริบ — ใช้ขนาดต่ำสุดในระยะสั้น พิจารณายาป้องกันกระเพาะ และหลีกเลี่ยงการใช้ระยะยาว' },
    renal: [
        { maxGfr: 30, level: 'avoid', text: 'eGFR/CrCl < 30: หลีกเลี่ยง NSAIDs (เสี่ยงไตเสื่อมลงเฉียบพลัน/โพแทสเซียมสูง) — ปรึกษาแพทย์ และพิจารณา Paracetamol' },
        { maxGfr: 60, level: 'caution', text: 'eGFR/CrCl 30–59: หลีกเลี่ยงถ้าเป็นไปได้ ถ้าจำเป็นให้ใช้ขนาดต่ำสุดในระยะสั้น ดื่มน้ำให้เพียงพอ และติดตามค่าไต' }
    ]
};
const _CS_PEDS_NODATA = { nodata: true, text: 'ยังไม่มีสูตรคำนวณขนาดยาเด็กสำหรับยานี้ในระบบ — ตรวจสอบขนาดยาตามเอกสารกำกับยา/แนวทางเวชปฏิบัติ หรือปรึกษาแพทย์/เภสัชกรอาวุโส' };
const _CS_COX2_CROSS = { nsaids: 'ผู้ที่แพ้ NSAIDs กลุ่มดั้งเดิม อาจใช้ COX-2 inhibitor ได้ในบางราย แต่ต้องอยู่ในความดูแลของแพทย์ — ซักประวัติอาการที่เคยเกิดก่อนจ่าย', aspirin: 'ผู้ที่แพ้ Aspirin: COX-2 inhibitor มักทนได้ แต่ควรซักประวัติอาการที่เคยเกิดก่อนจ่าย' };

const CLINICAL_SAFETY_DB = [
    // ---------- ยาแก้ปวด / ลดไข้ / NSAIDs ----------
    { id: 'paracetamol', label: 'Paracetamol', keywords: ['PARACETAMOL', 'ACETAMINOPHEN'], allergy: ['paracetamol'],
      peds: { dose: { basis: 'perDose', min: 10, max: 15, dosesPerDay: 4, maxDosesPerDay: 5, maxSingleMg: 1000, maxDailyMgPerKg: 75, maxDailyMg: 4000, meal: 'any', liquidType: 'syrup',
        strengths: [{ label: '120 mg/5 mL', mg: 120, per: '5mL' }, { label: '160 mg/5 mL', mg: 160, per: '5mL' }, { label: '500 mg/เม็ด', mg: 500, per: 'tab' }],
        note: 'ให้ห่างกันอย่างน้อย 4–6 ชม. ไม่เกิน 5 ครั้งใน 24 ชม. (ตรวจสอบว่าไม่ได้ใช้ยาสูตรผสมที่มี Paracetamol ซ้ำ)' } },
      preg: { level: 'ok', text: 'ถือเป็นยาแก้ปวด/ลดไข้ที่เลือกใช้ได้ในหญิงตั้งครรภ์ — ใช้ขนาดต่ำสุดเท่าที่จำเป็นในระยะเวลาสั้นที่สุด' },
      lact: { level: 'ok', text: 'ใช้ได้ระหว่างให้นมบุตร' },
      geri: { level: 'caution', text: 'ใช้ได้ แต่ระวังผู้ที่น้ำหนักตัวน้อย/ขาดสารอาหาร/โรคตับ — ไม่เกิน 3–4 กรัมต่อวัน' },
      renal: [{ maxGfr: 10, level: 'adjust', text: 'eGFR/CrCl < 10: เว้นระยะห่างระหว่างครั้งอย่างน้อย 8 ชม. (ตามแพทย์/เภสัชกรกำหนด)' }] },
    Object.assign({}, _CS_NSAID, { id: 'ibuprofen', label: 'Ibuprofen', keywords: ['IBUPROFEN'],
      peds: { minAgeMonths: 6, belowText: 'ไม่แนะนำในทารกอายุต่ำกว่า 6 เดือน', dose: { basis: 'perDose', min: 5, max: 10, dosesPerDay: 3, maxSingleMg: 400, maxDailyMgPerKg: 40, maxDailyMg: 1200, meal: 'afterImmediate', liquidType: 'suspension',
        strengths: [{ label: '100 mg/5 mL', mg: 100, per: '5mL' }, { label: '200 mg/เม็ด', mg: 200, per: 'tab' }, { label: '400 mg/เม็ด', mg: 400, per: 'tab' }],
        note: 'ทุก 6–8 ชม. หลังอาหาร/พร้อมนม หลีกเลี่ยงหากขาดน้ำหรืออาเจียนมาก' } },
      lact: { level: 'ok', text: 'เป็น NSAIDs ที่ถือว่าใช้ได้ระหว่างให้นมบุตร (ใช้ขนาดต่ำสุด ระยะสั้น)' } }),
    Object.assign({}, _CS_NSAID, { id: 'nsaid_other', label: 'NSAIDs (Diclofenac/Naproxen/Mefenamic acid/Meloxicam/Piroxicam/Ketorolac/Indomethacin ฯลฯ)',
      keywords: ['DICLOFENAC', 'NAPROXEN', 'MEFENAMIC', 'MELOXICAM', 'PIROXICAM', 'KETOPROFEN', 'KETOROLAC', 'INDOMETHACIN', 'LORNOXICAM'], peds: _CS_PEDS_NODATA }),
    Object.assign({}, _CS_NSAID, { id: 'celecoxib', label: 'Celecoxib', keywords: ['CELECOXIB'],
      allergy: ['sulfa'], allergyText: { sulfa: 'Celecoxib มีโครงสร้างซัลโฟนาไมด์ และมีข้อห้ามใช้ในผู้ที่แพ้ยากลุ่มซัลฟา' }, cross: Object.assign({}, _CS_COX2_CROSS),
      peds: { level: 'avoid', text: 'ไม่แนะนำในเด็ก — ใช้ในเด็กเฉพาะข้อบ่งใช้บางอย่างภายใต้การดูแลของแพทย์' } }),
    Object.assign({}, _CS_NSAID, { id: 'etoricoxib', label: 'Etoricoxib', keywords: ['ETORICOXIB'],
      allergy: [], cross: Object.assign({}, _CS_COX2_CROSS, { nsaids: 'ผู้ที่แพ้ NSAIDs: Etoricoxib (COX-2 inhibitor) อาจทนได้ในบางราย แต่ต้องอยู่ในความดูแลของแพทย์ — ซักประวัติอาการที่เคยเกิดก่อนจ่าย' }),
      peds: { level: 'avoid', text: 'ไม่แนะนำในผู้ที่อายุต่ำกว่า 16 ปี' } }),
    Object.assign({}, _CS_NSAID, { id: 'aspirin', label: 'Aspirin', keywords: ['ASPIRIN'], allergy: ['aspirin', 'nsaids'], cross: {},
      peds: { level: 'avoid', text: 'ห้ามใช้ในเด็ก/วัยรุ่นอายุต่ำกว่า 16 ปีที่เป็นไข้หวัด ไข้หวัดใหญ่ หรืออีสุกอีใส (เสี่ยง Reye\'s syndrome) เว้นแต่แพทย์สั่ง' },
      lact: { level: 'avoid', text: 'หลีกเลี่ยงขนาดยาแก้ปวด/ลดไข้ระหว่างให้นมบุตร (ทารกอาจเกิดเกล็ดเลือดผิดปกติ/Reye\'s syndrome)' } }),

    // ---------- ยาปฏิชีวนะ ----------
    { id: 'amoxicillin', label: 'Amoxicillin', keywords: ['AMOXICILLIN', 'AMOXYCILLIN', 'AMOXIL'], exclude: ['CLAVULANATE', 'AUGMENTIN', 'AMOXICLAV'], allergy: ['penicillin'],
      peds: { dose: { basis: 'perDay', min: 25, max: 50, dosesPerDay: 3, maxSingleMg: 1000, maxDailyMg: 3000, meal: 'any', liquidType: 'suspension',
        strengths: [{ label: '125 mg/5 mL', mg: 125, per: '5mL' }, { label: '250 mg/5 mL', mg: 250, per: '5mL' }, { label: '250 mg/แคปซูล', mg: 250, per: 'tab' }, { label: '500 mg/แคปซูล', mg: 500, per: 'tab' }],
        note: 'แบ่งให้ทุก 8 ชม. — ข้อบ่งใช้บางอย่าง (เช่น หูชั้นกลางอักเสบ) แพทย์อาจสั่งขนาดสูงกว่านี้ · เด็กน้ำหนัก ≥ 40 กก. ใช้ขนาดผู้ใหญ่' } },
      preg: { level: 'ok', text: 'ใช้ได้เมื่อมีข้อบ่งชี้' }, lact: { level: 'ok', text: 'ใช้ได้ (สังเกตอาการท้องเสีย/ฝ้าขาวในช่องปากของทารก)' },
      geri: { level: 'caution', text: 'ปรับขนาดตามค่าไต' },
      renal: [{ maxGfr: 10, level: 'adjust', text: 'CrCl < 10: ปรับเป็นวันละ 1 ครั้ง (ตามแพทย์/เภสัชกรกำหนด)' }, { maxGfr: 30, level: 'adjust', text: 'CrCl 10–30: ปรับเป็นทุก 12 ชม. และหลีกเลี่ยงเม็ดขนาด 875 มก.' }] },
    { id: 'amox_clav', label: 'Amoxicillin/Clavulanate', keywords: ['CLAVULANATE', 'AUGMENTIN', 'AMOXICLAV'], allergy: ['penicillin'],
      peds: { nodata: true, text: 'ขนาดยาเด็กขึ้นกับสัดส่วน Amoxicillin:Clavulanate ของแต่ละสูตร (เช่น 4:1, 7:1, 14:1) — คำนวณจากปริมาณ Amoxicillin ตามเอกสารกำกับยา ระบบยังไม่มีสูตรสำเร็จรูป' },
      preg: { level: 'ok', text: 'ใช้ได้เมื่อมีข้อบ่งชี้' }, lact: { level: 'ok', text: 'ใช้ได้ (สังเกตอาการท้องเสียของทารก)' },
      geri: { level: 'caution', text: 'ปรับขนาดตามค่าไต และระวังตับอักเสบจากยา' },
      renal: [{ maxGfr: 30, level: 'adjust', text: 'CrCl < 30: ปรับขนาด/ช่วงห่างของยา และห้ามใช้เม็ดขนาด 875/125 มก.' }] },
    { id: 'penicillin_other', label: 'Penicillins (Ampicillin/Cloxacillin/Dicloxacillin/Penicillin V ฯลฯ)', keywords: ['AMPICILLIN', 'CLOXACILLIN', 'DICLOXACILLIN', 'FLUCLOXACILLIN', 'PENICILLIN', 'PIPERACILLIN'], allergy: ['penicillin'],
      peds: _CS_PEDS_NODATA, preg: { level: 'ok', text: 'ใช้ได้เมื่อมีข้อบ่งชี้' }, lact: { level: 'ok', text: 'ใช้ได้' }, geri: { level: 'caution', text: 'ปรับขนาดตามค่าไต' } },
    { id: 'cephalosporin', label: 'Cephalosporins', keywords: ['CEPHALEXIN', 'CEFALEXIN', 'CEFIXIME', 'CEFDINIR', 'CEFUROXIME', 'CEFPODOXIME', 'CEFADROXIL', 'CEFACLOR', 'CEFTRIAXONE', 'CEFOTAXIME'], allergy: ['cephalosporin'],
      cross: { penicillin: 'แพ้ข้ามกลุ่มกับ Penicillin ได้ประมาณ 1–2% (สูงขึ้นในบางตัวที่มีโครงสร้างข้างเคียงคล้ายกัน เช่น Cephalexin/Cefadroxil) — หากเคยแพ้ Penicillin รุนแรง (ช็อก/ผื่นรุนแรง) ให้หลีกเลี่ยงและปรึกษาแพทย์' },
      peds: _CS_PEDS_NODATA, preg: { level: 'ok', text: 'ใช้ได้เมื่อมีข้อบ่งชี้' }, lact: { level: 'ok', text: 'ใช้ได้' }, geri: { level: 'caution', text: 'ปรับขนาดตามค่าไต' },
      renal: [{ maxGfr: 30, level: 'adjust', text: 'CrCl < 30: ต้องปรับขนาด/ช่วงห่างของยาตามชนิดยา (ตามเอกสารกำกับยา/แพทย์)' }, { maxGfr: 60, level: 'caution', text: 'CrCl 30–59: บางตัว (เช่น Cefixime) ต้องปรับขนาด — ตรวจสอบเอกสารกำกับยา' }] },
    { id: 'azithromycin', label: 'Azithromycin', keywords: ['AZITHROMYCIN'], allergy: ['macrolide'],
      peds: { dose: { basis: 'perDose', min: 10, max: 10, dosesPerDay: 1, maxSingleMg: 500, meal: 'any', liquidType: 'suspension',
        strengths: [{ label: '200 mg/5 mL', mg: 200, per: '5mL' }, { label: '250 mg/เม็ด', mg: 250, per: 'tab' }, { label: '500 mg/เม็ด', mg: 500, per: 'tab' }],
        note: 'สูตรทั่วไป 10 มก./กก. วันละ 1 ครั้ง 3 วัน (ข้อบ่งใช้บางอย่างใช้สูตรอื่น เช่น วันแรก 10 มก./กก. แล้ววันที่ 2–5 ลดเหลือ 5 มก./กก.) — ตรวจสอบสูตรตามข้อบ่งใช้' } },
      preg: { level: 'caution', text: 'ใช้ได้เมื่อแพทย์เห็นว่าจำเป็น' }, lact: { level: 'caution', text: 'ใช้ได้เมื่อจำเป็น สังเกตอาการท้องเสียของทารก' },
      geri: { level: 'caution', text: 'ระวังผลต่อ QT (หัวใจเต้นผิดจังหวะ) โดยเฉพาะผู้ที่ใช้ยาอื่นที่ยืด QT หรือมีโรคหัวใจ' },
      renal: [{ maxGfr: 10, level: 'caution', text: 'CrCl < 10: ใช้ด้วยความระวัง' }] },
    { id: 'quinolone', label: 'Fluoroquinolones (Ciprofloxacin/Levofloxacin/Norfloxacin/Ofloxacin)', keywords: ['CIPROFLOXACIN', 'LEVOFLOXACIN', 'NORFLOXACIN', 'OFLOXACIN', 'MOXIFLOXACIN'], allergy: ['quinolone'],
      peds: { level: 'avoid', text: 'ไม่แนะนำในเด็ก/วัยรุ่นอายุต่ำกว่า 18 ปี (เสี่ยงเอ็น/กระดูกอ่อนผิดปกติ) ยกเว้นแพทย์พิจารณาแล้ว' },
      preg: { level: 'avoid', text: 'หลีกเลี่ยงในหญิงตั้งครรภ์ — ปรึกษาแพทย์เพื่อเลือกยาทางเลือก' }, lact: { level: 'avoid', text: 'หลีกเลี่ยงระหว่างให้นมบุตร (ถ้าจำเป็นต้องใช้ ให้แพทย์พิจารณา)' },
      geri: { level: 'caution', text: 'เสี่ยงเอ็นอักเสบ/ฉีกขาด สับสน และ QT ยืด โดยเฉพาะเมื่อใช้ร่วมกับสเตียรอยด์ — พิจารณายาทางเลือก' },
      renal: [{ maxGfr: 30, level: 'adjust', text: 'CrCl < 30: ต้องลดขนาดหรือยืดช่วงห่างของยา (ตามชนิดยา)' }, { maxGfr: 50, level: 'adjust', text: 'CrCl 30–50: อาจต้องปรับขนาดตามชนิดยา — ตรวจสอบเอกสารกำกับยา' }] },
    { id: 'tetracycline', label: 'Tetracyclines (Doxycycline/Minocycline/Tetracycline)', keywords: ['DOXYCYCLINE', 'MINOCYCLINE', 'TETRACYCLINE'],
      peds: { level: 'avoid', text: 'หลีกเลี่ยงในเด็กอายุต่ำกว่า 8 ปี (ฟันเหลือง/เคลือบฟันผิดปกติ) ยกเว้นแพทย์พิจารณาแล้ว' },
      preg: { level: 'avoid', text: 'ห้ามใช้ในหญิงตั้งครรภ์ (กระทบกระดูก/ฟันของทารก)' }, lact: { level: 'caution', text: 'หลีกเลี่ยงการใช้ระยะยาว ถ้าจำเป็นให้แพทย์พิจารณา' },
      geri: { level: 'caution', text: 'ทานพร้อมน้ำเต็มแก้วและไม่นอนราบหลังทาน (หลอดอาหารอักเสบ/เป็นแผล)' },
      renal: [{ maxGfr: 30, level: 'caution', text: 'Tetracycline: หลีกเลี่ยงในไตเสื่อม (Doxycycline โดยทั่วไปไม่ต้องปรับขนาด)' }] },
    { id: 'metronidazole', label: 'Metronidazole', keywords: ['METRONIDAZOLE', 'TINIDAZOLE', 'ORNIDAZOLE', 'SECNIDAZOLE'], peds: _CS_PEDS_NODATA,
      preg: { level: 'caution', text: 'ใช้ได้เมื่อแพทย์เห็นว่าจำเป็น (พิจารณาความเสี่ยง–ประโยชน์ โดยเฉพาะไตรมาสแรก)' },
      lact: { level: 'caution', text: 'ยาผ่านน้ำนม — ยาขนาดสูงครั้งเดียวควรงดให้นม 12–24 ชม. (ตามแพทย์/เภสัชกร)' },
      geri: { level: 'caution', text: 'ระวังอาการทางระบบประสาท (ชา สับสน) หากใช้ต่อเนื่องนาน' },
      renal: [{ maxGfr: 10, level: 'caution', text: 'CrCl < 10: สารเมแทบอไลต์สะสมได้ — ระวังผลข้างเคียง/พิจารณาลดขนาด' }] },
    { id: 'cotrimoxazole', label: 'Co-trimoxazole (Sulfamethoxazole/Trimethoprim)', keywords: ['COTRIMOXAZOLE', 'SULFAMETHOXAZOLE', 'TRIMETHOPRIM'], allergy: ['sulfa'],
      peds: { minAgeMonths: 2, belowText: 'ห้ามใช้ในทารกอายุต่ำกว่า 2 เดือน', nodata: true, text: _CS_PEDS_NODATA.text },
      preg: { level: 'avoid', text: 'หลีกเลี่ยง โดยเฉพาะไตรมาสแรก (ขัดขวางโฟเลต) และใกล้คลอด (เสี่ยงดีซ่านในทารก) — ปรึกษาแพทย์' },
      lact: { level: 'avoid', text: 'หลีกเลี่ยงในทารกแรกเกิด/ทารกอายุต่ำกว่า 2 เดือน/ทารกดีซ่านหรือขาดเอนไซม์ G6PD' },
      geri: { level: 'caution', text: 'เสี่ยงโพแทสเซียมสูงและไตเสื่อม — ตรวจติดตามค่าไต/โพแทสเซียม' },
      renal: [{ maxGfr: 15, level: 'avoid', text: 'CrCl < 15: หลีกเลี่ยง (ยกเว้นแพทย์สั่ง)' }, { maxGfr: 30, level: 'adjust', text: 'CrCl 15–30: ลดขนาดลงครึ่งหนึ่ง (ตามแพทย์/เภสัชกร)' }] },

    // ---------- ยาแก้แพ้ / ไอ / หวัด ----------
    { id: 'antihistamine_2nd', label: '2nd-gen antihistamines (Cetirizine/Loratadine/Fexofenadine)', keywords: ['CETIRIZINE', 'LEVOCETIRIZINE', 'LORATADINE', 'DESLORATADINE', 'FEXOFENADINE'], peds: _CS_PEDS_NODATA,
      preg: { level: 'ok', text: 'Cetirizine/Loratadine เป็นตัวเลือกที่ใช้ได้ในหญิงตั้งครรภ์เมื่อจำเป็น' }, lact: { level: 'caution', text: 'Loratadine เป็นตัวเลือกที่นิยมใช้ Cetirizine อาจทำให้ทารกง่วงซึมได้ — สังเกตอาการทารก' },
      geri: { level: 'ok', text: 'ยากลุ่มนี้ (ง่วงน้อย) เหมาะกว่ากลุ่มเก่าในผู้สูงอายุ' },
      renal: [{ maxGfr: 30, level: 'adjust', text: 'CrCl < 30: ลดขนาดลง (เช่น ครึ่งหนึ่ง) หรือยืดช่วงห่างของยา — ตรวจสอบตามชนิดยา' }] },
    { id: 'antihistamine_1st', label: '1st-gen antihistamines (CPM/Diphenhydramine/Hydroxyzine/Dimenhydrinate)', keywords: ['CHLORPHENIRAMINE', 'CPM', 'DIPHENHYDRAMINE', 'HYDROXYZINE', 'DIMENHYDRINATE', 'PROMETHAZINE'],
      peds: { minAgeMonths: 24, belowText: 'ไม่แนะนำในเด็กอายุต่ำกว่า 2 ปี (เสี่ยงกดการหายใจ/ชัก)', nodata: true, text: _CS_PEDS_NODATA.text },
      preg: { level: 'caution', text: 'ใช้ได้เมื่อจำเป็น ระวังง่วงซึม' }, lact: { level: 'caution', text: 'อาจทำให้ทารกง่วงซึมและลดน้ำนม — หลีกเลี่ยงการใช้ต่อเนื่อง' },
      geri: { level: 'avoid', text: 'หลีกเลี่ยง: ฤทธิ์ต้านโคลิเนอร์จิก (สับสน ปัสสาวะคั่ง ท้องผูก) และเสี่ยงหกล้ม — พิจารณายาแก้แพ้ที่ง่วงน้อย' },
      renal: [{ maxGfr: 50, level: 'caution', text: 'ไตเสื่อม: ยาอาจสะสมทำให้ง่วงซึมมากขึ้น (Hydroxyzine ควรลดขนาดลง) — เริ่มขนาดต่ำ' }] },
    { id: 'dextromethorphan', label: 'Dextromethorphan', keywords: ['DEXTROMETHORPHAN'],
      peds: { minAgeMonths: 48, belowText: 'ไม่แนะนำในเด็กอายุต่ำกว่า 4 ปี', nodata: true, text: _CS_PEDS_NODATA.text },
      preg: { level: 'caution', text: 'ใช้ได้เมื่อจำเป็น ขนาดต่ำสุด ระยะสั้น' }, lact: { level: 'ok', text: 'ใช้ระยะสั้นได้' },
      geri: { level: 'caution', text: 'ระวังง่วงซึม/หกล้ม และปฏิกิริยากับยาต้านซึมเศร้า (Serotonin syndrome)' }, renal: [] },
    { id: 'bromhexine', label: 'Bromhexine/Ambroxol', keywords: ['BROMHEXINE', 'AMBROXOL'],
      peds: { minAgeMonths: 24, belowText: 'ไม่แนะนำในเด็กอายุต่ำกว่า 2 ปี', nodata: true, text: _CS_PEDS_NODATA.text },
      preg: { level: 'avoid', text: 'หลีกเลี่ยงในไตรมาสแรก และใช้ในไตรมาสหลังเมื่อแพทย์เห็นว่าจำเป็นเท่านั้น' }, lact: { level: 'avoid', text: 'ไม่แนะนำระหว่างให้นมบุตร' },
      geri: { level: 'ok', text: 'ใช้ได้ตามปกติ' }, renal: [{ maxGfr: 30, level: 'caution', text: 'ไตเสื่อมรุนแรง: เมแทบอไลต์อาจสะสม — ใช้ด้วยความระวัง' }] },
    { id: 'decongestant', label: 'Decongestants (Pseudoephedrine/Phenylephrine)', keywords: ['PSEUDOEPHEDRINE', 'PHENYLEPHRINE'],
      peds: { minAgeMonths: 48, belowText: 'ไม่แนะนำในเด็กอายุต่ำกว่า 4 ปี', nodata: true, text: _CS_PEDS_NODATA.text },
      preg: { level: 'avoid', text: 'หลีกเลี่ยงโดยเฉพาะไตรมาสแรก (พิจารณาความเสี่ยง–ประโยชน์กับแพทย์)' }, lact: { level: 'caution', text: 'อาจลดปริมาณน้ำนมและทำให้ทารกหงุดหงิด — ใช้ระยะสั้น' },
      geri: { level: 'caution', text: 'ระวังความดันโลหิตสูง หัวใจเต้นเร็ว/ผิดจังหวะ และต่อมลูกหมากโต (ปัสสาวะลำบาก)' },
      renal: [{ maxGfr: 30, level: 'caution', text: 'ไตเสื่อม: ยาขับออกทางไต อาจสะสม — เริ่มขนาดต่ำและระวังอาการใจสั่น/ความดันสูง' }] },

    // ---------- ระบบทางเดินอาหาร ----------
    { id: 'loperamide', label: 'Loperamide', keywords: ['LOPERAMIDE'],
      peds: { minAgeMonths: 24, belowText: 'ห้ามใช้ในเด็กอายุต่ำกว่า 2 ปี', nodata: true, text: _CS_PEDS_NODATA.text },
      preg: { level: 'caution', text: 'หลีกเลี่ยงในไตรมาสแรก ใช้ได้เมื่อจำเป็นในระยะสั้น' }, lact: { level: 'ok', text: 'ใช้ขนาดปกติระยะสั้นได้' },
      geri: { level: 'caution', text: 'ระวังท้องผูก/ลำไส้อุดตัน และไม่ใช้เมื่อมีไข้สูงหรืออุจจาระมีเลือด' }, renal: [] },
    { id: 'domperidone', label: 'Domperidone', keywords: ['DOMPERIDONE'], peds: _CS_PEDS_NODATA,
      preg: { level: 'caution', text: 'หลีกเลี่ยงถ้าไม่จำเป็น — ปรึกษาแพทย์' }, lact: { level: 'caution', text: 'ยาผ่านน้ำนมในปริมาณน้อย — ใช้ขนาดต่ำสุดระยะสั้น' },
      geri: { level: 'caution', text: 'ผู้ที่อายุมากกว่า 60 ปีเสี่ยงหัวใจเต้นผิดจังหวะ (QT ยืด) — ใช้ขนาดต่ำสุด ระยะสั้น และไม่เกิน 30 มก./วัน' },
      renal: [{ maxGfr: 30, level: 'adjust', text: 'CrCl < 30: ลดความถี่ของยาเป็นวันละ 1–2 ครั้ง (ตามแพทย์/เภสัชกร)' }] },
    { id: 'famotidine', label: 'Famotidine', keywords: ['FAMOTIDINE'], peds: _CS_PEDS_NODATA,
      preg: { level: 'ok', text: 'ใช้ได้เมื่อจำเป็น' }, lact: { level: 'ok', text: 'ใช้ได้' },
      geri: { level: 'caution', text: 'ระวังสับสน/ซึมในผู้ที่ไตเสื่อม — ปรับขนาดตามค่าไต' },
      renal: [{ maxGfr: 50, level: 'adjust', text: 'CrCl < 50: ลดขนาดลงครึ่งหนึ่งหรือยืดช่วงห่างของยา' }] },
    { id: 'ppi', label: 'PPIs (Omeprazole/Esomeprazole/Lansoprazole/Pantoprazole)', keywords: ['OMEPRAZOLE', 'ESOMEPRAZOLE', 'LANSOPRAZOLE', 'PANTOPRAZOLE', 'RABEPRAZOLE'], peds: _CS_PEDS_NODATA,
      preg: { level: 'ok', text: 'Omeprazole ใช้ได้เมื่อมีข้อบ่งชี้' }, lact: { level: 'ok', text: 'ใช้ได้' },
      geri: { level: 'caution', text: 'หลีกเลี่ยงการใช้ต่อเนื่องเกิน 8 สัปดาห์โดยไม่มีข้อบ่งชี้ (เสี่ยงกระดูกหัก/การติดเชื้อ/ขาดแมกนีเซียม)' }, renal: [] },
    { id: 'antacid', label: 'Antacids (Al/Mg hydroxide)', keywords: ['ANTACID', 'ALUMINIUM', 'ALUMINUM', 'MAGNESIUM', 'KREMIL'], peds: _CS_PEDS_NODATA,
      preg: { level: 'ok', text: 'ใช้ได้เมื่อจำเป็น' }, lact: { level: 'ok', text: 'ใช้ได้' }, geri: { level: 'caution', text: 'ระวังท้องผูก/ท้องเสีย และการสะสมของ Al/Mg หากไตเสื่อม' },
      renal: [{ maxGfr: 30, level: 'avoid', text: 'CrCl < 30: หลีกเลี่ยงยาที่มี Mg/Al (สะสมในร่างกาย)' }] },

    // ---------- โรคเรื้อรัง / อื่นๆ ----------
    { id: 'metformin', label: 'Metformin', keywords: ['METFORMIN'],
      peds: { minAgeMonths: 120, belowText: 'ไม่ใช้ในเด็กอายุต่ำกว่า 10 ปี', nodata: true, text: _CS_PEDS_NODATA.text },
      preg: { level: 'caution', text: 'แพทย์เป็นผู้กำหนดการใช้ในหญิงตั้งครรภ์ — ห้ามหยุด/เปลี่ยนยาเอง' }, lact: { level: 'ok', text: 'ใช้ได้ระหว่างให้นมบุตร' },
      geri: { level: 'caution', text: 'ตรวจการทำงานของไตก่อนและระหว่างใช้ยา (เสี่ยงกรดแลคติกคั่ง)' },
      renal: [{ maxGfr: 30, level: 'avoid', text: 'eGFR < 30: ห้ามใช้ (เสี่ยงภาวะกรดแลคติกคั่ง)' }, { maxGfr: 45, level: 'adjust', text: 'eGFR 30–44: ไม่ควรเริ่มยาใหม่ และผู้ที่ใช้อยู่ต้องลดขนาด (ไม่เกิน 1,000 มก./วัน) ตามแพทย์' }] },
    { id: 'allopurinol', label: 'Allopurinol', keywords: ['ALLOPURINOL'], allergy: ['allopurinol'], peds: _CS_PEDS_NODATA,
      preg: { level: 'caution', text: 'ข้อมูลจำกัด — ใช้เมื่อแพทย์เห็นว่าจำเป็น' }, lact: { level: 'caution', text: 'ยาผ่านน้ำนมได้ในปริมาณน้อย — ใช้เมื่อจำเป็น' },
      geri: { level: 'caution', text: 'เริ่มขนาดต่ำและค่อยๆ ปรับตามค่าไต' },
      renal: [{ maxGfr: 60, level: 'adjust', text: 'eGFR/CrCl < 60: เริ่มขนาดต่ำ (เช่น ≤ 50–100 มก./วัน) แล้วค่อยๆ ปรับตามแพทย์ — ผื่นแพ้รุนแรงเสี่ยงสูงขึ้น' }] },
    { id: 'colchicine', label: 'Colchicine', keywords: ['COLCHICINE'], peds: _CS_PEDS_NODATA,
      preg: { level: 'caution', text: 'ใช้เมื่อแพทย์เห็นว่าจำเป็น' }, lact: { level: 'caution', text: 'ใช้ได้เมื่อจำเป็น สังเกตอาการท้องเสียของทารก' },
      geri: { level: 'caution', text: 'เสี่ยงพิษสะสม (ท้องเสีย กล้ามเนื้ออ่อนแรง) — ห้ามเพิ่มขนาดเอง' },
      renal: [{ maxGfr: 30, level: 'avoid', text: 'eGFR/CrCl < 30: หลีกเลี่ยงหรือลดขนาดลงมาก — ต้องให้แพทย์พิจารณา (เสี่ยงพิษสูง)' }, { maxGfr: 60, level: 'caution', text: 'eGFR/CrCl 30–59: ระวังพิษสะสม อาจต้องลดขนาด — ตามแพทย์' }] },
    { id: 'opioid', label: 'Tramadol/Codeine', keywords: ['TRAMADOL', 'CODEINE', 'ULTRACET'],
      peds: { level: 'avoid', text: 'ห้ามใช้ในเด็กอายุต่ำกว่า 12 ปี (เสี่ยงกดการหายใจ) และไม่แนะนำในวัยรุ่นบางกลุ่ม (เช่น หลังผ่าตัดต่อมทอนซิล/อดีนอยด์)' },
      preg: { level: 'avoid', text: 'หลีกเลี่ยง — ใช้ต่อเนื่องเสี่ยงทารกแรกเกิดมีอาการถอนยา' }, lact: { level: 'avoid', text: 'หลีกเลี่ยง (ทารกอาจกดการหายใจ/ง่วงซึมมาก)' },
      geri: { level: 'caution', text: 'เริ่มขนาดต่ำ เสี่ยงสับสน หกล้ม ชัก — Tramadol ผู้ที่อายุมากกว่า 75 ปี ไม่เกิน 300 มก./วัน' },
      renal: [{ maxGfr: 30, level: 'adjust', text: 'CrCl < 30: ยืดช่วงห่างเป็นทุก 12 ชม. และไม่เกิน 200 มก./วัน (Tramadol) — ตามแพทย์' }] },
    { id: 'steroid_oral', label: 'Oral corticosteroids (Prednisolone/Dexamethasone)', keywords: ['PREDNISOLONE', 'PREDNISONE', 'DEXAMETHASONE', 'METHYLPREDNISOLONE'], peds: _CS_PEDS_NODATA,
      preg: { level: 'caution', text: 'ใช้เมื่อแพทย์เห็นว่าจำเป็น ใช้ขนาดต่ำสุด' }, lact: { level: 'ok', text: 'ใช้ได้ (ขนาดสูงมากอาจเว้น 4 ชม. หลังทานก่อนให้นม)' },
      geri: { level: 'caution', text: 'ระวังน้ำตาลในเลือดสูง กระดูกพรุน ความดันสูง และแผลในกระเพาะอาหาร' }, renal: [] },
    { id: 'baclofen', label: 'Baclofen', keywords: ['BACLOFEN'], peds: _CS_PEDS_NODATA,
      preg: { level: 'caution', text: 'ใช้เมื่อแพทย์เห็นว่าจำเป็นเท่านั้น' }, lact: { level: 'caution', text: 'ยาผ่านน้ำนมในปริมาณน้อย — ใช้เมื่อจำเป็น' },
      geri: { level: 'caution', text: 'เสี่ยงง่วงซึม สับสน และหกล้ม — เริ่มขนาดต่ำ' },
      renal: [{ maxGfr: 50, level: 'adjust', text: 'CrCl < 50: ยาสะสมได้ เสี่ยงพิษต่อระบบประสาท (สับสน ซึมมาก) — ต้องลดขนาดตามแพทย์' }] },
    { id: 'muscle_relaxant', label: 'Muscle relaxants (Orphenadrine/Tizanidine/Tolperisone/Eperisone/Methocarbamol)', keywords: ['ORPHENADRINE', 'TIZANIDINE', 'TOLPERISONE', 'EPERISONE', 'METHOCARBAMOL', 'CHLORZOXAZONE', 'MUSCOL', 'NORGESIC'], peds: _CS_PEDS_NODATA,
      preg: { level: 'caution', text: 'ข้อมูลความปลอดภัยจำกัด — ใช้เมื่อแพทย์เห็นว่าจำเป็นเท่านั้น' }, lact: { level: 'caution', text: 'ข้อมูลจำกัด — พิจารณาความเสี่ยง–ประโยชน์ก่อนใช้' },
      geri: { level: 'avoid', text: 'ควรหลีกเลี่ยงยาคลายกล้ามเนื้อกลุ่มนี้ในผู้สูงอายุ (ง่วงซึม สับสน ปากแห้ง เสี่ยงหกล้ม) — พิจารณาทางเลือกอื่น' },
      renal: [{ maxGfr: 30, level: 'caution', text: 'ไตเสื่อม: ยาอาจสะสม (Tizanidine ต้องลดขนาด) — เริ่มขนาดต่ำ' }] },
    { id: 'acei_arb', label: 'ACE inhibitors / ARBs', keywords: ['ENALAPRIL', 'LISINOPRIL', 'CAPTOPRIL', 'PERINDOPRIL', 'RAMIPRIL', 'LOSARTAN', 'VALSARTAN', 'IRBESARTAN', 'TELMISARTAN', 'CANDESARTAN'], peds: _CS_PEDS_NODATA,
      preg: { level: 'avoid', text: 'ห้ามใช้ในหญิงตั้งครรภ์ (เป็นพิษต่อทารกในครรภ์) — ปรึกษาแพทย์เพื่อเปลี่ยนยา' }, lact: { level: 'caution', text: 'Enalapril/Captopril ถือว่าใช้ได้มากกว่า ARBs — ให้แพทย์พิจารณา' },
      geri: { level: 'caution', text: 'ระวังความดันต่ำ/เวียนศีรษะ/หกล้ม และค่าไต/โพแทสเซียม' },
      renal: [{ maxGfr: 30, level: 'caution', text: 'ไตเสื่อมรุนแรง: ตรวจติดตามค่า Creatinine/โพแทสเซียมอย่างใกล้ชิด อาจต้องลดขนาด' }] },
    { id: 'statin', label: 'Statins', keywords: ['SIMVASTATIN', 'ATORVASTATIN', 'ROSUVASTATIN', 'PRAVASTATIN', 'LOVASTATIN'], peds: _CS_PEDS_NODATA,
      preg: { level: 'avoid', text: 'โดยทั่วไปหยุดยาระหว่างตั้งครรภ์ — ปรึกษาแพทย์' }, lact: { level: 'avoid', text: 'ไม่แนะนำระหว่างให้นมบุตร' },
      geri: { level: 'caution', text: 'ระวังปวดกล้ามเนื้อ/กล้ามเนื้อสลายตัว โดยเฉพาะเมื่อใช้ร่วมกับยาอื่น' },
      renal: [{ maxGfr: 30, level: 'caution', text: 'ไตเสื่อมรุนแรง: Rosuvastatin ต้องลดขนาด/บางตัวควรเริ่มขนาดต่ำ' }] },
    { id: 'warfarin', label: 'Warfarin', keywords: ['WARFARIN', 'COUMADIN'], peds: _CS_PEDS_NODATA,
      preg: { level: 'avoid', text: 'ทำให้ทารกพิการ ห้ามใช้ในหญิงตั้งครรภ์ (ยกเว้นข้อบ่งชี้พิเศษภายใต้แพทย์) — ห้ามหยุดยาเอง ต้องปรึกษาแพทย์ทันที' }, lact: { level: 'ok', text: 'ใช้ได้ระหว่างให้นมบุตร ภายใต้การตรวจ INR' },
      geri: { level: 'caution', text: 'เสี่ยงเลือดออกสูง — ตรวจ INR สม่ำเสมอและระวังการหกล้ม' }, renal: [{ maxGfr: 30, level: 'caution', text: 'ไตเสื่อมรุนแรง: เสี่ยงเลือดออกสูงขึ้น — ตรวจ INR ใกล้ชิด' }] },
    { id: 'methotrexate', label: 'Methotrexate', keywords: ['METHOTREXATE'], peds: _CS_PEDS_NODATA,
      preg: { level: 'avoid', text: 'ห้ามใช้ในหญิงตั้งครรภ์ (ทำให้ทารกพิการ/แท้ง)' }, lact: { level: 'avoid', text: 'ห้ามใช้ระหว่างให้นมบุตร' },
      geri: { level: 'caution', text: 'เสี่ยงพิษต่อไขกระดูก/ตับ/ไต — ตรวจติดตามค่าเลือดและค่าไต' },
      renal: [{ maxGfr: 30, level: 'avoid', text: 'CrCl < 30: หลีกเลี่ยง (ยาขับออกทางไต เสี่ยงพิษรุนแรง)' }, { maxGfr: 60, level: 'adjust', text: 'CrCl 30–59: ต้องลดขนาด — ตามแพทย์' }] },
    { id: 'retinoid', label: 'Isotretinoin/Acitretin', keywords: ['ISOTRETINOIN', 'ACITRETIN'], peds: _CS_PEDS_NODATA,
      preg: { level: 'avoid', text: 'ห้ามใช้เด็ดขาดในหญิงตั้งครรภ์ (ทำให้ทารกพิการรุนแรง)' }, lact: { level: 'avoid', text: 'ห้ามใช้ระหว่างให้นมบุตร' }, geri: { level: 'caution', text: 'ใช้ตามแพทย์สั่ง ตรวจติดตามค่าตับ/ไขมัน' }, renal: [] }
];

// v1.36: ชื่อชนิดยา/เวลาใช้ยาบนฉลาก ทุกภาษา สร้างจากคำศัพท์มาตรฐานด้านบน (ที่เดียว ไม่ซ้ำซ้อน)
Object.keys(UI_TEXT).forEach(lang => {
    const t = UI_TEXT[lang];
    t.drugTypes = {}; t.mealTimes = {};
    ALL_TYPE_OPTIONS.forEach(o => { t.drugTypes[o.value] = lang === 'th' ? o.th : ((o.tr && (o.tr[lang] || o.tr.en)) || o.th); });
    MEAL_OPTIONS.forEach(o => { if (o.value) t.mealTimes[o.value] = lang === 'th' ? o.th : ((o.tr && (o.tr[lang] || o.tr.en)) || o.th); });
});
