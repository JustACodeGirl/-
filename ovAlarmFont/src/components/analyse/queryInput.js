import React, { PropTypes } from 'react'
import styles from './queryInput.less'
import { Select, Button, Input, Icon,Row, Col,DatePicker,Form  } from 'antd'
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;

class QueryInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {             //控制display的值来隐藏与显示
      startTime:null,
      endTime:null,
      state:null,
      keyword:null,
    }
  };
  componentDidMount=()=> {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    const inputQuery = this.props.inputQuery;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
      let searchItem ={
        startTime:this.state.startTime,
        endTime:this.state.endTime,
        state:values.state,
        keyword:values.keyword,
      }
      inputQuery(searchItem);
    });
  } ;
  handleMouseover =()=>{
    const inputQuery = this.props.inputQuery;
    let searchItem ={
      startTime:'',
      endTime:'',
      state:'',
      keyword:'',
    }
    inputQuery(searchItem);
  }

  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,setFieldsValue } = this.props.form;
    const {searchItem} = this.props;
    const handleChange =(value) => {
    };
    const onChangeStartTime=(date, dateString)=> {
      this.setState({
        startTime:Date.parse(date)
      });
    };
    const onChangeEndTime=(date, dateString)=> {
      this.setState({
        endTime:Date.parse(date)
      });
    };
    const onOk=(value)=> {
    };
    return (
      <div className={styles.query}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            <lable >开始日期:</lable>
            {getFieldDecorator('startTime')(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width:250}} onChange={onChangeStartTime}/>
            )}
          </FormItem>
          <FormItem>
            <lable style={{paddingRight :5}}>结束日期:</lable>
            {getFieldDecorator('endTime')(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width:250}} onChange={onChangeEndTime}/>  )}
          </FormItem>
          <FormItem>
            <lable style={{paddingRight :5}}>案件状态:</lable>
            {getFieldDecorator('state')(
              <Select showSearch style={{ width: 150 }} placeholder="待办" optionFilterProp="children" onChange={handleChange}
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                <Option value="待办">待办</Option>
                <Option value="处理中">处理中</Option>
                <Option value="办结">办结</Option>
                <Option value="挂起">挂起</Option>
                <Option value="退回">退回</Option>
                <Option value="作废">作废</Option>
              </Select> )}
          </FormItem>
          <FormItem label="关键词：">
            {getFieldDecorator('keyword', {
              initialValue: "",
              rules: [
                {
                  required: false,
                  message: '',
                },
              ],
            })(<Input/>)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button size="large" icon="reload" style={{marginLeft: 4, borderRadius: 3}} onClick={this.handleMouseover}>重置</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}


QueryInput.propTypes = {
};

export default Form.create()(QueryInput)
