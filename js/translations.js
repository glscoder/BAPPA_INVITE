/**
 * Multi-Language Translations Dictionary & Engine
 * Supports: English (en), Hindi (hi), Gujarati (gu)
 */

const TRANSLATIONS = {
  en: {
    // Top Bar & Controls
    audio_tooltip: "Toggle Sacred Music",
    audio_mute_hint: "Tap 🔔 to mute music",

    // Page 1: Hero
    shloka_header: "❖ || श्री गणेशाय नमः || ❖",
    shloka_verse: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    hero_title: "Bappa's Coming Home",
    hero_tagline: "॥ बाप्पा घर आ रहे हैं ॥",
    event_date: "ON MONDAY, 14TH SEPTEMBER 2026",
    scroll_hint: "Scroll Down For Schedule & Venue",

    // Page 2: Welcome
    welcome_shloka_main: "ॐ गं गणपतये नमः",
    welcome_shloka_meaning: '"May Lord Ganesha bestow joy, auspiciousness, peace, and good health upon you and your family."',
    welcome_title: "You are Invited",
    welcome_msg_1: "We cordially invite you & your family to grace our home and join us in celebrating Ganesh Utsav.",
    welcome_msg_2: "With the supreme grace of <strong>Vighnaharta Lord Ganesha</strong>, your auspicious presence will double our festive joy!",
    camera_btn_see: "See Yourself",
    camera_btn_on: "Camera On ✨",
    camera_btn_enable: "Enable Mirror",
    camera_fallback_hint: "Tap For Live Mirror",

    // Page 3: Schedule
    schedule_header_ornament: "❖ || उत्सव रूपरेखा || ❖",
    schedule_section_label: "Auspicious Timings",
    event_1_title: "Bappa's Aagman & Sthapana",
    event_1_date: "Monday, September 14, 2026",
    event_1_time: "⬥ According to Muhurat",
    event_2_title: "Daily Aarti",
    event_2_date: "Every Day (Sept 14 – Sept 16)",
    event_2_time: "⬥ Morning: 10:30 AM | Evening: 7:30 PM",
    event_3_title: "Followed By Prasad",
    event_3_date: "Daily Post Evening Aarti",
    event_3_time: "⬥ Prasad: 8:30 PM Onwards",
    event_4_title: "Visarjan",
    event_4_date: "Thursday, September 17, 2026",
    event_4_time: "⬥ According to Muhurat",

    // Page 4: Venue & Actions
    venue_header_ornament: "❖ || उत्सव निवास || ❖",
    venue_name: "Aakruti Heights",
    venue_address: "Flat No. 104 , Aakruti Heights , Opp Aangan Party Plot , Near Prernatirth Derasar, Jodhpur Cross Road, Ahmedabad, Gujarat 380015",
    btn_directions: "Get Directions on Google Maps",
    btn_whatsapp: "Let Us Know on WhatsApp",

    // Page 5: Closing
    closing_jaikara: "गणपती बाप्पा मोरया !<br>मंगलमूर्ती मोरया !",
    closing_signoff: "May Lord Ganesha remove all obstacles and bestow abundant health, prosperity, peace, and wisdom upon you and your family.",
    label_regards: "Warm Regards:",
    host_family: "The Shah Family",
    label_contact: "RSVP / Contact:",
    label_visiting_hours: "Visiting Hours:",
    visiting_hours_val: "10:00 AM to 10:00 PM Daily",
    btn_back_to_top: "Back to Top",

    // RSVP Modal
    rsvp_title: "Join the Celebration",
    rsvp_subtitle: "Let us know if you can join us so we can prepare Prasad!",
    label_guest_name: "Your Full Name",
    ph_guest_name: "e.g. Ramesh & Sunita Patel",
    label_guest_count: "Number of Guests",
    opt_1_person: "1 Person",
    opt_2_persons: "2 Persons",
    opt_3_persons: "3 Persons",
    opt_4_persons: "4 Persons",
    opt_5_persons: "5+ Family Members",
    label_visiting_day: "Preferred Visiting Time",
    label_wishes: "Warm Wishes for Bappa (Optional)",
    ph_wishes: "Send blessings or wishes to the host family...",
    btn_confirm_attendance: "Confirm Attendance 🙏",
    rsvp_success_title: "धन्यवाद ! RSVP Confirmed",
    rsvp_success_desc: "Your blessings have been received. We eagerly look forward to welcoming you with Ganpati Bappa's Prasad!"
  },

  hi: {
    // Top Bar & Controls
    audio_tooltip: "भक्ति संगीत चालू/बंद करें",
    audio_mute_hint: "संगीत बंद/चालू करने हेतु 🔔 दबाएं",

    // Page 1: Hero
    shloka_header: "❖ || श्री गणेशाय नमः || ❖",
    shloka_verse: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    hero_title: "बाप्पा घर आ रहे हैं",
    hero_tagline: "॥ गणपती बाप्पा मोरया ॥",
    event_date: "सोमवार, 14 सितम्बर 2026",
    scroll_hint: "कार्यक्रम व स्थान के लिए नीचे स्क्रॉल करें",

    // Page 2: Welcome
    welcome_shloka_main: "ॐ गं गणपतये नमः",
    welcome_shloka_meaning: '"भगवान श्री गणेश आपके और आपके परिवार पर सुख, समृद्धि, शांति और उत्तम स्वास्थ्य की कृपा बरसाएं।"',
    welcome_title: "स्नेह निमंत्रण",
    welcome_msg_1: "हम आपको और आपके सपरिवार को हमारे घर गणेश उत्सव के पावन अवसर पर सप्रेम आमंत्रित करते हैं।",
    welcome_msg_2: "<strong>विघ्नहर्ता श्री गणेश</strong> के आशीर्वाद से आपकी पावन उपस्थिति हमारे उत्सव के आनंद को द्विगुणित करेगी!",
    camera_btn_see: "दर्शन दर्पण",
    camera_btn_on: "कैमरा चालू ✨",
    camera_btn_enable: "दर्पण खोलें",
    camera_fallback_hint: "लाईव दर्पण के लिए टैप करें",

    // Page 3: Schedule
    schedule_header_ornament: "❖ || उत्सव समय सारणी || ❖",
    schedule_section_label: "शुभ मुहूर्त व समय",
    event_1_title: "बाप्पा का आगमन एवं स्थापना",
    event_1_date: "सोमवार, 14 सितम्बर 2026",
    event_1_time: "⬥ मुहूर्त अनुसार",
    event_2_title: "दैनिक आरती",
    event_2_date: "प्रतिदिन (14 सितम्बर – 16 सितम्बर)",
    event_2_time: "⬥ प्रातः: 10:30 बजे | सायं: 7:30 बजे",
    event_3_title: "तत्पश्चात महाप्रसाद",
    event_3_date: "प्रतिदिन संध्या आरती के पश्चात",
    event_3_time: "⬥ प्रसाद: 8:30 बजे से निरंतर",
    event_4_title: "विसर्जन",
    event_4_date: "गुरुवार, 17 सितम्बर 2026",
    event_4_time: "⬥ मुहूर्त अनुसार",

    // Page 4: Venue & Actions
    venue_header_ornament: "❖ || उत्सव निवास || ❖",
    venue_name: "आकृति हाइट्स",
    venue_address: "फ्लैट नं. 104, आकृति हाइट्स, आंगन पार्टी प्लॉट के सामने, प्रेरणातीर्थ देरासर के पास, जोधपुर क्रॉस रोड, अहमदाबाद, गुजरात 380015",
    btn_directions: "गूगल मैप्स पर रास्ता देखें",
    btn_whatsapp: "व्हाट्सएप पर सूचित करें",

    // Page 5: Closing
    closing_jaikara: "गणपती बाप्पा मोरया !<br>मंगलमूर्ती मोरया !",
    closing_signoff: "भगवान श्री गणेश आपके सभी विघ्न दूर करें और आपके जीवन में सुख, शांति, समृद्धि और उत्तम स्वास्थ्य प्रदान करें।",
    label_regards: "विनीत:",
    host_family: "शाह परिवार",
    label_contact: "संपर्क / RSVP:",
    label_visiting_hours: "दर्शन समय:",
    visiting_hours_val: "प्रतिदिन प्रातः 10:00 से रात्रि 10:00 बजे तक",
    btn_back_to_top: "शीर्ष पर जाएं",

    // RSVP Modal
    rsvp_title: "उत्सव में पधारें",
    rsvp_subtitle: "कृपया अपनी उपस्थिति दर्ज कराएं ताकि हम प्रसाद की व्यवस्था कर सकें!",
    label_guest_name: "आपका पूरा नाम",
    ph_guest_name: "उदा. रमेश एवं सुनीता शाह",
    label_guest_count: "अतिथियों की संख्या",
    opt_1_person: "1 सदस्य",
    opt_2_persons: "2 सदस्य",
    opt_3_persons: "3 सदस्य",
    opt_4_persons: "4 सदस्य",
    opt_5_persons: "5+ सपरिवार",
    label_visiting_day: "पधारने का समय / दिन",
    label_wishes: "बाप्पा के लिए मंगलकामनाएं (वैकल्पिक)",
    ph_wishes: "शुभकामनाएं लिखें...",
    btn_confirm_attendance: "उपस्थिति दर्ज करें 🙏",
    rsvp_success_title: "धन्यवाद ! RSVP स्वीकार हुआ",
    rsvp_success_desc: "आपकी शुभकामनाएं प्राप्त हुईं। हम बाप्पा के प्रसाद के साथ आपके स्वागत की प्रतीक्षा में हैं!"
  },

  gu: {
    // Top Bar & Controls
    audio_tooltip: "ભક્તિ સંગીત શરૂ/બંધ",
    audio_mute_hint: "સંગીત બંધ/ચાલુ કરવા 🔔 દબાવો",

    // Page 1: Hero
    shloka_header: "❖ || શ્રી ગણેશાય નમઃ || ❖",
    shloka_verse: "વક્રતુંડ મહાકાય સૂર્યકોટિ સમપ્રભ ।<br>નિર્વિઘ્નં કુરુ મે દેવ સર્વકાર્યેષુ સર્વદા ॥",
    hero_title: "બાપ્પા પધારે છે",
    hero_tagline: "॥ ગણપતિ બાપ્પા મોરિયા ॥",
    event_date: "સોમવાર, ૧૪ સપ્ટેમ્બર ૨૦૨૬",
    scroll_hint: "સમયપત્રક અને સરનામાં માટે નીચે સ્ક્રોલ કરો",

    // Page 2: Welcome
    welcome_shloka_main: "ૐ ગં ગણપતયે નમઃ",
    welcome_shloka_meaning: '"ભગવાન શ્રી ગણેશ આપના અને આપના પરિવાર પર સુખ, શાંતિ, સમૃદ્ધિ અને ઉત્તમ સ્વાસ્થ્યના આશીર્વાદ વરસાવે."',
    welcome_title: "સ્નેહભર્યું નિમંત્રણ",
    welcome_msg_1: "અમે આપને અને આપના પરિવારને અમારા ઘરે ગણેશ ઉત્સવમાં પધારવા હાર્દિક નિમંત્રણ પાઠવીએ છીએ.",
    welcome_msg_2: "<strong>વિઘ્નહર્તા શ્રી ગણેશ</strong>ની કૃપાથી આપની પાવન ઉપસ્થિતિ અમારા આનંદમાં વધારો કરશે!",
    camera_btn_see: "દર્શન દર્પણ",
    camera_btn_on: "કૅમેરા ચાલુ ✨",
    camera_btn_enable: "દર્પણ ખોલો",
    camera_fallback_hint: "લાઈવ દર્પણ માટે ટેપ કરો",

    // Page 3: Schedule
    schedule_header_ornament: "❖ || ઉત્સવ રૂપરેખા || ❖",
    schedule_section_label: "શુભ મુહૂર્ત અને સમય",
    event_1_title: "બાપ્પાનું આગમન અને સ્થાપના",
    event_1_date: "સોમવાર, ૧૪ સપ્ટેમ્બર ૨૦૨૬",
    event_1_time: "⬥ મુહૂર્ત અનુસાર",
    event_2_title: "દૈનિક આરતી",
    event_2_date: "દરરોજ (૧૪ સપ્ટેમ્બર – ૧૬ સપ્ટેમ્બર)",
    event_2_time: "⬥ સવારે: ૧૦:૩૦ વાગ્યે | સાંજે: ૭:૩૦ વાગ્યે",
    event_3_title: "ત્યારબાદ મહાપ્રસાદ",
    event_3_date: "દરરોજ સાંજની આરતી પછી",
    event_3_time: "⬥ પ્રસાદ: રાત્રે ૮:૩૦ વાગ્યાથી",
    event_4_title: "વિસર્જન",
    event_4_date: "ગુરુવાર, ૧૭ સપ્ટેમ્બર ૨૦૨૬",
    event_4_time: "⬥ મુહૂર્ત અનુસાર",

    // Page 4: Venue & Actions
    venue_header_ornament: "❖ || ઉત્સવ નિવાસ || ❖",
    venue_name: "આકૃતિ હાઇટ્સ",
    venue_address: "ફ્લેટ નં. ૧૦૪, આકૃતિ હાઇટ્સ, આંગણ પાર્ટી પ્લોટ સામે, પ્રેરણાતીર્થ દેરાસર પાસે, જોધપુર ક્રોસ રોડ, અમદાવાદ, ગુજરાત ૩૮૦૦૧૫",
    btn_directions: "ગૂગલ મેપ્સ પર દિશા મેળવો",
    btn_whatsapp: "વોટ્સએપ પર જાણ કરો",

    // Page 5: Closing
    closing_jaikara: "ગણપતિ બાપ્પા મોરિયા !<br>મંગલમૂર્તિ મોરિયા !",
    closing_signoff: "ભગવાન શ્રી ગણેશ આપના જીવનમાંથી તમામ વિઘ્નો દૂર કરી સુખ, શાંતિ અને સમૃદ્ધિ પ્રદાન કરે એવી પ્રાર્થના.",
    label_regards: "નિમંત્રક:",
    host_family: "શાહ પરિવાર",
    label_contact: "સંપર્ક / RSVP:",
    label_visiting_hours: "દર્શન સમય:",
    visiting_hours_val: "દરરોજ સવારે ૧૦:૦૦ થી રાત્રે ૧૦:૦૦ વાગ્યા સુધી",
    btn_back_to_top: "શરૂઆત પર જાઓ",

    // RSVP Modal
    rsvp_title: "ઉત્સવમાં પધારો",
    rsvp_subtitle: "કૃપા કરી આપની ઉપસ્થિતિ જણાવો જેથી અમે પ્રસાદની યોગ્ય વ્યવસ્થા કરી શકીએ!",
    label_guest_name: "આપનું પૂરું નામ",
    ph_guest_name: "દા.ત. રમેશભાઈ અને સુનિતાબેન શાહ",
    label_guest_count: "મહેમાનોની સંખ્યા",
    opt_1_person: "૧ વ્યક્તિ",
    opt_2_persons: "૨ વ્યક્તિઓ",
    opt_3_persons: "૩ વ્યક્તિઓ",
    opt_4_persons: "૪ વ્યક્તિઓ",
    opt_5_persons: "૫+ સપરિવાર",
    label_visiting_day: "પધારવાનો સમય / દિવસ",
    label_wishes: "બાપ્પા માટે શુભકામનાઓ (વૈકલ્પિક)",
    ph_wishes: "શુભકામનાઓ લખો...",
    btn_confirm_attendance: "હાજરી કન્ફર્મ કરો 🙏",
    rsvp_success_title: "ધન્યવાદ ! RSVP કન્ફર્મ થયું",
    rsvp_success_desc: "આપના આશીર્વાદ મળ્યા છે. બાપ્પાના પ્રસાદ સાથે આપનું સ્વાગત કરવા અમે આતુર છીએ!"
  }
};

/**
 * Applies translation to all elements containing [data-i18n]
 * @param {string} langCode - 'en', 'hi', or 'gu'
 */
function setAppLanguage(langCode) {
  const currentLang = TRANSLATIONS[langCode] ? langCode : "en";
  const dict = TRANSLATIONS[currentLang];
  document.documentElement.setAttribute("lang", currentLang);

  // Update text and HTML nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      if (dict[key].includes("<") && dict[key].includes(">")) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Update input placeholders
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  // Update active pill button state
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const btnLang = btn.getAttribute("data-lang");
    if (btnLang === currentLang) {
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
    } else {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    }
  });

  try {
    localStorage.setItem("bappa_invite_lang", currentLang);
  } catch (e) {
    console.warn("Storage write error", e);
  }

  // Dispatch custom event for other components if needed
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: currentLang } }));
  }
}

// Attach globally
if (typeof window !== "undefined") {
  window.TRANSLATIONS = TRANSLATIONS;
  window.setAppLanguage = setAppLanguage;
} else if (typeof global !== "undefined") {
  global.TRANSLATIONS = TRANSLATIONS;
  global.setAppLanguage = setAppLanguage;
}
