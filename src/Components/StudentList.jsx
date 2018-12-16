import React, { Component } from "react";

import Modal from "react-modal";
import {
  Marks,
  ButtonWrapper,
  Cancel,
  TableData,
  Table,
  customStyles,
  TableRow
} from "../Components/StudentListStyle";
Modal.setAppElement();

class StudentList extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      name: "",
      marks: 0
    };
    this.openModal = this.openModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
  }

  DeleteRecord() {
    this.props.deleteStudentRecord(this.props.id);
  }

  saveEditedRecord() {
    this.setState({ modalIsOpen: false });
    this.props.editItem(
      this.props.id,
      this.state.name,
      parseInt(this.state.marks)
    );
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
      name: this.props.name,
      marks: this.props.marks
    });
  }

  cancelModal() {
    this.setState({ modalIsOpen: false });
  }

  handleNameChange = event => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleMarksChange = event => {
    const marks = event.target.value;
    this.setState({ marks });
  };

  render() {
    const failMarks = this.props.marks < 33;
    return (
      <Table>
        <tbody>
          <TableRow style={{ background: failMarks ? "red" : "none" }}>
            <TableData>{this.props.name}</TableData>
            <TableData>{this.props.marks}</TableData>
            <TableData>
              <input type="button" value="Edit" onClick={this.openModal} />
            </TableData>

            <TableData>
              <input
                type="button"
                value="Delete"
                onClick={this.DeleteRecord.bind(this)}
              />
            </TableData>
          </TableRow>
          <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
            <div>Student Name: </div>{" "}
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <Marks>Marks: </Marks>{" "}
            <input
              type="text"
              value={this.state.marks}
              onChange={this.handleMarksChange}
            />
            <ButtonWrapper>
              <span>
                <input
                  type="button"
                  value="Save"
                  onClick={this.saveEditedRecord.bind(this)}
                />
              </span>
              <Cancel>
                <input
                  type="button"
                  value="Cancel"
                  onClick={this.cancelModal}
                />
              </Cancel>
            </ButtonWrapper>
          </Modal>
        </tbody>
      </Table>
    );
  }
}

export default StudentList;
