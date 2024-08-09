import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class RawFinding extends Model {
  public id!: number;
  public source_security_tool_name!: string;
  public source_security_tool_id!: string;
  public source_collaboration_tool_name!: string;
  public source_collaboration_tool_id!: string;
  public severity!: string;
  public finding_created!: Date;
  public ticket_created!: Date;
  public description!: string;
  public asset!: string;
  public status!: string;
  public remediation_url!: string;
  public remediation_text!: string;
  public grouped_finding_id!: number;
}

RawFinding.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    source_security_tool_name: {
      type: DataTypes.STRING,
    },
    source_security_tool_id: {
      type: DataTypes.STRING,
    },
    source_collaboration_tool_name: {
      type: DataTypes.STRING,
    },
    source_collaboration_tool_id: {
      type: DataTypes.STRING,
    },
    severity: {
      type: DataTypes.STRING,
    },
    finding_created: {
      type: DataTypes.STRING,
    },
    ticket_created: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    asset: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    remediation_url: {
      type: DataTypes.STRING,
    },
    remediation_text: {
      type: DataTypes.STRING,
    },
    grouped_finding_id: {
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    tableName: "raw_findings",
  }
);

export default RawFinding;
