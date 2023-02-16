import {Button, Cascader, Col, DatePicker, Form, Input, message, Row} from "antd";
import {PageLoading, ProColumns, ProTable} from "@ant-design/pro-components";
import {getClassroomArrangement, getClassroomAvailable, newClassroomApplication} from "@/services/login/api";
import {useState} from "react";
import {useParams} from "umi";
import cookie from "react-cookies";

const Classroom = () => {
  interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;
    children?: Option[];
  }

  let options: Option[] = [];

  const param: any = useParams();
  const [state, setState] = useState<{
    loading: boolean;
    options?: Option[];
    table?: any;
  }>({
    loading: true,
  })

  if (state.loading) {
    getClassroomAvailable({
      cid: param.id,
      token: cookie.load("Ribo_token"),
    }).then((res) => {

      getClassroomArrangement({
        cid: param.id,
        token: cookie.load("Ribo_token"),
      }).then((ress) => {
        setState({
          loading: false,
          options: res,
          table: ress.data,
        })
      });
    })
    return <PageLoading/>
  }
  const handleSubmitNewApplication = (value: any) => {

    let data: string = "";

    // 将[2021-05-01,1,4],[2021-05-01,1,4]转换为
    //[2021-05-01,1,4]+[2021-05-01,1,4]

    for (let i = 0; i < value.classroom.length; i++) {
      data += value.classroom[i].join(",");
      if (i !== value.classroom.length - 1) {
        data += "+";
      }
    }

    const reason: any = value.reason;

    newClassroomApplication({
      cid: param.id,
      token: cookie.load("Ribo_token"),
      data: data,
      reason: reason
    }).then((res) => {
      if (res.code === 200 || res.code === '200' || res.message === 'success' || res.message === 'Success') {
        message.success("申请提交成功")
      } else {
        message.error("申请提交失败")
      }
    });
  }


  const onChange = (value: string[][]) => {
    // // 不允许全选某个父节点
    // if (value.length >= 1) {
    //   for (let i = 0; i < value.length; i++) {
    //     if (value[i].length < 3) {
    //       message.warn('没必要选择一整天吧?');
    //       value.splice(i, 1);
    //       return;
    //     }
    //   }
    // }
  };

  const columns: ProColumns[] = [{
    title: '教室',
    dataIndex: 'cn',
    valueType: 'text',
  },
    {
      title: '申请理由',
      dataIndex: 'reason',
      valueType: 'text',
    },
    {
      title: '申请时间',
      dataIndex: 'time',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      valueEnum: {
        1: {text: '已通过', status: 'Success'},
        2: {text: '未通过', status: 'Error'},
        0: {text: '待审核', status: 'Processing'},
      }

    }];
  return(
    <>
    <Row>
      <Col md={10}>
        <Form
        style={{ maxWidth: 400 }}
        onFinish={(values) => {
          handleSubmitNewApplication(values)
        }
        }
      >
        <Form.Item
          label="教室"
          name="classroom"
          rules={[{required: true, message: '请选择教室'}]}
        >
          <Cascader
            placeholder="Please select"
            style={{ width: '100%' }}
            options={state.options || []}
            onChange={onChange}
            multiple
            maxTagCount="responsive"
          />
        </Form.Item>
        <Form.Item
          label="申请理由"
          name="reason"
          rules={[{required: true, message: '请输入申请理由'}]}
        >
          <Input.TextArea/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form></Col>
      <Col md={14}>
        <ProTable
          columns={columns}
          dataSource={state.table || []}
          search={false}
          pagination={false}
          dateFormatter="string"
          headerTitle="申请列表"
          >

        </ProTable>
      </Col>

    </Row>





    </>




  )


}
export default Classroom;
