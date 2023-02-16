import { PageContainer } from '@ant-design/pro-components';
import {Alert, Card, Carousel, Col, Image, Row, Typography} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';
import styles from './Welcome.less';
const {Text, Title} = Typography;
import Progress from 'antd/es/progress';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Title level={2}>🎇Welcome to Ribosome!</Title>
      <h1>This is a Club Management for Xiamen University Malaysia driven by Nucleus</h1>
      <Card>
        <Progress type="circle" percent={100} width={23} /><Text>  Ribosome Service</Text><br/>
        <Progress type="circle" percent={100} width={23} /><Text>  RootJam Service</Text>
      </Card>
      <Card>
        <Typography.Text strong>
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="Welcome" />
          </a>
        </Typography.Text>
        <br/>
        <Text>
          公告
        </Text>
      </Card>
      <Row justify={"center"}>
        <Col>
          <Image className={styles.logo} preview={false} src="https://cdn.eduadvisor.my/institution/xiamen/ea-inst-logo-xmu.png"/>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Welcome;
