/* Inhalte der Zeitreise. Texte können hier direkt geändert werden.
   Platzhalter in Texten:  [[g7]] = Maya-Zeichen für 7 (eine Etage)
                           [[n1000]] = Maya-Zahl 1000 in Etagen */

const INTRO = [
  { who: 'erz', text: 'Eigentlich wolltest du nur kurz deine Mütze holen. Doch als du zurück in die große Halle kommst, ist das Museum dunkel und still. Nur in einer Vitrine glimmt etwas.' },
  { who: 'erz', text: 'Es ist eine Sanduhr aus Messing. Um sie herum liegen zwei zerbrochene Ringe voller seltsamer Zeichen. Auf dem Schild steht: <b>Die Zahlen-Sanduhr.</b> Wer die Zahlen der alten Völker versteht, kann die Ringe heilen.' },
  { who: 'erz', text: 'Als du die Sanduhr berührst, öffnen sich hinter ihr zwei Tore. Durch das eine scheint die Sonne Roms. Aus dem anderen hörst du den Regenwald der Maya. Um die Sanduhr zu reparieren, musst du durch beide Tore reisen.' }
];

const FINALE = [
  { who: 'erz', text: 'Beide Ringe sind zurück. Die Sanduhr leuchtet golden, und der Sand rieselt wieder. Draußen geht gerade die Sonne auf.' },
  { who: 'erz', text: 'Du hast die Zahlen der Römer und der Maya gelernt. Zeig deinen Zeitreisepass deiner Lehrerin oder deinem Lehrer. Und wenn du Lust hast: In der Sudoku-Werkstatt warten immer neue Rätsel auf dich.' }
];

const JOURNEYS = {
  rom: {
    title: 'Reise nach Rom',
    sub: 'Im Römischen Reich, um 80 n. Chr.',
    guide: 'livia',
    ring: 'Römischer Ring',
    chapters: [
      {
        id: 'r1', title: 'Der Meilenstein', scene: 'R1', stamp: 'Meilenstein',
        steps: [
          { t: 'story', who: 'erz', text: 'Ein Ruck, ein Wirbel aus Sand, und plötzlich stehst du auf einer gepflasterten Straße. Es riecht nach Pferden und warmem Stein. Zypressen stehen am Wegrand, in der Ferne siehst du eine Stadtmauer.' },
          { t: 'story', who: 'livia', text: 'Salve! Ich bin Livia. Du siehst aus, als kämst du von sehr weit her. Willkommen auf der Via Appia, der wichtigsten Straße nach Rom.' },
          { t: 'story', who: 'livia', text: 'Siehst du den Stein da vorne? Das ist ein Meilenstein. Er verrät dir, wie weit es noch bis Rom ist. Dafür musst du aber unsere Zahlen lesen können.' },
          { t: 'learn', title: 'Die sieben Zahlzeichen', html: '<p>Die Römer schrieben Zahlen mit Buchstaben. Jeder Buchstabe hat einen festen Wert:</p><table class="rtab"><tr><th>I</th><th>V</th><th>X</th><th>L</th><th>C</th><th>D</th><th>M</th></tr><tr><td>1</td><td>5</td><td>10</td><td>50</td><td>100</td><td>500</td><td>1000</td></tr></table><p class="small">Merkhilfe: C kommt von <i>centum</i> (hundert), M von <i>mille</i> (tausend).</p>' },
          { t: 'learn', title: 'Die Additionsregel', html: '<p>Die Zeichen stehen von links nach rechts, das größte zuerst. Zum Lesen zählst du alle Werte zusammen.</p><p class="ex">CCCX = 100 + 100 + 100 + 10 = 310</p><p>I, X, C und M dürfen höchstens viermal nebeneinander stehen. V, L und D gibt es in einer Zahl nur einmal. VV ist also verboten, dafür schreibt man X.</p>' },
          { t: 'choice', q: 'Welcher Wert gehört zu <span class="rn">L</span>?', options: ['5', '50', '500', '1000'], answer: 1, tip: 'Schau in die Tabelle: I, V, X, L, C, D, M. L steht zwischen X (10) und C (100).' },
          { t: 'choice', q: 'Welches Zeichen steht für 500?', options: ['C', 'M', 'D', 'L'], answer: 2, tip: 'C ist 100 und M ist 1000. Das Zeichen dazwischen ist 500.' },
          { t: 'read', roman: 'XVI', look: 'stone', q: 'Auf dem Meilenstein steht diese Zahl. Wie viele Meilen sind es noch bis Rom?' },
          { t: 'fact', title: 'Die römische Meile', html: '<p>Eine römische Meile waren 1000 Doppelschritte. Auf Latein heißt das <i>mille passus</i>. Daher kommt unser Wort Meile. Eine römische Meile ist knapp 1,5 Kilometer lang.</p><p>Die Römer bauten Straßen quer durch ihr ganzes Reich, damit Soldaten, Händler und Boten schnell vorankamen.</p>' },
          { t: 'read', roman: 'XV', q: 'Livia zeigt auf eine Wachstafel am Wegrand. Welche Zahl steht darauf?' },
          { t: 'read', roman: 'XXXIII' },
          { t: 'read', roman: 'XXVI' },
          { t: 'read', roman: 'CLX' },
          { t: 'read', roman: 'MVII' },
          { t: 'read', roman: 'MDCCCCXIIII' },
          { t: 'read', roman: 'MMMDC' },
          { t: 'story', who: 'livia', text: 'Du kannst unsere Zahlen ja schon lesen! Komm mit, ich zeig dir den Markt.' }
        ]
      },
      {
        id: 'r2', title: 'Markt auf dem Forum', scene: 'R2', stamp: 'Münze',
        steps: [
          { t: 'story', who: 'erz', text: 'Durch das Stadttor geht es mitten hinein ins Gedränge. Händler rufen, ein Esel schreit, irgendwo duftet frisches Brot. Ihr seid auf dem Forum, dem großen Platz mitten in Rom.' },
          { t: 'story', who: 'livia', text: 'Hier wird alles verkauft. Die Händler schreiben ihre Preise und Mengen auf Wachstafeln. Hilfst du mir? Ich soll für meinen Vater ein paar Zahlen aufschreiben.' },
          { t: 'learn', title: 'So schreibst du eine Zahl römisch', html: '<p>Zerlege die Zahl zuerst in Tausender, Hunderter, Zehner und Einer. Dann schreibst du jeden Teil römisch und hängst alles hintereinander.</p><p class="ex">263 = 200 + 60 + 3 = CC + LX + III = CCLXIII</p><p>Denk an die Regeln: höchstens vier gleiche Zeichen nebeneinander, V, L und D nur einmal.</p>' },
          { t: 'fact', title: 'Das Forum Romanum', html: '<p>Das Forum war Marktplatz, Treffpunkt und Gerichtsort zugleich. Hier standen Tempel, und hier hielten Politiker ihre Reden.</p><p>Bezahlt wurde mit Münzen. Ein Denar war vier Sesterzen wert.</p>' },
          { t: 'write', n: 77, mode: 'any', q: 'Der Bäcker hat 77 Brote gebacken. Schreib die Zahl römisch auf seine Tafel.' },
          { t: 'write', n: 105, mode: 'any', q: 'Der Töpfer hat 105 Krüge. Schreib die Zahl römisch.' },
          { t: 'write', n: 291, mode: 'any' },
          { t: 'write', n: 384, mode: 'any' },
          { t: 'write', n: 489, mode: 'any' },
          { t: 'write', n: 786, mode: 'any' },
          { t: 'write', n: 1364, mode: 'any' },
          { t: 'write', n: 13, mode: 'any', q: 'Ein Händler hat <span class="rn">XXV</span> Krüge Olivenöl. Er verkauft <span class="rn">XII</span> davon. Wie viele Krüge hat er noch? Antworte römisch.', tip: 'Übersetze erst beide Zahlen: XXV = 25 und XII = 12. Dann rechne 25 − 12.' },
          { t: 'write', n: 6, mode: 'any', q: 'Livia kauft <span class="rn">III</span> Brote. Jedes kostet <span class="rn">II</span> Asse. Wie viele Asse muss sie bezahlen? Antworte römisch.', tip: 'Drei Brote zu je zwei Assen: 3 · 2 = ?' },
          { t: 'choice', q: 'Für schwierige Rechnungen benutzten die Römer ein Rechenbrett mit Steinchen, den Abakus. Warum wohl?', options: ['Weil man mit römischen Zahlen auf dem Papier nur sehr umständlich rechnen kann', 'Weil Rechnen auf Wachstafeln verboten war', 'Weil die Römer keine Zahlen schreiben konnten'], answer: 0, tip: 'Versuch mal, CCCLXXXIV und DCCLXXXVI schriftlich zu addieren, so wie du es in der Schule gelernt hast. Klappt das?' },
          { t: 'story', who: 'livia', text: 'Danke, das ging ja schnell! Und jetzt beeil dich: Gleich beginnen die Spiele im Kolosseum. Mein Onkel hat uns Eintrittsmarken besorgt.' }
        ]
      },
      {
        id: 'r3', title: 'Das Kolosseum', scene: 'R3', stamp: 'Eintrittsmarke',
        steps: [
          { t: 'story', who: 'erz', text: 'Vor euch ragt ein riesiges Rund aus hellem Stein auf. Es ist ganz neu, Kaiser Titus hat es gerade erst eröffnet. Tausende Menschen drängen zu den Eingängen.' },
          { t: 'story', who: 'livia', text: 'Jeder Eingang hat eine Nummer. Auf unseren Marken steht, durch welchen wir gehen müssen. Aber Achtung: Hier schreiben sie manche Zahlen kürzer.' },
          { t: 'learn', title: 'Die Subtraktionsregel', html: '<p>Steht ein kleineres Zeichen <b>vor</b> einem größeren, wird es abgezogen.</p><table class="rtab"><tr><th>IV</th><th>IX</th><th>XL</th><th>XC</th><th>CD</th><th>CM</th></tr><tr><td>4</td><td>9</td><td>40</td><td>90</td><td>400</td><td>900</td></tr></table><p>Nur I, X und C dürfen vorne stehen, und nur vor den zwei nächstgrößeren Zeichen: I vor V und X, X vor L und C, C vor D und M.</p><p class="ex">XC = 90 ist erlaubt. VC für 95 ist verboten, richtig ist XCV.</p>' },
          { t: 'fact', title: 'Das Kolosseum', html: '<p>Das Kolosseum wurde im Jahr 80 n. Chr. eröffnet. Man schätzt, dass ungefähr 50 000 Menschen hineinpassten.</p><p>Über den Eingangsbögen standen Nummern. Auf den Eintrittsmarken stand, welchen Eingang man nehmen musste. So kamen alle schnell auf ihre Plätze.</p>' },
          { t: 'read', roman: 'XLIV', look: 'ticket', q: 'Auf Livias Eintrittsmarke steht diese Zahl. Durch welchen Eingang müsst ihr?' },
          { t: 'read', roman: 'LXXIV' },
          { t: 'read', roman: 'CXC' },
          { t: 'read', roman: 'MCIX' },
          { t: 'read', roman: 'CDXXXI' },
          { t: 'read', roman: 'MMCM' },
          { t: 'read', roman: 'CMXCIX' },
          { t: 'write', n: 40, mode: 'short', from: 'XXXX', q: 'Schreib kürzer, mit der Subtraktionsregel.' },
          { t: 'write', n: 407, mode: 'short', from: 'CCCCVII', q: 'Schreib kürzer, mit der Subtraktionsregel.' },
          { t: 'write', n: 190, mode: 'short', from: 'CLXXXX', q: 'Schreib kürzer, mit der Subtraktionsregel.' },
          { t: 'write', n: 1900, mode: 'short', from: 'MDCCCC', q: 'Schreib kürzer, mit der Subtraktionsregel.' },
          { t: 'write', n: 1469, mode: 'short', from: 'MCCCCLXVIIII', q: 'Schreib kürzer, mit der Subtraktionsregel.' },
          { t: 'choice', q: 'Ein Junge auf der Tribüne schreibt <span class="rn">VC</span> für 95. Wie ist es richtig?', options: ['XCV', 'LXLV', 'VC', 'XCIIIII'], answer: 0, tip: 'V darf nie vor einem größeren Zeichen stehen. Zerlege 95 in 90 + 5.' },
          { t: 'story', who: 'livia', text: 'Puh, geschafft! Nach den Spielen müssen wir in die Werkstatt meines Vaters. Er hat ein Rätsel für dich.' }
        ]
      },
      {
        id: 'r4', title: 'Die Werkstatt', scene: 'R4', stamp: 'Meißel',
        steps: [
          { t: 'story', who: 'erz', text: 'In der Werkstatt staubt es. Livias Vater klopft mit Hammer und Meißel Buchstaben in eine Marmorplatte. Da fängt die Sanduhr in deiner Tasche an zu glühen.' },
          { t: 'story', who: 'livia', text: 'Schau mal, auf den leeren Platten erscheinen Inschriften! Die kommen aus der Zukunft, aus deiner Sanduhr. Mein Vater sagt, darin sind Jahreszahlen versteckt.' },
          { t: 'learn', title: 'Chronogramme', html: '<p>In einem Chronogramm sind manche Buchstaben groß geschrieben. Zähl alle großen Buchstaben zusammen, die römische Zahlzeichen sind. Das Ergebnis ist eine Jahreszahl.</p><p>Die Reihenfolge ist egal, du addierst einfach alles. Buchstaben wie K, N oder G sind keine Zahlzeichen, die lässt du weg.</p><p class="small">Früher schrieb man das U oft als V. Darum steht in manchen Wörtern ein V, wo du ein U erwartest.</p>' },
          { t: 'chrono', text: 'LorD haVe MerCI Vpon Vs', answer: 1666 },
          { t: 'chrono', text: 'My Day Is Closed In Immortality', answer: 1603 },
          { t: 'chrono', text: 'NVnC GaLLICIDIVM', answer: 1813, after: '1813 war das Jahr der Völkerschlacht bei Leipzig.' },
          { t: 'chrono', text: 'KarL Der grosse Vnserer teVtsChen spraChe pfLeger', answer: 810 },
          { t: 'match', q: 'Die Sanduhr zeigt dir Bilder aus der Zukunft. Welches Jahr gehört zu welchem Ereignis?', items: [
            { label: 'Karl der Große wird zum Kaiser gekrönt', answer: 'DCCC' },
            { label: 'Wikinger betreten amerikanisches Festland', answer: 'MI' },
            { label: 'Ende des Zweiten Weltkriegs', answer: 'MCMXLV' },
            { label: 'Der erste Mensch fliegt ins Weltall', answer: 'MCMLXI' }
          ], tip: 'Übersetze zuerst alle vier Jahreszahlen. Dann überleg, was davon zuerst passiert ist.' },
          { t: 'write', n: 80, mode: 'short', q: 'Livias Vater soll das Eröffnungsjahr des Kolosseums in eine Platte meißeln. Es war das Jahr 80. Wie schreibt er das?' },
          { t: 'write', n: 'YEAR', mode: 'short', q: 'Welches Jahr ist bei dir zu Hause gerade? Schreib es so, wie Livias Vater es meißeln würde.' },
          { t: 'fact', title: 'Römische Zahlen heute', html: '<p>Römische Zahlen siehst du heute noch auf Uhren, an alten Gebäuden, bei Buchkapiteln oder in Königsnamen wie Ludwig XIV.</p><p>Chronogramme waren vor allem vor einigen hundert Jahren beliebt, also lange nach der Zeit der alten Römer.</p>' },
          { t: 'story', who: 'livia', text: 'Mein Vater staunt. Er sagt, du sollst mitkommen in den Palast. Dort ist ein Mosaik kaputt, und niemand kann es reparieren.' }
        ]
      },
      {
        id: 'r5', title: 'Der Mosaiksaal', scene: 'R5', stamp: 'Mosaik',
        steps: [
          { t: 'story', who: 'erz', text: 'Im Palast ist es kühl und still. Auf dem Boden liegt ein riesiges Mosaik aus 81 Feldern, aber viele Steine fehlen.' },
          { t: 'story', who: 'livia', text: 'Das Mosaik folgt einer strengen Regel: In jeder Zeile, jeder Spalte und jedem 3×3-Block kommt jede Zahl von I bis IX genau einmal vor. Wenn du es reparierst, öffnet sich dein Weg nach Hause.' },
          { t: 'learn', title: 'So reparierst du das Mosaik', html: '<p>Tippe auf ein leeres Feld und danach unten auf ein Zahlzeichen.</p><p>Wird ein Feld rot, steht diese Zahl schon in derselben Zeile, Spalte oder im selben Block.</p><p>Mit <b>Prüfen</b> siehst du, ob sich irgendwo ein Fehler versteckt. Mit <b>Tipp</b> wird ein Feld für dich gefüllt.</p>' },
          { t: 'sudoku', kind: 'rom9', diff: 'leicht' },
          { t: 'story', who: 'livia', text: 'Das Mosaik leuchtet! Und schau auf deine Sanduhr: Ein goldener Ring ist zurück.' },
          { t: 'story', who: 'livia', text: 'Eins muss ich dir noch sagen. Mit unseren Zahlen kann man schlecht rechnen, weil wir kein Zeichen für Nichts haben, keine Null. Ich habe gehört, dass ein Volk weit weg so ein Zeichen kennt. Vielleicht findest du es. Vale, mach’s gut!' }
        ]
      }
    ]
  },

  maya: {
    title: 'Reise zu den Maya',
    sub: 'In einer Maya-Stadt im Regenwald, um 750 n. Chr.',
    guide: 'balam',
    ring: 'Maya-Ring',
    chapters: [
      {
        id: 'm1', title: 'Im Regenwald', scene: 'M1', stamp: 'Jaguar',
        steps: [
          { t: 'story', who: 'erz', text: 'Feuchte, warme Luft schlägt dir entgegen. Über dir kreischen Papageien, und zwischen den Baumkronen ragt eine steinerne Pyramide in den Himmel. Du bist bei den Maya.' },
          { t: 'story', who: 'balam', text: 'Hallo! Ich bin Balam. In unserer Sprache heißt das Jaguar. Mein Vater ist Schreiber hier in der Stadt. Sag mal, womit zählst du eigentlich?' },
          { t: 'story', who: 'balam', text: 'Wir zählen mit den Fingern und mit den Zehen. Das sind zusammen 20. Darum rechnen wir in Zwanzigern. Und wir schreiben alle Zahlen mit nur drei Zeichen.' },
          { t: 'learn', title: 'Punkt, Strich, Muschel', html: '<div class="glyphrow"><div>[[g1]]<span>Punkt = 1</span></div><div>[[g5]]<span>Strich = 5</span></div><div>[[g0]]<span>Muschel = 0</span></div></div><p>Die Punkte stehen immer über den Strichen. Fünf Punkte werden zu einem Strich. Mehr als drei Striche gibt es nicht, denn vier Striche wären schon 20.</p>[[table19]]' },
          { t: 'fact', title: 'Wer waren die Maya?', html: '<p>Die Maya lebten in Mittelamerika, im heutigen Mexiko, Guatemala, Belize, Honduras und El Salvador. Sie bauten große Städte mit Pyramiden mitten im Regenwald, lange bevor Menschen aus Europa nach Amerika kamen.</p><p>Die Maya gibt es noch heute. Millionen Menschen sprechen Maya-Sprachen.</p>' },
          { t: 'mread', n: 7 },
          { t: 'mread', n: 13 },
          { t: 'mread', n: 0 },
          { t: 'mread', n: 19 },
          { t: 'mread', n: 11 },
          { t: 'mbuild', n: 8, q: 'Leg die Zahl 8 mit Punkten und Strichen.' },
          { t: 'mbuild', n: 15, q: 'Leg die Zahl 15.' },
          { t: 'mbuild', n: 17, q: 'Leg die Zahl 17.' },
          { t: 'choice', q: 'Warum zählen die Maya in Zwanzigern?', options: ['Weil man mit Fingern und Zehen bis 20 zählen kann', 'Weil die 20 eine Glückszahl war', 'Weil sie nur 20 Zahlwörter kannten'], answer: 0, tip: 'Balam hat es dir am Anfang verraten. Zähl mal deine Finger und Zehen.' },
          { t: 'story', who: 'balam', text: 'Du lernst schnell! Komm, heute ist Markttag. Da kannst du gleich üben.' }
        ]
      },
      {
        id: 'm2', title: 'Der Markt', scene: 'M2', stamp: 'Kakaobohne',
        steps: [
          { t: 'story', who: 'erz', text: 'Auf dem großen Platz sitzen Händlerinnen und Händler auf Matten. Es gibt Mais, Bohnen, bunte Federn und Töpfe. Bezahlt wird mit kleinen braunen Bohnen.' },
          { t: 'story', who: 'balam', text: 'Das sind Kakaobohnen. Damit bezahlen wir. Meine Mutter hat mir aufgeschrieben, was ich kaufen soll. Hilfst du mir beim Rechnen?' },
          { t: 'fact', title: 'Kakao', html: '<p>Aus Kakaobohnen machten die Maya ein bitteres, schaumiges Getränk. Die Bohnen waren so wertvoll, dass man mit ihnen bezahlen konnte.</p><p>Schokolade, wie du sie kennst, gab es damals noch nicht.</p>' },
          { t: 'learn', title: 'Zusammenzählen mit Punkten und Strichen', html: '<p>Leg einfach alle Punkte und alle Striche zusammen. Werden es fünf Punkte, tauschst du sie gegen einen Strich.</p><p class="ex">[[g3]] + [[g4]] = sieben Punkte. Fünf davon werden ein Strich: [[g7]]</p>' },
          { t: 'mbuild', n: 13, q: 'Mais kostet [[g7]] Bohnen, ein Topf kostet [[g6]] Bohnen. Wie viel kostet beides zusammen?' },
          { t: 'mbuild', n: 14, q: 'Federn kosten [[g9]], Pfeffer kostet [[g5]]. Wie viel zusammen?' },
          { t: 'mbuild', n: 19, q: 'Balam kauft Bohnen für [[g12]] und Honig für [[g7]]. Wie viel bezahlt er?' },
          { t: 'mbuild', n: 12, q: 'Drei Maiskolben kosten je [[g4]]. Wie viel kosten alle drei?' },
          { t: 'learn', title: 'Die Muschel: ein Zeichen für Nichts', html: '<div class="glyphrow"><div>[[g0]]<span>Null</span></div></div><p>Die Maya hatten ein eigenes Zeichen für Null. Das war eine große Erfindung. Die Römer kannten so ein Zeichen nicht.</p><p>In Europa rechnet man erst seit ungefähr 800 Jahren mit der Null. Die Maya kannten sie schon viel früher.</p>' },
          { t: 'choice', q: 'Livia aus Rom hatte kein Zeichen für die Null. Was bedeutet die Muschel bei den Maya?', options: ['Null, also nichts', 'Zehn', 'Zwanzig'], answer: 0, tip: 'Schau dir die Regelkarte oben nochmal an.' },
          { t: 'mbuild', n: 0, q: 'Die Händlerin hatte [[g19]] Bohnen. Sie hat alle ausgegeben. Wie viele hat sie noch?' },
          { t: 'choice', q: 'Balam hat [[g15]] Bohnen und bekommt noch [[g5]] dazu. Das sind 20. Wie schreibt man das?', options: ['Vier Striche übereinander', 'Ein Punkt in der Etage darüber, darunter eine Muschel', 'Zwanzig Punkte'], answer: 1, tip: 'Mehr als drei Striche gibt es nicht. Bei 20 wandert ein Punkt eine Etage nach oben, und unten bleibt nichts übrig.' },
          { t: 'story', who: 'balam', text: 'Genau das zeige ich dir heute Nacht. Wir gehen zur Sternwarte.' }
        ]
      },
      {
        id: 'm3', title: 'Die Sternwarte', scene: 'M3', stamp: 'Stern',
        steps: [
          { t: 'story', who: 'erz', text: 'Es ist Nacht. Auf dem runden Turm der Sternwarte sitzt ein alter Priester und schaut in den Himmel. Über euch funkeln mehr Sterne, als du je gesehen hast.' },
          { t: 'story', who: 'balam', text: 'Die Sternkundigen zählen Tage, Nächte und Sterne. Dafür brauchen sie große Zahlen. Und große Zahlen schreiben wir in Etagen, übereinander.' },
          { t: 'learn', title: 'Zahlen in Etagen', html: '<p>Die unterste Etage sind die Einer, wie bisher 0 bis 19. In der Etage darüber ist jeder Punkt 20 wert. Darüber kommen die Vierhunderter, denn 20 · 20 = 400. Ganz oben die Achttausender, denn 20 · 400 = 8000.</p><table class="rtab"><tr><td>4. Etage</td><td>· 8000</td></tr><tr><td>3. Etage</td><td>· 400</td></tr><tr><td>2. Etage</td><td>· 20</td></tr><tr><td>1. Etage (unten)</td><td>· 1</td></tr></table><div class="glyphrow"><div>[[n43]]<span>2 · 20 + 3 = 43</span></div><div>[[n20]]<span>1 · 20 + 0 = 20</span></div></div>' },
          { t: 'fact', title: 'Sternkunde', html: '<p>Die Maya beobachteten den Himmel sehr genau, vor allem die Venus. In einem ihrer Bücher stehen Tabellen, mit denen sie Finsternisse vorhersagen konnten.</p>' },
          { t: 'mread', n: 20, labels: true },
          { t: 'mread', n: 21, labels: true },
          { t: 'mread', n: 41, labels: true },
          { t: 'mread', n: 61, labels: true },
          { t: 'mread', n: 122, labels: true },
          { t: 'mread', n: 400, labels: true },
          { t: 'mread', n: 401, labels: true },
          { t: 'mread', n: 8000, labels: true },
          { t: 'mbuild', n: 25, q: 'Der Priester hat 25 Sterne gezählt. Leg die Zahl in zwei Etagen.' },
          { t: 'mbuild', n: 40 },
          { t: 'mbuild', n: 100 },
          { t: 'mbuild', n: 399 },
          { t: 'story', who: 'balam', text: 'Jetzt kennst du unser Geheimnis. Morgen zeige ich dir die Schreibstube meines Vaters. Da wird es richtig groß.' }
        ]
      },
      {
        id: 'm4', title: 'Die Schreibstube', scene: 'M4', stamp: 'Pinsel',
        steps: [
          { t: 'story', who: 'erz', text: 'In der Schreibstube riecht es nach Farbe. Auf einem niedrigen Tisch liegt ein Buch, das wie eine Ziehharmonika gefaltet ist.' },
          { t: 'story', who: 'balam', text: 'Mein Vater schreibt auf, wie viel Mais jedes Dorf abgeben muss. Er sagt mir die Zahlen, und ich soll sie in Maya-Schrift aufschreiben. Machst du mit?' },
          { t: 'learn', title: 'Große Zahlen umwandeln', html: '<ol><li>Such die größte Etage, die in deine Zahl passt.</li><li>Wie oft passt sie hinein? So viel kommt in diese Etage.</li><li>Rechne den Rest aus und mach mit der nächsten Etage weiter.</li><li>Passt eine Etage gar nicht, kommt dort die Muschel hin.</li></ol><div class="glyphrow"><div>[[n1000]]<span>1000</span></div></div><p class="ex">1000: Die 400 passt 2-mal hinein (800), Rest 200. Die 20 passt 10-mal hinein (200), Rest 0. Unten kommt also die Muschel hin.</p>' },
          { t: 'fact', title: 'Die Bücher der Maya', html: '<p>Die Maya schrieben auf Papier aus Baumrinde und falteten es zu langen Büchern. Als die Spanier Amerika eroberten, verbrannten sie fast alle diese Bücher. Nur vier sind erhalten.</p><p>Eins davon liegt in Sachsen, in der Landesbibliothek in Dresden: der Dresdner Codex.</p>' },
          { t: 'mbuild', n: 133 },
          { t: 'mbuild', n: 350 },
          { t: 'mbuild', n: 622 },
          { t: 'mbuild', n: 1000 },
          { t: 'mread', n: 845 },
          { t: 'mread', n: 4020 },
          { t: 'mbuild', n: 6452 },
          { t: 'mbuild', n: 9000 },
          { t: 'mbuild', n: 38407, q: 'Die größte Zahl im ganzen Buch: 38 407. Schaffst du die?' },
          { t: 'story', who: 'balam', text: 'Mein Vater ist stolz auf dich. Er sagt, du darfst mit auf die große Pyramide. Dort wartet die letzte Prüfung.' }
        ]
      },
      {
        id: 'm5', title: 'Die Tempelwand', scene: 'M5', stamp: 'Pyramide',
        steps: [
          { t: 'story', who: 'erz', text: 'Ihr steigt die steilen Stufen der Pyramide hinauf. Oben, im Licht der Abendsonne, steht eine Wand aus Steinplatten. Auf manchen sind Zahlen eingemeißelt, andere sind leer.' },
          { t: 'fact', title: 'Das Ballspiel', html: '<p>Von hier oben siehst du den Ballspielplatz. Die Maya spielten mit einem schweren Ball aus Kautschuk. Den durfte man nicht mit den Händen berühren, sondern vor allem mit der Hüfte.</p>' },
          { t: 'story', who: 'balam', text: 'Das hier ist ein Zahlenrätsel der Priester. Zuerst ein kleines zum Aufwärmen: In jeder Zeile, jeder Spalte und jedem Block kommt jedes Zeichen genau einmal vor.' },
          { t: 'sudoku', kind: 'maya4' },
          { t: 'story', who: 'balam', text: 'Sehr gut! Jetzt die große Wand: 16 Zeilen, 16 Spalten, 16 Blöcke. Jedes Zeichen von 0 bis 15 kommt in jeder Zeile, jeder Spalte und jedem 4×4-Block genau einmal vor. Lass dir Zeit. Du kannst jederzeit aufhören und später weitermachen.' },
          { t: 'sudoku', kind: 'maya16', diff: 'leicht' },
          { t: 'story', who: 'balam', text: 'Die Wand leuchtet golden! Schau auf deine Sanduhr.' },
          { t: 'story', who: 'balam', text: 'Danke, dass du da warst. Vergiss nicht: Ein Zeichen für Nichts kann sehr viel wert sein. Bis bald!' }
        ]
      }
    ]
  }
};

const PEOPLE = {
  livia: { name: 'Livia', img: 'livia', color: '#b5532f' },
  balam: { name: 'Balam', img: 'balam', color: '#1f6f5c' },
  erz: { name: '', img: null }
};

const WORKSHOP = [
  { key: 'rom9_leicht', kind: 'rom9', diff: 'leicht', title: 'Römisches Mosaik', level: 'leicht', journey: 'rom' },
  { key: 'rom9_mittel', kind: 'rom9', diff: 'mittel', title: 'Römisches Mosaik', level: 'mittel', journey: 'rom' },
  { key: 'rom9_schwer', kind: 'rom9', diff: 'schwer', title: 'Römisches Mosaik', level: 'schwer', journey: 'rom' },
  { key: 'maya4', kind: 'maya4', title: 'Kleine Glyphenwand', level: '4 × 4', journey: 'maya' },
  { key: 'maya16_leicht', kind: 'maya16', diff: 'leicht', title: 'Große Tempelwand', level: 'leicht', journey: 'maya' },
  { key: 'maya16_schwer', kind: 'maya16', diff: 'schwer', title: 'Große Tempelwand', level: 'schwer', journey: 'maya' }
];
