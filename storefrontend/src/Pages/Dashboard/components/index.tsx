import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    TrendingUp,
    ShoppingBag,
    Shirt,
    Banknote,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Package,
    AlertTriangle,
} from 'lucide-react';
import { useGetDashboardOptions } from '../api/queries';
import { Colors } from '../../../constants/theme.constants';
import {
    Container,
    MainContent,
    LoadingContainer,
    ErrorContainer,
    Header,
    HeaderContent,
    Title,
    SubTitle,
    DashboardGrid,
    MiddleSection,
    OverviewSection,
    SectionHeader,
    SectionTitle,
    StatsGrid,
    StatCard,
    StatIconBox,
    StatInfo,
    StatLabel,
    StatValue,
    StatSubtext,
    ChartsRow,
    ChartCard,
    ChartContainer,
    EmptyState,
    ChartColumn,
    ChartValue,
    ChartBar,
    ChartDay,
    ShortageList,
    ShortageItem,
    ShortageCount,
    ShortageInfo,
    ShortageName,
    ShortageCategory,
    RightSection,
    PremiumBanner,
    PremiumTitle,
    PremiumButton,
    CalendarCard,
    CalendarHeader,
    CalendarTitle,
    CalendarGrid,
    WeekDay,
    CalendarDay,
    ReturnStatsGrid,
    ReturnStatCard,
    RecentReturnsList,
    RecentReturnItem,
    ReturnItemId,
    ReturnItemInfo,
    ReturnItemAmount,
    ReturnItemDate,
    ReturnItemNote,
    SectionDivider,
    ReturnChartBar,
    ChartLegend,
    LegendItem,
    LegendDot,
} from './styled';

const Dashboard = () => {
    const navigate = useNavigate();

    const getNormalizedDate = (y: number, mon: number, d: number) =>
        new Date(Date.UTC(y, mon, d));

    const now = new Date();
    const [date, setDate] = useState(() =>
        getNormalizedDate(now.getFullYear(), now.getMonth(), now.getDate())
    );

    const { data, isLoading, isError } = useGetDashboardOptions(date);

    const handlePrevMonth = () => {
        setDate(prev => {
            const year = prev.getFullYear();
            const month = prev.getMonth() - 1;
            return getNormalizedDate(year, month, 1);
        });
    };

    const handleNextMonth = () => {
        setDate(prev => {
            const year = prev.getFullYear();
            const month = prev.getMonth() + 1;
            return getNormalizedDate(year, month, 1);
        });
    };

    const getDaysInMonth = (dateObj: any) => {
        return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (dateObj: any) => {
        return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(date);
    const firstDayIndex = getFirstDayOfMonth(date);

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayIndex }, (_, i) => i);

    if (isLoading) {
        return (
            <Container dir="rtl">
                <MainContent>
                    <LoadingContainer>جاري تحميل الإحصائيات...</LoadingContainer>
                </MainContent>
            </Container>
        );
    }

    if (isError || !data) {
        return (
            <Container dir="rtl">
                <MainContent>
                    <ErrorContainer>
                        حدث خطأ في تحميل البيانات. تأكد من تشغيل الباك إند.
                    </ErrorContainer>
                </MainContent>
            </Container>
        );
    }

    return (
        <Container dir="rtl">
            <MainContent>
                <Header>
                    <HeaderContent>
                        <Title>مرحباً👋</Title>
                        <SubTitle>
                            إحصائيات يوم: {date.toLocaleDateString('ar-EG')}
                        </SubTitle>
                    </HeaderContent>
                </Header>

                <DashboardGrid>
                    <MiddleSection>
                        <OverviewSection>
                            <SectionHeader>
                                <SectionTitle>نظرة عامة - المبيعات</SectionTitle>
                            </SectionHeader>
                            <StatsGrid>
                                <StatCard>
                                    <StatIconBox $bg="#dcfce7" $color="#166534">
                                        <Banknote size={24} />
                                    </StatIconBox>
                                    <StatInfo>
                                        <StatLabel>المبيعات اليومية</StatLabel>
                                        <StatValue>
                                            {data?.dailySales?.toLocaleString()} ج.م
                                        </StatValue>
                                    </StatInfo>
                                </StatCard>

                                <StatCard>
                                    <StatIconBox $bg="#fef9c3" $color="#854d0e">
                                        <TrendingUp size={24} />
                                    </StatIconBox>
                                    <StatInfo>
                                        <StatLabel>صافي الربح</StatLabel>
                                        <StatValue
                                            $color={
                                                data?.dailyNetProfit >= 0
                                                    ? "#166534"
                                                    : "#dc2626"
                                            }
                                        >
                                            {data?.dailyNetProfit?.toLocaleString()} ج.م
                                        </StatValue>
                                        <StatSubtext>
                                            التكلفة: {data?.dailyTotalCost?.toLocaleString()}
                                        </StatSubtext>
                                    </StatInfo>
                                </StatCard>

                                <StatCard>
                                    <StatIconBox $bg="#dbeafe" $color="#1e40af">
                                        <ShoppingBag size={24} />
                                    </StatIconBox>
                                    <StatInfo>
                                        <StatLabel>عدد الفواتير</StatLabel>
                                        <StatValue>
                                            {data?.dailyOrdersCount} فاتورة
                                        </StatValue>
                                    </StatInfo>
                                </StatCard>

                                <StatCard>
                                    <StatIconBox $bg="#fce7f3" $color="#9d174d">
                                        <Shirt size={24} />
                                    </StatIconBox>
                                    <StatInfo>
                                        <StatLabel>قطع مباعة</StatLabel>
                                        <StatValue>
                                            {data?.dailyItemsSold} قطعة
                                        </StatValue>
                                    </StatInfo>
                                </StatCard>
                            </StatsGrid>
                        </OverviewSection>

                        <OverviewSection>
                            <SectionHeader>
                                <SectionTitle>المرتجعات اليومية </SectionTitle>
                            </SectionHeader>
                            <ReturnStatsGrid>
                                <ReturnStatCard>
                                    <StatIconBox $bg="#fee2e2" $color="#dc2626">
                                        <RotateCcw size={24} />
                                    </StatIconBox>
                                    <StatInfo>
                                        <StatLabel>قيمة المرتجعات</StatLabel>
                                        <StatValue $color="#dc2626">
                                            {data?.dailyReturnsAmount?.toLocaleString() || 0} ج.م
                                        </StatValue>
                                    </StatInfo>
                                </ReturnStatCard>

                                <ReturnStatCard>
                                    <StatIconBox $bg="#fef3c7" $color="#d97706">
                                        <AlertTriangle size={24} />
                                    </StatIconBox>
                                    <StatInfo>
                                        <StatLabel>عمليات إرجاع</StatLabel>
                                        <StatValue>
                                            {data?.dailyReturnsCount || 0} عملية
                                        </StatValue>
                                    </StatInfo>
                                </ReturnStatCard>

                                <ReturnStatCard>
                                    <StatIconBox $bg="#fce7f3" $color="#be185d">
                                        <Package size={24} />
                                    </StatIconBox>
                                    <StatInfo>
                                        <StatLabel>قطع مرتجعة</StatLabel>
                                        <StatValue>
                                            {data?.dailyReturnedItems || 0} قطعة
                                        </StatValue>
                                    </StatInfo>
                                </ReturnStatCard>
                            </ReturnStatsGrid>
                        </OverviewSection>

                        <ChartsRow>
                            <ChartCard>
                                <SectionHeader>
                                    <SectionTitle>
                                        المبيعات vs المرتجعات (أسبوعي)
                                    </SectionTitle>
                                </SectionHeader>

                                <ChartLegend>
                                    <LegendItem>
                                        <LegendDot $color={Colors.success} />
                                        مبيعات
                                    </LegendItem>
                                    <LegendItem>
                                        <LegendDot $color="#dc2626" />
                                        مرتجعات
                                    </LegendItem>
                                </ChartLegend>

                                <ChartContainer>
                                    {(!data?.weeklySales ||
                                        data.weeklySales.length === 0) ? (
                                        <EmptyState>لا توجد بيانات</EmptyState>
                                    ) : (
                                        (() => {
                                            const allSalesAmounts = data.weeklySales.map(
                                                (d: any) => d.amount
                                            );
                                            const allReturnAmounts = (
                                                data.weeklyReturns || []
                                            ).map((d: any) => d.amount);

                                            const maxVal = Math.max(
                                                ...allSalesAmounts,
                                                ...allReturnAmounts,
                                                1
                                            );

                                            return data.weeklySales.map(
                                                (item: any, i: number) => {
                                                    const returnItem =
                                                        data.weeklyReturns?.[i];
                                                    const returnAmount =
                                                        returnItem?.amount || 0;

                                                    let salesHeight =
                                                        maxVal === 0
                                                            ? 0
                                                            : (item.amount / maxVal) * 75;
                                                    if (item.amount > 0 && salesHeight < 5)
                                                        salesHeight = 5;

                                                    let returnHeight =
                                                        maxVal === 0
                                                            ? 0
                                                            : (returnAmount / maxVal) * 75;
                                                    if (returnAmount > 0 && returnHeight < 5)
                                                        returnHeight = 5;

                                                    const isSelected =
                                                        new Date(
                                                            item.date
                                                        ).toDateString() ===
                                                        date.toDateString();

                                                    return (
                                                        <ChartColumn key={i}>
                                                            <ChartValue
                                                                $visible={
                                                                    item.amount > 0 ||
                                                                    returnAmount > 0
                                                                }
                                                                $active={isSelected}
                                                            >
                                                                {item.amount > 0
                                                                    ? item.amount.toLocaleString()
                                                                    : ""}
                                                            </ChartValue>

                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "flex-end",
                                                                    gap: "3px",
                                                                    height: "100%",
                                                                }}
                                                            >
                                                                <ChartBar
                                                                    $height={salesHeight}
                                                                    $active={isSelected}
                                                                    $faded={
                                                                        item.amount === 0
                                                                    }
                                                                />

                                                                <ReturnChartBar
                                                                    $height={returnHeight}
                                                                    $active={isSelected}
                                                                    $faded={
                                                                        returnAmount === 0
                                                                    }
                                                                />
                                                            </div>

                                                            <ChartDay>
                                                                {item.dayName}
                                                            </ChartDay>
                                                        </ChartColumn>
                                                    );
                                                }
                                            );
                                        })()
                                    )}
                                </ChartContainer>
                            </ChartCard>

                            <ChartCard>
                                <SectionHeader>
                                    <SectionTitle>تنبيهات النواقص ⚠️</SectionTitle>
                                </SectionHeader>
                                <ShortageList>
                                    {data?.shortageProducts &&
                                        data.shortageProducts.length > 0 ? (
                                        data.shortageProducts.map(
                                            (item: any, i: any) => (
                                                <ShortageItem key={i}>
                                                    <ShortageCount>
                                                        {item.amount}
                                                    </ShortageCount>
                                                    <ShortageInfo>
                                                        <ShortageName>
                                                            {item.productName}
                                                        </ShortageName>
                                                        <ShortageCategory>
                                                            {item.category} • مخزون
                                                            منخفض
                                                        </ShortageCategory>
                                                    </ShortageInfo>
                                                </ShortageItem>
                                            )
                                        )
                                    ) : (
                                        <EmptyState>لا يوجد نواقص</EmptyState>
                                    )}
                                </ShortageList>
                            </ChartCard>
                        </ChartsRow>

                        <ChartCard>
                            <SectionHeader>
                                <SectionTitle>آخر المرتجعات </SectionTitle>
                                <RotateCcw size={18} color="#dc2626" />
                            </SectionHeader>

                            <RecentReturnsList>
                                {data?.recentReturns &&
                                    data.recentReturns.length > 0 ? (
                                    data.recentReturns.map((ret: any) => (
                                        <RecentReturnItem key={ret.returnId}>
                                            <ReturnItemId>
                                                #{ret.returnId}
                                            </ReturnItemId>

                                            <ReturnItemInfo>
                                                <span>
                                                    فاتورة أصلية:{" "}
                                                    <strong>
                                                        #{ret.originalInvoiceId}
                                                    </strong>
                                                </span>
                                                <ReturnItemDate>
                                                    {new Date(
                                                        ret.returnDate
                                                    ).toLocaleDateString("ar-EG")}
                                                </ReturnItemDate>
                                                {ret.note && (
                                                    <ReturnItemNote>
                                                        {ret.note}
                                                    </ReturnItemNote>
                                                )}
                                            </ReturnItemInfo>

                                            <ReturnItemAmount>
                                                <span>
                                                    -
                                                    {ret.totalRefundAmount.toLocaleString()}{" "}
                                                    ج.م
                                                </span>
                                                <small>
                                                    {ret.itemsCount} صنف
                                                </small>
                                            </ReturnItemAmount>
                                        </RecentReturnItem>
                                    ))
                                ) : (
                                    <EmptyState>لا توجد مرتجعات</EmptyState>
                                )}
                            </RecentReturnsList>
                        </ChartCard>
                    </MiddleSection>

                    <RightSection>
                        <PremiumBanner>
                            <PremiumTitle>إضافة فاتورة جديدة</PremiumTitle>
                            <PremiumButton onClick={() => navigate("/Orders")}>
                                <ShoppingBag size={16} />
                                فاتورة سريعة
                            </PremiumButton>
                        </PremiumBanner>

                        <CalendarCard>
                            <CalendarHeader>
                                <ChevronRight
                                    size={20}
                                    style={{ cursor: "pointer", opacity: 0.7 }}
                                    onClick={handleNextMonth}
                                    color={Colors.dark}
                                />
                                <CalendarTitle>
                                    {date.toLocaleDateString("en-US", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </CalendarTitle>
                                <ChevronLeft
                                    size={20}
                                    style={{ cursor: "pointer", opacity: 0.7 }}
                                    onClick={handlePrevMonth}
                                    color={Colors.dark}
                                />
                            </CalendarHeader>

                            <CalendarGrid>
                                {["S", "M", "T", "W", "T", "F", "S"].map(
                                    (d, i) => (
                                        <WeekDay key={i}>{d}</WeekDay>
                                    )
                                )}

                                {emptyDays.map((_, i) => (
                                    <span key={`empty-${i}`}></span>
                                ))}

                                {daysArray.map((day) => (
                                    <CalendarDay
                                        key={day}
                                        $active={day === date.getDate()}
                                        onClick={() => {
                                            const newDate = getNormalizedDate(
                                                date.getFullYear(),
                                                date.getMonth(),
                                                day
                                            );
                                            setDate(newDate);
                                        }}
                                    >
                                        {day}
                                    </CalendarDay>
                                ))}
                            </CalendarGrid>
                        </CalendarCard>
                    </RightSection>
                </DashboardGrid>
            </MainContent>
        </Container>
    );
};

export default Dashboard;