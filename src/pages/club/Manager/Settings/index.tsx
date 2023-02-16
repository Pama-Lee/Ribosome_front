
import {Button, Form, Input, Switch} from "antd";


const Settings = () => {

  return(
    <>
      <h1>Basic Information Update</h1><br/>
      <Form
      name={'basic'}
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}

      >
        <Form.Item
          label="Club Name"
          name="clubName"
          rules={[{ required: true, message: 'Please input club name' }]}
        >
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item
          label="Club Description"
          name="clubDescription"
          rules={[{ required: true, message: 'Please input club description' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Accept the application"
          name="application"
          rules={[{ required: true}]}
        >
          <Switch
            defaultChecked
            onChange={true} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )

}

export default Settings;
