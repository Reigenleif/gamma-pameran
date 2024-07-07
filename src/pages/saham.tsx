import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";

export const getServerSideProps = withSession({ force: true });

export default function SahamPage() {
    return <PublicLayout>
        <SahamPageComponent />
    </PublicLayout>
}

const SahamPageComponent = () => {
    const getAllUserStock = api.stock.getAllUserStock.useQuery();
    const createUserStock = api.stock.createUserStock.useMutation();
    const updateUserStock = api.stock.updateUserStock.useMutation();
    const deleteUserStock = api.stock.deleteUserStock.useMutation();

    const userStockList = getAllUserStock.data ?? [];
}