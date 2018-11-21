import React from 'react';
import { Row, Col, Input, Modal, Select, notification, Button } from 'antd';
import { connect } from 'dva';

@connect(({ message }) => ({
	message,
}))
class MessageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			state: '',
			content: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
	}

	componentDidMount() {}

	submit() {
		const { dispatch } = this.props;
		const { messageDetail } = this.props.message;
		const params = {
			id: messageDetail._id,
			state: this.state.state,
			content: this.state.content,
		};
		new Promise(resolve => {
			dispatch({
				type: 'message/addReplyMessage',
				payload: {
					resolve,
					params,
				},
			});
		}).then(res => {
			if (res.code === 0) {
				notification.success({
					message: res.message,
				});
			} else {
				notification.error({
					message: res.message,
				});
			}
		});
	}

	handleChange(event) {
		this.setState({
			content: event.target.value,
		});
	}

	handleStateChange(value) {
		this.setState({
			state: value,
		});
	}

	render() {
		const globalStyle = {
			marginBottom: 20,
		};
		const titleStyle = {
			textAlign: 'left',
			borderLeft: '5px solid #1890FF',
			paddingLeft: '10px',
			fontSize: '20px',
			margin: '20px 0',
		};
		const contentStyle = {
			textAlign: 'center',
			padding: '30px 0',
		};
		const normalLeft = {
			textAlign: 'left',
			paddingBottom: 20,
			borderTop: '1px solid #eee',
		};
		const { TextArea } = Input;
		const { messageDetail } = this.props.message;
		const list = messageDetail.reply_list.map(e => (
  <div key={e._id} style={contentStyle}>
    {' '}
    {e.content}
  </div>
		));

		return (
  <div>
    <Modal
      title="留言详情与回复"
      visible={this.props.visible}
      onOk={this.props.handleOk}
      width="1000px"
      onCancel={this.props.handleCancel}
    >
      <Row style={globalStyle}>
        <div style={titleStyle}> 用户</div>
        <div style={contentStyle}>
          <Col style={globalStyle} span={6}>
								用户名：
          </Col>
          <Col style={globalStyle} span={6}>
            {messageDetail.name}
          </Col>
          <Col style={globalStyle} span={6}>
								手机：
          </Col>
          <Col style={globalStyle} span={6}>
            {messageDetail.phone}
          </Col>
          <Col style={globalStyle} span={6}>
								邮箱：
          </Col>
          <Col style={globalStyle} span={6}>
            {messageDetail.email}
          </Col>
          <Col style={globalStyle} span={6}>
								介绍：
          </Col>
          <Col style={globalStyle} span={6}>
            {messageDetail.introduce}
          </Col>
        </div>
      </Row>
      <Row style={normalLeft}>
        <div style={titleStyle}> 留言 </div>
        <div style={contentStyle}> {messageDetail.content}</div>
      </Row>
      <Row style={normalLeft}>
        <div style={titleStyle}> 回复内容 </div>
        {list || <div style={contentStyle}>暂无回复！</div>}
      </Row>
      <Row style={normalLeft}>
        <div style={titleStyle}> 添加回复</div>
        <TextArea
          size="large"
          placeholder="添加回复内容"
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <Select
          style={{ width: 300, marginTop: 20, marginBottom: 20 }}
          placeholder="选择状态"
          defaultValue={messageDetail.state ? '已处理' : '未处理'}
          onChange={this.handleStateChange}
        >
          <Select.Option value="0">未处理</Select.Option>
          <Select.Option value="1">已处理</Select.Option>
        </Select>

        <div>
          <Button style={{ marginTop: 20 }} onClick={this.submit} type="primary">
								提交回复
          </Button>
        </div>
      </Row>
    </Modal>
  </div>
		);
	}
}

export default MessageComponent;
