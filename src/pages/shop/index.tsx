/**
 * Author: hao
 * 没有使用状态管理
 * 数据为写死
 * 这是一个组件，需要导入到react项目入口
 */

import React, { useState } from 'react';

import { MockMerchandises } from './mockData';
import type { Merchandise } from './type';
import Car from './components/Car';
import './style.less';

const Shop: React.FC = () => {
  const [carMerchandises, setCarMerchandises] = useState<Merchandise[]>([]); //购物车列表
  const [isShowCar, setIsShowCar] = useState<boolean>(false); //是否显示购物车
  //添加购物车里的商品
  const handleAddMerchandise = (merchandise: Merchandise) => {
    setCarMerchandises([...carMerchandises, merchandise]);
  };

  //删除购物车里的商品
  const handleRemoveMerchandise = (merchandiseID: number) => {
    setCarMerchandises(carMerchandises.filter((merchandise) => merchandise.id !== merchandiseID));
  };

  //显示购物车
  const handleShowCar = () => {
    setIsShowCar(true);
  };

  //关闭购物车
  const handleClossedCar = () => {
    setIsShowCar(false);
  };

  return (
    <div className="shop-container">
      <div className="shop-herder">
        <h2>购物天堂</h2>
        <button onMouseEnter={handleShowCar} onClick={handleClossedCar}>
          购物车
        </button>
        {isShowCar && (
          <div className="car-wrrapper">
            <Car data={carMerchandises} handleRemove={handleRemoveMerchandise} />
          </div>
        )}
      </div>
      <div className="shop-list">
        {MockMerchandises.map((merchandise) => {
          return (
            <div className="item" key={merchandise.id}>
              <div className="img-wrapper">
                <img src={merchandise.url} alt='' />
              </div>
              <div className="footer">
                <div className="content">
                  <span>{merchandise.name}</span>
                </div>
                <span style={{ marginRight: 5 }}>{merchandise.price}</span>
                <button onClick={() => handleAddMerchandise(merchandise)}>加入购物车</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
