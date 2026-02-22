import styled, { keyframes } from "styled-components";
import { BorderRadius, Colors, FontSize, FontWeight, Spacing } from "../../../constants/theme.constants";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const MainRow = styled.tr<{ $isOpen: boolean }>`
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.$isOpen ? Colors.hover : Colors.white)};
  border-left: 4px solid ${(props) => (props.$isOpen ? Colors.info : "transparent")};

  &:hover {
    background: ${Colors.hover};
  }

  td {
    padding: ${Spacing.lg};
    border-bottom: 1px solid ${Colors.border};
    color: ${Colors.dark};
    font-size: ${FontSize.lg};
  }
`;

export const ExpandButton = styled.div<{ $isOpen: boolean }>`
  width: ${Spacing.xl};
  height: ${Spacing.xl};
  border-radius: ${BorderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.$isOpen ? `${Colors.info}1a` : Colors.lightGray)}; 
  color: ${(props) => (props.$isOpen ? Colors.info : Colors.gray)};
  transition: all 0.3s;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

export const DetailsRow = styled.tr<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "table-row" : "none")};
  animation: ${fadeIn} 0.3s ease-in-out;

  td {
    padding: 0;
    border-bottom: 1px solid ${Colors.border};
  }
`;

export const DetailsContainer = styled.div`
  padding: ${Spacing.lg} ${Spacing.xl};
  background: ${Colors.hover};
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.02);
`;

export const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Spacing.sm};
`;

export const DetailsTitle = styled.h4`
  margin: 0;
  color: ${Colors.dark};
`;

export const DetailsCount = styled.span`
  font-size: ${FontSize.sm};
  color: ${Colors.gray};
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${Spacing.md};
  margin-top: ${Spacing.md};
`;

export const ProductCard = styled.div`
  background: ${Colors.white};
  border-radius: ${BorderRadius.xl};
  padding: ${Spacing.md};
  border: 1px solid ${Colors.border};
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: ${Colors.gray}; 
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.div`
  font-weight: ${FontWeight.semibold};
  color: ${Colors.dark};
  margin-bottom: ${Spacing.xs};
`;

export const ProductCategory = styled.div`
  font-size: ${FontSize.sm};
  color: ${Colors.gray};
  background: ${Colors.lightGray};
  padding: 2px ${Spacing.sm};
  border-radius: ${BorderRadius.sm};
  width: fit-content;
`;

export const ProductDeletedBadge = styled.div`
  font-size: ${FontSize.sm};
  color: ${Colors.warning};
  background: ${Colors.warningLight};
  padding: 2px ${Spacing.sm};
  border-radius: ${BorderRadius.sm};
  width: fit-content;
  margin-top: 5px;
`;

export const ProductPrice = styled.div`
  text-align: left;
`;

export const PriceValue = styled.div`
  font-weight: ${FontWeight.bold};
  color: ${Colors.success};
`;

export const QuantityValue = styled.div`
  font-size: ${FontSize.sm};
  color: ${Colors.gray};
  margin-top: 2px;
`;

export const PriceBadge = styled.span`
  background: ${Colors.success}1a; 
  color: ${Colors.success};
  padding: ${Spacing.sm} ${Spacing.md};
  border-radius: ${BorderRadius.full};
  font-weight: ${FontWeight.bold};
  font-size: ${FontSize.lg};
`;

export const DateBadge = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateText = styled.span`
  font-weight: ${FontWeight.semibold};
  color: ${Colors.dark};
`;

export const TimeText = styled.span`
  font-size: ${FontSize.sm};
  color: ${Colors.gray};
`;

export const OrderId = styled.span`
  font-weight: ${FontWeight.bold};
  color: ${Colors.info};
`;

export const SummaryFooter = styled.div`
  margin-top: ${Spacing.xl};
  border-top: 1px dashed ${Colors.border};
  padding-top: ${Spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${Spacing['2xl']};
`;

export const SummaryColumn = styled.div`
  text-align: left;
`;

export const SummaryLabel = styled.div<{ $color?: string }>`
  color: ${props => props.$color || Colors.gray};
  font-size: ${FontSize.lg};
`;

export const SummaryValue = styled.div<{ $isStrikethrough?: boolean; $color?: string; $size?: string }>`
  color: ${props => props.$color || Colors.gray};
  font-weight: ${FontWeight.bold};
  font-size: ${props => props.$size === 'lg' ? FontSize['3xl'] : FontSize.xl};
  text-decoration: ${props => props.$isStrikethrough ? 'line-through' : 'none'};
`;