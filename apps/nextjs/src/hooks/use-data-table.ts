"use client";

import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import {
  functionalUpdate,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { DataTableFilterField } from "node_modules/@acme/ui/src/data-table/types";
import { useQueryStates } from "nuqs";
import * as React from "react";
import { issuesParsers } from "~/app/params";

interface UseDataTableProps<TData, TValue> {
  /**
   * The data for the table.
   * @default []
   * @type TData[]
   */
  data: TData[];

  /**
   * The columns of the table.
   * @default []
   * @type ColumnDef<TData, TValue>[]
   */
  columns: ColumnDef<TData, TValue>[];

  /**
   * The number of pages in the table.
   * @type number
   */
  pageCount: number;

  /**
   * The default number of rows per page.
   * @default 10
   * @type number | undefined
   * @example 20
   */
  defaultPerPage?: number;

  /**
   * The default sort order.
   * @default undefined
   * @type `${Extract<keyof TData, string | number>}.${"asc" | "desc"}` | undefined
   * @example "createdAt.desc"
   */
  defaultSort?: `${Extract<keyof TData, string | number>}.${"asc" | "desc"}`;

  /**
   * Defines filter fields for the table. Supports both dynamic faceted filters and search filters.
   * - Faceted filters are rendered when `options` are provided for a filter field.
   * - Otherwise, search filters are rendered.
   *
   * The indie filter field `value` represents the corresponding column name in the database table.
   * @default []
   * @type { label: string, value: keyof TData, placeholder?: string, options?: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[] }[]
   * @example
   * ```ts
   * // Render a search filter
   * const filterFields = [
   *   { label: "Title", value: "title", placeholder: "Search titles" }
   * ];
   * // Render a faceted filter
   * const filterFields = [
   *   {
   *     label: "Status",
   *     value: "status",
   *     options: [
   *       { label: "Todo", value: "todo" },
   *       { label: "In Progress", value: "in-progress" },
   *       { label: "Done", value: "done" },
   *       { label: "Canceled", value: "canceled" }
   *     ]
   *   }
   * ];
   * ```
   */
  filterFields?: DataTableFilterField<TData>[];

  /**
   * Enable notion like column filters.
   * Advanced filters and column filters cannot be used at the same time.
   * @default false
   * @type boolean
   */
  enableAdvancedFilter?: boolean;
}

export function useDataTable<TData, TValue>({
  data,
  columns,
  pageCount,
  defaultPerPage = 10,
  defaultSort,
  filterFields = [],
}: UseDataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [{ page, per_page: perPage, sort_col, sort_dir }, setParams] = useQueryStates(issuesParsers, {
    scroll: false,
    shallow: false,
  });

  const sorting = sort_col && sort_dir ? [{ id: sort_col, desc: sort_dir === "desc" }] : [];

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: perPage ?? defaultPerPage,
      },
      sorting,
      columnVisibility,
    },
    enableRowSelection: true,
    onPaginationChange: (paginationFn) => {
      const newValue = functionalUpdate(paginationFn, table.getState().pagination);
      setParams({ page: newValue.pageIndex + 1, per_page: newValue.pageSize });
    },
    onSortingChange: (updaterFunction) => {
      const newValue = functionalUpdate(updaterFunction, sorting);
      setParams({ sort_col: newValue[0]?.id, sort_dir: newValue[0]?.desc ? "desc" : "asc" });
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return { table };
}
