import { PageContainer } from '@ant-design/pro-components';
import {Alert, Card, Carousel, Typography} from 'antd';
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
    </PageContainer>
  );
};

export default Welcome;
