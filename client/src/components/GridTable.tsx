import { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, SizeColumnsToContentStrategy } from "ag-grid-community";

interface IGridTable {
  height?: number;
  rows: unknown[] | undefined | null;
  columns: ColDef[] | null | undefined;
  onRowSelection?: (row: unknown) => void | undefined;
}

export const GridTable = ({
  height = 500,
  rows,
  columns,
  onRowSelection,
}: IGridTable) => {
  const gridRef = useRef<AgGridReact>(null);
  const autoSizeStrategy = useMemo<SizeColumnsToContentStrategy>(
    () => ({
      type: "fitCellContents",
    }),
    []
  );

  return (
    <div className="table">
      <div className="ag-theme-quartz" style={{ height }}>
        <AgGridReact
          ref={gridRef}
          rowData={rows}
          columnDefs={columns}
          rowSelection={"single"}
          autoSizeStrategy={autoSizeStrategy}
          onSelectionChanged={
            onRowSelection && gridRef.current
              ? () => {
                  const selectedRows = gridRef.current?.api?.getSelectedRows();
                  if (selectedRows && selectedRows.length > 0) {
                    onRowSelection(selectedRows[0]);
                  }
                }
              : undefined
          }
        />
      </div>
    </div>
  );
};
