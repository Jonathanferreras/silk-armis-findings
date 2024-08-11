import { useCallback, useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import { IGroupedFindings, IRawFindings } from "./types/IFindings";
import { GridTable } from "./components/GridTable";
import { SEVERITY_COLOR_MAP } from "./constants/severity";
import { IPieChartData, PieChart } from "./components/PieChart";
import { dateFormat } from "./utility/date";
import {
  GROUPED_FINDINGS_ALL_ENDPOINT,
  RAW_FINDINGS_ALL_ENDPOINT,
} from "./constants/endpoints";

const styles = {
  appBar: {
    height: "8vh",
    display: "flex",
    alignItems: "center",
    paddingLeft: "25px",
    paddingRight: "25px",
    backgroundColor: "rgb(31 41 55 / 1)",
    color: "#fff",
    fontWeight: "bold",
  },
  groupedFindingsContainer: {
    margin: "0 25px",
  },
};

function App() {
  const [groupedFindings, setGroupFindings] = useState<
    IGroupedFindings[] | undefined | null
  >(null);
  const [rawFindings, setRawFindings] = useState<
    IRawFindings[] | undefined | null
  >(null);
  const [groupedFindingsBySeverity, setGroupedFindingsBySeverity] = useState<
    IPieChartData[] | null
  >(null);
  const [selectedRow, setSelectedRow] = useState<
    IGroupedFindings | undefined | null
  >(null);
  const [showModal, setShowModal] = useState(false);

  const getGroupedFindingsBySeverity = useCallback(() => {
    const result: { name: string; value: number }[] = [];
    const severityMap: { [key: string]: number } = {};

    if (groupedFindings) {
      for (const groupedFinding of groupedFindings) {
        severityMap[groupedFinding.severity] =
          (severityMap[groupedFinding.severity] || 0) + 1;
      }
    }

    for (const severityKey of Object.keys(severityMap)) {
      result.push({
        name: severityKey,
        value: severityMap[severityKey],
      });
    }

    return result;
  }, [groupedFindings]);

  const generateGroupedFindingsColumns = () => {
    return [
      {
        field: "id",
        headerName: "#",
      },
      {
        field: "severity",
        cellRenderer: ({ value }: { value: string }) => (
          <span
            style={{ color: SEVERITY_COLOR_MAP[value], fontWeight: "bold" }}
          >
            {value}
          </span>
        ),
      },
      {
        field: "description",
        cellRenderer: ({ value }: { value: string }) => (
          <a target="blank" href={value.replace("Remediation Group: ", "")}>
            {value}
          </a>
        ),
      },
      {
        field: "grouped_finding_created",
        headerName: "Created",
        valueGetter: ({ data }: { data: IGroupedFindings }) =>
          dateFormat(data.grouped_finding_created),
      },
      { field: "security_analyst", headerName: "Security Analyst" },
      {
        field: "owner",
      },
      {
        field: "progress",
        valueGetter: ({ data }: { data: IGroupedFindings }) =>
          `${(parseFloat(data.progress) * 100).toFixed(2)}%`,
      },
    ];
  };

  const generateRawFindingsColumns = () => {
    return [
      {
        field: "id",
        headerName: "#",
      },
      {
        field: "severity",
        cellRenderer: ({ value }: { value: string }) => (
          <span
            style={{ color: SEVERITY_COLOR_MAP[value], fontWeight: "bold" }}
          >
            {value}
          </span>
        ),
      },
      {
        field: "status",
      },
      {
        field: "description",
      },
      {
        field: "source_security_tool_name",
        headerName: "Security Tool",
      },
      {
        field: "source_collaboration_tool_name",
        headerName: "Collaboration Tool",
      },

      {
        field: "finding_created",
        headerName: "Created",
        valueGetter: ({ data }: { data: IRawFindings }) =>
          dateFormat(data.finding_created),
      },

      {
        field: "asset",
      },

      {
        field: "remediation_text",
      },
    ];
  };

  const renderGroupedFindingsBySeverity = () => {
    return groupedFindingsBySeverity ? (
      <PieChart
        data={groupedFindingsBySeverity}
        customCells={true}
        customCellsFill={SEVERITY_COLOR_MAP}
      />
    ) : (
      <></>
    );
  };

  const renderGroupedFindings = () => {
    return (
      <div style={styles.groupedFindingsContainer}>
        <GridTable
          onRowSelection={handleRowSelection}
          rows={groupedFindings}
          columns={generateGroupedFindingsColumns()}
        />
      </div>
    );
  };

  const renderRawFindings = () => {
    const relatedRawFindings = rawFindings?.filter(
      (rawFinding) => rawFinding.grouped_finding_id === selectedRow?.id
    );

    return (
      <>
        <h1>Raw Findings for Group Findings #{selectedRow?.id}</h1>
        <GridTable
          rows={relatedRawFindings}
          columns={generateRawFindingsColumns()}
        />
      </>
    );
  };

  const handleRowSelection = (row: IGroupedFindings) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleToggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    fetch(GROUPED_FINDINGS_ALL_ENDPOINT)
      .then((res) => res.json())
      .then((json) => setGroupFindings(json.data));
  }, []);

  useEffect(() => {
    fetch(RAW_FINDINGS_ALL_ENDPOINT)
      .then((res) => res.json())
      .then((json) => setRawFindings(json.data));
  }, []);

  useEffect(() => {
    if (groupedFindings && !groupedFindingsBySeverity) {
      setGroupedFindingsBySeverity(getGroupedFindingsBySeverity());
    }
  }, [
    groupedFindings,
    getGroupedFindingsBySeverity,
    groupedFindingsBySeverity,
  ]);

  return (
    <>
      <Modal open={showModal} onModalToggle={handleToggleModal}>
        {renderRawFindings()}
      </Modal>
      <div style={styles.appBar}>Silk-Armis Findings</div>
      {renderGroupedFindingsBySeverity()}
      {renderGroupedFindings()}
    </>
  );
}

export default App;
