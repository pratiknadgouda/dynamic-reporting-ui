import React from "react";
import { Button, Card } from "react-bootstrap";

const ReportCard = ({ data, setData }) => {
  const handleRemove = (innerIndex, testType) => {
    const newData = data.map((item) => {
      if (item.test_type === testType) {
        const newTests = [
          ...item.tests.slice(0, innerIndex),
          ...item.tests.slice(innerIndex + 1),
        ];
        return { ...item, tests: newTests };
      } else return item;
    });
    setData(newData);
  };
  const displayCard = (itemData, index, testType) => {
    return (
      <Card
        key={itemData.test_name + index}
        className="me-4 mb-4"
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <Card.Title>{itemData.test_name}</Card.Title>
          <Card.Text>Observed Value: {itemData.observed_value}</Card.Text>
          <Card.Text>Reference Range: {itemData.reference_range}</Card.Text>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleRemove(index, testType)}
          >
            Remove from Report
          </Button>
        </Card.Body>
      </Card>
    );
  };
  const displayGroup = (item) => {
    return item?.tests?.map((innerItem, index) =>
      displayCard(innerItem, index, item.test_type)
    );
  };

  return (
    <div className="d-flex flex-row flex-wrap">
      {data?.map((mainItem) => displayGroup(mainItem))}
    </div>
  );
};

export default ReportCard;
