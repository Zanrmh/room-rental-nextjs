'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCaveEntrance,
  GiFarmTractor,
  GiForestCamp,
  GiIsland,
  GiTreeSwing,
} from 'react-icons/gi';
import { FaCrown, FaFortAwesome } from 'react-icons/fa';
import { MdOutlineVilla, MdPark } from 'react-icons/md';

import CategoryBox from '../CategoryBox';
import Container from '../Container';

export const categories = [
  {
    label: 'Trang trí',
    icon: FaCrown,
    description: 'Căn phòng được trang trí đẹp!',
  },
  {
    label: 'Hướng biển',
    icon: TbBeach,
    description: 'Căn phòng gần biển!',
  },
  {
    label: 'Lâu đài',
    icon: FaFortAwesome,
    description: 'Căn phòng trong lâu đài!',
  },
  {
    label: 'Căn nhà',
    icon: MdOutlineVilla,
    description: 'Căn hộ nhỏ có đầy đủ tiện nghi!',
  },
  {
    label: 'Nông thôn',
    icon: GiFarmTractor,
    description: 'Căn phòng ở vùng nông thôn!',
  },
  {
    label: 'Hồ bơi',
    icon: TbPool,
    description: 'Căn phòng có hồ bơi!',
  },
  {
    label: 'Hòn đảo',
    icon: GiIsland,
    description: 'Căn phòng ở trên hòn đảo!',
  },
  {
    label: 'Hồ',
    icon: GiBoatFishing,
    description: 'Căn phòng ở gần hồ!',
  },
  {
    label: 'Động',
    icon: GiCaveEntrance,
    description: 'Căn phòng trong hang động!',
  },
  {
    label: 'Cắm trại',
    icon: GiForestCamp,
    description: 'Nơi lưu trú này cung cấp các hoạt động cắm trại!',
  },
  {
    label: 'Nhà trên cây',
    icon: GiTreeSwing,
    description: 'Căn phòng nằm trên cây!',
  },
  {
    label: 'Khu giải trí',
    icon: MdPark,
    description: 'Căn phòng giải trí!',
  },
  {
    label: 'Nông trại',
    icon: GiBarn,
    description: 'Căn phòng trong khu nông trại!',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
