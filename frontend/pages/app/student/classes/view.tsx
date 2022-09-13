import { NextPage } from "next";
import CustomAppShell from "../../../../components/AppShell";
import StudentClassViewComponent from "../../../../components/pages/app/student/ClassView";

const StudentClassView: NextPage = () => {
  return (
    <CustomAppShell>
      <StudentClassViewComponent />
    </CustomAppShell>
  );
};

export default StudentClassView;
