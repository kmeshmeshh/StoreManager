import { useEffect } from "react";
import { Camera, X, AlertCircle, RefreshCw } from "lucide-react";
import { useBarcodeScanner } from "../hooks/useBarcodeScanner";

import {
    ScannerContainer,
    ScannerHeader,
    ScannerHeaderLeft,
    LiveDot,
    CloseBtn,
    Viewfinder,
    ScanLineAnimator,
    CornerTL, CornerTR, CornerBL, CornerBR,
    ScannerFooter,
    ScannerLoading,
    ScannerSpinner,
    ScannerError,
    HintRow,
    SuccessBanner,
} from "./styled";
import { CheckCircle2 } from "lucide-react";

const SCANNER_ID = "inline-barcode-reader";

interface Props {
    onDetected: (code: string) => void;
    onClose: () => void;
}

const InlineScanner = ({ onDetected, onClose }: Props) => {
    const { start, stop, state, lastCode } = useBarcodeScanner(SCANNER_ID, (code) => {
        onDetected(code);
        // اقفل الكاميرا بعد ما يلاقي كود — delay عشان الـ user يشوف النتيجة
        setTimeout(() => {
            stop();
            onClose();
        }, 1200);
    });

    useEffect(() => {
        // شغل الكاميرا أول ما الكمبوننت يظهر
        const timer = setTimeout(() => start(), 200);
        return () => {
            clearTimeout(timer);
            stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ScannerContainer>
                {/* Header */}
                <ScannerHeader>
                    <ScannerHeaderLeft>
                        <Camera size={16} />
                        <span>ماسح الباركود</span>
                        {state === "scanning" && <LiveDot />}
                        {state === "starting" && <LiveDot $color="#f59e0b" />}
                        {state === "success" && <LiveDot $color="#3b82f6" />}
                    </ScannerHeaderLeft>
                    <CloseBtn onClick={() => { stop(); onClose(); }} title="إغلاق الكاميرا">
                        <X size={16} />
                    </CloseBtn>
                </ScannerHeader>

                {/* Camera Body */}
                {state === "starting" && (
                    <ScannerLoading>
                        <ScannerSpinner />
                        <span>جاري تشغيل الكاميرا...</span>
                    </ScannerLoading>
                )}

                {state === "error" && (
                    <ScannerError>
                        <AlertCircle size={32} />
                        <p>تعذر الوصول للكاميرا</p>
                        <p>تأكد إن الكاميرا مش مستخدمة من تطبيق تاني وإن المتصفح عنده إذن</p>
                        <button onClick={start}>
                            <RefreshCw size={14} /> إعادة المحاولة
                        </button>
                    </ScannerError>
                )}

                {(state === "scanning" || state === "success") && (
                    <Viewfinder>
                        <div id={SCANNER_ID} />
                        {state === "scanning" && <ScanLineAnimator />}
                        <CornerTL />
                        <CornerTR />
                        <CornerBL />
                        <CornerBR />
                    </Viewfinder>
                )}

                {/* Footer */}
                <ScannerFooter>
                    {state === "scanning" && (
                        <HintRow>
                            <Camera size={14} />
                            وجّه الباركود للكاميرا — الكشف تلقائي
                        </HintRow>
                    )}
                    {state === "success" && (
                        <HintRow>
                            <CheckCircle2 size={14} />
                            تم الكشف! جاري البحث...
                        </HintRow>
                    )}
                    {state === "starting" && <span>جاري التحضير...</span>}
                    {state === "error" && <span>⚠️ مشكلة في الكاميرا</span>}
                </ScannerFooter>
            </ScannerContainer>

            {/* Success Banner - تحت الكاميرا */}
            {state === "success" && lastCode && (
                <SuccessBanner>
                    <CheckCircle2 size={18} />
                    تم المسح:
                    <span>{lastCode}</span>
                </SuccessBanner>
            )}
        </>
    );
};

export default InlineScanner;