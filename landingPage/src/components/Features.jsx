import FeatureList from "./Feature";

const Features = () => {
  return (
    <div className="Features">
      <h2>Funktionsbereich oder Vorteile bereich</h2>
      <div className="FeaturesList">
        {FeatureList?.map((feature, index) => (
          <div key={index} className="Feature">
            <div>
              <span>0{index + 1}</span>
              <h4>{feature.title}</h4>
            </div>
            <p>{feature.des}</p>
            {feature.itemsList.map((item, index) => (
              <div key={index} className="list-item">
                <span className="index">0{index + 1}.</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
