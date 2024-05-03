import React from "react";
import CustomModal from "../CustomModal";
import { Button, Typography } from "antd";
import { deleteGroupAsync } from "@/utils/apis/commonapi";

const DeleteGroupModal = ({
  setIsModalOpen,
  isModalOpen,
  groupId,
  showToast,
  groupTitle,
  closeParent = () => {},
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteGroup = (groupId) => {
    deleteGroupAsync(groupId, groupTitle).then((res) => {
      if (res.status) {
        showToast("success", res.message);
        closeParent();
        handleOk();
      } else {
        showToast("error", res.message);
      }
    });
  };

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title={groupTitle === "delete" ? "Delete Group" : "Leave Group"}
    >
      <div className="flex flex-col gap-1 mt-6">
        <div>
          <Typography className="text-[#7A7A7A] text-[16px] text-center font-avantGarde-bk">
            {`Are you sure you want to ${
              groupTitle === "delete" ? "delete" : "leave"
            } this group?`}
          </Typography>
          <Typography className="text-[#7A7A7A] text-[16px] text-center font-avantGarde-bk">
            {`Once ${
              groupTitle === "delete" ? "deleted" : "leave"
            } you can not see older messages.`}
          </Typography>
        </div>
        <Button
          className="font-avantGarde-md flex outline-none border-px border-[#F10000] text-[#F10000] justify-center items-center
           text-[18px] mt-9 rounded-lg px-[70px] py-[18px] hover:!bg-red-400
           hover:!text-white hover:!border-hidden leading-7 h-14 cursor-pointer transition-all ease-in-out"
          onClick={() => deleteGroup(groupId)}
        >
          {groupTitle === "delete" ? "Delete Group" : "Leave Group"}
        </Button>
      </div>
    </CustomModal>
  );
};

export default DeleteGroupModal;
