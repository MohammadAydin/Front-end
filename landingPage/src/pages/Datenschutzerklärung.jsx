import React from "react";

const Datenschutzerklärung = () => {
  return (
    <div className="datenschutz-wrapper">
      <div className="datenschutz-title">
        <h2>Datenschutzerklärung</h2>
      </div>

      <div className="datenschutz-section hinweis">
        <h3>
          Allgemeiner Hinweis und Pflichtinformationen
          <br />
          Benennung der verantwortlichen Stelle
        </h3>
        <p>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser
          Website ist:
        </p>
        <p>Wo und Wann Personal Service GmbH</p>
        <p>Ahmad Alzein</p>
        <p>Haagstr.25</p>
        <p>61169 Friedberg</p>
        <p>
          Die verantwortliche Stelle entscheidet allein oder gemeinsam mit
          anderen über die Zwecke und Mittel der Verarbeitung von
          personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).
        </p>
      </div>

      <div className="datenschutz-section widerruf">
        <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
        <p>
          Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der
          Datenverarbeitung möglich. Ein Widerruf Ihrer bereits erteilten
          Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine
          formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum
          Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
        </p>
      </div>

      <div className="datenschutz-section beschwerde">
        <h3>Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde</h3>
        <p>
          Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen
          Verstoßes ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
          Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher Fragen
          ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der
          Sitz unseres Unternehmens befindet. Der Link stellt eine Liste der
          Datenschutzbeauftragten sowie deren Kontaktdaten bereit.
        </p>
      </div>

      <div className="datenschutz-section datenuebertragbarkeit">
        <h3>Recht auf Datenübertragbarkeit</h3>
        <p>
          Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer
          Einwilligung oder in Erfüllung eines Vertrags automatisiert
          verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die
          Bereitstellung erfolgt in einem maschinenlesbaren Format. Sofern Sie
          die direkte Übertragung der Daten an einen anderen Verantwortlichen
          verlangen, erfolgt dies nur, soweit es technisch machbar ist.
        </p>
      </div>

      <div className="datenschutz-section auskunft">
        <h3>Recht auf Auskunft, Berichtigung, Sperrung, Löschung</h3>
        <p>
          Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen
          das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
          personenbezogenen Daten, Herkunft der Daten, deren Empfänger und den
          Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung,
          Sperrung oder Löschung dieser Daten. Diesbezüglich und auch zu
          weiteren Fragen zum Thema personenbezogene Daten können Sie sich
          jederzeit über die im Impressum aufgeführten Kontaktmöglichkeiten an
          uns wenden.
        </p>
      </div>

      <div className="datenschutz-section ssl">
        <h3>SSL- bzw. TLS-Verschlüsselung</h3>
        <p>
          Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
          Inhalte, die Sie an uns als Seitenbetreiber senden, nutzt unsere
          Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten, die Sie
          über diese Website übermitteln, für Dritte nicht mitlesbar. Sie
          erkennen eine verschlüsselte Verbindung an der „https://“ Adresszeile
          Ihres Browsers und am Schloss-Symbol in der Browserzeile.
        </p>
      </div>

      <div className="datenschutz-section kontaktformular">
        <h3>Kontaktformular</h3>
        <p>
          Per Kontaktformular übermittelte Daten werden einschließlich Ihrer
          Kontaktdaten gespeichert, um Ihre Anfrage bearbeiten zu können oder um
          für Anschlussfragen bereitzustehen. Eine Weitergabe dieser Daten
          findet ohne Ihre Einwilligung nicht statt.
        </p>
        <p>
          Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt
          ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
          DSGVO). Ein Widerruf Ihrer bereits erteilten Einwilligung ist
          jederzeit möglich. Für den Widerruf genügt eine formlose Mitteilung
          per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
          Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
        </p>
        <p>
          Über das Kontaktformular übermittelte Daten verbleiben bei uns, bis
          Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung
          widerrufen oder keine Notwendigkeit der Datenspeicherung mehr besteht.
          Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen
          – bleiben unberührt.
        </p>
      </div>
    </div>
  );
};

export default Datenschutzerklärung;
