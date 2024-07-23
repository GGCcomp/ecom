import Types from "@/components/Types";
import ShopAll from "@/components/ShopAll";

const getData = async (category) => {
  try {
    let res = await fetch('http://localhost:3000/api/types/'+category,{cache: 'no-store'});
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};


async function Page({params}) {
  const{category} = params;
  const data = await getData(category)
  

  return (
    <>
    {category === 'shop_all' ? <ShopAll product={data} img={'https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg'} title={'Shop All'} url={'types'}/> : 
    <Types product={data} img={'https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg'} title={data.mainTitle} category={category} />}
  </>
  );
}

export default Page;

