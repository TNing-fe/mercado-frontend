import React from 'react'

export interface IProps {
  /** 路径 */
  img?: string;
  /** 描述 */
  desc?: string;
  /** 随机图 */
  id?: number;
}
const myImg: React.FC<IProps> = ({ desc, id }) => {
  return (
    <img src={`bg${id}.jpg`} alt={desc} style={{ width: 276, height: 120 }} />
  )
}

export default myImg
