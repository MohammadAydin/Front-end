import { ContactInputs, info } from "./Contact_index";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import contactSchema from "./validationSchema";
import axios from "axios";

const Contact = () => {
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [success, serverError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://woundwann.de/v1/contact", {
        email: data.email,
        name: data.name,
        phone: data.number,
        message: data.message,
      });
      // تحقق من حالة الاستجابة
      if (response?.status === 200 || response?.status === 201) {
        setSuccess("Message sent successfully!");
        setServerError("");
        reset();
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setServerError("Something went wrong. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="Contact">
      <h2>Kontaktbereich</h2>
      <p>
        Haben Sie Fragen? Kontaktieren Sie uns direkt bei E-Mail oder über das
        Kontaktformular auf dieser Seite.
      </p>
      <div className="ContactInfo">
        <form onSubmit={handleSubmit(onSubmit)} className="ContactForm">
          {ContactInputs.map((input) => (
            <div key={input.name}>
              <input
                {...register(input.name)}
                type={input.type}
                placeholder={input.placeholder}
                className="ErrorMessge"
              />
              {errors[input.name] && (
                <p className="ErrorMessge">{errors[input.name]?.message}</p>
              )}
            </div>
          ))}

          {success && <p className="successMessge">{success}</p>}
          {serverError && <p className="ErrorMessge">{serverError}</p>}

          <button type="submit">Senden</button>
        </form>
        <div>
          {info.map((i) => (
            <div key={i.title} className="Info">
              <span>{i.icon}</span>
              <div>
                <h4>{i.title}</h4>
                <p>{i.des}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
