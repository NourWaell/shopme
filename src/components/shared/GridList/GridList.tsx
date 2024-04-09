import { Col, Row } from "react-bootstrap";

type TGridList<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

type HasId = {
  id?: number;
};

const GridList = <T extends HasId>({ records, renderItem }: TGridList<T>) => {
  const list =
    records.length > 0
      ? records.map((record) => (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(record)}
          </Col>
        ))
      : "There are no data available.";

  return <Row>{list}</Row>;
};
export default GridList;
