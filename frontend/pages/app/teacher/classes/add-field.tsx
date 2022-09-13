import { NextPage } from "next";
import CustomAppShell from "../../../../components/AppShell";
import AddFieldToClassForm from "../../../../components/pages/app/teacher/AddFieldToClass";

const AddDataFieldPage: NextPage = () => {
  return (
    <CustomAppShell>
      <AddFieldToClassForm />
    </CustomAppShell>
  );
};

export default AddDataFieldPage;
