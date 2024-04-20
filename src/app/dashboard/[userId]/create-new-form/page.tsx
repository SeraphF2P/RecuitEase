import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

import type { ReactNode } from "react";
import { EdgeStoreProvider } from "~/lib/edgeStore/edgestore";
import { Typography } from "~/ui";
import AdditionalQuestions from "./_components/AdditionalQuestions";
import PersonalInformation from "./_components/PersonalInformation";
import SaveForm from "./_components/SaveForm";
import UploadCoverImage from "./_components/UploadCoverImage";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  if (!session?.user.id) {
    redirect("/");
  }
  const userId = session?.user.id;
  return (
    <EdgeStoreProvider>
      <Card title="upload a cover image">
        <UploadCoverImage />
      </Card>
      <Card title="Personal Information">
        <PersonalInformation />
      </Card>
      <Card title="Questions">
        <AdditionalQuestions />
      </Card>
      <Card title="name">
        <SaveForm userId={userId} />
      </Card>
    </EdgeStoreProvider>
  );
}
const Card = ({ title, children }: { title: string; children?: ReactNode }) => {
  return (
    <Typography.div className="relative flex flex-col overflow-hidden  rounded-3xl bg-neutral-50  p-4  shadow">
      <h2 className="  text-center  capitalize">{title}</h2>
      {children}
    </Typography.div>
  );
};
