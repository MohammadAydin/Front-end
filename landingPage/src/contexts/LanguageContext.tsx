import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'de' | 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  de: {
    // Navigation
    'nav.about': 'Über uns',
    'nav.howItWorks': 'Wie es funktioniert',
    'nav.benefits': 'Vorteile',
    'nav.testimonials': 'Kundenstimmen',
    'nav.faq': 'FAQ',
    'nav.pricing': 'Preise',
    'nav.contact': 'Kontakt',
    'nav.login': 'Anmelden',
    'nav.getStarted': 'Jetzt starten',
    'nav.loginDropdown.caregiver': 'Pflegekraft Login',
    'nav.loginDropdown.facility': 'Pflegeheim Login',
    'nav.getStartedDropdown.caregiver': 'Als Pflegekraft registrieren',
    'nav.getStartedDropdown.facility': 'Pflegeheim registrieren',
    'nav.tagline': 'Wo & Wann Sie Personal brauchen',
    'nav.available247': '24/7 verfügbar',
    'nav.verifiedProfessionals': 'Geprüfte Fachkräfte',
    'nav.caregivers': '5.000+ Pflegekräfte',

    // Hero Section
    'hero.badge': 'Deutschlands führende Pflegeplattform',
    'hero.title1': 'Personal finden',
    'hero.title2': 'wo & wann Sie',
    'hero.title3': 'es brauchen',
    'hero.subtitle': 'Verbinden Sie Pflegeheime mit qualifizierten Pflegekräften in Sekunden. Keine Interviews, keine Wartezeiten – einfach das Personal, das Sie benötigen.',
    'hero.findStaff': 'Personal finden',
    'hero.findWork': 'Arbeit finden',
    'hero.stat1': 'Rund um die Uhr',
    'hero.stat1Label': '24/7 verfügbar',
    'hero.stat2': '5.000+',
    'hero.stat2Label': 'Pflegekräfte',
    'hero.stat3': 'Sofort starten',
    'hero.stat3Label': 'Keine Interviews',
    'hero.stat4': '98%',
    'hero.stat4Label': 'Zufriedenheit',
    'hero.facilityName': 'Seniorenheim Sonnenschein',
    'hero.location': 'München, Bayern',
    'hero.needs': 'Benötigt',
    'hero.shift': 'Schicht',
    'hero.time': 'Zeit',
    'hero.nightShift': 'Nachtschicht',
    'hero.caregivers': '2 Pflegekräfte',
    'hero.inMinutes': 'In 15 Min',
    'hero.staffFound': 'Personal gefunden!',
    'hero.available': '✓ Sofort verfügbar',
    'hero.fixedPrices': '💳 Festpreise',
    'hero.verified': 'Geprüft',

    // No Interviews Section
    'noInterviews.title': 'Keine Interviews erforderlich',
    'noInterviews.subtitle': 'Revolutionäre Technologie für sofortige Stellenbesetzung',
    'noInterviews.description': 'Mit unserer intelligenten Plattform können Sie qualifizierte Pflegekräfte in Sekunden finden – ohne zeitaufwändige Interviews oder lange Wartezeiten.',
    'noInterviews.feature1': 'Sofortige Vermittlung',
    'noInterviews.feature1Desc': 'Personalbuchung in Echtzeit ohne Wartezeiten oder Bürokratie',
    'noInterviews.feature2': 'Sofortige Verfügbarkeit',
    'noInterviews.feature2Desc': 'Verifizierte Pflegekräfte stehen rund um die Uhr zur Verfügung',
    'noInterviews.feature3': 'Qualitätssicherung',
    'noInterviews.feature3Desc': 'Alle Kandidaten sind vorgeprüft und zertifiziert',
    'noInterviews.feature4': 'Flexible Schichtzeiten',
    'noInterviews.feature4Desc': 'Von Nachtschichten bis Wochenendarbeit – alles möglich',
    'noInterviews.stats': 'Ergebnisse sprechen für sich',
    'noInterviews.stat1': '98%',
    'noInterviews.stat1Label': 'Erfolgsrate',
    'noInterviews.stat2': '< 5 Min',
    'noInterviews.stat2Label': 'Durchschnittliche Besetzungszeit',
    'noInterviews.stat3': '5000+',
    'noInterviews.stat3Label': 'Verfügbare Pflegekräfte',
    'noInterviews.cta': 'Jetzt starten',

    // How It Works
    'howItWorks.title': 'Wie es funktioniert',
    'howItWorks.subtitle': 'In wenigen Schritten zum passenden Personal oder zur nächsten Arbeitsstelle. Einfach, schnell und ohne Komplikationen.',
    'howItWorks.nursingHomes': 'Für Pflegeheime',
    'howItWorks.nursingHomesTitle': 'Personal in Minuten finden',
    'howItWorks.nursingHomesSubtitle': 'Keine langwierigen Bewerbungsprozesse mehr. Qualifiziertes Personal genau dann, wenn Sie es brauchen.',
    'howItWorks.caregivers': 'Für Pflegekräfte',
    'howItWorks.caregiversTitle': 'Flexibel arbeiten & verdienen',
    'howItWorks.caregiversSubtitle': 'Bestimmen Sie selbst, wann und wo Sie arbeiten. Faire Bezahlung und keine Bewerbungsgespräche.',
    'howItWorks.step1Title': 'Personal anfordern',
    'howItWorks.step1Desc': 'Geben Sie Ihren Standort, die gewünschte Zeit und benötigte Qualifikationen ein.',
    'howItWorks.step4Title': 'Personal kommt an',
    'howItWorks.step4Desc': 'Die Pflegekraft erscheint pünktlich zur vereinbarten Zeit am Arbeitsplatz.',
    'howItWorks.caregiver1Title': 'Profil erstellen',
    'howItWorks.caregiver1Desc': 'Erstellen Sie Ihr Profil mit Qualifikationen und Verfügbarkeiten - ohne Lebenslauf.',
    'howItWorks.caregiver2Title': 'Verfügbarkeit festlegen',
    'howItWorks.caregiver2Desc': 'Bestimmen Sie selbst, wann und wo Sie arbeiten möchten.',
    'howItWorks.caregiver3Title': 'Anfragen erhalten',
    'howItWorks.caregiver3Desc': 'Erhalten Sie passende Jobangebote basierend auf Ihren Präferenzen.',
    'howItWorks.caregiver4Title': 'Arbeiten & Verdienen',
    'howItWorks.caregiver4Desc': 'Akzeptieren Sie Jobs und beginnen Sie sofort zu arbeiten - flexibel und fair bezahlt.',
    'howItWorks.readyToStart': 'Bereit zu starten?',
    'howItWorks.startAsFacility': 'Als Pflegeheim starten',
    'howItWorks.startAsCaregiver': 'Als Pflegekraft starten',

    // Benefits
    'benefits.title': 'Warum Woundwann?',
    'benefits.subtitle': 'Entdecken Sie die Vorteile der modernsten Pflegepersonal-Plattform Deutschlands. Für beide Seiten - Pflegeheime und Pflegekräfte.',
    'benefits.facilitiesTitle': 'Vorteile für Pflegeheime',
    'benefits.facilitiesSubtitle': 'Mehr Effizienz, weniger Stress',
    'benefits.facilitiesDesc': 'Revolutionieren Sie Ihre Personalplanung mit unserer intelligenten Plattform. Sparen Sie Zeit und Kosten bei der Suche nach qualifiziertem Personal.',
    'benefits.caregiversTitle': 'Vorteile für Pflegekräfte',
    'benefits.caregiversSubtitle': 'Flexibilität trifft auf Fairness',
    'benefits.caregiversDesc': 'Arbeiten Sie nach Ihren Bedingungen. Faire Bezahlung, flexible Zeiten und keine komplizierten Bewerbungsprozesse - so sollte Arbeit sein.',
    'benefits.trust': 'Vertrauen Sie auf unsere Erfolgsbilanz',
    'benefits.activeCaregivers': 'Aktive Pflegekräfte',
    'benefits.partnerFacilities': 'Partner-Einrichtungen',
    'benefits.satisfactionRate': 'Zufriedenheitsrate',
    'benefits.availability': 'Verfügbarkeit',

    // 404 Page
    '404.title': '404',
    '404.subtitle': 'Ups! Seite nicht gefunden',
    '404.returnHome': 'Zurück zur Startseite',

    // Alt text
    'alt.logo': 'Wo & Wann Personal service GmbH',

    // Benefits detailed items
    'benefits.nursingHome1Title': '24/7 Verfügbarkeit',
    'benefits.nursingHome1Desc': 'Personal rund um die Uhr verfügbar - auch für kurzfristige Anfragen und Notfälle.',
    'benefits.nursingHome1Highlight': 'Sofort verfügbar',
    'benefits.nursingHome2Title': 'Geprüfte Fachkräfte',
    'benefits.nursingHome2Desc': 'Alle Pflegekräfte sind qualifiziert, zertifiziert und haben Hintergrundprüfungen bestanden.',
    'benefits.nursingHome2Highlight': '100% verifiziert',
    'benefits.nursingHome3Title': 'Transparente Preise',
    'benefits.nursingHome3Desc': 'Feste, faire Preise ohne versteckte Kosten. Sie wissen immer genau, was Sie zahlen.',
    'benefits.nursingHome3Highlight': 'Keine Überraschungen',
    'benefits.nursingHome4Title': 'Analytics Dashboard',
    'benefits.nursingHome4Desc': 'Umfassende Einblicke in Ihre Personalplanung mit detaillierten Berichten und Statistiken.',
    'benefits.nursingHome4Highlight': 'Datenbasierte Entscheidungen',
    'benefits.nursingHome5Title': 'Lokale Verfügbarkeit',
    'benefits.nursingHome5Desc': 'Finden Sie Personal in Ihrer direkten Umgebung für kurze Anfahrtswege.',
    'benefits.nursingHome5Highlight': 'In Ihrer Nähe',
    'benefits.nursingHome6Title': 'Zeitersparnis',
    'benefits.nursingHome6Desc': 'Reduzieren Sie den Aufwand für Personalsuche um bis zu 90% mit unserem automatisierten System.',
    'benefits.nursingHome6Highlight': '90% weniger Aufwand',

    'benefits.caregiver1Title': 'Vollständige Flexibilität',
    'benefits.caregiver1Desc': 'Arbeiten Sie wann und wo Sie möchten. Bestimmen Sie selbst Ihre Arbeitszeiten.',
    'benefits.caregiver1Highlight': 'Ihre Entscheidung',
    'benefits.caregiver2Title': 'Keine Bewerbungsgespräche',
    'benefits.caregiver2Desc': 'Starten Sie sofort ohne langwierige Bewerbungsprozesse oder Interviews.',
    'benefits.caregiver2Highlight': 'Sofort loslegen',
    'benefits.caregiver3Title': 'Kein Lebenslauf nötig',
    'benefits.caregiver3Desc': 'Erstellen Sie einfach Ihr Profil mit Qualifikationen - ohne komplizierte Bewerbungsunterlagen.',
    'benefits.caregiver3Highlight': 'Einfach & schnell',
    'benefits.caregiver4Title': 'Faire Bezahlung',
    'benefits.caregiver4Desc': 'Transparente, marktgerechte Vergütung mit pünktlicher Auszahlung nach jedem Einsatz.',
    'benefits.caregiver4Highlight': 'Sofort bezahlt',
    'benefits.caregiver5Title': 'Große Auswahl',
    'benefits.caregiver5Desc': 'Zugang zu hunderten von Pflegeheimen und Gesundheitseinrichtungen in ganz Deutschland.',
    'benefits.caregiver5Highlight': 'Unbegrenzte Möglichkeiten',
    'benefits.caregiver6Title': 'Weiterbildung',
    'benefits.caregiver6Desc': 'Kostenlose Fortbildungen und Zertifizierungen zur beruflichen Weiterentwicklung.',
    'benefits.caregiver6Highlight': 'Kostenlos lernen',

    // Footer
    'footer.company': 'Unternehmen',
    'footer.about': 'Über uns',
    'footer.careers': 'Karriere',
    'footer.press': 'Presse',
    'footer.blog': 'Blog',
    'footer.services': 'Services',
    'footer.nursingHomes': 'Für Pflegeheime',
    'footer.caregivers': 'Für Pflegekräfte',
    'footer.pricing': 'Preise',
    'footer.howItWorks': 'Wie es funktioniert',
    'footer.benefits': 'Vorteile',
    'footer.testimonials': 'Erfahrungsberichte',
    'footer.appDownload': 'App Download',
    'footer.support': 'Support',
    'footer.help': 'Hilfe',
    'footer.contact': 'Kontakt',
    'footer.documentation': 'Dokumentation',
    'footer.status': 'Status',
    'footer.legal': 'Rechtliches',
    'footer.privacy': 'Datenschutz',
    'footer.impressum': 'Impressum',
    'footer.terms': 'AGB',
    'footer.cookies': 'Cookies',
    'footer.imprint': 'Impressum',
    'footer.connect': 'Verbinden',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDesc': 'Bleiben Sie auf dem Laufenden mit unseren neuesten Updates.',
    'footer.subscribe': 'Abonnieren',
    'footer.emailPlaceholder': 'Ihre E-Mail-Adresse',
    'footer.rights': '© 2025 Woundwann. Alle Rechte vorbehalten.',
    'footer.tagline': 'Wo & Wann Sie Personal brauchen',
    'footer.location': 'Unser Standort',
    'footer.viewOnMaps': 'Auf Google Maps anzeigen',

    // Impressum
    'impressum.title': 'Impressum',
    'impressum.legalNotice': 'Angaben gemäß § 5 TMG',
    'impressum.companyName': 'Wo und Wann Personal Service GmbH',
    'impressum.address': 'Haagstraße. 25',
    'impressum.postalCode': '61169 Friedberg',
    'impressum.email': 'E-Mail: info@woundwann.de',
    'impressum.privacyEmail': 'Datenschutz-E-Mail: privacy@woundwann.de',
    'impressum.website': 'Website: https://woundwann.de',
    'impressum.ceo': 'Geschäftsführer: Ahmad Alzein',
    'impressum.registrationNumber': 'Registernummer: HRB 10713',
    'impressum.registrationCourt': 'Registergericht: Friedberg',
    'impressum.taxNumber': 'Steuernummer: 016 801 64833',
    'impressum.vatNumber': 'Umsatzsteuergesetz: DE451391090',
    'impressum.contentLiability': 'Haftung für Inhalte',
    'impressum.contentLiabilityText': 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
    'impressum.contentLiabilityText2': 'Als Diensteanbieter sind wir gemäß § 6 Abs.1 MDStV und § 8 Abs.1 TDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Diensteanbieter sind jedoch nicht verpflichtet, die von ihnen übermittelten oder gespeicherten fremden Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
    'impressum.contentLiabilityText3': 'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei bekannt werden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    'impressum.linkLiability': 'Haftung für Links',
    'impressum.linkLiabilityText': 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
    'impressum.linkLiabilityText2': 'Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei bekannt werden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    'impressum.copyright': 'Urheberrecht',
    'impressum.copyrightText': 'Die Betreiber der Seiten sind bemüht, stets die Urheberrechte anderer zu beachten bzw. auf selbst erstellte sowie lizenzfreie Werke zurückzugreifen.',
    'impressum.copyrightText2': 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
    'impressum.copyrightText3': 'Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
    'impressum.dataProtection': 'Datenschutz',
    'impressum.dataProtectionText': 'Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies soweit möglich stets auf freiwilliger Basis. Die Nutzung der Angebote und Dienste ist, soweit möglich, stets ohne Angabe personenbezogener Daten möglich.',
    'impressum.dataProtectionText2': 'Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.',

    // Privacy Policy
    'privacy.title': 'Datenschutzerklärung',
    'privacy.generalInfo': 'Allgemeiner Hinweis und Pflichtinformationen',
    'privacy.responsibleParty': 'Benennung der verantwortlichen Stelle',
    'privacy.responsiblePartyDesc': 'Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:',
    'privacy.companyName': 'Wo und Wann Personal Service GmbH',
    'privacy.contactPerson': 'Ahmad Alzein',
    'privacy.address': 'Haagstr.25',
    'privacy.city': '61169 Friedberg, Deutschland',
    'privacy.dataProcessing': 'Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).',
    'privacy.consentWithdrawal': 'Widerruf Ihrer Einwilligung zur Datenverarbeitung',
    'privacy.consentWithdrawalDesc': 'Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der Datenverarbeitung möglich. Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.',
    'privacy.complaintRight': 'Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde',
    'privacy.complaintRightDesc': 'Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen Verstoßes ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der Sitz unseres Unternehmens befindet. Der Link stellt eine Liste der Datenschutzbeauftragten sowie deren Kontaktdaten bereit.',
    'privacy.dataPortability': 'Recht auf Datenübertragbarkeit',
    'privacy.dataPortabilityDesc': 'Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die Bereitstellung erfolgt in einem maschinenlesbaren Format. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.',
    'privacy.dataRights': 'Recht auf Auskunft, Berichtigung, Sperrung, Löschung',
    'privacy.dataRightsDesc': 'Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, Herkunft der Daten, deren Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Diesbezüglich und auch zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit über die im Impressum aufgeführten Kontaktmöglichkeiten an uns wenden.',
    'privacy.privacyEmail': 'Datenschutz-E-Mail: privacy@woundwann.de',
    'privacy.sslEncryption': 'SSL- bzw. TLS-Verschlüsselung',
    'privacy.sslEncryptionDesc': 'Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als Seitenbetreiber senden, nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten, die Sie über diese Website übermitteln, für Dritte nicht mitlesbar. Sie erkennen eine verschlüsselte Verbindung an der „https://" Adresszeile Ihres Browsers und am Schloss-Symbol in der Browserzeile.',
    'privacy.contactForm': 'Kontaktformular',
    'privacy.contactFormDesc1': 'Per Kontaktformular übermittelte Daten werden einschließlich Ihrer Kontaktdaten gespeichert, um Ihre Anfrage bearbeiten zu können oder um für Anschlussfragen bereitzustehen. Eine Weitergabe dieser Daten findet ohne Ihre Einwilligung nicht statt.',
    'privacy.contactFormDesc2': 'Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.',
    'privacy.contactFormDesc3': 'Über das Kontaktformular übermittelte Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder keine Notwendigkeit der Datenspeicherung mehr besteht. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.',
    'privacy.legalNotice': 'Impressum',
    'privacy.copyright': '© 2025 Alle Rechte vorbehalten von WoundWann',
    'privacy.backToHomepage': 'Zurück zur Startseite',

    // Testimonials
    'testimonials.title': 'Was unsere Kunden sagen',
    'testimonials.subtitle': 'Erfahren Sie, warum Pflegeheime und Pflegekräfte Woundwann vertrauen',
    'testimonials.facilitiesTitle': 'Pflegeheime',
    'testimonials.caregiversTitle': 'Pflegekräfte',

    // Facility Testimonials
    'testimonials.facility1Name': 'Dr. Maria Schmidt',
    'testimonials.facility1Role': 'Leitende Pflegedienstleitung',
    'testimonials.facility1Company': 'Seniorenheim Sonnenschein',
    'testimonials.facility1Text': 'Woundwann hat unsere Personalplanung revolutioniert. Innerhalb von Minuten haben wir qualifizierte Pflegekräfte gefunden. Die Plattform ist einfach zu bedienen und spart uns täglich Stunden.',
    'testimonials.facility1Rating': '5.0',

    'testimonials.facility2Name': 'Thomas Weber',
    'testimonials.facility2Role': 'Geschäftsführer',
    'testimonials.facility2Company': 'Pflegeheim am Park',
    'testimonials.facility2Text': 'Die 24/7 Verfügbarkeit ist ein Game-Changer. Auch bei kurzfristigen Ausfällen finden wir sofort Ersatz. Die Qualität der Pflegekräfte ist durchweg ausgezeichnet.',
    'testimonials.facility2Rating': '5.0',

    'testimonials.facility3Name': 'Frau Müller',
    'testimonials.facility3Role': 'Pflegedienstleitung',
    'testimonials.facility3Company': 'Altenzentrum Wetzlar',
    'testimonials.facility3Text': 'Endlich eine Lösung, die wirklich funktioniert. Keine langen Telefonate mehr, keine Wartezeiten. Die Pflegekräfte sind alle verifiziert und professionell. Wir sind sehr zufrieden.',
    'testimonials.facility3Rating': '5.0',

    // Caregiver Testimonials
    'testimonials.caregiver1Name': 'Anna Kowalski',
    'testimonials.caregiver1Role': 'Gesundheits- und Krankenpflegerin',
    'testimonials.caregiver1Location': 'München',
    'testimonials.caregiver1Text': 'Durch Woundwann kann ich meine Arbeitszeiten selbst bestimmen. Die Bezahlung ist fair und pünktlich. Ich arbeite nur in Einrichtungen, die zu mir passen.',
    'testimonials.caregiver1Rating': '5.0',

    'testimonials.caregiver2Name': 'Waseem',
    'testimonials.caregiver2Role': 'Pflegehelfer',
    'testimonials.caregiver2Location': 'Bad Nauheim',
    'testimonials.caregiver2Text': 'Keine Bewerbungsgespräche, keine komplizierten Prozesse. Ich erstelle mein Profil und bekomme passende Angebote. Die Flexibilität ist perfekt für mich.',
    'testimonials.caregiver2Rating': '5.0',

    'testimonials.caregiver3Name': 'Lisa Wagner',
    'testimonials.caregiver3Role': 'Examinierte Altenpflegerin',
    'testimonials.caregiver3Location': 'Hamburg',
    'testimonials.caregiver3Text': 'Die Weiterbildungsmöglichkeiten sind großartig. Ich kann mich kostenlos weiterbilden und neue Qualifikationen erwerben. Das macht mich wertvoller für die Einrichtungen.',
    'testimonials.caregiver3Rating': '5.0',

    // App Download
    'appDownload.title': 'Laden Sie die Woundwann App herunter',
    'appDownload.subtitle': 'Verwalten Sie Ihr Personal oder finden Sie Jobs direkt von Ihrem Handy aus',
    'appDownload.availableOn': 'Verfügbar für',
    'appDownload.downloadOn': 'Laden Sie herunter von',
    'appDownload.appStore': 'App Store',
    'appDownload.googlePlay': 'Google Play',
    'appDownload.features': 'App-Features',
    'appDownload.feature1': 'Sofortige Benachrichtigungen',
    'appDownload.feature1Desc': 'Erhalten Sie sofort Benachrichtigungen über neue Stellenangebote oder Personalanfragen',
    'appDownload.feature2': 'Einfache Personalplanung',
    'appDownload.feature2Desc': 'Verwalten Sie Ihr Team und planen Sie Schichten mit nur wenigen Taps',
    'appDownload.feature3': 'Direkter Chat',
    'appDownload.feature3Desc': 'Kommunizieren Sie direkt in Echtzeit mit Einrichtungen oder Pflegekräften',
    'appDownload.feature4': 'Sichere Dokumentation',
    'appDownload.feature4Desc': 'Dokumentieren Sie Pflegeleistungen und Arbeitszeiten sicher und DSGVO-konform',
    'appDownload.qrTitle': 'QR-Code scannen',
    'appDownload.qrSubtitle': 'Scannen Sie den QR-Code, um die App direkt zu installieren',

    // Contact
    'contact.title': 'Kontaktieren Sie uns',
    'contact.subtitle': 'Haben Sie Fragen? Wir helfen Ihnen gerne weiter',
    'contact.form.title': 'Senden Sie uns eine Nachricht',
    'contact.form.name': 'Ihr Name',
    'contact.form.email': 'Ihre E-Mail',
    'contact.form.company': 'Unternehmen (optional)',
    'contact.form.subject': 'Betreff',
    'contact.form.message': 'Ihre Nachricht',
    'contact.form.send': 'Nachricht senden',
    'contact.form.subjectPlaceholder': 'Betreff wählen',
    'contact.form.subjectGeneral': 'Allgemeine Anfrage',
    'contact.form.subjectSupport': 'Technischer Support',
    'contact.form.subjectPartnership': 'Partnerschaft',
    'contact.form.subjectCareer': 'Karriere',
    'contact.form.subjectOther': 'Sonstiges',
    'contact.form.namePlaceholder': 'Max Mustermann',
    'contact.form.companyPlaceholder': 'Ihr Unternehmen',
    'contact.form.messagePlaceholder': 'Ihre Nachricht an uns...',

    // Registration Section
    'registration.title': 'Jetzt bei Wo&Wann anmelden und Geld verdienen. Jetzt anmelden!',
    'registration.subtitle': 'Melden Sie sich jetzt an und sichern Sie sich einen 20€ Bonus*!',
    'registration.badge': 'Exklusives Angebot',
    'registration.bonus': '20€ Bonus*',
    'registration.bonusFootnote': '* Wird nach Abschluss der ersten Schicht ausgezahlt.',
    'registration.description': 'Starten Sie Ihre Karriere als Pflegekraft und verdienen Sie sofort Geld. Mit unserem Willkommensbonus erhalten Sie 20€ zusätzlich zu Ihrer ersten Bezahlung.',
    'registration.registerNow': 'Jetzt anmelden',
    'registration.learnMore': 'Mehr erfahren',
    'registration.feature1': 'Sofortige Registrierung',
    'registration.feature2': '20€ Willkommensbonus',
    'registration.feature3': 'Flexible Arbeitszeiten',
    'registration.feature4': 'Sichere Bezahlung',
    'contact.info.title': 'Kontaktinformationen',
    'contact.info.desc': 'Kontaktieren Sie uns direkt für persönliche Beratung',
    'contact.info.phone': 'Telefon',
    'contact.info.email': 'E-Mail',
    'contact.info.address': 'Adresse',
    'contact.info.hours': 'Geschäftszeiten',
    'contact.info.hoursDesc': 'Mo - Fr: 8:00 - 18:00 Uhr',
    'contact.success': 'Nachricht erfolgreich gesendet!',
    'contact.error': 'Fehler beim Senden der Nachricht',
    'contact.guarantee.title': 'Schnelle Antwort garantiert',
    'contact.guarantee.desc': 'Wir antworten normalerweise innerhalb von 24 Stunden auf alle Anfragen. Für dringende Angelegenheiten rufen Sie uns direkt an.',
    'contact.social.title': 'Folgen Sie uns',
    'contact.social.desc': 'Bleiben Sie mit uns in Verbindung und erhalten Sie die neuesten Updates',

    // About Us Section
    'about.title': 'Über uns',
    'about.subtitle': 'Die Zukunft der Pflegevermittlung ist digital',
    'about.description1': 'Wir sind die erste komplett digital arbeitende Zeitarbeitsplattform, die Pflegekräfte und Pflegeeinrichtungen direkt miteinander verbindet.',
    'about.description2': 'Unser Service ermöglicht es Pflegeheimen, flexibel Pflegefachkräfte oder Pflegehelfer anzufordern – schnell, unkompliziert und transparent.',
    'about.feature1.title': 'Digital First',
    'about.feature1.description': 'Komplett digitale Plattform ohne Papierkram',
    'about.feature2.title': 'Direkte Verbindung',
    'about.feature2.description': 'Pflegekräfte und Einrichtungen direkt vernetzt',
    'about.feature3.title': 'Schnell & Flexibel',
    'about.feature3.description': 'Sofortige Personalanfragen und -vermittlung',
    'about.feature4.title': 'Transparent',
    'about.feature4.description': 'Klare Prozesse und faire Konditionen',

    // FAQ Section
    'faq.badge': 'Häufig gestellte Fragen',
    'faq.title': 'FAQ – Unterlagen & Datenschutz',
    'faq.subtitle': 'Alles was Sie über die erforderlichen Unterlagen und den Datenschutz bei Woundwann wissen müssen',
    'faq.categories.all': 'Alle',
    'faq.categories.documents': 'Unterlagen',
    'faq.categories.legal': 'Rechtsgrundlagen',
    'faq.categories.privacy': 'Datenschutz',
    'faq.categories.rights': 'Ihre Rechte',
    'faq.categories.contact': 'Kontakt',
    'faq.categories.terms': 'Allgemeinen Geschäftsbedingungen',
    'faq.searchPlaceholder': 'Fragen durchsuchen...',
    'faq.documentsRequired.question': 'Was brauchen wir von dir, um dich einzusetzen?',
    'faq.documentsRequired.answer': `
      <ul class="space-y-3">
        <li><strong>Amtlicher Ausweis</strong> (Personalausweis/Reisepass) – Identitätsnachweis</li>
        <li><strong>Berufsurkunde / Erlaubnis nach Pflegeberufegesetz (PflBG)</strong> (für Pflegefachfrau/-mann) oder entsprechender Qualifikationsnachweis (Helfer/in). Grundlage: PflBG §1–2 (Erlaubnis zum Führen der Berufsbezeichnung)</li>
        <li><strong>Anerkennung ausländischer Abschlüsse</strong> (falls die Ausbildung im Ausland erworben wurde) – staatliche Anerkennung ist Voraussetzung zum Führen der Berufsbezeichnung</li>
        <li><strong>Aufenthalts- und Arbeitserlaubnis</strong> (wenn erforderlich)</li>
        <li><strong>Bankverbindung & Steuer-ID</strong> (für Abrechnung)</li>
        <li><strong>Erweitertes Führungszeugnis (eFZ)</strong> bei Einsatz mit besonders schutzbedürftigen Personen (Pflege/Betreuung). Rechtsgrundlage: §30a BZRG</li>
        <li><strong>Nachweis Masernschutz</strong>, sofern gesetzlich verlangt (Beschäftigte in bestimmten Gesundheits-/Gemeinschaftseinrichtungen, insb. Jahrgänge nach 1970)</li>
      </ul>
      <p class="mt-4 text-sm text-gray-600"><em>Hinweis: Welche Nachweise im Einzelfall erforderlich sind, richtet sich nach Einsatzort/Einrichtung und Rechtslage.</em></p>
    `,
    'faq.whyDocuments.question': 'Warum brauchen wir diese Unterlagen? (Rechtsgrundlagen)',
    'faq.whyDocuments.answer': `
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Vertrag & Einsatz</h4>
          <p>Verarbeitung deiner Daten ist erforderlich zur Anbahnung/Durchführung des Beschäftigungsverhältnisses (Art. 6 Abs. 1 lit. b DSGVO i. V. m. § 26 BDSG).</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Gesetzliche Pflichten im Gesundheitsbereich</h4>
          <p>Dazu gehört u. a. PflBG sowie ggf. eFZ/Masernschutz. Gesundheitsdaten (z. B. Impf-/Immunitätsnachweise) sind besondere Kategorien; Verarbeitung erfolgt nur, soweit arbeits-/sozialrechtlich erforderlich (Art. 9 Abs. 2 b DSGVO; § 22 BDSG).</p>
        </div>
      </div>
    `,
    'faq.dataProtection.question': 'Wie schützen und speichern wir deine Daten?',
    'faq.dataProtection.answer': `
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Datensparsamkeit & Zweckbindung</h4>
          <p>Wir erheben nur, was für Einsatz/Abrechnung/Compliance nötig ist.</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Technische & organisatorische Maßnahmen</h4>
          <p>Verschlüsselung, rollenbasierte Zugriffe, Protokollierung; regelmäßige Überprüfung gemäß Art. 32 DSGVO.</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Speicherort</h4>
          <p>Bevorzugt innerhalb der EU/EWR. Bei notwendigen Drittland-Übermittlungen setzen wir geeignete Garantien (z. B. Standardvertragsklauseln, Art. 46 DSGVO).</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Auftragsverarbeiter</h4>
          <p>Nur vertraglich gebundene Dienstleister nach DSGVO. Datenschutzbeauftragter: Sobald regelmäßig ≥ 20 Personen automatisiert Daten verarbeiten, wird ein DSB benannt (§ 38 BDSG).</p>
        </div>
      </div>
    `,
    'faq.storageDuration.question': 'Wie lange speichern wir? (Aufbewahrungsfristen)',
    'faq.storageDuration.answer': `
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Bewerber/innen (ohne Einstellung)</h4>
          <p>i. d. R. Löschung nach 6 Monaten ab Abschluss des Verfahrens (Dokumentation zur Abwehr möglicher AGG-Ansprüche); längere Speicherung nur mit ausdrücklicher Einwilligung (Talentpool).</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Beschäftigte (in der Personalakte)</h4>
          <ul class="space-y-2 ml-4">
            <li><strong>Steuer-/Handelsunterlagen:</strong> 10 Jahre nach § 147 AO bzw. nach HGB § 257</li>
            <li><strong>Arbeitszeitnachweise:</strong> mind. 2 Jahre nach § 16 Abs. 2 ArbZG</li>
            <li><strong>Unfallversicherung:</strong> 5 Jahre gem. § 165 SGB VII</li>
            <li><strong>Führungszeugnis:</strong> meist genügt Sichtvermerk/Vermerk über Prüfung; Kopien werden nur gespeichert, wenn zwingend erforderlich</li>
          </ul>
        </div>
      </div>
    `,
    'faq.yourRights.question': 'Deine Rechte (DSGVO)',
    'faq.yourRights.answer': `
      <p>Du kannst jederzeit Auskunft (Art. 15), Berichtigung, Löschung (Art. 17) oder Einschränkung verlangen; außerdem Datenübertragbarkeit und Widerspruch, sowie Beschwerde bei der Aufsichtsbehörde.</p>
    `,
    'faq.contactPerson.question': 'Ansprechpartner',
    'faq.contactPerson.answer': `
      <div class="space-y-3">
        <div>
          <h4 class="font-semibold text-gray-900">Verantwortlicher:</h4>
          <p>Wo & Wann Personal Service GmbH</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900">Datenschutz-Kontakt:</h4>
          <p>privacy@woundwann.de</p>
        </div>
        <p class="text-sm text-gray-600">Wir beantworten Anfragen zum Datenschutz in der Regel binnen 30 Tagen (Art. 12 DSGVO).</p>
      </div>
    `,
    'faq.contactCard.title': 'Kontakt & Datenschutz',
    'faq.contactCard.company': 'Unternehmen',
    'faq.contactCard.companyName': 'Wo & Wann Personal Service GmbH',
    'faq.contactCard.address': 'Adresse',
    'faq.contactCard.fullAddress': 'Haagstr.25 - Friedberg 61169 - Deutschland',
    'faq.contactCard.email': 'E-Mail',
    'faq.contactCard.emailAddress': 'privacy@woundwann.de',
    'faq.contactCard.responseTime': 'Wir beantworten Anfragen zum Datenschutz in der Regel binnen 30 Tagen.',
    'faq.termsPayment.question': '500 € für jede neue Altenheim',
    'faq.termsPayment.answer': 'Eine Nettozahlung in Höhe von 500 EUR pro Mitarbeiter wird gewährt, sofern die Pflegeeinrichtung zehn vollständige Schichten anfordert.',
    'faq.termsEmployeePayment.question': '20€ für erste Schicht',
    'faq.termsEmployeePayment.answer': 'Der Mitarbeiter hat Anspruch auf eine Nettovergütung in Höhe von 20 EUR nach Abschluss seiner ersten Schicht über die App, sofern er alle erforderlichen persönlichen und offiziellen Daten gemäß den Bestimmungen des deutschen Arbeitsrechts vollständig angegeben hat.',
  },
  en: {
    // Navigation
    'nav.about': 'About Us',
    'nav.howItWorks': 'How it Works',
    'nav.benefits': 'Benefits',
    'nav.testimonials': 'Testimonials',
    'nav.faq': 'FAQ',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.login': 'Sign In',
    'nav.getStarted': 'Get Started',
    'nav.loginDropdown.caregiver': 'Caregiver Login',
    'nav.loginDropdown.facility': 'Facility Login',
    'nav.getStartedDropdown.caregiver': 'Register as Caregiver',
    'nav.getStartedDropdown.facility': 'Register Facility',
    'nav.tagline': 'Where & When You Need Staff',
    'nav.available247': '24/7 Available',
    'nav.verifiedProfessionals': 'Verified Professionals',
    'nav.caregivers': '5,000+ Caregivers',

    // Hero Section
    'hero.badge': "Germany's Leading Healthcare Platform",
    'hero.title1': 'Find staff',
    'hero.title2': 'where & when',
    'hero.title3': 'you need them',
    'hero.subtitle': 'Connect nursing homes with qualified caregivers in seconds. No interviews, no waiting times – simply the staff you need.',
    'hero.findStaff': 'Find Staff',
    'hero.findWork': 'Find Work',
    'hero.stat1': 'Around the Clock',
    'hero.stat1Label': '24/7 Available',
    'hero.stat2': '5,000+',
    'hero.stat2Label': 'Caregivers',
    'hero.stat3': 'Instant Start',
    'hero.stat3Label': 'No Interviews',
    'hero.stat4': '98%',
    'hero.stat4Label': 'Satisfaction',
    'hero.facilityName': 'Sunshine Senior Home',
    'hero.location': 'Munich, Bavaria',
    'hero.needs': 'Needs',
    'hero.shift': 'Shift',
    'hero.time': 'Time',
    'hero.nightShift': 'Night Shift',
    'hero.caregivers': '2 Caregivers',
    'hero.inMinutes': 'In 15 Min',
    'hero.staffFound': 'Staff Found!',
    'hero.available': '✓ Available Now',
    'hero.fixedPrices': '💳 Fixed Prices',
    'hero.verified': 'Verified',

    // No Interviews Section
    'noInterviews.title': 'No Interviews Required',
    'noInterviews.subtitle': 'Revolutionary Technology for Instant Staff Placement',
    'noInterviews.description': 'With our intelligent platform, you can find qualified caregivers in seconds – no time-consuming interviews or long waiting periods.',
    'noInterviews.feature1': 'Instant Placement',
    'noInterviews.feature1Desc': 'Real-time staff booking without waiting periods or bureaucracy',
    'noInterviews.feature2': 'Instant Availability',
    'noInterviews.feature2Desc': 'Verified caregivers available 24/7',
    'noInterviews.feature3': 'Quality Assurance',
    'noInterviews.feature3Desc': 'All candidates are pre-screened and certified',
    'noInterviews.feature4': 'Flexible Shift Times',
    'noInterviews.feature4Desc': 'From night shifts to weekend work – everything is possible',
    'noInterviews.stats': 'Results speak for themselves',
    'noInterviews.stat1': '98%',
    'noInterviews.stat1Label': 'Success Rate',
    'noInterviews.stat2': '< 5 Min',
    'noInterviews.stat2Label': 'Average Placement Time',
    'noInterviews.stat3': '5000+',
    'noInterviews.stat3Label': 'Available Caregivers',
    'noInterviews.cta': 'Get Started',

    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'A few simple steps to the right staff or your next job. Simple, fast and without complications.',
    'howItWorks.nursingHomes': 'For Nursing Homes',
    'howItWorks.nursingHomesTitle': 'Find Staff in Minutes',
    'howItWorks.nursingHomesSubtitle': 'No more lengthy application processes. Qualified staff exactly when you need them.',
    'howItWorks.caregivers': 'For Caregivers',
    'howItWorks.caregiversTitle': 'Work Flexibly & Earn',
    'howItWorks.caregiversSubtitle': 'Choose when and where you work. Fair pay and no job interviews.',
    'howItWorks.step1Title': 'Request Staff',
    'howItWorks.step1Desc': 'Enter your location, desired time and required qualifications.',
    'howItWorks.step4Title': 'Staff Arrives',
    'howItWorks.step4Desc': 'The caregiver arrives punctually at the agreed time at the workplace.',
    'howItWorks.caregiver1Title': 'Create Profile',
    'howItWorks.caregiver1Desc': 'Create your profile with qualifications and availability - no resume needed.',
    'howItWorks.caregiver2Title': 'Set Availability',
    'howItWorks.caregiver2Desc': 'Decide for yourself when and where you want to work.',
    'howItWorks.caregiver3Title': 'Receive Requests',
    'howItWorks.caregiver3Desc': 'Get matching job offers based on your preferences.',
    'howItWorks.caregiver4Title': 'Work & Earn',
    'howItWorks.caregiver4Desc': 'Accept jobs and start working immediately - flexible and fairly paid.',
    'howItWorks.readyToStart': 'Ready to Start?',
    'howItWorks.startAsFacility': 'Start as Facility',
    'howItWorks.startAsCaregiver': 'Start as Caregiver',

    // Benefits
    'benefits.title': 'Why Woundwann?',
    'benefits.subtitle': 'Discover the advantages of Germany\'s most modern healthcare staffing platform. For both sides - nursing homes and caregivers.',
    'benefits.facilitiesTitle': 'Benefits for Nursing Homes',
    'benefits.facilitiesSubtitle': 'More Efficiency, Less Stress',
    'benefits.facilitiesDesc': 'Revolutionize your staffing with our intelligent platform. Save time and costs when searching for qualified staff.',
    'benefits.caregiversTitle': 'Benefits for Caregivers',
    'benefits.caregiversSubtitle': 'Flexibility Meets Fairness',
    'benefits.caregiversDesc': 'Work on your terms. Fair pay, flexible hours and no complicated application processes - this is how work should be.',
    'benefits.trust': 'Trust Our Track Record',
    'benefits.activeCaregivers': 'Active Caregivers',
    'benefits.partnerFacilities': 'Partner Facilities',
    'benefits.satisfactionRate': 'Satisfaction Rate',
    'benefits.availability': 'Availability',

    // 404 Page
    '404.title': '404',
    '404.subtitle': 'Oops! Page not found',
    '404.returnHome': 'Return to Home',

    // Alt text
    'alt.logo': 'Where & When Staff service GmbH',

    // Benefits detailed items
    'benefits.nursingHome1Title': '24/7 Availability',
    'benefits.nursingHome1Desc': 'Staff available around the clock - even for short-term requests and emergencies.',
    'benefits.nursingHome1Highlight': 'Available Now',
    'benefits.nursingHome2Title': 'Verified Professionals',
    'benefits.nursingHome2Desc': 'All caregivers are qualified, certified and have passed background checks.',
    'benefits.nursingHome2Highlight': '100% Verified',
    'benefits.nursingHome3Title': 'Transparent Pricing',
    'benefits.nursingHome3Desc': 'Fixed, fair prices without hidden costs. You always know exactly what you pay.',
    'benefits.nursingHome3Highlight': 'No Surprises',
    'benefits.nursingHome4Title': 'Analytics Dashboard',
    'benefits.nursingHome4Desc': 'Comprehensive insights into your staffing with detailed reports and statistics.',
    'benefits.nursingHome4Highlight': 'Data-Driven Decisions',
    'benefits.nursingHome5Title': 'Local Availability',
    'benefits.nursingHome5Desc': 'Find staff in your immediate area for short travel distances.',
    'benefits.nursingHome5Highlight': 'In Your Area',
    'benefits.nursingHome6Title': 'Time Savings',
    'benefits.nursingHome6Desc': 'Reduce staffing search effort by up to 90% with our automated system.',
    'benefits.nursingHome6Highlight': '90% Less Effort',

    'benefits.caregiver1Title': 'Complete Flexibility',
    'benefits.caregiver1Desc': 'Work when and where you want. Determine your own working hours.',
    'benefits.caregiver1Highlight': 'Your Decision',
    'benefits.caregiver2Title': 'No Job Interviews',
    'benefits.caregiver2Desc': 'Start immediately without lengthy application processes or interviews.',
    'benefits.caregiver2Highlight': 'Start Right Away',
    'benefits.caregiver3Title': 'No Resume Needed',
    'benefits.caregiver3Desc': 'Simply create your profile with qualifications - without complicated application documents.',
    'benefits.caregiver3Highlight': 'Simple & Fast',
    'benefits.caregiver4Title': 'Fair Pay',
    'benefits.caregiver4Desc': 'Transparent, market-based compensation with timely payment after each assignment.',
    'benefits.caregiver4Highlight': 'Paid Immediately',
    'benefits.caregiver5Title': 'Great Selection',
    'benefits.caregiver5Desc': 'Access to hundreds of nursing homes and healthcare facilities throughout Germany.',
    'benefits.caregiver5Highlight': 'Unlimited Opportunities',
    'benefits.caregiver6Title': 'Further Education',
    'benefits.caregiver6Desc': 'Free training and certifications for professional development.',
    'benefits.caregiver6Highlight': 'Learn for Free',

    // Footer
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.blog': 'Blog',
    'footer.services': 'Services',
    'footer.nursingHomes': 'For Nursing Homes',
    'footer.caregivers': 'For Caregivers',
    'footer.pricing': 'Pricing',
    'footer.howItWorks': 'How It Works',
    'footer.benefits': 'Benefits',
    'footer.testimonials': 'Testimonials',
    'footer.appDownload': 'App Download',
    'footer.support': 'Support',
    'footer.help': 'Help',
    'footer.contact': 'Contact',
    'footer.documentation': 'Documentation',
    'footer.status': 'Status',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.impressum': 'Legal Notice',
    'footer.terms': 'Terms',
    'footer.cookies': 'Cookies',
    'footer.imprint': 'Imprint',
    'footer.connect': 'Connect',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDesc': 'Stay updated with our latest news and updates.',
    'footer.subscribe': 'Subscribe',
    'footer.emailPlaceholder': 'Your email address',
    'footer.rights': '© 2025 Woundwann. All rights reserved.',
    'footer.tagline': 'Where & When You Need Staff',
    'footer.location': 'Our Location',
    'footer.viewOnMaps': 'View on Google Maps',

    // Impressum
    'impressum.title': 'Legal Notice',
    'impressum.legalNotice': 'Information according to § 5 TMG',
    'impressum.companyName': 'Wo und Wann Personal Service GmbH',
    'impressum.address': 'Haagstraße. 25',
    'impressum.postalCode': '61169 Friedberg',
    'impressum.email': 'Email: info@woundwann.de',
    'impressum.privacyEmail': 'Privacy Email: privacy@woundwann.de',
    'impressum.website': 'Website: https://woundwann.de',
    'impressum.ceo': 'Managing Director: Ahmad Alzein',
    'impressum.registrationNumber': 'Registration Number: HRB 10713',
    'impressum.registrationCourt': 'Registration Court: Friedberg',
    'impressum.taxNumber': 'Tax Number: 016 801 64833',
    'impressum.vatNumber': 'VAT Number: DE451391090',
    'impressum.contentLiability': 'Liability for Content',
    'impressum.contentLiabilityText': 'The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.',
    'impressum.contentLiabilityText2': 'As service providers, we are liable for our own content on these pages according to general laws. However, service providers are not obligated to permanently monitor submitted or stored information or to search for evidence that indicates illegal activities.',
    'impressum.contentLiabilityText3': 'Legal obligations to remove or block the use of information remain generally unaffected. However, liability in this regard is only possible from the point in time at which the infringement becomes known. When such infringements become known, we will remove the content immediately.',
    'impressum.linkLiability': 'Liability for Links',
    'impressum.linkLiabilityText': 'Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. For the contents of the linked sites, the respective provider or operator of the pages is always responsible.',
    'impressum.linkLiabilityText2': 'The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation of law. When such violations become known, we will remove such links immediately.',
    'impressum.copyright': 'Copyright',
    'impressum.copyrightText': 'The operators of the pages are always endeavouring to respect the copyrights of others and to use self-created and license-free works.',
    'impressum.copyrightText2': 'The content and works created by the site operators on these pages are subject to German copyright law. Contributions of third parties are marked as such. The reproduction, editing, distribution and any kind of exploitation outside the scope of the copyright require the written consent of the respective author or creator.',
    'impressum.copyrightText3': 'Downloads and copies of this page are only permitted for private, non-commercial use.',
    'impressum.dataProtection': 'Data Protection',
    'impressum.dataProtectionText': 'Insofar as personal data (such as name, address or email addresses) is collected on our pages, this is always done on a voluntary basis, insofar as this is possible. The use of offers and services is, if possible, always possible without providing personal data.',
    'impressum.dataProtectionText2': 'The use of contact data published in the context of the imprint obligation by third parties for the purpose of sending unsolicited advertising and information material is hereby expressly contradicted. The operators of the pages expressly reserve the right to take legal action in the event of the unsolicited sending of advertising information, such as spam e-mails.',

    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.generalInfo': 'General Information and Mandatory Information',
    'privacy.responsibleParty': 'Designation of the Responsible Party',
    'privacy.responsiblePartyDesc': 'The responsible party for data processing on this website is:',
    'privacy.companyName': 'Where and When Personal Service GmbH',
    'privacy.contactPerson': 'Ahmad Alzein',
    'privacy.address': 'Haagstr.25',
    'privacy.city': '61169 Friedberg, Germany',
    'privacy.dataProcessing': 'The responsible party decides alone or together with others about the purposes and means of processing personal data (e.g. names, contact data, etc.).',
    'privacy.consentWithdrawal': 'Revocation of Your Consent to Data Processing',
    'privacy.consentWithdrawalDesc': 'Only with your express consent are some data processing operations possible. A revocation of your already given consent is possible at any time. An informal message by e-mail is sufficient for the revocation. The legality of the data processing carried out until the revocation remains unaffected by the revocation.',
    'privacy.complaintRight': 'Right to Complain to the Supervisory Authority',
    'privacy.complaintRightDesc': 'As a data subject, you have the right to complain to the competent supervisory authority in the event of a data protection violation. The competent supervisory authority regarding data protection issues is the state data protection officer of the federal state in which our company is located.',
    'privacy.dataPortability': 'Right to Data Portability',
    'privacy.dataPortabilityDesc': 'You have the right to have data that we process automatically on the basis of your consent or in fulfillment of a contract handed over to you or to third parties. The provision is made in a machine-readable format. If you request the direct transfer of the data to another responsible party, this will only be done insofar as it is technically feasible.',
    'privacy.dataRights': 'Right to Information, Correction, Blocking, Deletion',
    'privacy.dataRightsDesc': 'You have the right at any time within the framework of the applicable legal provisions to free information about your stored personal data, origin of the data, their recipients and the purpose of data processing and, if applicable, a right to correction, blocking or deletion of this data. In this regard and also for further questions on the subject of personal data, you can contact us at any time via the contact options listed in the imprint.',
    'privacy.privacyEmail': 'Privacy Email: privacy@woundwann.de',
    'privacy.sslEncryption': 'SSL or TLS Encryption',
    'privacy.sslEncryptionDesc': 'For security reasons and to protect the transmission of confidential content that you send to us as the site operator, our website uses SSL or TLS encryption. This means that data that you transmit via this website cannot be read by third parties. You can recognize an encrypted connection by the "https://" address line of your browser and the lock symbol in the browser line.',
    'privacy.contactForm': 'Contact Form',
    'privacy.contactFormDesc1': 'Data transmitted via the contact form, including your contact data, will be stored in order to process your inquiry or to be available for follow-up questions. This data will not be passed on without your consent.',
    'privacy.contactFormDesc2': 'The processing of the data entered in the contact form takes place exclusively on the basis of your consent (Art. 6 para. 1 lit. a GDPR). A revocation of your already given consent is possible at any time. An informal message by e-mail is sufficient for the revocation. The legality of the data processing operations carried out until the revocation remains unaffected by the revocation.',
    'privacy.contactFormDesc3': 'Data transmitted via the contact form will remain with us until you request deletion, revoke your consent to storage or there is no longer any need for data storage. Mandatory legal provisions - in particular retention periods - remain unaffected.',
    'privacy.legalNotice': 'Legal Notice',
    'privacy.copyright': '© 2025 All Rights Reserved by WoundWann',
    'privacy.backToHomepage': 'Back to Homepage',

    // Testimonials
    'testimonials.title': 'What Our Customers Say',
    'testimonials.subtitle': 'Discover why nursing homes and caregivers trust Woundwann',
    'testimonials.facilitiesTitle': 'Nursing Homes',
    'testimonials.caregiversTitle': 'Caregivers',

    // Facility Testimonials
    'testimonials.facility1Name': 'Dr. Maria Schmidt',
    'testimonials.facility1Role': 'Head of Nursing Services',
    'testimonials.facility1Company': 'Sunshine Senior Home',
    'testimonials.facility1Text': 'Woundwann has revolutionized our staffing. Within minutes we found qualified caregivers. The platform is easy to use and saves us hours daily.',
    'testimonials.facility1Rating': '5.0',

    'testimonials.facility2Name': 'Thomas Weber',
    'testimonials.facility2Role': 'Managing Director',
    'testimonials.facility2Company': 'Nursing Home by the Park',
    'testimonials.facility2Text': 'The 24/7 availability is a game-changer. Even for short-term absences we find immediate replacement. The quality of caregivers is consistently excellent.',
    'testimonials.facility2Rating': '5.0',

    'testimonials.facility3Name': 'Frau Müller',
    'testimonials.facility3Role': 'Nursing Service Manager',
    'testimonials.facility3Company': 'Altenzentrum Wetzlar',
    'testimonials.facility3Text': 'Finally a solution that really works. No more long phone calls, no waiting times. The caregivers are all verified and professional. We are very satisfied.',
    'testimonials.facility3Rating': '5.0',

    // Caregiver Testimonials
    'testimonials.caregiver1Name': 'Anna Kowalski',
    'testimonials.caregiver1Role': 'Health and Nursing Professional',
    'testimonials.caregiver1Location': 'Munich',
    'testimonials.caregiver1Text': 'Through Woundwann I can determine my own working hours. The pay is fair and on time. I only work in facilities that suit me.',
    'testimonials.caregiver1Rating': '5.0',

    'testimonials.caregiver2Name': 'Waseem',
    'testimonials.caregiver2Role': 'nursing assistant',
    'testimonials.caregiver2Location': 'Bad Nauheim',
    'testimonials.caregiver2Text': 'No job interviews, no complicated processes. I create my profile and get matching offers. The flexibility is perfect for me.',
    'testimonials.caregiver2Rating': '5.0',

    'testimonials.caregiver3Name': 'Lisa Wagner',
    'testimonials.caregiver3Role': 'Certified Elderly Care Professional',
    'testimonials.caregiver3Location': 'Hamburg',
    'testimonials.caregiver3Text': 'The training opportunities are fantastic. I can further educate myself for free and acquire new qualifications. This makes me more valuable to facilities.',
    'testimonials.caregiver3Rating': '5.0',

    // App Download
    'appDownload.title': 'Download the Woundwann App',
    'appDownload.subtitle': 'Manage your staff or find jobs directly from your mobile device',
    'appDownload.availableOn': 'Available for',
    'appDownload.downloadOn': 'Download on',
    'appDownload.appStore': 'App Store',
    'appDownload.googlePlay': 'Google Play',
    'appDownload.features': 'App Features',
    'appDownload.feature1': 'Instant Notifications',
    'appDownload.feature1Desc': 'Get notified instantly about new job opportunities or staff requests',
    'appDownload.feature2': 'Easy Staff Management',
    'appDownload.feature2Desc': 'Manage your team and schedule shifts with just a few taps',
    'appDownload.feature3': 'Direct Chat',
    'appDownload.feature3Desc': 'Communicate directly with facilities or caregivers in real-time',
    'appDownload.feature4': 'Secure Documentation',
    'appDownload.feature4Desc': 'Document care services and working hours securely and GDPR-compliant',
    'appDownload.qrTitle': 'Scan QR Code',
    'appDownload.qrSubtitle': 'Scan the QR code to install the app directly',

    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions? We\'re here to help',
    'contact.form.title': 'Send us a message',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.company': 'Company (optional)',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    'contact.form.subjectPlaceholder': 'Select Subject',
    'contact.form.subjectGeneral': 'General Inquiry',
    'contact.form.subjectSupport': 'Technical Support',
    'contact.form.subjectPartnership': 'Partnership',
    'contact.form.subjectCareer': 'Career',
    'contact.form.subjectOther': 'Other',
    'contact.form.namePlaceholder': 'Enter your name',
    'contact.form.companyPlaceholder': 'Your company name',
    'contact.form.messagePlaceholder': 'Write your message here...',

    // Registration Section
    'registration.title': 'Register now with Wo&Wann to earn money. Register now!',
    'registration.subtitle': 'Register now and secure a 20€ bonus*!',
    'registration.badge': 'Exclusive Offer',
    'registration.bonus': '20€ Bonus*',
    'registration.bonusFootnote': '* Paid after completing the first shift.',
    'registration.description': 'Start your career as a caregiver and earn money immediately. With our welcome bonus, you get 20€ extra on your first payment.',
    'registration.registerNow': 'Register Now',
    'registration.learnMore': 'Learn More',
    'registration.feature1': 'Instant Registration',
    'registration.feature2': '20€ Welcome Bonus',
    'registration.feature3': 'Flexible Working Hours',
    'registration.feature4': 'Secure Payment',
    'contact.info.title': 'Contact Information',
    'contact.info.desc': 'Contact us directly for personal consultation',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.address': 'Address',
    'contact.info.hours': 'Business Hours',
    'contact.info.hoursDesc': 'Mon - Fri: 8:00 AM - 6:00 PM',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending message',
    'contact.guarantee.title': 'Fast Response Guaranteed',
    'contact.guarantee.desc': 'We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly.',
    'contact.social.title': 'Follow Us',
    'contact.social.desc': 'Stay connected with us and get the latest updates',

    // About Us Section
    'about.title': 'About Us',
    'about.subtitle': 'The future of care staffing is digital',
    'about.description1': 'We are the first completely digital temporary staffing platform that directly connects caregivers and care facilities.',
    'about.description2': 'Our service enables care facilities to flexibly request nursing professionals or nursing assistants – quickly, easily and transparently.',
    'about.feature1.title': 'Digital First',
    'about.feature1.description': 'Completely digital platform without paperwork',
    'about.feature2.title': 'Direct Connection',
    'about.feature2.description': 'Caregivers and facilities directly connected',
    'about.feature3.title': 'Fast & Flexible',
    'about.feature3.description': 'Immediate staffing requests and placement',
    'about.feature4.title': 'Transparent',
    'about.feature4.description': 'Clear processes and fair conditions',

    // FAQ Section
    'faq.badge': 'Frequently Asked Questions',
    'faq.title': 'FAQ – Documents & Data Protection',
    'faq.subtitle': 'Everything you need to know about required documents and data protection at Woundwann',
    'faq.categories.all': 'All',
    'faq.categories.documents': 'Documents',
    'faq.categories.legal': 'Legal Basis',
    'faq.categories.privacy': 'Data Protection',
    'faq.categories.rights': 'Your Rights',
    'faq.categories.contact': 'Contact',
    'faq.categories.terms': 'General Terms and Conditions',
    'faq.searchPlaceholder': 'Search questions...',
    'faq.documentsRequired.question': 'What do we need from you to employ you?',
    'faq.documentsRequired.answer': `
      <ul class="space-y-3">
        <li><strong>Official ID</strong> (ID card/passport) – Identity verification</li>
        <li><strong>Professional certificate / Authorization under Nursing Professions Act (PflBG)</strong> (for nursing professionals) or corresponding qualification certificate (assistant). Basis: PflBG §1–2 (Authorization to use professional title)</li>
        <li><strong>Recognition of foreign qualifications</strong> (if training was acquired abroad) – state recognition is prerequisite for using professional title</li>
        <li><strong>Residence and work permit</strong> (if required)</li>
        <li><strong>Bank details & Tax ID</strong> (for billing)</li>
        <li><strong>Extended certificate of good conduct (eFZ)</strong> for work with particularly vulnerable persons (care/support). Legal basis: §30a BZRG</li>
        <li><strong>Measles protection proof</strong>, if legally required (employees in certain health/community facilities, especially birth years after 1970)</li>
      </ul>
      <p class="mt-4 text-sm text-gray-600"><em>Note: Which documents are required in individual cases depends on the place of employment/facility and legal situation.</em></p>
    `,
    'faq.whyDocuments.question': 'Why do we need these documents? (Legal basis)',
    'faq.whyDocuments.answer': `
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Contract & Employment</h4>
          <p>Processing your data is necessary for initiating/conducting the employment relationship (Art. 6 para. 1 lit. b GDPR in conjunction with § 26 BDSG).</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Legal obligations in healthcare</h4>
          <p>This includes PflBG as well as eFZ/measles protection if applicable. Health data (e.g. vaccination/immunity certificates) are special categories; processing only occurs to the extent required by labor/social law (Art. 9 para. 2 b GDPR; § 22 BDSG).</p>
        </div>
      </div>
    `,
    'faq.dataProtection.question': 'How do we protect and store your data?',
    'faq.dataProtection.answer': `
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Data minimization & Purpose limitation</h4>
          <p>We only collect what is necessary for employment/billing/compliance.</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Technical & organizational measures</h4>
          <p>Encryption, role-based access, logging; regular review according to Art. 32 GDPR.</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Storage location</h4>
          <p>Preferably within EU/EEA. For necessary third-country transfers, we use appropriate safeguards (e.g. standard contractual clauses, Art. 46 GDPR).</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Data processors</h4>
          <p>Only contractually bound service providers under GDPR. Data protection officer: As soon as ≥ 20 persons regularly process data automatically, a DPO is appointed (§ 38 BDSG).</p>
        </div>
      </div>
    `,
    'faq.storageDuration.question': 'How long do we store? (Retention periods)',
    'faq.storageDuration.answer': `
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Applicants (without employment)</h4>
          <p>Generally deletion after 6 months from completion of procedure (documentation to defend against possible AGG claims); longer storage only with express consent (talent pool).</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Employees (in personnel file)</h4>
          <ul class="space-y-2 ml-4">
            <li><strong>Tax/commercial documents:</strong> 10 years according to § 147 AO or HGB § 257</li>
            <li><strong>Working time records:</strong> min. 2 years according to § 16 para. 2 ArbZG</li>
            <li><strong>Accident insurance:</strong> 5 years according to § 165 SGB VII</li>
            <li><strong>Certificate of good conduct:</strong> usually sight note/note about verification is sufficient; copies are only stored if absolutely necessary</li>
          </ul>
        </div>
      </div>
    `,
    'faq.yourRights.question': 'Your Rights (GDPR)',
    'faq.yourRights.answer': `
      <p>You can request information (Art. 15), correction, deletion (Art. 17) or restriction at any time; also data portability and objection, as well as complaint to the supervisory authority.</p>
    `,
    'faq.contactPerson.question': 'Contact Person',
    'faq.contactPerson.answer': `
      <div class="space-y-3">
        <div>
          <h4 class="font-semibold text-gray-900">Responsible party:</h4>
          <p>Wo & Wann Personal Service GmbH</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900">Data protection contact:</h4>
          <p>privacy@woundwann.de</p>
        </div>
        <p class="text-sm text-gray-600">We typically respond to data protection inquiries within 30 days (Art. 12 GDPR).</p>
      </div>
    `,
    'faq.contactCard.title': 'Contact & Data Protection',
    'faq.contactCard.company': 'Company',
    'faq.contactCard.companyName': 'Wo & Wann Personal Service GmbH',
    'faq.contactCard.address': 'Address',
    'faq.contactCard.fullAddress': 'Haagstr.25 - Friedberg 61169 - Germany',
    'faq.contactCard.email': 'Email',
    'faq.contactCard.emailAddress': 'privacy@woundwann.de',
    'faq.contactCard.responseTime': 'We typically respond to data protection inquiries within 30 days.',
    'faq.termsPayment.question': '500 € for each new nursing home',
    'faq.termsPayment.answer': 'A net payment of 500 EUR per employee will be granted if the care facility requests ten complete shifts.',
    'faq.termsEmployeePayment.question': '20€ for first shift',
    'faq.termsEmployeePayment.answer': 'The employee is entitled to a net remuneration of 20 EUR after completing their first shift through the app, provided they have fully provided all required personal and official data in accordance with German labor law regulations.',
  },
  tr: {
    // Navigation
    'nav.about': 'Hakkımızda',
    'nav.howItWorks': 'Nasıl Çalışır',
    'nav.benefits': 'Avantajlar',
    'nav.testimonials': 'Müşteri Yorumları',
    'nav.faq': 'SSS',
    'nav.pricing': 'Fiyatlandırma',
    'nav.contact': 'İletişim',
    'nav.login': 'Giriş Yap',
    'nav.getStarted': 'Hemen Başla',
    'nav.loginDropdown.caregiver': 'Bakıcı Girişi',
    'nav.loginDropdown.facility': 'Tesis Girişi',
    'nav.getStartedDropdown.caregiver': 'Bakıcı Olarak Kayıt Ol',
    'nav.getStartedDropdown.facility': 'Tesis Kaydı',
    'nav.tagline': 'İhtiyaç Duyduğunuz Yerde ve Zamanda Personel',
    'nav.available247': '7/24 Müsait',
    'nav.verifiedProfessionals': 'Doğrulanmış Profesyoneller',
    'nav.caregivers': '5.000+ Bakıcı',

    // Hero Section
    'hero.badge': 'Sağlık Personeli İstihdam Platformu',
    'hero.title': 'İhtiyaç Duyduğunuz Yerde ve Zamanda Personel',
    'hero.title1': 'İhtiyaç Duyduğunuz Yerde ve Zamanda',
    'hero.title2': 'Personel',
    'hero.title3': 'Bakım Personeli',
    'hero.subtitle': 'Bakım evleri için kalifiye personel bulun veya bakıcı olarak esnek iş fırsatları keşfedin',
    'hero.findStaff': 'Personel Bul',
    'hero.findWork': 'İş Bul',
    'hero.stat1Label': 'Ortalama Doldurma Süresi',
    'hero.stat1': '< 2 saat',
    'hero.stat2Label': 'Aktif Bakıcı',
    'hero.stat2': '5.000+',
    'hero.stat3Label': 'Partner Tesis',
    'hero.stat3': '500+',
    'hero.stat4Label': 'Memnuniyet Oranı',
    'hero.stat4': '98%',
    'hero.facilityName': 'Mavi Tülay Bakım Evi',
    'hero.location': 'İstanbul, Türkiye',
    'hero.needs': 'İhtiyaç',
    'hero.caregivers': '2 Bakıcı',
    'hero.shift': 'Vardiya',
    'hero.nightShift': 'Gece Vardiyası',
    'hero.time': 'Süre',
    'hero.inMinutes': '8 saat',
    'hero.available': 'Müsait',
    'hero.staffFound': 'Personel Bulundu',
    'hero.fixedPrices': 'Sabit Fiyatlar',
    'hero.verified': 'Doğrulanmış',

    // No Interviews Section
    'noInterviews.title': 'Mülakat Gerekmez',
    'noInterviews.subtitle': 'Anında Personel Yerleştirme için Devrimci Teknoloji',
    'noInterviews.description': 'Akıllı platformumuzla, saniyeler içinde kalifiye bakıcılar bulabilirsiniz – zaman alıcı mülakatlar veya uzun bekleme süreleri olmadan.',
    'noInterviews.feature1': 'Anında Yerleştirme',
    'noInterviews.feature1Desc': 'Bekleme süreleri veya bürokrasi olmadan gerçek zamanlı personel rezervasyonu',
    'noInterviews.feature2': 'Anında Kullanılabilirlik',
    'noInterviews.feature2Desc': 'Doğrulanmış bakıcılar 7/24 mevcut',
    'noInterviews.feature3': 'Kalite Güvencesi',
    'noInterviews.feature3Desc': 'Tüm adaylar önceden taranmış ve sertifikalı',
    'noInterviews.feature4': 'Esnek Vardiya Saatleri',
    'noInterviews.feature4Desc': 'Gece vardiyalarından hafta sonu çalışmaya – her şey mümkün',
    'noInterviews.stats': 'Sonuçlar kendini gösteriyor',
    'noInterviews.stat1': '%98',
    'noInterviews.stat1Label': 'Başarı Oranı',
    'noInterviews.stat2': '< 5 Dk',
    'noInterviews.stat2Label': 'Ortalama Yerleştirme Süresi',
    'noInterviews.stat3': '5000+',
    'noInterviews.stat3Label': 'Mevcut Bakıcı',
    'noInterviews.cta': 'Başlayın',

    // How It Works
    'howItWorks.title': 'Woundwann Nasıl Çalışır?',
    'howItWorks.subtitle': 'Bakım evleri ve bakıcılar için basit, hızlı ve güvenilir çözüm',
    'howItWorks.nursingHomes': 'Bakım Evleri',
    'howItWorks.nursingHomesTitle': 'Bakım Evleri İçin',
    'howItWorks.nursingHomesSubtitle': 'Personel ihtiyacınızı hızla karşılayın',
    'howItWorks.nursingHomesDesc': 'Acil personel ihtiyacınız olduğunda, kalifiye bakıcıları dakikalar içinde bulun.',
    'howItWorks.caregivers': 'Bakıcılar',
    'howItWorks.caregiversTitle': 'Bakıcılar İçin',
    'howItWorks.caregiversSubtitle': 'Esnek çalışma fırsatları bulun',
    'howItWorks.caregiversDesc': 'Kendi programınıza uygun iş fırsatları bulun ve gelirinizi artırın.',
    'howItWorks.step1Title': 'Kayıt Olun',
    'howItWorks.step1Desc': 'Hızlı ve kolay kayıt süreci ile başlayın',
    'howItWorks.step4Title': 'Çalışmaya Başlayın',
    'howItWorks.step4Desc': 'Anlaşma imzalayın ve işe başlayın',
    'howItWorks.caregiver1Title': 'Hızlı Kayıt',
    'howItWorks.caregiver1Desc': 'Profesyonel profilinizi dakikalar içinde oluşturun',
    'howItWorks.caregiver2Title': 'Müsaitlik Belirtin',
    'howItWorks.caregiver2Desc': 'Çalışma saatlerinizi ve tercihlerinizi belirtin',
    'howItWorks.caregiver3Title': 'İş Teklifleri Alın',
    'howItWorks.caregiver3Desc': 'Size uygun iş fırsatları için teklifler alın',
    'howItWorks.caregiver4Title': 'Çalışmaya Başlayın',
    'howItWorks.caregiver4Desc': 'Seçtiğiniz işi kabul edin ve çalışmaya başlayın',
    'howItWorks.readyToStart': 'Hemen Başlamaya Hazır mısınız?',
    'howItWorks.startAsFacility': 'Tesis Olarak Başla',
    'howItWorks.startAsCaregiver': 'Bakıcı Olarak Başla',

    // Benefits
    'benefits.title': 'Woundwann\'ın Avantajları',
    'benefits.subtitle': 'Sağlık personeli istihdamında devrim yaratan özellikler',
    'benefits.facilitiesTitle': 'Bakım Evleri İçin',
    'benefits.facilitiesSubtitle': 'Personel yönetimini kolaylaştırın',
    'benefits.facilitiesDesc': 'Kalifiye personel bulma sürecini hızlandırın ve kaliteli bakım sağlayın.',
    'benefits.caregiversTitle': 'Bakıcılar İçin',
    'benefits.caregiversSubtitle': 'Kariyerinizi geliştirin',
    'benefits.caregiversDesc': 'Esnek çalışma saatleri ve iyi ücretli iş fırsatları bulun.',
    'benefits.nursingHome1Title': 'Hızlı Personel Bulma',
    'benefits.nursingHome1Desc': 'Acil durumlarda dakikalar içinde kalifiye personel bulun',
    'benefits.nursingHome1Highlight': '2 saatten az',
    'benefits.nursingHome2Title': 'Doğrulanmış Profesyoneller',
    'benefits.nursingHome2Desc': 'Tüm bakıcılarımız referansları ve sertifikaları ile doğrulanmıştır',
    'benefits.nursingHome2Highlight': '%100 güvenli',
    'benefits.nursingHome3Title': 'Esnek Vardiya Planlama',
    'benefits.nursingHome3Desc': 'İhtiyaçlarınıza göre özelleştirilebilir çalışma saatleri',
    'benefits.nursingHome3Highlight': '7/24 destek',
    'benefits.nursingHome4Title': 'Sabit Fiyatlandırma',
    'benefits.nursingHome4Desc': 'Şeffaf ve önceden belirlenmiş fiyatlar ile bütçe planlaması',
    'benefits.nursingHome4Highlight': 'Şeffaf fiyatlar',
    'benefits.nursingHome5Title': 'Kalite Kontrolü',
    'benefits.nursingHome5Desc': 'Sürekli performans takibi ve kalite güvencesi',
    'benefits.nursingHome5Highlight': 'Kalite garantisi',
    'benefits.nursingHome6Title': '7/24 Destek',
    'benefits.nursingHome6Desc': 'Her zaman yanınızda olan müşteri hizmetleri ekibi',
    'benefits.nursingHome6Highlight': 'Anında destek',
    'benefits.caregiver1Title': 'Esnek Çalışma Saatleri',
    'benefits.caregiver1Desc': 'Kendi programınıza uygun iş fırsatları seçin',
    'benefits.caregiver1Highlight': 'Tam esneklik',
    'benefits.caregiver2Title': 'İyi Ücretler',
    'benefits.caregiver2Desc': 'Piyasa standartlarının üzerinde rekabetçi ücretler',
    'benefits.caregiver2Highlight': 'Rekabetçi ücret',
    'benefits.caregiver3Title': 'Hızlı Ödeme',
    'benefits.caregiver3Desc': 'İş tamamlandıktan sonra hızlı ve güvenli ödeme',
    'benefits.caregiver3Highlight': '24 saat içinde',
    'benefits.caregiver4Title': 'Kariyer Gelişimi',
    'benefits.caregiver4Desc': 'Ücretsiz eğitim ve sertifikasyon fırsatları',
    'benefits.caregiver4Highlight': 'Sürekli öğrenme',
    'benefits.caregiver5Title': 'Güvenli Çalışma',
    'benefits.caregiver5Desc': 'Sigorta kapsamında güvenli çalışma ortamı',
    'benefits.caregiver5Highlight': 'Tam sigorta',
    'benefits.caregiver6Title': 'Sosyal Topluluk',
    'benefits.caregiver6Desc': 'Diğer profesyonellerle bağlantı kurun ve deneyim paylaşın',
    'benefits.caregiver6Highlight': 'Ağ kurma',
    'benefits.trust': 'Güvenilirlik',
    'benefits.activeCaregivers': 'Aktif Bakıcı',
    'benefits.partnerFacilities': 'Partner Tesis',
    'benefits.satisfactionRate': 'Memnuniyet Oranı',
    'benefits.availability': 'Müsaitlik',
    'benefits.stats1Label': 'Aktif Bakıcı',
    'benefits.stats1Value': '5.000+',
    'benefits.stats2Label': 'Partner Tesis',
    'benefits.stats2Value': '500+',
    'benefits.stats3Label': 'Memnuniyet Oranı',
    'benefits.stats3Value': '98%',
    'benefits.stats4Label': 'Müsaitlik',
    'benefits.stats4Value': '7/24',

    // 404 Page
    '404.title': 'Sayfa Bulunamadı',
    '404.subtitle': 'Aradığınız sayfa mevcut değil.',
    '404.returnHome': 'Ana Sayfaya Dön',

    // Alt text
    'alt.logo': 'Woundwann Logo',

    // Footer
    'footer.company': 'Şirket',
    'footer.about': 'Hakkımızda',
    'footer.careers': 'Kariyer',
    'footer.press': 'Basın',
    'footer.blog': 'Blog',
    'footer.services': 'Hizmetler',
    'footer.nursingHomes': 'Bakım Evleri İçin',
    'footer.caregivers': 'Bakıcılar İçin',
    'footer.pricing': 'Fiyatlandırma',
    'footer.howItWorks': 'Nasıl Çalışır',
    'footer.benefits': 'Avantajlar',
    'footer.testimonials': 'Deneyimler',
    'footer.appDownload': 'Uygulama İndir',
    'footer.support': 'Destek',
    'footer.help': 'Yardım',
    'footer.contact': 'İletişim',
    'footer.documentation': 'Dokümantasyon',
    'footer.status': 'Durum',
    'footer.legal': 'Yasal',
    'footer.privacy': 'Gizlilik',
    'footer.impressum': 'Yasal Uyarı',
    'footer.terms': 'Şartlar',
    'footer.cookies': 'Çerezler',
    'footer.imprint': 'İletişim Bilgileri',
    'footer.connect': 'Bağlan',
    'footer.newsletter': 'Bülten',
    'footer.newsletterDesc': 'En son güncellemelerimizle güncel kalın.',
    'footer.subscribe': 'Abone Ol',
    'footer.emailPlaceholder': 'E-posta adresiniz',
    'footer.rights': '© 2025 Woundwann. Tüm hakları saklıdır.',
    'footer.tagline': 'İhtiyaç Duyduğunuz Yerde ve Zamanda Personel',
    'footer.location': 'Konumumuz',
    'footer.viewOnMaps': 'Google Haritalarda Görüntüle',

    // Impressum
    'impressum.title': 'Yasal Uyarı',
    'impressum.legalNotice': '§ 5 TMG\'ye göre bilgiler',
    'impressum.companyName': 'Wo und Wann Personal Service GmbH',
    'impressum.address': 'Haagstraße. 25',
    'impressum.postalCode': '61169 Friedberg',
    'impressum.email': 'E-posta: info@woundwann.de',
    'impressum.privacyEmail': 'Gizlilik E-postası: privacy@woundwann.de',
    'impressum.website': 'Website: https://woundwann.de',
    'impressum.ceo': 'Genel Müdür: Ahmad Alzein',
    'impressum.registrationNumber': 'Kayıt Numarası: HRB 10713',
    'impressum.registrationCourt': 'Kayıt Mahkemesi: Friedberg',
    'impressum.taxNumber': 'Vergi Numarası: 016 801 64833',
    'impressum.vatNumber': 'KDV Numarası: DE451391090',
    'impressum.contentLiability': 'İçerik Sorumluluğu',
    'impressum.contentLiabilityText': 'Sayfalarımızın içerikleri en büyük özenle oluşturulmuştur. Ancak içeriklerin doğruluğu, eksiksizliği ve güncelliği için garanti veremeyiz.',
    'impressum.contentLiabilityText2': 'Hizmet sağlayıcıları olarak, genel yasalara göre bu sayfalardaki kendi içeriklerimizden sorumluyuz. Ancak hizmet sağlayıcıları, ilettikleri veya sakladıkları yabancı bilgileri sürekli izlemek veya yasadışı faaliyetleri gösteren koşulları araştırmak zorunda değildir.',
    'impressum.contentLiabilityText3': 'Genel yasalara göre bilgilerin kullanımını kaldırma veya engelleme yükümlülükleri bundan etkilenmez. Ancak bu konudaki sorumluluk, ancak somut bir hukuk ihlali bilgisinin edinildiği andan itibaren mümkündür. Bu tür hukuk ihlalleri bilindiğinde, bu içerikleri derhal kaldıracağız.',
    'impressum.linkLiability': 'Bağlantı Sorumluluğu',
    'impressum.linkLiabilityText': 'Teklifimiz üçüncü tarafların dış web sitelerine bağlantılar içerir, içerikleri üzerinde hiçbir etkimiz yoktur. Bu nedenle bu yabancı içerikler için garanti veremeyiz. Bağlantılı sayfaların içeriklerinden her zaman ilgili sağlayıcı veya sayfa işletmecisi sorumludur.',
    'impressum.linkLiabilityText2': 'Bağlantılı sayfalar, bağlantı anında olası hukuk ihlalleri açısından kontrol edildi. Bağlantı anında yasadışı içerikler tanınabilir değildi. Ancak bağlantılı sayfaların içeriklerinin sürekli kontrolü, somut bir hukuk ihlali belirtisi olmadan makul değildir. Bu tür hukuk ihlalleri bilindiğinde, bu tür bağlantıları derhal kaldıracağız.',
    'impressum.copyright': 'Telif Hakkı',
    'impressum.copyrightText': 'Sayfa işletmecileri, her zaman diğerlerinin telif haklarına saygı göstermeye çalışır veya kendi oluşturdukları ve lisanssız eserlere başvurur.',
    'impressum.copyrightText2': 'Sayfa işletmecileri tarafından bu sayfalarda oluşturulan içerik ve eserler Alman telif hakkına tabidir. Üçüncü tarafların katkıları böyle işaretlenmiştir. Telif hakkı sınırları dışında çoğaltma, işleme, dağıtma ve her türlü kullanım, ilgili yazar veya oluşturucunun yazılı onayını gerektirir.',
    'impressum.copyrightText3': 'Bu sayfanın indirmeleri ve kopyaları yalnızca özel, ticari olmayan kullanım için izin verilir.',
    'impressum.dataProtection': 'Veri Koruması',
    'impressum.dataProtectionText': 'Sayfalarımızda kişisel veriler (örneğin isim, adres veya e-posta adresleri) toplandığında, mümkün olduğunca her zaman gönüllü temelde yapılır. Teklif ve hizmetlerin kullanımı, mümkün olduğunca her zaman kişisel veri belirtmeden mümkündür.',
    'impressum.dataProtectionText2': 'Üçüncü tarafların, yasal uyarı yükümlülüğü kapsamında yayınlanan iletişim verilerini, açıkça talep edilmemiş reklam ve bilgi materyalleri göndermek için kullanması burada açıkça reddedilir. Sayfa işletmecileri, istenmeyen reklam bilgilerinin gönderilmesi durumunda (spam e-postalar gibi) açıkça hukuki adımlar atma hakkını saklı tutar.',

    // Privacy Policy
    'privacy.title': 'Gizlilik Politikası',
    'privacy.generalInfo': 'Genel Bilgiler ve Zorunlu Bilgiler',
    'privacy.responsibleParty': 'Sorumlu Tarafın Belirlenmesi',
    'privacy.responsiblePartyDesc': 'Bu web sitesindeki veri işlemeden sorumlu taraf:',
    'privacy.companyName': 'Wo und Wann Personal Service GmbH',
    'privacy.contactPerson': 'Ahmad Alzein',
    'privacy.address': 'Haagstr.25',
    'privacy.city': '61169 Friedberg, Almanya',
    'privacy.dataProcessing': 'Sorumlu taraf, kişisel verilerin işlenmesinin amaçları ve araçları konusunda tek başına veya başkalarıyla birlikte karar verir (örn. isimler, iletişim verileri, vb.).',
    'privacy.consentWithdrawal': 'Veri İşleme Onayınızı Geri Çekme',
    'privacy.consentWithdrawalDesc': 'Bazı veri işleme işlemleri yalnızca açık onayınızla mümkündür. Zaten verdiğiniz onayı her zaman geri çekebilirsiniz. Geri çekme için e-posta ile gayri resmi bir mesaj yeterlidir. Geri çekmeye kadar yapılan veri işlemenin yasallığı geri çekmeden etkilenmez.',
    'privacy.complaintRight': 'Yetkili Denetim Otoritesine Şikayet Hakkı',
    'privacy.complaintRightDesc': 'Bir veri sahibi olarak, veri koruma ihlali durumunda yetkili denetim otoritesine şikayet etme hakkınız vardır. Veri koruma konularında yetkili denetim otoritesi, şirketimizin bulunduğu federal eyaletin eyalet veri koruma memurudur.',
    'privacy.dataPortability': 'Veri Taşınabilirliği Hakkı',
    'privacy.dataPortabilityDesc': 'Onayınız temelinde veya bir sözleşmenin yerine getirilmesi kapsamında otomatik olarak işlediğimiz verilerin size veya üçüncü taraflara teslim edilmesini isteme hakkınız vardır. Sağlama makine tarafından okunabilir formatta yapılır.',
    'privacy.dataRights': 'Bilgi Alma, Düzeltme, Engelleme, Silme Hakkı',
    'privacy.dataRightsDesc': 'Geçerli yasal hükümler çerçevesinde, saklanan kişisel verileriniz, verilerin kaynağı, alıcıları ve veri işleme amacı hakkında her zaman ücretsiz bilgi alma hakkınız vardır.',
    'privacy.privacyEmail': 'Gizlilik E-postası: privacy@woundwann.de',
    'privacy.sslEncryption': 'SSL veya TLS Şifreleme',
    'privacy.sslEncryptionDesc': 'Güvenlik nedenleriyle ve bize site operatörü olarak gönderdiğiniz gizli içeriğin korunması için web sitemiz SSL veya TLS şifreleme kullanır.',
    'privacy.contactForm': 'İletişim Formu',
    'privacy.contactFormDesc1': 'İletişim formu aracılığıyla iletilen veriler, talebinizi işlemek veya takip soruları için hazır olmak üzere saklanır.',
    'privacy.contactFormDesc2': 'İletişim formuna girilen verilerin işlenmesi yalnızca onayınız temelinde gerçekleşir.',
    'privacy.contactFormDesc3': 'İletişim formu aracılığıyla iletilen veriler, silme talebinde bulunana, depolama onayınızı geri çekene veya veri depolama ihtiyacı kalmayana kadar bizde kalır.',
    'privacy.legalNotice': 'Yasal Uyarı',
    'privacy.copyright': '© 2025 WoundWann tarafından tüm hakları saklıdır',
    'privacy.backToHomepage': 'Ana Sayfaya Dön',

    // Testimonials
    'testimonials.title': 'Müşteri Yorumları',
    'testimonials.subtitle': 'Bakım evleri ve bakıcılarımızdan gerçek deneyimler',
    'testimonials.facilitiesTitle': 'Bakım Evleri',
    'testimonials.caregiversTitle': 'Bakıcılar',
    'testimonials.nursingHomes': 'Bakım Evleri',
    'testimonials.caregivers': 'Bakıcılar',
    'testimonials.facility1Name': 'Dr. Maria Schmidt',
    'testimonials.facility1Role': 'Baş Hemşirelik Hizmetleri Müdürü',
    'testimonials.facility1Company': 'Güneş Bakım Evi',
    'testimonials.facility1Text': 'Woundwann personel planlamamızı devrim niteliğinde değiştirdi. Dakikalar içinde nitelikli bakıcılar bulduk. Platform kullanımı kolay ve bize günlük saatler kazandırıyor.',
    'testimonials.facility1Rating': '5.0',
    'testimonials.facility2Name': 'Thomas Weber',
    'testimonials.facility2Role': 'Genel Müdür',
    'testimonials.facility2Company': 'Park Bakım Evi',
    'testimonials.facility2Text': '7/24 erişilebilirlik gerçekten oyun değiştirici. Kısa süreli devamsızlıklarda bile hemen yedek bulabiliyoruz. Bakıcıların kalitesi sürekli mükemmel.',
    'testimonials.facility2Rating': '5.0',
    'testimonials.facility3Name': 'Frau Müller',
    'testimonials.facility3Role': 'Hemşirelik Hizmetleri Müdürü',
    'testimonials.facility3Company': 'Wetzlar Yaşlı Bakım Merkezi',
    'testimonials.facility3Text': 'Sonunda gerçekten işe yarayan bir çözüm. Artık uzun telefon görüşmeleri yok, bekleme süreleri yok. Bakıcıların hepsi doğrulanmış ve profesyonel. Çok memnunuz.',
    'testimonials.facility3Rating': '5.0',
    'testimonials.nursingHome1Name': 'Dr. Maria Schmidt',
    'testimonials.nursingHome1Role': 'Baş Hemşirelik Hizmetleri Müdürü',
    'testimonials.nursingHome1Location': 'Münih',
    'testimonials.nursingHome1Text': 'Woundwann personel planlamamızı devrim niteliğinde değiştirdi. Dakikalar içinde nitelikli bakıcılar bulduk. Platform kullanımı kolay ve bize günlük saatler kazandırıyor.',
    'testimonials.nursingHome1Rating': '5.0',
    'testimonials.nursingHome2Name': 'Thomas Weber',
    'testimonials.nursingHome2Role': 'Genel Müdür',
    'testimonials.nursingHome2Location': 'Berlin',
    'testimonials.nursingHome2Text': '7/24 erişilebilirlik gerçekten oyun değiştirici. Kısa süreli devamsızlıklarda bile hemen yedek bulabiliyoruz. Bakıcıların kalitesi sürekli mükemmel.',
    'testimonials.nursingHome2Rating': '5.0',
    'testimonials.nursingHome3Name': 'Frau Müller',
    'testimonials.nursingHome3Role': 'Hemşirelik Hizmetleri Müdürü',
    'testimonials.nursingHome3Text': 'Sonunda gerçekten işe yarayan bir çözüm. Artık uzun telefon görüşmeleri yok, bekleme süreleri yok. Bakıcıların hepsi doğrulanmış ve profesyonel. Çok memnunuz.',
    'testimonials.nursingHome3Rating': '5.0',
    'testimonials.caregiver1Name': 'Anna Kowalski',
    'testimonials.caregiver1Role': 'Sağlık ve Hemşirelik Uzmanı',
    'testimonials.caregiver1Location': 'Münih',
    'testimonials.caregiver1Text': 'Woundwann sayesinde çalışma saatlerimi kendim belirleyebiliyorum. Ödeme adil ve zamanında. Sadece bana uygun tesislerde çalışıyorum.',
    'testimonials.caregiver1Rating': '5.0',
    'testimonials.caregiver2Name': 'Michael Hoffmann',
    'testimonials.caregiver2Role': 'Yaşlı Bakım Uzmanı',
    'testimonials.caregiver2Location': 'Berlin',
    'testimonials.caregiver2Text': 'İş görüşmeleri yok, karmaşık süreçler yok. Profilimi oluşturuyorum ve uygun teklifler alıyorum. Esneklik benim için mükemmel.',
    'testimonials.caregiver2Rating': '5.0',
    'testimonials.caregiver3Name': 'Lisa Wagner',
    'testimonials.caregiver3Role': 'Sertifikalı Yaşlı Bakım Uzmanı',
    'testimonials.caregiver3Location': 'Hamburg',
    'testimonials.caregiver3Text': 'Eğitim fırsatları harika. Ücretsiz olarak kendimi geliştirebiliyorum ve yeni nitelikler kazanabiliyorum. Bu beni tesisler için daha değerli kılıyor.',
    'testimonials.caregiver3Rating': '5.0',

    // App Download
    'appDownload.title': 'Woundwann Uygulamasını İndirin',
    'appDownload.subtitle': 'Personelinizi yönetin veya iş fırsatlarını mobil cihazınızdan bulun',
    'appDownload.availableOn': 'Mevcut platformlar',
    'appDownload.downloadOn': 'İndirin',
    'appDownload.appStore': 'App Store',
    'appDownload.googlePlay': 'Google Play',
    'appDownload.features': 'Uygulama Özellikleri',
    'appDownload.feature1': 'Anında Bildirimler',
    'appDownload.feature1Desc': 'Yeni iş fırsatları veya personel talepleri hakkında anında bilgilendirilme alın',
    'appDownload.feature2': 'Kolay Personel Yönetimi',
    'appDownload.feature2Desc': 'Ekibinizi yönetin ve vardiyaları sadece birkaç dokunuşla planlayın',
    'appDownload.feature3': 'Doğrudan Sohbet',
    'appDownload.feature3Desc': 'Tesisler veya bakıcılarla gerçek zamanlı olarak doğrudan iletişim kurun',
    'appDownload.feature4': 'Güvenli Dokümantasyon',
    'appDownload.feature4Desc': 'Bakım hizmetlerini ve çalışma saatlerini güvenli ve KVKK uyumlu şekilde belgeleyin',
    'appDownload.qrTitle': 'QR Kod Tarayın',
    'appDownload.qrSubtitle': 'Uygulamayı doğrudan yüklemek için QR kodu tarayın',

    // Contact
    'contact.title': 'İletişim',
    'contact.subtitle': 'Sorularınız mı var? Size yardımcı olmaya hazırız',
    'contact.form.title': 'Bize Mesaj Gönderin',
    'contact.form.name': 'Adınız',
    'contact.form.email': 'E-posta Adresiniz',
    'contact.form.company': 'Şirket (isteğe bağlı)',
    'contact.form.subject': 'Konu',
    'contact.form.message': 'Mesajınız',
    'contact.form.send': 'Mesaj Gönder',
    'contact.info.title': 'İletişim Bilgileri',
    'contact.info.desc': 'Kişisel danışmanlık için bizimle doğrudan iletişime geçin',
    'contact.info.phone': 'Telefon',
    'contact.info.email': 'E-posta',
    'contact.info.address': 'Adres',
    'contact.info.hours': 'Çalışma Saatleri',
    'contact.info.hoursDesc': 'Pzt - Cmt: 08:00 - 18:00',
    'contact.success': 'Mesaj başarıyla gönderildi!',
    'contact.error': 'Mesaj gönderilirken hata oluştu',
    'contact.guarantee.title': 'Hızlı Yanıt Garantisi',
    'contact.guarantee.desc': 'Genellikle tüm taleplere 24 saat içinde yanıt veriyoruz. Acil durumlar için lütfen doğrudan arayın.',
    'contact.social.title': 'Bizi Takip Edin',
    'contact.social.desc': 'Bizimle bağlantıda kalın ve en son güncellemeleri alın',

    // About Us Section
    'about.title': 'Hakkımızda',
    'about.subtitle': 'Bakım personeli istihdamının geleceği dijital',
    'about.description1': 'Bakıcıları ve bakım tesislerini doğrudan birbirine bağlayan ilk tamamen dijital geçici istihdam platformuyuz.',
    'about.description2': 'Hizmetimiz, bakım tesislerinin hemşirelik profesyonelleri veya bakım asistanları talep etmesini sağlar – hızlı, kolay ve şeffaf bir şekilde.',
    'about.feature1.title': 'Dijital Öncelik',
    'about.feature1.description': 'Kağıt işi olmayan tamamen dijital platform',
    'about.feature2.title': 'Doğrudan Bağlantı',
    'about.feature2.description': 'Bakıcılar ve tesisler doğrudan bağlı',
    'about.feature3.title': 'Hızlı ve Esnek',
    'about.feature3.description': 'Anında personel talepleri ve yerleştirme',
    'about.feature4.title': 'Şeffaf',
    'about.feature4.description': 'Net süreçler ve adil koşullar',

    'contact.form.subjectPlaceholder': 'Konu Seçin',
    'contact.form.subjectGeneral': 'Genel Sorgu',
    'contact.form.subjectSupport': 'Teknik Destek',
    'contact.form.subjectPartnership': 'Ortaklık',
    'contact.form.subjectCareer': 'Kariyer',
    'contact.form.subjectOther': 'Diğer',
    'contact.form.namePlaceholder': 'Adınızı girin',
    'contact.form.companyPlaceholder': 'Şirket adınız',
    'contact.form.messagePlaceholder': 'Mesajınızı buraya yazın...',

    // Registration Section
    'registration.title': 'Wo&Wann\'a şimdi kayıt olun ve para kazanın. Şimdi kayıt olun!',
    'registration.subtitle': 'Şimdi kayıt olun ve 20€ bonus kazanın*!',
    'registration.badge': 'Özel Teklif',
    'registration.bonus': '20€ Bonus*',
    'registration.bonusFootnote': '* İlk vardiyanızı tamamladıktan sonra ödenir.',
    'registration.description': 'Bakıcı olarak kariyerinize başlayın ve hemen para kazanmaya başlayın. Hoş geldin bonusumuzla ilk ödemenizde 20€ ekstra alırsınız.',
    'registration.registerNow': 'Şimdi Kayıt Ol',
    'registration.learnMore': 'Daha Fazla Bilgi',
    'registration.feature1': 'Anında Kayıt',
    'registration.feature2': '20€ Hoş Geldin Bonusu',
    'registration.feature3': 'Esnek Çalışma Saatleri',
    'registration.feature4': 'Güvenli Ödeme',

    // FAQ Section
    'faq.badge': 'Sıkça Sorulan Sorular',
    'faq.title': 'SSS – Belgeler ve Veri Koruması',
    'faq.subtitle': 'Woundwann\'da gerekli belgeler ve veri koruması hakkında bilmeniz gereken her şey',
    'faq.categories.all': 'Tümü',
    'faq.categories.documents': 'Belgeler',
    'faq.categories.legal': 'Yasal Dayanak',
    'faq.categories.privacy': 'Veri Koruması',
    'faq.categories.rights': 'Haklarınız',
    'faq.categories.contact': 'İletişim',
    'faq.categories.terms': 'Genel Şartlar ve Koşullar',
    'faq.searchPlaceholder': 'Soruları ara...',
    'faq.documentsRequired.question': 'Sizi işe almak için neler gerekiyor?',
    'faq.documentsRequired.answer': `
      <ul class="space-y-3">
        <li><strong>Resmi Kimlik</strong> (Kimlik kartı/pasaport) – Kimlik doğrulama</li>
        <li><strong>Meslek belgesi / Bakım Meslekleri Yasası (PflBG) yetkisi</strong> (bakım profesyonelleri için) veya ilgili yeterlilik belgesi (asistan). Dayanak: PflBG §1–2 (Meslek unvanı kullanma yetkisi)</li>
        <li><strong>Yabancı diplomaların tanınması</strong> (eğitim yurtdışında alındıysa) – devlet tanınması meslek unvanı kullanmanın ön koşuludur</li>
        <li><strong>İkamet ve çalışma izni</strong> (gerekirse)</li>
        <li><strong>Banka bilgileri ve Vergi Kimlik No</strong> (faturalandırma için)</li>
        <li><strong>Genişletilmiş sabıka kaydı (eFZ)</strong> özellikle korunması gereken kişilerle (bakım/destek) çalışma için. Yasal dayanak: §30a BZRG</li>
        <li><strong>Kızamık koruma belgesi</strong>, yasal olarak gerekliyse (belirli sağlık/topluluk tesislerinde çalışanlar, özellikle 1970 sonrası doğumlular)</li>
      </ul>
      <p class="mt-4 text-sm text-gray-600"><em>Not: Hangi belgelerin gerekli olduğu, çalışma yeri/tesis ve yasal duruma göre değişir.</em></p>
    `,
    'faq.whyDocuments.question': 'Neden bu belgelere ihtiyacımız var? (Yasal dayanak)',
    'faq.whyDocuments.answer': `
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Sözleşme ve İstihdam</h4>
          <p>Verilerinizin işlenmesi, istihdam ilişkisinin başlatılması/yürütülmesi için gereklidir (Madde 6 fıkra 1 lit. b KVKK ile birlikte § 26 BDSG).</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Sağlık sektöründeki yasal yükümlülükler</h4>
          <p>Bu, PflBG'nin yanı sıra eFZ/kızamık korumasını da içerir. Sağlık verileri (örn. aşı/bağışıklık belgeleri) özel kategorilerdir; işleme sadece iş/sosyal hukuk gerektirdiği ölçüde gerçekleşir (Madde 9 fıkra 2 b KVKK; § 22 BDSG).</p>
        </div>
      </div>
    `,
    'faq.dataProtection.question': 'Verilerinizi nasıl koruyor ve saklıyoruz?',
    'faq.dataProtection.answer': `
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Veri tasarrufu ve amaç sınırlaması</h4>
          <p>Sadece istihdam/faturalandırma/uyumluluk için gerekli olanları topluyoruz.</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Teknik ve organizasyonel önlemler</h4>
          <p>Şifreleme, rol tabanlı erişim, günlükleme; Madde 32 KVKK'ya göre düzenli inceleme.</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Saklama yeri</h4>
          <p>Tercihen AB/AEA içinde. Gerekli üçüncü ülke transferleri için uygun güvenceler kullanıyoruz (örn. standart sözleşme maddeleri, Madde 46 KVKK).</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Veri işleyiciler</h4>
          <p>Sadece KVKK'ya göre sözleşmeli hizmet sağlayıcılar. Veri koruma görevlisi: ≥ 20 kişi düzenli olarak verileri otomatik işlediğinde, bir VKG atanır (§ 38 BDSG).</p>
        </div>
      </div>
    `,
    'faq.storageDuration.question': 'Ne kadar süre saklıyoruz? (Saklama süreleri)',
    'faq.storageDuration.answer': `
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Başvurular (istihdam olmadan)</h4>
          <p>Genellikle prosedürün tamamlanmasından 6 ay sonra silme (olası AGG taleplerini savuşturmak için dokümantasyon); daha uzun saklama sadece açık rıza ile (yetenek havuzu).</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Çalışanlar (personel dosyasında)</h4>
          <ul class="space-y-2 ml-4">
            <li><strong>Vergi/ticari belgeler:</strong> § 147 AO veya HGB § 257'ye göre 10 yıl</li>
            <li><strong>Çalışma süresi kayıtları:</strong> § 16 fıkra 2 ArbZG'ye göre en az 2 yıl</li>
            <li><strong>İş kazası sigortası:</strong> § 165 SGB VII'ye göre 5 yıl</li>
            <li><strong>Sabıka kaydı:</strong> genellikle görme notu/doğrulama notu yeterlidir; kopyalar sadece kesinlikle gerekliyse saklanır</li>
          </ul>
        </div>
      </div>
    `,
    'faq.yourRights.question': 'Haklarınız (KVKK)',
    'faq.yourRights.answer': `
      <p>Her zaman bilgi (Madde 15), düzeltme, silme (Madde 17) veya kısıtlama talep edebilirsiniz; ayrıca veri taşınabilirliği ve itiraz, denetim otoritesine şikayet.</p>
    `,
    'faq.contactPerson.question': 'İletişim Kişisi',
    'faq.contactPerson.answer': `
      <div class="space-y-3">
        <div>
          <h4 class="font-semibold text-gray-900">Sorumlu taraf:</h4>
          <p>Wo & Wann Personal Service GmbH</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900">Veri koruma iletişimi:</h4>
          <p>privacy@woundwann.de</p>
        </div>
        <p class="text-sm text-gray-600">Veri koruma taleplerine genellikle 30 gün içinde yanıt veriyoruz (Madde 12 KVKK).</p>
      </div>
    `,
    'faq.contactCard.title': 'İletişim ve Veri Koruması',
    'faq.contactCard.company': 'Şirket',
    'faq.contactCard.companyName': 'Wo & Wann Personal Service GmbH',
    'faq.contactCard.address': 'Adres',
    'faq.contactCard.fullAddress': 'Haagstr.25 - Friedberg 61169 - Almanya',
    'faq.contactCard.email': 'E-posta',
    'faq.contactCard.emailAddress': 'privacy@woundwann.de',
    'faq.contactCard.responseTime': 'Veri koruma taleplerine genellikle 30 gün içinde yanıt veriyoruz.',
    'faq.termsPayment.question': 'Her yeni bakım evi için 500 €',
    'faq.termsPayment.answer': 'Bakım tesisi on tam vardiya talep etmesi durumunda çalışan başına 500 EUR net ödeme yapılacaktır.',
    'faq.termsEmployeePayment.question': 'İlk vardiya için 20€',
    'faq.termsEmployeePayment.answer': 'Çalışan, uygulama üzerinden ilk vardiyasını tamamladıktan sonra, Alman iş hukuku düzenlemelerine uygun olarak gerekli tüm kişisel ve resmi verileri tam olarak sağlaması koşuluyla 20 EUR net ücret alma hakkına sahiptir.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'de' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};