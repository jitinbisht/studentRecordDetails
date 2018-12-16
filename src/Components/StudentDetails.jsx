import React, { Component } from "react";

import StudentList from "../Components/StudentList";
import StudentSummary from "../Components/StudentSummary";
import initialStudentList from "./marks";
import {
  Table,
  TableHeader,
  TableRow
} from "../Components/StudentDetailsStyle";

class StudentDetails extends Component {
  constructor() {
    super();
    this.state = {
      studentName: "",
      marks: "",
      studentList: [],
      maxMarks: "",
      minMarks: "",
      avgMarks: ""
    };

    this.indentifyEditedItem = this.indentifyEditedItem.bind(this);
  }
  componentDidMount() {
    this.setState({
      studentList: initialStudentList
    });
    let filteredMarks = [];
    initialStudentList.forEach(function(item, index) {
      filteredMarks.push(item.marks);
      return filteredMarks;
    });

    const maxMarks = Math.max.apply(null, filteredMarks);
    const minMarks = Math.min.apply(null, filteredMarks);

    const totalMarks = filteredMarks.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    const numberOfRecords = filteredMarks.length;
    const avgMarks = totalMarks / numberOfRecords;
    this.findMarksForSummary(maxMarks, minMarks, avgMarks);
  }

  findMarksForSummary(maxMarks, minMarks, avgMarks) {
    this.setState({
      maxMarks: maxMarks,
      minMarks: minMarks,
      avgMarks: avgMarks
    });
  }

  indentifyEditedItem = (id, name, marks) => {
    let tempArray = this.state.studentList.slice();
    tempArray[id] = { studentName: name, marks: marks };

    this.setState({
      studentList: tempArray
    });

    let filteredMarks = [];
    tempArray.forEach(function(item, index) {
      filteredMarks.push(item.marks);
      return filteredMarks;
    });

    const maxMarks = Math.max.apply(null, filteredMarks);
    const minMarks = Math.min.apply(null, filteredMarks);

    const totalMarks = filteredMarks.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    const numberOfRecords = filteredMarks.length;
    const avgMarks = totalMarks / numberOfRecords;

    this.findMarksForSummary(maxMarks, minMarks, avgMarks);
  };

  handleSubmit = event => {
    console.log("I am here===");
    let name = event.target[0].value;
    let marks = event.target[1].value;
    this.setState(
      {
        studentName: "",
        marks: "",
        studentList: [
          ...this.state.studentList,
          {
            studentName: name,
            marks: parseInt(marks)
          }
        ]
      },
      () => {
        let tempArray = this.state.studentList.slice();
        let filteredMarks = [];
        tempArray.forEach(function(item, index) {
          filteredMarks.push(item.marks);
          return filteredMarks;
        });

        const maxMarks = Math.max.apply(null, filteredMarks);
        const minMarks = Math.min.apply(null, filteredMarks);

        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;

        const totalMarks = filteredMarks.reduce(reducer, 0);

        const numberOfRecords = filteredMarks.length;
        const avgMarks = totalMarks / numberOfRecords;

        this.findMarksForSummary(maxMarks, minMarks, avgMarks);
      }
    );

    event.preventDefault();
  };

  deleteStudentRecord(studentList, id) {
    let tempStudentList = [...this.state.studentList];
    tempStudentList.splice(id, 1);
    this.setState({ studentList: tempStudentList });
  }

  handleChange = event => {
    if (event.target.name === "studentName")
      this.setState({ studentName: event.target.value });
    if (event.target.name === "marks")
      this.setState({ marks: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <h3>Add new record</h3>
          <label>
            Student Name:{" "}
            <input
              type="text"
              name="studentName"
              onChange={this.handleChange}
              value={this.state.studentName}
            />
          </label>{" "}
          <label>
            Marks:{" "}
            <input
              type="number"
              name="marks"
              onChange={this.handleChange}
              value={this.state.marks}
            />
          </label>
          {"   "}
          <input type="submit" value="Add" />
        </form>
        <Table>
          <tbody>
            <TableRow>
              <TableHeader>Student Name</TableHeader>
              <TableHeader>Student Marks</TableHeader>
              <TableHeader>Edit Record</TableHeader>
              <TableHeader>Delete Record</TableHeader>
            </TableRow>
          </tbody>
        </Table>

        {this.state.studentList &&
          this.state.studentList.map((student, id) => {
            return (
              <div>
                <StudentList
                  id={id}
                  name={student.studentName}
                  marks={student.marks}
                  deleteStudentRecord={this.deleteStudentRecord.bind(
                    this,
                    this.state.studentList
                  )}
                  editItem={this.indentifyEditedItem}
                />
              </div>
            );
          })}
        <StudentSummary
          minMarks={this.state.minMarks}
          maxMarks={this.state.maxMarks}
          avgMarks={this.state.avgMarks}
        />
      </div>
    );
  }
}
export default StudentDetails;
