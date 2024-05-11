// "use client";

// import React, { useMemo } from "react";
// import { createColumnHelper } from "@tanstack/react-table";

import type { RouterOutputs } from "@acme/api";

// import { DataTable } from "@acme/ui/data-table/data-table";

export type Issue = RouterOutputs["issue"]["byRepo"]["issues"][0];
// type Owner = RouterOutputs["issue"]["byRepo"]["owner"];

// const columnHelper = createColumnHelper<Issue>();

// interface IssueTableProps {
//   issues: Issue[];
//   owner: Owner;
// }
// const IssueTable = ({ issues, owner }: IssueTableProps) => {
//   const columns = useMemo(() => {
//     const columns = [
//       columnHelper.display({
//         id: "avatar",
//         cell: () => (
//           <img className="h-8 w-8" src={owner.avatar_url} alt="avatar" />
//         ),
//       }),

//       columnHelper.accessor("title", {
//         header: "Title",
//       }),
//       columnHelper.accessor("reactions.total_count", {
//         header: "Reactions",
//       }),
//     ];
//     return columns;
//   }, [owner.avatar_url]);

//   return <DataTable columns={columns} data={issues} />;
// };

// export default IssueTable;
