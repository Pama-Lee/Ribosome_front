import {Button, Form, Input, message} from "antd";
import {newClubAnnouncement} from "@/services/login/api";
import cookie from "react-cookies";
import {useParams} from "umi";

const Announcement = () => {
  const [form] = Form.useForm();
  const param: any = useParams();
  return(
    <>
    <Form
      onFinish={
        (values) => {
          newClubAnnouncement({
            title: values.title,
            content: values.content,
            token: cookie.load("Ribo_token"),
            cid: param.id
          }).then((res) => {
            if (res.status === 200 || res.status === '200' || res.message === 'success'){
              message.success("发布成功")
              form.resetFields();
            } else {
              message.error("发布失败")
            }
          })
        }
      }
      form={form}
      layout="vertical"
      >
      <Form.Item
        label="公告标题"
        name="title"
        rules={[{required: true, message: '请输入公告标题'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="公告内容"
        name="content"
        rules={[{required: true, message: '请输入公告内容'}]}
      >
        <Input.TextArea/>
      </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">提交</Button>
    </Form.Item>
    </Form>
    </>
  )
}

export default Announcement;
