import { Chart, dispose, init, KLineData } from 'klinecharts';
import React, { useEffect } from 'react';

const CHART_ID = 'candle-chart';

const options = {
  candle: {
    tooltip: {
      labels: ['T: ', 'O: ', 'C: ', 'H: ', 'L: ', 'V: '],
    },
  },
  yAxis: {
    type: 'normal',
  },
  technicalIndicator: {
    lastValueMark: {
      show: true,
      text: {
        show: true,
      },
    },
  },
};

type Props = {
  data: KLineData[];
  moreData?: KLineData[];
  subscribeToMoreCandles: () => void;
};
const CandleChart = ({ data, moreData = [], subscribeToMoreCandles }: Props) => {
  const [chart, setChart] = React.useState<Chart>(null);
  useEffect(() => {
    console.log('data length', data.length);
    subscribeToMoreCandles();
    const chart = init(CHART_ID, options);
    chart.applyNewData(data);

    setChart(chart);

    return () => {
      dispose(CHART_ID);
    };
  }, []);
  return (
    <div id={CHART_ID} style={{ height: 600 }}>
      Chart
    </div>
  );
};

export default CandleChart;
