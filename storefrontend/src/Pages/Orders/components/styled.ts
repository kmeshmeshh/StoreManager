import styled, { keyframes } from "styled-components";
import { BorderRadius, Colors, FontSize, FontWeight, Spacing } from "../../../constants/theme.constants";
import InputField from "../../../shared/ui/input-field";
import Button from "../../../shared/ui/button";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${Spacing.xl};
  align-items: start;
`;

export const CColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.lg};
`;

export const Card = styled.div`
  background: ${Colors.white};
  padding: ${Spacing.lg};
  border-radius: ${BorderRadius.md};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

export const ExtraInfoCard = styled(Card)`
  background-color: ${Colors.hover}; 
  border: 1px dashed ${Colors.border};
`;

export const Label = styled.label<{ $fontSize?: string }>`
  display: block;
  font-weight: ${FontWeight.semibold};
  color: ${Colors.dark};
  font-size: ${props => props.$fontSize || 'inherit'};
  margin: 0 0 ${Spacing.sm} 0;
`;

export const SmallLabel = styled(Label)`
  font-size: ${FontSize.sm};
  margin-bottom: ${Spacing.sm};
`;

export const ScanHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.sm};
  margin-bottom: ${Spacing.md};
  color: ${Colors.gray}; 
`;

export const ExtraInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.sm};
  margin-bottom: ${Spacing.lg};
  color: ${Colors.gray};
`;

export const ExtraInfoTitle = styled.span`
  font-weight: ${FontWeight.semibold};
  font-size: ${FontSize.lg};
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${Spacing.md};
  margin-top: ${Spacing.sm};
`;

export const SearchInput = styled(InputField)``;

export const LoadingState = styled.div`
  text-align: center;
  padding: ${Spacing.xl};
  color: ${Colors.gray};
`;

export const Spinner = styled.div`
  display: inline-block;
  width: ${Spacing.lg};
  height: ${Spacing.lg};
  border: 3px solid ${Colors.primary};
  border-radius: ${BorderRadius.full};
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
`;

export const ErrorState = styled.div`
  background: ${Colors.error}15;
  color: ${Colors.error};
  padding: ${Spacing.md};
  border-radius: ${BorderRadius.xl};
  display: flex;
  align-items: center;
  gap: ${Spacing.sm};
  font-weight: ${FontWeight.bold};
`;

export const ProductCard = styled.div`
  background: ${Colors.white};
  border-radius: ${BorderRadius.md};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid ${Colors.border};
  margin-bottom: ${Spacing.xl};
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ProductHeader = styled.div`
  background: ${Colors.primary}15; 
  padding: ${Spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;

  span:first-child {
    color: ${Colors.primary};
    font-weight: ${FontWeight.bold};
    font-size: ${FontSize.lg};
  }
`;

export const ProductContent = styled.div`
  padding: ${Spacing.lg};
  
  h3 {
    margin-top: 0;
    margin-bottom: ${Spacing.sm};
    font-size: ${FontSize['4xl']};
    color: ${Colors.dark};
  }
`;

export const InfoGrid = styled.div`
  display: flex;
  gap: ${Spacing.md};
  margin: ${Spacing.lg} 0;
`;

export const InfoBox = styled.div`
  flex: 1;
  background: ${Colors.lightGray};
  padding: ${Spacing.xs};
  border-radius: ${BorderRadius.xl};
  text-align: center;
`;

export const InfoLabel = styled.div`
  font-size: ${FontSize.sm};
  color: ${Colors.gray};
  margin-bottom: 0.3rem;
`;

export const InfoValue = styled.div<{ $isDanger?: boolean }>`
  font-size: ${FontSize['3xl']};
  font-weight: ${FontWeight.extrabold};
  color: ${props => props.$isDanger ? Colors.error : Colors.dark};
`;

export const ActionRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${Spacing.sm};
`;

export const FlexButtonWrapper = styled.div`
  flex: 1;
  button {
    width: 100%;
  }
`;

export const QuantityWrapper = styled.div`
  position: relative;
  width: 120px;
`;

export const QuantityInput = styled(InputField)``;

export const QuantityLabel = styled.span`
  position: absolute;
  top: -8px;
  right: 10px;
  background: ${Colors.white};
  padding: 0 4px;
  font-size: ${FontSize.sm};
  color: ${Colors.gray};
`;

export const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${Spacing.lg};
`;

export const InputRow = styled.div`
  margin-top: ${Spacing.lg};
`;

export const RelativeInputWrapper = styled.div`
  position: relative;
`;

export const StyledInputField = styled(InputField) <{ $isError?: boolean }>`
  border-color: ${props => props.$isError ? Colors.error : Colors.border} !important;
  color: ${props => props.$isError ? Colors.error : Colors.dark};
`;

export const InputIconPosition = styled.div<{ $isError?: boolean }>`
  position: absolute;
  left: 10px;
  top: 12px;
  color: ${props => props.$isError ? Colors.error : Colors.gray};
  pointer-events: none;
`;

export const CartContainer = styled.div`
  background: ${Colors.white};
  border-radius: ${BorderRadius.md};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 250px);
  position: sticky;
  top: ${Spacing.xl};
`;

export const CartHeader = styled.div`
  padding: ${Spacing.md};
  border-bottom: 1px solid ${Colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.sm};

  h2 {
    margin: 0;
    font-size: ${FontSize.xl};
  }
`;

export const CartIconBox = styled.div`
  background: ${Colors.primary}20;
  padding: ${Spacing.xs} ${Spacing.sm} ;
  border-radius: ${BorderRadius.lg};
  color: ${Colors.primary};
`;

export const CartBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${Spacing.md};
`;

export const EmptyCartState = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${Colors.gray};
  opacity: 0.6;
  
  p {
    margin: ${Spacing.xs} 0;
  }
`;

export const EmptyCartTitle = styled.p`
  font-size: ${FontSize.lg};
`;

export const TablePriceText = styled.span`
  color: ${Colors.gray};
`;

export const TableTotalText = styled.span`
  font-weight: ${FontWeight.bold};
`;

export const CartFooter = styled.div`
  padding: ${Spacing.lg};
  background: ${Colors.skeletonHighlight};
  border-top: 1px solid ${Colors.border};
  border-radius: 0 0 ${BorderRadius.md} ${BorderRadius.md};
`;

export const FullWidthButtonWrapper = styled.div`
  width: 100%;
  button {
    width: 100%;
  }
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${Spacing.md};
`;

export const TotalLabel = styled.span`
  font-size: ${FontSize.lg};
  color: ${Colors.gray};
  font-weight: ${FontWeight.semibold};
`;

export const TotalValue = styled.span`
  font-size: ${FontSize["4xl"]};
  font-weight: ${FontWeight.extrabold};
  color: ${Colors.dark};
  line-height: 1;
`;

export const TotalCurrency = styled.span`
  font-size: ${FontSize.xl};
  color: ${Colors.gray};
  font-weight: ${FontWeight.medium};
`;

export const AlertBanner = styled.div`
    display: flex;
    gap: ${Spacing.lg};
    width: 100%;
    height: 40px;
    background-color: ${Colors.warningLight};
    padding: ${Spacing.sm};
    color: ${Colors.warning};
    margin-top: ${Spacing.sm};
`;

export const AlertBannerText = styled.p`
    font-weight: ${FontWeight.bold};
    margin: 0;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Spacing.sm};
  padding-bottom: ${Spacing.sm};
  border-bottom: 1px dashed ${Colors.border};
`;

export const SummaryLabel = styled.span`
  font-size: ${FontSize.lg};
  color: ${Colors.gray};
`;

export const SummaryValue = styled.span<{ $isDiscount?: boolean; $isError?: boolean }>`
  font-size: ${FontSize.lg};
  font-weight: ${FontWeight.semibold};
  color: ${props => props.$isError ? Colors.error : Colors.dark};
  text-decoration: ${props => (props.$isDiscount && props.$isError) ? 'line-through' : 'none'};
  opacity: ${props => (props.$isDiscount && props.$isError) ? 0.5 : 1};
`;

export const InputErrorText = styled.span`
  display: block;
  color: ${Colors.error};
  font-size: ${FontSize.sm};
  margin-top: ${Spacing.xs};
  font-weight: ${FontWeight.semibold};
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.xs};
`;

export const CompactButton = styled(Button)`
  padding: ${Spacing.xs};
`;

export const QuantityValue = styled.span`
  min-width: 20px;
  text-align: center;
  font-weight: ${FontWeight.bold};
`;