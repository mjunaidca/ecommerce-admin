import prismadb from "@/lib/prismadb";

interface DasahboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DasahboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>Active Stpre: {store?.name}</div>;
};

export default DashboardPage;
