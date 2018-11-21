import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import { Switch, List, Button, Icon, Modal, Input } from 'antd';

const confirm = Modal.confirm;

class ModelLink extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const param = this.props.stateParam;

		return (
  <div>
    <Modal
      title="Title"
      visible={param.visible}
      onOk={this.props.handleOk}
      confirmLoading={param.confirmLoading}
      onCancel={this.props.handleCancel}
    >
      <Input
        addonBefore="名称"
        style={{ marginBottom: '10px' }}
        size="large"
        placeholder="名称"
        name="name"
        defaultValue={param.name}
        onChange={this.props.handleChange}
      />
      <Input
        addonBefore="图标"
        style={{ marginBottom: '10px' }}
        size="large"
        placeholder='图标'
        name="icon"
        defaultValue={param.icon}
        onChange={this.props.handleChange}
      />
      <Input
        addonBefore="链接"
        style={{ marginBottom: '10px' }}
        size="large"
        placeholder="跳转链接"
        name="url"
        defaultValue={param.url}
        onChange={this.props.handleChange}
      />
      <Input
        addonBefore="描述"
        style={{ marginBottom: '10px' }}
        size="large"
        placeholder="描述"
        name="desc"
        defaultValue={param.desc}
        onChange={this.props.handleChange}
      />
    </Modal>
  </div>
		);
	}
}

class NotificationView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			icon: '',
			url: '',
			desc: '',
			visible: false,
			confirmLoading: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleOk = this.handleOk.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
	}

	handleChange(event) {
		console.log('event.target.name:', event.target.name);
		console.log('event.target.value:', event.target.value);
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = () => {
		this.setState({
			ModalText: 'The modal will be closed after two seconds',
			confirmLoading: true,
		});
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false,
			});
		}, 2000);
	};

	handleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
			visible: false,
		});
	};

	showDeleteConfirm = () => {
		confirm({
			title: 'Are you sure delete this task?',
			content: 'Some descriptions',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				console.log('OK');
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	getData = () => {
		const Action = (
  <div>
    <Switch style={{ marginRight: '10px' }} checkedChildren="开" unCheckedChildren="关" defaultChecked />
    <Button onClick={this.showModal} size="small" style={{ marginRight: '10px' }} type="default">
					修改
    </Button>
    <Button onClick={this.showDeleteConfirm} size="small" style={{ marginRight: '10px' }} type="danger">
					删除
    </Button>
  </div>
		);
		return [
			{
				title: 'github',
				icon: 'github',
				description: 'github 链接',
				url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				actions: [Action],
			},
			{
				title: '微信',
				icon: 'wechat',
				description: '微信 链接',
				url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				actions: [Action],
			},
			{
				title: 'segmentFault',
				icon: 'github',
				description: 'segmentFault 链接',
				url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				actions: [Action],
			},
		];
	};

	render() {
		return (
  <Fragment>
    <div style={{ overflow: 'hidden', padding: '10px 0', borderBottom: '1px solid #eee' }}>
      <Button onClick={this.showModal} style={{ float: 'right', marginRight: '10px' }} type="primary">
						添加
      </Button>
    </div>

    <List
      itemLayout="horizontal"
      dataSource={this.getData()}
      renderItem={item => (
        <List.Item actions={item.actions}>
          <List.Item.Meta title={item.title} description={item.description} />
          <Icon type={item.icon} theme="outlined" style={{ fontSize: '20px', marginRight: '10px' }} />
          {item.url}
        </List.Item>
					)}
    />
    <ModelLink stateParam={this.state} handleCancel={this.handleCancel} handleOk={this.handleOk} handleChange={this.handleChange} />
  </Fragment>
		);
	}
}

export default NotificationView;
