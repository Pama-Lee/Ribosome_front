import ProForm, {ProFormText} from "@ant-design/pro-form";
import {UpdateFormProps} from "@/pages/admin/ClubManager/ClubTable";
import React, {useEffect, useState} from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

import {selectPresident} from "@/services/login/api";
import cookie from "react-cookies";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

let president: string = "null";



const fetch = (value: string, callback: Function) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  const getData = () => {

     selectPresident(currentValue).then((res) => {
       const datas: any[] = [];
       for (const data in res.data) {
         datas.push({
            value: res.data[data].value,
            text: res.data[data].label,
         })
       }
      callback(datas);
    });
  }
  timeout = setTimeout(getData, 500);
};


const SearchInput: React.FC<{ placeholder: string; style: React.CSSProperties }> = (props) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();
  const handleSearch = (newValue: string) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue)
    president = newValue;
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};




const UpdateForm: React.FC<UpdateFormProps> = (porps) => {
  console.log(porps.values);
  const sendData = async (value: any) => {
   const values = {
      ...value,
      cid: porps.values.cid,
      token: cookie.load("Ribo_token"),
      president: president,
    }
    await porps.onSubmit(values);
  }
  return(
    <ProForm<{
      name: string;
      description?: string;
      president?: string;
    }>
      onFinish={sendData}
      params={{}}
    >
      <ProFormText
        width="md"
        name="name"
        label="Club Name"
        tooltip="Max length is 24"
        placeholder="Please enter club name"
      />
      <ProFormText width="md" name="description" label="Club Description" placeholder="Please enter club description" />
      <SearchInput placeholder="Club President" style={{ width: 200 }}/>
    </ProForm>
  )
}
export default UpdateForm;
