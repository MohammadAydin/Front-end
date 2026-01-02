import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { FaWallet } from "react-icons/fa";
import FileUploader from "../FormElements/FileUploader";

const DepositFundsModal = ({ isOpen, setIsOpen }) => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [fileName, setFileName] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            amount: "",
            deposit_proof: null,
        },
    });

    const depositProof = watch("deposit_proof");

    const depositMutation = useMutation({
        mutationFn: (formData) =>
            customFetch
                .post("/employer/wallet/deposit", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => res.data),

        onSuccess: (data) => {
            toast.success(data.message || t("Wallet.depositSuccess"));
            queryClient.invalidateQueries({ queryKey: ["/employer/wallet"] });
            queryClient.invalidateQueries({ queryKey: ["/employer/wallet/transactions"] });
            queryClient.invalidateQueries({ queryKey: ["/employer/wallet/deposits"] });
            setIsOpen(false);
            reset();
            setFileName("");
        },

        onError: (error) => {
            const errorMessage =
                error?.response?.data?.message ||
                error?.response?.data?.errors?.amount?.[0] ||
                error?.response?.data?.errors?.deposit_proof?.[0] ||
                t("Wallet.depositError");
            toast.error(errorMessage);
        },
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                toast.error(t("Wallet.invalidFileType"));
                e.target.value = ''; // Reset input
                return;
            }
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error(t("Wallet.fileTooLarge"));
                e.target.value = ''; // Reset input
                return;
            }
            setValue("deposit_proof", file, { shouldValidate: true });
            setFileName(file.name);
        } else {
            setValue("deposit_proof", null, { shouldValidate: true });
            setFileName("");
        }
    };

    const onSubmit = (data) => {
        // Validate file is selected
        if (!data.deposit_proof || !(data.deposit_proof instanceof File)) {
            toast.error(t("Wallet.proofRequired"));
            return;
        }

        const formData = new FormData();
        formData.append("amount", data.amount);
        formData.append("deposit_proof", data.deposit_proof);

        depositMutation.mutate(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FaWallet size={24} className="text-white" />
                        <h2 className="text-2xl font-bold text-white">
                            {t("Wallet.depositFunds")}
                        </h2>
                    </div>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            reset();
                            setFileName("");
                        }}
                        className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Info Message */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                {t("Wallet.depositInfo")}
                            </p>
                        </div>

                        {/* Amount Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {t("Wallet.depositAmount")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="1"
                                {...register("amount", {
                                    required: t("Wallet.amountRequired"),
                                    min: {
                                        value: 1,
                                        message: t("Wallet.amountMin"),
                                    },
                                    pattern: {
                                        value: /^\d+(\.\d{1,2})?$/,
                                        message: t("Wallet.amountFormat"),
                                    },
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
                                placeholder="0.00"
                            />
                            {errors.amount && (
                                <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                            )}
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {t("Wallet.depositProof")} <span className="text-red-500">*</span>
                            </label>
                            <div
                                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#F47621] transition-colors cursor-pointer"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    if (file) {
                                        // Validate file type
                                        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                                        if (!validTypes.includes(file.type)) {
                                            toast.error(t("Wallet.invalidFileType"));
                                            return;
                                        }
                                        // Validate file size (5MB)
                                        if (file.size > 5 * 1024 * 1024) {
                                            toast.error(t("Wallet.fileTooLarge"));
                                            return;
                                        }
                                        setValue("deposit_proof", file, { shouldValidate: true });
                                        setFileName(file.name);
                                    }
                                }}
                            >
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="deposit_proof"
                                />
                                <label htmlFor="deposit_proof" className="cursor-pointer">
                                    {fileName ? (
                                        <div className="text-center">
                                            <p className="text-[#F47621] font-semibold">{fileName}</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                {t("Wallet.clickToChange")}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-gray-600 mb-2">
                                                {t("formElements.fileUploader.dropFiles")}
                                                <span className="text-[#F47621]">
                                                    {" "}
                                                    {t("formElements.fileUploader.browse")}{" "}
                                                </span>
                                                {t("formElements.fileUploader.throughDevice")}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {t("Wallet.fileTypes")}: JPG, PNG, PDF (Max 5MB)
                                            </p>
                                        </div>
                                    )}
                                </label>
                            </div>
                            {!depositProof && (
                                <p className="text-red-500 text-sm mt-1">
                                    {t("Wallet.proofRequired")}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 mt-6 pt-6 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                reset();
                                setFileName("");
                            }}
                            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                            {t("common.cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={depositMutation.isPending}
                            className="px-6 py-2 bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {depositMutation.isPending ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>{t("common.saving")}</span>
                                </>
                            ) : (
                                t("Wallet.submitDeposit")
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DepositFundsModal;
