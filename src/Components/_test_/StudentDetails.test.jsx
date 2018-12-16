import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import StudentList from "../StudentList";
import StudentSummary from "../StudentSummary";
import StudentDetails from "../StudentDetails";
configure({ adapter: new Adapter() });

describe("It renders Student Details", () => {
  const StudentDetail = mount(<StudentDetails />);

  it("Renderes StudentSummary component", () => {
    expect(StudentDetail.find(StudentSummary).length).toBe(1);
  });

  it("Renderes StudentList component on pageLoad", () => {
    expect(StudentDetail.find(StudentList).length).toBe(3);
  });
});
