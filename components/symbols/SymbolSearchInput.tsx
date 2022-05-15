import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
};

const SymbolSearchInput = ({ handleChange, search }: Props) => {
  return <Input placeholder='Search Symbol' onChange={handleChange} value={search} />;
};

export default SymbolSearchInput;
