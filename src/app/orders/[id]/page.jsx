import React from 'react';

const { NEXT_PUBLIC_HOST_URL } = process.env;

const getData = async (id) => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/orders/${id}`, { cache: 'no-store' });
    res = await res.json();
    return res;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function page({ params }) {

  const data = await getData(params.id);

  let paidAmount = data ? data.products.reduce((total, payment) => total + payment.amount, 0) : null;

  return (
    <>
      {data ? <section className="pt-36 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
          <div className="flex flex-col xl:flex-row items-start gap-6">
            <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex flex-col gap-8 mx-auto xl:mx-0">
              <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200">
                  Order Summary
                </h2>
                <div className="data py-6 border-b border-gray-200">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Product Cost
                    </p>
                    <p className="font-medium text-lg leading-8 text-gray-900">
                      {data.products[0].currency} {paidAmount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Coupon Code
                    </p>
                    <p className="font-medium text-lg leading-8 text-emerald-500">
                      #APPLIED
                    </p>
                  </div>
                </div>
                <div className="total flex items-center justify-between pt-6">
                  <p className="font-normal text-xl leading-8 text-black">
                    Subtotal
                  </p>
                  <h5 className="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                    {data.products[0].currency} {paidAmount}
                  </h5>
                </div>
              </div>
            </div>
            <div className="w-full max-w-sm md:max-w-3xl mx-auto xl:mx-0">
              <div className="grid grid-cols-1 gap-6">
                {
                  data.products.map((item, i) => <div key={i} className="rounded-3xl p-6 bg-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400">
                    <div className="flex justify-center">
                      <img
                        src={item.img[0]}
                        alt={item.title}
                        className="w-2/4 md:max-w-[122px]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                      <div>
                        <h2 className="font-medium text-xl leading-8 text-black mb-3">
                          {item.title}
                        </h2>
                        <p className='flex flex-col gap-3'>
                        <span>Size: {item.size}</span>
                        <span>Quantity: {item.quantity}</span>
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-3">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_14099_1497)">
                                <path
                                  d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                  fill="#FBBF24"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_14099_1497">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          ))}
                        </div>
                        <h6 className="font-medium text-xl leading-8 text-indigo-600">
                          {item.currency} {item.amount}
                        </h6>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </section> : <p className='pt-36 text-2xl text-center font-semibold'>No item purchased yet!</p>}

    </>
  )
}

export default page;