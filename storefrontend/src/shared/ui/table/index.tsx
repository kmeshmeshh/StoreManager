import type { ReactNode } from "react";
import {
    TableContainer,
    StyledTable,
    Thead,
    Tr,
    Th,
    Td,
    StatusContainer,
    SkeletonBox
} from "./styled";
import { PackageOpen } from "lucide-react";
import React from "react";

export type Column<T> = {
    header: string;
    accessor?: keyof T;
    render?: (item: T) => ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right';
};

type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    isError?: boolean;
    errorMessage?: string;
    keyExtractor: (item: T) => string | number;
    renderRow?: (item: T) => ReactNode;
};

const Table = <T,>({
    data,
    columns,
    isLoading,
    isError,
    errorMessage = "Something went wrong while fetching data.",
    keyExtractor,
    renderRow
}: TableProps<T>) => {

    return (
        <TableContainer>
            <StyledTable>
                <Thead>
                    <Tr>
                        {columns.map((col, index) => (
                            <Th key={index} $align={col.align} $width={col.width}>
                                {col.header}
                            </Th>
                        ))}
                    </Tr>
                </Thead>

                <tbody>
                    {isLoading && (
                        Array.from({ length: 5 }).map((_, rowIndex) => (
                            <Tr key={`loading-${rowIndex}`}>
                                {columns.map((col, colIndex) => (
                                    <Td key={`skel-${colIndex}`}>
                                        <SkeletonBox />
                                    </Td>
                                ))}
                            </Tr>
                        ))
                    )}

                    {!isLoading && isError && (
                        <Tr>
                            <Td colSpan={columns.length}>
                                <StatusContainer $type="error">
                                    <span style={{ fontSize: '24px' }}>⚠️</span>
                                    <span>{errorMessage}</span>
                                </StatusContainer>
                            </Td>
                        </Tr>
                    )}

                    {!isLoading && !isError && data.length === 0 && (
                        <Tr>
                            <Td colSpan={columns.length}>
                                <StatusContainer $type="empty">
                                    <PackageOpen size={64} strokeWidth={1} />
                                    <span>لا يوجد بيانات لعرضها</span>
                                </StatusContainer>
                            </Td>
                        </Tr>
                    )}

                    {!isLoading && !isError && data.length > 0 && (
                        data.map((item) => (
                            renderRow ? (
                                <React.Fragment key={keyExtractor(item)}>
                                    {renderRow(item)}
                                </React.Fragment>
                            ) : (
                                <Tr key={keyExtractor(item)}>
                                    {columns.map((col, index) => (
                                        <Td key={index} $align={col.align}>
                                            {col.render
                                                ? col.render(item)
                                                : col.accessor
                                                    ? (item[col.accessor] as ReactNode)
                                                    : '-'
                                            }
                                        </Td>
                                    ))}
                                </Tr>
                            )
                        ))
                    )}
                </tbody>
            </StyledTable>
        </TableContainer>
    );
};

export default Table;