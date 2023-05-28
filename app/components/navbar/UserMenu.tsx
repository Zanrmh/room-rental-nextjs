'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import { SafeUser } from '@/app/types';

import MenuItem from './MenuItem';
import Avatar from '../Avatar';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-2">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-[#202124]
            transition 
            cursor-pointer
            text-gray-200
          "
        >
          Cho thuê phòng
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
        border-[#5F6368]
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          shadow-sm
        shadow-[#3C4043]
        hover:shadow-[#5F6368]
          hover:shadow-md
          transition
          bg-[#202124]
          "
        >
          <AiOutlineMenu className="text-white" />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl
            shadow-lg
            shadow-[#3C4043]
            w-[40vw]
            md:w-3/4 
            bg-[#0E1013]
            overflow-hidden 
            right-0 
            top-[53px]
            text-sm
            text-gray-200
            border-[1px]
            transition 
          border-[#5F6368]
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="Phòng đã đặt"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="Mục yêu thích"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="Quản lý phòng đặt"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="Phòng của bạn"
                  onClick={() => router.push('/properties')}
                />
                <MenuItem label="Cho thuê phòng" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label="Đăng xuất" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Đăng nhập" onClick={loginModal.onOpen} />
                <MenuItem label="Đăng ký" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
