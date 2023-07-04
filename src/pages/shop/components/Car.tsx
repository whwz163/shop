import React, { useMemo } from 'react';

import type { Merchandise, CarMerchandise } from '../type';
import '../style.less';

interface CarProps {
  data: Merchandise[];
  handleRemove: (values: number) => void;
}

//数组去重并计算出单个商品个数
const processMerchandise = (merchandises: Merchandise[]): CarMerchandise[] => {
  if (merchandises.length === 0) return [];
  const carMerchandiseMap = new Map<number, CarMerchandise>();
  for (const item of merchandises) {
    const carMerchandise = carMerchandiseMap.get(item.id);
    //去重
    if (carMerchandise) {
      //计算个数
      carMerchandise.num++;
      carMerchandiseMap.set(item.id, carMerchandise);
    } else {
      carMerchandiseMap.set(item.id, {
        merchandise: item,
        num: 1,
      });
    }
  }
  // @ts-ignore
  return [...carMerchandiseMap.values()];
};

const Car: React.FC<CarProps> = ({ data, handleRemove }) => {
  const carMerchandises = useMemo(() => {
    return processMerchandise(data);
  }, [data]);

  //计算所有商品价格，简单考虑浮点数精确度, 因为一般用写好的
  const handleTotal = () => {
    let sum: number = 0;
    data.forEach((item) => {
      sum = sum + item.price;
    });
    alert(`总额为${sum.toFixed(2)}`);
  };

  return (
    <>
      {data.length === 0 ? (
        <div className='car-empty'>空空如也，请选择喜欢的商品</div>
      ) : (
        <div>
          {carMerchandises.map((carMerchandise) => {
            return (
              <div key={carMerchandise.merchandise.id} className="car-item">
                <div className="content">
                  <span>{carMerchandise.merchandise.name}</span>
                </div>
                <span style={{ marginRight: 5 }}>
                  {`${carMerchandise.merchandise.price} * ${carMerchandise.num}`}
                </span>
                <button onClick={() => handleRemove(carMerchandise.merchandise.id)}>删除</button>
              </div>
            );
          })}
        </div>
      )}
      {
        carMerchandises.length > 0 && <button style={{ width: '100%' }} onClick={handleTotal}>
          购买
        </button>
      }
    </>
  );
};

export default Car;
