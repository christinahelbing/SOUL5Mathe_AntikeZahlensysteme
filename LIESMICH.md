# Die Zahlen-Sanduhr (SOUL Mathe Klasse 5, Zusatzbaustein Z1)

WebApp mit zwei Zeitreisen: Rom (5 Stationen) und Maya (5 Stationen), dazu Zeitreisepass und Sudoku-Werkstatt.
Läuft offline als App auf dem iPad. Der Fortschritt wird auf dem jeweiligen iPad gespeichert.

## Dateien

| Datei | Inhalt |
|---|---|
| index.html | Startseite |
| app.js | Programm (Aufgabenprüfung, Sudoku, Speichern) |
| data.js | **Alle Texte und Aufgaben.** Hier kannst du Formulierungen direkt ändern. |
| pools.js | Sudoku-Grundmuster (werden bei jedem Aufruf neu gemischt) |
| style.css | Aussehen |
| sw.js | Offline-Speicher |
| manifest.json, icons/ | App-Symbol und Name auf dem Home-Bildschirm |
| fonts/ | Schriften (offline) |
| img/ | Hier kommen die Bilder rein |

## Bilder einfügen

Die Bilder in den Ordner `img/` legen, mit genau diesen Namen. Erlaubt sind `.webp`, `.jpg` oder `.png`.
Fehlt ein Bild, zeigt die App automatisch einen farbigen Hintergrund.

| Name | Bild |
|---|---|
| start | Museum bei Nacht mit Sanduhr und zwei Toren |
| E1 | Museum am Morgen, Sanduhr repariert |
| R1 | Via Appia mit Meilenstein |
| R2 | Forum, Markt |
| R3 | Kolosseum |
| R4 | Steinmetzwerkstatt |
| R5 | Palastsaal mit Mosaik |
| M1 | Ankunft im Regenwald, Pyramide |
| M2 | Maya-Markt mit Kakaobohnen |
| M3 | Sternwarte bei Nacht |
| M4 | Schreibstube mit Faltbuch |
| M5 | Pyramide mit Tempelwand |
| livia.png | Livia, freigestellt (transparenter Hintergrund) |
| balam.png | Balam, freigestellt (transparenter Hintergrund) |

Tipp: Bilder vorher verkleinern (z. B. auf 1600 Pixel Breite, als .jpg oder .webp), sonst wird die App auf den iPads unnötig groß.

## Auf GitHub Pages veröffentlichen

1. Neues Repository anlegen und den kompletten Inhalt dieses Ordners hochladen.
2. Im Repository: Settings > Pages > Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
3. Nach ein bis zwei Minuten ist die App unter `https://<benutzername>.github.io/<repository>/` erreichbar.

## Auf den iPads installieren

1. Link in **Safari** öffnen.
2. Teilen-Symbol > „Zum Home-Bildschirm“.
3. Die Kinder öffnen die App ab jetzt **immer über das Symbol auf dem Home-Bildschirm**.

Wichtig: Safari und die Home-Bildschirm-App haben getrennte Speicher. Wer mal im Safari-Tab und mal über das Symbol arbeitet, hat zwei verschiedene Spielstände.
Wenn die App vom Home-Bildschirm gelöscht wird, ist der Fortschritt weg.

## Codes für Lehrkräfte

Im Zeitreisepass ganz unten „Für Lehrkräfte“ antippen.

- `Z1LEHRER` schaltet den Lehrkraft-Modus ein oder aus. Dann sind alle Stationen und die ganze Werkstatt offen, Aufgaben haben einen Knopf „Überspringen“, Sudokus einen Knopf „Lösen“. Praktisch zum Testen.
- `Z1NEUSTART` löscht den Spielstand auf diesem Gerät (z. B. wenn ein iPad weitergegeben wird).

Im Browser geht der Lehrkraft-Modus auch über die Adresse mit `?lehrer=1` am Ende (`?lehrer=0` schaltet ihn aus).

## Nach Änderungen

Wenn du Dateien änderst oder Bilder ergänzt: in `sw.js` die Zeile `const VERSION = 'z1-v1';` hochzählen (z. B. `z1-v2`).
Sonst behalten die iPads die alte Version im Speicher. Die neue Version lädt dann beim nächsten Öffnen mit Internet.
