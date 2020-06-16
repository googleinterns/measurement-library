import React from 'react';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
import blackDemo from '../../images/black.png';

/**
 * @return {!JSX} Page component for where a user can view
 *     details about a single product.
 */
export function ProductScreen() {
  return (
    <Container>
      <Row>
        <Col/>
        <Col xs={5}>
          <div>
            <Image src={blackDemo} width="100%"/>
            <Container>
              <Row>
                <Col>
                    Name: Poe
                </Col>
                <Col xs="8"/>
                <Col>
                    Price: $$$
                </Col>
              </Row>
            </Container>
            <br/>
            <p>
              {`very good description of KJ's beatiful cat Poe.`}
            </p>
            <Container>
              <Row>
                <Col>
                  <Button>Add to Cart</Button>
                </Col>
                <Col xs="3"/>
                <Col>
                  <Button variant="success">Buy Now</Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
        <Col/>
      </Row>
    </Container>
  );
}
