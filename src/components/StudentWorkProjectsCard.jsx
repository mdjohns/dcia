import React from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import faker from "faker";

const tableSpacingStyle = { paddingLeft: "1.25rem", paddingRight: "1.25rem" };

export default function StudentWorkProjectsCard({
  className,
  studentOutcomes,
}) {
  return (
    <Card className={className}>
      <Card.Header className="bg-white pt-2 pb-2">
        <Row className="align-items-center flex-column flex-lg-row">
          <Col>Student Work Projects (SWPs)</Col>
          <Col className="d-flex flex-grow-0" style={{ whiteSpace: "nowrap" }}>
            <Button size="sm">Add SWP</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table className="mb-0">
        <thead>
          <tr>
            <th
              className="col-md-6 font-weight-normal text-secondary border-bottom-0"
              style={tableSpacingStyle}
            >
              Name
            </th>
            {studentOutcomes.map(({ number }) => (
              <th
                key={number}
                className="text-right font-weight-normal text-secondary border-bottom-0"
              >
                SO{number}
              </th>
            ))}
            <th className="border-bottom-0"></th>
          </tr>
        </thead>
        <tbody>
          <StudentWorkProjectRow studentOutcomes={studentOutcomes} />
          <StudentWorkProjectRow studentOutcomes={studentOutcomes} />
          <StudentWorkProjectRow studentOutcomes={studentOutcomes} />
        </tbody>
      </Table>
    </Card>
  );
}

function StudentWorkProjectRow({ studentOutcomes }) {
  const randomFloat = () => faker.random.float({ min: 1, max: 4 }).toFixed(1);

  return (
    <tr>
      <td style={tableSpacingStyle}>{faker.lorem.sentence(3)}</td>
      {studentOutcomes.map(({ number }) => (
        <td key={number} className="pl-5 text-right">
          {randomFloat()}
        </td>
      ))}
      <td className="pl-5 pt-2 pb-0" style={tableSpacingStyle}>
        <Button size="sm" variant="secondary" style={{ whiteSpace: "nowrap" }}>
          Record Assessment
        </Button>
      </td>
    </tr>
  );
}