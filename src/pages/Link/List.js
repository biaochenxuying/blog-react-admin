import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Button, Table, notification, Popconfirm, Switch, Tag, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import LinkComponent from './LinkComponent';

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@connect(({ link }) => ({
	link,
}))
@Form.create()
class TableList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			loading: false,
			keyword: '',
			type: '', // 1 :其他友情链接 2: 是博主的个人链接 ,'' 代表所有链接
			url: '',
			icon: '',
			pageNum: 1,
			pageSize: 10,
			name: '',
			desc: '',
			columns: [
				{
					title: '链接名',
					dataIndex: 'name',
				},
				{
					title: '图标',
					dataIndex: 'icon',
				},
				{
					title: 'url',
					dataIndex: 'url',
				},
				{
					title: '描述',
					dataIndex: 'desc',
				},
				{
					title: '类型',
					dataIndex: 'type',
					render: val => (val ? <Tag color="green">博主链接</Tag> : <Tag>其他友情链接</Tag>),
				},
				{
					title: '状态',
					dataIndex: 'state',
					render: val => <Switch defaultChecked={!!val} disabled />,
				},
				{
					title: '创建时间',
					dataIndex: 'create_time',
					sorter: true,
					render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
				},
				{
					title: '操作',
					render: (text, record) => (
  <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(text, record)}>
    <a href="javascript:;">Delete</a>
  </Popconfirm>
					),
				},
			],
		};
		this.createRef = React.createRef();
		this.handleChange = this.handleChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
		this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
		this.handleIconChange = this.handleIconChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleUrlChange = this.handleUrlChange.bind(this);
		this.handleOk = this.handleOk.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.onChangeState = this.onChangeState.bind(this);
		this.handleChangeType = this.handleChangeType.bind(this);
	}

	componentDidMount() {
		this.handleSearch(this.state.pageNum, this.state.pageSize);
	}

	onChangeState(text, record, state) {
		console.log('text :', text);
		console.log('record :', record);
		console.log('state :', state);
		// updateLink
		this.setState(
			{
				state,
			},
			() => {
				const { dispatch } = this.props;
				const params = {
					state: this.state.state,
				};
				return;
				new Promise(resolve => {
					dispatch({
						type: 'link/updateLink',
						payload: {
							resolve,
							params,
						},
					});
				}).then(res => {
					// console.log('res :', res);
					if (res.code === 0) {
						notification.success({
							message: res.message,
						});
						this.setState({
							visible: false,
						});
						this.setState({
							name: '',
						});
						this.handleSearch(this.state.pageNum, this.state.pageSize);
					} else {
						notification.error({
							message: res.message,
						});
					}
				});
			},
		);
	}

	handleChangeType(type) {
		this.setState(
			{
				type,
			},
			() => {
				this.handleSearch();
			},
		);
	}

	handleChange(event) {
		this.setState({
			name: event.target.value,
		});
	}

	handleDescChange(event) {
		this.setState({
			desc: event.target.value,
		});
	}

	handleUrlChange(event) {
		this.setState({
			url: event.target.value,
		});
	}

	handleIconChange(event) {
		this.setState({
			icon: event.target.value,
		});
	}

	handleTypeChange(event) {
		this.setState({
			type: event.target.value,
		});
	}

	handleChangeKeyword(event) {
		this.setState({
			keyword: event.target.value,
		});
	}

	handleChangePageParam(pageNum, pageSize) {
		this.setState(
			{
				pageNum,
				pageSize,
			},
			() => {
				this.handleSearch();
			},
		);
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = () => {
		const { dispatch } = this.props;
		const params = {
			name: this.state.name,
			url: this.state.url,
			icon: this.state.icon,
			type: this.state.type,
			desc: this.state.desc,
		};
		new Promise(resolve => {
			dispatch({
				type: 'link/addLink',
				payload: {
					resolve,
					params,
				},
			});
		}).then(res => {
			// console.log('res :', res);
			if (res.code === 0) {
				notification.success({
					message: res.message,
				});
				this.setState({
					visible: false,
				});
				this.setState({
					name: '',
				});
				this.handleSearch(this.state.pageNum, this.state.pageSize);
			} else {
				notification.error({
					message: res.message,
				});
			}
		});
	};

	handleCancel = e => {
		this.setState({
			visible: false,
		});
	};

	handleSearch = () => {
		this.setState({
			loading: true,
		});
		const { dispatch } = this.props;
		const params = {
			keyword: this.state.keyword,
			type: this.state.type,
			pageNum: this.state.pageNum,
			pageSize: this.state.pageSize,
		};
		new Promise(resolve => {
			dispatch({
				type: 'link/queryLink',
				payload: {
					resolve,
					params,
				},
			});
		}).then(res => {
			// console.log('res :', res);
			if (res.code === 0) {
				this.setState({
					loading: false,
				});
			} else {
				notification.error({
					message: res.message,
				});
			}
		});
	};

	handleDelete = (text, record) => {
		// console.log('text :', text);
		// console.log('record :', record);
		const { dispatch } = this.props;
		const params = {
			id: record._id,
		};
		new Promise(resolve => {
			dispatch({
				type: 'link/delLink',
				payload: {
					resolve,
					params,
				},
			});
		}).then(res => {
			// console.log('res :', res);
			if (res.code === 0) {
				notification.success({
					message: res.message,
				});
				this.handleSearch(this.state.pageNum, this.state.pageSize);
			} else {
				notification.error({
					message: res.message,
				});
			}
		});
	};

	renderSimpleForm() {
		return (
  <Form layout="inline" style={{ marginBottom: '20px' }}>
    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
      <Col md={24} sm={24}>
        <FormItem>
          <Input
            placeholder="链接名"
            value={this.state.keyword}
            onChange={this.handleChangeKeyword}
          />
        </FormItem>

        <Select
          style={{ width: 200, marginRight: 20 }}
          placeholder="选择类型"
          onChange={this.handleChangeType}
        >
          <Select.Option value="">所有</Select.Option>
          <Select.Option value="1">其他链接</Select.Option>
          <Select.Option value="2">博主链接</Select.Option>
        </Select>

        <span>
          <Button
            onClick={this.handleSearch}
            style={{ marginTop: '3px' }}
            type="primary"
            icon="search"
          >
								Search
          </Button>
        </span>
        <span>
          <Button
            style={{ marginTop: '3px', marginLeft: '20px' }}
            onClick={this.showModal}
            type="primary"
          >
								新增
          </Button>
        </span>
      </Col>
    </Row>
  </Form>
		);
	}

	render() {
		const { linkList, total } = this.props.link;
		const { pageNum, pageSize } = this.state;
		const pagination = {
			total,
			defaultCurrent: pageNum,
			pageSize,
			showSizeChanger: true,
			onShowSizeChange: (current, pageSize) => {
				// console.log('current, pageSize :', current, pageSize);
				this.handleChangePageParam(current, pageSize);
			},
			onChange: (current, pageSize) => {
				this.handleChangePageParam(current, pageSize);
			},
		};

		return (
  <PageHeaderWrapper title="链接管理">
    <Card bordered={false}>
      <div className="">
        <div className="">{this.renderSimpleForm()}</div>
        <Table
          pagination={pagination}
          loading={this.state.loading}
          pagination={pagination}
          rowKey={record => record._id}
          columns={this.state.columns}
          bordered
          dataSource={linkList}
        />
      </div>
    </Card>
    <LinkComponent
      ref={this.createRef}
      name={this.state.name}
      icon={this.state.icon}
      url={this.state.url}
      type={this.state.type}
      desc={this.state.desc}
      visible={this.state.visible}
      showModal={this.showModal}
      handleChange={this.handleChange}
      handleDescChange={this.handleDescChange}
      handleTypeChange={this.handleTypeChange}
      handleUrlChange={this.handleUrlChange}
      handleIconChange={this.handleIconChange}
      handleOk={this.handleOk}
      handleCancel={this.handleCancel}
    />
  </PageHeaderWrapper>
		);
	}
}

export default TableList;
