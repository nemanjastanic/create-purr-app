"use client";

import "@tanstack/react-table";

import type { Table } from "@tanstack/react-table";
import * as React from "react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { capitalCase } from "change-case";

import { Button } from "@ryuu/design/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "@ryuu/design/components/ui/dropdown-menu";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    name?: string;
  }
}

function DataTableViewOptions<TData>({
  ref,
  table,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent> & { table: Table<TData> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto flex h-8">
          <MixerHorizontalIcon className="mr-2 size-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={ref}
        align="end"
        className="w-[150px]"
        {...props}
      >
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.columnDef.meta?.name ?? capitalCase(column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { DataTableViewOptions };
