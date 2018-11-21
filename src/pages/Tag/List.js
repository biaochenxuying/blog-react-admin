import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Button, Table, notification, Popconfirm } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import TagComponent from './TagComponent';

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@connect(({ tag }) => ({
	tag
}))
@Form.create()
class TableList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			loading: false,
			keyword: '',
			pageNum: 1,
			pageSize: 10,
			name: '',
			desc: '',
			columns: [
				{
					title: '标签名',
					dataIndex: 'name',
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
  <Fragment>
    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(text, record)}>
      <a href="javascript:;">Delete</a>
    </Popconfirm>
  </Fragment>
					),
				},
			],
		};
		this.createRef = React.createRef();
		this.handleChange = this.handleChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
		this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
		this.handleOk = this.handleOk.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		this.handleSearch(this.state.pageNum, this.state.pageSize);
	}

	handleChange(event) {
		// console.log('event :', event)
		this.setState({
			name: event.target.value,
		});
	}

	handleDescChange(event) {
		// console.log('event :', event)
		this.setState({
			desc: event.target.value,
		});
	}

	handleChangeKeyword(event) {
		// console.log('event :', event)
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

	handleOk = e => {
		const { dispatch } = this.props;
		const params = {
			name: this.state.name,
			desc: this.state.desc,
		};
		new Promise(resolve => {
			dispatch({
				type: 'tag/addTag',
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
			pageNum: this.state.pageNum,
			pageSize: this.state.pageSize,
		};
		new Promise(resolve => {
			dispatch({
				type: 'tag/queryTag',
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
				type: 'tag/delTag',
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
            placeholder="标签名"
            value={this.state.keyword}
            onChange={this.handleChangeKeyword}
          />
        </FormItem>

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
		const { tagList, total } = this.props.tag;
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
  <PageHeaderWrapper title="标签管理">
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
          dataSource={tagList}
        />
      </div>
    </Card>
    <TagComponent
      ref={this.createRef}
      name={this.state.name}
      desc={this.state.desc}
      visible={this.state.visible}
      showModal={this.showModal}
      handleChange={this.handleChange}
      handleDescChange={this.handleDescChange}
      handleOk={this.handleOk}
      handleCancel={this.handleCancel}
    />
  </PageHeaderWrapper>
		);
	}
}

export default TableList;
