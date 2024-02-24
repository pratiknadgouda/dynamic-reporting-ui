import { Button, Card } from "react-bootstrap";

const ReportCard = ({ data }) => {
  const displayCard = (itemData) => {
    return (
      <Card className="me-4 mb-4" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{itemData.test_name}</Card.Title>
          <Card.Text>Observed Value: {itemData.observed_value}</Card.Text>
          <Button variant="danger" size="sm">
            Remove from Report
          </Button>
        </Card.Body>
      </Card>
    );
  };
  const displayGroup = (item) => {
    return <>{item.tests.map((innerItem) => displayCard(innerItem))}</>;
  };
  return (
    <div className="d-flex flex-row flex-wrap">
      {data.map((mainItem) => displayGroup(mainItem))}
    </div>
  );
};

export default ReportCard;
