export interface IGroupedFindings {
  id: number;
  grouping_type: string;
  grouping_key: string;
  severity: string;
  grouped_finding_created: string;
  sla: string;
  description: Date;
  security_analyst: Date;
  owner: string;
  workflow: string;
  status: string;
  progress: string;
}

export interface IRawFindings {
  id: number;
  source_security_tool_name: string;
  source_security_tool_id: string;
  source_collaboration_tool_name: string;
  source_collaboration_tool_id: string;
  severity: string;
  finding_created: Date;
  ticket_created: Date;
  description: string;
  asset: string;
  status: string;
  remediation_url: string;
  remediation_text: string;
  grouped_finding_id: number;
}
