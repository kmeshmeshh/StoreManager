import styled from "styled-components";
import {
    Colors,
    Spacing,
    BorderRadius,
    FontSize,
    FontWeight,
} from "../../../constants/theme.constants";

export const AlertBanner = styled.div`
  background: ${Colors.warningLight};
  border: 1px solid ${Colors.warning};
  border-radius: ${BorderRadius.md};
  padding: ${Spacing.md};
  margin-bottom: ${Spacing.md};
  font-size: ${FontSize.lg};
  min-width:300px;
  strong {
    color: ${Colors.warning};
  }
`;

export const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.md};
  overflow-y: auto;
`;

export const ProductCard = styled.div`
  border: 1px solid ${Colors.border};
  border-radius: ${BorderRadius.lg};
  padding: ${Spacing.md};
  background: ${Colors.white};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Spacing.sm};

  h3 {
    margin: 0;
    font-size: ${FontSize.xl};
  }
`;

export const QuantityBadge = styled.span<{ critical: boolean }>`
  background: ${({ critical }) =>
        critical ? Colors.error : Colors.warning};
  color: ${Colors.white};
  padding: 4px 10px;
  border-radius: ${BorderRadius.full};
  font-size: ${FontSize.sm};
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.xs};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${FontSize.lg};
`;

export const CenterText = styled.p`
  text-align: center;
  font-size: ${FontSize.lg};
`;

export const ErrorText = styled.p`
  color: ${Colors.error};
  text-align: center;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${Spacing.xl};

  span {
    color: ${Colors.gray};
  }
`;

export const EmptyIcon = styled.div`
  font-size: ${FontSize["4xl"]};
  color: ${Colors.success};
`;