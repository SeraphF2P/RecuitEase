import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { NextLink } from "~/ui";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  if (!session?.user.id) {
    redirect("/");
  }
  const userId = session?.user.id;
  return (
    <>
      <section className=" mx-auto  flex w-full max-w-[300px] flex-col rounded-md border-4 border-primary p-4">
        <NextLink variant="outline" href={`${userId}/create-new-form`}>
          create new form
        </NextLink>
      </section>
    </>
  );
}
