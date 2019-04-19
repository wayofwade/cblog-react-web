// 测试vscode的git
import React from 'react'
import { Form, Input, Select, Checkbox, DatePicker, Col, Radio, Button, Modal, message } from 'antd'

const Option = Select.Option
const RadioGroup = Radio.Group

class myGoodForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  // 选择select
  handleSelectChange = (value) => {
    console.log(`selected ${value}`)
  }

  // 提交表单
  handleSubmit = (e) => {
    e.preventDefault()
    console.log('收到表单值：', this.props.form.getFieldsValue())

    this.props.form.resetFields()
  }


  // 显示弹框
  showModal = () => {
    this.setState({ visible: true })
  }


  // 隐藏弹框
  hideModal = () => {
    this.setState({ visible: false })
  }

  render() {
    const { getFieldProps } = this.props.form
    console.log('render里面打印东西', getFieldProps)
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 6 }
    }

    const success = function () {
      message.success('操作成功!');
    }
    /*<Form horizontal onSubmit={this.handleSubmit}> 原来antD的语法*/
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          id="control-input"
          label="输入框"
          {...formItemLayout}
          required>
          <Input id="control-input" placeholder="Please enter..."
                 {...getFieldProps('userName')} />
        </Form.Item>

        <Form.Item
          label="日期选择框"
          labelCol={{ span: 3 }}
          required>
          <Col span={4}>
            <Form.Item>
              <DatePicker {...getFieldProps('startDate')} />
            </Form.Item>
          </Col>
          <Col span={1}>
            <p className="ant-form-split">-</p>
          </Col>
          <Col span={4}>
            <Form.Item>
              <DatePicker {...getFieldProps('endDate')} />
            </Form.Item>
          </Col>
        </Form.Item>

        <Form.Item
          id="control-textarea"
          label="文本域"
          {...formItemLayout}>
          <Input type="textarea" id="control-textarea" rows="3"
                 {...getFieldProps('content')} />
        </Form.Item>

        <Form.Item
          id="select"
          label="Select 选择器"
          {...formItemLayout}>
          <Select id="select" size="large" defaultValue="lucy" style={{ width: 200 }} onChange={this.handleSelectChange}
                  {...getFieldProps('people')}>
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>disabled</Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Checkbox 多选框"
          {...formItemLayout}
        >
          <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem1')}>选项一</Checkbox>
          <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem2')}>选项二</Checkbox>
          <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem3')}>选项三</Checkbox>
        </Form.Item>

        <Form.Item
          label="Radio 单选框"
          {...formItemLayout} >
          <RadioGroup defaultValue="b" {...getFieldProps('radioItem')}>
            <Radio value="a">A</Radio>
            <Radio value="b">B</Radio>
            <Radio value="c">C</Radio>
            <Radio value="d">D</Radio>
          </RadioGroup>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 6, offset: 3 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" onClick={success}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.showModal}>点击有惊喜</Button>
        </Form.Item>
        <Modal title="登录" visible={this.state.visible} onOk={this.hideModal} onCancel={this.hideModal}>
          这是一个modal
        </Modal>
      </Form>
    )
  }
}

myGoodForm = Form.create()(myGoodForm)

export default myGoodForm // 这个myGoodForm。四个地方都要有的