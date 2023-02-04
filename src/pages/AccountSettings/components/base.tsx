import React, {useState} from 'react';
import { Upload, message} from 'antd';
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form';

import styles from './BaseView.less';
import ImgCrop from 'antd-img-crop';
import cookie from "react-cookies";
import {updateUserInfo} from "@/services/login/api";
import {useModel} from "@@/plugin-model/useModel";


const getSrcFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};



// 头像组件 方便以后独立，增加裁剪之类的功能

const BaseView: React.FC = () => {
  const [fileList, setFileList] = useState([
  ]);

  const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');

  const onChange = ({ fileList: newFileList }) => {
    if (newFileList[0].status == "done"){
      if (newFileList[0].response.msg != "success"){
        newFileList[0].status = "error";
      }
    }
    setFileList(newFileList);
  };

  const onPreview = async (file: any) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  const handleFinish = async (value: any) => {
    console.log(value);
     updateUserInfo({
      ...value,
      token: cookie.load("Ribo_token"),
    }).then((res) => {
      if (res.code === 200) {
        console.log(res);
        message.success("更新成功");
      } else {
        message.error("更新失败");
      }
     });
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              initialValues={{
                ...initialState?.currentUser
              }
              }
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="name"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormText
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的联系电话!',
                  },
                ]}
              >
              </ProFormText>
            </ProForm>
          </div>
          <div className={styles.right}>
            <ImgCrop grid rotate>
              <Upload
                data={{token: cookie.load('Ribo_token')}}
                action="https://api.pamalee.cn/User/UploadAvatar"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
