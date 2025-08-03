import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { TbRefresh, TbHome, TbBug } from 'react-icons/tb';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            showDetails: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Log error to monitoring service
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleRefresh = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    handleReportError = () => {
        // In a real app, this would send error details to a reporting service
        const errorReport = {
            error: this.state.error?.toString(),
            stack: this.state.error?.stack,
            errorInfo: this.state.errorInfo,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };

        // You would send this to your error reporting service
        alert('Error report has been logged. Please contact support if the issue persists.');
    };

    toggleDetails = () => {
        this.setState(prevState => ({ showDetails: !prevState.showDetails }));
    };

    render() {
        if (this.state.hasError) {
            return <ErrorBoundaryUI
                error={this.state.error}
                errorInfo={this.state.errorInfo}
                showDetails={this.state.showDetails}
                onRefresh={this.handleRefresh}
                onGoHome={this.handleGoHome}
                onReportError={this.handleReportError}
                onToggleDetails={this.toggleDetails}
            />;
        }

        return this.props.children;
    }
}

const ErrorBoundaryUI = ({
    error,
    errorInfo,
    showDetails,
    onRefresh,
    onGoHome,
    onReportError,
    onToggleDetails
}) => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <HiOutlineExclamationTriangle
                        className="text-red-500 w-16 h-16"
                        aria-hidden="true"
                    />
                </div>

                {/* Error Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('errorBoundary.title')}
                </h1>

                {/* Error Description */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                    {t('errorBoundary.description')}
                </p>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                    <button
                        onClick={onRefresh}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                        aria-label={t('errorBoundary.refresh')}
                    >
                        <TbRefresh className="w-5 h-5" />
                        {t('errorBoundary.refresh')}
                    </button>

                    <button
                        onClick={onGoHome}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                        aria-label={t('errorBoundary.goHome')}
                    >
                        <TbHome className="w-5 h-5" />
                        {t('errorBoundary.goHome')}
                    </button>

                    <button
                        onClick={onReportError}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                        aria-label={t('errorBoundary.reportError')}
                    >
                        <TbBug className="w-5 h-5" />
                        {t('errorBoundary.reportError')}
                    </button>
                </div>

                {/* Error Details Toggle */}
                <button
                    onClick={onToggleDetails}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
                    aria-expanded={showDetails}
                    aria-controls="error-details"
                >
                    {showDetails ? t('errorBoundary.hideDetails') : t('errorBoundary.showDetails')}
                </button>

                {/* Error Details */}
                {showDetails && (
                    <div
                        id="error-details"
                        className="mt-4 p-4 bg-gray-100 rounded-lg text-left text-sm"
                        role="region"
                        aria-label={t('errorBoundary.errorDetails')}
                    >
                        <h3 className="font-semibold text-gray-900 mb-2">
                            {t('errorBoundary.errorDetails')}:
                        </h3>
                        <div className="text-gray-700 font-mono text-xs space-y-2">
                            {error && (
                                <div>
                                    <strong>{t('errorBoundary.errorLabel')}</strong>
                                    <pre className="mt-1 whitespace-pre-wrap break-words">
                                        {error.toString()}
                                    </pre>
                                </div>
                            )}
                            {errorInfo && errorInfo.componentStack && (
                                <div>
                                    <strong>{t('errorBoundary.componentStackLabel')}</strong>
                                    <pre className="mt-1 whitespace-pre-wrap break-words">
                                        {errorInfo.componentStack}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ErrorBoundary;
