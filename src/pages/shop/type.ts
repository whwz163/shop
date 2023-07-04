//商品对象
export interface Merchandise {
  id: number; //商品ID
  url: string; //图片地址
  name: string; //商品名字
  price: number; // 商品价格
}

//购物车商品
export interface CarMerchandise {
  merchandise: Merchandise; //商品对象
  num: number; //商品个数
}
