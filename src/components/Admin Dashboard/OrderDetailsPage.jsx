import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OrderHeader from './OrderHeader';
import CustomerInfo from './CustomerInfo';
import OrderInfo from './OrderInfo';
import DeliverTo from './DeliverTo';
import PaymentInfo from './PaymentInfo';
import NoteSection from './NoteSection';
import ProductList from '../OrderDetails/ProductList';
import OrderSummary from './OrderSummary';

const OrderDetailsPage = () => {
  const { t } = useTranslation();
  const [orderStatus, setOrderStatus] = useState('Pending');

  const customerData = {
    fullName: 'Shristi Singh',
    email: 'shristi@gmail.com',
    phone: '+91 904 231 1212'
  };

  const orderData = {
    shipping: 'Tawseel.net',
    paymentMethod: 'Paypal',
    status: orderStatus
  };

  const addressData = {
    street: 'Cairo downtown, maidan AL-Tahreer'
  };

  const paymentData = {
    cardType: 'Master Card',
    lastFour: '6557',
    businessName: 'Shristi Singh',
    phone: '+91 904 231 1212'
  };

  const productItems = [
    { name: 'Product 1', price: 29.99, quantity: 2 },
    { name: 'Product 2', price: 49.99, quantity: 1 },
    { name: 'Product 3', price: 19.99, quantity: 3 }
  ];
  const orderSummary = {
    subtotal: 3201.6,
    taxRate: 20,
    discount: 0,
    shippingRate: 0
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus) {
      setOrderStatus(newStatus);
      console.log('Status changed to:', newStatus);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 order-page-content">
      <div className="max-w-7xl mx-auto">
        <OrderHeader 
          orderId="#6743"
          status={orderStatus}
          dateRange="Feb 16,2022 - Feb 20,2022"
          onStatusChange={handleStatusChange}
          onPrint={handlePrint}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <CustomerInfo customer={customerData} />
          <OrderInfo order={orderData} />
          <DeliverTo address={addressData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <PaymentInfo payment={paymentData} />
          <NoteSection />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('orderDetails.products.title')}
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
          <ProductList items={productItems} />
          <OrderSummary 
            taxRate={orderSummary.taxRate}
            shippingRate={orderSummary.shippingRate}
            discount={orderSummary.discount}
            subtotal={orderSummary.subtotal}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
