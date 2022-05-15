import { CANDLES, CANDLES_SUBSCRIPTION } from '@/api/atmos/candles';
import CandleChart from '@/components/charts/CandleChart';
import SimpleSidebarLayout from '@/components/layouts/SimpleSidebarLayout';
import { CandleOHLCV, CandleResults, CandleSubscriptionResult } from '@/interfaces/atmos';
import { useQuery } from '@apollo/client';
import { Skeleton } from '@chakra-ui/react';
import { timeStamp } from 'console';
import { Chart, dispose, init, KLineData } from 'klinecharts';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const CHART_ID = 'candle-chart';

const options = {
  grid: {
    show: false,
  },
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

type Props = {};

const SymbolDetail = (props: Props) => {
  const [chart, setChart] = useState<Chart | null>(null);
  const [klines, setKlines] = useState<KLineData[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const router = useRouter();
  const { symbol } = router.query;
  const parsedSymbol = (symbol as string)?.toUpperCase();

  const { loading, error, data, subscribeToMore } = useQuery<CandleResults>(CANDLES, {
    variables: { exchange: 'Binance', symbol: parsedSymbol, take: 1000 },
  });

  useEffect(() => {
    const chart = init(CHART_ID, options);
    setChart(chart);
    return () => {
      dispose(CHART_ID);
    };
  }, [hasLoaded]);

  useEffect(() => {
    if (data?.candles) {
      const klineData = data.candles.map(({ open, high, low, close, time, baseVolume }) => {
        return {
          timestamp: new Date(time).getTime(),
          open: Number(open),
          high: Number(high),
          low: Number(low),
          close: Number(close),
          volume: Number(baseVolume),
        };
      });
      setKlines(klineData);
      setHasLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    if (chart) {
      chart.applyNewData(klines);
      const subToMore = () =>
        subscribeToMore<CandleSubscriptionResult>({
          document: CANDLES_SUBSCRIPTION,
          variables: { exchange: 'Binance', symbol: 'ETHUSDT' },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const {
              ohlcv: { open, high, low, close, time, baseVolume, quoteVolume },
            } = subscriptionData.data;
            const newCandle: CandleOHLCV = {
              time,
              open,
              high,
              low,
              close,
              baseVolume,
              quoteVolume,
            };

            if (!prev.candles) return prev;
            const newCandles = [...prev.candles, newCandle];

            const newKline = {
              timestamp: new Date(time).getTime(),
              open: Number(open),
              high: Number(high),
              low: Number(low),
              close: Number(close),
              volume: Number(baseVolume),
            };
            setKlines((prevKlines) => [...prevKlines, newKline]);
            chart.updateData(newKline);

            return {
              candles: newCandles,
            };
          },
        });
      //subToMore();
      chart.createTechnicalIndicator({ name: 'RSI', calcParams: [14] }, false, { id: 'rsi' });
      // chart.createTechnicalIndicator('MA', true, { id: 'candle_pane' });
      chart.createTechnicalIndicator('MACD', true, { id: 'MACD' });
    }
  }, [chart]);

  if (loading) return <Skeleton />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  return (
    <SimpleSidebarLayout>
      <div>SymbolDetail: {parsedSymbol}</div>
      <Skeleton isLoaded={!loading && klines.length > 0}>
        <div id={CHART_ID} style={{ height: 600 }}>
          Chart
        </div>
        {/* <CandleChart chart={chart} subscribeToMoreCandles={memoizedSubscribeToMore} data={klines} /> */}
      </Skeleton>
    </SimpleSidebarLayout>
  );
};

export default SymbolDetail;
