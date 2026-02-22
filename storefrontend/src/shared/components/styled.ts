import styled, { keyframes, css } from "styled-components";

/* ─── Animations ─── */
const scanLine = keyframes`
    0%   { top: 20px; }
    50%  { top: calc(100% - 22px); }
    100% { top: 20px; }
`;

const slideDown = keyframes`
    from { opacity: 0; max-height: 0; transform: translateY(-10px); }
    to   { opacity: 1; max-height: 600px; transform: translateY(0); }
`;

const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.4; }
`;

const pop = keyframes`
    0%   { transform: scale(0.8); opacity: 0; }
    50%  { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
`;

/* ─── Scan Button (next to search) ─── */
export const ScanButton = styled.button<{ $isActive?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0 1rem;
    height: 100%;
    min-height: 42px;
    border: 2px solid ${({ $isActive }) => ($isActive ? "#22c55e" : "#e5e7eb")};
    border-radius: 10px;
    background: ${({ $isActive }) => ($isActive ? "#f0fdf4" : "#f9fafb")};
    color: ${({ $isActive }) => ($isActive ? "#16a34a" : "#6b7280")};
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        border-color: ${({ $isActive }) => ($isActive ? "#16a34a" : "#3b82f6")};
        background: ${({ $isActive }) => ($isActive ? "#dcfce7" : "#eff6ff")};
        color: ${({ $isActive }) => ($isActive ? "#16a34a" : "#3b82f6")};
    }

    svg {
        flex-shrink: 0;
    }
`;

/* ─── Scanner Container ─── */
export const ScannerContainer = styled.div`
    animation: ${slideDown} 0.35s ease forwards;
    overflow: hidden;
    margin-top: 0.75rem;
    border-radius: 14px;
    border: 2px solid #e5e7eb;
    background: #111;
`;

/* ─── Scanner Header ─── */
export const ScannerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.65rem 1rem;
    background: #1a1a2e;
    border-bottom: 1px solid #2a2a4a;
`;

export const ScannerHeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #e2e8f0;
    font-size: 0.85rem;
    font-weight: 500;
`;

export const LiveDot = styled.span<{ $color?: string }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $color }) => $color || "#22c55e"};
    box-shadow: 0 0 8px ${({ $color }) => $color || "#22c55e"}80;
    animation: ${pulse} 1.5s infinite;
`;

export const CloseBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
        background: rgba(239, 68, 68, 0.3);
        color: #fca5a5;
    }
`;

/* ─── Viewfinder ─── */
export const Viewfinder = styled.div`
    position: relative;
    width: 100%;
    min-height: 300px;
    background: #000;

    & > div {
        width: 100% !important;
    }

    video {
        width: 100% !important;
        object-fit: cover;
    }
`;

export const ScanLineAnimator = styled.div`
    position: absolute;
    left: 5%;
    width: 90%;
    height: 2px;
    z-index: 3;
    pointer-events: none;
    background: linear-gradient(90deg, transparent 0%, #22c55e 30%, #4ade80 50%, #22c55e 70%, transparent 100%);
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.2);
    animation: ${scanLine} 2.5s ease-in-out infinite;
`;

/* Corner brackets */
const cornerBase = css`
    position: absolute;
    width: 24px;
    height: 24px;
    z-index: 2;
    pointer-events: none;
`;

export const CornerTL = styled.div`
    ${cornerBase}
    top: 16px; left: 16px;
    border-top: 3px solid #22c55e;
    border-left: 3px solid #22c55e;
    border-radius: 4px 0 0 0;
`;
export const CornerTR = styled.div`
    ${cornerBase}
    top: 16px; right: 16px;
    border-top: 3px solid #22c55e;
    border-right: 3px solid #22c55e;
    border-radius: 0 4px 0 0;
`;
export const CornerBL = styled.div`
    ${cornerBase}
    bottom: 16px; left: 16px;
    border-bottom: 3px solid #22c55e;
    border-left: 3px solid #22c55e;
    border-radius: 0 0 0 4px;
`;
export const CornerBR = styled.div`
    ${cornerBase}
    bottom: 16px; right: 16px;
    border-bottom: 3px solid #22c55e;
    border-right: 3px solid #22c55e;
    border-radius: 0 0 4px 0;
`;

/* ─── Scanner Footer ─── */
export const ScannerFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: #1a1a2e;
    border-top: 1px solid #2a2a4a;
    color: #94a3b8;
    font-size: 0.8rem;
`;

/* ─── Success Banner ─── */
export const SuccessBanner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    margin-top: 0.5rem;
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 10px;
    color: #16a34a;
    font-weight: 600;
    font-size: 0.9rem;
    animation: ${pop} 0.3s ease;

    span {
        direction: ltr;
        font-family: monospace;
        font-size: 1rem;
        background: #dcfce7;
        padding: 0.15rem 0.5rem;
        border-radius: 6px;
    }
`;

/* ─── Loading State ─── */
export const ScannerLoading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 3rem 1rem;
    color: #94a3b8;
    font-size: 0.85rem;
    min-height: 300px;
`;

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

export const ScannerSpinner = styled.div`
    width: 36px;
    height: 36px;
    border: 3px solid #334155;
    border-top-color: #22c55e;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;

/* ─── Error State ─── */
export const ScannerError = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 2.5rem 1rem;
    color: #94a3b8;
    font-size: 0.85rem;
    min-height: 300px;
    text-align: center;

    svg {
        color: #f87171;
    }

    button {
        margin-top: 0.5rem;
        padding: 0.4rem 1rem;
        border: 1px solid #475569;
        border-radius: 8px;
        background: #1e293b;
        color: #e2e8f0;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.15s;

        &:hover {
            background: #334155;
        }
    }
`;

/* ─── Hint text ─── */
export const HintRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.35rem;
    animation: ${pulse} 2s infinite;

    svg {
        color: #22c55e;
    }
`;