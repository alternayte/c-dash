import SimpleSidebarLayout from '@/components/layouts/SimpleSidebarLayout';
import SymbolsList from '@/components/symbols/SymbolsList';
import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => (
  <SimpleSidebarLayout title='Home | Next.js + TypeScript Example'>
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <Link href='/symbols'>
        <a>About</a>
      </Link>
    </p>
  </SimpleSidebarLayout>
);

export default IndexPage;
