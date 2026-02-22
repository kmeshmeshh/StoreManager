import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  margin: 20px auto;
  background-color: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 12px;
  max-width: 100%;
  height: 100%;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const IconWrapper = styled.div`
  font-size: 40px;
  margin-bottom: 16px;
`;

export const ErrorTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #991B1B;
  font-size: 18px;
  font-weight: 600;
`;

export const ErrorDescription = styled.p`
  margin: 0 0 24px 0;
  color: #7F1D1D;
  font-size: 14px;
  line-height: 1.5;
`;