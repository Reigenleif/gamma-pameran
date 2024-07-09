import { api } from "~/utils/api";
import { FormEvent, FormEventHandler, useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { useToaster } from "~/utils/hooks/useToaster";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { PasswordInput } from "~/utils/elements/PasswordInput";
import { FcGoogle } from "react-icons/fc";

interface SignInProps {
  csrfToken: string;
}

export const SignIn = ({ csrfToken }: SignInProps) => {
  const toaster = useToaster();
  const router = useRouter();

  const { data: session } = useSession();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const createUserMutation = api.user.createUser.useMutation();

  const credentialSignIn = (email: string, password: string) => {
    toaster(
      signIn("credentials", { email, password, redirect: true, csrfToken })
    );
  };

  const googleSignIn = () => {
    toaster(signIn("google", { redirect: true, csrfToken }));
  };

  const onSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    credentialSignIn(emailInput, passwordInput);
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
        <Text textAlign="center">Masuk</Text>
        <form onSubmit={onSignIn}>
          <FormControl>
            <Input
              mt="1em"
              w="100%"
              value={emailInput}
              onChange={emailChangeHandler}
              placeholder="Email"
              id="EmailInput"
            />

            <PasswordInput
              mt="1em"
              w="100%"
              value={passwordInput}
              type="password"
              onChange={passwordChangeHandler}
              placeholder="Password"
            />

            <Flex w="100%" flexDir="column" mt="1em">
              <Button type="submit" w="50%" m="auto">
                Masuk dengan Email
              </Button>
              <Flex pos="relative" p="10" alignItems="center">
                <Divider color="black" />
                <AbsoluteCenter
                  bg="white"
                  fontSize="xl"
                  w="4em"
                  textAlign="center"
                >
                  atau
                </AbsoluteCenter>
              </Flex>
              <Button
                m="auto"
                mt="1em"
                onClick={googleSignIn}
                w="60%"
                as={Flex}
                gap="1em"
                cursor="pointer"
              >
                <FcGoogle size="1.5em" /> Masuk dengan Google
              </Button>
            </Flex>

            <Flex pos="relative" p="10" alignItems="center">
              <Divider color="black" />
              <AbsoluteCenter
                bg="white"
                fontSize="xl"
                w="4em"
                textAlign="center"
              >
                atau
              </AbsoluteCenter>
            </Flex>
            <Flex w="100%">
              <Button onClick={() => router.push("/signup")} w="50%" m="auto">
                Buat Akun
              </Button>
            </Flex>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};
