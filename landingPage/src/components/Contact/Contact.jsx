import { getContactInputs, getContactInfo } from "./Contact_index";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import contactSchema from "./validationSchema";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const ContactInputs = getContactInputs(t);
  const info = getContactInfo(t);

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
        setSuccess(t('contact.successMessage'));
        setServerError("");
        reset();
      } else {
        setServerError(t('contact.errorMessage'));
      }
    } catch (error) {
      setServerError(t('contact.errorMessage'));
      setSuccess("");
    }
  };

  return (
    <div className="Contact">
      <h2>{t('contact.title')}</h2>
      <p>
        {t('contact.description')}
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

          <button type="submit">{t('contact.send')}</button>
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
