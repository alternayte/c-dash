import { CONFIGS } from '@/api/atmos/configs';
import SimpleSidebarLayout from '@/components/layouts/SimpleSidebarLayout';
import { ConfigResults } from '@/interfaces/atmos';
import { useQuery } from '@apollo/client';
import React from 'react';

type Props = {};

const Configs = (props: Props) => {
  const { loading, error, data } = useQuery<ConfigResults>(CONFIGS, {
    variables: { exchange: 'Binance' },
  });
  return (
    <SimpleSidebarLayout>
      <div>Configs</div>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </SimpleSidebarLayout>
  );
};

export default Configs;
