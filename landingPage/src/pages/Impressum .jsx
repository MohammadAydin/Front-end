import React from "react";

const Impressum = () => {
  return (
    <div className="impressum-wrapper">
      <div className="impressum-title">
        <h2>Angaben gemäß § 5 TMG</h2>
      </div>

      <div className="impressum-company-info">
        <p>Wo und Wann Personal Service GmbH</p>
        <p>Haagstraße. 25</p>
        <p>61169 Friedberg</p>
        <p>E-Mail: info@woundwann.de</p>
        <p>
          Website:{" "}
          <a
            href="https://woundwann.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://woundwann.de
          </a>
        </p>
        <p>Geschäftsführer: Ahmad Alzein</p>
        <p>Registernummer: HRB 10713</p>
        <p>Registergericht: Friedberg</p>
        <p>Steuernummer: 016 801 64833</p>
        <p>Umsatzsteuergesetz: DE451391090</p>
      </div>

      <div className="impressum-section haftung-inhalte">
        <h3>Haftung für Inhalte</h3>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen.
        </p>
        <p>
          Als Diensteanbieter sind wir gemäß § 6 Abs.1 MDStV und § 8 Abs.1 TDG
          für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich. Diensteanbieter sind jedoch nicht verpflichtet, die
          von ihnen übermittelten oder gespeicherten fremden Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
          Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
          hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
          Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          bekannt werden von entsprechenden Rechtsverletzungen werden wir diese
          Inhalte umgehend entfernen.
        </p>
      </div>

      <div className="impressum-section haftung-links">
        <h3>Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
          permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          bekannt werden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
        </p>
      </div>

      <div className="impressum-section urheberrecht">
        <h3>Urheberrecht</h3>
        <p>
          Die Betreiber der Seiten sind bemüht, stets die Urheberrechte anderer
          zu beachten bzw. auf selbst erstellte sowie lizenzfreie Werke
          zurückzugreifen.
        </p>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind
          als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung,
          Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
          Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
          Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für
          den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
      </div>

      <div className="impressum-section datenschutz">
        <h3>Datenschutz</h3>
        <p>
          Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name,
          Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies soweit
          möglich stets auf freiwilliger Basis. Die Nutzung der Angebote und
          Dienste ist, soweit möglich, stets ohne Angabe personenbezogener Daten
          möglich.
        </p>
        <p>
          Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
          Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
          angeforderter Werbung und Informationsmaterialien wird hiermit
          ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
          ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung
          von Werbeinformationen, etwa durch Spam-Mails, vor.
        </p>
      </div>
    </div>
  );
};

export default Impressum;
