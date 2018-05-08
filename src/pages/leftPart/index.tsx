import * as React from 'react'

import { Input, Row } from 'antd'

import './index.css'

class LeftPart extends React.Component<LeftPagesProps, LeftPagesStates> {
    /** 输入框的HTML元素集合 */
    private inputHTMLElements: Array<any> = [];

    private InputComp: any;

    constructor(props: LeftPagesProps, state: LeftPagesStates) {
        super(props);
        this.state = {
            placeholder: '输入colNames, 然后按回车',
            inputListNum: [{}, {}],
            inputFocusIndex: 0
        };
    }
    componentWillMount() {
        this.InputComp = this.renderInputComponent();
    }

    componentDidMount() {
        this.inputHTMLElements[0].focus();
    }

    public render() {
        const placeholder = this.state.placeholder;
        return (
            <div>
                {this.InputComp}
            </div>
        )
    }

    /** 
     * 渲染输入框组件
     */
    private renderInputComponent() {
        const len: number = this.state.inputListNum.length + 10;

        let result: Array<any> = [],
            refVal: string = '';

        for (let index = 0; index < len; index++) {
            result.push(
                <Row key={index} className="row-style">
                    <Input
                        ref={(input) => { this.inputHTMLElements.push(input) }}
                        placeholder={this.state.placeholder}
                        onClick={this.onClick.bind(this, index)}
                        onPressEnter={this.onPressEnter.bind(this)}
                        onKeyDown={this.onKeyDown.bind(this)}
                    />
                </Row>
            )
        }

        return result;
    }
    /**
     * 点击事件
     * @param index 输入框序号
     * @param e 事件对象
     */
    private onClick(index: number, e: any) {
        // 点击input时,更新当前focus的input序号
        this.setState({
            inputFocusIndex: index
        })
    }
    /**
     * 回车事件
     * @param e 事件对象
     */
    private onPressEnter(e: object) {
        this.onKeyDown({
            keyCode: 40
        })
    }
    /**
     * 键盘按下事件
     * @param e 事件对象
     */
    private onKeyDown(e: any) {
        const key: number = e.keyCode,
            maxLen: number = this.inputHTMLElements.length;

        let focusIndex: number = this.state.inputFocusIndex;

        // 向上键
        if (key === 38 && focusIndex > 0) {
            focusIndex--;
        }
        // 向下键
        else if (key === 40 && focusIndex < maxLen - 1) {
            focusIndex++;
        }
        // 其余情况返回
        else {
            return false;
        }

        this.inputHTMLElements[focusIndex].focus();
        this.setState({
            inputFocusIndex: focusIndex
        })
    }
}

interface LeftPagesProps {
}

interface LeftPagesStates {

    /** 输入框提示语 */
    placeholder: string,

    /** 输入框数量 */
    inputListNum: Array<Object>,

    /** 当前foucus的input框下标 */
    inputFocusIndex: number
}

export default LeftPart;