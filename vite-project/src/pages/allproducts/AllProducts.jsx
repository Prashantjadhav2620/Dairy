import Layout from '../../components/layout/Layout';
import TestData from '../TEST/TestData';

const AllProducts = () => {
    
    return (
        <Layout>
            <div class='mt-3 text-center bg-inherit text-2xl font-bold'>
                All Products
            </div>
            <div className='mt-4'>
                <TestData/>
            </div>
        </Layout>
    );
};

export default AllProducts;