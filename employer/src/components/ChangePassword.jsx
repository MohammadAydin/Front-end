import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import customFetch from "../utils/axios";
import { FaEye, FaEyeSlash, FaLock, FaCheck, FaTimes } from "react-icons/fa";

const ChangePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});

  // Password validation
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength: password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    };
  };

  const validateForm = () => {
    const newErrors = {};
    const passwordValidation = validatePassword(formData.newPassword);

    if (!formData.oldPassword.trim()) {
      newErrors.oldPassword = t("changePassword.validation.oldPasswordRequired");
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = t("changePassword.validation.newPasswordRequired");
    } else if (!passwordValidation.minLength) {
      newErrors.newPassword = t("changePassword.validation.passwordTooShort");
    } else if (!passwordValidation.hasUpperCase || !passwordValidation.hasLowerCase || !passwordValidation.hasNumbers || !passwordValidation.hasSpecialChar) {
      newErrors.newPassword = t("changePassword.validation.passwordRequirements");
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = t("changePassword.validation.confirmPasswordRequired");
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t("changePassword.validation.passwordsDoNotMatch");
    }

    if (formData.oldPassword === formData.newPassword) {
      newErrors.newPassword = t("changePassword.validation.samePassword");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changePasswordMutation = useMutation({
    mutationFn: (passwordData) =>
      customFetch.put("/update-password", passwordData).then((res) => res.data),
    onSuccess: (data) => {
      toast.success(data.message || t("changePassword.success"));
      // Logout user after successful password change
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || t("changePassword.error");
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    changePasswordMutation.mutate({
      current_password: formData.oldPassword,
      password: formData.newPassword,
      password_confirmation: formData.confirmPassword,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const passwordValidation = validatePassword(formData.newPassword);

  return (
    <div className="p-6">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F1A43] mb-2">
            {t("changePassword.title")}
          </h1>
          <p className="text-gray-600">
            {t("changePassword.subtitle")}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Old Password */}
              <div className="space-y-2">
                <label htmlFor="oldPassword" className="block text-sm font-semibold text-gray-800">
                  {t("changePassword.oldPassword")}
                </label>
                <div className="relative group">
                  <input
                    id="oldPassword"
                    name="oldPassword"
                    type={showPasswords.oldPassword ? "text" : "password"}
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#F47621]/20 focus:border-[#F47621] text-base transition-all duration-200 ${
                      errors.oldPassword ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300 focus:bg-white"
                    }`}
                    placeholder={t("changePassword.oldPasswordPlaceholder")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => togglePasswordVisibility("oldPassword")}
                  >
                    {showPasswords.oldPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.oldPassword && (
                  <div className="flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                    <FaTimes className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{errors.oldPassword}</span>
                  </div>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-800">
                  {t("changePassword.newPassword")}
                </label>
                <div className="relative group">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPasswords.newPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#F47621]/20 focus:border-[#F47621] text-base transition-all duration-200 ${
                      errors.newPassword ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300 focus:bg-white"
                    }`}
                    placeholder={t("changePassword.newPasswordPlaceholder")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  >
                    {showPasswords.newPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <div className="flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                    <FaTimes className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{errors.newPassword}</span>
                  </div>
                )}
              
              {/* Password Requirements */}
              {formData.newPassword && (
                <div className="mt-2 text-xs text-gray-600">
                  <p className="mb-1">{t("changePassword.passwordRequirements")}:</p>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      {passwordValidation.minLength ? (
                        <FaCheck className="text-green-500 mr-1 h-3 w-3" />
                      ) : (
                        <FaTimes className="text-red-500 mr-1 h-3 w-3" />
                      )}
                      <span className={passwordValidation.minLength ? "text-green-600" : "text-red-600"}>
                        {t("changePassword.requirements.minLength")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {passwordValidation.hasUpperCase ? (
                        <FaCheck className="text-green-500 mr-1 h-3 w-3" />
                      ) : (
                        <FaTimes className="text-red-500 mr-1 h-3 w-3" />
                      )}
                      <span className={passwordValidation.hasUpperCase ? "text-green-600" : "text-red-600"}>
                        {t("changePassword.requirements.uppercase")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {passwordValidation.hasLowerCase ? (
                        <FaCheck className="text-green-500 mr-1 h-3 w-3" />
                      ) : (
                        <FaTimes className="text-red-500 mr-1 h-3 w-3" />
                      )}
                      <span className={passwordValidation.hasLowerCase ? "text-green-600" : "text-red-600"}>
                        {t("changePassword.requirements.lowercase")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {passwordValidation.hasNumbers ? (
                        <FaCheck className="text-green-500 mr-1 h-3 w-3" />
                      ) : (
                        <FaTimes className="text-red-500 mr-1 h-3 w-3" />
                      )}
                      <span className={passwordValidation.hasNumbers ? "text-green-600" : "text-red-600"}>
                        {t("changePassword.requirements.numbers")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {passwordValidation.hasSpecialChar ? (
                        <FaCheck className="text-green-500 mr-1 h-3 w-3" />
                      ) : (
                        <FaTimes className="text-red-500 mr-1 h-3 w-3" />
                      )}
                      <span className={passwordValidation.hasSpecialChar ? "text-green-600" : "text-red-600"}>
                        {t("changePassword.requirements.specialChar")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                {t("changePassword.confirmPassword")}
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F47621] focus:border-[#F47621] text-sm ${
                    errors.confirmPassword ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder={t("changePassword.confirmPasswordPlaceholder")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPasswords.confirmPassword ? (
                    <FaEyeSlash className="h-4 w-4 text-gray-400" />
                  ) : (
                    <FaEye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={changePasswordMutation.isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F47621] hover:bg-[#E55A1A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F47621] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {changePasswordMutation.isPending
                  ? t("changePassword.changing")
                  : t("changePassword.changeButton")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
