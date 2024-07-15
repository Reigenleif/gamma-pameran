import { Button, Divider, Flex, Select, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DashboardSideNav } from "~/components/dashboard/SideNav";
import { FileInput } from "~/components/form/FileInput";
import { StringInput } from "~/components/form/StringInput";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";
import { FolderEnum } from "~/utils/file";
import { extensionContentTypeConverter } from "~/utils/function/extensionContentTypeConverter";
import { useToaster } from "~/utils/hooks/useToaster";
import { useUploader } from "~/utils/hooks/useUploader";

export const getServerSideProps = withSession({ force: true });

export default function PembelianPAge() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user.role !== "ADMIN") {
    router.replace("/");
  }

  return (
    <PublicLayout type="admin">
      <PembelianComponent />
    </PublicLayout>
  );
}

const schema = z.object({
  buyerEmail: z.string().email("Email tidak valid").optional(),
  buyerName: z.string().optional(),
  buyerPhone: z.string().optional(),
  buyerAddress: z.string().optional(),
  quantity: z
    .number()
    .int("Harus diisi dengan angka")
    .positive("Jumlah lembar saham minimal 1"),
  stockCode: z.string().nonempty("Saham harus dipilih"),
});

schema.refine((data) => {
  if (!data.buyerName && !data.buyerEmail) {
    return [
      false,
      {
        buyerName: "Nama atau email harus diisi",
        buyerEmail: "Nama atau email harus diisi",
      },
    ];
  }
  return [true];
});

type FormFields = z.infer<typeof schema>;

const PembelianComponent = () => {
  const { uploader } = useUploader();
  const toaster = useToaster();

  const { register, formState, handleSubmit, reset } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const fileStateArr = useState<File | null | undefined>(null);

  const getStockSettingList = api.stock.adminGetStockSettingList.useQuery();
  const createStockExchange = api.stock.adminCreateStockExchange.useMutation();
  const updateStockExchangeById =
    api.stock.adminUpdateStockExchangeById.useMutation();

  const stockSettingList = getStockSettingList.data;

  const onSubmit = handleSubmit(async (data: FormFields) => {
    const callFunc = async () => {
      const selectedStockSetting = stockSettingList?.find(
        (stockSetting) => stockSetting.code === data.stockCode
      );
      console.log(stockSettingList, selectedStockSetting, data.stockCode);
      if (!selectedStockSetting) throw new Error("Terjadi kesalahan");

      const newStockExchange = await createStockExchange.mutateAsync({
        buyerEmail: data.buyerEmail,
        buyerName: data.buyerName,
        buyerPhone: data.buyerPhone,
        buyerAddress: data.buyerAddress,
        quantity: data.quantity,
        stockSettingId: selectedStockSetting.id,
      });

      const file = fileStateArr[0];
      if (file) {
        const extension = file.name.split(".").pop();
        const filename = `${newStockExchange.id}.${extension}`;
        const contentType = extensionContentTypeConverter(extension);

        const uploadRes = await uploader(
          filename,
          FolderEnum.PAYMENT_PROOF,
          contentType,
          file
        );
        if (!uploadRes) throw new Error("Upload file gagal");
        const res = await updateStockExchangeById.mutateAsync({
          id: newStockExchange.id,
          imageUrl: uploadRes.publicUrl,
        });
      }

      reset();
    };

    toaster(callFunc());
  });

  return (
    <Flex>
      <DashboardSideNav />
      <Flex flexDir="column" w="100%" p="1em" gap="1em">
        <Text fontSize="2xl" fontWeight="bold">
          Pembelian Saham Manual
        </Text>
        <Divider size="1em" bg="black" h="2px" />
        <Flex gap="1em" flexDir="column" w="50%">
          <Text fontSize="xl" fontWeight="bold">
            Data Pembeli
          </Text>
          <StringInput
            register={register}
            title={"Nama"}
            field="buyerName"
            error={formState.errors.buyerName}
          />
          <StringInput
            register={register}
            title={"Email"}
            field="buyerEmail"
            error={formState.errors.buyerEmail}
          />
          <StringInput
            register={register}
            title={"Nomor Telepon"}
            field="buyerPhone"
            error={formState.errors.buyerPhone}
          />
          <StringInput
            register={register}
            title={"Alamat"}
            field="buyerAddress"
            error={formState.errors.buyerAddress}
          />

          <Text fontSize="xl" fontWeight="bold">
            Data Saham
          </Text>
          <Select {...register("stockCode")} placeholder="Pilih Saham">
            {stockSettingList?.map((stockSetting, idx) => (
              <option
                key={idx}
                value={stockSetting.code}
              >{`${stockSetting.name} (${stockSetting.code})`}</option>
            ))}
          </Select>
          <Text fontSize="lg" fontWeight="bold" color="salmon">
            {formState.errors.stockCode?.message}
          </Text>
          <StringInput
            register={register}
            title={"Jumlah Lembar Saham"}
            field="quantity"
            type="number"
            error={formState.errors.quantity}
          />
          <Text fontSize="xl" fontWeight="bold">
            Upload Bukti Pembayaran
          </Text>
          <FileInput fileStateArr={fileStateArr} />
        </Flex>
        <Button onClick={onSubmit} alignSelf="right" w="40%">
          Beli
        </Button>
      </Flex>
    </Flex>
  );
};
