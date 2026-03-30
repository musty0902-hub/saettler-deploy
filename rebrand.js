const fs = require('fs');
const path = require('path');

const dir = __dirname;

const replacements = [
  { from: /Zahnärzte Praxisgem\. Kullek Görner-Faulenbach/g, to: 'Praxis Dr. med. dent. Matthias Sättler Zahnarzt' },
  { from: /Zahnärzte Praxisgemeinschaft Kullek Görner-Faulenbach/g, to: 'Praxis Dr. med. dent. Matthias Sättler Zahnarzt' },
  { from: /Praxisgemeinschaft Kullek &amp; Görner-Faulenbach/g, to: 'Praxis Dr. med. dent. Matthias Sättler Zahnarzt' },
  { from: /Kullek &amp; Görner-Faulenbach/g, to: 'Dr. med. dent. Matthias Sättler' },
  { from: /Kullek & Görner-Faulenbach/g, to: 'Dr. med. dent. Matthias Sättler' },
  { from: /Dr\. Kullek &amp; Dr\. Görner-Faulenbach/g, to: 'Dr. Matthias Sättler' },
  { from: /Dr\. Kullek & Dr\. Görner-Faulenbach/g, to: 'Dr. Matthias Sättler' },
  { from: /Dr\. Kullek und Dr\. Görner-Faulenbach/g, to: 'Dr. Matthias Sättler' },
  { from: /Zahnärzte · Wettenberg/g, to: 'Zahnarzt · Buseck' },
  { from: /Zahnärzte ·/g, to: 'Zahnarzt ·' },
  { from: /Pestalozzistraße 1a/g, to: 'Bismarckstraße 29' },
  { from: /35435 Wettenberg/g, to: '35418 Buseck' },
  { from: /35435/g, to: '35418' },
  { from: /0 64 06 \/ 7 19 38/g, to: '0 64 08 / 30 88' },
  { from: /\+49640671938/g, to: '+4964083088' },
  { from: /\+4964067193 8/g, to: '+4964083088' },
  { from: /0 64 06 \/ 90 78 58/g, to: '0 64 08 / 30 89' },
  { from: /\+49640690785 8/g, to: '+4964083089' },
  { from: /zahnarzt-wettenberg\.de/g, to: 'zahnarzt-buseck.de' },
  { from: /Wettenberg/g, to: 'Buseck' },
  { from: /Zwei Ärzte/g, to: 'Ein Zahnarzt' },
  { from: /Zahnärzte/g, to: 'Zahnarzt' },
  { from: /Zahnärztin/g, to: 'Zahnarzt' },
  // Map iframe specific updates (Lat: 50.6121, Lon: 8.7845 approx for Buseck Bismarckstr)
  { from: /50\.6094/g, to: '50.6121' }, // marker lat
  { from: /8\.6631/g, to: '8.7845' }, // marker lon
  { from: /8\.643/g, to: '8.7645' }, // bbox
  { from: /50\.598/g, to: '50.6021' }, 
  { from: /8\.683/g, to: '8.8045' }, 
  { from: /50\.621/g, to: '50.6221' }
];

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
for (const f of files) {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  for (const r of replacements) {
    content = content.replace(r.from, r.to);
  }
  fs.writeFileSync(p, content, 'utf8');
}
console.log('Rebrand complete.');
