import { api } from "~/utils/api";
import { useState } from "react";
import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useToaster } from "~/utils/hooks/useToaster";
import { PasswordInput } from "~/utils/elements/PasswordInput";

interface SignUpProps {
  csrfToken: string;
}

export const SignUp = ({ csrfToken }: SignUpProps) => {
  const toast = useToast();
  const toaster = useToaster();

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [addressInput, setAddressInput] = useState("");

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const confirmPasswordChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordInput(e.target.value);
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  };

  const createUserMutation = api.user.createUser.useMutation();

  const credentialSignUp = (email: string, password: string) => {
    // TODO: Kasih CSRF Validation & reCAPTCHA
    toaster(createUserMutation.mutateAsync({ email, password }));
  };

  const credentialButtonClickHandler = () => {
    if (emailInput === "") {
      toast({
        title: "Email Tidak Boleh Kosong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordInput === "") {
      toast({
        title: "Password Tidak Boleh Kosong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!emailInput.includes("@")) {
      toast({
        title: "Email Tidak Valid",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordInput.length < 8) {
      toast({
        title: "Password minimal sepanjang 8 huruf",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      toast({
        title: "Passwords tidak sesuai",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (nameInput === "") {
      toast({
        title: "Nama Tidak Boleh Kosong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (addressInput === "") {
      toast({
        title: "Alamat Tidak Boleh Kosong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    credentialSignUp(emailInput, passwordInput);
  };

  return (
    <Flex justifyContent="center" pt="2em">
      <Flex
        flexDirection="column"
        border="1px solid black"
        borderRadius="10px"
        p="1em"
        w="min(30em,95%)"
      >
        <Text textAlign="center">Buat Akun</Text>
        <Input
          mt="1em"
          w="100%"
          value={nameInput}
          onChange={nameChangeHandler}
          placeholder="Nama"
        />
        <Input
          mt="1em"
          w="100%"
          value={emailInput}
          onChange={emailChangeHandler}
          placeholder="Email"
        />
        <Input
          mt="1em"
          w="100%"
          type="text"
          h="xl"
          overflowWrap="anywhere"
          value={addressInput}
          onChange={addressChangeHandler}
          placeholder="Alamat Lengkap"
        />

        <PasswordInput
          mt="1em"
          w="100%"
          value={passwordInput}
          onChange={passwordChangeHandler}
          placeholder="Password"
        />
        <PasswordInput
          mt="1em"
          w="100%"
          value={confirmPasswordInput}
          onChange={confirmPasswordChangeHandler}
          placeholder="Konfimasi Password"
        />

        <Button
          onClick={credentialButtonClickHandler}
          w="50%"
          m="auto"
          mt="1em"
        >
          Daftar
        </Button>
      </Flex>
    </Flex>
  );
};
