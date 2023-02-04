import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem } from '../data.d';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData = [] }: { loading: boolean; visitData: DataItem[] }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="总用户数"
        action={
          <Tooltip title="指标说明">
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => 126560}
        footer={<Field label="日增长数" value={13} />}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="访问量"
        action={
          <Tooltip title="指标说明">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
        contentHeight={46}
      >
        <TinyArea
          height={46}
          autoFit
          smooth
          areaStyle={{
            fill: 'l(270) 0:rgb(151 95 228 / 10%) 0.5:rgb(151 95 228 / 60%) 1:rgb(151 95 228)',
          }}
          line={{
            color: '#975FE4',
          }}
          data={visitData.map((item) => item.y)}
        />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="总社团数"
        action={
          <Tooltip title="指标说明">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(6560).format('0,0')}
        contentHeight={46}
      >

      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="总活动数"
        action={
          <Tooltip title="指标说明">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(1240).format('0,0')}
        contentHeight={46}
      >
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
