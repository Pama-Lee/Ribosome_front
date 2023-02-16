import { ContactsOutlined, ClusterOutlined } from '@ant-design/icons';
import {  Card, Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { RouteChildrenProps } from 'react-router';
import Applications from './components/Applications';
import type { CurrentUser, tabKeyType } from './data.d';
import styles from './Center.less';
import Message from "@/pages/AccountCenter/components/Message";
import {useModel} from "@@/plugin-model/useModel";





const AccountCenter: React.FC<RouteChildrenProps> = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('message');

  const { initialState, loading } = useModel('@@initialState');
  console.log(initialState)
  const operationTabList = [
    {
      key: 'message',
      tab: (
        <span>
        消息 <span style={{ fontSize: 14 }}>({initialState?.messageCount || 0})</span>
      </span>
      ),
    },
    {
      key: 'applications',
      tab: (
        <span>
        申请结果 <span style={{ fontSize: 14 }}>({initialState?.applicationCount || 0})</span>
      </span>
      ),
    },
  ];

  //  渲染用户信息
  const renderUserInfo = ({ title, group, geographic }: Partial<CurrentUser>) => {
    return (
      <div className={styles.detail}>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          学号
        </p>
        <p>
          <ClusterOutlined
            style={{
              marginRight: 8,
            }}
          />
          专业
        </p>
      </div>
    );
  };

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'message') {
      return <Message />;
    }
    if (tabValue === 'applications') {
      return <Applications />;
    }
    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24} xs={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            {!loading && initialState?.currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={initialState?.currentUser.avatar} />
                  <div className={styles.name}>{initialState?.currentUser.name}</div>
                  <div>{initialState?.currentUser?.phone}</div>
                </div>
                {renderUserInfo(initialState?.currentUser)}
                <Divider style={{ marginTop: 16 }} dashed />
                <div className={styles.team}>
                  <div className={styles.teamTitle}>社团</div>
                  <Row gutter={36}>
                    {/*{currentUser.notice &&*/}
                    {/*  currentUser.notice.map((item) => (*/}
                    {/*    <Col key={item.id} lg={24} xl={12}>*/}
                    {/*      <Link to={item.href}>*/}
                    {/*        <Avatar size="small" src={item.logo} />*/}
                    {/*        {item.member}*/}
                    {/*      </Link>*/}
                    {/*    </Col>*/}
                    {/*  ))}*/}
                  </Row>
                </div>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24} xs={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default AccountCenter;
