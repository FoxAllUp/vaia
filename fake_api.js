window.VAIA_API = {
  async generate(input) {
    await new Promise(r => setTimeout(r, 500 + Math.random() * 900));
    const s = (input || "").trim();
    const lower = s.toLowerCase();

    const triggers = [
      /nem bírom tovább/,
      /összeoml/,
      /kilátástalan/,
      /tehetetlen/,
      /senkim/,
      /eldobtak/,
      /felesleges vagyok/,
      /mi értelme/,
      /bárcsak vége/,
      /meghalt/,
      /gyűlölöm magam/,
      /szégyell/,
      /rettegek/,
      /pánik/
    ];
    if (triggers.some(rx => rx.test(lower))) {
      const empat = [
        "Sajnálom, hogy így érzel. Szeretnél róla beszélni?",
        "Ez nagyon nehéz lehet. Itt vagyok, mondd el, mi bánt.",
        "Nem vagy egyedül. Beszélgessünk róla, ha szeretnéd."
      ];
      return empat[Math.floor(Math.random() * empat.length)];
    }

    if (/oké|igazad van|értem|talán/i.test(s) && !/nem\s+igaz/i.test(lower)) {
      const relief = ["Rendben.", "Értem. Ha akarod, folytassuk.", "Oké — szuper."];
      return relief[Math.floor(Math.random() * relief.length)];
    }

    if (/\?$/.test(s) || /\?/i.test(s)) {
      const q = [
        "Röviden: igen.",
        "Szerintem talán.",
        "Ez függ a helyzettől — mit gondolsz te?",
        "Nem tudom biztosan, mesélj még a részletekről."
      ];
      return q[Math.floor(Math.random() * q.length)];
    }

    if (/[!]|haha|lol|xd/i.test(s)) {
      const excited = [
        "Na ez izgi! Mesélj még!",
        "Haha :D Tényleg?",
        "KaRó kaRó kaRó! :D"
      ];
      return excited[Math.floor(Math.random() * excited.length)];
    }

    const generic = [
      "Értem.",
      "Hm… mesélj még erről.",
      "Ez érdekes gondolat.",
      "Miért így gondolod?",
      "Kíváncsi vagyok erre — folytasd."
    ];
    return generic[Math.floor(Math.random() * generic.length)];
  }
};
