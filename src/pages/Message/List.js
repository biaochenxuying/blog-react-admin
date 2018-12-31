import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Table,
  notification,
  Popconfirm,
  Divider,
  Switch,
  Tag,
  Select,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import MessageComponent from './MessageComponent';

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@connect(({ message }) => ({
  message,
}))
@Form.create()
class TableList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      keyword: '',
      state: '', // 状态 0 是未处理，1 是已处理 ,'' 代表所有留言
      pageNum: 1,
      pageSize: 10,
      columns: [
        {
          title: '用户名',
          dataIndex: 'name',
        },
        {
          title: 'email',
          dataIndex: 'email',
        },
        {
          title: '头像',
          dataIndex: 'avatar',
        },
        {
          title: 'phone',
          dataIndex: 'phone',
        },
        // {
        // 	title: '用户介绍',
        // 	dataIndex: 'introduce',
        // },
        {
          title: '内容',
          width: 300,
          dataIndex: 'content',
        },
        {
          title: '状态',
          dataIndex: 'state',
          render: val => (val ? <Tag color="green">已经处理</Tag> : <Tag color="red">未处理</Tag>),
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
          title: '操作',
          width: 150,
          render: (text, record) => (
            <div>
              <Fragment>
                <a onClick={() => this.showReplyModal(true, record)}>回复</a>
              </Fragment>
              <Divider type="vertical" />
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(text, record)}>
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            </div>
          ),
        },
      ],
    };

    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showReplyModal = this.showReplyModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
  }

  componentDidMount() {
    this.handleSearch(this.state.pageNum, this.state.pageSize);
  }

  handleChangeState(state) {
    this.setState(
      {
        state,
      },
      () => {
        this.handleSearch();
      }
    );
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
      }
    );
  }

  showReplyModal = (text, record) => {
    const { dispatch } = this.props;
    const params = {
      id: record._id,
    };
    new Promise(resolve => {
      dispatch({
        type: 'message/getMessageDetail',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      // console.log('res :', res)
      if (res.code === 0) {
        this.setState({
          visible: true,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
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
      state: this.state.state,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'message/queryMessage',
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
        type: 'message/delMessage',
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
                placeholder="留言内容"
                value={this.state.keyword}
                onChange={this.handleChangeKeyword}
              />
            </FormItem>

            <Select
              style={{ width: 200, marginRight: 20 }}
              placeholder="选择状态"
              onChange={this.handleChangeState}
            >
              <Select.Option value="">所有</Select.Option>
              <Select.Option value="0">未处理</Select.Option>
              <Select.Option value="1">已处理</Select.Option>
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
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { messageList, total } = this.props.message;
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
      <PageHeaderWrapper title="留言管理">
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
              dataSource={messageList}
            />
          </div>
        </Card>
        <MessageComponent
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
