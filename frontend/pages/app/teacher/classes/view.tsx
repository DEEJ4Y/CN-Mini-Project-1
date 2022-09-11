import { NextPage } from "next";
import CustomAppShell from "../../../../components/AppShell";
import TeacherClassView from "../../../../components/pages/app/teacher/ClassView";

const CreateClassPage: NextPage = () => {
  return (
    <CustomAppShell>
      <TeacherClassView />
    </CustomAppShell>
  );
};

export default CreateClassPage;
