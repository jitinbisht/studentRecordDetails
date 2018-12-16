import React, { Component } from "react";

import {
  Table,
  Marks,
  TableHeader,
  TableRow,
  TableData
} from "../Components/StudentSummaryStyle";

class StudentSummary extends Component {
  render() {
    return (
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>Student Summary</TableHeader>
          </TableRow>
          <TableRow>
            <TableData>
              <Marks> Minimum Marks: {this.props.minMarks}</Marks>
              <Marks> Maximum Marks: {this.props.maxMarks}</Marks>
              <Marks> Average Marks: {this.props.avgMarks} </Marks>
            </TableData>
          </TableRow>
        </tbody>
      </Table>
    );
  }
}

export default StudentSummary;
