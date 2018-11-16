import * as React from 'react'

import { Button, Col, Row } from 'antd';

// matrixStore mobx
import matrixStore from 'store/matrix/matrixStore'

export default class ButtonGroup extends React.Component {
    public render() {
        return (
            <Row>
                <Col span={4}>
                    <Button
                        onMouseUp={matrixStore.updateMatrixModel.bind(matrixStore)}
                    >
                        合并
                    </Button>
                </Col>
                <Col span={4}>
                    <Button>拆分</Button>
                </Col>
            </Row>
        )
    }
}