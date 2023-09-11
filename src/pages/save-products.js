import Item from '@/components/Item';
import React from 'react';
import { useSelector } from 'react-redux';

const SaveProducts = () => {
    const { saveProducts } = useSelector((state) => state.product)
    return (
        <div>
            <Item items={saveProducts} />
        </div>
    );
};

export default SaveProducts;