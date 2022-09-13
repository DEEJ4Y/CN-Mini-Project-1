import { NextPage } from "next";
import CustomAppShell from "../../../../components/AppShell";
import TeacherClassView from "../../../../components/pages/app/teacher/ClassView";

const StudentClassView: NextPage = () => {
  return (
    <CustomAppShell>
      <TeacherClassView />
    </CustomAppShell>
  );
};

export default StudentClassView;
