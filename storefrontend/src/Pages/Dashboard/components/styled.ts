import styled from 'styled-components';
import { BorderRadius, Colors, FontSize, FontWeight, Spacing } from '../../../constants/theme.constants';

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;
  background-color: ${Colors.lightGray};
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${Spacing.lg};

  @media (max-width: 768px) {
    padding: ${Spacing.md};
  }
`;

export const LoadingContainer = styled.div`
  text-align: center;
  margin-top: 100px;
  font-size: ${FontSize['3xl']};
  color: ${Colors.gray};
`;

export const ErrorContainer = styled.div`
  text-align: center;
  margin-top: 100px;
  color: ${Colors.error};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Spacing.md};
  flex-wrap: wrap;
  gap: ${Spacing.md};
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: ${FontSize['3xl']};
  font-weight: ${FontWeight.bold};
  color: ${Colors.dark};
  margin: 0;
`;

export const SubTitle = styled.p`
  color: ${Colors.gray};
  font-size: ${FontSize.lg};
  margin-top: ${Spacing.md};
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: ${Spacing.lg};
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.lg};
`;

export const OverviewSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Spacing.md};
`;

export const SectionTitle = styled.h3`
  font-size: ${FontSize.lg};
  font-weight: ${FontWeight.bold};
  color: ${Colors.dark};
  margin: 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${Spacing.sm};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${Colors.white};
  padding: ${Spacing.lg};
  border-radius: ${BorderRadius.lg};
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
`;

export const StatIconBox = styled.div<{ $bg: string; $color: string }>`
  width: 35px;
  height: 35px;
  border-radius: ${BorderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${props => props.$bg};
  color: ${props => props.$color};
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatLabel = styled.h4`
  font-size: ${FontSize.lg}; 
  color: ${Colors.gray}; 
  margin-bottom: ${Spacing.md};
  margin-top: 0;
`;

export const StatValue = styled.p<{ $color?: string }>`
  font-size: ${FontSize.xl}; 
  font-weight: ${FontWeight.bold}; 
  color: ${props => props.$color || Colors.dark}; 
  margin: 0;
`;

export const StatSubtext = styled.span`
  font-size: ${FontSize.lg};
  color: #999;
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: ${Spacing.md};
`;

export const ChartCard = styled.div`
  background-color: ${Colors.white};
  border-radius: ${BorderRadius.xl};
  padding: ${Spacing.lg};
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  color: ${Colors.dark};
  position: relative;
  overflow: hidden;
`;

export const ChartContainer = styled.div`
  height: 180px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding-top: ${Spacing.md};
`;

export const EmptyState = styled.div`
  width: 100%;
  text-align: center;
  color: #999;
  padding: ${Spacing.md};
`;

export const ChartColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  flex: 1;
`;

export const ChartValue = styled.span<{ $visible: boolean; $active: boolean }>`
  font-size: ${FontSize.lg};
  font-weight: ${FontWeight.bold};
  margin-bottom: ${Spacing.md};
  color: ${props => props.$active ? Colors.success : Colors.gray};
  opacity: ${props => props.$visible ? 1 : 0};
  transition: all 0.3s;
`;

export const ChartBar = styled.div<{ $height: number; $active: boolean; $faded: boolean }>`
  height: ${props => props.$height}%;
  width: 14px;
  background-color: ${props => props.$active ? Colors.success : Colors.dark};
  border-radius: ${BorderRadius.sm};
  opacity: ${props => props.$faded ? 0.1 : 1};
  min-height: 4px;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.success};
    transform: scaleY(1.05);
  }
`;

export const ChartDay = styled.span`
  margin-top: 6px;
  font-size: ${FontSize.lg};
  font-weight: ${FontWeight.bold};
  color: ${Colors.gray};
`;

export const ShortageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.xl};
`;

export const ShortageItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
  padding: ${Spacing.sm} 0;
  border-bottom: 1px solid ${Colors.lightGray};
`;

export const ShortageCount = styled.div`
  width: 35px;
  height: 35px;
  background: #fee2e2;
  border-radius: ${BorderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #991b1b;
  font-weight: ${FontWeight.bold};
`;

export const ShortageInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShortageName = styled.div`
  font-size: ${FontSize.lg};
  font-weight: ${FontWeight.semibold};
`;

export const ShortageCategory = styled.div`
  font-size: ${FontSize.lg};
  color: ${Colors.gray};
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.lg};
`;

export const PremiumBanner = styled.div`
  background-color: ${Colors.dark};
  color: ${Colors.white};
  border-radius: ${BorderRadius.xl};
  padding: ${Spacing.lg};
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
`;

export const PremiumTitle = styled.h3`
  font-size: ${FontSize.lg};
  font-weight: ${FontWeight.bold};
  color: ${Colors.white};
  margin: 0;
`;

export const PremiumButton = styled.button`
  margin-top: ${Spacing.md};
  background: #d9f99d;
  color: ${Colors.dark};
  border: none;
  padding: ${Spacing.sm} ${Spacing.lg};
  border-radius: ${BorderRadius.full};
  font-weight: ${FontWeight.bold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.sm};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    background: #bef264;
  }
`;

export const CalendarCard = styled.div`
  background-color: ${Colors.white};
  border-radius: ${BorderRadius.xl};
  padding: ${Spacing.lg};
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  color: ${Colors.dark};
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Spacing.md};
`;

export const CalendarTitle = styled.h3`
  font-size: ${FontSize.xl};
  font-weight: ${FontWeight.bold};
  color: ${Colors.dark};
  margin: 0;
`;

export const CalendarGrid = styled.div`
  margin-top: ${Spacing.md};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${Spacing.md};
  text-align: center;
  font-size: ${FontSize.lg};
`;

export const WeekDay = styled.span`
  color: #999;
  font-weight: ${FontWeight.bold};
`;

export const CalendarDay = styled.span<{ $active: boolean }>`
  padding: 6px;
  background: ${props => props.$active ? '#d9f99d' : 'transparent'};
  border-radius: 50%;
  font-weight: ${props => props.$active ? FontWeight.bold : FontWeight.normal};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: ${props => !props.$active ? Colors.lightGray : '#d9f99d'};
  }
`;

export const ReturnStatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${Spacing.sm};

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ReturnStatCard = styled(StatCard)`
    border-right: 3px solid #fee2e2;
`;

export const ReturnChartBar = styled.div<{
    $height: number;
    $active: boolean;
    $faded: boolean;
}>`
    height: ${(props) => props.$height}%;
    width: 14px;
    background-color: ${(props) => (props.$active ? "#dc2626" : "#fca5a5")};
    border-radius: ${BorderRadius.sm};
    opacity: ${(props) => (props.$faded ? 0.1 : 1)};
    min-height: 4px;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
        background-color: #dc2626;
        transform: scaleY(1.05);
    }
`;


export const ChartLegend = styled.div`
    display: flex;
    align-items: center;
    gap: ${Spacing.lg};
    margin-bottom: ${Spacing.sm};
`;

export const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: ${FontSize.lg};
    color: ${Colors.gray};
`;

export const LegendDot = styled.div<{ $color: string }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => props.$color};
`;

export const RecentReturnsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
`;

export const RecentReturnItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${Spacing.md};
    padding: ${Spacing.md} 0;
    border-bottom: 1px solid ${Colors.lightGray};
    transition: background 0.2s;

    &:last-child {
        border-bottom: none;
    }

`;

export const ReturnItemId = styled.div`
    width: 50px;
    height: 50px;
    background: #fee2e2;
    border-radius: ${BorderRadius.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dc2626;
    font-weight: ${FontWeight.bold};
    font-size: ${FontSize.lg};
    flex-shrink: 0;
`;

export const ReturnItemInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: ${FontSize.lg};
    color: ${Colors.dark};

    strong {
        color: ${Colors.dark};
    }
`;

export const ReturnItemDate = styled.span`
    font-size: ${FontSize.lg};
    color: ${Colors.gray};
`;

export const ReturnItemNote = styled.span`
    font-size: ${FontSize.lg};
    color: ${Colors.gray};
    font-style: italic;
    margin-top: 2px;
`;

export const ReturnItemAmount = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-shrink: 0;

    span {
        font-weight: ${FontWeight.bold};
        color: #dc2626;
        font-size: ${FontSize.lg};
    }

    small {
        font-size: ${FontSize.lg};
        color: ${Colors.gray};
        margin-top: 2px;
    }
`;

export const SectionDivider = styled.hr`
    border: none;
    border-top: 1px solid ${Colors.lightGray};
    margin: ${Spacing.md} 0;
`;