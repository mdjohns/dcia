import Head from "next/head";
import { Button, Card, Form, Table } from "react-bootstrap";
import AppLayout from "../components/AppLayout.jsx";
import RegistrationRequest from "../models/RegistrationRequest";
import { ProtectPage } from "../utils/auth";

const pageTitle = "User Access";

export default function AccessRequests({ registrationRequests }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <AppLayout>
        <h1 className="h3">{pageTitle}</h1>

        <Card className="mt-3">
          <Card.Header className="bg-white">Access Requests</Card.Header>
          <Table responsive className="mb-0">
            <thead>
              <tr>
                <th className="pl-4">Access Level</th>
                <th>Email</th>
                <th>Status</th>
                <th>Requested On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {registrationRequests.map((registrationRequest) => {
                const isdenied = registrationRequest.requestStatus === "denied";

                return (
                  <tr
                    key={registrationRequest._id}
                    style={isdenied ? { textDecoration: "line-through" } : {}}
                  >
                    <td className="pl-4">
                      <Form.Control
                        as="select"
                        size="sm"
                        custom
                        defaultValue={registrationRequest.accessLevel}
                      >
                        <option value="instructor">Instructor</option>
                        <option value="admin">Administrator</option>
                      </Form.Control>
                    </td>
                    <td>{registrationRequest.email}</td>
                    <td>{registrationRequest.requestStatus}</td>
                    <td>{registrationRequest.createdAt}</td>
                    <td className="pr-4 text-right">
                      <Button
                        size="sm"
                        variant="danger"
                        className="ml-3"
                        disabled={isdenied}
                      >
                        Deny Request
                      </Button>
                      <Button size="sm" variant="success" className="ml-3">
                        Grant Access
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      </AppLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { props } = await ProtectPage(context, ["root"]);

  let registrationRequests = await RegistrationRequest.find(
    {
      requestStatus: { $in: ["pending", "denied"] },
    },
    { password: 0 }
  ).lean();
  registrationRequests = JSON.parse(JSON.stringify(registrationRequests));

  return { props: { ...props, registrationRequests } };
}
