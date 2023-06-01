import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { FiMoreVertical, FiRotateCcw, FiTrash2 } from "react-icons/fi";

const DropDown = ({ onDeleteChats }) => {
  return (
    <Menu as="div" className="relative inline-block text-left z-20">
      <div>
        <Menu.Button className="w-10 h-10 flex items-center justify-center">
          <FiMoreVertical className="text-2xl" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-4 mt-2 overflow-hidden w-44 origin-top-right divide-y divide rounded-md bg-white shadow shadow-zinc-400 ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <div
              onClick={(e) => location.reload()}
              className="px-4 py-3 hover:bg-gray-200 text-blue-500 cursor-pointer flex items-center gap-x-2"
            >
              <span>Refresh</span>
              <FiRotateCcw />
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              onClick={onDeleteChats}
              className="px-4 py-3 hover:bg-gray-200 text-red-500 cursor-pointer flex items-center gap-x-2"
            >
              <span>Delete All Chats</span>
              <FiTrash2 />
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDown;
