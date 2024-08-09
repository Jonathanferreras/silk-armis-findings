import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class GroupedFindings extends Model {
  public id!: number;
  public grouping_type!: string;
  public grouping_key!: string;
  public severity!: string;
  public grouped_finding_created!: string;
  public sla!: string;
  public description!: Date;
  public security_analyst!: Date;
  public owner!: string;
  public workflow!: string;
  public status!: string;
  public progress!: string;
}

GroupedFindings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    grouping_type: {
      type: DataTypes.STRING,
    },
    grouping_key: {
      type: DataTypes.STRING,
    },
    severity: {
      type: DataTypes.STRING,
    },
    grouped_finding_created: {
      type: DataTypes.STRING,
    },
    sla: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    security_analyst: {
      type: DataTypes.STRING,
    },
    owner: {
      type: DataTypes.STRING,
    },
    workflow: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    progress: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "grouped_findings",
  }
);

export default GroupedFindings;
