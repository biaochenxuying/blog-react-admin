import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import domain from '@/utils/domain.js';
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
  Tag,
  Select,
  Avatar,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ArticleComponent from './ArticleComponent';
import CommentsComponent from './CommentsComponent';

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@connect(({ article }) => ({
  article,
}))
@Form.create()
class TableList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      changeType: false,
      title: '',
      author: 'biaochenxuying',
      keyword: '',
      content: '',
      desc: '',
      img_url: '',
      origin: 0, // 0 原创，1 转载，2 混合
      state: 1, // 文章发布状态 => 0 草稿，1 已发布
      type: 1, // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
      tags: '',
      category: '',
      tagsDefault: [],
      categoryDefault: [],
      searchState: '', // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
      searchKeyword: '',
      visible: false,
      article_id: '',
      commentsVisible: false,
      loading: false,
      pageNum: 1,
      pageSize: 10,
      columns: [
        {
          title: '标题',
          width: 120,
          dataIndex: 'title',
        },
        {
          title: '作者',
          width: 80,
          dataIndex: 'author',
        },
        {
          title: '关键字',
          width: 80,
          dataIndex: 'keyword',
          render: arr => (
            <span>
              {arr.map(item => (
                <span color="magenta" key={item}>
                  {item}
                </span>
              ))}
            </span>
          ),
        },
        {
          title: '封面图',
          width: 50,
          dataIndex: 'img_url',
          render: val => <Avatar shape="square" src={val} size={40} icon="user" />,
        },
        {
          title: '标签',
          dataIndex: 'tags',
          width: 60,
          render: arr => (
            <span>
              {arr.map(item => (
                <Tag color="cyan" key={item.id}>
                  {item.name}
                </Tag>
              ))}
            </span>
          ),
        },
        {
          title: '分类',
          dataIndex: 'category',
          width: 70,
          render: arr => (
            <span>
              {arr.map(item => (
                <Tag color="blue" key={item.id}>
                  {item.name}
                </Tag>
              ))}
            </span>
          ),
        },
        {
          title: '状态',
          dataIndex: 'state',
          width: 70,
          render: val => {
            // 文章发布状态 => 0 草稿，1 已发布
            if (val === 0) {
              return <Tag color="red">草稿</Tag>;
            }
            if (val === 1) {
              return <Tag color="green">已发布</Tag>;
            }
          },
        },
        {
          title: '评论是否处理过',
          dataIndex: 'comments',
          width: 50,
          render: comments => {
            // console.log('comments',comments)
            let flag = 1;
            let length = comments.length;
            if (length) {
              for (let i = 0; i < length; i++) {
                flag = comments[i].is_handle;
              }
            }
            // 新添加的评论 是否已经处理过 => 1 是 / 2 否
            if (flag === 2) {
              return <Tag color="red">否</Tag>;
            }
            return <Tag color="green">是</Tag>;
          },
        },
        {
          title: '观看/点赞/评论',
          width: 120,
          dataIndex: 'meta',
          render: val => (
            <div>
              <span>{val.views}</span> | <span>{val.likes}</span> | <span>{val.comments}</span>
            </div>
          ),
        },
        {
          title: '原创状态',
          dataIndex: 'origin',
          width: 50,
          render: val => {
            // 文章转载状态 => 0 原创，1 转载，2 混合
            if (val === 0) {
              return <Tag color="green">原创</Tag>;
            }
            if (val === 1) {
              return <Tag color="red">转载</Tag>;
            }
            return <Tag>混合</Tag>;
          },
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
          title: '操作',
          width: 220,
          render: (text, record) => (
            <div>
              <Fragment>
                <a onClick={() => this.showModal(record)}>修改</a>
              </Fragment>
              <Divider type="vertical" />
              <Fragment>
                <a onClick={() => this.showCommentModal(record)}>评论</a>
              </Fragment>
              <Divider type="vertical" />
              <Fragment>
                <a href={`${domain}articleDetail?article_id=${record._id}`} target="_blank">
                  详情
                </a>
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

    this.handleChangeSearchKeyword = this.handleChangeSearchKeyword.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showCommentModal = this.showCommentModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCommentsCancel = this.handleCommentsCancel.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSearchState = this.handleChangeSearchState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getArticleDetail = this.getArticleDetail.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangeImgUrl = this.handleChangeImgUrl.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount() {
    this.handleSearch(this.state.pageNum, this.state.pageSize);
  }

  handleSubmit() {
    const { dispatch } = this.props;
    const { articleDetail } = this.props.article;
    if (!this.state.title) {
      notification.error({
        message: '文章标题不能为空',
      });
      return;
    }
    if (!this.state.keyword) {
      notification.error({
        message: '文章关键字不能为空',
      });
      return;
    }
    if (!this.state.content) {
      notification.error({
        message: '文章内容不能为空',
      });
      return;
    }
    if (keyword instanceof Array) {
      keyword = keyword.join(',');
    }
    this.setState({
      loading: true,
    });

    let keyword = this.state.keyword;
    if (keyword instanceof Array) {
      keyword = keyword.join(',');
    }
    if (this.state.changeType) {
      const params = {
        id: articleDetail._id,
        title: this.state.title,
        author: this.state.author,
        desc: this.state.desc,
        keyword,
        content: this.state.content,
        img_url: this.state.img_url,
        origin: this.state.origin,
        state: this.state.state,
        type: this.state.type,
        tags: this.state.tags,
        category: this.state.category,
      };
      new Promise(resolve => {
        dispatch({
          type: 'article/updateArticle',
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
          this.setState({
            visible: false,
            changeType: false,
            title: '',
            author: 'biaochenxuying',
            keyword: '',
            content: '',
            desc: '',
            img_url: '',
            origin: 0, // 0 原创，1 转载，2 混合
            state: 1, // 文章发布状态 => 0 草稿，1 已发布
            type: 1, // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
            tags: '',
            category: '',
            tagsDefault: [],
            categoryDefault: [],
          });
          this.handleSearch(this.state.pageNum, this.state.pageSize);
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    } else {
      const params = {
        title: this.state.title,
        author: this.state.author,
        desc: this.state.desc,
        keyword: this.state.keyword,
        content: this.state.content,
        img_url: this.state.img_url,
        origin: this.state.origin,
        state: this.state.state,
        type: this.state.type,
        tags: this.state.tags,
        category: this.state.category,
      };
      new Promise(resolve => {
        dispatch({
          type: 'article/addArticle',
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
          this.setState({
            visible: false,
            chnageType: false,
          });
          this.handleSearch(this.state.pageNum, this.state.pageSize);
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    }
  }

  handleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleChangeAuthor(event) {
    this.setState({
      author: event.target.value,
    });
  }

  handleChangeContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleChangeImgUrl(event) {
    this.setState({
      img_url: event.target.value,
    });
  }

  handleChangeKeyword(event) {
    this.setState({
      keyword: event.target.value,
    });
  }

  handleChangeOrigin(value) {
    this.setState({
      origin: value,
    });
  }

  handleChangeDesc(event) {
    this.setState({
      desc: event.target.value,
    });
  }

  handleChangeType(value) {
    console.log('type :', value);
    this.setState({
      type: value,
    });
  }

  handleTagChange(value) {
    const tags = value.join();
    console.log('tags :', tags);
    this.setState({
      tagsDefault: value,
      tags,
    });
  }

  handleCategoryChange(value) {
    const category = value.join();
    console.log('category :', category);
    this.setState({
      categoryDefault: value,
      category,
    });
  }

  handleChangeState(value) {
    this.setState({
      state: value,
    });
  }

  handleChangeSearchState(searchState) {
    this.setState(
      {
        searchState,
      },
      () => {
        this.handleSearch();
      }
    );
  }

  handleChangeSearchKeyword(event) {
    this.setState({
      searchKeyword: event.target.value,
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

  getArticleDetail(callback) {
    const { dispatch } = this.props;
    const params = {
      id: this.state.article_id,
      filter: 2, // 文章的评论过滤 => 1: 过滤，2: 不过滤
    };
    new Promise(resolve => {
      dispatch({
        type: 'article/getArticleDetail',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      callback ? callback() : null;
      // console.log('callback',callback)
    });
  }

  showCommentModal = record => {
    console.log('record._id:', record._id);
    if (!record._id) {
      return;
    }
    this.setState(
      {
        article_id: record._id,
      },
      () => {
        this.getArticleDetail(e => {
          this.setState({
            commentsVisible: true,
          });
        });
      }
    );
  };

  showModal = record => {
    if (record._id) {
      const { dispatch } = this.props;
      const params = {
        id: record._id,
        filter: 2, // 文章的评论过滤 => 1: 过滤，2: 不过滤
      };
      new Promise(resolve => {
        dispatch({
          type: 'article/getArticleDetail',
          payload: {
            resolve,
            params,
          },
        });
      }).then(res => {
        // console.log('res :', res)
        const tagsArr = [];
        if (res.data.tags.length) {
          for (let i = 0; i < res.data.tags.length; i++) {
            const e = res.data.tags[i];
            tagsArr.push(e._id);
          }
        }
        const tags = tagsArr.length ? tagsArr.join() : '';
        const categoryArr = [];
        if (res.data.category.length) {
          for (let i = 0; i < res.data.category.length; i++) {
            const e = res.data.category[i];
            categoryArr.push(e._id);
          }
        }
        const category = categoryArr.length ? categoryArr.join() : '';
        console.log('tagsArr :', tagsArr);
        console.log('categoryArr :', categoryArr);
        if (res.code === 0) {
          this.setState({
            visible: true,
            changeType: true,
            title: res.data.title,
            content: res.data.content,
            state: res.data.state,
            author: res.data.author,
            keyword: res.data.keyword,
            desc: res.data.desc,
            img_url: res.data.img_url,
            origin: res.data.origin, // 0 原创，1 转载，2 混合
            tags,
            category,
            tagsDefault: tagsArr,
            categoryDefault: categoryArr,
          });
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    } else {
      this.setState({
        visible: true,
        changeType: false,
        title: '',
        author: 'biaochenxuying',
        keyword: '',
        content: '',
        desc: '',
        img_url: '',
        origin: 0, // 0 原创，1 转载，2 混合
        state: 1, // 文章发布状态 => 0 草稿，1 已发布
        type: 1, // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
        tags: '',
        category: '',
      });
    }
  };

  handleOk = () => {
    this.handleSubmit();
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  handleCommentsCancel = e => {
    this.setState({
      commentsVisible: false,
    });
  };

  handleSearch = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      keyword: this.state.searchKeyword,
      state: this.state.searchState,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'article/queryArticle',
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
        type: 'article/delArticle',
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
                placeholder="标题/描述"
                value={this.state.searchKeyword}
                onChange={this.handleChangeSearchKeyword}
              />
            </FormItem>

            <Select
              style={{ width: 200, marginRight: 20 }}
              placeholder="选择状态"
              onChange={this.handleChangeSearchState}
            >
              {/* 文章发布状态 => 0 草稿，1 已发布'' 代表所有文章 */}
              <Select.Option value="">所有</Select.Option>
              <Select.Option value="0">草稿</Select.Option>
              <Select.Option value="1">已发布</Select.Option>
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
                onClick={() => {
                  this.showModal(0);
                }}
                style={{ marginTop: '3px', marginLeft: '10px' }}
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
    const { articleList, total } = this.props.article;
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
      <PageHeaderWrapper title="文章管理">
        <Card bordered={false}>
          <div className="">
            <div className="">{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              pagination={pagination}
              loading={this.state.loading}
              pagination={pagination}
              rowKey={record => record._id}
              columns={this.state.columns}
              bordered
              dataSource={articleList}
            />
          </div>
        </Card>

        <CommentsComponent
          commentsVisible={this.state.commentsVisible}
          handleCommentsCancel={this.handleCommentsCancel}
          getArticleDetail={this.getArticleDetail}
        />

        <ArticleComponent
          changeType={this.state.changeType}
          title={this.state.title}
          author={this.state.author}
          content={this.state.content}
          state={this.state.state}
          type={this.state.type}
          keyword={this.state.keyword}
          origin={this.state.origin}
          desc={this.state.desc}
          img_url={this.state.img_url}
          visible={this.state.visible}
          tagsDefault={this.state.tagsDefault}
          categoryDefault={this.state.categoryDefault}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          handleChange={this.handleChange}
          handleChangeAuthor={this.handleChangeAuthor}
          handleChangeState={this.handleChangeState}
          handleChangeOrigin={this.handleChangeOrigin}
          handleChangeContent={this.handleChangeContent}
          handleChangeKeyword={this.handleChangeKeyword}
          handleChangeDesc={this.handleChangeDesc}
          handleChangeImgUrl={this.handleChangeImgUrl}
          handleCategoryChange={this.handleCategoryChange}
          handleTagChange={this.handleTagChange}
          handleChangeType={this.handleChangeType}
        />
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
